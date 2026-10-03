"""Mälarenergi "Mitt Mälarenergi" client.

Not an official API. Reverse-engineered from the public web app (mitt.malarenergi.se):

Login (IdentityServer at identity.malarenergi.se, public client ``mymejs``, auth code + PKCE):
  1. GET  /connect/authorize?...            -> redirects to /bankid/login (sets cookies, form token)
  2. POST /BankID/Login  button=loginMobileBankIDOtherDevice|ThisDevice
                                            -> page with LoginOrderRef, QrCode (PNG b64), QrCodeStartState,
                                               AutoStartAppUrl, AMRSelected, ReturnUrl
  3. POST /BankID/QrCode  {"qrStartState"}  -> {"qrCodeAsBase64"}   (animated QR, poll every 1 s)
     POST /BankID/Collect {orderRef,...}    -> {"status": pending|complete|failed, "message", "hintCode", "returnUrl"}
  4. GET  returnUrl (/connect/authorize/callback?...) -> 302 https://mitt.malarenergi.se/callback?code=...
  5. POST /connect/token  authorization_code + code_verifier -> access/refresh token (scope offline_access)
Refresh: POST /connect/token grant_type=refresh_token.

Data: https://mitt-bff.malarenergi.se/api/v{1,2,3}/... with ``Authorization: Bearer``.
"""

from __future__ import annotations

import base64
import hashlib
import html
import re
import secrets
import time
from dataclasses import dataclass
from typing import Any
from urllib.parse import parse_qs, urlencode, urljoin, urlparse

import aiohttp

IDENTITY = "https://identity.malarenergi.se"
BFF = "https://mitt-bff.malarenergi.se"
CLIENT_ID = "mymejs"
REDIRECT_URI = "https://mitt.malarenergi.se/callback"
SCOPE = "openid profile myme_bff_api myme_profile IdentityServerApi offline_access"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"


class MalarenergiError(Exception):
    """Generic API error."""


class AuthError(MalarenergiError):
    """Tokens rejected / refresh failed: a new BankID login is needed."""


def _hidden(page: str, field_id: str) -> str:
    m = re.search(rf'id="{field_id}"[^>]*value="([^"]*)"', page) or re.search(
        rf'name="{field_id}"[^>]*value="([^"]*)"', page
    )
    return html.unescape(m.group(1)) if m else ""


@dataclass
class Tokens:
    access_token: str
    refresh_token: str
    expires_at: float

    @classmethod
    def from_response(cls, data: dict[str, Any]) -> Tokens:
        return cls(data["access_token"], data.get("refresh_token", ""), time.time() + int(data.get("expires_in", 3600)))

    def as_dict(self) -> dict[str, Any]:
        return {"access_token": self.access_token, "refresh_token": self.refresh_token, "expires_at": self.expires_at}


