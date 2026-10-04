import importlib.util
import pathlib
import sys

_p = pathlib.Path(__file__).parents[1] / "custom_components/malarenergi/parse.py"
_spec = importlib.util.spec_from_file_location("me_parse", _p)
parse = importlib.util.module_from_spec(_spec)
sys.modules["me_parse"] = parse
_spec.loader.exec_module(parse)

FAC = {
    "data": [
        {
            "items": [
                {
                    "facilityKey": "F1",
                    "customerAccountIds": ["A1"],
                    "meteringPoints": [
                        {
                            "meteringPointId": "111",
                            "meteringPointType": {"name": "CONSUMPTION"},
                            "utilityType": {"name": "EL"},
                            "attributes": {"fuseSize": "20A"},
                        },
                        {
                            "meteringPointId": "222",
                            "meteringPointType": {"name": "PRODUCTION"},
                            "utilityType": {"name": "ELPROD"},
                        },
                        {
                            "meteringPointId": "333",
                            "meteringPointType": {"name": "CONSUMPTION"},
                            "utilityType": {"name": "ELEXT"},
                        },
                    ],
                }
            ]
        }
    ]
}


def test_facilities_pick_el_points():
    f = parse.facilities(FAC)[0]
    assert f.point("CONSUMPTION").id == "111" and f.point("CONSUMPTION").fuse == "20A"
    assert f.point("PRODUCTION").id == "222"


def test_series_groups_by_key_and_skips_missing():
    p = {
        "data": [
            {
                "values": [
                    {"key": "consumption", "x": "2026-10-02T00:00:00Z", "y": 10.5},
                    {"key": "cost", "x": "2026-10-02T00:00:00Z", "y": 20.0},
                    {"key": "consumption", "x": "2026-10-01T00:00:00Z", "y": 9.0},
                    {"key": "consumption", "x": "2026-10-03T00:00:00Z", "y": None},
                ]
            }
        ]
    }
    s = parse.series(p)
    assert s["consumption"] == [("2026-10-01T00:00:00Z", 9.0), ("2026-10-02T00:00:00Z", 10.5)]
    assert s["cost"] == [("2026-10-02T00:00:00Z", 20.0)]


def test_invoices_newest_first_and_status():
    p = {
        "data": [
            {
                "items": [
                    {
                        "invoiceId": "1",
                        "issueDate": "2026-08-04T00:00:00",
                        "invoicedAmount": 483,
                        "closedDate": "2026-08-30",
                        "paymentStatus": {"name": "ACCOUNTED"},
                        "invoiceDetails": [{"utilityType": {"name": "ELEXT"}}],
                    },
                    {
                        "invoiceId": "2",
                        "issueDate": "2026-09-04T00:00:00",
                        "invoicedAmount": -917,
                        "closedDate": None,
                        "paymentStatus": {"name": "OPEN"},
                        "invoiceDetails": [{"utilityType": {"name": "ELPROD"}}],
                    },
                ]
            }
        ]
    }
    inv = parse.invoices(p)
    assert [i["invoice_id"] for i in inv] == ["2", "1"]
    assert inv[0]["utilities"] == ["ELPROD"] and inv[0]["closed"] is False and inv[1]["closed"] is True


def test_han_and_counters():
    assert parse.han_ports(
        {"data": [[{"meteringPoints": [{"meteringPointId": "111", "hanPortStatus": {"name": "OPEN"}}]}]]}
    ) == {"111": "OPEN"}
    assert parse.unread_inbox({"data": [{"isRead": False}, {"isRead": True}]}) == 1
    assert parse.overdue_invoices({"data": [{"overDueInvoices": {"total": 2}}]}) == 2


def test_invoice_kind_kwh_and_power_fee():
    p = {
        "data": [
            {
                "items": [
                    {
                        "invoiceId": "p",
                        "issueDate": "2026-07-04",
                        "invoicedAmount": -830,
                        "invoiceDetails": [
                            {
                                "utilityType": {"name": "ELEXT"},
                                "productType": "Prod SpotTim Momsfri",
                                "consumptionMonth": -2080,
                                "costVariableMonth": -830,
                            }
                        ],
                    },
                    {
                        "invoiceId": "c",
                        "issueDate": "2026-02-04",
                        "invoicedAmount": 2839,
                        "invoiceDetails": [
                            {"utilityType": {"name": "ELEXT"}, "productType": "Spot Tim Ext", "consumptionMonth": 1170},
                            {"utilityType": {"name": "EL"}, "productType": "El kW", "costVariableMonth": 100},
                            {"utilityType": {"name": "EL"}, "productType": "El Fast Avg", "costFixedMonth": 308},
                            {"utilityType": {"name": "ELEXT"}, "productType": None, "otherMonth": 279.2},
                        ],
                    },
                ]
            }
        ]
    }
    by = {i["invoice_id"]: i for i in parse.invoices(p)}
    assert by["p"]["kind"] == "production" and by["p"]["kwh"] == 2080 and by["p"]["fixed"] == 0
    assert by["c"]["kind"] == "consumption" and by["c"]["kwh"] == 1170
    assert by["c"]["power_fee"] == 125 and by["c"]["fixed"] == 385 and by["c"]["other"] == 349


def test_invoice_lines_categorised_with_vat():
    lines = parse.invoice_lines(
        [
            {"productType": "El Fast Avg", "costFixedMonth": 318},
            {"productType": "Energiskatt Nat_Std", "taxMonth": 2.52},
            {"productType": "Spot Tim Ext", "consumptionMonth": 7, "costVariableMonth": 5.57},
            {"productType": "Spotpå Mån Ext PS", "costVariableMonth": 0.2},
            {"productType": None, "otherMonth": 279.2},
        ],
        1.25,
    )
    cats = {line["category"]: line["amount"] for line in lines}
    assert cats["grid_fixed"] == 397.5 and cats["energy_tax"] == 3.15 and cats["supply_markup"] == 0.25
    assert cats["other"] == 349.0 and lines[2]["kwh"] == 7


def test_invoice_lines_vat_and_kwh_per_line():
    # a consumption invoice that also carries a production credit (negative kWh, VAT-free)
    lines = parse.invoice_lines(
        [
            {"productType": "El Rörl Avg", "consumptionMonth": 100, "costVariableMonth": 20.0},
            {"productType": "Prod SpotTim", "consumptionMonth": -200, "costVariableMonth": -50.0},
        ],
        1.25,
    )
    grid, prod = lines
    assert grid["amount"] == 25.0 and grid["kwh"] == 100
    assert prod["amount"] == -50.0  # no VAT on production payouts
    assert prod["kwh"] == 200  # shown as a positive quantity, like the invoice summary


def test_elprod_row_with_unknown_product_is_production():
    (line,) = parse.invoice_lines(
        [
            {
                "productType": "Ny ersättning",
                "utilityType": {"name": "ELPROD"},
                "consumptionMonth": -10,
                "costVariableMonth": -5.0,
            }
        ],
        1.25,
    )
    assert line["category"] == "production_other" and line["amount"] == -5.0


def test_elext_credit_with_unknown_product_is_production():
    (line,) = parse.invoice_lines(
        [{"productType": "Ny", "utilityType": {"name": "ELEXT"}, "consumptionMonth": -50, "costVariableMonth": -20.0}],
        1.25,
    )
    assert line["category"] == "production_other" and line["amount"] == -20.0
