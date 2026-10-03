"""Mälarenergi (Mitt Mälarenergi) integration."""

from __future__ import annotations

import logging
import secrets
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ConfigEntryAuthFailed, HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from . import parse
from .api import AuthError, MalarenergiClient, MalarenergiError, Tokens
from .const import CONF_TOKENS, DOMAIN, SCAN_MINUTES

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[str] = ["sensor", "switch"]
EVENT_NEW_INVOICE = f"{DOMAIN}_new_invoice"


def _iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")


class MalarenergiCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, client: MalarenergiClient) -> None:
        super().__init__(
            hass, _LOGGER, name=DOMAIN, update_interval=timedelta(minutes=SCAN_MINUTES), config_entry=entry
        )
        self.client = client
        self.facility: parse.Facility | None = None
        self._fac_at: datetime | None = None
        self._store = Store(hass, 1, f"{DOMAIN}.{entry.entry_id}.invoices")
        self._seen: set[str] | None = None

    async def _get(self, path: str, **params) -> Any:
        return await self.client.get(path.format(cid=self.client.customer_id), **params)

    async def _async_update_data(self) -> dict[str, Any]:
        try:
            if not self.client.customer_id:
                await self.client.account()
            now = dt_util.now()
            if self.facility is None or now - self._fac_at > timedelta(hours=12):
                facs = parse.facilities(await self._get("/api/v2/customers/{cid}/facilities", pageSize=10000))
                self.facility = next((f for f in facs if f.point("CONSUMPTION")), facs[0] if facs else None)
                self._fac_at = now
            out: dict[str, Any] = {"updated": now.isoformat()}
            f = self.facility
            month0 = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            start = month0 - timedelta(days=1)  # includes yesterday on the 1st
            for kind in ("CONSUMPTION", "PRODUCTION"):
                mp = f.point(kind) if f else None
                if not mp:
                    continue
                q = {"facilityKey": f.key, "meteringPointId": mp.id, "privateCustomer": "true"}
                out[kind] = {
                    "point": mp.id,
                    "daily": parse.series(
                        await self._get(
                            "/api/v2/customers/{cid}/infraserviceSeries/el",
                            resolution="day",
                            **{"from": _iso(start), "to": _iso(now)},
                            **q,
                        )
                    ),
                }
                try:
                    out[kind]["peak"] = parse.peak(
                        await self._get(
                            "/api/v2/customers/{cid}/metervalues/peakPowerCost",
                            monthStart=month0.strftime("%Y-%m-%d"),
                            facilityKey=f.key,
                            meteringPointId=mp.id,
                        )
                    )
                except MalarenergiError:
                    out[kind]["peak"] = None
            out["fuse"] = f.point("CONSUMPTION").fuse if f and f.point("CONSUMPTION") else None
            out["invoices"] = parse.invoices(
                await self._get(
                    "/api/v3/customers/{cid}/invoices",
                    page=1,
                    pageSize=1000,
                    **{"from": (now - timedelta(days=730)).strftime("%Y-%m-%d"), "to": now.strftime("%Y-%m-%d")},
                )
            )
            out["han"] = parse.han_ports(await self._get("/api/v2/hanport/{cid}"))
            out["unread"] = parse.unread_inbox(await self._get("/api/v3/customers/{cid}/inbox"))
            out["overdue"] = parse.overdue_invoices(await self._get("/api/v3/dashboard/{cid}/headsup"))
        except AuthError as err:
            raise ConfigEntryAuthFailed(str(err)) from err
        except MalarenergiError as err:
            raise UpdateFailed(str(err)) from err
        await self._announce(out["invoices"])
        return out

    async def _announce(self, invoices: list[dict]) -> None:
        """Fire malarenergi_new_invoice once per invoice id; first run seeds silently."""
        if self._seen is None:
            data = await self._store.async_load()
            self._seen = set(data["seen"]) if data else None
        ids = {i["invoice_id"] for i in invoices if i["invoice_id"]}
        if self._seen is None:
            self._seen = ids
        else:
            for inv in reversed(invoices):
                if inv["invoice_id"] and inv["invoice_id"] not in self._seen:
                    self._seen.add(inv["invoice_id"])
                    self.hass.bus.async_fire(EVENT_NEW_INVOICE, {**inv, "entry_id": self.config_entry.entry_id})
        await self._store.async_save({"seen": sorted(self._seen)})

    async def set_han(self, point: str, open_: bool) -> None:
        acc = self.facility.account_ids[0] if self.facility and self.facility.account_ids else None
        await self.client.put(
            f"/api/v2/hanport/{point}/{'open' if open_ else 'close'}", **({"customerAccountId": acc} if acc else {})
        )
        await self.async_request_refresh()


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    t = entry.data[CONF_TOKENS]

    @callback
    def _save(tokens: Tokens) -> None:
        hass.config_entries.async_update_entry(entry, data={**entry.data, CONF_TOKENS: tokens.as_dict()})

    client = MalarenergiClient(
        async_get_clientsession(hass), Tokens(t["access_token"], t["refresh_token"], t["expires_at"]), _save
    )
    coord = MalarenergiCoordinator(hass, entry, client)
    await coord.async_config_entry_first_refresh()
    entry.runtime_data = coord
    _register_services(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


def _register_services(hass: HomeAssistant) -> None:
    if hass.services.has_service(DOMAIN, "download_invoice"):
        return

    async def download(call: ServiceCall) -> dict:
        """Save one invoice PDF under a random name in www/ (served unauthenticated), deleted after 10 min."""
        entries = [e for e in hass.config_entries.async_entries(DOMAIN) if getattr(e, "runtime_data", None)]
        if not entries:
            raise HomeAssistantError("Mälarenergi is not set up")
        coord: MalarenergiCoordinator = entries[0].runtime_data
        inv_id = call.data["invoice_id"]
        try:
            body, ctype = await coord.client.request(
                "GET", f"/api/v2/customers/{coord.client.customer_id}/invoices/{inv_id}/document", raw=True
            )
        except MalarenergiError as err:
            raise HomeAssistantError(f"Could not download invoice: {err}") from err
        if not body.startswith(b"%PDF"):
            raise HomeAssistantError(f"Unexpected document type {ctype}")
        folder = Path(hass.config.path("www", DOMAIN))
        name = f"{secrets.token_urlsafe(16)}.pdf"

        def _write() -> None:
            folder.mkdir(parents=True, exist_ok=True)
            (folder / name).write_bytes(body)

        await hass.async_add_executor_job(_write)
        async_call_later(hass, 600, lambda _now: hass.async_add_executor_job((folder / name).unlink, True))
        return {"url": f"/local/{DOMAIN}/{name}", "invoice_id": inv_id}

    hass.services.async_register(
        DOMAIN,
        "download_invoice",
        download,
        schema=vol.Schema({vol.Required("invoice_id"): str}),
        supports_response=SupportsResponse.ONLY,
    )
