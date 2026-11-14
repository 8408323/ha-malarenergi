"""BankID login page for the config flow's external step (and the panel's re-login dialog).

The page offers both ways to sign the same BankID order: a button that opens the BankID app on this
device (phone, tablet or a computer with BankID installed) and the animated QR code (new frame every
second, which a static config-flow image can't show) for signing with BankID on another device.

It is unauthenticated (the popup has no HA token) and keyed by a random per-attempt token; it only
exists while a login is pending. ``/open`` redirects to the BankID app for the current order, so the
config-flow dialog can link to it even though the order (and its autostart token) is renewed.
"""

from __future__ import annotations

import asyncio
import logging
import secrets
from typing import Any

import aiohttp
from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .api import UA, BankIDLogin, MalarenergiError, Tokens, bankid_app_url

_LOGGER = logging.getLogger(__name__)
PATH = "/api/malarenergi/bankid"
ATTEMPTS: dict[str, LoginAttempt] = {}
MAX_SECONDS = 8 * 60
# BankID hint codes of an order nobody acted on in time: start a new one instead of failing
RENEW_HINTS = ("startFailed", "expiredTransaction")

PAGE = """<!doctype html><html lang=sv><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Mälarenergi – BankID</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.5 system-ui,sans-serif;background:#0f1724;color:#e8eef6}
.c{text-align:center;padding:24px 20px;max-width:360px}h2{margin:0 0 16px}
.w{display:flex;flex-direction:column;gap:14px}.mob #same{order:-1}
section{background:#16202f;border-radius:16px;padding:16px}.lbl{margin:0 0 10px;font-weight:600}
img{width:220px;height:220px;background:#fff;padding:12px;border-radius:14px}
a.b{display:block;padding:14px 18px;border-radius:12px;background:#1f6feb;color:#fff;text-decoration:none;font-weight:600;font-size:17px}
a.b.off{opacity:.45;pointer-events:none}a.l{color:#9fc3ff}
.m{opacity:.8;font-size:14px;margin:8px 0 0}.ok{color:#3fb950;font-size:22px}
.live{display:inline-block;width:8px;height:8px;border-radius:50%;background:#3fb950;margin-right:6px;animation:p 1s infinite}
@keyframes p{50%{opacity:.2}}.dead img,.dead a.b{opacity:.15;pointer-events:none}#s{min-height:42px}</style>
<div class=c><h2 id=h></h2>
<div class=w id=w>
<section id=other><p class=lbl id=o-t></p><img id=q alt="BankID QR"><p class=m id=l><span class=live></span><span id=l-t></span></p></section>
<section id=same><a class="b off" id=a href="#" target=_blank rel=noopener></a>
<p class=m><span id=alt-t></span> <a class=l id=a2 href="#" target=_top></a></p></section>
</div>
<p class=m id=s></p></div>
<script>
const base=location.pathname, $=(i)=>document.getElementById(i);
const sv=/^(sv|nb|nn|no|da)/i.test(navigator.language||'sv');
const T=sv?{h:'Logga in med BankID',open:'Öppna BankID på den här enheten',alt:'Öppnas inte appen?',alt2:'Prova den här länken',
  other:'BankID på en annan enhet: skanna QR-koden',live:'QR-koden uppdateras varje sekund',
  hint:'Tryck på knappen för att öppna BankID här, eller skanna QR-koden med BankID på en annan enhet.',
  ok:'✓ Inloggad',close:'Du kan stänga fönstret och gå tillbaka till Home Assistant.',
  gone:'Den här inloggningen är avslutad. Stäng fönstret och starta om i Home Assistant.',fail:'Inloggningen misslyckades.'}
 :{h:'Log in with BankID',open:'Open BankID on this device',alt:"The app doesn't open?",alt2:'Try this link',
  other:'BankID on another device: scan the QR code',live:'The QR code updates every second',
  hint:'Tap the button to open BankID here, or scan the QR code with BankID on another device.',
  ok:'✓ Logged in',close:'You can close this window and go back to Home Assistant.',
  gone:'This login has ended. Close the window and start again in Home Assistant.',fail:'The login failed.'};
document.documentElement.lang=sv?'sv':'en';
$('h').textContent=T.h; $('a').textContent=T.open; $('alt-t').textContent=T.alt; $('a2').textContent=T.alt2;
$('o-t').textContent=T.other; $('l-t').textContent=T.live;
// phones and tablets (iPadOS reports a Mac, but has touch): the BankID button first, QR below
if(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform))) $('w').classList.add('mob');
function end(){ document.querySelector('.c').classList.add('dead'); $('l').textContent=''; }
async function tick(){
  let r; try{ r=await (await fetch(base+'/state',{cache:'no-store'})).json(); }catch(e){ setTimeout(tick,1500); return; }
  if(r.qr) $('q').src='data:image/png;base64,'+r.qr;
  // Universal link: works from frames, the HA companion app and mobile browsers, where a bankid:/// link is
  // often silently ignored; bankid:/// stays as the fallback. redirect=null: the user switches back themselves.
  if(r.app_url){ $('a').href=r.app_url; $('a').classList.remove('off'); $('a2').href=r.app_url_legacy; }
  // Mälarenergi's hints only mention the QR code; this page offers both ways
  $('s').textContent=(!r.message||/QR/i.test(r.message))?T.hint:r.message;
  if(r.status==='complete'){ document.querySelector('.c').innerHTML='<p class=ok></p><p></p>';
    document.querySelector('.ok').textContent=T.ok; document.querySelector('.ok+p').textContent=T.close;
    if(parent!==window) parent.postMessage({malarenergi:'bankid-complete'}, location.origin);  // shown inside the panel
    setTimeout(()=>window.close(),1500); return; }
  if(r.status==='gone'){ end(); $('s').textContent=T.gone; return; }
  if(r.status==='error'){ end(); $('s').textContent=r.message||T.fail; return; }
  setTimeout(tick,700);
}
tick();
</script></html>"""


