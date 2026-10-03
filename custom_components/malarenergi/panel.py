"""Serve the dashboard (frontend/ built to www/) as a sidebar panel."""

from pathlib import Path

from homeassistant.components import panel_custom
from homeassistant.components.http import StaticPathConfig

WWW = Path(__file__).parent / "www"
URL = "/malarenergi_static"
KEY = "malarenergi_panel"


async def async_register_panel(hass) -> None:
    if hass.data.get(KEY) or not (WWW / "panel.js").exists():
        return
    hass.data[KEY] = True
    await hass.http.async_register_static_paths([StaticPathConfig(URL, str(WWW), cache_headers=False)])
    v = int((WWW / "panel.js").stat().st_mtime)
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="malarenergi-panel",
        frontend_url_path="malarenergi",
        module_url=f"{URL}/panel.js?v={v}",
        sidebar_title="Mälarenergi",
        sidebar_icon="mdi:transmission-tower",
        require_admin=False,
        config={},
    )
