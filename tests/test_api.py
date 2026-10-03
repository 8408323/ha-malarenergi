import importlib.util
import pathlib
import sys

_p = pathlib.Path(__file__).parents[1] / "custom_components/malarenergi/api.py"
_spec = importlib.util.spec_from_file_location("me_api", _p)
api = importlib.util.module_from_spec(_spec)
sys.modules["me_api"] = api
_spec.loader.exec_module(api)


def test_hidden_field_parsing_unescapes():
    page = '<input type="hidden" id="ReturnUrl" name="ReturnUrl" value="/connect?a=1&amp;b=2" />'
    assert api._hidden(page, "ReturnUrl") == "/connect?a=1&b=2"
    assert api._hidden(page, "Missing") == ""


def test_first_customer_id_nested():
    assert api._first_customer_id({"user": {"customers": [{"customerId": 1234567}]}}) == 1234567
    assert api._first_customer_id({"name": "x"}) is None


def test_tokens_roundtrip():
    t = api.Tokens.from_response({"access_token": "a", "refresh_token": "r", "expires_in": 60})
    d = t.as_dict()
    assert d["access_token"] == "a" and d["refresh_token"] == "r" and d["expires_at"] > 0
