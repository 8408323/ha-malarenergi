"""Mälarenergi (Mitt Mälarenergi) integration."""

from __future__ import annotations

import logging
import secrets
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import voluptuous as vol
from aiohttp import web
from homeassistant.components import persistent_notification, websocket_api
from homeassistant.components.http import KEY_HASS, HomeAssistantView
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
LANGS = ("auto", "en", "sv", "nb", "da", "fi", "is")
DEFAULT_OPTIONS = {
    "language": "auto",
    "notify_targets": [],  # notify.<service> names, e.g. ["mobile_app_phone"]
    "notify_new_invoice": True,
    "notify_overdue": True,
    "notify_han_change": True,
    "notify_auth": True,
    "invoices_per_page": 12,
}


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
            # ~a month of daily values for the chart; the API returns nothing unless `from` is local midnight
            start = min(month0, (now - timedelta(days=31)).replace(hour=0, minute=0, second=0, microsecond=0))
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
                    **{"from": (now - timedelta(days=3650)).strftime("%Y-%m-%d"), "to": now.strftime("%Y-%m-%d")},
                )
            )
            out["han"] = parse.han_ports(await self._get("/api/v2/hanport/{cid}"))
            out["unread"] = parse.unread_inbox(await self._get("/api/v3/customers/{cid}/inbox"))
            out["overdue"] = parse.overdue_invoices(await self._get("/api/v3/dashboard/{cid}/headsup"))
        except AuthError as err:
            await self.notify(
                "notify_auth", "Mälarenergi", "Inloggningen har gått ut. Logga in med BankID igen i Home Assistant."
            )
            raise ConfigEntryAuthFailed(str(err)) from err
        except MalarenergiError as err:
            raise UpdateFailed(str(err)) from err
        prev = self.data or {}
        await self._announce(out["invoices"])
        if prev:
            if (out.get("overdue") or 0) > (prev.get("overdue") or 0):
                await self.notify("notify_overdue", "Mälarenergi", f"{out['overdue']} förfallen faktura/fakturor.")
            elif not out.get("overdue") and prev.get("overdue"):  # paid: drop a fallback alert that's now stale
                persistent_notification.async_dismiss(
                    self.hass, f"{DOMAIN}_{self.config_entry.entry_id}_notify_overdue"
                )
            if prev.get("han") and out.get("han") != prev.get("han"):
                st = ", ".join(v.lower() for v in out["han"].values())
                await self.notify("notify_han_change", "Mälarenergi HAN-port", f"HAN-porten är nu: {st}.")
        return out

    @property
    def options(self) -> dict:
        return {**DEFAULT_OPTIONS, **(self.config_entry.options or {})}

    async def notify(self, kind: str, title: str, message: str, key: str | None = None) -> None:
        """key: set for event-style alerts (one per invoice) so fallback notifications don't overwrite each other."""
        opts = self.options
        if not opts.get(kind):
            return
        targets = [t for t in opts.get("notify_targets") or [] if self.hass.services.has_service("notify", t)]
        for target in targets:
            await self.hass.services.async_call("notify", target, {"title": title, "message": message})
        if not targets:  # enabled but nowhere to send: show it in HA's notification panel instead of dropping it
            nid = f"{DOMAIN}_{self.config_entry.entry_id}_{kind}" + (f"_{key}" if key else "")
            persistent_notification.async_create(self.hass, message, title, nid)

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
                    kind = "Utbetalning" if (inv.get("amount") or 0) < 0 else "Faktura"
                    await self.notify(
                        "notify_new_invoice",
                        "Mälarenergi",
                        f"{kind} {inv.get('period_start', '')[:7]}: {inv.get('amount')} kr, förfaller {inv.get('due_date')}.",
                        key=str(inv["invoice_id"]),
                    )
        await self._store.async_save({"seen": sorted(self._seen)})

    async def series(self, resolution: str, start: datetime, end: datetime) -> dict:
        """Consumption + production series for any period (resolution hour/day/month)."""
        f = self.facility
        out: dict[str, Any] = {}
        for kind in ("CONSUMPTION", "PRODUCTION"):
            mp = f.point(kind) if f else None
            if not mp:
                continue
            out[kind] = parse.series(
                await self._get(
                    "/api/v2/customers/{cid}/infraserviceSeries/el",
                    resolution=resolution,
                    facilityKey=f.key,
                    meteringPointId=mp.id,
                    privateCustomer="true",
                    **{"from": _iso(start), "to": _iso(end)},
                )
            )
        return out

    async def contracts(self) -> list[dict]:
        return parse.contracts(
            await self._get("/api/v2/customers/{cid}/contracts/grouped", includeExpiredContractsLast3Years="true")
        )

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
    if not hass.data.get(f"{DOMAIN}_ws"):
        for cmd in (
            ws_data,
            ws_series,
            ws_contracts,
            ws_settings_get,
            ws_settings_set,
            ws_reauth,
            ws_reauth_status,
            ws_reauth_cancel,
        ):
            websocket_api.async_register_command(hass, cmd)
        hass.data[f"{DOMAIN}_ws"] = True
    from .panel import async_register_panel

    await async_register_panel(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _fetch_pdf(hass: HomeAssistant, inv_id: str) -> bytes:
    entries = [e for e in hass.config_entries.async_entries(DOMAIN) if getattr(e, "runtime_data", None)]
    if not entries:
        raise HomeAssistantError("Mälarenergi is not set up")
    coord: MalarenergiCoordinator = entries[0].runtime_data
    try:
        body, ctype = await coord.client.request(
            "GET", f"/api/v2/customers/{coord.client.customer_id}/invoices/{inv_id}/document", raw=True
        )
    except MalarenergiError as err:
        raise HomeAssistantError(f"Could not download invoice: {err}") from err
    if not body.startswith(b"%PDF"):
        raise HomeAssistantError(f"Unexpected document type {ctype}")
    return body


class InvoicePdfView(HomeAssistantView):
    """Streams one invoice PDF to an authenticated user (or a URL signed with auth/sign_path).

    The panel signs these URLs in advance, so a tap opens a plain link: phones and the HA app block
    window.open() calls that come after an await.
    """

    url = "/api/malarenergi/invoice/{invoice_id}"
    name = "api:malarenergi:invoice"
    requires_auth = True

    async def get(self, request: web.Request, invoice_id: str) -> web.Response:
        if not invoice_id.isdigit():
            return web.Response(status=400)
        try:
            body = await _fetch_pdf(request.app[KEY_HASS], invoice_id)
        except HomeAssistantError as err:
            return web.Response(status=502, text=str(err))
        return web.Response(
            body=body,
            content_type="application/pdf",
            headers={
                "Content-Disposition": f'inline; filename="malarenergi-{invoice_id}.pdf"',
                "Cache-Control": "no-store",
            },
        )


def _register_services(hass: HomeAssistant) -> None:
    if hass.services.has_service(DOMAIN, "download_invoice"):
        return
    hass.http.register_view(InvoicePdfView())

    async def download(call: ServiceCall) -> dict:
        """Save one invoice PDF under a random name in www/ (served unauthenticated), deleted after 10 min.

        For automations/scripts; the panel uses the authenticated InvoicePdfView instead.
        """
        inv_id = call.data["invoice_id"]
        body = await _fetch_pdf(hass, inv_id)
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


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/data"})
@callback
def ws_data(hass, connection, msg):
    """Coordinator data for the dashboard panel."""
    entries = [e for e in hass.config_entries.async_entries(DOMAIN) if getattr(e, "runtime_data", None)]
    coord = entries[0].runtime_data if entries else None
    connection.send_result(
        msg["id"], {"data": coord.data if coord else None, "ok": bool(coord and coord.last_update_success)}
    )


def _coord(hass):
    entries = [e for e in hass.config_entries.async_entries(DOMAIN) if getattr(e, "runtime_data", None)]
    return entries[0].runtime_data if entries else None


@websocket_api.websocket_command(
    {
        vol.Required("type"): "malarenergi/series",
        vol.Required("resolution"): vol.In(["hour", "day", "month"]),
        vol.Required("start"): str,
        vol.Required("end"): str,
    }
)
@websocket_api.async_response
async def ws_series(hass, connection, msg):
    coord = _coord(hass)
    start = dt_util.as_local(dt_util.parse_datetime(msg["start"]))
    end = dt_util.as_local(dt_util.parse_datetime(msg["end"]))
    try:
        connection.send_result(msg["id"], await coord.series(msg["resolution"], start, end))
    except MalarenergiError as err:
        connection.send_error(msg["id"], "api_error", str(err))


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/contracts"})
@websocket_api.async_response
async def ws_contracts(hass, connection, msg):
    try:
        connection.send_result(msg["id"], await _coord(hass).contracts())
    except MalarenergiError as err:
        connection.send_error(msg["id"], "api_error", str(err))


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/settings/get"})
@callback
def ws_settings_get(hass, connection, msg):
    coord = _coord(hass)
    services = sorted(hass.services.async_services().get("notify", {}).keys())
    connection.send_result(
        msg["id"],
        {
            "options": coord.options if coord else DEFAULT_OPTIONS,
            "notify_services": [s for s in services if s not in ("notify", "persistent_notification")],
            "languages": list(LANGS),
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/settings/set", vol.Required("options"): dict})
@websocket_api.require_admin
@callback
def ws_settings_set(hass, connection, msg):
    coord = _coord(hass)
    clean = {k: v for k, v in msg["options"].items() if k in DEFAULT_OPTIONS}
    if "language" in clean and clean["language"] not in LANGS:
        clean.pop("language")
    hass.config_entries.async_update_entry(coord.config_entry, options={**coord.options, **clean})
    connection.send_result(msg["id"], {"options": {**coord.options, **clean}})


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/reauth_status", vol.Required("flow_id"): str})
@websocket_api.require_admin
@callback
def ws_reauth_status(hass, connection, msg):
    """done once the reauth flow has finished; ok if the entry then has working credentials."""
    from homeassistant.data_entry_flow import UnknownFlow

    try:
        hass.config_entries.flow.async_get(msg["flow_id"])
        connection.send_result(msg["id"], {"done": False})
        return
    except UnknownFlow:
        pass
    coord = _coord(hass)
    connection.send_result(msg["id"], {"done": True, "ok": bool(coord and coord.last_update_success)})


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/reauth_cancel", vol.Required("flow_id"): str})
@websocket_api.require_admin
@callback
def ws_reauth_cancel(hass, connection, msg):
    """Abort the reauth flow (its BankID attempt stops polling Mälarenergi)."""
    from homeassistant.data_entry_flow import UnknownFlow

    try:
        hass.config_entries.flow.async_abort(msg["flow_id"])
    except UnknownFlow:
        pass
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/reauth"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_reauth(hass, connection, msg):
    """Start a reauth flow and drive it to its BankID step; returns the login page URL so the panel can
    show it in place (no detour via Settings → Devices & services)."""
    from homeassistant.config_entries import SOURCE_REAUTH

    entry = _coord(hass).config_entry
    res = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_REAUTH, "entry_id": entry.entry_id}, data=dict(entry.data)
    )
    if res.get("step_id") == "reauth_confirm":
        res = await hass.config_entries.flow.async_configure(res["flow_id"], {})
    connection.send_result(msg["id"], {"started": True, "flow_id": res.get("flow_id"), "url": res.get("url")})
