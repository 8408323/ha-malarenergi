"""BankID on the same device: autostart token, app links, the login page's state and the config flow step."""

import asyncio
import importlib.util
import pathlib
import re
import sys
import types
from unittest.mock import MagicMock

import pytest

ROOT = pathlib.Path(__file__).parents[1] / "custom_components" / "malarenergi"
PKG = "me_bankid_pkg"


class _ConfigFlow:
    def __init_subclass__(cls, domain=None, **kw):
        super().__init_subclass__(**kw)


def _load(name: str):
    for mod in (
        "homeassistant",
        "homeassistant.components",
        "homeassistant.components.http",
        "homeassistant.config_entries",
        "homeassistant.core",
        "homeassistant.helpers",
        "homeassistant.helpers.aiohttp_client",
    ):
        sys.modules.setdefault(mod, MagicMock())
    sys.modules["homeassistant.components.http"].HomeAssistantView = type("HomeAssistantView", (), {})
    sys.modules["homeassistant.config_entries"].ConfigFlow = _ConfigFlow
    if PKG not in sys.modules:
        pkg = types.ModuleType(PKG)
        pkg.__path__ = [str(ROOT)]
        sys.modules[PKG] = pkg
    full = f"{PKG}.{name}"
    if full not in sys.modules:
        spec = importlib.util.spec_from_file_location(full, ROOT / f"{name}.py")
        mod = importlib.util.module_from_spec(spec)
        sys.modules[full] = mod
        spec.loader.exec_module(mod)
    return sys.modules[full]


def test_autostart_token_and_app_links():
    api = _load("api")
    url = "bankid:///?autostarttoken=29b729bf-9521-4e81-9dc4-7b6e26261c00&redirect=null"
    tok = api.autostart_token(url)
    assert tok == "29b729bf-9521-4e81-9dc4-7b6e26261c00"
    assert api.autostart_token("") == "" and api.autostart_token("bankid:///?redirect=null") == ""
    assert api.bankid_app_url(tok) == f"https://app.bankid.com/?autostarttoken={tok}&redirect=null"
    assert api.bankid_app_url(tok, legacy=True) == f"bankid:///?autostarttoken={tok}&redirect=null"


LOGIN_FORM = (
    '<input name="__RequestVerificationToken" type="hidden" value="csrf" />'
    '<input type="hidden" id="ReturnUrl" name="ReturnUrl" value="/connect/authorize/callback?x=1" />'
)
ORDER_PAGE = (
    '<input type="hidden" id="AMRSelected" value="0" />'
    '<input type="hidden" id="LoginOrderRef" value="ref-1" />'
    '<input type="hidden" id="ReturnUrl" value="/connect/authorize/callback?x=1" />'
    '<input type="hidden" id="AutoStartAppUrl" value="bankid:///?autostarttoken=tok-1&amp;redirect=null" />'
    '<input type="hidden" id="QrCode" value="UVI=" />'
    '<input type="hidden" id="QrCodeStartState" value="qrstate" />'
)


class _Resp:
    def __init__(self, body):
        self.body, self.status = body, 200

    async def __aenter__(self):
        return self

    async def __aexit__(self, *exc):
        return False

    async def text(self):
        return self.body

    async def json(self, content_type=None):
        return self.body


class _Session:
    """Mitt Mälarenergi's login pages (aioresponses can't mock this aiohttp version)."""

    def __init__(self):
        self.sent = []

    def get(self, url, **kw):
        assert url.startswith("https://identity.malarenergi.se/connect/authorize?")
        return _Resp(LOGIN_FORM)

    def post(self, url, **kw):
        self.sent.append((url, kw))
        if url.endswith("/BankID/Login"):
            return _Resp(ORDER_PAGE)
        assert url.endswith("/BankID/Collect")
        return _Resp({"status": "failed", "hintCode": "startFailed", "message": "Starta BankID-appen."})

    async def close(self):
        pass


async def test_one_order_has_both_the_qr_and_the_autostart_token():
    api = _load("api")
    session = _Session()
    login = api.BankIDLogin(lambda: session)
    await login.start()
    assert session.sent[0][1]["data"]["button"] == "loginMobileBankIDOtherDevice"
    assert login.status == "pending"
    assert login.qr_png_b64 == "UVI="
    assert login.autostart_token == "tok-1"
    assert await login.collect() is None
    assert session.sent[1][1]["json"]["orderRef"] == "ref-1"
    assert (login.status, login.hint_code) == ("failed", "startFailed")


class _FakeLogin:
    """Two orders: the first times out unscanned (startFailed), the second is signed."""

    made = []

    def __init__(self, factory):
        self.n = len(_FakeLogin.made) + 1
        _FakeLogin.made.append(self)
        self.status, self.message, self.hint_code, self.qr_png_b64 = "starting", "", "", "QR"
        self.autostart_token = ""

    async def start(self, this_device=False):
        self.status, self.autostart_token = "pending", f"tok-{self.n}"

    async def collect(self):
        if self.n == 1:
            self.status, self.hint_code, self.message = "failed", "startFailed", "Starta BankID-appen."
            return None
        self.status = "complete"
        return "/connect/authorize/callback?x=1"

    async def finish(self, url):
        return "tokens"

    async def close(self):
        pass


