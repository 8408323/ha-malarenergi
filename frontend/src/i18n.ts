// Default follows the Home Assistant user's language; overridable in the panel's Settings tab.
const en = {
  close: "Close", relogin_done: "Logged in with BankID.", relogin_checking: "BankID done, checking the account…", relogin_failed: "The login did not complete. Try again.",
  zoom_hint: "Drag across the chart to zoom; the slider below adjusts the same window. Double-click to reset.", table_zoom: "Zoomed", table_full: "Whole period",
  title: "Mälarenergi", tab_overview: "Overview", tab_history: "History", tab_invoices: "Invoices", tab_contracts: "Contracts", tab_settings: "Settings",
  month: "This month", consumption: "Consumption", production: "Production", cost: "Cost", compensation: "Compensation",
  peak: "Power peak", net: "Net", daily: "Last 30 days", invoices: "Invoices", period: "Period", amount: "Amount", due: "Due",
  status: "Status", pdf: "PDF", paid: "Paid", open: "Unpaid", credit: "Payout", han: "HAN port", fuse: "Fuse",
  none: "No data yet", loading: "Loading…", updated: "Updated", energy: "energy", grid: "grid",
  net_info: "Compensation for sold power minus cost of bought power this month (+ green = you earned more than you paid), from Mälarenergi's own meter values (incl. VAT, excl. fixed fees).",
  peak_info: "The month's highest hourly grid power according to the meter.",
  daily_info: "Mälarenergi's meter values. Bars = kWh, lines = cost and compensation in SEK.",
  wallet_info: "Shown from your wallet: + (green) is money paid to you, − is money you pay. Amounts incl. VAT; production payouts are VAT-free.", wallet_net_info: "Your net for the year: production payouts minus consumption invoices. Negative (red) means you paid more than you were paid.",
  inv_info: "Consumption and production are invoiced separately. Fixed fees, power fee and other items are shown per invoice.",
  fixed: "Fixed", power_fee: "Power", other: "Other", downloading: "Fetching…", per_page: "Per page", of: "of", all: "All",
  han_OPEN: "open", han_CLOSED: "closed", han_PENDINGOPEN: "opening", han_PENDINGCLOSE: "closing",
  res_hour: "Day", res_day: "Month", res_month: "Year", total: "Total", prev: "Previous", next: "Next", today: "Now",
  history_info: "Choose Day (per hour), Month (per day) or Year (per month) and step back in time. Drag the handles under the chart to zoom.",
  contracts: "Contracts", product: "Product", start: "Start", end: "End", until_further: "Until further notice", area: "Grid area",
  active: "Active", ended: "Ended", yearly: "Expected kWh/year",
  u_EL: "Grid", u_ELEXT: "Electricity supply", u_ELPROD: "Grid production", u_BB: "Broadband", u_FV: "District heating",
  settings_lang: "Language", lang_auto: "Same as Home Assistant", settings_notify: "Notifications",
  notify_targets: "Send to", no_targets: "No recipient selected: notifications appear in Home Assistant's notification panel.", notify_new_invoice: "New invoice", notify_overdue: "Overdue invoice", notify_han_change: "HAN port changed",
  notify_auth: "Login expired", settings_account: "Account", relogin: "Log in again with BankID",
  relogin_info: "Starts a new BankID login. It shows up as a notification under Settings → Devices & services.",
  relogin_started: "Login started — open Settings → Devices & services in Home Assistant.", saved: "Saved", none_found: "No notify services found",
  invoices_per_page: "Invoices per page",
  c_grid_fixed: "Grid fixed fee (fuse)", c_grid_transfer: "Grid transfer", c_power_fee: "Power fee", c_energy_tax: "Energy tax",
  c_spot_energy: "Electricity (spot)", c_supply_markup: "Supplier markup", c_supply_fixed: "Supplier fixed fee", c_broadband: "Broadband",
  c_production_spot: "Sold electricity (spot)", c_production_bonus: "Production bonus", c_production_grid: "Grid benefit", c_production_other: "Other production payout", c_other: "Other",
  show_lines: "Show invoice lines",
};
type Dict = typeof en;

