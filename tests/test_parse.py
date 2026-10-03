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
