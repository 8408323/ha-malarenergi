import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Bar, Brush, CartesianGrid, ComposedChart, Legend, Line, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { LANG_NAMES, T, pick } from "./i18n";

type Series = Record<string, [string, number][]>;
type Invoice = {
  invoice_id: string; kind: string; issue_date: string; due_date: string; period_start: string; period_end: string;
  amount: number; status: string; closed: boolean; kwh: number; fixed: number; power_fee: number; other: number; utilities?: string[];
  lines?: { category: string; name: string; kwh: number; amount: number }[];
};
type Data = {
  CONSUMPTION?: { point?: string; daily: Series; peak?: { peakPowerConsumption?: number; dateTime?: string } | null };
  PRODUCTION?: { point?: string; daily: Series };
  invoices?: Invoice[]; han?: Record<string, string>; fuse?: string | null; updated?: string;
};
type Options = Record<string, any>;
type Ctx = { hass: any; t: T; locale: string; narrow: boolean };

const TABS = ["overview", "history", "invoices", "contracts", "settings"] as const;
type Tab = (typeof TABS)[number];
const auto = (v: number | null | undefined) => (v != null && Math.abs(v) < 10 ? 1 : 0);
const fmt = (v: number | null | undefined, d = 0, u = "") =>
  v == null || Number.isNaN(v) ? "–" : `${v.toLocaleString("sv-SE", { minimumFractionDigits: d, maximumFractionDigits: d })}${u ? " " + u : ""}`;
const localDay = (iso: string) => new Date(iso).toLocaleDateString("sv-SE");
const tip = { contentStyle: { background: "var(--me-card)", border: "1px solid var(--me-line)", borderRadius: 10, fontSize: 12 } };
const axis = { stroke: "var(--me-muted)", fontSize: 11 };

function Info({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (!e.composedPath().includes(ref.current!)) setOpen(false); };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <span className="info" ref={ref}>
      <button className="info-btn" onClick={() => setOpen(!open)} aria-label="info">i</button>
      {open && <span className="pop">{text}</span>}
    </span>
  );
}

function Kpi({ label, value, sub, info, tone }: { label: string; value: string; sub?: string; info?: string; tone?: string }) {
  return (
    <div className="kpi">
      <div className="label">{label}{info && <Info text={info} />}</div>
      <div className={`value ${tone ?? ""}`}>{value}</div>
      {sub && <div className="muted">{sub}</div>}
    </div>
  );
}

export default function App({ hass, narrow }: { hass: any; narrow: boolean }) {
  const [opts, setOpts] = useState<Options | null>(null);
  const [tab, setTab] = useState<Tab>(() => (localStorage.getItem("me_tab") as Tab) || "overview");
  const [d, setD] = useState<Data | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const { t, locale } = pick(hass.locale?.language ?? hass.language, opts?.language);
  const stamp = Object.values(hass.states as Record<string, any>)
    .find((s) => s.entity_id.startsWith("sensor.") && s.attributes?.invoices)?.last_updated;

  useEffect(() => { hass.connection.sendMessagePromise({ type: "malarenergi/settings/get" }).then((r: any) => setOpts(r.options)).catch(() => setOpts({})); }, []);
  useEffect(() => {
    hass.connection.sendMessagePromise({ type: "malarenergi/data" })
      .then((r: any) => { setD(r.data); setErr(null); }).catch((e: any) => setErr(e?.message ?? String(e)));
  }, [stamp]);

  const go = (x: Tab) => { setTab(x); localStorage.setItem("me_tab", x); };
  const han = Object.values(d?.han ?? {})[0];
  const ctx = { hass, t, locale, narrow };

  return (
    <div className={`page ${narrow ? "narrow" : ""}`}>
      <header>
        <div className="brand"><h1>{t.title}</h1>
          <div className="chips">
            {han && <span className={`chip ${han === "OPEN" ? "ok" : ""}`}>{t.han}: {(t as any)[`han_${han}`] ?? han.toLowerCase()}</span>}
            {d?.fuse && <span className="chip">{t.fuse} {d.fuse}</span>}
          </div>
        </div>
        <nav className="tabs">
          {TABS.map((x) => <button key={x} className={tab === x ? "on" : ""} onClick={() => go(x)}>{(t as any)[`tab_${x}`]}</button>)}
        </nav>
      </header>
      {err && <div className="card error">{err}</div>}
      {!d && tab !== "settings" ? <div className="card">{err ? t.none : t.loading}</div> : (
        <>
          {tab === "overview" && d && <Overview {...ctx} d={d} live={opts?.show_powerhub !== false} />}
          {tab === "history" && <History {...ctx} />}
          {tab === "invoices" && d && <Invoices {...ctx} invoices={d.invoices ?? []} perPage0={opts?.invoices_per_page ?? 12} />}
          {tab === "contracts" && <Contracts {...ctx} />}
          {tab === "settings" && opts && <Settings {...ctx} opts={opts} setOpts={setOpts} d={d} />}
        </>
      )}
      {d?.updated && tab !== "settings" && <div className="muted foot">{t.updated} {new Date(d.updated).toLocaleString(locale)}</div>}
    </div>
  );
}