const sv: Dict = {
  ...en,
  close: "Stäng", relogin_done: "Inloggad med BankID.", relogin_checking: "BankID klart, kontrollerar kontot…", relogin_failed: "Inloggningen blev inte klar. Försök igen.",
  zoom_hint: "Dra över diagrammet för att zooma; reglaget under justerar samma fönster. Dubbelklicka för att återställa.", table_zoom: "Inzoomat", table_full: "Hela perioden", tab_overview: "Översikt", tab_history: "Historik", tab_invoices: "Fakturor", tab_contracts: "Avtal", tab_settings: "Inställningar",
  month: "Denna månad", consumption: "Förbrukning", production: "Produktion", cost: "Kostnad", compensation: "Ersättning",
  peak: "Effekttopp", net: "Netto", daily: "Senaste 30 dagarna", invoices: "Fakturor", period: "Period", amount: "Belopp", due: "Förfaller",
  status: "Status", paid: "Betald", open: "Obetald", credit: "Utbetalning", han: "HAN-port", fuse: "Säkring",
  none: "Ingen data ännu", loading: "Laddar…", updated: "Uppdaterad", energy: "el", grid: "nät",
  net_info: "Ersättning för såld el minus kostnad för köpt el, denna månad (+ grönt = du fick mer än du betalade), enligt Mälarenergis egna mätvärden (inkl. moms, utan fasta avgifter).",
  peak_info: "Månadens högsta timeffekt från nätet enligt elmätaren.",
  daily_info: "Mälarenergis mätvärden. Staplar = kWh, linjer = kostnad respektive ersättning i kr.",
  wallet_info: "Visas från din plånbok: + (grönt) är pengar till dig, − är pengar du betalar. Belopp inkl. moms; ersättning för produktion är momsfri.", wallet_net_info: "Ditt netto för året: utbetalningar för produktion minus fakturor för förbrukning. Negativt (rött) betyder att du betalat mer än du fått.",
  inv_info: "Förbrukning och produktion faktureras separat. Fasta avgifter, effektavgift och övriga poster visas per faktura.",
  fixed: "Fasta", power_fee: "Effekt", other: "Övrigt", downloading: "Hämtar…", per_page: "Per sida", of: "av", all: "Alla",
  han_OPEN: "öppen", han_CLOSED: "stängd", han_PENDINGOPEN: "öppnas", han_PENDINGCLOSE: "stängs",
  res_hour: "Dag", res_day: "Månad", res_month: "År", total: "Totalt", prev: "Föregående", next: "Nästa", today: "Nu",
  history_info: "Välj Dag (per timme), Månad (per dag) eller År (per månad) och bläddra bakåt. Dra i handtagen under grafen för att zooma.",
  contracts: "Avtal", product: "Produkt", start: "Start", end: "Slut", until_further: "Tills vidare", area: "Nätområde",
  active: "Aktiva", ended: "Avslutade", yearly: "Förväntad kWh/år",
  u_EL: "Elnät", u_ELEXT: "Elhandel", u_ELPROD: "Elnät produktion", u_BB: "Bredband", u_FV: "Fjärrvärme",
  settings_lang: "Språk", lang_auto: "Som Home Assistant", settings_notify: "Notiser",
  notify_targets: "Skicka till", no_targets: "Ingen mottagare vald: notiser visas i Home Assistants notispanel.", notify_new_invoice: "Ny faktura", notify_overdue: "Förfallen faktura", notify_han_change: "HAN-port ändrad",
  notify_auth: "Inloggning utgången", settings_account: "Konto", relogin: "Logga in igen med BankID",
  relogin_info: "Startar en ny BankID-inloggning. Den syns som en notis under Inställningar → Enheter och tjänster.",
  relogin_started: "Inloggning startad — öppna Inställningar → Enheter och tjänster i Home Assistant.", saved: "Sparat", none_found: "Inga notify-tjänster hittades",
  invoices_per_page: "Fakturor per sida",
  c_grid_fixed: "Elnät fast avgift (säkring)", c_grid_transfer: "Elöverföring", c_power_fee: "Effektavgift", c_energy_tax: "Energiskatt",
  c_spot_energy: "El (spotpris)", c_supply_markup: "Elhandel påslag", c_supply_fixed: "Elhandel fast avgift", c_broadband: "Bredband",
  c_production_spot: "Såld el (spotpris)", c_production_bonus: "Produktionsersättning", c_production_grid: "Nätnytta", c_production_other: "Övrig produktionsersättning", c_other: "Övrigt",
  show_lines: "Visa fakturarader",
};