def bankid_links(attempt: LoginAttempt) -> dict[str, str]:
    """description_placeholders of the config flow's BankID step: {open_app}text{end}, {open_page}text{end}.

    Raw <a target=_blank> rather than Markdown links: the HA frontend routes a same-origin Markdown link
    inside its own app (which has no such page), while a link with a target is left to the browser or the
    companion app. Translations can't contain HTML or URLs, so the tags come in as placeholders.
    """
    return {
        "open_app": f'<a href="{attempt.open_url}" target="_blank">',
        "open_page": f'<a href="{attempt.url}" target="_blank">',
        "end": "</a>",
    }


class LoginAttempt:
    """Runs a BankID login in the background; restarts the order when BankID times it out (30 s)."""

    def __init__(self, hass: HomeAssistant, flow_id: str) -> None:
        self.hass = hass
        self.flow_id = flow_id
        self.key = secrets.token_urlsafe(24)
        self.status = "starting"
        self.message = ""
        self.tokens: Tokens | None = None
        self._login: BankIDLogin | None = None
        self._task: asyncio.Task | None = None
        self._qr_at = 0.0
        self._cancelled = False

    @property
    def url(self) -> str:
        return f"{PATH}/{self.key}"

    @property
    def open_url(self) -> str:
        """Opens the BankID app on the device that follows it (redirects to the current order's link)."""
        return f"{PATH}/{self.key}/open"

    @property
    def done(self) -> bool:
        return self.status in ("complete", "error")

    def app_url(self, *, legacy: bool = False) -> str:
        """Link that opens the BankID app for the current order ("" until one has started)."""
        token = self._login.autostart_token if self._login and self.status == "pending" else ""
        return bankid_app_url(token, legacy=legacy) if token else ""

    def state(self) -> dict[str, Any]:
        lg = self._login
        return {
            "status": self.status,
            "message": self.message,
            "qr": lg.qr_png_b64 if lg else "",
            "app_url": self.app_url(),
            "app_url_legacy": self.app_url(legacy=True),
        }

    def start(self) -> None:
        ATTEMPTS[self.key] = self
        self._task = self.hass.async_create_background_task(self._run(), "malarenergi_bankid")

    async def _new_order(self) -> None:
        if self._login:
            await self._login.close()
        self._login = BankIDLogin(lambda: aiohttp.ClientSession(headers={"User-Agent": UA}))
        await self._login.start()

    async def fresh_qr(self) -> None:
        """Called by the page's poll: fetch the current animated-QR frame (max ~1/s)."""
        loop = asyncio.get_running_loop()
        if self._login and self.status == "pending" and loop.time() - self._qr_at > 0.8:
            self._qr_at = loop.time()
            try:
                await self._login.refresh_qr()
            except aiohttp.ClientError:
                pass

    async def _run(self) -> None:
        loop = asyncio.get_running_loop()
        deadline = loop.time() + MAX_SECONDS
        try:
            await self._new_order()
            self.status = "pending"
            while loop.time() < deadline:
                url = await self._login.collect()
                self.message = self._login.message
                if url:
                    self.tokens = await self._login.finish(url)
                    self.status = "complete"
                    break
                if self._login.status == "failed":
                    if self._login.hint_code in RENEW_HINTS or "QR" in self.message:
                        await self._new_order()  # nobody scanned or opened the app in time -> fresh order
                        self.status = "pending"
                    else:
                        raise MalarenergiError(self.message or "BankID failed")
                await asyncio.sleep(2)
            else:
                raise MalarenergiError("Tiden gick ut. Starta inloggningen igen i Home Assistant.")
        except Exception as err:  # noqa: BLE001 - shown to the user, flow gets an error
            _LOGGER.debug("BankID login failed: %s", err)
            self.status = "error"
            self.message = str(err)
        finally:
            if self._login:
                await self._login.close()
            if not self._cancelled:  # a cancelled attempt's flow is already gone
                await asyncio.sleep(5)  # let the page show the final state
                ATTEMPTS.pop(self.key, None)
                await self.hass.config_entries.flow.async_configure(self.flow_id, {"done": True})

    def cancel(self) -> None:
        self._cancelled = True  # the flow is being removed: _run must not configure it afterwards
        if self._task and not self._task.done():
            self._task.cancel()
        ATTEMPTS.pop(self.key, None)


