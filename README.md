# ha-malarenergi

Home Assistant custom integration for [Mälarenergi](https://www.malarenergi.se) — the
electricity grid owner and supplier for Västerås and the Mälardalen area. Logs in to
**Mitt Mälarenergi** with BankID and brings your account into Home Assistant.

> **Status**: 0.2 — BankID login with automatic token refresh, sensors, invoices with PDF download,
> HAN port control and a sidebar dashboard. Tested against a real private customer account.

Not an official API. Reverse-engineered from the public Mitt Mälarenergi web app — see
the docstring in [`api.py`](custom_components/malarenergi/api.py) for the login flow and
endpoints. It can break whenever Mälarenergi changes their site.

## Support

If you find this integration useful, you can buy me a coffee ☕

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy+me+a+coffee&emoji=&slug=jhara&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/jhara)

## Installation

### HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=8408323&repository=ha-malarenergi&category=integration)

Not (yet) in the HACS default store, so add it as a custom repository:

1. In HACS, go to **Integrations → ⋮ → Custom repositories**.
2. Add `https://github.com/8408323/ha-malarenergi` as an **Integration**.
3. Search for **Mälarenergi** and click **Download**.
4. Restart Home Assistant.

### Manual

1. Copy `custom_components/malarenergi/` to your HA `config/custom_components/` directory.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services → Add Integration**, search for **Mälarenergi**.
2. Click **Submit**. A new window opens with a **live BankID QR code** (it updates every
   second, like on Mitt Mälarenergi). Scan it with the BankID app. Allow pop-ups for your
   HA address if the window doesn't open.
3. When the window says "✓ Inloggad" it closes and the integration is added.

The login window stays open for 8 minutes; an unscanned QR is renewed automatically every
30 seconds. After that the window says the time ran out — start again from step 1.

## Authentication

Mitt Mälarenergi uses an OpenID Connect login (public web client, authorization code +
PKCE) with BankID. The integration stores the resulting **refresh token** in the config
entry and renews the access token in the background, so you normally don't need to scan
again. If Mälarenergi revokes or expires the session, HA's standard **reauth** flow asks
you to scan once more.

Your personal number is never entered or stored — BankID handles identification.

## Features

- **Dashboard** in the sidebar (React) with five tabs:
  - *Overview*: this month's consumption, production, net cost and power peak, last 30 days chart
  - *History*: any day (per hour), month (per day) or year (per month), step back in time, zoom, period totals
  - *Invoices*: paginated list, year-to-date totals, fees per invoice, one-click PDF download
  - *Contracts*: active and ended contracts (grid, supply, production, broadband) with fuse size and grid area
  - *Settings*: language (English, Svenska, Norsk, Dansk, Suomi, Íslenska — default follows Home Assistant),
    notification targets and events, BankID re-login, invoices per page
- Notifications (opt-in, to any `notify` service): new invoice, overdue invoice, HAN port changed, login expired
- Sensors: consumption and production (yesterday / this month), cost (energy + grid) and production
  compensation this month, monthly power peak, latest invoice (24-invoice history attribute), unpaid
  and overdue invoices, fuse size, unread messages, connection status
- Each invoice is classified (consumption / production) with metered kWh, fixed fees, power fee and
  other one-off charges, so you can check it against your own metering
- **HAN port** status sensor and on/off switch. Turning it off disconnects local meter readers
  (e.g. Mälarenergi PowerHub) from the meter.
- `malarenergi.download_invoice` action (PDF, temporary link valid 10 minutes) and a
  `malarenergi_new_invoice` event fired once per new invoice

## Dashboard

The integration adds a **Mälarenergi** item to the sidebar, following your Home Assistant language
(Swedish or English). Source is in [`frontend/`](frontend/) (React + Vite + Recharts); the built bundle is
committed to `custom_components/malarenergi/www/` so HACS installs need no build step.

## Development

The `homeassistant` PyPI package isn't a dependency — tests stub the HA symbols used.
Captured API responses are never committed (`captures/` and `*.local.json` are ignored)
because they contain personal data.

```bash
uv sync --dev
uv run pytest tests/
(cd frontend && npm ci && npm run build)  # rebuilds custom_components/malarenergi/www/panel.js
uv run ruff check custom_components/ tests/
uv run ruff format custom_components/ tests/
```

## Contributing

Pull requests are welcome. Please open an issue first to discuss what you'd like to change.

## License

MIT