const nb: Dict = {
  ...en,
  zoom_hint: "Dra over diagrammet for å zoome; glidebryteren under justerer samme vindu. Dobbeltklikk for å tilbakestille.", table_zoom: "Zoomet", table_full: "Hele perioden",
  wallet_info: "Vist fra lommeboken din: + (grønn) er penger til deg, − er penger du betaler. Beløp inkl. mva; produksjonsutbetaling er mva-fri.", wallet_net_info: "Ditt netto for året: utbetalinger for produksjon minus fakturaer for forbruk. Negativt (rødt) betyr at du har betalt mer enn du har fått.", tab_overview: "Oversikt", tab_history: "Historikk", tab_invoices: "Fakturaer", tab_contracts: "Avtaler", tab_settings: "Innstillinger",
  month: "Denne måneden", consumption: "Forbruk", production: "Produksjon", cost: "Kostnad", compensation: "Godtgjørelse",
  peak: "Effekttopp", net: "Netto", daily: "Siste 30 dager", invoices: "Fakturaer", period: "Periode", amount: "Beløp", due: "Forfall",
  paid: "Betalt", open: "Ubetalt", credit: "Utbetaling", han: "HAN-port", fuse: "Sikring", none: "Ingen data ennå", loading: "Laster…",
  updated: "Oppdatert", energy: "strøm", grid: "nett", fixed: "Faste", power_fee: "Effekt", other: "Annet", downloading: "Henter…",
  per_page: "Per side", of: "av", all: "Alle", han_OPEN: "åpen", han_CLOSED: "stengt", han_PENDINGOPEN: "åpnes", han_PENDINGCLOSE: "stenges",
  res_hour: "Dag", res_day: "Måned", res_month: "År", total: "Totalt", prev: "Forrige", next: "Neste", today: "Nå",
  contracts: "Avtaler", product: "Produkt", end: "Slutt", until_further: "Inntil videre", area: "Nettområde", active: "Aktive", ended: "Avsluttet",
  u_EL: "Strømnett", u_ELEXT: "Strømavtale", u_ELPROD: "Nett produksjon", u_BB: "Bredbånd", u_FV: "Fjernvarme",
  settings_lang: "Språk", lang_auto: "Som Home Assistant", settings_notify: "Varsler", notify_targets: "Send til", no_targets: "Ingen mottaker valgt: varsler vises i Home Assistants varselpanel.",
  notify_new_invoice: "Ny faktura", notify_overdue: "Forfalt faktura", notify_han_change: "HAN-port endret", notify_auth: "Innlogging utløpt",
  settings_account: "Konto", relogin: "Logg inn igjen med BankID", saved: "Lagret", invoices_per_page: "Fakturaer per side",
};

