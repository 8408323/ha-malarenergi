//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), u = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && j(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = u();
})), f = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function O(e, t) {
		return D(e.type, t, e.props);
	}
	function k(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function A(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var j = /\/+/g;
	function M(e, t) {
		return typeof e == "object" && e && e.key != null ? A("" + e.key) : t.toString(36);
	}
	function N(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ee(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ee(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + M(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(j, "$&/") + "/"), ee(o, r, i, "", function(e) {
			return e;
		})) : o != null && (k(o) && (o = O(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(j, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + M(a, u), c += ee(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + M(a, u++), c += ee(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ee(N(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function te(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ee(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ne(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var re = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ie(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, re);
		} catch (e) {
			re(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function ae(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else ie(ae.bind(null, e));
	}
	var oe = {
		map: te,
		forEach: function(e, t, n) {
			te(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return te(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return te(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!k(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = oe, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = ae, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = k, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ne
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = ie, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.0";
})), p = /* @__PURE__ */ o(((e, t) => {
	t.exports = f();
})), m = /* @__PURE__ */ o(((e) => {
	var t = p();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.0";
})), h = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = m();
})), g = /* @__PURE__ */ o(((e) => {
	var t = d(), n = p(), r = h();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function m(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && m(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var x = null, S = null;
	function C(e, t, n) {
		return e === n || e === t && (x = e, !0);
	}
	function w(e, t, n) {
		return e === n ? (S = e, !1) : e === t && (S !== null && (x = e), !0);
	}
	function T(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function E(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var D = Object.assign, O = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), se = Symbol.for("react.activity"), ce = Symbol.for("react.legacy_hidden"), le = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.for("react.view_transition"), de = Symbol.for("react.recoverable"), fe = Symbol.iterator;
	function pe(e) {
		return typeof e != "object" || !e ? null : (e = fe && e[fe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var me = Symbol.for("react.client.reference");
	function he(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === me ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case j: return "Fragment";
			case N: return "Profiler";
			case M: return "StrictMode";
			case re: return "Suspense";
			case ie: return "SuspenseList";
			case se: return "Activity";
			case ue: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case ne:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ae: return t = e.displayName || null, t === null ? he(e.type) || "Memo" : t;
			case oe:
				t = e._payload, e = e._init;
				try {
					return he(e(t));
				} catch {}
		}
		return null;
	}
	var ge = Array.isArray, P = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _e = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ve = [], ye = -1;
	function I(e) {
		return { current: e };
	}
	function be(e) {
		0 > ye || (e.current = ve[ye], ve[ye] = null, ye--);
	}
	function xe(e, t) {
		ye++, ve[ye] = e.current, e.current = t;
	}
	var Se = I(null), Ce = I(null), we = I(null), Te = I(null);
	function Ee(e, t) {
		switch (xe(we, t), xe(Ce, e), xe(Se, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? fp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = fp(t), e = pp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		be(Se), xe(Se, e);
	}
	function De() {
		be(Se), be(Ce), be(we);
	}
	function Oe(e) {
		var t = e.memoizedState;
		t !== null && (ch._currentValue = t.memoizedState, xe(Te, e)), t = Se.current;
		var n = pp(t, e.type);
		t !== n && (xe(Ce, e), xe(Se, n));
	}
	function ke(e) {
		Ce.current === e && (be(Se), be(Ce)), Te.current === e && (be(Te), ch._currentValue = _e);
	}
	var Ae, je;
	function Me(e) {
		if (Ae === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ae = t && t[1] || "", je = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ae + e + je;
	}
	var Ne = !1;
	function Pe(e, t) {
		if (!e || Ne) return "";
		Ne = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Ne = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Me(n) : "";
	}
	function Fe(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Me(e.type);
			case 16: return Me("Lazy");
			case 13: return e.child !== t && t !== null ? Me("Suspense Fallback") : Me("Suspense");
			case 19: return Me("SuspenseList");
			case 0:
			case 15: return Pe(e.type, !1);
			case 11: return Pe(e.type.render, !1);
			case 1: return Pe(e.type, !0);
			case 31: return Me("Activity");
			case 30: return Me("ViewTransition");
			default: return "";
		}
	}
	function Ie(e) {
		try {
			var t = "", n = null;
			do
				t += Fe(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Le = Object.prototype.hasOwnProperty, Re = t.unstable_scheduleCallback, ze = t.unstable_cancelCallback, Be = t.unstable_shouldYield, Ve = t.unstable_requestPaint, L = t.unstable_now, He = t.unstable_getCurrentPriorityLevel, Ue = t.unstable_ImmediatePriority, We = t.unstable_UserBlockingPriority, Ge = t.unstable_NormalPriority, Ke = t.unstable_LowPriority, qe = t.unstable_IdlePriority, Je = t.log, Ye = t.unstable_setDisableYieldValue, Xe = null, Ze = null;
	function Qe(e) {
		if (typeof Je == "function" && Ye(e), Ze && typeof Ze.setStrictMode == "function") try {
			Ze.setStrictMode(Xe, e);
		} catch {}
	}
	var $e = Math.clz32 ? Math.clz32 : nt, et = Math.log, tt = Math.LN2;
	function nt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (et(e) / tt | 0) | 0;
	}
	var rt = 256, it = 262144, at = 4194304;
	function ot(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function st(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ot(n))) : i = ot(o) : i = ot(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ot(n))) : i = ot(o)) : i = ot(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ct(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function lt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - $e(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function ut(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function dt() {
		var e = at;
		return at <<= 1, !(at & 62914560) && (at = 4194304), e;
	}
	function ft(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function pt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function mt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - $e(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ht(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ht(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - $e(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function gt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - $e(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function _t(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : vt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function vt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function yt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function bt() {
		var e = F.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : wh(e.type)) : e;
	}
	function xt(e, t) {
		var n = F.p;
		try {
			return F.p = e, t();
		} finally {
			F.p = n;
		}
	}
	var St = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + St, wt = "__reactProps$" + St, Tt = "__reactContainer$" + St, Et = "__reactEvents$" + St, Dt = "__reactListeners$" + St, Ot = "__reactHandles$" + St, kt = "__reactResources$" + St, At = "__reactMarker$" + St, jt = "__reactLoad$" + St;
	function Mt(e) {
		delete e[Ct], delete e[wt], delete e[Dt], delete e[Ot];
	}
	function Nt(e) {
		var t;
		if (t = e[Ct]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Tt] || n[Ct]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pm(e); e !== null;) {
					if (n = e[Ct]) return n;
					e = pm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Pt(e) {
		if (e = e[Ct] || e[Tt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ft(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function It(e) {
		var t = e[kt];
		return t ||= e[kt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Lt(e) {
		e[At] = !0;
	}
	function Rt(e) {
		e[jt] = void 0;
	}
	var zt = /* @__PURE__ */ new Set(), Bt = {};
	function Vt(e, t) {
		Ht(e, t), Ht(e + "Capture", t);
	}
	function Ht(e, t) {
		for (Bt[e] = t, e = 0; e < t.length; e++) zt.add(t[e]);
	}
	var Ut = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Wt = {}, Gt = {};
	function Kt(e) {
		return Le.call(Gt, e) ? !0 : Le.call(Wt, e) ? !1 : Ut.test(e) ? Gt[e] = !0 : (Wt[e] = !0, !1);
	}
	var R = !1;
	function qt() {
		var e = R;
		return R = !1, e;
	}
	function Jt(e, t, n) {
		if (Kt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Yt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Xt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Zt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Qt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function $t(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function en(e) {
		if (!e._valueTracker) {
			var t = Qt(e) ? "checked" : "value";
			e._valueTracker = $t(e, t, "" + e[t]);
		}
	}
	function tn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Qt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var nn = /[\n"\\]/g;
	function rn(e) {
		return e.replace(nn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function an(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : sn(e, Zt(n)) : o === "number" && e.value == t ? sn(e, Zt(e.value)) : sn(e, Zt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Zt(s) : e.removeAttribute("name");
	}
	function on(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				en(e);
				return;
			}
			n = n == null ? "" : "" + Zt(n), t = t == null ? n : "" + Zt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), en(e);
	}
	function sn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function cn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Zt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function ln(e, t, n) {
		if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Zt(n);
	}
	function un(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ge(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Zt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), en(e);
	}
	function dn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var fn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function pn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || fn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function mn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", R = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (pn(e, a, r), R = !0);
		} else for (var o in t) t.hasOwnProperty(o) && pn(e, o, t[o]);
	}
	function hn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var gn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), _n = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function vn(e) {
		return _n.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function yn() {}
	var bn = null;
	function xn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Sn = null, Cn = null;
	function wn(e) {
		var t = Pt(e);
		if (t && (e = t.stateNode)) {
			var n = e[wt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (an(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + rn("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[wt] || null;
								if (!a) throw Error(i(90));
								an(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && tn(r);
					}
					break a;
				case "textarea":
					ln(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && cn(e, !!n.multiple, t, !1);
			}
		}
	}
	var Tn = !1;
	function En(e, t, n) {
		if (Tn) return e(t, n);
		Tn = !0;
		try {
			return e(t);
		} finally {
			if (Tn = !1, (Sn !== null || Cn !== null) && (zd(), Sn && (t = Sn, e = Cn, Cn = Sn = null, wn(t), e))) for (t = 0; t < e.length; t++) wn(e[t]);
		}
	}
	function Dn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[wt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var On = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, kn = !1;
	if (On) try {
		var An = {};
		Object.defineProperty(An, "passive", { get: function() {
			kn = !0;
		} }), window.addEventListener("test", An, An), window.removeEventListener("test", An, An);
	} catch {
		kn = !1;
	}
	var jn = null, Mn = null, Nn = null;
	function Pn() {
		if (Nn) return Nn;
		var e, t = Mn, n = t.length, r, i = "value" in jn ? jn.value : jn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Nn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Fn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function In() {
		return !0;
	}
	function Ln() {
		return !1;
	}
	function Rn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? In : Ln, this.isPropagationStopped = Ln, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = In);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = In);
			},
			persist: function() {},
			isPersistent: In
		}), t;
	}
	var zn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Bn = Rn(zn), Vn = D({}, zn, {
		view: 0,
		detail: 0
	}), Hn = Rn(Vn), Un, Wn, Gn, Kn = D({}, Vn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: rr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Gn && (Gn && e.type === "mousemove" ? (Un = e.screenX - Gn.screenX, Wn = e.screenY - Gn.screenY) : Wn = Un = 0, Gn = e), Un);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Wn;
		}
	}), qn = Rn(Kn), Jn = Rn(D({}, Kn, { dataTransfer: 0 })), Yn = Rn(D({}, Vn, { relatedTarget: 0 })), Xn = Rn(D({}, zn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Zn = Rn(D({}, zn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Qn = Rn(D({}, zn, { data: 0 })), $n = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, er = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, tr = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function nr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = tr[e]) ? !!t[e] : !1;
	}
	function rr() {
		return nr;
	}
	var ir = Rn(D({}, Vn, {
		key: function(e) {
			if (e.key) {
				var t = $n[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Fn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? er[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: rr,
		charCode: function(e) {
			return e.type === "keypress" ? Fn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Fn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), ar = Rn(D({}, Kn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), or = Rn(D({}, zn, { submitter: 0 })), sr = Rn(D({}, Vn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: rr
	})), cr = Rn(D({}, zn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), lr = Rn(D({}, Kn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), ur = Rn(D({}, zn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), dr = [
		9,
		13,
		27,
		32
	], fr = On && "CompositionEvent" in window, pr = null;
	On && "documentMode" in document && (pr = document.documentMode);
	var mr = On && "TextEvent" in window && !pr, hr = On && (!fr || pr && 8 < pr && 11 >= pr), gr = " ", _r = !1;
	function vr(e, t) {
		switch (e) {
			case "keyup": return dr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function yr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var br = !1;
	function xr(e, t) {
		switch (e) {
			case "compositionend": return yr(t);
			case "keypress": return t.which === 32 ? (_r = !0, gr) : null;
			case "textInput": return e = t.data, e === gr && _r ? null : e;
			default: return null;
		}
	}
	function Sr(e, t) {
		if (br) return e === "compositionend" || !fr && vr(e, t) ? (e = Pn(), Nn = Mn = jn = null, br = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return hr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Cr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function wr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Cr[e.type] : t === "textarea";
	}
	function Tr(e, t, n, r) {
		Sn ? Cn ? Cn.push(r) : Cn = [r] : Sn = r, t = Yf(t, "onChange"), 0 < t.length && (n = new Bn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Er = null, Dr = null;
	function Or(e) {
		Hf(e, 0);
	}
	function kr(e) {
		if (tn(Ft(e))) return e;
	}
	function Ar(e, t) {
		if (e === "change") return t;
	}
	var jr = !1;
	if (On) {
		var Mr;
		if (On) {
			var Nr = "oninput" in document;
			if (!Nr) {
				var Pr = document.createElement("div");
				Pr.setAttribute("oninput", "return;"), Nr = typeof Pr.oninput == "function";
			}
			Mr = Nr;
		} else Mr = !1;
		jr = Mr && (!document.documentMode || 9 < document.documentMode);
	}
	function Fr() {
		Er && (Er.detachEvent("onpropertychange", Ir), Dr = Er = null);
	}
	function Ir(e) {
		if (e.propertyName === "value" && kr(Dr)) {
			var t = [];
			Tr(t, Dr, e, xn(e)), En(Or, t);
		}
	}
	function Lr(e, t, n) {
		e === "focusin" ? (Fr(), Er = t, Dr = n, Er.attachEvent("onpropertychange", Ir)) : e === "focusout" && Fr();
	}
	function Rr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return kr(Dr);
	}
	function zr(e, t) {
		if (e === "click") return kr(t);
	}
	function Br(e, t) {
		if (e === "input" || e === "change") return kr(t);
	}
	function Vr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Hr = typeof Object.is == "function" ? Object.is : Vr;
	function Ur(e, t) {
		if (Hr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Le.call(t, i) || !Hr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Wr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Gr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Kr(e, t) {
		var n = Gr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Gr(n);
		}
	}
	function qr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Jr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Wr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Wr(e.document);
		}
		return t;
	}
	function Yr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Xr = On && "documentMode" in document && 11 >= document.documentMode, Zr = null, Qr = null, $r = null, ei = !1;
	function ti(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ei || Zr == null || Zr !== Wr(r) || (r = Zr, "selectionStart" in r && Yr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), $r && Ur($r, r) || ($r = r, r = Yf(Qr, "onSelect"), 0 < r.length && (t = new Bn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Zr)));
	}
	function ni(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var ri = {
		animationend: ni("Animation", "AnimationEnd"),
		animationiteration: ni("Animation", "AnimationIteration"),
		animationstart: ni("Animation", "AnimationStart"),
		transitionrun: ni("Transition", "TransitionRun"),
		transitionstart: ni("Transition", "TransitionStart"),
		transitioncancel: ni("Transition", "TransitionCancel"),
		transitionend: ni("Transition", "TransitionEnd")
	}, ii = {}, ai = {};
	On && (ai = document.createElement("div").style, "AnimationEvent" in window || (delete ri.animationend.animation, delete ri.animationiteration.animation, delete ri.animationstart.animation), "TransitionEvent" in window || delete ri.transitionend.transition);
	function oi(e) {
		if (ii[e]) return ii[e];
		if (!ri[e]) return e;
		var t = ri[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in ai) return ii[e] = t[n];
		return e;
	}
	var si = oi("animationend"), ci = oi("animationiteration"), li = oi("animationstart"), ui = oi("transitionrun"), di = oi("transitionstart"), fi = oi("transitioncancel"), pi = oi("transitionend"), z = /* @__PURE__ */ new Map(), mi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	mi.push("scrollEnd");
	function hi(e, t) {
		z.set(e, t), Vt(t, [e]);
	}
	var gi = 0;
	function _i(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = bd.identifierPrefix;
		var n = gi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function vi(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Od;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function yi(e, t) {
		return e = vi(e), t = vi(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var bi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, xi = [], Si = 0, Ci = 0;
	function wi() {
		for (var e = Si, t = Ci = Si = 0; t < e;) {
			var n = xi[t];
			xi[t++] = null;
			var r = xi[t];
			xi[t++] = null;
			var i = xi[t];
			xi[t++] = null;
			var a = xi[t];
			if (xi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Di(n, i, a);
		}
	}
	function Ti(e, t, n, r) {
		xi[Si++] = e, xi[Si++] = t, xi[Si++] = n, xi[Si++] = r, Ci |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ei(e, t, n, r) {
		return Ti(e, t, n, r), Oi(e);
	}
	function B(e, t) {
		return Ti(e, null, null, t), Oi(e);
	}
	function Di(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - $e(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Oi(e) {
		if (50 < kd) throw kd = 0, Ad = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ki = {};
	function Ai(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ji(e, t, n, r) {
		return new Ai(e, t, n, r);
	}
	function Mi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ni(e, t) {
		var n = e.alternate;
		return n === null ? (n = ji(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Pi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Fi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Mi(r) && (s = 1);
		else if (typeof r == "string") s = Jm(e, n, Se.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case se: return e = ji(31, n, t, a), e.elementType = se, e.lanes = o, e;
			case j: return Ii(n.children, a, o, t);
			case M:
				s = 8, a |= 24;
				break;
			case N: return e = ji(12, n, t, a | 2), e.elementType = N, e.lanes = o, e;
			case re: return e = ji(13, n, t, a), e.elementType = re, e.lanes = o, e;
			case ie: return e = ji(19, n, t, a), e.elementType = ie, e.lanes = o, e;
			case ce:
			case ue: return e = a | 32, e = ji(30, n, t, e), e.elementType = ue, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case ne:
						s = 11;
						break a;
					case ae:
						s = 14;
						break a;
					case oe:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ji(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Ii(e, t, n, r) {
		return e = ji(7, e, r, t), e.lanes = n, e;
	}
	function Li(e, t, n) {
		return e = ji(6, e, null, t), e.lanes = n, e;
	}
	function Ri(e) {
		var t = ji(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function zi(e, t, n) {
		return t = ji(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Bi = /* @__PURE__ */ new WeakMap();
	function Vi(e, t) {
		if (typeof e == "object" && e) {
			var n = Bi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ie(t)
			}, Bi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ie(t)
		};
	}
	var Hi = [], Ui = 0, Wi = null, Gi = 0, Ki = [], qi = 0, Ji = null, Yi = 1, Xi = "";
	function Zi(e, t) {
		Hi[Ui++] = Gi, Hi[Ui++] = Wi, Wi = e, Gi = t;
	}
	function Qi(e, t, n) {
		Ki[qi++] = Yi, Ki[qi++] = Xi, Ki[qi++] = Ji, Ji = e;
		var r = Yi;
		e = Xi;
		var i = 32 - $e(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - $e(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Yi = 1 << 32 - $e(t) + i | n << i | r, Xi = a + e;
		} else Yi = 1 << a | n << i | r, Xi = e;
	}
	function $i(e) {
		e.return !== null && (Zi(e, 1), Qi(e, 1, 0));
	}
	function ea(e) {
		for (; e === Wi;) Wi = Hi[--Ui], Hi[Ui] = null, Gi = Hi[--Ui], Hi[Ui] = null;
		for (; e === Ji;) Ji = Ki[--qi], Ki[qi] = null, Xi = Ki[--qi], Ki[qi] = null, Yi = Ki[--qi], Ki[qi] = null;
	}
	function ta(e, t) {
		Ki[qi++] = Yi, Ki[qi++] = Xi, Ki[qi++] = Ji, Yi = t.id, Xi = t.overflow, Ji = e;
	}
	var na = null, ra = null, V = !1, ia = null, aa = !1, oa = Error(i(519));
	function sa(e) {
		throw pa(Vi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), oa;
	}
	function ca(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ct] = e, t[wt] = r, n) {
			case "dialog":
				Z("cancel", t), Z("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Z("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Bf.length; n++) Z(Bf[n], t);
				break;
			case "source":
				Z("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Z("error", t), Z("load", t);
				break;
			case "details":
				Z("toggle", t);
				break;
			case "input":
				Z("invalid", t), on(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Z("invalid", t);
				break;
			case "textarea": Z("invalid", t), un(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || tp(t.textContent, n) ? (r.popover != null && (Z("beforetoggle", t), Z("toggle", t)), r.onScroll != null && Z("scroll", t), r.onScrollEnd != null && Z("scrollend", t), r.onClick != null && (t.onclick = yn), t = !0) : t = !1, t || sa(e, !0);
	}
	function la(e) {
		for (na = e.return; na;) switch (na.tag) {
			case 5:
			case 31:
			case 13:
				aa = !1;
				return;
			case 27:
			case 3:
				aa = !0;
				return;
			default: na = na.return;
		}
	}
	function ua(e) {
		if (e !== na) return !1;
		if (!V) return la(e), V = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || hp(e.type, e.memoizedProps)), n = !n), n && ra && sa(e), la(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ra = fm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ra = fm(e);
		} else t === 27 ? (t = ra, wp(e.type) ? (e = dm, dm = null, ra = e) : ra = t) : ra = na ? um(e.stateNode.nextSibling) : null;
		return !0;
	}
	function da() {
		ra = na = null, V = !1;
	}
	function fa() {
		var e = ia;
		return e !== null && (fd === null ? fd = e : fd.push.apply(fd, e), ia = null), e;
	}
	function pa(e) {
		ia === null ? ia = [e] : ia.push(e);
	}
	var ma = I(null), ha = null, ga = null;
	function _a(e, t, n) {
		xe(ma, t._currentValue), t._currentValue = n;
	}
	function va(e) {
		e._currentValue = ma.current, be(ma);
	}
	function ya(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ba(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ya(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ya(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ya(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function xa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Hr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === Te.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [ch] : e.push(ch));
			}
			a = a.return;
		}
		return e !== null && ba(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Sa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Hr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ca(e) {
		ha = e, ga = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function wa(e) {
		return Ea(ha, e);
	}
	function Ta(e, t) {
		return ha === null && Ca(e), Ea(e, t);
	}
	function Ea(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ga === null) {
			if (e === null) throw Error(i(308));
			ga = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ga = ga.next = t;
		return n;
	}
	var Da = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Oa = t.unstable_scheduleCallback, ka = t.unstable_NormalPriority, Aa = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ja() {
		return {
			controller: new Da(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ma(e) {
		e.refCount--, e.refCount === 0 && Oa(ka, function() {
			e.controller.abort();
		});
	}
	function Na(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Pa = null;
	function Fa(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Ia = null, La = 0, Ra = 0, za = null;
	function Ba(e, t) {
		if (Ia === null) {
			var n = Ia = [];
			La = 0, Ra = Ff(), za = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return La++, t.then(Va, Va), t;
	}
	function Va() {
		if (--La === 0 && (Pa = null, Ia !== null)) {
			za !== null && (za.status = "fulfilled");
			var e = Ia;
			Ia = null, Ra = 0, za = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ha(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ua = P.S;
	P.S = function(e, t) {
		if (hd = L(), typeof t == "object" && t && typeof t.then == "function" && Ba(e, t), Pa !== null) for (var n = xf; n !== null;) Na(n, Pa), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = xf; r !== null;) Na(r, n), r = r.next;
			if (Ra !== 0) {
				r = Pa, r === null && (r = Pa = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ua !== null && Ua(e, t);
	};
	var Wa = I(null);
	function Ga() {
		var e = Wa.current;
		return e === null ? q.pooledCache : e;
	}
	function Ka(e, t) {
		t === null ? xe(Wa, Wa.current) : xe(Wa, t.pool);
	}
	function qa() {
		var e = Ga();
		return e === null ? null : {
			parent: Aa._currentValue,
			pool: e
		};
	}
	var Ja = Error(i(460)), Ya = Error(i(474)), Xa = Error(i(542)), Za = { then: function() {} };
	function Qa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function $a(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(yn, yn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ro(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(yn, yn);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ro(e), e;
				}
				throw to = t, Ja;
		}
	}
	function eo(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (to = e, Ja) : e;
		}
	}
	var to = null;
	function no() {
		if (to === null) throw Error(i(459));
		var e = to;
		return to = null, e;
	}
	function ro(e) {
		if (e === Ja || e === Xa) throw Error(i(483));
	}
	var io = null, ao = 0;
	function oo(e) {
		var t = ao;
		return ao += 1, io === null && (io = []), $a(io, e, t);
	}
	function so(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function co(e, t) {
		throw t.$$typeof === O ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function lo(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ni(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Li(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === j ? (e = d(e, t, n.props.children, r, n.key), so(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === oe && eo(i) === t.type) ? (t = a(t, n.props), so(t, n), t.return = e, t) : (t = Fi(n.type, n.key, n.props, null, e.mode, r), so(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = zi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Ii(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Li("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case k: return n = Fi(t.type, t.key, t.props, null, e.mode, n), so(n, t), n.return = e, n;
					case A: return t = zi(t, e.mode, n), t.return = e, t;
					case oe: return t = eo(t), f(e, t, n);
				}
				if (ge(t) || pe(t)) return t = Ii(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, oo(t), n);
				if (t.$$typeof === te) return f(e, Ta(e, t), n);
				co(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case k: return n.key === i ? l(e, t, n, r) : null;
					case A: return n.key === i ? u(e, t, n, r) : null;
					case oe: return n = eo(n), p(e, t, n, r);
				}
				if (ge(n) || pe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, oo(n), r);
				if (n.$$typeof === te) return p(e, t, Ta(e, n), r);
				co(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case k: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case A: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case oe: return r = eo(r), m(e, t, n, r, i);
				}
				if (ge(r) || pe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, oo(r), i);
				if (r.$$typeof === te) return m(e, t, n, Ta(t, r), i);
				co(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), V && Zi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Zi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), V && Zi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), V && Zi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Zi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), V && Zi(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === j && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case k:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === j) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), so(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === oe && eo(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), so(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === j ? (c = Ii(o.props.children, e.mode, c, o.key), so(c, o), c.return = e, e = c) : (c = Fi(o.type, o.key, o.props, null, e.mode, c), so(c, o), c.return = e, e = c);
						}
						return s(e);
					case A:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = zi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case oe: return o = eo(o), _(e, r, o, c);
				}
				if (ge(o)) return h(e, r, o, c);
				if (pe(o)) {
					if (l = pe(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, oo(o), c);
				if (o.$$typeof === te) return _(e, r, Ta(e, o), c);
				co(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Li(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ao = 0;
				var i = _(e, t, n, r);
				return io = null, i;
			} catch (t) {
				if (t === Ja || t === Xa) throw t;
				var a = ji(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var uo = lo(!0), fo = lo(!1), po = !1;
	function mo(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function ho(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function go(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function _o(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Oi(e), Di(e, null, n), t;
		}
		return Ti(e, r, t, n), Oi(e);
	}
	function vo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, gt(e, n);
		}
	}
	function yo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var bo = !1;
	function xo() {
		if (bo) {
			var e = za;
			if (e !== null) throw e;
		}
	}
	function So(e, t, n, r) {
		bo = !1;
		var i = e.updateQueue;
		po = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === Ra && (bo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = D({}, d, f);
								break a;
							case 2: po = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), od |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Co(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function wo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Co(n[e], t);
	}
	var To = I(null), Eo = I(0);
	function Do(e, t) {
		e = id, xe(Eo, e), xe(To, t), id = e | t.baseLanes;
	}
	function Oo() {
		xe(Eo, id), xe(To, To.current);
	}
	function H() {
		id = Eo.current, be(To), be(Eo);
	}
	var ko = I(null), Ao = null;
	function jo(e) {
		var t = e.alternate;
		xe(Io, Io.current & 1), xe(ko, e), Ao === null && (t === null || To.current !== null || t.memoizedState !== null) && (Ao = e);
	}
	function Mo(e) {
		xe(Io, Io.current), xe(ko, e), Ao === null && (Ao = e);
	}
	function No(e) {
		e.tag === 22 ? (xe(Io, Io.current), xe(ko, e), Ao === null && (Ao = e)) : Po();
	}
	function Po() {
		xe(Io, Io.current), xe(ko, ko.current);
	}
	function Fo(e) {
		be(ko), Ao === e && (Ao = null), be(Io);
	}
	var Io = I(0);
	function Lo(e, t) {
		xe(ko, ko.current), xe(Io, t);
	}
	function Ro(e) {
		be(Io), be(ko), Ao === e && (Ao = null);
	}
	function zo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || cm(n) || Q(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var U = 0, W = null, Bo = null, Vo = null, Ho = !1, Uo = !1, Wo = !1, Go = 0, Ko = 0, qo = null, Jo = 0;
	function Yo() {
		throw Error(i(321));
	}
	function Xo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Hr(e[n], t[n])) return !1;
		return !0;
	}
	function Zo(e, t, n, r, i, a) {
		return U = a, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, P.H = e === null || e.memoizedState === null ? pc : mc, Wo = !1, a = n(r, i), Wo = !1, Uo && (a = $o(t, n, r, i)), Qo(e), a;
	}
	function Qo(e) {
		P.H = fc;
		var t = Bo !== null && Bo.next !== null;
		if (U = 0, Vo = Bo = W = null, Ho = !1, Ko = 0, qo = null, t) throw Error(i(300));
		e === null || jc || (e = e.dependencies, e !== null && Sa(e) && (jc = !0));
	}
	function $o(e, t, n, r) {
		W = e;
		var a = 0;
		do {
			if (Uo && (qo = null), Ko = 0, Uo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Vo = Bo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			P.H = hc, o = t(n, r);
		} while (Uo);
		return o;
	}
	function es() {
		var e = P.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ss(t) : t, e = e.useState()[0], (Bo === null ? null : Bo.memoizedState) !== e && (W.flags |= 1024), t;
	}
	function ts() {
		var e = Go !== 0;
		return Go = 0, e;
	}
	function ns(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function rs(e) {
		if (Ho) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Ho = !1;
		}
		U = 0, Vo = Bo = W = null, Uo = !1, Ko = Go = 0, qo = null;
	}
	function is() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Vo === null ? W.memoizedState = Vo = e : Vo = Vo.next = e, Vo;
	}
	function as() {
		if (Bo === null) {
			var e = W.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Bo.next;
		var t = Vo === null ? W.memoizedState : Vo.next;
		if (t !== null) Vo = t, Bo = e;
		else {
			if (e === null) throw W.alternate === null ? Error(i(467)) : Error(i(310));
			Bo = e, e = {
				memoizedState: Bo.memoizedState,
				baseState: Bo.baseState,
				baseQueue: Bo.baseQueue,
				queue: Bo.queue,
				next: null
			}, Vo === null ? W.memoizedState = Vo = e : Vo = Vo.next = e;
		}
		return Vo;
	}
	function os() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ss(e) {
		var t = Ko;
		return Ko += 1, qo === null && (qo = []), e = $a(qo, e, t), t = W, (Vo === null ? t.memoizedState : Vo.next) === null && (t = t.alternate, P.H = t === null || t.memoizedState === null ? pc : mc), e;
	}
	function cs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ss(e);
			if (e.$$typeof === de) return;
			if (e.$$typeof === te) return wa(e);
		}
		throw Error(i(438, String(e)));
	}
	function ls(e) {
		var t = null, n = W.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = W.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = os(), W.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = le;
		return t.index++, n;
	}
	function us(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function ds(e) {
		return fs(as(), Bo, e);
	}
	function fs(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (U & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ra && (d = !0);
					else if ((U & p) === p) {
						u = u.next, p === Ra && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, W.lanes |= p, od |= p;
					f = u.action, Wo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, W.lanes |= f, od |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Hr(o, e.memoizedState) && (jc = !0, d && (n = za, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function ps(e) {
		var t = as(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Hr(o, t.memoizedState) || (jc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ms(e, t, n) {
		var r = W, a = as(), o = V;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Hr((Bo || a).memoizedState, n);
		if (s && (a.memoizedState = n, jc = !0), a = a.queue, zs(_s.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Vo !== null && !!(Vo.memoizedState.tag & 1), Ps(e ? 9 : 8, { destroy: void 0 }, gs.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, q === null) throw Error(i(349));
			o || U & 127 || hs(r, t, n);
		}
		return n;
	}
	function hs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = W.updateQueue, t === null ? (t = os(), W.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function gs(e, t, n, r) {
		t.value = n, t.getSnapshot = r, vs(t) && ys(e);
	}
	function _s(e, t, n) {
		return n(function() {
			vs(t) && ys(e);
		});
	}
	function vs(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Hr(e, n);
		} catch {
			return !0;
		}
	}
	function ys(e) {
		var t = B(e, 2);
		t !== null && Pd(t, e, 2);
	}
	function bs(e) {
		var t = is();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Wo) {
				Qe(!0);
				try {
					n();
				} finally {
					Qe(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: us,
			lastRenderedState: e
		}, t;
	}
	function xs(e, t, n, r) {
		return e.baseState = n, fs(e, Bo, typeof r == "function" ? r : us);
	}
	function Ss(e, t, n, r, a) {
		if (lc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			P.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Cs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Cs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = P.T, o = {};
			o.types = a === null ? null : a.types, P.T = o;
			try {
				var s = n(i, r), c = P.S;
				c !== null && c(o, s), ws(e, t, s);
			} catch (n) {
				Es(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), P.T = a;
			}
		} else try {
			a = n(i, r), ws(e, t, a);
		} catch (n) {
			Es(e, t, n);
		}
	}
	function ws(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ts(e, t, n);
		}, function(n) {
			return Es(e, t, n);
		}) : Ts(e, t, n);
	}
	function Ts(e, t, n) {
		t.status = "fulfilled", t.value = n, Ds(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Cs(e, n)));
	}
	function Es(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ds(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ds(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Os(e, t) {
		return t;
	}
	function ks(e, t) {
		if (V) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = W;
					if (V) {
						if (ra) {
							b: {
								for (var i = ra, a = aa; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = um(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								ra = um(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						sa(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = is(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Os,
			lastRenderedState: t
		}, n.queue = r, n = oc.bind(null, W, r), r.dispatch = n, r = bs(!1), a = cc.bind(null, W, !1, r.queue), r = is(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ss.bind(null, W, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function As(e) {
		return js(as(), Bo, e);
	}
	function js(e, t, n) {
		if (t = fs(e, t, Os)[0], e = ds(us)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ss(t);
		} catch (e) {
			throw e === Ja ? Xa : e;
		}
		else r = t;
		t = as();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (W.flags |= 2048, Ps(9, { destroy: void 0 }, Ms.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ms(e, t) {
		e.action = t;
	}
	function Ns(e) {
		var t = as(), n = Bo;
		if (n !== null) return js(t, n, e);
		as(), t = t.memoizedState, n = as();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Ps(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = W.updateQueue, t === null && (t = os(), W.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Fs() {
		return as().memoizedState;
	}
	function Is(e, t, n, r) {
		var i = is();
		W.flags |= e, i.memoizedState = Ps(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ls(e, t, n, r) {
		var i = as();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Bo !== null && r !== null && Xo(r, Bo.memoizedState.deps) ? i.memoizedState = Ps(t, a, n, r) : (W.flags |= e, i.memoizedState = Ps(1 | t, a, n, r));
	}
	function Rs(e, t) {
		Is(8390656, 8, e, t);
	}
	function zs(e, t) {
		Ls(2048, 8, e, t);
	}
	function Bs(e) {
		W.flags |= 4;
		var t = W.updateQueue;
		if (t === null) t = os(), W.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Vs(e) {
		var t = as().memoizedState;
		return Bs({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Hs(e, t) {
		return Ls(4, 2, e, t);
	}
	function Us(e, t) {
		return Ls(4, 4, e, t);
	}
	function Ws(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Gs(e, t, n) {
		n = n == null ? null : n.concat([e]), Ls(4, 4, Ws.bind(null, t, e), n);
	}
	function Ks() {}
	function qs(e, t) {
		var n = as();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Js(e, t) {
		var n = as();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Xo(t, r[1])) return r[0];
		if (r = e(), Wo) {
			Qe(!0);
			try {
				e();
			} finally {
				Qe(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function G(e, t, n) {
		return n === void 0 || U & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Md(), W.lanes |= e, od |= e, n);
	}
	function Ys(e, t, n, r) {
		return Hr(n, t) ? n : To.current === null ? !(U & 106) || U & 1073741824 && !(Y & 261930) ? (jc = !0, e.memoizedState = n) : (e = Md(), W.lanes |= e, od |= e, t) : (e = G(e, n, r), Hr(e, t) || (jc = !0), e);
	}
	function Xs(e, t, n, r, i) {
		var a = F.p;
		F.p = a !== 0 && 8 > a ? a : 8;
		var o = P.T, s = {};
		s.types = o === null ? null : o.types, P.T = s, cc(e, !1, t, n);
		try {
			var c = i(), l = P.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? sc(e, t, Ha(c, r), jd(e)) : sc(e, t, r, jd(e));
		} catch (n) {
			sc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, jd());
		} finally {
			F.p = a, o !== null && s.types !== null && (o.types = s.types), P.T = o;
		}
	}
	function Zs() {}
	function Qs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = $s(e).queue;
		Xs(e, a, t, _e, n === null ? Zs : function() {
			return ec(e), n(r);
		});
	}
	function $s(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: _e,
			baseState: _e,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: us,
				lastRenderedState: _e
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: us,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ec(e) {
		var t = $s(e);
		t.next === null && (t = e.alternate.memoizedState), sc(e, t.next.queue, {}, jd());
	}
	function tc() {
		return wa(ch);
	}
	function nc() {
		return as().memoizedState;
	}
	function rc() {
		return as().memoizedState;
	}
	function ic(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = jd();
					e = go(n);
					var r = _o(t, e, n);
					r !== null && (Pd(r, t, n), vo(r, t, n)), t = { cache: ja() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ac(e, t, n) {
		var r = jd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, lc(e) ? uc(t, n) : (n = Ei(e, t, n, r), n !== null && (Pd(n, e, r), dc(n, t, r)));
	}
	function oc(e, t, n) {
		sc(e, t, n, jd());
	}
	function sc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (lc(e)) uc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Hr(s, o)) return Ti(e, t, i, 0), q === null && wi(), !1;
			} catch {}
			if (n = Ei(e, t, i, r), n !== null) return Pd(n, e, r), dc(n, t, r), !0;
		}
		return !1;
	}
	function cc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Ff(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, lc(e)) {
			if (t) throw Error(i(479));
		} else t = Ei(e, n, r, 2), t !== null && Pd(t, e, 2);
	}
	function lc(e) {
		var t = e.alternate;
		return e === W || t !== null && t === W;
	}
	function uc(e, t) {
		Uo = Ho = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function dc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, gt(e, n);
		}
	}
	var fc = {
		readContext: wa,
		use: cs,
		useCallback: Yo,
		useContext: Yo,
		useEffect: Yo,
		useImperativeHandle: Yo,
		useLayoutEffect: Yo,
		useInsertionEffect: Yo,
		useMemo: Yo,
		useReducer: Yo,
		useRef: Yo,
		useState: Yo,
		useDebugValue: Yo,
		useDeferredValue: Yo,
		useTransition: Yo,
		useSyncExternalStore: Yo,
		useId: Yo,
		useHostTransitionStatus: Yo,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: Yo,
		useMemoCache: Yo,
		useCacheRefresh: Yo,
		useEffectEvent: Yo
	}, pc = {
		readContext: wa,
		use: cs,
		useCallback: function(e, t) {
			return is().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: wa,
		useEffect: Rs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Is(4194308, 4, Ws.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Is(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Is(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = is();
			t = t === void 0 ? null : t;
			var r = e();
			if (Wo) {
				Qe(!0);
				try {
					e();
				} finally {
					Qe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = is();
			if (n !== void 0) {
				var i = n(t);
				if (Wo) {
					Qe(!0);
					try {
						n(t);
					} finally {
						Qe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ac.bind(null, W, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = is();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = bs(e);
			var t = e.queue, n = oc.bind(null, W, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Ks,
		useDeferredValue: function(e, t) {
			return G(is(), e, t);
		},
		useTransition: function() {
			var e = bs(!1);
			return e = Xs.bind(null, W, e.queue, !0, !1), is().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = W, a = is();
			if (V) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || hs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Rs(_s.bind(null, r, o, e), [e]), r.flags |= 2048, Ps(9, { destroy: void 0 }, gs.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = is(), t = q.identifierPrefix;
			if (V) {
				var n = Xi, r = Yi;
				n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Go++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Jo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: tc,
		useFormState: ks,
		useActionState: ks,
		useOptimistic: function(e) {
			var t = is();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = cc.bind(null, W, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ls,
		useCacheRefresh: function() {
			return is().memoizedState = ic.bind(null, W);
		},
		useEffectEvent: function(e) {
			var t = is(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, mc = {
		readContext: wa,
		use: cs,
		useCallback: qs,
		useContext: wa,
		useEffect: zs,
		useImperativeHandle: Gs,
		useInsertionEffect: Hs,
		useLayoutEffect: Us,
		useMemo: Js,
		useReducer: ds,
		useRef: Fs,
		useState: function() {
			return ds(us);
		},
		useDebugValue: Ks,
		useDeferredValue: function(e, t) {
			return Ys(as(), Bo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ds(us)[0], t = as().memoizedState;
			return [typeof e == "boolean" ? e : ss(e), t];
		},
		useSyncExternalStore: ms,
		useId: nc,
		useHostTransitionStatus: tc,
		useFormState: As,
		useActionState: As,
		useOptimistic: function(e, t) {
			return xs(as(), Bo, e, t);
		},
		useMemoCache: ls,
		useCacheRefresh: rc,
		useEffectEvent: Vs
	}, hc = {
		readContext: wa,
		use: cs,
		useCallback: qs,
		useContext: wa,
		useEffect: zs,
		useImperativeHandle: Gs,
		useInsertionEffect: Hs,
		useLayoutEffect: Us,
		useMemo: Js,
		useReducer: ps,
		useRef: Fs,
		useState: function() {
			return ps(us);
		},
		useDebugValue: Ks,
		useDeferredValue: function(e, t) {
			var n = as();
			return Bo === null ? G(n, e, t) : Ys(n, Bo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ps(us)[0], t = as().memoizedState;
			return [typeof e == "boolean" ? e : ss(e), t];
		},
		useSyncExternalStore: ms,
		useId: nc,
		useHostTransitionStatus: tc,
		useFormState: Ns,
		useActionState: Ns,
		useOptimistic: function(e, t) {
			var n = as();
			return Bo === null ? (n.baseState = e, [e, n.queue.dispatch]) : xs(n, Bo, e, t);
		},
		useMemoCache: ls,
		useCacheRefresh: rc,
		useEffectEvent: Vs
	};
	function gc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var _c = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = go(r);
			i.payload = t, n != null && (i.callback = n), t = _o(e, i, r), t !== null && (Pd(t, e, r), vo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = go(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = _o(e, i, r), t !== null && (Pd(t, e, r), vo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = jd(), r = go(n);
			r.tag = 2, t != null && (r.callback = t), t = _o(e, r, n), t !== null && (Pd(t, e, n), vo(t, e, n));
		}
	};
	function vc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ur(n, r) || !Ur(i, a) : !0;
	}
	function yc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _c.enqueueReplaceState(t, t.state, null);
	}
	function bc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function xc(e) {
		bi(e);
	}
	function Sc(e) {
		console.error(e);
	}
	function Cc(e) {
		bi(e);
	}
	function wc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Tc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ec(e, t, n) {
		return n = go(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			wc(e, t);
		}, n;
	}
	function Dc(e) {
		return e = go(e), e.tag = 3, e;
	}
	function Oc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Tc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Tc(t, n, r), typeof i != "function" && (vd === null ? vd = /* @__PURE__ */ new Set([this]) : vd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function kc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && xa(t, n, a, !0), n = ko.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Ao === null ? Kd() : n.alternate === null && ad === 0 && (ad = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Za ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), hf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Za ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), hf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return hf(e, r, a), Kd(), !1;
		}
		if (V) return t = ko.current, t === null ? (r !== oa && (t = Error(i(423), { cause: r }), pa(Vi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Vi(r, n), a = Ec(e.stateNode, r, a), yo(e, a), ad !== 4 && (ad = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== oa && (e = Error(i(422), { cause: r }), pa(Vi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Vi(o, n), dd === null ? dd = [o] : dd.push(o), ad !== 4 && (ad = 2), t === null) return !0;
		r = Vi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ec(n.stateNode, r, e), yo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (vd === null || !vd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Dc(a), Oc(a, e, n, r), yo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ac = Error(i(461)), jc = !1;
	function Mc(e, t, n, r) {
		t.child = e === null ? fo(t, null, n, r) : uo(t, e.child, n, r);
	}
	function Nc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ca(t), r = Zo(e, t, n, o, a, i), s = ts(), e !== null && !jc ? (ns(e, t, i), sl(e, t, i)) : (V && s && $i(t), t.flags |= 1, Mc(e, t, r, i), t.child);
	}
	function Pc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Mi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Fc(e, t, a, r, i)) : (e = Fi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !cl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ur : n, n(o, r) && e.ref === t.ref) return sl(e, t, i);
		}
		return t.flags |= 1, e = Ni(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Fc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ur(a, r) && e.ref === t.ref) {
				if (jc = !1, t.pendingProps = r = a, cl(e, i)) e.flags & 131072 && (jc = !0);
				else return t.lanes = e.lanes, sl(e, t, i);
			}
		}
		return Uc(e, t, n, r, i);
	}
	function Ic(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Rc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ka(t, a === null ? null : a.cachePool), a === null ? Oo() : Do(t, a), No(t);
			else return r = t.lanes = 536870912, Rc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ka(t, null), Oo(), Po()) : (Ka(t, a.cachePool), Do(t, a), Po(), t.memoizedState = null);
		return Mc(e, t, i, n), t.child;
	}
	function Lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Rc(e, t, n, r, i) {
		var a = Ga();
		return a = a === null ? null : {
			parent: Aa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ka(t, null), Oo(), No(t), e !== null && xa(e, t, r, !0), t.childLanes = i, null;
	}
	function zc(e, t) {
		return t = Qc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Bc(e, t, n) {
		return uo(t, e.child, null, n), e = zc(t, t.pendingProps), e.flags |= 2, Fo(t), t.memoizedState = null, e;
	}
	function Vc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (V) {
				if (r.mode === "hidden") return e = zc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Lc(null, e);
				if (Mo(t), (e = ra) ? (e = sm(e, aa), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ji === null ? null : {
						id: Yi,
						overflow: Xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ri(e), n.return = t, t.child = n, na = t, ra = null)) : e = null, e === null) throw sa(t);
				return t.lanes = 536870912, null;
			}
			return zc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Mo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Bc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (jc || xa(e, t, n, !1), a = (n & e.childLanes) !== 0, jc || a) {
				if (To.current === null) {
					if (r = q, r !== null && (s = _t(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, B(e, s), Pd(r, e, s), Ac;
					Kd();
				}
				t = Bc(e, t, n);
			} else e = o.treeContext, ra = um(s.nextSibling), na = t, V = !0, ia = null, aa = !1, e !== null && ta(t, e), t = zc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ni(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Hc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Uc(e, t, n, r, i) {
		return Ca(t), n = Zo(e, t, n, r, void 0, i), r = ts(), e !== null && !jc ? (ns(e, t, i), sl(e, t, i)) : (V && r && $i(t), t.flags |= 1, Mc(e, t, n, i), t.child);
	}
	function Wc(e, t, n, r, i, a) {
		return Ca(t), t.updateQueue = null, n = $o(t, r, n, i), Qo(e), r = ts(), e !== null && !jc ? (ns(e, t, a), sl(e, t, a)) : (V && r && $i(t), t.flags |= 1, Mc(e, t, n, a), t.child);
	}
	function Gc(e, t, n, r, i) {
		if (Ca(t), t.stateNode === null) {
			var a = ki, o = n.contextType;
			typeof o == "object" && o && (a = wa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = _c, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, mo(t), o = n.contextType, a.context = typeof o == "object" && o ? wa(o) : ki, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (gc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && _c.enqueueReplaceState(a, a.state, null), So(t, r, a, i), xo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = bc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ki, typeof u == "object" && u && (o = wa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && yc(t, a, r, o), po = !1;
			var f = t.memoizedState;
			a.state = f, So(t, r, a, i), xo(), l = t.memoizedState, s || f !== l || po ? (typeof d == "function" && (gc(t, n, d, r), l = t.memoizedState), (c = po || vc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ho(e, t), o = t.memoizedProps, u = bc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ki, typeof l == "object" && l && (c = wa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && yc(t, a, r, c), po = !1, f = t.memoizedState, a.state = f, So(t, r, a, i), xo();
			var p = t.memoizedState;
			o !== d || f !== p || po || e !== null && e.dependencies !== null && Sa(e.dependencies) ? (typeof s == "function" && (gc(t, n, s, r), p = t.memoizedState), (u = po || vc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Sa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Hc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = uo(t, e.child, null, i), t.child = uo(t, null, n, i)) : Mc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = sl(e, t, i), e;
	}
	function Kc(e, t, n, r) {
		return da(), t.flags |= 256, Mc(e, t, n, r), t.child;
	}
	var qc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Jc(e) {
		return {
			baseLanes: e,
			cachePool: qa()
		};
	}
	function Yc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ld), e;
	}
	function Xc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Io.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (V) {
				if (i ? jo(t) : Po(), (e = ra) ? (e = sm(e, aa), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ji === null ? null : {
						id: Yi,
						overflow: Xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ri(e), n.return = t, t.child = n, na = t, ra = null)) : e = null, e === null) throw sa(t);
				return t.lanes = Q(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Po(), i = t.mode, a = Qc({
				mode: "hidden",
				children: a
			}, i), r = Ii(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Jc(n), r.childLanes = Yc(e, o, n), t.memoizedState = qc, Lc(null, r)) : (jo(t), Zc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return el(e, t, a, o, r, c, s, n);
		}
		return i ? (Po(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ni(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Ii(i, a, n, null), i.flags |= 2) : i = Ni(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Lc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Jc(n) : (a = i.cachePool, a === null ? a = qa() : (s = Aa._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Yc(e, o, n), t.memoizedState = qc, Lc(e.child, r)) : (jo(t), n = e.child, e = n.sibling, n = Ni(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Zc(e, t) {
		return t = Qc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Qc(e, t) {
		return e = ji(22, e, null, t), e.lanes = 0, e;
	}
	function $c(e, t, n) {
		return uo(t, e.child, null, n), e = Zc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function el(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (jo(t), t.flags &= -257, $c(e, t, c)) : t.memoizedState === null ? (Po(), o = a.fallback, s = t.mode, a = Qc({
			mode: "visible",
			children: a.children
		}, s), o = Ii(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, uo(t, e.child, null, c), a = t.child, a.memoizedState = Jc(c), a.childLanes = Yc(e, r, c), t.memoizedState = qc, Lc(null, a)) : (Po(), t.child = e.child, t.flags |= 128, null);
		if (jo(t), Q(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, pa({
				value: a,
				source: null,
				stack: null
			})), $c(e, t, c);
		}
		if (jc || xa(e, t, c, !1), r = (c & e.childLanes) !== 0, jc || r) {
			if (To.current !== null) return $c(e, t, c);
			if (r = q, r !== null && (a = _t(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, B(e, a), Pd(r, e, a), Ac;
			return cm(o) || Kd(), $c(e, t, c);
		}
		return cm(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, ra = um(o.nextSibling), na = t, V = !0, ia = null, aa = !1, e !== null && ta(t, e), t = Zc(t, a.children), t.flags |= 134221824, t);
	}
	function tl(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ya(e.return, t, n);
	}
	function nl(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && zo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function rl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function il(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function al(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Io.current;
		if (t.flags & 128) return Lo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Lo(t, o), i === "backwards" && e !== null ? (il(e), Mc(e, t, r, n), il(e)) : Mc(e, t, r, n), r = V ? Gi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && tl(e, n, t);
			else if (e.tag === 19) tl(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = nl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, il(t)), rl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && zo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				rl(t, !0, n, null, a, r);
				break;
			case "together":
				rl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = nl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), rl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function ol(e, t, n) {
		var r = t.pendingProps;
		return _a(t, t.type, r.value), Mc(e, t, r.children, n), t.child;
	}
	function sl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), od |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (xa(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ni(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ni(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function cl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Sa(e)));
	}
	function ll(e, t, n) {
		switch (t.tag) {
			case 3:
				Ee(t, t.stateNode.containerInfo), _a(t, Aa, e.memoizedState.cache), da();
				break;
			case 27:
			case 5:
				Oe(t);
				break;
			case 4:
				Ee(t, t.stateNode.containerInfo);
				break;
			case 10:
				_a(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Mo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return jo(t), t.flags |= 128, null;
					r = xa(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Xc(e, t, n) : (jo(t), e = sl(e, t, n), e === null ? null : e.sibling);
				}
				jo(t);
				break;
			case 19:
				if (t.flags & 128) return al(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (xa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return al(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Lo(t, Io.current), r) break;
				return null;
			case 22: return t.lanes = 0, Ic(e, t, n, t.pendingProps);
			case 24: _a(t, Aa, e.memoizedState.cache);
		}
		return sl(e, t, n);
	}
	function ul(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) jc = !0;
			else {
				if (!cl(e, n) && !(t.flags & 128)) return jc = !1, ll(e, t, n);
				jc = !!(e.flags & 131072);
			}
		} else jc = !1, V && t.flags & 1048576 && Qi(t, Gi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = eo(t.elementType), t.type = e, typeof e == "function") Mi(e) ? (r = bc(e, r), t.tag = 1, t = Gc(null, t, e, r, n)) : (t.tag = 0, t = Uc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === ne) {
								t.tag = 11, t = Nc(null, t, e, r, n);
								break a;
							}
							if (a === ae) {
								t.tag = 14, t = Pc(null, t, e, r, n);
								break a;
							}
							if (a === te) {
								t.tag = 10, t.type = e, t = ol(null, t, n);
								break a;
							}
						}
						throw t = he(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Uc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = bc(r, t.pendingProps), Gc(e, t, r, a, n);
			case 3:
				a: {
					if (Ee(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, ho(e, t), So(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, _a(t, Aa, r), r !== o.cache && ba(t, [Aa], n, !0), xo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Kc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Vi(Error(i(424)), t), pa(a), t = Kc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (ra = um(e.firstChild), na = t, V = !0, ia = null, aa = !0, n = fo(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (da(), r === a) {
							t = sl(e, t, n);
							break a;
						}
						Mc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Hc(e, t), e === null ? (n = Pm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : V || (t.stateNode = mp(t.type, t.pendingProps, we.current, t)) : t.memoizedState = Pm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Oe(t), e === null && V && (r = t.stateNode = gm(t.type, t.pendingProps, we.current), na = t, aa = !0, a = ra, wp(t.type) ? (dm = a, ra = um(r.firstChild)) : ra = a), Mc(e, t, t.pendingProps.children, n), Hc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && V && ((a = r = ra) && (r = am(r, t.type, t.pendingProps, aa), r === null ? a = !1 : (t.stateNode = r, na = t, ra = um(r.firstChild), aa = !1, a = !0)), a || sa(t)), Oe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, hp(a, o) ? r = null : s !== null && hp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Zo(e, t, es, null, null, n), ch._currentValue = a), Hc(e, t), Mc(e, t, r, n), t.child;
			case 6: return e === null && V && ((e = n = ra) && (n = om(n, t.pendingProps, aa), n === null ? e = !1 : (t.stateNode = n, na = t, ra = null, e = !0)), e || sa(t)), null;
			case 13: return Xc(e, t, n);
			case 4: return Ee(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = uo(t, null, r, n) : Mc(e, t, r, n), t.child;
			case 11: return Nc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Hc(e, t), Mc(e, t, r, n), t.child;
			case 8: return Mc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Mc(e, t, t.pendingProps.children, n), t.child;
			case 10: return ol(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Ca(t), a = wa(a), r = r(a), t.flags |= 1, Mc(e, t, r, n), t.child;
			case 14: return Pc(e, t, t.type, t.pendingProps, n);
			case 15: return Fc(e, t, t.type, t.pendingProps, n);
			case 19: return al(e, t, n);
			case 31: return Vc(e, t, n);
			case 22: return Ic(e, t, n, t.pendingProps);
			case 24: return Ca(t), r = wa(Aa), e === null ? (a = Ga(), a === null && (a = q, o = ja(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, mo(t), _a(t, Aa, a)) : ((e.lanes & n) !== 0 && (ho(e, t), So(t, null, null, n), xo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, _a(t, Aa, r), r !== a.cache && ba(t, [Aa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), _a(t, Aa, r))), Mc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : V && $i(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Hc(e, t), Mc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function dl(e) {
		e.flags |= 4;
	}
	function fl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Ym(t, r) : Ym(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Ud()) e.flags |= 8192;
				else throw to = Za, Ya;
			}
		} else e.flags &= -16777217;
	}
	function pl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Xm(t)) {
			if (Ud()) e.flags |= 8192;
			else throw to = Za, Ya;
		}
	}
	function ml(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : dt(), e.lanes |= t, ud |= t);
	}
	function hl(e, t) {
		if (!V) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function gl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function _l(e, t, n) {
		var r = t.pendingProps;
		switch (ea(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return gl(t), null;
			case 1: return gl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), va(Aa), De(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ua(t) ? dl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, fa())), gl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (dl(t), o === null ? (gl(t), fl(t, a, null, r, n)) : (gl(t), pl(t, o))) : o ? o === e.memoizedState ? (gl(t), t.flags &= -16777217) : (dl(t), gl(t), pl(t, o)) : (e = e.memoizedProps, e !== r && dl(t), gl(t), fl(t, a, e, r, n)), null;
			case 27:
				if (ke(t), n = we.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && dl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return gl(t), t.subtreeFlags &= -33554433, null;
					}
					e = Se.current, ua(t) ? ca(t, e) : (e = gm(a, r, n), t.stateNode = e, dl(t));
				}
				return gl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (ke(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && dl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return gl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = Se.current, ua(t)) ca(t, o);
					else {
						var s = dp(we.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ct] = t, o[wt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (ip(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && dl(t);
					}
				}
				return gl(t), t.subtreeFlags &= -33554433, fl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && dl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = we.current, ua(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = na, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ct] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || tp(e.nodeValue, n)), e || sa(t, !0);
					} else e = dp(e).createTextNode(r), e[Ct] = t, t.stateNode = e;
				}
				return gl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ua(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ct] = t;
						} else da(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						gl(t), e = !1;
					} else n = fa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Fo(t), t) : (Fo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return gl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ua(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ct] = t;
						} else da(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						gl(t), a = !1;
					} else a = fa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Fo(t), t) : (Fo(t), null);
				}
				return Fo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ml(t, t.updateQueue), gl(t), null);
			case 4: return De(), e === null && Gf(t.stateNode.containerInfo), t.flags |= 67108864, gl(t), null;
			case 10: return va(t.type), gl(t), null;
			case 19:
				if (Ro(t), r = t.memoizedState, r === null) return gl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) hl(r, !1);
					else {
						if (ad !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = zo(e), o !== null) {
								for (t.flags |= 128, hl(r, !1), e = o.updateQueue, t.updateQueue = e, ml(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Pi(n, e), n = n.sibling;
								return Lo(t, Io.current & 1 | 2), V && Zi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && L() > gd && (t.flags |= 128, a = !0, hl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = zo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, ml(t, e), hl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !V) return gl(t), null;
						} else 2 * L() - r.renderingStartTime > gd && n !== 536870912 && (t.flags |= 128, a = !0, hl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = L(), e.sibling = null, o = Io.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || V ? Lo(t, o) : (n = o, xe(ko, t), xe(Io, n), Ao === null && (Ao = t)), V && Zi(t, r.treeForkCount), e;
				}
				return gl(t), null;
			case 22:
			case 23: return Fo(t), H(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (gl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gl(t), n = t.updateQueue, n !== null && ml(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && be(Wa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), va(Aa), gl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, gl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function vl(e, t) {
		switch (ea(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return va(Aa), De(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ke(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Fo(t), t.alternate === null) throw Error(i(340));
					da();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Fo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					da();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Ro(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return De(), null;
			case 10: return va(t.type), null;
			case 22:
			case 23: return Fo(t), H(), e !== null && be(Wa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return va(Aa), null;
			case 25: return null;
			default: return null;
		}
	}
	function yl(e, t) {
		switch (ea(t), t.tag) {
			case 3:
				va(Aa), De();
				break;
			case 26:
			case 27:
			case 5:
				ke(t);
				break;
			case 4:
				De();
				break;
			case 31:
				t.memoizedState !== null && Fo(t);
				break;
			case 13:
				Fo(t);
				break;
			case 19:
				Ro(t);
				break;
			case 10:
				va(t.type);
				break;
			case 22:
			case 23:
				Fo(t), H(), e !== null && be(Wa);
				break;
			case 24: va(Aa);
		}
	}
	function bl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			mf(t, t.return, e);
		}
	}
	function xl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								mf(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			mf(t, t.return, e);
		}
	}
	function Sl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				wo(t, n);
			} catch (t) {
				mf(e, e.return, t);
			}
		}
	}
	function Cl(e, t, n) {
		n.props = bc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			mf(e, t, n);
		}
	}
	function wl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = _i(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Ip(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Lp(e);
							m(e.child, !1, em, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			mf(e, t, n);
		}
	}
	function Tl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				mf(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				mf(e, t, n);
			}
			else n.current = null;
		}
	}
	function El(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) nm(e.stateNode, t[n]);
	}
	function Dl(e) {
		for (var t = e.return; t !== null && (Al(t) && nm(e.stateNode, t.stateNode), !kl(t));) t = t.return;
	}
	function Ol(e) {
		for (var t = e.return; t !== null && (Al(t) && rm(e.stateNode, t.stateNode), !kl(t));) t = t.return;
	}
	function kl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Al(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function jl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			mf(e, e.return, t);
		}
	}
	function Ml(e, t, n) {
		try {
			var r = e.stateNode;
			op(r, e.type, n, t), r[wt] = t;
		} catch (t) {
			mf(e, e.return, t);
		}
	}
	function Nl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && wp(e.type) || e.tag === 4;
	}
	function Pl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Nl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && wp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Fl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = yn)), El(e, r), R = !0;
		else if (i !== 4 && (i === 27 && (El(e, r), r = null, wp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Fl(e, t, n, r), e = e.sibling; e !== null;) Fl(e, t, n, r), e = e.sibling;
	}
	function Il(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), El(e, r), R = !0;
		else if (i !== 4 && (i === 27 && (El(e, r), r = null, wp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Il(e, t, n, r), e = e.sibling; e !== null;) Il(e, t, n, r), e = e.sibling;
	}
	function Ll(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			ip(t, r, n), t[Ct] = e, t[wt] = n;
		} catch (t) {
			mf(e, e.return, t);
		}
	}
	var Rl = !1, zl = null;
	function Bl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Rl = !0);
	}
	var Vl = null;
	function Hl() {
		var e = Vl;
		return Vl = null, e;
	}
	var Ul = 0;
	function Wl(e, t, n, r, i) {
		return Ul = 0, Gl(e.child, t, n, r, i);
	}
	function Gl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Ap(o);
					r.push(s), s.view && (a = !0);
				} else a || Ap(o).view && (a = !0);
				Rl = !0, Dp(o, Ul === 0 ? t : t + "_" + Ul, n), Ul++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Gl(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function Kl(e, t) {
		for (; e !== null;) e.tag === 5 ? Op(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Kl(e.child, t)), e = e.sibling;
	}
	function ql(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (ql(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = yi(t.default, t.share), t !== "none" && (Wl(e, n, t, null, !1) || Kl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Jl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = _i(r, n), a = yi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? ql(e) : Wl(e, i, a, null, !1) ? (ql(e), n.paired || t || Nd(e, r.onEnter)) : Kl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Jl(e, t), e = e.sibling;
		else ql(e);
	}
	function Yl(e) {
		if (zl !== null && zl.size !== 0) {
			var t = zl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = yi(n.default, n.share);
								if (a !== "none" && (Wl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Nd(e, n.onShare)) : Kl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Yl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Xl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = _i(t, e.stateNode), r = zl === null ? void 0 : zl.get(n), i = yi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Wl(e, n, i, null, !1) ? r === void 0 ? Nd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, zl.delete(n), Nd(e, t.onShare)) : Kl(e.child, !1)), zl !== null && Yl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Xl(e), e = e.sibling;
		else zl !== null && Yl(e);
	}
	function Zl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = _i(t, e.stateNode);
				t = yi(t.default, t.update), e.flags &= -5, t !== "none" && Wl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Zl(e);
			e = e.sibling;
		}
	}
	function Ql(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Kl(e.child, !1));
				}
				Ql(e);
			}
			e = e.sibling;
		}
	}
	function $l(e) {
		if (e.tag === 30) e.stateNode.paired = null, Kl(e.child, !1), Ql(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) $l(e), e = e.sibling;
		else Ql(e);
	}
	function eu(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Kl(e.child, !1) : e.subtreeFlags & 33554432 && eu(e), e = e.sibling;
	}
	function tu(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Ul < a.length) {
					var l = a[Ul], u = Ap(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Dp(c, Ul === 0 ? n : n + "_" + Ul, i), s && e.flags & 4 || (Vl === null && (Vl = []), Vl.push(c, Ul === 0 ? r : r + "_" + Ul, t.memoizedProps)), Ul++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : tu(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function nu(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = _i(n, r), a = yi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(jp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Ul = 0, i = tu(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Nd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && nu(e, t);
			e = e.sibling;
		}
	}
	var ru = !1, iu = !1, au = !1, ou = !1, su = typeof WeakSet == "function" ? WeakSet : Set, cu = null, lu = !1, uu = !1, du = !1, fu = !1;
	function pu(e, t, n) {
		if (e = e.containerInfo, lp = _h, e = Jr(e), Yr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (up = {
			focusedElem: e,
			selectionRange: r
		}, _h = !1, n = (n & 335544064) === n, cu = t, t = n ? 9270 : 1024; cu !== null;) {
			if (e = cu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Xl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Bl(e), mu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Xl(r), mu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Bl(e), mu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, cu = r) : (n && Zl(e), mu(n));
			}
		}
		zl = null;
	}
	function mu(e) {
		for (; cu !== null;) {
			var t = cu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = bc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							mf(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) im(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								im(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = _i(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = yi(a.default, a.update), a !== "none" && Wl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, cu = r;
				break;
			}
			cu = t.return;
		}
	}
	function hu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Fu(e, n), r & 4 && bl(5, n);
				break;
			case 1:
				if (Fu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						mf(n, n.return, e);
					}
					else {
						var i = bc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							mf(n, n.return, e);
						}
					}
				}
				r & 64 && Sl(n), r & 512 && wl(n, n.return);
				break;
			case 3:
				if (Fu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						wo(e, t);
					} catch (e) {
						mf(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Ll(n);
			case 26:
			case 5:
				Fu(e, n), t === null && r & 4 && jl(n), r & 512 && wl(n, n.return);
				break;
			case 12:
				Fu(e, n);
				break;
			case 31:
				Fu(e, n), r & 4 && wu(e, n);
				break;
			case 13:
				Fu(e, n), r & 4 && Tu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = vf.bind(null, n), lm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || ru, !r) {
					var a = t !== null && t.memoizedState !== null || iu;
					t = ru, i = iu, ru = r, (iu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Lu(e, n, r)) : Fu(e, n), ru = t, iu = i;
				}
				break;
			case 30:
				Fu(e, n), r & 512 && wl(n, n.return);
				break;
			case 7: r & 512 && wl(n, n.return);
			default: Fu(e, n);
		}
	}
	function gu(e, t) {
		for (e = e.child; e !== null;) _u(e, t), e = e.sibling;
	}
	function _u(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					mf(e, e.return, t);
				}
				vu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, R = !0;
				} catch (t) {
					mf(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Ep(s, !0) : Ep(e.stateNode, !1);
				} catch (t) {
					mf(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && gu(e, t);
				break;
			default: gu(e, t);
		}
	}
	function vu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						_u(n, r);
						break a;
					case 22:
						n.memoizedState === null && vu(n, r);
						break a;
					default: vu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function yu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, yu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Mt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var bu = null, xu = !1;
	function Su(e, t, n) {
		for (n = n.child; n !== null;) Cu(e, t, n), n = n.sibling;
	}
	function Cu(e, t, n) {
		if (Ze && typeof Ze.onCommitFiberUnmount == "function") try {
			Ze.onCommitFiberUnmount(Xe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				iu || Tl(n, t), Su(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !iu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				iu || Tl(n, t), Ol(n);
				var r = bu, i = xu;
				wp(n.type) && (bu = n.stateNode, xu = !1), Su(e, t, n), _m(n.stateNode, n.type, n.memoizedProps), bu = r, xu = i;
				break;
			case 5: iu || Tl(n, t), Ol(n);
			case 6:
				if (n.tag === 6 && Ol(n), r = bu, i = xu, bu = null, Su(e, t, n), bu = r, xu = i, bu !== null) {
					if (xu) try {
						(bu.nodeType === 9 ? bu.body : bu.nodeName === "HTML" ? bu.ownerDocument.body : bu).removeChild(n.stateNode), R = !0;
					} catch (e) {
						mf(n, t, e);
					}
					else try {
						bu.removeChild(n.stateNode), R = !0;
					} catch (e) {
						mf(n, t, e);
					}
				}
				break;
			case 18:
				bu !== null && (xu ? (e = bu, Tp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Uh(e)) : Tp(bu, n.stateNode));
				break;
			case 4:
				r = bu, i = xu, bu = n.stateNode.containerInfo, xu = !0, Su(e, t, n), bu = r, xu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				xl(2, n, t), iu || xl(4, n, t), Su(e, t, n);
				break;
			case 1:
				iu || (Tl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Cl(n, t, r)), Su(e, t, n);
				break;
			case 21:
				Su(e, t, n);
				break;
			case 22:
				iu = (r = iu) || n.memoizedState !== null, Su(e, t, n), iu = r;
				break;
			case 30:
				Tl(n, t), Su(e, t, n);
				break;
			case 7:
				iu || Tl(n, t), Su(e, t, n);
				break;
			default: Su(e, t, n);
		}
	}
	function wu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Uh(e);
			} catch (e) {
				mf(t, t.return, e);
			}
		}
	}
	function Tu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Uh(e);
		} catch (e) {
			mf(t, t.return, e);
		}
	}
	function Eu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new su()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new su()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Du(e, t) {
		var n = Eu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = yf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Ou(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (wp(l.type)) {
							bu = l.stateNode, xu = !1;
							break a;
						}
						break;
					case 5:
						bu = l.stateNode, xu = !1;
						break a;
					case 3:
					case 4:
						bu = l.stateNode.containerInfo, xu = !0;
						break a;
				}
				l = l.return;
			}
			if (bu === null) throw Error(i(160));
			Cu(s, c, o), bu = null, xu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Au(t, e, n), t = t.sibling;
	}
	var ku = null;
	function Au(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Ou(t, e, n), ju(e), a & 4 && (xl(3, e, e.return), bl(3, e), xl(5, e, e.return));
				break;
			case 1:
				Ou(t, e, n), ju(e), a & 512 && (iu || r === null || Tl(r, r.return)), a & 64 && ru && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = ku, Ou(t, e, n), ju(e), a & 512 && (iu || r === null || Tl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (ru) e.stateNode = mp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[At] || r[Ct] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), ip(r, t, n), r[Ct] = e, Lt(r), t = r;
												break a;
											case "link":
												if (o = Km("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), ip(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Km("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), ip(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Ct] = e, Lt(r), t = r;
									}
									e.stateNode = t;
								}
							} else ru || qm(o, e.type, e.stateNode);
						} else e.stateNode = Vm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Ml(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || iu || t.parentNode.removeChild(t)) : a.count--, n === null ? ru || qm(o, e.type, e.stateNode) : Vm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Ou(t, e, n), ju(e), a & 512 && (iu || r === null || Tl(r, r.return)), r !== null && a & 4 && Ml(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = au, au = !1, Ou(t, e, n), au = o, ju(e), a & 512 && (iu || r === null || Tl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						dn(t, ""), R = !0;
					} catch (t) {
						mf(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Ml(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (ou = !0);
				break;
			case 6:
				if (Ou(t, e, n), ju(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, R = !0;
					} catch (t) {
						mf(e, e.return, t);
					}
				}
				break;
			case 3:
				if (R = !1, Gm = null, o = ku, ku = xm(t.containerInfo), Ou(t, e, n), ku = o, ju(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Uh(t.containerInfo);
				} catch (t) {
					mf(e, e.return, t);
				}
				ou && (ou = !1, Mu(e)), R = !1;
				break;
			case 4:
				a = au, au = ru, r = qt(), o = ku, ku = xm(e.stateNode.containerInfo), Ou(t, e, n), ju(e), ku = o, R && uu && (du = !0), R = r, au = a;
				break;
			case 12:
				Ou(t, e, n), ju(e);
				break;
			case 31:
				Ou(t, e, n), ju(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 13:
				Ou(t, e, n), ju(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (md = L()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = ru, l = iu, u = au;
				ru = c || o, au = u || o, iu = l || s, Ou(t, e, n), iu = l, au = u, ru = c, ju(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || ru || iu || (t = s || iu, n = ru, r = iu, ru = o || ru, iu = t, Iu(e, 2), ru = n, iu = r), !o && au || gu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Du(e, n))));
				break;
			case 19:
				Ou(t, e, n), ju(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 30:
				a & 512 && (iu || r === null || Tl(r, r.return)), a = qt(), o = uu, s = (n & 335544064) === n, c = e.memoizedProps, uu = s && yi(c.default, c.update) !== "none", Ou(t, e, n), ju(e), s && r !== null && R && (e.flags |= 4), uu = o, R = a;
				break;
			case 21: break;
			case 7: a & 512 && (iu || r === null || Tl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Ou(t, e, n), ju(e);
		}
	}
	function ju(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Nl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Al(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (kl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Il(e, Pl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (dn(l, ""), n.flags &= -33), Il(e, Pl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Fl(e, Pl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				mf(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Mu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Mu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, _h = !0, t.reset(), _h = !1), e = e.sibling;
		}
	}
	function Nu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Pu(t, e), t = t.sibling;
		else nu(t, !1);
	}
	function Pu(e, t) {
		var n = e.alternate;
		if (n === null) Jl(e, !1);
		else switch (e.tag) {
			case 3:
				if (fu = lu = !1, Hl(), Nu(t, e), !lu && !du) {
					if (e = Vl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Op(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), fu = !0;
				}
				Vl = null;
				break;
			case 5:
				Nu(t, e);
				break;
			case 4:
				r = lu, lu = !1, Nu(t, e), lu && (du = !0), lu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Nu(t, e) : Jl(e, !1));
				break;
			case 30:
				r = lu, i = Hl(), lu = !1, Nu(t, e), lu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = _i(a, o), o = _i(n.memoizedProps, o);
				var s = yi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Ul = 0, t = tu(e, n, t, o, s, a, !0), Ul !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Nd(e, e.memoizedProps.onUpdate), Vl = i) : i !== null && (i.push.apply(i, Vl), Vl = i), lu = e.flags & 32 ? !0 : r;
				break;
			default: Nu(t, e);
		}
	}
	function Fu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) hu(e, t.alternate, t), t = t.sibling;
	}
	function Iu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					xl(4, n, n.return), Iu(n, r);
					break;
				case 1:
					Tl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && Cl(n, n.return, i), Iu(n, r);
					break;
				case 27: r & 2 && _m(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Tl(n, n.return), n.tag !== 5 && n.tag !== 27 || Ol(n), Iu(n, r);
					break;
				case 6:
					Ol(n);
					break;
				case 26:
					Tl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || iu || i.parentNode.removeChild(i), Iu(n, r);
					break;
				case 22:
					n.memoizedState === null && Iu(n, r);
					break;
				case 30:
					Tl(n, n.return), Iu(n, r);
					break;
				case 7: Tl(n, n.return);
				default: Iu(n, r);
			}
			e = e.sibling;
		}
	}
	function Lu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Lu(i, a, n), bl(4, a);
					break;
				case 1:
					if (Lu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						mf(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Co(l[i], c);
						} catch (e) {
							mf(r, r.return, e);
						}
					}
					s && o & 64 && Sl(a), wl(a, a.return);
					break;
				case 27: n & 2 && Ll(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Dl(a), Lu(i, a, n), s && r === null && o & 4 && jl(a), wl(a, a.return);
					break;
				case 6:
					Dl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || ru || qm(xm(c.ownerDocument), a.type, c), Lu(i, a, n), s && r === null && o & 4 && jl(a), wl(a, a.return);
					break;
				case 12:
					Lu(i, a, n);
					break;
				case 31:
					Lu(i, a, n), s && o & 4 && wu(i, a);
					break;
				case 13:
					Lu(i, a, n), s && o & 4 && Tu(i, a);
					break;
				case 22:
					a.memoizedState === null && Lu(i, a, n), wl(a, a.return);
					break;
				case 30:
					Lu(i, a, n), wl(a, a.return);
					break;
				case 7: wl(a, a.return);
				default: Lu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Ru(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ma(n));
	}
	function zu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ma(e));
	}
	function Bu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Vu(e, t, n, r), t = t.sibling;
		else i && eu(t);
	}
	function Vu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && $l(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Bu(e, t, n, r), a & 2048 && bl(9, t);
				break;
			case 1:
				Bu(e, t, n, r);
				break;
			case 3:
				Bu(e, t, n, r), i && fu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ma(a)));
				break;
			case 12:
				if (a & 2048) {
					Bu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						mf(t, t.return, e);
					}
				} else Bu(e, t, n, r);
				break;
			case 31:
				Bu(e, t, n, r);
				break;
			case 13:
				Bu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && $l(t), o._visibility & 2 ? Bu(e, t, n, r) : (o._visibility |= 2, Hu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && $l(s), o._visibility & 2 ? Bu(e, t, n, r) : Uu(e, t)), a & 2048 && Ru(s, t);
				break;
			case 24:
				Bu(e, t, n, r), a & 2048 && zu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Kl(a.child, !0), Kl(t.child, !0))), Bu(e, t, n, r);
				break;
			default: Bu(e, t, n, r);
		}
	}
	function Hu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Hu(a, o, s, c, i), bl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Hu(a, o, s, c, i)) : u._visibility & 2 ? Hu(a, o, s, c, i) : Uu(a, o), i && l & 2048 && Ru(o.alternate, o);
					break;
				case 24:
					Hu(a, o, s, c, i), i && l & 2048 && zu(o.alternate, o);
					break;
				default: Hu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Uu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Uu(n, r), i & 2048 && Ru(r.alternate, r);
					break;
				case 24:
					Uu(n, r), i & 2048 && zu(r.alternate, r);
					break;
				default: Uu(n, r);
			}
			t = t.sibling;
		}
	}
	var Wu = 8192;
	function Gu(e, t, n) {
		if (e.subtreeFlags & Wu) for (e = e.child; e !== null;) Ku(e, t, n), e = e.sibling;
	}
	function Ku(e, t, n) {
		switch (e.tag) {
			case 26:
				Gu(e, t, n), e.flags & Wu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Qm(n, e)) : $m(n, ku, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Gu(e, t, n), e.flags & Wu && (e = e.stateNode, (t & 335544128) === t && Qm(n, e));
				break;
			case 3:
			case 4:
				var r = ku;
				ku = xm(e.stateNode.containerInfo), Gu(e, t, n), ku = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Wu, Wu = 16777216, Gu(e, t, n), Wu = r) : Gu(e, t, n));
				break;
			case 30:
				if ((e.flags & Wu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, zl === null && (zl = /* @__PURE__ */ new Map()), zl.set(r, i);
				}
				Gu(e, t, n);
				break;
			default: Gu(e, t, n);
		}
	}
	function qu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ju(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				cu = r, Zu(r, e);
			}
			qu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Yu(e), e = e.sibling;
	}
	function Yu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ju(e), e.flags & 2048 && xl(9, e, e.return);
				break;
			case 3:
				Ju(e);
				break;
			case 12:
				Ju(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Xu(e)) : Ju(e);
				break;
			default: Ju(e);
		}
	}
	function Xu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				cu = r, Zu(r, e);
			}
			qu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					xl(8, t, t.return), Xu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Xu(t));
					break;
				default: Xu(t);
			}
			e = e.sibling;
		}
	}
	function Zu(e, t) {
		for (; cu !== null;) {
			var n = cu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					xl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ma(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, cu = r;
			else a: for (n = e; cu !== null;) {
				r = cu;
				var i = r.sibling, a = r.return;
				if (yu(r), r === n) {
					cu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, cu = i;
					break a;
				}
				cu = a;
			}
		}
	}
	var Qu = {
		getCacheForType: function(e) {
			var t = wa(Aa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return wa(Aa).controller.signal;
		}
	}, $u = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, ed = null, td = !1, nd = !1, rd = !1, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = null, fd = null, pd = !1, md = 0, hd = 0, gd = Infinity, _d = null, vd = null, yd = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
	function jd() {
		return K & 2 && Y !== 0 ? Y & -Y : P.T === null ? bt() : Ff();
	}
	function Md() {
		if (ld === 0) {
			if (!(Y & 536870912) || V) {
				var e = it;
				it <<= 1, !(it & 3932160) && (it = 262144), ld = e;
			} else ld = 536870912;
		}
		return e = ko.current, e !== null && (e.flags |= 32), ld;
	}
	function Nd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Ip(_i(e.memoizedProps, n))), Dd === null && (Dd = []), Dd.push(t.bind(null, r));
		}
	}
	function Pd(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Vd(e, 0), Rd(e, Y, ld, !1)), pt(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (sd |= n), ad === 4 && Rd(e, Y, ld, !1)), Df(e));
	}
	function Fd(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ct(e, t), a = r ? Yd(e, t) : qd(e, t, !0), o = r;
		do {
			if (a === 0) {
				nd && !r && Rd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Ld(n)) {
				a = qd(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = dd;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Vd(c, s).flags |= 256), s = qd(c, s, !1), s !== 2 && s !== 6) {
							if (rd && !l) {
								c.errorRecoveryDisabledLanes |= o, sd |= o, a = 4;
								break a;
							}
							o = fd, fd = a, o !== null && (fd === null ? fd = o : fd.push.apply(fd, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Vd(e, 0), Rd(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
					case 6:
						Rd(r, t, ld, !td);
						break a;
					case 2:
						fd = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = md + 300 - L(), 10 < a)) {
					if (Rd(r, t, ld, !td), st(r, 0, !0) !== 0) break a;
					Sd = t, r.timeoutHandle = vp(Id.bind(null, r, n, fd, _d, pd, t, ld, sd, ud, td, o, "Throttled", -0, 0), a);
					break a;
				}
				Id(r, n, fd, _d, pd, t, ld, sd, ud, td, o, null, -0, 0);
			}
			break;
		} while (1);
		Df(e);
	}
	function Id(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		if (d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: yn
		}, zl = null, Ku(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = rh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? md - L() : (a & 4194048) === a ? hd - L() : 0, m = th(d, m), m !== null)) {
			Sd = a, e.cancelPendingCommit = m(nf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Rd(e, a, o, !l);
			return;
		}
		nf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Ld(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Hr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rd(e, t, n, r) {
		t = lt(e, t), t &= ~cd, t &= ~sd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - $e(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ht(e, n, t);
	}
	function zd() {
		return K & 6 ? !0 : (Of(0, !1), !1);
	}
	function Bd() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, ga = ha = null, rs(e), io = null, ao = 0, e = J;
			for (; e !== null;) yl(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Vd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, yp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sd = 0, Bd(), q = e, J = n = Ni(e.current, null), Y = t, X = 0, ed = null, td = !1, nd = ct(e, t), rd = !1, ud = ld = cd = sd = od = ad = 0, fd = dd = null, pd = !1, id = lt(e, t), wi(), n;
	}
	function Hd(e, t) {
		W = null, P.H = fc, t === Ja || t === Xa ? (t = no(), X = 3) : t === Ya ? (t = no(), X = 4) : X = t === Ac ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, ed = t, J === null && (ad = 1, wc(e, Vi(t, e.current)));
	}
	function Ud() {
		var e = ko.current;
		return e === null ? !0 : (Y & 4194048) === Y ? Ao === null : (Y & 62914560) === Y || Y & 536870912 ? e === Ao : !1;
	}
	function Wd() {
		var e = P.H;
		return P.H = fc, e === null ? fc : e;
	}
	function Gd() {
		var e = P.A;
		return P.A = Qu, e;
	}
	function Kd() {
		ad = 4, td || (Y & 4194048) !== Y && ko.current !== null || (nd = !0), !(od & 134217727) && !(sd & 134217727) || q === null || Rd(q, Y, ld, !1);
	}
	function qd(e, t, n) {
		var r = K;
		K |= 2;
		var i = Wd(), a = Gd();
		(q !== e || Y !== t) && (_d = null, Vd(e, t)), t = !1;
		var o = ad;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = ed;
					switch (X) {
						case 8:
							Bd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							ko.current === null && (t = !0);
							var l = X;
							if (X = 0, ed = null, $d(e, s, c, l), n && nd) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, ed = null, $d(e, s, c, l);
					}
				}
				Jd(), o = ad;
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ga = ha = null, K = r, P.H = i, P.A = a, J === null && (q = null, Y = 0, wi()), o;
	}
	function Jd() {
		for (; J !== null;) Zd(J);
	}
	function Yd(e, t) {
		var n = K;
		K |= 2;
		var r = Wd(), a = Gd();
		q !== e || Y !== t ? (_d = null, gd = L() + 500, Vd(e, t)) : nd = ct(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = ed;
					b: switch (X) {
						case 1:
							X = 0, ed = null, $d(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Qa(o)) {
								X = 0, ed = null, Qd(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), Df(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							Qa(o) ? (X = 0, ed = null, Qd(t)) : (X = 0, ed = null, $d(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Xm(s) : c.stateNode.complete) {
										X = 0, ed = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, ef(u));
										}
										break b;
									}
							}
							X = 0, ed = null, $d(e, t, o, 5);
							break;
						case 6:
							X = 0, ed = null, $d(e, t, o, 6);
							break;
						case 8:
							Bd(), ad = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Xd();
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return ga = ha = null, P.H = r, P.A = a, K = n, J === null ? (q = null, Y = 0, wi(), ad) : 0;
	}
	function Xd() {
		for (; J !== null && !Be();) Zd(J);
	}
	function Zd(e) {
		var t = ul(e.alternate, e, id);
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : J = t;
	}
	function Qd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Wc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = Wc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5:
				rs(t);
				var r = t;
				r === na && (V ? (la(r), r.tag === 5 && r.stateNode != null && (ra = r.stateNode)) : (la(r), V = !0));
			default: yl(n, t), t = J = Pi(t, id), t = ul(n, t, id);
		}
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : J = t;
	}
	function $d(e, t, n, r) {
		ga = ha = null, rs(t), io = null, ao = 0;
		var i = t.return;
		try {
			if (kc(e, i, t, n, Y)) {
				ad = 1, wc(e, Vi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			ad = 1, wc(e, Vi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (V || r === 1 ? e = !0 : nd || Y & 536870912 ? e = !1 : (td = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ko.current, r !== null && r.tag === 13 && (r.flags |= 16384))), tf(t, e)) : ef(t);
	}
	function ef(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				tf(t, td);
				return;
			}
			e = t.return;
			var n = _l(t.alternate, t, id);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		ad === 0 && (ad = 5);
	}
	function tf(e, t) {
		do {
			var n = vl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		ad = 6, J = null;
	}
	function nf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			df();
		while (yd !== 0);
		if (K & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === q && (J = q = null, Y = 0), xd = t, bd = e, Sd = n, wd = a, Td = r, rf(e, t, n, s, c, l, f);
		}
	}
	function rf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Cd = s, s |= Ci, mt(e, n, s, r, i, a), Dd = null, (n & 335544064) === n ? (Od = Fa(e), r = 10262) : (Od = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, bf(Ge, function() {
			return ff(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Rl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = P.T, P.T = null, i = F.p, F.p = 2, a = K, K |= 4;
			try {
				pu(e, t, n);
			} finally {
				K = a, F.p = i, P.T = r;
			}
		}
		yd = 1, Rl ? Ed = Pp(o, e.containerInfo, Od, sf, cf, of, lf, ff, af, null, null) : (sf(), cf(), lf());
	}
	function af(e) {
		if (yd !== 0) {
			var t = bd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function of() {
		yd === 3 && (yd = 0, Pu(xd, bd), yd = 4);
	}
	function sf() {
		if (yd === 1) {
			yd = 0;
			var e = bd, t = xd, n = Sd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = P.T, P.T = null;
				var i = F.p;
				F.p = 2;
				var a = K;
				K |= 4;
				try {
					uu = du = !1, Au(t, e, n), n = up;
					var o = Jr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && qr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Yr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Kr(s, h), v = Kr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					_h = !!lp, up = lp = null;
				} finally {
					K = a, F.p = i, P.T = r;
				}
			}
			e.current = t, yd = 2;
		}
	}
	function cf() {
		if (yd === 2) {
			yd = 0;
			var e = bd, t = xd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = P.T, P.T = null;
				var r = F.p;
				F.p = 2;
				var i = K;
				K |= 4;
				try {
					hu(e, t.alternate, t);
				} finally {
					K = i, F.p = r, P.T = n;
				}
			}
			yd = 3;
		}
	}
	function lf() {
		if (yd === 4 || yd === 3) {
			yd = 0;
			var e = Ed;
			Ed = null, Ve();
			var t = bd, n = xd, r = Sd, i = Td, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? yd = 5 : (yd = 0, xd = bd = null, uf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (vd = null), yt(r), n = n.stateNode, Ze && typeof Ze.onCommitFiberRoot == "function") try {
				Ze.onCommitFiberRoot(Xe, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = P.T, a = F.p, F.p = 2, P.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					P.T = n, F.p = a;
				}
			}
			if (i = Dd, o = Od, Od = null, i !== null && (Dd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Sd & 3 && df(), Df(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ad ? kd++ : (kd = 0, Ad = t) : (kd = 0, Ad = null), Of(0, !1);
		}
	}
	function uf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ma(t)));
	}
	function df() {
		return Ed !== null && (Ed.skipTransition(), Ed = null), sf(), cf(), lf(), ff();
	}
	function ff() {
		if (yd !== 5) return !1;
		var e = bd, t = Cd;
		Cd = 0;
		var n = yt(Sd), r = P.T, a = F.p;
		try {
			F.p = 32 > n ? 32 : n, P.T = null, n = wd, wd = null;
			var o = bd, s = Sd;
			if (yd = 0, xd = bd = null, Sd = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Yu(o.current), Vu(o, o.current, s, n), K = c, Of(0, !1), Ze && typeof Ze.onPostCommitFiberRoot == "function") try {
				Ze.onPostCommitFiberRoot(Xe, o);
			} catch {}
			return !0;
		} finally {
			F.p = a, P.T = r, uf(e, t);
		}
	}
	function pf(e, t, n) {
		t = Vi(n, t), t = Ec(e.stateNode, t, 2), e = _o(e, t, 2), e !== null && (pt(e, 2), Df(e));
	}
	function mf(e, t, n) {
		if (e.tag === 3) pf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				pf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vd === null || !vd.has(r))) {
					e = Vi(n, e), n = Dc(2), r = _o(t, n, 2), r !== null && (Oc(n, r, t, e), pt(r, 2), Df(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function hf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new $u();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (rd = !0, i.add(n), e = gf.bind(null, e, t, n), t.then(e, e));
	}
	function gf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (ad === 4 || ad === 3 && (Y & 62914560) === Y && 300 > L() - md ? K & 2 ? cd |= n : Vd(e, 0) : cd |= n, ud === Y && (ud = 0)), Df(e);
	}
	function _f(e, t) {
		t === 0 && (t = dt()), e = B(e, t), e !== null && (pt(e, t), Df(e));
	}
	function vf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), _f(e, n);
	}
	function yf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), _f(e, n);
	}
	function bf(e, t) {
		return Re(e, t);
	}
	var xf = null, Sf = null, Cf = !1, wf = !1, Tf = !1, Ef = 0;
	function Df(e) {
		e !== Sf && e.next === null && (Sf === null ? xf = Sf = e : Sf = Sf.next = e), wf = !0, Cf || (Cf = !0, Pf());
	}
	function Of(e, t) {
		if (!Tf && wf) {
			Tf = !0;
			do
				for (var n = !1, r = xf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - $e(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Nf(r, a));
						} else a = Y, a = st(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ct(r, a) || (n = !0, Nf(r, a));
					}
					r = r.next;
				}
			while (n);
			Tf = !1;
		}
	}
	function kf() {
		Af();
	}
	function Af() {
		wf = Cf = !1;
		var e = 0;
		Ef !== 0 && _p() && (e = Ef);
		for (var t = L(), n = null, r = xf; r !== null;) {
			var i = r.next, a = jf(r, t);
			a === 0 ? (r.next = null, n === null ? xf = i : n.next = i, i === null && (Sf = n)) : (n = r, (e !== 0 || a & 3) && (wf = !0)), r = i;
		}
		yd !== 0 && yd !== 5 || Of(e, !1), Ef !== 0 && (Ef = 0);
	}
	function jf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - $e(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ut(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = st(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ze(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ct(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ze(r), yt(n)) {
				case 2:
				case 8:
					n = We;
					break;
				case 32:
					n = Ge;
					break;
				case 268435456:
					n = qe;
					break;
				default: n = Ge;
			}
			return r = Mf.bind(null, e), n = Re(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ze(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Mf(e, t) {
		if (yd !== 0 && yd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (df() && e.callbackNode !== n) return null;
		var r = Y;
		return r = st(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Fd(e, r, t), jf(e, L()), e.callbackNode != null && e.callbackNode === n ? Mf.bind(null, e) : null);
	}
	function Nf(e, t) {
		if (df()) return null;
		Fd(e, t, !0);
	}
	function Pf() {
		Sp(function() {
			K & 6 ? Re(Ue, kf) : Af();
		});
	}
	function Ff() {
		if (Ef === 0) {
			var e = Ra;
			e === 0 && (e = rt, rt <<= 1, !(rt & 261888) && (rt = 256)), Ef = e;
		}
		return Ef;
	}
	function If(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : vn(e);
	}
	function Lf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = If((i[wt] || null).action), o = r.submitter;
			o && (t = (t = o[wt] || null) ? If(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Bn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Ef !== 0) {
								var e = new FormData(i, o);
								Qs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Qs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Rf = 0; Rf < mi.length; Rf++) {
		var zf = mi[Rf];
		hi(zf.toLowerCase(), "on" + (zf[0].toUpperCase() + zf.slice(1)));
	}
	hi(si, "onAnimationEnd"), hi(ci, "onAnimationIteration"), hi(li, "onAnimationStart"), hi("dblclick", "onDoubleClick"), hi("focusin", "onFocus"), hi("focusout", "onBlur"), hi(ui, "onTransitionRun"), hi(di, "onTransitionStart"), hi(fi, "onTransitionCancel"), hi(pi, "onTransitionEnd"), Ht("onMouseEnter", ["mouseout", "mouseover"]), Ht("onMouseLeave", ["mouseout", "mouseover"]), Ht("onPointerEnter", ["pointerout", "pointerover"]), Ht("onPointerLeave", ["pointerout", "pointerover"]), Vt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Vt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Vt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Vt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Vt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Vt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Bf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Vf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bf));
	function Hf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						bi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						bi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Z(e, t) {
		var n = t[Et];
		n === void 0 && (n = t[Et] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Kf(t, e, 2, !1), n.add(r));
	}
	function Uf(e, t, n) {
		var r = 0;
		t && (r |= 4), Kf(n, e, r, t);
	}
	var Wf = "_reactListening" + Math.random().toString(36).slice(2);
	function Gf(e) {
		if (!e[Wf]) {
			e[Wf] = !0, zt.forEach(function(t) {
				t !== "selectionchange" && (Vf.has(t) || Uf(t, !1, e), Uf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Wf] || (t[Wf] = !0, Uf("selectionchange", !1, t));
		}
	}
	function Kf(e, t, n, r) {
		switch (wh(t)) {
			case 2:
				var i = vh;
				break;
			case 8:
				i = yh;
				break;
			default: i = bh;
		}
		n = i.bind(null, t, n, e), i = void 0, !kn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function qf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Nt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		En(function() {
			var r = a, i = xn(n), s = [];
			a: {
				var c = z.get(e);
				if (c !== void 0) {
					var l = Bn, u = e;
					switch (e) {
						case "keypress": if (Fn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = ir;
							break;
						case "focusin":
							u = "focus", l = Yn;
							break;
						case "focusout":
							u = "blur", l = Yn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Yn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = qn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Jn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = sr;
							break;
						case si:
						case ci:
						case li:
							l = Xn;
							break;
						case pi:
							l = cr;
							break;
						case "scroll":
						case "scrollend":
							l = Hn;
							break;
						case "wheel":
							l = lr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Zn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = ar;
							break;
						case "submit":
							l = or;
							break;
						case "toggle":
						case "beforetoggle": l = ur;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Dn(m, p), g != null && d.push(Jf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== bn && (u = n.relatedTarget || n.fromElement) && (Nt(u) || u[Tt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Nt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = qn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = ar, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Ft(c), h = l == null ? u : Ft(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Nt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Xf) : null, c !== null && Zf(s, u, c, d, !1), l !== null && f !== null && Zf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Ft(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Ar;
					else if (wr(c)) {
						if (jr) _ = Br;
						else {
							_ = Rr;
							var v = Lr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && hn(r.elementType) && (_ = Ar) : _ = zr;
					if (_ &&= _(e, r)) {
						Tr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Ft(r) : window, e) {
					case "focusin":
						(wr(v) || v.contentEditable === "true") && (Zr = v, Qr = r, $r = null);
						break;
					case "focusout":
						$r = Qr = Zr = null;
						break;
					case "mousedown":
						ei = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ei = !1, ti(s, n, i);
						break;
					case "selectionchange": if (Xr) break;
					case "keydown":
					case "keyup": ti(s, n, i);
				}
				var y;
				if (fr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else br ? vr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (hr && n.locale !== "ko" && (br || b !== "onCompositionStart" ? b === "onCompositionEnd" && br && (y = Pn()) : (jn = i, Mn = "value" in jn ? jn.value : jn.textContent, br = !0)), v = Yf(r, b), 0 < v.length && (b = new Qn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = yr(n), y !== null && (b.data = y)))), (y = mr ? xr(e, n) : Sr(e, n)) && (b = Yf(r, "onBeforeInput"), 0 < b.length && (v = new Qn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Lf(s, e, r, n, i);
			}
			Hf(s, t);
		});
	}
	function Jf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Yf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Dn(e, n), i != null && r.unshift(Jf(e, i, a)), i = Dn(e, t), i != null && r.push(Jf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Xf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Zf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Dn(n, a), l != null && o.unshift(Jf(n, l, c))) : i || (l = Dn(n, a), l != null && o.push(Jf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Qf = /\r\n?/g, $f = /\u0000|\uFFFD/g;
	function ep(e) {
		return (typeof e == "string" ? e : "" + e).replace(Qf, "\n").replace($f, "");
	}
	function tp(e, t) {
		return t = ep(t), ep(e) === t;
	}
	function np(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || dn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && dn(e, "" + r);
				else return;
				break;
			case "className":
				Yt(e, "class", r);
				break;
			case "tabIndex":
				Yt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Yt(e, n, r);
				break;
			case "style":
				mn(e, r, o);
				return;
			case "data": if (t !== "object") {
				Yt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = vn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && np(e, t, "name", a.name, a, null), np(e, t, "formEncType", a.formEncType, a, null), np(e, t, "formMethod", a.formMethod, a, null), np(e, t, "formTarget", a.formTarget, a, null)) : (np(e, t, "encType", a.encType, a, null), np(e, t, "method", a.method, a, null), np(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = vn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = yn);
				return;
			case "onScroll":
				r != null && Z("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = vn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Z("beforetoggle", e), Z("toggle", e), Jt(e, "popover", r);
				break;
			case "xlinkActuate":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Xt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Jt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = gn.get(n) || n, Jt(e, n, r);
			else return;
		}
		R = !0;
	}
	function rp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				mn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") dn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") dn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = yn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Bt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[wt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					R = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Jt(e, n, r);
				}
				return;
		}
		R = !0;
	}
	function ip(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Z("error", e), Z("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: np(e, t, o, s, n, null);
					}
				}
				a && np(e, t, "srcSet", n.srcSet, n, null), r && np(e, t, "src", n.src, n, null);
				return;
			case "input":
				Z("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: np(e, t, r, d, n, null);
					}
				}
				on(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Z("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: np(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && cn(e, !!r, n, !0) : cn(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Z("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: np(e, t, s, c, n, null);
				}
				un(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: np(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Z("beforetoggle", e), Z("toggle", e), Z("cancel", e), Z("close", e);
				break;
			case "iframe":
			case "object":
				Z("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Bf.length; r++) Z(Bf[r], e);
				break;
			case "image":
				Z("error", e), Z("load", e);
				break;
			case "details":
				Z("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Z("error", e), Z("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: np(e, t, u, r, n, null);
				}
				return;
			default: if (hn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && rp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && np(e, t, c, r, n, null));
	}
	var ap = {};
	function op(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || np(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (R = !0), o = m;
							break;
						case "name":
							m !== f && (R = !0), a = m;
							break;
						case "checked":
							m !== f && (R = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (R = !0), d = m;
							break;
						case "value":
							m !== f && (R = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (R = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && np(e, t, p, m, r, f);
					}
				}
				an(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || np(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (R = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (R = !0), c = o;
						break;
					case "multiple": o !== l && (R = !0), s = o;
					default: o !== l && np(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? cn(e, !!n, n ? [] : "", !1) : cn(e, !!n, t, !0)) : cn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: np(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (R = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (R = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && np(e, t, s, a, r, o);
				}
				ln(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: np(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (R = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: np(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && np(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: np(e, t, u, p, r, m);
				}
				return;
			default: if (hn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && rp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || rp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && np(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || np(e, t, f, p, r, m);
	}
	function sp(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function cp() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && sp(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && sp(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var lp = null, up = null;
	function dp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function fp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function pp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function mp(e, t, n, r) {
		return n = dp(n).createElement(e), n[Ct] = r, n[wt] = t, ip(n, e, t), Lt(n), n;
	}
	function hp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var gp = null;
	function _p() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== gp && (gp = e, !0) : (gp = null, !1);
	}
	var vp = typeof setTimeout == "function" ? setTimeout : void 0, yp = typeof clearTimeout == "function" ? clearTimeout : void 0, bp = typeof Promise == "function" ? Promise : void 0, xp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : vp, Sp = typeof queueMicrotask == "function" ? queueMicrotask : bp === void 0 ? vp : function(e) {
		return bp.resolve(null).then(e).catch(Cp);
	};
	function Cp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function wp(e) {
		return e === "head";
	}
	function Tp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Uh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") vm(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, vm(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[At] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && vm(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Uh(t);
	}
	function Ep(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Dp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Op(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function kp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Ap(e) {
		return kp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function jp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return kp(t, n, e);
	}
	function Mp(e) {
		return e.documentElement.clientHeight;
	}
	function Np(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Pp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Mp(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Zm(f), u > eh) {
									s.length = o;
									break;
								}
								f = new Promise(Np.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Fp(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Fp.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Fp.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Fp.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Ip(e) {
		return {
			name: e,
			group: new Fp("group", e),
			imagePair: new Fp("image-pair", e),
			old: new Fp("old", e),
			new: new Fp("new", e)
		};
	}
	function Lp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Lp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Hp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Bp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), m(this._fragmentFiber.child, !1, Rp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Rp(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Lp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Hp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Bp(i.optionsOrUseCapture), m(this._fragmentFiber.child, !1, zp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function zp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Bp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function Vp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Hp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = Vp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && Vp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Lp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Bp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Bp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Lp.prototype.focus = function(e) {
		m(this._fragmentFiber.child, !0, Up, e, void 0, void 0);
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), mm(e, t));
	}
	Lp.prototype.focusLast = function(e) {
		var t = [];
		m(this._fragmentFiber.child, !0, Wp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Up(t[n], e); n--);
	};
	function Wp(e, t) {
		return t.push(e), !1;
	}
	Lp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = dp(e).activeElement, e !== null && m(this._fragmentFiber.child, !1, Gp, e, void 0, void 0));
	};
	function Gp(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Lp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), m(this._fragmentFiber.child, !1, Kp, e, void 0, void 0);
	};
	function Kp(e, t) {
		return e.tag !== 6 && (e = b(e), t.observe(e), !1);
	}
	Lp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), m(this._fragmentFiber.child, !1, qp, e, void 0, void 0);
			for (var n = t = 0; n < Jp.length; n++) {
				var r = Jp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Jp[t++] = r;
			}
			Jp.length = t;
		}
	};
	function qp(e, t) {
		return e.tag !== 6 && (e = b(e), t.unobserve(e), !1);
	}
	var Jp = [], Yp = !1;
	function Xp(e, t, n) {
		Jp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), Yp || (Yp = !0, hm(function() {
			Yp = !1;
			var e = Jp;
			Jp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Lp.prototype.getClientRects = function() {
		var e = [];
		return m(this._fragmentFiber.child, !1, Zp, e, void 0, void 0), e;
	};
	function Zp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Lp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Lp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		m(this._fragmentFiber.child, !1, Wp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Qp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Qp(e, t, n, r, i) {
		var a = Nt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = E(n, a, T), t === null ? t = !1 : (m(t, !0, C, a, n), a = x, x = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = E(r, a, T), t === null ? t = !1 : (m(t, !0, w, a, r), a = x, S = x = null, t = a !== null)), t) : !1;
	}
	function $p(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Lp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		m(this._fragmentFiber.child, !1, Wp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), $p(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), $p(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function em(e, t) {
		return e = b(e), tm(e, t), !1;
	}
	function tm(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function nm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Bp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Jp.length; i++) {
				var a = Jp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Jp[r++] = a);
			}
			Jp.length = r, n.observe(e);
		}), tm(e, t));
	}
	function rm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Bp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Xp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function im(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					im(n), Mt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function am(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[At]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = um(e.nextSibling), e === null) break;
		}
		return null;
	}
	function om(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = um(e.nextSibling), e === null)) return null;
		return e;
	}
	function sm(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = um(e.nextSibling), e === null)) return null;
		return e;
	}
	function cm(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function Q(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function lm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function um(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var dm = null;
	function fm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return um(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function pm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function mm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function hm(e) {
		xp(function() {
			xp(function(t) {
				return e(t);
			});
		});
	}
	function gm(e, t, n) {
		switch (t = dp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function _m(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && np(e, t, r, null, ap, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === yn && (e.onclick = null), Mt(e);
	}
	function vm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Mt(e);
	}
	var ym = /* @__PURE__ */ new Map(), bm = /* @__PURE__ */ new Set();
	function xm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Sm = F.d;
	F.d = {
		f: Cm,
		r: wm,
		D: Dm,
		C: Om,
		L: km,
		m: Am,
		X: Mm,
		S: jm,
		M: Nm
	};
	function Cm() {
		var e = Sm.f(), t = zd();
		return e || t;
	}
	function wm(e) {
		var t = Pt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ec(t) : Sm.r(e);
	}
	var Tm = typeof document > "u" ? null : document;
	function Em(e, t, n) {
		var r = Tm;
		if (r && typeof t == "string" && t) {
			var i = rn(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), bm.has(i) || (bm.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), ip(t, "link", e), Lt(t), r.head.appendChild(t)));
		}
	}
	function Dm(e) {
		Sm.D(e), Em("dns-prefetch", e, null);
	}
	function Om(e, t) {
		Sm.C(e, t), Em("preconnect", e, t);
	}
	function km(e, t, n) {
		Sm.L(e, t, n);
		var r = Tm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + rn(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + rn(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + rn(n.imageSizes) + "\"]")) : i += "[href=\"" + rn(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Fm(e);
					break;
				case "script": a = zm(e);
			}
			if (!(ym.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), ym.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Im(a)) || t === "script" && r.querySelector(Bm(a))))) {
				var o = r.createElement("link");
				ip(o, "link", e), t === "style" && (o[jt] = !0, o.onload = o.onerror = function() {
					Rt(o);
				}), Lt(o), r.head.appendChild(o);
			}
		}
	}
	function Am(e, t) {
		Sm.m(e, t);
		var n = Tm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + rn(r) + "\"][href=\"" + rn(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = zm(e);
			}
			if (!ym.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), ym.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Bm(a))) return;
				}
				r = n.createElement("link"), ip(r, "link", e), Lt(r), n.head.appendChild(r);
			}
		}
	}
	function jm(e, t, n) {
		Sm.S(e, t, n);
		var r = Tm;
		if (r && e) {
			var i = It(r).hoistableStyles, a = Fm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Im(a))) s.loading = 5;
				else {
					e = D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = ym.get(a)) && Um(e, n);
					var c = o = r.createElement("link");
					Lt(c), ip(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Hm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Mm(e, t) {
		Sm.X(e, t);
		var n = Tm;
		if (n && e) {
			var r = It(n).hoistableScripts, i = zm(e), a = r.get(i);
			a || (a = n.querySelector(Bm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = ym.get(i)) && Wm(e, t), a = n.createElement("script"), Lt(a), ip(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t) {
		Sm.M(e, t);
		var n = Tm;
		if (n && e) {
			var r = It(n).hoistableScripts, i = zm(e), a = r.get(i);
			a || (a = n.querySelector(Bm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = ym.get(i)) && Wm(e, t), a = n.createElement("script"), Lt(a), ip(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Pm(e, t, n, r) {
		var a = (a = we.current) ? xm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Fm(n.href), t = It(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Fm(n.href);
					var o = It(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Im(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = ym.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, ym.set(e, o)), Rm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = zm(n), t = It(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Fm(e) {
		return "href=\"" + rn(e) + "\"";
	}
	function Im(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Lm(e) {
		return D({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Rm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[jt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[jt] = !0, t.onload = t.onerror = Rt.bind(null, t), ip(t, "link", n), Lt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function zm(e) {
		return "[src=\"" + rn(e) + "\"]";
	}
	function Bm(e) {
		return "script[async]" + e;
	}
	function Vm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + rn(n.href) + "\"]");
				if (r) return t.instance = r, Lt(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Lt(r), ip(r, "style", a), Hm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Fm(n.href);
				var o = e.querySelector(Im(a));
				if (o) return t.state.loading |= 4, t.instance = o, Lt(o), o;
				r = Lm(n), (a = ym.get(a)) && Um(r, a), o = (e.ownerDocument || e).createElement("link"), Lt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), ip(o, "link", r), t.state.loading |= 4, Hm(o, n.precedence, e), t.instance = o;
			case "script": return o = zm(n.src), (a = e.querySelector(Bm(o))) ? (t.instance = a, Lt(a), a) : (r = n, (a = ym.get(o)) && (r = D({}, n), Wm(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Lt(a), ip(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Hm(r, n.precedence, e));
		return t.instance;
	}
	function Hm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Wm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Gm = null;
	function Km(e, t, n) {
		if (Gm === null) {
			var r = /* @__PURE__ */ new Map(), i = Gm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Gm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[At] || a[Ct] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function qm(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Jm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Ym(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Xm(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Zm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Qm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Zm(t), e.suspenseyImages.push(t)), e = ih.bind(e), t.decode().then(e, e));
	}
	function $m(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Fm(r.href), a = t.querySelector(Im(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = rh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Lt(a);
					return;
				}
				a = t.ownerDocument || t, r = Lm(r), (i = ym.get(i)) && Um(r, i), a = a.createElement("link"), Lt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), ip(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = rh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var eh = 0;
	function th(e, t) {
		return e.stylesheets && e.count === 0 && oh(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && oh(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && eh === 0 && (eh = 62500 * cp());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && oh(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > eh ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function nh(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) oh(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function rh() {
		this.count--, nh(this);
	}
	function ih() {
		this.imgCount--, nh(this);
	}
	var ah = null;
	function oh(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ah = /* @__PURE__ */ new Map(), t.forEach(sh, e), ah = null, rh.call(e));
	}
	function sh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ah.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ah.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = rh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var ch = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: _e,
		_currentValue2: _e,
		_threadCount: 0
	};
	function lh(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ft(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ft(0), this.hiddenUpdates = ft(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function uh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new lh(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ji(3, null, null, t), e.current = a, a.stateNode = e, t = ja(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, mo(a), e;
	}
	function dh(e) {
		return e ? (e = ki, e) : ki;
	}
	function fh(e, t, n, r, i, a) {
		i = dh(i), r.context === null ? r.context = i : r.pendingContext = i, r = go(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = _o(e, r, t), n !== null && (Pd(n, e, t), vo(n, e, t));
	}
	function ph(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function mh(e, t) {
		ph(e, t), (e = e.alternate) && ph(e, t);
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = B(e, 67108864);
			t !== null && Pd(t, e, 67108864), mh(e, 67108864);
		}
	}
	function gh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = jd();
			t = vt(t);
			var n = B(e, t);
			n !== null && Pd(n, e, t), mh(e, t);
		}
	}
	var _h = !0;
	function vh(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = F.p;
		try {
			F.p = 2, bh(e, t, n, r);
		} finally {
			F.p = a, P.T = i;
		}
	}
	function yh(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = F.p;
		try {
			F.p = 8, bh(e, t, n, r);
		} finally {
			F.p = a, P.T = i;
		}
	}
	function bh(e, t, n, r) {
		if (_h) {
			var i = xh(r);
			if (i === null) qf(e, t, r, Sh, n), Nh(e, r);
			else if (Fh(i, e, t, n, r)) r.stopPropagation();
			else if (Nh(e, r), t & 4 && -1 < Mh.indexOf(e)) {
				for (; i !== null;) {
					var a = Pt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ot(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - $e(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Df(a), !(K & 6) && (gd = L() + 500, Of(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = B(a, 2), s !== null && Pd(s, a, 2), zd(), mh(a, 2);
					}
					if (a = xh(r), a === null && qf(e, t, r, Sh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else qf(e, t, r, null, n);
		}
	}
	function xh(e) {
		return e = xn(e), Ch(e);
	}
	var Sh = null;
	function Ch(e) {
		if (Sh = null, e = Nt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Sh = e, null;
	}
	function wh(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (He()) {
				case Ue: return 2;
				case We: return 8;
				case Ge:
				case Ke: return 32;
				case qe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Th = !1, Eh = null, Dh = null, Oh = null, kh = /* @__PURE__ */ new Map(), Ah = /* @__PURE__ */ new Map(), jh = [], Mh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Nh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Eh = null;
				break;
			case "dragenter":
			case "dragleave":
				Dh = null;
				break;
			case "mouseover":
			case "mouseout":
				Oh = null;
				break;
			case "pointerover":
			case "pointerout":
				kh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Ah.delete(t.pointerId);
		}
	}
	function Ph(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Pt(t), t !== null && hh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Fh(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Eh = Ph(Eh, e, t, n, r, i), !0;
			case "dragenter": return Dh = Ph(Dh, e, t, n, r, i), !0;
			case "mouseover": return Oh = Ph(Oh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return kh.set(a, Ph(kh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Ah.set(a, Ph(Ah.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ih(e) {
		var t = Nt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, xt(e.priority, function() {
							gh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, xt(e.priority, function() {
							gh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Lh(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = xh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				bn = r, n.target.dispatchEvent(r), bn = null;
			} else return t = Pt(n), t !== null && hh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Rh(e, t, n) {
		Lh(e) && n.delete(t);
	}
	function zh() {
		Th = !1, Eh !== null && Lh(Eh) && (Eh = null), Dh !== null && Lh(Dh) && (Dh = null), Oh !== null && Lh(Oh) && (Oh = null), kh.forEach(Rh), Ah.forEach(Rh);
	}
	function Bh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Th || (Th = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, zh)));
	}
	var Vh = null;
	function Hh(e) {
		Vh !== e && (Vh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Vh === e && (Vh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Ch(r || n) === null) continue;
					break;
				}
				var a = Pt(n);
				a !== null && (e.splice(t, 3), t -= 3, Qs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Uh(e) {
		function t(t) {
			return Bh(t, e);
		}
		Eh !== null && Bh(Eh, e), Dh !== null && Bh(Dh, e), Oh !== null && Bh(Oh, e), kh.forEach(t), Ah.forEach(t);
		for (var n = 0; n < jh.length; n++) {
			var r = jh[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < jh.length && (n = jh[0], n.blockedOn === null);) Ih(n), n.blockedOn === null && jh.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[wt] || null;
			if (typeof a == "function") o || Hh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[wt] || null) s = o.formAction;
					else if (Ch(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Hh(n);
			}
		}
	}
	function Wh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Gh(e) {
		this._internalRoot = e;
	}
	Kh.prototype.render = Gh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		fh(n, jd(), e, t, null, null);
	}, Kh.prototype.unmount = Gh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			fh(e.current, 2, null, e, null, null), zd(), t[Tt] = null;
		}
	};
	function Kh(e) {
		this._internalRoot = e;
	}
	Kh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = bt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < jh.length && t !== 0 && t < jh[n].priority; n++);
			jh.splice(n, 0, e), n === 0 && Ih(e);
		}
	};
	var qh = n.version;
	if (qh !== "19.3.0") throw Error(i(527, qh, "19.3.0"));
	F.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var Jh = {
		bundleType: 0,
		version: "19.3.0",
		rendererPackageName: "react-dom",
		currentDispatcherRef: P,
		reconcilerVersion: "19.3.0"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Yh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Yh.isDisabled && Yh.supportsFiber) try {
			Xe = Yh.inject(Jh), Ze = Yh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = xc, s = Sc, c = Cc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = uh(e, 1, !1, null, null, n, r, null, o, s, c, Wh), e[Tt] = t.current, Gf(e), new Gh(t);
	};
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = g();
}));
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function v(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = v(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function y() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = v(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/recharts/es6/util/excludeEventProps.js
var b = /* @__PURE__ */ "dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture".split(".");
function x(e) {
	return typeof e == "string" && b.includes(e);
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesNoEvents.js
var S = /* @__PURE__ */ l(p()), C = /* @__PURE__ */ new Set(/* @__PURE__ */ "aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle".split("."));
function w(e) {
	return typeof e == "string" && C.has(e);
}
function T(e) {
	return typeof e == "string" && e.startsWith("data-");
}
function E(e) {
	if (typeof e != "object" || !e) return {};
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (w(n) || T(n)) && (t[n] = e[n]);
	return t;
}
function D(e) {
	if (e == null) return null;
	if (/*#__PURE__*/ (0, S.isValidElement)(e) && typeof e.props == "object" && e.props !== null) {
		var t = e.props;
		return E(t);
	}
	return typeof e == "object" && !Array.isArray(e) ? E(e) : null;
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesAndEvents.js
function O(e) {
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (w(n) || T(n) || x(n)) && (t[n] = e[n]);
	return t;
}
function k(e) {
	return e == null ? null : /*#__PURE__*/ (0, S.isValidElement)(e) ? O(e.props) : typeof e == "object" && !Array.isArray(e) ? O(e) : null;
}
//#endregion
//#region node_modules/recharts/es6/container/Surface.js
var A = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function j() {
	return j = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, j.apply(null, arguments);
}
function M(e, t) {
	if (e == null) return {};
	var n, r, i = N(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function N(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var ee = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.children, r = e.width, i = e.height, a = e.viewBox, o = e.className, s = e.style, c = e.title, l = e.desc, u = M(e, A), d = a || {
		width: r,
		height: i,
		x: 0,
		y: 0
	}, f = y("recharts-surface", o);
	return /*#__PURE__*/ S.createElement("svg", j({}, O(u), {
		className: f,
		width: r,
		height: i,
		style: s,
		viewBox: `${d.x} ${d.y} ${d.width} ${d.height}`,
		ref: t
	}), /*#__PURE__*/ S.createElement("title", null, c), /*#__PURE__*/ S.createElement("desc", null, l), n);
}), te = ["children", "className"];
function ne() {
	return ne = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ne.apply(null, arguments);
}
function re(e, t) {
	if (e == null) return {};
	var n, r, i = ie(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ie(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var ae = /*#__PURE__*/ S.forwardRef((e, t) => {
	var n = e.children, r = e.className, i = re(e, te), a = y("recharts-layer", r);
	return /*#__PURE__*/ S.createElement("g", ne({ className: a }, O(i), { ref: t }), n);
});
//#endregion
//#region node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function oe(e) {
	return e === "__proto__";
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
var se = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function ce(e) {
	switch (typeof e) {
		case "number":
		case "symbol": return !1;
		case "string": return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : se.test(e);
		default: return !1;
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function le(e) {
	return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function ue(e) {
	return typeof e == "symbol" || e instanceof Symbol;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toString.mjs
function de(e) {
	return e == null ? "" : fe(e);
}
function fe(e) {
	if (typeof e == "string") return e;
	if (Array.isArray(e)) return e.map(fe).join(",");
	if (ue(e)) return e.toString();
	let t = e + "";
	return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toPath.mjs
function pe(e) {
	if (Array.isArray(e)) return e.map(le);
	if (typeof e == "symbol") return [e];
	e = de(e);
	let t = [], n = e.length;
	if (n === 0) return t;
	let r = 0, i = "", a = "", o = !1, s = !1, c = /^-?\d+(?:\.\d+)?$/;
	for (e.charCodeAt(0) === 46 && t.push(""); r < n;) {
		let l = e[r];
		if (a) l === "\\" && r + 1 < n ? (r++, i += e[r]) : l === a ? a = "" : i += l;
		else if (o) {
			if (l === "\"" || l === "'") a = l, s = !0;
			else if (l === "]") {
				if (o = !1, !s && i.includes(".") && !c.test(i)) {
					let e = i.split(".");
					for (let n = 0; n < e.length; n++) e[n] !== "" && t.push(e[n]);
				} else t.push(i);
				i = "";
			} else i += l;
		} else if (l === "[") o = !0, s = !1, i &&= (t.push(i), "");
		else if (l === ".") {
			i &&= (t.push(i), "");
			let n = e[r + 1];
			(n === void 0 || n === ".") && t.push("");
		} else i += l;
		r++;
	}
	return i && t.push(i), t;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/get.mjs
function me(e, t, n) {
	if (e == null) return n;
	switch (typeof t) {
		case "string": {
			if (oe(t)) return n;
			let r = e[t];
			return r === void 0 ? ce(t) && !Object.hasOwn(e, t) ? me(e, pe(t), n) : n : r;
		}
		case "number":
		case "symbol": {
			typeof t == "number" && (t = le(t));
			let r = e[t];
			return r === void 0 ? n : r;
		}
		default: {
			if (Array.isArray(t)) return he(e, t, n);
			if (t = Object.is(t?.valueOf(), -0) ? "-0" : String(t), oe(t)) return n;
			let r = e[t];
			return r === void 0 ? n : r;
		}
	}
}
function he(e, t, n) {
	if (t.length === 0) return n;
	let r = e;
	for (let e = 0; e < t.length; e++) {
		if (r == null || oe(t[e])) return n;
		r = r[t[e]];
	}
	return r === void 0 ? n : r;
}
//#endregion
//#region node_modules/recharts/es6/util/round.js
var ge = 4;
function P(e) {
	var t = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ge), n = Math.round(e * t) / t;
	return Object.is(n, -0) ? 0 : n;
}
function F(e) {
	var t = [...arguments].slice(1);
	return e.reduce((e, n, r) => {
		var i = t[r - 1];
		return typeof i == "string" ? e + i + n : i === void 0 ? e + n : e + P(i) + n;
	}, "");
}
//#endregion
//#region node_modules/recharts/es6/util/DataUtils.js
var _e = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, ve = (e) => typeof e == "number" && e != +e, ye = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, I = (e) => (typeof e == "number" || e instanceof Number) && !ve(e), be = (e) => I(e) || typeof e == "string", xe = 0, Se = (e) => {
	var t = ++xe;
	return `${e || ""}${t}`;
}, Ce = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
	if (!I(e) && typeof e != "string") return n;
	var i;
	if (ye(e)) {
		if (t == null) return n;
		var a = e.indexOf("%");
		i = t * parseFloat(e.slice(0, a)) / 100;
	} else i = +e;
	return ve(i) && (i = n), r && t != null && i > t && (i = t), i;
}, we = (e) => {
	if (!Array.isArray(e)) return !1;
	for (var t = e.length, n = {}, r = 0; r < t; r++) if (!n[String(e[r])]) n[String(e[r])] = !0;
	else return !0;
	return !1;
};
function Te(e, t, n) {
	return I(e) && I(t) ? P(e + n * (t - e)) : t;
}
function Ee(e, t, n) {
	if (e && e.length) return e.find((e) => e && (typeof t == "function" ? t(e) : me(e, t)) === n);
}
var De = (e) => e == null, Oe = (e) => De(e) ? e : `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
function ke(e) {
	return e != null;
}
function Ae() {}
//#endregion
//#region node_modules/recharts/es6/cartesian/cartesianViewBoxToTrapezoid.js
function je(e) {
	if (e) return {
		x: e.x,
		y: e.y,
		upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
		lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
		width: e.width,
		height: e.height
	};
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getCartesianPosition.js
function Me(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ne(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Me(Object(n), !0).forEach(function(t) {
			Pe(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Me(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Pe(e, t, n) {
	return (t = Fe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Fe(e) {
	var t = Ie(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ie(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Le = (e) => {
	var t = e.viewBox, n = e.position, r = e.offset, i = r === void 0 ? 0 : r, a = e.parentViewBox, o = e.clamp, s = je(t), c = s.x, l = s.y, u = s.height, d = s.upperWidth, f = s.lowerWidth, p = c, m = c + (d - f) / 2, h = (p + m) / 2, g = (d + f) / 2, _ = p + d / 2, v = u >= 0 ? 1 : -1, y = v * i, b = v > 0 ? "end" : "start", x = v > 0 ? "start" : "end", S = d >= 0 ? 1 : -1, C = S * i, w = S > 0 ? "end" : "start", T = S > 0 ? "start" : "end", E = a;
	if (n === "top") {
		var D = {
			x: p + d / 2,
			y: l - y,
			horizontalAnchor: "middle",
			verticalAnchor: b
		};
		return o && E && (D.height = Math.max(l - E.y, 0), D.width = d), D;
	}
	if (n === "bottom") {
		var O = {
			x: m + f / 2,
			y: l + u + y,
			horizontalAnchor: "middle",
			verticalAnchor: x
		};
		return o && E && (O.height = Math.max(E.y + E.height - (l + u), 0), O.width = f), O;
	}
	if (n === "left") {
		var k = {
			x: h - C,
			y: l + u / 2,
			horizontalAnchor: w,
			verticalAnchor: "middle"
		};
		return o && E && (k.width = Math.max(k.x - E.x, 0), k.height = u), k;
	}
	if (n === "right") {
		var A = {
			x: h + g + C,
			y: l + u / 2,
			horizontalAnchor: T,
			verticalAnchor: "middle"
		};
		return o && E && (A.width = Math.max(E.x + E.width - A.x, 0), A.height = u), A;
	}
	var j = o && E ? {
		width: g,
		height: u
	} : {};
	return n === "insideLeft" ? Ne({
		x: h + C,
		y: l + u / 2,
		horizontalAnchor: T,
		verticalAnchor: "middle"
	}, j) : n === "insideRight" ? Ne({
		x: h + g - C,
		y: l + u / 2,
		horizontalAnchor: w,
		verticalAnchor: "middle"
	}, j) : n === "insideTop" ? Ne({
		x: p + d / 2,
		y: l + y,
		horizontalAnchor: "middle",
		verticalAnchor: x
	}, j) : n === "insideBottom" ? Ne({
		x: m + f / 2,
		y: l + u - y,
		horizontalAnchor: "middle",
		verticalAnchor: b
	}, j) : n === "insideTopLeft" ? Ne({
		x: p + C,
		y: l + y,
		horizontalAnchor: T,
		verticalAnchor: x
	}, j) : n === "insideTopRight" ? Ne({
		x: p + d - C,
		y: l + y,
		horizontalAnchor: w,
		verticalAnchor: x
	}, j) : n === "insideBottomLeft" ? Ne({
		x: m + C,
		y: l + u - y,
		horizontalAnchor: T,
		verticalAnchor: b
	}, j) : n === "insideBottomRight" ? Ne({
		x: m + f - C,
		y: l + u - y,
		horizontalAnchor: w,
		verticalAnchor: b
	}, j) : n && typeof n == "object" && (I(n.x) || ye(n.x)) && (I(n.y) || ye(n.y)) ? Ne({
		x: c + Ce(n.x, g),
		y: l + Ce(n.y, u),
		horizontalAnchor: "end",
		verticalAnchor: "end"
	}, j) : Ne({
		x: _,
		y: l + u / 2,
		horizontalAnchor: "middle",
		verticalAnchor: "middle"
	}, j);
}, Re = [
	"top",
	"left",
	"right",
	"bottom"
];
function ze(e) {
	return e == null ? !1 : typeof e == "object" || Re.includes(e);
}
//#endregion
//#region node_modules/recharts/es6/context/legendPortalContext.js
var Be = /*#__PURE__*/ (0, S.createContext)(null), Ve = () => (0, S.useContext)(Be);
//#endregion
//#region node_modules/d3-shape/src/constant.js
function L(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-shape/src/math.js
var He = Math.cos, Ue = Math.sin, We = Math.sqrt, Ge = Math.PI;
Ge / 2;
var Ke = 2 * Ge, qe = Math.PI, Je = 2 * qe, Ye = 1e-6, Xe = Je - Ye;
function Ze(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function Qe(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return Ze;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var $e = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ze : Qe(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > Ye) {
			if (!(Math.abs(u * s - c * l) > Ye) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
			else {
				let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((qe - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
				Math.abs(y - 1) > Ye && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
			}
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Ye || Math.abs(this._y1 - l) > Ye) && this._append`L${c},${l}`, n && (d < 0 && (d = d % Je + Je), d > Xe ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > Ye && this._append`A${n},${n},0,${+(d >= qe)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
$e.prototype;
//#endregion
//#region node_modules/d3-shape/src/path.js
function et(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new $e(t);
}
Array.prototype.slice;
function tt(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/linear.js
function nt(e) {
	this._context = e;
}
nt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._context.lineTo(e, t);
		}
	}
};
function rt(e) {
	return new nt(e);
}
//#endregion
//#region node_modules/d3-shape/src/point.js
function it(e) {
	return e[0];
}
function at(e) {
	return e[1];
}
//#endregion
//#region node_modules/d3-shape/src/line.js
function ot(e, t) {
	var n = L(!0), r = null, i = rt, a = null, o = et(s);
	e = typeof e == "function" ? e : e === void 0 ? it : L(e), t = typeof t == "function" ? t : t === void 0 ? at : L(t);
	function s(s) {
		var c, l = (s = tt(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : L(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : L(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : L(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
//#endregion
//#region node_modules/d3-shape/src/area.js
function st(e, t, n) {
	var r = null, i = L(!0), a = null, o = rt, s = null, c = et(l);
	e = typeof e == "function" ? e : e === void 0 ? it : L(+e), t = typeof t == "function" ? t : L(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? at : L(+n);
	function l(l) {
		var u, d, f, p = (l = tt(l)).length, m, h = !1, g, _ = Array(p), v = Array(p);
		for (a ?? (s = o(g = c())), u = 0; u <= p; ++u) {
			if (!(u < p && i(m = l[u], u, l)) === h) {
				if (h = !h) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
					s.lineEnd(), s.areaEnd();
				}
			}
			h && (_[u] = +e(m, u, l), v[u] = +t(m, u, l), s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
		}
		if (g) return s = null, g + "" || null;
	}
	function u() {
		return ot().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : L(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : L(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : L(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : L(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : L(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : L(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : L(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
//#endregion
//#region node_modules/d3-shape/src/curve/bump.js
var ct = class {
	constructor(e, t) {
		this._context = e, this._x = t;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	}
	point(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
		}
		this._x0 = e, this._y0 = t;
	}
};
function lt(e) {
	return new ct(e, !0);
}
function ut(e) {
	return new ct(e, !1);
}
//#endregion
//#region node_modules/d3-shape/src/symbol/circle.js
var dt = { draw(e, t) {
	let n = We(t / Ge);
	e.moveTo(n, 0), e.arc(0, 0, n, 0, Ke);
} }, ft = { draw(e, t) {
	let n = We(t / 5) / 2;
	e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
} }, pt = We(1 / 3), mt = pt * 2, ht = { draw(e, t) {
	let n = We(t / mt), r = n * pt;
	e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
} }, gt = { draw(e, t) {
	let n = We(t), r = -n / 2;
	e.rect(r, r, n, n);
} }, _t = .8908130915292852, vt = Ue(Ge / 10) / Ue(7 * Ge / 10), yt = Ue(Ke / 10) * vt, bt = -He(Ke / 10) * vt, xt = { draw(e, t) {
	let n = We(t * _t), r = yt * n, i = bt * n;
	e.moveTo(0, -n), e.lineTo(r, i);
	for (let t = 1; t < 5; ++t) {
		let a = Ke * t / 5, o = He(a), s = Ue(a);
		e.lineTo(s * n, -o * n), e.lineTo(o * r - s * i, s * r + o * i);
	}
	e.closePath();
} }, St = We(3), Ct = { draw(e, t) {
	let n = -We(t / (St * 3));
	e.moveTo(0, n * 2), e.lineTo(-St * n, -n), e.lineTo(St * n, -n), e.closePath();
} }, wt = -.5, Tt = We(3) / 2, Et = 1 / We(12), Dt = (Et / 2 + 1) * 3, Ot = { draw(e, t) {
	let n = We(t / Dt), r = n / 2, i = n * Et, a = r, o = n * Et + n, s = -a, c = o;
	e.moveTo(r, i), e.lineTo(a, o), e.lineTo(s, c), e.lineTo(wt * r - Tt * i, Tt * r + wt * i), e.lineTo(wt * a - Tt * o, Tt * a + wt * o), e.lineTo(wt * s - Tt * c, Tt * s + wt * c), e.lineTo(wt * r + Tt * i, wt * i - Tt * r), e.lineTo(wt * a + Tt * o, wt * o - Tt * a), e.lineTo(wt * s + Tt * c, wt * c - Tt * s), e.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol.js
function kt(e, t) {
	let n = null, r = et(i);
	e = typeof e == "function" ? e : L(e || dt), t = typeof t == "function" ? t : L(t === void 0 ? 64 : +t);
	function i() {
		let i;
		if (n ||= i = r(), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i) return n = null, i + "" || null;
	}
	return i.type = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : L(t), i) : e;
	}, i.size = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : L(+e), i) : t;
	}, i.context = function(e) {
		return arguments.length ? (n = e ?? null, i) : n;
	}, i;
}
//#endregion
//#region node_modules/d3-shape/src/noop.js
function At() {}
//#endregion
//#region node_modules/d3-shape/src/curve/basis.js
function jt(e, t, n) {
	e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
}
function Mt(e) {
	this._context = e;
}
Mt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: jt(this, this._x1, this._y1);
			case 2: this._context.lineTo(this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default: jt(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Nt(e) {
	return new Mt(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/basisClosed.js
function Pt(e) {
	this._context = e;
}
Pt.prototype = {
	areaStart: At,
	areaEnd: At,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
				break;
			case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x2 = e, this._y2 = t;
				break;
			case 1:
				this._point = 2, this._x3 = e, this._y3 = t;
				break;
			case 2:
				this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default: jt(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Ft(e) {
	return new Pt(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/basisOpen.js
function It(e) {
	this._context = e;
}
It.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
				break;
			case 3: this._point = 4;
			default: jt(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Lt(e) {
	return new It(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/linearClosed.js
function Rt(e) {
	this._context = e;
}
Rt.prototype = {
	areaStart: At,
	areaEnd: At,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._point && this._context.closePath();
	},
	point: function(e, t) {
		e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
	}
};
function zt(e) {
	return new Rt(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/monotone.js
function Bt(e) {
	return e < 0 ? -1 : 1;
}
function Vt(e, t, n) {
	var r = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (r || i < 0 && -0), o = (n - e._y1) / (i || r < 0 && -0), s = (a * i + o * r) / (r + i);
	return (Bt(a) + Bt(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(s)) || 0;
}
function Ht(e, t) {
	var n = e._x1 - e._x0;
	return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function Ut(e, t, n) {
	var r = e._x0, i = e._y0, a = e._x1, o = e._y1, s = (a - r) / 3;
	e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function Wt(e) {
	this._context = e;
}
Wt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3: Ut(this, this._t0, Ht(this, this._t0));
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		var n = NaN;
		if (e = +e, t = +t, e !== this._x1 || t !== this._y1) {
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, Ut(this, Ht(this, n = Vt(this, e, t)), n);
					break;
				default: Ut(this, this._t0, n = Vt(this, e, t));
			}
			this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
		}
	}
};
function Gt(e) {
	this._context = new Kt(e);
}
(Gt.prototype = Object.create(Wt.prototype)).point = function(e, t) {
	Wt.prototype.point.call(this, t, e);
};
function Kt(e) {
	this._context = e;
}
Kt.prototype = {
	moveTo: function(e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function(e, t, n, r, i, a) {
		this._context.bezierCurveTo(t, e, r, n, a, i);
	}
};
function R(e) {
	return new Wt(e);
}
function qt(e) {
	return new Gt(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/natural.js
function Jt(e) {
	this._context = e;
}
Jt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [], this._y = [];
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length;
		if (n) {
			if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2) this._context.lineTo(e[1], t[1]);
			else for (var r = Yt(e), i = Yt(t), a = 0, o = 1; o < n; ++a, ++o) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
		}
		(this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
function Yt(e) {
	var t, n = e.length - 1, r, i = Array(n), a = Array(n), o = Array(n);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
	for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = i[t] / a[t - 1], a[t] -= r, o[t] -= r * o[t - 1];
	for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function Xt(e) {
	return new Jt(e);
}
//#endregion
//#region node_modules/d3-shape/src/curve/step.js
function Zt(e, t) {
	this._context = e, this._t = t;
}
Zt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN, this._point = 0;
	},
	lineEnd: function() {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
			else {
				var n = this._x * (1 - this._t) + e * this._t;
				this._context.lineTo(n, this._y), this._context.lineTo(n, t);
			}
		}
		this._x = e, this._y = t;
	}
};
function Qt(e) {
	return new Zt(e, .5);
}
function $t(e) {
	return new Zt(e, 0);
}
function en(e) {
	return new Zt(e, 1);
}
//#endregion
//#region node_modules/d3-shape/src/offset/none.js
function tn(e, t) {
	if ((o = e.length) > 1) for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n) for (i = a, a = e[t[n]], r = 0; r < s; ++r) a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
//#endregion
//#region node_modules/d3-shape/src/order/none.js
function nn(e) {
	for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
	return n;
}
//#endregion
//#region node_modules/d3-shape/src/stack.js
function rn(e, t) {
	return e[t];
}
function an(e) {
	let t = [];
	return t.key = e, t;
}
function on() {
	var e = L([]), t = nn, n = tn, r = rn;
	function i(i) {
		var a = Array.from(e.apply(this, arguments), an), o, s = a.length, c = -1, l;
		for (let e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
		for (o = 0, l = tt(t(a)); o < s; ++o) a[l[o]].index = o;
		return n(a, l), a;
	}
	return i.keys = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : L(Array.from(t)), i) : e;
	}, i.value = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : L(+e), i) : r;
	}, i.order = function(e) {
		return arguments.length ? (t = e == null ? nn : typeof e == "function" ? e : L(Array.from(e)), i) : t;
	}, i.offset = function(e) {
		return arguments.length ? (n = e ?? tn, i) : n;
	}, i;
}
//#endregion
//#region node_modules/d3-shape/src/offset/expand.js
function sn(e, t) {
	if ((r = e.length) > 0) {
		for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
			if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
		}
		tn(e, t);
	}
}
//#endregion
//#region node_modules/d3-shape/src/offset/silhouette.js
function cn(e, t) {
	if ((i = e.length) > 0) {
		for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
			for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
			r[n][1] += r[n][0] = -s / 2;
		}
		tn(e, t);
	}
}
//#endregion
//#region node_modules/d3-shape/src/offset/wiggle.js
function ln(e, t) {
	if ((o = e.length) > 0 && (a = (i = e[t[0]]).length) > 0) {
		for (var n = 0, r = 1, i, a, o; r < a; ++r) {
			for (var s = 0, c = 0, l = 0; s < o; ++s) {
				for (var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0; p < s; ++p) {
					var m = e[t[p]], h = m[r][1] || 0, g = m[r - 1][1] || 0;
					f += h - g;
				}
				c += d, l += f * d;
			}
			i[r - 1][1] += i[r - 1][0] = n, c && (n -= l / c);
		}
		i[r - 1][1] += i[r - 1][0] = n, tn(e, t);
	}
}
//#endregion
//#region node_modules/recharts/es6/shape/Symbols.js
var un = [
	"type",
	"size",
	"sizeType"
];
function dn() {
	return dn = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dn.apply(null, arguments);
}
function fn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fn(Object(n), !0).forEach(function(t) {
			mn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function mn(e, t, n) {
	return (t = hn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hn(e) {
	var t = gn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _n(e, t) {
	if (e == null) return {};
	var n, r, i = vn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function vn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var yn = {
	symbolCircle: dt,
	symbolCross: ft,
	symbolDiamond: ht,
	symbolSquare: gt,
	symbolStar: xt,
	symbolTriangle: Ct,
	symbolWye: Ot
}, bn = Math.PI / 180, xn = (e) => yn[`symbol${Oe(e)}`] || dt, Sn = (e, t, n) => {
	if (t === "area") return e;
	switch (n) {
		case "cross": return 5 * e * e / 9;
		case "diamond": return .5 * e * e / Math.sqrt(3);
		case "square": return e * e;
		case "star":
			var r = 18 * bn;
			return 1.25 * e * e * (Math.tan(r) - Math.tan(r * 2) * Math.tan(r) ** 2);
		case "triangle": return Math.sqrt(3) * e * e / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * e * e / 8;
		default: return Math.PI * e * e / 4;
	}
}, Cn = (e, t) => {
	yn[`symbol${Oe(e)}`] = t;
}, wn = (e) => {
	var t = e.type, n = t === void 0 ? "circle" : t, r = e.size, i = r === void 0 ? 64 : r, a = e.sizeType, o = a === void 0 ? "area" : a, s = pn(pn({}, _n(e, un)), {}, {
		type: n,
		size: i,
		sizeType: o
	}), c = "circle";
	typeof n == "string" && (c = n);
	var l = () => {
		var e = xn(c), t = kt().type(e).size(Sn(i, o, c))();
		if (t !== null) return t;
	}, u = s.className, d = s.cx, f = s.cy, p = O(s);
	return I(d) && I(f) && I(i) ? /*#__PURE__*/ S.createElement("path", dn({}, p, {
		className: y("recharts-symbols", u),
		transform: `translate(${d}, ${f})`,
		d: l()
	})) : null;
};
wn.registerSymbol = Cn;
//#endregion
//#region node_modules/recharts/es6/util/types.js
var Tn = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, En = (e, t) => {
	if (!e || typeof e == "function" || typeof e == "boolean") return null;
	var n = e;
	if (/*#__PURE__*/ (0, S.isValidElement)(e) && (n = e.props), typeof n != "object" && typeof n != "function") return null;
	var r = {};
	return Object.keys(n).forEach((e) => {
		x(e) && typeof n[e] == "function" && (r[e] = t || ((t) => n[e](n, t)));
	}), r;
}, Dn = (e, t, n) => (r) => (e(t, n, r), null), On = (e, t, n) => {
	if (e === null || typeof e != "object" && typeof e != "function") return null;
	var r = null;
	return Object.keys(e).forEach((i) => {
		var a = e[i];
		x(i) && typeof a == "function" && (r ||= {}, r[i] = Dn(a, t, n));
	}), r;
};
//#endregion
//#region node_modules/recharts/es6/util/resolveDefaultProps.js
function kn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function An(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? kn(Object(n), !0).forEach(function(t) {
			jn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function jn(e, t, n) {
	return (t = Mn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Mn(e) {
	var t = Nn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Nn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Pn(e, t) {
	var n = An({}, e), r = t;
	return Object.keys(t).reduce((e, t) => (e[t] === void 0 && r[t] !== void 0 && (e[t] = r[t]), e), n);
}
//#endregion
//#region node_modules/recharts/es6/component/DefaultLegendContent.js
function Fn() {
	return Fn = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Fn.apply(null, arguments);
}
function In(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ln(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? In(Object(n), !0).forEach(function(t) {
			Rn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : In(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Rn(e, t, n) {
	return (t = zn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zn(e) {
	var t = Bn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Bn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Vn = 32, Hn = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	layout: "horizontal",
	verticalAlign: "middle",
	labelStyle: {}
};
function Un(e) {
	if (typeof e == "object" && e && "strokeDasharray" in e) return String(e.strokeDasharray);
}
function Wn(e) {
	var t = e.data, n = e.iconType, r = e.inactiveColor, i = Vn / 2, a = Vn / 6, o = Vn / 3, s = t.inactive ? r : t.color, c = n ?? t.type;
	if (c === "none") return null;
	if (c === "plainline") return /*#__PURE__*/ S.createElement("line", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		strokeDasharray: Un(t.payload),
		x1: 0,
		y1: i,
		x2: Vn,
		y2: i,
		className: "recharts-legend-icon"
	});
	if (c === "line") return /*#__PURE__*/ S.createElement("path", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		d: `M0,${i}h${o}
            A${a},${a},0,1,1,${2 * o},${i}
            H${Vn}M${2 * o},${i}
            A${a},${a},0,1,1,${o},${i}`,
		className: "recharts-legend-icon"
	});
	if (c === "rect") return /*#__PURE__*/ S.createElement("path", {
		stroke: "none",
		fill: s,
		d: `M0,${Vn / 8}h${Vn}v${Vn * 3 / 4}h${-Vn}z`,
		className: "recharts-legend-icon"
	});
	if (/*#__PURE__*/ S.isValidElement(t.legendIcon)) {
		var l = Ln({}, t);
		return delete l.legendIcon, /*#__PURE__*/ S.cloneElement(t.legendIcon, l);
	}
	return /*#__PURE__*/ S.createElement(wn, {
		fill: s,
		cx: i,
		cy: i,
		size: Vn,
		sizeType: "diameter",
		type: c
	});
}
function Gn(e) {
	var t = e.payload, n = e.iconSize, r = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, s = e.labelStyle, c = {
		x: 0,
		y: 0,
		width: Vn,
		height: Vn
	}, l = {
		display: r === "horizontal" ? "inline-block" : "block",
		marginRight: 10,
		whiteSpace: "nowrap"
	}, u = {
		display: "inline-block",
		verticalAlign: "middle",
		marginRight: 4
	};
	return t.map((t, r) => {
		var d = t.formatter || i, f = y({
			"recharts-legend-item": !0,
			[`legend-item-${r}`]: !0,
			inactive: t.inactive
		});
		if (t.type === "none") return null;
		var p = typeof s == "object" ? Ln({}, s) : {};
		p.color = t.inactive ? a : p.color || t.color, p.whiteSpace ??= "normal", p.overflowWrap ??= "break-word";
		var m = d ? d(t.value, t, r) : t.value;
		return /*#__PURE__*/ S.createElement("li", Fn({
			className: f,
			style: l,
			key: `legend-item-${r}`
		}, On(e, t, r)), /*#__PURE__*/ S.createElement(ee, {
			width: n,
			height: n,
			viewBox: c,
			style: u,
			"aria-label": t.value == null ? "legend icon" : `${t.value} legend icon`
		}, /*#__PURE__*/ S.createElement(Wn, {
			data: t,
			iconType: o,
			inactiveColor: a
		})), /*#__PURE__*/ S.createElement("span", {
			className: "recharts-legend-item-text",
			style: p
		}, m));
	});
}
var Kn = (e) => {
	var t = Pn(e, Hn), n = t.payload, r = t.layout, i = t.align;
	if (!n || !n.length) return null;
	var a = {
		padding: 0,
		margin: 0,
		textAlign: r === "horizontal" ? i : "left"
	};
	return /*#__PURE__*/ S.createElement("ul", {
		className: "recharts-default-legend",
		style: a
	}, /*#__PURE__*/ S.createElement(Gn, Fn({}, t, { payload: n })));
};
//#endregion
//#region node_modules/es-toolkit/dist/array/uniqBy.mjs
function qn(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = t(i, r, e);
		n.has(a) || n.set(a, i);
	}
	return Array.from(n.values());
}
//#endregion
//#region node_modules/es-toolkit/dist/function/ary.mjs
function Jn(e, t) {
	return function(...n) {
		return e.apply(this, n.slice(0, t));
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/function/identity.mjs
function Yn(e) {
	return e;
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isLength.mjs
function Xn(e) {
	return Number.isSafeInteger(e) && e >= 0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function Zn(e) {
	return e != null && typeof e != "function" && Xn(e.length);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/property.mjs
function Qn(e) {
	return function(t) {
		return me(t, e);
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function $n(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function er(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function tr(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function nr(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var rr = "[object RegExp]", ir = "[object String]", ar = "[object Number]", or = "[object Boolean]", sr = "[object Arguments]", cr = "[object Symbol]", lr = "[object Date]", ur = "[object Map]", dr = "[object Set]", fr = "[object Array]", pr = "[object Function]", mr = "[object ArrayBuffer]", hr = "[object Object]", gr = "[object Error]", _r = "[object DataView]", vr = "[object Uint8Array]", yr = "[object Uint8ClampedArray]", br = "[object Uint16Array]", xr = "[object Uint32Array]", Sr = "[object BigUint64Array]", Cr = "[object Int8Array]", wr = "[object Int16Array]", Tr = "[object Int32Array]", Er = "[object BigInt64Array]", Dr = "[object Float32Array]", Or = "[object Float64Array]", kr = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || (function() {
	return this;
})();
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function Ar(e) {
	return kr.Buffer !== void 0 && kr.Buffer.isBuffer(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function jr(e, t) {
	return Mr(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Mr(e, t, n, r = /* @__PURE__ */ new Map(), i = void 0) {
	let a = i?.(e, t, n, r);
	if (a !== void 0) return a;
	if ($n(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Mr(e[a], a, n, r, i);
		return Object.hasOwn(e, "index") && (t.index = e.index), Object.hasOwn(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		r.set(e, t);
		for (let [a, o] of e) t.set(a, Mr(o, a, n, r, i));
		return t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		r.set(e, t);
		for (let a of e) t.add(Mr(a, void 0, n, r, i));
		return t;
	}
	if (Ar(e)) return e.subarray();
	if (er(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Mr(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (typeof Blob < "u" && e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (e instanceof Error) {
		let t = structuredClone(e);
		return r.set(e, t), t.message = e.message, t.name = e.name, t.stack = e.stack, t.cause = e.cause, t.constructor = e.constructor, Nr(t, e, n, r, i), t;
	}
	if (e instanceof Boolean) {
		let t = new Boolean(e.valueOf());
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (e instanceof Number) {
		let t = new Number(e.valueOf());
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (e instanceof String) {
		let t = new String(e.valueOf());
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	if (typeof e == "object" && Pr(e)) {
		let t = Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), Nr(t, e, n, r, i), t;
	}
	return e;
}
function Nr(e, t, n = e, r, i) {
	let a = [...Object.keys(t), ...tr(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = Mr(t[s], s, n, r, i));
	}
}
function Pr(e) {
	switch (nr(e)) {
		case sr:
		case fr:
		case mr:
		case _r:
		case or:
		case lr:
		case Dr:
		case Or:
		case Cr:
		case wr:
		case Tr:
		case ur:
		case ar:
		case hr:
		case rr:
		case dr:
		case ir:
		case cr:
		case vr:
		case yr:
		case br:
		case xr: return !0;
		default: return !1;
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/object/cloneDeep.mjs
function Fr(e) {
	return Mr(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/eq.mjs
function Ir(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isObject.mjs
function Lr(e) {
	return e !== null && (typeof e == "object" || typeof e == "function");
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isMatchWith.mjs
function Rr(e, t, n) {
	return typeof n == "function" ? zr(e, t, function e(t, r, i, a, o, s) {
		let c = n(t, r, i, a, o, s);
		return c === void 0 ? zr(t, r, e, s, !1) : !!c;
	}, /* @__PURE__ */ new Map(), !0) : Rr(e, t, () => void 0);
}
function zr(e, t, n, r, i = !1) {
	if (t === e) return !0;
	switch (typeof t) {
		case "object": return Br(e, t, n, r, i);
		case "function": return Object.keys(t).length > 0 ? zr(e, { ...t }, n, r, i) : Ir(e, t);
		default: return Lr(e) && i ? typeof t != "string" || t === "" : Ir(e, t);
	}
}
function Br(e, t, n, r, i = !1) {
	if (t == null) return !0;
	if (Array.isArray(t)) return Hr(e, t, n, r);
	if (t instanceof Map) return Vr(e, t, n, r);
	if (t instanceof Set) return Ur(e, t, n, r);
	let a = Object.keys(t);
	if (e == null) return i && a.length === 0;
	if (i) $n(e) && (e = Object(e));
	else {
		let t = nr(e);
		if (t !== "[object Object]" && t !== "[object Arguments]") return !1;
	}
	if (a.length === 0) return !0;
	if (r?.has(t)) return r.get(t) === e;
	r?.set(t, e);
	try {
		for (let i = 0; i < a.length; i++) {
			let o = a[i];
			if (!(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !n(e[o], t[o], o, e, t, r)) return !1;
		}
		return !0;
	} finally {
		r?.delete(t);
	}
}
function Vr(e, t, n, r) {
	if (t.size === 0) return !0;
	if (!(e instanceof Map)) return !1;
	for (let [i, a] of t.entries()) if (n(e.get(i), a, i, e, t, r) === !1) return !1;
	return !0;
}
function Hr(e, t, n, r) {
	if (t.length === 0) return !0;
	if (!Array.isArray(e)) return !1;
	let i = /* @__PURE__ */ new Set();
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = !1;
		for (let c = 0; c < e.length; c++) {
			if (i.has(c)) continue;
			let l = e[c], u = !1;
			if (n(l, o, a, e, t, r) && (u = !0), u) {
				i.add(c), s = !0;
				break;
			}
		}
		if (!s) return !1;
	}
	return !0;
}
function Ur(e, t, n, r) {
	return t.size === 0 || e instanceof Set && Hr([...e], [...t], n, r);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isMatch.mjs
function Wr(e, t) {
	return Rr(e, t, () => void 0);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/matches.mjs
function Gr(e) {
	return e = Fr(e), (t) => Wr(t, e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function Kr(e, t) {
	return jr(e, (n, r, i, a) => {
		let o = t?.(n, r, i, a);
		if (o !== void 0) return o;
		if (typeof e == "object") {
			if (nr(e) === "[object Object]" && typeof e.constructor != "function") {
				let t = {};
				return a.set(e, t), Nr(t, e, i, a), t;
			}
			switch (Object.prototype.toString.call(e)) {
				case ar:
				case ir:
				case or: {
					let t = new e.constructor(e?.valueOf());
					return Nr(t, e), t;
				}
				case sr: {
					let t = {};
					return Nr(t, e), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
				}
				default: return;
			}
		}
	});
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function qr(e) {
	return Kr(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isIndex.mjs
var Jr = /^(?:0|[1-9]\d*)$/;
function Yr(e, t = 2 ** 53 - 1) {
	switch (typeof e) {
		case "number": return Number.isInteger(e) && e >= 0 && e < t;
		case "symbol": return !1;
		case "string": return Jr.test(e);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function Xr(e) {
	return typeof e == "object" && !!e && nr(e) === "[object Arguments]";
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/has.mjs
function Zr(e, t) {
	let n;
	if (n = Array.isArray(t) ? t : typeof t == "string" && ce(t) && !(t in Object(e)) ? pe(t) : [t], n.length === 0) return !1;
	let r = e;
	for (let e = 0; e < n.length; e++) {
		let t = le(n[e]);
		if ((r == null || !Object.hasOwn(r, t)) && !((Array.isArray(r) || Xr(r)) && Yr(t) && Number(t) < r.length)) return !1;
		r = r[t];
	}
	return !0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/matchesProperty.mjs
function Qr(e, t) {
	switch (typeof e) {
		case "object":
			Object.is(e?.valueOf(), -0) && (e = "-0");
			break;
		case "number": e = le(e);
	}
	return t = qr(t), function(n) {
		let r = me(n, e);
		return r === void 0 ? Zr(n, e) : t === void 0 ? r === void 0 : Wr(r, t);
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/iteratee.mjs
function $r(e) {
	if (e == null) return Yn;
	switch (typeof e) {
		case "function": return e;
		case "object": return Array.isArray(e) && e.length === 2 ? Qr(e[0], e[1]) : Gr(e);
		default: return Qn(e);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/normalizeZero.mjs
function ei(e) {
	return e === 0 ? 0 : e;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/uniqBy.mjs
function ti(e, t = Yn) {
	return Zn(e) ? qn(Array.from(e), Jn($r(t), 1)).map(ei) : [];
}
//#endregion
//#region node_modules/recharts/es6/util/payload/getUniqPayload.js
function ni(e, t, n) {
	return t === !0 ? ti(e, n) : typeof t == "function" ? ti(e, t) : e;
}
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var ri = /* @__PURE__ */ o(((e) => {
	var t = p();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), ii = /* @__PURE__ */ o(((e, t) => {
	t.exports = ri();
})), ai = /* @__PURE__ */ o(((e) => {
	var t = p(), n = ii();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useSyncExternalStore, o = t.useRef, s = t.useEffect, c = t.useMemo, l = t.useDebugValue;
	e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
		var d = o(null);
		if (d.current === null) {
			var f = {
				hasValue: !1,
				value: null
			};
			d.current = f;
		} else f = d.current;
		d = c(function() {
			function e(e) {
				if (!a) {
					if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
						var t = f.value;
						if (u(t, e)) return s = t;
					}
					return s = e;
				}
				if (t = s, i(o, e)) return t;
				var n = r(e);
				return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
			}
			var a = !1, o, s, c = n === void 0 ? null : n;
			return [function() {
				return e(t());
			}, c === null ? void 0 : function() {
				return e(c());
			}];
		}, [
			t,
			n,
			r,
			u
		]);
		var p = a(e, d[0], d[1]);
		return s(function() {
			f.hasValue = !0, f.value = p;
		}, [p]), l(p), p;
	};
})), oi = /* @__PURE__ */ o(((e, t) => {
	t.exports = ai();
})), si = /*#__PURE__*/ (0, S.createContext)(null), ci = oi(), li = (e) => e, ui = () => {
	var e = (0, S.useContext)(si);
	return e ? e.store.dispatch : li;
}, di = () => {}, fi = () => di, pi = (e, t) => e === t;
function z(e) {
	var t = (0, S.useContext)(si), n = (0, S.useMemo)(() => t ? (t) => {
		if (t != null) return e(t);
	} : di, [t, e]);
	return (0, ci.useSyncExternalStoreWithSelector)(t ? t.subscription.addNestedSub : fi, t ? t.store.getState : di, t ? t.store.getState : di, n, pi);
}
//#endregion
//#region node_modules/reselect/dist/reselect.mjs
function mi(e, t = `expected a function, instead received ${typeof e}`) {
	if (typeof e != "function") throw TypeError(t);
}
function hi(e, t = "expected all items to be functions, instead received the following types: ") {
	if (!e.every((e) => typeof e == "function")) {
		let n = e.map((e) => typeof e == "function" ? `function ${e.name || "unnamed"}()` : typeof e).join(", ");
		throw TypeError(`${t}[${n}]`);
	}
}
var gi = (e) => Array.isArray(e) ? e : [e];
function _i(e) {
	let t = Array.isArray(e[0]) ? e[0] : e;
	return hi(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function vi(e, t) {
	let n = [], { length: r } = e;
	for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
	return n;
}
var yi = class {
	constructor(e) {
		this.value = e;
	}
	deref() {
		return this.value;
	}
}, bi = typeof WeakRef > "u" ? yi : WeakRef, xi = 0, Si = 1;
function Ci() {
	return {
		s: xi,
		v: void 0,
		o: null,
		p: null
	};
}
function wi(e) {
	return e instanceof bi ? e.deref() : e;
}
function Ti(e, t = {}) {
	let n = Ci(), { resultEqualityCheck: r } = t, i, a = 0;
	function o() {
		let t = n, { length: o } = arguments;
		for (let e = 0, n = o; e < n; e++) {
			let n = arguments[e];
			if (typeof n == "function" || typeof n == "object" && n) {
				let e = t.o;
				e === null && (t.o = e = /* @__PURE__ */ new WeakMap());
				let r = e.get(n);
				r === void 0 ? (t = Ci(), e.set(n, t)) : t = r;
			} else {
				let e = t.p;
				e === null && (t.p = e = /* @__PURE__ */ new Map());
				let r = e.get(n);
				r === void 0 ? (t = Ci(), e.set(n, t)) : t = r;
			}
		}
		let s = t, c;
		if (t.s === Si) c = t.v;
		else if (c = e.apply(null, arguments), a++, r) {
			let e = wi(i);
			e != null && r(e, c) && (c = e, a !== 0 && a--), i = typeof c == "object" && c || typeof c == "function" ? /* @__PURE__ */ new bi(c) : c;
		}
		return s.s = Si, s.v = c, c;
	}
	return o.clearCache = () => {
		n = Ci(), o.resetResultsCount();
	}, o.resultsCount = () => a, o.resetResultsCount = () => {
		a = 0;
	}, o;
}
function Ei(e, ...t) {
	let n = typeof e == "function" ? {
		memoize: e,
		memoizeOptions: t
	} : e, r = (...e) => {
		let t = 0, r = 0, i, a = {}, o = e.pop();
		typeof o == "object" && (a = o, o = e.pop()), mi(o, `createSelector expects an output function after the inputs, but received: [${typeof o}]`);
		let { memoize: s, memoizeOptions: c = [], argsMemoize: l = Ti, argsMemoizeOptions: u = [] } = {
			...n,
			...a
		}, d = gi(c), f = gi(u), p = _i(e), m = s(function() {
			return t++, o.apply(null, arguments);
		}, ...d), h = l(function() {
			r++;
			let e = vi(p, arguments);
			return i = m.apply(null, e), i;
		}, ...f);
		return Object.assign(h, {
			resultFunc: o,
			memoizedResultFunc: m,
			dependencies: p,
			dependencyRecomputations: () => r,
			resetDependencyRecomputations: () => {
				r = 0;
			},
			lastResult: () => i,
			recomputations: () => t,
			resetRecomputations: () => {
				t = 0;
			},
			memoize: s,
			argsMemoize: l
		});
	};
	return Object.assign(r, { withTypes: () => r }), r;
}
var B = /* @__PURE__ */ Ei(Ti);
//#endregion
//#region node_modules/es-toolkit/dist/array/flatten.mjs
function Di(e, t = 1) {
	let n = [], r = Math.floor(t), i = (e, t) => {
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			Array.isArray(o) && t < r ? i(o, t + 1) : n.push(o);
		}
	};
	return i(e, 0), n;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isIterateeCall.mjs
function Oi(e, t, n) {
	return Lr(n) && (typeof t == "number" && Zn(n) && Yr(t) && t < n.length || typeof t == "string" && t in n) ? Ir(n[t], e) : !1;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/compareValues.mjs
function ki(e) {
	return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e === e ? 0 : 4;
}
var Ai = (e, t, n) => {
	if (e !== t) {
		let r = ki(e), i = ki(t);
		if (r === i && r === 0) {
			if (e < t) return n === "desc" ? 1 : -1;
			if (e > t) return n === "desc" ? -1 : 1;
		}
		return n === "desc" ? i - r : r - i;
	}
	return 0;
}, ji = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mi = /^\w*$/;
function Ni(e, t) {
	return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || ue(e) ? !0 : typeof e == "string" && (Mi.test(e) || !ji.test(e)) || t != null && Object.hasOwn(t, e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/orderBy.mjs
function Pi(e, t, n, r) {
	if (e == null) return [];
	n = r ? void 0 : n, Array.isArray(e) || (e = Zn(e) ? Array.from(e) : Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(n) || (n = n == null ? [] : [n]), n = n.map((e) => String(e));
	let i = (e, t) => {
		let n = e, r = 0;
		for (; r < t.length && n != null; ++r) n = n[t[r]];
		return r > 0 && r === t.length ? n : void 0;
	}, a = (e, t) => {
		if (e == null) return t;
		if (t != null) return typeof e == "object" && "key" in e ? Object.hasOwn(t, e.key) ? t[e.key] : i(t, e.path) : typeof e == "function" ? e(t) : Array.isArray(e) ? i(t, e) : t[e];
	}, o = t.map((e) => (Array.isArray(e) && e.length === 1 && (e = e[0]), e == null || typeof e == "function" || Array.isArray(e) || Ni(e) ? e : {
		key: e,
		path: pe(e)
	}));
	return e.map((e) => ({
		original: e,
		criteria: o.map((t) => a(t, e))
	})).slice().sort((e, t) => {
		for (let r = 0; r < o.length; r++) {
			let i = Ai(e.criteria[r], t.criteria[r], n[r]);
			if (i !== 0) return i;
		}
		return 0;
	}).map((e) => e.original);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/sortBy.mjs
function Fi(e, ...t) {
	let n = t.length;
	return n > 1 && Oi(e, t[0], t[1]) ? t = [] : n > 2 && Oi(t[0], t[1], t[2]) && (t = [t[0]]), Pi(e, Di(t), ["asc"]);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/legendSelectors.js
var Ii = (e) => e.legend.settings, Li = (e) => e.legend.size, Ri = B([(e) => e.legend.payload, Ii], (e, t) => {
	var n = t.itemSorter, r = e.flat(1);
	return n ? Fi(r, n) : r;
});
//#endregion
//#region node_modules/recharts/es6/context/legendPayloadContext.js
function zi() {
	return z(Ri);
}
//#endregion
//#region node_modules/recharts/es6/util/useElementOffset.js
function Bi(e, t) {
	return Gi(e) || Wi(e, t) || Hi(e, t) || Vi();
}
function Vi() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Hi(e, t) {
	if (e) {
		if (typeof e == "string") return Ui(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ui(e, t) : void 0;
	}
}
function Ui(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Wi(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Gi(e) {
	if (Array.isArray(e)) return e;
}
var Ki = 1;
function qi(e, t) {
	return Math.abs(e.height - t.height) > Ki || Math.abs(e.left - t.left) > Ki || Math.abs(e.top - t.top) > Ki || Math.abs(e.width - t.width) > Ki;
}
function Ji(e) {
	var t = e.getBoundingClientRect();
	return {
		height: t.height,
		left: t.left,
		top: t.top,
		width: t.width
	};
}
function Yi() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = Bi((0, S.useState)({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	}), 2), n = t[0], r = t[1], i = (0, S.useRef)(null), a = (0, S.useRef)(n);
	a.current = n;
	var o = (0, S.useCallback)((e) => {
		if (i.current != null && (i.current.disconnect(), i.current = null), e != null) {
			var t = Ji(e);
			if (qi(t, a.current) && r(t), typeof ResizeObserver < "u") {
				var n = new ResizeObserver(() => {
					var t = Ji(e);
					qi(t, a.current) && r(t);
				});
				n.observe(e), i.current = n;
			}
		}
	}, [...e]);
	return (0, S.useEffect)(() => () => {
		var e;
		(e = i.current) == null || e.disconnect();
	}, []), [n, o];
}
//#endregion
//#region node_modules/redux/dist/redux.mjs
function Xi(e) {
	return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Zi = typeof Symbol == "function" && Symbol.observable || "@@observable", Qi = () => Math.random().toString(36).substring(7).split("").join("."), $i = {
	INIT: `@@redux/INIT${/* @__PURE__ */ Qi()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Qi()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Qi()}`
};
function ea(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ta(e, t, n) {
	if (typeof e != "function") throw Error(Xi(2));
	if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function") throw Error(Xi(0));
	if (typeof t == "function" && n === void 0 && (n = t, t = void 0), n !== void 0) {
		if (typeof n != "function") throw Error(Xi(1));
		return n(ta)(e, t);
	}
	let r = e, i = t, a = /* @__PURE__ */ new Map(), o = a, s = 0, c = !1;
	function l() {
		o === a && (o = /* @__PURE__ */ new Map(), a.forEach((e, t) => {
			o.set(t, e);
		}));
	}
	function u() {
		if (c) throw Error(Xi(3));
		return i;
	}
	function d(e) {
		if (typeof e != "function") throw Error(Xi(4));
		if (c) throw Error(Xi(5));
		let t = !0;
		l();
		let n = s++;
		return o.set(n, e), function() {
			if (t) {
				if (c) throw Error(Xi(6));
				t = !1, l(), o.delete(n), a = null;
			}
		};
	}
	function f(e) {
		if (!ea(e)) throw Error(Xi(7));
		if (e.type === void 0) throw Error(Xi(8));
		if (typeof e.type != "string") throw Error(Xi(17));
		if (c) throw Error(Xi(9));
		try {
			c = !0, i = r(i, e);
		} finally {
			c = !1;
		}
		return (a = o).forEach((e) => {
			e();
		}), e;
	}
	function p(e) {
		if (typeof e != "function") throw Error(Xi(10));
		r = e, f({ type: $i.REPLACE });
	}
	function m() {
		let e = d;
		return {
			subscribe(t) {
				if (typeof t != "object" || !t) throw Error(Xi(11));
				function n() {
					let e = t;
					e.next && e.next(u());
				}
				return n(), { unsubscribe: e(n) };
			},
			[Zi]() {
				return this;
			}
		};
	}
	return f({ type: $i.INIT }), {
		dispatch: f,
		subscribe: d,
		getState: u,
		replaceReducer: p,
		[Zi]: m
	};
}
function na(e) {
	Object.keys(e).forEach((t) => {
		let n = e[t];
		if (n(void 0, { type: $i.INIT }) === void 0) throw Error(Xi(12));
		if (n(void 0, { type: $i.PROBE_UNKNOWN_ACTION() }) === void 0) throw Error(Xi(13));
	});
}
function ra(e) {
	let t = Object.keys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let i = t[r];
		typeof e[i] == "function" && (n[i] = e[i]);
	}
	let r = Object.keys(n), i;
	try {
		na(n);
	} catch (e) {
		i = e;
	}
	return function(e = {}, t) {
		if (i) throw i;
		let a = !1, o = {};
		for (let i = 0; i < r.length; i++) {
			let s = r[i], c = n[s], l = e[s], u = c(l, t);
			if (u === void 0) throw t && t.type, Error(Xi(14));
			o[s] = u, a ||= u !== l;
		}
		return a ||= r.length !== Object.keys(e).length, a ? o : e;
	};
}
function V(...e) {
	return e.length === 0 ? (e) => e : e.length === 1 ? e[0] : e.reduce((e, t) => (...n) => e(t(...n)));
}
function ia(...e) {
	return (t) => (n, r) => {
		let i = t(n, r), a = () => {
			throw Error(Xi(15));
		}, o = {
			getState: i.getState,
			dispatch: (e, ...t) => a(e, ...t)
		};
		return a = V(...e.map((e) => e(o)))(i.dispatch), {
			...i,
			dispatch: a
		};
	};
}
function aa(e) {
	return ea(e) && "type" in e && typeof e.type == "string";
}
//#endregion
//#region node_modules/immer/dist/immer.mjs
var oa = Symbol.for("immer-nothing"), sa = Symbol.for("immer-draftable"), ca = Symbol.for("immer-state");
function la(e, ...t) {
	throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var ua = Object, da = ua.getPrototypeOf, fa = "constructor", pa = "prototype", ma = "configurable", ha = "enumerable", ga = "writable", _a = "value", va = (e) => !!e && !!e[ca];
function ya(e) {
	return e ? Sa(e) || ka(e) || !!e[sa] || !!e[fa]?.[sa] || Aa(e) || ja(e) : !1;
}
var ba = ua[pa][fa].toString(), xa = /* @__PURE__ */ new WeakMap();
function Sa(e) {
	if (!e || !Ma(e)) return !1;
	let t = da(e);
	if (t === null || t === ua[pa]) return !0;
	let n = ua.hasOwnProperty.call(t, fa) && t[fa];
	if (n === Object) return !0;
	if (!Na(n)) return !1;
	let r = xa.get(n);
	return r === void 0 && (r = Function.toString.call(n), xa.set(n, r)), r === ba;
}
function Ca(e, t, n = !0) {
	wa(e) === 0 ? (n ? Reflect.ownKeys(e) : ua.keys(e)).forEach((n) => {
		t(n, e[n], e);
	}) : e.forEach((n, r) => t(r, n, e));
}
function wa(e) {
	let t = e[ca];
	return t ? t.type_ : ka(e) ? 1 : Aa(e) ? 2 : ja(e) ? 3 : 0;
}
var Ta = (e, t, n = wa(e)) => n === 2 ? e.has(t) : ua[pa].hasOwnProperty.call(e, t), Ea = (e, t, n = wa(e)) => n === 2 ? e.get(t) : e[t], Da = (e, t, n, r = wa(e)) => {
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
};
function Oa(e, t) {
	return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
var ka = Array.isArray, Aa = (e) => e instanceof Map, ja = (e) => e instanceof Set, Ma = (e) => typeof e == "object", Na = (e) => typeof e == "function", Pa = (e) => typeof e == "boolean";
function Fa(e) {
	let t = +e;
	return Number.isInteger(t) && String(t) === e;
}
var Ia = (e) => e.copy_ || e.base_, La = (e) => e.modified_ ? e.copy_ : e.base_;
function Ra(e, t) {
	if (Aa(e)) return new Map(e);
	if (ja(e)) return new Set(e);
	if (ka(e)) return Array[pa].slice.call(e);
	let n = Sa(e);
	if (t === !0 || t === "class_only" && !n) {
		let t = ua.getOwnPropertyDescriptors(e);
		delete t[ca];
		let n = Reflect.ownKeys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = t[i];
			a[ga] === !1 && (a[ga] = !0, a[ma] = !0), (a.get || a.set) && (t[i] = {
				[ma]: !0,
				[ga]: !0,
				[ha]: a[ha],
				[_a]: e[i]
			});
		}
		return ua.create(da(e), t);
	}
	{
		let t = da(e);
		if (t !== null && n) return { ...e };
		let r = ua.create(t);
		return ua.assign(r, e);
	}
}
function za(e, t = !1) {
	return Ha(e) || va(e) || !ya(e) ? e : (wa(e) > 1 && ua.defineProperties(e, {
		set: Va,
		add: Va,
		clear: Va,
		delete: Va
	}), ua.freeze(e), t && Ca(e, (e, t) => {
		za(t, !0);
	}, !1), e);
}
function Ba() {
	la(2);
}
var Va = { [_a]: Ba };
function Ha(e) {
	return e === null || !Ma(e) || ua.isFrozen(e);
}
var Ua = "MapSet", Wa = "Patches", Ga = "ArrayMethods", Ka = {};
function qa(e) {
	let t = Ka[e];
	return t || la(0, e), t;
}
var Ja = (e) => !!Ka[e], Ya, Xa = () => Ya, Za = (e, t) => ({
	drafts_: [],
	parent_: e,
	immer_: t,
	canAutoFreeze_: !0,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: Ja(Ua) ? qa(Ua) : void 0,
	arrayMethodsPlugin_: Ja(Ga) ? qa(Ga) : void 0
});
function Qa(e, t) {
	t && (e.patchPlugin_ = qa(Wa), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function $a(e) {
	eo(e), e.drafts_.forEach(no), e.drafts_ = null;
}
function eo(e) {
	e === Ya && (Ya = e.parent_);
}
var to = (e) => Ya = Za(Ya, e);
function no(e) {
	let t = e[ca];
	t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function ro(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	let n = t.drafts_[0];
	if (e !== void 0 && e !== n) {
		n[ca].modified_ && ($a(t), la(4)), ya(e) && (e = io(t, e));
		let { patchPlugin_: r } = t;
		r && r.generateReplacementPatches_(n[ca].base_, e, t);
	} else e = io(t, n);
	return ao(t, e, !0), $a(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e === oa ? void 0 : e;
}
function io(e, t) {
	if (Ha(t)) return t;
	let n = t[ca];
	if (!n) return mo(t, e.handledSet_, e);
	if (!so(n, e)) return t;
	if (!n.modified_) return n.base_;
	if (!n.finalized_) {
		let { callbacks_: t } = n;
		if (t) for (; t.length > 0;) t.pop()(e);
		fo(n, e);
	}
	return n.copy_;
}
function ao(e, t, n = !1) {
	!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && za(t, n);
}
function oo(e) {
	e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var so = (e, t) => e.scope_ === t, co = [];
function lo(e, t, n, r) {
	let i = Ia(e), a = e.type_;
	if (r !== void 0 && Ea(i, r, a) === t) {
		Da(i, r, n, a);
		return;
	}
	if (!e.draftLocations_) {
		let t = e.draftLocations_ = /* @__PURE__ */ new Map();
		Ca(i, (e, n) => {
			if (va(n)) {
				let r = t.get(n) || [];
				r.push(e), t.set(n, r);
			}
		});
	}
	let o = e.draftLocations_.get(t) ?? co;
	for (let e of o) Da(i, e, n, a);
}
function uo(e, t, n) {
	e.callbacks_.push(function(r) {
		let i = t;
		if (!i || !so(i, r)) return;
		r.mapSetPlugin_?.fixSetContents(i);
		let a = La(i);
		lo(e, i.draft_ ?? i, a, n), fo(i, r);
	});
}
function fo(e, t) {
	if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
		let { patchPlugin_: n } = t;
		if (n) {
			let r = n.getPath(e);
			r && n.generatePatches_(e, r, t);
		}
		oo(e);
	}
}
function po(e, t, n) {
	let { scope_: r } = e;
	if (va(n)) {
		let i = n[ca];
		so(i, r) && i.callbacks_.push(function() {
			Co(e), lo(e, n, La(i), t);
		});
	} else ya(n) && e.callbacks_.push(function() {
		let i = Ia(e);
		e.type_ === 3 ? i.has(n) && mo(n, r.handledSet_, r) : Ea(i, t, e.type_) === n && r.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && mo(Ea(e.copy_, t, e.type_), r.handledSet_, r);
	});
}
function mo(e, t, n) {
	return !n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1 || va(e) || t.has(e) || !ya(e) || Ha(e) ? e : (t.add(e), Ca(e, (r, i) => {
		if (va(i)) {
			let t = i[ca];
			so(t, n) && (Da(e, r, La(t), e.type_), oo(t));
		} else ya(i) && mo(i, t, n);
	}), e);
}
function ho(e, t) {
	let n = ka(e), r = {
		type_: +!!n,
		scope_: t ? t.scope_ : Xa(),
		modified_: !1,
		finalized_: !1,
		assigned_: void 0,
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: !1,
		callbacks_: void 0
	}, i = r, a = go;
	n && (i = [r], a = _o);
	let { revoke: o, proxy: s } = Proxy.revocable(i, a);
	return r.draft_ = s, r.revoke_ = o, [s, r];
}
var go = {
	get(e, t) {
		if (t === ca) return e;
		let n = e.scope_.arrayMethodsPlugin_, r = e.type_ === 1 && typeof t == "string";
		if (r && n?.isArrayOperationMethod(t)) return n.createMethodInterceptor(e, t);
		let i = Ia(e);
		if (!Ta(i, t, e.type_)) return bo(e, i, t);
		let a = i[t];
		if (e.finalized_ || !ya(a) || r && e.operationMethod && n?.isMutatingArrayMethod(e.operationMethod) && Fa(t)) return a;
		if (a === vo(e.base_, t) || yo(e, t, a)) {
			Co(e);
			let n = e.type_ === 1 ? +t : t, r = To(e.scope_, a, e, n);
			return e.copy_[n] = r;
		}
		return a;
	},
	has(e, t) {
		return t in Ia(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(Ia(e));
	},
	set(e, t, n) {
		let r = xo(Ia(e), t);
		if (r?.set) return r.set.call(e.draft_, n), !0;
		if (!e.modified_) {
			let r = vo(Ia(e), t), i = r?.[ca];
			if (i && i.base_ === n) return e.copy_[t] = n, e.assigned_.delete(t), !0;
			if (Oa(n, r) && (n !== void 0 || Ta(e.base_, t, e.type_))) return !0;
			Co(e), So(e);
		}
		return e.copy_[t] === n && (n !== void 0 || Ta(e.copy_, t, e.type_)) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) ? !0 : (e.copy_[t] = n, e.assigned_.set(t, !0), po(e, t, n), !0);
	},
	deleteProperty(e, t) {
		return Co(e), vo(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), So(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = Ia(e), r = Reflect.getOwnPropertyDescriptor(n, t);
		return r && {
			[ga]: !0,
			[ma]: e.type_ !== 1 || t !== "length",
			[ha]: r[ha],
			[_a]: n[t]
		};
	},
	defineProperty() {
		la(11);
	},
	getPrototypeOf(e) {
		return da(e.base_);
	},
	setPrototypeOf() {
		la(12);
	}
}, _o = {};
for (let e in go) {
	let t = go[e];
	_o[e] = function() {
		let e = arguments;
		return e[0] = e[0][0], t.apply(this, e);
	};
}
_o.deleteProperty = function(e, t) {
	return _o.set.call(this, e, t, void 0);
}, _o.set = function(e, t, n) {
	return go.set.call(this, e[0], t, n, e[0]);
};
function vo(e, t) {
	let n = e[ca];
	return (n ? Ia(n) : e)[t];
}
function yo(e, t, n) {
	return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !ya(n) || n[ca] ? !1 : e.baseRefs_.has(n);
}
function bo(e, t, n) {
	let r = xo(t, n);
	return r ? _a in r ? r[_a] : r.get?.call(e.draft_) : void 0;
}
function xo(e, t) {
	if (!(t in e)) return;
	let n = da(e);
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = da(n);
	}
}
function So(e) {
	e.modified_ || (e.modified_ = !0, e.parent_ && So(e.parent_));
}
function Co(e) {
	e.copy_ ||= (e.assigned_ = /* @__PURE__ */ new Map(), Ra(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var wo = class {
	constructor(e) {
		this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (e, t, n) => {
			if (Na(e) && !Na(t)) {
				let n = t;
				t = e;
				let r = this;
				return function(e = n, ...i) {
					return r.produce(e, (e) => t.call(this, e, ...i));
				};
			}
			Na(t) || la(6), n !== void 0 && !Na(n) && la(7);
			let r;
			if (ya(e)) {
				let i = to(this), a = To(i, e, void 0), o = !0;
				try {
					r = t(a), o = !1;
				} finally {
					o ? $a(i) : eo(i);
				}
				return Qa(i, n), ro(r, i);
			}
			if (!e || !Ma(e)) {
				if (r = t(e), r === void 0 && (r = e), r === oa && (r = void 0), this.autoFreeze_ && za(r, !0), n) {
					let t = [], i = [];
					qa(Wa).generateReplacementPatches_(e, r, {
						patches_: t,
						inversePatches_: i
					}), n(t, i);
				}
				return r;
			}
			la(1, e);
		}, this.produceWithPatches = (e, t) => {
			if (Na(e)) return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
			let n, r;
			return [
				this.produce(e, t, (e, t) => {
					n = e, r = t;
				}),
				n,
				r
			];
		}, Pa(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), Pa(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), Pa(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
	}
	createDraft(e) {
		ya(e) || la(8), va(e) && (e = Eo(e));
		let t = to(this), n = To(t, e, void 0);
		return n[ca].isManual_ = !0, eo(t), n;
	}
	finishDraft(e, t) {
		let n = e && e[ca];
		(!n || !n.isManual_) && la(9);
		let { scope_: r } = n;
		return Qa(r, t), ro(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	setUseStrictIteration(e) {
		this.useStrictIteration_ = e;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			let r = t[n];
			if (r.path.length === 0 && r.op === "replace") {
				e = r.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		let r = qa(Wa).applyPatches_;
		return va(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
	}
};
function To(e, t, n, r) {
	let [i, a] = Aa(t) ? qa(Ua).proxyMap_(t, n) : ja(t) ? qa(Ua).proxySet_(t, n) : ho(t, n);
	return (n?.scope_ ?? Xa()).drafts_.push(i), a.callbacks_ = n?.callbacks_ ?? [], a.key_ = r, n && r !== void 0 ? uo(n, a, r) : a.callbacks_.push(function(e) {
		e.mapSetPlugin_?.fixSetContents(a);
		let { patchPlugin_: t } = e;
		a.modified_ && t && t.generatePatches_(a, [], e);
	}), i;
}
function Eo(e) {
	return va(e) || la(10, e), Do(e);
}
function Do(e) {
	if (!ya(e) || Ha(e)) return e;
	let t = e[ca], n, r = !0;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = !0, n = Ra(e, t.scope_.immer_.useStrictShallowCopy_), r = t.scope_.immer_.shouldUseStrictIteration();
	} else n = Ra(e, !0);
	return Ca(n, (e, t) => {
		Da(n, e, Do(t));
	}, r), t && (t.finalized_ = !1), n;
}
globalThis.Iterator?.from;
var Oo = new wo().produce, H = (e) => e;
//#endregion
//#region node_modules/redux-thunk/dist/redux-thunk.mjs
function ko(e) {
	return ({ dispatch: t, getState: n }) => (r) => (i) => typeof i == "function" ? i(t, n, e) : r(i);
}
var Ao = ko(), jo = ko, Mo = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length !== 0) return typeof arguments[0] == "object" ? V : V.apply(null, arguments);
};
typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function No(e, t) {
	function n(...n) {
		if (t) {
			let r = t(...n);
			if (!r) throw Error(Bs(0));
			return {
				type: e,
				payload: r.payload,
				..."meta" in r && { meta: r.meta },
				..."error" in r && { error: r.error }
			};
		}
		return {
			type: e,
			payload: n[0]
		};
	}
	return n.toString = () => `${e}`, n.type = e, n.match = (t) => aa(t) && t.type === e, n;
}
var Po = class e extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, e.prototype);
	}
	static get [Symbol.species]() {
		return e;
	}
	concat(...e) {
		return super.concat.apply(this, e);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0]) ? new e(...t[0].concat(this)) : new e(...t.concat(this));
	}
};
function Fo(e) {
	return ya(e) ? Oo(e, () => {}) : e;
}
function Io(e, t, n) {
	return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Lo(e) {
	return typeof e == "boolean";
}
var Ro = () => function(e) {
	let { thunk: t = !0, immutableCheck: n = !0, serializableCheck: r = !0, actionCreatorCheck: i = !0 } = e ?? {}, a = new Po();
	return t && (Lo(t) ? a.push(Ao) : a.push(jo(t.extraArgument))), a;
}, zo = "RTK_autoBatch", U = () => (e) => ({
	payload: e,
	meta: { [zo]: !0 }
}), W = (e) => (t) => {
	setTimeout(t, e);
}, Bo = (e, t) => (n) => {
	let r = !1, i, a, o = () => {
		r || (r = !0, cancelAnimationFrame(i), clearTimeout(a), n());
	};
	i = e(o), a = setTimeout(o, t);
}, Vo = (e = { type: "raf" }) => (t) => (...n) => {
	let r = t(...n), i = !0, a = !1, o = !1, s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? Bo(window.requestAnimationFrame, 100) : W(10) : e.type === "callback" ? e.queueNotification : W(e.timeout), l = () => {
		o = !1, a && (a = !1, s.forEach((e) => e()));
	};
	return Object.assign({}, r, {
		subscribe(e) {
			let t = r.subscribe(() => i && e());
			return s.add(e), () => {
				t(), s.delete(e);
			};
		},
		dispatch(e) {
			try {
				return i = !e?.meta?.[zo], a = !i, a && (o || (o = !0, c(l))), r.dispatch(e);
			} finally {
				i = !0;
			}
		}
	});
}, Ho = (e) => function(t) {
	let { autoBatch: n = !0 } = t ?? {}, r = new Po(e);
	return n && r.push(Vo(typeof n == "object" ? n : void 0)), r;
};
function Uo(e) {
	let t = Ro(), { reducer: n = void 0, middleware: r, devTools: i = !0, duplicateMiddlewareCheck: a = !0, preloadedState: o = void 0, enhancers: s = void 0 } = e || {}, c;
	if (typeof n == "function") c = n;
	else if (ea(n)) c = ra(n);
	else throw Error(Bs(1));
	let l;
	l = typeof r == "function" ? r(t) : t();
	let u = V;
	i && (u = Mo({
		trace: !1,
		...typeof i == "object" && i
	}));
	let d = Ho(ia(...l)), f = typeof s == "function" ? s(d) : d(), p = u(...f);
	return ta(c, o, p);
}
function Wo(e) {
	let t = {}, n = [], r, i = {
		addCase(e, n) {
			let r = typeof e == "string" ? e : e.type;
			if (!r) throw Error(Bs(28));
			if (r in t) throw Error(Bs(29));
			return t[r] = n, i;
		},
		addAsyncThunk(e, r) {
			return r.pending && (t[e.pending.type] = r.pending), r.rejected && (t[e.rejected.type] = r.rejected), r.fulfilled && (t[e.fulfilled.type] = r.fulfilled), r.settled && n.push({
				matcher: e.settled,
				reducer: r.settled
			}), i;
		},
		addMatcher(e, t) {
			return n.push({
				matcher: e,
				reducer: t
			}), i;
		},
		addDefaultCase(e) {
			return r = e, i;
		}
	};
	return e(i), [
		t,
		n,
		r
	];
}
function Go(e) {
	return typeof e == "function";
}
function Ko(e, t) {
	let [n, r, i] = Wo(t), a;
	if (Go(e)) a = () => Fo(e());
	else {
		let t = Fo(e);
		a = () => t;
	}
	function o(e = a(), t) {
		let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
		return o.filter((e) => !!e).length === 0 && (o = [i]), o.reduce((e, n) => {
			if (n) {
				if (va(e)) {
					let r = n(e, t);
					return r === void 0 ? e : r;
				}
				if (ya(e)) return Oo(e, (e) => n(e, t));
				{
					let r = n(e, t);
					if (r === void 0) {
						if (e === null) return e;
						throw Error(Bs(9));
					}
					return r;
				}
			}
			return e;
		}, e);
	}
	return o.getInitialState = a, o;
}
var qo = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Jo = (e = 21) => {
	let t = "", n = e;
	for (; n--;) t += qo[Math.random() * 64 | 0];
	return t;
}, Yo = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Xo(e, t) {
	return `${e}/${t}`;
}
function Zo({ creators: e } = {}) {
	let t = e?.asyncThunk?.[Yo];
	return function(e) {
		let { name: n, reducerPath: r = n } = e;
		if (!n) throw Error(Bs(11));
		let i = (typeof e.reducers == "function" ? e.reducers(es()) : e.reducers) || {}, a = Object.keys(i), o = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		}, s = {
			addCase(e, t) {
				let n = typeof e == "string" ? e : e.type;
				if (!n) throw Error(Bs(12));
				if (n in o.sliceCaseReducersByType) throw Error(Bs(13));
				return o.sliceCaseReducersByType[n] = t, s;
			},
			addMatcher(e, t) {
				return o.sliceMatchers.push({
					matcher: e,
					reducer: t
				}), s;
			},
			exposeAction(e, t) {
				return o.actionCreators[e] = t, s;
			},
			exposeCaseReducer(e, t) {
				return o.sliceCaseReducersByName[e] = t, s;
			}
		};
		a.forEach((r) => {
			let a = i[r], o = {
				reducerName: r,
				type: Xo(n, r),
				createNotation: typeof e.reducers == "function"
			};
			ns(a) ? is(o, a, s, t) : ts(o, a, s);
		});
		function c() {
			let [t = {}, n = [], r = void 0] = typeof e.extraReducers == "function" ? Wo(e.extraReducers) : [e.extraReducers], i = {
				...t,
				...o.sliceCaseReducersByType
			};
			return Ko(e.initialState, (e) => {
				for (let t in i) e.addCase(t, i[t]);
				for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
				for (let t of n) e.addMatcher(t.matcher, t.reducer);
				r && e.addDefaultCase(r);
			});
		}
		let l = (e) => e, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap(), f;
		function p(e, t) {
			return f ||= c(), f(e, t);
		}
		function m() {
			return f ||= c(), f.getInitialState();
		}
		function h(t, n = !1) {
			function r(e) {
				let i = e[t];
				return i === void 0 && n && (i = Io(d, r, m)), i;
			}
			function i(t = l) {
				return Io(Io(u, n, () => /* @__PURE__ */ new WeakMap()), t, () => {
					let r = {};
					for (let [i, a] of Object.entries(e.selectors ?? {})) r[i] = Qo(a, t, () => Io(d, t, m), n);
					return r;
				});
			}
			return {
				reducerPath: t,
				getSelectors: i,
				get selectors() {
					return i(r);
				},
				selectSlice: r
			};
		}
		let g = {
			name: n,
			reducer: p,
			actions: o.actionCreators,
			caseReducers: o.sliceCaseReducersByName,
			getInitialState: m,
			...h(r),
			injectInto(e, { reducerPath: t, ...n } = {}) {
				let i = t ?? r;
				return e.inject({
					reducerPath: i,
					reducer: p
				}, n), {
					...g,
					...h(i, !0)
				};
			}
		};
		return g;
	};
}
function Qo(e, t, n, r) {
	function i(i, ...a) {
		let o = t(i);
		return o === void 0 && r && (o = n()), e(o, ...a);
	}
	return i.unwrapped = e, i;
}
var $o = /* @__PURE__ */ Zo();
function es() {
	function e(e, t) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: e,
			...t
		};
	}
	return e.withTypes = () => e, {
		reducer(e) {
			return Object.assign({ [e.name](...t) {
				return e(...t);
			} }[e.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(e, t) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare: e,
				reducer: t
			};
		},
		asyncThunk: e
	};
}
function ts({ type: e, reducerName: t, createNotation: n }, r, i) {
	let a, o;
	if ("reducer" in r) {
		if (n && !rs(r)) throw Error(Bs(17));
		a = r.reducer, o = r.prepare;
	} else a = r;
	i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? No(e, o) : No(e));
}
function ns(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function rs(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function is({ type: e, reducerName: t }, n, r, i) {
	if (!i) throw Error(Bs(18));
	let { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n, d = i(e, a, u);
	r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), s && r.addCase(d.pending, s), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
		fulfilled: o || as,
		pending: s || as,
		rejected: c || as,
		settled: l || as
	});
}
function as() {}
var os = "task", ss = "listener", cs = "completed", ls = "cancelled", us = `task-${ls}`, ds = `task-${cs}`, fs = `${ss}-${ls}`, ps = `${ss}-${cs}`, ms = class {
	code;
	name = "TaskAbortError";
	message;
	constructor(e) {
		this.code = e, this.message = `${os} ${ls} (reason: ${e})`;
	}
}, hs = (e, t) => {
	if (typeof e != "function") throw TypeError(Bs(32));
}, gs = () => {}, _s = (e, t = gs) => (e.catch(t), e), vs = (e, t) => (e.addEventListener("abort", t, { once: !0 }), () => e.removeEventListener("abort", t)), ys = (e) => {
	if (e.aborted) throw new ms(e.reason);
};
function bs(e, t) {
	let n = gs;
	return new Promise((r, i) => {
		let a = () => i(new ms(e.reason));
		if (e.aborted) {
			a();
			return;
		}
		n = vs(e, a), t.finally(() => n()).then(r, i);
	}).finally(() => {
		n = gs;
	});
}
var xs = async (e, t) => {
	try {
		return await Promise.resolve(), {
			status: "ok",
			value: await e()
		};
	} catch (e) {
		return {
			status: e instanceof ms ? "cancelled" : "rejected",
			error: e
		};
	} finally {
		t?.();
	}
}, Ss = (e) => (t) => _s(bs(e, t).then((t) => (ys(e), t))), Cs = (e) => {
	let t = Ss(e);
	return (e) => t(new Promise((t) => setTimeout(t, e)));
}, { assign: ws } = Object, Ts = {}, Es = "listenerMiddleware", Ds = (e, t) => {
	let n = (t) => vs(e, () => t.abort(e.reason));
	return (r, i) => {
		hs(r, "taskExecutor");
		let a = new AbortController();
		n(a);
		let o = xs(async () => {
			ys(e), ys(a.signal);
			let t = await r({
				pause: Ss(a.signal),
				delay: Cs(a.signal),
				signal: a.signal
			});
			return ys(a.signal), t;
		}, () => a.abort(ds));
		return i?.autoJoin && t.push(o.catch(gs)), {
			result: Ss(e)(o),
			cancel() {
				a.abort(us);
			}
		};
	};
}, Os = (e, t) => {
	let n = async (n, r) => {
		ys(t);
		let i = () => {}, a = [new Promise((t, r) => {
			let a = e({
				predicate: n,
				effect: (e, n) => {
					n.unsubscribe(), t([
						e,
						n.getState(),
						n.getOriginalState()
					]);
				}
			});
			i = () => {
				a(), r();
			};
		})];
		r != null && a.push(new Promise((e) => setTimeout(e, r, null)));
		try {
			let e = await bs(t, Promise.race(a));
			return ys(t), e;
		} finally {
			i();
		}
	};
	return ((e, t) => _s(n(e, t)));
}, ks = (e) => {
	let { type: t, actionCreator: n, matcher: r, predicate: i, effect: a } = e;
	if (t) i = No(t).match;
	else if (n) t = n.type, i = n.match;
	else if (r) i = r;
	else if (!i) throw Error(Bs(21));
	return hs(a, "options.listener"), {
		predicate: i,
		type: t,
		effect: a
	};
}, As = /* @__PURE__ */ ws((e) => {
	let { type: t, predicate: n, effect: r } = ks(e);
	return {
		id: Jo(),
		effect: r,
		type: t,
		predicate: n,
		pending: /* @__PURE__ */ new Set(),
		unsubscribe: () => {
			throw Error(Bs(22));
		}
	};
}, { withTypes: () => As }), js = (e, t) => {
	let { type: n, effect: r, predicate: i } = ks(t);
	return Array.from(e.values()).find((e) => (typeof n == "string" ? e.type === n : e.predicate === i) && e.effect === r);
}, Ms = (e) => {
	e.pending.forEach((e) => {
		e.abort(fs);
	});
}, Ns = (e, t) => () => {
	for (let e of t.keys()) Ms(e);
	e.clear();
}, Ps = (e, t, n) => {
	try {
		e(t, n);
	} catch (e) {
		setTimeout(() => {
			throw e;
		}, 0);
	}
}, Fs = /* @__PURE__ */ ws(/* @__PURE__ */ No(`${Es}/add`), { withTypes: () => Fs }), Is = /* @__PURE__ */ No(`${Es}/removeAll`), Ls = /* @__PURE__ */ ws(/* @__PURE__ */ No(`${Es}/remove`), { withTypes: () => Ls }), Rs = (...e) => {
	console.error(`${Es}/error`, ...e);
}, zs = (e = {}) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (e) => {
		let t = n.get(e) ?? 0;
		n.set(e, t + 1);
	}, i = (e) => {
		let t = n.get(e) ?? 1;
		t === 1 ? n.delete(e) : n.set(e, t - 1);
	}, { extra: a, onError: o = Rs } = e;
	hs(o, "onError");
	let s = (e) => (e.unsubscribe = () => t.delete(e.id), t.set(e.id, e), (t) => {
		e.unsubscribe(), t?.cancelActive && Ms(e);
	}), c = ((e) => {
		let n = js(t, e) ?? As(e);
		return s(n);
	});
	ws(c, { withTypes: () => c });
	let l = (e) => {
		let n = js(t, e);
		return n && (n.unsubscribe(), e.cancelActive && Ms(n)), !!n;
	};
	ws(l, { withTypes: () => l });
	let u = async (e, n, s, l) => {
		let u = new AbortController(), d = Os(c, u.signal), f = [];
		try {
			e.pending.add(u), r(e), await Promise.resolve(e.effect(n, ws({}, s, {
				getOriginalState: l,
				condition: (e, t) => d(e, t).then(Boolean),
				take: d,
				delay: Cs(u.signal),
				pause: Ss(u.signal),
				extra: a,
				signal: u.signal,
				fork: Ds(u.signal, f),
				unsubscribe: e.unsubscribe,
				subscribe: () => {
					t.set(e.id, e);
				},
				cancelActiveListeners: () => {
					e.pending.forEach((e, t, n) => {
						e !== u && (e.abort(fs), n.delete(e));
					});
				},
				cancel: () => {
					u.abort(fs), e.pending.delete(u);
				},
				throwIfCancelled: () => {
					ys(u.signal);
				}
			})));
		} catch (e) {
			e instanceof ms || Ps(o, e, { raisedBy: "effect" });
		} finally {
			await Promise.all(f), u.abort(ps), i(e), e.pending.delete(u);
		}
	}, d = Ns(t, n);
	return {
		middleware: (e) => (n) => (r) => {
			if (!aa(r)) return n(r);
			if (Fs.match(r)) return c(r.payload);
			if (Is.match(r)) {
				d();
				return;
			}
			if (Ls.match(r)) return l(r.payload);
			let i = e.getState(), a = () => {
				if (i === Ts) throw Error(Bs(23));
				return i;
			}, s;
			try {
				if (s = n(r), t.size > 0) {
					let n = e.getState(), s = Array.from(t.values());
					for (let t of s) {
						let s = !1;
						try {
							s = t.predicate(r, n, i);
						} catch (e) {
							s = !1, Ps(o, e, { raisedBy: "predicate" });
						}
						s && u(t, r, e, a);
					}
				}
			} finally {
				i = Ts;
			}
			return s;
		},
		startListening: c,
		stopListening: l,
		clearListeners: d
	};
};
function Bs(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region node_modules/recharts/es6/state/layoutSlice.js
var Vs = $o({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(e, t) {
			e.layoutType = t.payload;
		},
		setChartSize(e, t) {
			e.width = t.payload.width, e.height = t.payload.height;
		},
		setMargin(e, t) {
			e.margin.top = t.payload.top ?? 0, e.margin.right = t.payload.right ?? 0, e.margin.bottom = t.payload.bottom ?? 0, e.margin.left = t.payload.left ?? 0;
		},
		setScale(e, t) {
			e.scale = t.payload;
		}
	}
}), Hs = Vs.actions, Us = Hs.setMargin, Ws = Hs.setLayout, Gs = Hs.setChartSize, Ks = Hs.setScale, qs = Vs.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getSliced.js
function Js(e, t, n) {
	return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
//#endregion
//#region node_modules/recharts/es6/util/isWellBehavedNumber.js
function G(e) {
	return Number.isFinite(e);
}
function Ys(e) {
	return typeof e == "number" && e > 0 && Number.isFinite(e);
}
//#endregion
//#region node_modules/recharts/es6/util/ChartUtils.js
function Xs(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Zs(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Xs(Object(n), !0).forEach(function(t) {
			Qs(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Xs(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Qs(e, t, n) {
	return (t = $s(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function $s(e) {
	var t = ec(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ec(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function tc(e, t, n) {
	return De(e) || De(t) ? n : be(t) ? me(e, t, n) : typeof t == "function" ? t(e) : n;
}
var nc = (e, t, n) => {
	if (t && n) {
		var r = n.width, i = n.height, a = t.align, o = t.verticalAlign, s = t.layout, c = t.position, l = t.offset, u = l === void 0 ? 0 : l;
		if (c != null) {
			if (ze(c)) {
				if (c === "top" && I(e.top)) return Zs(Zs({}, e), {}, { top: e.top + (i || 0) + u });
				if (c === "bottom" && I(e.bottom)) return Zs(Zs({}, e), {}, { bottom: e.bottom + (i || 0) + u });
				if (c === "left" && I(e.left)) return Zs(Zs({}, e), {}, { left: e.left + (r || 0) + u });
				if (c === "right" && I(e.right)) return Zs(Zs({}, e), {}, { right: e.right + (r || 0) + u });
			}
			return e;
		}
		if ((s === "vertical" || s === "horizontal" && o === "middle") && a !== "center" && I(e[a])) return Zs(Zs({}, e), {}, { [a]: e[a] + (r || 0) });
		if ((s === "horizontal" || s === "vertical" && a === "center") && o !== "middle" && I(e[o])) return Zs(Zs({}, e), {}, { [o]: e[o] + (i || 0) });
	}
	return e;
}, rc = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", ic = (e, t, n, r) => {
	if (r) return e.map((e) => e.coordinate);
	var i, a, o = e.map((e) => (e.coordinate === t && (i = !0), e.coordinate === n && (a = !0), e.coordinate));
	return i || o.push(t), a || o.push(n), o;
}, ac = (e, t, n) => {
	if (!e) return null;
	var r = e.duplicateDomain, i = e.type, a = e.range, o = e.scale, s = e.realScaleType, c = e.isCategorical, l = e.categoricalDomain, u = e.tickCount, d = e.ticks, f = e.niceTicks, p = e.axisType;
	if (!o) return null;
	var m = s === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, h = (t || n) && i === "category" && o.bandwidth ? o.bandwidth() / m : 0;
	return h = p === "angleAxis" && a && a.length >= 2 ? _e(a[0] - a[1]) * 2 * h : h, t && (d || f) ? (d || f || []).map((e, t) => {
		var n = r ? r.indexOf(e) : e, i = o.map(n);
		return G(i) ? {
			coordinate: i + h,
			value: e,
			offset: h,
			index: t
		} : null;
	}).filter(ke) : c && l ? l.map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(ke) : o.ticks && !n && u != null ? o.ticks(u).map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(ke) : o.domain().map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: r ? r[e] : e,
			index: t,
			offset: h
		} : null;
	}).filter(ke);
}, oc = (e, t) => {
	if (!t || t.length !== 2 || !I(t[0]) || !I(t[1])) return e;
	var n = Math.min(t[0], t[1]), r = Math.max(t[0], t[1]), i = [e[0], e[1]];
	return (!I(e[0]) || e[0] < n) && (i[0] = n), (!I(e[1]) || e[1] > r) && (i[1] = r), i[0] > r && (i[0] = r), i[1] < n && (i[1] = n), i;
}, sc = {
	sign: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0, o = 0; o < t; ++o) {
				var s = e[o]?.[r];
				if (s != null) {
					var c = s[1], l = s[0], u = ve(c) ? l : c;
					u >= 0 ? (s[0] = i, i += u, s[1] = i) : (s[0] = a, a += u, s[1] = a);
				}
			}
		}
	},
	expand: sn,
	none: tn,
	silhouette: cn,
	wiggle: ln,
	positive: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0; a < t; ++a) {
				var o = e[a]?.[r];
				if (o != null) {
					var s = ve(o[1]) ? o[0] : o[1];
					s >= 0 ? (o[0] = i, i += s, o[1] = i) : (o[0] = 0, o[1] = 0);
				}
			}
		}
	}
}, cc = (e, t, n) => {
	var r = sc[n] ?? tn, i = on().keys(t).value((e, t) => Number(tc(e, t, 0))).order(nn).offset(r)(e);
	return i.forEach((n, r) => {
		n.forEach((n, i) => {
			var a = tc(e[i], t[r], 0);
			Array.isArray(a) && a.length === 2 && I(a[0]) && I(a[1]) && (n[0] = a[0], n[1] = a[1]);
		});
	}), i;
};
function lc(e) {
	return e == null ? void 0 : String(e);
}
function uc(e) {
	var t = e.axis, n = e.ticks, r = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
	if (t.type === "category") {
		if (!t.allowDuplicatedCategory && t.dataKey && !De(i[t.dataKey])) {
			var s = Ee(n, "value", i[t.dataKey]);
			if (s) return s.coordinate + r / 2;
		}
		return n != null && n[a] ? n[a].coordinate + r / 2 : null;
	}
	var c = tc(i, De(o) ? t.dataKey : o), l = t.scale.map(c);
	return I(l) ? l : null;
}
var dc = (e) => {
	var t = e.axis, n = e.ticks, r = e.offset, i = e.bandSize, a = e.entry, o = e.index;
	if (t.type === "category") return n[o] ? n[o].coordinate + r : null;
	var s = tc(a, t.dataKey, t.scale.domain()[o]);
	if (De(s)) return null;
	var c = t.scale.map(s);
	return I(c) ? c - i / 2 + r : null;
}, fc = (e) => {
	var t = e.numericAxis, n = t.scale.domain();
	if (t.type === "number") {
		var r = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
		return r <= 0 && i >= 0 ? 0 : i < 0 ? i : r;
	}
	return n[0];
}, pc = (e) => {
	var t = e.flat(2).filter(I);
	return [Math.min(...t), Math.max(...t)];
}, mc = (e) => [e[0] === Infinity ? 0 : e[0], e[1] === -Infinity ? 0 : e[1]], hc = (e, t, n) => {
	if (e != null && Object.keys(e).length !== 0) return mc(Object.keys(e).reduce((r, i) => {
		var a = e[i];
		if (!a) return r;
		var o = a.stackedData.reduce((e, r) => {
			var i = pc(Js(r, t, n));
			return !G(i[0]) || !G(i[1]) ? e : [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(o[0], r[0]), Math.max(o[1], r[1])];
	}, [Infinity, -Infinity]));
}, gc = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, _c = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, vc = (e, t, n) => {
	if (e && e.scale && e.scale.bandwidth) {
		var r = e.scale.bandwidth();
		if (!n || r > 0) return r;
	}
	if (e && t && t.length >= 2) {
		for (var i = Fi(t, (e) => e.coordinate), a = [], o = 0, s = 1, c = i.length; s < c; s++) {
			var l = (i[s]?.coordinate || 0) - (i[s - 1]?.coordinate || 0);
			a.push(l), o = Math.max(l, o);
		}
		var u = o * 1e-4, d = Infinity;
		for (var f of a) f > u && (d = Math.min(f, d));
		return d === Infinity ? 0 : d;
	}
	return n ? void 0 : 0;
};
function yc(e) {
	var t = e.tooltipEntrySettings, n = e.dataKey, r = e.payload, i = e.value, a = e.name;
	return Zs(Zs({}, t), {}, {
		dataKey: n,
		payload: r,
		value: i,
		name: a
	});
}
function bc(e, t) {
	if (e != null) return String(e);
	if (typeof t == "string") return t;
}
var xc = (e, t) => {
	if (t === "horizontal") return e.relativeX;
	if (t === "vertical") return e.relativeY;
}, Sc = (e, t) => t === "centric" ? e.angle : e.radius, Cc = (e) => e.layout.width, wc = (e) => e.layout.height, Tc = (e) => e.layout.scale, Ec = (e) => e.layout.margin, Dc = B((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Oc = B((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), kc = "data-recharts-item-index";
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js
function Ac(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function jc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ac(Object(n), !0).forEach(function(t) {
			Mc(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ac(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Mc(e, t, n) {
	return (t = Nc(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Nc(e) {
	var t = Pc(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Pc(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Fc = (e) => e.brush.height;
function Ic(e) {
	return Oc(e).reduce((e, t) => t.orientation === "left" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function Lc(e) {
	return Oc(e).reduce((e, t) => t.orientation === "right" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function Rc(e) {
	return Dc(e).reduce((e, t) => t.orientation === "top" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
function zc(e) {
	return Dc(e).reduce((e, t) => t.orientation === "bottom" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
var Bc = B([
	Cc,
	wc,
	Ec,
	Fc,
	Ic,
	Lc,
	Rc,
	zc,
	Ii,
	Li
], (e, t, n, r, i, a, o, s, c, l) => {
	var u = {
		left: (n.left || 0) + i,
		right: (n.right || 0) + a
	}, d = jc(jc({}, {
		top: (n.top || 0) + o,
		bottom: (n.bottom || 0) + s
	}), u), f = d.bottom;
	d.bottom += r, d = nc(d, c, l);
	var p = e - d.left - d.right, m = t - d.top - d.bottom;
	return jc(jc({ brushBottom: f }, d), {}, {
		width: Math.max(p, 0),
		height: Math.max(m, 0)
	});
}), Vc = B(Bc, (e) => ({
	x: e.left,
	y: e.top,
	width: e.width,
	height: e.height
})), Hc = B(Cc, wc, (e, t) => ({
	x: 0,
	y: 0,
	width: e,
	height: t
})), Uc = /*#__PURE__*/ (0, S.createContext)(null), Wc = () => (0, S.useContext)(Uc) != null, Gc = (e) => {
	var t = e.children;
	return /*#__PURE__*/ S.createElement(Uc.Provider, { value: !0 }, t);
}, Kc = (e) => e.brush, qc = B([
	Kc,
	Bc,
	Ec
], (e, t, n) => ({
	height: e.height,
	x: I(e.x) ? e.x : t.left,
	y: I(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
	width: I(e.width) ? e.width : t.width
}));
//#endregion
//#region node_modules/es-toolkit/dist/function/debounce.mjs
function Jc(e, t, { signal: n, edges: r } = {}) {
	let i, a = null, o = r != null && r.includes("leading"), s = r == null || r.includes("trailing"), c = () => {
		a !== null && (e.apply(i, a), i = void 0, a = null);
	}, l = () => {
		s && c(), p();
	}, u = null, d = () => {
		u != null && clearTimeout(u), u = setTimeout(() => {
			u = null, l();
		}, t);
	}, f = () => {
		u !== null && (clearTimeout(u), u = null);
	}, p = () => {
		f(), i = void 0, a = null;
	}, m = () => {
		c();
	}, h = function(...e) {
		if (n?.aborted) return;
		i = this, a = e;
		let t = u == null;
		d(), o && t && c();
	};
	return h.schedule = d, h.cancel = p, h.flush = m, n?.addEventListener("abort", p, { once: !0 }), h;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/function/debounce.mjs
function Yc(e, t = 0, n = {}) {
	typeof n != "object" && (n = {});
	let { leading: r = !1, trailing: i = !0, maxWait: a } = n, o = [, ,];
	r && (o[0] = "leading"), i && (o[1] = "trailing");
	let s, c = null, l = Jc(function(...t) {
		s = e.apply(this, t), c = null;
	}, t, { edges: o }), u = function(...t) {
		return a != null && (c === null && (c = Date.now()), Date.now() - c >= a) ? ((r || i) && (s = e.apply(this, t)), c = Date.now(), l.cancel(), l.schedule(), s) : (l.apply(this, t), s);
	};
	return u.cancel = l.cancel, u.flush = () => (l.flush(), s), u;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/function/throttle.mjs
function Xc(e, t = 0, n = {}) {
	let { leading: r = !0, trailing: i = !0 } = n;
	return Yc(e, t, {
		leading: r,
		maxWait: t,
		trailing: i
	});
}
//#endregion
//#region node_modules/recharts/es6/util/LogUtils.js
var Zc = function(e, t) {
	var n = [...arguments].slice(2);
	if (typeof console < "u" && console.warn && (t === void 0 && console.warn("LogUtils requires an error message argument"), !e)) {
		if (t === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var r = 0;
			console.warn(t.replace(/%s/g, () => n[r++]));
		}
	}
}, Qc = {
	width: "100%",
	height: "100%",
	debounce: 0,
	minWidth: 0,
	initialDimension: {
		width: -1,
		height: -1
	}
}, $c = (e, t, n) => {
	var r = n.width, i = r === void 0 ? Qc.width : r, a = n.height, o = a === void 0 ? Qc.height : a, s = n.aspect, c = n.maxHeight, l = ye(i) ? e : Number(i), u = ye(o) ? t : Number(o);
	return s && s > 0 && (l ? u = l / s : u && (l = u * s), c && u != null && u > c && (u = c)), {
		calculatedWidth: l,
		calculatedHeight: u
	};
}, el = {
	width: 0,
	height: 0,
	overflow: "visible"
}, tl = {
	width: 0,
	overflowX: "visible"
}, nl = {
	height: 0,
	overflowY: "visible"
}, rl = {}, il = (e) => {
	var t = e.width, n = e.height, r = ye(t), i = ye(n);
	return r && i ? el : r ? tl : i ? nl : rl;
};
function al(e) {
	var t = e.width, n = e.height, r = e.aspect, i = t, a = n;
	return i === void 0 && a === void 0 ? (i = Qc.width, a = Qc.height) : i === void 0 ? i = r && r > 0 ? void 0 : Qc.width : a === void 0 && (a = r && r > 0 ? void 0 : Qc.height), {
		width: i,
		height: a
	};
}
//#endregion
//#region node_modules/recharts/es6/component/ResponsiveContainer.js
var ol = [
	"aspect",
	"initialDimension",
	"width",
	"height",
	"minWidth",
	"minHeight",
	"maxHeight",
	"children",
	"debounce",
	"id",
	"className",
	"onResize",
	"style"
];
function sl() {
	return sl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, sl.apply(null, arguments);
}
function cl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ll(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cl(Object(n), !0).forEach(function(t) {
			ul(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ul(e, t, n) {
	return (t = dl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dl(e) {
	var t = fl(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fl(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function pl(e, t) {
	return vl(e) || _l(e, t) || hl(e, t) || ml();
}
function ml() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function hl(e, t) {
	if (e) {
		if (typeof e == "string") return gl(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gl(e, t) : void 0;
	}
}
function gl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function _l(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function vl(e) {
	if (Array.isArray(e)) return e;
}
function yl(e, t) {
	if (e == null) return {};
	var n, r, i = bl(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function bl(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var xl = /*#__PURE__*/ (0, S.createContext)(Qc.initialDimension);
function Sl(e) {
	return Ys(e.width) && Ys(e.height);
}
function Cl(e) {
	var t = e.children, n = e.width, r = e.height, i = (0, S.useMemo)(() => ({
		width: n,
		height: r
	}), [n, r]);
	return Sl(i) ? /*#__PURE__*/ S.createElement(xl.Provider, { value: i }, t) : null;
}
var wl = () => (0, S.useContext)(xl), Tl = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.aspect, r = e.initialDimension, i = r === void 0 ? Qc.initialDimension : r, a = e.width, o = e.height, s = e.minWidth, c = s === void 0 ? Qc.minWidth : s, l = e.minHeight, u = e.maxHeight, d = e.children, f = e.debounce, p = f === void 0 ? Qc.debounce : f, m = e.id, h = e.className, g = e.onResize, _ = e.style, v = _ === void 0 ? {} : _, b = yl(e, ol), x = (0, S.useRef)(null), C = (0, S.useRef)();
	C.current = g, (0, S.useImperativeHandle)(t, () => x.current);
	var w = pl((0, S.useState)({
		containerWidth: i.width,
		containerHeight: i.height
	}), 2), T = w[0], E = w[1], D = (0, S.useCallback)((e, t) => {
		E((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []);
	(0, S.useEffect)(() => {
		if (x.current == null || typeof ResizeObserver > "u") return Ae;
		var e = (e) => {
			var t, n = e[0];
			if (n != null) {
				var r = n.contentRect, i = r.width, a = r.height;
				D(i, a), (t = C.current) == null || t.call(C, i, a);
			}
		};
		p > 0 && (e = Xc(e, p, {
			trailing: !0,
			leading: !1
		}));
		var t = new ResizeObserver(e), n = x.current.getBoundingClientRect(), r = n.width, i = n.height;
		return D(r, i), t.observe(x.current), () => {
			t.disconnect();
		};
	}, [D, p]);
	var O = T.containerWidth, k = T.containerHeight;
	Zc(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
	var A = $c(O, k, {
		width: a,
		height: o,
		aspect: n,
		maxHeight: u
	}), j = A.calculatedWidth, M = A.calculatedHeight;
	return Zc(O < 0 || k < 0 || j != null && j > 0 || M != null && M > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", j, M, a, o, c, l, n), /*#__PURE__*/ S.createElement("div", sl({
		id: m ? `${m}` : void 0,
		className: y("recharts-responsive-container", h),
		style: ll(ll({}, v), {}, {
			width: a,
			height: o,
			minWidth: c,
			minHeight: l,
			maxHeight: u
		}),
		ref: x
	}, b), /*#__PURE__*/ S.createElement("div", { style: il({
		width: a,
		height: o
	}) }, /*#__PURE__*/ S.createElement(Cl, {
		width: j,
		height: M
	}, d)));
}), El = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = wl();
	if (Ys(n.width) && Ys(n.height)) return e.children;
	var r = al({
		width: e.width,
		height: e.height,
		aspect: e.aspect
	}), i = r.width, a = r.height, o = $c(void 0, void 0, {
		width: i,
		height: a,
		aspect: e.aspect,
		maxHeight: e.maxHeight
	}), s = o.calculatedWidth, c = o.calculatedHeight;
	return I(s) && I(c) ? /*#__PURE__*/ S.createElement(Cl, {
		width: s,
		height: c
	}, e.children) : /*#__PURE__*/ S.createElement(Tl, sl({}, e, {
		width: i,
		height: a,
		ref: t
	}));
}), Dl = () => {
	var e = Wc(), t = z(Vc), n = z(qc), r = z(Kc)?.padding;
	return !e || !n || !r ? t : {
		width: n.width - r.left - r.right,
		height: n.height - r.top - r.bottom,
		x: r.left,
		y: r.top
	};
}, Ol = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
}, kl = () => z(Bc) ?? Ol, Al = () => z(Cc), jl = () => z(wc), Ml = () => z((e) => e.layout.margin), Nl = (e) => e.layout.layoutType, Pl = () => z(Nl), Fl = () => {
	var e = Pl();
	if (e === "horizontal" || e === "vertical") return e;
}, Il = (e) => {
	var t = e.layout.layoutType;
	if (t === "centric" || t === "radial") return t;
}, Ll = () => Pl() !== void 0, Rl = (e) => {
	var t = ui(), n = Wc(), r = e.width, i = e.height, a = wl(), o = r, s = i;
	return a && (o = a.width > 0 ? a.width : r, s = a.height > 0 ? a.height : i), (0, S.useEffect)(() => {
		!n && Ys(o) && Ys(s) && t(Gs({
			width: o,
			height: s
		}));
	}, [
		t,
		n,
		o,
		s
	]), null;
}, zl = $o({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "bottom",
			itemSorter: "value",
			position: void 0,
			offset: 0
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(e, t) {
			e.size.width = t.payload.width, e.size.height = t.payload.height;
		},
		setLegendSettings(e, t) {
			e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
		},
		addLegendPayload: {
			reducer(e, t) {
				e.payload.push(H(t.payload));
			},
			prepare: U()
		},
		replaceLegendPayload: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Eo(e).payload.indexOf(H(r));
				a > -1 && (e.payload[a] = H(i));
			},
			prepare: U()
		},
		removeLegendPayload: {
			reducer(e, t) {
				var n = Eo(e).payload.indexOf(H(t.payload));
				n > -1 && e.payload.splice(n, 1);
			},
			prepare: U()
		}
	}
}), Bl = zl.actions, Vl = Bl.setLegendSize, Hl = Bl.setLegendSettings, Ul = Bl.addLegendPayload, Wl = Bl.replaceLegendPayload, Gl = Bl.removeLegendPayload, Kl = zl.reducer, ql = /* @__PURE__ */ o(((e) => {
	var t = p();
	t.useSyncExternalStore, t.useRef, t.useEffect, t.useMemo, t.useDebugValue;
}));
(/* @__PURE__ */ o(((e, t) => {
	t.exports = ql();
})))();
function Jl(e) {
	e();
}
function Yl() {
	let e = null, t = null;
	return {
		clear() {
			e = null, t = null;
		},
		notify() {
			Jl(() => {
				let t = e;
				for (; t;) t.callback(), t = t.next;
			});
		},
		get() {
			let t = [], n = e;
			for (; n;) t.push(n), n = n.next;
			return t;
		},
		subscribe(n) {
			let r = !0, i = t = {
				callback: n,
				next: null,
				prev: t
			};
			return i.prev ? i.prev.next = i : e = i, function() {
				r && e !== null && (r = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
			};
		}
	};
}
var Xl = {
	notify() {},
	get: () => []
};
function Zl(e, t) {
	let n, r = Xl, i = 0, a = !1;
	function o(e) {
		u();
		let t = r.subscribe(e), n = !1;
		return () => {
			n || (n = !0, t(), d());
		};
	}
	function s() {
		r.notify();
	}
	function c() {
		m.onStateChange && m.onStateChange();
	}
	function l() {
		return a;
	}
	function u() {
		i++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = Yl());
	}
	function d() {
		i--, n && i === 0 && (n(), n = void 0, r.clear(), r = Xl);
	}
	function f() {
		a || (a = !0, u());
	}
	function p() {
		a && (a = !1, d());
	}
	let m = {
		addNestedSub: o,
		notifyNestedSubs: s,
		handleChangeWrapper: c,
		isSubscribed: l,
		trySubscribe: f,
		tryUnsubscribe: p,
		getListeners: () => r
	};
	return m;
}
var Ql = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, $l = typeof navigator < "u" && navigator.product === "ReactNative", eu = Ql || $l ? S.useLayoutEffect : S.useEffect;
function tu(e, t) {
	return e === t ? e !== 0 || t !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function nu(e, t) {
	if (tu(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !tu(e[n[r]], t[n[r]])) return !1;
	return !0;
}
var ru = /* @__PURE__ */ Symbol.for("react-redux-context"), iu = typeof globalThis < "u" ? globalThis : {};
function au() {
	if (!S.createContext) return {};
	let e = iu[ru] ??= /* @__PURE__ */ new Map(), t = e.get(S.createContext);
	return t || (t = S.createContext(null), e.set(S.createContext, t)), t;
}
var ou = /* @__PURE__ */ au();
function su(e) {
	let { children: t, context: n, serverState: r, store: i } = e, a = S.useMemo(() => {
		let e = Zl(i);
		return {
			store: i,
			subscription: e,
			getServerState: r ? () => r : void 0
		};
	}, [i, r]), o = S.useMemo(() => i.getState(), [i]);
	eu(() => {
		let { subscription: e } = a;
		return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), o !== i.getState() && e.notifyNestedSubs(), () => {
			e.tryUnsubscribe(), e.onStateChange = void 0;
		};
	}, [a, o]);
	let s = n || ou;
	return /* @__PURE__ */ S.createElement(s.Provider, { value: a }, t);
}
var cu = su, lu = /* @__PURE__ */ new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle",
	"radius",
	"throttledEvents"
]);
function uu(e, t) {
	return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function du(e, t) {
	for (var n of /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])) if (lu.has(n)) {
		if (e[n] == null && t[n] == null) continue;
		if (!nu(e[n], t[n])) return !1;
	} else if (!uu(e[n], t[n])) return !1;
	return !0;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectLegendArea.js
var fu = B([
	Cc,
	wc,
	Ec
], (e, t, n) => ({
	x: n.left || 0,
	y: n.top || 0,
	width: Math.max(e - (n.left || 0) - (n.right || 0), 0),
	height: Math.max(t - (n.top || 0) - (n.bottom || 0), 0)
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/cartesianPositionToCSSTranslate.js
function pu(e, t) {
	return e === "start" && t === "start" ? "" : `translate(${e === "inherit" ? "0" : {
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[e]}, ${{
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[t] ?? "0"})`;
}
//#endregion
//#region node_modules/recharts/es6/component/Legend.js
var mu = h(), hu = ["contextPayload"];
function gu() {
	return gu = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gu.apply(null, arguments);
}
function _u(e, t) {
	return Su(e) || xu(e, t) || yu(e, t) || vu();
}
function vu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function yu(e, t) {
	if (e) {
		if (typeof e == "string") return bu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? bu(e, t) : void 0;
	}
}
function bu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function xu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Su(e) {
	if (Array.isArray(e)) return e;
}
function Cu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function wu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Cu(Object(n), !0).forEach(function(t) {
			Tu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Cu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Tu(e, t, n) {
	return (t = Eu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Eu(e) {
	var t = Du(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Du(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ou(e, t) {
	if (e == null) return {};
	var n, r, i = ku(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ku(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Au(e) {
	return e.value;
}
function ju(e) {
	var t = e.contextPayload, n = Ou(e, hu), r = ni(t, e.payloadUniqBy, Au), i = wu(wu({}, n), {}, { payload: r });
	return /*#__PURE__*/ S.isValidElement(e.content) ? /*#__PURE__*/ S.cloneElement(e.content, i) : typeof e.content == "function" ? /*#__PURE__*/ S.createElement(e.content, i) : /*#__PURE__*/ S.createElement(Kn, i);
}
function Mu(e) {
	return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function Nu(e, t) {
	return t == null ? null : ze(t) ? fu(e) : Vc(e);
}
function Pu(e, t, n) {
	return e === "top" ? { top: n.height + t } : e === "bottom" ? { top: -n.height - t } : e === "left" ? { left: n.width + t } : e === "right" ? { left: -n.width - t } : {};
}
function Fu(e, t, n, r, i, a) {
	var o = t.layout, s = t.align, c = t.verticalAlign, l, u;
	return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (l = s === "center" && o === "vertical" ? { left: ((r || 0) - a.width) / 2 } : s === "right" ? { right: n && n.right || 0 } : { left: n && n.left || 0 }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (u = c === "middle" ? { top: ((i || 0) - a.height) / 2 } : c === "bottom" ? { bottom: n && n.bottom || 0 } : { top: n && n.top || 0 }), wu(wu({}, l), u);
}
function Iu(e) {
	var t = e.align, n = e.layout, r = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, s = ui();
	return (0, S.useLayoutEffect)(() => {
		s(Hl({
			align: t,
			layout: n,
			verticalAlign: r,
			itemSorter: i,
			position: a,
			offset: o
		}));
	}, [
		s,
		t,
		n,
		r,
		i,
		a,
		o
	]), null;
}
function Lu(e) {
	var t = e.width, n = e.height, r = ui();
	return (0, S.useLayoutEffect)(() => {
		r(Vl({
			width: t,
			height: n
		}));
	}, [
		r,
		t,
		n
	]), (0, S.useLayoutEffect)(() => () => {
		r(Vl({
			width: 0,
			height: 0
		}));
	}, [r]), null;
}
function Ru(e, t, n, r) {
	return e === "vertical" && t != null ? { height: t } : e === "horizontal" ? { width: n || r } : null;
}
var zu = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	itemSorter: "value",
	labelStyle: {},
	layout: "auto",
	verticalAlign: "bottom",
	offset: 0
};
function Bu(e) {
	var t = Pn(e, zu), n = e.layout && e.layout !== "auto" ? e.layout : Mu(t.position), r = zi(), i = Ve(), a = Ml(), o = z((e) => Nu(e, t.position)), s = t.width, c = t.height, l = t.wrapperStyle, u = t.portal, d = u == null && (t.position == null || ze(t.position)), f = _u(Yi([r]), 2), p = f[0], m = f[1], h = Al(), g = jl();
	if (h == null || g == null || t.position != null && o == null) return null;
	var _ = Ru(n, c, s, h - (a?.left || 0) - (a?.right || 0)), v = t.position == null ? null : Le({
		viewBox: o ?? {
			x: 0,
			y: 0,
			width: h,
			height: g
		},
		position: t.position,
		offset: t.offset ?? 0
	}), y = Pu(t.position, t.offset ?? 0, p), b = n === "vertical" ? (o?.width ?? 0) / 2 : o?.width ?? 0, x = n === "horizontal" ? (o?.height ?? 0) / 2 : o?.height ?? 0, C = v ? {
		width: "max-content",
		height: "max-content",
		maxWidth: b,
		maxHeight: x,
		overflowY: "auto",
		top: v.y + (y.top ?? 0),
		left: v.x + (y.left ?? 0),
		transform: pu(v.horizontalAnchor, v.verticalAnchor)
	} : Fu(l, t, a, h, g, p), w = u ? l : wu(wu({
		position: "absolute",
		width: _?.width || s || "auto",
		height: _?.height || c || "auto"
	}, C), l), T = u ?? i;
	if (T == null || r == null) return null;
	var E = /*#__PURE__*/ S.createElement("div", {
		className: "recharts-legend-wrapper",
		style: w,
		ref: m
	}, /*#__PURE__*/ S.createElement(Iu, {
		layout: n,
		align: t.align,
		verticalAlign: t.verticalAlign,
		itemSorter: t.itemSorter,
		position: t.position,
		offset: t.offset
	}), d && /*#__PURE__*/ S.createElement(Lu, p), /*#__PURE__*/ S.createElement(ju, gu({}, t, { layout: n }, _, {
		margin: a,
		chartWidth: h,
		chartHeight: g,
		contextPayload: r
	})));
	return /*#__PURE__*/ (0, mu.createPortal)(E, T);
}
var Vu = /*#__PURE__*/ S.memo(Bu, du);
Vu.displayName = "Legend";
//#endregion
//#region node_modules/recharts/es6/component/DefaultTooltipContent.js
function Hu() {
	return Hu = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Hu.apply(null, arguments);
}
function Uu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Wu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Uu(Object(n), !0).forEach(function(t) {
			Gu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Uu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Gu(e, t, n) {
	return (t = Ku(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ku(e) {
	var t = qu(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function qu(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ju(e, t) {
	return $u(e) || Qu(e, t) || Xu(e, t) || Yu();
}
function Yu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Xu(e, t) {
	if (e) {
		if (typeof e == "string") return Zu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Zu(e, t) : void 0;
	}
}
function Zu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Qu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function $u(e) {
	if (Array.isArray(e)) return e;
}
function K(e) {
	return Array.isArray(e) && be(e[0]) && be(e[1]) ? e.join(" ~ ") : e;
}
var q = {
	separator: " : ",
	contentStyle: {
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	},
	itemStyle: {
		display: "block",
		paddingTop: 4,
		paddingBottom: 4,
		color: "#000"
	},
	labelStyle: {},
	accessibilityLayer: !1
};
function J(e, t) {
	return t == null ? e : Fi(e, t);
}
var Y = (e) => {
	var t = e.separator, n = t === void 0 ? q.separator : t, r = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? q.labelStyle : a, s = e.payload, c = e.formatter, l = e.itemSorter, u = e.wrapperClassName, d = e.labelClassName, f = e.label, p = e.labelFormatter, m = e.accessibilityLayer, h = m === void 0 ? q.accessibilityLayer : m, g = () => {
		if (s && s.length) {
			var e = {
				padding: 0,
				margin: 0
			}, t = J(s, l).map((e, t) => {
				if (!e || e.type === "none") return null;
				var r = e.formatter || c || K, a = e.value, o = e.name, l = a, u = o;
				if (r) {
					var d = r(a, o, e, t, s);
					if (Array.isArray(d)) {
						var f = Ju(d, 2);
						l = f[0], u = f[1];
					} else if (d != null) l = d;
					else return null;
				}
				var p = Wu(Wu({}, q.itemStyle), {}, { color: e.color || q.itemStyle.color }, i);
				return /*#__PURE__*/ S.createElement("li", {
					className: "recharts-tooltip-item",
					key: `tooltip-item-${t}`,
					style: p
				}, be(u) ? /*#__PURE__*/ S.createElement("span", { className: "recharts-tooltip-item-name" }, u) : null, be(u) ? /*#__PURE__*/ S.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null, /*#__PURE__*/ S.createElement("span", { className: "recharts-tooltip-item-value" }, l), /*#__PURE__*/ S.createElement("span", { className: "recharts-tooltip-item-unit" }, e.unit || ""));
			});
			return /*#__PURE__*/ S.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: e
			}, t);
		}
		return null;
	}, _ = Wu(Wu({}, q.contentStyle), r), v = Wu({ margin: 0 }, o), b = !De(f), x = b ? f : "", C = y("recharts-default-tooltip", u), w = y("recharts-tooltip-label", d);
	b && p && s != null && (x = p(f, s));
	var T = h ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /*#__PURE__*/ S.createElement("div", Hu({
		className: C,
		style: _
	}, T), /*#__PURE__*/ S.createElement("p", {
		className: w,
		style: v
	}, /*#__PURE__*/ S.isValidElement(x) ? x : `${x}`), g());
}, X = "recharts-tooltip-wrapper", ed = { visibility: "hidden" };
function td(e) {
	var t = e.coordinate, n = e.translateX, r = e.translateY;
	return y(X, {
		[`${X}-right`]: I(n) && t && I(t.x) && n >= t.x,
		[`${X}-left`]: I(n) && t && I(t.x) && n < t.x,
		[`${X}-bottom`]: I(r) && t && I(t.y) && r >= t.y,
		[`${X}-top`]: I(r) && t && I(t.y) && r < t.y
	});
}
function nd(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, i = e.offset, a = e.position, o = e.reverseDirection, s = e.tooltipDimension, c = e.viewBox, l = e.viewBoxDimension;
	if (a && I(a[r])) return a[r];
	var u = n[r] - s - (i > 0 ? i : 0), d = n[r] + i;
	if (t[r]) return o[r] ? u : d;
	var f = c[r];
	return f == null ? 0 : o[r] ? Math.max(u < f ? d : u, f) : l == null ? 0 : d + s > f + l ? Math.max(u, f) : Math.max(d, f);
}
function rd(e) {
	var t = e.translateX, n = e.translateY;
	return { transform: e.useTranslate3d ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)` };
}
function id(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, s = e.tooltipBox, c = e.useTranslate3d, l = e.viewBox, u, d, f;
	return s && s.height > 0 && s.width > 0 && n ? (d = nd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "x",
		offset: i,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.width,
		viewBox: l,
		viewBoxDimension: l.width
	}), f = nd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "y",
		offset: r,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.height,
		viewBox: l,
		viewBoxDimension: l.height
	}), u = rd({
		translateX: d,
		translateY: f,
		useTranslate3d: c
	})) : u = ed, {
		cssProperties: u,
		cssClasses: td({
			translateX: d,
			translateY: f,
			coordinate: n
		})
	};
}
var ad = {
	devToolsEnabled: !0,
	isSsr: !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
};
//#endregion
//#region node_modules/recharts/es6/util/usePrefersReducedMotion.js
function od(e, t) {
	return dd(e) || ud(e, t) || cd(e, t) || sd();
}
function sd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function cd(e, t) {
	if (e) {
		if (typeof e == "string") return ld(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ld(e, t) : void 0;
	}
}
function ld(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ud(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function dd(e) {
	if (Array.isArray(e)) return e;
}
function fd() {
	var e = od((0, S.useState)(() => ad.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), 2), t = e[0], n = e[1];
	return (0, S.useEffect)(() => {
		if (window.matchMedia) {
			var e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
				n(e.matches);
			};
			return e.addEventListener("change", t), () => {
				e.removeEventListener("change", t);
			};
		}
	}, []), t;
}
//#endregion
//#region node_modules/recharts/es6/component/TooltipBoundingBox.js
function pd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function md(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? pd(Object(n), !0).forEach(function(t) {
			hd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hd(e, t, n) {
	return (t = gd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gd(e) {
	var t = _d(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _d(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function vd(e, t) {
	return Cd(e) || Sd(e, t) || bd(e, t) || yd();
}
function yd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function bd(e, t) {
	if (e) {
		if (typeof e == "string") return xd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xd(e, t) : void 0;
	}
}
function xd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Sd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Cd(e) {
	if (Array.isArray(e)) return e;
}
function wd(e) {
	if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
		var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
		return `transform ${e.animationDuration}ms ${t}`;
	}
}
function Td(e) {
	var t = fd(), n = vd(S.useState(() => ({
		dismissed: !1,
		dismissedAtCoordinate: {
			x: 0,
			y: 0
		}
	})), 2), r = n[0], i = n[1];
	S.useEffect(() => {
		var t = (t) => {
			t.key === "Escape" && i({
				dismissed: !0,
				dismissedAtCoordinate: {
					x: e.coordinate?.x ?? 0,
					y: e.coordinate?.y ?? 0
				}
			});
		};
		return document.addEventListener("keydown", t), () => {
			document.removeEventListener("keydown", t);
		};
	}, [e.coordinate?.x, e.coordinate?.y]), r.dismissed && ((e.coordinate?.x ?? 0) !== r.dismissedAtCoordinate.x || (e.coordinate?.y ?? 0) !== r.dismissedAtCoordinate.y) && i(md(md({}, r), {}, { dismissed: !1 }));
	var a = id({
		allowEscapeViewBox: e.allowEscapeViewBox,
		coordinate: e.coordinate,
		offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
		offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
		position: e.position,
		reverseDirection: e.reverseDirection,
		tooltipBox: e.lastBoundingBox,
		useTranslate3d: e.useTranslate3d,
		viewBox: e.viewBox
	}), o = a.cssClasses, s = a.cssProperties, c = md(md({}, e.hasPortalFromProps ? {} : md(md({ transition: wd({
		prefersReducedMotion: t,
		isAnimationActive: e.isAnimationActive,
		active: e.active,
		animationDuration: e.animationDuration,
		animationEasing: e.animationEasing
	}) }, s), {}, {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		left: 0
	})), {}, { visibility: !r.dismissed && e.active && e.hasPayload ? "visible" : "hidden" }, e.wrapperStyle);
	return /*#__PURE__*/ S.createElement("div", {
		xmlns: "http://www.w3.org/1999/xhtml",
		tabIndex: -1,
		className: o,
		style: c,
		ref: e.innerRef
	}, e.children);
}
var Ed = /*#__PURE__*/ S.memo(Td), Dd = () => z((e) => e.rootProps.accessibilityLayer) ?? !0;
//#endregion
//#region node_modules/recharts/es6/shape/Curve.js
function Od() {
	return Od = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Od.apply(null, arguments);
}
function kd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ad(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? kd(Object(n), !0).forEach(function(t) {
			jd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function jd(e, t, n) {
	return (t = Md(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Md(e) {
	var t = Nd(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Nd(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Pd = {
	curveBasisClosed: Ft,
	curveBasisOpen: Lt,
	curveBasis: Nt,
	curveBumpX: lt,
	curveBumpY: ut,
	curveLinearClosed: zt,
	curveLinear: rt,
	curveMonotoneX: R,
	curveMonotoneY: qt,
	curveNatural: Xt,
	curveStep: Qt,
	curveStepAfter: en,
	curveStepBefore: $t
}, Fd = (e) => G(e.x) && G(e.y), Id = (e) => e.base != null && Fd(e.base) && Fd(e), Ld = (e) => e.x, Rd = (e) => e.y, zd = (e, t) => {
	if (typeof e == "function") return e;
	var n = `curve${Oe(e)}`;
	if ((n === "curveMonotone" || n === "curveBump") && t) {
		var r = Pd[`${n}${t === "vertical" ? "Y" : "X"}`];
		if (r) return r;
	}
	return Pd[n] || rt;
}, Bd = {
	connectNulls: !1,
	type: "linear"
}, Vd = (e) => {
	var t = e.type, n = t === void 0 ? Bd.type : t, r = e.points, i = r === void 0 ? [] : r, a = e.baseLine, o = e.layout, s = e.connectNulls, c = s === void 0 ? Bd.connectNulls : s, l = zd(n, o), u = c ? i.filter(Fd) : i;
	if (Array.isArray(a)) {
		var d, f = i.map((e, t) => Ad(Ad({}, e), {}, { base: a[t] }));
		return d = o === "vertical" ? st().y(Rd).x1(Ld).x0((e) => e.base.x) : st().x(Ld).y1(Rd).y0((e) => e.base.y), d.defined(Id).curve(l)(c ? f.filter(Id) : f);
	}
	return (o === "vertical" && I(a) ? st().y(Rd).x1(Ld).x0(a) : I(a) ? st().x(Ld).y1(Rd).y0(a) : ot().x(Ld).y(Rd)).defined(Fd).curve(l)(u);
}, Hd = (e) => {
	var t = e.className, n = e.points, r = e.path, i = e.pathRef, a = Pl();
	if ((!n || !n.length) && !r) return null;
	var o = {
		type: e.type,
		points: e.points,
		baseLine: e.baseLine,
		layout: e.layout || a,
		connectNulls: e.connectNulls
	}, s = n && n.length ? Vd(o) : r;
	return /*#__PURE__*/ S.createElement("path", Od({}, E(e), En(e), {
		className: y("recharts-curve", t),
		d: s === null ? void 0 : s,
		ref: i
	}));
}, Ud = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function Wd() {
	return Wd = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Wd.apply(null, arguments);
}
function Gd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Kd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Gd(Object(n), !0).forEach(function(t) {
			qd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qd(e, t, n) {
	return (t = Jd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Jd(e) {
	var t = Yd(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Yd(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Xd(e, t) {
	if (e == null) return {};
	var n, r, i = Zd(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Zd(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Qd = (e, t, n, r, i, a) => `M${e},${i}v${r}M${a},${t}h${n}`, $d = (e) => {
	var t = e.x, n = t === void 0 ? 0 : t, r = e.y, i = r === void 0 ? 0 : r, a = e.top, o = a === void 0 ? 0 : a, s = e.left, c = s === void 0 ? 0 : s, l = e.width, u = l === void 0 ? 0 : l, d = e.height, f = d === void 0 ? 0 : d, p = e.className, m = Xd(e, Ud), h = Kd({
		x: n,
		y: i,
		top: o,
		left: c,
		width: u,
		height: f
	}, m);
	return !I(n) || !I(i) || !I(u) || !I(f) || !I(o) || !I(c) ? null : /*#__PURE__*/ S.createElement("path", Wd({}, O(h), {
		className: y("recharts-cross", p),
		d: Qd(n, i, u, f, o, c)
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function ef(e, t, n, r) {
	var i = r / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: e === "horizontal" ? t.x - i : n.left + .5,
		y: e === "horizontal" ? n.top + .5 : t.y - i,
		width: e === "horizontal" ? r : n.width - 1,
		height: e === "horizontal" ? n.height - 1 : r
	};
}
var tf = (e, t) => [
	0,
	3 * e,
	3 * t - 6 * e,
	3 * e - 3 * t + 1
], nf = (e, t) => e.map((e, n) => e * t ** n).reduce((e, t) => e + t), rf = (e, t) => (n) => nf(tf(e, t), n), af = (e, t) => (n) => nf([...tf(e, t).map((e, t) => e * t).slice(1), 0], n), of = (e) => {
	var t, n = e.split("(");
	if (n.length !== 2 || n[0] !== "cubic-bezier") return null;
	var r = (t = n[1]) == null || (t = t.split(")")[0]) == null ? void 0 : t.split(",");
	if (r == null || r.length !== 4) return null;
	var i = r.map((e) => parseFloat(e));
	return [
		i[0],
		i[1],
		i[2],
		i[3]
	];
}, sf = function() {
	var e = [...arguments];
	if (e.length === 1) switch (e[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var t = of(e[0]);
			if (t) return t;
	}
	return e.length === 4 ? e : [
		0,
		0,
		1,
		1
	];
}, cf = (e, t, n, r) => {
	var i = rf(e, n), a = rf(t, r), o = af(e, n), s = (e) => e > 1 ? 1 : e < 0 ? 0 : e, c = (e) => {
		for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
			var c = i(n) - t, l = o(n);
			if (Math.abs(c - t) < 1e-4 || l < 1e-4) return a(n);
			n = s(n - c / l);
		}
		return a(n);
	};
	return c.isStepper = !1, c;
}, lf = function() {
	return cf(...sf(...arguments));
}, uf = function() {
	for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.stiff, n = t === void 0 ? 100 : t, r = e.damping, i = r === void 0 ? 8 : r, a = e.dt, o = a === void 0 ? 16.67 : a, s = 1, c = [0], l = 0, u = 0, d = 1e4, f = 0; f < d;) {
		var p = -(l - s) * n, m = u * i;
		if (u += (p - m) * o / 1e3, l += u * o / 1e3, c.push(l), Math.abs(l - s) < 1e-4 && Math.abs(u) < 1e-4) break;
		f++;
	}
	c[c.length - 1] = s;
	var h = c.length - 1;
	return (e) => {
		if (e <= 0) return 0;
		if (e >= 1) return s;
		var t = e * h, n = Math.floor(t), r = t - n;
		return (c[n] ?? 0) + ((c[n + 1] ?? 0) - (c[n] ?? 0)) * r;
	};
}, df = (e) => {
	if (typeof e == "string") switch (e) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return lf(e);
		case "spring": return uf();
		default: if (e.split("(")[0] === "cubic-bezier") return lf(e);
	}
	return typeof e == "function" ? e : null;
}, ff = /*#__PURE__*/ (0, S.createContext)((e, t, n) => {
	var r, i = (a) => {
		var o = t.tick(a);
		if (t.getState() === "active") {
			if (n(t.getInterpolated()), t.getProgress() === 1) {
				t.complete(), r = void 0;
				return;
			}
			r = e.setTimeout(i, o);
			return;
		}
		r = e.setTimeout(i, o);
	};
	return r = e.setTimeout(i, 0), () => r?.();
});
ff.Provider;
function pf(e) {
	var t = (0, S.useContext)(ff);
	return (0, S.useMemo)(() => e ?? t, [e, t]);
}
//#endregion
//#region node_modules/recharts/es6/animation/AnimationHandle.js
function mf(e, t, n) {
	return (t = hf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hf(e) {
	var t = gf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var _f = "init", vf = "pending", yf = "active", bf = "completed";
function xf(e) {
	return Math.max(0, e);
}
var Sf = class {
	getAnimationStartedTime() {
		return this.animationStartedTime;
	}
	getBeginStartedTime() {
		return this.beginStartedTime;
	}
	constructor(e) {
		var t;
		mf(this, "state", _f), this.animationId = e.animationId, this.onAnimationEnd = e.onAnimationEnd, this.animationDuration = xf(e.animationDuration), this.animationBegin = xf(e.animationBegin), this.progress = 0, this.from = e.from, this.to = e.to, this.easing = e.easing, (t = e.onAnimationStart) == null || t.call(e);
	}
	getState() {
		return this.state;
	}
	getEasing() {
		return this.easing;
	}
	getAnimationDuration() {
		return this.animationDuration;
	}
	tick(e) {
		if (this.getState() === _f) return this.state = vf, this.beginStartedTime = e, this.animationBegin;
		if (this.getState() === vf) {
			if (this.beginStartedTime == null) throw Error();
			var t = e - this.beginStartedTime;
			return t >= this.animationBegin ? (this.state = yf, this.animationStartedTime = e, this.nextAnimationUpdate(0)) : xf(this.animationBegin - t);
		}
		if (this.getState() === yf) {
			if (this.animationStartedTime == null) throw Error();
			var n = e - this.animationStartedTime;
			return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
		}
		return 0;
	}
	setProgress(e) {
		this.progress = Math.min(1, Math.max(0, e));
	}
	getProgress() {
		return this.progress;
	}
	complete() {
		if (this.progress = 1, this.state === "active") {
			var e;
			(e = this.onAnimationEnd) == null || e.call(this);
		}
		this.state = bf;
	}
	getFrom() {
		return this.from;
	}
	getTo() {
		return this.to;
	}
	getAnimationId() {
		return this.animationId;
	}
	getAnimationBegin() {
		return this.animationBegin;
	}
}, Cf = class extends Sf {
	nextAnimationUpdate() {
		return 0;
	}
	getInterpolated() {
		return this.easing(Te(this.getFrom(), this.getTo(), this.getProgress()));
	}
}, wf = class {
	setTimeout(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), r = null, i = (a) => {
			a - n >= t ? e(a) : r = requestAnimationFrame(i);
		};
		return r = requestAnimationFrame(i), () => {
			r != null && cancelAnimationFrame(r);
		};
	}
};
//#endregion
//#region node_modules/recharts/es6/animation/JavascriptAnimate.js
function Tf(e, t) {
	return Af(e) || kf(e, t) || Df(e, t) || Ef();
}
function Ef() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Df(e, t) {
	if (e) {
		if (typeof e == "string") return Of(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Of(e, t) : void 0;
	}
}
function Of(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function kf(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Af(e) {
	if (Array.isArray(e)) return e;
}
var jf = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: !0,
	canBegin: !0,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
}, Mf = 0, Nf = 1;
function Pf(e) {
	var t = Pn(e, jf), n = t.animationId, r = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, s = t.begin, c = t.onAnimationEnd, l = t.onAnimationStart, u = t.children, d = fd(), f = r === "auto" ? !ad.isSsr && !d : r, p = pf(t.animationController), m = Tf((0, S.useState)(f ? Mf : Nf), 2), h = m[0], g = m[1];
	return (0, S.useEffect)(() => {
		f || g(Nf);
	}, [f]), (0, S.useEffect)(() => {
		var e = df(o);
		return !f || !i || e == null ? Ae : p(new wf(), new Cf({
			animationId: n,
			easing: e,
			animationDuration: a,
			animationBegin: s,
			onAnimationStart: l,
			onAnimationEnd: c,
			from: Mf,
			to: Nf
		}), g);
	}, [
		p,
		n,
		f,
		i,
		a,
		o,
		s,
		l,
		c
	]), u(Number(h));
}
//#endregion
//#region node_modules/recharts/es6/util/useAnimationId.js
function Ff(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", n = (0, S.useRef)(Se(t)), r = (0, S.useRef)(e);
	return r.current !== e && (n.current = Se(t), r.current = e), n.current;
}
//#endregion
//#region node_modules/recharts/es6/animation/util.js
var If = (e) => e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`), Lf = (e, t, n) => e.map((e) => `${If(e)} ${t}ms ${n}`).join(","), Rf = ["radius"], zf = ["radius"], Bf, Vf, Hf, Z, Uf, Wf, Gf, Kf, qf, Jf;
function Yf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yf(Object(n), !0).forEach(function(t) {
			Zf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Zf(e, t, n) {
	return (t = Qf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Qf(e) {
	var t = $f(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function $f(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ep() {
	return ep = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ep.apply(null, arguments);
}
function tp(e, t) {
	if (e == null) return {};
	var n, r, i = np(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function np(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function rp(e, t) {
	return cp(e) || sp(e, t) || ap(e, t) || ip();
}
function ip() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ap(e, t) {
	if (e) {
		if (typeof e == "string") return op(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? op(e, t) : void 0;
	}
}
function op(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function sp(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function cp(e) {
	if (Array.isArray(e)) return e;
}
function lp(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var up = (e, t, n, r, i) => {
	var a = P(n), o = P(r), s = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), c = o >= 0 ? 1 : -1, l = a >= 0 ? 1 : -1, u = +(o >= 0 && a >= 0 || o < 0 && a < 0), d;
	if (s > 0 && Array.isArray(i)) {
		for (var f = [
			0,
			0,
			0,
			0
		], p = 0, m = 4; p < m; p++) {
			var h = i[p] ?? 0;
			f[p] = h > s ? s : h;
		}
		d = F(Bf ||= lp([
			"M",
			",",
			""
		]), e, t + c * f[0]), f[0] > 0 && (d += F(Vf ||= lp([
			"A ",
			",",
			",0,0,",
			",",
			",",
			""
		]), f[0], f[0], u, e + l * f[0], t)), d += F(Hf ||= lp([
			"L ",
			",",
			""
		]), e + n - l * f[1], t), f[1] > 0 && (d += F(Z ||= lp([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[1], f[1], u, e + n, t + c * f[1])), d += F(Uf ||= lp([
			"L ",
			",",
			""
		]), e + n, t + r - c * f[2]), f[2] > 0 && (d += F(Wf ||= lp([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[2], f[2], u, e + n - l * f[2], t + r)), d += F(Gf ||= lp([
			"L ",
			",",
			""
		]), e + l * f[3], t + r), f[3] > 0 && (d += F(Kf ||= lp([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[3], f[3], u, e, t + r - c * f[3])), d += "Z";
	} else if (s > 0 && i === +i && i > 0) {
		var g = Math.min(s, i);
		d = F(qf ||= lp(/* @__PURE__ */ "M .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,. Z".split(".")), e, t + c * g, g, g, u, e + l * g, t, e + n - l * g, t, g, g, u, e + n, t + c * g, e + n, t + r - c * g, g, g, u, e + n - l * g, t + r, e + l * g, t + r, g, g, u, e, t + r - c * g);
	} else d = F(Jf ||= lp([
		"M ",
		",",
		" h ",
		" v ",
		" h ",
		" Z"
	]), e, t, n, r, -n);
	return d;
}, dp = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: !1,
	isUpdateAnimationActive: !1,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
}, fp = (e) => {
	var t = Pn(e, dp), n = (0, S.useRef)(null), r = rp((0, S.useState)(-1), 2), i = r[0], a = r[1];
	(0, S.useEffect)(() => {
		if (n.current && n.current.getTotalLength) try {
			var e = n.current.getTotalLength();
			e && a(e);
		} catch {}
	}, []);
	var o = t.x, s = t.y, c = t.width, l = t.height, u = t.radius, d = t.className, f = t.animationEasing, p = t.animationDuration, m = t.animationBegin, h = t.isAnimationActive, g = t.isUpdateAnimationActive, _ = (0, S.useRef)(c), v = (0, S.useRef)(l), b = (0, S.useRef)(o), x = (0, S.useRef)(s), C = Ff((0, S.useMemo)(() => ({
		x: o,
		y: s,
		width: c,
		height: l,
		radius: u
	}), [
		o,
		s,
		c,
		l,
		u
	]), "rectangle-");
	if (o !== +o || s !== +s || c !== +c || l !== +l || c === 0 || l === 0) return null;
	var w = y("recharts-rectangle", d);
	if (!g) {
		var T = O(t);
		T.radius;
		var E = tp(T, Rf);
		return /*#__PURE__*/ S.createElement("path", ep({}, E, {
			x: P(o),
			y: P(s),
			width: P(c),
			height: P(l),
			radius: typeof u == "number" ? u : void 0,
			className: w,
			d: up(o, s, c, l, u)
		}));
	}
	var D = _.current, k = v.current, A = b.current, j = x.current, M = `0px ${i === -1 ? 1 : i}px`, N = `${i}px ${i}px`, ee = Lf(["strokeDasharray"], p, typeof f == "string" ? f : dp.animationEasing);
	return /*#__PURE__*/ S.createElement(Pf, {
		animationId: C,
		key: C,
		canBegin: i > 0,
		duration: p,
		easing: f,
		isActive: g,
		begin: m
	}, (e) => {
		var r = Te(D, c, e), i = Te(k, l, e), a = Te(A, o, e), d = Te(j, s, e);
		n.current && (_.current = r, v.current = i, b.current = a, x.current = d);
		var f = h ? e > 0 ? {
			transition: ee,
			strokeDasharray: N
		} : { strokeDasharray: M } : { strokeDasharray: N }, p = O(t);
		p.radius;
		var m = tp(p, zf);
		return /*#__PURE__*/ S.createElement("path", ep({}, m, {
			radius: typeof u == "number" ? u : void 0,
			className: w,
			d: up(a, d, r, i, u),
			ref: n,
			style: Xf(Xf({}, f), t.style)
		}));
	});
};
//#endregion
//#region node_modules/recharts/es6/util/PolarUtils.js
function pp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function mp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? pp(Object(n), !0).forEach(function(t) {
			hp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hp(e, t, n) {
	return (t = gp(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gp(e) {
	var t = _p(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _p(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var vp = Math.PI / 180, yp = (e) => e * 180 / Math.PI, bp = (e, t, n, r) => ({
	x: e + Math.cos(-vp * r) * n,
	y: t + Math.sin(-vp * r) * n
}), xp = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(e - (n.left || 0) - (n.right || 0)), Math.abs(t - (n.top || 0) - (n.bottom || 0))) / 2;
}, Sp = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
}, Cp = (e, t) => {
	var n = e.x, r = e.y, i = t.cx, a = t.cy, o = Sp({
		x: n,
		y: r
	}, {
		x: i,
		y: a
	});
	if (o <= 0) return {
		radius: o,
		angle: 0
	};
	var s = (n - i) / o, c = Math.acos(s);
	return r > a && (c = 2 * Math.PI - c), {
		radius: o,
		angle: yp(c),
		angleInRadian: c
	};
}, wp = (e) => {
	var t = e.startAngle, n = e.endAngle, r = Math.floor(t / 360), i = Math.floor(n / 360), a = Math.min(r, i);
	return {
		startAngle: t - a * 360,
		endAngle: n - a * 360
	};
}, Tp = (e, t) => {
	var n = t.startAngle, r = t.endAngle, i = Math.floor(n / 360), a = Math.floor(r / 360);
	return e + Math.min(i, a) * 360;
}, Ep = (e, t) => {
	var n = e.relativeX, r = e.relativeY, i = Cp({
		x: n,
		y: r
	}, t), a = i.radius, o = i.angle, s = t.innerRadius, c = t.outerRadius;
	if (a < s || a > c || a === 0) return null;
	var l = wp(t), u = l.startAngle, d = l.endAngle, f = o, p;
	if (u <= d) {
		for (; f > d;) f -= 360;
		for (; f < u;) f += 360;
		p = f >= u && f <= d;
	} else {
		for (; f > u;) f -= 360;
		for (; f < d;) f += 360;
		p = f >= d && f <= u;
	}
	return p ? mp(mp({}, t), {}, {
		radius: a,
		angle: Tp(f, t)
	}) : null;
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
function Dp(e) {
	var t = e.cx, n = e.cy, r = e.radius, i = e.startAngle, a = e.endAngle;
	return {
		points: [bp(t, n, r, i), bp(t, n, r, a)],
		cx: t,
		cy: n,
		radius: r,
		startAngle: i,
		endAngle: a
	};
}
//#endregion
//#region node_modules/recharts/es6/shape/Sector.js
var Op, kp, Ap, jp, Mp, Np, Pp;
function Fp() {
	return Fp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Fp.apply(null, arguments);
}
function Ip(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Lp = (e, t) => _e(t - e) * Math.min(Math.abs(t - e), 359.999), Rp = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.angle, a = e.sign, o = e.isExternal, s = e.cornerRadius, c = e.cornerIsExternal, l = s * (o ? 1 : -1) + r, u = Math.asin(s / l) / vp, d = c ? i : i + a * u, f = bp(t, n, l, d), p = bp(t, n, r, d), m = c ? i - a * u : i;
	return {
		center: f,
		circleTangency: p,
		lineTangency: bp(t, n, l * Math.cos(u * vp), m),
		theta: u
	};
}, zp = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = Lp(a, o), c = a + s, l = bp(t, n, i, a), u = bp(t, n, i, c), d = F(Op ||= Ip([
		"M ",
		",",
		"\n    A ",
		",",
		",0,\n    ",
		",",
		",\n    ",
		",",
		"\n  "
	]), l.x, l.y, i, i, +(Math.abs(s) > 180), +(a > c), u.x, u.y);
	if (r > 0) {
		var f = bp(t, n, r, a), p = bp(t, n, r, c);
		d += F(kp ||= Ip([
			"L ",
			",",
			"\n            A ",
			",",
			",0,\n            ",
			",",
			",\n            ",
			",",
			" Z"
		]), p.x, p.y, r, r, +(Math.abs(s) > 180), +(a <= c), f.x, f.y);
	} else d += F(Ap ||= Ip([
		"L ",
		",",
		" Z"
	]), t, n);
	return d;
}, Bp = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, s = e.cornerIsExternal, c = e.startAngle, l = e.endAngle, u = _e(l - c), d = Rp({
		cx: t,
		cy: n,
		radius: i,
		angle: c,
		sign: u,
		cornerRadius: a,
		cornerIsExternal: s
	}), f = d.circleTangency, p = d.lineTangency, m = d.theta, h = Rp({
		cx: t,
		cy: n,
		radius: i,
		angle: l,
		sign: -u,
		cornerRadius: a,
		cornerIsExternal: s
	}), g = h.circleTangency, _ = h.lineTangency, v = h.theta, y = s ? Math.abs(c - l) : Math.abs(c - l) - m - v;
	if (y < 0) return o ? F(jp ||= Ip([
		"M ",
		",",
		"\n        a",
		",",
		",0,0,1,",
		",0\n        a",
		",",
		",0,0,1,",
		",0\n      "
	]), p.x, p.y, a, a, a * 2, a, a, -a * 2) : zp({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: c,
		endAngle: l
	});
	var b = F(Mp ||= Ip([
		"M ",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n    A",
		",",
		",0,",
		",",
		",",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n  "
	]), p.x, p.y, a, a, +(u < 0), f.x, f.y, i, i, +(y > 180), +(u < 0), g.x, g.y, a, a, +(u < 0), _.x, _.y);
	if (r > 0) {
		var x = Rp({
			cx: t,
			cy: n,
			radius: r,
			angle: c,
			sign: u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), S = x.circleTangency, C = x.lineTangency, w = x.theta, T = Rp({
			cx: t,
			cy: n,
			radius: r,
			angle: l,
			sign: -u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), E = T.circleTangency, D = T.lineTangency, O = T.theta, k = s ? Math.abs(c - l) : Math.abs(c - l) - w - O;
		if (k < 0 && a === 0) return `${b}L${t},${n}Z`;
		b += F(Np ||= Ip([
			"L",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"\n      A",
			",",
			",0,",
			",",
			",",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"Z"
		]), D.x, D.y, a, a, +(u < 0), E.x, E.y, r, r, +(k > 180), +(u > 0), S.x, S.y, a, a, +(u < 0), C.x, C.y);
	} else b += F(Pp ||= Ip([
		"L",
		",",
		"Z"
	]), t, n);
	return b;
}, Vp = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: !1,
	cornerIsExternal: !1
}, Hp = (e) => {
	var t = Pn(e, Vp), n = t.cx, r = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, s = t.forceCornerRadius, c = t.cornerIsExternal, l = t.startAngle, u = t.endAngle, d = t.className;
	if (a < i || l === u) return null;
	var f = y("recharts-sector", d), p = a - i, m = Ce(o, p, 0, !0), h = m > 0 && Math.abs(l - u) < 360 ? Bp({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		cornerRadius: Math.min(m, p / 2),
		forceCornerRadius: s,
		cornerIsExternal: c,
		startAngle: l,
		endAngle: u
	}) : zp({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		startAngle: l,
		endAngle: u
	});
	return /*#__PURE__*/ S.createElement("path", Fp({}, O(t), {
		className: f,
		d: h
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorPoints.js
function Up(e, t, n) {
	if (e === "horizontal") return [{
		x: t.x,
		y: n.top
	}, {
		x: t.x,
		y: n.top + n.height
	}];
	if (e === "vertical") return [{
		x: n.left,
		y: t.y
	}, {
		x: n.left + n.width,
		y: t.y
	}];
	if (Tn(t)) {
		if (e === "centric") {
			var r = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, s = t.angle, c = bp(r, i, a, s), l = bp(r, i, o, s);
			return [{
				x: c.x,
				y: c.y
			}, {
				x: l.x,
				y: l.y
			}];
		}
		return Dp(t);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function Wp(e) {
	return ue(e) ? NaN : Number(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function Gp(e) {
	return e ? (e = Wp(e), e === Infinity || e === -Infinity ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/math/range.mjs
function Kp(e, t, n) {
	n && typeof n != "number" && Oi(e, t, n) && (t = n = void 0), e = Gp(e), t === void 0 ? (t = e, e = 0) : t = Gp(t), n = n === void 0 ? e < t ? 1 : -1 : Gp(n);
	let r = Math.max(Math.ceil((t - e) / (n || 1)), 0), i = Array(r);
	for (let t = 0; t < r; t++) i[t] = e, e += n;
	return i;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/dataSelectors.js
var qp = (e) => e.chartData, Jp = B([qp], (e) => {
	var t = e.chartData == null ? 0 : e.chartData.length - 1;
	return {
		chartData: e.chartData,
		computedData: e.computedData,
		dataEndIndex: t,
		dataStartIndex: 0
	};
}), Yp = (e, t, n, r) => r ? Jp(e) : qp(e), Xp = (e, t, n) => n ? Jp(e) : qp(e), Zp = B([Yp], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
B([Jp], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
var Qp = B([qp], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
//#endregion
//#region node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
function $p(e, t) {
	return im(e) || rm(e, t) || tm(e, t) || em();
}
function em() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function tm(e, t) {
	if (e) {
		if (typeof e == "string") return nm(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? nm(e, t) : void 0;
	}
}
function nm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function rm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function im(e) {
	if (Array.isArray(e)) return e;
}
function am(e) {
	if (Array.isArray(e) && e.length === 2) {
		var t = $p(e, 2), n = t[0], r = t[1];
		if (G(n) && G(r)) return !0;
	}
	return !1;
}
function om(e, t, n) {
	return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function sm(e, t) {
	if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
		var n = $p(e, 2), r = n[0], i = n[1], a, o;
		if (G(r)) a = r;
		else if (typeof r == "function") return;
		if (G(i)) o = i;
		else if (typeof i == "function") return;
		var s = [a, o];
		if (am(s)) return s;
	}
}
function cm(e, t, n) {
	if (n || t != null) {
		if (typeof e == "function" && t != null) try {
			var r = e(t, n);
			if (am(r)) return om(r, t, n);
		} catch {}
		if (Array.isArray(e) && e.length === 2) {
			var i = $p(e, 2), a = i[0], o = i[1], s, c;
			if (a === "auto") t != null && (s = Math.min(...t));
			else if (I(a)) s = a;
			else if (typeof a == "function") try {
				t != null && (s = a(t?.[0]));
			} catch {}
			else if (typeof a == "string" && gc.test(a)) {
				var l = gc.exec(a);
				if (l == null || l[1] == null || t == null) s = void 0;
				else {
					var u = +l[1];
					s = t[0] - u;
				}
			} else s = t?.[0];
			if (o === "auto") t != null && (c = Math.max(...t));
			else if (I(o)) c = o;
			else if (typeof o == "function") try {
				t != null && (c = o(t?.[1]));
			} catch {}
			else if (typeof o == "string" && _c.test(o)) {
				var d = _c.exec(o);
				if (d == null || d[1] == null || t == null) c = void 0;
				else {
					var f = +d[1];
					c = t[1] + f;
				}
			} else c = t?.[1];
			var p = [s, c];
			if (am(p)) return t == null ? p : om(p, t, n);
		}
	}
}
//#endregion
//#region node_modules/recharts/es6/util/scale/util/arithmetic.js
var Q = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	(function(e) {
		var n = 1e9, r = {
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
		}, i = !0, a = "[DecimalError] ", o = a + "Invalid argument: ", s = a + "Exponent out of range: ", c = Math.floor, l = Math.pow, u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, d, f = 1e7, p = 7, m = 9007199254740991, h = c(m / p), g = {};
		g.absoluteValue = g.abs = function() {
			var e = new this.constructor(this);
			return e.s &&= 1, e;
		}, g.comparedTo = g.cmp = function(e) {
			var t, n, r, i, a = this;
			if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
			if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
			for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t) if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
			return r === i ? 0 : r > i ^ a.s < 0 ? 1 : -1;
		}, g.decimalPlaces = g.dp = function() {
			var e = this, t = e.d.length - 1, n = (t - e.e) * p;
			if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
			return n < 0 ? 0 : n;
		}, g.dividedBy = g.div = function(e) {
			return b(this, new this.constructor(e));
		}, g.dividedToIntegerBy = g.idiv = function(e) {
			var t = this, n = t.constructor;
			return D(b(t, new n(e), 0, 1), n.precision);
		}, g.equals = g.eq = function(e) {
			return !this.cmp(e);
		}, g.exponent = function() {
			return S(this);
		}, g.greaterThan = g.gt = function(e) {
			return this.cmp(e) > 0;
		}, g.greaterThanOrEqualTo = g.gte = function(e) {
			return this.cmp(e) >= 0;
		}, g.isInteger = g.isint = function() {
			return this.e > this.d.length - 2;
		}, g.isNegative = g.isneg = function() {
			return this.s < 0;
		}, g.isPositive = g.ispos = function() {
			return this.s > 0;
		}, g.isZero = function() {
			return this.s === 0;
		}, g.lessThan = g.lt = function(e) {
			return this.cmp(e) < 0;
		}, g.lessThanOrEqualTo = g.lte = function(e) {
			return this.cmp(e) < 1;
		}, g.logarithm = g.log = function(e) {
			var t, n = this, r = n.constructor, o = r.precision, s = o + 5;
			if (e === void 0) e = new r(10);
			else if (e = new r(e), e.s < 1 || e.eq(d)) throw Error(a + "NaN");
			if (n.s < 1) throw Error(a + (n.s ? "NaN" : "-Infinity"));
			return n.eq(d) ? new r(0) : (i = !1, t = b(T(n, s), T(e, s), s), i = !0, D(t, o));
		}, g.minus = g.sub = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? O(t, e) : _(t, (e.s = -e.s, e));
		}, g.modulo = g.mod = function(e) {
			var t, n = this, r = n.constructor, o = r.precision;
			if (e = new r(e), !e.s) throw Error(a + "NaN");
			return n.s ? (i = !1, t = b(n, e, 0, 1).times(e), i = !0, n.minus(t)) : D(new r(n), o);
		}, g.naturalExponential = g.exp = function() {
			return x(this);
		}, g.naturalLogarithm = g.ln = function() {
			return T(this);
		}, g.negated = g.neg = function() {
			var e = new this.constructor(this);
			return e.s = -e.s || 0, e;
		}, g.plus = g.add = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? _(t, e) : O(t, (e.s = -e.s, e));
		}, g.precision = g.sd = function(e) {
			var t, n, r, i = this;
			if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
			if (t = S(i) + 1, r = i.d.length - 1, n = r * p + 1, r = i.d[r], r) {
				for (; r % 10 == 0; r /= 10) n--;
				for (r = i.d[0]; r >= 10; r /= 10) n++;
			}
			return e && t > n ? t : n;
		}, g.squareRoot = g.sqrt = function() {
			var e, t, n, r, o, s, l, u = this, d = u.constructor;
			if (u.s < 1) {
				if (!u.s) return new d(0);
				throw Error(a + "NaN");
			}
			for (e = S(u), i = !1, o = Math.sqrt(+u), o == 0 || o == 1 / 0 ? (t = y(u.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = c((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = l = n + 3;;) if (s = r, r = s.plus(b(u, s, l + 2)).times(.5), y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l)) {
				if (t = t.slice(l - 3, l + 1), o == l && t == "4999") {
					if (D(s, n + 1, 0), s.times(s).eq(u)) {
						r = s;
						break;
					}
				} else if (t != "9999") break;
				l += 4;
			}
			return i = !0, D(r, n);
		}, g.times = g.mul = function(e) {
			var t, n, r, a, o, s, c, l, u, d = this, p = d.constructor, m = d.d, h = (e = new p(e)).d;
			if (!d.s || !e.s) return new p(0);
			for (e.s *= d.s, n = d.e + e.e, l = m.length, u = h.length, l < u && (o = m, m = h, h = o, s = l, l = u, u = s), o = [], s = l + u, r = s; r--;) o.push(0);
			for (r = u; --r >= 0;) {
				for (t = 0, a = l + r; a > r;) c = o[a] + h[r] * m[a - r - 1] + t, o[a--] = c % f | 0, t = c / f | 0;
				o[a] = (o[a] + t) % f | 0;
			}
			for (; !o[--s];) o.pop();
			return t ? ++n : o.shift(), e.d = o, e.e = n, i ? D(e, p.precision) : e;
		}, g.toDecimalPlaces = g.todp = function(e, t) {
			var r = this, i = r.constructor;
			return r = new i(r), e === void 0 ? r : (v(e, 0, n), t === void 0 ? t = i.rounding : v(t, 0, 8), D(r, e + S(r) + 1, t));
		}, g.toExponential = function(e, t) {
			var r, i = this, a = i.constructor;
			return e === void 0 ? r = k(i, !0) : (v(e, 0, n), t === void 0 ? t = a.rounding : v(t, 0, 8), i = D(new a(i), e + 1, t), r = k(i, !0, e + 1)), r;
		}, g.toFixed = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? k(a) : (v(e, 0, n), t === void 0 ? t = o.rounding : v(t, 0, 8), i = D(new o(a), e + S(a) + 1, t), r = k(i.abs(), !1, e + S(i) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
		}, g.toInteger = g.toint = function() {
			var e = this, t = e.constructor;
			return D(new t(e), S(e) + 1, t.rounding);
		}, g.toNumber = function() {
			return +this;
		}, g.toPower = g.pow = function(e) {
			var t, n, r, o, s, l, u = this, f = u.constructor, h = 12, g = +(e = new f(e));
			if (!e.s) return new f(d);
			if (u = new f(u), !u.s) {
				if (e.s < 1) throw Error(a + "Infinity");
				return u;
			}
			if (u.eq(d)) return u;
			if (r = f.precision, e.eq(d)) return D(u, r);
			if (t = e.e, n = e.d.length - 1, l = t >= n, s = u.s, !l) {
				if (s < 0) throw Error(a + "NaN");
			} else if ((n = g < 0 ? -g : g) <= m) {
				for (o = new f(d), t = Math.ceil(r / p + 4), i = !1; n % 2 && (o = o.times(u), A(o.d, t)), n = c(n / 2), n !== 0;) u = u.times(u), A(u.d, t);
				return i = !0, e.s < 0 ? new f(d).div(o) : D(o, r);
			}
			return s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, u.s = 1, i = !1, o = e.times(T(u, r + h)), i = !0, o = x(o), o.s = s, o;
		}, g.toPrecision = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? (r = S(a), i = k(a, r <= o.toExpNeg || r >= o.toExpPos)) : (v(e, 1, n), t === void 0 ? t = o.rounding : v(t, 0, 8), a = D(new o(a), e, t), r = S(a), i = k(a, e <= r || r <= o.toExpNeg, e)), i;
		}, g.toSignificantDigits = g.tosd = function(e, t) {
			var r = this, i = r.constructor;
			return e === void 0 ? (e = i.precision, t = i.rounding) : (v(e, 1, n), t === void 0 ? t = i.rounding : v(t, 0, 8)), D(new i(r), e, t);
		}, g.toString = g.valueOf = g.val = g.toJSON = function() {
			var e = this, t = S(e), n = e.constructor;
			return k(e, t <= n.toExpNeg || t >= n.toExpPos);
		};
		function _(e, t) {
			var n, r, a, o, s, c, l, u, d = e.constructor, m = d.precision;
			if (!e.s || !t.s) return t.s || (t = new d(e)), i ? D(t, m) : t;
			if (l = e.d, u = t.d, s = e.e, a = t.e, l = l.slice(), o = s - a, o) {
				for (o < 0 ? (r = l, o = -o, c = u.length) : (r = u, a = s, c = l.length), s = Math.ceil(m / p), c = s > c ? s + 1 : c + 1, o > c && (o = c, r.length = 1), r.reverse(); o--;) r.push(0);
				r.reverse();
			}
			for (c = l.length, o = u.length, c - o < 0 && (o = c, r = u, u = l, l = r), n = 0; o;) n = (l[--o] = l[o] + u[o] + n) / f | 0, l[o] %= f;
			for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0;) l.pop();
			return t.d = l, t.e = a, i ? D(t, m) : t;
		}
		function v(e, t, n) {
			if (e !== ~~e || e < t || e > n) throw Error(o + e);
		}
		function y(e) {
			var t, n, r, i = e.length - 1, a = "", o = e[0];
			if (i > 0) {
				for (a += o, t = 1; t < i; t++) r = e[t] + "", n = p - r.length, n && (a += w(n)), a += r;
				o = e[t], r = o + "", n = p - r.length, n && (a += w(n));
			} else if (o === 0) return "0";
			for (; o % 10 == 0;) o /= 10;
			return a + o;
		}
		var b = (function() {
			function e(e, t) {
				var n, r = 0, i = e.length;
				for (e = e.slice(); i--;) n = e[i] * t + r, e[i] = n % f | 0, r = n / f | 0;
				return r && e.unshift(r), e;
			}
			function t(e, t, n, r) {
				var i, a;
				if (n != r) a = n > r ? 1 : -1;
				else for (i = a = 0; i < n; i++) if (e[i] != t[i]) {
					a = e[i] > t[i] ? 1 : -1;
					break;
				}
				return a;
			}
			function n(e, t, n) {
				for (var r = 0; n--;) e[n] -= r, r = +(e[n] < t[n]), e[n] = r * f + e[n] - t[n];
				for (; !e[0] && e.length > 1;) e.shift();
			}
			return function(r, i, o, s) {
				var c, l, u, d, m, h, g, _, v, y, b, x, C, w, T, E, O, k, A = r.constructor, j = r.s == i.s ? 1 : -1, M = r.d, N = i.d;
				if (!r.s) return new A(r);
				if (!i.s) throw Error(a + "Division by zero");
				for (l = r.e - i.e, O = N.length, T = M.length, g = new A(j), _ = g.d = [], u = 0; N[u] == (M[u] || 0);) ++u;
				if (N[u] > (M[u] || 0) && --l, x = o == null ? o = A.precision : s ? o + (S(r) - S(i)) + 1 : o, x < 0) return new A(0);
				if (x = x / p + 2 | 0, u = 0, O == 1) for (d = 0, N = N[0], x++; (u < T || d) && x--; u++) C = d * f + (M[u] || 0), _[u] = C / N | 0, d = C % N | 0;
				else {
					for (d = f / (N[0] + 1) | 0, d > 1 && (N = e(N, d), M = e(M, d), O = N.length, T = M.length), w = O, v = M.slice(0, O), y = v.length; y < O;) v[y++] = 0;
					k = N.slice(), k.unshift(0), E = N[0], N[1] >= f / 2 && ++E;
					do
						d = 0, c = t(N, v, O, y), c < 0 ? (b = v[0], O != y && (b = b * f + (v[1] || 0)), d = b / E | 0, d > 1 ? (d >= f && (d = f - 1), m = e(N, d), h = m.length, y = v.length, c = t(m, v, h, y), c == 1 && (d--, n(m, O < h ? k : N, h))) : (d == 0 && (c = d = 1), m = N.slice()), h = m.length, h < y && m.unshift(0), n(v, m, y), c == -1 && (y = v.length, c = t(N, v, O, y), c < 1 && (d++, n(v, O < y ? k : N, y))), y = v.length) : c === 0 && (d++, v = [0]), _[u++] = d, c && v[0] ? v[y++] = M[w] || 0 : (v = [M[w]], y = 1);
					while ((w++ < T || v[0] !== void 0) && x--);
				}
				return _[0] || _.shift(), g.e = l, D(g, s ? o + S(g) + 1 : o);
			};
		})();
		function x(e, t) {
			var n, r, a, o, c, u, f = 0, p = 0, m = e.constructor, h = m.precision;
			if (S(e) > 16) throw Error(s + S(e));
			if (!e.s) return new m(d);
			for (t == null ? (i = !1, u = h) : u = t, c = new m(.03125); e.abs().gte(.1);) e = e.times(c), p += 5;
			for (r = Math.log(l(2, p)) / Math.LN10 * 2 + 5 | 0, u += r, n = a = o = new m(d), m.precision = u;;) {
				if (a = D(a.times(e), u), n = n.times(++f), c = o.plus(b(a, n, u)), y(c.d).slice(0, u) === y(o.d).slice(0, u)) {
					for (; p--;) o = D(o.times(o), u);
					return m.precision = h, t == null ? (i = !0, D(o, h)) : o;
				}
				o = c;
			}
		}
		function S(e) {
			for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
			return t;
		}
		function C(e, t, n) {
			if (t > e.LN10.sd()) throw i = !0, n && (e.precision = n), Error(a + "LN10 precision limit exceeded");
			return D(new e(e.LN10), t);
		}
		function w(e) {
			for (var t = ""; e--;) t += "0";
			return t;
		}
		function T(e, t) {
			var n, r, o, s, c, l, u, f, p, m = 1, h = 10, g = e, _ = g.d, v = g.constructor, x = v.precision;
			if (g.s < 1) throw Error(a + (g.s ? "NaN" : "-Infinity"));
			if (g.eq(d)) return new v(0);
			if (t == null ? (i = !1, f = x) : f = t, g.eq(10)) return t ?? (i = !0), C(v, f);
			if (f += h, v.precision = f, n = y(_), r = n.charAt(0), s = S(g), Math.abs(s) < 0x5543df729c000) {
				for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3;) g = g.times(e), n = y(g.d), r = n.charAt(0), m++;
				s = S(g), r > 1 ? (g = new v("0." + n), s++) : g = new v(r + "." + n.slice(1));
			} else return u = C(v, f + 2, x).times(s + ""), g = T(new v(r + "." + n.slice(1)), f - h).plus(u), v.precision = x, t == null ? (i = !0, D(g, x)) : g;
			for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3;;) {
				if (c = D(c.times(p), f), u = l.plus(b(c, new v(o), f)), y(u.d).slice(0, f) === y(l.d).slice(0, f)) return l = l.times(2), s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ""))), l = b(l, new v(m), f), v.precision = x, t == null ? (i = !0, D(l, x)) : l;
				l = u, o += 2;
			}
		}
		function E(e, t) {
			var n, r, a;
			for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48;) ++r;
			for (a = t.length; t.charCodeAt(a - 1) === 48;) --a;
			if (t = t.slice(r, a), t) {
				if (a -= r, n = n - r - 1, e.e = c(n / p), e.d = [], r = (n + 1) % p, n < 0 && (r += p), r < a) {
					for (r && e.d.push(+t.slice(0, r)), a -= p; r < a;) e.d.push(+t.slice(r, r += p));
					t = t.slice(r), r = p - t.length;
				} else r -= a;
				for (; r--;) t += "0";
				if (e.d.push(+t), i && (e.e > h || e.e < -h)) throw Error(s + n);
			} else e.s = 0, e.e = 0, e.d = [0];
			return e;
		}
		function D(e, t, n) {
			var r, a, o, u, d, m, g, _, v = e.d;
			for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
			if (r = t - u, r < 0) r += p, a = t, g = v[_ = 0];
			else {
				if (_ = Math.ceil((r + 1) / p), o = v.length, _ >= o) return e;
				for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
				r %= p, a = r - p + u;
			}
			if (n !== void 0 && (o = l(10, u - a - 1), d = g / o % 10 | 0, m = t < 0 || v[_ + 1] !== void 0 || g % o, m = n < 4 ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : d > 5 || d == 5 && (n == 4 || m || n == 6 && (r > 0 ? a > 0 ? g / l(10, u - a) : 0 : v[_ - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0]) return m ? (o = S(e), v.length = 1, t = t - o - 1, v[0] = l(10, (p - t % p) % p), e.e = c(-t / p) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
			if (r == 0 ? (v.length = _, o = 1, _--) : (v.length = _ + 1, o = l(10, p - r), v[_] = a > 0 ? (g / l(10, u - a) % l(10, a) | 0) * o : 0), m) for (;;) if (_ == 0) {
				(v[0] += o) == f && (v[0] = 1, ++e.e);
				break;
			} else {
				if (v[_] += o, v[_] != f) break;
				v[_--] = 0, o = 1;
			}
			for (r = v.length; v[--r] === 0;) v.pop();
			if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
			return e;
		}
		function O(e, t) {
			var n, r, a, o, s, c, l, u, d, m, h = e.constructor, g = h.precision;
			if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new h(e), i ? D(t, g) : t;
			if (l = e.d, m = t.d, r = t.e, u = e.e, l = l.slice(), s = u - r, s) {
				for (d = s < 0, d ? (n = l, s = -s, c = m.length) : (n = m, r = u, c = l.length), a = Math.max(Math.ceil(g / p), c) + 2, s > a && (s = a, n.length = 1), n.reverse(), a = s; a--;) n.push(0);
				n.reverse();
			} else {
				for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++) if (l[a] != m[a]) {
					d = l[a] < m[a];
					break;
				}
				s = 0;
			}
			for (d && (n = l, l = m, m = n, t.s = -t.s), c = l.length, a = m.length - c; a > 0; --a) l[c++] = 0;
			for (a = m.length; a > s;) {
				if (l[--a] < m[a]) {
					for (o = a; o && l[--o] === 0;) l[o] = f - 1;
					--l[o], l[a] += f;
				}
				l[a] -= m[a];
			}
			for (; l[--c] === 0;) l.pop();
			for (; l[0] === 0; l.shift()) --r;
			return l[0] ? (t.d = l, t.e = r, i ? D(t, g) : t) : new h(0);
		}
		function k(e, t, n) {
			var r, i = S(e), a = y(e.d), o = a.length;
			return t ? (n && (r = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + w(r) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + w(-i - 1) + a, n && (r = n - o) > 0 && (a += w(r))) : i >= o ? (a += w(i + 1 - o), n && (r = n - i - 1) > 0 && (a = a + "." + w(r))) : ((r = i + 1) < o && (a = a.slice(0, r) + "." + a.slice(r)), n && (r = n - o) > 0 && (i + 1 === o && (a += "."), a += w(r))), e.s < 0 ? "-" + a : a;
		}
		function A(e, t) {
			if (e.length > t) return e.length = t, !0;
		}
		function j(e) {
			var t, n, r;
			function i(e) {
				var t = this;
				if (!(t instanceof i)) return new i(e);
				if (t.constructor = i, e instanceof i) {
					t.s = e.s, t.e = e.e, t.d = (e = e.d) ? e.slice() : e;
					return;
				}
				if (typeof e == "number") {
					if (e * 0 != 0) throw Error(o + e);
					if (e > 0) t.s = 1;
					else if (e < 0) e = -e, t.s = -1;
					else {
						t.s = 0, t.e = 0, t.d = [0];
						return;
					}
					if (e === ~~e && e < 1e7) {
						t.e = 0, t.d = [e];
						return;
					}
					return E(t, e.toString());
				}
				if (typeof e != "string") throw Error(o + e);
				if (e.charCodeAt(0) === 45 ? (e = e.slice(1), t.s = -1) : t.s = 1, u.test(e)) E(t, e);
				else throw Error(o + e);
			}
			if (i.prototype = g, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = j, i.config = i.set = M, e === void 0 && (e = {}), e) for (r = [
				"precision",
				"rounding",
				"toExpNeg",
				"toExpPos",
				"LN10"
			], t = 0; t < r.length;) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
			return i.config(e), i;
		}
		function M(e) {
			if (!e || typeof e != "object") throw Error(a + "Object expected");
			var t, r, i, s = [
				"precision",
				1,
				n,
				"rounding",
				0,
				8,
				"toExpNeg",
				-1 / 0,
				0,
				"toExpPos",
				0,
				1 / 0
			];
			for (t = 0; t < s.length; t += 3) if ((i = e[r = s[t]]) !== void 0) {
				if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
				else throw Error(o + r + ": " + i);
			}
			if ((i = e[r = "LN10"]) !== void 0) {
				if (i == Math.LN10) this[r] = new this(i);
				else throw Error(o + r + ": " + i);
			}
			return this;
		}
		r = j(r), r.default = r.Decimal = r, d = new r(1), typeof define == "function" && define.amd ? define(function() {
			return r;
		}) : t !== void 0 && t.exports ? t.exports = r : (e ||= typeof self < "u" && self && self.self == self ? self : Function("return this")(), e.Decimal = r);
	})(e);
})))());
function lm(e) {
	return e === 0 ? 1 : Math.floor(new Q.default(e).abs().log(10).toNumber()) + 1;
}
function um(e, t, n) {
	for (var r = new Q.default(e), i = 0, a = []; r.lt(t) && i < 1e5;) a.push(r.toNumber()), r = r.add(n), i++;
	return a;
}
//#endregion
//#region node_modules/recharts/es6/util/scale/getNiceTickValues.js
function dm(e, t) {
	return gm(e) || hm(e, t) || pm(e, t) || fm();
}
function fm() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function pm(e, t) {
	if (e) {
		if (typeof e == "string") return mm(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? mm(e, t) : void 0;
	}
}
function mm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function hm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function gm(e) {
	if (Array.isArray(e)) return e;
}
var _m = (e) => {
	var t = dm(e, 2), n = t[0], r = t[1], i = n, a = r;
	return n > r && (i = r, a = n), [i, a];
}, vm = (e, t, n) => {
	if (e.lte(0)) return new Q.default(0);
	var r = lm(e.toNumber()), i = new Q.default(10).pow(r), a = e.div(i), o = r === 1 ? .1 : .05, s = new Q.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
	return t ? new Q.default(s.toNumber()) : new Q.default(Math.ceil(s.toNumber()));
}, ym = (e, t, n) => {
	if (e.lte(0)) return new Q.default(0);
	var r = [
		1,
		2,
		2.5,
		5
	], i = e.toNumber(), a = Math.floor(new Q.default(i).abs().log(10).toNumber()), o = new Q.default(10).pow(a), s = e.div(o).toNumber(), c = r.findIndex((e) => e >= s - 1e-10);
	if (c === -1 && (o = o.mul(10), c = 0), c += n, c >= r.length) {
		var l = Math.floor(c / r.length);
		c %= r.length, o = o.mul(new Q.default(10).pow(l));
	}
	var u = r[c] ?? 1, d = new Q.default(u).mul(o);
	return t ? d : new Q.default(Math.ceil(d.toNumber()));
}, bm = (e, t, n) => {
	var r = new Q.default(1), i = new Q.default(e);
	if (!i.isint() && n) {
		var a = Math.abs(e);
		a < 1 ? (r = new Q.default(10).pow(lm(e) - 1), i = new Q.default(Math.floor(i.div(r).toNumber())).mul(r)) : a > 1 && (i = new Q.default(Math.floor(e)));
	} else e === 0 ? i = new Q.default(Math.floor((t - 1) / 2)) : n || (i = new Q.default(Math.floor(e)));
	for (var o = Math.floor((t - 1) / 2), s = [], c = 0; c < t; c++) s.push(i.add(new Q.default(c - o).mul(r)).toNumber());
	return s;
}, xm = function(e, t, n, r) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : vm;
	if (!Number.isFinite((t - e) / (n - 1))) return {
		step: new Q.default(0),
		tickMin: new Q.default(0),
		tickMax: new Q.default(0)
	};
	var o = a(new Q.default(t).sub(e).div(n - 1), r, i), s;
	e <= 0 && t >= 0 ? s = new Q.default(0) : (s = new Q.default(e).add(t).div(2), s = s.sub(new Q.default(s).mod(o)));
	var c = Math.ceil(s.sub(e).div(o).toNumber()), l = Math.ceil(new Q.default(t).sub(s).div(o).toNumber()), u = c + l + 1;
	return u > n ? xm(e, t, n, r, i + 1, a) : (u < n && (l = t > 0 ? l + (n - u) : l, c = t > 0 ? c : c + (n - u)), {
		step: o,
		tickMin: s.sub(new Q.default(c).mul(o)),
		tickMax: s.add(new Q.default(l).mul(o))
	});
}, Sm = function(e) {
	var t = dm(e, 2), n = t[0], r = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Math.max(i, 2), c = dm(_m([n, r]), 2), l = c[0], u = c[1];
	if (l === -Infinity || u === Infinity) {
		var d = u === Infinity ? [l, ...Array(i - 1).fill(Infinity)] : [...Array(i - 1).fill(-Infinity), u];
		return n > r ? d.reverse() : d;
	}
	if (l === u) return bm(l, i, a);
	var f = xm(l, u, s, a, 0, o === "snap125" ? ym : vm), p = f.step, m = f.tickMin, h = f.tickMax, g = um(m, h.add(new Q.default(.1).mul(p)), p);
	return n > r ? g.reverse() : g;
}, Cm = function(e, t) {
	var n = dm(e, 2), r = n[0], i = n[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = dm(_m([r, i]), 2), c = s[0], l = s[1];
	if (c === -Infinity || l === Infinity) return [r, i];
	if (c === l) return [c];
	var u = o === "snap125" ? ym : vm, d = Math.max(t, 2), f = u(new Q.default(l).sub(c).div(d - 1), a, 0), p = [...um(new Q.default(c), new Q.default(l), f), l];
	if (a === !1) {
		p = p.map((e) => Math.round(e));
		var m = p.length - 1;
		m > 0 && p[m] === p[m - 1] && (p = p.slice(0, m));
	}
	return r > i ? p.reverse() : p;
}, wm = (e) => e.rootProps.maxBarSize, Tm = (e) => e.rootProps.barGap, Em = (e) => e.rootProps.barCategoryGap, Dm = (e) => e.rootProps.barSize, Om = (e) => e.rootProps.stackOffset, km = (e) => e.rootProps.reverseStackOrder, Am = (e) => e.options.chartName, jm = (e) => e.rootProps.syncId, Mm = (e) => e.rootProps.syncMethod, Nm = (e) => e.options.eventEmitter, Pm = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
}, Fm = {
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	allowDataOverflow: !1,
	angle: 0,
	angleAxisId: 0,
	axisLine: !0,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	hide: !1,
	includeHidden: !1,
	label: !1,
	niceTicks: "auto",
	orientation: "outer",
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickLine: !0,
	tickSize: 8,
	type: "auto",
	zIndex: Pm.axis
}, Im = {
	allowDataOverflow: !1,
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	angle: 0,
	axisLine: !0,
	includeHidden: !1,
	hide: !1,
	niceTicks: "auto",
	label: !1,
	orientation: "right",
	radiusAxisId: 0,
	reversed: !1,
	scale: "auto",
	stroke: "#ccc",
	tick: !0,
	tickCount: 5,
	tickLine: !0,
	type: "auto",
	zIndex: Pm.axis
}, Lm = (e, t) => {
	if (e && t) return e != null && e.reversed ? [t[1], t[0]] : t;
};
//#endregion
//#region node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js
function Rm(e, t, n) {
	if (n !== "auto") return n;
	if (e != null) return rc(e, t) ? "category" : "number";
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/polarAxisSelectors.js
function zm(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Bm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? zm(Object(n), !0).forEach(function(t) {
			Vm(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zm(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Vm(e, t, n) {
	return (t = Hm(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Hm(e) {
	var t = Um(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Um(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Wm = {
	allowDataOverflow: Fm.allowDataOverflow,
	allowDecimals: Fm.allowDecimals,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	domain: void 0,
	id: Fm.angleAxisId,
	includeHidden: !1,
	name: void 0,
	reversed: Fm.reversed,
	scale: Fm.scale,
	tick: Fm.tick,
	tickCount: void 0,
	ticks: void 0,
	type: Fm.type,
	unit: void 0,
	niceTicks: "auto"
}, Gm = {
	allowDataOverflow: Im.allowDataOverflow,
	allowDecimals: Im.allowDecimals,
	allowDuplicatedCategory: Im.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: Im.radiusAxisId,
	includeHidden: Im.includeHidden,
	name: void 0,
	reversed: Im.reversed,
	scale: Im.scale,
	tick: Im.tick,
	tickCount: Im.tickCount,
	ticks: void 0,
	type: Im.type,
	unit: void 0,
	niceTicks: "auto"
}, Km = B([(e, t) => {
	if (t != null) return e.polarAxis.angleAxis[t];
}, Il], (e, t) => {
	if (e != null) return e;
	var n = Rm(t, "angleAxis", Wm.type) ?? "category";
	return Bm(Bm({}, Wm), {}, { type: n });
}), qm = B([(e, t) => e.polarAxis.radiusAxis[t], Il], (e, t) => {
	if (e != null) return e;
	var n = Rm(t, "radiusAxis", Gm.type) ?? "category";
	return Bm(Bm({}, Gm), {}, { type: n });
}), Jm = (e) => e.polarOptions, Ym = B([
	Cc,
	wc,
	Bc
], xp), Xm = B([Jm, Ym], (e, t) => {
	if (e != null) return Ce(e.innerRadius, t, 0);
}), Zm = B([Jm, Ym], (e, t) => {
	if (e != null) return Ce(e.outerRadius, t, t * .8);
}), Qm = B([Jm], (e) => e == null ? [0, 0] : [e.startAngle, e.endAngle]);
B([Km, Qm], Lm);
var $m = B([
	Ym,
	Xm,
	Zm
], (e, t, n) => {
	if (e != null && t != null && n != null) return [t, n];
});
B([qm, $m], Lm);
var eh = B([
	Nl,
	Jm,
	Xm,
	Zm,
	Cc,
	wc
], (e, t, n, r, i, a) => {
	if (!(e !== "centric" && e !== "radial" || t == null || n == null || r == null)) {
		var o = t.cx, s = t.cy, c = t.startAngle, l = t.endAngle;
		return {
			cx: Ce(o, i, i / 2),
			cy: Ce(s, a, a / 2),
			innerRadius: n,
			outerRadius: r,
			startAngle: c,
			endAngle: l,
			clockWise: !1
		};
	}
}), th = (e, t) => t, nh = (e, t, n) => n;
//#endregion
//#region node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js
function rh(e) {
	return e?.id;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineDisplayedStackedData.js
function ih(e, t, n) {
	var r = t.chartData, i = r === void 0 ? [] : r, a = n.allowDuplicatedCategory, o = n.dataKey, s = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		var t = e.data ?? i;
		if (t != null && t.length !== 0) {
			var n = rh(e);
			t.forEach((t, r) => {
				var i = o == null || a ? r : String(tc(t, o, null)), c = tc(t, e.dataKey, 0), l = s.has(i) ? s.get(i) : {};
				Object.assign(l, { [n]: c }), s.set(i, l);
			});
		}
	}), Array.from(s.values());
}
//#endregion
//#region node_modules/recharts/es6/state/types/StackedGraphicalItem.js
function ah(e) {
	return "stackId" in e && e.stackId != null && e.dataKey != null;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/numberDomainEqualityCheck.js
var oh = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
//#endregion
//#region node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js
function sh(e, t) {
	return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function ch(e, t) {
	if (e.length === t.length) {
		for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipAxisType.js
var lh = (e) => {
	var t = Nl(e);
	return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, uh = (e) => e.tooltip.settings.axisId;
//#endregion
//#region node_modules/recharts/es6/util/scale/RechartsScale.js
function dh(e) {
	if (e != null) {
		var t = e.ticks, n = e.bandwidth, r = e.range(), i = [Math.min(...r), Math.max(...r)];
		return {
			domain: () => e.domain(),
			range: function(e) {
				function t() {
					return e.apply(this, arguments);
				}
				return t.toString = function() {
					return e.toString();
				}, t;
			}(() => i),
			rangeMin: () => i[0],
			rangeMax: () => i[1],
			isInRange(e) {
				var t = i[0], n = i[1];
				return t <= n ? e >= t && e <= n : e >= n && e <= t;
			},
			bandwidth: n ? () => n.call(e) : void 0,
			ticks: t ? (n) => t.call(e, n) : void 0,
			map: (t, n) => {
				var r = e(t);
				if (r != null) {
					if (e.bandwidth && n != null && n.position) {
						var i = e.bandwidth();
						switch (n.position) {
							case "middle":
								r += i / 2;
								break;
							case "end": r += i;
						}
					}
					return r;
				}
			}
		};
	}
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineCheckedDomain.js
var fh = (e, t) => {
	if (t != null) switch (e) {
		case "linear":
			if (!am(t)) {
				for (var n, r, i = 0; i < t.length; i++) {
					var a = t[i];
					G(a) && ((n === void 0 || a < n) && (n = a), (r === void 0 || a > r) && (r = a));
				}
				return n !== void 0 && r !== void 0 ? [n, r] : void 0;
			}
			return t;
		default: return t;
	}
};
//#endregion
//#region node_modules/d3-array/src/ascending.js
function ph(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-array/src/descending.js
function mh(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-array/src/bisector.js
function hh(e) {
	let t, n, r;
	e.length === 2 ? (t = e === ph || e === mh ? e : gh, n = e, r = e) : (t = ph, n = (t, n) => ph(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function gh() {
	return 0;
}
//#endregion
//#region node_modules/d3-array/src/number.js
function _h(e) {
	return e === null ? NaN : +e;
}
function* vh(e, t) {
	if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
	else {
		let n = -1;
		for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
	}
}
//#endregion
//#region node_modules/d3-array/src/bisect.js
var yh = hh(ph), bh = yh.right;
yh.left, hh(_h).center;
//#endregion
//#region node_modules/internmap/src/index.js
var xh = class extends Map {
	constructor(e, t = Th) {
		if (super(), Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: t }
		}), e != null) for (let [t, n] of e) this.set(t, n);
	}
	get(e) {
		return super.get(Sh(this, e));
	}
	has(e) {
		return super.has(Sh(this, e));
	}
	set(e, t) {
		return super.set(Ch(this, e), t);
	}
	delete(e) {
		return super.delete(wh(this, e));
	}
};
function Sh({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : n;
}
function Ch({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function wh({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) && (n = e.get(r), e.delete(r)), n;
}
function Th(e) {
	return typeof e == "object" && e ? e.valueOf() : e;
}
//#endregion
//#region node_modules/d3-array/src/sort.js
function Eh(e = ph) {
	if (e === ph) return Dh;
	if (typeof e != "function") throw TypeError("compare is not a function");
	return (t, n) => {
		let r = e(t, n);
		return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
	};
}
function Dh(e, t) {
	return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : +(e > t));
}
//#endregion
//#region node_modules/d3-array/src/ticks.js
var Oh = Math.sqrt(50), kh = Math.sqrt(10), Ah = Math.sqrt(2);
function jh(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= Oh ? 10 : a >= kh ? 5 : a >= Ah ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? jh(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function Mh(e, t, n) {
	if (t = +t, e = +e, n = +n, !(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? jh(t, e, n) : jh(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) {
		if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
		else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	} else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function Nh(e, t, n) {
	return t = +t, e = +e, n = +n, jh(e, t, n)[2];
}
function Ph(e, t, n) {
	t = +t, e = +e, n = +n;
	let r = t < e, i = r ? Nh(t, e, n) : Nh(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
//#endregion
//#region node_modules/d3-array/src/max.js
function Fh(e, t) {
	let n;
	if (t === void 0) for (let t of e) t != null && (n < t || n === void 0 && t >= t) && (n = t);
	else {
		let r = -1;
		for (let i of e) (i = t(i, ++r, e)) != null && (n < i || n === void 0 && i >= i) && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/d3-array/src/min.js
function Ih(e, t) {
	let n;
	if (t === void 0) for (let t of e) t != null && (n > t || n === void 0 && t >= t) && (n = t);
	else {
		let r = -1;
		for (let i of e) (i = t(i, ++r, e)) != null && (n > i || n === void 0 && i >= i) && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/d3-array/src/quickselect.js
function Lh(e, t, n = 0, r = Infinity, i) {
	if (t = Math.floor(t), n = Math.floor(Math.max(0, n)), r = Math.floor(Math.min(e.length - 1, r)), !(n <= t && t <= r)) return e;
	for (i = i === void 0 ? Dh : Eh(i); r > n;) {
		if (r - n > 600) {
			let a = r - n + 1, o = t - n + 1, s = Math.log(a), c = .5 * Math.exp(2 * s / 3), l = .5 * Math.sqrt(s * c * (a - c) / a) * (o - a / 2 < 0 ? -1 : 1), u = Math.max(n, Math.floor(t - o * c / a + l)), d = Math.min(r, Math.floor(t + (a - o) * c / a + l));
			Lh(e, t, u, d, i);
		}
		let a = e[t], o = n, s = r;
		for (Rh(e, n, t), i(e[r], a) > 0 && Rh(e, n, r); o < s;) {
			for (Rh(e, o, s), ++o, --s; i(e[o], a) < 0;) ++o;
			for (; i(e[s], a) > 0;) --s;
		}
		i(e[n], a) === 0 ? Rh(e, n, s) : (++s, Rh(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
	}
	return e;
}
function Rh(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
//#endregion
//#region node_modules/d3-array/src/quantile.js
function zh(e, t, n) {
	if (e = Float64Array.from(vh(e, n)), (r = e.length) && !isNaN(t = +t)) {
		if (t <= 0 || r < 2) return Ih(e);
		if (t >= 1) return Fh(e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = Fh(Lh(e, a).subarray(0, a + 1));
		return o + (Ih(e.subarray(a + 1)) - o) * (i - a);
	}
}
function Bh(e, t, n = _h) {
	if ((r = e.length) && !isNaN(t = +t)) {
		if (t <= 0 || r < 2) return +n(e[0], 0, e);
		if (t >= 1) return +n(e[r - 1], r - 1, e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = +n(e[a], a, e);
		return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
	}
}
//#endregion
//#region node_modules/d3-array/src/range.js
function Vh(e, t, n) {
	e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
	for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;) a[r] = e + r * n;
	return a;
}
//#endregion
//#region node_modules/d3-scale/src/init.js
function Hh(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
function Uh(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			typeof e == "function" ? this.interpolator(e) : this.range(e);
			break;
		default: this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
	}
	return this;
}
//#endregion
//#region node_modules/d3-scale/src/ordinal.js
var Wh = Symbol("implicit");
function Gh() {
	var e = new xh(), t = [], n = [], r = Wh;
	function i(i) {
		let a = e.get(i);
		if (a === void 0) {
			if (r !== Wh) return r;
			e.set(i, a = t.push(i) - 1);
		}
		return n[a % n.length];
	}
	return i.domain = function(n) {
		if (!arguments.length) return t.slice();
		t = [], e = new xh();
		for (let r of n) e.has(r) || e.set(r, t.push(r) - 1);
		return i;
	}, i.range = function(e) {
		return arguments.length ? (n = Array.from(e), i) : n.slice();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return Gh(t, n).unknown(r);
	}, Hh.apply(i, arguments), i;
}
//#endregion
//#region node_modules/d3-scale/src/band.js
function Kh() {
	var e = Gh().unknown(void 0), t = e.domain, n = e.range, r = 0, i = 1, a, o, s = !1, c = 0, l = 0, u = .5;
	delete e.unknown;
	function d() {
		var e = t().length, d = i < r, f = d ? i : r, p = d ? r : i;
		a = (p - f) / Math.max(1, e - c + l * 2), s && (a = Math.floor(a)), f += (p - f - a * (e - c)) * u, o = a * (1 - c), s && (f = Math.round(f), o = Math.round(o));
		var m = Vh(e).map(function(e) {
			return f + a * e;
		});
		return n(d ? m.reverse() : m);
	}
	return e.domain = function(e) {
		return arguments.length ? (t(e), d()) : t();
	}, e.range = function(e) {
		return arguments.length ? ([r, i] = e, r = +r, i = +i, d()) : [r, i];
	}, e.rangeRound = function(e) {
		return [r, i] = e, r = +r, i = +i, s = !0, d();
	}, e.bandwidth = function() {
		return o;
	}, e.step = function() {
		return a;
	}, e.round = function(e) {
		return arguments.length ? (s = !!e, d()) : s;
	}, e.padding = function(e) {
		return arguments.length ? (c = Math.min(1, l = +e), d()) : c;
	}, e.paddingInner = function(e) {
		return arguments.length ? (c = Math.min(1, e), d()) : c;
	}, e.paddingOuter = function(e) {
		return arguments.length ? (l = +e, d()) : l;
	}, e.align = function(e) {
		return arguments.length ? (u = Math.max(0, Math.min(1, e)), d()) : u;
	}, e.copy = function() {
		return Kh(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
	}, Hh.apply(d(), arguments);
}
function qh(e) {
	var t = e.copy;
	return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
		return qh(t());
	}, e;
}
function Jh() {
	return qh(Kh.apply(null, arguments).paddingInner(1));
}
//#endregion
//#region node_modules/d3-color/src/define.js
function Yh(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Xh(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function Zh() {}
var Qh = .7, $h = 1 / Qh, eg = "\\s*([+-]?\\d+)\\s*", tg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ng = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", rg = /^#([0-9a-f]{3,8})$/, ig = RegExp(`^rgb\\(${eg},${eg},${eg}\\)$`), ag = RegExp(`^rgb\\(${ng},${ng},${ng}\\)$`), og = RegExp(`^rgba\\(${eg},${eg},${eg},${tg}\\)$`), sg = RegExp(`^rgba\\(${ng},${ng},${ng},${tg}\\)$`), cg = RegExp(`^hsl\\(${tg},${ng},${ng}\\)$`), lg = RegExp(`^hsla\\(${tg},${ng},${ng},${tg}\\)$`), ug = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
Yh(Zh, hg, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: dg,
	formatHex: dg,
	formatHex8: fg,
	formatHsl: pg,
	formatRgb: mg,
	toString: mg
});
function dg() {
	return this.rgb().formatHex();
}
function fg() {
	return this.rgb().formatHex8();
}
function pg() {
	return Og(this).formatHsl();
}
function mg() {
	return this.rgb().formatRgb();
}
function hg(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = rg.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? gg(t) : n === 3 ? new bg(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? _g(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? _g(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ig.exec(e)) ? new bg(t[1], t[2], t[3], 1) : (t = ag.exec(e)) ? new bg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = og.exec(e)) ? _g(t[1], t[2], t[3], t[4]) : (t = sg.exec(e)) ? _g(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = cg.exec(e)) ? Dg(t[1], t[2] / 100, t[3] / 100, 1) : (t = lg.exec(e)) ? Dg(t[1], t[2] / 100, t[3] / 100, t[4]) : ug.hasOwnProperty(e) ? gg(ug[e]) : e === "transparent" ? new bg(NaN, NaN, NaN, 0) : null;
}
function gg(e) {
	return new bg(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function _g(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new bg(e, t, n, r);
}
function vg(e) {
	return e instanceof Zh || (e = hg(e)), e ? (e = e.rgb(), new bg(e.r, e.g, e.b, e.opacity)) : new bg();
}
function yg(e, t, n, r) {
	return arguments.length === 1 ? vg(e) : new bg(e, t, n, r ?? 1);
}
function bg(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Yh(bg, yg, Xh(Zh, {
	brighter(e) {
		return e = e == null ? $h : $h ** +e, new bg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Qh : Qh ** +e, new bg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new bg(Tg(this.r), Tg(this.g), Tg(this.b), wg(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: xg,
	formatHex: xg,
	formatHex8: Sg,
	formatRgb: Cg,
	toString: Cg
}));
function xg() {
	return `#${Eg(this.r)}${Eg(this.g)}${Eg(this.b)}`;
}
function Sg() {
	return `#${Eg(this.r)}${Eg(this.g)}${Eg(this.b)}${Eg((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Cg() {
	let e = wg(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Tg(this.r)}, ${Tg(this.g)}, ${Tg(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function wg(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Tg(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Eg(e) {
	return e = Tg(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Dg(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ag(e, t, n, r);
}
function Og(e) {
	if (e instanceof Ag) return new Ag(e.h, e.s, e.l, e.opacity);
	if (e instanceof Zh || (e = hg(e)), !e) return new Ag();
	if (e instanceof Ag) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new Ag(o, s, c, e.opacity);
}
function kg(e, t, n, r) {
	return arguments.length === 1 ? Og(e) : new Ag(e, t, n, r ?? 1);
}
function Ag(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Yh(Ag, kg, Xh(Zh, {
	brighter(e) {
		return e = e == null ? $h : $h ** +e, new Ag(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Qh : Qh ** +e, new Ag(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new bg(Ng(e >= 240 ? e - 240 : e + 120, i, r), Ng(e, i, r), Ng(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new Ag(jg(this.h), Mg(this.s), Mg(this.l), wg(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = wg(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${jg(this.h)}, ${Mg(this.s) * 100}%, ${Mg(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function jg(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Mg(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function Ng(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var Pg = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function Fg(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Ig(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Lg(e) {
	return (e = +e) == 1 ? Rg : function(t, n) {
		return n - t ? Ig(t, n, e) : Pg(isNaN(t) ? n : t);
	};
}
function Rg(e, t) {
	var n = t - e;
	return n ? Fg(e, n) : Pg(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var zg = (function e(t) {
	var n = Lg(t);
	function r(e, t) {
		var r = n((e = yg(e)).r, (t = yg(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Rg(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function Bg(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Vg(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function Hg(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = Zg(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function Ug(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function Wg(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function Gg(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = Zg(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var Kg = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, qg = new RegExp(Kg.source, "g");
function Jg(e) {
	return function() {
		return e;
	};
}
function Yg(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Xg(e, t) {
	var n = Kg.lastIndex = qg.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Kg.exec(e)) && (i = qg.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Wg(r, i)
	})), n = qg.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Yg(c[0].x) : Jg(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function Zg(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? Pg(t) : (n === "number" ? Wg : n === "string" ? (r = hg(t)) ? (t = r, zg) : Xg : t instanceof hg ? zg : t instanceof Date ? Ug : Vg(t) ? Bg : Array.isArray(t) ? Hg : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Gg : Wg)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/round.js
function Qg(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/piecewise.js
function $g(e, t) {
	t === void 0 && (t = e, e = Zg);
	for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r;) a[n] = e(i, i = t[++n]);
	return function(e) {
		var t = Math.max(0, Math.min(r - 1, Math.floor(e *= r)));
		return a[t](e - t);
	};
}
//#endregion
//#region node_modules/d3-scale/src/constant.js
function e_(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-scale/src/number.js
function t_(e) {
	return +e;
}
//#endregion
//#region node_modules/d3-scale/src/continuous.js
var n_ = [0, 1];
function r_(e) {
	return e;
}
function i_(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : e_(isNaN(t) ? NaN : .5);
}
function a_(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function o_(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = i_(i, r), a = n(o, a)) : (r = i_(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function s_(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = i_(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = bh(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function c_(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function l_() {
	var e = n_, t = n_, n = Zg, r, i, a, o = r_, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== r_ && (o = a_(e[0], e[n - 1])), s = n > 2 ? s_ : o_, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), Wg))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, t_), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = Qg, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : r_, u()) : o !== r_;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function u_() {
	return l_()(r_, r_);
}
//#endregion
//#region node_modules/d3-format/src/formatDecimal.js
function d_(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function f_(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
//#endregion
//#region node_modules/d3-format/src/exponent.js
function p_(e) {
	return e = f_(Math.abs(e)), e ? e[1] : NaN;
}
//#endregion
//#region node_modules/d3-format/src/formatGroup.js
function m_(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
//#endregion
//#region node_modules/d3-format/src/formatNumerals.js
function h_(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
//#endregion
//#region node_modules/d3-format/src/formatSpecifier.js
var g_ = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function __(e) {
	if (!(t = g_.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new v_({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
__.prototype = v_.prototype;
function v_(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
v_.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
//#endregion
//#region node_modules/d3-format/src/formatTrim.js
function y_(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
//#endregion
//#region node_modules/d3-format/src/formatPrefixAuto.js
var b_;
function x_(e, t) {
	var n = f_(e, t);
	if (!n) return b_ = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (b_ = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + f_(e, Math.max(0, t + a - 1))[0];
}
//#endregion
//#region node_modules/d3-format/src/formatRounded.js
function S_(e, t) {
	var n = f_(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
//#endregion
//#region node_modules/d3-format/src/formatTypes.js
var C_ = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: d_,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => S_(e * 100, t),
	r: S_,
	s: x_,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
//#endregion
//#region node_modules/d3-format/src/identity.js
function w_(e) {
	return e;
}
//#endregion
//#region node_modules/d3-format/src/locale.js
var T_ = Array.prototype.map, E_ = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function D_(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? w_ : m_(T_.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? w_ : h_(T_.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = __(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : C_[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), S = C_[y], C = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function w(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = S(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : S(Math.abs(e), _), v && (e = y_(e)), w && +e == 0 && f !== "+" && (w = !1), n = (w ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && b_ !== void 0 ? E_[8 + b_ / 3] : "") + r + (w && f === "(" ? ")" : ""), C) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < h ? Array(h - T + 1).join(u) : "";
			switch (g && m && (e = t(E + e, E.length ? h - r.length : Infinity), E = ""), d) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default: e = E + n + e + r;
			}
			return a(e);
		}
		return w.toString = function() {
			return e + "";
		}, w;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(p_(t) / 3))) * 3, r = 10 ** -n, i = l((e = __(e), e.type = "f", e), { suffix: E_[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
//#endregion
//#region node_modules/d3-format/src/defaultLocale.js
var O_, k_, A_;
j_({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function j_(e) {
	return O_ = D_(e), k_ = O_.format, A_ = O_.formatPrefix, O_;
}
//#endregion
//#region node_modules/d3-format/src/precisionFixed.js
function M_(e) {
	return Math.max(0, -p_(Math.abs(e)));
}
//#endregion
//#region node_modules/d3-format/src/precisionPrefix.js
function N_(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(p_(t) / 3))) * 3 - p_(Math.abs(e)));
}
//#endregion
//#region node_modules/d3-format/src/precisionRound.js
function P_(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, p_(t) - p_(e)) + 1;
}
//#endregion
//#region node_modules/d3-scale/src/tickFormat.js
function F_(e, t, n, r) {
	var i = Ph(e, t, n), a;
	switch (r = __(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = N_(i, o)) && (r.precision = a), A_(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = P_(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%": r.precision == null && !isNaN(a = M_(i)) && (r.precision = a - (r.type === "%") * 2);
	}
	return k_(r);
}
//#endregion
//#region node_modules/d3-scale/src/linear.js
function I_(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return Mh(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return F_(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = Nh(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function L_() {
	var e = u_();
	return e.copy = function() {
		return c_(e, L_());
	}, Hh.apply(e, arguments), I_(e);
}
//#endregion
//#region node_modules/d3-scale/src/identity.js
function R_(e) {
	var t;
	function n(e) {
		return e == null || isNaN(e = +e) ? t : e;
	}
	return n.invert = n, n.domain = n.range = function(t) {
		return arguments.length ? (e = Array.from(t, t_), n) : e.slice();
	}, n.unknown = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.copy = function() {
		return R_(e).unknown(t);
	}, e = arguments.length ? Array.from(e, t_) : [0, 1], I_(n);
}
//#endregion
//#region node_modules/d3-scale/src/nice.js
function z_(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
//#endregion
//#region node_modules/d3-scale/src/log.js
function B_(e) {
	return Math.log(e);
}
function V_(e) {
	return Math.exp(e);
}
function H_(e) {
	return -Math.log(-e);
}
function U_(e) {
	return -Math.exp(-e);
}
function W_(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function G_(e) {
	return e === 10 ? W_ : e === Math.E ? Math.exp : (t) => e ** +t;
}
function K_(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function q_(e) {
	return (t, n) => -e(-t, n);
}
function J_(e) {
	let t = e(B_, V_), n = t.domain, r = 10, i, a;
	function o() {
		return i = K_(r), a = G_(r), n()[0] < 0 ? (i = q_(i), a = q_(a), e(H_, U_)) : e(B_, V_), t;
	}
	return t.base = function(e) {
		return arguments.length ? (r = +e, o()) : r;
	}, t.domain = function(e) {
		return arguments.length ? (n(e), o()) : n();
	}, t.ticks = (e) => {
		let t = n(), o = t[0], s = t[t.length - 1], c = s < o;
		c && ([o, s] = [s, o]);
		let l = i(o), u = i(s), d, f, p = e == null ? 10 : +e, m = [];
		if (!(r % 1) && u - l < p) {
			if (l = Math.floor(l), u = Math.ceil(u), o > 0) {
				for (; l <= u; ++l) for (d = 1; d < r; ++d) if (f = l < 0 ? d / a(-l) : d * a(l), !(f < o)) {
					if (f > s) break;
					m.push(f);
				}
			} else for (; l <= u; ++l) for (d = r - 1; d >= 1; --d) if (f = l > 0 ? d / a(-l) : d * a(l), !(f < o)) {
				if (f > s) break;
				m.push(f);
			}
			m.length * 2 < p && (m = Mh(o, s, p));
		} else m = Mh(l, u, Math.min(u - l, p)).map(a);
		return c ? m.reverse() : m;
	}, t.tickFormat = (e, n) => {
		if (e ??= 10, n ??= r === 10 ? "s" : ",", typeof n != "function" && (!(r % 1) && (n = __(n)).precision == null && (n.trim = !0), n = k_(n)), e === Infinity) return n;
		let o = Math.max(1, r * e / t.ticks().length);
		return (e) => {
			let t = e / a(Math.round(i(e)));
			return t * r < r - .5 && (t *= r), t <= o ? n(e) : "";
		};
	}, t.nice = () => n(z_(n(), {
		floor: (e) => a(Math.floor(i(e))),
		ceil: (e) => a(Math.ceil(i(e)))
	})), t;
}
function Y_() {
	let e = J_(l_()).domain([1, 10]);
	return e.copy = () => c_(e, Y_()).base(e.base()), Hh.apply(e, arguments), e;
}
//#endregion
//#region node_modules/d3-scale/src/symlog.js
function X_(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function Z_(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function Q_(e) {
	var t = 1, n = e(X_(t), Z_(t));
	return n.constant = function(n) {
		return arguments.length ? e(X_(t = +n), Z_(t)) : t;
	}, I_(n);
}
function $_() {
	var e = Q_(l_());
	return e.copy = function() {
		return c_(e, $_()).constant(e.constant());
	}, Hh.apply(e, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/pow.js
function ev(e) {
	return function(t) {
		return t < 0 ? -((-t) ** +e) : t ** +e;
	};
}
function tv(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function nv(e) {
	return e < 0 ? -e * e : e * e;
}
function rv(e) {
	var t = e(r_, r_), n = 1;
	function r() {
		return n === 1 ? e(r_, r_) : n === .5 ? e(tv, nv) : e(ev(n), ev(1 / n));
	}
	return t.exponent = function(e) {
		return arguments.length ? (n = +e, r()) : n;
	}, I_(t);
}
function iv() {
	var e = rv(l_());
	return e.copy = function() {
		return c_(e, iv()).exponent(e.exponent());
	}, Hh.apply(e, arguments), e;
}
function av() {
	return iv.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/radial.js
function ov(e) {
	return Math.sign(e) * e * e;
}
function sv(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function cv() {
	var e = u_(), t = [0, 1], n = !1, r;
	function i(t) {
		var i = sv(e(t));
		return isNaN(i) ? r : n ? Math.round(i) : i;
	}
	return i.invert = function(t) {
		return e.invert(ov(t));
	}, i.domain = function(t) {
		return arguments.length ? (e.domain(t), i) : e.domain();
	}, i.range = function(n) {
		return arguments.length ? (e.range((t = Array.from(n, t_)).map(ov)), i) : t.slice();
	}, i.rangeRound = function(e) {
		return i.range(e).round(!0);
	}, i.round = function(e) {
		return arguments.length ? (n = !!e, i) : n;
	}, i.clamp = function(t) {
		return arguments.length ? (e.clamp(t), i) : e.clamp();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return cv(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
	}, Hh.apply(i, arguments), I_(i);
}
//#endregion
//#region node_modules/d3-scale/src/quantile.js
function lv() {
	var e = [], t = [], n = [], r;
	function i() {
		var r = 0, i = Math.max(1, t.length);
		for (n = Array(i - 1); ++r < i;) n[r - 1] = Bh(e, r / i);
		return a;
	}
	function a(e) {
		return e == null || isNaN(e = +e) ? r : t[bh(n, e)];
	}
	return a.invertExtent = function(r) {
		var i = t.indexOf(r);
		return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
	}, a.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(ph), i();
	}, a.range = function(e) {
		return arguments.length ? (t = Array.from(e), i()) : t.slice();
	}, a.unknown = function(e) {
		return arguments.length ? (r = e, a) : r;
	}, a.quantiles = function() {
		return n.slice();
	}, a.copy = function() {
		return lv().domain(e).range(t).unknown(r);
	}, Hh.apply(a, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/quantize.js
function uv() {
	var e = 0, t = 1, n = 1, r = [.5], i = [0, 1], a;
	function o(e) {
		return e != null && e <= e ? i[bh(r, e, 0, n)] : a;
	}
	function s() {
		var i = -1;
		for (r = Array(n); ++i < n;) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
		return o;
	}
	return o.domain = function(n) {
		return arguments.length ? ([e, t] = n, e = +e, t = +t, s()) : [e, t];
	}, o.range = function(e) {
		return arguments.length ? (n = (i = Array.from(e)).length - 1, s()) : i.slice();
	}, o.invertExtent = function(a) {
		var o = i.indexOf(a);
		return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
	}, o.unknown = function(e) {
		return arguments.length && (a = e), o;
	}, o.thresholds = function() {
		return r.slice();
	}, o.copy = function() {
		return uv().domain([e, t]).range(i).unknown(a);
	}, Hh.apply(I_(o), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/threshold.js
function dv() {
	var e = [.5], t = [0, 1], n, r = 1;
	function i(i) {
		return i != null && i <= i ? t[bh(e, i, 0, r)] : n;
	}
	return i.domain = function(n) {
		return arguments.length ? (e = Array.from(n), r = Math.min(e.length, t.length - 1), i) : e.slice();
	}, i.range = function(n) {
		return arguments.length ? (t = Array.from(n), r = Math.min(e.length, t.length - 1), i) : t.slice();
	}, i.invertExtent = function(n) {
		var r = t.indexOf(n);
		return [e[r - 1], e[r]];
	}, i.unknown = function(e) {
		return arguments.length ? (n = e, i) : n;
	}, i.copy = function() {
		return dv().domain(e).range(t).unknown(n);
	}, Hh.apply(i, arguments);
}
//#endregion
//#region node_modules/d3-time/src/interval.js
var fv = /* @__PURE__ */ new Date(), pv = /* @__PURE__ */ new Date();
function mv(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => mv((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (fv.setTime(+t), pv.setTime(+r), e(fv), e(pv), Math.floor(n(fv, pv))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
//#endregion
//#region node_modules/d3-time/src/millisecond.js
var hv = mv(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
hv.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? mv((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : hv), hv.range;
//#endregion
//#region node_modules/d3-time/src/duration.js
var gv = 1e3, _v = gv * 60, vv = _v * 60, yv = vv * 24, bv = yv * 7, xv = yv * 30, Sv = yv * 365, Cv = mv((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * gv);
}, (e, t) => (t - e) / gv, (e) => e.getUTCSeconds());
Cv.range;
//#endregion
//#region node_modules/d3-time/src/minute.js
var wv = mv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * gv);
}, (e, t) => {
	e.setTime(+e + t * _v);
}, (e, t) => (t - e) / _v, (e) => e.getMinutes());
wv.range;
var Tv = mv((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * _v);
}, (e, t) => (t - e) / _v, (e) => e.getUTCMinutes());
Tv.range;
//#endregion
//#region node_modules/d3-time/src/hour.js
var Ev = mv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * gv - e.getMinutes() * _v);
}, (e, t) => {
	e.setTime(+e + t * vv);
}, (e, t) => (t - e) / vv, (e) => e.getHours());
Ev.range;
var Dv = mv((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * vv);
}, (e, t) => (t - e) / vv, (e) => e.getUTCHours());
Dv.range;
//#endregion
//#region node_modules/d3-time/src/day.js
var Ov = mv((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * _v) / yv, (e) => e.getDate() - 1);
Ov.range;
var kv = mv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / yv, (e) => e.getUTCDate() - 1);
kv.range;
var Av = mv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / yv, (e) => Math.floor(e / yv));
Av.range;
//#endregion
//#region node_modules/d3-time/src/week.js
function jv(e) {
	return mv((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * _v) / bv);
}
var Mv = jv(0), Nv = jv(1), Pv = jv(2), Fv = jv(3), Iv = jv(4), Lv = jv(5), Rv = jv(6);
Mv.range, Nv.range, Pv.range, Fv.range, Iv.range, Lv.range, Rv.range;
function zv(e) {
	return mv((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / bv);
}
var Bv = zv(0), Vv = zv(1), Hv = zv(2), Uv = zv(3), Wv = zv(4), Gv = zv(5), Kv = zv(6);
Bv.range, Vv.range, Hv.range, Uv.range, Wv.range, Gv.range, Kv.range;
//#endregion
//#region node_modules/d3-time/src/month.js
var qv = mv((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
qv.range;
var Jv = mv((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Jv.range;
//#endregion
//#region node_modules/d3-time/src/year.js
var Yv = mv((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Yv.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : mv((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), Yv.range;
var Xv = mv((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Xv.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : mv((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), Xv.range;
//#endregion
//#region node_modules/d3-time/src/ticks.js
function Zv(e, t, n, r, i, a) {
	let o = [
		[
			Cv,
			1,
			gv
		],
		[
			Cv,
			5,
			5 * gv
		],
		[
			Cv,
			15,
			15 * gv
		],
		[
			Cv,
			30,
			30 * gv
		],
		[
			a,
			1,
			_v
		],
		[
			a,
			5,
			5 * _v
		],
		[
			a,
			15,
			15 * _v
		],
		[
			a,
			30,
			30 * _v
		],
		[
			i,
			1,
			vv
		],
		[
			i,
			3,
			3 * vv
		],
		[
			i,
			6,
			6 * vv
		],
		[
			i,
			12,
			12 * vv
		],
		[
			r,
			1,
			yv
		],
		[
			r,
			2,
			2 * yv
		],
		[
			n,
			1,
			bv
		],
		[
			t,
			1,
			xv
		],
		[
			t,
			3,
			3 * xv
		],
		[
			e,
			1,
			Sv
		]
	];
	function s(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : c(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function c(t, n, r) {
		let i = Math.abs(n - t) / r, a = hh(([, , e]) => e).right(o, i);
		if (a === o.length) return e.every(Ph(t / Sv, n / Sv, r));
		if (a === 0) return hv.every(Math.max(Ph(t, n, r), 1));
		let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
		return s.every(c);
	}
	return [s, c];
}
var [Qv, $v] = Zv(Xv, Jv, Bv, Av, Dv, Tv), [ey, ty] = Zv(Yv, qv, Mv, Ov, Ev, wv);
//#endregion
//#region node_modules/d3-time-format/src/locale.js
function ny(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function ry(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function iy(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function ay(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = fy(i), u = py(i), d = fy(a), f = py(a), p = fy(o), m = py(o), h = fy(s), g = py(s), _ = fy(c), v = py(c), y = {
		a: N,
		A: ee,
		b: te,
		B: ne,
		c: null,
		d: Py,
		e: Py,
		f: zy,
		g: Xy,
		G: Qy,
		H: Fy,
		I: Iy,
		j: Ly,
		L: Ry,
		m: By,
		M: Vy,
		p: re,
		q: ie,
		Q: xb,
		s: Sb,
		S: Hy,
		u: Uy,
		U: Wy,
		V: Ky,
		w: qy,
		W: Jy,
		x: null,
		X: null,
		y: Yy,
		Y: Zy,
		Z: $y,
		"%": bb
	}, b = {
		a: ae,
		A: oe,
		b: se,
		B: ce,
		c: null,
		d: eb,
		e: eb,
		f: ab,
		g: gb,
		G: vb,
		H: tb,
		I: nb,
		j: rb,
		L: ib,
		m: ob,
		M: sb,
		p: le,
		q: ue,
		Q: xb,
		s: Sb,
		S: cb,
		u: lb,
		U: ub,
		V: fb,
		w: pb,
		W: mb,
		x: null,
		X: null,
		y: hb,
		Y: _b,
		Z: yb,
		"%": bb
	}, x = {
		a: E,
		A: D,
		b: O,
		B: k,
		c: A,
		d: wy,
		e: wy,
		f: Ay,
		g: by,
		G: yy,
		H: Ey,
		I: Ey,
		j: Ty,
		L: ky,
		m: Cy,
		M: Dy,
		p: T,
		q: Sy,
		Q: My,
		s: Ny,
		S: Oy,
		u: hy,
		U: gy,
		V: _y,
		w: my,
		W: vy,
		x: j,
		X: M,
		y: by,
		Y: yy,
		Z: xy,
		"%": jy
	};
	y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), b.x = S(n, b), b.X = S(r, b), b.c = S(t, b);
	function S(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = oy[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function C(e, t) {
		return function(n) {
			var r = iy(1900, void 0, 1), i = w(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = ry(iy(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? Vv.ceil(a) : Vv(a), a = kv.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = ny(iy(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? Nv.ceil(a) : Nv(a), a = Ov.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? ry(iy(r.y, 0, 1)).getUTCDay() : ny(iy(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, ry(r)) : ny(r);
		};
	}
	function w(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = x[s in oy ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function T(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function E(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function D(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function O(e, t, n) {
		var r = _.exec(t.slice(n));
		return r ? (e.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function k(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = g.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function A(e, n, r) {
		return w(e, t, n, r);
	}
	function j(e, t, r) {
		return w(e, n, t, r);
	}
	function M(e, t, n) {
		return w(e, r, t, n);
	}
	function N(e) {
		return o[e.getDay()];
	}
	function ee(e) {
		return a[e.getDay()];
	}
	function te(e) {
		return c[e.getMonth()];
	}
	function ne(e) {
		return s[e.getMonth()];
	}
	function re(e) {
		return i[+(e.getHours() >= 12)];
	}
	function ie(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function ae(e) {
		return o[e.getUTCDay()];
	}
	function oe(e) {
		return a[e.getUTCDay()];
	}
	function se(e) {
		return c[e.getUTCMonth()];
	}
	function ce(e) {
		return s[e.getUTCMonth()];
	}
	function le(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function ue(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = S(e += "", y);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = C(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = S(e += "", b);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = C(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var oy = {
	"-": "",
	_: " ",
	0: "0"
}, sy = /^\s*\d+/, cy = /^%/, ly = /[\\^$*+?|[\]().{}]/g;
function uy(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function dy(e) {
	return e.replace(ly, "\\$&");
}
function fy(e) {
	return RegExp("^(?:" + e.map(dy).join("|") + ")", "i");
}
function py(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function my(e, t, n) {
	var r = sy.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function hy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function gy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function _y(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function vy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function yy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function by(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function xy(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Sy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Cy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function wy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function Ty(e, t, n) {
	var r = sy.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function Ey(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function Dy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function Oy(e, t, n) {
	var r = sy.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function ky(e, t, n) {
	var r = sy.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function Ay(e, t, n) {
	var r = sy.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function jy(e, t, n) {
	var r = cy.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function My(e, t, n) {
	var r = sy.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function Ny(e, t, n) {
	var r = sy.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function Py(e, t) {
	return uy(e.getDate(), t, 2);
}
function Fy(e, t) {
	return uy(e.getHours(), t, 2);
}
function Iy(e, t) {
	return uy(e.getHours() % 12 || 12, t, 2);
}
function Ly(e, t) {
	return uy(1 + Ov.count(Yv(e), e), t, 3);
}
function Ry(e, t) {
	return uy(e.getMilliseconds(), t, 3);
}
function zy(e, t) {
	return Ry(e, t) + "000";
}
function By(e, t) {
	return uy(e.getMonth() + 1, t, 2);
}
function Vy(e, t) {
	return uy(e.getMinutes(), t, 2);
}
function Hy(e, t) {
	return uy(e.getSeconds(), t, 2);
}
function Uy(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function Wy(e, t) {
	return uy(Mv.count(Yv(e) - 1, e), t, 2);
}
function Gy(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? Iv(e) : Iv.ceil(e);
}
function Ky(e, t) {
	return e = Gy(e), uy(Iv.count(Yv(e), e) + (Yv(e).getDay() === 4), t, 2);
}
function qy(e) {
	return e.getDay();
}
function Jy(e, t) {
	return uy(Nv.count(Yv(e) - 1, e), t, 2);
}
function Yy(e, t) {
	return uy(e.getFullYear() % 100, t, 2);
}
function Xy(e, t) {
	return e = Gy(e), uy(e.getFullYear() % 100, t, 2);
}
function Zy(e, t) {
	return uy(e.getFullYear() % 1e4, t, 4);
}
function Qy(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? Iv(e) : Iv.ceil(e), uy(e.getFullYear() % 1e4, t, 4);
}
function $y(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + uy(t / 60 | 0, "0", 2) + uy(t % 60, "0", 2);
}
function eb(e, t) {
	return uy(e.getUTCDate(), t, 2);
}
function tb(e, t) {
	return uy(e.getUTCHours(), t, 2);
}
function nb(e, t) {
	return uy(e.getUTCHours() % 12 || 12, t, 2);
}
function rb(e, t) {
	return uy(1 + kv.count(Xv(e), e), t, 3);
}
function ib(e, t) {
	return uy(e.getUTCMilliseconds(), t, 3);
}
function ab(e, t) {
	return ib(e, t) + "000";
}
function ob(e, t) {
	return uy(e.getUTCMonth() + 1, t, 2);
}
function sb(e, t) {
	return uy(e.getUTCMinutes(), t, 2);
}
function cb(e, t) {
	return uy(e.getUTCSeconds(), t, 2);
}
function lb(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function ub(e, t) {
	return uy(Bv.count(Xv(e) - 1, e), t, 2);
}
function db(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? Wv(e) : Wv.ceil(e);
}
function fb(e, t) {
	return e = db(e), uy(Wv.count(Xv(e), e) + (Xv(e).getUTCDay() === 4), t, 2);
}
function pb(e) {
	return e.getUTCDay();
}
function mb(e, t) {
	return uy(Vv.count(Xv(e) - 1, e), t, 2);
}
function hb(e, t) {
	return uy(e.getUTCFullYear() % 100, t, 2);
}
function gb(e, t) {
	return e = db(e), uy(e.getUTCFullYear() % 100, t, 2);
}
function _b(e, t) {
	return uy(e.getUTCFullYear() % 1e4, t, 4);
}
function vb(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? Wv(e) : Wv.ceil(e), uy(e.getUTCFullYear() % 1e4, t, 4);
}
function yb() {
	return "+0000";
}
function bb() {
	return "%";
}
function xb(e) {
	return +e;
}
function Sb(e) {
	return Math.floor(e / 1e3);
}
//#endregion
//#region node_modules/d3-time-format/src/defaultLocale.js
var Cb, wb, Tb;
Eb({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function Eb(e) {
	return Cb = ay(e), wb = Cb.format, Cb.parse, Tb = Cb.utcFormat, Cb.utcParse, Cb;
}
//#endregion
//#region node_modules/d3-scale/src/time.js
function Db(e) {
	return new Date(e);
}
function Ob(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function kb(e, t, n, r, i, a, o, s, c, l) {
	var u = u_(), d = u.invert, f = u.domain, p = l(".%L"), m = l(":%S"), h = l("%I:%M"), g = l("%I %p"), _ = l("%a %d"), v = l("%b %d"), y = l("%B"), b = l("%Y");
	function x(e) {
		return (c(e) < e ? p : s(e) < e ? m : o(e) < e ? h : a(e) < e ? g : r(e) < e ? i(e) < e ? _ : v : n(e) < e ? y : b)(e);
	}
	return u.invert = function(e) {
		return new Date(d(e));
	}, u.domain = function(e) {
		return arguments.length ? f(Array.from(e, Ob)) : f().map(Db);
	}, u.ticks = function(t) {
		var n = f();
		return e(n[0], n[n.length - 1], t ?? 10);
	}, u.tickFormat = function(e, t) {
		return t == null ? x : l(t);
	}, u.nice = function(e) {
		var n = f();
		return (!e || typeof e.range != "function") && (e = t(n[0], n[n.length - 1], e ?? 10)), e ? f(z_(n, e)) : u;
	}, u.copy = function() {
		return c_(u, kb(e, t, n, r, i, a, o, s, c, l));
	}, u;
}
function Ab() {
	return Hh.apply(kb(ey, ty, Yv, qv, Mv, Ov, Ev, wv, Cv, wb).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/utcTime.js
function jb() {
	return Hh.apply(kb(Qv, $v, Xv, Jv, Bv, kv, Dv, Tv, Cv, Tb).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/sequential.js
function Mb() {
	var e = 0, t = 1, n, r, i, a, o = r_, s = !1, c;
	function l(e) {
		return e == null || isNaN(e = +e) ? c : o(i === 0 ? .5 : (e = (a(e) - n) * i, s ? Math.max(0, Math.min(1, e)) : e));
	}
	l.domain = function(o) {
		return arguments.length ? ([e, t] = o, n = a(e = +e), r = a(t = +t), i = n === r ? 0 : 1 / (r - n), l) : [e, t];
	}, l.clamp = function(e) {
		return arguments.length ? (s = !!e, l) : s;
	}, l.interpolator = function(e) {
		return arguments.length ? (o = e, l) : o;
	};
	function u(e) {
		return function(t) {
			var n, r;
			return arguments.length ? ([n, r] = t, o = e(n, r), l) : [o(0), o(1)];
		};
	}
	return l.range = u(Zg), l.rangeRound = u(Qg), l.unknown = function(e) {
		return arguments.length ? (c = e, l) : c;
	}, function(o) {
		return a = o, n = o(e), r = o(t), i = n === r ? 0 : 1 / (r - n), l;
	};
}
function Nb(e, t) {
	return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Pb() {
	var e = I_(Mb()(r_));
	return e.copy = function() {
		return Nb(e, Pb());
	}, Uh.apply(e, arguments);
}
function Fb() {
	var e = J_(Mb()).domain([1, 10]);
	return e.copy = function() {
		return Nb(e, Fb()).base(e.base());
	}, Uh.apply(e, arguments);
}
function Ib() {
	var e = Q_(Mb());
	return e.copy = function() {
		return Nb(e, Ib()).constant(e.constant());
	}, Uh.apply(e, arguments);
}
function Lb() {
	var e = rv(Mb());
	return e.copy = function() {
		return Nb(e, Lb()).exponent(e.exponent());
	}, Uh.apply(e, arguments);
}
function Rb() {
	return Lb.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/sequentialQuantile.js
function zb() {
	var e = [], t = r_;
	function n(n) {
		if (n != null && !isNaN(n = +n)) return t((bh(e, n, 1) - 1) / (e.length - 1));
	}
	return n.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(ph), n;
	}, n.interpolator = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.range = function() {
		return e.map((n, r) => t(r / (e.length - 1)));
	}, n.quantiles = function(t) {
		return Array.from({ length: t + 1 }, (n, r) => zh(e, r / t));
	}, n.copy = function() {
		return zb(t).domain(e);
	}, Uh.apply(n, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/diverging.js
function Bb() {
	var e = 0, t = .5, n = 1, r = 1, i, a, o, s, c, l = r_, u, d = !1, f;
	function p(e) {
		return isNaN(e = +e) ? f : (e = .5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c), l(d ? Math.max(0, Math.min(1, e)) : e));
	}
	p.domain = function(l) {
		return arguments.length ? ([e, t, n] = l, i = u(e = +e), a = u(t = +t), o = u(n = +n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p) : [
			e,
			t,
			n
		];
	}, p.clamp = function(e) {
		return arguments.length ? (d = !!e, p) : d;
	}, p.interpolator = function(e) {
		return arguments.length ? (l = e, p) : l;
	};
	function m(e) {
		return function(t) {
			var n, r, i;
			return arguments.length ? ([n, r, i] = t, l = $g(e, [
				n,
				r,
				i
			]), p) : [
				l(0),
				l(.5),
				l(1)
			];
		};
	}
	return p.range = m(Zg), p.rangeRound = m(Qg), p.unknown = function(e) {
		return arguments.length ? (f = e, p) : f;
	}, function(l) {
		return u = l, i = l(e), a = l(t), o = l(n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p;
	};
}
function Vb() {
	var e = I_(Bb()(r_));
	return e.copy = function() {
		return Nb(e, Vb());
	}, Uh.apply(e, arguments);
}
function Hb() {
	var e = J_(Bb()).domain([
		.1,
		1,
		10
	]);
	return e.copy = function() {
		return Nb(e, Hb()).base(e.base());
	}, Uh.apply(e, arguments);
}
function Ub() {
	var e = Q_(Bb());
	return e.copy = function() {
		return Nb(e, Ub()).constant(e.constant());
	}, Uh.apply(e, arguments);
}
function Wb() {
	var e = rv(Bb());
	return e.copy = function() {
		return Nb(e, Wb()).exponent(e.exponent());
	}, Uh.apply(e, arguments);
}
function Gb() {
	return Wb.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/victory-vendor/es/d3-scale.js
var Kb = /* @__PURE__ */ s({
	scaleBand: () => Kh,
	scaleDiverging: () => Vb,
	scaleDivergingLog: () => Hb,
	scaleDivergingPow: () => Wb,
	scaleDivergingSqrt: () => Gb,
	scaleDivergingSymlog: () => Ub,
	scaleIdentity: () => R_,
	scaleImplicit: () => Wh,
	scaleLinear: () => L_,
	scaleLog: () => Y_,
	scaleOrdinal: () => Gh,
	scalePoint: () => Jh,
	scalePow: () => iv,
	scaleQuantile: () => lv,
	scaleQuantize: () => uv,
	scaleRadial: () => cv,
	scaleSequential: () => Pb,
	scaleSequentialLog: () => Fb,
	scaleSequentialPow: () => Lb,
	scaleSequentialQuantile: () => zb,
	scaleSequentialSqrt: () => Rb,
	scaleSequentialSymlog: () => Ib,
	scaleSqrt: () => av,
	scaleSymlog: () => $_,
	scaleThreshold: () => dv,
	scaleTime: () => Ab,
	scaleUtc: () => jb,
	tickFormat: () => F_
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineConfiguredScale.js
function qb(e) {
	var t = Kb;
	if (e in t && typeof t[e] == "function") return t[e]();
	var n = `scale${Oe(e)}`;
	if (n in t && typeof t[n] == "function") return t[n]();
}
function Jb(e, t, n) {
	if (typeof e == "function") return e.copy().domain(t).range(n);
	if (e != null) {
		var r = qb(e);
		if (r != null) return r.domain(t).range(n), r;
	}
}
function Yb(e, t, n, r) {
	if (n != null && r != null) return typeof e.scale == "function" ? Jb(e.scale, n, r) : Jb(t, n, r);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineRealScaleType.js
function Xb(e) {
	return `scale${Oe(e)}`;
}
function Zb(e) {
	return Xb(e) in Kb;
}
var Qb = (e, t, n) => {
	if (e != null) {
		var r = e.scale, i = e.type;
		if (r === "auto") return i === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
		if (typeof r == "string") return Zb(r) ? r : "point";
	}
};
//#endregion
//#region node_modules/recharts/es6/util/scale/createCategoricalInverse.js
function $b(e, t) {
	for (var n = 0, r = e.length, i = e[0] < e[e.length - 1]; n < r;) {
		var a = Math.floor((n + r) / 2);
		(i ? e[a] < t : e[a] > t) ? n = a + 1 : r = a;
	}
	return n;
}
function ex(e, t) {
	if (e) {
		var n = t ?? e.domain(), r = n.map((t) => e(t) ?? 0), i = e.range();
		if (!(n.length === 0 || i.length < 2)) return (e) => {
			var t = $b(r, e);
			if (t <= 0) return n[0];
			if (t >= n.length) return n[n.length - 1];
			var i = r[t - 1] ?? 0, a = r[t] ?? 0;
			return Math.abs(e - i) <= Math.abs(e - a) ? n[t - 1] : n[t];
		};
	}
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineInverseScaleFunction.js
function tx(e) {
	if (e != null) return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : ex(e, void 0);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/axisSelectors.js
function nx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function rx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? nx(Object(n), !0).forEach(function(t) {
			ix(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : nx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ix(e, t, n) {
	return (t = ax(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ax(e) {
	var t = ox(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ox(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function sx(e, t) {
	return fx(e) || dx(e, t) || lx(e, t) || cx();
}
function cx() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function lx(e, t) {
	if (e) {
		if (typeof e == "string") return ux(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ux(e, t) : void 0;
	}
}
function ux(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function dx(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function fx(e) {
	if (Array.isArray(e)) return e;
}
var px = [0, "auto"], mx = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0,
	niceTicks: "auto"
}, hx = (e, t) => e.cartesianAxis.xAxis[t], gx = (e, t) => hx(e, t) ?? mx, _x = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: px,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	niceTicks: "auto",
	width: 60
}, vx = (e, t) => e.cartesianAxis.yAxis[t], yx = (e, t) => vx(e, t) ?? _x, bx = {
	domain: [0, "auto"],
	includeHidden: !1,
	reversed: !1,
	allowDataOverflow: !1,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
}, xx = (e, t) => e.cartesianAxis.zAxis[t] ?? bx, Sx = (e, t, n) => {
	switch (t) {
		case "xAxis": return gx(e, n);
		case "yAxis": return yx(e, n);
		case "zAxis": return xx(e, n);
		case "angleAxis": return Km(e, n);
		case "radiusAxis": return qm(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Cx = (e, t, n) => {
	switch (t) {
		case "xAxis": return gx(e, n);
		case "yAxis": return yx(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, wx = (e, t, n) => {
	switch (t) {
		case "xAxis": return gx(e, n);
		case "yAxis": return yx(e, n);
		case "angleAxis": return Km(e, n);
		case "radiusAxis": return qm(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Tx = (e) => e.graphicalItems.cartesianItems.some((e) => e.type === "bar") || e.graphicalItems.polarItems.some((e) => e.type === "radialBar");
function Ex(e, t) {
	return (n) => {
		switch (e) {
			case "xAxis": return "xAxisId" in n && n.xAxisId === t;
			case "yAxis": return "yAxisId" in n && n.yAxisId === t;
			case "zAxis": return "zAxisId" in n && n.zAxisId === t;
			case "angleAxis": return "angleAxisId" in n && n.angleAxisId === t;
			case "radiusAxis": return "radiusAxisId" in n && n.radiusAxisId === t;
			default: return !1;
		}
	};
}
var Dx = (e) => e.graphicalItems.cartesianItems, Ox = B([th, nh], Ex), kx = (e, t, n) => e.filter(n).filter((e) => t?.includeHidden === !0 || !e.hide), Ax = B([
	Dx,
	Sx,
	Ox
], kx, { memoizeOptions: { resultEqualityCheck: sh } }), jx = B([Ax], (e) => e.filter((e) => e.type === "area" || e.type === "bar").filter(ah)), Mx = (e) => e.filter((e) => !("stackId" in e) || e.stackId === void 0), Nx = B([Ax], Mx), Px = (e) => e.map((e) => e.data).filter(Boolean).flat(1), Fx = B([Ax], (e) => e.some((e) => !e.data)), Ix = B([Ax], Px, { memoizeOptions: { resultEqualityCheck: sh } }), Lx = (e, t) => {
	var n = t.chartData, r = n === void 0 ? [] : n, i = t.dataStartIndex, a = t.dataEndIndex;
	return e.length > 0 ? e : r.slice(i, a + 1);
}, Rx = B([Ix, Yp], Lx), zx = (e, t, n) => t?.dataKey == null ? n.length > 0 ? n.map((e) => e.dataKey).flatMap((t) => e.map((e) => ({ value: tc(e, t) }))) : e.map((e) => ({ value: e })) : e.map((e) => ({ value: tc(e, t.dataKey) })), Bx = (e, t, n, r, i, a) => {
	var o = r.chartData, s = o === void 0 ? [] : o, c = r.dataStartIndex, l = r.dataEndIndex, u = zx(e, t, n);
	return i && t?.dataKey != null && a.length > 0 ? [...s.slice(c, l + 1).map((e) => ({ value: tc(e, t.dataKey) })).filter((e) => e.value != null), ...u] : u;
}, Vx = B([
	Rx,
	Sx,
	Ax,
	Yp,
	Fx,
	Ix
], Bx);
function Hx(e) {
	if (be(e) || e instanceof Date) {
		var t = Number(e);
		if (G(t)) return t;
	}
}
function Ux(e) {
	if (Array.isArray(e)) {
		var t = [Hx(e[0]), Hx(e[1])];
		return am(t) ? t : void 0;
	}
	var n = Hx(e);
	if (n != null) return [n, n];
}
function Wx(e) {
	return e.map(Hx).filter(ke);
}
function Gx(e, t) {
	var n = Hx(e), r = Hx(t);
	return n == null && r == null ? 0 : n == null ? -1 : r == null ? 1 : n - r;
}
var Kx = B([Vx], (e) => e?.map((e) => e.value).sort(Gx));
function qx(e, t) {
	switch (e) {
		case "xAxis": return t.direction === "x";
		case "yAxis": return t.direction === "y";
		default: return !1;
	}
}
function Jx(e, t, n) {
	if (!n || !n.length) return [];
	var r;
	if (typeof t == "number" && !ve(t)) r = t;
	else if (Array.isArray(t)) {
		var i = Wx(t);
		i.length > 0 && (r = Math.max(...i));
	}
	return r == null ? [] : Wx(n.flatMap((t) => {
		var n = tc(e, t.dataKey), i, a;
		if (Array.isArray(n)) {
			var o = sx(n, 2);
			i = o[0], a = o[1];
		} else i = a = n;
		if (G(i) && G(a)) return [r - i, r + a];
	}));
}
var Yx = (e) => wx(e, lh(e), uh(e)), Xx = B([Yx], (e) => e?.dataKey), Zx = B([
	jx,
	Yp,
	Yx
], ih), Qx = (e, t, n, r) => {
	var i = t.reduce((e, t) => {
		if (t.stackId == null) return e;
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, {});
	return Object.fromEntries(Object.entries(i).map((t) => {
		var i = sx(t, 2), a = i[0], o = i[1], s = r ? [...o].reverse() : o;
		return [a, {
			stackedData: cc(e, s.map(rh), n),
			graphicalItems: s
		}];
	}));
}, $x = B([
	Zx,
	jx,
	Om,
	km
], Qx), eS = (e, t, n, r) => {
	var i = t.dataStartIndex, a = t.dataEndIndex;
	if (r == null && n !== "zAxis") return hc(e, i, a);
}, tS = B([Sx], (e) => e.allowDataOverflow), nS = (e) => {
	if (e == null || !("domain" in e)) return px;
	if (e.domain != null) return e.domain;
	if ("ticks" in e && e.ticks != null) {
		if (e.type === "number") {
			var t = Wx(e.ticks);
			return [Math.min(...t), Math.max(...t)];
		}
		if (e.type === "category") return e.ticks.map(String);
	}
	return e?.domain ?? px;
}, rS = B([Sx], nS), iS = B([rS, tS], sm), aS = B([
	$x,
	qp,
	th,
	iS
], eS, { memoizeOptions: { resultEqualityCheck: oh } }), oS = (e) => e.errorBars, sS = (e, t, n) => e.flatMap((e) => t[e.id]).filter(Boolean).filter((e) => qx(n, e)), cS = function() {
	var e = [...arguments].filter(Boolean);
	if (e.length !== 0) {
		var t = e.flat();
		return [Math.min(...t), Math.max(...t)];
	}
}, lS = function(e, t, n, r, i) {
	var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], o, s;
	if (n.length > 0 && n.forEach((e) => {
		var n = e.data == null ? a : [...e.data], c = r[e.id]?.filter((e) => qx(i, e));
		n.forEach((n) => {
			var r = tc(n, t.dataKey ?? e.dataKey), i = Jx(n, r, c);
			if (i.length >= 2) {
				var a = Math.min(...i), l = Math.max(...i);
				(o == null || a < o) && (o = a), (s == null || l > s) && (s = l);
			}
			var u = Ux(r);
			u != null && (o = o == null ? u[0] : Math.min(o, u[0]), s = s == null ? u[1] : Math.max(s, u[1]));
		});
	}), t?.dataKey != null && n.length === 0 && e.forEach((e) => {
		var n = Ux(tc(e, t.dataKey));
		n != null && (o = o == null ? n[0] : Math.min(o, n[0]), s = s == null ? n[1] : Math.max(s, n[1]));
	}), G(o) && G(s)) return [o, s];
}, uS = B([
	Rx,
	Sx,
	Nx,
	oS,
	th,
	Zp
], lS, { memoizeOptions: { resultEqualityCheck: oh } });
function dS(e) {
	var t = e.value;
	if (be(t) || t instanceof Date) return t;
}
var fS = (e, t, n) => {
	var r = e.map(dS).filter((e) => e != null);
	return n && (t.dataKey == null || t.allowDuplicatedCategory && we(r)) ? Kp(0, e.length) : t.allowDuplicatedCategory ? r : Array.from(new Set(r));
}, pS = (e) => e.referenceElements.dots, mS = (e, t, n) => e.filter((e) => e.ifOverflow === "extendDomain").filter((e) => t === "xAxis" ? e.xAxisId === n : e.yAxisId === n), hS = B([
	pS,
	th,
	nh
], mS), gS = (e) => e.referenceElements.areas, _S = B([
	gS,
	th,
	nh
], mS), vS = (e) => e.referenceElements.lines, yS = B([
	vS,
	th,
	nh
], mS), bS = (e, t) => {
	if (e != null) {
		var n = Wx(e.map((e) => t === "xAxis" ? e.x : e.y));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, xS = B(hS, th, bS), SS = (e, t) => {
	if (e != null) {
		var n = Wx(e.flatMap((e) => [t === "xAxis" ? e.x1 : e.y1, t === "xAxis" ? e.x2 : e.y2]));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, CS = B([_S, th], SS);
function wS(e) {
	if (e.x != null) return Wx([e.x]);
	var t = e.segment?.map((e) => e.x);
	return t == null || t.length === 0 ? [] : Wx(t);
}
function TS(e) {
	if (e.y != null) return Wx([e.y]);
	var t = e.segment?.map((e) => e.y);
	return t == null || t.length === 0 ? [] : Wx(t);
}
var ES = (e, t) => {
	if (e != null) {
		var n = e.flatMap((e) => t === "xAxis" ? wS(e) : TS(e));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, DS = B(xS, B([yS, th], ES), CS, (e, t, n) => cS(e, n, t)), OS = (e, t, n, r, i, a, o, s, c) => {
	if (n != null) return n;
	var l = o === "vertical" && s === "xAxis" || o === "horizontal" && s === "yAxis" ? cS(r, a, i) : cS(a, i), u = cm(t, l, e.allowDataOverflow);
	return u == null && e.allowDataOverflow && l == null && c != null ? c : u;
}, kS = B([
	Sx,
	rS,
	iS,
	aS,
	uS,
	DS,
	Nl,
	th,
	B([Sx], (e) => {
		if (e != null && e.type === "number" && "ticks" in e && e.ticks != null) {
			var t = Wx(e.ticks);
			if (t.length !== 0) return [Math.min(...t), Math.max(...t)];
		}
	}, { memoizeOptions: { resultEqualityCheck: oh } })
], OS, { memoizeOptions: { resultEqualityCheck: oh } }), AS = [0, 1], jS = (e, t, n, r, i, a, o) => {
	if (e != null && n != null && n.length !== 0 || o !== void 0) {
		var s = e.dataKey, c = e.type, l = rc(t, a);
		return l && s == null ? Kp(0, n?.length ?? 0) : c === "category" ? fS(r, e, l) : i === "expand" && !l ? AS : o;
	}
}, MS = B([
	Sx,
	Nl,
	Rx,
	Vx,
	Om,
	th,
	kS
], jS), NS = B([
	Sx,
	Tx,
	Am
], Qb), PS = (e, t, n) => {
	var r = t.niceTicks;
	if (r !== "none") {
		var i = nS(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
		if ((r === "snap125" || r === "adaptive") && t != null && t.tickCount && am(e)) {
			if (a) return Sm(e, t.tickCount, t.allowDecimals, r);
			if (t.type === "number") return Cm(e, t.tickCount, t.allowDecimals, r);
		}
		if (r === "auto" && n === "linear" && t != null && t.tickCount) {
			if (a && am(e)) return Sm(e, t.tickCount, t.allowDecimals, "adaptive");
			if (t.type === "number" && am(e)) return Cm(e, t.tickCount, t.allowDecimals, "adaptive");
		}
	}
}, FS = B([
	MS,
	wx,
	NS
], PS), IS = (e, t, n, r) => {
	if (r !== "angleAxis" && e?.type === "number" && am(t) && Array.isArray(n) && n.length > 0) {
		var i = t[0], a = n[0] ?? 0, o = t[1], s = n[n.length - 1] ?? 0;
		return [Math.min(i, a), Math.max(o, s)];
	}
	return t;
}, LS = B([
	Sx,
	MS,
	FS,
	th
], IS), RS = B(B(Vx, Sx, (e, t) => {
	if (t && t.type === "number") {
		var n = Infinity, r = Array.from(Wx(e.map((e) => e.value))).sort((e, t) => e - t), i = r[0], a = r[r.length - 1];
		if (i == null || a == null) return Infinity;
		var o = a - i;
		if (o === 0) return Infinity;
		for (var s = 0; s < r.length - 1; s++) {
			var c = r[s], l = r[s + 1];
			if (c != null && l != null) {
				var u = l - c;
				n = Math.min(n, u);
			}
		}
		return n / o;
	}
}), Nl, Em, Bc, (e, t, n, r, i) => i, (e, t, n, r, i) => {
	if (!G(e)) return 0;
	var a = t === "vertical" ? r.height : r.width;
	if (i === "gap") return e * a / 2;
	if (i === "no-gap") {
		var o = Ce(n, e * a), s = e * a / 2;
		return s - o - (s - o) / a * o;
	}
	return 0;
}), zS = (e, t, n) => {
	var r = gx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : RS(e, "xAxis", t, n, r.padding);
}, BS = (e, t, n) => {
	var r = yx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : RS(e, "yAxis", t, n, r.padding);
}, VS = B(gx, zS, (e, t) => {
	if (e == null) return {
		left: 0,
		right: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		left: t,
		right: t
	} : {
		left: (n.left ?? 0) + t,
		right: (n.right ?? 0) + t
	};
}), HS = B(yx, BS, (e, t) => {
	if (e == null) return {
		top: 0,
		bottom: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		top: t,
		bottom: t
	} : {
		top: (n.top ?? 0) + t,
		bottom: (n.bottom ?? 0) + t
	};
}), US = B([
	Bc,
	VS,
	qc,
	Kc,
	(e, t, n) => n
], (e, t, n, r, i) => {
	var a = r.padding;
	return i ? [a.left, n.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), WS = B([
	Bc,
	Nl,
	HS,
	qc,
	Kc,
	(e, t, n) => n
], (e, t, n, r, i, a) => {
	var o = i.padding;
	return a ? [r.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - n.bottom, e.top + n.top] : [e.top + n.top, e.top + e.height - n.bottom];
}), GS = (e, t, n, r) => {
	switch (t) {
		case "xAxis": return US(e, n, r);
		case "yAxis": return WS(e, n, r);
		case "zAxis": return xx(e, n)?.range;
		case "angleAxis": return Qm(e);
		case "radiusAxis": return $m(e, n);
		default: return;
	}
}, KS = B([Sx, GS], Lm), qS = B([
	Sx,
	NS,
	B([NS, LS], fh),
	KS
], Yb), JS = (e, t, n, r) => {
	if (n != null && n.dataKey != null) {
		var i = n.type, a = n.scale;
		if (rc(e, r) && (i === "number" || a !== "auto")) return t.map((e) => e.value);
	}
}, YS = B([
	Nl,
	Vx,
	wx,
	th
], JS), XS = B([qS], dh);
B([qS], tx), B([qS, Kx], ex), B([
	Ax,
	oS,
	th
], sS);
function ZS(e, t) {
	return e.id < t.id ? -1 : +(e.id > t.id);
}
var QS = (e, t) => t, $S = (e, t, n) => n, eC = B(Dc, QS, $S, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(ZS)), tC = B(Oc, QS, $S, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(ZS)), nC = (e, t) => {
	var n = typeof t.height == "number" ? t.height : 30;
	return {
		width: e.width,
		height: n
	};
}, rC = (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
}), iC = B(Bc, gx, nC), aC = (e, t, n) => {
	switch (t) {
		case "top": return e.top;
		case "bottom": return n - e.bottom;
		default: return 0;
	}
}, oC = (e, t, n) => {
	switch (t) {
		case "left": return e.left;
		case "right": return n - e.right;
		default: return 0;
	}
}, sC = B(wc, Bc, eC, QS, $S, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = nC(t, n);
		o ??= aC(t, r, e);
		var c = r === "top" && !i || r === "bottom" && i;
		a[n.id] = o - Number(c) * s.height, o += (c ? -1 : 1) * s.height;
	}), a;
}), cC = B(Cc, Bc, tC, QS, $S, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = rC(t, n);
		o ??= oC(t, r, e);
		var c = r === "left" && !i || r === "right" && i;
		a[n.id] = o - Number(c) * s.width, o += (c ? -1 : 1) * s.width;
	}), a;
}), lC = B([
	Bc,
	gx,
	(e, t) => {
		var n = gx(e, t);
		if (n != null) return sC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: e.left,
			y: 0
		} : {
			x: e.left,
			y: i
		};
	}
}), uC = B([
	Bc,
	yx,
	(e, t) => {
		var n = yx(e, t);
		if (n != null) return cC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: 0,
			y: e.top
		} : {
			x: i,
			y: e.top
		};
	}
}), dC = B(Bc, yx, (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
})), fC = (e, t, n) => {
	switch (t) {
		case "xAxis": return iC(e, n).width;
		case "yAxis": return dC(e, n).height;
		default: return;
	}
}, pC = (e, t, n, r) => {
	if (n != null) {
		var i = n.allowDuplicatedCategory, a = n.type, o = n.dataKey, s = rc(e, r), c = t.map((e) => e.value), l = c.filter((e) => e != null);
		if (o && s && a === "category" && i && we(l)) return c;
	}
}, mC = B([
	Nl,
	Vx,
	Sx,
	th
], pC), hC = B([
	Nl,
	Cx,
	NS,
	XS,
	mC,
	YS,
	GS,
	FS,
	th
], (e, t, n, r, i, a, o, s, c) => {
	if (t != null) {
		var l = rc(e, c);
		return {
			angle: t.angle,
			interval: t.interval,
			minTickGap: t.minTickGap,
			orientation: t.orientation,
			tick: t.tick,
			tickCount: t.tickCount,
			tickFormatter: t.tickFormatter,
			ticks: t.ticks,
			type: t.type,
			unit: t.unit,
			axisType: c,
			categoricalDomain: a,
			duplicateDomain: i,
			isCategorical: l,
			niceTicks: s,
			range: o,
			realScaleType: n,
			scale: r
		};
	}
}), gC = B([
	Nl,
	wx,
	NS,
	XS,
	FS,
	GS,
	mC,
	YS,
	th
], (e, t, n, r, i, a, o, s, c) => {
	if (t != null && r != null) {
		var l = rc(e, c), u = t.type, d = t.ticks, f = t.tickCount, p = n === "scaleBand" && typeof r.bandwidth == "function" ? r.bandwidth() / 2 : 2, m = u === "category" && r.bandwidth ? r.bandwidth() / p : 0;
		m = c === "angleAxis" && a != null && a.length >= 2 ? _e(a[0] - a[1]) * 2 * m : m;
		var h = d || i;
		return h ? h.map((e, t) => {
			var n = o ? o.indexOf(e) : e, i = r.map(n);
			return G(i) ? {
				index: t,
				coordinate: i + m,
				value: e,
				offset: m
			} : null;
		}).filter(ke) : l && s ? s.map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(ke) : r.ticks ? r.ticks(f).map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(ke) : r.domain().map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: o ? o[e] : e,
				index: t,
				offset: m
			} : null;
		}).filter(ke);
	}
}), _C = B([
	Nl,
	wx,
	XS,
	GS,
	mC,
	YS,
	th
], (e, t, n, r, i, a, o) => {
	if (t != null && n != null && r != null && r[0] !== r[1]) {
		var s = rc(e, o), c = t.tickCount, l = 0;
		return l = o === "angleAxis" && r?.length >= 2 ? _e(r[0] - r[1]) * 2 * l : l, s && a ? a.map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(ke) : n.ticks ? n.ticks(c).map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(ke) : n.domain().map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: i ? i[e] : e,
				index: t,
				offset: l
			} : null;
		}).filter(ke);
	}
}), vC = B(Sx, XS, (e, t) => {
	if (e != null && t != null) return rx(rx({}, e), {}, { scale: t });
});
B((e, t, n) => xx(e, n), B([B([
	Sx,
	NS,
	MS,
	KS
], Yb)], dh), (e, t) => {
	if (e != null && t != null) return rx(rx({}, e), {}, { scale: t });
});
var yC = B([
	Nl,
	Dc,
	Oc
], (e, t, n) => {
	switch (e) {
		case "horizontal": return t.some((e) => e.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return n.some((e) => e.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
B([(e, t, n) => e.renderedTicks[t]?.[n]], (e) => {
	if (e && e.length !== 0) return (t) => {
		var n = Infinity, r = e[0];
		for (var i of e) {
			var a = Math.abs(i.coordinate - t);
			a < n && (n = a, r = i);
		}
		return r?.value;
	};
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipEventType.js
var bC = (e) => e.options.defaultTooltipEventType, xC = (e) => e.options.validateTooltipEventTypes;
function SC(e, t, n) {
	if (e == null) return t;
	var r = e ? "axis" : "item";
	return n == null ? t : n.includes(r) ? r : t;
}
function CC(e, t) {
	return SC(t, bC(e), xC(e));
}
function wC(e) {
	return z((t) => CC(t, e));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveLabel.js
var TC = (e, t) => {
	var n, r = Number(t);
	if (!(ve(r) || t == null)) return r >= 0 ? e == null || (n = e[r]) == null ? void 0 : n.value : void 0;
}, EC = (e) => e.tooltip.settings, DC = {
	active: !1,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
}, OC = $o({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: DC,
			hover: DC
		},
		axisInteraction: {
			click: DC,
			hover: DC
		},
		keyboardInteraction: DC,
		syncInteraction: {
			active: !1,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: !1,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(e, t) {
				e.tooltipItemPayloads.push(H(t.payload));
			},
			prepare: U()
		},
		replaceTooltipEntrySettings: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Eo(e).tooltipItemPayloads.indexOf(H(r));
				a > -1 && (e.tooltipItemPayloads[a] = H(i));
			},
			prepare: U()
		},
		removeTooltipEntrySettings: {
			reducer(e, t) {
				var n = Eo(e).tooltipItemPayloads.indexOf(H(t.payload));
				n > -1 && e.tooltipItemPayloads.splice(n, 1);
			},
			prepare: U()
		},
		setTooltipSettingsState(e, t) {
			e.settings = t.payload;
		},
		setActiveMouseOverItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		mouseLeaveChart(e) {
			e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
		},
		mouseLeaveItem(e) {
			e.itemInteraction.hover.active = !1;
		},
		setActiveClickItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setSyncInteraction(e, t) {
			e.syncInteraction = t.payload;
		},
		setKeyboardInteraction(e, t) {
			e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
		}
	}
}), kC = OC.actions, AC = kC.addTooltipEntrySettings, jC = kC.replaceTooltipEntrySettings, MC = kC.removeTooltipEntrySettings, NC = kC.setTooltipSettingsState, PC = kC.setActiveMouseOverItemIndex, FC = kC.mouseLeaveItem, IC = kC.mouseLeaveChart, LC = kC.setActiveClickItemIndex, RC = kC.setMouseOverAxisIndex, zC = kC.setMouseClickAxisIndex, BC = kC.setSyncInteraction, VC = kC.setKeyboardInteraction, HC = OC.reducer;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipInteractionState.js
function UC(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function WC(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? UC(Object(n), !0).forEach(function(t) {
			GC(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : UC(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function GC(e, t, n) {
	return (t = KC(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function KC(e) {
	var t = qC(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function qC(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function JC(e, t, n) {
	return t === "axis" ? n === "click" ? e.axisInteraction.click : e.axisInteraction.hover : n === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function YC(e) {
	return e.index != null;
}
var XC = (e, t, n, r) => {
	if (t == null) return DC;
	var i = JC(e, t, n);
	if (i == null) return DC;
	if (i.active) return i;
	if (e.keyboardInteraction.active) return e.keyboardInteraction;
	if (e.syncInteraction.active && e.syncInteraction.index != null) return e.syncInteraction;
	var a = e.settings.active === !0;
	if (YC(i)) {
		if (a) return WC(WC({}, i), {}, { active: !0 });
	} else if (r != null) return {
		active: !0,
		coordinate: void 0,
		dataKey: void 0,
		index: r,
		graphicalItemId: void 0
	};
	return WC(WC({}, DC), {}, { coordinate: i.coordinate });
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveTooltipIndex.js
function ZC(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (e instanceof Date) {
		var t = e.valueOf();
		return Number.isFinite(t) ? t : void 0;
	}
	var n = Number(e);
	return Number.isFinite(n) ? n : void 0;
}
function QC(e, t) {
	var n = ZC(e), r = t[0], i = t[1];
	return n !== void 0 && n >= Math.min(r, i) && n <= Math.max(r, i);
}
function $C(e, t, n) {
	if (n == null || t == null) return !0;
	var r = tc(e, t);
	return r == null || !am(n) || QC(r, n);
}
var ew = (e, t, n, r) => {
	var i = e?.index;
	if (i == null) return null;
	var a = Number(i);
	if (!G(a)) return i;
	var o = 0, s = Infinity;
	t.length > 0 && (s = t.length - 1);
	var c = Math.max(o, Math.min(a, s)), l = t[c];
	return l == null || $C(l, n, r) ? String(c) : null;
}, tw = (e, t, n, r, i, a, o) => {
	if (a != null) {
		var s = o[0]?.getPosition(a);
		if (s != null) return s;
		var c = i?.[Number(a)];
		if (c) switch (n) {
			case "horizontal": return {
				x: c.coordinate,
				y: (r.top + t) / 2
			};
			default: return {
				x: (r.left + e) / 2,
				y: c.coordinate
			};
		}
	}
}, nw = (e, t, n, r) => {
	if (t === "axis") return e.tooltipItemPayloads;
	if (e.tooltipItemPayloads.length === 0) return [];
	var i = n === "hover" ? e.itemInteraction.hover.graphicalItemId : e.itemInteraction.click.graphicalItemId;
	if (e.syncInteraction.active && i == null) return e.tooltipItemPayloads;
	if (i == null && (r != null || e.keyboardInteraction.active)) {
		var a = e.tooltipItemPayloads[0];
		return a == null ? [] : [a];
	}
	return e.tooltipItemPayloads.filter((e) => e.settings?.graphicalItemId === i);
}, rw = (e) => e.options.tooltipPayloadSearcher, iw = (e) => e.tooltip;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayload.js
function aw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ow(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? aw(Object(n), !0).forEach(function(t) {
			sw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : aw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function sw(e, t, n) {
	return (t = cw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function cw(e) {
	var t = lw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function lw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function uw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
}
function dw(e) {
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
}
function fw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
	if (typeof e == "function") return (t) => e(t);
}
function pw(e) {
	if (typeof e == "string") return e;
}
function mw(e) {
	if (typeof e == "object" && e) return {
		name: "name" in e ? uw(e.name) : void 0,
		unit: "unit" in e ? dw(e.unit) : void 0,
		dataKey: "dataKey" in e ? fw(e.dataKey) : void 0,
		payload: "payload" in e ? e.payload : void 0,
		color: "color" in e ? pw(e.color) : void 0,
		fill: "fill" in e ? pw(e.fill) : void 0
	};
}
function hw(e, t) {
	return e ?? t;
}
var gw = (e, t, n, r, i, a, o) => {
	if (t != null && a != null) {
		var s = n.chartData, c = n.computedData, l = n.dataStartIndex, u = n.dataEndIndex;
		return e.reduce((e, n) => {
			var d = n.dataDefinedOnItem, f = n.settings, p = hw(d, s), m = Array.isArray(p) ? Js(p, l, u) : p, h = f?.dataKey ?? r, g = f?.nameKey, _;
			return r && Array.isArray(m) && !Array.isArray(m[0]) && o === "axis" ? (_ = Ee(m, r, i), _ ??= a(m, t, c, g)) : _ = a(m, t, c, g), Array.isArray(_) ? _.forEach((t) => {
				var n = mw(t), r = n?.name, i = n?.dataKey, a = n?.payload, o = ow(ow({}, f), {}, {
					name: r,
					unit: n?.unit,
					color: n?.color ?? f?.color,
					fill: n?.fill ?? f?.fill
				});
				e.push(yc({
					tooltipEntrySettings: o,
					dataKey: i,
					payload: a,
					value: tc(a, i),
					name: r == null ? void 0 : String(r)
				}));
			}) : e.push(yc({
				tooltipEntrySettings: f,
				dataKey: h,
				payload: _,
				value: tc(_, h),
				name: tc(_, g) ?? f?.name
			})), e;
		}, []);
	}
}, _w = B([
	Yx,
	Tx,
	Am
], Qb), vw = B([
	B([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]),
	Yx,
	B([lh, uh], Ex)
], kx, { memoizeOptions: { resultEqualityCheck: sh } }), yw = B([vw], (e) => e.filter(ah)), bw = B([vw], Px, { memoizeOptions: { resultEqualityCheck: sh } }), xw = B([vw], (e) => e.some((e) => !e.data)), Sw = B([bw, qp], Lx), Cw = B([
	yw,
	qp,
	Yx
], ih), ww = B([
	Sw,
	Yx,
	vw,
	qp,
	xw,
	bw
], Bx), Tw = B([Yx], nS), Ew = B([Tw, B([Yx], (e) => e.allowDataOverflow)], sm), Dw = B([
	B([
		Cw,
		B([vw], (e) => e.filter(ah)),
		Om,
		km
	], Qx),
	qp,
	lh,
	Ew
], eS), Ow = B([
	Sw,
	Yx,
	B([vw], Mx),
	oS,
	lh,
	Qp
], lS, { memoizeOptions: { resultEqualityCheck: oh } }), kw = B([B([
	pS,
	lh,
	uh
], mS), lh], bS), Aw = B([B([
	gS,
	lh,
	uh
], mS), lh], SS), jw = B([
	Yx,
	Nl,
	Sw,
	ww,
	Om,
	lh,
	B([
		Yx,
		Tw,
		Ew,
		Dw,
		Ow,
		B([
			kw,
			B([B([
				vS,
				lh,
				uh
			], mS), lh], ES),
			Aw
		], cS),
		Nl,
		lh
	], OS)
], jS), Mw = B([
	Yx,
	jw,
	B([
		jw,
		Yx,
		_w
	], PS),
	lh
], IS), Nw = (e) => GS(e, lh(e), uh(e), !1), Pw = B([Yx, Nw], Lm), Fw = B([B([
	Yx,
	_w,
	Mw,
	Pw
], Yb)], dh), Iw = B([
	Nl,
	Yx,
	_w,
	Fw,
	Nw,
	B([
		Nl,
		ww,
		Yx,
		lh
	], pC),
	B([
		Nl,
		ww,
		Yx,
		lh
	], JS),
	lh
], (e, t, n, r, i, a, o, s) => {
	if (t) {
		var c = t.type, l = rc(e, s);
		if (r) {
			var u = n === "scaleBand" && r.bandwidth ? r.bandwidth() / 2 : 2, d = c === "category" && r.bandwidth ? r.bandwidth() / u : 0;
			return d = s === "angleAxis" && i != null && i?.length >= 2 ? _e(i[0] - i[1]) * 2 * d : d, l && o ? o.map((e, t) => {
				var n = r.map(e);
				return G(n) ? {
					coordinate: n + d,
					value: e,
					index: t,
					offset: d
				} : null;
			}).filter(ke) : r.domain().map((e, t) => {
				var n = r.map(e);
				return G(n) ? {
					coordinate: n + d,
					value: a ? a[e] : e,
					index: t,
					offset: d
				} : null;
			}).filter(ke);
		}
	}
}), Lw = B([
	bC,
	xC,
	EC
], (e, t, n) => SC(n.shared, e, t)), Rw = (e) => e.tooltip.settings.trigger, zw = (e) => e.tooltip.settings.defaultIndex, Bw = B([
	iw,
	Lw,
	Rw,
	zw
], XC), Vw = B([
	Bw,
	Sw,
	Xx,
	jw
], ew), Hw = B([Iw, Vw], TC), Uw = B([Bw], (e) => {
	if (e) return e.dataKey;
}), Ww = B([Bw], (e) => {
	if (e) return e.graphicalItemId;
}), Gw = B([
	iw,
	Lw,
	Rw,
	zw
], nw), Kw = B([Bw, B([
	Cc,
	wc,
	Nl,
	Bc,
	Iw,
	zw,
	Gw
], tw)], (e, t) => e != null && e.coordinate ? e.coordinate : t), qw = B([Bw], (e) => e?.active ?? !1), Jw = B([B([
	Gw,
	Vw,
	qp,
	Xx,
	Hw,
	rw,
	Lw
], gw)], (e) => {
	if (e != null) {
		var t = e.map((e) => e.payload).filter((e) => e != null);
		return Array.from(new Set(t));
	}
});
//#endregion
//#region node_modules/recharts/es6/context/useTooltipAxis.js
function Yw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yw(Object(n), !0).forEach(function(t) {
			Zw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Zw(e, t, n) {
	return (t = Qw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Qw(e) {
	var t = $w(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function $w(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var eT = () => z(Yx), tT = () => {
	var e = eT(), t = z(Iw), n = z(Fw);
	return vc(!e || !n ? void 0 : Xw(Xw({}, e), {}, { scale: n }), t);
};
//#endregion
//#region node_modules/recharts/es6/util/getActiveCoordinate.js
function nT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function rT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? nT(Object(n), !0).forEach(function(t) {
			iT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : nT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function iT(e, t, n) {
	return (t = aT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function aT(e) {
	var t = oT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function oT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var sT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "horizontal") return {
			x: i.coordinate,
			y: r.relativeY
		};
		if (e === "vertical") return {
			x: r.relativeX,
			y: i.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
}, cT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "centric") {
			var a = i.coordinate, o = r.radius;
			return rT(rT(rT({}, r), bp(r.cx, r.cy, o, a)), {}, {
				angle: a,
				radius: o
			});
		}
		var s = i.coordinate, c = r.angle;
		return rT(rT(rT({}, r), bp(r.cx, r.cy, s, c)), {}, {
			angle: c,
			radius: s
		});
	}
	return {
		angle: 0,
		clockWise: !1,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function lT(e, t) {
	var n = e.relativeX, r = e.relativeY;
	return n >= t.left && n <= t.left + t.width && r >= t.top && r <= t.top + t.height;
}
var uT = (e, t, n, r, i) => {
	var a = t?.length ?? 0;
	if (a <= 1 || e == null) return 0;
	if (r === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6) for (var o = i[1] - i[0], s = (t, n, r) => [
		e,
		e + o,
		e - o
	].some((e) => (r ? e >= t : e > t) && e <= n), c = 0; c < a; c++) {
		var l = c > 0 ? n[c - 1]?.coordinate : n[a - 1]?.coordinate, u = n[c]?.coordinate, d = c >= a - 1 ? n[0]?.coordinate : n[c + 1]?.coordinate, f = void 0;
		if (l != null && u != null && d != null) {
			if (_e(u - l) !== _e(d - u)) {
				var p = [];
				if (_e(d - u) === _e(i[1] - i[0])) {
					f = d;
					var m = u + i[1] - i[0];
					p[0] = Math.min(m, (m + l) / 2), p[1] = Math.max(m, (m + l) / 2);
				} else {
					f = l;
					var h = d + i[1] - i[0];
					p[0] = Math.min(u, (h + u) / 2), p[1] = Math.max(u, (h + u) / 2);
				}
				var g = [Math.min(u, (f + u) / 2), Math.max(u, (f + u) / 2)];
				if (s(g[0], g[1], !1) || s(p[0], p[1], !0)) return n[c]?.index;
			} else {
				var _ = Math.min(l, d), v = Math.max(l, d);
				if (s((_ + u) / 2, (v + u) / 2, !1)) return n[c]?.index;
			}
		}
	}
	else if (t) for (var y = 0; y < a; y++) {
		var b = t[y];
		if (b != null) {
			var x = t[y + 1], S = t[y - 1];
			if (y === 0 && x != null && e <= (b.coordinate + x.coordinate) / 2 || y === a - 1 && S != null && e > (b.coordinate + S.coordinate) / 2 || y > 0 && y < a - 1 && S != null && x != null && e > (b.coordinate + S.coordinate) / 2 && e <= (b.coordinate + x.coordinate) / 2) return b.index;
		}
	}
	return -1;
}, dT = () => z(Am), fT = (e, t) => t, pT = (e, t, n) => n, mT = (e, t, n, r) => r, hT = B(Iw, (e) => Fi(e, (e) => e.coordinate)), gT = B([
	iw,
	fT,
	pT,
	mT
], XC), _T = B([
	gT,
	Sw,
	Xx,
	jw
], ew), vT = (e, t, n) => {
	if (t != null) {
		var r = iw(e);
		return t === "axis" ? n === "hover" ? r.axisInteraction.hover.dataKey : r.axisInteraction.click.dataKey : n === "hover" ? r.itemInteraction.hover.dataKey : r.itemInteraction.click.dataKey;
	}
}, yT = B([
	iw,
	fT,
	pT,
	mT
], nw), bT = B([
	Cc,
	wc,
	Nl,
	Bc,
	Iw,
	mT,
	yT
], tw), xT = B([gT, bT], (e, t) => e.coordinate ?? t), ST = B([Iw, _T], TC), CT = B([
	yT,
	_T,
	qp,
	Xx,
	ST,
	rw,
	fT
], gw), wT = B([gT, _T], (e, t) => ({
	isActive: e.active && t != null,
	activeIndex: t
})), TT = (e, t, n, r, i, a, o) => {
	if (e && n && r && i && lT(e, o)) {
		var s = uT(xc(e, t), a, i, n, r), c = sT(t, i, s, e);
		return {
			activeIndex: String(s),
			activeCoordinate: c
		};
	}
}, ET = (e, t, n, r, i, a, o) => {
	if (e && r && i && a && n) {
		var s = Ep(e, n);
		if (s) {
			var c = uT(Sc(s, t), o, a, r, i), l = cT(t, a, c, s);
			return {
				activeIndex: String(c),
				activeCoordinate: l
			};
		}
	}
}, DT = (e, t, n, r, i, a, o, s) => {
	if (e && t && r && i && a) return t === "horizontal" || t === "vertical" ? TT(e, t, r, i, a, o, s) : ET(e, t, n, r, i, a, o);
}, OT = B((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, n) => n, (e, t, n) => {
	if (t != null) {
		var r = e[t];
		if (r != null) return n ? r.panoramaElement : r.element;
	}
}), kT = B((e) => e.zIndex.zIndexMap, (e) => {
	var t = Object.keys(e).map((e) => parseInt(e, 10)).concat(Object.values(Pm));
	return Array.from(new Set(t)).sort((e, t) => e - t);
}, { memoizeOptions: { resultEqualityCheck: ch } });
//#endregion
//#region node_modules/recharts/es6/state/zIndexSlice.js
function AT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function jT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? AT(Object(n), !0).forEach(function(t) {
			MT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : AT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function MT(e, t, n) {
	return (t = NT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function NT(e) {
	var t = PT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function PT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var FT = { zIndexMap: Object.values(Pm).reduce((e, t) => jT(jT({}, e), {}, { [t]: {
	element: void 0,
	panoramaElement: void 0,
	consumers: 0
} }), {}) }, IT = new Set(Object.values(Pm));
function LT(e) {
	return IT.has(e);
}
var RT = $o({
	name: "zIndex",
	initialState: FT,
	reducers: {
		registerZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] ? e.zIndexMap[n].consumers += 1 : e.zIndexMap[n] = {
					consumers: 1,
					element: void 0,
					panoramaElement: void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (--e.zIndexMap[n].consumers, e.zIndexMap[n].consumers <= 0 && !LT(n) && delete e.zIndexMap[n]);
			},
			prepare: U()
		},
		registerZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload, r = n.zIndex, i = n.element, a = n.isPanorama;
				e.zIndexMap[r] ? a ? e.zIndexMap[r].panoramaElement = H(i) : e.zIndexMap[r].element = H(i) : e.zIndexMap[r] = {
					consumers: 0,
					element: a ? void 0 : H(i),
					panoramaElement: a ? H(i) : void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (t.payload.isPanorama ? e.zIndexMap[n].panoramaElement = void 0 : e.zIndexMap[n].element = void 0);
			},
			prepare: U()
		}
	}
}), zT = RT.actions, BT = zT.registerZIndexPortal, VT = zT.unregisterZIndexPortal, HT = zT.registerZIndexPortalElement, UT = zT.unregisterZIndexPortalElement, WT = RT.reducer;
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexLayer.js
function GT(e) {
	var t = e.zIndex, n = e.children, r = Ll() && t !== void 0 && t !== 0, i = Wc(), a = (0, S.useRef)(void 0), o = (0, S.useRef)(/* @__PURE__ */ new Set()), s = ui(), c = z((e) => OT(e, t, i));
	if ((0, S.useLayoutEffect)(() => {
		if (!r) {
			var e = o.current;
			e.forEach((e) => {
				s(VT({ zIndex: e }));
			}), e.clear(), a.current = void 0;
			return;
		}
		if (o.current.has(t) || (s(BT({ zIndex: t })), o.current.add(t)), c) {
			a.current = c;
			var n = o.current;
			n.forEach((e) => {
				e !== t && (s(VT({ zIndex: e })), n.delete(e));
			});
		}
	}, [
		s,
		t,
		r,
		c
	]), (0, S.useLayoutEffect)(() => {
		var e = o.current;
		return () => {
			e.forEach((e) => {
				s(VT({ zIndex: e }));
			}), e.clear();
		};
	}, [s]), !r) return n;
	var l = c ?? a.current;
	return l ? /*#__PURE__*/ (0, mu.createPortal)(n, l) : null;
}
//#endregion
//#region node_modules/recharts/es6/component/Cursor.js
function KT() {
	return KT = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, KT.apply(null, arguments);
}
function qT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function JT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? qT(Object(n), !0).forEach(function(t) {
			YT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : qT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function YT(e, t, n) {
	return (t = XT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function XT(e) {
	var t = ZT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ZT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function QT(e) {
	var t = e.cursor, n = e.cursorComp, r = e.cursorProps;
	return /*#__PURE__*/ (0, S.isValidElement)(t) ? /*#__PURE__*/ (0, S.cloneElement)(t, r) : /*#__PURE__*/ (0, S.createElement)(n, r);
}
function $T(e) {
	var t = e.coordinate, n = e.payload, r = e.index, i = e.offset, a = e.tooltipAxisBandSize, o = e.layout, s = e.cursor, c = e.tooltipEventType, l = e.chartName, u = t, d = n, f = r;
	if (!s || !u || l !== "ScatterChart" && c !== "axis") return null;
	var p, m, h;
	if (l === "ScatterChart") p = u, m = $d, h = Pm.cursorLine;
	else if (l === "BarChart") p = ef(o, u, i, a), m = fp, h = Pm.cursorRectangle;
	else if (o === "radial" && Tn(u)) {
		var g = Dp(u), _ = g.cx, v = g.cy, b = g.radius;
		p = {
			cx: _,
			cy: v,
			startAngle: g.startAngle,
			endAngle: g.endAngle,
			innerRadius: b,
			outerRadius: b
		}, m = Hp, h = Pm.cursorLine;
	} else p = { points: Up(o, u, i) }, m = Hd, h = Pm.cursorLine;
	var x = typeof s == "object" && "className" in s ? s.className : void 0, C = JT(JT(JT(JT({
		stroke: "#ccc",
		pointerEvents: "none"
	}, i), p), D(s)), {}, {
		payload: d,
		payloadIndex: f,
		className: y("recharts-tooltip-cursor", x)
	});
	return /*#__PURE__*/ S.createElement(GT, { zIndex: e.zIndex ?? h }, /*#__PURE__*/ S.createElement(QT, {
		cursor: s,
		cursorComp: m,
		cursorProps: C
	}));
}
function eE(e) {
	var t = tT(), n = kl(), r = Pl(), i = dT();
	return t == null || n == null || r == null || i == null ? null : /*#__PURE__*/ S.createElement($T, KT({}, e, {
		offset: n,
		layout: r,
		tooltipAxisBandSize: t,
		chartName: i
	}));
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipPortalContext.js
var tE = /*#__PURE__*/ (0, S.createContext)(null), nE = () => (0, S.useContext)(tE), rE = (/* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1)).default, iE = new rE(), aE = "recharts.syncEvent.tooltip", oE = "recharts.syncEvent.brush", sE = (e, t) => {
	if (t && Array.isArray(e)) {
		var n = Number.parseInt(t, 10);
		if (!ve(n)) return e[n];
	}
}, cE = $o({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: () => void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (e) => {
		e.eventEmitter ??= Symbol("rechartsEventEmitter");
	} }
}), lE = cE.reducer, uE = cE.actions.createEventEmitter;
//#endregion
//#region node_modules/recharts/es6/synchronisation/syncSelectors.js
function dE(e) {
	return e.tooltip.syncInteraction;
}
var fE = $o({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(e, t) {
			if (e.chartData = H(t.payload), t.payload == null) {
				e.dataStartIndex = 0, e.dataEndIndex = 0;
				return;
			}
			t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
		},
		setComputedData(e, t) {
			e.computedData = t.payload;
		},
		setDataStartEndIndexes(e, t) {
			var n = t.payload, r = n.startIndex, i = n.endIndex;
			r != null && (e.dataStartIndex = r), i != null && (e.dataEndIndex = i);
		}
	}
}), pE = fE.actions, mE = pE.setChartData, hE = pE.setDataStartEndIndexes;
pE.setComputedData;
var gE = fE.reducer, _E = ["x", "y"];
function vE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function yE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? vE(Object(n), !0).forEach(function(t) {
			bE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function bE(e, t, n) {
	return (t = xE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function xE(e) {
	var t = SE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function SE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function CE(e, t) {
	if (e == null) return {};
	var n, r, i = wE(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function wE(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function TE() {
	var e = z(jm), t = z(Nm), n = ui(), r = z(Mm), i = z(Iw), a = Pl(), o = Dl(), s = z((e) => e.rootProps.className);
	(0, S.useEffect)(() => {
		if (e == null) return Ae;
		var s = (s, c, l) => {
			if (t !== l && e === s) {
				if (c.payload.active === !1) {
					n(BC({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: void 0,
						graphicalItemId: void 0
					}));
					return;
				}
				if (r === "index") {
					var u;
					if (o && c != null && (u = c.payload) != null && u.coordinate && c.payload.sourceViewBox) {
						var d = c.payload.coordinate, f = d.x, p = d.y, m = CE(d, _E), h = c.payload.sourceViewBox, g = h.x, _ = h.y, v = h.width, y = h.height, b = yE(yE({}, m), {}, {
							x: o.x + (v ? (f - g) / v : 0) * o.width,
							y: o.y + (y ? (p - _) / y : 0) * o.height
						});
						n(yE(yE({}, c), {}, { payload: yE(yE({}, c.payload), {}, { coordinate: b }) }));
					} else n(c);
					return;
				}
				if (i != null) {
					var x;
					typeof r == "function" ? x = i[r(i, {
						activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						isTooltipActive: c.payload.active,
						activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						activeLabel: c.payload.label,
						activeDataKey: c.payload.dataKey,
						activeCoordinate: c.payload.coordinate
					})] : r === "value" && (x = i.find((e) => String(e.value) === c.payload.label));
					var S = c.payload.coordinate;
					if (S == null || o == null) {
						n(BC({
							active: !1,
							coordinate: void 0,
							dataKey: void 0,
							index: null,
							label: void 0,
							sourceViewBox: void 0,
							graphicalItemId: void 0
						}));
						return;
					}
					if (x == null) {
						n(BC({
							active: !1,
							coordinate: void 0,
							dataKey: void 0,
							index: null,
							label: void 0,
							sourceViewBox: c.payload.sourceViewBox,
							graphicalItemId: void 0
						}));
						return;
					}
					var C = S.x, w = S.y, T = Math.min(C, o.x + o.width), E = Math.min(w, o.y + o.height), D = {
						x: a === "horizontal" ? x.coordinate : T,
						y: a === "horizontal" ? E : x.coordinate
					};
					n(BC({
						active: c.payload.active,
						coordinate: D,
						dataKey: c.payload.dataKey,
						index: String(x.index),
						label: c.payload.label,
						sourceViewBox: c.payload.sourceViewBox,
						graphicalItemId: c.payload.graphicalItemId
					}));
				}
			}
		};
		return iE.on(aE, s), () => {
			iE.off(aE, s);
		};
	}, [
		s,
		n,
		t,
		e,
		r,
		i,
		a,
		o
	]);
}
function EE() {
	var e = z(jm), t = z(Nm), n = ui();
	(0, S.useEffect)(() => {
		if (e == null) return Ae;
		var r = (r, i, a) => {
			t !== a && e === r && n(hE(i));
		};
		return iE.on(oE, r), () => {
			iE.off(oE, r);
		};
	}, [
		n,
		t,
		e
	]);
}
function DE() {
	var e = ui();
	(0, S.useEffect)(() => {
		e(uE());
	}, [e]), TE(), EE();
}
function OE(e, t, n, r, i, a) {
	var o = z((n) => vT(n, e, t)), s = z(Ww), c = z(Nm), l = z(jm), u = z(Mm), d = z(dE)?.sourceViewBox != null, f = Dl();
	(0, S.useEffect)(() => {
		if (!d && l != null && c != null) {
			var e = BC({
				active: a,
				coordinate: n,
				dataKey: o,
				index: i,
				label: typeof r == "number" ? String(r) : r,
				sourceViewBox: f,
				graphicalItemId: s
			});
			iE.emit(aE, l, e, c);
		}
	}, [
		d,
		n,
		o,
		s,
		i,
		r,
		c,
		l,
		u,
		a,
		f
	]);
}
function kE() {
	var e = z(jm), t = z(Nm), n = z((e) => e.chartData.dataStartIndex), r = z((e) => e.chartData.dataEndIndex);
	(0, S.useEffect)(() => {
		if (e != null && n != null && r != null && t != null) {
			var i = {
				startIndex: n,
				endIndex: r
			};
			iE.emit(oE, e, i, t);
		}
	}, [
		r,
		n,
		t,
		e
	]);
}
//#endregion
//#region node_modules/recharts/es6/component/Tooltip.js
function AE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function jE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? AE(Object(n), !0).forEach(function(t) {
			ME(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : AE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ME(e, t, n) {
	return (t = NE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function NE(e) {
	var t = PE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function PE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function FE(e, t) {
	return BE(e) || zE(e, t) || LE(e, t) || IE();
}
function IE() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function LE(e, t) {
	if (e) {
		if (typeof e == "string") return RE(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? RE(e, t) : void 0;
	}
}
function RE(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function zE(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function BE(e) {
	if (Array.isArray(e)) return e;
}
function VE(e) {
	return e.dataKey;
}
function HE(e, t) {
	return /*#__PURE__*/ S.isValidElement(e) ? /*#__PURE__*/ S.cloneElement(e, t) : typeof e == "function" ? /*#__PURE__*/ S.createElement(e, t) : /*#__PURE__*/ S.createElement(Y, t);
}
var UE = [], WE = {
	allowEscapeViewBox: {
		x: !1,
		y: !1
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: !0,
	filterNull: !0,
	includeHidden: !1,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: !1,
		y: !1
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: !1,
	wrapperStyle: {}
};
function GE(e) {
	var t = Pn(e, WE), n = t.active, r = t.allowEscapeViewBox, i = t.animationDuration, a = t.animationEasing, o = t.content, s = t.filterNull, c = t.isAnimationActive, l = t.offset, u = t.payloadUniqBy, d = t.position, f = t.reverseDirection, p = t.useTranslate3d, m = t.wrapperStyle, h = t.cursor, g = t.shared, _ = t.trigger, v = t.defaultIndex, y = t.portal, b = t.axisId, x = ui(), C = typeof v == "number" ? String(v) : v;
	(0, S.useEffect)(() => {
		x(NC({
			shared: g,
			trigger: _,
			axisId: b,
			active: n,
			defaultIndex: C
		}));
	}, [
		x,
		g,
		_,
		b,
		n,
		C
	]);
	var w = Dl(), T = Dd(), E = wC(g), D = z((e) => wT(e, E, _, C)) ?? {}, O = D.activeIndex, k = D.isActive, A = z((e) => CT(e, E, _, C)), j = z((e) => ST(e, E, _, C)), M = z((e) => xT(e, E, _, C)), N = A, ee = nE(), te = n ?? k ?? !1, ne = FE(Yi([N, te]), 2), re = ne[0], ie = ne[1], ae = E === "axis" ? j : void 0;
	OE(E, _, M, ae, O, te);
	var oe = y ?? ee;
	if (oe == null || w == null || E == null) return null;
	var se = N ?? UE;
	te || (se = UE), s && se.length && (se = ni(se.filter((e) => e.value != null && (e.hide !== !0 || t.includeHidden)), u, VE));
	var ce = se.length > 0, le = jE(jE({}, t), {}, {
		payload: se,
		label: ae,
		active: te,
		activeIndex: O,
		coordinate: M,
		accessibilityLayer: T
	}), ue = /*#__PURE__*/ S.createElement(Ed, {
		allowEscapeViewBox: r,
		animationDuration: i,
		animationEasing: a,
		isAnimationActive: c,
		active: te,
		coordinate: M,
		hasPayload: ce,
		offset: l,
		position: d,
		reverseDirection: f,
		useTranslate3d: p,
		viewBox: w,
		wrapperStyle: m,
		lastBoundingBox: re,
		innerRef: ie,
		hasPortalFromProps: !!y
	}, HE(o, le));
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ (0, mu.createPortal)(ue, oe), te && /*#__PURE__*/ S.createElement(eE, {
		cursor: h,
		tooltipEventType: E,
		coordinate: M,
		payload: se,
		index: O
	}));
}
//#endregion
//#region node_modules/recharts/es6/component/Cell.js
var KE = (e) => null;
KE.displayName = "Cell";
//#endregion
//#region node_modules/recharts/es6/util/LRUCache.js
function qE(e, t, n) {
	return (t = JE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function JE(e) {
	var t = YE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function YE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var XE = class {
	constructor(e) {
		qE(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = e;
	}
	get(e) {
		var t = this.cache.get(e);
		return t !== void 0 && (this.cache.delete(e), this.cache.set(e, t)), t;
	}
	set(e, t) {
		if (this.cache.has(e)) this.cache.delete(e);
		else if (this.cache.size >= this.maxSize) {
			var n = this.cache.keys().next().value;
			n != null && this.cache.delete(n);
		}
		this.cache.set(e, t);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
//#endregion
//#region node_modules/recharts/es6/util/DOMUtils.js
function ZE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function QE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ZE(Object(n), !0).forEach(function(t) {
			$E(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ZE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function $E(e, t, n) {
	return (t = eD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function eD(e) {
	var t = tD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function tD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var nD = QE({}, {
	cacheSize: 2e3,
	enableCache: !0
}), rD = new XE(nD.cacheSize), iD = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
}, aD = "recharts_measurement_span";
function oD(e, t) {
	return `${e}|${t.fontSize || ""}|${t.fontFamily || ""}|${t.fontWeight || ""}|${t.fontStyle || ""}|${t.letterSpacing || ""}|${t.textTransform || ""}`;
}
var sD = (e, t) => {
	try {
		var n = document.getElementById(aD);
		n || (n = document.createElement("span"), n.setAttribute("id", aD), n.setAttribute("aria-hidden", "true"), document.body.appendChild(n)), Object.assign(n.style, iD, t), n.textContent = `${e}`;
		var r = n.getBoundingClientRect();
		return {
			width: r.width,
			height: r.height
		};
	} catch {
		return {
			width: 0,
			height: 0
		};
	}
}, cD = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (e == null || ad.isSsr) return {
		width: 0,
		height: 0
	};
	if (!nD.enableCache) return sD(e, t);
	var n = oD(e, t), r = rD.get(n);
	if (r) return r;
	var i = sD(e, t);
	return rD.set(n, i), i;
}, lD;
function uD(e, t) {
	return hD(e) || mD(e, t) || fD(e, t) || dD();
}
function dD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fD(e, t) {
	if (e) {
		if (typeof e == "string") return pD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pD(e, t) : void 0;
	}
}
function pD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function mD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function hD(e) {
	if (Array.isArray(e)) return e;
}
function gD(e, t, n) {
	return (t = _D(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function _D(e) {
	var t = vD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function vD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var yD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, bD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, xD = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, SD = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, CD = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 16,
	in: 96,
	Q: 96 / 101.6,
	px: 1
}, wD = [
	"cm",
	"mm",
	"pt",
	"pc",
	"in",
	"Q",
	"px"
];
function TD(e) {
	return wD.includes(e);
}
var ED = "NaN";
function DD(e, t) {
	return e * CD[t];
}
var OD = class e {
	static parse(t) {
		var n = uD(SD.exec(t) ?? [], 3), r = n[1], i = n[2];
		return r == null ? e.NaN : new e(parseFloat(r), i ?? "");
	}
	constructor(e, t) {
		this.num = e, this.unit = t, this.num = e, this.unit = t, ve(e) && (this.unit = ""), t !== "" && !xD.test(t) && (this.num = NaN, this.unit = ""), TD(t) && (this.num = DD(e, t), this.unit = "px");
	}
	add(t) {
		return this.unit === t.unit ? new e(this.num + t.num, this.unit) : new e(NaN, "");
	}
	subtract(t) {
		return this.unit === t.unit ? new e(this.num - t.num, this.unit) : new e(NaN, "");
	}
	multiply(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num * t.num, this.unit || t.unit);
	}
	divide(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num / t.num, this.unit || t.unit);
	}
	toString() {
		return `${this.num}${this.unit}`;
	}
	isNaN() {
		return ve(this.num);
	}
};
lD = OD, gD(OD, "NaN", new lD(NaN, ""));
function kD(e) {
	if (e == null || e.includes(ED)) return ED;
	for (var t = e; t.includes("*") || t.includes("/");) {
		var n = uD(yD.exec(t) ?? [], 4), r = n[1], i = n[2], a = n[3], o = OD.parse(r ?? ""), s = OD.parse(a ?? ""), c = i === "*" ? o.multiply(s) : o.divide(s);
		if (c.isNaN()) return ED;
		t = t.replace(yD, c.toString());
	}
	for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
		var l = uD(bD.exec(t) ?? [], 4), u = l[1], d = l[2], f = l[3], p = OD.parse(u ?? ""), m = OD.parse(f ?? ""), h = d === "+" ? p.add(m) : p.subtract(m);
		if (h.isNaN()) return ED;
		t = t.replace(bD, h.toString());
	}
	return t;
}
var AD = /\(([^()]*)\)/;
function jD(e) {
	for (var t = e, n; (n = AD.exec(t)) != null;) {
		var r = uD(n, 2)[1];
		t = t.replace(AD, kD(r));
	}
	return t;
}
function MD(e) {
	var t = e.replace(/\s+/g, "");
	return t = jD(t), t = kD(t), t;
}
function ND(e) {
	try {
		return MD(e);
	} catch {
		return ED;
	}
}
function PD(e) {
	var t = ND(e.slice(5, -1));
	return t === ED ? "" : t;
}
//#endregion
//#region node_modules/recharts/es6/component/Text.js
var FD = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], ID = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function LD() {
	return LD = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, LD.apply(null, arguments);
}
function RD(e, t) {
	if (e == null) return {};
	var n, r, i = zD(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function zD(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function BD(e, t) {
	return GD(e) || WD(e, t) || HD(e, t) || VD();
}
function VD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function HD(e, t) {
	if (e) {
		if (typeof e == "string") return UD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? UD(e, t) : void 0;
	}
}
function UD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function WD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function GD(e) {
	if (Array.isArray(e)) return e;
}
var KD = /[ \f\n\r\t\v\u2028\u2029]+/, qD = (e) => {
	var t = e.children, n = e.breakAll, r = e.style;
	try {
		var i = [];
		return De(t) || (i = n ? t.toString().split("") : t.toString().split(KD)), {
			wordsWithComputedWidth: i.map((e) => ({
				word: e,
				width: cD(e, r).width
			})),
			spaceWidth: n ? 0 : cD("\xA0", r).width
		};
	} catch {
		return null;
	}
};
function JD(e) {
	return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function YD(e) {
	return De(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var XD = (e, t, n, r) => e.reduce((e, i) => {
	var a = i.word, o = i.width, s = e[e.length - 1];
	if (s && o != null && (t == null || r || s.width + o + n < Number(t))) s.words.push(a), s.width += o + n;
	else {
		var c = {
			words: [a],
			width: o
		};
		e.push(c);
	}
	return e;
}, []), ZD = (e) => e.reduce((e, t) => e.width > t.width ? e : t), QD = "…", $D = (e, t, n, r, i, a, o, s) => {
	var c = qD({
		breakAll: n,
		style: r,
		children: e.slice(0, t) + QD
	});
	if (!c) return [!1, []];
	var l = XD(c.wordsWithComputedWidth, a, o, s);
	return [l.length > i || ZD(l).width > Number(a), l];
}, eO = (e, t, n, r, i) => {
	var a = e.maxLines, o = e.children, s = e.style, c = e.breakAll, l = I(a), u = String(o), d = XD(t, r, n, i);
	if (!l || i || !(d.length > a || ZD(d).width > Number(r))) return d;
	for (var f = 0, p = u.length - 1, m = 0, h; f <= p && m <= u.length - 1;) {
		var g = Math.floor((f + p) / 2), _ = BD($D(u, g - 1, c, s, a, r, n, i), 2), v = _[0], y = _[1], b = BD($D(u, g, c, s, a, r, n, i), 1)[0];
		if (!v && !b && (f = g + 1), v && b && (p = g - 1), !v && b) {
			h = y;
			break;
		}
		m++;
	}
	return h || d;
}, tO = (e) => [{
	words: De(e) ? [] : e.toString().split(KD),
	width: void 0
}], nO = (e) => {
	var t = e.width, n = e.scaleToFit, r = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
	if ((t || n) && !ad.isSsr) {
		var s, c, l = qD({
			breakAll: a,
			children: r,
			style: i
		});
		if (l) {
			var u = l.wordsWithComputedWidth, d = l.spaceWidth;
			s = u, c = d;
		} else return tO(r);
		return eO({
			breakAll: a,
			children: r,
			maxLines: o,
			style: i
		}, s, c, t, !!n);
	}
	return tO(r);
}, rO = "#808080", iO = {
	angle: 0,
	breakAll: !1,
	capHeight: "0.71em",
	fill: rO,
	lineHeight: "1em",
	scaleToFit: !1,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
}, aO = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = Pn(e, iO), r = n.x, i = n.y, a = n.lineHeight, o = n.capHeight, s = n.fill, c = n.scaleToFit, l = n.textAnchor, u = n.verticalAnchor, d = RD(n, FD), f = (0, S.useMemo)(() => nO({
		breakAll: d.breakAll,
		children: d.children,
		maxLines: d.maxLines,
		scaleToFit: c,
		style: d.style,
		width: d.width
	}), [
		d.breakAll,
		d.children,
		d.maxLines,
		c,
		d.style,
		d.width
	]), p = d.dx, m = d.dy, h = d.angle, g = d.className, _ = d.breakAll, v = RD(d, ID);
	if (!be(r) || !be(i) || f.length === 0) return null;
	var b = Number(r) + (I(p) ? p : 0), x = Number(i) + (I(m) ? m : 0);
	if (!G(b) || !G(x)) return null;
	var C;
	switch (u) {
		case "start":
			C = PD(`calc(${o})`);
			break;
		case "middle":
			C = PD(`calc(${(f.length - 1) / 2} * -${a} + (${o} / 2))`);
			break;
		default: C = PD(`calc(${f.length - 1} * -${a})`);
	}
	var w = [], T = f[0];
	if (c && T != null) {
		var E = T.width, D = d.width;
		w.push(`scale(${I(D) && I(E) ? D / E : 1})`);
	}
	return h && w.push(`rotate(${h}, ${b}, ${x})`), w.length && (v.transform = w.join(" ")), /*#__PURE__*/ S.createElement("text", LD({}, O(v), {
		ref: t,
		x: b,
		y: x,
		className: y("recharts-text", g),
		textAnchor: l,
		fill: s.includes("url") ? rO : s
	}), f.map((e, t) => {
		var n = e.words.join(_ ? "" : " ");
		return /*#__PURE__*/ S.createElement("tspan", {
			x: b,
			dy: t === 0 ? C : a,
			key: `${n}-${t}`
		}, n);
	}));
});
aO.displayName = "Text";
//#endregion
//#region node_modules/recharts/es6/component/Label.js
var oO = ["labelRef"], sO = ["content"];
function cO(e, t) {
	if (e == null) return {};
	var n, r, i = lO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function lO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function uO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function dO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? uO(Object(n), !0).forEach(function(t) {
			fO(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function fO(e, t, n) {
	return (t = pO(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function pO(e) {
	var t = mO(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function mO(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function hO() {
	return hO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, hO.apply(null, arguments);
}
var gO = /*#__PURE__*/ (0, S.createContext)(null), _O = (e) => {
	var t = e.x, n = e.y, r = e.upperWidth, i = e.lowerWidth, a = e.width, o = e.height, s = e.children, c = (0, S.useMemo)(() => ({
		x: t,
		y: n,
		upperWidth: r,
		lowerWidth: i,
		width: a,
		height: o
	}), [
		t,
		n,
		r,
		i,
		a,
		o
	]);
	return /*#__PURE__*/ S.createElement(gO.Provider, { value: c }, s);
}, vO = () => {
	var e = (0, S.useContext)(gO), t = Dl();
	return e || (t ? je(t) : void 0);
}, yO = /*#__PURE__*/ (0, S.createContext)(null), bO = () => {
	var e = (0, S.useContext)(yO), t = z(eh);
	return e || t;
}, xO = (e) => {
	var t = e.value, n = e.formatter, r = De(e.children) ? t : e.children;
	return typeof n == "function" ? n(r) : r;
}, SO = (e) => e != null && typeof e == "function", CO = (e, t) => _e(t - e) * Math.min(Math.abs(t - e), 360), wO = (e, t, n, r, i) => {
	var a = e.offset, o = e.className, s = i.cx, c = i.cy, l = i.innerRadius, u = i.outerRadius, d = i.startAngle, f = i.endAngle, p = i.clockWise, m = (l + u) / 2, h = CO(d, f), g = h >= 0 ? 1 : -1, _, v;
	switch (t) {
		case "insideStart":
			_ = d + g * a, v = p;
			break;
		case "insideEnd":
			_ = f - g * a, v = !p;
			break;
		case "end":
			_ = f + g * a, v = p;
			break;
		default: throw Error(`Unsupported position ${t}`);
	}
	v = h <= 0 ? v : !v;
	var b = bp(s, c, m, _), x = bp(s, c, m, _ + (v ? 1 : -1) * 359), C = `M${b.x},${b.y}
    A${m},${m},0,1,${+!v},
    ${x.x},${x.y}`, w = De(e.id) ? Se("recharts-radial-line-") : e.id;
	return /*#__PURE__*/ S.createElement("text", hO({}, r, {
		dominantBaseline: "central",
		className: y("recharts-radial-bar-label", o)
	}), /*#__PURE__*/ S.createElement("defs", null, /*#__PURE__*/ S.createElement("path", {
		id: w,
		d: C
	})), /*#__PURE__*/ S.createElement("textPath", { xlinkHref: `#${w}` }, n));
}, TO = (e, t, n) => {
	var r = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, s = (e.startAngle + e.endAngle) / 2;
	if (n === "outside") {
		var c = bp(r, i, o + t, s), l = c.x;
		return {
			x: l,
			y: c.y,
			textAnchor: l >= r ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (n === "center") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (n === "centerTop") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (n === "centerBottom") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var u = bp(r, i, (a + o) / 2, s);
	return {
		x: u.x,
		y: u.y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
}, EO = (e) => e != null && "cx" in e && I(e.cx), DO = {
	angle: 0,
	offset: 5,
	zIndex: Pm.label,
	position: "middle",
	textBreakAll: !1
};
function OO(e) {
	if (!EO(e)) return e;
	var t = e.cx, n = e.cy, r = e.outerRadius, i = r * 2;
	return {
		x: t - r,
		y: n - r,
		width: i,
		upperWidth: i,
		lowerWidth: i,
		height: i
	};
}
function kO(e) {
	var t = Pn(e, DO), n = t.viewBox, r = t.parentViewBox, i = t.position, a = t.value, o = t.children, s = t.content, c = t.className, l = c === void 0 ? "" : c, u = t.textBreakAll, d = t.labelRef, f = bO(), p = vO(), m = n == null ? i === "center" ? p : f ?? p : EO(n) ? n : je(n), h, g, _ = OO(m);
	if (!m || De(a) && De(o) && !/*#__PURE__*/ (0, S.isValidElement)(s) && typeof s != "function") return null;
	var v = EO(m) && (i === "insideStart" || i === "insideEnd" || i === "end");
	if (EO(m)) v || (g = TO(m, t.offset, t.position));
	else if (_) {
		var b = Le({
			viewBox: _,
			position: i,
			offset: t.offset,
			parentViewBox: EO(r) ? void 0 : r,
			clamp: !0
		});
		g = dO(dO({
			x: b.x,
			y: b.y,
			textAnchor: b.horizontalAnchor,
			verticalAnchor: b.verticalAnchor
		}, b.width === void 0 ? {} : { width: b.width }), b.height === void 0 ? {} : { height: b.height });
	}
	var x = dO(dO(dO(dO({}, g?.x === void 0 ? {} : { x: g.x }), g?.y === void 0 ? {} : { y: g.y }), t), {}, { viewBox: m });
	if (/*#__PURE__*/ (0, S.isValidElement)(s)) {
		x.labelRef;
		var C = cO(x, oO);
		return /*#__PURE__*/ (0, S.cloneElement)(s, C);
	}
	if (typeof s == "function") {
		x.content;
		var w = cO(x, sO);
		if (h = /*#__PURE__*/ (0, S.createElement)(s, w), /*#__PURE__*/ (0, S.isValidElement)(h)) return h;
	} else h = xO(t);
	var T = O(t);
	return v && EO(m) ? wO(t, i, h, T, m) : g == null ? null : /*#__PURE__*/ S.createElement(GT, { zIndex: t.zIndex }, /*#__PURE__*/ S.createElement(aO, hO({
		ref: d,
		className: y("recharts-label", l)
	}, T, g, {
		textAnchor: JD(T.textAnchor) ? T.textAnchor : g.textAnchor,
		breakAll: u
	}), h));
}
kO.displayName = "Label";
var AO = (e, t, n) => {
	if (!e) return null;
	var r = {
		viewBox: t,
		labelRef: n
	};
	return e === !0 ? /*#__PURE__*/ S.createElement(kO, hO({ key: "label-implicit" }, r)) : be(e) ? /*#__PURE__*/ S.createElement(kO, hO({
		key: "label-implicit",
		value: e
	}, r)) : /*#__PURE__*/ (0, S.isValidElement)(e) ? e.type === kO ? /*#__PURE__*/ (0, S.cloneElement)(e, dO({ key: "label-implicit" }, r)) : /*#__PURE__*/ S.createElement(kO, hO({
		key: "label-implicit",
		content: e
	}, r)) : SO(e) ? /*#__PURE__*/ S.createElement(kO, hO({
		key: "label-implicit",
		content: e
	}, r)) : e && typeof e == "object" ? /*#__PURE__*/ S.createElement(kO, hO({}, e, { key: "label-implicit" }, r)) : null;
};
function jO(e) {
	var t = e.label, n = e.labelRef;
	return AO(t, vO(), n) || null;
}
//#endregion
//#region node_modules/recharts/es6/component/LabelList.js
var MO = ["valueAccessor"], NO = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function PO() {
	return PO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, PO.apply(null, arguments);
}
function FO(e, t) {
	if (e == null) return {};
	var n, r, i = IO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function IO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var LO = (e) => {
	var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
	if (YD(t)) return t;
}, RO = /*#__PURE__*/ (0, S.createContext)(void 0), zO = RO.Provider, BO = /*#__PURE__*/ (0, S.createContext)(void 0);
BO.Provider;
function VO() {
	return (0, S.useContext)(RO);
}
function HO() {
	return (0, S.useContext)(BO);
}
function UO(e) {
	var t = e.valueAccessor, n = t === void 0 ? LO : t, r = FO(e, MO), i = r.dataKey;
	r.clockWise;
	var a = r.id, o = r.textBreakAll, s = r.zIndex, c = FO(r, NO), l = VO(), u = HO(), d = l || u;
	return !d || !d.length ? null : /*#__PURE__*/ S.createElement(GT, { zIndex: s ?? Pm.label }, /*#__PURE__*/ S.createElement(ae, { className: "recharts-label-list" }, d.map((e, t) => {
		var s = De(i) ? n(e, t) : tc(e.payload, i), l = De(a) ? {} : { id: `${a}-${t}` };
		return /*#__PURE__*/ S.createElement(kO, PO({ key: `label-${t}` }, O(e), c, l, {
			fill: r.fill ?? e.fill,
			parentViewBox: e.parentViewBox,
			value: s,
			textBreakAll: o,
			viewBox: e.viewBox,
			index: t,
			zIndex: 0
		}));
	})));
}
UO.displayName = "LabelList";
function WO(e) {
	var t = e.label;
	return t ? t === !0 ? /*#__PURE__*/ S.createElement(UO, { key: "labelList-implicit" }) : /*#__PURE__*/ S.isValidElement(t) || SO(t) ? /*#__PURE__*/ S.createElement(UO, {
		key: "labelList-implicit",
		content: t
	}) : typeof t == "object" ? /*#__PURE__*/ S.createElement(UO, PO({ key: "labelList-implicit" }, t, { type: String(t.type) })) : null : null;
}
//#endregion
//#region node_modules/recharts/es6/shape/Dot.js
function GO() {
	return GO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, GO.apply(null, arguments);
}
var KO = (e) => {
	var t = e.cx, n = e.cy, r = e.r, i = e.className, a = y("recharts-dot", i);
	return I(t) && I(n) && I(r) ? /*#__PURE__*/ S.createElement("circle", GO({}, E(e), En(e), {
		className: a,
		cx: t,
		cy: n,
		r
	})) : null;
}, qO = $o({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(e, t) {
			e.radiusAxis[t.payload.id] = H(t.payload);
		},
		removeRadiusAxis(e, t) {
			delete e.radiusAxis[t.payload.id];
		},
		addAngleAxis(e, t) {
			e.angleAxis[t.payload.id] = H(t.payload);
		},
		removeAngleAxis(e, t) {
			delete e.angleAxis[t.payload.id];
		}
	}
}), JO = qO.actions;
JO.addRadiusAxis, JO.removeRadiusAxis, JO.addAngleAxis, JO.removeAngleAxis;
var YO = qO.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getClassNameFromUnknown.js
function XO(e) {
	return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
//#endregion
//#region node_modules/react-is/cjs/react-is.production.js
var ZO = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition");
	function m(e) {
		if (typeof e == "object" && e) {
			var m = e.$$typeof;
			switch (m) {
				case t: switch (e = e.type, e) {
					case r:
					case a:
					case i:
					case l:
					case u:
					case p: return e;
					default: switch (e &&= e.$$typeof, e) {
						case s:
						case c:
						case f:
						case d: return e;
						case o: return e;
						default: return m;
					}
				}
				case n: return m;
			}
		}
	}
	e.isFragment = function(e) {
		return m(e) === r;
	};
})), QO = (/* @__PURE__ */ o(((e, t) => {
	t.exports = ZO();
})))(), $O = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", ek = null, tk = null, nk = (e) => {
	if (e === ek && Array.isArray(tk)) return tk;
	var t = [];
	return S.Children.forEach(e, (e) => {
		De(e) || ((0, QO.isFragment)(e) ? t = t.concat(nk(e.props.children)) : t.push(e));
	}), tk = t, ek = e, t;
};
function rk(e, t) {
	var n = [], r = [];
	return r = Array.isArray(t) ? t.map((e) => $O(e)) : [$O(t)], nk(e).forEach((e) => {
		var t = me(e, "type.displayName") || me(e, "type.name");
		t && r.indexOf(t) !== -1 && n.push(e);
	}), n;
}
var ik = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
//#endregion
//#region node_modules/recharts/es6/util/ActiveShapeUtils.js
function ak(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ok(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ak(Object(n), !0).forEach(function(t) {
			sk(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ak(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function sk(e, t, n) {
	return (t = ck(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ck(e) {
	var t = lk(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function lk(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function uk(e, t) {
	return ok(ok({}, t), e);
}
function dk(e) {
	return /*#__PURE__*/ (0, S.isValidElement)(e) ? e.props : e;
}
function fk(e, t) {
	return /*#__PURE__*/ (0, S.cloneElement)(e, uk(dk(e), t));
}
function pk(e) {
	if ("index" in e) {
		var t = e.index;
		return typeof t == "number" || typeof t == "string" ? t : void 0;
	}
}
function mk(e) {
	return "isActive" in e && e.isActive === !0;
}
function hk(e) {
	var t = e.option, n = e.DefaultShape, r = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, s = o === void 0 ? "recharts-shape" : o, c = pk(r), l = /*#__PURE__*/ (0, S.isValidElement)(t) ? fk(t, r) : t === n ? /*#__PURE__*/ S.createElement(n, r) : typeof t == "function" ? t(r, c) : typeof t == "object" ? /*#__PURE__*/ S.createElement(n, uk(t, r)) : /*#__PURE__*/ S.createElement(n, r);
	return mk(r) ? /*#__PURE__*/ S.createElement(ae, { className: a }, l) : /*#__PURE__*/ S.createElement(ae, { className: s }, l);
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipContext.js
var gk = (e, t, n) => {
	var r = ui();
	return (i, a) => (o) => {
		e?.(i, a, o), r(PC({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
}, _k = (e) => {
	var t = ui();
	return (n, r) => (i) => {
		e?.(n, r, i), t(FC());
	};
}, vk = (e, t, n) => {
	var r = ui();
	return (i, a) => (o) => {
		e?.(i, a, o), r(LC({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
};
//#endregion
//#region node_modules/recharts/es6/state/SetTooltipEntrySettings.js
function yk(e) {
	var t = e.tooltipEntrySettings, n = ui(), r = Wc(), i = (0, S.useRef)(null);
	return (0, S.useLayoutEffect)(() => {
		r || (i.current === null ? n(AC(t)) : i.current !== t && n(jC({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		t,
		n,
		r
	]), (0, S.useLayoutEffect)(() => () => {
		i.current &&= (n(MC(i.current)), null);
	}, [n]), null;
}
//#endregion
//#region node_modules/recharts/es6/state/SetLegendPayload.js
function bk(e) {
	var t = e.legendPayload, n = ui(), r = Wc(), i = (0, S.useRef)(null);
	return (0, S.useLayoutEffect)(() => {
		r || (i.current === null ? n(Ul(t)) : i.current !== t && n(Wl({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, S.useLayoutEffect)(() => () => {
		i.current &&= (n(Gl(i.current)), null);
	}, [n]), null;
}
//#endregion
//#region node_modules/recharts/es6/animation/matchBy.js
function xk(e, t) {
	return Ek(e) || Tk(e, t) || Ck(e, t) || Sk();
}
function Sk() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ck(e, t) {
	if (e) {
		if (typeof e == "string") return wk(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? wk(e, t) : void 0;
	}
}
function wk(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Tk(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Ek(e) {
	if (Array.isArray(e)) return e;
}
var Dk = "index", Ok = "append";
function kk(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], r = [];
	for (var i of n) r.push({
		status: "removed",
		prev: i
	});
	for (var a = 0; a < t.length; a++) {
		var o = e[a], s = t[a];
		o == null ? r.push({
			status: "added",
			next: s
		}) : r.push({
			status: "matched",
			prev: o,
			next: s
		});
	}
	return r;
}
function Ak(e, t) {
	var n = e.length / t.length;
	return kk(t.map((t, r) => e[Math.floor(r * n)]), t);
}
function jk(e, t) {
	return kk(t.map((t, n) => e[n]), t);
}
function Mk(e, t) {
	for (var n = /* @__PURE__ */ new Map(), r = 0; r < e.length; r++) {
		var i = e[r];
		if (i != null) {
			var a = t(i, r);
			a != null && !n.has(a) && n.set(a, i);
		}
	}
	return n;
}
function Nk(e, t, n) {
	var r = Mk(e, n), i = /* @__PURE__ */ new Set(), a = t.map((e, t) => {
		var a = n(e, t);
		if (a != null) {
			var o = r.get(a);
			if (o !== void 0) return i.add(a), o;
		}
	}), o = [];
	for (var s of r) {
		var c = xk(s, 2), l = c[0], u = c[1];
		i.has(l) || o.push(u);
	}
	return kk(a, t, o);
}
function Pk(e, t, n) {
	return t == null ? null : e == null ? t.map((e) => ({
		status: "added",
		next: e
	})) : n === "index" ? Ak(e, t) : n === "append" ? jk(e, t) : Nk(e, t, n);
}
//#endregion
//#region node_modules/recharts/es6/animation/useAnimationStartSnapshot.js
function Fk(e, t) {
	var n = (0, S.useRef)(e), r = (0, S.useRef)(t.current), i = (0, S.useRef)(!0);
	n.current !== e && (n.current = e, r.current = t.current, i.current = !1);
	var a = (0, S.useCallback)(function(e, n) {
		var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		if (n === 0) {
			i.current = !0;
			return;
		}
		n === 1 && (r.current = e), n > 0 && i.current && a && (t.current = e);
	}, [t]);
	return {
		startValue: r.current,
		syncStepValue: a
	};
}
//#endregion
//#region node_modules/recharts/es6/animation/AnimatedItems.js
function Ik(e, t) {
	return Vk(e) || Bk(e, t) || Rk(e, t) || Lk();
}
function Lk() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rk(e, t) {
	if (e) {
		if (typeof e == "string") return zk(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zk(e, t) : void 0;
	}
}
function zk(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Bk(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Vk(e) {
	if (Array.isArray(e)) return e;
}
function Hk(e, t) {
	var n = Ik((0, S.useState)(!1), 2), r = n[0], i = n[1];
	return {
		isAnimating: r,
		handleAnimationStart: (0, S.useCallback)(() => {
			typeof e == "function" && e(), i(!0);
		}, [e]),
		handleAnimationEnd: (0, S.useCallback)(() => {
			typeof t == "function" && t(), i(!1);
		}, [t])
	};
}
function Uk(e) {
	var t = e.animationInput, n = e.animationIdPrefix, r = e.items, i = e.previousItemsRef, a = e.isAnimationActive, o = e.animationBegin, s = e.animationDuration, c = e.animationEasing, l = e.onAnimationStart, u = e.onAnimationEnd, d = e.animationInterpolateFn, f = e.animationMatchBy, p = e.shouldUpdatePreviousRef, m = e.children, h = e.layout, g = Ff(t, n), _ = Fk(g, i), v = _.startValue ?? null, y = Pk(v, r, f ?? Dk);
	return /*#__PURE__*/ S.createElement(Pf, {
		animationId: g,
		begin: o,
		duration: s,
		isActive: a,
		easing: c,
		onAnimationEnd: u,
		onAnimationStart: l,
		key: g
	}, (e) => {
		var t = v == null, n = r == null ? r : d(y, e, h), i = p ? p(e) : e > 0;
		return _.syncStepValue(n, e, i), n == null ? null : m(n, e, t);
	});
}
function Wk(e, t) {
	return Yk(e) || Jk(e, t) || Kk(e, t) || Gk();
}
function Gk() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Kk(e, t) {
	if (e) {
		if (typeof e == "string") return qk(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? qk(e, t) : void 0;
	}
}
function qk(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Jk(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Yk(e) {
	if (Array.isArray(e)) return e;
}
var Xk = S.useId ?? (() => Wk(S.useState(() => Se("uid-")), 1)[0]);
//#endregion
//#region node_modules/recharts/es6/util/useUniqueId.js
function Zk(e, t) {
	var n = Xk();
	return t || (e ? `${e}-${n}` : n);
}
//#endregion
//#region node_modules/recharts/es6/context/RegisterGraphicalItemId.js
var Qk = /*#__PURE__*/ (0, S.createContext)(void 0), $k = (e) => {
	var t = e.id, n = e.type, r = e.children, i = Zk(`recharts-${n}`, t);
	return /*#__PURE__*/ S.createElement(Qk.Provider, { value: i }, r(i));
}, eA = $o({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(e, t) {
				e.cartesianItems.push(H(t.payload));
			},
			prepare: U()
		},
		replaceCartesianGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Eo(e).cartesianItems.indexOf(H(r));
				a > -1 && (e.cartesianItems[a] = H(i));
			},
			prepare: U()
		},
		removeCartesianGraphicalItem: {
			reducer(e, t) {
				var n = Eo(e).cartesianItems.indexOf(H(t.payload));
				n > -1 && e.cartesianItems.splice(n, 1);
			},
			prepare: U()
		},
		addPolarGraphicalItem: {
			reducer(e, t) {
				e.polarItems.push(H(t.payload));
			},
			prepare: U()
		},
		removePolarGraphicalItem: {
			reducer(e, t) {
				var n = Eo(e).polarItems.indexOf(H(t.payload));
				n > -1 && e.polarItems.splice(n, 1);
			},
			prepare: U()
		},
		replacePolarGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Eo(e).polarItems.indexOf(H(r));
				a > -1 && (e.polarItems[a] = H(i));
			},
			prepare: U()
		}
	}
}), tA = eA.actions, nA = tA.addCartesianGraphicalItem, rA = tA.replaceCartesianGraphicalItem, iA = tA.removeCartesianGraphicalItem;
tA.addPolarGraphicalItem, tA.removePolarGraphicalItem, tA.replacePolarGraphicalItem;
var aA = eA.reducer, oA = /*#__PURE__*/ (0, S.memo)((e) => {
	var t = ui(), n = (0, S.useRef)(null);
	return (0, S.useLayoutEffect)(() => {
		n.current === null ? t(nA(e)) : n.current !== e && t(rA({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, S.useLayoutEffect)(() => () => {
		n.current &&= (t(iA(n.current)), null);
	}, [t]), null;
}), sA = ["points"];
function cA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cA(Object(n), !0).forEach(function(t) {
			uA(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function uA(e, t, n) {
	return (t = dA(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dA(e) {
	var t = fA(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fA(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function pA() {
	return pA = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, pA.apply(null, arguments);
}
function mA(e, t) {
	if (e == null) return {};
	var n, r, i = hA(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function hA(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function gA(e) {
	var t = e.option, n = e.dotProps, r = e.className;
	if (/*#__PURE__*/ (0, S.isValidElement)(t)) return /*#__PURE__*/ (0, S.cloneElement)(t, n);
	if (typeof t == "function") return t(n);
	var i = y(r, typeof t == "boolean" ? "" : t.className), a = n ?? {};
	a.points;
	var o = mA(a, sA);
	return /*#__PURE__*/ S.createElement(KO, pA({}, o, { className: i }));
}
function _A(e, t) {
	return e == null ? !1 : t ? !0 : e.length === 1;
}
function vA(e) {
	var t = e.points, n = e.dot, r = e.className, i = e.dotClassName, a = e.dataKey, o = e.baseProps, s = e.needClip, c = e.clipPathId, l = e.zIndex, u = l === void 0 ? Pm.scatter : l;
	if (!_A(t, n)) return null;
	var d = ik(n), f = k(n), p = t.map((e, r) => {
		var s = lA(lA(lA({ r: 3 }, o), f), {}, {
			index: r,
			cx: e.x ?? void 0,
			cy: e.y ?? void 0,
			dataKey: a,
			value: e.value,
			payload: e.payload,
			points: t
		});
		return /*#__PURE__*/ S.createElement(gA, {
			key: `dot-${r}`,
			option: n,
			dotProps: s,
			className: i
		});
	}), m = {};
	return s && c != null && (m.clipPath = `url(#clipPath-${d ? "" : "dots-"}${c})`), /*#__PURE__*/ S.createElement(GT, { zIndex: u }, /*#__PURE__*/ S.createElement(ae, pA({ className: r }, m), p));
}
//#endregion
//#region node_modules/recharts/es6/state/cartesianAxisSlice.js
function yA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function bA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? yA(Object(n), !0).forEach(function(t) {
			xA(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xA(e, t, n) {
	return (t = SA(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function SA(e) {
	var t = CA(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function CA(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var wA = $o({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(e, t) {
				e.xAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceXAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.xAxis[r.id] !== void 0 && (r.id !== i.id && delete e.xAxis[r.id], e.xAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeXAxis: {
			reducer(e, t) {
				delete e.xAxis[t.payload.id];
			},
			prepare: U()
		},
		addYAxis: {
			reducer(e, t) {
				e.yAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceYAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.yAxis[r.id] !== void 0 && (r.id !== i.id && delete e.yAxis[r.id], e.yAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeYAxis: {
			reducer(e, t) {
				delete e.yAxis[t.payload.id];
			},
			prepare: U()
		},
		addZAxis: {
			reducer(e, t) {
				e.zAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceZAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.zAxis[r.id] !== void 0 && (r.id !== i.id && delete e.zAxis[r.id], e.zAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeZAxis: {
			reducer(e, t) {
				delete e.zAxis[t.payload.id];
			},
			prepare: U()
		},
		updateYAxisWidth(e, t) {
			var n = t.payload, r = n.id, i = n.width, a = e.yAxis[r];
			if (a) {
				var o = a.widthHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.width && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.yAxis[r] = bA(bA({}, a), {}, {
					width: i,
					widthHistory: s
				});
			}
		},
		updateXAxisHeight(e, t) {
			var n = t.payload, r = n.id, i = n.height, a = e.xAxis[r];
			if (a) {
				var o = a.heightHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.height && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.xAxis[r] = bA(bA({}, a), {}, {
					height: i,
					heightHistory: s
				});
			}
		}
	}
}), TA = wA.actions, EA = TA.addXAxis, DA = TA.replaceXAxis, OA = TA.removeXAxis, kA = TA.addYAxis, AA = TA.replaceYAxis, jA = TA.removeYAxis;
TA.addZAxis, TA.replaceZAxis, TA.removeZAxis;
var MA = TA.updateYAxisWidth, NA = TA.updateXAxisHeight, PA = wA.reducer, FA = B([
	B([Bc], (e) => ({
		top: e.top,
		bottom: e.bottom,
		left: e.left,
		right: e.right
	})),
	Cc,
	wc
], (e, t, n) => {
	if (e && t != null && n != null) return {
		x: e.left,
		y: e.top,
		width: Math.max(0, t - e.left - e.right),
		height: Math.max(0, n - e.top - e.bottom)
	};
}), IA = () => z(FA), LA = () => z(Jw);
//#endregion
//#region node_modules/recharts/es6/component/ActivePoints.js
function RA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function zA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? RA(Object(n), !0).forEach(function(t) {
			BA(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : RA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function BA(e, t, n) {
	return (t = VA(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function VA(e) {
	var t = HA(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function HA(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var UA = (e) => {
	var t = e.point, n = e.childIndex, r = e.mainColor, i = e.activeDot, a = e.dataKey, o = e.clipPath;
	if (i === !1 || t.x == null || t.y == null) return null;
	var s = zA(zA(zA({}, {
		index: n,
		dataKey: a,
		cx: t.x,
		cy: t.y,
		r: 4,
		fill: r ?? "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: t.payload,
		value: t.value
	}), D(i)), En(i)), c = /*#__PURE__*/ (0, S.isValidElement)(i) ? /*#__PURE__*/ (0, S.cloneElement)(i, s) : typeof i == "function" ? i(s) : /*#__PURE__*/ S.createElement(KO, s);
	return /*#__PURE__*/ S.createElement(ae, {
		className: "recharts-active-dot",
		clipPath: o
	}, c);
};
function WA(e) {
	var t = e.points, n = e.mainColor, r = e.activeDot, i = e.itemDataKey, a = e.clipPath, o = e.zIndex, s = o === void 0 ? Pm.activeDot : o, c = z(Vw), l = LA();
	if (t == null || l == null) return null;
	var u = t.find((e) => l.includes(e.payload));
	return De(u) ? null : /*#__PURE__*/ S.createElement(GT, { zIndex: s }, /*#__PURE__*/ S.createElement(UA, {
		point: u,
		childIndex: Number(c),
		mainColor: n,
		dataKey: i,
		activeDot: r,
		clipPath: a
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
function GA(e, t) {
	return XA(e) || YA(e, t) || qA(e, t) || KA();
}
function KA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function qA(e, t) {
	if (e) {
		if (typeof e == "string") return JA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? JA(e, t) : void 0;
	}
}
function JA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function YA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function XA(e) {
	if (Array.isArray(e)) return e;
}
var ZA = (e, t, n) => {
	var r = n ?? e;
	if (!De(r)) return Ce(r, t, 0);
}, QA = (e, t, n) => {
	var r = {}, i = e.filter(ah), a = e.filter((e) => e.stackId == null), o = i.reduce((e, t) => {
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, r), s = Object.entries(o).map((e) => {
		var r = GA(e, 2), i = r[0], a = r[1];
		return {
			stackId: i,
			dataKeys: a.map((e) => e.dataKey),
			barSize: ZA(t, n, a[0]?.barSize)
		};
	}), c = a.map((e) => ({
		stackId: void 0,
		dataKeys: [e.dataKey].filter((e) => e != null),
		barSize: ZA(t, n, e.barSize)
	}));
	return [...s, ...c];
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
function $A(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ej(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $A(Object(n), !0).forEach(function(t) {
			tj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $A(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tj(e, t, n) {
	return (t = nj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nj(e) {
	var t = rj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function rj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ij(e, t, n, r, i) {
	var a = r.length;
	if (!(a < 1)) {
		var o = Ce(e, n, 0, !0), s, c = [];
		if (G(r[0]?.barSize)) {
			var l = !1, u = n / a, d = r.reduce((e, t) => e + (t.barSize || 0), 0);
			d += (a - 1) * o, d >= n && (d -= (a - 1) * o, o = 0), d >= n && u > 0 && (l = !0, u *= .9, d = a * u);
			var f = {
				offset: Math.round((n - d) / 2) - o,
				size: 0
			};
			s = r.reduce((e, t) => {
				var n = {
					stackId: t.stackId,
					dataKeys: t.dataKeys,
					position: {
						offset: f.offset + f.size + o,
						size: l ? u : t.barSize ?? 0
					}
				}, r = [...e, n];
				return f = n.position, r;
			}, c);
		} else {
			var p = Ce(t, n, 0, !0);
			n - 2 * p - (a - 1) * o <= 0 && (o = 0);
			var m = (n - 2 * p - (a - 1) * o) / a;
			m > 1 && (m = Math.round(m));
			var h = G(i) ? Math.min(m, i) : m;
			s = r.reduce((e, t, n) => [...e, {
				stackId: t.stackId,
				dataKeys: t.dataKeys,
				position: {
					offset: p + a * (m - h) / 2 + (h + o) * n,
					size: h
				}
			}], c);
		}
		return s;
	}
}
var aj = (e, t, n, r, i, a, o) => {
	var s = De(o) ? t : o, c = ij(n, r, i === a ? a : i, e, s);
	return i !== a && c != null && (c = c.map((e) => ej(ej({}, e), {}, { position: ej(ej({}, e.position), {}, { offset: e.position.offset - i / 2 }) }))), c;
}, oj = (e, t) => {
	var n = rh(t);
	if (e && n != null && t != null) {
		var r = t.stackId;
		if (r != null) {
			var i = e[r];
			if (i) {
				var a = i.stackedData;
				if (a) return a.find((e) => e.key === n);
			}
		}
	}
}, sj = (e, t) => {
	if (e != null && t != null) {
		var n = e.find((e) => e.stackId === t.stackId && t.dataKey != null && e.dataKeys.includes(t.dataKey));
		if (n != null) return n.position;
	}
};
//#endregion
//#region node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function cj(e, t) {
	return e && typeof e == "object" && "zIndex" in e && typeof e.zIndex == "number" && G(e.zIndex) ? e.zIndex : t;
}
//#endregion
//#region node_modules/recharts/es6/util/CssPrefixUtils.js
function lj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function uj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? lj(Object(n), !0).forEach(function(t) {
			dj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : lj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function dj(e, t, n) {
	return (t = fj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fj(e) {
	var t = pj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function pj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var mj = [
	"Webkit",
	"Moz",
	"O",
	"ms"
], hj = (e, t) => {
	if (e) {
		var n = e.replace(/(\w)/, (e) => e.toUpperCase()), r = mj.reduce((e, r) => uj(uj({}, e), {}, { [r + n]: t }), {});
		return r[e] = t, r;
	}
}, gj = (e) => {
	var t = e.chartData, n = ui(), r = Wc();
	return (0, S.useEffect)(() => r ? () => {} : (n(mE(t)), () => {
		n(mE(void 0));
	}), [
		t,
		n,
		r
	]), null;
}, _j = (e) => e.chartData.chartData, vj = () => z(_j), yj = (e) => {
	var t = e.chartData;
	return {
		startIndex: t.dataStartIndex,
		endIndex: t.dataEndIndex
	};
}, bj = () => z(yj), xj = /*#__PURE__*/ (0, S.createContext)(() => {}), Sj = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
}, Cj = $o({
	name: "brush",
	initialState: Sj,
	reducers: { setBrushSettings(e, t) {
		return t.payload == null ? Sj : t.payload;
	} }
}), wj = Cj.actions.setBrushSettings, Tj = Cj.reducer;
//#endregion
//#region node_modules/recharts/es6/cartesian/Brush.js
function Ej() {
	return Ej = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ej.apply(null, arguments);
}
function Dj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Oj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dj(Object(n), !0).forEach(function(t) {
			kj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kj(e, t, n) {
	return (t = Aj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Aj(e) {
	var t = jj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Mj(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.stroke, o = Math.floor(n + i / 2) - 1;
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement("rect", {
		x: t,
		y: n,
		width: r,
		height: i,
		fill: a,
		stroke: "none"
	}), /*#__PURE__*/ S.createElement("line", {
		x1: t + 1,
		y1: o,
		x2: t + r - 1,
		y2: o,
		fill: "none",
		stroke: "#fff"
	}), /*#__PURE__*/ S.createElement("line", {
		x1: t + 1,
		y1: o + 2,
		x2: t + r - 1,
		y2: o + 2,
		fill: "none",
		stroke: "#fff"
	}));
}
function Nj(e) {
	var t = e.travellerProps, n = e.travellerType;
	return /*#__PURE__*/ S.isValidElement(n) ? /*#__PURE__*/ S.cloneElement(n, t) : typeof n == "function" ? n(t) : /*#__PURE__*/ S.createElement(Mj, t);
}
function Pj(e) {
	if (ke(e) && typeof e == "object" && "name" in e && typeof e.name == "string") return e.name;
}
function Fj(e, t, n) {
	return `Min value: ${Pj(e[t])}, Max value: ${Pj(e[n])}`;
}
function Ij(e) {
	var t = e.otherProps, n = e.travellerX, r = e.id, i = e.onMouseEnter, a = e.onMouseLeave, o = e.onMouseDown, s = e.onTouchStart, c = e.onTravellerMoveKeyboard, l = e.onFocus, u = e.onBlur, d = t.y, f = t.x, p = t.travellerWidth, m = t.height, h = t.traveller, g = t.ariaLabel, _ = t.data, v = t.startIndex, y = t.endIndex, b = Math.max(n, f), x = Oj(Oj({}, E(t)), {}, {
		x: b,
		y: d,
		width: p,
		height: m
	}), C = g || Fj(_, v, y);
	return /*#__PURE__*/ S.createElement(ae, {
		tabIndex: 0,
		role: "slider",
		"aria-label": C,
		"aria-valuenow": n,
		className: "recharts-brush-traveller",
		onMouseEnter: i,
		onMouseLeave: a,
		onMouseDown: o,
		onTouchStart: s,
		onKeyDown: (e) => {
			["ArrowLeft", "ArrowRight"].includes(e.key) && (e.preventDefault(), e.stopPropagation(), c(e.key === "ArrowRight" ? 1 : -1, r));
		},
		onFocus: l,
		onBlur: u,
		style: { cursor: "col-resize" }
	}, /*#__PURE__*/ S.createElement(Nj, {
		travellerType: h,
		travellerProps: x
	}));
}
function Lj(e) {
	var t = e.index, n = e.data, r = e.tickFormatter, i = e.dataKey, a = tc(n[t], i, t);
	return typeof r == "function" ? r(a, t) : a;
}
function Rj(e, t) {
	for (var n = e.length, r = 0, i = n - 1; i - r > 1;) {
		var a = Math.floor((r + i) / 2), o = e[a];
		o != null && o > t ? i = a : r = a;
	}
	var s = e[i];
	return s != null && t >= s ? i : r;
}
function zj(e) {
	var t = e.startX, n = e.endX, r = e.scaleValues, i = e.gap, a = e.data.length - 1, o = Math.min(t, n), s = Math.max(t, n), c = Rj(r, o), l = Rj(r, s);
	return {
		startIndex: c - c % i,
		endIndex: l === a ? a : l - l % i
	};
}
function Bj(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.fill, o = e.stroke;
	return /*#__PURE__*/ S.createElement("rect", {
		stroke: o,
		fill: a,
		x: t,
		y: n,
		width: r,
		height: i
	});
}
function Vj(e) {
	var t = e.startIndex, n = e.endIndex, r = e.y, i = e.height, a = e.travellerWidth, o = e.stroke, s = e.tickFormatter, c = e.dataKey, l = e.data, u = e.startX, d = e.endX, f = 5, p = {
		pointerEvents: "none",
		fill: o
	};
	return /*#__PURE__*/ S.createElement(ae, { className: "recharts-brush-texts" }, /*#__PURE__*/ S.createElement(aO, Ej({
		textAnchor: "end",
		verticalAnchor: "middle",
		x: Math.min(u, d) - f,
		y: r + i / 2
	}, p), Lj({
		index: t,
		tickFormatter: s,
		dataKey: c,
		data: l
	})), /*#__PURE__*/ S.createElement(aO, Ej({
		textAnchor: "start",
		verticalAnchor: "middle",
		x: Math.max(u, d) + a + f,
		y: r + i / 2
	}, p), Lj({
		index: n,
		tickFormatter: s,
		dataKey: c,
		data: l
	})));
}
function Hj(e) {
	var t = e.y, n = e.height, r = e.stroke, i = e.travellerWidth, a = e.startX, o = e.endX, s = e.onMouseEnter, c = e.onMouseLeave, l = e.onMouseDown, u = e.onTouchStart, d = Math.min(a, o) + i, f = Math.max(Math.abs(o - a) - i, 0);
	return /*#__PURE__*/ S.createElement("rect", {
		className: "recharts-brush-slide",
		onMouseEnter: s,
		onMouseLeave: c,
		onMouseDown: l,
		onTouchStart: u,
		style: { cursor: "move" },
		stroke: "none",
		fill: r,
		fillOpacity: .2,
		x: d,
		y: t,
		width: f,
		height: n
	});
}
function Uj(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.data, o = e.children, s = e.padding;
	if (S.Children.count(o) !== 1) return null;
	var c = S.Children.only(o);
	return c ? /*#__PURE__*/ S.cloneElement(c, {
		x: t,
		y: n,
		width: r,
		height: i,
		margin: s,
		compact: !0,
		data: a
	}) : null;
}
var Wj = (e) => {
	var t = e.data, n = e.startIndex, r = e.endIndex, i = e.x, a = e.width, o = e.travellerWidth;
	if (!t || !t.length) return {};
	var s = t.length, c = Jh().domain(Kp(0, s)).range([i, i + a - o]), l = c.domain().map((e) => c(e)).filter(ke);
	return {
		isTextActive: !1,
		isSlideMoving: !1,
		isTravellerMoving: !1,
		isTravellerFocused: !1,
		startX: c(n),
		endX: c(r),
		scale: c,
		scaleValues: l
	};
}, Gj = (e) => e.changedTouches && !!e.changedTouches.length, Kj = class extends S.PureComponent {
	constructor(e) {
		super(e), kj(this, "handleDrag", (e) => {
			this.leaveTimer &&= (clearTimeout(this.leaveTimer), null), this.state.isTravellerMoving ? this.handleTravellerMove(e) : this.state.isSlideMoving && this.handleSlideDrag(e);
		}), kj(this, "handleTouchMove", (e) => {
			var t = e.changedTouches?.[0];
			t != null && this.handleDrag(t);
		}), kj(this, "handleDragEnd", () => {
			this.setState({
				isTravellerMoving: !1,
				isSlideMoving: !1
			}, () => {
				var e = this.props, t = e.endIndex, n = e.onDragEnd, r = e.startIndex;
				n?.({
					endIndex: t,
					startIndex: r
				});
			}), this.detachDragEndListener();
		}), kj(this, "handleLeaveWrapper", () => {
			(this.state.isTravellerMoving || this.state.isSlideMoving) && (this.leaveTimer = window.setTimeout(this.handleDragEnd, this.props.leaveTimeOut));
		}), kj(this, "handleEnterSlideOrTraveller", () => {
			this.setState({ isTextActive: !0 });
		}), kj(this, "handleLeaveSlideOrTraveller", () => {
			this.setState({ isTextActive: !1 });
		}), kj(this, "handleSlideDragStart", (e) => {
			var t = Gj(e) ? e.changedTouches[0] : e;
			t != null && (this.setState({
				isTravellerMoving: !1,
				isSlideMoving: !0,
				slideMoveStartX: t.pageX
			}), this.attachDragEndListener());
		}), kj(this, "handleTravellerMoveKeyboard", (e, t) => {
			var n = this.props, r = n.data, i = n.gap, a = n.startIndex, o = n.endIndex, s = this.state, c = s.scaleValues, l = s.startX, u = s.endX;
			if (c != null) {
				var d = -1;
				if (t === "startX" ? d = a : t === "endX" && (d = o), !(d < 0 || d >= r.length)) {
					var f = d + e;
					if (!(f === -1 || f >= c.length)) {
						var p = c[f];
						p != null && (t === "startX" && p >= u || t === "endX" && p <= l || this.setState({ [t]: p }, () => {
							this.props.onChange(zj({
								startX: this.state.startX,
								endX: this.state.endX,
								data: r,
								gap: i,
								scaleValues: c
							}));
						}));
					}
				}
			}
		}), this.travellerDragStartHandlers = {
			startX: this.handleTravellerDragStart.bind(this, "startX"),
			endX: this.handleTravellerDragStart.bind(this, "endX")
		}, this.state = {
			brushMoveStartX: 0,
			movingTravellerId: void 0,
			endX: 0,
			startX: 0,
			slideMoveStartX: 0
		};
	}
	static getDerivedStateFromProps(e, t) {
		var n = e.data, r = e.width, i = e.x, a = e.travellerWidth, o = e.startIndex, s = e.endIndex, c = e.startIndexControlledFromProps, l = e.endIndexControlledFromProps;
		if (n !== t.prevData) return Oj({
			prevData: n,
			prevTravellerWidth: a,
			prevX: i,
			prevWidth: r,
			prevStartIndexControlledFromProps: c,
			prevEndIndexControlledFromProps: l
		}, n && n.length ? Wj({
			data: n,
			width: r,
			x: i,
			travellerWidth: a,
			startIndex: o,
			endIndex: s
		}) : {
			scale: void 0,
			scaleValues: void 0
		});
		var u = t.scale;
		if (u && (r !== t.prevWidth || i !== t.prevX || a !== t.prevTravellerWidth)) {
			u.range([i, i + r - a]);
			var d = u.domain().map((e) => u(e)).filter((e) => e != null);
			return {
				prevData: n,
				prevTravellerWidth: a,
				prevX: i,
				prevWidth: r,
				startX: u(e.startIndex),
				endX: u(e.endIndex),
				scaleValues: d
			};
		}
		if (t.scale && !t.isSlideMoving && !t.isTravellerMoving && !t.isTravellerFocused && !t.isTextActive) {
			if (c != null && t.prevStartIndexControlledFromProps !== c) return {
				startX: t.scale(c),
				prevStartIndexControlledFromProps: c
			};
			if (l != null && t.prevEndIndexControlledFromProps !== l) return {
				endX: t.scale(l),
				prevEndIndexControlledFromProps: l
			};
		}
		return null;
	}
	componentWillUnmount() {
		this.leaveTimer &&= (clearTimeout(this.leaveTimer), null), this.detachDragEndListener();
	}
	attachDragEndListener() {
		window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
	}
	detachDragEndListener() {
		window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
	}
	handleSlideDrag(e) {
		var t = this.state, n = t.slideMoveStartX, r = t.startX, i = t.endX, a = t.scaleValues;
		if (a != null) {
			var o = this.props, s = o.x, c = o.width, l = o.travellerWidth, u = o.startIndex, d = o.endIndex, f = o.onChange, p = o.data, m = o.gap, h = e.pageX - n;
			h > 0 ? h = Math.min(h, s + c - l - i, s + c - l - r) : h < 0 && (h = Math.max(h, s - r, s - i));
			var g = zj({
				startX: r + h,
				endX: i + h,
				data: p,
				gap: m,
				scaleValues: a
			});
			(g.startIndex !== u || g.endIndex !== d) && f && f(g), this.setState({
				startX: r + h,
				endX: i + h,
				slideMoveStartX: e.pageX
			});
		}
	}
	handleTravellerDragStart(e, t) {
		var n = Gj(t) ? t.changedTouches[0] : t;
		n != null && (this.setState({
			isSlideMoving: !1,
			isTravellerMoving: !0,
			movingTravellerId: e,
			brushMoveStartX: n.pageX
		}), this.attachDragEndListener());
	}
	handleTravellerMove(e) {
		var t = this.state, n = t.brushMoveStartX, r = t.movingTravellerId, i = t.endX, a = t.startX, o = t.scaleValues;
		if (r != null && o != null) {
			var s = this.state[r], c = this.props, l = c.x, u = c.width, d = c.travellerWidth, f = c.onChange, p = c.gap, m = c.data, h = {
				startX: this.state.startX,
				endX: this.state.endX,
				data: m,
				gap: p,
				scaleValues: o
			}, g = e.pageX - n;
			g > 0 ? g = Math.min(g, l + u - d - s) : g < 0 && (g = Math.max(g, l - s)), h[r] = s + g;
			var _ = zj(h), v = _.startIndex, y = _.endIndex, b = () => {
				var e = m.length - 1;
				return r === "startX" && (i > a ? v % p === 0 : y % p === 0) || i < a && y === e || r === "endX" && (i > a ? y % p === 0 : v % p === 0) || i > a && y === e;
			};
			this.setState({
				[r]: s + g,
				brushMoveStartX: e.pageX
			}, () => {
				f && b() && f(_);
			});
		}
	}
	render() {
		var e = this.props, t = e.data, n = e.className, r = e.children, i = e.x, a = e.y, o = e.dy, s = e.width, c = e.height, l = e.alwaysShowText, u = e.fill, d = e.stroke, f = e.startIndex, p = e.endIndex, m = e.travellerWidth, h = e.tickFormatter, g = e.dataKey, _ = e.padding, v = this.state, b = v.startX, x = v.endX, C = v.isTextActive, w = v.isSlideMoving, T = v.isTravellerMoving, E = v.isTravellerFocused;
		if (!t || !t.length || !I(i) || !I(a) || !I(s) || !I(c) || s <= 0 || c <= 0) return null;
		var D = y("recharts-brush", n), O = hj("userSelect", "none"), k = a + (o ?? 0);
		return /*#__PURE__*/ S.createElement(ae, {
			className: D,
			onMouseLeave: this.handleLeaveWrapper,
			onTouchMove: this.handleTouchMove,
			style: O
		}, /*#__PURE__*/ S.createElement(Bj, {
			x: i,
			y: k,
			width: s,
			height: c,
			fill: u,
			stroke: d
		}), /*#__PURE__*/ S.createElement(Gc, null, /*#__PURE__*/ S.createElement(Uj, {
			x: i,
			y: k,
			width: s,
			height: c,
			data: t,
			padding: _
		}, r)), /*#__PURE__*/ S.createElement(Hj, {
			y: k,
			height: c,
			stroke: d,
			travellerWidth: m,
			startX: b,
			endX: x,
			onMouseEnter: this.handleEnterSlideOrTraveller,
			onMouseLeave: this.handleLeaveSlideOrTraveller,
			onMouseDown: this.handleSlideDragStart,
			onTouchStart: this.handleSlideDragStart
		}), /*#__PURE__*/ S.createElement(Ij, {
			travellerX: b,
			id: "startX",
			otherProps: Oj(Oj({}, this.props), {}, { y: k }),
			onMouseEnter: this.handleEnterSlideOrTraveller,
			onMouseLeave: this.handleLeaveSlideOrTraveller,
			onMouseDown: this.travellerDragStartHandlers.startX,
			onTouchStart: this.travellerDragStartHandlers.startX,
			onTravellerMoveKeyboard: this.handleTravellerMoveKeyboard,
			onFocus: () => {
				this.setState({ isTravellerFocused: !0 });
			},
			onBlur: () => {
				this.setState({ isTravellerFocused: !1 });
			}
		}), /*#__PURE__*/ S.createElement(Ij, {
			travellerX: x,
			id: "endX",
			otherProps: Oj(Oj({}, this.props), {}, { y: k }),
			onMouseEnter: this.handleEnterSlideOrTraveller,
			onMouseLeave: this.handleLeaveSlideOrTraveller,
			onMouseDown: this.travellerDragStartHandlers.endX,
			onTouchStart: this.travellerDragStartHandlers.endX,
			onTravellerMoveKeyboard: this.handleTravellerMoveKeyboard,
			onFocus: () => {
				this.setState({ isTravellerFocused: !0 });
			},
			onBlur: () => {
				this.setState({ isTravellerFocused: !1 });
			}
		}), (C || w || T || E || l) && /*#__PURE__*/ S.createElement(Vj, {
			startIndex: f,
			endIndex: p,
			y: k,
			height: c,
			travellerWidth: m,
			stroke: d,
			tickFormatter: h,
			dataKey: g,
			data: t,
			startX: b,
			endX: x
		}));
	}
};
function qj(e) {
	var t = ui(), n = vj(), r = bj(), i = (0, S.useContext)(xj), a = e.onChange, o = e.startIndex, s = e.endIndex;
	(0, S.useEffect)(() => {
		t(hE({
			startIndex: o,
			endIndex: s
		}));
	}, [
		t,
		s,
		o,
		n
	]), kE();
	var c = (0, S.useCallback)((e) => {
		if (r != null) {
			var n = r.startIndex, o = r.endIndex;
			(e.startIndex !== n || e.endIndex !== o) && (i?.(e), a?.(e), t(hE(e)));
		}
	}, [
		a,
		i,
		t,
		r
	]), l = z(qc);
	if (l == null || r == null || n == null || !n.length) return null;
	var u = r.startIndex, d = r.endIndex, f = {
		data: n,
		x: l.x,
		y: l.y,
		width: l.width,
		startIndex: u,
		endIndex: d,
		onChange: c
	};
	return /*#__PURE__*/ S.createElement(Kj, Ej({}, e, f, {
		startIndexControlledFromProps: o ?? void 0,
		endIndexControlledFromProps: s ?? void 0
	}));
}
function Jj(e) {
	var t = ui();
	return (0, S.useEffect)(() => (t(wj(e)), () => {
		t(wj(null));
	}), [t, e]), null;
}
var Yj = {
	height: 40,
	travellerWidth: 5,
	gap: 1,
	fill: "#fff",
	stroke: "#666",
	padding: {
		top: 1,
		right: 1,
		bottom: 1,
		left: 1
	},
	leaveTimeOut: 1e3,
	alwaysShowText: !1
};
function Xj(e) {
	var t = Pn(e, Yj);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Jj, {
		height: t.height,
		x: t.x,
		y: t.y,
		width: t.width,
		padding: t.padding
	}), /*#__PURE__*/ S.createElement(qj, t));
}
Xj.displayName = "Brush";
//#endregion
//#region node_modules/recharts/es6/util/CartesianUtils.js
var Zj = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return {
		x: Math.min(n, i),
		y: Math.min(r, a),
		width: Math.abs(i - n),
		height: Math.abs(a - r)
	};
};
function Qj(e) {
	return (e % 180 + 180) % 180;
}
var $j = function(e) {
	var t = e.width, n = e.height, r = Qj(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180, i = Math.atan(n / t), a = r > i && r < Math.PI - i ? n / Math.sin(r) : t / Math.cos(r);
	return Math.abs(a);
}, eM = $o({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (e, t) => {
			e.dots.push(t.payload);
		},
		removeDot: (e, t) => {
			var n = Eo(e).dots.findIndex((e) => e === t.payload);
			n !== -1 && e.dots.splice(n, 1);
		},
		addArea: (e, t) => {
			e.areas.push(t.payload);
		},
		removeArea: (e, t) => {
			var n = Eo(e).areas.findIndex((e) => e === t.payload);
			n !== -1 && e.areas.splice(n, 1);
		},
		addLine: (e, t) => {
			e.lines.push(H(t.payload));
		},
		removeLine: (e, t) => {
			var n = Eo(e).lines.findIndex((e) => e === t.payload);
			n !== -1 && e.lines.splice(n, 1);
		}
	}
}), tM = eM.actions;
tM.addDot, tM.removeDot;
var nM = tM.addArea, rM = tM.removeArea;
tM.addLine, tM.removeLine;
var iM = eM.reducer;
//#endregion
//#region node_modules/recharts/es6/container/ClipPathProvider.js
function aM(e, t) {
	return uM(e) || lM(e, t) || sM(e, t) || oM();
}
function oM() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function sM(e, t) {
	if (e) {
		if (typeof e == "string") return cM(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? cM(e, t) : void 0;
	}
}
function cM(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function lM(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function uM(e) {
	if (Array.isArray(e)) return e;
}
var dM = /*#__PURE__*/ (0, S.createContext)(void 0), fM = (e) => {
	var t = e.children, n = aM((0, S.useState)(`${Se("recharts")}-clip`), 1)[0], r = IA();
	if (r == null) return null;
	var i = r.x, a = r.y, o = r.width, s = r.height;
	return /*#__PURE__*/ S.createElement(dM.Provider, { value: n }, /*#__PURE__*/ S.createElement("defs", null, /*#__PURE__*/ S.createElement("clipPath", { id: n }, /*#__PURE__*/ S.createElement("rect", {
		x: i,
		y: a,
		height: s,
		width: o
	}))), t);
}, pM = () => (0, S.useContext)(dM), mM = class {
	constructor(e) {
		var t = e.x, n = e.y;
		this.xAxisScale = t, this.yAxisScale = n;
	}
	map(e, t) {
		var n = t.position;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? 0,
			y: this.yAxisScale.map(e.y, { position: n }) ?? 0
		};
	}
	mapWithFallback(e, t) {
		var n = t.position, r = t.fallback, i = r === "rangeMin" ? this.yAxisScale.rangeMin() : r === "rangeMax" ? this.yAxisScale.rangeMax() : 0, a = r === "rangeMin" ? this.xAxisScale.rangeMin() : r === "rangeMax" ? this.xAxisScale.rangeMax() : 0;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? a,
			y: this.yAxisScale.map(e.y, { position: n }) ?? i
		};
	}
	isInRange(e) {
		var t = e.x, n = e.y, r = t == null || this.xAxisScale.isInRange(t), i = n == null || this.yAxisScale.isInRange(n);
		return r && i;
	}
};
//#endregion
//#region node_modules/recharts/es6/cartesian/ReferenceArea.js
function hM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function gM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? hM(Object(n), !0).forEach(function(t) {
			_M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function _M(e, t, n) {
	return (t = vM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function vM(e) {
	var t = yM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function yM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function bM() {
	return bM = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, bM.apply(null, arguments);
}
var xM = (e, t, n, r, i, a, o) => {
	var s = o.x1, c = o.x2, l = o.y1, u = o.y2;
	if (i == null || a == null) return null;
	var d = new mM({
		x: i,
		y: a
	}), f = {
		x: e ? i.map(s, { position: "start" }) ?? null : i.rangeMin(),
		y: n ? a.map(l, { position: "start" }) ?? null : a.rangeMin()
	}, p = {
		x: t ? i.map(c, { position: "end" }) ?? null : i.rangeMax(),
		y: r ? a.map(u, { position: "end" }) ?? null : a.rangeMax()
	};
	return o.ifOverflow === "discard" && (!d.isInRange(f) || !d.isInRange(p)) ? null : Zj(f, p);
}, SM = (e, t) => /*#__PURE__*/ S.isValidElement(e) ? /*#__PURE__*/ S.cloneElement(e, t) : typeof e == "function" ? e(t) : /*#__PURE__*/ S.createElement(fp, bM({}, t, { className: "recharts-reference-area-rect" }));
function CM(e) {
	var t = ui();
	return (0, S.useEffect)(() => (t(nM(e)), () => {
		t(rM(e));
	})), null;
}
function wM(e) {
	var t = e.x1, n = e.x2, r = e.y1, i = e.y2, a = e.className, o = e.shape, s = e.xAxisId, c = e.yAxisId, l = pM(), u = Wc(), d = z((e) => XS(e, "xAxis", s, u)), f = z((e) => XS(e, "yAxis", c, u));
	if (d == null || f == null) return null;
	var p = be(t), m = be(n), h = be(r), g = be(i);
	if (!p && !m && !h && !g && !o) return null;
	var _ = xM(p, m, h, g, d, f, e);
	if (!_ && !o) return null;
	var v = e.ifOverflow === "hidden" ? `url(#${l})` : void 0;
	return /*#__PURE__*/ S.createElement(GT, { zIndex: e.zIndex }, /*#__PURE__*/ S.createElement(ae, { className: y("recharts-reference-area", a) }, SM(o, gM(gM({ clipPath: v }, O(e)), _)), _ != null && /*#__PURE__*/ S.createElement(_O, bM({}, _, {
		lowerWidth: _.width,
		upperWidth: _.width
	}), /*#__PURE__*/ S.createElement(jO, { label: e.label }), e.children)));
}
var TM = {
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	radius: 0,
	fill: "#ccc",
	label: !1,
	fillOpacity: .5,
	stroke: "none",
	strokeWidth: 1,
	zIndex: Pm.area
};
function EM(e) {
	var t = Pn(e, TM);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(CM, {
		yAxisId: t.yAxisId,
		xAxisId: t.xAxisId,
		ifOverflow: t.ifOverflow,
		x1: t.x1,
		x2: t.x2,
		y1: t.y1,
		y2: t.y2
	}), /*#__PURE__*/ S.createElement(wM, t));
}
EM.displayName = "ReferenceArea";
//#endregion
//#region node_modules/es-toolkit/dist/function/noop.mjs
function DM() {}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function OM(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null ? !1 : Object.prototype.toString.call(e) === "[object Object]";
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function kM(e, t, n) {
	return AM(e, t, void 0, void 0, void 0, void 0, n);
}
function AM(e, t, n, r, i, a, o) {
	let s = o(e, t, n, r, i, a);
	if (s !== void 0) return s;
	if (typeof e == typeof t) switch (typeof e) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return e === t;
		case "number": return e === t || Object.is(e, t);
		case "function": return e === t;
		case "object": return jM(e, t, a, o);
	}
	return jM(e, t, a, o);
}
function jM(e, t, n, r) {
	if (Object.is(e, t)) return !0;
	let i = nr(e), a = nr(t);
	if (i === "[object Arguments]" && (i = hr), a === "[object Arguments]" && (a = hr), i !== a) return !1;
	switch (i) {
		case ir: return e.toString() === t.toString();
		case ar: return Ir(e.valueOf(), t.valueOf());
		case or:
		case lr:
		case cr: return Object.is(e.valueOf(), t.valueOf());
		case rr: return e.source === t.source && e.flags === t.flags;
		case pr: return e === t;
	}
	n ??= /* @__PURE__ */ new Map();
	let o = n.get(e), s = n.get(t);
	if (o != null && s != null) return o === t;
	n.set(e, t), n.set(t, e);
	try {
		switch (i) {
			case ur:
				if (e.size !== t.size) return !1;
				for (let [i, a] of e.entries()) if (!t.has(i) || !AM(a, t.get(i), i, e, t, n, r)) return !1;
				return !0;
			case dr: {
				if (e.size !== t.size) return !1;
				let i = Array.from(e.values()), a = Array.from(t.values());
				for (let o = 0; o < i.length; o++) {
					let s = i[o], c = a.findIndex((i) => AM(s, i, void 0, e, t, n, r));
					if (c === -1) return !1;
					a.splice(c, 1);
				}
				return !0;
			}
			case fr:
			case vr:
			case yr:
			case br:
			case xr:
			case Sr:
			case Cr:
			case wr:
			case Tr:
			case Er:
			case Dr:
			case Or:
				if (Ar(e) !== Ar(t) || e.length !== t.length) return !1;
				for (let i = 0; i < e.length; i++) if (!AM(e[i], t[i], i, e, t, n, r)) return !1;
				return !0;
			case mr: return e.byteLength === t.byteLength && jM(new Uint8Array(e), new Uint8Array(t), n, r);
			case _r: return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : jM(new Uint8Array(e), new Uint8Array(t), n, r);
			case gr: return e.name === t.name && e.message === t.message;
			case hr: {
				if (!(jM(e.constructor, t.constructor, n, r) || OM(e) && OM(t))) return !1;
				let i = [...Object.keys(e), ...tr(e)], a = [...Object.keys(t), ...tr(t)];
				if (i.length !== a.length) return !1;
				for (let a = 0; a < i.length; a++) {
					let o = i[a], s = e[o];
					if (!Object.hasOwn(t, o)) return !1;
					let c = t[o];
					if (!AM(s, c, o, e, t, n, r)) return !1;
				}
				return !0;
			}
			default: return !1;
		}
	} finally {
		n.delete(e), n.delete(t);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isEqual.mjs
function MM(e, t) {
	return kM(e, t, DM);
}
//#endregion
//#region node_modules/recharts/es6/util/getEveryNth.js
function NM(e, t) {
	if (t < 1) return [];
	if (t === 1) return e;
	for (var n = [], r = 0; r < e.length; r += t) {
		var i = e[r];
		i !== void 0 && n.push(i);
	}
	return n;
}
//#endregion
//#region node_modules/recharts/es6/util/TickUtils.js
function PM(e, t, n) {
	return $j({
		width: e.width + t.width,
		height: e.height + t.height
	}, n);
}
function FM(e, t, n) {
	var r = n === "width", i = e.x, a = e.y, o = e.width, s = e.height;
	return t === 1 ? {
		start: r ? i : a,
		end: r ? i + o : a + s
	} : {
		start: r ? i + o : a + s,
		end: r ? i : a
	};
}
function IM(e, t, n, r, i) {
	if (e * t < e * r || e * t > e * i) return !1;
	var a = n();
	return e * (t - e * a / 2 - r) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function LM(e, t) {
	return NM(e, t + 1);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function RM(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = t.start, s = t.end, c = 0, l = 1, u = o, d = function() {
		var t = r?.[c];
		if (t === void 0) return { v: NM(r, l) };
		var a = c, d, f = () => (d === void 0 && (d = n(t, a)), d), p = t.coordinate, m = c === 0 || IM(e, p, f, u, s);
		m || (c = 0, u = o, l += 1), m && (u = p + e * (f() / 2 + i), c += l);
	}, f; l <= a.length;) if (f = d(), f) return f.v;
	return [];
}
function zM(e, t, n, r, i) {
	var a = (r || []).slice().length;
	if (a === 0) return [];
	for (var o = t.start, s = t.end, c = 1; c <= a; c++) {
		for (var l = (a - 1) % c, u = o, d = !0, f = function() {
			var t = r[m];
			if (t == null) return 0;
			var a = m, o, c = () => (o === void 0 && (o = n(t, a)), o), f = t.coordinate, p = m === l || IM(e, f, c, u, s);
			if (!p) return d = !1, 1;
			p && (u = f + e * (c() / 2 + i));
		}, p, m = l; m < a && (p = f(), p === 0 || p !== 1); m += c);
		if (d) {
			for (var h = [], g = l; g < a; g += c) {
				var _ = r[g];
				_ != null && h.push(_);
			}
			return h;
		}
	}
	return [];
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getTicks.js
function BM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function VM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? BM(Object(n), !0).forEach(function(t) {
			HM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : BM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function HM(e, t, n) {
	return (t = UM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function UM(e) {
	var t = WM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function WM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function GM(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = a.length, s = t.start, c = t.end, l = function(t) {
		var r = a[t];
		if (r == null) return 1;
		var l = r, u, d = () => (u === void 0 && (u = n(r, t)), u);
		if (t === o - 1) {
			var f = e * (l.coordinate + e * d() / 2 - c);
			a[t] = l = VM(VM({}, l), {}, { tickCoord: f > 0 ? l.coordinate - f * e : l.coordinate });
		} else a[t] = l = VM(VM({}, l), {}, { tickCoord: l.coordinate });
		l.tickCoord != null && IM(e, l.tickCoord, d, s, c) && (c = l.tickCoord - e * (d() / 2 + i), a[t] = VM(VM({}, l), {}, { isShow: !0 }));
	}, u = o - 1; u >= 0; u--) if (l(u)) continue;
	return a;
}
function KM(e, t, n, r, i, a) {
	var o = (r || []).slice(), s = o.length, c = t.start, l = t.end;
	if (a) {
		var u = r[s - 1];
		if (u != null) {
			var d = n(u, s - 1), f = e * (u.coordinate + e * d / 2 - l);
			o[s - 1] = u = VM(VM({}, u), {}, { tickCoord: f > 0 ? u.coordinate - f * e : u.coordinate }), u.tickCoord != null && IM(e, u.tickCoord, () => d, c, l) && (l = u.tickCoord - e * (d / 2 + i), o[s - 1] = VM(VM({}, u), {}, { isShow: !0 }));
		}
	}
	for (var p = a ? s - 1 : s, m = function(t) {
		var r = o[t];
		if (r == null) return 1;
		var a = r, s, u = () => (s === void 0 && (s = n(r, t)), s);
		if (t === 0) {
			var d = e * (a.coordinate - e * u() / 2 - c);
			o[t] = a = VM(VM({}, a), {}, { tickCoord: d < 0 ? a.coordinate - d * e : a.coordinate });
		} else o[t] = a = VM(VM({}, a), {}, { tickCoord: a.coordinate });
		a.tickCoord != null && IM(e, a.tickCoord, u, c, l) && (c = a.tickCoord + e * (u() / 2 + i), o[t] = VM(VM({}, a), {}, { isShow: !0 }));
	}, h = 0; h < p; h++) if (m(h)) continue;
	return o;
}
function qM(e, t, n) {
	var r = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, s = e.orientation, c = e.interval, l = e.tickFormatter, u = e.unit, d = e.angle;
	if (!i || !i.length || !r) return [];
	if (I(c) || ad.isSsr) return LM(i, I(c) ? c : 0) ?? [];
	var f = [], p = s === "top" || s === "bottom" ? "width" : "height", m = u && p === "width" ? cD(u, {
		fontSize: t,
		letterSpacing: n
	}) : {
		width: 0,
		height: 0
	}, h = (e, r) => {
		var i = typeof l == "function" ? l(e.value, r) : e.value;
		return p === "width" ? PM(cD(i, {
			fontSize: t,
			letterSpacing: n
		}), m, d) : cD(i, {
			fontSize: t,
			letterSpacing: n
		})[p];
	}, g = i[0], _ = i[1], v = i.length >= 2 && g != null && _ != null ? _e(_.coordinate - g.coordinate) : 1, y = FM(a, v, p);
	return c === "equidistantPreserveStart" ? RM(v, y, h, i, o) : c === "equidistantPreserveEnd" ? zM(v, y, h, i, o) : (f = c === "preserveStart" || c === "preserveStartEnd" ? KM(v, y, h, i, o, c === "preserveStartEnd") : GM(v, y, h, i, o), f.filter((e) => e.isShow));
}
//#endregion
//#region node_modules/recharts/es6/util/YAxisUtils.js
var JM = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.width > l && (l = t.width);
			}
		});
		var u = n ? n.getBoundingClientRect().width : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, YM = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.height > l && (l = t.height);
			}
		});
		var u = n ? n.getBoundingClientRect().height : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, XM = $o({
	name: "renderedTicks",
	initialState: {
		xAxis: {},
		yAxis: {}
	},
	reducers: {
		setRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId, a = n.ticks;
			e[r][i] = H(a);
		},
		removeRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId;
			delete e[r][i];
		}
	}
}), ZM = XM.actions, QM = ZM.setRenderedTicks, $M = ZM.removeRenderedTicks, eN = XM.reducer, tN = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType",
	"axisId"
];
function nN(e, t) {
	return sN(e) || oN(e, t) || iN(e, t) || rN();
}
function rN() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function iN(e, t) {
	if (e) {
		if (typeof e == "string") return aN(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? aN(e, t) : void 0;
	}
}
function aN(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function oN(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function sN(e) {
	if (Array.isArray(e)) return e;
}
function cN(e, t) {
	if (e == null) return {};
	var n, r, i = lN(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function lN(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function uN() {
	return uN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, uN.apply(null, arguments);
}
function dN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function fN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? dN(Object(n), !0).forEach(function(t) {
			pN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function pN(e, t, n) {
	return (t = mN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function mN(e) {
	var t = hN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function hN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var gN = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: Pm.axis
};
function _N(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.orientation, o = e.mirror, s = e.axisLine, c = e.otherSvgProps;
	if (!s) return null;
	var l = fN(fN(fN({}, c), E(s)), {}, { fill: "none" });
	if (a === "top" || a === "bottom") {
		var u = +(a === "top" && !o || a === "bottom" && o);
		l = fN(fN({}, l), {}, {
			x1: t,
			y1: n + u * i,
			x2: t + r,
			y2: n + u * i
		});
	} else {
		var d = +(a === "left" && !o || a === "right" && o);
		l = fN(fN({}, l), {}, {
			x1: t + d * r,
			y1: n,
			x2: t + d * r,
			y2: n + i
		});
	}
	return /*#__PURE__*/ S.createElement("line", uN({}, l, { className: y("recharts-cartesian-axis-line", me(s, "className")) }));
}
function vN(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h = s ? -1 : 1, g = e.tickSize || o, _ = I(e.tickCoord) ? e.tickCoord : e.coordinate;
	switch (a) {
		case "top":
			l = u = e.coordinate, f = n + +!s * i, d = f - h * g, m = d - h * c, p = _;
			break;
		case "left":
			d = f = e.coordinate, u = t + +!s * r, l = u - h * g, p = l - h * c, m = _;
			break;
		case "right":
			d = f = e.coordinate, u = t + +s * r, l = u + h * g, p = l + h * c, m = _;
			break;
		default: l = u = e.coordinate, f = n + +s * i, d = f + h * g, m = d + h * c, p = _;
	}
	return {
		line: {
			x1: l,
			y1: d,
			x2: u,
			y2: f
		},
		tick: {
			x: p,
			y: m
		}
	};
}
function yN(e, t) {
	switch (e) {
		case "left": return t ? "start" : "end";
		case "right": return t ? "end" : "start";
		default: return "middle";
	}
}
function bN(e, t) {
	switch (e) {
		case "left":
		case "right": return "middle";
		case "top": return t ? "start" : "end";
		default: return t ? "end" : "start";
	}
}
function xN(e) {
	var t = e.option, n = e.tickProps, r = e.value, i, a = y(n.className, "recharts-cartesian-axis-tick-value");
	if (/*#__PURE__*/ S.isValidElement(t)) i = /*#__PURE__*/ S.cloneElement(t, fN(fN({}, n), {}, { className: a }));
	else if (typeof t == "function") i = t(fN(fN({}, n), {}, { className: a }));
	else {
		var o = "recharts-cartesian-axis-tick-value";
		typeof t != "boolean" && (o = y(o, XO(t))), i = /*#__PURE__*/ S.createElement(aO, uN({}, n, { className: o }), r);
	}
	return i;
}
function SN(e) {
	var t = e.ticks, n = e.axisType, r = e.axisId, i = ui(), a = (0, S.useRef)(null);
	return (0, S.useEffect)(() => {
		if (r != null && n != null) {
			var e = t.map((e) => ({
				value: e.value,
				coordinate: e.coordinate,
				offset: e.offset,
				index: e.index
			})), o = a.current;
			o != null && o.axisId === r && o.axisType === n && MM(o.ticks, e) || (a.current = {
				ticks: e,
				axisId: r,
				axisType: n
			}, i(QM({
				ticks: e,
				axisId: r,
				axisType: n
			})));
		}
	}, [
		i,
		t,
		r,
		n
	]), (0, S.useEffect)(() => r == null || n == null ? Ae : () => {
		i($M({
			axisId: r,
			axisType: n
		}));
	}, [
		i,
		r,
		n
	]), null;
}
var CN = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.ticks, r = n === void 0 ? [] : n, i = e.tick, a = e.tickLine, o = e.stroke, s = e.tickFormatter, c = e.unit, l = e.padding, u = e.tickTextProps, d = e.orientation, f = e.mirror, p = e.x, m = e.y, h = e.width, g = e.height, _ = e.tickSize, v = e.tickMargin, b = e.fontSize, x = e.letterSpacing, C = e.getTicksConfig, w = e.events, T = e.axisType, O = e.axisId, k = qM(fN(fN({}, C), {}, { ticks: r }), b, x), A = E(C), j = D(i), M = JD(A.textAnchor) ? A.textAnchor : yN(d, f), N = bN(d, f), ee = {};
	typeof a == "object" && (ee = a);
	var te = fN(fN({}, A), {}, { fill: "none" }, ee), ne = k.map((e) => fN({ entry: e }, vN(e, p, m, h, g, d, _, f, v))), re = ne.map((e) => {
		var t = e.entry, n = e.line;
		return /*#__PURE__*/ S.createElement(ae, {
			className: "recharts-cartesian-axis-tick",
			key: `tick-${t.value}-${t.coordinate}-${t.tickCoord}`
		}, a && /*#__PURE__*/ S.createElement("line", uN({}, te, n, { className: y("recharts-cartesian-axis-tick-line", me(a, "className")) })));
	}), ie = ne.map((e, t) => {
		var n = e.entry, r = e.tick, a = fN(fN({}, fN(fN(fN(fN({ verticalAnchor: N }, A), {}, {
			textAnchor: M,
			stroke: "none",
			fill: o
		}, r), {}, {
			index: t,
			payload: n,
			visibleTicksCount: k.length,
			tickFormatter: s,
			padding: l
		}, u), {}, { angle: u?.angle ?? A.angle ?? 0 })), j);
		return /*#__PURE__*/ S.createElement(ae, uN({
			className: "recharts-cartesian-axis-tick-label",
			key: `tick-label-${n.value}-${n.coordinate}-${n.tickCoord}`
		}, On(w, n, t)), i && /*#__PURE__*/ S.createElement(xN, {
			option: i,
			tickProps: a,
			value: `${typeof s == "function" ? s(n.value, t) : n.value}${c || ""}`
		}));
	});
	return /*#__PURE__*/ S.createElement("g", { className: `recharts-cartesian-axis-ticks recharts-${T}-ticks` }, /*#__PURE__*/ S.createElement(SN, {
		ticks: k,
		axisId: O,
		axisType: T
	}), ie.length > 0 && /*#__PURE__*/ S.createElement(GT, { zIndex: Pm.label }, /*#__PURE__*/ S.createElement("g", {
		className: `recharts-cartesian-axis-tick-labels recharts-${T}-tick-labels`,
		ref: t
	}, ie)), re.length > 0 && /*#__PURE__*/ S.createElement("g", { className: `recharts-cartesian-axis-tick-lines recharts-${T}-tick-lines` }, re));
}), wN = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.axisLine, r = e.width, i = e.height, a = e.className, o = e.hide, s = e.ticks, c = e.axisType, l = e.axisId, u = cN(e, tN), d = nN((0, S.useState)(""), 2), f = d[0], p = d[1], m = nN((0, S.useState)(""), 2), h = m[0], g = m[1], _ = (0, S.useRef)(null);
	(0, S.useImperativeHandle)(t, () => ({
		getCalculatedWidth: () => JM({
			ticks: _.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		}),
		getCalculatedHeight: () => YM({
			ticks: _.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		})
	}));
	var v = (0, S.useCallback)((e) => {
		if (e) {
			var t = e.getElementsByClassName("recharts-cartesian-axis-tick-value");
			_.current = t;
			var n = t[0];
			if (n) {
				var r = window.getComputedStyle(n), i = r.fontSize, a = r.letterSpacing;
				(i !== f || a !== h) && (p(i), g(a));
			}
		}
	}, [f, h]);
	return o || r != null && r <= 0 || i != null && i <= 0 ? null : /*#__PURE__*/ S.createElement(GT, { zIndex: e.zIndex }, /*#__PURE__*/ S.createElement(ae, { className: y("recharts-cartesian-axis", a) }, /*#__PURE__*/ S.createElement(_N, {
		x: e.x,
		y: e.y,
		width: r,
		height: i,
		orientation: e.orientation,
		mirror: e.mirror,
		axisLine: n,
		otherSvgProps: E(e)
	}), /*#__PURE__*/ S.createElement(CN, {
		ref: v,
		axisType: c,
		events: u,
		fontSize: f,
		getTicksConfig: e,
		height: e.height,
		letterSpacing: h,
		mirror: e.mirror,
		orientation: e.orientation,
		padding: e.padding,
		stroke: e.stroke,
		tick: e.tick,
		tickFormatter: e.tickFormatter,
		tickLine: e.tickLine,
		tickMargin: e.tickMargin,
		tickSize: e.tickSize,
		tickTextProps: e.tickTextProps,
		ticks: s,
		unit: e.unit,
		width: e.width,
		x: e.x,
		y: e.y,
		axisId: l
	}), /*#__PURE__*/ S.createElement(_O, {
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height,
		lowerWidth: e.width,
		upperWidth: e.width
	}, /*#__PURE__*/ S.createElement(jO, {
		label: e.label,
		labelRef: e.labelRef
	}), e.children)));
}), TN = /*#__PURE__*/ S.forwardRef((e, t) => {
	var n = Pn(e, gN);
	return /*#__PURE__*/ S.createElement(wN, uN({}, n, { ref: t }));
});
TN.displayName = "CartesianAxis";
//#endregion
//#region node_modules/recharts/es6/theme/RechartsThemeContext.js
var EN = /*#__PURE__*/ (0, S.createContext)({ grid: {
	stroke: "#ccc",
	fill: "none"
} });
EN.Provider;
var DN = () => (0, S.useContext)(EN), ON = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], kN = ["offset"], AN = ["xAxisId", "yAxisId"], jN = ["xAxisId", "yAxisId"];
function MN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function NN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? MN(Object(n), !0).forEach(function(t) {
			PN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : MN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function PN(e, t, n) {
	return (t = FN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function FN(e) {
	var t = IN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function IN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function LN() {
	return LN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, LN.apply(null, arguments);
}
function RN(e, t) {
	if (e == null) return {};
	var n, r, i = zN(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function zN(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var BN = (e) => {
	var t = e.fill;
	if (!t || t === "none") return null;
	var n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.ry;
	return /*#__PURE__*/ S.createElement("rect", {
		x: r,
		y: i,
		ry: s,
		width: a,
		height: o,
		stroke: "none",
		fill: t,
		fillOpacity: n,
		className: "recharts-cartesian-grid-bg"
	});
};
function VN(e) {
	var t = e.option, n = e.lineItemProps, r;
	if (/*#__PURE__*/ S.isValidElement(t)) r = /*#__PURE__*/ S.cloneElement(t, n);
	else if (typeof t == "function") r = t(n);
	else {
		var i = n.x1, a = n.y1, o = n.x2, s = n.y2, c = n.key, l = E(RN(n, ON)) ?? {};
		l.offset;
		var u = RN(l, kN), d = Array.isArray(u.strokeDasharray) ? u.strokeDasharray.join(",") : u.strokeDasharray;
		r = /*#__PURE__*/ S.createElement("line", LN({}, u, {
			strokeDasharray: d,
			x1: i,
			y1: a,
			x2: o,
			y2: s,
			fill: "none",
			key: c
		}));
	}
	return r;
}
function HN(e) {
	var t = e.x, n = e.width, r = e.horizontal, i = r === void 0 || r, a = e.horizontalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = RN(e, AN), s = a.map((e, r) => {
		var a = NN(NN({}, o), {}, {
			x1: t,
			y1: e,
			x2: t + n,
			y2: e,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ S.createElement(VN, {
			key: `line-${r}`,
			option: i,
			lineItemProps: a
		});
	});
	return /*#__PURE__*/ S.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, s);
}
function UN(e) {
	var t = e.y, n = e.height, r = e.vertical, i = r === void 0 || r, a = e.verticalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = RN(e, jN), s = a.map((e, r) => {
		var a = NN(NN({}, o), {}, {
			x1: e,
			y1: t,
			x2: e,
			y2: t + n,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ S.createElement(VN, {
			option: i,
			lineItemProps: a,
			key: `line-${r}`
		});
	});
	return /*#__PURE__*/ S.createElement("g", { className: "recharts-cartesian-grid-vertical" }, s);
}
function WN(e) {
	var t = e.horizontalFill, n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.horizontalPoints, c = e.horizontal;
	if (!(c === void 0 || c) || !t || !t.length || s == null) return null;
	var l = s.map((e) => Math.round(e + i - i)).sort((e, t) => e - t);
	i !== l[0] && l.unshift(0);
	var u = l.map((e, s) => {
		var c = l[s + 1], u = c == null ? i + o - e : c - e;
		if (u <= 0) return null;
		var d = s % t.length;
		return /*#__PURE__*/ S.createElement("rect", {
			key: `react-${s}`,
			y: e,
			x: r,
			height: u,
			width: a,
			stroke: "none",
			fill: t[d],
			fillOpacity: n,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ S.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, u);
}
function GN(e) {
	var t = e.vertical, n = t === void 0 || t, r = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, s = e.width, c = e.height, l = e.verticalPoints;
	if (!n || !r || !r.length) return null;
	var u = l.map((e) => Math.round(e + a - a)).sort((e, t) => e - t);
	a !== u[0] && u.unshift(0);
	var d = u.map((e, t) => {
		var n = u[t + 1], l = n == null ? a + s - e : n - e;
		if (l <= 0) return null;
		var d = t % r.length;
		return /*#__PURE__*/ S.createElement("rect", {
			key: `react-${t}`,
			x: e,
			y: o,
			width: l,
			height: c,
			stroke: "none",
			fill: r[d],
			fillOpacity: i,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ S.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, d);
}
var KN = (e, t) => {
	var n = e.xAxis, r = e.width, i = e.height, a = e.offset;
	return ic(qM(NN(NN(NN({}, gN), n), {}, {
		ticks: ac(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.left, a.left + a.width, t);
}, qN = (e, t) => {
	var n = e.yAxis, r = e.width, i = e.height, a = e.offset;
	return ic(qM(NN(NN(NN({}, gN), n), {}, {
		ticks: ac(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.top, a.top + a.height, t);
}, JN = {
	horizontal: !0,
	vertical: !0,
	horizontalPoints: [],
	verticalPoints: [],
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: !1,
	zIndex: Pm.grid
};
function YN(e) {
	var t = Al(), n = jl(), r = kl(), i = NN(NN({}, Pn(e, JN)), {}, {
		x: I(e.x) ? e.x : r.left,
		y: I(e.y) ? e.y : r.top,
		width: I(e.width) ? e.width : r.width,
		height: I(e.height) ? e.height : r.height
	}), a = i.xAxisId, o = i.yAxisId, s = i.x, c = i.y, l = i.width, u = i.height, d = i.syncWithTicks, f = i.horizontalValues, p = i.verticalValues, m = Wc(), h = z((e) => hC(e, "xAxis", a, m)), g = z((e) => hC(e, "yAxis", o, m)), _ = DN(), v = {
		stroke: i.stroke ?? _.grid.stroke,
		strokeWidth: i.strokeWidth ?? _.grid.strokeWidth,
		strokeOpacity: i.strokeOpacity ?? _.grid.strokeOpacity,
		strokeDasharray: i.strokeDasharray ?? _.grid.strokeDasharray
	};
	if (!Ys(l) || !Ys(u) || !I(s) || !I(c)) return null;
	var y = i.verticalCoordinatesGenerator || KN, b = i.horizontalCoordinatesGenerator || qN, x = i.horizontalPoints, C = i.verticalPoints;
	if ((!x || !x.length) && typeof b == "function") {
		var w = f && f.length, T = b({
			yAxis: g ? NN(NN({}, g), {}, { ticks: w ? f : g.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, w ? !0 : d);
		Zc(Array.isArray(T), `horizontalCoordinatesGenerator should return Array but instead it returned [${typeof T}]`), Array.isArray(T) && (x = T);
	}
	if ((!C || !C.length) && typeof y == "function") {
		var E = p && p.length, D = y({
			xAxis: h ? NN(NN({}, h), {}, { ticks: E ? p : h.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, E ? !0 : d);
		Zc(Array.isArray(D), `verticalCoordinatesGenerator should return Array but instead it returned [${typeof D}]`), Array.isArray(D) && (C = D);
	}
	return /*#__PURE__*/ S.createElement(GT, { zIndex: i.zIndex }, /*#__PURE__*/ S.createElement("g", { className: "recharts-cartesian-grid" }, /*#__PURE__*/ S.createElement(BN, {
		fill: i.fill ?? _.grid.fill,
		fillOpacity: i.fillOpacity ?? _.grid.fillOpacity,
		x: i.x,
		y: i.y,
		width: i.width,
		height: i.height,
		ry: i.ry
	}), /*#__PURE__*/ S.createElement(WN, LN({}, i, { horizontalPoints: x })), /*#__PURE__*/ S.createElement(GN, LN({}, i, { verticalPoints: C })), /*#__PURE__*/ S.createElement(HN, LN({}, i, v, {
		offset: r,
		horizontalPoints: x,
		xAxis: h,
		yAxis: g
	})), /*#__PURE__*/ S.createElement(UN, LN({}, i, v, {
		offset: r,
		verticalPoints: C,
		xAxis: h,
		yAxis: g
	}))));
}
YN.displayName = "CartesianGrid";
//#endregion
//#region node_modules/recharts/es6/cartesian/LineDrawShape.js
var XN = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function ZN() {
	return ZN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ZN.apply(null, arguments);
}
function QN(e, t) {
	if (e == null) return {};
	var n, r, i = $N(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function $N(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function eP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function tP(e, t) {
	return `${t}px ${e}px`;
}
function nP(e) {
	return e.length % 2 == 0 ? e : [...e, ...e];
}
function rP(e, t) {
	for (var n = [], r = 0; r < t; ++r) n.push(...e);
	return n;
}
function iP(e, t, n) {
	var r = nP(n), i = r.reduce((e, t) => e + t, 0);
	if (!i) return tP(t, e);
	for (var a = Math.floor(e / i), o = e % i, s = [], c = 0, l = 0; c < r.length; l += (u = r[c]) ?? 0, ++c) {
		var u, d = r[c];
		if (d != null && l + d > o) {
			s = [...r.slice(0, c), o - l];
			break;
		}
	}
	var f = s.length % 2 == 0 ? [0, t] : [t];
	return [
		...rP(r, a),
		...s,
		...f
	].map((e) => `${e}px`).join(", ");
}
function aP(e, t, n) {
	return e ? iP(n, t, `${e}`.split(/[,\s]+/gim).map((e) => parseFloat(e))) : tP(t, n);
}
function oP(e) {
	e.animationElapsedTime, e.isAnimating, e.isEntrance;
	var t = e.visibleLength, n = e.strokeDasharray, r = e.connectNulls, i = QN(e, XN), a = r ?? !1, o;
	if (t != null) {
		var s = i.pathRef;
		o = aP(n, eP(s?.current ?? null), t);
	} else n != null && (o = String(n));
	return /*#__PURE__*/ S.createElement(Hd, ZN({}, i, {
		connectNulls: a,
		strokeDasharray: o
	}));
}
//#endregion
//#region node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
function sP(e) {
	var t = (0, S.useRef)(0), n = (0, S.useRef)(0), r = (0, S.useRef)(!1), i = (0, S.useRef)(e);
	return i.current !== e && (t.current = n.current, i.current = e), (0, S.useCallback)((e, i) => {
		if (r.current) return null;
		var a = Math.min(P(t.current + e * i), i);
		return e > 0 && i > 0 && (n.current = Math.max(n.current, a), a >= i) ? (r.current = !0, null) : a;
	}, []);
}
//#endregion
//#region node_modules/recharts/es6/state/errorBarSlice.js
var cP = $o({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] || (e[r] = []), e[r].push(i);
		},
		replaceErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.prev, a = n.next;
			e[r] && (e[r] = e[r].map((e) => e.dataKey === i.dataKey && e.direction === i.direction ? a : e));
		},
		removeErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] && (e[r] = e[r].filter((e) => e.dataKey !== i.dataKey || e.direction !== i.direction));
		}
	}
}), lP = cP.actions;
lP.addErrorBar, lP.replaceErrorBar, lP.removeErrorBar;
var uP = cP.reducer, dP = ["children"];
function fP(e, t) {
	if (e == null) return {};
	var n, r, i = pP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function pP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var mP = /*#__PURE__*/ (0, S.createContext)({
	data: [],
	xAxisId: "xAxis-0",
	yAxisId: "yAxis-0",
	dataPointFormatter: () => ({
		x: 0,
		y: 0,
		value: 0
	}),
	errorBarOffset: 0
});
function hP(e) {
	var t = e.children, n = fP(e, dP);
	return /*#__PURE__*/ S.createElement(mP.Provider, { value: n }, t);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/GraphicalItemClipPath.js
function gP(e, t) {
	var n = z((t) => gx(t, e)), r = z((e) => yx(e, t)), i = n?.allowDataOverflow ?? mx.allowDataOverflow, a = r?.allowDataOverflow ?? _x.allowDataOverflow;
	return {
		needClip: i || a,
		needClipX: i,
		needClipY: a
	};
}
function _P(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.clipPathId, i = IA(), a = gP(t, n), o = a.needClipX, s = a.needClipY, c = a.needClip, l = z((e) => US(e, t, !1)), u = z((e) => WS(e, n, !1));
	if (!c || !i) return null;
	var d = i.x, f = i.y, p = i.width, m = i.height, h = o && l ? Math.min(l[0], l[1]) : d - p / 2, g = s && u ? Math.min(u[0], u[1]) : f - m / 2, _ = o && l ? Math.abs(l[1] - l[0]) : p * 2, v = s && u ? Math.abs(u[1] - u[0]) : m * 2;
	return /*#__PURE__*/ S.createElement("clipPath", { id: `clipPath-${r}` }, /*#__PURE__*/ S.createElement("rect", {
		x: h,
		y: g,
		width: _,
		height: v
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/lineSelectors.js
var vP = (e, t, n, r) => vC(e, "xAxis", t, r), yP = (e, t, n, r) => _C(e, "xAxis", t, r), bP = (e, t, n, r) => vC(e, "yAxis", n, r), xP = (e, t, n, r) => _C(e, "yAxis", n, r), SP = B([
	Nl,
	vP,
	bP,
	yP,
	xP
], (e, t, n, r, i) => rc(e, "xAxis") ? vc(t, r, !1) : vc(n, i, !1)), CP = (e, t, n, r, i) => i;
function wP(e) {
	return e.type === "line";
}
var TP = B([
	Nl,
	vP,
	bP,
	yP,
	xP,
	B([Dx, CP], (e, t) => e.filter(wP).find((e) => e.id === t)),
	SP,
	Yp
], (e, t, n, r, i, a, o, s) => {
	var c = s.chartData, l = s.dataStartIndex, u = s.dataEndIndex;
	if (!(a == null || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || o == null || e !== "horizontal" && e !== "vertical")) {
		var d = a.dataKey, f = a.data, p = f != null && f.length > 0 ? f : c?.slice(l, u + 1);
		if (p != null) return ZP({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataKey: d,
			bandSize: o,
			displayedData: p
		});
	}
});
//#endregion
//#region node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function EP(e) {
	var t = D(e), n = 3, r = 2;
	if (t != null) {
		var i = t.r, a = t.strokeWidth, o = Number(i), s = Number(a);
		return (Number.isNaN(o) || o < 0) && (o = n), (Number.isNaN(s) || s < 0) && (s = r), {
			r: o,
			strokeWidth: s
		};
	}
	return {
		r: n,
		strokeWidth: r
	};
}
//#endregion
//#region node_modules/recharts/es6/cartesian/Line.js
var DP = ["id"], OP = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
], kP = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
function AP() {
	return AP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, AP.apply(null, arguments);
}
function jP(e, t) {
	if (e == null) return {};
	var n, r, i = MP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function MP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function NP(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function PP(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? NP(Object(n), !0).forEach(function(t) {
			FP(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : NP(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function FP(e, t, n) {
	return (t = IP(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function IP(e) {
	var t = LP(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function LP(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function RP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function zP(e) {
	var t = 0, n = 0;
	for (var r of e) r.status === "matched" && r.prev.x != null && r.next.x != null && (t += r.next.x - r.prev.x, n++);
	return n > 0 ? t / n : 0;
}
var BP = {
	activeDot: !0,
	animateNewValues: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: (e, t) => {
		if (e == null) return [];
		if (t === 1) return e.flatMap((e) => e.status === "removed" ? [] : [e.next]);
		var n = zP(e), r = [];
		for (var i of e) if (i.status === "matched") r.push(PP(PP({}, i.next), {}, {
			x: Te(i.prev.x, i.next.x, t),
			y: Te(i.prev.y, i.next.y, t)
		}));
		else if (i.status === "added") {
			if (i.next.x != null) {
				var a = i.next.x - n;
				r.push(PP(PP({}, i.next), {}, {
					x: Te(a, i.next.x, t),
					y: i.next.y
				}));
			} else r.push(i.next);
		} else if (i.status === "removed" && i.prev.x != null) {
			var o = i.prev.x + n;
			r.push(PP(PP({}, i.prev), {}, {
				x: Te(i.prev.x, o, t),
				y: i.prev.y
			}));
		}
		return r;
	},
	animationMatchBy: Dk,
	connectNulls: !1,
	dot: !0,
	fill: "#fff",
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "line",
	shape: oP,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: Pm.line,
	type: "linear"
}, VP = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: bc(n, t),
		payload: e
	}];
}, HP = /*#__PURE__*/ S.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: Ae,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: bc(o, t),
			hide: s,
			type: u,
			color: r,
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ S.createElement(yk, { tooltipEntrySettings: f });
});
function UP(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.dot, a = r.dataKey, o = r.needClip;
	r.id;
	var s = E(jP(r, DP));
	return /*#__PURE__*/ S.createElement(vA, {
		points: n,
		dot: i,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey: a,
		baseProps: s,
		needClip: o,
		clipPathId: t
	});
}
function WP(e) {
	var t = e.showLabels, n = e.children, r = e.points, i = (0, S.useMemo)(() => r?.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return PP(PP({}, t), {}, {
			value: e.value,
			payload: e.payload,
			viewBox: t,
			parentViewBox: void 0,
			fill: void 0
		});
	}), [r]);
	return /*#__PURE__*/ S.createElement(zO, { value: t ? i : void 0 }, n);
}
function GP(e) {
	var t = e.clipPathId, n = e.pathRef, r = e.points, i = e.props, a = e.animationElapsedTime, o = e.isAnimating, s = e.isEntrance, c = e.visibleLength, l = i.type, u = i.layout, d = i.connectNulls, f = i.needClip, p = i.shape, m = i.strokeDasharray, h = PP(PP({}, O(jP(i, OP))), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: f ? `url(#clipPath-${t})` : void 0,
		points: r,
		type: l,
		layout: u,
		connectNulls: d,
		strokeDasharray: m ?? i.strokeDasharray,
		pathRef: n,
		animationElapsedTime: a,
		isAnimating: o,
		isEntrance: i.animateNewValues ? s : !1,
		visibleLength: c
	});
	return /*#__PURE__*/ S.createElement(S.Fragment, null, r?.length > 1 && /*#__PURE__*/ S.createElement(hk, {
		option: p,
		DefaultShape: BP.shape,
		shapeProps: h
	}), /*#__PURE__*/ S.createElement(UP, {
		points: r,
		clipPathId: t,
		props: i
	}));
}
function KP(e) {
	var t = e.clipPathId, n = e.props, r = e.pathRef, i = e.previousPointsRef, a = n.points, o = n.isAnimationActive, s = n.animationBegin, c = n.animationDuration, l = n.animationEasing, u = n.animationMatchBy, d = n.animationInterpolateFn, f = n.layout, p = RP(r.current), m = Hk(n.onAnimationStart, n.onAnimationEnd), h = m.isAnimating, g = m.handleAnimationStart, _ = m.handleAnimationEnd, v = !h, y = sP(a), b = (0, S.useCallback)((e) => e > 0 && p > 0, [p]);
	return /*#__PURE__*/ S.createElement(WP, {
		points: a,
		showLabels: v
	}, n.children, /*#__PURE__*/ S.createElement(Uk, {
		animationInput: a,
		animationIdPrefix: "recharts-line-",
		items: a,
		previousItemsRef: i,
		isAnimationActive: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		onAnimationStart: g,
		onAnimationEnd: _,
		animationInterpolateFn: d,
		animationMatchBy: u,
		shouldUpdatePreviousRef: b,
		layout: f
	}, (e, i, a) => {
		var o = h || i < 1, s = o ? y(i, p) : null;
		return /*#__PURE__*/ S.createElement(GP, {
			props: n,
			points: e,
			clipPathId: t,
			pathRef: r,
			animationElapsedTime: i,
			isAnimating: o,
			isEntrance: a,
			visibleLength: s
		});
	}), /*#__PURE__*/ S.createElement(WO, { label: n.label }));
}
function qP(e) {
	var t = e.clipPathId, n = e.props, r = (0, S.useRef)(null), i = (0, S.useRef)(null);
	return /*#__PURE__*/ S.createElement(KP, {
		props: n,
		clipPathId: t,
		previousPointsRef: r,
		pathRef: i
	});
}
var JP = (e, t) => ({
	x: e.x ?? void 0,
	y: e.y ?? void 0,
	value: e.value,
	errorVal: tc(e.payload, t)
}), YP = class extends S.Component {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.top, c = e.left, l = e.width, u = e.height, d = e.id, f = e.needClip, p = e.zIndex;
		if (t) return null;
		var m = y("recharts-line", i), h = d, g = EP(n), _ = g.r, v = g.strokeWidth, b = ik(n), x = _ * 2 + v, C = f ? `url(#clipPath-${b ? "" : "dots-"}${h})` : void 0;
		return /*#__PURE__*/ S.createElement(GT, { zIndex: p }, /*#__PURE__*/ S.createElement(ae, { className: m }, f && /*#__PURE__*/ S.createElement("defs", null, /*#__PURE__*/ S.createElement(_P, {
			clipPathId: h,
			xAxisId: a,
			yAxisId: o
		}), !b && /*#__PURE__*/ S.createElement("clipPath", { id: `clipPath-dots-${h}` }, /*#__PURE__*/ S.createElement("rect", {
			x: c - x / 2,
			y: s - x / 2,
			width: l + x,
			height: u + x
		}))), /*#__PURE__*/ S.createElement(hP, {
			xAxisId: a,
			yAxisId: o,
			data: r,
			dataPointFormatter: JP,
			errorBarOffset: 0
		}, /*#__PURE__*/ S.createElement(qP, {
			props: this.props,
			clipPathId: h
		}))), /*#__PURE__*/ S.createElement(WA, {
			activeDot: this.props.activeDot,
			points: r,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: C
		}));
	}
};
function XP(e) {
	var t = Pn(e, BP), n = t.activeDot, r = t.animateNewValues, i = t.animationBegin, a = t.animationDuration, o = t.animationEasing, s = t.connectNulls, c = t.dot, l = t.hide, u = t.isAnimationActive, d = t.label, f = t.legendType, p = t.xAxisId, m = t.yAxisId, h = t.id, g = jP(t, kP), _ = gP(p, m).needClip, v = IA(), y = Pl(), b = Wc(), x = z((e) => TP(e, p, m, b, h));
	if (y !== "horizontal" && y !== "vertical" || x == null || v == null) return null;
	var C = v.height, w = v.width, T = v.x, E = v.y;
	return /*#__PURE__*/ S.createElement(YP, AP({}, g, {
		id: h,
		connectNulls: s,
		dot: c,
		activeDot: n,
		animateNewValues: r,
		animationBegin: i,
		animationDuration: a,
		animationEasing: o,
		isAnimationActive: u,
		hide: l,
		label: d,
		legendType: f,
		xAxisId: p,
		yAxisId: m,
		points: x,
		layout: y,
		height: C,
		width: w,
		left: T,
		top: E,
		needClip: _
	}));
}
function ZP(e) {
	var t = e.layout, n = e.xAxis, r = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, s = e.bandSize;
	return e.displayedData.map((e, c) => {
		var l = tc(e, o);
		if (t === "horizontal") return {
			x: uc({
				axis: n,
				ticks: i,
				bandSize: s,
				entry: e,
				index: c
			}),
			y: (De(l) ? null : r.scale.map(l)) ?? null,
			value: l,
			payload: e
		};
		var u = De(l) ? null : n.scale.map(l), d = uc({
			axis: r,
			ticks: a,
			bandSize: s,
			entry: e,
			index: c
		});
		return u == null || d == null ? null : {
			x: u,
			y: d,
			value: l,
			payload: e
		};
	}).filter(Boolean);
}
function QP(e) {
	var t = Pn(e, BP), n = Wc();
	return /*#__PURE__*/ S.createElement($k, {
		id: t.id,
		type: "line"
	}, (e) => /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(bk, { legendPayload: VP(t) }), /*#__PURE__*/ S.createElement(HP, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ S.createElement(oA, {
		type: "line",
		id: e,
		data: t.data,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		hide: t.hide,
		isPanorama: n
	}), /*#__PURE__*/ S.createElement(XP, AP({}, t, { id: e }))));
}
var $P = /*#__PURE__*/ S.memo(QP, du);
$P.displayName = "Line";
//#endregion
//#region node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function eF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.xAxisId ?? 0;
}
function tF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.yAxisId ?? 0;
}
//#endregion
//#region node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var nF = "Invariant failed";
function rF(e, t) {
	if (!e) throw Error(nF);
}
//#endregion
//#region node_modules/recharts/es6/util/BarUtils.js
var iF = ["option"];
function aF(e, t) {
	if (e == null) return {};
	var n, r, i = oF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function oF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var sF = fp;
function cF(e) {
	var t = e.option, n = aF(e, iF);
	return /*#__PURE__*/ S.createElement(hk, {
		option: t,
		DefaultShape: sF,
		shapeProps: n,
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	});
}
var lF = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (n, r) => {
		if (I(e)) return e;
		var i = I(n) || De(n);
		return i ? e(n, r) : (!i && rF(!1, `minPointSize callback function received a value with type of ${typeof n}. Currently only numbers or null/undefined are supported.`), t);
	};
}, uF = (e, t, n) => n, dF = B([Dx, (e, t) => t], (e, t) => e.filter((e) => e.type === "bar").find((e) => e.id === t)), fF = B([dF], (e) => e?.maxBarSize), pF = (e, t, n, r) => r, mF = B([
	Nl,
	Dx,
	eF,
	tF,
	uF
], (e, t, n, r, i) => t.filter((t) => e === "horizontal" ? t.xAxisId === n : t.yAxisId === r).filter((e) => e.isPanorama === i).filter((e) => e.hide === !1).filter((e) => e.type === "bar")), hF = (e, t, n) => {
	var r = Nl(e), i = eF(e, t), a = tF(e, t);
	if (i != null && a != null) return r === "horizontal" ? $x(e, "yAxis", a, n) : $x(e, "xAxis", i, n);
}, gF = B([
	mF,
	Dm,
	(e, t) => {
		var n = Nl(e), r = eF(e, t), i = tF(e, t);
		if (r != null && i != null) return n === "horizontal" ? fC(e, "xAxis", r) : fC(e, "yAxis", i);
	}
], QA), _F = (e, t, n) => {
	var r = dF(e, t);
	if (r == null) return 0;
	var i = eF(e, t), a = tF(e, t);
	if (i == null || a == null) return 0;
	var o = Nl(e), s = wm(e), c = r.maxBarSize, l = De(c) ? s : c, u, d;
	return o === "horizontal" ? (u = vC(e, "xAxis", i, n), d = _C(e, "xAxis", i, n)) : (u = vC(e, "yAxis", a, n), d = _C(e, "yAxis", a, n)), vc(u, d, !0) ?? l ?? 0;
}, vF = (e, t, n) => {
	var r = Nl(e), i = eF(e, t), a = tF(e, t);
	if (i != null && a != null) {
		var o, s;
		return r === "horizontal" ? (o = vC(e, "xAxis", i, n), s = _C(e, "xAxis", i, n)) : (o = vC(e, "yAxis", a, n), s = _C(e, "yAxis", a, n)), vc(o, s);
	}
}, yF = B([
	Bc,
	Hc,
	(e, t, n) => {
		var r = eF(e, t);
		if (r != null) return vC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = tF(e, t);
		if (r != null) return vC(e, "yAxis", r, n);
	},
	(e, t, n) => {
		var r = eF(e, t);
		if (r != null) return _C(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = tF(e, t);
		if (r != null) return _C(e, "yAxis", r, n);
	},
	B([B([
		gF,
		wm,
		Tm,
		Em,
		_F,
		vF,
		fF
	], aj), dF], sj),
	Nl,
	Xp,
	vF,
	B([hF, dF], oj),
	dF,
	pF
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = c.chartData, m = c.dataStartIndex, h = c.dataEndIndex;
	if (!(d == null || o == null || t == null || s !== "horizontal" && s !== "vertical" || n == null || r == null || i == null || a == null || l == null)) {
		var g = d.data, _ = g != null && g.length > 0 ? g : p?.slice(m, h + 1);
		if (_ != null) return cI({
			layout: s,
			barSettings: d,
			pos: o,
			parentViewBox: t,
			bandSize: l,
			xAxis: n,
			yAxis: r,
			xAxisTicks: i,
			yAxisTicks: a,
			stackedData: u,
			displayedData: _,
			offset: e,
			cells: f,
			dataStartIndex: m
		});
	}
}), bF = ["index"];
function xF() {
	return xF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, xF.apply(null, arguments);
}
function SF(e, t) {
	if (e == null) return {};
	var n, r, i = CF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function CF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var wF = /*#__PURE__*/ (0, S.createContext)(void 0), TF = (e) => {
	var t = (0, S.useContext)(wF);
	if (t != null) return t.stackId;
	if (e != null) return lc(e);
}, EF = (e, t) => `recharts-bar-stack-clip-path-${e}-${t}`, DF = (e) => {
	var t = (0, S.useContext)(wF);
	if (t != null) {
		var n = t.stackId;
		return `url(#${EF(n, e)})`;
	}
}, OF = (e) => {
	var t = e.index, n = SF(e, bF), r = DF(t);
	return /*#__PURE__*/ S.createElement(ae, xF({
		className: "recharts-bar-stack-layer",
		clipPath: r
	}, n));
}, kF = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], AF = [
	"value",
	"background",
	"tooltipPosition"
], jF = ["id"], MF = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function NF(e, t) {
	return RF(e) || LF(e, t) || FF(e, t) || PF();
}
function PF() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function FF(e, t) {
	if (e) {
		if (typeof e == "string") return IF(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? IF(e, t) : void 0;
	}
}
function IF(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function LF(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function RF(e) {
	if (Array.isArray(e)) return e;
}
function zF() {
	return zF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, zF.apply(null, arguments);
}
function BF(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function VF(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? BF(Object(n), !0).forEach(function(t) {
			HF(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : BF(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function HF(e, t, n) {
	return (t = UF(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function UF(e) {
	var t = WF(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function WF(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function GF(e, t) {
	if (e == null) return {};
	var n, r, i = KF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function KF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var qF = (e) => {
	var t = e.dataKey, n = e.name, r = e.fill, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: bc(n, t),
		payload: e
	}];
}, JF = /*#__PURE__*/ S.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.unit, c = e.formatter, l = e.tooltipType, u = e.id, d = {
		dataDefinedOnItem: void 0,
		getPosition: Ae,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			dataKey: t,
			nameKey: void 0,
			name: bc(a, t),
			hide: o,
			type: l,
			color: i,
			unit: s,
			formatter: c,
			graphicalItemId: u
		}
	};
	return /*#__PURE__*/ S.createElement(yk, { tooltipEntrySettings: d });
});
function YF(e) {
	var t = z(Vw), n = e.data, r = e.dataKey, i = e.background, a = e.allOtherBarProps, o = a.onMouseEnter, s = a.onMouseLeave, c = a.onClick, l = GF(a, kF), u = gk(o, r, a.id), d = _k(s), f = vk(c, r, a.id);
	if (!i || n == null) return null;
	var p = D(i);
	return /*#__PURE__*/ S.createElement(GT, { zIndex: cj(i, Pm.barBackground) }, n.map((e, n) => {
		e.value;
		var a = e.background;
		e.tooltipPosition;
		var o = GF(e, AF);
		if (!a) return null;
		var s = u(e, e.originalDataIndex), c = d(e, e.originalDataIndex), m = f(e, e.originalDataIndex), h = VF(VF(VF(VF(VF({
			option: i,
			isActive: String(e.originalDataIndex) === t
		}, o), {}, { fill: "#eee" }, a), p), On(l, e, n)), {}, {
			onMouseEnter: s,
			onMouseLeave: c,
			onClick: m,
			dataKey: r,
			index: n,
			className: "recharts-bar-background-rectangle"
		});
		return /*#__PURE__*/ S.createElement(cF, zF({ key: `background-bar-${n}` }, h));
	}));
}
function XF(e) {
	var t = e.showLabels, n = e.children, r = e.rects?.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: e.width,
			lowerWidth: e.width,
			upperWidth: e.width,
			height: e.height
		};
		return VF(VF({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: e.parentViewBox,
			viewBox: t,
			fill: e.fill
		});
	});
	return /*#__PURE__*/ S.createElement(zO, { value: t ? r : void 0 }, n);
}
function ZF(e) {
	var t = e.shape, n = e.activeBar, r = e.baseProps, i = e.entry, a = e.index, o = e.dataKey, s = z(Vw), c = z(Uw), l = n && String(i.originalDataIndex) === s && (c == null || o === c), u = s != null && (String(i.originalDataIndex) !== s || c != null && o !== c), d = NF((0, S.useState)(!1), 2), f = d[0], p = d[1], m = NF((0, S.useState)(!1), 2), h = m[0], g = m[1];
	(0, S.useEffect)(() => {
		var e;
		return l ? (p(!0), e = requestAnimationFrame(() => {
			g(!0);
		})) : (g(!1), u && p(!1)), () => {
			cancelAnimationFrame(e);
		};
	}, [l, u]);
	var _ = (0, S.useCallback)(() => {
		l || p(!1);
	}, [l]), v = l && h, y = l || f, b = l ? n === !0 ? t : n : t, x = /*#__PURE__*/ S.createElement(cF, zF({}, r, { name: String(r.name) }, i, {
		isActive: v,
		option: b,
		index: a,
		dataKey: o,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance,
		onTransitionEnd: _
	}));
	return y ? /*#__PURE__*/ S.createElement(GT, { zIndex: Pm.activeBar }, /*#__PURE__*/ S.createElement(OF, { index: i.originalDataIndex }, x)) : x;
}
function QF(e) {
	var t = e.shape, n = e.baseProps, r = e.entry, i = e.index, a = e.dataKey;
	return /*#__PURE__*/ S.createElement(cF, zF({}, n, { name: String(n.name) }, r, {
		isActive: !1,
		option: t,
		index: i,
		dataKey: a,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance
	}));
}
function $F(e) {
	var t = e.data, n = e.props, r = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = E(n) ?? {}, s = o.id, c = GF(o, jF), l = n.shape, u = n.dataKey, d = n.activeBar, f = n.onMouseEnter, p = n.onClick, m = n.onMouseLeave, h = GF(n, MF), g = gk(f, u, s), _ = _k(m), v = vk(p, u, s);
	return t ? /*#__PURE__*/ S.createElement(S.Fragment, null, t.map((e, t) => /*#__PURE__*/ S.createElement(OF, zF({
		index: e.originalDataIndex,
		key: `rectangle-${e?.x}-${e?.y}-${e?.value}-${t}`,
		className: "recharts-bar-rectangle"
	}, On(h, e, t), {
		onMouseEnter: g(e, e.originalDataIndex),
		onMouseLeave: _(e, e.originalDataIndex),
		onClick: v(e, e.originalDataIndex)
	}), d ? /*#__PURE__*/ S.createElement(ZF, {
		shape: l,
		activeBar: d,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	}) : /*#__PURE__*/ S.createElement(QF, {
		shape: l,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	})))) : null;
}
var eI = (e, t, n) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => {
	if (e.status === "removed") return n === "horizontal" ? [VF(VF({}, e.prev), {}, {
		height: Te(e.prev.height, 0, t),
		y: Te(e.prev.y, e.prev.y + e.prev.height, t)
	})] : [VF(VF({}, e.prev), {}, { width: Te(e.prev.width, 0, t) })];
	if (e.status === "matched") return [VF(VF({}, e.next), {}, {
		x: Te(e.prev.x, e.next.x, t),
		y: Te(e.prev.y, e.next.y, t),
		width: Te(e.prev.width, e.next.width, t),
		height: Te(e.prev.height, e.next.height, t)
	})];
	var r = e.next;
	return n === "horizontal" ? [VF(VF({}, r), {}, {
		height: Te(0, r.height, t),
		y: Te(r.stackedBarStart, r.y, t)
	})] : [VF(VF({}, r), {}, {
		width: Te(0, r.width, t),
		x: Te(r.stackedBarStart, r.x, t)
	})];
});
function tI(e) {
	var t = e.props, n = e.previousRectanglesRef, r = t.data, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.animationInterpolateFn, l = t.layout, u = Hk(t.onAnimationStart, t.onAnimationEnd), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd;
	return /*#__PURE__*/ S.createElement(XF, {
		showLabels: !d,
		rects: r
	}, /*#__PURE__*/ S.createElement(Uk, {
		animationInput: r,
		animationIdPrefix: "recharts-bar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: c,
		animationMatchBy: t.animationMatchBy,
		layout: l
	}, (e, n, r) => /*#__PURE__*/ S.createElement(ae, null, /*#__PURE__*/ S.createElement($F, {
		props: t,
		data: e,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}))), /*#__PURE__*/ S.createElement(WO, { label: t.label }), t.children);
}
function nI(e) {
	var t = (0, S.useRef)(null);
	return /*#__PURE__*/ S.createElement(tI, {
		previousRectanglesRef: t,
		props: e
	});
}
var rI = 0, iI = (e, t) => {
	var n = Array.isArray(e.value) ? e.value[1] : e.value;
	return {
		x: e.x,
		y: e.y,
		value: n,
		errorVal: tc(e, t)
	};
}, aI = class extends S.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.data, r = e.dataKey, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.needClip, c = e.background, l = e.id;
		if (t || n == null) return null;
		var u = y("recharts-bar", i), d = l;
		return /*#__PURE__*/ S.createElement(ae, {
			className: u,
			id: l
		}, s && /*#__PURE__*/ S.createElement("defs", null, /*#__PURE__*/ S.createElement(_P, {
			clipPathId: d,
			xAxisId: a,
			yAxisId: o
		})), /*#__PURE__*/ S.createElement(ae, {
			className: "recharts-bar-rectangles",
			clipPath: s ? `url(#clipPath-${d})` : void 0
		}, /*#__PURE__*/ S.createElement(YF, {
			data: n,
			dataKey: r,
			background: c,
			allOtherBarProps: this.props
		}), /*#__PURE__*/ S.createElement(nI, this.props)));
	}
}, oI = {
	activeBar: !1,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	animationInterpolateFn: eI,
	animationMatchBy: Ok,
	background: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: rI,
	shape: sF,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: Pm.bar
};
function sI(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.hide, i = e.legendType, a = e.minPointSize, o = e.activeBar, s = e.animationBegin, c = e.animationDuration, l = e.animationEasing, u = e.isAnimationActive, d = gP(t, n).needClip, f = Pl(), p = Wc(), m = rk(e.children, KE), h = z((t) => yF(t, e.id, p, m));
	if (f !== "vertical" && f !== "horizontal") return null;
	var g, _ = h?.[0];
	return g = _ == null || _.height == null || _.width == null ? 0 : f === "vertical" ? _.height / 2 : _.width / 2, /*#__PURE__*/ S.createElement(hP, {
		xAxisId: t,
		yAxisId: n,
		data: h,
		dataPointFormatter: iI,
		errorBarOffset: g
	}, /*#__PURE__*/ S.createElement(aI, zF({}, e, {
		layout: f,
		needClip: d,
		data: h,
		xAxisId: t,
		yAxisId: n,
		hide: r,
		legendType: i,
		minPointSize: a,
		activeBar: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		isAnimationActive: u
	})));
}
function cI(e) {
	var t = e.layout, n = e.barSettings, r = n.dataKey, i = n.minPointSize, a = n.hasCustomShape, o = e.pos, s = e.bandSize, c = e.xAxis, l = e.yAxis, u = e.xAxisTicks, d = e.yAxisTicks, f = e.stackedData, p = e.displayedData, m = e.offset, h = e.cells, g = e.parentViewBox, _ = e.dataStartIndex, v = t === "horizontal" ? l : c, y = f ? v.scale.domain() : null, b = fc({ numericAxis: v }), x = v.scale.map(b);
	return p.map((e, n) => {
		var p, v, S, C, w, T;
		if (f) {
			var E = f[n + _];
			if (E == null) return null;
			p = oc(E, y);
		} else p = tc(e, r), Array.isArray(p) || (p = [b, p]);
		var D = lF(i, rI)(p[1], n);
		if (t === "horizontal") {
			var O = l.scale.map(p[0]), k = l.scale.map(p[1]);
			if (O == null || k == null) return null;
			v = dc({
				axis: c,
				ticks: u,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), S = k ?? O ?? void 0, C = o.size;
			var A = O - k;
			if (w = ve(A) ? 0 : A, T = {
				x: v,
				y: m.top,
				width: C,
				height: m.height
			}, Math.abs(D) > 0 && Math.abs(w) < Math.abs(D)) {
				var j = _e(w || D) * (Math.abs(D) - Math.abs(w));
				S -= j, w += j;
			}
		} else {
			var M = c.scale.map(p[0]), N = c.scale.map(p[1]);
			if (M == null || N == null) return null;
			if (v = M, S = dc({
				axis: l,
				ticks: d,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), C = N - M, w = o.size, T = {
				x: m.left,
				y: S,
				width: m.width,
				height: w
			}, Math.abs(D) > 0 && Math.abs(C) < Math.abs(D)) {
				var ee = _e(C || D) * (Math.abs(D) - Math.abs(C));
				C += ee;
			}
		}
		return v == null || S == null || C == null || w == null || !a && (C === 0 || w === 0) ? null : VF(VF({}, e), {}, {
			stackedBarStart: x,
			x: v,
			y: S,
			width: C,
			height: w,
			value: f ? p : p[1],
			payload: e,
			background: T,
			tooltipPosition: {
				x: v + C / 2,
				y: S + w / 2
			},
			parentViewBox: g,
			originalDataIndex: n
		}, h && h[n] && h[n].props);
	}).filter(Boolean);
}
function lI(e) {
	var t = Pn(e, oI), n = TF(t.stackId), r = Wc();
	return /*#__PURE__*/ S.createElement($k, {
		id: t.id,
		type: "bar"
	}, (e) => /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(bk, { legendPayload: qF(t) }), /*#__PURE__*/ S.createElement(JF, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ S.createElement(oA, {
		type: "bar",
		id: e,
		data: void 0,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		stackId: n,
		hide: t.hide,
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize,
		isPanorama: r,
		hasCustomShape: t.shape != null && t.shape !== sF
	}), /*#__PURE__*/ S.createElement(GT, { zIndex: t.zIndex }, /*#__PURE__*/ S.createElement(sI, zF({}, t, { id: e })))));
}
var uI = /*#__PURE__*/ S.memo(lI, du);
uI.displayName = "Bar";
//#endregion
//#region node_modules/recharts/es6/util/axisPropsAreEqual.js
var dI = ["domain", "range"], fI = ["domain", "range"];
function pI(e, t) {
	if (e == null) return {};
	var n, r, i = mI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function mI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function hI(e, t) {
	return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function gI(e, t) {
	if (e === t) return !0;
	var n = e.domain, r = e.range, i = pI(e, dI), a = t.domain, o = t.range, s = pI(t, fI);
	return !hI(n, a) || !hI(r, o) ? !1 : du(i, s);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/XAxis.js
var _I = ["type"], vI = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], yI = ["id", "scale"];
function bI() {
	return bI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, bI.apply(null, arguments);
}
function xI(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function SI(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? xI(Object(n), !0).forEach(function(t) {
			CI(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xI(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function CI(e, t, n) {
	return (t = wI(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wI(e) {
	var t = TI(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function TI(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function EI(e, t) {
	if (e == null) return {};
	var n, r, i = DI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function DI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function OI(e) {
	var t = ui(), n = (0, S.useRef)(null), r = Fl(), i = e.type, a = EI(e, _I), o = Rm(r, "xAxis", i), s = (0, S.useMemo)(() => {
		if (o != null) return SI(SI({}, a), {}, { type: o });
	}, [a, o]);
	return (0, S.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(EA(s)) : n.current !== s && t(DA({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, S.useLayoutEffect)(() => () => {
		n.current &&= (t(OA(n.current)), null);
	}, [t]), null;
}
var kI = (e) => {
	var t = e.xAxisId, n = e.className, r = e.height, i = e.label, a = (0, S.useRef)(null), o = (0, S.useRef)(null), s = z(Hc), c = Wc(), l = ui(), u = "xAxis", d = z((e) => gC(e, u, t, c)), f = z((e) => iC(e, t)), p = z((e) => lC(e, t)), m = z((e) => hx(e, t));
	if ((0, S.useLayoutEffect)(() => {
		if (!(r !== "auto" || !f || SO(i) || /*#__PURE__*/ (0, S.isValidElement)(i) || m == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedHeight();
				Math.round(f.height) !== Math.round(n) && l(NA({
					id: t,
					height: n
				}));
			}
		}
	}, [
		d,
		f,
		l,
		i,
		t,
		r,
		m
	]), f == null || p == null || m == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var h = EI(e, vI);
	m.id, m.scale;
	var g = EI(m, yI);
	return /*#__PURE__*/ S.createElement(TN, bI({}, h, g, {
		ref: a,
		labelRef: o,
		x: p.x,
		y: p.y,
		width: f.width,
		height: f.height,
		className: y(`recharts-${u} ${u}`, n),
		viewBox: s,
		ticks: d,
		axisType: u,
		axisId: t
	}));
}, AI = {
	allowDataOverflow: mx.allowDataOverflow,
	allowDecimals: mx.allowDecimals,
	allowDuplicatedCategory: mx.allowDuplicatedCategory,
	angle: mx.angle,
	axisLine: gN.axisLine,
	height: mx.height,
	hide: !1,
	includeHidden: mx.includeHidden,
	interval: mx.interval,
	label: !1,
	minTickGap: mx.minTickGap,
	mirror: mx.mirror,
	orientation: mx.orientation,
	padding: mx.padding,
	reversed: mx.reversed,
	scale: mx.scale,
	tick: mx.tick,
	tickCount: mx.tickCount,
	tickLine: gN.tickLine,
	tickSize: gN.tickSize,
	type: mx.type,
	niceTicks: mx.niceTicks,
	xAxisId: 0
}, jI = /*#__PURE__*/ S.memo((e) => {
	var t = Pn(e, AI);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(OI, {
		allowDataOverflow: t.allowDataOverflow,
		allowDecimals: t.allowDecimals,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		angle: t.angle,
		dataKey: t.dataKey,
		domain: t.domain,
		height: t.height,
		hide: t.hide,
		id: t.xAxisId,
		includeHidden: t.includeHidden,
		interval: t.interval,
		minTickGap: t.minTickGap,
		mirror: t.mirror,
		name: t.name,
		orientation: t.orientation,
		padding: t.padding,
		reversed: t.reversed,
		scale: t.scale,
		tick: t.tick,
		tickCount: t.tickCount,
		tickFormatter: t.tickFormatter,
		ticks: t.ticks,
		type: t.type,
		unit: t.unit,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ S.createElement(kI, t));
}, gI);
jI.displayName = "XAxis";
//#endregion
//#region node_modules/recharts/es6/cartesian/YAxis.js
var MI = ["type"], NI = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], PI = ["id", "scale"];
function FI() {
	return FI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, FI.apply(null, arguments);
}
function II(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function LI(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? II(Object(n), !0).forEach(function(t) {
			RI(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : II(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function RI(e, t, n) {
	return (t = zI(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zI(e) {
	var t = BI(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function BI(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function VI(e, t) {
	if (e == null) return {};
	var n, r, i = HI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function HI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function UI(e) {
	var t = ui(), n = (0, S.useRef)(null), r = Fl(), i = e.type, a = VI(e, MI), o = Rm(r, "yAxis", i), s = (0, S.useMemo)(() => {
		if (o != null) return LI(LI({}, a), {}, { type: o });
	}, [o, a]);
	return (0, S.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(kA(s)) : n.current !== s && t(AA({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, S.useLayoutEffect)(() => () => {
		n.current &&= (t(jA(n.current)), null);
	}, [t]), null;
}
function WI(e) {
	var t = e.yAxisId, n = e.className, r = e.width, i = e.label, a = (0, S.useRef)(null), o = (0, S.useRef)(null), s = z(Hc), c = Wc(), l = ui(), u = "yAxis", d = z((e) => dC(e, t)), f = z((e) => uC(e, t)), p = z((e) => gC(e, u, t, c)), m = z((e) => vx(e, t));
	if ((0, S.useLayoutEffect)(() => {
		if (!(r !== "auto" || !d || SO(i) || /*#__PURE__*/ (0, S.isValidElement)(i) || m == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedWidth();
				Math.round(d.width) !== Math.round(n) && l(MA({
					id: t,
					width: n
				}));
			}
		}
	}, [
		p,
		d,
		l,
		i,
		t,
		r,
		m
	]), d == null || f == null || m == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var h = VI(e, NI);
	m.id, m.scale;
	var g = VI(m, PI);
	return /*#__PURE__*/ S.createElement(TN, FI({}, h, g, {
		ref: a,
		labelRef: o,
		x: f.x,
		y: f.y,
		tickTextProps: r === "auto" ? { width: void 0 } : { width: r },
		width: d.width,
		height: d.height,
		className: y(`recharts-${u} ${u}`, n),
		viewBox: s,
		ticks: p,
		axisType: u,
		axisId: t
	}));
}
var GI = {
	allowDataOverflow: _x.allowDataOverflow,
	allowDecimals: _x.allowDecimals,
	allowDuplicatedCategory: _x.allowDuplicatedCategory,
	angle: _x.angle,
	axisLine: gN.axisLine,
	hide: !1,
	includeHidden: _x.includeHidden,
	interval: _x.interval,
	label: !1,
	minTickGap: _x.minTickGap,
	mirror: _x.mirror,
	orientation: _x.orientation,
	padding: _x.padding,
	reversed: _x.reversed,
	scale: _x.scale,
	tick: _x.tick,
	tickCount: _x.tickCount,
	tickLine: gN.tickLine,
	tickSize: gN.tickSize,
	type: _x.type,
	niceTicks: _x.niceTicks,
	width: _x.width,
	yAxisId: 0
}, KI = /*#__PURE__*/ S.memo((e) => {
	var t = Pn(e, GI);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(UI, {
		interval: t.interval,
		id: t.yAxisId,
		scale: t.scale,
		type: t.type,
		domain: t.domain,
		allowDataOverflow: t.allowDataOverflow,
		dataKey: t.dataKey,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		padding: t.padding,
		includeHidden: t.includeHidden,
		reversed: t.reversed,
		ticks: t.ticks,
		width: t.width,
		orientation: t.orientation,
		mirror: t.mirror,
		hide: t.hide,
		unit: t.unit,
		name: t.name,
		angle: t.angle,
		minTickGap: t.minTickGap,
		tick: t.tick,
		tickFormatter: t.tickFormatter,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ S.createElement(WI, t));
}, gI);
KI.displayName = "YAxis";
var qI = B([
	(e, t) => t,
	Nl,
	eh,
	lh,
	Pw,
	Iw,
	hT,
	Bc
], DT);
//#endregion
//#region node_modules/recharts/es6/util/getRelativeCoordinate.js
function JI(e) {
	return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function YI(e) {
	var t = e.currentTarget.getBoundingClientRect(), n, r;
	if (JI(e)) {
		var i = e.currentTarget.getBBox();
		n = i.width > 0 ? t.width / i.width : 1, r = i.height > 0 ? t.height / i.height : 1;
	} else {
		var a = e.currentTarget;
		n = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, r = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
	}
	var o = (e, i) => ({
		relativeX: Math.round((e - t.left) / n),
		relativeY: Math.round((i - t.top) / r)
	});
	return "touches" in e ? Array.from(e.touches).map((e) => o(e.clientX, e.clientY)) : o(e.clientX, e.clientY);
}
//#endregion
//#region node_modules/recharts/es6/state/mouseEventsMiddleware.js
var XI = No("mouseClick"), ZI = zs();
ZI.startListening({
	actionCreator: XI,
	effect: (e, t) => {
		var n = e.payload, r = qI(t.getState(), YI(n));
		r?.activeIndex != null && t.dispatch(zC({
			activeIndex: r.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: r.activeCoordinate
		}));
	}
});
var QI = No("mouseMove"), $I = zs(), eL = null, tL = null, nL = null;
$I.startListening({
	actionCreator: QI,
	effect: (e, t) => {
		var n = e.payload, r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a?.includes("mousemove");
		eL !== null && (cancelAnimationFrame(eL), eL = null), tL !== null && (typeof i != "number" || !o) && (clearTimeout(tL), tL = null), nL = YI(n);
		var s = () => {
			var e = t.getState(), n = CC(e, e.tooltip.settings.shared);
			if (!nL) {
				eL = null, tL = null;
				return;
			}
			if (n === "axis") {
				var r = qI(e, nL);
				r?.activeIndex == null ? t.dispatch(IC()) : t.dispatch(RC({
					activeIndex: r.activeIndex,
					activeDataKey: void 0,
					activeCoordinate: r.activeCoordinate
				}));
			}
			eL = null, tL = null;
		};
		if (!o) {
			s();
			return;
		}
		i === "raf" ? eL = requestAnimationFrame(s) : typeof i == "number" && tL === null && (tL = setTimeout(s, i));
	}
});
//#endregion
//#region node_modules/recharts/es6/state/reduxDevtoolsJsonStringifyReplacer.js
function rL(e, t) {
	return t instanceof HTMLElement ? `HTMLElement <${t.tagName} class="${t.className}">` : t === window ? "global.window" : e === "children" && typeof t == "object" && t ? "<<CHILDREN>>" : t;
}
//#endregion
//#region node_modules/recharts/es6/state/rootPropsSlice.js
var iL = {
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: !1
}, aL = $o({
	name: "rootProps",
	initialState: iL,
	reducers: { updateOptions: (e, t) => {
		e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = t.payload.barGap ?? iL.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
	} }
}), oL = aL.reducer, sL = aL.actions.updateOptions, cL = $o({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e) }
});
cL.actions.updatePolarOptions;
var lL = cL.reducer, uL = No("keyDown"), dL = No("focus"), fL = No("blur"), pL = zs(), mL = null, hL = null, gL = null;
pL.startListening({
	actionCreator: uL,
	effect: (e, t) => {
		gL = e.payload, mL !== null && (cancelAnimationFrame(mL), mL = null);
		var n = t.getState().eventSettings, r = n.throttleDelay, i = n.throttledEvents, a = i === "all" || i.includes("keydown");
		hL !== null && (typeof r != "number" || !a) && (clearTimeout(hL), hL = null);
		var o = () => {
			try {
				var e = t.getState();
				if (e.rootProps.accessibilityLayer === !1) return;
				var n = e.tooltip.keyboardInteraction, r = gL;
				if (r !== "ArrowRight" && r !== "ArrowLeft" && r !== "Enter") return;
				var i = ew(n, Sw(e), Xx(e), jw(e)), a = i == null ? -1 : Number(i), o = !Number.isFinite(a) || a < 0, s = Iw(e), c = Sw(e), l = CC(e, e.tooltip.settings.shared);
				if (r === "Enter") {
					if (o) return;
					var u = bT(e, l, "hover", String(n.index));
					t.dispatch(VC({
						active: !n.active,
						activeIndex: n.index,
						activeCoordinate: u
					}));
					return;
				}
				var d = yC(e) === "left-to-right" ? 1 : -1, f = r === "ArrowRight" ? 1 : -1, p;
				if (o) {
					var m = Xx(e), h = jw(e), g = f * d, _ = (e) => ({
						active: !1,
						index: String(e),
						dataKey: void 0,
						graphicalItemId: void 0,
						coordinate: void 0
					});
					if (p = -1, g > 0) {
						for (var v = 0; v < c.length; v++) if (ew(_(v), c, m, h) != null) {
							p = v;
							break;
						}
					} else for (var y = c.length - 1; y >= 0; y--) if (ew(_(y), c, m, h) != null) {
						p = y;
						break;
					}
					if (p < 0) return;
				} else {
					p = a + f * d;
					var b = s?.length || c.length;
					if (b === 0 || p >= b || p < 0) return;
				}
				var x = bT(e, l, "hover", String(p));
				t.dispatch(VC({
					active: !0,
					activeIndex: p.toString(),
					activeCoordinate: x
				}));
			} finally {
				mL = null, hL = null;
			}
		};
		if (!a) {
			o();
			return;
		}
		r === "raf" ? mL = requestAnimationFrame(o) : typeof r == "number" && hL === null && (o(), gL = null, hL = setTimeout(() => {
			gL ? o() : (hL = null, mL = null);
		}, r));
	}
}), pL.startListening({
	actionCreator: dL,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			if (!r.active && r.index == null) {
				var i = "0", a = bT(n, CC(n, n.tooltip.settings.shared), "hover", String(i));
				t.dispatch(VC({
					active: !0,
					activeIndex: i,
					activeCoordinate: a
				}));
			}
		}
	}
}), pL.startListening({
	actionCreator: fL,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			r.active && t.dispatch(VC({
				active: !1,
				activeIndex: r.index,
				activeCoordinate: r.coordinate
			}));
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/util/createEventProxy.js
function _L(e) {
	e.persist();
	var t = e.currentTarget;
	return new Proxy(e, { get: (e, n) => {
		if (n === "currentTarget") return t;
		var r = Reflect.get(e, n);
		return typeof r == "function" ? r.bind(e) : r;
	} });
}
//#endregion
//#region node_modules/recharts/es6/state/externalEventsMiddleware.js
var vL = No("externalEvent"), yL = zs(), bL = /* @__PURE__ */ new Map(), xL = /* @__PURE__ */ new Map(), SL = /* @__PURE__ */ new Map();
yL.startListening({
	actionCreator: vL,
	effect: (e, t) => {
		var n = e.payload, r = n.handler, i = n.reactEvent;
		if (r != null) {
			var a = i.type, o = _L(i);
			SL.set(a, {
				handler: r,
				reactEvent: o
			});
			var s = bL.get(a);
			s !== void 0 && (cancelAnimationFrame(s), bL.delete(a));
			var c = t.getState().eventSettings, l = c.throttleDelay, u = c.throttledEvents, d = u === "all" || u?.includes(a), f = xL.get(a);
			f !== void 0 && (typeof l != "number" || !d) && (clearTimeout(f), xL.delete(a));
			var p = () => {
				var e = SL.get(a);
				try {
					if (!e) return;
					var n = e.handler, r = e.reactEvent, i = t.getState(), o = {
						activeCoordinate: Kw(i),
						activeDataKey: Uw(i),
						activeIndex: Vw(i),
						activeLabel: Hw(i),
						activeTooltipIndex: Vw(i),
						isTooltipActive: qw(i)
					};
					n && n(o, r);
				} finally {
					bL.delete(a), xL.delete(a), SL.delete(a);
				}
			};
			if (!d) {
				p();
				return;
			}
			if (l === "raf") {
				var m = requestAnimationFrame(p);
				bL.set(a, m);
			} else if (typeof l == "number") {
				if (!xL.has(a)) {
					p();
					var h = setTimeout(p, l);
					xL.set(a, h);
				}
			} else p();
		}
	}
});
var CL = B([
	B([iw], (e) => e.tooltipItemPayloads),
	(e, t) => t,
	(e, t, n) => n
], (e, t, n) => {
	if (t != null) {
		var r = e.find((e) => e.settings.graphicalItemId === n);
		if (r != null) {
			var i = r.getPosition;
			if (i != null) return i(t);
		}
	}
}), wL = No("touchMove"), TL = zs(), EL = null, DL = null, OL = null, kL = null;
TL.startListening({
	actionCreator: wL,
	effect: (e, t) => {
		var n = e.payload;
		if (n.touches != null && n.touches.length !== 0) {
			kL = _L(n);
			var r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a.includes("touchmove");
			EL !== null && (cancelAnimationFrame(EL), EL = null), DL !== null && (typeof i != "number" || !o) && (clearTimeout(DL), DL = null), OL = Array.from(n.touches).map((e) => YI({
				clientX: e.clientX,
				clientY: e.clientY,
				currentTarget: n.currentTarget
			}));
			var s = () => {
				if (kL != null) {
					var e = t.getState(), n = CC(e, e.tooltip.settings.shared);
					if (n === "axis") {
						var r = OL?.[0];
						if (r == null) {
							EL = null, DL = null;
							return;
						}
						var i = qI(e, r);
						i?.activeIndex != null && t.dispatch(RC({
							activeIndex: i.activeIndex,
							activeDataKey: void 0,
							activeCoordinate: i.activeCoordinate
						}));
					} else if (n === "item") {
						var a = kL.touches[0];
						if (document.elementFromPoint == null || a == null) return;
						var o = document.elementFromPoint(a.clientX, a.clientY);
						if (!o || !o.getAttribute) return;
						var s = o.getAttribute(kc), c = o.getAttribute("data-recharts-item-id") ?? void 0, l = vw(e).find((e) => e.id === c);
						if (s == null || l == null || c == null) return;
						var u = l.dataKey, d = CL(e, s, c);
						t.dispatch(PC({
							activeDataKey: u,
							activeIndex: s,
							activeCoordinate: d,
							activeGraphicalItemId: c
						}));
					}
					EL = null, DL = null;
				}
			};
			if (!o) {
				s();
				return;
			}
			i === "raf" ? EL = requestAnimationFrame(s) : typeof i == "number" && DL === null && (s(), kL = null, DL = setTimeout(() => {
				kL ? s() : (DL = null, EL = null);
			}, i));
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/state/eventSettingsSlice.js
var AL = {
	throttleDelay: "raf",
	throttledEvents: [
		"mousemove",
		"touchmove",
		"pointermove",
		"scroll",
		"wheel"
	]
}, jL = $o({
	name: "eventSettings",
	initialState: AL,
	reducers: { setEventSettings: (e, t) => {
		t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = H(t.payload.throttledEvents));
	} }
}), ML = jL.actions.setEventSettings, NL = jL.reducer, PL = ra({
	brush: Tj,
	cartesianAxis: PA,
	chartData: gE,
	errorBars: uP,
	eventSettings: NL,
	graphicalItems: aA,
	layout: qs,
	legend: Kl,
	options: lE,
	polarAxis: YO,
	polarOptions: lL,
	referenceElements: iM,
	renderedTicks: eN,
	rootProps: oL,
	tooltip: HC,
	zIndex: WT
}), FL = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return Uo({
		reducer: PL,
		preloadedState: e,
		middleware: (e) => e({
			serializableCheck: !1,
			immutableCheck: ![
				"commonjs",
				"es6",
				"production"
			].includes("es6")
		}).concat([
			ZI.middleware,
			$I.middleware,
			pL.middleware,
			yL.middleware,
			TL.middleware
		]),
		enhancers: (e) => {
			var t = e;
			return typeof e == "function" && (t = e()), t.concat(Vo({ type: "raf" }));
		},
		devTools: ad.devToolsEnabled && {
			serialize: { replacer: rL },
			name: `recharts-${t}`
		}
	});
};
//#endregion
//#region node_modules/recharts/es6/state/RechartsStoreProvider.js
function IL(e) {
	var t = e.preloadedState, n = e.children, r = e.reduxStoreName, i = Wc(), a = (0, S.useRef)(null);
	if (i) return n;
	a.current ??= FL(t, r);
	var o = si;
	return /*#__PURE__*/ S.createElement(cu, {
		context: o,
		store: a.current
	}, n);
}
//#endregion
//#region node_modules/recharts/es6/state/ReportMainChartProps.js
function LL(e) {
	var t = e.layout, n = e.margin, r = ui(), i = Wc();
	return (0, S.useEffect)(() => {
		i || (r(Ws(t)), r(Us(n)));
	}, [
		r,
		i,
		t,
		n
	]), null;
}
var RL = /*#__PURE__*/ (0, S.memo)(LL, du);
//#endregion
//#region node_modules/recharts/es6/state/ReportChartProps.js
function zL(e) {
	var t = ui();
	return (0, S.useEffect)(() => {
		t(sL(e));
	}, [t, e]), null;
}
var BL = /*#__PURE__*/ (0, S.memo)((e) => {
	var t = ui();
	return (0, S.useEffect)(() => {
		t(ML(e));
	}, [t, e]), null;
}, du);
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexPortal.js
function VL(e) {
	var t = e.zIndex, n = e.isPanorama, r = (0, S.useRef)(null), i = ui();
	return (0, S.useLayoutEffect)(() => (r.current && i(HT({
		zIndex: t,
		element: r.current,
		isPanorama: n
	})), () => {
		i(UT({
			zIndex: t,
			isPanorama: n
		}));
	}), [
		i,
		t,
		n
	]), /*#__PURE__*/ S.createElement("g", {
		tabIndex: -1,
		ref: r,
		className: `recharts-zIndex-layer_${t}`
	});
}
function HL(e) {
	var t = e.children, n = e.isPanorama, r = z(kT);
	if (!r || r.length === 0) return t;
	var i = r.filter((e) => e < 0), a = r.filter((e) => e > 0);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, i.map((e) => /*#__PURE__*/ S.createElement(VL, {
		key: e,
		zIndex: e,
		isPanorama: n
	})), t, a.map((e) => /*#__PURE__*/ S.createElement(VL, {
		key: e,
		zIndex: e,
		isPanorama: n
	})));
}
//#endregion
//#region node_modules/recharts/es6/container/RootSurface.js
var UL = ["children"];
function WL(e, t) {
	if (e == null) return {};
	var n, r, i = GL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function GL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function KL() {
	return KL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, KL.apply(null, arguments);
}
var qL = {
	width: "100%",
	height: "100%",
	display: "block"
}, JL = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = Al(), r = jl(), i = Dd();
	if (!Ys(n) || !Ys(r)) return null;
	var a = e.children, o = e.otherAttributes, s = e.title, c = e.desc, l, u;
	return o != null && (l = typeof o.tabIndex == "number" ? o.tabIndex : i ? 0 : void 0, u = typeof o.role == "string" ? o.role : i ? "application" : void 0), /*#__PURE__*/ S.createElement(ee, KL({}, o, {
		title: s,
		desc: c,
		role: u,
		tabIndex: l,
		width: n,
		height: r,
		style: qL,
		ref: t
	}), a);
}), YL = (e) => {
	var t = e.children, n = z(qc);
	if (!n) return null;
	var r = n.width, i = n.height, a = n.y, o = n.x;
	return /*#__PURE__*/ S.createElement(ee, {
		width: r,
		height: i,
		x: o,
		y: a
	}, t);
}, XL = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.children, r = WL(e, UL);
	return Wc() ? /*#__PURE__*/ S.createElement(YL, null, /*#__PURE__*/ S.createElement(HL, { isPanorama: !0 }, n)) : /*#__PURE__*/ S.createElement(JL, KL({ ref: t }, r), /*#__PURE__*/ S.createElement(HL, { isPanorama: !1 }, n));
});
//#endregion
//#region node_modules/recharts/es6/util/useReportScale.js
function ZL(e, t) {
	return nR(e) || tR(e, t) || $L(e, t) || QL();
}
function QL() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $L(e, t) {
	if (e) {
		if (typeof e == "string") return eR(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? eR(e, t) : void 0;
	}
}
function eR(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function tR(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function nR(e) {
	if (Array.isArray(e)) return e;
}
function rR() {
	var e = ui(), t = ZL((0, S.useState)(null), 2), n = t[0], r = t[1], i = z(Tc);
	return (0, S.useEffect)(() => {
		if (n != null) {
			var t = n.getBoundingClientRect().width / n.offsetWidth;
			G(t) && t !== i && e(Ks(t));
		}
	}, [
		n,
		e,
		i
	]), r;
}
//#endregion
//#region node_modules/recharts/es6/chart/RechartsWrapper.js
function iR(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function aR(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? iR(Object(n), !0).forEach(function(t) {
			oR(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : iR(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function oR(e, t, n) {
	return (t = sR(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function sR(e) {
	var t = cR(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function cR(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function lR() {
	return lR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, lR.apply(null, arguments);
}
function uR(e, t) {
	return hR(e) || mR(e, t) || fR(e, t) || dR();
}
function dR() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fR(e, t) {
	if (e) {
		if (typeof e == "string") return pR(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pR(e, t) : void 0;
	}
}
function pR(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function mR(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function hR(e) {
	if (Array.isArray(e)) return e;
}
var gR = () => (DE(), null);
function _R(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		var t = parseFloat(e);
		if (!Number.isNaN(t)) return t;
	}
	return 0;
}
var vR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = (0, S.useRef)(null), r = uR((0, S.useState)({
		containerWidth: _R(e.style?.width),
		containerHeight: _R(e.style?.height)
	}), 2), i = r[0], a = r[1], o = (0, S.useCallback)((e, t) => {
		a((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), s = (0, S.useCallback)((e) => {
		if (typeof t == "function" && t(e), n.current != null && (n.current.disconnect(), n.current = null), e != null && typeof ResizeObserver < "u") {
			var r = e.getBoundingClientRect(), i = r.width, a = r.height;
			o(i, a);
			var s = new ResizeObserver((e) => {
				var t = e[0];
				if (t != null) {
					var n = t.contentRect, r = n.width, i = n.height;
					o(r, i);
				}
			});
			s.observe(e), n.current = s;
		}
	}, [t, o]);
	return (0, S.useEffect)(() => () => {
		n.current?.disconnect();
	}, [o]), /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Rl, {
		width: i.containerWidth,
		height: i.containerHeight
	}), /*#__PURE__*/ S.createElement("div", lR({ ref: s }, e)));
}), yR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = uR((0, S.useState)({
		containerWidth: _R(n),
		containerHeight: _R(r)
	}), 2), a = i[0], o = i[1], s = (0, S.useCallback)((e, t) => {
		o((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), c = (0, S.useCallback)((e) => {
		if (typeof t == "function" && t(e), e != null) {
			var n = e.getBoundingClientRect(), r = n.width, i = n.height;
			s(r, i);
		}
	}, [t, s]);
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Rl, {
		width: a.containerWidth,
		height: a.containerHeight
	}), /*#__PURE__*/ S.createElement("div", lR({ ref: c }, e)));
}), bR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Rl, {
		width: n,
		height: r
	}), /*#__PURE__*/ S.createElement("div", lR({ ref: t }, e)));
}), xR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return typeof n == "string" || typeof r == "string" ? /*#__PURE__*/ S.createElement(yR, lR({}, e, { ref: t })) : typeof n == "number" && typeof r == "number" ? /*#__PURE__*/ S.createElement(bR, lR({}, e, {
		width: n,
		height: r,
		ref: t
	})) : /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Rl, {
		width: n,
		height: r
	}), /*#__PURE__*/ S.createElement("div", lR({ ref: t }, e)));
});
function SR(e) {
	return e ? vR : xR;
}
var CR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.children, r = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, s = e.onDoubleClick, c = e.onMouseDown, l = e.onMouseEnter, u = e.onMouseLeave, d = e.onMouseMove, f = e.onMouseUp, p = e.onTouchEnd, m = e.onTouchMove, h = e.onTouchStart, g = e.style, _ = e.width, v = e.responsive, b = e.dispatchTouchEvents, x = b === void 0 || b, C = (0, S.useRef)(null), w = ui(), T = uR((0, S.useState)(null), 2), E = T[0], D = T[1], O = uR((0, S.useState)(null), 2), k = O[0], A = O[1], j = rR(), M = wl(), N = M?.width > 0 ? M.width : _, ee = M?.height > 0 ? M.height : i, te = (0, S.useCallback)((e) => {
		j(e), typeof t == "function" && t(e), D(e), A(e), e != null && (C.current = e);
	}, [
		j,
		t,
		D,
		A
	]), ne = (0, S.useCallback)((e) => {
		w(XI(e)), w(vL({
			handler: a,
			reactEvent: e
		}));
	}, [w, a]), re = (0, S.useCallback)((e) => {
		w(QI(e)), w(vL({
			handler: l,
			reactEvent: e
		}));
	}, [w, l]), ie = (0, S.useCallback)((e) => {
		w(IC()), w(vL({
			handler: u,
			reactEvent: e
		}));
	}, [w, u]), ae = (0, S.useCallback)((e) => {
		w(QI(e)), w(vL({
			handler: d,
			reactEvent: e
		}));
	}, [w, d]), oe = (0, S.useCallback)(() => {
		w(dL());
	}, [w]), se = (0, S.useCallback)(() => {
		w(fL());
	}, [w]), ce = (0, S.useCallback)((e) => {
		w(uL(e.key));
	}, [w]), le = (0, S.useCallback)((e) => {
		w(vL({
			handler: o,
			reactEvent: e
		}));
	}, [w, o]), ue = (0, S.useCallback)((e) => {
		w(vL({
			handler: s,
			reactEvent: e
		}));
	}, [w, s]), de = (0, S.useCallback)((e) => {
		w(vL({
			handler: c,
			reactEvent: e
		}));
	}, [w, c]), fe = (0, S.useCallback)((e) => {
		w(vL({
			handler: f,
			reactEvent: e
		}));
	}, [w, f]), pe = (0, S.useCallback)((e) => {
		w(vL({
			handler: h,
			reactEvent: e
		}));
	}, [w, h]), me = (0, S.useCallback)((e) => {
		x && w(wL(e)), w(vL({
			handler: m,
			reactEvent: e
		}));
	}, [
		w,
		x,
		m
	]), he = (0, S.useCallback)((e) => {
		w(vL({
			handler: p,
			reactEvent: e
		}));
	}, [w, p]), ge = SR(v);
	return /*#__PURE__*/ S.createElement(tE.Provider, { value: E }, /*#__PURE__*/ S.createElement(Be.Provider, { value: k }, /*#__PURE__*/ S.createElement(ge, {
		width: N ?? g?.width,
		height: ee ?? g?.height,
		className: y("recharts-wrapper", r),
		style: aR({
			position: "relative",
			cursor: "default",
			width: N,
			height: ee
		}, g),
		onClick: ne,
		onContextMenu: le,
		onDoubleClick: ue,
		onFocus: oe,
		onBlur: se,
		onKeyDown: ce,
		onMouseDown: de,
		onMouseEnter: re,
		onMouseLeave: ie,
		onMouseMove: ae,
		onMouseUp: fe,
		onTouchEnd: he,
		onTouchMove: me,
		onTouchStart: pe,
		ref: te
	}, /*#__PURE__*/ S.createElement(gR, null), n)));
}), wR = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function TR(e, t) {
	if (e == null) return {};
	var n, r, i = ER(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ER(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var DR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = e.responsive, a = e.children, o = e.className, s = e.style, c = e.compact, l = e.title, u = e.desc, d = E(TR(e, wR));
	return c ? /*#__PURE__*/ S.createElement(S.Fragment, null, /*#__PURE__*/ S.createElement(Rl, {
		width: n,
		height: r
	}), /*#__PURE__*/ S.createElement(XL, {
		otherAttributes: d,
		title: l,
		desc: u
	}, a)) : /*#__PURE__*/ S.createElement(CR, {
		className: o,
		style: s,
		width: n,
		height: r,
		responsive: i ?? !1,
		onClick: e.onClick,
		onMouseLeave: e.onMouseLeave,
		onMouseEnter: e.onMouseEnter,
		onMouseMove: e.onMouseMove,
		onMouseDown: e.onMouseDown,
		onMouseUp: e.onMouseUp,
		onContextMenu: e.onContextMenu,
		onDoubleClick: e.onDoubleClick,
		onTouchStart: e.onTouchStart,
		onTouchMove: e.onTouchMove,
		onTouchEnd: e.onTouchEnd
	}, /*#__PURE__*/ S.createElement(XL, {
		otherAttributes: d,
		title: l,
		desc: u,
		ref: t
	}, /*#__PURE__*/ S.createElement(fM, null, a)));
});
//#endregion
//#region node_modules/recharts/es6/chart/CartesianChart.js
function OR() {
	return OR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, OR.apply(null, arguments);
}
function kR(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function AR(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? kR(Object(n), !0).forEach(function(t) {
			jR(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kR(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function jR(e, t, n) {
	return (t = MR(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function MR(e) {
	var t = NR(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function NR(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var PR = AR({
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: !1,
	reverseStackOrder: !1,
	stackOffset: "none",
	syncMethod: "index"
}, AL), FR = /*#__PURE__*/ (0, S.forwardRef)(function(e, t) {
	var n = Pn(e.categoricalChartProps, PR), r = e.chartName, i = e.defaultTooltipEventType, a = e.validateTooltipEventTypes, o = e.tooltipPayloadSearcher, s = e.categoricalChartProps, c = {
		chartName: r,
		defaultTooltipEventType: i,
		validateTooltipEventTypes: a,
		tooltipPayloadSearcher: o,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ S.createElement(IL, {
		preloadedState: { options: c },
		reduxStoreName: s.id ?? r
	}, /*#__PURE__*/ S.createElement(gj, { chartData: s.data }), /*#__PURE__*/ S.createElement(RL, {
		layout: n.layout,
		margin: n.margin
	}), /*#__PURE__*/ S.createElement(BL, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ S.createElement(zL, {
		baseValue: n.baseValue,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ S.createElement(DR, OR({}, n, { ref: t })));
}), IR = ["axis"], LR = /*#__PURE__*/ (0, S.forwardRef)((e, t) => /*#__PURE__*/ S.createElement(FR, {
	chartName: "ComposedChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: IR,
	tooltipPayloadSearcher: sE,
	categoricalChartProps: e,
	ref: t
})), RR = _(), zR = {
	close: "Close",
	relogin_done: "Logged in with BankID.",
	relogin_checking: "BankID done, checking the account…",
	relogin_failed: "The login did not complete. Try again.",
	zoom_hint: "Drag across the chart to zoom; the slider below adjusts the same window. Double-click to reset.",
	table_zoom: "Zoomed",
	table_full: "Whole period",
	title: "Mälarenergi",
	tab_overview: "Overview",
	tab_history: "History",
	tab_invoices: "Invoices",
	tab_contracts: "Contracts",
	tab_settings: "Settings",
	month: "This month",
	consumption: "Consumption",
	production: "Production",
	cost: "Cost",
	compensation: "Compensation",
	peak: "Power peak",
	net: "Net",
	daily: "Last 30 days",
	invoices: "Invoices",
	period: "Period",
	amount: "Amount",
	due: "Due",
	status: "Status",
	pdf: "PDF",
	paid: "Paid",
	open: "Unpaid",
	credit: "Payout",
	han: "HAN port",
	fuse: "Fuse",
	none: "No data yet",
	loading: "Loading…",
	updated: "Updated",
	energy: "energy",
	grid: "grid",
	net_info: "Compensation for sold power minus cost of bought power this month (+ green = you earned more than you paid), from Mälarenergi's own meter values (incl. VAT, excl. fixed fees).",
	peak_info: "The month's highest hourly grid power according to the meter.",
	daily_info: "Mälarenergi's meter values. Bars = kWh, lines = cost and compensation in SEK.",
	wallet_info: "Shown from your wallet: + (green) is money paid to you, − is money you pay. Amounts incl. VAT; production payouts are VAT-free.",
	wallet_net_info: "Your net for the year: production payouts minus consumption invoices. Negative (red) means you paid more than you were paid.",
	inv_info: "Consumption and production are invoiced separately. Fixed fees, power fee and other items are shown per invoice.",
	fixed: "Fixed",
	power_fee: "Power",
	other: "Other",
	downloading: "Fetching…",
	per_page: "Per page",
	of: "of",
	all: "All",
	han_OPEN: "open",
	han_CLOSED: "closed",
	han_PENDINGOPEN: "opening",
	han_PENDINGCLOSE: "closing",
	res_hour: "Day",
	res_day: "Month",
	res_month: "Year",
	total: "Total",
	prev: "Previous",
	next: "Next",
	today: "Now",
	history_info: "Choose Day (per hour), Month (per day) or Year (per month) and step back in time. Drag the handles under the chart to zoom.",
	contracts: "Contracts",
	product: "Product",
	start: "Start",
	end: "End",
	until_further: "Until further notice",
	area: "Grid area",
	active: "Active",
	ended: "Ended",
	yearly: "Expected kWh/year",
	u_EL: "Grid",
	u_ELEXT: "Electricity supply",
	u_ELPROD: "Grid production",
	u_BB: "Broadband",
	u_FV: "District heating",
	settings_lang: "Language",
	lang_auto: "Same as Home Assistant",
	settings_notify: "Notifications",
	notify_targets: "Send to",
	no_targets: "No recipient selected: notifications appear in Home Assistant's notification panel.",
	notify_new_invoice: "New invoice",
	notify_overdue: "Overdue invoice",
	notify_han_change: "HAN port changed",
	notify_auth: "Login expired",
	settings_account: "Account",
	relogin: "Log in again with BankID",
	relogin_info: "Starts a new BankID login in a dialog here: scan the QR code, or choose BankID on this device on a phone.",
	relogin_started: "Login started — open Settings → Devices & services in Home Assistant.",
	saved: "Saved",
	none_found: "No notify services found",
	invoices_per_page: "Invoices per page",
	live: "Right now",
	live_info: "Live grid power and phase load from your PowerHub integration (the same HAN meter). Bars show each phase against the fuse.",
	importing: "Buying from the grid",
	exporting: "Selling to the grid",
	show_powerhub: "Show live PowerHub data",
	c_grid_fixed: "Grid fixed fee (fuse)",
	c_grid_transfer: "Grid transfer",
	c_power_fee: "Power fee",
	c_energy_tax: "Energy tax",
	c_spot_energy: "Electricity (spot)",
	c_supply_markup: "Supplier markup",
	c_supply_fixed: "Supplier fixed fee",
	c_broadband: "Broadband",
	c_production_spot: "Sold electricity (spot)",
	c_production_bonus: "Production bonus",
	c_production_grid: "Grid benefit",
	c_production_other: "Other production payout",
	c_other: "Other",
	show_lines: "Show invoice lines"
}, BR = {
	en: zR,
	sv: {
		...zR,
		close: "Stäng",
		relogin_done: "Inloggad med BankID.",
		relogin_checking: "BankID klart, kontrollerar kontot…",
		relogin_failed: "Inloggningen blev inte klar. Försök igen.",
		zoom_hint: "Dra över diagrammet för att zooma; reglaget under justerar samma fönster. Dubbelklicka för att återställa.",
		table_zoom: "Inzoomat",
		table_full: "Hela perioden",
		tab_overview: "Översikt",
		tab_history: "Historik",
		tab_invoices: "Fakturor",
		tab_contracts: "Avtal",
		tab_settings: "Inställningar",
		month: "Denna månad",
		consumption: "Förbrukning",
		production: "Produktion",
		cost: "Kostnad",
		compensation: "Ersättning",
		peak: "Effekttopp",
		net: "Netto",
		daily: "Senaste 30 dagarna",
		invoices: "Fakturor",
		period: "Period",
		amount: "Belopp",
		due: "Förfaller",
		status: "Status",
		paid: "Betald",
		open: "Obetald",
		credit: "Utbetalning",
		han: "HAN-port",
		fuse: "Säkring",
		none: "Ingen data ännu",
		loading: "Laddar…",
		updated: "Uppdaterad",
		energy: "el",
		grid: "nät",
		net_info: "Ersättning för såld el minus kostnad för köpt el, denna månad (+ grönt = du fick mer än du betalade), enligt Mälarenergis egna mätvärden (inkl. moms, utan fasta avgifter).",
		peak_info: "Månadens högsta timeffekt från nätet enligt elmätaren.",
		daily_info: "Mälarenergis mätvärden. Staplar = kWh, linjer = kostnad respektive ersättning i kr.",
		wallet_info: "Visas från din plånbok: + (grönt) är pengar till dig, − är pengar du betalar. Belopp inkl. moms; ersättning för produktion är momsfri.",
		wallet_net_info: "Ditt netto för året: utbetalningar för produktion minus fakturor för förbrukning. Negativt (rött) betyder att du betalat mer än du fått.",
		inv_info: "Förbrukning och produktion faktureras separat. Fasta avgifter, effektavgift och övriga poster visas per faktura.",
		fixed: "Fasta",
		power_fee: "Effekt",
		other: "Övrigt",
		downloading: "Hämtar…",
		per_page: "Per sida",
		of: "av",
		all: "Alla",
		han_OPEN: "öppen",
		han_CLOSED: "stängd",
		han_PENDINGOPEN: "öppnas",
		han_PENDINGCLOSE: "stängs",
		res_hour: "Dag",
		res_day: "Månad",
		res_month: "År",
		total: "Totalt",
		prev: "Föregående",
		next: "Nästa",
		today: "Nu",
		history_info: "Välj Dag (per timme), Månad (per dag) eller År (per månad) och bläddra bakåt. Dra i handtagen under grafen för att zooma.",
		contracts: "Avtal",
		product: "Produkt",
		start: "Start",
		end: "Slut",
		until_further: "Tills vidare",
		area: "Nätområde",
		active: "Aktiva",
		ended: "Avslutade",
		yearly: "Förväntad kWh/år",
		u_EL: "Elnät",
		u_ELEXT: "Elhandel",
		u_ELPROD: "Elnät produktion",
		u_BB: "Bredband",
		u_FV: "Fjärrvärme",
		settings_lang: "Språk",
		lang_auto: "Som Home Assistant",
		settings_notify: "Notiser",
		notify_targets: "Skicka till",
		no_targets: "Ingen mottagare vald: notiser visas i Home Assistants notispanel.",
		notify_new_invoice: "Ny faktura",
		notify_overdue: "Förfallen faktura",
		notify_han_change: "HAN-port ändrad",
		notify_auth: "Inloggning utgången",
		settings_account: "Konto",
		relogin: "Logga in igen med BankID",
		relogin_info: "Startar en ny BankID-inloggning i en ruta här: skanna QR-koden, eller välj BankID på den här enheten på mobilen.",
		relogin_started: "Inloggning startad — öppna Inställningar → Enheter och tjänster i Home Assistant.",
		saved: "Sparat",
		none_found: "Inga notify-tjänster hittades",
		invoices_per_page: "Fakturor per sida",
		live: "Just nu",
		live_info: "Effekt mot nätet och fasbelastning från PowerHub-integrationen (samma HAN-mätare). Staplarna visar varje fas mot säkringen.",
		importing: "Köper från nätet",
		exporting: "Säljer till nätet",
		show_powerhub: "Visa PowerHub-data i realtid",
		c_grid_fixed: "Elnät fast avgift (säkring)",
		c_grid_transfer: "Elöverföring",
		c_power_fee: "Effektavgift",
		c_energy_tax: "Energiskatt",
		c_spot_energy: "El (spotpris)",
		c_supply_markup: "Elhandel påslag",
		c_supply_fixed: "Elhandel fast avgift",
		c_broadband: "Bredband",
		c_production_spot: "Såld el (spotpris)",
		c_production_bonus: "Produktionsersättning",
		c_production_grid: "Nätnytta",
		c_production_other: "Övrig produktionsersättning",
		c_other: "Övrigt",
		show_lines: "Visa fakturarader"
	},
	nb: {
		...zR,
		zoom_hint: "Dra over diagrammet for å zoome; glidebryteren under justerer samme vindu. Dobbeltklikk for å tilbakestille.",
		table_zoom: "Zoomet",
		table_full: "Hele perioden",
		wallet_info: "Vist fra lommeboken din: + (grønn) er penger til deg, − er penger du betaler. Beløp inkl. mva; produksjonsutbetaling er mva-fri.",
		wallet_net_info: "Ditt netto for året: utbetalinger for produksjon minus fakturaer for forbruk. Negativt (rødt) betyr at du har betalt mer enn du har fått.",
		tab_overview: "Oversikt",
		tab_history: "Historikk",
		tab_invoices: "Fakturaer",
		tab_contracts: "Avtaler",
		tab_settings: "Innstillinger",
		month: "Denne måneden",
		consumption: "Forbruk",
		production: "Produksjon",
		cost: "Kostnad",
		compensation: "Godtgjørelse",
		peak: "Effekttopp",
		net: "Netto",
		daily: "Siste 30 dager",
		invoices: "Fakturaer",
		period: "Periode",
		amount: "Beløp",
		due: "Forfall",
		paid: "Betalt",
		open: "Ubetalt",
		credit: "Utbetaling",
		han: "HAN-port",
		fuse: "Sikring",
		none: "Ingen data ennå",
		loading: "Laster…",
		updated: "Oppdatert",
		energy: "strøm",
		grid: "nett",
		fixed: "Faste",
		power_fee: "Effekt",
		other: "Annet",
		downloading: "Henter…",
		per_page: "Per side",
		of: "av",
		all: "Alle",
		han_OPEN: "åpen",
		han_CLOSED: "stengt",
		han_PENDINGOPEN: "åpnes",
		han_PENDINGCLOSE: "stenges",
		res_hour: "Dag",
		res_day: "Måned",
		res_month: "År",
		total: "Totalt",
		prev: "Forrige",
		next: "Neste",
		today: "Nå",
		contracts: "Avtaler",
		product: "Produkt",
		end: "Slutt",
		until_further: "Inntil videre",
		area: "Nettområde",
		active: "Aktive",
		ended: "Avsluttet",
		u_EL: "Strømnett",
		u_ELEXT: "Strømavtale",
		u_ELPROD: "Nett produksjon",
		u_BB: "Bredbånd",
		u_FV: "Fjernvarme",
		settings_lang: "Språk",
		lang_auto: "Som Home Assistant",
		settings_notify: "Varsler",
		notify_targets: "Send til",
		no_targets: "Ingen mottaker valgt: varsler vises i Home Assistants varselpanel.",
		notify_new_invoice: "Ny faktura",
		notify_overdue: "Forfalt faktura",
		notify_han_change: "HAN-port endret",
		notify_auth: "Innlogging utløpt",
		settings_account: "Konto",
		relogin: "Logg inn igjen med BankID",
		saved: "Lagret",
		invoices_per_page: "Fakturaer per side",
		live: "Akkurat nå",
		live_info: "Effekt mot nettet og fasebelastning fra PowerHub-integrasjonen (samme HAN-måler). Søylene viser hver fase mot sikringen.",
		importing: "Kjøper fra nettet",
		exporting: "Selger til nettet",
		show_powerhub: "Vis PowerHub-data i sanntid"
	},
	da: {
		...zR,
		zoom_hint: "Træk hen over diagrammet for at zoome; skyderen nedenfor justerer samme vindue. Dobbeltklik for at nulstille.",
		table_zoom: "Zoomet",
		table_full: "Hele perioden",
		wallet_info: "Vist fra din pung: + (grøn) er penge til dig, − er penge du betaler. Beløb inkl. moms; afregning for produktion er momsfri.",
		wallet_net_info: "Dit netto for året: udbetalinger for produktion minus fakturaer for forbrug. Negativt (rødt) betyder, at du har betalt mere, end du har fået.",
		tab_overview: "Overblik",
		tab_history: "Historik",
		tab_invoices: "Fakturaer",
		tab_contracts: "Aftaler",
		tab_settings: "Indstillinger",
		month: "Denne måned",
		consumption: "Forbrug",
		production: "Produktion",
		cost: "Omkostning",
		compensation: "Godtgørelse",
		peak: "Effekttop",
		net: "Netto",
		daily: "Seneste 30 dage",
		invoices: "Fakturaer",
		period: "Periode",
		amount: "Beløb",
		due: "Forfald",
		paid: "Betalt",
		open: "Ubetalt",
		credit: "Udbetaling",
		han: "HAN-port",
		fuse: "Sikring",
		none: "Ingen data endnu",
		loading: "Indlæser…",
		updated: "Opdateret",
		energy: "el",
		grid: "net",
		fixed: "Faste",
		power_fee: "Effekt",
		other: "Andet",
		downloading: "Henter…",
		per_page: "Pr. side",
		of: "af",
		all: "Alle",
		han_OPEN: "åben",
		han_CLOSED: "lukket",
		han_PENDINGOPEN: "åbner",
		han_PENDINGCLOSE: "lukker",
		res_hour: "Dag",
		res_day: "Måned",
		res_month: "År",
		total: "I alt",
		prev: "Forrige",
		next: "Næste",
		today: "Nu",
		contracts: "Aftaler",
		product: "Produkt",
		end: "Slut",
		until_further: "Indtil videre",
		area: "Netområde",
		active: "Aktive",
		ended: "Afsluttede",
		u_EL: "Elnet",
		u_ELEXT: "Elaftale",
		u_ELPROD: "Elnet produktion",
		u_BB: "Bredbånd",
		u_FV: "Fjernvarme",
		settings_lang: "Sprog",
		lang_auto: "Som Home Assistant",
		settings_notify: "Notifikationer",
		notify_targets: "Send til",
		no_targets: "Ingen modtager valgt: notifikationer vises i Home Assistants notifikationspanel.",
		notify_new_invoice: "Ny faktura",
		notify_overdue: "Forfalden faktura",
		notify_han_change: "HAN-port ændret",
		notify_auth: "Login udløbet",
		settings_account: "Konto",
		relogin: "Log ind igen med BankID",
		saved: "Gemt",
		invoices_per_page: "Fakturaer pr. side",
		live: "Lige nu",
		live_info: "Effekt mod nettet og fasebelastning fra PowerHub-integrationen (samme HAN-måler). Søjlerne viser hver fase mod sikringen.",
		importing: "Køber fra nettet",
		exporting: "Sælger til nettet",
		show_powerhub: "Vis PowerHub-data live"
	},
	fi: {
		...zR,
		zoom_hint: "Vedä kaavion yli zoomataksesi; alla oleva liukusäädin säätää samaa ikkunaa. Palauta kaksoisnapsautuksella.",
		table_zoom: "Zoomattu",
		table_full: "Koko jakso",
		wallet_info: "Näytetään lompakkosi kannalta: + (vihreä) on sinulle maksettua rahaa, − on rahaa, jonka maksat. Summat sis. ALV; tuotannon hyvitys on ALV-vapaa.",
		wallet_net_info: "Vuoden nettosi: tuotannon hyvitykset miinus kulutuslaskut. Negatiivinen (punainen) tarkoittaa, että olet maksanut enemmän kuin saanut.",
		tab_overview: "Yleiskatsaus",
		tab_history: "Historia",
		tab_invoices: "Laskut",
		tab_contracts: "Sopimukset",
		tab_settings: "Asetukset",
		month: "Tämä kuukausi",
		consumption: "Kulutus",
		production: "Tuotanto",
		cost: "Kustannus",
		compensation: "Hyvitys",
		peak: "Tehohuippu",
		net: "Netto",
		daily: "Viimeiset 30 päivää",
		invoices: "Laskut",
		period: "Jakso",
		amount: "Summa",
		due: "Eräpäivä",
		paid: "Maksettu",
		open: "Maksamatta",
		credit: "Maksu sinulle",
		han: "HAN-portti",
		fuse: "Sulake",
		none: "Ei vielä tietoja",
		loading: "Ladataan…",
		updated: "Päivitetty",
		energy: "sähkö",
		grid: "verkko",
		fixed: "Kiinteät",
		power_fee: "Teho",
		other: "Muut",
		downloading: "Haetaan…",
		per_page: "Sivulla",
		of: "/",
		all: "Kaikki",
		han_OPEN: "auki",
		han_CLOSED: "kiinni",
		han_PENDINGOPEN: "avautuu",
		han_PENDINGCLOSE: "sulkeutuu",
		res_hour: "Päivä",
		res_day: "Kuukausi",
		res_month: "Vuosi",
		total: "Yhteensä",
		prev: "Edellinen",
		next: "Seuraava",
		today: "Nyt",
		contracts: "Sopimukset",
		product: "Tuote",
		start: "Alku",
		end: "Loppu",
		until_further: "Toistaiseksi",
		area: "Verkkoalue",
		active: "Voimassa",
		ended: "Päättyneet",
		u_EL: "Sähköverkko",
		u_ELEXT: "Sähkösopimus",
		u_ELPROD: "Verkko tuotanto",
		u_BB: "Laajakaista",
		u_FV: "Kaukolämpö",
		settings_lang: "Kieli",
		lang_auto: "Kuten Home Assistant",
		settings_notify: "Ilmoitukset",
		notify_targets: "Lähetä",
		no_targets: "Vastaanottajaa ei ole valittu: ilmoitukset näkyvät Home Assistantin ilmoituspaneelissa.",
		notify_new_invoice: "Uusi lasku",
		notify_overdue: "Erääntynyt lasku",
		notify_han_change: "HAN-portti muuttui",
		notify_auth: "Kirjautuminen vanhentui",
		settings_account: "Tili",
		relogin: "Kirjaudu uudelleen BankID:llä",
		saved: "Tallennettu",
		invoices_per_page: "Laskuja sivulla",
		live: "Juuri nyt",
		live_info: "Verkkoteho ja vaihekuormitus PowerHub-integraatiosta (sama HAN-mittari). Palkit näyttävät jokaisen vaiheen suhteessa sulakkeeseen.",
		importing: "Ostetaan verkosta",
		exporting: "Myydään verkkoon",
		show_powerhub: "Näytä PowerHub-tiedot reaaliajassa"
	},
	is: {
		...zR,
		zoom_hint: "Dragðu yfir grafið til að þysja; sleðinn fyrir neðan stillir sama glugga. Tvísmelltu til að endurstilla.",
		table_zoom: "Þysjað",
		table_full: "Allt tímabilið",
		wallet_info: "Sýnt frá veskinu þínu: + (grænt) eru peningar til þín, − eru peningar sem þú greiðir. Upphæðir með VSK; greiðsla fyrir framleiðslu er án VSK.",
		wallet_net_info: "Nettó ársins: greiðslur fyrir framleiðslu að frádregnum reikningum fyrir notkun. Neikvætt (rautt) þýðir að þú hefur greitt meira en þú fékkst.",
		tab_overview: "Yfirlit",
		tab_history: "Saga",
		tab_invoices: "Reikningar",
		tab_contracts: "Samningar",
		tab_settings: "Stillingar",
		month: "Þessi mánuður",
		consumption: "Notkun",
		production: "Framleiðsla",
		cost: "Kostnaður",
		compensation: "Endurgreiðsla",
		peak: "Aflstoppur",
		net: "Nettó",
		daily: "Síðustu 30 dagar",
		invoices: "Reikningar",
		period: "Tímabil",
		amount: "Upphæð",
		due: "Gjalddagi",
		paid: "Greitt",
		open: "Ógreitt",
		credit: "Útgreiðsla",
		han: "HAN-tengi",
		fuse: "Öryggi",
		live: "Núna",
		live_info: "Afl á netinu og álag á fasa úr PowerHub-samþættingunni (sami HAN-mælir). Súlurnar sýna hvern fasa miðað við öryggið.",
		importing: "Kaupir af netinu",
		exporting: "Selur inn á netið",
		show_powerhub: "Sýna PowerHub-gögn í rauntíma",
		none: "Engin gögn enn",
		loading: "Hleð…",
		updated: "Uppfært",
		fixed: "Föst",
		power_fee: "Afl",
		other: "Annað",
		per_page: "Á síðu",
		of: "af",
		all: "Allt",
		res_hour: "Dagur",
		res_day: "Mánuður",
		res_month: "Ár",
		total: "Samtals",
		prev: "Fyrri",
		next: "Næsta",
		today: "Núna",
		contracts: "Samningar",
		until_further: "Ótímabundið",
		active: "Virkir",
		ended: "Lokið",
		settings_lang: "Tungumál",
		lang_auto: "Eins og Home Assistant",
		settings_notify: "Tilkynningar",
		notify_targets: "Senda til",
		no_targets: "Enginn viðtakandi valinn: tilkynningar birtast í tilkynningaspjaldi Home Assistant.",
		notify_new_invoice: "Nýr reikningur",
		notify_overdue: "Gjaldfallinn reikningur",
		settings_account: "Aðgangur",
		relogin: "Skrá inn aftur með BankID",
		saved: "Vistað"
	}
}, VR = {
	en: "English",
	sv: "Svenska",
	nb: "Norsk",
	da: "Dansk",
	fi: "Suomi",
	is: "Íslenska"
};
function HR(e, t) {
	let n = t && t !== "auto" ? t : String(e ?? "en").toLowerCase();
	return (n.startsWith("no") || n === "nn") && (n = "nb"), n = n.slice(0, 2), {
		t: BR[n] ?? zR,
		locale: {
			sv: "sv-SE",
			nb: "nb-NO",
			da: "da-DK",
			fi: "fi-FI",
			is: "is-IS"
		}[n] ?? "en-GB",
		code: BR[n] ? n : "en"
	};
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var UR = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), $ = (/* @__PURE__ */ o(((e, t) => {
	t.exports = UR();
})))(), WR = [
	"overview",
	"history",
	"invoices",
	"contracts",
	"settings"
], GR = (e) => +(e != null && Math.abs(e) < 10), KR = (e, t = 0, n = "") => e == null || Number.isNaN(e) ? "–" : `${e.toLocaleString("sv-SE", {
	minimumFractionDigits: t,
	maximumFractionDigits: t
})}${n ? "\xA0" + n : ""}`, qR = (e) => new Date(e).toLocaleDateString("sv-SE"), JR = { contentStyle: {
	background: "var(--me-card)",
	border: "1px solid var(--me-line)",
	borderRadius: 10,
	fontSize: 12
} }, YR = {
	stroke: "var(--me-muted)",
	fontSize: 11
};
function XR({ text: e }) {
	let [t, n] = (0, S.useState)(!1), r = (0, S.useRef)(null);
	return (0, S.useEffect)(() => {
		if (!t) return;
		let e = (e) => {
			e.composedPath().includes(r.current) || n(!1);
		};
		return window.addEventListener("pointerdown", e), () => window.removeEventListener("pointerdown", e);
	}, [t]), /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "info",
		ref: r,
		children: [/* @__PURE__ */ (0, $.jsx)("button", {
			className: "info-btn",
			onClick: () => n(!t),
			"aria-label": "info",
			children: "i"
		}), t && /* @__PURE__ */ (0, $.jsx)("span", {
			className: "pop",
			children: e
		})]
	});
}
function ZR({ label: e, value: t, sub: n, info: r, tone: i }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "kpi",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "label",
				children: [e, r && /* @__PURE__ */ (0, $.jsx)(XR, { text: r })]
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: `value ${i ?? ""}`,
				children: t
			}),
			n && /* @__PURE__ */ (0, $.jsx)("div", {
				className: "muted",
				children: n
			})
		]
	});
}
function QR({ hass: e, narrow: t }) {
	let [n, r] = (0, S.useState)(null), [i, a] = (0, S.useState)(() => localStorage.getItem("me_tab") || "overview"), [o, s] = (0, S.useState)(null), [c, l] = (0, S.useState)(null), { t: u, locale: d } = HR(e.locale?.language ?? e.language, n?.language), f = Object.values(e.states).find((e) => e.entity_id.startsWith("sensor.") && e.attributes?.invoices)?.last_updated;
	(0, S.useEffect)(() => {
		e.connection.sendMessagePromise({ type: "malarenergi/settings/get" }).then((e) => r(e.options)).catch(() => r({}));
	}, []), (0, S.useEffect)(() => {
		e.connection.sendMessagePromise({ type: "malarenergi/data" }).then((e) => {
			s(e.data), l(null);
		}).catch((e) => l(e?.message ?? String(e)));
	}, [f]);
	let p = (e) => {
		a(e), localStorage.setItem("me_tab", e);
	}, m = Object.values(o?.han ?? {})[0], h = {
		hass: e,
		t: u,
		locale: d,
		narrow: t
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: `page ${t ? "narrow" : ""}`,
		children: [
			/* @__PURE__ */ (0, $.jsxs)("header", { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "brand",
				children: [/* @__PURE__ */ (0, $.jsx)("h1", { children: u.title }), /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "chips",
					children: [m && /* @__PURE__ */ (0, $.jsxs)("span", {
						className: `chip ${m === "OPEN" ? "ok" : ""}`,
						children: [
							u.han,
							": ",
							u[`han_${m}`] ?? m.toLowerCase()
						]
					}), o?.fuse && /* @__PURE__ */ (0, $.jsxs)("span", {
						className: "chip",
						children: [
							u.fuse,
							" ",
							o.fuse
						]
					})]
				})]
			}), /* @__PURE__ */ (0, $.jsx)("nav", {
				className: "tabs",
				children: WR.map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
					className: i === e ? "on" : "",
					onClick: () => p(e),
					children: u[`tab_${e}`]
				}, e))
			})] }),
			c && /* @__PURE__ */ (0, $.jsx)("div", {
				className: "card error",
				children: c
			}),
			!o && i !== "settings" ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "card",
				children: c ? u.none : u.loading
			}) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
				i === "overview" && o && /* @__PURE__ */ (0, $.jsx)(ez, {
					...h,
					d: o,
					live: n?.show_powerhub !== !1
				}),
				i === "history" && /* @__PURE__ */ (0, $.jsx)(rz, { ...h }),
				i === "invoices" && o && /* @__PURE__ */ (0, $.jsx)(sz, {
					...h,
					invoices: o.invoices ?? [],
					perPage0: n?.invoices_per_page ?? 12
				}),
				i === "contracts" && /* @__PURE__ */ (0, $.jsx)(cz, { ...h }),
				i === "settings" && n && /* @__PURE__ */ (0, $.jsx)(lz, {
					...h,
					opts: n,
					setOpts: r
				})
			] }),
			o?.updated && i !== "settings" && /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "muted foot",
				children: [
					u.updated,
					" ",
					new Date(o.updated).toLocaleString(d)
				]
			})
		]
	});
}
function $R({ hass: e, t, d: n }) {
	let r = e.states, i = Object.keys(r).map((e) => /^sensor\.(powerhub_(?:.+_)?)power_import$/.exec(e)?.[1]).filter(Boolean), a = new Set([
		...Object.keys(n.han ?? {}),
		n.CONSUMPTION?.peak?.meteringPointId,
		n.PRODUCTION?.peak?.meteringPointId
	].filter(Boolean).map(String)), o = i.find((e) => a.has(r[`sensor.${e}meter_id`]?.state)) ?? (i.length === 1 ? i[0] : void 0);
	if (!o) return null;
	let s = (e) => {
		let t = parseFloat(String(r[e]?.state).replace(/^A/, ""));
		return Number.isFinite(t) ? t : null;
	}, c = (e) => {
		let t = s(e), n = r[e]?.attributes?.unit_of_measurement;
		return t == null ? null : n === "W" ? t / 1e3 : n === "MW" ? t * 1e3 : t;
	}, l = c(`sensor.${o}power_import`), u = c(`sensor.${o}power_export`), d = s(`number.${o}fuse_limit`) ?? s(`number.${o}fuse_limit_set`) ?? s(`select.${o}fuse_size`);
	if (l == null && u == null) return null;
	let f = (l ?? 0) - (u ?? 0);
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "card",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("h2", { children: [t.live, /* @__PURE__ */ (0, $.jsx)(XR, { text: t.live_info })] }),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "row-between",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "muted",
					children: f >= 0 ? t.importing : t.exporting
				}), /* @__PURE__ */ (0, $.jsx)("b", {
					className: f < 0 ? "pos" : "",
					children: KR(Math.abs(f), 2, "kW")
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "phases",
				style: { marginTop: 12 },
				children: [
					1,
					2,
					3
				].map((e) => {
					let t = s(`sensor.${o}current_l${e}`), n = t != null && d ? Math.min(100, t / d * 100) : 0;
					return /* @__PURE__ */ (0, $.jsxs)("div", { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "row-between",
						children: [/* @__PURE__ */ (0, $.jsxs)("span", {
							className: "muted",
							children: ["L", e]
						}), /* @__PURE__ */ (0, $.jsxs)("span", { children: [KR(t, 1, "A"), d ? ` / ${d} A` : ""] })]
					}), /* @__PURE__ */ (0, $.jsx)("div", {
						className: "meter",
						children: /* @__PURE__ */ (0, $.jsx)("div", { style: {
							width: `${n}%`,
							background: n > 85 ? "var(--me-neg)" : n > 60 ? "#f5a524" : "var(--me-accent)"
						} })
					})] }, e);
				})
			})
		]
	});
}
function ez({ hass: e, t, locale: n, narrow: r, d: i, live: a }) {
	let o = (0, S.useMemo)(() => {
		let e = /* @__PURE__ */ new Map(), t = (t, n) => (t ?? []).forEach(([t, r]) => {
			let i = qR(t);
			(e.get(i) ?? e.set(i, { k: i }).get(i))[n] = r;
		});
		return t(i.CONSUMPTION?.daily?.consumption, "cons"), t(i.CONSUMPTION?.daily?.cost, "cost"), t(i.PRODUCTION?.daily?.production, "prod"), t(i.PRODUCTION?.daily?.compensation, "comp"), [...e.values()].sort((e, t) => e.k.localeCompare(t.k));
	}, [i]), s = (/* @__PURE__ */ new Date()).toLocaleDateString("sv-SE").slice(0, 7), c = (e) => o.filter((e) => e.k.startsWith(s)).reduce((t, n) => t + (n[e] ?? 0), 0), l = (e) => (e ?? []).filter(([e]) => qR(e).startsWith(s)).reduce((e, [, t]) => e + t, 0), u = i.CONSUMPTION?.peak, d = c("cost") - c("comp");
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "kpis",
			children: [
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.consumption} · ${t.month}`,
					value: KR(c("cons"), GR(c("cons")), "kWh"),
					sub: `${t.cost} ${KR(c("cost"), GR(c("cost")), "kr")}`
				}),
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.production} · ${t.month}`,
					value: KR(c("prod"), GR(c("prod")), "kWh"),
					sub: `${t.compensation} ${KR(c("comp"), GR(c("comp")), "kr")}`
				}),
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.net} · ${t.month}`,
					info: t.net_info,
					value: az(-d, GR(d)),
					tone: d <= 0 ? "pos" : "neg",
					sub: `${t.energy} ${KR(l(i.CONSUMPTION?.daily?.costEL), 0)} · ${t.grid} ${KR(l(i.CONSUMPTION?.daily?.costELEXT), 0)}`
				}),
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: t.peak,
					info: t.peak_info,
					value: KR(u?.peakPowerConsumption, (u?.peakPowerConsumption ?? 1) < 1 ? 2 : 1, "kW"),
					sub: u?.dateTime ? new Date(u.dateTime).toLocaleString(n, {
						day: "numeric",
						month: "short",
						hour: "2-digit",
						minute: "2-digit"
					}) : ""
				})
			]
		}),
		/* @__PURE__ */ (0, $.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, $.jsxs)("h2", { children: [t.daily, /* @__PURE__ */ (0, $.jsx)(XR, { text: t.daily_info })] }), /* @__PURE__ */ (0, $.jsx)(tz, {
				rows: o,
				t,
				height: r ? 240 : 300,
				tick: (e) => String(e).slice(5)
			})]
		}),
		a && /* @__PURE__ */ (0, $.jsx)($R, {
			hass: e,
			t,
			locale: n,
			narrow: r,
			d: i
		})
	] });
}
function tz({ rows: e, t, height: n, tick: r, brush: i, zoom: a, setZoom: o }) {
	let [s, c] = (0, S.useState)(null), l = (t) => e.findIndex((e) => e.k === t);
	return /* @__PURE__ */ (0, $.jsx)(El, {
		width: "100%",
		height: n,
		children: /* @__PURE__ */ (0, $.jsxs)(LR, {
			data: e,
			margin: {
				top: 8,
				right: 4,
				left: 0,
				bottom: 0
			},
			onMouseDown: (e) => o && e?.activeLabel && c({
				a: e.activeLabel,
				b: e.activeLabel
			}),
			onMouseMove: (e) => s && e?.activeLabel && c({
				...s,
				b: e.activeLabel
			}),
			onMouseUp: () => {
				if (s && o) {
					let [e, t] = [l(s.a), l(s.b)].sort((e, t) => e - t);
					t > e && o({
						a: e,
						b: t
					});
				}
				c(null);
			},
			onMouseLeave: () => c(null),
			onDoubleClick: () => o?.(null),
			style: {
				cursor: o ? "crosshair" : void 0,
				userSelect: "none"
			},
			children: [
				/* @__PURE__ */ (0, $.jsx)(YN, {
					stroke: "var(--me-line)",
					vertical: !1
				}),
				/* @__PURE__ */ (0, $.jsx)(jI, {
					dataKey: "k",
					tickFormatter: r,
					minTickGap: 24,
					...YR
				}),
				/* @__PURE__ */ (0, $.jsx)(KI, {
					yAxisId: "e",
					width: 44,
					...YR
				}),
				/* @__PURE__ */ (0, $.jsx)(KI, {
					yAxisId: "m",
					orientation: "right",
					width: 44,
					...YR
				}),
				/* @__PURE__ */ (0, $.jsx)(GE, {
					...JR,
					labelFormatter: r,
					formatter: (e, t) => [KR(Number(e), 1), t]
				}),
				/* @__PURE__ */ (0, $.jsx)(Vu, { wrapperStyle: { fontSize: 12 } }),
				/* @__PURE__ */ (0, $.jsx)(uI, {
					yAxisId: "e",
					dataKey: "cons",
					name: `${t.consumption} (kWh)`,
					fill: "#3daee9",
					radius: [
						3,
						3,
						0,
						0
					],
					isAnimationActive: !1
				}),
				/* @__PURE__ */ (0, $.jsx)(uI, {
					yAxisId: "e",
					dataKey: "prod",
					name: `${t.production} (kWh)`,
					fill: "#f5b301",
					radius: [
						3,
						3,
						0,
						0
					],
					isAnimationActive: !1
				}),
				/* @__PURE__ */ (0, $.jsx)($P, {
					yAxisId: "m",
					dataKey: "cost",
					name: `${t.cost} (kr)`,
					stroke: "#e5484d",
					dot: !1,
					strokeWidth: 2,
					isAnimationActive: !1
				}),
				/* @__PURE__ */ (0, $.jsx)($P, {
					yAxisId: "m",
					dataKey: "comp",
					name: `${t.compensation} (kr)`,
					stroke: "#2ec27e",
					dot: !1,
					strokeWidth: 2,
					isAnimationActive: !1
				}),
				s && /* @__PURE__ */ (0, $.jsx)(EM, {
					yAxisId: "e",
					x1: s.a,
					x2: s.b,
					fill: "var(--me-accent)",
					fillOpacity: .15,
					stroke: "var(--me-accent)",
					strokeOpacity: .5
				}),
				i && e.length > 1 && /* @__PURE__ */ (0, $.jsx)(Xj, {
					dataKey: "k",
					height: 22,
					stroke: "var(--me-accent)",
					fill: "var(--me-card)",
					tickFormatter: r,
					travellerWidth: 8,
					startIndex: a?.a ?? 0,
					endIndex: a?.b ?? e.length - 1,
					onChange: (t) => o?.(t.startIndex === 0 && t.endIndex === e.length - 1 ? null : {
						a: t.startIndex,
						b: t.endIndex
					})
				})
			]
		})
	});
}
function nz({ rows: e, t, label: n, title: r }) {
	let i = (t) => e.reduce((e, n) => e + (n[t] ?? 0), 0), a = [
		[
			"cons",
			`${t.consumption} (kWh)`,
			1
		],
		[
			"prod",
			`${t.production} (kWh)`,
			1
		],
		[
			"cost",
			`${t.cost} (kr)`,
			0
		],
		[
			"comp",
			`${t.compensation} (kr)`,
			0
		]
	], o = (e) => (e.comp ?? 0) - (e.cost ?? 0);
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, $.jsx)("h2", { children: r }), /* @__PURE__ */ (0, $.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, $.jsxs)("table", {
				className: "sum",
				children: [
					/* @__PURE__ */ (0, $.jsx)("thead", { children: /* @__PURE__ */ (0, $.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, $.jsx)("th", { children: t.period }),
						a.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)("th", {
							className: "r",
							children: t
						}, e)),
						/* @__PURE__ */ (0, $.jsxs)("th", {
							className: "r",
							children: [
								t.net,
								" (kr)",
								/* @__PURE__ */ (0, $.jsx)(XR, { text: t.wallet_info })
							]
						})
					] }) }),
					/* @__PURE__ */ (0, $.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, $.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, $.jsx)("td", { children: n(e.k) }),
						a.map(([t, , n]) => /* @__PURE__ */ (0, $.jsx)("td", {
							className: "r",
							children: KR(e[t], n)
						}, t)),
						/* @__PURE__ */ (0, $.jsx)("td", {
							className: `r ${o(e) >= 0 ? "pos" : "neg"}`,
							children: az(o(e))
						})
					] }, e.k)) }),
					/* @__PURE__ */ (0, $.jsx)("tfoot", { children: /* @__PURE__ */ (0, $.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, $.jsx)("th", { children: t.total }),
						a.map(([e, , t]) => /* @__PURE__ */ (0, $.jsx)("th", {
							className: "r",
							children: KR(i(e), t)
						}, e)),
						/* @__PURE__ */ (0, $.jsx)("th", {
							className: `r ${i("comp") - i("cost") >= 0 ? "pos" : "neg"}`,
							children: az(i("comp") - i("cost"))
						})
					] }) })
				]
			})
		})]
	});
}
function rz({ hass: e, t, locale: n, narrow: r }) {
	let [i, a] = (0, S.useState)("day"), [o, s] = (0, S.useState)(0), [c, l] = (0, S.useState)(null), [u, d] = (0, S.useState)(null), [f, p] = (0, S.useState)(null), m = (0, S.useMemo)(() => {
		let e = /* @__PURE__ */ new Date(), t, n;
		return i === "hour" ? (t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + o), n = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)) : i === "day" ? (t = new Date(e.getFullYear(), e.getMonth() + o, 1), n = new Date(t.getFullYear(), t.getMonth() + 1, 1)) : (t = new Date(e.getFullYear() + o, 0, 1), n = new Date(t.getFullYear() + 1, 0, 1)), {
			s: t,
			e: n
		};
	}, [i, o]);
	(0, S.useEffect)(() => {
		let t = !0;
		return l(null), d(null), p(null), e.connection.sendMessagePromise({
			type: "malarenergi/series",
			resolution: i,
			start: m.s.toISOString(),
			end: m.e.toISOString()
		}).then((e) => {
			let n = /* @__PURE__ */ new Map(), r = (e) => {
				let t = new Date(e);
				return i === "hour" ? t.toISOString().slice(0, 13) : i === "day" ? qR(e) : qR(new Date(t.getTime() + 1728e5).toISOString()).slice(0, 7);
			}, a = (e, t) => (e ?? []).forEach(([e, i]) => {
				let a = r(e), o = n.get(a) ?? n.set(a, {
					k: a,
					t: e
				}).get(a);
				o[t] = (o[t] ?? 0) + i;
			});
			a(e.CONSUMPTION?.consumption, "cons"), a(e.CONSUMPTION?.cost, "cost"), a(e.PRODUCTION?.production, "prod"), a(e.PRODUCTION?.compensation, "comp"), t && (l([...n.values()].sort((e, t) => e.k.localeCompare(t.k))), p(null));
		}).catch((e) => {
			t && d(e?.message ?? String(e));
		}), () => {
			t = !1;
		};
	}, [i, m.s.getTime()]);
	let h = i === "hour" ? m.s.toLocaleDateString(n, {
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric"
	}) : i === "day" ? m.s.toLocaleDateString(n, {
		month: "long",
		year: "numeric"
	}) : String(m.s.getFullYear()), g = (e) => i === "hour" ? new Date(c?.find((t) => t.k === e)?.t ?? e).toLocaleTimeString(n, { hour: "2-digit" }) : i === "day" ? String(e).slice(8) : (/* @__PURE__ */ new Date(String(e) + "-15")).toLocaleDateString(n, { month: "short" }), _ = (e) => (c ?? []).reduce((t, n) => t + (n[e] ?? 0), 0), v = (e) => i === "hour" ? new Date(c?.find((t) => t.k === e)?.t ?? e).toLocaleTimeString(n, {
		hour: "2-digit",
		minute: "2-digit"
	}) : i === "day" ? new Date(String(e)).toLocaleDateString(n, {
		weekday: "short",
		day: "numeric",
		month: "short"
	}) : (/* @__PURE__ */ new Date(String(e) + "-15")).toLocaleDateString(n, {
		month: "long",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "toolbar",
			children: [/* @__PURE__ */ (0, $.jsx)("div", {
				className: "seg",
				children: [
					"hour",
					"day",
					"month"
				].map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
					className: i === e ? "on" : "",
					onClick: () => {
						a(e), s(0);
					},
					children: t[`res_${e}`]
				}, e))
			}), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "pages",
				children: [
					/* @__PURE__ */ (0, $.jsx)("button", {
						className: "btn",
						onClick: () => s(o - 1),
						"aria-label": t.prev,
						children: "‹"
					}),
					/* @__PURE__ */ (0, $.jsx)("b", {
						className: "range-label",
						children: h
					}),
					/* @__PURE__ */ (0, $.jsx)("button", {
						className: "btn",
						disabled: o >= 0,
						onClick: () => s(o + 1),
						"aria-label": t.next,
						children: "›"
					}),
					o < 0 && /* @__PURE__ */ (0, $.jsx)("button", {
						className: "btn",
						onClick: () => s(0),
						children: t.today
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "kpis",
			children: [
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.consumption} · ${t.total}`,
					value: KR(_("cons"), GR(_("cons")), "kWh"),
					sub: `${t.cost} ${KR(_("cost"), 0, "kr")}`
				}),
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.production} · ${t.total}`,
					value: KR(_("prod"), GR(_("prod")), "kWh"),
					sub: `${t.compensation} ${KR(_("comp"), 0, "kr")}`
				}),
				/* @__PURE__ */ (0, $.jsx)(ZR, {
					label: `${t.net} · ${t.total}`,
					info: t.net_info,
					value: az(_("comp") - _("cost")),
					tone: _("comp") - _("cost") >= 0 ? "pos" : "neg"
				})
			]
		}),
		/* @__PURE__ */ (0, $.jsxs)("section", {
			className: "card",
			children: [
				/* @__PURE__ */ (0, $.jsxs)("h2", { children: [h, /* @__PURE__ */ (0, $.jsx)(XR, { text: t.history_info })] }),
				u ? /* @__PURE__ */ (0, $.jsx)("div", {
					className: "muted",
					children: u
				}) : c ? c.length ? /* @__PURE__ */ (0, $.jsx)(tz, {
					rows: c,
					t,
					height: r ? 260 : 340,
					tick: g,
					brush: !0,
					zoom: f,
					setZoom: p
				}) : /* @__PURE__ */ (0, $.jsx)("div", {
					className: "muted",
					children: t.none
				}) : /* @__PURE__ */ (0, $.jsx)("div", {
					className: "muted",
					children: t.loading
				}),
				c && c.length > 1 && /* @__PURE__ */ (0, $.jsx)("div", {
					className: "muted hint",
					children: t.zoom_hint
				})
			]
		}),
		c && c.length > 0 && f && f.b < c.length && /* @__PURE__ */ (0, $.jsx)(nz, {
			rows: c.slice(f.a, f.b + 1),
			t,
			label: v,
			title: `${t.table_zoom}: ${v(c[f.a].k)} – ${v(c[f.b].k)}`
		}),
		c && c.length > 0 && /* @__PURE__ */ (0, $.jsx)(nz, {
			rows: c,
			t,
			label: v,
			title: `${t.table_full}: ${h}`
		})
	] });
}
var iz = {
	en: "🇬🇧",
	sv: "🇸🇪",
	nb: "🇳🇴",
	da: "🇩🇰",
	fi: "🇫🇮",
	is: "🇮🇸"
}, az = (e, t = 0) => e == null ? "–" : `${e > 0 ? "+" : e < 0 ? "−" : ""}${KR(Math.abs(e), t, "kr")}`;
function oz(e) {
	let t = {};
	for (let n of e) {
		let e = t[n.category] ??= {
			amount: 0,
			kwh: 0,
			byName: {}
		};
		e.amount += n.amount, e.byName[n.name] = (e.byName[n.name] ?? 0) + n.kwh, e.kwh = Math.max(...Object.values(e.byName));
	}
	return t;
}
function sz({ hass: e, t, locale: n, invoices: r, perPage0: i }) {
	let [a, o] = (0, S.useState)(() => Number(localStorage.getItem("me_per_page")) || i), [s, c] = (0, S.useState)(0), [l, u] = (0, S.useState)(null), [d, f] = (0, S.useState)({}), p = a ? Math.max(1, Math.ceil(r.length / a)) : 1, m = (e) => (/* @__PURE__ */ new Date(`${e}-15`)).toLocaleDateString(n, {
		month: "short",
		year: "numeric"
	}), h = (e) => e ? new Date(e).toLocaleDateString(n, {
		day: "numeric",
		month: "short"
	}) : "–", g = r.slice(s * a, a ? (s + 1) * a : void 0).map((e) => e.invoice_id).filter(Boolean);
	(0, S.useEffect)(() => {
		let t = !0, n = () => Promise.all(g.map((t) => e.connection.sendMessagePromise({
			type: "auth/sign_path",
			path: `/api/malarenergi/invoice/${t}`,
			expires: 3600
		}).then((e) => [t, e.path]))).then((e) => {
			t && f(Object.fromEntries(e));
		}).catch(() => void 0);
		n();
		let r = setInterval(n, 18e5);
		return () => {
			t = !1, clearInterval(r);
		};
	}, [g.join(",")]);
	let _ = (/* @__PURE__ */ new Date()).getFullYear(), v = (e) => e.startsWith("production_"), y = (e) => r.filter((e) => e.period_start.startsWith(String(_))).reduce((t, n) => n.lines?.length ? t + n.lines.filter((t) => v(t.category) === (e === "production")).reduce((e, t) => e + t.amount, 0) : t + (n.kind === e ? n.amount ?? 0 : 0), 0);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
		className: "kpis",
		children: [
			/* @__PURE__ */ (0, $.jsx)(ZR, {
				label: `${t.consumption} · ${_}`,
				info: t.wallet_info,
				value: az(-y("consumption"))
			}),
			/* @__PURE__ */ (0, $.jsx)(ZR, {
				label: `${t.production} · ${_}`,
				info: t.wallet_info,
				value: az(-y("production")),
				tone: -y("production") >= 0 ? "pos" : "neg"
			}),
			/* @__PURE__ */ (0, $.jsx)(ZR, {
				label: `${t.net} · ${_}`,
				info: t.wallet_net_info,
				value: az(-(y("consumption") + y("production"))),
				tone: y("consumption") + y("production") <= 0 ? "pos" : "neg"
			})
		]
	}), /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "card",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("h2", { children: [t.invoices, /* @__PURE__ */ (0, $.jsx)(XR, { text: `${t.inv_info} ${t.wallet_info}` })] }),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, $.jsxs)("table", { children: [/* @__PURE__ */ (0, $.jsx)("thead", { children: /* @__PURE__ */ (0, $.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, $.jsx)("th", { children: t.period }),
					/* @__PURE__ */ (0, $.jsx)("th", {}),
					/* @__PURE__ */ (0, $.jsx)("th", {
						className: "r",
						children: t.amount
					}),
					/* @__PURE__ */ (0, $.jsx)("th", {
						className: "r wide",
						children: "kWh"
					}),
					/* @__PURE__ */ (0, $.jsx)("th", {
						className: "r wide",
						children: t.fixed
					}),
					/* @__PURE__ */ (0, $.jsx)("th", {
						className: "r wide",
						children: t.power_fee
					}),
					/* @__PURE__ */ (0, $.jsx)("th", {
						className: "r wide",
						children: t.other
					}),
					/* @__PURE__ */ (0, $.jsx)("th", { children: t.due }),
					/* @__PURE__ */ (0, $.jsx)("th", { children: t.status }),
					/* @__PURE__ */ (0, $.jsx)("th", {})
				] }) }), /* @__PURE__ */ (0, $.jsx)("tbody", { children: r.slice(s * a, a ? (s + 1) * a : void 0).map((e) => {
					let n = e.invoice_id ?? JSON.stringify([
						e.period_start,
						e.period_end,
						e.kind,
						e.issue_date,
						e.due_date,
						e.amount,
						e.utilities,
						(e.lines ?? []).map((e) => [e.name, e.amount])
					]);
					return /* @__PURE__ */ (0, $.jsxs)(S.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("tr", {
						className: "clickable",
						onClick: () => u(l === n ? null : n),
						title: t.show_lines,
						children: [
							/* @__PURE__ */ (0, $.jsxs)("td", { children: [/* @__PURE__ */ (0, $.jsx)("span", {
								className: `chev ${l === n ? "open" : ""}`,
								children: "›"
							}), m(e.period_start.slice(0, 7))] }),
							/* @__PURE__ */ (0, $.jsxs)("td", { children: [/* @__PURE__ */ (0, $.jsx)("span", { className: `dot ${e.kind}` }), /* @__PURE__ */ (0, $.jsx)("span", {
								className: "wide",
								children: e.kind === "production" ? t.production : t.consumption
							})] }),
							/* @__PURE__ */ (0, $.jsx)("td", {
								className: `r ${e.amount < 0 ? "pos" : ""}`,
								children: az(e.amount == null ? null : -e.amount)
							}),
							/* @__PURE__ */ (0, $.jsx)("td", {
								className: "r wide",
								children: KR(e.kwh, 0)
							}),
							/* @__PURE__ */ (0, $.jsx)("td", {
								className: "r wide",
								children: e.fixed ? az(-e.fixed) : "–"
							}),
							/* @__PURE__ */ (0, $.jsx)("td", {
								className: "r wide",
								children: e.power_fee ? az(-e.power_fee) : "–"
							}),
							/* @__PURE__ */ (0, $.jsx)("td", {
								className: "r wide",
								children: e.other ? az(-e.other) : "–"
							}),
							/* @__PURE__ */ (0, $.jsx)("td", { children: h(e.due_date) }),
							/* @__PURE__ */ (0, $.jsx)("td", { children: /* @__PURE__ */ (0, $.jsx)("span", {
								className: `badge ${e.closed ? "ok" : "warn"}`,
								children: e.amount < 0 ? t.credit : e.closed ? t.paid : t.open
							}) }),
							/* @__PURE__ */ (0, $.jsx)("td", { children: d[e.invoice_id] ? /* @__PURE__ */ (0, $.jsx)("a", {
								className: "btn",
								href: d[e.invoice_id],
								target: "_blank",
								rel: "noopener",
								onClick: (e) => e.stopPropagation(),
								children: t.pdf
							}) : /* @__PURE__ */ (0, $.jsx)("button", {
								className: "btn",
								disabled: !0,
								children: t.pdf
							}) })
						]
					}), l === n && /* @__PURE__ */ (0, $.jsx)("tr", {
						className: "lines-row",
						children: /* @__PURE__ */ (0, $.jsx)("td", {
							colSpan: 10,
							children: /* @__PURE__ */ (0, $.jsx)("div", {
								className: "lines",
								children: Object.entries(oz(e.lines ?? [])).sort((e, t) => Math.abs(t[1].amount) - Math.abs(e[1].amount)).map(([e, n]) => /* @__PURE__ */ (0, $.jsxs)("div", {
									className: "line",
									children: [
										/* @__PURE__ */ (0, $.jsx)("span", { children: t[`c_${e}`] ?? e }),
										/* @__PURE__ */ (0, $.jsx)("span", {
											className: "muted",
											children: n.kwh ? `${KR(n.kwh, 0)} kWh` : ""
										}),
										/* @__PURE__ */ (0, $.jsx)("b", {
											className: n.amount < 0 ? "pos" : "",
											children: az(-n.amount, 2)
										})
									]
								}, e))
							})
						})
					})] }, n);
				}) })] })
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "pager",
				children: [/* @__PURE__ */ (0, $.jsxs)("label", { children: [t.per_page, /* @__PURE__ */ (0, $.jsxs)("select", {
					value: a,
					onChange: (e) => {
						let t = Number(e.target.value);
						o(t), c(0), localStorage.setItem("me_per_page", String(t));
					},
					children: [[
						6,
						12,
						24,
						48
					].map((e) => /* @__PURE__ */ (0, $.jsx)("option", {
						value: e,
						children: e
					}, e)), /* @__PURE__ */ (0, $.jsx)("option", {
						value: 0,
						children: t.all
					})]
				})] }), p > 1 && /* @__PURE__ */ (0, $.jsxs)("span", {
					className: "pages",
					children: [
						/* @__PURE__ */ (0, $.jsx)("button", {
							className: "btn",
							disabled: s === 0,
							onClick: () => c(s - 1),
							children: "‹"
						}),
						/* @__PURE__ */ (0, $.jsxs)("span", { children: [
							s + 1,
							" ",
							t.of,
							" ",
							p
						] }),
						/* @__PURE__ */ (0, $.jsx)("button", {
							className: "btn",
							disabled: s >= p - 1,
							onClick: () => c(s + 1),
							children: "›"
						})
					]
				})]
			})
		]
	})] });
}
function cz({ hass: e, t, locale: n }) {
	let [r, i] = (0, S.useState)(null);
	if ((0, S.useEffect)(() => {
		e.connection.sendMessagePromise({ type: "malarenergi/contracts" }).then(i).catch(() => i([]));
	}, []), !r) return /* @__PURE__ */ (0, $.jsx)("div", {
		className: "card",
		children: t.loading
	});
	let a = (e) => e ? new Date(e).toLocaleDateString(n, {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : "", o = (e) => r.filter((t) => t.end === "" === e);
	return /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: [!0, !1].map((e) => o(e).length > 0 && /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, $.jsx)("h2", { children: e ? t.active : t.ended }), /* @__PURE__ */ (0, $.jsx)("div", {
			className: "contracts",
			children: o(e).map((n, r) => /* @__PURE__ */ (0, $.jsxs)("div", {
				className: `contract ${e ? "" : "old"}`,
				children: [
					/* @__PURE__ */ (0, $.jsx)("div", {
						className: "label",
						children: t[`u_${n.utility}`] ?? n.utility
					}),
					/* @__PURE__ */ (0, $.jsx)("div", {
						className: "c-name",
						children: n.product
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "muted",
						children: [
							a(n.start),
							" – ",
							n.end ? a(n.end) : t.until_further
						]
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "chips",
						children: [
							n.fuse && /* @__PURE__ */ (0, $.jsxs)("span", {
								className: "chip",
								children: [
									t.fuse,
									" ",
									n.fuse
								]
							}),
							n.area && /* @__PURE__ */ (0, $.jsxs)("span", {
								className: "chip",
								children: [
									t.area,
									" ",
									n.area
								]
							}),
							n.yearly_kwh && /* @__PURE__ */ (0, $.jsxs)("span", {
								className: "chip",
								children: [KR(n.yearly_kwh, 0), " kWh/år"]
							})
						]
					})
				]
			}, r))
		})]
	}, String(e))) });
}
function lz({ hass: e, t, opts: n, setOpts: r }) {
	let [i, a] = (0, S.useState)([]), [o, s] = (0, S.useState)(null), [c, l] = (0, S.useState)(null), [u, d] = (0, S.useState)(!1), f = (0, S.useRef)(null);
	f.current = c;
	let p = (t) => e.connection.sendMessagePromise({
		type: "malarenergi/reauth_cancel",
		flow_id: t
	}).catch(() => void 0), m = () => {
		c && p(c.flow), l(null), s((e) => e === t.relogin_checking ? null : e);
	}, h = (0, S.useRef)(!0);
	(0, S.useEffect)(() => () => {
		h.current = !1, f.current && p(f.current.flow);
	}, []), (0, S.useEffect)(() => {
		if (!c) return;
		let n = async (n) => {
			if (n.origin !== location.origin || n.data?.malarenergi !== "bankid-complete") return;
			s(t.relogin_checking);
			let r = c.flow, i = () => f.current?.flow === r;
			for (let n = 0; n < 40 && i(); n++) {
				if (await new Promise((e) => setTimeout(e, 1e3)), !i()) return;
				let n = await e.connection.sendMessagePromise({
					type: "malarenergi/reauth_status",
					flow_id: r
				}).catch(() => null);
				if (n?.done && i()) {
					l(null), s(n.ok ? t.relogin_done : t.relogin_failed);
					return;
				}
			}
			i() && (p(r), l(null), s(t.relogin_failed));
		};
		return window.addEventListener("message", n), () => window.removeEventListener("message", n);
	}, [c]), (0, S.useEffect)(() => {
		e.connection.sendMessagePromise({ type: "malarenergi/settings/get" }).then((e) => a(e.notify_services));
	}, []);
	let g = async (n) => {
		r((await e.connection.sendMessagePromise({
			type: "malarenergi/settings/set",
			options: n
		})).options), s(t.saved), setTimeout(() => s(null), 1500);
	}, _ = (e) => /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "setting",
		children: [/* @__PURE__ */ (0, $.jsx)("span", { children: t[e] }), /* @__PURE__ */ (0, $.jsxs)("label", {
			className: "switch",
			children: [/* @__PURE__ */ (0, $.jsx)("input", {
				type: "checkbox",
				checked: !!n[e],
				onChange: (t) => g({ [e]: t.target.checked })
			}), /* @__PURE__ */ (0, $.jsx)("span", {})]
		})]
	}, e), v = n.notify_targets ?? [];
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "settings-grid",
		children: [
			c && /* @__PURE__ */ (0, $.jsx)("div", {
				className: "modal",
				role: "dialog",
				"aria-modal": "true",
				onClick: m,
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "modal-box",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						className: "btn ghost modal-x",
						"aria-label": t.close,
						onClick: m,
						children: "✕"
					}), /* @__PURE__ */ (0, $.jsx)("iframe", {
						src: c.url,
						title: "BankID"
					})]
				})
			}),
			/* @__PURE__ */ (0, $.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, $.jsx)("h2", { children: t.settings_lang }), /* @__PURE__ */ (0, $.jsx)("div", {
					className: "langs",
					role: "radiogroup",
					"aria-label": t.settings_lang,
					children: [
						"auto",
						"en",
						"sv",
						"nb",
						"da",
						"fi",
						"is"
					].map((r) => {
						let i = (n.language ?? "auto") === r, a = HR(e.locale?.language ?? e.language, "auto").code;
						return /* @__PURE__ */ (0, $.jsxs)("button", {
							role: "radio",
							"aria-checked": i,
							className: `lang ${i ? "on" : ""} ${r === "auto" ? "auto" : ""}`,
							onClick: () => g({ language: r }),
							children: [
								/* @__PURE__ */ (0, $.jsx)("span", {
									className: "flag",
									children: r === "auto" ? "🏠" : iz[r]
								}),
								/* @__PURE__ */ (0, $.jsxs)("span", {
									className: "lname",
									children: [r === "auto" ? t.lang_auto : VR[r], r === "auto" && /* @__PURE__ */ (0, $.jsx)("small", { children: VR[a] ?? a })]
								}),
								i && /* @__PURE__ */ (0, $.jsx)("span", {
									className: "check",
									children: "✓"
								})
							]
						}, r);
					})
				})]
			}),
			/* @__PURE__ */ (0, $.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, $.jsx)("h2", { children: t.settings_notify }),
					/* @__PURE__ */ (0, $.jsx)("div", {
						className: "label",
						style: { margin: "4px 0 6px" },
						children: t.notify_targets
					}),
					i.length === 0 ? /* @__PURE__ */ (0, $.jsx)("div", {
						className: "muted",
						children: t.none_found
					}) : i.map((e) => /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "setting",
						children: [/* @__PURE__ */ (0, $.jsx)("span", { children: e.replace(/^mobile_app_/, "📱 ") }), /* @__PURE__ */ (0, $.jsxs)("label", {
							className: "switch",
							children: [/* @__PURE__ */ (0, $.jsx)("input", {
								type: "checkbox",
								checked: v.includes(e),
								onChange: (t) => g({ notify_targets: t.target.checked ? [...v, e] : v.filter((t) => t !== e) })
							}), /* @__PURE__ */ (0, $.jsx)("span", {})]
						})]
					}, e)),
					!v.some((e) => i.includes(e)) && /* @__PURE__ */ (0, $.jsx)("div", {
						className: "muted",
						style: { marginTop: 6 },
						children: t.no_targets
					}),
					/* @__PURE__ */ (0, $.jsx)("div", {
						className: "label",
						style: { margin: "12px 0 6px" },
						children: t.settings_notify
					}),
					[
						"notify_new_invoice",
						"notify_overdue",
						"notify_han_change",
						"notify_auth"
					].map(_)
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, $.jsx)("h2", { children: t.settings_account }),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "setting",
						children: [/* @__PURE__ */ (0, $.jsxs)("span", { children: [t.relogin, /* @__PURE__ */ (0, $.jsx)(XR, { text: t.relogin_info })] }), /* @__PURE__ */ (0, $.jsx)("button", {
							className: "btn",
							disabled: u || !!c,
							onClick: async () => {
								d(!0);
								try {
									let n = await e.connection.sendMessagePromise({ type: "malarenergi/reauth" });
									if (!h.current) {
										n?.flow_id && p(n.flow_id);
										return;
									}
									n?.url && n?.flow_id ? l({
										url: n.url,
										flow: n.flow_id
									}) : s(t.relogin_started);
								} finally {
									h.current && d(!1);
								}
							},
							children: "BankID"
						})]
					}),
					_("show_powerhub"),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "setting",
						children: [/* @__PURE__ */ (0, $.jsx)("span", { children: t.invoices_per_page }), /* @__PURE__ */ (0, $.jsx)("select", {
							className: "sel",
							value: n.invoices_per_page ?? 12,
							onChange: (e) => g({ invoices_per_page: Number(e.target.value) }),
							children: [
								6,
								12,
								24,
								48
							].map((e) => /* @__PURE__ */ (0, $.jsx)("option", {
								value: e,
								children: e
							}, e))
						})]
					})
				]
			}),
			o && /* @__PURE__ */ (0, $.jsx)("div", {
				className: "toast",
				children: o
			})
		]
	});
}
//#endregion
//#region src/styles.css?inline
var uz = ":host{--me-bg:var(--primary-background-color,#f4f6f9);--me-card:var(--card-background-color,#fff);--me-text:var(--primary-text-color,#1d2330);--me-muted:var(--secondary-text-color,#6b7484);--me-line:color-mix(in srgb, var(--me-muted) 18%, transparent);--me-accent:var(--primary-color,#03a9f4);--me-pos:#2ec27e;--me-neg:#e5484d;--me-radius:16px;display:block}*{box-sizing:border-box}.page{max-width:1480px;min-height:100vh;color:var(--me-text);font:14px/1.45 var(--paper-font-body1_-_font-family,Inter, Roboto, system-ui, sans-serif);background:var(--me-bg);margin:0 auto;padding:20px 28px 56px}.page.narrow{padding:10px 10px 40px}header{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;display:flex}.brand{align-items:center;gap:8px;display:flex}h1{letter-spacing:-.02em;margin:0;font-size:26px;font-weight:600}h2{align-items:center;gap:6px;margin:0;font-size:15px;font-weight:600;display:flex}.menu{color:inherit;cursor:pointer;background:0 0;border:0;font-size:22px}.tabs,.seg{background:var(--me-card);border:1px solid var(--me-line);border-radius:999px;gap:2px;max-width:100%;padding:4px;display:inline-flex;overflow-x:auto}.tabs button,.seg button{color:var(--me-muted);font:inherit;cursor:pointer;white-space:nowrap;background:0 0;border:0;border-radius:999px;padding:7px 14px;font-weight:500;transition:background .15s,color .15s}.tabs button:hover,.seg button:hover{color:var(--me-text)}.tabs button.on,.seg button.on{background:var(--me-accent);color:var(--text-primary-color,#fff)}.card{background:var(--me-card);border-radius:var(--me-radius);border:1px solid var(--me-line);margin-bottom:16px;padding:18px;box-shadow:0 1px 2px #0000000a,0 8px 24px -12px #0000001f}.card.error{color:var(--me-neg)}.card-head{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;display:flex}.grid-overview{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);align-items:start;gap:16px;display:grid}.narrow .grid-overview,.narrow .two{grid-template-columns:1fr}@media (width<=1000px){.grid-overview,.two{grid-template-columns:1fr}}.side .card{margin-bottom:16px}.two{grid-template-columns:1fr 1fr;gap:16px;display:grid}.kpis{grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px;margin-bottom:16px;display:grid}.kpis>.stat{background:var(--me-card);border:1px solid var(--me-line);border-radius:var(--me-radius);padding:14px 16px}.kpis.compact{margin-bottom:4px}.kpis.compact>.stat{padding:8px 12px}.stats-2{grid-template-columns:1fr 1fr;gap:12px;display:grid}.settings-grid{grid-template-columns:repeat(auto-fit,minmax(340px,1fr));align-items:start;gap:16px;display:grid}.settings-grid .card{margin-bottom:0}.label{color:var(--me-muted);align-items:center;gap:4px;font-size:12px;font-weight:500;display:flex}.value{letter-spacing:-.02em;margin:2px 0;font-size:26px;font-weight:600}.value:first-letter{text-transform:uppercase}.pos{color:var(--me-pos)}.neg{color:var(--me-neg)}.muted{color:var(--me-muted);font-size:12.5px}.big{letter-spacing:-.02em;margin-bottom:10px;font-size:30px;font-weight:600}.big small{color:var(--me-muted);font-size:15px;font-weight:500}.row-between{flex-wrap:wrap;justify-content:space-between;gap:8px;margin-top:8px;display:flex}.badge{background:color-mix(in srgb, var(--me-accent) 15%, transparent);color:var(--me-accent);border-radius:999px;align-items:center;gap:4px;padding:3px 4px 3px 10px;font-size:12px;font-weight:500;display:inline-flex}.plan-chip{background:color-mix(in srgb, var(--me-accent) 8%, transparent);border-radius:12px;align-items:center;gap:8px;margin:14px 0 4px;padding:10px 12px;font-size:13.5px;display:flex}.legend{color:var(--me-muted);flex-wrap:wrap;gap:14px;margin-bottom:8px;font-size:12px;display:flex}.dot{border-radius:50%;flex:none;width:9px;height:9px;margin-right:6px;display:inline-block}table{border-collapse:collapse;font-variant-numeric:tabular-nums;width:100%;font-size:13.5px}th{text-align:left;color:var(--me-muted);font-size:12px;font-weight:500}th,td{border-bottom:1px solid var(--me-line);padding:8px 6px}tr:last-child td{border-bottom:0}.money td:not(:first-child),.money th:not(:first-child){text-align:right}.money.compact{margin-top:12px}.meter{background:var(--me-line);border-radius:999px;height:10px;overflow:hidden}.meter>div{border-radius:999px;height:100%;transition:width .4s}.info{display:inline-flex;position:relative}.info-btn{border:1px solid var(--me-muted);width:17px;height:17px;color:var(--me-muted);cursor:pointer;opacity:.7;background:0 0;border-radius:50%;place-items:center;padding:0;font:italic 600 10px/1 Georgia,serif;display:inline-grid}.info-btn:hover{opacity:1;color:var(--me-accent);border-color:var(--me-accent)}.pop{z-index:20;background:var(--me-card);width:min(300px,80vw);color:var(--me-text);border:1px solid var(--me-line);text-transform:none;letter-spacing:0;border-radius:12px;padding:12px 14px;font-size:12.5px;font-weight:400;line-height:1.5;position:absolute;top:24px;left:50%;transform:translate(-50%);box-shadow:0 12px 32px -8px #00000059}.setting{border-bottom:1px solid var(--me-line);justify-content:space-between;align-items:center;gap:12px;padding:9px 0;display:flex}.setting:last-child{border-bottom:0}.num{align-items:center;gap:6px;display:inline-flex}.num em{color:var(--me-muted);min-width:52px;font-size:12px;font-style:normal}.num input{width:96px;font:inherit;color:inherit;background:var(--me-bg);border:1px solid var(--me-line);text-align:right;border-radius:10px;padding:6px 10px}.num input:focus{outline:2px solid var(--me-accent);outline-offset:-1px}.switch{flex:none;width:40px;height:22px;position:relative}.switch input{opacity:0;width:0;height:0}.switch span{background:var(--me-line);cursor:pointer;border-radius:999px;transition:all .2s;position:absolute;inset:0}.switch span:before{content:\"\";background:#fff;border-radius:50%;width:16px;height:16px;transition:all .2s;position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #0000004d}.switch input:checked+span{background:var(--me-accent)}.switch input:checked+span:before{transform:translate(18px)}.flow-card{padding:8px}.flow{width:100%;height:auto;display:block}.flow-line{fill:none;stroke:var(--me-muted);stroke-width:3px;stroke-linecap:round}.house-shape{fill:color-mix(in srgb, var(--me-accent) 5%, transparent);stroke:var(--me-line);stroke-width:2px;stroke-linejoin:round}.node-bg{fill:var(--me-card);stroke-width:2px;stroke-opacity:.35}.node-val{text-anchor:middle;fill:var(--me-text);font-size:15px;font-weight:600}.node-sub{text-anchor:middle;fill:var(--me-muted);font-size:10.5px}.node-label{text-anchor:middle;fill:var(--me-muted);font-size:12.5px;font-weight:500}.recharts-cartesian-axis-tick-value{fill:var(--me-muted)}.recharts-legend-item-text{color:var(--me-muted)!important}.settings-grid .seg{border-radius:14px;flex-wrap:wrap}.range{width:100%;accent-color:var(--me-accent);margin:10px 0 14px}.be{grid-template-columns:1fr 1fr;gap:16px;display:grid}.phases{gap:10px;display:grid}.phases .row-between{margin:0 0 4px}.stack{border-top:1px solid var(--me-line);gap:6px;margin-top:14px;padding-top:12px;display:grid}.row{align-items:center;gap:8px;display:flex}.btn{border:1px solid var(--me-line);background:var(--me-bg);color:var(--me-text);font:inherit;cursor:pointer;border-radius:10px;padding:6px 12px}.btn.primary{background:var(--me-accent);color:var(--text-primary-color,#fff);border-color:#0000}.btn:disabled{opacity:.45;cursor:default}.btn.ghost{color:var(--me-muted);background:0 0;border:0}table.edit input{width:100%;min-width:80px;font:inherit;color:inherit;background:var(--me-bg);border:1px solid var(--me-line);border-radius:8px;padding:6px 8px}table.edit input:focus{outline:2px solid var(--me-accent);outline-offset:-1px}.tabs,.seg{scrollbar-width:none}.tabs::-webkit-scrollbar{display:none}.seg::-webkit-scrollbar{display:none}.narrow .node-val{font-size:22px}.narrow .node-sub{font-size:15px}.narrow .node-label{font-size:17px}.narrow .flow-card{padding:4px}.narrow .kpis{gap:10px}.narrow .value{font-size:22px}.narrow header{margin-bottom:12px}.narrow .tabs{width:100%}.chips{flex-wrap:wrap;gap:8px;display:flex}.chip{border:1px solid var(--me-line);color:var(--me-muted);border-radius:999px;padding:4px 10px;font-size:12px}.chip.ok{color:var(--me-pos);border-color:color-mix(in srgb, var(--me-pos) 40%, transparent)}.kpi{background:var(--me-card);border:1px solid var(--me-line);border-radius:var(--me-radius);padding:14px 16px}.table-wrap{overflow-x:auto}td.r,th.r{text-align:right}.dot.production{background:#f5b301}.dot.consumption{background:#3daee9}.badge.ok{background:color-mix(in srgb, var(--me-pos) 15%, transparent);color:var(--me-pos);padding:3px 8px}.badge.warn{color:#e5a50a;background:#e5a50a2e;padding:3px 8px}h2{margin-bottom:12px}td,th{white-space:nowrap}.page{container-type:inline-size}@container (width<=760px){.wide{display:none}}.pager{color:var(--me-muted);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-top:12px;font-size:13px;display:flex}.pager label{align-items:center;gap:8px;display:inline-flex}.pager select{background:var(--me-bg);color:var(--me-text);border:1px solid var(--me-line);font:inherit;border-radius:8px;padding:4px 8px}.pages{align-items:center;gap:10px;display:inline-flex}.brand{flex-wrap:wrap;align-items:center;gap:14px;display:flex}.toolbar{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;display:flex}.range-label{text-align:center;text-transform:capitalize;min-width:150px}.seg.wrap{border-radius:14px;flex-wrap:wrap}.foot{margin-top:8px}.contracts{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;display:grid}.contract{border:1px solid var(--me-line);background:var(--me-bg);border-radius:14px;gap:4px;padding:14px;display:grid}.contract.old{opacity:.6}.c-name{font-size:16px;font-weight:600}.sel{background:var(--me-bg);color:var(--me-text);border:1px solid var(--me-line);font:inherit;border-radius:10px;padding:6px 10px}.toast{background:var(--me-accent);color:#fff;z-index:50;border-radius:999px;padding:10px 18px;font-weight:500;position:fixed;bottom:24px;left:50%;transform:translate(-50%);box-shadow:0 8px 24px -8px #0006}.recharts-brush-texts text{fill:var(--me-muted);font-size:10px}tr.clickable{cursor:pointer}tr.clickable:hover td{background:color-mix(in srgb, var(--me-accent) 5%, transparent)}.chev{width:14px;color:var(--me-muted);transition:transform .15s;display:inline-block}.chev.open{transform:rotate(90deg)}.lines-row td{background:var(--me-bg);padding:10px 16px}.lines{gap:6px;max-width:520px;display:grid}.line{grid-template-columns:1fr auto 110px;align-items:center;gap:12px;font-size:13px;display:grid}.line b{text-align:right;font-variant-numeric:tabular-nums}.langs{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;display:grid}.lang{cursor:pointer;text-align:left;border:1px solid var(--me-line);background:var(--me-bg);color:var(--me-text);font:inherit;border-radius:12px;align-items:center;gap:10px;padding:10px 12px;transition:border-color .15s,background .15s;display:flex}.lang:hover{border-color:color-mix(in srgb, var(--me-accent) 50%, transparent)}.lang.on{border-color:var(--me-accent);background:color-mix(in srgb, var(--me-accent) 14%, transparent)}.lang.auto{grid-column:1/-1}.lang .flag{font-size:20px;line-height:1}.lang .lname{flex-direction:column;flex:1;display:flex}.lang .lname small{color:var(--me-muted);font-size:12px}.lang .check{color:var(--me-accent);font-weight:700}.hint{margin-top:6px;font-size:12px}table.sum tfoot th{border-top:2px solid var(--me-line)}table.sum td,table.sum th{white-space:nowrap}a.btn{text-decoration:none;display:inline-block}.modal{z-index:10;background:#0000008c;place-items:center;padding:16px;display:grid;position:fixed;inset:0}.modal-box{background:#0f1724;border-radius:18px;width:min(420px,100%);height:min(640px,92vh);position:relative;overflow:hidden;box-shadow:0 20px 60px #0006}.modal-box iframe{border:0;width:100%;height:100%}.modal-x{z-index:1;color:#e8eef6;position:absolute;top:8px;right:8px}", dz = class extends HTMLElement {
	root;
	_hass;
	_narrow = !1;
	set hass(e) {
		this._hass = e, this.render();
	}
	set narrow(e) {
		this._narrow = e, this.render();
	}
	connectedCallback() {
		if (this.root) return;
		let e = this.shadowRoot ?? this.attachShadow({ mode: "open" });
		e.replaceChildren();
		let t = document.createElement("style");
		t.textContent = uz;
		let n = document.createElement("div");
		e.append(t, n), this.root = (0, RR.createRoot)(n), this.render();
	}
	disconnectedCallback() {
		this.root?.unmount(), this.root = void 0;
	}
	render() {
		this.root && this._hass && this.root.render(/* @__PURE__ */ (0, $.jsx)(QR, {
			hass: this._hass,
			narrow: this._narrow
		}));
	}
};
customElements.get("malarenergi-panel") || customElements.define("malarenergi-panel", dz);
//#endregion
