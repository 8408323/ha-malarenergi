"""Mälarenergi (Mitt Mälarenergi) integration."""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AuthError, MalarenergiClient, MalarenergiError, Tokens
from .const import CONF_TOKENS, DOMAIN, SCAN_MINUTES

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[str] = ["sensor"]

# key -> (path template, api version). {c} = /customers/{id}
ENDPOINTS: dict[str, str] = {
    "account": "/api/v2/account",
    "customer": "/api/v2/customers/{cid}",
    "facilities": "/api/v2/customers/{cid}/facilities",
    "contracts": "/api/v2/customers/{cid}/contracts/grouped",
    "invoices": "/api/v3/customers/{cid}/invoices",
    "meterinformation": "/api/v3/customers/{cid}/metervalues/meterinformation",
    "infraservice_el": "/api/v2/customers/{cid}/infraserviceSeries/el",
    "costdetails_el": "/api/v2/customers/{cid}/infraserviceSeries/EL/costdetails",
    "peak_power_cost": "/api/v2/customers/{cid}/metervalues/peakPowerCost",
    "peak_power_daily": "/api/v2/customers/{cid}/metervalues/peakPowerDailyOverview",
    "messages": "/api/v2/messages",
}


class MalarenergiCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, client: MalarenergiClient) -> None:
        super().__init__(
            hass, _LOGGER, name=DOMAIN, update_interval=timedelta(minutes=SCAN_MINUTES), config_entry=entry
        )
        self.client = client
        self.errors: dict[str, str] = {}

    async def _async_update_data(self) -> dict[str, Any]:
        out: dict[str, Any] = {}
        self.errors = {}
        try:
            out["account"] = await self.client.account()
            cid = self.client.customer_id
            for key, path in ENDPOINTS.items():
                if key == "account":
                    continue
                try:
                    out[key] = await self.client.get(path.format(cid=cid))
                except MalarenergiError as err:  # one endpoint may need params we don't send yet
                    self.errors[key] = str(err)
        except AuthError as err:
            raise ConfigEntryAuthFailed(str(err)) from err
        except MalarenergiError as err:
            raise UpdateFailed(str(err)) from err
        return out


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
    if not hass.data.get(f"{DOMAIN}_ws"):
        websocket_api.async_register_command(hass, ws_shapes)
        hass.data[f"{DOMAIN}_ws"] = True
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


def shape(v: Any, depth: int = 0) -> Any:
    """Structure without personal values: keys, types, list lengths; short enum-like strings kept."""
    if depth > 6:
        return "…"
    if isinstance(v, list):
        return [shape(v[0], depth + 1), f"len={len(v)}"] if v else []
    if isinstance(v, dict):
        return {k: shape(x, depth + 1) for k, x in list(v.items())[:60]}
    if isinstance(v, str):
        if len(v) >= 10 and v[4:5] == "-" and v[:4].isdigit():
            return "date:" + v[:19]
        return f"str:{v}" if len(v) <= 14 and not any(c.isdigit() for c in v) else "str"
    if isinstance(v, (int, float)) and not isinstance(v, bool):
        return type(v).__name__
    return v


@websocket_api.websocket_command({vol.Required("type"): "malarenergi/shapes"})
@websocket_api.require_admin
@callback
def ws_shapes(hass, connection, msg):
    entries = hass.config_entries.async_entries(DOMAIN)
    coord: MalarenergiCoordinator = entries[0].runtime_data if entries else None
    connection.send_result(
        msg["id"], {"data": shape(coord.data) if coord else None, "errors": coord.errors if coord else None}
    )