def _hass():
    flow = types.SimpleNamespace(calls=[])

    async def configure(flow_id, data):
        flow.calls.append((flow_id, data))

    flow.async_configure = configure
    return types.SimpleNamespace(config_entries=types.SimpleNamespace(flow=flow), data={})


async def test_attempt_renews_an_expired_order_and_its_app_link(monkeypatch):
    view = _load("bankid_view")
    _FakeLogin.made = []
    monkeypatch.setattr(view, "BankIDLogin", _FakeLogin)
    real_sleep = asyncio.sleep
    monkeypatch.setattr(view.asyncio, "sleep", lambda s: real_sleep(0))
    hass = _hass()
    att = view.LoginAttempt(hass, "flow-1")
    assert att.app_url() == "" and not att.done  # no order yet
    view.ATTEMPTS[att.key] = att
    await att._run()
    assert len(_FakeLogin.made) == 2  # unscanned order replaced instead of failing the login
    assert att.status == "complete" and att.tokens == "tokens" and att.done
    assert hass.config_entries.flow.calls == [("flow-1", {"done": True})]
    assert att.key not in view.ATTEMPTS


def test_page_state_and_open_redirect_follow_the_current_order():
    view = _load("bankid_view")
    att = view.LoginAttempt(_hass(), "flow-1")
    att._login = types.SimpleNamespace(autostart_token="tok-9", qr_png_b64="QR")
    att.status = "pending"
    st = att.state()
    assert st["app_url"] == "https://app.bankid.com/?autostarttoken=tok-9&redirect=null"
    assert st["app_url_legacy"] == "bankid:///?autostarttoken=tok-9&redirect=null"
    assert st["qr"] == "QR"

    view.ATTEMPTS[att.key] = att
    try:
        r = asyncio.run(view.BankIDOpenView().get(None, att.key))
        assert r.status == 302 and r.headers["Location"] == st["app_url"]
        att.status = "complete"  # order gone: back to the page, which shows what happened
        r = asyncio.run(view.BankIDOpenView().get(None, att.key))
        assert r.headers["Location"] == att.url
    finally:
        view.ATTEMPTS.pop(att.key, None)
    r = asyncio.run(view.BankIDOpenView().get(None, "unknown"))
    assert r.headers["Location"] == f"{view.PATH}/unknown"


def test_dialog_links_open_in_the_browser_not_inside_the_ha_app():
    view = _load("bankid_view")
    att = view.LoginAttempt(_hass(), "flow-1")
    links = view.bankid_links(att)
    assert links["open_app"] == f'<a href="{att.open_url}" target="_blank">'
    assert links["open_page"] == f'<a href="{att.url}" target="_blank">'
    assert links["end"] == "</a>"
    for lang in ("sv", "en"):
        import json

        text = json.loads((ROOT / "translations" / f"{lang}.json").read_text())["config"]["step"]["bankid"]
        assert {"{open_app}", "{open_page}", "{end}"} <= set(re.findall(r"\{\w+\}", text["description"]))


@pytest.fixture
def flow(monkeypatch):
    cf = _load("config_flow")

    class Attempt:
        def __init__(self, hass, flow_id):
            self.url, self.open_url, self.status = "/api/malarenergi/bankid/k", "/api/malarenergi/bankid/k/open", "x"

        def start(self):
            self.status = "pending"

        @property
        def done(self):
            return self.status in ("complete", "error")

    monkeypatch.setattr(cf, "LoginAttempt", Attempt)
    f = cf.MalarenergiConfigFlow()
    f.hass = types.SimpleNamespace(data={cf._VIEWS_REGISTERED: True})
    f.flow_id = "flow-1"
    f.async_external_step = lambda **kw: ("external", kw)
    f.async_external_step_done = lambda **kw: ("done", kw)
    return f


async def test_bankid_step_links_to_the_app_and_waits_while_pending(flow):
    kind, kw = await flow.async_step_bankid()
    assert kind == "external" and kw["url"] == "/api/malarenergi/bankid/k"
    assert 'href="/api/malarenergi/bankid/k/open"' in kw["description_placeholders"]["open_app"]
    # the frontend fetching the flow (e.g. back from the BankID app) re-runs the step: still waiting
    assert (await flow.async_step_bankid())[0] == "external"
    assert (await flow.async_step_bankid({"done": True})) == ("done", {"next_step_id": "finish"})


async def test_bankid_step_is_done_once_the_attempt_ended(flow):
    await flow.async_step_bankid()
    flow._attempt.status = "complete"
    assert (await flow.async_step_bankid())[0] == "done"
