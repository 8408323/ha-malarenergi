import { useEffect, useMemo, useRef, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Series = Record<string, [string, number][]>;
type Invoice = {
  invoice_id: string; kind: string; issue_date: string; due_date: string; period_start: string; period_end: string;
  amount: number; status: string; closed: boolean; kwh: number; fixed: number; power_fee: number; other: number;
};
type Data = {
  CONSUMPTION?: { daily: Series; peak?: { peakPowerConsumption?: number; dateTime?: string; costExclVat?: number } | null };
  PRODUCTION?: { daily: Series };
  invoices?: Invoice[]; han?: Record<string, string>; fuse?: string | null; unread?: number; overdue?: number; updated?: string;
};

const SV = {
  title: "Mälarenergi", month: "Denna månad", consumption: "Förbrukning", production: "Produktion", cost: "Kostnad",
  compensation: "Ersättning", peak: "Effekttopp", net: "Netto", daily: "Per dag", invoices: "Fakturor", period: "Period",
  amount: "Belopp", due: "Förfaller", status: "Status", pdf: "PDF", paid: "Betald", open: "Obetald", credit: "Utbetalning",
  han: "HAN-port", fuse: "Säkring", none: "Ingen data ännu", loading: "Laddar…", updated: "Uppdaterad", kwh: "kWh",
  net_info: "Kostnad för köpt el minus ersättning för såld el, denna månad, enligt Mälarenergis egna mätvärden (inkl. moms, utan fasta avgifter).",
  peak_info: "Månadens högsta timeffekt från nätet enligt elmätaren.",
  daily_info: "Mälarenergis mätvärden per dag. Staplar = kWh, linje = kostnad respektive ersättning i kr.",
  inv_info: "Förbrukning och produktion faktureras separat. Fasta avgifter, effektavgift och övriga poster visas per faktura.",
  fixed: "Fasta", power_fee: "Effekt", other: "Övrigt", downloading: "Hämtar…", grid: "nät", energy: "el",
  per_page: "Per sida", of: "av", prev: "Föregående", next: "Nästa", all: "Alla",
  han_OPEN: "öppen", han_CLOSED: "stängd", han_PENDINGOPEN: "öppnas", han_PENDINGCLOSE: "stängs",
};
const EN: typeof SV = {
  title: "Mälarenergi", month: "This month", consumption: "Consumption", production: "Production", cost: "Cost",
  compensation: "Compensation", peak: "Power peak", net: "Net", daily: "Per day", invoices: "Invoices", period: "Period",
  amount: "Amount", due: "Due", status: "Status", pdf: "PDF", paid: "Paid", open: "Unpaid", credit: "Payout",
  han: "HAN port", fuse: "Fuse", none: "No data yet", loading: "Loading…", updated: "Updated", kwh: "kWh",
  net_info: "Cost of bought power minus compensation for sold power this month, from Mälarenergi's own meter values (incl. VAT, excl. fixed fees).",
  peak_info: "The month's highest hourly grid power according to the meter.",
  daily_info: "Mälarenergi's meter values per day. Bars = kWh, lines = cost and compensation in SEK.",
  inv_info: "Consumption and production are invoiced separately. Fixed fees, power fee and other items are shown per invoice.",
  fixed: "Fixed", power_fee: "Power", other: "Other", downloading: "Fetching…", grid: "grid", energy: "energy",
  per_page: "Per page", of: "of", prev: "Previous", next: "Next", all: "All",
  han_OPEN: "open", han_CLOSED: "closed", han_PENDINGOPEN: "opening", han_PENDINGCLOSE: "closing",
};

const auto = (v: number | null | undefined) => (v != null && Math.abs(v) < 10 ? 1 : 0);
const fmt = (v: number | null | undefined, d = 0, u = "") =>
  v == null || Number.isNaN(v) ? "–" : `${v.toLocaleString("sv-SE", { minimumFractionDigits: d, maximumFractionDigits: d })}${u ? " " + u : ""}`;
const localDay = (iso: string) => new Date(iso).toLocaleDateString("sv-SE");
const monthName = (ym: string, lang: string) =>
  new Date(`${ym}-15`).toLocaleDateString(lang, { month: "short", year: "numeric" });
const shortDate = (d: string, lang: string) => (d ? new Date(d).toLocaleDateString(lang, { day: "numeric", month: "short" }) : "–");

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

export default function App({ hass, narrow }: { hass: any; narrow: boolean }) {
  const sv = String(hass.locale?.language ?? hass.language ?? "en").startsWith("sv");
  const t = sv ? SV : EN;
  const lang = sv ? "sv-SE" : "en-GB";
  const [d, setD] = useState<Data | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [perPage, setPerPage] = useState<number>(() => Number(localStorage.getItem("me_per_page")) || 12);
  const [page, setPage] = useState(0);
  const stamp = Object.values(hass.states as Record<string, any>)
    .find((s) => s.entity_id.startsWith("sensor.") && s.attributes?.invoices)?.last_updated;

  useEffect(() => {
    hass.connection.sendMessagePromise({ type: "malarenergi/data" })
      .then((r: any) => { setD(r.data); setErr(null); })
      .catch((e: any) => setErr(e?.message ?? String(e)));
  }, [stamp]);

  const days = useMemo(() => {
    if (!d) return [];
    const m = new Map<string, any>();
    const add = (rows: [string, number][] | undefined, key: string) =>
      (rows ?? []).forEach(([x, v]) => { const k = localDay(x); (m.get(k) ?? m.set(k, { k }).get(k))[key] = v; });
    add(d.CONSUMPTION?.daily?.consumption, "cons");
    add(d.CONSUMPTION?.daily?.cost, "cost");
    add(d.PRODUCTION?.daily?.production, "prod");
    add(d.PRODUCTION?.daily?.compensation, "comp");
    return [...m.values()].sort((a, b) => a.k.localeCompare(b.k));
  }, [d]);

  const month = new Date().toLocaleDateString("sv-SE").slice(0, 7);
  const sum = (key: string) => days.filter((r) => r.k.startsWith(month)).reduce((s, r) => s + (r[key] ?? 0), 0);
  const costEl = (d?.CONSUMPTION?.daily?.costEL ?? []).filter(([x]) => localDay(x).startsWith(month)).reduce((s, [, v]) => s + v, 0);
  const costGrid = (d?.CONSUMPTION?.daily?.costELEXT ?? []).filter(([x]) => localDay(x).startsWith(month)).reduce((s, [, v]) => s + v, 0);
  const peak = d?.CONSUMPTION?.peak;
  const han = Object.values(d?.han ?? {})[0];

  const download = async (id: string) => {
    if (busy) return;
    setBusy(id);
    try {
      const r = await hass.callService("malarenergi", "download_invoice", { invoice_id: id }, undefined, false, true);
      const url = r?.response?.url;
      if (url) window.open(url, "_blank");
    } finally { setBusy(null); }
  };

  return (
    <div className={`page ${narrow ? "narrow" : ""}`}>
      <header>
        <h1>{t.title}</h1>
        <div className="chips">
          {han && <span className={`chip ${han === "OPEN" ? "ok" : ""}`}>{t.han}: {(t as any)[`han_${han}`] ?? han.toLowerCase()}</span>}
          {d?.fuse && <span className="chip">{t.fuse} {d.fuse}</span>}
        </div>
      </header>
      {err && <div className="card error">{err}</div>}
      {!d ? <div className="card">{err ? t.none : t.loading}</div> : (
        <>
          <div className="kpis">
            <Kpi label={`${t.consumption} · ${t.month}`} value={fmt(sum("cons"), auto(sum("cons")), "kWh")} sub={`${t.cost} ${fmt(sum("cost"), auto(sum("cost")), "kr")}`} />
            <Kpi label={`${t.production} · ${t.month}`} value={fmt(sum("prod"), auto(sum("prod")), "kWh")} sub={`${t.compensation} ${fmt(sum("comp"), auto(sum("comp")), "kr")}`} />
            <Kpi label={`${t.net} · ${t.month}`} info={t.net_info} value={fmt(sum("cost") - sum("comp"), auto(sum("cost") - sum("comp")), "kr")}
              tone={sum("cost") - sum("comp") <= 0 ? "pos" : "neg"} sub={`${t.energy} ${fmt(costEl, 0)} · ${t.grid} ${fmt(costGrid, 0)}`} />
            <Kpi label={t.peak} info={t.peak_info} value={fmt(peak?.peakPowerConsumption, (peak?.peakPowerConsumption ?? 1) < 1 ? 2 : 1, "kW")}
              sub={peak?.dateTime ? new Date(peak.dateTime).toLocaleString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""} />
          </div>

          <section className="card">
            <h2>{t.daily}<Info text={t.daily_info} /></h2>
            <ResponsiveContainer width="100%" height={narrow ? 240 : 300}>
              <ComposedChart data={days} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--me-line)" vertical={false} />
                <XAxis dataKey="k" tickFormatter={(k) => String(k).slice(5)} minTickGap={24} stroke="var(--me-muted)" fontSize={11} />
                <YAxis yAxisId="e" width={40} stroke="var(--me-muted)" fontSize={11} />
                <YAxis yAxisId="m" orientation="right" width={40} stroke="var(--me-muted)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--me-card)", border: "1px solid var(--me-line)", borderRadius: 10, fontSize: 12 }}
                  formatter={(v: any, n: any) => [fmt(Number(v), 1), n]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="e" dataKey="cons" name={`${t.consumption} (kWh)`} fill="#3daee9" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                <Bar yAxisId="e" dataKey="prod" name={`${t.production} (kWh)`} fill="#f5b301" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                <Line yAxisId="m" dataKey="cost" name={`${t.cost} (kr)`} stroke="#e5484d" dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line yAxisId="m" dataKey="comp" name={`${t.compensation} (kr)`} stroke="#2ec27e" dot={false} strokeWidth={2} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </section>

          <section className="card">
            <h2>{t.invoices}<Info text={t.inv_info} /></h2>
            <div className="table-wrap">
              <table>
                <thead><tr><th>{t.period}</th><th /><th className="r">{t.amount}</th><th className="r wide">kWh</th>
                  <th className="r wide">{t.fixed}</th><th className="r wide">{t.power_fee}</th><th className="r wide">{t.other}</th>
                  <th>{t.due}</th><th>{t.status}</th><th /></tr></thead>
                <tbody>
                  {(d.invoices ?? []).slice(page * perPage, perPage ? (page + 1) * perPage : undefined).map((i) => (
                    <tr key={i.invoice_id}>
                      <td>{monthName(i.period_start.slice(0, 7), lang)}</td>
                      <td><span className={`dot ${i.kind}`} title={i.kind === "production" ? t.production : t.consumption} /><span className="wide">{i.kind === "production" ? t.production : t.consumption}</span></td>
                      <td className={`r ${i.amount < 0 ? "pos" : ""}`}>{fmt(i.amount, 0, "kr")}</td>
                      <td className="r wide">{fmt(i.kwh, 0)}</td>
                      <td className="r wide">{fmt(i.fixed, 0)}</td><td className="r wide">{i.power_fee ? fmt(i.power_fee, 0) : "–"}</td>
                      <td className="r wide">{i.other ? fmt(i.other, 0) : "–"}</td>
                      <td>{shortDate(i.due_date, lang)}</td>
                      <td><span className={`badge ${i.closed ? "ok" : "warn"}`}>{i.amount < 0 ? t.credit : i.closed ? t.paid : t.open}</span></td>
                      <td><button className="btn" disabled={busy === i.invoice_id} onClick={() => download(i.invoice_id)}>
                        {busy === i.invoice_id ? t.downloading : t.pdf}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={(d.invoices ?? []).length} page={page} perPage={perPage} t={t}
              onPage={setPage} onPerPage={(n) => { setPerPage(n); setPage(0); localStorage.setItem("me_per_page", String(n)); }} />
          </section>
          {d.updated && <div className="muted">{t.updated} {new Date(d.updated).toLocaleString("sv-SE")}</div>}
        </>
      )}
    </div>
  );
}

function Pager({ total, page, perPage, t, onPage, onPerPage }:
  { total: number; page: number; perPage: number; t: typeof SV; onPage: (p: number) => void; onPerPage: (n: number) => void }) {
  const pages = perPage ? Math.max(1, Math.ceil(total / perPage)) : 1;
  return (
    <div className="pager">
      <label>{t.per_page}
        <select value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}>
          {[6, 12, 24, 48].map((n) => <option key={n} value={n}>{n}</option>)}
          <option value={0}>{t.all}</option>
        </select>
      </label>
      {pages > 1 && (
        <span className="pages">
          <button className="btn" disabled={page === 0} onClick={() => onPage(page - 1)} aria-label={t.prev}>‹</button>
          <span>{page + 1} {t.of} {pages}</span>
          <button className="btn" disabled={page >= pages - 1} onClick={() => onPage(page + 1)} aria-label={t.next}>›</button>
        </span>
      )}
    </div>
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
