import { createRoot, Root } from "react-dom/client";
import App from "./App";
import css from "./styles.css?inline";

class MalarenergiPanel extends HTMLElement {
  private root?: Root;
  private _hass: any;
  private _narrow = false;
  set hass(h: any) { this._hass = h; this.render(); }
  set narrow(n: boolean) { this._narrow = n; this.render(); }
  connectedCallback() {
    if (this.root) return;
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = css;
    const mount = document.createElement("div");
    shadow.append(style, mount);
    this.root = createRoot(mount);
    this.render();
  }
  disconnectedCallback() { this.root?.unmount(); this.root = undefined; }
  private render() { if (this.root && this._hass) this.root.render(<App hass={this._hass} narrow={this._narrow} />); }
}

if (!customElements.get("malarenergi-panel")) customElements.define("malarenergi-panel", MalarenergiPanel);
