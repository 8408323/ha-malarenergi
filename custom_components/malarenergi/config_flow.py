"""Config flow: BankID login via an external step that shows a live (animated) QR."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import MalarenergiClient, MalarenergiError
from .bankid_view import BankIDDeviceView, BankIDPageView, BankIDStateView, LoginAttempt
from .const import CONF_TOKENS, DOMAIN

_VIEWS_REGISTERED = "malarenergi_views"


class MalarenergiConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._attempt: LoginAttempt | None = None
        self._error: str | None = None

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is None and self._error is None:
            return self.async_show_form(step_id="user")
        return await self.async_step_bankid()

    async def async_step_reauth(self, entry_data: dict[str, Any]) -> ConfigFlowResult:
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is None:
            return self.async_show_form(step_id="reauth_confirm")
        return await self.async_step_bankid()

    async def async_step_bankid(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._attempt is None:
            if not self.hass.data.get(_VIEWS_REGISTERED):
                self.hass.http.register_view(BankIDPageView())
                self.hass.http.register_view(BankIDStateView())
                self.hass.http.register_view(BankIDDeviceView())
                self.hass.data[_VIEWS_REGISTERED] = True
            self._attempt = LoginAttempt(self.hass, self.flow_id)
            self._attempt.start()
            return self.async_external_step(step_id="bankid", url=self._attempt.url)
        return self.async_external_step_done(next_step_id="finish")

    async def async_step_finish(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        attempt, self._attempt = self._attempt, None
        if attempt is None or attempt.tokens is None:
            return self.async_show_form(
                step_id="user",
                errors={"base": "bankid_failed"},
                description_placeholders={"error": attempt.message if attempt else ""},
            )
        client = MalarenergiClient(async_get_clientsession(self.hass), attempt.tokens)
        try:
            await client.account()
        except MalarenergiError:
            return self.async_show_form(step_id="user", errors={"base": "cannot_connect"})
        data = {CONF_TOKENS: client.tokens.as_dict()}
        await self.async_set_unique_id(client.customer_id)
        if self.source == "reauth":
            return self.async_update_reload_and_abort(self._get_reauth_entry(), data=data)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title="Mälarenergi", data=data)

    def async_remove(self) -> None:
        if self._attempt:
            self._attempt.cancel()
