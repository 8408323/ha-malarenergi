"""Pure parsing of Mitt Mälarenergi payloads (no HA imports, unit-tested)."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


def _data(payload: Any) -> list:
    d = (payload or {}).get("data") if isinstance(payload, dict) else None
    return d if isinstance(d, list) else []


def _name(obj: Any) -> str:
    return (obj or {}).get("name") or "" if isinstance(obj, dict) else ""


@dataclass
class MeteringPoint:
    id: str
    kind: str  # CONSUMPTION / PRODUCTION / …
    utility: str  # EL / ELPROD / …
    fuse: str | None = None


@dataclass
class Facility:
    key: str
    account_ids: list[str]
    points: list[MeteringPoint] = field(default_factory=list)

    def point(self, kind: str) -> MeteringPoint | None:
        return next((p for p in self.points if p.kind == kind and p.utility in ("EL", "ELPROD")), None)


def facilities(payload: Any) -> list[Facility]:
    out = []
    for page in _data(payload):
        for it in page.get("items") or []:
            f = Facility(it.get("facilityKey", ""), list(it.get("customerAccountIds") or []))
            for mp in it.get("meteringPoints") or []:
                f.points.append(
                    MeteringPoint(
                        str(mp.get("meteringPointId")),
                        _name(mp.get("meteringPointType")),
                        _name(mp.get("utilityType")),
                        (mp.get("attributes") or {}).get("fuseSize"),
                    )
                )
            out.append(f)
    return out


def series(payload: Any) -> dict[str, list[tuple[str, float]]]:
    """infraserviceSeries/el -> {key: [(x iso, value)]} per series key, sorted by time.

    Consumption points carry consumption (kWh), cost, costEL, costELEXT (SEK incl. VAT);
    production points carry production (kWh) and compensation (SEK).
    """
    out: dict[str, list[tuple[str, float]]] = {}
    for block in _data(payload):
        for v in block.get("values") or []:
            if v.get("y") is not None and not v.get("valueYMissing"):
                out.setdefault(v.get("key") or "value", []).append((v["x"], float(v["y"])))
    return {k: sorted(rows) for k, rows in out.items()}


def daily_amounts(payload: Any) -> list[tuple[str, float]]:
    """costdetails -> [(from iso, SEK incl. VAT)] per period."""
    rows = []
    for block in _data(payload):
        for d in block if isinstance(block, list) else [block]:
            if isinstance(d, dict) and d.get("totalAmountInclVat") is not None:
                rows.append((d.get("from") or "", float(d["totalAmountInclVat"])))
    return sorted(rows)


def peak(payload: Any) -> dict | None:
    d = _data(payload)
    return d[0] if d and isinstance(d[0], dict) else None


def invoices(payload: Any) -> list[dict]:
    """Compact invoice list, newest first. Utility per invoice = set of detail utility types."""
    out = []
    for page in _data(payload):
        for i in page.get("items") or []:
            details = i.get("invoiceDetails") or []
            out.append(
                {
                    "invoice_id": i.get("invoiceId"),
                    "issue_date": (i.get("issueDate") or "")[:10],
                    "due_date": (i.get("dueDate") or "")[:10],
                    "period_start": (i.get("billingPeriodStartDate") or "")[:10],
                    "period_end": (i.get("billingPeriodEndDate") or "")[:10],
                    "amount": i.get("invoicedAmount"),
                    "amount_ex_vat": i.get("invoicedAmountExVat"),
                    "status": _name(i.get("paymentStatus")),
                    "closed": bool(i.get("closedDate")),
                    "utilities": sorted({_name(d.get("utilityType")) for d in details} - {""}),
                }
            )
    return sorted(out, key=lambda x: (x["issue_date"], x["invoice_id"] or ""), reverse=True)


def han_ports(payload: Any) -> dict[str, str]:
    """meteringPointId -> OPEN/CLOSED/PENDINGOPEN/PENDINGCLOSE."""
    out = {}
    for group in _data(payload):
        for fac in group if isinstance(group, list) else [group]:
            for mp in (fac or {}).get("meteringPoints") or []:
                out[str(mp.get("meteringPointId"))] = _name(mp.get("hanPortStatus"))
    return out


def unread_inbox(payload: Any) -> int:
    return sum(1 for m in _data(payload) if isinstance(m, dict) and not m.get("isRead"))


def overdue_invoices(payload: Any) -> int:
    d = _data(payload)
    return int(((d[0] if d else {}).get("overDueInvoices") or {}).get("total") or 0)