const da: Dict = {
  ...en,
  zoom_hint: "Træk hen over diagrammet for at zoome; skyderen nedenfor justerer samme vindue. Dobbeltklik for at nulstille.", table_zoom: "Zoomet", table_full: "Hele perioden",
  wallet_info: "Vist fra din pung: + (grøn) er penge til dig, − er penge du betaler. Beløb inkl. moms; afregning for produktion er momsfri.", wallet_net_info: "Dit netto for året: udbetalinger for produktion minus fakturaer for forbrug. Negativt (rødt) betyder, at du har betalt mere, end du har fået.", tab_overview: "Overblik", tab_history: "Historik", tab_invoices: "Fakturaer", tab_contracts: "Aftaler", tab_settings: "Indstillinger",
  month: "Denne måned", consumption: "Forbrug", production: "Produktion", cost: "Omkostning", compensation: "Godtgørelse",
  peak: "Effekttop", net: "Netto", daily: "Seneste 30 dage", invoices: "Fakturaer", period: "Periode", amount: "Beløb", due: "Forfald",
  paid: "Betalt", open: "Ubetalt", credit: "Udbetaling", han: "HAN-port", fuse: "Sikring", none: "Ingen data endnu", loading: "Indlæser…",
  updated: "Opdateret", energy: "el", grid: "net", fixed: "Faste", power_fee: "Effekt", other: "Andet", downloading: "Henter…",
  per_page: "Pr. side", of: "af", all: "Alle", han_OPEN: "åben", han_CLOSED: "lukket", han_PENDINGOPEN: "åbner", han_PENDINGCLOSE: "lukker",
  res_hour: "Dag", res_day: "Måned", res_month: "År", total: "I alt", prev: "Forrige", next: "Næste", today: "Nu",
  contracts: "Aftaler", product: "Produkt", end: "Slut", until_further: "Indtil videre", area: "Netområde", active: "Aktive", ended: "Afsluttede",
  u_EL: "Elnet", u_ELEXT: "Elaftale", u_ELPROD: "Elnet produktion", u_BB: "Bredbånd", u_FV: "Fjernvarme",
  settings_lang: "Sprog", lang_auto: "Som Home Assistant", settings_notify: "Notifikationer", notify_targets: "Send til", no_targets: "Ingen modtager valgt: notifikationer vises i Home Assistants notifikationspanel.",
  notify_new_invoice: "Ny faktura", notify_overdue: "Forfalden faktura", notify_han_change: "HAN-port ændret", notify_auth: "Login udløbet",
  settings_account: "Konto", relogin: "Log ind igen med BankID", saved: "Gemt", invoices_per_page: "Fakturaer pr. side",
};

const fi: Dict = {
  ...en,
  zoom_hint: "Vedä kaavion yli zoomataksesi; alla oleva liukusäädin säätää samaa ikkunaa. Palauta kaksoisnapsautuksella.", table_zoom: "Zoomattu", table_full: "Koko jakso",
  wallet_info: "Näytetään lompakkosi kannalta: + (vihreä) on sinulle maksettua rahaa, − on rahaa, jonka maksat. Summat sis. ALV; tuotannon hyvitys on ALV-vapaa.", wallet_net_info: "Vuoden nettosi: tuotannon hyvitykset miinus kulutuslaskut. Negatiivinen (punainen) tarkoittaa, että olet maksanut enemmän kuin saanut.", tab_overview: "Yleiskatsaus", tab_history: "Historia", tab_invoices: "Laskut", tab_contracts: "Sopimukset", tab_settings: "Asetukset",
  month: "Tämä kuukausi", consumption: "Kulutus", production: "Tuotanto", cost: "Kustannus", compensation: "Hyvitys",
  peak: "Tehohuippu", net: "Netto", daily: "Viimeiset 30 päivää", invoices: "Laskut", period: "Jakso", amount: "Summa", due: "Eräpäivä",
  paid: "Maksettu", open: "Maksamatta", credit: "Maksu sinulle", han: "HAN-portti", fuse: "Sulake", none: "Ei vielä tietoja", loading: "Ladataan…",
  updated: "Päivitetty", energy: "sähkö", grid: "verkko", fixed: "Kiinteät", power_fee: "Teho", other: "Muut", downloading: "Haetaan…",
  per_page: "Sivulla", of: "/", all: "Kaikki", han_OPEN: "auki", han_CLOSED: "kiinni", han_PENDINGOPEN: "avautuu", han_PENDINGCLOSE: "sulkeutuu",
  res_hour: "Päivä", res_day: "Kuukausi", res_month: "Vuosi", total: "Yhteensä", prev: "Edellinen", next: "Seuraava", today: "Nyt",
  contracts: "Sopimukset", product: "Tuote", start: "Alku", end: "Loppu", until_further: "Toistaiseksi", area: "Verkkoalue", active: "Voimassa", ended: "Päättyneet",
  u_EL: "Sähköverkko", u_ELEXT: "Sähkösopimus", u_ELPROD: "Verkko tuotanto", u_BB: "Laajakaista", u_FV: "Kaukolämpö",
  settings_lang: "Kieli", lang_auto: "Kuten Home Assistant", settings_notify: "Ilmoitukset", notify_targets: "Lähetä", no_targets: "Vastaanottajaa ei ole valittu: ilmoitukset näkyvät Home Assistantin ilmoituspaneelissa.",
  notify_new_invoice: "Uusi lasku", notify_overdue: "Erääntynyt lasku", notify_han_change: "HAN-portti muuttui", notify_auth: "Kirjautuminen vanhentui",
  settings_account: "Tili", relogin: "Kirjaudu uudelleen BankID:llä", saved: "Tallennettu", invoices_per_page: "Laskuja sivulla",
};

