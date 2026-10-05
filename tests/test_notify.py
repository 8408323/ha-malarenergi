"""Coordinator.notify: one failing target must not stop the others; non-device services are skipped."""

import asyncio
import importlib.util
import pathlib
import sys
import types
from unittest.mock import MagicMock

ROOT = pathlib.Path(__file__).parents[1] / "custom_components" / "malarenergi"


def _load():
    for name in (
        "homeassistant",
        "homeassistant.components",
        "homeassistant.components.http",
        "homeassistant.config_entries",
        "homeassistant.core",
        "homeassistant.exceptions",
        "homeassistant.helpers",
        "homeassistant.helpers.aiohttp_client",
        "homeassistant.helpers.event",
        "homeassistant.helpers.storage",
        "homeassistant.helpers.update_coordinator",
        "homeassistant.util",
    ):
        sys.modules.setdefault(name, MagicMock())
    # base classes must be real classes; the coordinator is subscripted (DataUpdateCoordinator[...])
    sys.modules["homeassistant.components.http"].HomeAssistantView = type("HomeAssistantView", (), {})
    sys.modules["homeassistant.helpers.update_coordinator"].DataUpdateCoordinator = type(
        "DataUpdateCoordinator", (), {"__class_getitem__": classmethod(lambda cls, _: cls)}
    )
    pkg = types.ModuleType("me_notify_pkg")
    pkg.__path__ = [str(ROOT)]
    sys.modules["me_notify_pkg"] = pkg
    spec = importlib.util.spec_from_file_location(
        "me_notify_pkg", ROOT / "__init__.py", submodule_search_locations=[str(ROOT)]
    )
    mod = importlib.util.module_from_spec(spec)
    sys.modules["me_notify_pkg"] = mod
    spec.loader.exec_module(mod)
    return mod


def test_notify_survives_a_failing_target():
    mod = _load()
    calls = []

    async def call(domain, service, data, blocking=False):
        calls.append(service)
        if service == "broken":
            raise RuntimeError("boom")

    hass = types.SimpleNamespace(services=types.SimpleNamespace(has_service=lambda d, s: True, async_call=call))
    self = types.SimpleNamespace(
        options={"notify_new_invoice": True, "notify_targets": ["broken", "send_message", "phone"]},
        hass=hass,
        config_entry=types.SimpleNamespace(entry_id="e"),
    )
    mod.persistent_notification = MagicMock()
    asyncio.run(mod.MalarenergiCoordinator.notify(self, "notify_new_invoice", "t", "m"))
    assert calls == ["broken", "phone"]  # send_message skipped, phone still reached after the failure
    mod.persistent_notification.async_create.assert_not_called()

    calls.clear()
    self.options["notify_targets"] = ["broken"]
    asyncio.run(mod.MalarenergiCoordinator.notify(self, "notify_new_invoice", "t", "m"))
    mod.persistent_notification.async_create.assert_called_once()  # nothing delivered: fall back to HA's panel
