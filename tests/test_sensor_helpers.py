"""Invoice-line sensor helpers, loaded without Home Assistant (its imports are stubbed)."""

import importlib.util
import pathlib
import sys
import types
from unittest.mock import MagicMock


def _load():
    for name in (
        "homeassistant",
        "homeassistant.components",
        "homeassistant.components.sensor",
        "homeassistant.const",
        "homeassistant.helpers",
        "homeassistant.helpers.device_registry",
        "homeassistant.helpers.update_coordinator",
        "homeassistant.util",
    ):
        sys.modules.setdefault(name, MagicMock())
    from dataclasses import dataclass
    from typing import Any

    @dataclass(frozen=True, kw_only=True)
    class SensorEntityDescription:  # just the fields sensor.py passes
        key: str
        native_unit_of_measurement: Any = None
        device_class: Any = None
        state_class: Any = None
        icon: Any = None
        entity_category: Any = None
        options: Any = None

    sys.modules["homeassistant.components.sensor"].SensorEntityDescription = SensorEntityDescription
    # entity base classes must be real classes (two MagicMocks as bases clash on their metaclass)
    sys.modules["homeassistant.components.sensor"].SensorEntity = type("SensorEntity", (), {})
    sys.modules["homeassistant.helpers.update_coordinator"].CoordinatorEntity = type("CoordinatorEntity", (), {})
    pkg = types.ModuleType("me_pkg")
    pkg.__path__ = []
    sys.modules["me_pkg"] = pkg
    sys.modules["me_pkg.const"] = types.SimpleNamespace(DOMAIN="malarenergi")
    p = pathlib.Path(__file__).parents[1] / "custom_components/malarenergi/sensor.py"
    spec = importlib.util.spec_from_file_location("me_pkg.sensor", p)
    mod = importlib.util.module_from_spec(spec)
    sys.modules["me_pkg.sensor"] = mod  # dataclasses look the module up while building MeSensor
    spec.loader.exec_module(mod)
    return mod


sensor = _load()

LINE = lambda cat, amount, kwh=0, name=None: {"category": cat, "name": name or cat, "kwh": kwh, "amount": amount}  # noqa: E731

DATA = {
    "invoices": [  # newest first
        {"kind": "consumption", "period_start": "2026-09-01", "lines": [LINE("broadband", 40.0)]},
        {
            "kind": "consumption",  # mixed: production credit netted into a positive invoice
            "period_start": "2026-08-01",
            "lines": [LINE("grid_transfer", 2.7, 5, "El Rörl Avg"), LINE("production_spot", -900.0, 1417)],
        },
    ]
}


def test_category_sensors_skip_invoices_without_that_category():
    assert sensor._line_sum(DATA, ("grid_transfer",)) == 2.7  # not 0 from the broadband-only invoice
    assert sensor._line_rate(DATA, "grid_transfer") == 0.54


def test_production_payout_found_in_mixed_invoice():
    assert sensor._line_sum(DATA, sensor.PRODUCTION) == -900.0


def test_production_attrs_only_production_part():
    a = sensor._production_attrs(DATA)
    assert a["kwh"] == 1417 and [x["category"] for x in a["lines"]] == ["production_spot"]


def test_consumption_total_from_consumption_lines():
    # the mixed August invoice: consumption part 2.7 kr, production credit not netted in;
    # the newer broadband-only invoice (40 kr) is the latest with consumption lines
    assert sensor._consumption_total(DATA) == 40.0
    mixed = {"invoices": DATA["invoices"][1:]}
    assert sensor._consumption_total(mixed) == 2.7


def test_zero_payout_stays_available():
    d = {
        "invoices": [{"kind": "production", "period_start": "2026-09-01", "lines": [LINE("production_spot", 0.0, 10)]}]
    }
    desc = next(x for x in sensor.SENSORS if x.key == "invoice_production_total")
    assert desc.value(d) == 0.0
