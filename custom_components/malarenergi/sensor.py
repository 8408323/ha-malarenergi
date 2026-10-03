"""Sensors. v0.1: connection status + endpoint health; data sensors follow once payload shapes are mapped."""

from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.const import EntityCategory
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN


async def async_setup_entry(hass, entry, add):
    add([ConnectionSensor(entry.runtime_data, entry)])


class ConnectionSensor(CoordinatorEntity, SensorEntity):
    _attr_has_entity_name = True
    _attr_translation_key = "connection"
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_icon = "mdi:account-check"

    def __init__(self, coord, entry):
        super().__init__(coord)
        self._attr_unique_id = f"{entry.entry_id}_connection"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name="Mälarenergi",
            manufacturer="Mälarenergi",
            entry_type=DeviceEntryType.SERVICE,
        )

    @property
    def native_value(self):
        return "connected" if self.coordinator.last_update_success else "error"

    @property
    def extra_state_attributes(self):
        return {"endpoint_errors": self.coordinator.errors or None}