/* ---------------- Overview ---------------- */
const KW: Record<string, number> = { mW: 1e-6, W: 1e-3, kW: 1, MW: 1e3, GW: 1e6, TW: 1e9, "BTU/h": 0.00029307107 };  // HA power units → kW
const AMP: Record<string, number> = { "μA": 1e-6, "µA": 1e-6, mA: 1e-3, A: 1 };  // HA current units → A

// The PowerHub integration's entity prefix for the displayed facility. Entity ids are "powerhub_<name>" (docs)
// or "powerhub_<facility>_<name>" (device-named installs); PowerHub's meter_id must be one of this facility's
// metering points, so another property's hub is never shown or configured here.
function powerhubPrefix(st: Record<string, any>, d: Data | null): string | undefined {
  const all = Object.keys(st).map((e) => /^sensor\.(powerhub_(?:.+_)?)power_import$/.exec(e)?.[1]).filter(Boolean) as string[];
  const mps = new Set([d?.CONSUMPTION?.point, d?.PRODUCTION?.point].filter(Boolean).map(String));
  return all.find((x) => mps.has(st[`sensor.${x}meter_id`]?.state));
}

// Live power from the PowerHub integration (same HAN meter), found by its entity ids; no second login.
function PowerHub({ hass, t, d }: Ctx & { d: Data }) {
  const st = hass.states as Record<string, any>;
  const p = powerhubPrefix(st, d);
  if (!p) return null;
  const num = (e: string) => { const v = parseFloat(String(st[e]?.state).replace(/^A/, "")); return Number.isFinite(v) ? v : null; };
  // HA converts to the user's display unit; normalise (an unknown unit gives null, never a wrong number)
  const conv = (e: string, t: Record<string, number>, dflt?: string) => {
    const v = num(e), f = t[st[e]?.attributes?.unit_of_measurement ?? dflt ?? ""];
    return v == null || f == null ? null : v * f;
  };
  const kw = (e: string) => conv(e, KW);
  const imp = kw(`sensor.${p}power_import`), exp = kw(`sensor.${p}power_export`);
  // the installed main fuse first; fuse_limit_set is PowerHub's soft alert limit, only a fallback
  const fuse = conv(`select.${p}fuse_size`, AMP, "A") ?? conv(`number.${p}fuse_limit`, AMP) ?? conv(`number.${p}fuse_limit_set`, AMP);
  if (imp == null || exp == null) return null;  // a missing side isn't a zero reading
  const net = imp - exp;
  return (
    <section className="card">
      <h2>{t.live}<Info text={t.live_info} /></h2>
      <div className="row-between"><span className="muted">{net >= 0 ? t.importing : t.exporting}</span>
        <b className={net < 0 ? "pos" : ""}>{fmt(Math.abs(net), 2, "kW")}</b></div>
      <div className="phases" style={{ marginTop: 12 }}>
        {[1, 2, 3].map((n) => {
          const a = conv(`sensor.${p}current_l${n}`, AMP);
          const pct = a != null && fuse ? Math.min(100, (a / fuse) * 100) : 0;
          return (
            <div key={n}>
              <div className="row-between"><span className="muted">L{n}</span><span>{fmt(a, 1, "A")}{fuse ? ` / ${fuse} A` : ""}</span></div>
              <div className="meter"><div style={{ width: `${pct}%`, background: pct > 85 ? "var(--me-neg)" : pct > 60 ? "#f5a524" : "var(--me-accent)" }} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Overview({ hass, t, locale, narrow, d, live }: Ctx & { d: Data; live: boolean }) {
  const days = useMemo(() => {
    const m = new Map<string, any>();
    const add = (rows: [string, number][] | undefined, key: string) =>
      (rows ?? []).forEach(([x, v]) => { const k = localDay(x); (m.get(k) ?? m.set(k, { k }).get(k))[key] = v; });
    add(d.CONSUMPTION?.daily?.consumption, "cons"); add(d.CONSUMPTION?.daily?.cost, "cost");
    add(d.PRODUCTION?.daily?.production, "prod"); add(d.PRODUCTION?.daily?.compensation, "comp");
    return [...m.values()].sort((a, b) => a.k.localeCompare(b.k));
  }, [d]);
  const month = new Date().toLocaleDateString("sv-SE").slice(0, 7);
  const sum = (key: string) => days.filter((r) => r.k.startsWith(month)).reduce((s, r) => s + (r[key] ?? 0), 0);
  const sumKey = (rows?: [string, number][]) => (rows ?? []).filter(([x]) => localDay(x).startsWith(month)).reduce((s, [, v]) => s + v, 0);
  const peak = d.CONSUMPTION?.peak;
  const net = sum("cost") - sum("comp");
  return (
    <>
      <div className="kpis">
        <Kpi label={`${t.consumption} · ${t.month}`} value={fmt(sum("cons"), auto(sum("cons")), "kWh")} sub={`${t.cost} ${fmt(sum("cost"), auto(sum("cost")), "kr")}`} />
        <Kpi label={`${t.production} · ${t.month}`} value={fmt(sum("prod"), auto(sum("prod")), "kWh")} sub={`${t.compensation} ${fmt(sum("comp"), auto(sum("comp")), "kr")}`} />
        <Kpi label={`${t.net} · ${t.month}`} info={t.net_info} value={money(-net, auto(net))} tone={net <= 0 ? "pos" : "neg"}
          sub={`${t.energy} ${fmt(sumKey(d.CONSUMPTION?.daily?.costEL), 0)} · ${t.grid} ${fmt(sumKey(d.CONSUMPTION?.daily?.costELEXT), 0)}`} />
        <Kpi label={t.peak} info={t.peak_info} value={fmt(peak?.peakPowerConsumption, (peak?.peakPowerConsumption ?? 1) < 1 ? 2 : 1, "kW")}
          sub={peak?.dateTime ? new Date(peak.dateTime).toLocaleString(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""} />
      </div>
      <section className="card">
        <h2>{t.daily}<Info text={t.daily_info} /></h2>
        <EnergyChart rows={days} t={t} height={narrow ? 240 : 300} tick={(k) => String(k).slice(5)} />
      </section>
      {live && <PowerHub hass={hass} t={t} locale={locale} narrow={narrow} d={d} />}
    </>
  );
}

type Zoom = { a: number; b: number } | null;

function EnergyChart({ rows, t, height, tick, brush, zoom, setZoom }: {
  rows: any[]; t: T; height: number; tick: (k: any) => string; brush?: boolean; zoom?: Zoom; setZoom?: (z: Zoom) => void;
}) {
  // drag across the plot to zoom (the Brush below shows and adjusts the same window); double-click resets
  const [drag, setDrag] = useState<{ a: string; b: string } | null>(null);
  const idx = (k: string) => rows.findIndex((r) => r.k === k);
  const end = () => {
    if (drag && setZoom) {
      const [a, b] = [idx(drag.a), idx(drag.b)].sort((x, y) => x - y);
      if (b > a) setZoom({ a, b });
    }
    setDrag(null);
  };
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={rows} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
        onMouseDown={(e: any) => setZoom && e?.activeLabel && setDrag({ a: e.activeLabel, b: e.activeLabel })}
        onMouseMove={(e: any) => drag && e?.activeLabel && setDrag({ ...drag, b: e.activeLabel })}
        onMouseUp={end} onMouseLeave={() => setDrag(null)} onDoubleClick={() => setZoom?.(null)}
        style={{ cursor: setZoom ? "crosshair" : undefined, userSelect: "none" }}>
        <CartesianGrid stroke="var(--me-line)" vertical={false} />
        <XAxis dataKey="k" tickFormatter={tick} minTickGap={24} {...axis} />
        <YAxis yAxisId="e" width={44} {...axis} />
        <YAxis yAxisId="m" orientation="right" width={44} {...axis} />
        <Tooltip {...tip} labelFormatter={tick} formatter={(v: any, n: any) => [fmt(Number(v), 1), n]} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar yAxisId="e" dataKey="cons" name={`${t.consumption} (kWh)`} fill="#3daee9" radius={[3, 3, 0, 0]} isAnimationActive={false} />
        <Bar yAxisId="e" dataKey="prod" name={`${t.production} (kWh)`} fill="#f5b301" radius={[3, 3, 0, 0]} isAnimationActive={false} />
        <Line yAxisId="m" dataKey="cost" name={`${t.cost} (kr)`} stroke="#e5484d" dot={false} strokeWidth={2} isAnimationActive={false} />
        <Line yAxisId="m" dataKey="comp" name={`${t.compensation} (kr)`} stroke="#2ec27e" dot={false} strokeWidth={2} isAnimationActive={false} />
        {drag && <ReferenceArea yAxisId="e" x1={drag.a} x2={drag.b} fill="var(--me-accent)" fillOpacity={0.15} stroke="var(--me-accent)" strokeOpacity={0.5} />}
        {brush && rows.length > 1 && <Brush dataKey="k" height={22} stroke="var(--me-accent)" fill="var(--me-card)" tickFormatter={tick} travellerWidth={8}
          startIndex={zoom?.a ?? 0} endIndex={zoom?.b ?? rows.length - 1}
          onChange={(r: any) => setZoom?.(r.startIndex === 0 && r.endIndex === rows.length - 1 ? null : { a: r.startIndex, b: r.endIndex })} />}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

function SumTable({ rows, t, label, title }: { rows: any[]; t: T; label: (k: any) => string; title: string }) {
  const sum = (k: string) => rows.reduce((s, r) => s + (r[k] ?? 0), 0);
  const cols: [string, string, number][] = [["cons", `${t.consumption} (kWh)`, 1], ["prod", `${t.production} (kWh)`, 1],
    ["cost", `${t.cost} (kr)`, 0], ["comp", `${t.compensation} (kr)`, 0]];
  const net = (r: any) => (r.comp ?? 0) - (r.cost ?? 0);
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="table-wrap">
        <table className="sum">
          <thead><tr><th>{t.period}</th>{cols.map(([k, n]) => <th key={k} className="r">{n}</th>)}<th className="r">{t.net} (kr)<Info text={t.wallet_info} /></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k}><td>{label(r.k)}</td>{cols.map(([k, , d]) => <td key={k} className="r">{fmt(r[k], d)}</td>)}
                <td className={`r ${net(r) >= 0 ? "pos" : "neg"}`}>{money(net(r))}</td></tr>
            ))}
          </tbody>
          <tfoot><tr><th>{t.total}</th>{cols.map(([k, , d]) => <th key={k} className="r">{fmt(sum(k), d)}</th>)}
            <th className={`r ${sum("comp") - sum("cost") >= 0 ? "pos" : "neg"}`}>{money(sum("comp") - sum("cost"))}</th></tr></tfoot>
        </table>
      </div>
    </section>
  );
}

/* ---------------- History (any period, zoom, totals) ---------------- */
type Res = "hour" | "day" | "month";
function History({ hass, t, locale, narrow }: Ctx) {
  const [res, setRes] = useState<Res>("day");
  const [offset, setOffset] = useState(0); // 0 = current day/month/year, -1 = previous …
  const [rows, setRows] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<Zoom>(null);
  const range = useMemo(() => {
    const n = new Date(); let s: Date, e: Date;
    if (res === "hour") { s = new Date(n.getFullYear(), n.getMonth(), n.getDate() + offset); e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1); }
    else if (res === "day") { s = new Date(n.getFullYear(), n.getMonth() + offset, 1); e = new Date(s.getFullYear(), s.getMonth() + 1, 1); }
    else { s = new Date(n.getFullYear() + offset, 0, 1); e = new Date(s.getFullYear() + 1, 0, 1); }
    return { s, e };
  }, [res, offset]);
  useEffect(() => {
    let live = true;  // a slower response for the previous range must not land in this one
    setRows(null); setError(null); setZoom(null);
    hass.connection.sendMessagePromise({ type: "malarenergi/series", resolution: res, start: range.s.toISOString(), end: range.e.toISOString() })
      .then((r: any) => {
        const m = new Map<string, any>();
        // month buckets are reported at the local month start (UTC previous evening): shift 2 days before labelling
        const key = (x: string) => {
          const dt = new Date(x);
          return res === "hour" ? dt.toISOString().slice(0, 13) : res === "day" ? localDay(x) : localDay(new Date(dt.getTime() + 864e5 * 2).toISOString()).slice(0, 7);
        };
        const add = (rws: [string, number][] | undefined, k: string) => (rws ?? []).forEach(([x, v]) => {
          const kk = key(x); const o = m.get(kk) ?? m.set(kk, { k: kk, t: x }).get(kk); o[k] = (o[k] ?? 0) + v; });
        add(r.CONSUMPTION?.consumption, "cons"); add(r.CONSUMPTION?.cost, "cost");
        add(r.PRODUCTION?.production, "prod"); add(r.PRODUCTION?.compensation, "comp");
        if (!live) return;
        setRows([...m.values()].sort((a, b) => a.k.localeCompare(b.k)));
        setZoom(null);
      }).catch((e: any) => { if (live) setError(e?.message ?? String(e)); });
    return () => { live = false; };
  }, [res, range.s.getTime()]);
  const label = res === "hour" ? range.s.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : res === "day" ? range.s.toLocaleDateString(locale, { month: "long", year: "numeric" }) : String(range.s.getFullYear());
  const tick = (k: any) => res === "hour" ? new Date(rows?.find((r) => r.k === k)?.t ?? k).toLocaleTimeString(locale, { hour: "2-digit" })
    : res === "day" ? String(k).slice(8) : new Date(String(k) + "-15").toLocaleDateString(locale, { month: "short" });
  const tot = (k: string) => (rows ?? []).reduce((s, r) => s + (r[k] ?? 0), 0);
  // full label for table rows (the axis tick is abbreviated)
  const rowLabel = (k: any) => res === "hour" ? new Date(rows?.find((r) => r.k === k)?.t ?? k).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
    : res === "day" ? new Date(String(k)).toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" })
    : new Date(String(k) + "-15").toLocaleDateString(locale, { month: "long", year: "numeric" });
  return (
    <>
      <div className="toolbar">
        <div className="seg">
          {(["hour", "day", "month"] as Res[]).map((r) => <button key={r} className={res === r ? "on" : ""} onClick={() => { setRes(r); setOffset(0); }}>{(t as any)[`res_${r}`]}</button>)}
        </div>
        <div className="pages">
          <button className="btn" onClick={() => setOffset(offset - 1)} aria-label={t.prev}>‹</button>
          <b className="range-label">{label}</b>
          <button className="btn" disabled={offset >= 0} onClick={() => setOffset(offset + 1)} aria-label={t.next}>›</button>
          {offset < 0 && <button className="btn" onClick={() => setOffset(0)}>{t.today}</button>}
        </div>
      </div>
      <div className="kpis">
        <Kpi label={`${t.consumption} · ${t.total}`} value={fmt(tot("cons"), auto(tot("cons")), "kWh")} sub={`${t.cost} ${fmt(tot("cost"), 0, "kr")}`} />
        <Kpi label={`${t.production} · ${t.total}`} value={fmt(tot("prod"), auto(tot("prod")), "kWh")} sub={`${t.compensation} ${fmt(tot("comp"), 0, "kr")}`} />
        <Kpi label={`${t.net} · ${t.total}`} info={t.net_info} value={money(tot("comp") - tot("cost"))} tone={tot("comp") - tot("cost") >= 0 ? "pos" : "neg"} />
      </div>
      <section className="card">
        <h2>{label}<Info text={t.history_info} /></h2>
        {error ? <div className="muted">{error}</div> : !rows ? <div className="muted">{t.loading}</div> : !rows.length ? <div className="muted">{t.none}</div> :
          <EnergyChart rows={rows} t={t} height={narrow ? 260 : 340} tick={tick} brush zoom={zoom} setZoom={setZoom} />}
        {rows && rows.length > 1 && <div className="muted hint">{t.zoom_hint}</div>}
      </section>
      {rows && rows.length > 0 && zoom && zoom.b < rows.length &&
        <SumTable rows={rows.slice(zoom.a, zoom.b + 1)} t={t} label={rowLabel} title={`${t.table_zoom}: ${rowLabel(rows[zoom.a].k)} – ${rowLabel(rows[zoom.b].k)}`} />}
      {rows && rows.length > 0 && <SumTable rows={rows} t={t} label={rowLabel} title={`${t.table_full}: ${label}`} />}
    </>
  );
}

/* ---------------- Invoices ---------------- */
const FLAGS: Record<string, string> = { en: "🇬🇧", sv: "🇸🇪", nb: "🇳🇴", da: "🇩🇰", fi: "🇫🇮", is: "🇮🇸" };

// wallet view: + is money paid to you, − is money you pay (the API's sign is the opposite)
const money = (v: number | null | undefined, d = 0) =>
  v == null ? "–" : `${v > 0 ? "+" : v < 0 ? "−" : ""}${fmt(Math.abs(v), d, "kr")}`;

// amounts add up per category, kWh do not: several charges in one category (spot markup, certificates,
// fossil-free mix…) are each billed on the same consumption. Rows of the same product (a period split by a
// tariff change) do add up, so: sum per product name, then take the largest product.
function groupLines(lines: { category: string; name: string; kwh: number; amount: number }[]) {
  const g: Record<string, { amount: number; kwh: number; byName: Record<string, number> }> = {};
  for (const l of lines) {
    const a = (g[l.category] ??= { amount: 0, kwh: 0, byName: {} });
    a.amount += l.amount;
    a.byName[l.name] = (a.byName[l.name] ?? 0) + l.kwh;
    a.kwh = Math.max(...Object.values(a.byName));
  }
  return g;
}

function Invoices({ hass, t, locale, invoices, perPage0 }: Ctx & { invoices: Invoice[]; perPage0: number }) {
  const [perPage, setPerPage] = useState<number>(() => Number(localStorage.getItem("me_per_page")) || perPage0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [signed, setSigned] = useState<Record<string, string>>({});
  const pages = perPage ? Math.max(1, Math.ceil(invoices.length / perPage)) : 1;
  const monthName = (ym: string) => new Date(`${ym}-15`).toLocaleDateString(locale, { month: "short", year: "numeric" });
  const shortDate = (s: string) => (s ? new Date(s).toLocaleDateString(locale, { day: "numeric", month: "short" }) : "–");
  // PDF links are signed in advance (HA's auth/sign_path, valid 1 h, renewed every 30 min) so a tap opens a
  // plain link: phones and the HA app block window.open() after an await
  const visible = invoices.slice(page * perPage, perPage ? (page + 1) * perPage : undefined).map((i) => i.invoice_id).filter(Boolean);
  useEffect(() => {
    let live = true;  // a slower response for the previous page must not overwrite this page's links
    const sign = () => Promise.all(visible.map((id) => hass.connection.sendMessagePromise({
      type: "auth/sign_path", path: `/api/malarenergi/invoice/${id}`, expires: 3600 }).then((r: any) => [id, r.path] as const)))
      .then((pairs) => { if (live) setSigned(Object.fromEntries(pairs)); }).catch(() => undefined);
    sign();
    const t = setInterval(sign, 30 * 60 * 1000);
    return () => { live = false; clearInterval(t); };
  }, [visible.join(",")]);
  const year = new Date().getFullYear();
  // from the categorised lines, so a mixed invoice counts its consumption and production parts separately
  // (invoices without lines fall back to the whole amount by kind)
  const isProd = (c: string) => c.startsWith("production_");
  const ytd = (kind: string) => invoices.filter((i) => i.period_start.startsWith(String(year))).reduce((s, i) => {
    if (!i.lines?.length) return s + (i.kind === kind ? i.amount ?? 0 : 0);
    return s + i.lines.filter((l) => isProd(l.category) === (kind === "production")).reduce((a, l) => a + l.amount, 0);
  }, 0);
  return (
    <>
      <div className="kpis">
        <Kpi label={`${t.consumption} · ${year}`} info={t.wallet_info} value={money(-ytd("consumption"))} />
        <Kpi label={`${t.production} · ${year}`} info={t.wallet_info} value={money(-ytd("production"))}
          tone={-ytd("production") >= 0 ? "pos" : "neg"} />
        <Kpi label={`${t.net} · ${year}`} info={t.wallet_net_info} value={money(-(ytd("consumption") + ytd("production")))}
          tone={ytd("consumption") + ytd("production") <= 0 ? "pos" : "neg"} />
      </div>
      <section className="card">
        <h2>{t.invoices}<Info text={`${t.inv_info} ${t.wallet_info}`} /></h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>{t.period}</th><th /><th className="r">{t.amount}</th><th className="r wide">kWh</th>
              <th className="r wide">{t.fixed}</th><th className="r wide">{t.power_fee}</th><th className="r wide">{t.other}</th>
              <th>{t.due}</th><th>{t.status}</th><th /></tr></thead>
            <tbody>
              {invoices.slice(page * perPage, perPage ? (page + 1) * perPage : undefined).map((i) => {
                // expansion key: an invoice without an id must not equal the "nothing open" null
                // stable across refreshes and paging: built from the invoice's own fields, not its position
                const key = i.invoice_id ?? JSON.stringify([i.period_start, i.period_end, i.kind, i.issue_date, i.due_date,
                  i.amount, i.utilities, (i.lines ?? []).map((l) => [l.name, l.amount])]);
                return (
                <Fragment key={key}>
                <tr className="clickable" onClick={() => setOpen(open === key ? null : key)} title={t.show_lines}>
                  <td><span className={`chev ${open === key ? "open" : ""}`}>›</span>{monthName(i.period_start.slice(0, 7))}</td>
                  <td><span className={`dot ${i.kind}`} /><span className="wide">{i.kind === "production" ? t.production : t.consumption}</span></td>
                  <td className={`r ${i.amount < 0 ? "pos" : ""}`}>{money(i.amount == null ? null : -i.amount)}</td>
                  <td className="r wide">{fmt(i.kwh, 0)}</td>
                  <td className="r wide">{i.fixed ? money(-i.fixed) : "–"}</td><td className="r wide">{i.power_fee ? money(-i.power_fee) : "–"}</td>
                  <td className="r wide">{i.other ? money(-i.other) : "–"}</td>
                  <td>{shortDate(i.due_date)}</td>
                  <td><span className={`badge ${i.closed ? "ok" : "warn"}`}>{i.amount < 0 ? t.credit : i.closed ? t.paid : t.open}</span></td>
                  <td>{signed[i.invoice_id]
                    ? <a className="btn" href={signed[i.invoice_id]} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>{t.pdf}</a>
                    : <button className="btn" disabled>{t.pdf}</button>}</td>
                </tr>
                {open === key && (
                  <tr className="lines-row"><td colSpan={10}>
                    <div className="lines">
                      {Object.entries(groupLines(i.lines ?? []))
                        .sort((a, b) => Math.abs(b[1].amount) - Math.abs(a[1].amount))
                        .map(([cat, v]) => (
                          <div className="line" key={cat}>
                            <span>{(t as any)[`c_${cat}`] ?? cat}</span>
                            <span className="muted">{v.kwh ? `${fmt(v.kwh, 0)} kWh` : ""}</span>
                            <b className={v.amount < 0 ? "pos" : ""}>{money(-v.amount, 2)}</b>
                          </div>
                        ))}
                    </div>
                  </td></tr>
                )}
                </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <label>{t.per_page}
            <select value={perPage} onChange={(e) => { const n = Number(e.target.value); setPerPage(n); setPage(0); localStorage.setItem("me_per_page", String(n)); }}>
              {[6, 12, 24, 48].map((n) => <option key={n} value={n}>{n}</option>)}<option value={0}>{t.all}</option>
            </select>
          </label>
          {pages > 1 && <span className="pages">
            <button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>‹</button>
            <span>{page + 1} {t.of} {pages}</span>
            <button className="btn" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>›</button>
          </span>}
        </div>
      </section>
    </>
  );
}

/* ---------------- Contracts ---------------- */
function Contracts({ hass, t, locale }: Ctx) {
  const [rows, setRows] = useState<any[] | null>(null);
  useEffect(() => { hass.connection.sendMessagePromise({ type: "malarenergi/contracts" }).then(setRows).catch(() => setRows([])); }, []);
  if (!rows) return <div className="card">{t.loading}</div>;
  const date = (s: string) => (s ? new Date(s).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }) : "");
  const group = (active: boolean) => rows.filter((r) => (r.end === "") === active);
  return (
    <>
      {[true, false].map((active) => group(active).length > 0 && (
        <section className="card" key={String(active)}>
          <h2>{active ? t.active : t.ended}</h2>
          <div className="contracts">
            {group(active).map((c, i) => (
              <div className={`contract ${active ? "" : "old"}`} key={i}>
                <div className="label">{(t as any)[`u_${c.utility}`] ?? c.utility}</div>
                <div className="c-name">{c.product}</div>
                <div className="muted">{date(c.start)} – {c.end ? date(c.end) : t.until_further}</div>
                <div className="chips">
                  {c.fuse && <span className="chip">{t.fuse} {c.fuse}</span>}
                  {c.area && <span className="chip">{t.area} {c.area}</span>}
                  {c.yearly_kwh && <span className="chip">{fmt(c.yearly_kwh, 0)} kWh/år</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/* ---------------- Settings ---------------- */
function Settings({ hass, t, locale, narrow, opts, setOpts, d }: Ctx & { opts: Options; setOpts: (o: Options) => void; d: Data | null }) {
  const [services, setServices] = useState<string[]>([]);
  const [ph, setPh] = useState<string | null>(null);  // PowerHub integration: missing / installed / configured
  const [msg, setMsg] = useState<string | null>(null);
  // BankID page shown in a dialog over the panel; flow = the reauth flow behind it
  const [login, setLogin] = useState<{ url: string; flow: string } | null>(null);
  const [starting, setStarting] = useState(false);
  const loginRef = useRef<{ url: string; flow: string } | null>(null);  // for the unmount cleanup and the poll
  loginRef.current = login;
  const cancelFlow = (flow: string) =>
    hass.connection.sendMessagePromise({ type: "malarenergi/reauth_cancel", flow_id: flow }).catch(() => undefined);
  const closeLogin = () => {  // closing aborts the flow, so its BankID attempt stops polling
    if (login) cancelFlow(login.flow);
    setLogin(null);
    setMsg((m) => (m === t.relogin_checking ? null : m));
  };
  // leaving the panel with the dialog open must abort the flow too
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; if (loginRef.current) cancelFlow(loginRef.current.flow); }, []);
  useEffect(() => {
    if (!login) return;
    const on = async (e: MessageEvent) => {
      if (e.origin !== location.origin || e.data?.malarenergi !== "bankid-complete") return;
      setMsg(t.relogin_checking);
      // BankID done: wait for the flow itself (account check + reload) before claiming success
      // stop as soon as the dialog is closed or replaced (closing aborts the flow; that's not a success)
      const mine = login.flow, live = () => loginRef.current?.flow === mine;
      for (let i = 0; i < 40 && live(); i++) {
        await new Promise((r) => setTimeout(r, 1000));
        if (!live()) return;
        const r: any = await hass.connection.sendMessagePromise({ type: "malarenergi/reauth_status", flow_id: mine }).catch(() => null);
        if (r?.done && live()) { setLogin(null); setMsg(r.ok ? t.relogin_done : t.relogin_failed); return; }
      }
      if (live()) { cancelFlow(mine); setLogin(null); setMsg(t.relogin_failed); }  // don't leave the failed flow behind
    };
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, [login]);
  useEffect(() => {
    hass.connection.sendMessagePromise({ type: "malarenergi/settings/get" }).then((r: any) => { setServices(r.notify_services); setPh(r.powerhub); });
  }, []);
  const save = async (patch: Options) => {
    const r = await hass.connection.sendMessagePromise({ type: "malarenergi/settings/set", options: patch });
    setOpts(r.options); setMsg(t.saved); setTimeout(() => setMsg(null), 1500);
  };
  const toggle = (k: string) => (
    <div className="setting" key={k}><span>{(t as any)[k]}</span>
      <label className="switch"><input type="checkbox" checked={!!opts[k]} onChange={(e) => save({ [k]: e.target.checked })} /><span /></label></div>
  );
  const targets: string[] = opts.notify_targets ?? [];
  return (
    <div className="settings-grid">
      {login && (
        <div className="modal" role="dialog" aria-modal="true" onClick={closeLogin}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="btn ghost modal-x" aria-label={t.close} onClick={closeLogin}>✕</button>
            <iframe src={login.url} title="BankID" />
          </div>
        </div>
      )}
      <section className="card">
        <h2>{t.settings_lang}</h2>
        <div className="langs" role="radiogroup" aria-label={t.settings_lang}>
          {["auto", "en", "sv", "nb", "da", "fi", "is"].map((c) => {
            const on = (opts.language ?? "auto") === c;
            const haCode = pick(hass.locale?.language ?? hass.language, "auto").code;
            return (
              <button key={c} role="radio" aria-checked={on} className={`lang ${on ? "on" : ""} ${c === "auto" ? "auto" : ""}`}
                onClick={() => save({ language: c })}>
                <span className="flag">{c === "auto" ? "🏠" : FLAGS[c]}</span>
                <span className="lname">{c === "auto" ? t.lang_auto : LANG_NAMES[c]}
                  {c === "auto" && <small>{LANG_NAMES[haCode] ?? haCode}</small>}</span>
                {on && <span className="check">✓</span>}
              </button>
            );
          })}
        </div>
      </section>
      <section className="card">
        <h2>{t.settings_notify}</h2>
        <div className="label" style={{ margin: "4px 0 6px" }}>{t.notify_targets}</div>
        {services.length === 0 ? <div className="muted">{t.none_found}</div> : services.map((s) => (
          <div className="setting" key={s}><span>{s.replace(/^mobile_app_/, "📱 ")}</span>
            <label className="switch"><input type="checkbox" checked={targets.includes(s)}
              onChange={(e) => save({ notify_targets: e.target.checked ? [...targets, s] : targets.filter((x) => x !== s) })} /><span /></label></div>
        ))}
        {/* also when every saved target has since disappeared: the backend then falls back the same way */}
        {!targets.some((x) => services.includes(x)) && <div className="muted" style={{ marginTop: 6 }}>{t.no_targets}</div>}
        <div className="label" style={{ margin: "12px 0 6px" }}>{t.settings_notify}</div>
        {["notify_new_invoice", "notify_overdue", "notify_han_change", "notify_auth"].map(toggle)}
      </section>
      <section className="card">
        <h2>{t.settings_account}</h2>
        <div className="setting"><span>{t.relogin}<Info text={t.relogin_info} /></span>
          <button className="btn" disabled={starting || !!login} onClick={async () => {
            setStarting(true);  // one flow per click: a double-click would start an uncancellable second flow
            try {
              const r: any = await hass.connection.sendMessagePromise({ type: "malarenergi/reauth" });
              if (!mounted.current) { if (r?.flow_id) cancelFlow(r.flow_id); return; }  // left the panel meanwhile
              if (r?.url && r?.flow_id) setLogin({ url: r.url, flow: r.flow_id }); else setMsg(t.relogin_started);
            } finally { if (mounted.current) setStarting(false); }
          }}>BankID</button></div>
        <div className="setting"><span>{t.invoices_per_page}</span>
          <select className="sel" value={opts.invoices_per_page ?? 12} onChange={(e) => save({ invoices_per_page: Number(e.target.value) })}>
            {[6, 12, 24, 48].map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
      </section>
      {ph && <PowerHubSettings hass={hass} t={t} locale={locale} narrow={narrow} d={d} state={ph}
        live={opts.show_powerhub !== false} setLive={(on) => save({ show_powerhub: on })} />}
      {msg && <div className="toast">{msg}</div>}
    </div>
  );
}

const PH_REPO = "https://my.home-assistant.io/redirect/hacs_repository/?owner=8408323&repository=ha-malarenergi-powerhub&category=integration";
// PowerHub's own settings, grouped; each is one of its entities, written through HA's services
const PH_GROUPS: [string, string[]][] = [
  ["ph_home", ["select:facility_type", "select:heating_type", "number:area", "number:occupants", "switch:has_solar", "switch:has_battery", "select:ev_charger_type"]],
  ["ph_grid", ["select:fuse_size", "number:fuse_limit", "number:fuse_limit_set", "number:power_limit"]],
  ["ph_alerts", ["switch:notify_total_power_exceeded", "switch:notify_phase_load_exceeded", "switch:notify_power_limit_alert_control_on",
    "switch:notify_power_limit_alert_control_off", "switch:notify_phase_limit_alert_control_on", "switch:notify_phase_limit_alert_control_off"]],
];
const PH_STATUS = ["han_port_state", "firmware_version", "wi_fi_signal", "latest_notification"];

function PhRow({ hass, t, id, name }: { hass: any; t: T; id: string; name: string }) {
  const s = hass.states[id];
  if (!s) return null;
  const dom = id.split(".")[0], off = s.state === "unavailable" || s.state === "unknown", a = s.attributes ?? {};
  const label = (t as any)[`ph_${name}`] ?? a.friendly_name ?? name;
  const call = (svc: string, data: any) => hass.callService(dom, svc, { entity_id: id, ...data });
  let control: any;
  if (dom === "switch") {
    control = <label className="switch"><input type="checkbox" checked={s.state === "on"} disabled={off}
      onChange={(e) => call(e.target.checked ? "turn_on" : "turn_off", {})} /><span /></label>;
  } else if (dom === "select") {
    const optLabel = (o: string) => (t as any)[`ph_opt_${o}`] ?? (/^A\d+$/.test(o) ? `${o.slice(1)} A` : o.replace(/_/g, " ").toLowerCase());
    control = <select className="sel" value={s.state} disabled={off} onChange={(e) => call("select_option", { option: e.target.value })}>
      {off && <option value={s.state}>–</option>}
      {(a.options ?? []).map((o: string) => <option key={o} value={o}>{optLabel(o)}</option>)}</select>;
  } else {
    // commit on blur/Enter only, so typing "16" doesn't send 1 first; HA clamps to min/max
    const commit = (el: HTMLInputElement) => {
      const v = parseFloat(el.value);
      if (Number.isFinite(v) && String(v) !== String(parseFloat(s.state))) call("set_value", { value: v });
      else el.value = s.state;
    };
    control = <span className="row"><input key={s.state} className="sel" type="number" style={{ width: 90 }} defaultValue={s.state} disabled={off}
      min={a.min} max={a.max} step={a.step} onBlur={(e) => commit(e.currentTarget)}
      onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }} />{a.unit_of_measurement && <span className="muted">{a.unit_of_measurement}</span>}</span>;
  }
  return <div className="setting"><span>{label}</span>{control}</div>;
}

function PowerHubSettings({ hass, t, d, state, live, setLive }: Ctx & { d: Data | null; state: string; live: boolean; setLive: (on: boolean) => void }) {
  const st = hass.states as Record<string, any>;
  const p = state === "configured" ? powerhubPrefix(st, d) : undefined;
  return (
    <section className="card">
      <h2>PowerHub<Info text={t.ph_info} /></h2>
      {state === "missing" && <>
        <p className="muted">{t.ph_missing}</p>
        <a className="btn primary" href={PH_REPO} target="_blank" rel="noreferrer">{t.ph_install}</a>
      </>}
      {state === "installed" && <>
        <p className="muted">{t.ph_installed}</p>
        <a className="btn primary" href="/config/integrations/dashboard/add?domain=malarenergi_powerhub" target="_top">{t.ph_setup}</a>
      </>}
      {state === "configured" && !p && <p className="muted">{d ? t.ph_nomatch : t.loading}</p>}
      {p && <>
        <div className="setting"><span>{t.show_powerhub}</span>
          <label className="switch"><input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} /><span /></label></div>
        {PH_STATUS.map((k) => st[`sensor.${p}${k}`] && (
          <div className="setting" key={k}><span>{(t as any)[`ph_${k}`] ?? k}</span>
            <span className="muted">{st[`sensor.${p}${k}`].state}{st[`sensor.${p}${k}`].attributes?.unit_of_measurement ? ` ${st[`sensor.${p}${k}`].attributes.unit_of_measurement}` : ""}</span></div>
        ))}
        {PH_GROUPS.map(([g, keys]) => (
          <div key={g}>
            <div className="label" style={{ margin: "12px 0 4px" }}>{(t as any)[g]}</div>
            {keys.map((k) => { const [dom, name] = k.split(":"); return <PhRow key={k} hass={hass} t={t} id={`${dom}.${p}${name}`} name={name} />; })}
          </div>
        ))}
      </>}
    </section>
  );
}
