import * as de from "react";
import Ge, { forwardRef as _r, useRef as K, useState as ae, useCallback as Z, useEffect as ne, useMemo as wr } from "react";
function xr(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var be = { exports: {} }, ve = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Tr() {
  if (Be) return ve;
  Be = 1;
  var n = Ge, c = Symbol.for("react.element"), o = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, y = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(i, d, x) {
    var u, R = {}, E = null, M = null;
    x !== void 0 && (E = "" + x), d.key !== void 0 && (E = "" + d.key), d.ref !== void 0 && (M = d.ref);
    for (u in d) f.call(d, u) && !s.hasOwnProperty(u) && (R[u] = d[u]);
    if (i && i.defaultProps) for (u in d = i.defaultProps, d) R[u] === void 0 && (R[u] = d[u]);
    return { $$typeof: c, type: i, key: E, ref: M, props: R, _owner: y.current };
  }
  return ve.Fragment = o, ve.jsx = l, ve.jsxs = l, ve;
}
var pe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function Or() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Ge, c = Symbol.for("react.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), i = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), z = Symbol.iterator, q = "@@iterator";
    function S(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = z && e[z] || e[q];
      return typeof r == "function" ? r : null;
    }
    var P = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function g(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        D("error", e, t);
      }
    }
    function D(e, r, t) {
      {
        var a = P.ReactDebugCurrentFrame, _ = a.getStackAddendum();
        _ !== "" && (r += "%s", t = t.concat([_]));
        var O = t.map(function(m) {
          return String(m);
        });
        O.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, O);
      }
    }
    var B = !1, F = !1, Y = !1, re = !1, w = !1, T;
    T = Symbol.for("react.module.reference");
    function C(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === s || w || e === y || e === x || e === u || re || e === M || B || F || Y || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === R || e.$$typeof === l || e.$$typeof === i || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === T || e.getModuleId !== void 0));
    }
    function p(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var _ = r.displayName || r.name || "";
      return _ !== "" ? t + "(" + _ + ")" : t;
    }
    function b(e) {
      return e.displayName || "Context";
    }
    function v(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case o:
          return "Portal";
        case s:
          return "Profiler";
        case y:
          return "StrictMode";
        case x:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case i:
            var r = e;
            return b(r) + ".Consumer";
          case l:
            var t = e;
            return b(t._context) + ".Provider";
          case d:
            return p(e, e.render, "ForwardRef");
          case R:
            var a = e.displayName || null;
            return a !== null ? a : v(e.type) || "Memo";
          case E: {
            var _ = e, O = _._payload, m = _._init;
            try {
              return v(m(O));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, V = 0, G, $, L, te, le, j, W;
    function J() {
    }
    J.__reactDisabledLog = !0;
    function X() {
      {
        if (V === 0) {
          G = console.log, $ = console.info, L = console.warn, te = console.error, le = console.group, j = console.groupCollapsed, W = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: J,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        V++;
      }
    }
    function ie() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: G
            }),
            info: k({}, e, {
              value: $
            }),
            warn: k({}, e, {
              value: L
            }),
            error: k({}, e, {
              value: te
            }),
            group: k({}, e, {
              value: le
            }),
            groupCollapsed: k({}, e, {
              value: j
            }),
            groupEnd: k({}, e, {
              value: W
            })
          });
        }
        V < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ee = P.ReactCurrentDispatcher, Ee;
    function he(e, r, t) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (_) {
            var a = _.stack.trim().match(/\n( *(at )?)/);
            Ee = a && a[1] || "";
          }
        return `
` + Ee + e;
      }
    }
    var _e = !1, ge;
    {
      var Xe = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new Xe();
    }
    function Ce(e, r) {
      if (!e || _e)
        return "";
      {
        var t = ge.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      _e = !0;
      var _ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var O;
      O = ee.current, ee.current = null, X();
      try {
        if (r) {
          var m = function() {
            throw Error();
          };
          if (Object.defineProperty(m.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(m, []);
            } catch (H) {
              a = H;
            }
            Reflect.construct(e, [], m);
          } else {
            try {
              m.call();
            } catch (H) {
              a = H;
            }
            e.call(m.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (H) {
            a = H;
          }
          e();
        }
      } catch (H) {
        if (H && a && typeof H.stack == "string") {
          for (var h = H.stack.split(`
`), U = a.stack.split(`
`), I = h.length - 1, A = U.length - 1; I >= 1 && A >= 0 && h[I] !== U[A]; )
            A--;
          for (; I >= 1 && A >= 0; I--, A--)
            if (h[I] !== U[A]) {
              if (I !== 1 || A !== 1)
                do
                  if (I--, A--, A < 0 || h[I] !== U[A]) {
                    var Q = `
` + h[I].replace(" at new ", " at ");
                    return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), typeof e == "function" && ge.set(e, Q), Q;
                  }
                while (I >= 1 && A >= 0);
              break;
            }
        }
      } finally {
        _e = !1, ee.current = O, ie(), Error.prepareStackTrace = _;
      }
      var ue = e ? e.displayName || e.name : "", se = ue ? he(ue) : "";
      return typeof e == "function" && ge.set(e, se), se;
    }
    function Qe(e, r, t) {
      return Ce(e, !1);
    }
    function Ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function me(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ce(e, Ze(e));
      if (typeof e == "string")
        return he(e);
      switch (e) {
        case x:
          return he("Suspense");
        case u:
          return he("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Qe(e.render);
          case R:
            return me(e.type, r, t);
          case E: {
            var a = e, _ = a._payload, O = a._init;
            try {
              return me(O(_), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var fe = Object.prototype.hasOwnProperty, ke = {}, Ie = P.ReactDebugCurrentFrame;
    function ye(e) {
      if (e) {
        var r = e._owner, t = me(e.type, e._source, r ? r.type : null);
        Ie.setExtraStackFrame(t);
      } else
        Ie.setExtraStackFrame(null);
    }
    function er(e, r, t, a, _) {
      {
        var O = Function.call.bind(fe);
        for (var m in e)
          if (O(e, m)) {
            var h = void 0;
            try {
              if (typeof e[m] != "function") {
                var U = Error((a || "React class") + ": " + t + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw U.name = "Invariant Violation", U;
              }
              h = e[m](r, m, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (I) {
              h = I;
            }
            h && !(h instanceof Error) && (ye(_), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, m, typeof h), ye(null)), h instanceof Error && !(h.message in ke) && (ke[h.message] = !0, ye(_), g("Failed %s type: %s", t, h.message), ye(null));
          }
      }
    }
    var rr = Array.isArray;
    function we(e) {
      return rr(e);
    }
    function tr(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function nr(e) {
      try {
        return De(e), !1;
      } catch {
        return !0;
      }
    }
    function De(e) {
      return "" + e;
    }
    function $e(e) {
      if (nr(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(e)), De(e);
    }
    var Ae = P.ReactCurrentOwner, sr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ne, Me;
    function ar(e) {
      if (fe.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ir(e) {
      if (fe.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function or(e, r) {
      typeof e.ref == "string" && Ae.current;
    }
    function ur(e, r) {
      {
        var t = function() {
          Ne || (Ne = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function cr(e, r) {
      {
        var t = function() {
          Me || (Me = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var lr = function(e, r, t, a, _, O, m) {
      var h = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: m,
        // Record the component responsible for creating this element.
        _owner: O
      };
      return h._store = {}, Object.defineProperty(h._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(h, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(h, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: _
      }), Object.freeze && (Object.freeze(h.props), Object.freeze(h)), h;
    };
    function fr(e, r, t, a, _) {
      {
        var O, m = {}, h = null, U = null;
        t !== void 0 && ($e(t), h = "" + t), ir(r) && ($e(r.key), h = "" + r.key), ar(r) && (U = r.ref, or(r, _));
        for (O in r)
          fe.call(r, O) && !sr.hasOwnProperty(O) && (m[O] = r[O]);
        if (e && e.defaultProps) {
          var I = e.defaultProps;
          for (O in I)
            m[O] === void 0 && (m[O] = I[O]);
        }
        if (h || U) {
          var A = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          h && ur(m, A), U && cr(m, A);
        }
        return lr(e, h, U, _, a, Ae.current, m);
      }
    }
    var xe = P.ReactCurrentOwner, Fe = P.ReactDebugCurrentFrame;
    function oe(e) {
      if (e) {
        var r = e._owner, t = me(e.type, e._source, r ? r.type : null);
        Fe.setExtraStackFrame(t);
      } else
        Fe.setExtraStackFrame(null);
    }
    var Te;
    Te = !1;
    function Oe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === c;
    }
    function Ve() {
      {
        if (xe.current) {
          var e = v(xe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function dr(e) {
      return "";
    }
    var We = {};
    function vr(e) {
      {
        var r = Ve();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function ze(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = vr(r);
        if (We[t])
          return;
        We[t] = !0;
        var a = "";
        e && e._owner && e._owner !== xe.current && (a = " It was passed a child from " + v(e._owner.type) + "."), oe(e), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), oe(null);
      }
    }
    function Ye(e, r) {
      {
        if (typeof e != "object")
          return;
        if (we(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            Oe(a) && ze(a, r);
          }
        else if (Oe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var _ = S(e);
          if (typeof _ == "function" && _ !== e.entries)
            for (var O = _.call(e), m; !(m = O.next()).done; )
              Oe(m.value) && ze(m.value, r);
        }
      }
    }
    function pr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = v(r);
          er(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !Te) {
          Te = !0;
          var _ = v(r);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _ || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function hr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            oe(e), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), oe(null);
            break;
          }
        }
        e.ref !== null && (oe(e), g("Invalid attribute `ref` supplied to `React.Fragment`."), oe(null));
      }
    }
    var Le = {};
    function Ue(e, r, t, a, _, O) {
      {
        var m = C(e);
        if (!m) {
          var h = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var U = dr();
          U ? h += U : h += Ve();
          var I;
          e === null ? I = "null" : we(e) ? I = "array" : e !== void 0 && e.$$typeof === c ? (I = "<" + (v(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : I = typeof e, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", I, h);
        }
        var A = fr(e, r, t, _, O);
        if (A == null)
          return A;
        if (m) {
          var Q = r.children;
          if (Q !== void 0)
            if (a)
              if (we(Q)) {
                for (var ue = 0; ue < Q.length; ue++)
                  Ye(Q[ue], e);
                Object.freeze && Object.freeze(Q);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ye(Q, e);
        }
        if (fe.call(r, "key")) {
          var se = v(e), H = Object.keys(r).filter(function(Er) {
            return Er !== "key";
          }), Se = H.length > 0 ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Le[se + Se]) {
            var Rr = H.length > 0 ? "{" + H.join(": ..., ") + ": ...}" : "{}";
            g(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Se, se, Rr, se), Le[se + Se] = !0;
          }
        }
        return e === f ? hr(A) : pr(A), A;
      }
    }
    function gr(e, r, t) {
      return Ue(e, r, t, !0);
    }
    function mr(e, r, t) {
      return Ue(e, r, t, !1);
    }
    var yr = mr, br = gr;
    pe.Fragment = f, pe.jsx = yr, pe.jsxs = br;
  }()), pe;
}
var qe;
function Sr() {
  return qe || (qe = 1, process.env.NODE_ENV === "production" ? be.exports = Tr() : be.exports = Or()), be.exports;
}
var N = Sr(), je = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var Je;
function jr() {
  return Je || (Je = 1, function(n) {
    (function() {
      var c = {}.hasOwnProperty;
      function o() {
        for (var s = "", l = 0; l < arguments.length; l++) {
          var i = arguments[l];
          i && (s = y(s, f(i)));
        }
        return s;
      }
      function f(s) {
        if (typeof s == "string" || typeof s == "number")
          return s;
        if (typeof s != "object")
          return "";
        if (Array.isArray(s))
          return o.apply(null, s);
        if (s.toString !== Object.prototype.toString && !s.toString.toString().includes("[native code]"))
          return s.toString();
        var l = "";
        for (var i in s)
          c.call(s, i) && s[i] && (l = y(l, i));
        return l;
      }
      function y(s, l) {
        return l ? s ? s + " " + l : s + l : s;
      }
      n.exports ? (o.default = o, n.exports = o) : window.classNames = o;
    })();
  }(je)), je.exports;
}
var Pr = jr();
const ce = /* @__PURE__ */ xr(Pr), Wr = ({
  type: n = "default",
  size: c = "middle",
  shape: o = "default",
  loading: f = !1,
  disabled: y = !1,
  danger: s = !1,
  block: l = !1,
  icon: i,
  htmlType: d = "button",
  className: x,
  children: u,
  ...R
}) => {
  const E = "verney-btn", M = ce(E, x, {
    [`${E}-${n}`]: n,
    [`${E}-${o}`]: o !== "default",
    [`${E}-${c}`]: c !== "middle",
    [`${E}-loading`]: f,
    [`${E}-danger`]: s,
    [`${E}-block`]: l,
    [`${E}-disabled`]: y
  }), z = f ? /* @__PURE__ */ N.jsx("span", { className: `${E}-loading-icon` }) : i;
  return /* @__PURE__ */ N.jsxs(
    "button",
    {
      ...R,
      type: d,
      className: M,
      disabled: y || f,
      children: [
        z,
        u && /* @__PURE__ */ N.jsx("span", { children: u })
      ]
    }
  );
}, Cr = _r((n, c) => {
  const {
    className: o,
    size: f = "middle",
    disabled: y = !1,
    status: s,
    bordered: l = !0,
    prefix: i,
    suffix: d,
    allowClear: x,
    ...u
  } = n, R = ce(
    "verney-input",
    {
      [`verney-input-${f}`]: f,
      "verney-input-disabled": y,
      [`verney-input-${s}`]: s,
      "verney-input-borderless": !l
    },
    o
  );
  return /* @__PURE__ */ N.jsxs("div", { className: "verney-input-wrapper", children: [
    i && /* @__PURE__ */ N.jsx("span", { className: "verney-input-prefix", children: i }),
    /* @__PURE__ */ N.jsx(
      "input",
      {
        ref: c,
        className: R,
        disabled: y,
        ...u
      }
    ),
    (d || x) && /* @__PURE__ */ N.jsxs("span", { className: "verney-input-suffix", children: [
      x && u.value && /* @__PURE__ */ N.jsx(
        "button",
        {
          type: "button",
          className: "verney-input-clear-icon",
          onClick: () => {
            if (u.onChange) {
              const E = new Event("input", {
                bubbles: !0
              });
              E.target = { value: "" }, u.onChange(E);
            }
          },
          children: "×"
        }
      ),
      d
    ] })
  ] });
});
Cr.displayName = "Input";
var Pe = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new WeakMap(), Ke = 0, kr = void 0;
function Ir(n) {
  return n ? (Re.has(n) || (Ke += 1, Re.set(n, Ke.toString())), Re.get(n)) : "0";
}
function Dr(n) {
  return Object.keys(n).sort().filter(
    (c) => n[c] !== void 0
  ).map((c) => `${c}_${c === "root" ? Ir(n.root) : n[c]}`).toString();
}
function $r(n) {
  const c = Dr(n);
  let o = Pe.get(c);
  if (!o) {
    const f = /* @__PURE__ */ new Map();
    let y;
    const s = new IntersectionObserver((l) => {
      l.forEach((i) => {
        var d;
        const x = i.isIntersecting && y.some((u) => i.intersectionRatio >= u);
        n.trackVisibility && typeof i.isVisible > "u" && (i.isVisible = x), (d = f.get(i.target)) == null || d.forEach((u) => {
          u(x, i);
        });
      });
    }, n);
    y = s.thresholds || (Array.isArray(n.threshold) ? n.threshold : [n.threshold || 0]), o = {
      id: c,
      observer: s,
      elements: f
    }, Pe.set(c, o);
  }
  return o;
}
function Ar(n, c, o = {}, f = kr) {
  if (typeof window.IntersectionObserver > "u" && f !== void 0) {
    const d = n.getBoundingClientRect();
    return c(f, {
      isIntersecting: f,
      target: n,
      intersectionRatio: typeof o.threshold == "number" ? o.threshold : 0,
      time: 0,
      boundingClientRect: d,
      intersectionRect: d,
      rootBounds: d
    }), () => {
    };
  }
  const { id: y, observer: s, elements: l } = $r(o), i = l.get(n) || [];
  return l.has(n) || l.set(n, i), i.push(c), s.observe(n), function() {
    i.splice(i.indexOf(c), 1), i.length === 0 && (l.delete(n), s.unobserve(n)), l.size === 0 && (s.disconnect(), Pe.delete(y));
  };
}
function Nr({
  threshold: n,
  delay: c,
  trackVisibility: o,
  rootMargin: f,
  root: y,
  triggerOnce: s,
  skip: l,
  initialInView: i,
  fallbackInView: d,
  onChange: x
} = {}) {
  var u;
  const [R, E] = de.useState(null), M = de.useRef(x), [z, q] = de.useState({
    inView: !!i,
    entry: void 0
  });
  M.current = x, de.useEffect(
    () => {
      if (l || !R) return;
      let D;
      return D = Ar(
        R,
        (B, F) => {
          q({
            inView: B,
            entry: F
          }), M.current && M.current(B, F), F.isIntersecting && s && D && (D(), D = void 0);
        },
        {
          root: y,
          rootMargin: f,
          threshold: n,
          // @ts-ignore
          trackVisibility: o,
          // @ts-ignore
          delay: c
        },
        d
      ), () => {
        D && D();
      };
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string, so it won't change between renders.
      Array.isArray(n) ? n.toString() : n,
      R,
      y,
      f,
      s,
      l,
      o,
      d,
      c
    ]
  );
  const S = (u = z.entry) == null ? void 0 : u.target, P = de.useRef(void 0);
  !R && S && !s && !l && P.current !== S && (P.current = S, q({
    inView: !!i,
    entry: void 0
  }));
  const g = [E, z.inView, z.entry];
  return g.ref = g[0], g.inView = g[1], g.entry = g[2], g;
}
const Mr = ({
  dataSource: n = [],
  columns: c = 2,
  gutter: o = 16,
  defaultItemHeight: f = 200,
  enableAnimation: y = !0,
  animationDuration: s = 300,
  animationEasing: l = "ease-out",
  renderItem: i,
  className: d,
  style: x,
  loading: u = !1,
  hasMore: R = !0,
  onLoadMore: E,
  loadingComponent: M = "加载中...",
  noMoreComponent: z = "没有更多了"
}) => {
  const q = K(null), [S, P] = ae([]), [g, D] = ae([]), [B, F] = ae([]), Y = K(/* @__PURE__ */ new Map()), re = K(!1), w = K(u), T = K(
    null
  ), C = K(/* @__PURE__ */ new Set()), p = K({
    tasks: [],
    isProcessing: !1
  }), b = Z((j) => {
    p.current.tasks.push(j), p.current.isProcessing || v();
  }, []), v = Z(async () => {
    if (p.current.isProcessing || p.current.tasks.length === 0)
      return;
    p.current.isProcessing = !0;
    const j = p.current.tasks[0];
    try {
      await j(), p.current.tasks.shift(), p.current.isProcessing = !1, p.current.tasks.length > 0 && v();
    } catch (W) {
      console.error("Task execution failed:", W), p.current.isProcessing = !1;
    }
  }, []), k = Z((j) => async () => {
    const W = j.filter(
      (J, X) => !C.current.has(X)
    );
    return W.length > 0 && F((J) => [...J, ...W]), new Promise((J) => {
      const X = () => {
        C.current.size === j.length ? J() : setTimeout(X, 100);
      };
      X();
    });
  }, []), V = Z(() => {
    T.current && clearTimeout(T.current), T.current = setTimeout(() => {
      !w.current && R && E && !p.current.isProcessing && b(async () => {
        w.current = !0, await E();
      });
    }, 200);
  }, [R, E, b]);
  ne(() => {
    S.length !== c && (P(new Array(c).fill(0)), D(new Array(c).fill(0).map(() => [])), C.current.clear(), Y.current.clear());
    const j = k(n);
    b(j);
  }, [
    c,
    n,
    k,
    b,
    S.length
  ]), ne(() => {
    w.current = u;
  }, [u]);
  const { ref: G, inView: $ } = Nr({
    threshold: 1,
    // 改为1，表示完全可见时才触发
    rootMargin: "0px"
    // 改为0px，不再提前触发
  });
  ne(() => (console.log("loadMoreInView", $), $ && V(), () => {
    T.current && clearTimeout(T.current);
  }), [$, V]);
  const L = Z(() => {
    const j = Math.min(...S);
    return S.indexOf(j);
  }, [S]), te = Z(
    (j, W, J) => {
      if (Y.current.get(j) === W) return;
      const X = Y.current.get(j) || 0;
      Y.current.set(j, W), C.current.add(j), P((ie) => {
        const ee = [...ie];
        return ee[J] = ee[J] - X + W, ee;
      }), re.current = !1;
    },
    []
  ), le = Z(() => {
    if (re.current || B.length === 0) return;
    re.current = !0;
    const j = L();
    if (j > -1) {
      const [W, ...J] = B, X = n.indexOf(W);
      if (C.current.has(X)) {
        F(J), re.current = !1;
        return;
      }
      F(J), D((ie) => {
        const ee = [...ie];
        return ee[j] = [
          ...ee[j],
          /* @__PURE__ */ N.jsx(
            Fr,
            {
              item: W,
              index: X,
              columnIndex: j,
              gutter: o,
              defaultItemHeight: f,
              enableAnimation: y,
              animationDuration: s,
              animationEasing: l,
              renderItem: i,
              updateColumnHeight: te
            },
            X
          )
        ], ee;
      });
    }
  }, [
    B,
    S,
    o,
    i,
    n,
    L,
    f,
    te,
    y,
    s,
    l
  ]);
  return ne(() => {
    re.current || le();
  }, [le, B, re.current]), /* @__PURE__ */ N.jsxs(
    "div",
    {
      ref: q,
      className: ce("verney-waterfall", d),
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${c}, 1fr)`,
        gap: o,
        ...x
      },
      children: [
        g.map((j, W) => /* @__PURE__ */ N.jsx("div", { className: "verney-waterfall-column", children: j }, W)),
        /* @__PURE__ */ N.jsx(
          "div",
          {
            ref: G,
            className: "verney-waterfall-loader",
            style: {
              width: "100%",
              pointerEvents: "none"
            },
            children: u ? M : !R && z
          }
        )
      ]
    }
  );
};
Mr.displayName = "Waterfall";
const Fr = ({
  item: n,
  index: c,
  columnIndex: o,
  gutter: f,
  defaultItemHeight: y,
  enableAnimation: s = !0,
  animationDuration: l = 300,
  animationEasing: i = "ease-out",
  updateColumnHeight: d,
  renderItem: x
}) => {
  const u = K(null), [R, E] = ae(!1), [M, z] = ae(!1), q = K(null), S = K(!1), P = Z(() => {
    if (!S.current && u.current) {
      S.current = !0;
      const g = u.current.offsetHeight;
      g > 0 && (d(c, g, o), s ? setTimeout(() => z(!0), 50) : z(!0));
    }
  }, [c, o, d, s]);
  return ne(() => {
    if (!u.current) return;
    const g = u.current.getElementsByTagName("img");
    if (q.current = setTimeout(() => {
      !S.current && u.current && P();
    }, 200), g.length === 0) {
      P();
      return;
    }
    let D = 0;
    const B = g.length, F = () => {
      D++, D === B && u.current && (E(!0), P());
    };
    return Array.from(g).forEach((Y) => {
      Y.complete ? F() : (Y.addEventListener("load", F), Y.addEventListener("error", F));
    }), () => {
      q.current && clearTimeout(q.current), Array.from(g).forEach((Y) => {
        Y.removeEventListener("load", F), Y.removeEventListener("error", F);
      });
    };
  }, [c, o, y, P]), /* @__PURE__ */ N.jsx(
    "div",
    {
      ref: u,
      className: "verney-waterfall-item",
      style: {
        marginBottom: f,
        opacity: M ? 1 : 0,
        transform: M ? "none" : "translateY(20px)",
        transition: s ? `opacity ${l}ms ${i}, transform ${l}ms ${i}` : "none"
      },
      children: x == null ? void 0 : x(n, c)
    }
  );
}, zr = ({
  items: n,
  height: c,
  columnCount: o = 1,
  mode: f = "list",
  estimatedItemHeight: y = 50,
  overscan: s = 3,
  loadMoreThreshold: l = 100,
  onLoadMore: i,
  renderItem: d,
  isLoading: x = !1,
  className: u
}) => {
  const R = K(null), [E, M] = ae(0), [z, q] = ae(0), S = K({
    measuredDataMap: {},
    lastMeasuredItemIndex: -1
  }), P = K([]);
  ne(() => {
    P.current = new Array(o).fill(0);
  }, [o]), ne(() => {
    S.current = {
      measuredDataMap: {},
      lastMeasuredItemIndex: -1
    }, P.current = new Array(o).fill(0), q((w) => w + 1);
  }, [n, o]);
  const g = Z(() => {
    const { measuredDataMap: w, lastMeasuredItemIndex: T } = S.current;
    let C = 0, p = 0;
    if (T >= 0) {
      const v = w[T];
      C = v.offset + v.size;
    }
    const b = n.length - (T + 1);
    return p = C + b * y, p;
  }, [n.length, y]), D = Z(
    (w) => {
      const { measuredDataMap: T, lastMeasuredItemIndex: C } = S.current;
      if (w > C) {
        if (f === "waterfall") {
          const p = Math.min(...P.current), b = P.current.indexOf(p), v = y, k = p;
          T[w] = {
            size: v,
            offset: k,
            column: b
          }, P.current[b] = k + v;
        } else {
          let p = 0;
          if (C >= 0) {
            const b = T[C];
            p = b.offset + b.size;
          }
          T[w] = {
            size: y,
            offset: p,
            column: 0
          };
        }
        S.current.lastMeasuredItemIndex = w;
      }
      return T[w] || {
        size: y,
        offset: 0,
        column: 0
      };
    },
    [y, f, o]
  ), B = Z(() => {
    var G;
    if (!R.current) return { start: 0, end: 0 };
    const { clientHeight: w, scrollTop: T } = R.current, { measuredDataMap: C } = S.current;
    let p = 0, b = n.length - 1;
    for (; p <= b; ) {
      const $ = Math.floor((p + b) / 2), L = D($);
      if (!L) {
        p = $ + 1;
        continue;
      }
      if (typeof L.offset > "u") {
        p = $ + 1;
        continue;
      }
      if (L.offset < T) {
        if (L.offset + L.size > T) {
          p = $;
          break;
        }
        p = $ + 1;
      } else
        b = $ - 1;
    }
    let v = p, k = ((G = C[p]) == null ? void 0 : G.offset) || 0;
    for (; v < n.length && k < T + w; ) {
      const $ = D(v);
      k = $.offset + $.size, v++;
    }
    const V = Math.max(0, p - s);
    return v = Math.min(n.length - 1, v + s), {
      start: V,
      end: v
    };
  }, [n.length, s, D]), F = Z(() => {
    if (!R.current) return;
    const { scrollTop: w, scrollHeight: T, clientHeight: C } = R.current;
    M(w), i && !x && T - w - C < l && i();
  }, [i, x, l]), Y = wr(() => {
    const w = B(), T = w ? w.start : 0, C = w ? w.end : 0, p = [];
    for (let b = T; b <= C; b++) {
      const v = D(b), k = n[b];
      if (!k) continue;
      const V = f === "waterfall" ? {
        width: `${100 / o}%`,
        position: "absolute",
        left: `${((v == null ? void 0 : v.column) || 0) * 100 / o}%`,
        top: `${(v == null ? void 0 : v.offset) || 0}px`,
        padding: "8px",
        boxSizing: "border-box"
      } : {
        position: "absolute",
        left: 0,
        right: 0,
        top: `${(v == null ? void 0 : v.offset) || 0}px`,
        padding: "8px",
        boxSizing: "border-box"
      };
      p.push(
        /* @__PURE__ */ N.jsx(
          "div",
          {
            className: ce("verney-virtual-list-item", {
              "verney-virtual-list-item-waterfall": f === "waterfall"
            }),
            "data-index": b,
            style: V,
            children: d(k, b)
          },
          b
        )
      );
    }
    return p;
  }, [
    n,
    E,
    z,
    o,
    f,
    d,
    D,
    B
  ]);
  ne(() => {
    if (!R.current) return;
    const w = new ResizeObserver((C) => {
      let p = !1;
      C.forEach((b) => {
        var k;
        const v = Number(b.target.getAttribute("data-index"));
        if (!isNaN(v)) {
          const V = ((k = S.current.measuredDataMap[v]) == null ? void 0 : k.size) || 0, G = b.contentRect.height;
          if (V !== G) {
            const $ = S.current.measuredDataMap[v];
            if ($.size = G, f === "waterfall" && $.column !== void 0)
              P.current[$.column] += G - V;
            else
              for (let L = v + 1; L <= S.current.lastMeasuredItemIndex; L++) {
                const te = S.current.measuredDataMap[L];
                te && (te.offset += G - V);
              }
            p = !0;
          }
        }
      }), p && q((b) => b + 1);
    }), T = R.current.getElementsByClassName(
      "verney-virtual-list-item"
    );
    return Array.from(T).forEach((C) => {
      w.observe(C);
    }), () => {
      w.disconnect();
    };
  }, [E, f]);
  const re = g();
  return /* @__PURE__ */ N.jsx("div", { className: "verney-virtual-list", children: /* @__PURE__ */ N.jsxs(
    "div",
    {
      ref: R,
      className: ce(
        "verney-virtual-list-container",
        u
      ),
      style: { height: c, width: "100%" },
      onScroll: F,
      children: [
        /* @__PURE__ */ N.jsx(
          "div",
          {
            className: "verney-virtual-list-content",
            style: { height: re, width: "100%" },
            children: /* @__PURE__ */ N.jsx(
              "div",
              {
                className: ce("verney-virtual-list-items", {
                  "verney-virtual-list-items-waterfall": f === "waterfall"
                }),
                style: { width: "100%", position: "relative" },
                children: Y
              }
            )
          }
        ),
        x && /* @__PURE__ */ N.jsx("div", { className: "verney-virtual-list-loading", children: "加载中..." })
      ]
    }
  ) });
};
export {
  Wr as Button,
  Cr as Input,
  zr as VirtualList,
  Mr as Waterfall
};
//# sourceMappingURL=index.mjs.map