class BankIDPageView(HomeAssistantView):
    url = PATH + "/{key}"
    name = "api:malarenergi:bankid"
    requires_auth = False

    async def get(self, request: web.Request, key: str) -> web.Response:
        return web.Response(text=PAGE, content_type="text/html", headers={"Cache-Control": "no-store"})


class BankIDOpenView(HomeAssistantView):
    """Redirect to the BankID app for the attempt's current order (its autostart token changes on renewal)."""

    url = PATH + "/{key}/open"
    name = "api:malarenergi:bankid:open"
    requires_auth = False

    async def get(self, request: web.Request, key: str) -> web.Response:
        att = ATTEMPTS.get(key)
        target = att.app_url() if att else ""
        # no order (yet, or any more): the login page explains the state and has the button when there is one
        return web.Response(status=302, headers={"Location": target or f"{PATH}/{key}", "Cache-Control": "no-store"})


class BankIDStateView(HomeAssistantView):
    url = PATH + "/{key}/state"
    name = "api:malarenergi:bankid:state"
    requires_auth = False

    async def get(self, request: web.Request, key: str) -> web.Response:
        att = ATTEMPTS.get(key)
        if att is None:
            return web.json_response({"status": "gone"}, headers={"Cache-Control": "no-store"})
        await att.fresh_qr()
        return web.json_response(att.state(), headers={"Cache-Control": "no-store"})
