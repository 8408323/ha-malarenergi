"""HAN port on/off. Closing it stops local meter readers (e.g. Mälarenergi PowerHub, Tibber Pulse)."""

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .sensor import _device


async def async_setup_entry(hass, entry, add):
    coord = entry.runtime_data
    add([HanPortSwitch(coord, entry, point) for point in (coord.data or {}).get("han", {})])


class HanPortSwitch(CoordinatorEntity, SwitchEntity):
    _attr_has_entity_name = True
    _attr_translation_key = "han_port"
    _attr_icon = "mdi:ethernet"

    def __init__(self, coord, entry, point: str):
        super().__init__(coord)
        self._point = point
        self._attr_unique_id = f"{entry.entry_id}_han_{point[-6:]}"
        self._attr_device_info = _device(entry)

    @property
    def _status(self) -> str:
        return ((self.coordinator.data or {}).get("han") or {}).get(self._point, "")

    @property
    def is_on(self) -> bool | None:
        s = self._status
        return None if not s else s in ("OPEN", "PENDINGOPEN")

    @property
    def extra_state_attributes(self):
        return {"status": self._status}

    async def async_turn_on(self, **kwargs) -> None:
        await self.coordinator.set_han(self._point, True)

    async def async_turn_off(self, **kwargs) -> None:
        await self.coordinator.set_han(self._point, False)
