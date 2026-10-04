"""Live BankID QR page for the config flow's external step.

The QR is animated (new frame every second), which a static config-flow image can't show, so the
flow opens this page in a new window. It is unauthenticated (the popup has no HA token) and keyed
by a random per-attempt token; it only exists while a login is pending.
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

from .api import UA, BankIDLogin, MalarenergiError, Tokens

_LOGGER = logging.getLogger(__name__)
PATH = "/api/malarenergi/bankid"
ATTEMPTS: dict[str, LoginAttempt] = {}
MAX_SECONDS = 8 * 60

PAGE = """<!doctype html><html lang=sv><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Mälarenergi – BankID</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.5 system-ui,sans-serif;background:#0f1724;color:#e8eef6}
.c{text-align:center;padding:28px;max-width:360px}img{width:260px;height:260px;background:#fff;padding:14px;border-radius:16px}
a.b{display:inline-block;margin-top:16px;padding:12px 20px;border-radius:12px;background:#1f6feb;color:#fff;text-decoration:none;font-weight:600}
.m{opacity:.8;font-size:14px;min-height:42px}.ok{color:#3fb950;font-size:22px}
.live{display:inline-block;width:8px;height:8px;border-radius:50%;background:#3fb950;margin-right:6px;animation:p 1s infinite}
@keyframes p{50%{opacity:.2}}.dead img{opacity:.15}
.seg{display:flex;gap:4px;padding:4px;background:#1b2636;border-radius:999px;margin:0 0 18px}.seg button{flex:1;border:0;background:none;color:#9fb0c4;padding:9px 10px;border-radius:999px;font:inherit;font-size:14px;cursor:pointer}
.seg button.on{background:#1f6feb;color:#fff}</style>
<div class=c><h2>Logga in med BankID</h2>
<div class=seg id=seg><button id=b-this>BankID på den här enheten</button><button id=b-other>BankID på annan enhet</button></div>
<div id=other><img id=q alt="BankID QR"><p class=m id=l><span class=live></span>QR-koden uppdateras varje sekund</p></div>
<div id=this style="display:none"><a class=b id=a href="#" target=_blank rel=noopener style="display:none">Öppna BankID</a>
<p class=m id=alt style="display:none">Öppnas inte appen? <a id=a2 href="#" style="color:#9fc3ff">Prova den här länken</a></p></div>
<p class=m id=s></p></div>
<script>
const base=location.pathname, mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent), ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);
let device=null;
async function choose(d){
  device=d;
  document.getElementById('b-this').className=d==='this'?'on':''; document.getElementById('b-other').className=d==='other'?'on':'';
  document.getElementById('this').style.display=d==='this'?'block':'none'; document.getElementById('other').style.display=d==='other'?'block':'none';
  document.getElementById('a').style.display='none'; document.getElementById('alt').style.display='none';
  try{ await fetch(base+'/device',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({device:d})}); }catch(e){}
}
document.getElementById('b-this').onclick=()=>choose('this');
document.getElementById('b-other').onclick=()=>choose('other');
choose(mobile?'this':'other');
async function tick(){
  let r; try{ r=await (await fetch(base+'/state',{cache:'no-store'})).json(); }catch(e){ setTimeout(tick,1500); return; }
  if(r.qr && device==='other') document.getElementById('q').src='data:image/png;base64,'+r.qr;
  if(device==='this' && r.device==='this' && r.autostart){
    // BankID's universal link (https://app.bankid.com) works from frames, the HA app and mobile browsers,
    // where a bankid:/// custom-scheme link is often silently ignored; keep bankid:/// as a fallback.
    // iOS: return to this page after signing (Android must keep redirect=null).
    const tok=(r.autostart.match(/autostarttoken=([^&]+)/)||[])[1]||'';
    const red=ios?encodeURIComponent(location.href):'null';
    const a=document.getElementById('a'), a2=document.getElementById('a2');
    a.href='https://app.bankid.com/?autostarttoken='+tok+'&redirect='+red; a.style.display='inline-block';
    a2.href='bankid:///?autostarttoken='+tok+'&redirect='+red; a2.target='_top';
    document.getElementById('alt').style.display='block';
  }
  // Mälarenergi's hint for the previous order can still mention the QR code right after switching device
  const hint=device==='this'?'Tryck på knappen för att öppna BankID-appen.':'Öppna BankID-appen och skanna QR-koden.';
  document.getElementById('s').textContent=(device==='this'&&/QR/i.test(r.message||''))?hint:(r.message||hint);
  if(r.status==='complete'){ document.querySelector('.c').innerHTML='<p class=ok>✓ Inloggad</p><p>Du kan stänga fönstret.</p>';
    if(parent!==window) parent.postMessage({malarenergi:'bankid-complete'}, location.origin);  // shown inside the panel
    setTimeout(()=>window.close(),1500); return; }
  if(r.status==='gone'){ document.querySelector('.c').classList.add('dead'); document.getElementById('l').textContent='';
    document.getElementById('s').textContent='Den här inloggningen är avslutad. Stäng fönstret och starta om i Home Assistant (Lägg till integration → Mälarenergi).'; return; }
  if(r.status==='error'){ document.querySelector('.c').classList.add('dead'); document.getElementById('l').textContent='';
    document.getElementById('s').textContent=r.message||'Inloggningen misslyckades.'; return; }
  setTimeout(tick,700);
}
tick();
</script></html>"""


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
        self.this_device = False
        self._cancelled = False  # chosen on the page: BankID app on this phone vs QR for another device
        self._device_of_order = False

    @property
    def url(self) -> str:
        return f"{PATH}/{self.key}"

    def state(self) -> dict[str, Any]:
        lg = self._login
        return {
            "status": self.status,
            "message": self.message,
            "qr": lg.qr_png_b64 if lg else "",
            "autostart": lg.autostart_url if lg else "",
            "device": "this" if self.this_device else "other",
        }

    def start(self) -> None:
        ATTEMPTS[self.key] = self
        self._task = self.hass.async_create_background_task(self._run(), "malarenergi_bankid")

    async def _new_order(self) -> None:
        if self._login:
            await self._login.close()
        self._login = BankIDLogin(lambda: aiohttp.ClientSession(headers={"User-Agent": UA}))
        self._device_of_order = self.this_device
        await self._login.start(this_device=self.this_device)

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
                if self._device_of_order != self.this_device:  # the user switched device on the page
                    await self._new_order()
                url = await self._login.collect()
                self.message = self._login.message
                if url:
                    self.tokens = await self._login.finish(url)
                    self.status = "complete"
                    break
                if self._login.status == "failed":
                    if "QR" in self.message or "startFailed" in self.message:
                        await self._new_order()  # unscanned for 30 s -> fresh order + QR
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


class BankIDDeviceView(HomeAssistantView):
    """The page's device choice: {"device": "this"|"other"}. Keyed by the attempt's secret token."""

    url = PATH + "/{key}/device"
    name = "api:malarenergi:bankid:device"
    requires_auth = False

    async def post(self, request: web.Request, key: str) -> web.Response:
        att = ATTEMPTS.get(key)
        if att is None:
            return web.json_response({"status": "gone"})
        try:
            att.this_device = (await request.json()).get("device") == "this"
        except ValueError:
            return web.Response(status=400)
        return web.json_response({"ok": True})


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
