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
        "homeassistant.loader",
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


def test_powerhub_state():
    mod = _load()

    class NotFound(Exception):
        pass

    mod.IntegrationNotFound = NotFound

    def hass(entries):
        return types.SimpleNamespace(config_entries=types.SimpleNamespace(async_entries=lambda d: entries))

    async def found(h, d):
        return object()

    async def gone(h, d):
        raise NotFound(d)

    mod.async_get_integration = gone
    assert asyncio.run(mod._powerhub_state(hass([]))) == "missing"
    mod.async_get_integration = found
    assert asyncio.run(mod._powerhub_state(hass([]))) == "installed"
    assert asyncio.run(mod._powerhub_state(hass(["entry"]))) == "configured"
    mod.async_get_integration = gone
    assert asyncio.run(mod._powerhub_state(hass(["entry"]))) == "missing"  # stale entry after uninstall


def test_auth_issue_links_to_the_panel_and_is_removed_with_the_entry():
    mod = _load()
    mod.ir = MagicMock()
    entry = types.SimpleNamespace(entry_id="e1", title="Mälarenergi")
    mod.async_create_auth_issue("hass", entry)
    args, kwargs = mod.ir.async_create_issue.call_args
    assert args[1:] == ("malarenergi", "bankid_expired_e1")
    assert kwargs["learn_more_url"] == "homeassistant://malarenergi"
    assert kwargs["severity"] == mod.ir.IssueSeverity.ERROR
    assert kwargs["translation_key"] == "bankid_expired"

    asyncio.run(mod.async_remove_entry("hass", entry))
    mod.ir.async_delete_issue.assert_called_once_with("hass", "malarenergi", "bankid_expired_e1")


def test_panel_commands_answer_cleanly_when_setup_failed():
    # the login expired at startup: no coordinator, but the panel is registered and must not crash
    comps = sys.modules.setdefault("homeassistant.components", MagicMock())
    ws = comps.websocket_api
    ws.websocket_command = lambda schema: lambda f: f  # real handlers instead of mocks
    ws.async_response = ws.require_admin = lambda f: f
    sys.modules.setdefault("homeassistant.core", MagicMock()).callback = lambda f: f
    mod = _load()
    hass = types.SimpleNamespace(config_entries=types.SimpleNamespace(async_entries=lambda d: []))
    for handler in (mod.ws_contracts, mod.ws_series):
        conn = MagicMock()
        asyncio.run(handler(hass, conn, {"id": 1}))
        assert conn.send_error.call_args.args[1] == "not_loaded"
    conn = MagicMock()
    mod.ws_settings_set(hass, conn, {"id": 2, "options": {}})
    assert conn.send_error.call_args.args[1] == "not_loaded"


def test_reauth_targets_the_account_with_the_expired_login():
    mod = _load()
    mod.ir = MagicMock()
    a, b = types.SimpleNamespace(entry_id="a"), types.SimpleNamespace(entry_id="b")
    hass = types.SimpleNamespace(config_entries=types.SimpleNamespace(async_entries=lambda d: [a, b]))
    mod.ir.async_get.return_value.async_get_issue.side_effect = lambda d, i: i == "bankid_expired_b"
    assert mod._reauth_entry(hass) is b
    mod.ir.async_get.return_value.async_get_issue.side_effect = lambda d, i: False
    assert mod._reauth_entry(hass) is a
