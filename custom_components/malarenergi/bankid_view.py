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
@keyframes p{50%{opacity:.2}}.dead img{opacity:.15}</style>
<div class=c><h2>Logga in med BankID</h2><img id=q alt="BankID QR"><p class=m id=s>Öppna BankID-appen och skanna QR-koden.</p><p class=m id=l><span class=live></span>QR-koden uppdateras varje sekund</p>
<a class=b id=a href="#" style="display:none">Öppna BankID på den här enheten</a></div>
<script>
const base=location.pathname;
async function tick(){
  let r; try{ r=await (await fetch(base+'/state',{cache:'no-store'})).json(); }catch(e){ setTimeout(tick,1500); return; }
  if(r.qr) document.getElementById('q').src='data:image/png;base64,'+r.qr;
  if(r.autostart){ const a=document.getElementById('a'); a.href=r.autostart; a.style.display='inline-block'; }
  document.getElementById('s').textContent=r.message||'';
  if(r.status==='complete'){ document.querySelector('.c').innerHTML='<p class=ok>✓ Inloggad</p><p>Du kan stänga fönstret.</p>'; setTimeout(()=>window.close(),1500); return; }
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
            await asyncio.sleep(5)  # let the page show the final state
            ATTEMPTS.pop(self.key, None)
            await self.hass.config_entries.flow.async_configure(self.flow_id, {"done": True})

    def cancel(self) -> None:
        if self._task and not self._task.done():
            self._task.cancel()
        ATTEMPTS.pop(self.key, None)


class BankIDPageView(HomeAssistantView):
    url = PATH + "/{key}"
    name = "api:malarenergi:bankid"
    requires_auth = False

    async def get(self, request: web.Request, key: str) -> web.Response:
        return web.Response(text=PAGE, content_type="text/html", headers={"Cache-Control": "no-store"})


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
