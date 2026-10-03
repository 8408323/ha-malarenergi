"""Sensors: consumption/production (yesterday, month), cost & compensation, power peak, invoices, status."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import timedelta
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import EntityCategory, UnitOfElectricCurrent, UnitOfEnergy, UnitOfPower
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .const import DOMAIN


def _local_date(x: str):
    return dt_util.as_local(dt_util.parse_datetime(x)).date()


def _day(data: dict, kind: str, key: str, offset: int) -> float | None:
    """Value for local day today-offset (1 = yesterday)."""
    target = dt_util.now().date() - timedelta(days=offset)
    rows = ((data.get(kind) or {}).get("daily") or {}).get(key) or []
    vals = [v for x, v in rows if _local_date(x) == target]
    return round(sum(vals), 3) if vals else None


def _month(data: dict, kind: str, key: str) -> float | None:
    today = dt_util.now().date()
    rows = ((data.get(kind) or {}).get("daily") or {}).get(key) or []
    vals = [v for x, v in rows if (d := _local_date(x)).year == today.year and d.month == today.month]
    return round(sum(vals), 2) if rows else None


def _latest_day(data: dict, kind: str) -> str | None:
    rows = ((data.get(kind) or {}).get("daily") or {}).get("consumption" if kind == "CONSUMPTION" else "production")
    return _local_date(rows[-1][0]).isoformat() if rows else None


def _latest_invoice(data: dict) -> dict | None:
    inv = data.get("invoices") or []
    return inv[0] if inv else None


@dataclass(frozen=True, kw_only=True)
class MeSensor(SensorEntityDescription):
    value: Callable[[dict], Any]
    attrs: Callable[[dict], dict | None] | None = None


KWH = dict(native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR, device_class=SensorDeviceClass.ENERGY)
SEK = dict(native_unit_of_measurement="SEK", device_class=SensorDeviceClass.MONETARY)

SENSORS: tuple[MeSensor, ...] = (
    MeSensor(
        key="consumption_yesterday",
        **KWH,
        value=lambda d: _day(d, "CONSUMPTION", "consumption", 1),
        attrs=lambda d: {"latest_day": _latest_day(d, "CONSUMPTION")},
    ),
    MeSensor(
        key="consumption_month",
        **KWH,
        state_class=SensorStateClass.TOTAL,
        value=lambda d: _month(d, "CONSUMPTION", "consumption"),
    ),
    MeSensor(
        key="production_yesterday",
        **KWH,
        value=lambda d: _day(d, "PRODUCTION", "production", 1),
        attrs=lambda d: {"latest_day": _latest_day(d, "PRODUCTION")},
    ),
    MeSensor(
        key="production_month",
        **KWH,
        state_class=SensorStateClass.TOTAL,
        value=lambda d: _month(d, "PRODUCTION", "production"),
    ),
    MeSensor(
        key="cost_month",
        **SEK,
        value=lambda d: _month(d, "CONSUMPTION", "cost"),
        attrs=lambda d: {"energy": _month(d, "CONSUMPTION", "costEL"), "grid": _month(d, "CONSUMPTION", "costELEXT")},
    ),
    MeSensor(key="compensation_month", **SEK, value=lambda d: _month(d, "PRODUCTION", "compensation")),
    MeSensor(
        key="peak_power_month",
        native_unit_of_measurement=UnitOfPower.KILO_WATT,
        device_class=SensorDeviceClass.POWER,
        value=lambda d: ((d.get("CONSUMPTION") or {}).get("peak") or {}).get("peakPowerConsumption"),
        attrs=lambda d: {
            k: ((d.get("CONSUMPTION") or {}).get("peak") or {}).get(k)
            for k in ("dateTime", "costExclVat", "peakPowerModel")
        },
    ),
    MeSensor(
        key="latest_invoice",
        **SEK,
        value=lambda d: (_latest_invoice(d) or {}).get("amount"),
        attrs=lambda d: {
            **{k: v for k, v in (_latest_invoice(d) or {}).items()},
            "invoices": (d.get("invoices") or [])[:24],
        },
    ),
    MeSensor(
        key="unpaid_invoices",
        icon="mdi:file-alert",
        state_class=SensorStateClass.MEASUREMENT,
        value=lambda d: sum(1 for i in d.get("invoices") or [] if not i["closed"] and (i["amount"] or 0) > 0),
    ),
    MeSensor(key="overdue_invoices", icon="mdi:file-clock", value=lambda d: d.get("overdue")),
    MeSensor(
        key="fuse_size",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value=lambda d: int("".join(c for c in (d.get("fuse") or "") if c.isdigit()) or 0) or None,
    ),
    MeSensor(
        key="han_port",
        icon="mdi:ethernet",
        device_class=SensorDeviceClass.ENUM,
        options=["open", "closed", "pendingopen", "pendingclose", "unknown"],
        value=lambda d: (next(iter((d.get("han") or {}).values()), "") or "unknown").lower(),
    ),
    MeSensor(key="unread_messages", icon="mdi:email-outline", value=lambda d: d.get("unread")),
)


async def async_setup_entry(hass, entry, add):
    coord = entry.runtime_data
    add([MeEntity(coord, entry, d) for d in SENSORS] + [ConnectionSensor(coord, entry)])


def _device(entry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="Mälarenergi",
        manufacturer="Mälarenergi",
        entry_type=DeviceEntryType.SERVICE,
        configuration_url="https://mitt.malarenergi.se",
    )


class MeEntity(CoordinatorEntity, SensorEntity):
    _attr_has_entity_name = True
    entity_description: MeSensor

    def __init__(self, coord, entry, desc: MeSensor):
        super().__init__(coord)
        self.entity_description = desc
        self._attr_translation_key = desc.key
        self._attr_unique_id = f"{entry.entry_id}_{desc.key}"
        self._attr_device_info = _device(entry)

    @property
    def native_value(self):
        return self.entity_description.value(self.coordinator.data or {})

    @property
    def last_reset(self):
        if self.entity_description.state_class == SensorStateClass.TOTAL:
            return dt_util.start_of_local_day().replace(day=1)
        return None

    @property
    def extra_state_attributes(self):
        f = self.entity_description.attrs
        return f(self.coordinator.data or {}) if f else None


class ConnectionSensor(CoordinatorEntity, SensorEntity):
    _attr_has_entity_name = True
    _attr_translation_key = "connection"
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_icon = "mdi:account-check"

    def __init__(self, coord, entry):
        super().__init__(coord)
        self._attr_unique_id = f"{entry.entry_id}_connection"
        self._attr_device_info = _device(entry)

    @property
    def native_value(self):
        return "connected" if self.coordinator.last_update_success else "error"

    @property
    def available(self) -> bool:
        return True