const is: Dict = {
  ...en,
  zoom_hint: "Dragðu yfir grafið til að þysja; sleðinn fyrir neðan stillir sama glugga. Tvísmelltu til að endurstilla.", table_zoom: "Þysjað", table_full: "Allt tímabilið",
  wallet_info: "Sýnt frá veskinu þínu: + (grænt) eru peningar til þín, − eru peningar sem þú greiðir. Upphæðir með VSK; greiðsla fyrir framleiðslu er án VSK.", wallet_net_info: "Nettó ársins: greiðslur fyrir framleiðslu að frádregnum reikningum fyrir notkun. Neikvætt (rautt) þýðir að þú hefur greitt meira en þú fékkst.", tab_overview: "Yfirlit", tab_history: "Saga", tab_invoices: "Reikningar", tab_contracts: "Samningar", tab_settings: "Stillingar",
  month: "Þessi mánuður", consumption: "Notkun", production: "Framleiðsla", cost: "Kostnaður", compensation: "Endurgreiðsla",
  peak: "Aflstoppur", net: "Nettó", daily: "Síðustu 30 dagar", invoices: "Reikningar", period: "Tímabil", amount: "Upphæð", due: "Gjalddagi",
  paid: "Greitt", open: "Ógreitt", credit: "Útgreiðsla", han: "HAN-tengi", fuse: "Öryggi", none: "Engin gögn enn", loading: "Hleð…",
  updated: "Uppfært", fixed: "Föst", power_fee: "Afl", other: "Annað", per_page: "Á síðu", of: "af", all: "Allt",
  res_hour: "Dagur", res_day: "Mánuður", res_month: "Ár", total: "Samtals", prev: "Fyrri", next: "Næsta", today: "Núna",
  contracts: "Samningar", until_further: "Ótímabundið", active: "Virkir", ended: "Lokið",
  settings_lang: "Tungumál", lang_auto: "Eins og Home Assistant", settings_notify: "Tilkynningar", notify_targets: "Senda til", no_targets: "Enginn viðtakandi valinn: tilkynningar birtast í tilkynningaspjaldi Home Assistant.",
  notify_new_invoice: "Nýr reikningur", notify_overdue: "Gjaldfallinn reikningur", settings_account: "Aðgangur", relogin: "Skrá inn aftur með BankID",
  saved: "Vistað",
};

export const DICTS: Record<string, Dict> = { en, sv, nb, da, fi, is };
export const LANG_NAMES: Record<string, string> = { en: "English", sv: "Svenska", nb: "Norsk", da: "Dansk", fi: "Suomi", is: "Íslenska" };
export type T = Dict;

export function pick(hassLang: string | undefined, setting: string | undefined): { t: Dict; locale: string; code: string } {
  let code = setting && setting !== "auto" ? setting : String(hassLang ?? "en").toLowerCase();
  if (code.startsWith("no") || code === "nn") code = "nb";
  code = code.slice(0, 2);
  const t = DICTS[code] ?? en;
  const locale = { sv: "sv-SE", nb: "nb-NO", da: "da-DK", fi: "fi-FI", is: "is-IS" }[code] ?? "en-GB";
  return { t, locale, code: DICTS[code] ? code : "en" };
}
