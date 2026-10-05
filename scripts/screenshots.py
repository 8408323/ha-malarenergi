"""README screenshots from docs/demo/demo.html: the real panel bundle fed generated demo data (no account data).

Needs Chrome/Chromium and aiohttp (`uv run python scripts/screenshots.py`). Writes docs/images/panel_<tab>.png.
Chrome's own --screenshot fires before the module-loaded panel renders, so this drives it over the DevTools
protocol and waits for the panel's cards instead.
"""

import asyncio
import base64
import functools
import http.server
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile
import threading

import aiohttp

ROOT = pathlib.Path(__file__).resolve().parents[1]
TABS = ("overview", "history", "invoices", "settings")
LANG = os.environ.get("LANG_CODE", "en")
WIDTH, HEIGHT = 1280, int(os.environ.get("HEIGHT", "1000"))
DEBUG_PORT = 9334

# wait until the tab's content is there (cards, and charts where the tab has them)
READY = """(() => { const sr = document.querySelector("malarenergi-panel")?.shadowRoot;
  return !!sr && sr.querySelectorAll(".card, .kpi").length > 1 && !sr.textContent.includes("Loading"); })()"""
# per tab: open the first invoice so its line items show; show History by year (a fuller picture than one month)
PREP = {
    "invoices": """(() => { document.querySelector("malarenergi-panel").shadowRoot.querySelector("tbody tr")?.click(); return true; })()""",
    "history": """(() => { const b = document.querySelector("malarenergi-panel").shadowRoot.querySelectorAll(".seg button");
      b[b.length - 1]?.click(); return true; })()""",
}


def serve() -> int:
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    handler.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv.server_address[1]


async def shoot(port: int) -> None:
    async with aiohttp.ClientSession() as s:
        for _ in range(50):  # Chrome needs a moment to open the debugging port
            try:
                tabs = await (await s.get(f"http://127.0.0.1:{DEBUG_PORT}/json")).json()
                break
            except aiohttp.ClientError:
                await asyncio.sleep(0.2)
        page = next(t for t in tabs if t["type"] == "page")
        async with s.ws_connect(page["webSocketDebuggerUrl"], max_msg_size=0) as ws:
            n = 0

            async def call(method, **params):
                nonlocal n
                n += 1
                i = n
                await ws.send_json({"id": i, "method": method, "params": params})
                while True:
                    m = await ws.receive_json()
                    if m.get("id") == i:
                        return m.get("result", {})

            async def evaluate(expr):
                r = await call("Runtime.evaluate", expression=expr, returnByValue=True)
                return r.get("result", {}).get("value")

            await call(
                "Emulation.setDeviceMetricsOverride", width=WIDTH, height=HEIGHT, deviceScaleFactor=1, mobile=False
            )
            for tab in TABS:
                await call("Page.navigate", url=f"http://127.0.0.1:{port}/docs/demo/demo.html?tab={tab}&lang={LANG}")
                for _ in range(100):
                    if await evaluate(READY):
                        break
                    await asyncio.sleep(0.1)
                else:
                    sys.exit(f"{tab}: panel did not render")
                if tab in PREP:
                    await evaluate(PREP[tab])
                await asyncio.sleep(1.2)  # chart animations
                shot = await call("Page.captureScreenshot", format="png")
                out = ROOT / "docs" / "images" / f"panel_{tab}.png"
                out.write_bytes(base64.b64decode(shot["data"]))
                print(out.relative_to(ROOT))


def main() -> None:
    chrome = os.environ.get("CHROME") or next(
        filter(None, map(shutil.which, ("google-chrome", "chromium", "chromium-browser"))), None
    )
    if not chrome:
        sys.exit("Chrome/Chromium not found (set CHROME=...)")
    (ROOT / "docs" / "images").mkdir(parents=True, exist_ok=True)
    port = serve()
    with tempfile.TemporaryDirectory() as profile:
        proc = subprocess.Popen(
            [
                chrome,
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                f"--remote-debugging-port={DEBUG_PORT}",
                f"--user-data-dir={profile}",
                "about:blank",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        try:
            asyncio.run(shoot(port))
        finally:
            proc.terminate()
            proc.wait()


if __name__ == "__main__":
    main()
