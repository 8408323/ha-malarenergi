# ha-malarenergi

Home Assistant custom integration for [Mälarenergi](https://www.malarenergi.se) — the
electricity grid owner and supplier for Västerås and the Mälardalen area. Logs in to
**Mitt Mälarenergi** with BankID and brings your account into Home Assistant.

> **Status**: Early (0.1). BankID login, token refresh and endpoint discovery work;
> data entities (consumption, surplus, invoices, power peaks, HAN port) are being added.

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

## Features (planned for 0.2)

- Consumption and surplus (export) per hour/day/month as long-term statistics
- Invoices: latest invoice sensor, history attribute, PDF download action, new-invoice event
- Contracts (elhandel, elnät, produktion) and fuse size
- Power peaks (effekttopp) and the grid-tariff calculator, ready for a power-based tariff
- HAN port status and on/off control
- Spot price and Mälarenergi's historical weather for your facility

## Development

The `homeassistant` PyPI package isn't a dependency — tests stub the HA symbols used.
Captured API responses are never committed (`captures/` and `*.local.json` are ignored)
because they contain personal data.

```bash
uv sync --dev
uv run pytest tests/
uv run ruff check custom_components/ tests/
uv run ruff format custom_components/ tests/
```

## Contributing

Pull requests are welcome. Please open an issue first to discuss what you'd like to change.

## License

MIT
