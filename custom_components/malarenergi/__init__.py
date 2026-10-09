"""Mälarenergi (Mitt Mälarenergi) integration."""

from __future__ import annotations

import logging
import re
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
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.loader import IntegrationNotFound, async_get_integration
from homeassistant.util import dt as dt_util

from . import parse
from .api import AuthError, MalarenergiClient, MalarenergiError, Tokens
from .const import CONF_TOKENS, DOMAIN, SCAN_MINUTES

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[str] = ["sensor", "switch"]
EVENT_NEW_INVOICE = f"{DOMAIN}_new_invoice"
LANGS = ("auto", "en", "sv", "nb", "da", "fi", "is")
# notify services that aren't a device to send to (send_message needs an entity_id)
NOT_TARGETS = ("notify", "persistent_notification", "send_message")
DEFAULT_OPTIONS = {
    "language": "auto",
    "notify_targets": [],  # notify.<service> names, e.g. ["mobile_app_phone"]
    "notify_new_invoice": True,
    "notify_overdue": True,
    "notify_han_change": True,
    "notify_auth": True,
    "invoices_per_page": 12,
    "show_powerhub": True,  # live card from a PowerHub integration, when one is installed
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
            async_create_auth_issue(self.hass, self.config_entry)
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
        # logged in and fetching again: a fallback "login expired" alert and the repair are stale now
        persistent_notification.async_dismiss(self.hass, f"{DOMAIN}_{self.config_entry.entry_id}_notify_auth")
        ir.async_delete_issue(self.hass, DOMAIN, auth_issue_id(self.config_entry.entry_id))
        return out

    @property
    def options(self) -> dict:
        return {**DEFAULT_OPTIONS, **(self.config_entry.options or {})}

    async def notify(self, kind: str, title: str, message: str, key: str | None = None) -> None:
        """key: set for event-style alerts (one per invoice) so fallback notifications don't overwrite each other."""
        opts = self.options
        if not opts.get(kind):
            return
        targets = [
            t
            for t in opts.get("notify_targets") or []
            if t not in NOT_TARGETS and self.hass.services.has_service("notify", t)
        ]
        sent = 0
        for target in targets:  # one failing target must not stop the rest (or the caller's bookkeeping)
            try:
                await self.hass.services.async_call(
                    "notify", target, {"title": title, "message": message}, blocking=True
                )
                sent += 1
            except Exception as err:  # noqa: BLE001
                _LOGGER.warning("notify.%s failed: %s", target, err)
        if not sent:  # enabled but nowhere to send: show it in HA's notification panel instead of dropping it
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
    # Before the first refresh: if the login already expired at startup that refresh raises, and the
    # repair's Learn more link and the panel's re-login must still work.
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
    coord = MalarenergiCoordinator(hass, entry, client)
    await coord.async_config_entry_first_refresh()
    entry.runtime_data = coord
    _register_services(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


REAUTH_KEY = f"{DOMAIN}_panel_reauth"  # flow_id -> (entry_id, tokens before the login)


def _reauth_entry(hass: HomeAssistant) -> ConfigEntry:
    """The account whose login expired (it has the repair), else the first one."""
    entries = hass.config_entries.async_entries(DOMAIN)
    issues = ir.async_get(hass)
    return next((e for e in entries if issues.async_get_issue(DOMAIN, auth_issue_id(e.entry_id))), entries[0])


def auth_issue_id(entry_id: str) -> str:
    return f"bankid_expired_{entry_id}"


def async_create_auth_issue(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Settings -> Repairs entry for an expired BankID login; Learn more opens the panel, where it's fixed."""
    ir.async_create_issue(
        hass,
        DOMAIN,
        auth_issue_id(entry.entry_id),
        is_fixable=False,
        severity=ir.IssueSeverity.ERROR,  # nothing updates until the login is renewed
        translation_key="bankid_expired",
        translation_placeholders={"title": entry.title},
        # homeassistant:// is the only non-http form the Repairs dialog accepts; it opens the panel in place
        learn_more_url="homeassistant://malarenergi",
    )


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    ir.async_delete_issue(hass, DOMAIN, auth_issue_id(entry.entry_id))


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
        # one opaque path segment (digits today; tolerate alphanumeric/UUID-style ids)
        if not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", invoice_id):
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
    if coord is None:  # setup failed (e.g. the login expired at startup): only re-login works then
        connection.send_error(msg["id"], "not_loaded", "Mälarenergi is not loaded; log in again with BankID")
        return
    start = dt_util.as_local(dt_util.parse_datetime(msg["start"]))
    end = dt_util.as_local(dt_util.parse_datetime(msg["end"]))
    try:
        connection.send_result(msg["id"], await coord.series(msg["resolution"], start, end))
    except MalarenergiError as err:
        connection.send_error(msg["id"], "api_error", str(err))


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/contracts"})
@websocket_api.async_response
async def ws_contracts(hass, connection, msg):
    if (coord := _coord(hass)) is None:
        connection.send_error(msg["id"], "not_loaded", "Mälarenergi is not loaded; log in again with BankID")
        return
    try:
        connection.send_result(msg["id"], await coord.contracts())
    except MalarenergiError as err:
        connection.send_error(msg["id"], "api_error", str(err))


POWERHUB = "malarenergi_powerhub"  # the separate PowerHub integration; the panel can configure it


async def _powerhub_state(hass) -> str:
    """missing / installed (no config entry yet) / configured. Installed is checked first: an entry left
    behind after PowerHub was removed must offer the reinstall, not count as configured."""
    try:
        await async_get_integration(hass, POWERHUB)
    except IntegrationNotFound:
        return "missing"
    return "configured" if hass.config_entries.async_entries(POWERHUB) else "installed"


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/settings/get"})
@websocket_api.async_response
async def ws_settings_get(hass, connection, msg):
    coord = _coord(hass)
    services = sorted(hass.services.async_services().get("notify", {}).keys())
    connection.send_result(
        msg["id"],
        {
            "options": coord.options if coord else DEFAULT_OPTIONS,
            "notify_services": [s for s in services if s not in NOT_TARGETS],
            "languages": list(LANGS),
            "powerhub": await _powerhub_state(hass),
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/settings/set", vol.Required("options"): dict})
@websocket_api.require_admin
@callback
def ws_settings_set(hass, connection, msg):
    coord = _coord(hass)
    if coord is None:  # setup failed (e.g. the login expired at startup): only re-login works then
        connection.send_error(msg["id"], "not_loaded", "Mälarenergi is not loaded; log in again with BankID")
        return
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
    # The flow is gone. It succeeded if it saved new tokens; judged from the entry, not the coordinator,
    # which doesn't exist yet while the reload it triggered is still running.
    started = hass.data.get(REAUTH_KEY, {}).pop(msg["flow_id"], None)
    entry = hass.config_entries.async_get_entry(started[0]) if started else None
    connection.send_result(msg["id"], {"done": True, "ok": bool(entry and entry.data.get(CONF_TOKENS) != started[1])})


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

    # by config entry, not coordinator: when the login expired at startup, setup failed and there's none
    entry = _reauth_entry(hass)
    # HA already opened a reauth flow when the login failed; replace it rather than leave a second one
    flows = hass.config_entries.flow.async_progress_by_handler(
        DOMAIN, match_context={"source": SOURCE_REAUTH, "entry_id": entry.entry_id}
    )
    for flow in flows:
        hass.config_entries.flow.async_abort(flow["flow_id"])
    if flows:
        # HA 2025.x keeps its "reauthentication required" repair after an abort (2026 removes it itself);
        # drop it so it doesn't point at a flow that's gone. Our own repair stays until the login works.
        ir.async_delete_issue(hass, "homeassistant", f"config_entry_reauth_{DOMAIN}_{entry.entry_id}")
    res = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_REAUTH, "entry_id": entry.entry_id}, data=dict(entry.data)
    )
    if res.get("step_id") == "reauth_confirm":
        res = await hass.config_entries.flow.async_configure(res["flow_id"], {})
    if res.get("flow_id"):
        hass.data.setdefault(REAUTH_KEY, {})[res["flow_id"]] = (entry.entry_id, entry.data.get(CONF_TOKENS))
    connection.send_result(msg["id"], {"started": True, "flow_id": res.get("flow_id"), "url": res.get("url")})