class BankIDLogin:
    """One BankID login attempt. Own cookie jar so parallel flows never mix."""

    def __init__(self, session_factory) -> None:
        self._session: aiohttp.ClientSession = session_factory()
        self._verifier = base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode()
        self.qr_png_b64 = ""
        self.autostart_url = ""
        self.status = "starting"
        self.message = ""
        self._order_ref = ""
        self._qr_state = ""
        self._return_url = ""
        self._amr = 0
        self._counter = 0

    async def start(self, this_device: bool = False) -> None:
        challenge = base64.urlsafe_b64encode(hashlib.sha256(self._verifier.encode()).digest()).rstrip(b"=").decode()
        q = {
            "client_id": CLIENT_ID,
            "redirect_uri": REDIRECT_URI,
            "response_type": "code",
            "scope": SCOPE,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "state": secrets.token_urlsafe(16),
            "nonce": secrets.token_urlsafe(16),
        }
        async with self._session.get(f"{IDENTITY}/connect/authorize?{urlencode(q)}") as r:
            page = await r.text()
        form = {
            "ReturnUrl": _hidden(page, "ReturnUrl"),
            "__RequestVerificationToken": _hidden(page, "__RequestVerificationToken"),
            "button": "loginMobileBankIDThisDevice" if this_device else "loginMobileBankIDOtherDevice",
        }
        if not form["__RequestVerificationToken"]:
            raise MalarenergiError("login page layout changed (no form token)")
        async with self._session.post(f"{IDENTITY}/BankID/Login", data=form) as r:
            page = await r.text()
        self._order_ref = _hidden(page, "LoginOrderRef")
        self._qr_state = _hidden(page, "QrCodeStartState")
        self._return_url = _hidden(page, "ReturnUrl")
        self._amr = int(_hidden(page, "AMRSelected") or 0)
        self.qr_png_b64 = _hidden(page, "QrCode")
        self.autostart_url = _hidden(page, "AutoStartAppUrl")
        if not self._order_ref:
            raise MalarenergiError("BankID order was not started")
        self.status = "pending"

    async def refresh_qr(self) -> None:
        if not self._qr_state:
            return
        async with self._session.post(f"{IDENTITY}/BankID/QrCode", json={"qrStartState": self._qr_state}) as r:
            if r.status == 200:
                self.qr_png_b64 = (await r.json(content_type=None)).get("qrCodeAsBase64", self.qr_png_b64)

    async def collect(self) -> str | None:
        """Poll once. Returns the post-login callback URL when complete."""
        body = {
            "orderRef": self._order_ref,
            "cancelOrder": False,
            "returnUrl": self._return_url,
            "collectCounter": self._counter,
            "amrSelected": self._amr,
            "autoStartBankIDApp": False,
            "bankIdOnThisDevice": bool(self.autostart_url) and not self._qr_state,
        }
        self._counter += 1
        async with self._session.post(f"{IDENTITY}/BankID/Collect", json=body) as r:
            data = await r.json(content_type=None)
        self.message = data.get("message") or ""
        self.status = data.get("status") or "failed"
        return data.get("returnUrl") if self.status == "complete" else None

    async def finish(self, return_url: str) -> Tokens:
        url = urljoin(IDENTITY, return_url)
        for _ in range(5):  # follow identity-server redirects until it hands the code to the SPA callback
            async with self._session.get(url, allow_redirects=False) as r:
                loc = r.headers.get("Location", "")
            if not loc:
                raise MalarenergiError("login finished without redirect")
            url = urljoin(url, loc)
            if url.startswith(REDIRECT_URI):
                break
        code = parse_qs(urlparse(url).query).get("code", [""])[0]
        if not code:
            raise MalarenergiError("no authorization code in callback")
        data = {
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "code_verifier": self._verifier,
        }
        async with self._session.post(f"{IDENTITY}/connect/token", data=data) as r:
            if r.status != 200:
                raise MalarenergiError(f"token exchange failed ({r.status})")
            return Tokens.from_response(await r.json())

    async def close(self) -> None:
        await self._session.close()


class MalarenergiClient:
    def __init__(self, session: aiohttp.ClientSession, tokens: Tokens, on_tokens=None) -> None:
        self._s = session
        self.tokens = tokens
        self._on_tokens = on_tokens  # persist rotated refresh tokens
        self.customer_id: str | None = None

    async def _refresh(self) -> None:
        data = {"grant_type": "refresh_token", "client_id": CLIENT_ID, "refresh_token": self.tokens.refresh_token}
        async with self._s.post(f"{IDENTITY}/connect/token", data=data, headers={"User-Agent": UA}) as r:
            if r.status in (400, 401):
                raise AuthError("refresh token rejected")
            r.raise_for_status()
            self.tokens = Tokens.from_response(await r.json())
        if self._on_tokens:
            self._on_tokens(self.tokens)

    async def request(self, method: str, path: str, *, raw: bool = False, **kw) -> Any:
        if time.time() > self.tokens.expires_at - 60:
            await self._refresh()
        for attempt in (0, 1):
            headers = {"Authorization": f"Bearer {self.tokens.access_token}", "User-Agent": UA}
            async with self._s.request(method, f"{BFF}{path}", headers=headers, **kw) as r:
                if r.status == 401 and attempt == 0:
                    await self._refresh()
                    continue
                if r.status >= 400:
                    raise MalarenergiError(f"{method} {path.split('?')[0]} -> {r.status}")
                if raw:
                    return await r.read(), r.headers.get("Content-Type", "")
                if r.status == 204:
                    return None
                return await r.json(content_type=None)

    async def get(self, path: str, **params) -> Any:
        return await self.request("GET", path, params={k: v for k, v in params.items() if v is not None})

    async def account(self) -> dict:
        """Account + customer number. The number is the ``mecid`` claim of /connect/userinfo."""
        acc = await self.get("/api/v2/account")
        if not self.customer_id:
            if time.time() > self.tokens.expires_at - 60:
                await self._refresh()
            async with self._s.get(
                f"{IDENTITY}/connect/userinfo",
                headers={"Authorization": f"Bearer {self.tokens.access_token}", "User-Agent": UA},
            ) as r:
                if r.status == 401:
                    raise AuthError("userinfo rejected")
                info = await r.json(content_type=None)
            cid = info.get("mecid")
            self.customer_id = str(cid[0] if isinstance(cid, list) else cid) if cid else None
            if not self.customer_id:
                raise MalarenergiError("no customer number on this login")
        return acc

    async def put(self, path: str, **params) -> Any:
        return await self.request("PUT", path, params=params)

    def c(self, suffix: str, version: int = 2) -> str:
        return f"/api/v{version}/customers/{self.customer_id}{suffix}"
