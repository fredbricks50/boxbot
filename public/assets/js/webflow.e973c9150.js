/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
    var Hy = Object.create;
    var Pn = Object.defineProperty;
    var Wy = Object.getOwnPropertyDescriptor;
    var zy = Object.getOwnPropertyNames;
    var jy = Object.getPrototypeOf,
        Ky = Object.prototype.hasOwnProperty;
    var ye = (e, t) => () => (e && (t = e((e = 0))), t);
    var f = (e, t) => () => (
            t || e((t = { exports: {} }).exports, t), t.exports
        ),
        Ne = (e, t) => {
            for (var n in t) Pn(e, n, { get: t[n], enumerable: !0 });
        },
        fa = (e, t, n, r) => {
            if ((t && typeof t == "object") || typeof t == "function")
                for (let i of zy(t))
                    !Ky.call(e, i) &&
                        i !== n &&
                        Pn(e, i, {
                            get: () => t[i],
                            enumerable: !(r = Wy(t, i)) || r.enumerable,
                        });
            return e;
        };
    var le = (e, t, n) => (
            (n = e != null ? Hy(jy(e)) : {}),
            fa(
                t || !e || !e.__esModule
                    ? Pn(n, "default", { value: e, enumerable: !0 })
                    : n,
                e
            )
        ),
        Ye = (e) => fa(Pn({}, "__esModule", { value: !0 }), e);
    var da = f(() => {
        "use strict";
        (function () {
            if (typeof window > "u") return;
            let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
                t = e ? parseInt(e[1], 10) >= 16 : !1;
            if ("objectFit" in document.documentElement.style && !t) {
                window.objectFitPolyfill = function () {
                    return !1;
                };
                return;
            }
            let r = function (a) {
                    let u = window.getComputedStyle(a, null),
                        c = u.getPropertyValue("position"),
                        y = u.getPropertyValue("overflow"),
                        g = u.getPropertyValue("display");
                    (!c || c === "static") && (a.style.position = "relative"),
                        y !== "hidden" && (a.style.overflow = "hidden"),
                        (!g || g === "inline") && (a.style.display = "block"),
                        a.clientHeight === 0 && (a.style.height = "100%"),
                        a.className.indexOf("object-fit-polyfill") === -1 &&
                            (a.className += " object-fit-polyfill");
                },
                i = function (a) {
                    let u = window.getComputedStyle(a, null),
                        c = {
                            "max-width": "none",
                            "max-height": "none",
                            "min-width": "0px",
                            "min-height": "0px",
                            top: "auto",
                            right: "auto",
                            bottom: "auto",
                            left: "auto",
                            "margin-top": "0px",
                            "margin-right": "0px",
                            "margin-bottom": "0px",
                            "margin-left": "0px",
                        };
                    for (let y in c)
                        u.getPropertyValue(y) !== c[y] && (a.style[y] = c[y]);
                },
                o = function (a) {
                    let u = a.parentNode;
                    r(u),
                        i(a),
                        (a.style.position = "absolute"),
                        (a.style.height = "100%"),
                        (a.style.width = "auto"),
                        a.clientWidth > u.clientWidth
                            ? ((a.style.top = "0"),
                              (a.style.marginTop = "0"),
                              (a.style.left = "50%"),
                              (a.style.marginLeft = a.clientWidth / -2 + "px"))
                            : ((a.style.width = "100%"),
                              (a.style.height = "auto"),
                              (a.style.left = "0"),
                              (a.style.marginLeft = "0"),
                              (a.style.top = "50%"),
                              (a.style.marginTop = a.clientHeight / -2 + "px"));
                },
                s = function (a) {
                    if (typeof a > "u" || a instanceof Event)
                        a = document.querySelectorAll("[data-object-fit]");
                    else if (a && a.nodeName) a = [a];
                    else if (typeof a == "object" && a.length && a[0].nodeName)
                        a = a;
                    else return !1;
                    for (let u = 0; u < a.length; u++) {
                        if (!a[u].nodeName) continue;
                        let c = a[u].nodeName.toLowerCase();
                        if (c === "img") {
                            if (t) continue;
                            a[u].complete
                                ? o(a[u])
                                : a[u].addEventListener("load", function () {
                                      o(this);
                                  });
                        } else
                            c === "video"
                                ? a[u].readyState > 0
                                    ? o(a[u])
                                    : a[u].addEventListener(
                                          "loadedmetadata",
                                          function () {
                                              o(this);
                                          }
                                      )
                                : o(a[u]);
                    }
                    return !0;
                };
            document.readyState === "loading"
                ? document.addEventListener("DOMContentLoaded", s)
                : s(),
                window.addEventListener("resize", s),
                (window.objectFitPolyfill = s);
        })();
    });
    var pa = f(() => {
        "use strict";
        (function () {
            if (typeof window > "u") return;
            function e(r) {
                Webflow.env("design") ||
                    ($("video").each(function () {
                        r && $(this).prop("autoplay")
                            ? this.play()
                            : this.pause();
                    }),
                    $(".w-background-video--control").each(function () {
                        r ? n($(this)) : t($(this));
                    }));
            }
            function t(r) {
                r.find("> span").each(function (i) {
                    $(this).prop("hidden", () => i === 0);
                });
            }
            function n(r) {
                r.find("> span").each(function (i) {
                    $(this).prop("hidden", () => i === 1);
                });
            }
            $(document).ready(() => {
                let r = window.matchMedia("(prefers-reduced-motion: reduce)");
                r.addEventListener("change", (i) => {
                    e(!i.matches);
                }),
                    r.matches && e(!1),
                    $("video:not([autoplay])").each(function () {
                        $(this)
                            .parent()
                            .find(".w-background-video--control")
                            .each(function () {
                                t($(this));
                            });
                    }),
                    $(document).on(
                        "click",
                        ".w-background-video--control",
                        function (i) {
                            if (Webflow.env("design")) return;
                            let o = $(i.currentTarget),
                                s = $(`video#${o.attr("aria-controls")}`).get(
                                    0
                                );
                            if (s)
                                if (s.paused) {
                                    let a = s.play();
                                    n(o),
                                        a &&
                                            typeof a.catch == "function" &&
                                            a.catch(() => {
                                                t(o);
                                            });
                                } else s.pause(), t(o);
                        }
                    );
            });
        })();
    });
    var jr = f(() => {
        "use strict";
        window.tram = (function (e) {
            function t(l, v) {
                var T = new me.Bare();
                return T.init(l, v);
            }
            function n(l) {
                return l.replace(/[A-Z]/g, function (v) {
                    return "-" + v.toLowerCase();
                });
            }
            function r(l) {
                var v = parseInt(l.slice(1), 16),
                    T = (v >> 16) & 255,
                    w = (v >> 8) & 255,
                    N = 255 & v;
                return [T, w, N];
            }
            function i(l, v, T) {
                return (
                    "#" +
                    ((1 << 24) | (l << 16) | (v << 8) | T).toString(16).slice(1)
                );
            }
            function o() {}
            function s(l, v) {
                c(
                    "Type warning: Expected: [" +
                        l +
                        "] Got: [" +
                        typeof v +
                        "] " +
                        v
                );
            }
            function a(l, v, T) {
                c("Units do not match [" + l + "]: " + v + ", " + T);
            }
            function u(l, v, T) {
                if ((v !== void 0 && (T = v), l === void 0)) return T;
                var w = T;
                return (
                    ut.test(l) || !Ke.test(l)
                        ? (w = parseInt(l, 10))
                        : Ke.test(l) && (w = 1e3 * parseFloat(l)),
                    0 > w && (w = 0),
                    w === w ? w : T
                );
            }
            function c(l) {
                Y.debug && window && window.console.warn(l);
            }
            function y(l) {
                for (var v = -1, T = l ? l.length : 0, w = []; ++v < T; ) {
                    var N = l[v];
                    N && w.push(N);
                }
                return w;
            }
            var g = (function (l, v, T) {
                    function w(ne) {
                        return typeof ne == "object";
                    }
                    function N(ne) {
                        return typeof ne == "function";
                    }
                    function L() {}
                    function J(ne, ee) {
                        function k() {
                            var Oe = new ie();
                            return (
                                N(Oe.init) && Oe.init.apply(Oe, arguments), Oe
                            );
                        }
                        function ie() {}
                        ee === T && ((ee = ne), (ne = Object)), (k.Bare = ie);
                        var ae,
                            _e = (L[l] = ne[l]),
                            qe = (ie[l] = k[l] = new L());
                        return (
                            (qe.constructor = k),
                            (k.mixin = function (Oe) {
                                return (ie[l] = k[l] = J(k, Oe)[l]), k;
                            }),
                            (k.open = function (Oe) {
                                if (
                                    ((ae = {}),
                                    N(Oe)
                                        ? (ae = Oe.call(k, qe, _e, k, ne))
                                        : w(Oe) && (ae = Oe),
                                    w(ae))
                                )
                                    for (var en in ae)
                                        v.call(ae, en) && (qe[en] = ae[en]);
                                return N(qe.init) || (qe.init = ne), k;
                            }),
                            k.open(ee)
                        );
                    }
                    return J;
                })("prototype", {}.hasOwnProperty),
                p = {
                    ease: [
                        "ease",
                        function (l, v, T, w) {
                            var N = (l /= w) * l,
                                L = N * l;
                            return (
                                v +
                                T *
                                    (-2.75 * L * N +
                                        11 * N * N +
                                        -15.5 * L +
                                        8 * N +
                                        0.25 * l)
                            );
                        },
                    ],
                    "ease-in": [
                        "ease-in",
                        function (l, v, T, w) {
                            var N = (l /= w) * l,
                                L = N * l;
                            return (
                                v +
                                T * (-1 * L * N + 3 * N * N + -3 * L + 2 * N)
                            );
                        },
                    ],
                    "ease-out": [
                        "ease-out",
                        function (l, v, T, w) {
                            var N = (l /= w) * l,
                                L = N * l;
                            return (
                                v +
                                T *
                                    (0.3 * L * N +
                                        -1.6 * N * N +
                                        2.2 * L +
                                        -1.8 * N +
                                        1.9 * l)
                            );
                        },
                    ],
                    "ease-in-out": [
                        "ease-in-out",
                        function (l, v, T, w) {
                            var N = (l /= w) * l,
                                L = N * l;
                            return (
                                v + T * (2 * L * N + -5 * N * N + 2 * L + 2 * N)
                            );
                        },
                    ],
                    linear: [
                        "linear",
                        function (l, v, T, w) {
                            return (T * l) / w + v;
                        },
                    ],
                    "ease-in-quad": [
                        "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
                        function (l, v, T, w) {
                            return T * (l /= w) * l + v;
                        },
                    ],
                    "ease-out-quad": [
                        "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                        function (l, v, T, w) {
                            return -T * (l /= w) * (l - 2) + v;
                        },
                    ],
                    "ease-in-out-quad": [
                        "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
                        function (l, v, T, w) {
                            return (l /= w / 2) < 1
                                ? (T / 2) * l * l + v
                                : (-T / 2) * (--l * (l - 2) - 1) + v;
                        },
                    ],
                    "ease-in-cubic": [
                        "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                        function (l, v, T, w) {
                            return T * (l /= w) * l * l + v;
                        },
                    ],
                    "ease-out-cubic": [
                        "cubic-bezier(0.215, 0.610, 0.355, 1)",
                        function (l, v, T, w) {
                            return T * ((l = l / w - 1) * l * l + 1) + v;
                        },
                    ],
                    "ease-in-out-cubic": [
                        "cubic-bezier(0.645, 0.045, 0.355, 1)",
                        function (l, v, T, w) {
                            return (l /= w / 2) < 1
                                ? (T / 2) * l * l * l + v
                                : (T / 2) * ((l -= 2) * l * l + 2) + v;
                        },
                    ],
                    "ease-in-quart": [
                        "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
                        function (l, v, T, w) {
                            return T * (l /= w) * l * l * l + v;
                        },
                    ],
                    "ease-out-quart": [
                        "cubic-bezier(0.165, 0.840, 0.440, 1)",
                        function (l, v, T, w) {
                            return -T * ((l = l / w - 1) * l * l * l - 1) + v;
                        },
                    ],
                    "ease-in-out-quart": [
                        "cubic-bezier(0.770, 0, 0.175, 1)",
                        function (l, v, T, w) {
                            return (l /= w / 2) < 1
                                ? (T / 2) * l * l * l * l + v
                                : (-T / 2) * ((l -= 2) * l * l * l - 2) + v;
                        },
                    ],
                    "ease-in-quint": [
                        "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
                        function (l, v, T, w) {
                            return T * (l /= w) * l * l * l * l + v;
                        },
                    ],
                    "ease-out-quint": [
                        "cubic-bezier(0.230, 1, 0.320, 1)",
                        function (l, v, T, w) {
                            return (
                                T * ((l = l / w - 1) * l * l * l * l + 1) + v
                            );
                        },
                    ],
                    "ease-in-out-quint": [
                        "cubic-bezier(0.860, 0, 0.070, 1)",
                        function (l, v, T, w) {
                            return (l /= w / 2) < 1
                                ? (T / 2) * l * l * l * l * l + v
                                : (T / 2) * ((l -= 2) * l * l * l * l + 2) + v;
                        },
                    ],
                    "ease-in-sine": [
                        "cubic-bezier(0.470, 0, 0.745, 0.715)",
                        function (l, v, T, w) {
                            return (
                                -T * Math.cos((l / w) * (Math.PI / 2)) + T + v
                            );
                        },
                    ],
                    "ease-out-sine": [
                        "cubic-bezier(0.390, 0.575, 0.565, 1)",
                        function (l, v, T, w) {
                            return T * Math.sin((l / w) * (Math.PI / 2)) + v;
                        },
                    ],
                    "ease-in-out-sine": [
                        "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
                        function (l, v, T, w) {
                            return (
                                (-T / 2) * (Math.cos((Math.PI * l) / w) - 1) + v
                            );
                        },
                    ],
                    "ease-in-expo": [
                        "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
                        function (l, v, T, w) {
                            return l === 0
                                ? v
                                : T * Math.pow(2, 10 * (l / w - 1)) + v;
                        },
                    ],
                    "ease-out-expo": [
                        "cubic-bezier(0.190, 1, 0.220, 1)",
                        function (l, v, T, w) {
                            return l === w
                                ? v + T
                                : T * (-Math.pow(2, (-10 * l) / w) + 1) + v;
                        },
                    ],
                    "ease-in-out-expo": [
                        "cubic-bezier(1, 0, 0, 1)",
                        function (l, v, T, w) {
                            return l === 0
                                ? v
                                : l === w
                                ? v + T
                                : (l /= w / 2) < 1
                                ? (T / 2) * Math.pow(2, 10 * (l - 1)) + v
                                : (T / 2) * (-Math.pow(2, -10 * --l) + 2) + v;
                        },
                    ],
                    "ease-in-circ": [
                        "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
                        function (l, v, T, w) {
                            return -T * (Math.sqrt(1 - (l /= w) * l) - 1) + v;
                        },
                    ],
                    "ease-out-circ": [
                        "cubic-bezier(0.075, 0.820, 0.165, 1)",
                        function (l, v, T, w) {
                            return T * Math.sqrt(1 - (l = l / w - 1) * l) + v;
                        },
                    ],
                    "ease-in-out-circ": [
                        "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
                        function (l, v, T, w) {
                            return (l /= w / 2) < 1
                                ? (-T / 2) * (Math.sqrt(1 - l * l) - 1) + v
                                : (T / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) +
                                      v;
                        },
                    ],
                    "ease-in-back": [
                        "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
                        function (l, v, T, w, N) {
                            return (
                                N === void 0 && (N = 1.70158),
                                T * (l /= w) * l * ((N + 1) * l - N) + v
                            );
                        },
                    ],
                    "ease-out-back": [
                        "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                        function (l, v, T, w, N) {
                            return (
                                N === void 0 && (N = 1.70158),
                                T *
                                    ((l = l / w - 1) * l * ((N + 1) * l + N) +
                                        1) +
                                    v
                            );
                        },
                    ],
                    "ease-in-out-back": [
                        "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
                        function (l, v, T, w, N) {
                            return (
                                N === void 0 && (N = 1.70158),
                                (l /= w / 2) < 1
                                    ? (T / 2) *
                                          l *
                                          l *
                                          (((N *= 1.525) + 1) * l - N) +
                                      v
                                    : (T / 2) *
                                          ((l -= 2) *
                                              l *
                                              (((N *= 1.525) + 1) * l + N) +
                                              2) +
                                      v
                            );
                        },
                    ],
                },
                h = {
                    "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
                    "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
                    "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
                },
                m = document,
                _ = window,
                b = "bkwld-tram",
                I = /[\-\.0-9]/g,
                S = /[A-Z]/,
                A = "number",
                C = /^(rgb|#)/,
                D = /(em|cm|mm|in|pt|pc|px)$/,
                P = /(em|cm|mm|in|pt|pc|px|%)$/,
                B = /(deg|rad|turn)$/,
                H = "unitless",
                W = /(all|none) 0s ease 0s/,
                j = /^(width|height)$/,
                G = " ",
                O = m.createElement("a"),
                E = ["Webkit", "Moz", "O", "ms"],
                R = ["-webkit-", "-moz-", "-o-", "-ms-"],
                M = function (l) {
                    if (l in O.style) return { dom: l, css: l };
                    var v,
                        T,
                        w = "",
                        N = l.split("-");
                    for (v = 0; v < N.length; v++)
                        w += N[v].charAt(0).toUpperCase() + N[v].slice(1);
                    for (v = 0; v < E.length; v++)
                        if (((T = E[v] + w), T in O.style))
                            return { dom: T, css: R[v] + l };
                },
                X = (t.support = {
                    bind: Function.prototype.bind,
                    transform: M("transform"),
                    transition: M("transition"),
                    backface: M("backface-visibility"),
                    timing: M("transition-timing-function"),
                });
            if (X.transition) {
                var Z = X.timing.dom;
                if (((O.style[Z] = p["ease-in-back"][0]), !O.style[Z]))
                    for (var Q in h) p[Q][0] = h[Q];
            }
            var se = (t.frame = (function () {
                    var l =
                        _.requestAnimationFrame ||
                        _.webkitRequestAnimationFrame ||
                        _.mozRequestAnimationFrame ||
                        _.oRequestAnimationFrame ||
                        _.msRequestAnimationFrame;
                    return l && X.bind
                        ? l.bind(_)
                        : function (v) {
                              _.setTimeout(v, 16);
                          };
                })()),
                he = (t.now = (function () {
                    var l = _.performance,
                        v = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
                    return v && X.bind
                        ? v.bind(l)
                        : Date.now ||
                              function () {
                                  return +new Date();
                              };
                })()),
                Se = g(function (l) {
                    function v(te, ce) {
                        var Ee = y(("" + te).split(G)),
                            fe = Ee[0];
                        ce = ce || {};
                        var xe = U[fe];
                        if (!xe) return c("Unsupported property: " + fe);
                        if (!ce.weak || !this.props[fe]) {
                            var Ve = xe[0],
                                Le = this.props[fe];
                            return (
                                Le || (Le = this.props[fe] = new Ve.Bare()),
                                Le.init(this.$el, Ee, xe, ce),
                                Le
                            );
                        }
                    }
                    function T(te, ce, Ee) {
                        if (te) {
                            var fe = typeof te;
                            if (
                                (ce ||
                                    (this.timer && this.timer.destroy(),
                                    (this.queue = []),
                                    (this.active = !1)),
                                fe == "number" && ce)
                            )
                                return (
                                    (this.timer = new oe({
                                        duration: te,
                                        context: this,
                                        complete: L,
                                    })),
                                    void (this.active = !0)
                                );
                            if (fe == "string" && ce) {
                                switch (te) {
                                    case "hide":
                                        k.call(this);
                                        break;
                                    case "stop":
                                        J.call(this);
                                        break;
                                    case "redraw":
                                        ie.call(this);
                                        break;
                                    default:
                                        v.call(this, te, Ee && Ee[1]);
                                }
                                return L.call(this);
                            }
                            if (fe == "function")
                                return void te.call(this, this);
                            if (fe == "object") {
                                var xe = 0;
                                qe.call(
                                    this,
                                    te,
                                    function (Ie, By) {
                                        Ie.span > xe && (xe = Ie.span),
                                            Ie.stop(),
                                            Ie.animate(By);
                                    },
                                    function (Ie) {
                                        "wait" in Ie && (xe = u(Ie.wait, 0));
                                    }
                                ),
                                    _e.call(this),
                                    xe > 0 &&
                                        ((this.timer = new oe({
                                            duration: xe,
                                            context: this,
                                        })),
                                        (this.active = !0),
                                        ce && (this.timer.complete = L));
                                var Ve = this,
                                    Le = !1,
                                    Cn = {};
                                se(function () {
                                    qe.call(Ve, te, function (Ie) {
                                        Ie.active &&
                                            ((Le = !0),
                                            (Cn[Ie.name] = Ie.nextStyle));
                                    }),
                                        Le && Ve.$el.css(Cn);
                                });
                            }
                        }
                    }
                    function w(te) {
                        (te = u(te, 0)),
                            this.active
                                ? this.queue.push({ options: te })
                                : ((this.timer = new oe({
                                      duration: te,
                                      context: this,
                                      complete: L,
                                  })),
                                  (this.active = !0));
                    }
                    function N(te) {
                        return this.active
                            ? (this.queue.push({
                                  options: te,
                                  args: arguments,
                              }),
                              void (this.timer.complete = L))
                            : c(
                                  "No active transition timer. Use start() or wait() before then()."
                              );
                    }
                    function L() {
                        if (
                            (this.timer && this.timer.destroy(),
                            (this.active = !1),
                            this.queue.length)
                        ) {
                            var te = this.queue.shift();
                            T.call(this, te.options, !0, te.args);
                        }
                    }
                    function J(te) {
                        this.timer && this.timer.destroy(),
                            (this.queue = []),
                            (this.active = !1);
                        var ce;
                        typeof te == "string"
                            ? ((ce = {}), (ce[te] = 1))
                            : (ce =
                                  typeof te == "object" && te != null
                                      ? te
                                      : this.props),
                            qe.call(this, ce, Oe),
                            _e.call(this);
                    }
                    function ne(te) {
                        J.call(this, te), qe.call(this, te, en, Vy);
                    }
                    function ee(te) {
                        typeof te != "string" && (te = "block"),
                            (this.el.style.display = te);
                    }
                    function k() {
                        J.call(this), (this.el.style.display = "none");
                    }
                    function ie() {
                        this.el.offsetHeight;
                    }
                    function ae() {
                        J.call(this),
                            e.removeData(this.el, b),
                            (this.$el = this.el = null);
                    }
                    function _e() {
                        var te,
                            ce,
                            Ee = [];
                        this.upstream && Ee.push(this.upstream);
                        for (te in this.props)
                            (ce = this.props[te]),
                                ce.active && Ee.push(ce.string);
                        (Ee = Ee.join(",")),
                            this.style !== Ee &&
                                ((this.style = Ee),
                                (this.el.style[X.transition.dom] = Ee));
                    }
                    function qe(te, ce, Ee) {
                        var fe,
                            xe,
                            Ve,
                            Le,
                            Cn = ce !== Oe,
                            Ie = {};
                        for (fe in te)
                            (Ve = te[fe]),
                                fe in pe
                                    ? (Ie.transform || (Ie.transform = {}),
                                      (Ie.transform[fe] = Ve))
                                    : (S.test(fe) && (fe = n(fe)),
                                      fe in U
                                          ? (Ie[fe] = Ve)
                                          : (Le || (Le = {}), (Le[fe] = Ve)));
                        for (fe in Ie) {
                            if (((Ve = Ie[fe]), (xe = this.props[fe]), !xe)) {
                                if (!Cn) continue;
                                xe = v.call(this, fe);
                            }
                            ce.call(this, xe, Ve);
                        }
                        Ee && Le && Ee.call(this, Le);
                    }
                    function Oe(te) {
                        te.stop();
                    }
                    function en(te, ce) {
                        te.set(ce);
                    }
                    function Vy(te) {
                        this.$el.css(te);
                    }
                    function Xe(te, ce) {
                        l[te] = function () {
                            return this.children
                                ? Uy.call(this, ce, arguments)
                                : (this.el && ce.apply(this, arguments), this);
                        };
                    }
                    function Uy(te, ce) {
                        var Ee,
                            fe = this.children.length;
                        for (Ee = 0; fe > Ee; Ee++)
                            te.apply(this.children[Ee], ce);
                        return this;
                    }
                    (l.init = function (te) {
                        if (
                            ((this.$el = e(te)),
                            (this.el = this.$el[0]),
                            (this.props = {}),
                            (this.queue = []),
                            (this.style = ""),
                            (this.active = !1),
                            Y.keepInherited && !Y.fallback)
                        ) {
                            var ce = F(this.el, "transition");
                            ce && !W.test(ce) && (this.upstream = ce);
                        }
                        X.backface &&
                            Y.hideBackface &&
                            d(this.el, X.backface.css, "hidden");
                    }),
                        Xe("add", v),
                        Xe("start", T),
                        Xe("wait", w),
                        Xe("then", N),
                        Xe("next", L),
                        Xe("stop", J),
                        Xe("set", ne),
                        Xe("show", ee),
                        Xe("hide", k),
                        Xe("redraw", ie),
                        Xe("destroy", ae);
                }),
                me = g(Se, function (l) {
                    function v(T, w) {
                        var N = e.data(T, b) || e.data(T, b, new Se.Bare());
                        return N.el || N.init(T), w ? N.start(w) : N;
                    }
                    l.init = function (T, w) {
                        var N = e(T);
                        if (!N.length) return this;
                        if (N.length === 1) return v(N[0], w);
                        var L = [];
                        return (
                            N.each(function (J, ne) {
                                L.push(v(ne, w));
                            }),
                            (this.children = L),
                            this
                        );
                    };
                }),
                x = g(function (l) {
                    function v() {
                        var L = this.get();
                        this.update("auto");
                        var J = this.get();
                        return this.update(L), J;
                    }
                    function T(L, J, ne) {
                        return J !== void 0 && (ne = J), L in p ? L : ne;
                    }
                    function w(L) {
                        var J = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(L);
                        return (J ? i(J[1], J[2], J[3]) : L).replace(
                            /#(\w)(\w)(\w)$/,
                            "#$1$1$2$2$3$3"
                        );
                    }
                    var N = { duration: 500, ease: "ease", delay: 0 };
                    (l.init = function (L, J, ne, ee) {
                        (this.$el = L), (this.el = L[0]);
                        var k = J[0];
                        ne[2] && (k = ne[2]),
                            K[k] && (k = K[k]),
                            (this.name = k),
                            (this.type = ne[1]),
                            (this.duration = u(
                                J[1],
                                this.duration,
                                N.duration
                            )),
                            (this.ease = T(J[2], this.ease, N.ease)),
                            (this.delay = u(J[3], this.delay, N.delay)),
                            (this.span = this.duration + this.delay),
                            (this.active = !1),
                            (this.nextStyle = null),
                            (this.auto = j.test(this.name)),
                            (this.unit = ee.unit || this.unit || Y.defaultUnit),
                            (this.angle =
                                ee.angle || this.angle || Y.defaultAngle),
                            Y.fallback || ee.fallback
                                ? (this.animate = this.fallback)
                                : ((this.animate = this.transition),
                                  (this.string =
                                      this.name +
                                      G +
                                      this.duration +
                                      "ms" +
                                      (this.ease != "ease"
                                          ? G + p[this.ease][0]
                                          : "") +
                                      (this.delay
                                          ? G + this.delay + "ms"
                                          : "")));
                    }),
                        (l.set = function (L) {
                            (L = this.convert(L, this.type)),
                                this.update(L),
                                this.redraw();
                        }),
                        (l.transition = function (L) {
                            (this.active = !0),
                                (L = this.convert(L, this.type)),
                                this.auto &&
                                    (this.el.style[this.name] == "auto" &&
                                        (this.update(this.get()),
                                        this.redraw()),
                                    L == "auto" && (L = v.call(this))),
                                (this.nextStyle = L);
                        }),
                        (l.fallback = function (L) {
                            var J =
                                this.el.style[this.name] ||
                                this.convert(this.get(), this.type);
                            (L = this.convert(L, this.type)),
                                this.auto &&
                                    (J == "auto" &&
                                        (J = this.convert(
                                            this.get(),
                                            this.type
                                        )),
                                    L == "auto" && (L = v.call(this))),
                                (this.tween = new re({
                                    from: J,
                                    to: L,
                                    duration: this.duration,
                                    delay: this.delay,
                                    ease: this.ease,
                                    update: this.update,
                                    context: this,
                                }));
                        }),
                        (l.get = function () {
                            return F(this.el, this.name);
                        }),
                        (l.update = function (L) {
                            d(this.el, this.name, L);
                        }),
                        (l.stop = function () {
                            (this.active || this.nextStyle) &&
                                ((this.active = !1),
                                (this.nextStyle = null),
                                d(this.el, this.name, this.get()));
                            var L = this.tween;
                            L && L.context && L.destroy();
                        }),
                        (l.convert = function (L, J) {
                            if (L == "auto" && this.auto) return L;
                            var ne,
                                ee = typeof L == "number",
                                k = typeof L == "string";
                            switch (J) {
                                case A:
                                    if (ee) return L;
                                    if (k && L.replace(I, "") === "") return +L;
                                    ne = "number(unitless)";
                                    break;
                                case C:
                                    if (k) {
                                        if (L === "" && this.original)
                                            return this.original;
                                        if (J.test(L))
                                            return L.charAt(0) == "#" &&
                                                L.length == 7
                                                ? L
                                                : w(L);
                                    }
                                    ne = "hex or rgb string";
                                    break;
                                case D:
                                    if (ee) return L + this.unit;
                                    if (k && J.test(L)) return L;
                                    ne = "number(px) or string(unit)";
                                    break;
                                case P:
                                    if (ee) return L + this.unit;
                                    if (k && J.test(L)) return L;
                                    ne = "number(px) or string(unit or %)";
                                    break;
                                case B:
                                    if (ee) return L + this.angle;
                                    if (k && J.test(L)) return L;
                                    ne = "number(deg) or string(angle)";
                                    break;
                                case H:
                                    if (ee || (k && P.test(L))) return L;
                                    ne =
                                        "number(unitless) or string(unit or %)";
                            }
                            return s(ne, L), L;
                        }),
                        (l.redraw = function () {
                            this.el.offsetHeight;
                        });
                }),
                q = g(x, function (l, v) {
                    l.init = function () {
                        v.init.apply(this, arguments),
                            this.original ||
                                (this.original = this.convert(this.get(), C));
                    };
                }),
                z = g(x, function (l, v) {
                    (l.init = function () {
                        v.init.apply(this, arguments),
                            (this.animate = this.fallback);
                    }),
                        (l.get = function () {
                            return this.$el[this.name]();
                        }),
                        (l.update = function (T) {
                            this.$el[this.name](T);
                        });
                }),
                V = g(x, function (l, v) {
                    function T(w, N) {
                        var L, J, ne, ee, k;
                        for (L in w)
                            (ee = pe[L]),
                                (ne = ee[0]),
                                (J = ee[1] || L),
                                (k = this.convert(w[L], ne)),
                                N.call(this, J, k, ne);
                    }
                    (l.init = function () {
                        v.init.apply(this, arguments),
                            this.current ||
                                ((this.current = {}),
                                pe.perspective &&
                                    Y.perspective &&
                                    ((this.current.perspective = Y.perspective),
                                    d(
                                        this.el,
                                        this.name,
                                        this.style(this.current)
                                    ),
                                    this.redraw()));
                    }),
                        (l.set = function (w) {
                            T.call(this, w, function (N, L) {
                                this.current[N] = L;
                            }),
                                d(this.el, this.name, this.style(this.current)),
                                this.redraw();
                        }),
                        (l.transition = function (w) {
                            var N = this.values(w);
                            this.tween = new ue({
                                current: this.current,
                                values: N,
                                duration: this.duration,
                                delay: this.delay,
                                ease: this.ease,
                            });
                            var L,
                                J = {};
                            for (L in this.current)
                                J[L] = L in N ? N[L] : this.current[L];
                            (this.active = !0),
                                (this.nextStyle = this.style(J));
                        }),
                        (l.fallback = function (w) {
                            var N = this.values(w);
                            this.tween = new ue({
                                current: this.current,
                                values: N,
                                duration: this.duration,
                                delay: this.delay,
                                ease: this.ease,
                                update: this.update,
                                context: this,
                            });
                        }),
                        (l.update = function () {
                            d(this.el, this.name, this.style(this.current));
                        }),
                        (l.style = function (w) {
                            var N,
                                L = "";
                            for (N in w) L += N + "(" + w[N] + ") ";
                            return L;
                        }),
                        (l.values = function (w) {
                            var N,
                                L = {};
                            return (
                                T.call(this, w, function (J, ne, ee) {
                                    (L[J] = ne),
                                        this.current[J] === void 0 &&
                                            ((N = 0),
                                            ~J.indexOf("scale") && (N = 1),
                                            (this.current[J] = this.convert(
                                                N,
                                                ee
                                            )));
                                }),
                                L
                            );
                        });
                }),
                re = g(function (l) {
                    function v(k) {
                        ne.push(k) === 1 && se(T);
                    }
                    function T() {
                        var k,
                            ie,
                            ae,
                            _e = ne.length;
                        if (_e)
                            for (se(T), ie = he(), k = _e; k--; )
                                (ae = ne[k]), ae && ae.render(ie);
                    }
                    function w(k) {
                        var ie,
                            ae = e.inArray(k, ne);
                        ae >= 0 &&
                            ((ie = ne.slice(ae + 1)),
                            (ne.length = ae),
                            ie.length && (ne = ne.concat(ie)));
                    }
                    function N(k) {
                        return Math.round(k * ee) / ee;
                    }
                    function L(k, ie, ae) {
                        return i(
                            k[0] + ae * (ie[0] - k[0]),
                            k[1] + ae * (ie[1] - k[1]),
                            k[2] + ae * (ie[2] - k[2])
                        );
                    }
                    var J = { ease: p.ease[1], from: 0, to: 1 };
                    (l.init = function (k) {
                        (this.duration = k.duration || 0),
                            (this.delay = k.delay || 0);
                        var ie = k.ease || J.ease;
                        p[ie] && (ie = p[ie][1]),
                            typeof ie != "function" && (ie = J.ease),
                            (this.ease = ie),
                            (this.update = k.update || o),
                            (this.complete = k.complete || o),
                            (this.context = k.context || this),
                            (this.name = k.name);
                        var ae = k.from,
                            _e = k.to;
                        ae === void 0 && (ae = J.from),
                            _e === void 0 && (_e = J.to),
                            (this.unit = k.unit || ""),
                            typeof ae == "number" && typeof _e == "number"
                                ? ((this.begin = ae), (this.change = _e - ae))
                                : this.format(_e, ae),
                            (this.value = this.begin + this.unit),
                            (this.start = he()),
                            k.autoplay !== !1 && this.play();
                    }),
                        (l.play = function () {
                            this.active ||
                                (this.start || (this.start = he()),
                                (this.active = !0),
                                v(this));
                        }),
                        (l.stop = function () {
                            this.active && ((this.active = !1), w(this));
                        }),
                        (l.render = function (k) {
                            var ie,
                                ae = k - this.start;
                            if (this.delay) {
                                if (ae <= this.delay) return;
                                ae -= this.delay;
                            }
                            if (ae < this.duration) {
                                var _e = this.ease(ae, 0, 1, this.duration);
                                return (
                                    (ie = this.startRGB
                                        ? L(this.startRGB, this.endRGB, _e)
                                        : N(this.begin + _e * this.change)),
                                    (this.value = ie + this.unit),
                                    void this.update.call(
                                        this.context,
                                        this.value
                                    )
                                );
                            }
                            (ie = this.endHex || this.begin + this.change),
                                (this.value = ie + this.unit),
                                this.update.call(this.context, this.value),
                                this.complete.call(this.context),
                                this.destroy();
                        }),
                        (l.format = function (k, ie) {
                            if (((ie += ""), (k += ""), k.charAt(0) == "#"))
                                return (
                                    (this.startRGB = r(ie)),
                                    (this.endRGB = r(k)),
                                    (this.endHex = k),
                                    (this.begin = 0),
                                    void (this.change = 1)
                                );
                            if (!this.unit) {
                                var ae = ie.replace(I, ""),
                                    _e = k.replace(I, "");
                                ae !== _e && a("tween", ie, k),
                                    (this.unit = ae);
                            }
                            (ie = parseFloat(ie)),
                                (k = parseFloat(k)),
                                (this.begin = this.value = ie),
                                (this.change = k - ie);
                        }),
                        (l.destroy = function () {
                            this.stop(),
                                (this.context = null),
                                (this.ease = this.update = this.complete = o);
                        });
                    var ne = [],
                        ee = 1e3;
                }),
                oe = g(re, function (l) {
                    (l.init = function (v) {
                        (this.duration = v.duration || 0),
                            (this.complete = v.complete || o),
                            (this.context = v.context),
                            this.play();
                    }),
                        (l.render = function (v) {
                            var T = v - this.start;
                            T < this.duration ||
                                (this.complete.call(this.context),
                                this.destroy());
                        });
                }),
                ue = g(re, function (l, v) {
                    (l.init = function (T) {
                        (this.context = T.context),
                            (this.update = T.update),
                            (this.tweens = []),
                            (this.current = T.current);
                        var w, N;
                        for (w in T.values)
                            (N = T.values[w]),
                                this.current[w] !== N &&
                                    this.tweens.push(
                                        new re({
                                            name: w,
                                            from: this.current[w],
                                            to: N,
                                            duration: T.duration,
                                            delay: T.delay,
                                            ease: T.ease,
                                            autoplay: !1,
                                        })
                                    );
                        this.play();
                    }),
                        (l.render = function (T) {
                            var w,
                                N,
                                L = this.tweens.length,
                                J = !1;
                            for (w = L; w--; )
                                (N = this.tweens[w]),
                                    N.context &&
                                        (N.render(T),
                                        (this.current[N.name] = N.value),
                                        (J = !0));
                            return J
                                ? void (
                                      this.update &&
                                      this.update.call(this.context)
                                  )
                                : this.destroy();
                        }),
                        (l.destroy = function () {
                            if ((v.destroy.call(this), this.tweens)) {
                                var T,
                                    w = this.tweens.length;
                                for (T = w; T--; ) this.tweens[T].destroy();
                                (this.tweens = null), (this.current = null);
                            }
                        });
                }),
                Y = (t.config = {
                    debug: !1,
                    defaultUnit: "px",
                    defaultAngle: "deg",
                    keepInherited: !1,
                    hideBackface: !1,
                    perspective: "",
                    fallback: !X.transition,
                    agentTests: [],
                });
            (t.fallback = function (l) {
                if (!X.transition) return (Y.fallback = !0);
                Y.agentTests.push("(" + l + ")");
                var v = new RegExp(Y.agentTests.join("|"), "i");
                Y.fallback = v.test(navigator.userAgent);
            }),
                t.fallback("6.0.[2-5] Safari"),
                (t.tween = function (l) {
                    return new re(l);
                }),
                (t.delay = function (l, v, T) {
                    return new oe({ complete: v, duration: l, context: T });
                }),
                (e.fn.tram = function (l) {
                    return t.call(null, this, l);
                });
            var d = e.style,
                F = e.css,
                K = { transform: X.transform && X.transform.css },
                U = {
                    color: [q, C],
                    background: [q, C, "background-color"],
                    "outline-color": [q, C],
                    "border-color": [q, C],
                    "border-top-color": [q, C],
                    "border-right-color": [q, C],
                    "border-bottom-color": [q, C],
                    "border-left-color": [q, C],
                    "border-width": [x, D],
                    "border-top-width": [x, D],
                    "border-right-width": [x, D],
                    "border-bottom-width": [x, D],
                    "border-left-width": [x, D],
                    "border-spacing": [x, D],
                    "letter-spacing": [x, D],
                    margin: [x, D],
                    "margin-top": [x, D],
                    "margin-right": [x, D],
                    "margin-bottom": [x, D],
                    "margin-left": [x, D],
                    padding: [x, D],
                    "padding-top": [x, D],
                    "padding-right": [x, D],
                    "padding-bottom": [x, D],
                    "padding-left": [x, D],
                    "outline-width": [x, D],
                    opacity: [x, A],
                    top: [x, P],
                    right: [x, P],
                    bottom: [x, P],
                    left: [x, P],
                    "font-size": [x, P],
                    "text-indent": [x, P],
                    "word-spacing": [x, P],
                    width: [x, P],
                    "min-width": [x, P],
                    "max-width": [x, P],
                    height: [x, P],
                    "min-height": [x, P],
                    "max-height": [x, P],
                    "line-height": [x, H],
                    "scroll-top": [z, A, "scrollTop"],
                    "scroll-left": [z, A, "scrollLeft"],
                },
                pe = {};
            X.transform &&
                ((U.transform = [V]),
                (pe = {
                    x: [P, "translateX"],
                    y: [P, "translateY"],
                    rotate: [B],
                    rotateX: [B],
                    rotateY: [B],
                    scale: [A],
                    scaleX: [A],
                    scaleY: [A],
                    skew: [B],
                    skewX: [B],
                    skewY: [B],
                })),
                X.transform &&
                    X.backface &&
                    ((pe.z = [P, "translateZ"]),
                    (pe.rotateZ = [B]),
                    (pe.scaleZ = [A]),
                    (pe.perspective = [D]));
            var ut = /ms/,
                Ke = /s|\./;
            return (e.tram = t);
        })(window.jQuery);
    });
    var ha = f((NF, ga) => {
        "use strict";
        var Yy = window.$,
            Qy = jr() && Yy.tram;
        ga.exports = (function () {
            var e = {};
            e.VERSION = "1.6.0-Webflow";
            var t = {},
                n = Array.prototype,
                r = Object.prototype,
                i = Function.prototype,
                o = n.push,
                s = n.slice,
                a = n.concat,
                u = r.toString,
                c = r.hasOwnProperty,
                y = n.forEach,
                g = n.map,
                p = n.reduce,
                h = n.reduceRight,
                m = n.filter,
                _ = n.every,
                b = n.some,
                I = n.indexOf,
                S = n.lastIndexOf,
                A = Array.isArray,
                C = Object.keys,
                D = i.bind,
                P =
                    (e.each =
                    e.forEach =
                        function (E, R, M) {
                            if (E == null) return E;
                            if (y && E.forEach === y) E.forEach(R, M);
                            else if (E.length === +E.length) {
                                for (var X = 0, Z = E.length; X < Z; X++)
                                    if (R.call(M, E[X], X, E) === t) return;
                            } else
                                for (
                                    var Q = e.keys(E), X = 0, Z = Q.length;
                                    X < Z;
                                    X++
                                )
                                    if (R.call(M, E[Q[X]], Q[X], E) === t)
                                        return;
                            return E;
                        });
            (e.map = e.collect =
                function (E, R, M) {
                    var X = [];
                    return E == null
                        ? X
                        : g && E.map === g
                        ? E.map(R, M)
                        : (P(E, function (Z, Q, se) {
                              X.push(R.call(M, Z, Q, se));
                          }),
                          X);
                }),
                (e.find = e.detect =
                    function (E, R, M) {
                        var X;
                        return (
                            B(E, function (Z, Q, se) {
                                if (R.call(M, Z, Q, se)) return (X = Z), !0;
                            }),
                            X
                        );
                    }),
                (e.filter = e.select =
                    function (E, R, M) {
                        var X = [];
                        return E == null
                            ? X
                            : m && E.filter === m
                            ? E.filter(R, M)
                            : (P(E, function (Z, Q, se) {
                                  R.call(M, Z, Q, se) && X.push(Z);
                              }),
                              X);
                    });
            var B =
                (e.some =
                e.any =
                    function (E, R, M) {
                        R || (R = e.identity);
                        var X = !1;
                        return E == null
                            ? X
                            : b && E.some === b
                            ? E.some(R, M)
                            : (P(E, function (Z, Q, se) {
                                  if (X || (X = R.call(M, Z, Q, se))) return t;
                              }),
                              !!X);
                    });
            (e.contains = e.include =
                function (E, R) {
                    return E == null
                        ? !1
                        : I && E.indexOf === I
                        ? E.indexOf(R) != -1
                        : B(E, function (M) {
                              return M === R;
                          });
                }),
                (e.delay = function (E, R) {
                    var M = s.call(arguments, 2);
                    return setTimeout(function () {
                        return E.apply(null, M);
                    }, R);
                }),
                (e.defer = function (E) {
                    return e.delay.apply(
                        e,
                        [E, 1].concat(s.call(arguments, 1))
                    );
                }),
                (e.throttle = function (E) {
                    var R, M, X;
                    return function () {
                        R ||
                            ((R = !0),
                            (M = arguments),
                            (X = this),
                            Qy.frame(function () {
                                (R = !1), E.apply(X, M);
                            }));
                    };
                }),
                (e.debounce = function (E, R, M) {
                    var X,
                        Z,
                        Q,
                        se,
                        he,
                        Se = function () {
                            var me = e.now() - se;
                            me < R
                                ? (X = setTimeout(Se, R - me))
                                : ((X = null),
                                  M || ((he = E.apply(Q, Z)), (Q = Z = null)));
                        };
                    return function () {
                        (Q = this), (Z = arguments), (se = e.now());
                        var me = M && !X;
                        return (
                            X || (X = setTimeout(Se, R)),
                            me && ((he = E.apply(Q, Z)), (Q = Z = null)),
                            he
                        );
                    };
                }),
                (e.defaults = function (E) {
                    if (!e.isObject(E)) return E;
                    for (var R = 1, M = arguments.length; R < M; R++) {
                        var X = arguments[R];
                        for (var Z in X) E[Z] === void 0 && (E[Z] = X[Z]);
                    }
                    return E;
                }),
                (e.keys = function (E) {
                    if (!e.isObject(E)) return [];
                    if (C) return C(E);
                    var R = [];
                    for (var M in E) e.has(E, M) && R.push(M);
                    return R;
                }),
                (e.has = function (E, R) {
                    return c.call(E, R);
                }),
                (e.isObject = function (E) {
                    return E === Object(E);
                }),
                (e.now =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    }),
                (e.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g,
                });
            var H = /(.)^/,
                W = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029",
                },
                j = /\\|'|\r|\n|\u2028|\u2029/g,
                G = function (E) {
                    return "\\" + W[E];
                },
                O = /^\s*(\w|\$)+\s*$/;
            return (
                (e.template = function (E, R, M) {
                    !R && M && (R = M),
                        (R = e.defaults({}, R, e.templateSettings));
                    var X = RegExp(
                            [
                                (R.escape || H).source,
                                (R.interpolate || H).source,
                                (R.evaluate || H).source,
                            ].join("|") + "|$",
                            "g"
                        ),
                        Z = 0,
                        Q = "__p+='";
                    E.replace(X, function (me, x, q, z, V) {
                        return (
                            (Q += E.slice(Z, V).replace(j, G)),
                            (Z = V + me.length),
                            x
                                ? (Q +=
                                      `'+
((__t=(` +
                                      x +
                                      `))==null?'':_.escape(__t))+
'`)
                                : q
                                ? (Q +=
                                      `'+
((__t=(` +
                                      q +
                                      `))==null?'':__t)+
'`)
                                : z &&
                                  (Q +=
                                      `';
` +
                                      z +
                                      `
__p+='`),
                            me
                        );
                    }),
                        (Q += `';
`);
                    var se = R.variable;
                    if (se) {
                        if (!O.test(se))
                            throw new Error(
                                "variable is not a bare identifier: " + se
                            );
                    } else
                        (Q =
                            `with(obj||{}){
` +
                            Q +
                            `}
`),
                            (se = "obj");
                    Q =
                        `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
                        Q +
                        `return __p;
`;
                    var he;
                    try {
                        he = new Function(R.variable || "obj", "_", Q);
                    } catch (me) {
                        throw ((me.source = Q), me);
                    }
                    var Se = function (me) {
                        return he.call(this, me, e);
                    };
                    return (
                        (Se.source =
                            "function(" +
                            se +
                            `){
` +
                            Q +
                            "}"),
                        Se
                    );
                }),
                e
            );
        })();
    });
    var ke = f((DF, ba) => {
        "use strict";
        var de = {},
            wt = {},
            St = [],
            Yr = window.Webflow || [],
            ct = window.jQuery,
            Be = ct(window),
            $y = ct(document),
            Qe = ct.isFunction,
            Ue = (de._ = ha()),
            Ea = (de.tram = jr() && ct.tram),
            Nn = !1,
            Qr = !1;
        Ea.config.hideBackface = !1;
        Ea.config.keepInherited = !0;
        de.define = function (e, t, n) {
            wt[e] && ma(wt[e]);
            var r = (wt[e] = t(ct, Ue, n) || {});
            return va(r), r;
        };
        de.require = function (e) {
            return wt[e];
        };
        function va(e) {
            de.env() &&
                (Qe(e.design) && Be.on("__wf_design", e.design),
                Qe(e.preview) && Be.on("__wf_preview", e.preview)),
                Qe(e.destroy) && Be.on("__wf_destroy", e.destroy),
                e.ready && Qe(e.ready) && Zy(e);
        }
        function Zy(e) {
            if (Nn) {
                e.ready();
                return;
            }
            Ue.contains(St, e.ready) || St.push(e.ready);
        }
        function ma(e) {
            Qe(e.design) && Be.off("__wf_design", e.design),
                Qe(e.preview) && Be.off("__wf_preview", e.preview),
                Qe(e.destroy) && Be.off("__wf_destroy", e.destroy),
                e.ready && Qe(e.ready) && Jy(e);
        }
        function Jy(e) {
            St = Ue.filter(St, function (t) {
                return t !== e.ready;
            });
        }
        de.push = function (e) {
            if (Nn) {
                Qe(e) && e();
                return;
            }
            Yr.push(e);
        };
        de.env = function (e) {
            var t = window.__wf_design,
                n = typeof t < "u";
            if (!e) return n;
            if (e === "design") return n && t;
            if (e === "preview") return n && !t;
            if (e === "slug") return n && window.__wf_slug;
            if (e === "editor") return window.WebflowEditor;
            if (e === "test") return window.__wf_test;
            if (e === "frame") return window !== window.top;
        };
        var Ln = navigator.userAgent.toLowerCase(),
            _a = (de.env.touch =
                "ontouchstart" in window ||
                (window.DocumentTouch &&
                    document instanceof window.DocumentTouch)),
            eE = (de.env.chrome =
                /chrome/.test(Ln) &&
                /Google/.test(navigator.vendor) &&
                parseInt(Ln.match(/chrome\/(\d+)\./)[1], 10)),
            tE = (de.env.ios = /(ipod|iphone|ipad)/.test(Ln));
        de.env.safari = /safari/.test(Ln) && !eE && !tE;
        var Kr;
        _a &&
            $y.on("touchstart mousedown", function (e) {
                Kr = e.target;
            });
        de.validClick = _a
            ? function (e) {
                  return e === Kr || ct.contains(e, Kr);
              }
            : function () {
                  return !0;
              };
        var Ia = "resize.webflow orientationchange.webflow load.webflow",
            nE = "scroll.webflow " + Ia;
        de.resize = $r(Be, Ia);
        de.scroll = $r(Be, nE);
        de.redraw = $r();
        function $r(e, t) {
            var n = [],
                r = {};
            return (
                (r.up = Ue.throttle(function (i) {
                    Ue.each(n, function (o) {
                        o(i);
                    });
                })),
                e && t && e.on(t, r.up),
                (r.on = function (i) {
                    typeof i == "function" && (Ue.contains(n, i) || n.push(i));
                }),
                (r.off = function (i) {
                    if (!arguments.length) {
                        n = [];
                        return;
                    }
                    n = Ue.filter(n, function (o) {
                        return o !== i;
                    });
                }),
                r
            );
        }
        de.location = function (e) {
            window.location = e;
        };
        de.env() && (de.location = function () {});
        de.ready = function () {
            (Nn = !0),
                Qr ? rE() : Ue.each(St, ya),
                Ue.each(Yr, ya),
                de.resize.up();
        };
        function ya(e) {
            Qe(e) && e();
        }
        function rE() {
            (Qr = !1), Ue.each(wt, va);
        }
        var Et;
        de.load = function (e) {
            Et.then(e);
        };
        function Ta() {
            Et && (Et.reject(), Be.off("load", Et.resolve)),
                (Et = new ct.Deferred()),
                Be.on("load", Et.resolve);
        }
        de.destroy = function (e) {
            (e = e || {}),
                (Qr = !0),
                Be.triggerHandler("__wf_destroy"),
                e.domready != null && (Nn = e.domready),
                Ue.each(wt, ma),
                de.resize.off(),
                de.scroll.off(),
                de.redraw.off(),
                (St = []),
                (Yr = []),
                Et.state() === "pending" && Ta();
        };
        ct(de.ready);
        Ta();
        ba.exports = window.Webflow = de;
    });
    var Sa = f((MF, wa) => {
        "use strict";
        var Aa = ke();
        Aa.define(
            "brand",
            (wa.exports = function (e) {
                var t = {},
                    n = document,
                    r = e("html"),
                    i = e("body"),
                    o = ".w-webflow-badge",
                    s = window.location,
                    a = /PhantomJS/i.test(navigator.userAgent),
                    u =
                        "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
                    c;
                t.ready = function () {
                    var h = r.attr("data-wf-status"),
                        m = r.attr("data-wf-domain") || "";
                    /\.webflow\.io$/i.test(m) && s.hostname !== m && (h = !0),
                        h &&
                            !a &&
                            ((c = c || g()),
                            p(),
                            setTimeout(p, 500),
                            e(n).off(u, y).on(u, y));
                };
                function y() {
                    var h =
                        n.fullScreen ||
                        n.mozFullScreen ||
                        n.webkitIsFullScreen ||
                        n.msFullscreenElement ||
                        !!n.webkitFullscreenElement;
                    e(c).attr("style", h ? "display: none !important;" : "");
                }
                function g() {
                    var h = e('<a class="w-webflow-badge"></a>').attr(
                            "href",
                            "https://webflow.com?utm_campaign=brandjs"
                        ),
                        m = e("<img>")
                            .attr(
                                "src",
                                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
                            )
                            .attr("alt", "")
                            .css({ marginRight: "4px", width: "26px" }),
                        _ = e("<img>")
                            .attr(
                                "src",
                                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
                            )
                            .attr("alt", "Made in Webflow");
                    return h.append(m, _), h[0];
                }
                function p() {
                    var h = i.children(o),
                        m = h.length && h.get(0) === c,
                        _ = Aa.env("editor");
                    if (m) {
                        _ && h.remove();
                        return;
                    }
                    h.length && h.remove(), _ || i.append(c);
                }
                return t;
            })
        );
    });
    var xa = f((FF, Oa) => {
        "use strict";
        var Zr = ke();
        Zr.define(
            "edit",
            (Oa.exports = function (e, t, n) {
                if (
                    ((n = n || {}),
                    (Zr.env("test") || Zr.env("frame")) && !n.fixture && !iE())
                )
                    return { exit: 1 };
                var r = {},
                    i = e(window),
                    o = e(document.documentElement),
                    s = document.location,
                    a = "hashchange",
                    u,
                    c = n.load || p,
                    y = !1;
                try {
                    y =
                        localStorage &&
                        localStorage.getItem &&
                        localStorage.getItem("WebflowEditor");
                } catch {}
                y
                    ? c()
                    : s.search
                    ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
                          /\?edit$/.test(s.href)) &&
                      c()
                    : i.on(a, g).triggerHandler(a);
                function g() {
                    u || (/\?edit/.test(s.hash) && c());
                }
                function p() {
                    (u = !0),
                        (window.WebflowEditor = !0),
                        i.off(a, g),
                        S(function (C) {
                            e.ajax({
                                url: I(
                                    "https://editor-api.webflow.com/api/editor/view"
                                ),
                                data: { siteId: o.attr("data-wf-site") },
                                xhrFields: { withCredentials: !0 },
                                dataType: "json",
                                crossDomain: !0,
                                success: h(C),
                            });
                        });
                }
                function h(C) {
                    return function (D) {
                        if (!D) {
                            console.error("Could not load editor data");
                            return;
                        }
                        (D.thirdPartyCookiesSupported = C),
                            m(b(D.scriptPath), function () {
                                window.WebflowEditor(D);
                            });
                    };
                }
                function m(C, D) {
                    e.ajax({
                        type: "GET",
                        url: C,
                        dataType: "script",
                        cache: !0,
                    }).then(D, _);
                }
                function _(C, D, P) {
                    throw (
                        (console.error("Could not load editor script: " + D), P)
                    );
                }
                function b(C) {
                    return C.indexOf("//") >= 0
                        ? C
                        : I("https://editor-api.webflow.com" + C);
                }
                function I(C) {
                    return C.replace(/([^:])\/\//g, "$1/");
                }
                function S(C) {
                    var D = window.document.createElement("iframe");
                    (D.src =
                        "https://webflow.com/site/third-party-cookie-check.html"),
                        (D.style.display = "none"),
                        (D.sandbox = "allow-scripts allow-same-origin");
                    var P = function (B) {
                        B.data === "WF_third_party_cookies_unsupported"
                            ? (A(D, P), C(!1))
                            : B.data === "WF_third_party_cookies_supported" &&
                              (A(D, P), C(!0));
                    };
                    (D.onerror = function () {
                        A(D, P), C(!1);
                    }),
                        window.addEventListener("message", P, !1),
                        window.document.body.appendChild(D);
                }
                function A(C, D) {
                    window.removeEventListener("message", D, !1), C.remove();
                }
                return r;
            })
        );
        function iE() {
            try {
                return window.top.__Cypress__;
            } catch {
                return !1;
            }
        }
    });
    var Ca = f((qF, Ra) => {
        "use strict";
        var oE = ke();
        oE.define(
            "focus-visible",
            (Ra.exports = function () {
                function e(n) {
                    var r = !0,
                        i = !1,
                        o = null,
                        s = {
                            text: !0,
                            search: !0,
                            url: !0,
                            tel: !0,
                            email: !0,
                            password: !0,
                            number: !0,
                            date: !0,
                            month: !0,
                            week: !0,
                            time: !0,
                            datetime: !0,
                            "datetime-local": !0,
                        };
                    function a(A) {
                        return !!(
                            A &&
                            A !== document &&
                            A.nodeName !== "HTML" &&
                            A.nodeName !== "BODY" &&
                            "classList" in A &&
                            "contains" in A.classList
                        );
                    }
                    function u(A) {
                        var C = A.type,
                            D = A.tagName;
                        return !!(
                            (D === "INPUT" && s[C] && !A.readOnly) ||
                            (D === "TEXTAREA" && !A.readOnly) ||
                            A.isContentEditable
                        );
                    }
                    function c(A) {
                        A.getAttribute("data-wf-focus-visible") ||
                            A.setAttribute("data-wf-focus-visible", "true");
                    }
                    function y(A) {
                        A.getAttribute("data-wf-focus-visible") &&
                            A.removeAttribute("data-wf-focus-visible");
                    }
                    function g(A) {
                        A.metaKey ||
                            A.altKey ||
                            A.ctrlKey ||
                            (a(n.activeElement) && c(n.activeElement),
                            (r = !0));
                    }
                    function p() {
                        r = !1;
                    }
                    function h(A) {
                        a(A.target) && (r || u(A.target)) && c(A.target);
                    }
                    function m(A) {
                        a(A.target) &&
                            A.target.hasAttribute("data-wf-focus-visible") &&
                            ((i = !0),
                            window.clearTimeout(o),
                            (o = window.setTimeout(function () {
                                i = !1;
                            }, 100)),
                            y(A.target));
                    }
                    function _() {
                        document.visibilityState === "hidden" &&
                            (i && (r = !0), b());
                    }
                    function b() {
                        document.addEventListener("mousemove", S),
                            document.addEventListener("mousedown", S),
                            document.addEventListener("mouseup", S),
                            document.addEventListener("pointermove", S),
                            document.addEventListener("pointerdown", S),
                            document.addEventListener("pointerup", S),
                            document.addEventListener("touchmove", S),
                            document.addEventListener("touchstart", S),
                            document.addEventListener("touchend", S);
                    }
                    function I() {
                        document.removeEventListener("mousemove", S),
                            document.removeEventListener("mousedown", S),
                            document.removeEventListener("mouseup", S),
                            document.removeEventListener("pointermove", S),
                            document.removeEventListener("pointerdown", S),
                            document.removeEventListener("pointerup", S),
                            document.removeEventListener("touchmove", S),
                            document.removeEventListener("touchstart", S),
                            document.removeEventListener("touchend", S);
                    }
                    function S(A) {
                        (A.target.nodeName &&
                            A.target.nodeName.toLowerCase() === "html") ||
                            ((r = !1), I());
                    }
                    document.addEventListener("keydown", g, !0),
                        document.addEventListener("mousedown", p, !0),
                        document.addEventListener("pointerdown", p, !0),
                        document.addEventListener("touchstart", p, !0),
                        document.addEventListener("visibilitychange", _, !0),
                        b(),
                        n.addEventListener("focus", h, !0),
                        n.addEventListener("blur", m, !0);
                }
                function t() {
                    if (typeof document < "u")
                        try {
                            document.querySelector(":focus-visible");
                        } catch {
                            e(document);
                        }
                }
                return { ready: t };
            })
        );
    });
    var Na = f((kF, La) => {
        "use strict";
        var Pa = ke();
        Pa.define(
            "focus",
            (La.exports = function () {
                var e = [],
                    t = !1;
                function n(s) {
                    t &&
                        (s.preventDefault(),
                        s.stopPropagation(),
                        s.stopImmediatePropagation(),
                        e.unshift(s));
                }
                function r(s) {
                    var a = s.target,
                        u = a.tagName;
                    return (
                        (/^a$/i.test(u) && a.href != null) ||
                        (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
                        (/^input$/i.test(u) &&
                            /^(button|reset|submit|radio|checkbox)$/i.test(
                                a.type
                            ) &&
                            !a.disabled) ||
                        (!/^(button|input|textarea|select|a)$/i.test(u) &&
                            !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
                        /^audio$/i.test(u) ||
                        (/^video$/i.test(u) && a.controls === !0)
                    );
                }
                function i(s) {
                    r(s) &&
                        ((t = !0),
                        setTimeout(() => {
                            for (t = !1, s.target.focus(); e.length > 0; ) {
                                var a = e.pop();
                                a.target.dispatchEvent(
                                    new MouseEvent(a.type, a)
                                );
                            }
                        }, 0));
                }
                function o() {
                    typeof document < "u" &&
                        document.body.hasAttribute("data-wf-focus-within") &&
                        Pa.env.safari &&
                        (document.addEventListener("mousedown", i, !0),
                        document.addEventListener("mouseup", n, !0),
                        document.addEventListener("click", n, !0));
                }
                return { ready: o };
            })
        );
    });
    var Fa = f((GF, Ma) => {
        "use strict";
        var Jr = window.jQuery,
            $e = {},
            Dn = [],
            Da = ".w-ix",
            Mn = {
                reset: function (e, t) {
                    t.__wf_intro = null;
                },
                intro: function (e, t) {
                    t.__wf_intro ||
                        ((t.__wf_intro = !0),
                        Jr(t).triggerHandler($e.types.INTRO));
                },
                outro: function (e, t) {
                    t.__wf_intro &&
                        ((t.__wf_intro = null),
                        Jr(t).triggerHandler($e.types.OUTRO));
                },
            };
        $e.triggers = {};
        $e.types = { INTRO: "w-ix-intro" + Da, OUTRO: "w-ix-outro" + Da };
        $e.init = function () {
            for (var e = Dn.length, t = 0; t < e; t++) {
                var n = Dn[t];
                n[0](0, n[1]);
            }
            (Dn = []), Jr.extend($e.triggers, Mn);
        };
        $e.async = function () {
            for (var e in Mn) {
                var t = Mn[e];
                Mn.hasOwnProperty(e) &&
                    ($e.triggers[e] = function (n, r) {
                        Dn.push([t, r]);
                    });
            }
        };
        $e.async();
        Ma.exports = $e;
    });
    var qn = f((XF, Ga) => {
        "use strict";
        var ei = Fa();
        function qa(e, t) {
            var n = document.createEvent("CustomEvent");
            n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
        }
        var aE = window.jQuery,
            Fn = {},
            ka = ".w-ix",
            sE = {
                reset: function (e, t) {
                    ei.triggers.reset(e, t);
                },
                intro: function (e, t) {
                    ei.triggers.intro(e, t), qa(t, "COMPONENT_ACTIVE");
                },
                outro: function (e, t) {
                    ei.triggers.outro(e, t), qa(t, "COMPONENT_INACTIVE");
                },
            };
        Fn.triggers = {};
        Fn.types = { INTRO: "w-ix-intro" + ka, OUTRO: "w-ix-outro" + ka };
        aE.extend(Fn.triggers, sE);
        Ga.exports = Fn;
    });
    var ti = f((VF, Xa) => {
        var uE =
            typeof global == "object" &&
            global &&
            global.Object === Object &&
            global;
        Xa.exports = uE;
    });
    var He = f((UF, Va) => {
        var cE = ti(),
            lE =
                typeof self == "object" &&
                self &&
                self.Object === Object &&
                self,
            fE = cE || lE || Function("return this")();
        Va.exports = fE;
    });
    var Ot = f((BF, Ua) => {
        var dE = He(),
            pE = dE.Symbol;
        Ua.exports = pE;
    });
    var za = f((HF, Wa) => {
        var Ba = Ot(),
            Ha = Object.prototype,
            gE = Ha.hasOwnProperty,
            hE = Ha.toString,
            tn = Ba ? Ba.toStringTag : void 0;
        function yE(e) {
            var t = gE.call(e, tn),
                n = e[tn];
            try {
                e[tn] = void 0;
                var r = !0;
            } catch {}
            var i = hE.call(e);
            return r && (t ? (e[tn] = n) : delete e[tn]), i;
        }
        Wa.exports = yE;
    });
    var Ka = f((WF, ja) => {
        var EE = Object.prototype,
            vE = EE.toString;
        function mE(e) {
            return vE.call(e);
        }
        ja.exports = mE;
    });
    var lt = f((zF, $a) => {
        var Ya = Ot(),
            _E = za(),
            IE = Ka(),
            TE = "[object Null]",
            bE = "[object Undefined]",
            Qa = Ya ? Ya.toStringTag : void 0;
        function AE(e) {
            return e == null
                ? e === void 0
                    ? bE
                    : TE
                : Qa && Qa in Object(e)
                ? _E(e)
                : IE(e);
        }
        $a.exports = AE;
    });
    var ni = f((jF, Za) => {
        function wE(e, t) {
            return function (n) {
                return e(t(n));
            };
        }
        Za.exports = wE;
    });
    var ri = f((KF, Ja) => {
        var SE = ni(),
            OE = SE(Object.getPrototypeOf, Object);
        Ja.exports = OE;
    });
    var rt = f((YF, es) => {
        function xE(e) {
            return e != null && typeof e == "object";
        }
        es.exports = xE;
    });
    var ii = f((QF, ns) => {
        var RE = lt(),
            CE = ri(),
            PE = rt(),
            LE = "[object Object]",
            NE = Function.prototype,
            DE = Object.prototype,
            ts = NE.toString,
            ME = DE.hasOwnProperty,
            FE = ts.call(Object);
        function qE(e) {
            if (!PE(e) || RE(e) != LE) return !1;
            var t = CE(e);
            if (t === null) return !0;
            var n = ME.call(t, "constructor") && t.constructor;
            return typeof n == "function" && n instanceof n && ts.call(n) == FE;
        }
        ns.exports = qE;
    });
    var rs = f((oi) => {
        "use strict";
        Object.defineProperty(oi, "__esModule", { value: !0 });
        oi.default = kE;
        function kE(e) {
            var t,
                n = e.Symbol;
            return (
                typeof n == "function"
                    ? n.observable
                        ? (t = n.observable)
                        : ((t = n("observable")), (n.observable = t))
                    : (t = "@@observable"),
                t
            );
        }
    });
    var is = f((si, ai) => {
        "use strict";
        Object.defineProperty(si, "__esModule", { value: !0 });
        var GE = rs(),
            XE = VE(GE);
        function VE(e) {
            return e && e.__esModule ? e : { default: e };
        }
        var xt;
        typeof self < "u"
            ? (xt = self)
            : typeof window < "u"
            ? (xt = window)
            : typeof global < "u"
            ? (xt = global)
            : typeof ai < "u"
            ? (xt = ai)
            : (xt = Function("return this")());
        var UE = (0, XE.default)(xt);
        si.default = UE;
    });
    var ui = f((nn) => {
        "use strict";
        nn.__esModule = !0;
        nn.ActionTypes = void 0;
        nn.default = us;
        var BE = ii(),
            HE = ss(BE),
            WE = is(),
            os = ss(WE);
        function ss(e) {
            return e && e.__esModule ? e : { default: e };
        }
        var as = (nn.ActionTypes = { INIT: "@@redux/INIT" });
        function us(e, t, n) {
            var r;
            if (
                (typeof t == "function" &&
                    typeof n > "u" &&
                    ((n = t), (t = void 0)),
                typeof n < "u")
            ) {
                if (typeof n != "function")
                    throw new Error("Expected the enhancer to be a function.");
                return n(us)(e, t);
            }
            if (typeof e != "function")
                throw new Error("Expected the reducer to be a function.");
            var i = e,
                o = t,
                s = [],
                a = s,
                u = !1;
            function c() {
                a === s && (a = s.slice());
            }
            function y() {
                return o;
            }
            function g(_) {
                if (typeof _ != "function")
                    throw new Error("Expected listener to be a function.");
                var b = !0;
                return (
                    c(),
                    a.push(_),
                    function () {
                        if (b) {
                            (b = !1), c();
                            var S = a.indexOf(_);
                            a.splice(S, 1);
                        }
                    }
                );
            }
            function p(_) {
                if (!(0, HE.default)(_))
                    throw new Error(
                        "Actions must be plain objects. Use custom middleware for async actions."
                    );
                if (typeof _.type > "u")
                    throw new Error(
                        'Actions may not have an undefined "type" property. Have you misspelled a constant?'
                    );
                if (u) throw new Error("Reducers may not dispatch actions.");
                try {
                    (u = !0), (o = i(o, _));
                } finally {
                    u = !1;
                }
                for (var b = (s = a), I = 0; I < b.length; I++) b[I]();
                return _;
            }
            function h(_) {
                if (typeof _ != "function")
                    throw new Error(
                        "Expected the nextReducer to be a function."
                    );
                (i = _), p({ type: as.INIT });
            }
            function m() {
                var _,
                    b = g;
                return (
                    (_ = {
                        subscribe: function (S) {
                            if (typeof S != "object")
                                throw new TypeError(
                                    "Expected the observer to be an object."
                                );
                            function A() {
                                S.next && S.next(y());
                            }
                            A();
                            var C = b(A);
                            return { unsubscribe: C };
                        },
                    }),
                    (_[os.default] = function () {
                        return this;
                    }),
                    _
                );
            }
            return (
                p({ type: as.INIT }),
                (r = {
                    dispatch: p,
                    subscribe: g,
                    getState: y,
                    replaceReducer: h,
                }),
                (r[os.default] = m),
                r
            );
        }
    });
    var li = f((ci) => {
        "use strict";
        ci.__esModule = !0;
        ci.default = zE;
        function zE(e) {
            typeof console < "u" &&
                typeof console.error == "function" &&
                console.error(e);
            try {
                throw new Error(e);
            } catch {}
        }
    });
    var fs = f((fi) => {
        "use strict";
        fi.__esModule = !0;
        fi.default = $E;
        var cs = ui(),
            jE = ii(),
            e2 = ls(jE),
            KE = li(),
            t2 = ls(KE);
        function ls(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function YE(e, t) {
            var n = t && t.type,
                r = (n && '"' + n.toString() + '"') || "an action";
            return (
                "Given action " +
                r +
                ', reducer "' +
                e +
                '" returned undefined. To ignore an action, you must explicitly return the previous state.'
            );
        }
        function QE(e) {
            Object.keys(e).forEach(function (t) {
                var n = e[t],
                    r = n(void 0, { type: cs.ActionTypes.INIT });
                if (typeof r > "u")
                    throw new Error(
                        'Reducer "' +
                            t +
                            '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
                    );
                var i =
                    "@@redux/PROBE_UNKNOWN_ACTION_" +
                    Math.random().toString(36).substring(7).split("").join(".");
                if (typeof n(void 0, { type: i }) > "u")
                    throw new Error(
                        'Reducer "' +
                            t +
                            '" returned undefined when probed with a random type. ' +
                            ("Don't try to handle " +
                                cs.ActionTypes.INIT +
                                ' or other actions in "redux/*" ') +
                            "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
                    );
            });
        }
        function $E(e) {
            for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
                var i = t[r];
                typeof e[i] == "function" && (n[i] = e[i]);
            }
            var o = Object.keys(n);
            if (!1) var s;
            var a;
            try {
                QE(n);
            } catch (u) {
                a = u;
            }
            return function () {
                var c =
                        arguments.length <= 0 || arguments[0] === void 0
                            ? {}
                            : arguments[0],
                    y = arguments[1];
                if (a) throw a;
                if (!1) var g;
                for (var p = !1, h = {}, m = 0; m < o.length; m++) {
                    var _ = o[m],
                        b = n[_],
                        I = c[_],
                        S = b(I, y);
                    if (typeof S > "u") {
                        var A = YE(_, y);
                        throw new Error(A);
                    }
                    (h[_] = S), (p = p || S !== I);
                }
                return p ? h : c;
            };
        }
    });
    var ps = f((di) => {
        "use strict";
        di.__esModule = !0;
        di.default = ZE;
        function ds(e, t) {
            return function () {
                return t(e.apply(void 0, arguments));
            };
        }
        function ZE(e, t) {
            if (typeof e == "function") return ds(e, t);
            if (typeof e != "object" || e === null)
                throw new Error(
                    "bindActionCreators expected an object or a function, instead received " +
                        (e === null ? "null" : typeof e) +
                        '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
            for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
                var o = n[i],
                    s = e[o];
                typeof s == "function" && (r[o] = ds(s, t));
            }
            return r;
        }
    });
    var gi = f((pi) => {
        "use strict";
        pi.__esModule = !0;
        pi.default = JE;
        function JE() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            if (t.length === 0)
                return function (o) {
                    return o;
                };
            if (t.length === 1) return t[0];
            var r = t[t.length - 1],
                i = t.slice(0, -1);
            return function () {
                return i.reduceRight(function (o, s) {
                    return s(o);
                }, r.apply(void 0, arguments));
            };
        }
    });
    var gs = f((hi) => {
        "use strict";
        hi.__esModule = !0;
        var ev =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) &&
                            (e[r] = n[r]);
                }
                return e;
            };
        hi.default = iv;
        var tv = gi(),
            nv = rv(tv);
        function rv(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function iv() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            return function (r) {
                return function (i, o, s) {
                    var a = r(i, o, s),
                        u = a.dispatch,
                        c = [],
                        y = {
                            getState: a.getState,
                            dispatch: function (p) {
                                return u(p);
                            },
                        };
                    return (
                        (c = t.map(function (g) {
                            return g(y);
                        })),
                        (u = nv.default.apply(void 0, c)(a.dispatch)),
                        ev({}, a, { dispatch: u })
                    );
                };
            };
        }
    });
    var yi = f((Ge) => {
        "use strict";
        Ge.__esModule = !0;
        Ge.compose =
            Ge.applyMiddleware =
            Ge.bindActionCreators =
            Ge.combineReducers =
            Ge.createStore =
                void 0;
        var ov = ui(),
            av = Rt(ov),
            sv = fs(),
            uv = Rt(sv),
            cv = ps(),
            lv = Rt(cv),
            fv = gs(),
            dv = Rt(fv),
            pv = gi(),
            gv = Rt(pv),
            hv = li(),
            a2 = Rt(hv);
        function Rt(e) {
            return e && e.__esModule ? e : { default: e };
        }
        Ge.createStore = av.default;
        Ge.combineReducers = uv.default;
        Ge.bindActionCreators = lv.default;
        Ge.applyMiddleware = dv.default;
        Ge.compose = gv.default;
    });
    var We,
        Ei,
        Ze,
        yv,
        Ev,
        kn,
        vv,
        vi = ye(() => {
            "use strict";
            (We = {
                NAVBAR_OPEN: "NAVBAR_OPEN",
                NAVBAR_CLOSE: "NAVBAR_CLOSE",
                TAB_ACTIVE: "TAB_ACTIVE",
                TAB_INACTIVE: "TAB_INACTIVE",
                SLIDER_ACTIVE: "SLIDER_ACTIVE",
                SLIDER_INACTIVE: "SLIDER_INACTIVE",
                DROPDOWN_OPEN: "DROPDOWN_OPEN",
                DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
                MOUSE_CLICK: "MOUSE_CLICK",
                MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
                MOUSE_DOWN: "MOUSE_DOWN",
                MOUSE_UP: "MOUSE_UP",
                MOUSE_OVER: "MOUSE_OVER",
                MOUSE_OUT: "MOUSE_OUT",
                MOUSE_MOVE: "MOUSE_MOVE",
                MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
                SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
                SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
                SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
                ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
                ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
                PAGE_START: "PAGE_START",
                PAGE_FINISH: "PAGE_FINISH",
                PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
                PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
                PAGE_SCROLL: "PAGE_SCROLL",
            }),
                (Ei = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
                (Ze = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
                (yv = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
                (Ev = {
                    CHILDREN: "CHILDREN",
                    SIBLINGS: "SIBLINGS",
                    IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
                }),
                (kn = {
                    FADE_EFFECT: "FADE_EFFECT",
                    SLIDE_EFFECT: "SLIDE_EFFECT",
                    GROW_EFFECT: "GROW_EFFECT",
                    SHRINK_EFFECT: "SHRINK_EFFECT",
                    SPIN_EFFECT: "SPIN_EFFECT",
                    FLY_EFFECT: "FLY_EFFECT",
                    POP_EFFECT: "POP_EFFECT",
                    FLIP_EFFECT: "FLIP_EFFECT",
                    JIGGLE_EFFECT: "JIGGLE_EFFECT",
                    PULSE_EFFECT: "PULSE_EFFECT",
                    DROP_EFFECT: "DROP_EFFECT",
                    BLINK_EFFECT: "BLINK_EFFECT",
                    BOUNCE_EFFECT: "BOUNCE_EFFECT",
                    FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
                    FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
                    RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
                    JELLO_EFFECT: "JELLO_EFFECT",
                    GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
                    SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
                    PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
                }),
                (vv = {
                    LEFT: "LEFT",
                    RIGHT: "RIGHT",
                    BOTTOM: "BOTTOM",
                    TOP: "TOP",
                    BOTTOM_LEFT: "BOTTOM_LEFT",
                    BOTTOM_RIGHT: "BOTTOM_RIGHT",
                    TOP_RIGHT: "TOP_RIGHT",
                    TOP_LEFT: "TOP_LEFT",
                    CLOCKWISE: "CLOCKWISE",
                    COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
                });
        });
    var Re,
        mv,
        Gn = ye(() => {
            "use strict";
            (Re = {
                TRANSFORM_MOVE: "TRANSFORM_MOVE",
                TRANSFORM_SCALE: "TRANSFORM_SCALE",
                TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
                TRANSFORM_SKEW: "TRANSFORM_SKEW",
                STYLE_OPACITY: "STYLE_OPACITY",
                STYLE_SIZE: "STYLE_SIZE",
                STYLE_FILTER: "STYLE_FILTER",
                STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
                STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
                STYLE_BORDER: "STYLE_BORDER",
                STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
                OBJECT_VALUE: "OBJECT_VALUE",
                PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
                PLUGIN_SPLINE: "PLUGIN_SPLINE",
                PLUGIN_RIVE: "PLUGIN_RIVE",
                PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
                GENERAL_DISPLAY: "GENERAL_DISPLAY",
                GENERAL_START_ACTION: "GENERAL_START_ACTION",
                GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
                GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
                GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
                GENERAL_LOOP: "GENERAL_LOOP",
                STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
            }),
                (mv = {
                    ELEMENT: "ELEMENT",
                    ELEMENT_CLASS: "ELEMENT_CLASS",
                    TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
                });
        });
    var _v,
        hs = ye(() => {
            "use strict";
            _v = {
                MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
                MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
                MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
                SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
                SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
                MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
                    "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
                PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
                PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
                PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
                NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
                DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
                ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
                TAB_INTERACTION: "TAB_INTERACTION",
                SLIDER_INTERACTION: "SLIDER_INTERACTION",
            };
        });
    var Iv,
        Tv,
        bv,
        Av,
        wv,
        Sv,
        Ov,
        mi,
        ys = ye(() => {
            "use strict";
            Gn();
            ({
                TRANSFORM_MOVE: Iv,
                TRANSFORM_SCALE: Tv,
                TRANSFORM_ROTATE: bv,
                TRANSFORM_SKEW: Av,
                STYLE_SIZE: wv,
                STYLE_FILTER: Sv,
                STYLE_FONT_VARIATION: Ov,
            } = Re),
                (mi = {
                    [Iv]: !0,
                    [Tv]: !0,
                    [bv]: !0,
                    [Av]: !0,
                    [wv]: !0,
                    [Sv]: !0,
                    [Ov]: !0,
                });
        });
    var Te = {};
    Ne(Te, {
        IX2_ACTION_LIST_PLAYBACK_CHANGED: () => Hv,
        IX2_ANIMATION_FRAME_CHANGED: () => kv,
        IX2_CLEAR_REQUESTED: () => Mv,
        IX2_ELEMENT_STATE_CHANGED: () => Bv,
        IX2_EVENT_LISTENER_ADDED: () => Fv,
        IX2_EVENT_STATE_CHANGED: () => qv,
        IX2_INSTANCE_ADDED: () => Xv,
        IX2_INSTANCE_REMOVED: () => Uv,
        IX2_INSTANCE_STARTED: () => Vv,
        IX2_MEDIA_QUERIES_DEFINED: () => zv,
        IX2_PARAMETER_CHANGED: () => Gv,
        IX2_PLAYBACK_REQUESTED: () => Nv,
        IX2_PREVIEW_REQUESTED: () => Lv,
        IX2_RAW_DATA_IMPORTED: () => xv,
        IX2_SESSION_INITIALIZED: () => Rv,
        IX2_SESSION_STARTED: () => Cv,
        IX2_SESSION_STOPPED: () => Pv,
        IX2_STOP_REQUESTED: () => Dv,
        IX2_TEST_FRAME_RENDERED: () => jv,
        IX2_VIEWPORT_WIDTH_CHANGED: () => Wv,
    });
    var xv,
        Rv,
        Cv,
        Pv,
        Lv,
        Nv,
        Dv,
        Mv,
        Fv,
        qv,
        kv,
        Gv,
        Xv,
        Vv,
        Uv,
        Bv,
        Hv,
        Wv,
        zv,
        jv,
        Es = ye(() => {
            "use strict";
            (xv = "IX2_RAW_DATA_IMPORTED"),
                (Rv = "IX2_SESSION_INITIALIZED"),
                (Cv = "IX2_SESSION_STARTED"),
                (Pv = "IX2_SESSION_STOPPED"),
                (Lv = "IX2_PREVIEW_REQUESTED"),
                (Nv = "IX2_PLAYBACK_REQUESTED"),
                (Dv = "IX2_STOP_REQUESTED"),
                (Mv = "IX2_CLEAR_REQUESTED"),
                (Fv = "IX2_EVENT_LISTENER_ADDED"),
                (qv = "IX2_EVENT_STATE_CHANGED"),
                (kv = "IX2_ANIMATION_FRAME_CHANGED"),
                (Gv = "IX2_PARAMETER_CHANGED"),
                (Xv = "IX2_INSTANCE_ADDED"),
                (Vv = "IX2_INSTANCE_STARTED"),
                (Uv = "IX2_INSTANCE_REMOVED"),
                (Bv = "IX2_ELEMENT_STATE_CHANGED"),
                (Hv = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
                (Wv = "IX2_VIEWPORT_WIDTH_CHANGED"),
                (zv = "IX2_MEDIA_QUERIES_DEFINED"),
                (jv = "IX2_TEST_FRAME_RENDERED");
        });
    var we = {};
    Ne(we, {
        ABSTRACT_NODE: () => Wm,
        AUTO: () => Dm,
        BACKGROUND: () => xm,
        BACKGROUND_COLOR: () => Om,
        BAR_DELIMITER: () => qm,
        BORDER_COLOR: () => Rm,
        BOUNDARY_SELECTOR: () => Zv,
        CHILDREN: () => km,
        COLON_DELIMITER: () => Fm,
        COLOR: () => Cm,
        COMMA_DELIMITER: () => Mm,
        CONFIG_UNIT: () => am,
        CONFIG_VALUE: () => nm,
        CONFIG_X_UNIT: () => rm,
        CONFIG_X_VALUE: () => Jv,
        CONFIG_Y_UNIT: () => im,
        CONFIG_Y_VALUE: () => em,
        CONFIG_Z_UNIT: () => om,
        CONFIG_Z_VALUE: () => tm,
        DISPLAY: () => Pm,
        FILTER: () => bm,
        FLEX: () => Lm,
        FONT_VARIATION_SETTINGS: () => Am,
        HEIGHT: () => Sm,
        HTML_ELEMENT: () => Bm,
        IMMEDIATE_CHILDREN: () => Gm,
        IX2_ID_DELIMITER: () => Kv,
        OPACITY: () => Tm,
        PARENT: () => Vm,
        PLAIN_OBJECT: () => Hm,
        PRESERVE_3D: () => Um,
        RENDER_GENERAL: () => jm,
        RENDER_PLUGIN: () => Ym,
        RENDER_STYLE: () => Km,
        RENDER_TRANSFORM: () => zm,
        ROTATE_X: () => ym,
        ROTATE_Y: () => Em,
        ROTATE_Z: () => vm,
        SCALE_3D: () => hm,
        SCALE_X: () => dm,
        SCALE_Y: () => pm,
        SCALE_Z: () => gm,
        SIBLINGS: () => Xm,
        SKEW: () => mm,
        SKEW_X: () => _m,
        SKEW_Y: () => Im,
        TRANSFORM: () => sm,
        TRANSLATE_3D: () => fm,
        TRANSLATE_X: () => um,
        TRANSLATE_Y: () => cm,
        TRANSLATE_Z: () => lm,
        WF_PAGE: () => Yv,
        WIDTH: () => wm,
        WILL_CHANGE: () => Nm,
        W_MOD_IX: () => $v,
        W_MOD_JS: () => Qv,
    });
    var Kv,
        Yv,
        Qv,
        $v,
        Zv,
        Jv,
        em,
        tm,
        nm,
        rm,
        im,
        om,
        am,
        sm,
        um,
        cm,
        lm,
        fm,
        dm,
        pm,
        gm,
        hm,
        ym,
        Em,
        vm,
        mm,
        _m,
        Im,
        Tm,
        bm,
        Am,
        wm,
        Sm,
        Om,
        xm,
        Rm,
        Cm,
        Pm,
        Lm,
        Nm,
        Dm,
        Mm,
        Fm,
        qm,
        km,
        Gm,
        Xm,
        Vm,
        Um,
        Bm,
        Hm,
        Wm,
        zm,
        jm,
        Km,
        Ym,
        vs = ye(() => {
            "use strict";
            (Kv = "|"),
                (Yv = "data-wf-page"),
                (Qv = "w-mod-js"),
                ($v = "w-mod-ix"),
                (Zv = ".w-dyn-item"),
                (Jv = "xValue"),
                (em = "yValue"),
                (tm = "zValue"),
                (nm = "value"),
                (rm = "xUnit"),
                (im = "yUnit"),
                (om = "zUnit"),
                (am = "unit"),
                (sm = "transform"),
                (um = "translateX"),
                (cm = "translateY"),
                (lm = "translateZ"),
                (fm = "translate3d"),
                (dm = "scaleX"),
                (pm = "scaleY"),
                (gm = "scaleZ"),
                (hm = "scale3d"),
                (ym = "rotateX"),
                (Em = "rotateY"),
                (vm = "rotateZ"),
                (mm = "skew"),
                (_m = "skewX"),
                (Im = "skewY"),
                (Tm = "opacity"),
                (bm = "filter"),
                (Am = "font-variation-settings"),
                (wm = "width"),
                (Sm = "height"),
                (Om = "backgroundColor"),
                (xm = "background"),
                (Rm = "borderColor"),
                (Cm = "color"),
                (Pm = "display"),
                (Lm = "flex"),
                (Nm = "willChange"),
                (Dm = "AUTO"),
                (Mm = ","),
                (Fm = ":"),
                (qm = "|"),
                (km = "CHILDREN"),
                (Gm = "IMMEDIATE_CHILDREN"),
                (Xm = "SIBLINGS"),
                (Vm = "PARENT"),
                (Um = "preserve-3d"),
                (Bm = "HTML_ELEMENT"),
                (Hm = "PLAIN_OBJECT"),
                (Wm = "ABSTRACT_NODE"),
                (zm = "RENDER_TRANSFORM"),
                (jm = "RENDER_GENERAL"),
                (Km = "RENDER_STYLE"),
                (Ym = "RENDER_PLUGIN");
        });
    var ms = {};
    Ne(ms, {
        ActionAppliesTo: () => mv,
        ActionTypeConsts: () => Re,
        EventAppliesTo: () => Ei,
        EventBasedOn: () => Ze,
        EventContinuousMouseAxes: () => yv,
        EventLimitAffectedElements: () => Ev,
        EventTypeConsts: () => We,
        IX2EngineActionTypes: () => Te,
        IX2EngineConstants: () => we,
        InteractionTypeConsts: () => _v,
        QuickEffectDirectionConsts: () => vv,
        QuickEffectIds: () => kn,
        ReducedMotionTypes: () => mi,
    });
    var De = ye(() => {
        "use strict";
        vi();
        Gn();
        hs();
        ys();
        Es();
        vs();
        Gn();
        vi();
    });
    var Qm,
        _s,
        Is = ye(() => {
            "use strict";
            De();
            ({ IX2_RAW_DATA_IMPORTED: Qm } = Te),
                (_s = (e = Object.freeze({}), t) => {
                    switch (t.type) {
                        case Qm:
                            return t.payload.ixData || Object.freeze({});
                        default:
                            return e;
                    }
                });
        });
    var Ct = f((ve) => {
        "use strict";
        Object.defineProperty(ve, "__esModule", { value: !0 });
        var $m =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e &&
                          typeof Symbol == "function" &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                  };
        ve.clone = Vn;
        ve.addLast = As;
        ve.addFirst = ws;
        ve.removeLast = Ss;
        ve.removeFirst = Os;
        ve.insert = xs;
        ve.removeAt = Rs;
        ve.replaceAt = Cs;
        ve.getIn = Un;
        ve.set = Bn;
        ve.setIn = Hn;
        ve.update = Ls;
        ve.updateIn = Ns;
        ve.merge = Ds;
        ve.mergeDeep = Ms;
        ve.mergeIn = Fs;
        ve.omit = qs;
        ve.addDefaults = ks;
        var Ts = "INVALID_ARGS";
        function bs(e) {
            throw new Error(e);
        }
        function _i(e) {
            var t = Object.keys(e);
            return Object.getOwnPropertySymbols
                ? t.concat(Object.getOwnPropertySymbols(e))
                : t;
        }
        var Zm = {}.hasOwnProperty;
        function Vn(e) {
            if (Array.isArray(e)) return e.slice();
            for (var t = _i(e), n = {}, r = 0; r < t.length; r++) {
                var i = t[r];
                n[i] = e[i];
            }
            return n;
        }
        function Me(e, t, n) {
            var r = n;
            r == null && bs(Ts);
            for (
                var i = !1,
                    o = arguments.length,
                    s = Array(o > 3 ? o - 3 : 0),
                    a = 3;
                a < o;
                a++
            )
                s[a - 3] = arguments[a];
            for (var u = 0; u < s.length; u++) {
                var c = s[u];
                if (c != null) {
                    var y = _i(c);
                    if (y.length)
                        for (var g = 0; g <= y.length; g++) {
                            var p = y[g];
                            if (!(e && r[p] !== void 0)) {
                                var h = c[p];
                                t &&
                                    Xn(r[p]) &&
                                    Xn(h) &&
                                    (h = Me(e, t, r[p], h)),
                                    !(h === void 0 || h === r[p]) &&
                                        (i || ((i = !0), (r = Vn(r))),
                                        (r[p] = h));
                            }
                        }
                }
            }
            return r;
        }
        function Xn(e) {
            var t = typeof e > "u" ? "undefined" : $m(e);
            return e != null && (t === "object" || t === "function");
        }
        function As(e, t) {
            return Array.isArray(t) ? e.concat(t) : e.concat([t]);
        }
        function ws(e, t) {
            return Array.isArray(t) ? t.concat(e) : [t].concat(e);
        }
        function Ss(e) {
            return e.length ? e.slice(0, e.length - 1) : e;
        }
        function Os(e) {
            return e.length ? e.slice(1) : e;
        }
        function xs(e, t, n) {
            return e
                .slice(0, t)
                .concat(Array.isArray(n) ? n : [n])
                .concat(e.slice(t));
        }
        function Rs(e, t) {
            return t >= e.length || t < 0
                ? e
                : e.slice(0, t).concat(e.slice(t + 1));
        }
        function Cs(e, t, n) {
            if (e[t] === n) return e;
            for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
            return (i[t] = n), i;
        }
        function Un(e, t) {
            if ((!Array.isArray(t) && bs(Ts), e != null)) {
                for (var n = e, r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (((n = n?.[i]), n === void 0)) return n;
                }
                return n;
            }
        }
        function Bn(e, t, n) {
            var r = typeof t == "number" ? [] : {},
                i = e ?? r;
            if (i[t] === n) return i;
            var o = Vn(i);
            return (o[t] = n), o;
        }
        function Ps(e, t, n, r) {
            var i = void 0,
                o = t[r];
            if (r === t.length - 1) i = n;
            else {
                var s =
                    Xn(e) && Xn(e[o])
                        ? e[o]
                        : typeof t[r + 1] == "number"
                        ? []
                        : {};
                i = Ps(s, t, n, r + 1);
            }
            return Bn(e, o, i);
        }
        function Hn(e, t, n) {
            return t.length ? Ps(e, t, n, 0) : n;
        }
        function Ls(e, t, n) {
            var r = e?.[t],
                i = n(r);
            return Bn(e, t, i);
        }
        function Ns(e, t, n) {
            var r = Un(e, t),
                i = n(r);
            return Hn(e, t, i);
        }
        function Ds(e, t, n, r, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? Me.call.apply(Me, [null, !1, !1, e, t, n, r, i, o].concat(a))
                : Me(!1, !1, e, t, n, r, i, o);
        }
        function Ms(e, t, n, r, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? Me.call.apply(Me, [null, !1, !0, e, t, n, r, i, o].concat(a))
                : Me(!1, !0, e, t, n, r, i, o);
        }
        function Fs(e, t, n, r, i, o, s) {
            var a = Un(e, t);
            a == null && (a = {});
            for (
                var u = void 0,
                    c = arguments.length,
                    y = Array(c > 7 ? c - 7 : 0),
                    g = 7;
                g < c;
                g++
            )
                y[g - 7] = arguments[g];
            return (
                y.length
                    ? (u = Me.call.apply(
                          Me,
                          [null, !1, !1, a, n, r, i, o, s].concat(y)
                      ))
                    : (u = Me(!1, !1, a, n, r, i, o, s)),
                Hn(e, t, u)
            );
        }
        function qs(e, t) {
            for (
                var n = Array.isArray(t) ? t : [t], r = !1, i = 0;
                i < n.length;
                i++
            )
                if (Zm.call(e, n[i])) {
                    r = !0;
                    break;
                }
            if (!r) return e;
            for (var o = {}, s = _i(e), a = 0; a < s.length; a++) {
                var u = s[a];
                n.indexOf(u) >= 0 || (o[u] = e[u]);
            }
            return o;
        }
        function ks(e, t, n, r, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? Me.call.apply(Me, [null, !0, !1, e, t, n, r, i, o].concat(a))
                : Me(!0, !1, e, t, n, r, i, o);
        }
        var Jm = {
            clone: Vn,
            addLast: As,
            addFirst: ws,
            removeLast: Ss,
            removeFirst: Os,
            insert: xs,
            removeAt: Rs,
            replaceAt: Cs,
            getIn: Un,
            set: Bn,
            setIn: Hn,
            update: Ls,
            updateIn: Ns,
            merge: Ds,
            mergeDeep: Ms,
            mergeIn: Fs,
            omit: qs,
            addDefaults: ks,
        };
        ve.default = Jm;
    });
    var Xs,
        e_,
        t_,
        n_,
        r_,
        i_,
        Gs,
        Vs,
        Us = ye(() => {
            "use strict";
            De();
            (Xs = le(Ct())),
                ({
                    IX2_PREVIEW_REQUESTED: e_,
                    IX2_PLAYBACK_REQUESTED: t_,
                    IX2_STOP_REQUESTED: n_,
                    IX2_CLEAR_REQUESTED: r_,
                } = Te),
                (i_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
                (Gs = Object.create(null, {
                    [e_]: { value: "preview" },
                    [t_]: { value: "playback" },
                    [n_]: { value: "stop" },
                    [r_]: { value: "clear" },
                })),
                (Vs = (e = i_, t) => {
                    if (t.type in Gs) {
                        let n = [Gs[t.type]];
                        return (0, Xs.setIn)(e, [n], { ...t.payload });
                    }
                    return e;
                });
        });
    var Ce,
        o_,
        a_,
        s_,
        u_,
        c_,
        l_,
        f_,
        d_,
        p_,
        g_,
        Bs,
        h_,
        Hs,
        Ws = ye(() => {
            "use strict";
            De();
            (Ce = le(Ct())),
                ({
                    IX2_SESSION_INITIALIZED: o_,
                    IX2_SESSION_STARTED: a_,
                    IX2_TEST_FRAME_RENDERED: s_,
                    IX2_SESSION_STOPPED: u_,
                    IX2_EVENT_LISTENER_ADDED: c_,
                    IX2_EVENT_STATE_CHANGED: l_,
                    IX2_ANIMATION_FRAME_CHANGED: f_,
                    IX2_ACTION_LIST_PLAYBACK_CHANGED: d_,
                    IX2_VIEWPORT_WIDTH_CHANGED: p_,
                    IX2_MEDIA_QUERIES_DEFINED: g_,
                } = Te),
                (Bs = {
                    active: !1,
                    tick: 0,
                    eventListeners: [],
                    eventState: {},
                    playbackState: {},
                    viewportWidth: 0,
                    mediaQueryKey: null,
                    hasBoundaryNodes: !1,
                    hasDefinedMediaQueries: !1,
                    reducedMotion: !1,
                }),
                (h_ = 20),
                (Hs = (e = Bs, t) => {
                    switch (t.type) {
                        case o_: {
                            let { hasBoundaryNodes: n, reducedMotion: r } =
                                t.payload;
                            return (0, Ce.merge)(e, {
                                hasBoundaryNodes: n,
                                reducedMotion: r,
                            });
                        }
                        case a_:
                            return (0, Ce.set)(e, "active", !0);
                        case s_: {
                            let {
                                payload: { step: n = h_ },
                            } = t;
                            return (0, Ce.set)(e, "tick", e.tick + n);
                        }
                        case u_:
                            return Bs;
                        case f_: {
                            let {
                                payload: { now: n },
                            } = t;
                            return (0, Ce.set)(e, "tick", n);
                        }
                        case c_: {
                            let n = (0, Ce.addLast)(
                                e.eventListeners,
                                t.payload
                            );
                            return (0, Ce.set)(e, "eventListeners", n);
                        }
                        case l_: {
                            let { stateKey: n, newState: r } = t.payload;
                            return (0, Ce.setIn)(e, ["eventState", n], r);
                        }
                        case d_: {
                            let { actionListId: n, isPlaying: r } = t.payload;
                            return (0, Ce.setIn)(e, ["playbackState", n], r);
                        }
                        case p_: {
                            let { width: n, mediaQueries: r } = t.payload,
                                i = r.length,
                                o = null;
                            for (let s = 0; s < i; s++) {
                                let { key: a, min: u, max: c } = r[s];
                                if (n >= u && n <= c) {
                                    o = a;
                                    break;
                                }
                            }
                            return (0, Ce.merge)(e, {
                                viewportWidth: n,
                                mediaQueryKey: o,
                            });
                        }
                        case g_:
                            return (0, Ce.set)(e, "hasDefinedMediaQueries", !0);
                        default:
                            return e;
                    }
                });
        });
    var js = f((S2, zs) => {
        function y_() {
            (this.__data__ = []), (this.size = 0);
        }
        zs.exports = y_;
    });
    var Wn = f((O2, Ks) => {
        function E_(e, t) {
            return e === t || (e !== e && t !== t);
        }
        Ks.exports = E_;
    });
    var rn = f((x2, Ys) => {
        var v_ = Wn();
        function m_(e, t) {
            for (var n = e.length; n--; ) if (v_(e[n][0], t)) return n;
            return -1;
        }
        Ys.exports = m_;
    });
    var $s = f((R2, Qs) => {
        var __ = rn(),
            I_ = Array.prototype,
            T_ = I_.splice;
        function b_(e) {
            var t = this.__data__,
                n = __(t, e);
            if (n < 0) return !1;
            var r = t.length - 1;
            return n == r ? t.pop() : T_.call(t, n, 1), --this.size, !0;
        }
        Qs.exports = b_;
    });
    var Js = f((C2, Zs) => {
        var A_ = rn();
        function w_(e) {
            var t = this.__data__,
                n = A_(t, e);
            return n < 0 ? void 0 : t[n][1];
        }
        Zs.exports = w_;
    });
    var tu = f((P2, eu) => {
        var S_ = rn();
        function O_(e) {
            return S_(this.__data__, e) > -1;
        }
        eu.exports = O_;
    });
    var ru = f((L2, nu) => {
        var x_ = rn();
        function R_(e, t) {
            var n = this.__data__,
                r = x_(n, e);
            return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
        }
        nu.exports = R_;
    });
    var on = f((N2, iu) => {
        var C_ = js(),
            P_ = $s(),
            L_ = Js(),
            N_ = tu(),
            D_ = ru();
        function Pt(e) {
            var t = -1,
                n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1]);
            }
        }
        Pt.prototype.clear = C_;
        Pt.prototype.delete = P_;
        Pt.prototype.get = L_;
        Pt.prototype.has = N_;
        Pt.prototype.set = D_;
        iu.exports = Pt;
    });
    var au = f((D2, ou) => {
        var M_ = on();
        function F_() {
            (this.__data__ = new M_()), (this.size = 0);
        }
        ou.exports = F_;
    });
    var uu = f((M2, su) => {
        function q_(e) {
            var t = this.__data__,
                n = t.delete(e);
            return (this.size = t.size), n;
        }
        su.exports = q_;
    });
    var lu = f((F2, cu) => {
        function k_(e) {
            return this.__data__.get(e);
        }
        cu.exports = k_;
    });
    var du = f((q2, fu) => {
        function G_(e) {
            return this.__data__.has(e);
        }
        fu.exports = G_;
    });
    var Je = f((k2, pu) => {
        function X_(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function");
        }
        pu.exports = X_;
    });
    var Ii = f((G2, gu) => {
        var V_ = lt(),
            U_ = Je(),
            B_ = "[object AsyncFunction]",
            H_ = "[object Function]",
            W_ = "[object GeneratorFunction]",
            z_ = "[object Proxy]";
        function j_(e) {
            if (!U_(e)) return !1;
            var t = V_(e);
            return t == H_ || t == W_ || t == B_ || t == z_;
        }
        gu.exports = j_;
    });
    var yu = f((X2, hu) => {
        var K_ = He(),
            Y_ = K_["__core-js_shared__"];
        hu.exports = Y_;
    });
    var mu = f((V2, vu) => {
        var Ti = yu(),
            Eu = (function () {
                var e = /[^.]+$/.exec(
                    (Ti && Ti.keys && Ti.keys.IE_PROTO) || ""
                );
                return e ? "Symbol(src)_1." + e : "";
            })();
        function Q_(e) {
            return !!Eu && Eu in e;
        }
        vu.exports = Q_;
    });
    var bi = f((U2, _u) => {
        var $_ = Function.prototype,
            Z_ = $_.toString;
        function J_(e) {
            if (e != null) {
                try {
                    return Z_.call(e);
                } catch {}
                try {
                    return e + "";
                } catch {}
            }
            return "";
        }
        _u.exports = J_;
    });
    var Tu = f((B2, Iu) => {
        var eI = Ii(),
            tI = mu(),
            nI = Je(),
            rI = bi(),
            iI = /[\\^$.*+?()[\]{}|]/g,
            oI = /^\[object .+?Constructor\]$/,
            aI = Function.prototype,
            sI = Object.prototype,
            uI = aI.toString,
            cI = sI.hasOwnProperty,
            lI = RegExp(
                "^" +
                    uI
                        .call(cI)
                        .replace(iI, "\\$&")
                        .replace(
                            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                            "$1.*?"
                        ) +
                    "$"
            );
        function fI(e) {
            if (!nI(e) || tI(e)) return !1;
            var t = eI(e) ? lI : oI;
            return t.test(rI(e));
        }
        Iu.exports = fI;
    });
    var Au = f((H2, bu) => {
        function dI(e, t) {
            return e?.[t];
        }
        bu.exports = dI;
    });
    var ft = f((W2, wu) => {
        var pI = Tu(),
            gI = Au();
        function hI(e, t) {
            var n = gI(e, t);
            return pI(n) ? n : void 0;
        }
        wu.exports = hI;
    });
    var zn = f((z2, Su) => {
        var yI = ft(),
            EI = He(),
            vI = yI(EI, "Map");
        Su.exports = vI;
    });
    var an = f((j2, Ou) => {
        var mI = ft(),
            _I = mI(Object, "create");
        Ou.exports = _I;
    });
    var Cu = f((K2, Ru) => {
        var xu = an();
        function II() {
            (this.__data__ = xu ? xu(null) : {}), (this.size = 0);
        }
        Ru.exports = II;
    });
    var Lu = f((Y2, Pu) => {
        function TI(e) {
            var t = this.has(e) && delete this.__data__[e];
            return (this.size -= t ? 1 : 0), t;
        }
        Pu.exports = TI;
    });
    var Du = f((Q2, Nu) => {
        var bI = an(),
            AI = "__lodash_hash_undefined__",
            wI = Object.prototype,
            SI = wI.hasOwnProperty;
        function OI(e) {
            var t = this.__data__;
            if (bI) {
                var n = t[e];
                return n === AI ? void 0 : n;
            }
            return SI.call(t, e) ? t[e] : void 0;
        }
        Nu.exports = OI;
    });
    var Fu = f(($2, Mu) => {
        var xI = an(),
            RI = Object.prototype,
            CI = RI.hasOwnProperty;
        function PI(e) {
            var t = this.__data__;
            return xI ? t[e] !== void 0 : CI.call(t, e);
        }
        Mu.exports = PI;
    });
    var ku = f((Z2, qu) => {
        var LI = an(),
            NI = "__lodash_hash_undefined__";
        function DI(e, t) {
            var n = this.__data__;
            return (
                (this.size += this.has(e) ? 0 : 1),
                (n[e] = LI && t === void 0 ? NI : t),
                this
            );
        }
        qu.exports = DI;
    });
    var Xu = f((J2, Gu) => {
        var MI = Cu(),
            FI = Lu(),
            qI = Du(),
            kI = Fu(),
            GI = ku();
        function Lt(e) {
            var t = -1,
                n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1]);
            }
        }
        Lt.prototype.clear = MI;
        Lt.prototype.delete = FI;
        Lt.prototype.get = qI;
        Lt.prototype.has = kI;
        Lt.prototype.set = GI;
        Gu.exports = Lt;
    });
    var Bu = f((e1, Uu) => {
        var Vu = Xu(),
            XI = on(),
            VI = zn();
        function UI() {
            (this.size = 0),
                (this.__data__ = {
                    hash: new Vu(),
                    map: new (VI || XI)(),
                    string: new Vu(),
                });
        }
        Uu.exports = UI;
    });
    var Wu = f((t1, Hu) => {
        function BI(e) {
            var t = typeof e;
            return t == "string" ||
                t == "number" ||
                t == "symbol" ||
                t == "boolean"
                ? e !== "__proto__"
                : e === null;
        }
        Hu.exports = BI;
    });
    var sn = f((n1, zu) => {
        var HI = Wu();
        function WI(e, t) {
            var n = e.__data__;
            return HI(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
        }
        zu.exports = WI;
    });
    var Ku = f((r1, ju) => {
        var zI = sn();
        function jI(e) {
            var t = zI(this, e).delete(e);
            return (this.size -= t ? 1 : 0), t;
        }
        ju.exports = jI;
    });
    var Qu = f((i1, Yu) => {
        var KI = sn();
        function YI(e) {
            return KI(this, e).get(e);
        }
        Yu.exports = YI;
    });
    var Zu = f((o1, $u) => {
        var QI = sn();
        function $I(e) {
            return QI(this, e).has(e);
        }
        $u.exports = $I;
    });
    var ec = f((a1, Ju) => {
        var ZI = sn();
        function JI(e, t) {
            var n = ZI(this, e),
                r = n.size;
            return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
        }
        Ju.exports = JI;
    });
    var jn = f((s1, tc) => {
        var eT = Bu(),
            tT = Ku(),
            nT = Qu(),
            rT = Zu(),
            iT = ec();
        function Nt(e) {
            var t = -1,
                n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1]);
            }
        }
        Nt.prototype.clear = eT;
        Nt.prototype.delete = tT;
        Nt.prototype.get = nT;
        Nt.prototype.has = rT;
        Nt.prototype.set = iT;
        tc.exports = Nt;
    });
    var rc = f((u1, nc) => {
        var oT = on(),
            aT = zn(),
            sT = jn(),
            uT = 200;
        function cT(e, t) {
            var n = this.__data__;
            if (n instanceof oT) {
                var r = n.__data__;
                if (!aT || r.length < uT - 1)
                    return r.push([e, t]), (this.size = ++n.size), this;
                n = this.__data__ = new sT(r);
            }
            return n.set(e, t), (this.size = n.size), this;
        }
        nc.exports = cT;
    });
    var Ai = f((c1, ic) => {
        var lT = on(),
            fT = au(),
            dT = uu(),
            pT = lu(),
            gT = du(),
            hT = rc();
        function Dt(e) {
            var t = (this.__data__ = new lT(e));
            this.size = t.size;
        }
        Dt.prototype.clear = fT;
        Dt.prototype.delete = dT;
        Dt.prototype.get = pT;
        Dt.prototype.has = gT;
        Dt.prototype.set = hT;
        ic.exports = Dt;
    });
    var ac = f((l1, oc) => {
        var yT = "__lodash_hash_undefined__";
        function ET(e) {
            return this.__data__.set(e, yT), this;
        }
        oc.exports = ET;
    });
    var uc = f((f1, sc) => {
        function vT(e) {
            return this.__data__.has(e);
        }
        sc.exports = vT;
    });
    var lc = f((d1, cc) => {
        var mT = jn(),
            _T = ac(),
            IT = uc();
        function Kn(e) {
            var t = -1,
                n = e == null ? 0 : e.length;
            for (this.__data__ = new mT(); ++t < n; ) this.add(e[t]);
        }
        Kn.prototype.add = Kn.prototype.push = _T;
        Kn.prototype.has = IT;
        cc.exports = Kn;
    });
    var dc = f((p1, fc) => {
        function TT(e, t) {
            for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
                if (t(e[n], n, e)) return !0;
            return !1;
        }
        fc.exports = TT;
    });
    var gc = f((g1, pc) => {
        function bT(e, t) {
            return e.has(t);
        }
        pc.exports = bT;
    });
    var wi = f((h1, hc) => {
        var AT = lc(),
            wT = dc(),
            ST = gc(),
            OT = 1,
            xT = 2;
        function RT(e, t, n, r, i, o) {
            var s = n & OT,
                a = e.length,
                u = t.length;
            if (a != u && !(s && u > a)) return !1;
            var c = o.get(e),
                y = o.get(t);
            if (c && y) return c == t && y == e;
            var g = -1,
                p = !0,
                h = n & xT ? new AT() : void 0;
            for (o.set(e, t), o.set(t, e); ++g < a; ) {
                var m = e[g],
                    _ = t[g];
                if (r) var b = s ? r(_, m, g, t, e, o) : r(m, _, g, e, t, o);
                if (b !== void 0) {
                    if (b) continue;
                    p = !1;
                    break;
                }
                if (h) {
                    if (
                        !wT(t, function (I, S) {
                            if (!ST(h, S) && (m === I || i(m, I, n, r, o)))
                                return h.push(S);
                        })
                    ) {
                        p = !1;
                        break;
                    }
                } else if (!(m === _ || i(m, _, n, r, o))) {
                    p = !1;
                    break;
                }
            }
            return o.delete(e), o.delete(t), p;
        }
        hc.exports = RT;
    });
    var Ec = f((y1, yc) => {
        var CT = He(),
            PT = CT.Uint8Array;
        yc.exports = PT;
    });
    var mc = f((E1, vc) => {
        function LT(e) {
            var t = -1,
                n = Array(e.size);
            return (
                e.forEach(function (r, i) {
                    n[++t] = [i, r];
                }),
                n
            );
        }
        vc.exports = LT;
    });
    var Ic = f((v1, _c) => {
        function NT(e) {
            var t = -1,
                n = Array(e.size);
            return (
                e.forEach(function (r) {
                    n[++t] = r;
                }),
                n
            );
        }
        _c.exports = NT;
    });
    var Sc = f((m1, wc) => {
        var Tc = Ot(),
            bc = Ec(),
            DT = Wn(),
            MT = wi(),
            FT = mc(),
            qT = Ic(),
            kT = 1,
            GT = 2,
            XT = "[object Boolean]",
            VT = "[object Date]",
            UT = "[object Error]",
            BT = "[object Map]",
            HT = "[object Number]",
            WT = "[object RegExp]",
            zT = "[object Set]",
            jT = "[object String]",
            KT = "[object Symbol]",
            YT = "[object ArrayBuffer]",
            QT = "[object DataView]",
            Ac = Tc ? Tc.prototype : void 0,
            Si = Ac ? Ac.valueOf : void 0;
        function $T(e, t, n, r, i, o, s) {
            switch (n) {
                case QT:
                    if (
                        e.byteLength != t.byteLength ||
                        e.byteOffset != t.byteOffset
                    )
                        return !1;
                    (e = e.buffer), (t = t.buffer);
                case YT:
                    return !(
                        e.byteLength != t.byteLength || !o(new bc(e), new bc(t))
                    );
                case XT:
                case VT:
                case HT:
                    return DT(+e, +t);
                case UT:
                    return e.name == t.name && e.message == t.message;
                case WT:
                case jT:
                    return e == t + "";
                case BT:
                    var a = FT;
                case zT:
                    var u = r & kT;
                    if ((a || (a = qT), e.size != t.size && !u)) return !1;
                    var c = s.get(e);
                    if (c) return c == t;
                    (r |= GT), s.set(e, t);
                    var y = MT(a(e), a(t), r, i, o, s);
                    return s.delete(e), y;
                case KT:
                    if (Si) return Si.call(e) == Si.call(t);
            }
            return !1;
        }
        wc.exports = $T;
    });
    var Yn = f((_1, Oc) => {
        function ZT(e, t) {
            for (var n = -1, r = t.length, i = e.length; ++n < r; )
                e[i + n] = t[n];
            return e;
        }
        Oc.exports = ZT;
    });
    var be = f((I1, xc) => {
        var JT = Array.isArray;
        xc.exports = JT;
    });
    var Oi = f((T1, Rc) => {
        var eb = Yn(),
            tb = be();
        function nb(e, t, n) {
            var r = t(e);
            return tb(e) ? r : eb(r, n(e));
        }
        Rc.exports = nb;
    });
    var Pc = f((b1, Cc) => {
        function rb(e, t) {
            for (
                var n = -1, r = e == null ? 0 : e.length, i = 0, o = [];
                ++n < r;

            ) {
                var s = e[n];
                t(s, n, e) && (o[i++] = s);
            }
            return o;
        }
        Cc.exports = rb;
    });
    var xi = f((A1, Lc) => {
        function ib() {
            return [];
        }
        Lc.exports = ib;
    });
    var Ri = f((w1, Dc) => {
        var ob = Pc(),
            ab = xi(),
            sb = Object.prototype,
            ub = sb.propertyIsEnumerable,
            Nc = Object.getOwnPropertySymbols,
            cb = Nc
                ? function (e) {
                      return e == null
                          ? []
                          : ((e = Object(e)),
                            ob(Nc(e), function (t) {
                                return ub.call(e, t);
                            }));
                  }
                : ab;
        Dc.exports = cb;
    });
    var Fc = f((S1, Mc) => {
        function lb(e, t) {
            for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
            return r;
        }
        Mc.exports = lb;
    });
    var kc = f((O1, qc) => {
        var fb = lt(),
            db = rt(),
            pb = "[object Arguments]";
        function gb(e) {
            return db(e) && fb(e) == pb;
        }
        qc.exports = gb;
    });
    var un = f((x1, Vc) => {
        var Gc = kc(),
            hb = rt(),
            Xc = Object.prototype,
            yb = Xc.hasOwnProperty,
            Eb = Xc.propertyIsEnumerable,
            vb = Gc(
                (function () {
                    return arguments;
                })()
            )
                ? Gc
                : function (e) {
                      return (
                          hb(e) && yb.call(e, "callee") && !Eb.call(e, "callee")
                      );
                  };
        Vc.exports = vb;
    });
    var Bc = f((R1, Uc) => {
        function mb() {
            return !1;
        }
        Uc.exports = mb;
    });
    var Qn = f((cn, Mt) => {
        var _b = He(),
            Ib = Bc(),
            zc = typeof cn == "object" && cn && !cn.nodeType && cn,
            Hc = zc && typeof Mt == "object" && Mt && !Mt.nodeType && Mt,
            Tb = Hc && Hc.exports === zc,
            Wc = Tb ? _b.Buffer : void 0,
            bb = Wc ? Wc.isBuffer : void 0,
            Ab = bb || Ib;
        Mt.exports = Ab;
    });
    var $n = f((C1, jc) => {
        var wb = 9007199254740991,
            Sb = /^(?:0|[1-9]\d*)$/;
        function Ob(e, t) {
            var n = typeof e;
            return (
                (t = t ?? wb),
                !!t &&
                    (n == "number" || (n != "symbol" && Sb.test(e))) &&
                    e > -1 &&
                    e % 1 == 0 &&
                    e < t
            );
        }
        jc.exports = Ob;
    });
    var Zn = f((P1, Kc) => {
        var xb = 9007199254740991;
        function Rb(e) {
            return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xb;
        }
        Kc.exports = Rb;
    });
    var Qc = f((L1, Yc) => {
        var Cb = lt(),
            Pb = Zn(),
            Lb = rt(),
            Nb = "[object Arguments]",
            Db = "[object Array]",
            Mb = "[object Boolean]",
            Fb = "[object Date]",
            qb = "[object Error]",
            kb = "[object Function]",
            Gb = "[object Map]",
            Xb = "[object Number]",
            Vb = "[object Object]",
            Ub = "[object RegExp]",
            Bb = "[object Set]",
            Hb = "[object String]",
            Wb = "[object WeakMap]",
            zb = "[object ArrayBuffer]",
            jb = "[object DataView]",
            Kb = "[object Float32Array]",
            Yb = "[object Float64Array]",
            Qb = "[object Int8Array]",
            $b = "[object Int16Array]",
            Zb = "[object Int32Array]",
            Jb = "[object Uint8Array]",
            eA = "[object Uint8ClampedArray]",
            tA = "[object Uint16Array]",
            nA = "[object Uint32Array]",
            ge = {};
        ge[Kb] =
            ge[Yb] =
            ge[Qb] =
            ge[$b] =
            ge[Zb] =
            ge[Jb] =
            ge[eA] =
            ge[tA] =
            ge[nA] =
                !0;
        ge[Nb] =
            ge[Db] =
            ge[zb] =
            ge[Mb] =
            ge[jb] =
            ge[Fb] =
            ge[qb] =
            ge[kb] =
            ge[Gb] =
            ge[Xb] =
            ge[Vb] =
            ge[Ub] =
            ge[Bb] =
            ge[Hb] =
            ge[Wb] =
                !1;
        function rA(e) {
            return Lb(e) && Pb(e.length) && !!ge[Cb(e)];
        }
        Yc.exports = rA;
    });
    var Zc = f((N1, $c) => {
        function iA(e) {
            return function (t) {
                return e(t);
            };
        }
        $c.exports = iA;
    });
    var el = f((ln, Ft) => {
        var oA = ti(),
            Jc = typeof ln == "object" && ln && !ln.nodeType && ln,
            fn = Jc && typeof Ft == "object" && Ft && !Ft.nodeType && Ft,
            aA = fn && fn.exports === Jc,
            Ci = aA && oA.process,
            sA = (function () {
                try {
                    var e = fn && fn.require && fn.require("util").types;
                    return e || (Ci && Ci.binding && Ci.binding("util"));
                } catch {}
            })();
        Ft.exports = sA;
    });
    var Jn = f((D1, rl) => {
        var uA = Qc(),
            cA = Zc(),
            tl = el(),
            nl = tl && tl.isTypedArray,
            lA = nl ? cA(nl) : uA;
        rl.exports = lA;
    });
    var Pi = f((M1, il) => {
        var fA = Fc(),
            dA = un(),
            pA = be(),
            gA = Qn(),
            hA = $n(),
            yA = Jn(),
            EA = Object.prototype,
            vA = EA.hasOwnProperty;
        function mA(e, t) {
            var n = pA(e),
                r = !n && dA(e),
                i = !n && !r && gA(e),
                o = !n && !r && !i && yA(e),
                s = n || r || i || o,
                a = s ? fA(e.length, String) : [],
                u = a.length;
            for (var c in e)
                (t || vA.call(e, c)) &&
                    !(
                        s &&
                        (c == "length" ||
                            (i && (c == "offset" || c == "parent")) ||
                            (o &&
                                (c == "buffer" ||
                                    c == "byteLength" ||
                                    c == "byteOffset")) ||
                            hA(c, u))
                    ) &&
                    a.push(c);
            return a;
        }
        il.exports = mA;
    });
    var er = f((F1, ol) => {
        var _A = Object.prototype;
        function IA(e) {
            var t = e && e.constructor,
                n = (typeof t == "function" && t.prototype) || _A;
            return e === n;
        }
        ol.exports = IA;
    });
    var sl = f((q1, al) => {
        var TA = ni(),
            bA = TA(Object.keys, Object);
        al.exports = bA;
    });
    var tr = f((k1, ul) => {
        var AA = er(),
            wA = sl(),
            SA = Object.prototype,
            OA = SA.hasOwnProperty;
        function xA(e) {
            if (!AA(e)) return wA(e);
            var t = [];
            for (var n in Object(e))
                OA.call(e, n) && n != "constructor" && t.push(n);
            return t;
        }
        ul.exports = xA;
    });
    var vt = f((G1, cl) => {
        var RA = Ii(),
            CA = Zn();
        function PA(e) {
            return e != null && CA(e.length) && !RA(e);
        }
        cl.exports = PA;
    });
    var dn = f((X1, ll) => {
        var LA = Pi(),
            NA = tr(),
            DA = vt();
        function MA(e) {
            return DA(e) ? LA(e) : NA(e);
        }
        ll.exports = MA;
    });
    var dl = f((V1, fl) => {
        var FA = Oi(),
            qA = Ri(),
            kA = dn();
        function GA(e) {
            return FA(e, kA, qA);
        }
        fl.exports = GA;
    });
    var hl = f((U1, gl) => {
        var pl = dl(),
            XA = 1,
            VA = Object.prototype,
            UA = VA.hasOwnProperty;
        function BA(e, t, n, r, i, o) {
            var s = n & XA,
                a = pl(e),
                u = a.length,
                c = pl(t),
                y = c.length;
            if (u != y && !s) return !1;
            for (var g = u; g--; ) {
                var p = a[g];
                if (!(s ? p in t : UA.call(t, p))) return !1;
            }
            var h = o.get(e),
                m = o.get(t);
            if (h && m) return h == t && m == e;
            var _ = !0;
            o.set(e, t), o.set(t, e);
            for (var b = s; ++g < u; ) {
                p = a[g];
                var I = e[p],
                    S = t[p];
                if (r) var A = s ? r(S, I, p, t, e, o) : r(I, S, p, e, t, o);
                if (!(A === void 0 ? I === S || i(I, S, n, r, o) : A)) {
                    _ = !1;
                    break;
                }
                b || (b = p == "constructor");
            }
            if (_ && !b) {
                var C = e.constructor,
                    D = t.constructor;
                C != D &&
                    "constructor" in e &&
                    "constructor" in t &&
                    !(
                        typeof C == "function" &&
                        C instanceof C &&
                        typeof D == "function" &&
                        D instanceof D
                    ) &&
                    (_ = !1);
            }
            return o.delete(e), o.delete(t), _;
        }
        gl.exports = BA;
    });
    var El = f((B1, yl) => {
        var HA = ft(),
            WA = He(),
            zA = HA(WA, "DataView");
        yl.exports = zA;
    });
    var ml = f((H1, vl) => {
        var jA = ft(),
            KA = He(),
            YA = jA(KA, "Promise");
        vl.exports = YA;
    });
    var Il = f((W1, _l) => {
        var QA = ft(),
            $A = He(),
            ZA = QA($A, "Set");
        _l.exports = ZA;
    });
    var Li = f((z1, Tl) => {
        var JA = ft(),
            ew = He(),
            tw = JA(ew, "WeakMap");
        Tl.exports = tw;
    });
    var nr = f((j1, Rl) => {
        var Ni = El(),
            Di = zn(),
            Mi = ml(),
            Fi = Il(),
            qi = Li(),
            xl = lt(),
            qt = bi(),
            bl = "[object Map]",
            nw = "[object Object]",
            Al = "[object Promise]",
            wl = "[object Set]",
            Sl = "[object WeakMap]",
            Ol = "[object DataView]",
            rw = qt(Ni),
            iw = qt(Di),
            ow = qt(Mi),
            aw = qt(Fi),
            sw = qt(qi),
            mt = xl;
        ((Ni && mt(new Ni(new ArrayBuffer(1))) != Ol) ||
            (Di && mt(new Di()) != bl) ||
            (Mi && mt(Mi.resolve()) != Al) ||
            (Fi && mt(new Fi()) != wl) ||
            (qi && mt(new qi()) != Sl)) &&
            (mt = function (e) {
                var t = xl(e),
                    n = t == nw ? e.constructor : void 0,
                    r = n ? qt(n) : "";
                if (r)
                    switch (r) {
                        case rw:
                            return Ol;
                        case iw:
                            return bl;
                        case ow:
                            return Al;
                        case aw:
                            return wl;
                        case sw:
                            return Sl;
                    }
                return t;
            });
        Rl.exports = mt;
    });
    var ql = f((K1, Fl) => {
        var ki = Ai(),
            uw = wi(),
            cw = Sc(),
            lw = hl(),
            Cl = nr(),
            Pl = be(),
            Ll = Qn(),
            fw = Jn(),
            dw = 1,
            Nl = "[object Arguments]",
            Dl = "[object Array]",
            rr = "[object Object]",
            pw = Object.prototype,
            Ml = pw.hasOwnProperty;
        function gw(e, t, n, r, i, o) {
            var s = Pl(e),
                a = Pl(t),
                u = s ? Dl : Cl(e),
                c = a ? Dl : Cl(t);
            (u = u == Nl ? rr : u), (c = c == Nl ? rr : c);
            var y = u == rr,
                g = c == rr,
                p = u == c;
            if (p && Ll(e)) {
                if (!Ll(t)) return !1;
                (s = !0), (y = !1);
            }
            if (p && !y)
                return (
                    o || (o = new ki()),
                    s || fw(e) ? uw(e, t, n, r, i, o) : cw(e, t, u, n, r, i, o)
                );
            if (!(n & dw)) {
                var h = y && Ml.call(e, "__wrapped__"),
                    m = g && Ml.call(t, "__wrapped__");
                if (h || m) {
                    var _ = h ? e.value() : e,
                        b = m ? t.value() : t;
                    return o || (o = new ki()), i(_, b, n, r, o);
                }
            }
            return p ? (o || (o = new ki()), lw(e, t, n, r, i, o)) : !1;
        }
        Fl.exports = gw;
    });
    var Gi = f((Y1, Xl) => {
        var hw = ql(),
            kl = rt();
        function Gl(e, t, n, r, i) {
            return e === t
                ? !0
                : e == null || t == null || (!kl(e) && !kl(t))
                ? e !== e && t !== t
                : hw(e, t, n, r, Gl, i);
        }
        Xl.exports = Gl;
    });
    var Ul = f((Q1, Vl) => {
        var yw = Ai(),
            Ew = Gi(),
            vw = 1,
            mw = 2;
        function _w(e, t, n, r) {
            var i = n.length,
                o = i,
                s = !r;
            if (e == null) return !o;
            for (e = Object(e); i--; ) {
                var a = n[i];
                if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
            }
            for (; ++i < o; ) {
                a = n[i];
                var u = a[0],
                    c = e[u],
                    y = a[1];
                if (s && a[2]) {
                    if (c === void 0 && !(u in e)) return !1;
                } else {
                    var g = new yw();
                    if (r) var p = r(c, y, u, e, t, g);
                    if (!(p === void 0 ? Ew(y, c, vw | mw, r, g) : p))
                        return !1;
                }
            }
            return !0;
        }
        Vl.exports = _w;
    });
    var Xi = f(($1, Bl) => {
        var Iw = Je();
        function Tw(e) {
            return e === e && !Iw(e);
        }
        Bl.exports = Tw;
    });
    var Wl = f((Z1, Hl) => {
        var bw = Xi(),
            Aw = dn();
        function ww(e) {
            for (var t = Aw(e), n = t.length; n--; ) {
                var r = t[n],
                    i = e[r];
                t[n] = [r, i, bw(i)];
            }
            return t;
        }
        Hl.exports = ww;
    });
    var Vi = f((J1, zl) => {
        function Sw(e, t) {
            return function (n) {
                return n == null
                    ? !1
                    : n[e] === t && (t !== void 0 || e in Object(n));
            };
        }
        zl.exports = Sw;
    });
    var Kl = f((eq, jl) => {
        var Ow = Ul(),
            xw = Wl(),
            Rw = Vi();
        function Cw(e) {
            var t = xw(e);
            return t.length == 1 && t[0][2]
                ? Rw(t[0][0], t[0][1])
                : function (n) {
                      return n === e || Ow(n, e, t);
                  };
        }
        jl.exports = Cw;
    });
    var pn = f((tq, Yl) => {
        var Pw = lt(),
            Lw = rt(),
            Nw = "[object Symbol]";
        function Dw(e) {
            return typeof e == "symbol" || (Lw(e) && Pw(e) == Nw);
        }
        Yl.exports = Dw;
    });
    var ir = f((nq, Ql) => {
        var Mw = be(),
            Fw = pn(),
            qw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            kw = /^\w*$/;
        function Gw(e, t) {
            if (Mw(e)) return !1;
            var n = typeof e;
            return n == "number" ||
                n == "symbol" ||
                n == "boolean" ||
                e == null ||
                Fw(e)
                ? !0
                : kw.test(e) || !qw.test(e) || (t != null && e in Object(t));
        }
        Ql.exports = Gw;
    });
    var Jl = f((rq, Zl) => {
        var $l = jn(),
            Xw = "Expected a function";
        function Ui(e, t) {
            if (typeof e != "function" || (t != null && typeof t != "function"))
                throw new TypeError(Xw);
            var n = function () {
                var r = arguments,
                    i = t ? t.apply(this, r) : r[0],
                    o = n.cache;
                if (o.has(i)) return o.get(i);
                var s = e.apply(this, r);
                return (n.cache = o.set(i, s) || o), s;
            };
            return (n.cache = new (Ui.Cache || $l)()), n;
        }
        Ui.Cache = $l;
        Zl.exports = Ui;
    });
    var tf = f((iq, ef) => {
        var Vw = Jl(),
            Uw = 500;
        function Bw(e) {
            var t = Vw(e, function (r) {
                    return n.size === Uw && n.clear(), r;
                }),
                n = t.cache;
            return t;
        }
        ef.exports = Bw;
    });
    var rf = f((oq, nf) => {
        var Hw = tf(),
            Ww =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            zw = /\\(\\)?/g,
            jw = Hw(function (e) {
                var t = [];
                return (
                    e.charCodeAt(0) === 46 && t.push(""),
                    e.replace(Ww, function (n, r, i, o) {
                        t.push(i ? o.replace(zw, "$1") : r || n);
                    }),
                    t
                );
            });
        nf.exports = jw;
    });
    var Bi = f((aq, of) => {
        function Kw(e, t) {
            for (
                var n = -1, r = e == null ? 0 : e.length, i = Array(r);
                ++n < r;

            )
                i[n] = t(e[n], n, e);
            return i;
        }
        of.exports = Kw;
    });
    var ff = f((sq, lf) => {
        var af = Ot(),
            Yw = Bi(),
            Qw = be(),
            $w = pn(),
            Zw = 1 / 0,
            sf = af ? af.prototype : void 0,
            uf = sf ? sf.toString : void 0;
        function cf(e) {
            if (typeof e == "string") return e;
            if (Qw(e)) return Yw(e, cf) + "";
            if ($w(e)) return uf ? uf.call(e) : "";
            var t = e + "";
            return t == "0" && 1 / e == -Zw ? "-0" : t;
        }
        lf.exports = cf;
    });
    var pf = f((uq, df) => {
        var Jw = ff();
        function e0(e) {
            return e == null ? "" : Jw(e);
        }
        df.exports = e0;
    });
    var gn = f((cq, gf) => {
        var t0 = be(),
            n0 = ir(),
            r0 = rf(),
            i0 = pf();
        function o0(e, t) {
            return t0(e) ? e : n0(e, t) ? [e] : r0(i0(e));
        }
        gf.exports = o0;
    });
    var kt = f((lq, hf) => {
        var a0 = pn(),
            s0 = 1 / 0;
        function u0(e) {
            if (typeof e == "string" || a0(e)) return e;
            var t = e + "";
            return t == "0" && 1 / e == -s0 ? "-0" : t;
        }
        hf.exports = u0;
    });
    var or = f((fq, yf) => {
        var c0 = gn(),
            l0 = kt();
        function f0(e, t) {
            t = c0(t, e);
            for (var n = 0, r = t.length; e != null && n < r; )
                e = e[l0(t[n++])];
            return n && n == r ? e : void 0;
        }
        yf.exports = f0;
    });
    var ar = f((dq, Ef) => {
        var d0 = or();
        function p0(e, t, n) {
            var r = e == null ? void 0 : d0(e, t);
            return r === void 0 ? n : r;
        }
        Ef.exports = p0;
    });
    var mf = f((pq, vf) => {
        function g0(e, t) {
            return e != null && t in Object(e);
        }
        vf.exports = g0;
    });
    var If = f((gq, _f) => {
        var h0 = gn(),
            y0 = un(),
            E0 = be(),
            v0 = $n(),
            m0 = Zn(),
            _0 = kt();
        function I0(e, t, n) {
            t = h0(t, e);
            for (var r = -1, i = t.length, o = !1; ++r < i; ) {
                var s = _0(t[r]);
                if (!(o = e != null && n(e, s))) break;
                e = e[s];
            }
            return o || ++r != i
                ? o
                : ((i = e == null ? 0 : e.length),
                  !!i && m0(i) && v0(s, i) && (E0(e) || y0(e)));
        }
        _f.exports = I0;
    });
    var bf = f((hq, Tf) => {
        var T0 = mf(),
            b0 = If();
        function A0(e, t) {
            return e != null && b0(e, t, T0);
        }
        Tf.exports = A0;
    });
    var wf = f((yq, Af) => {
        var w0 = Gi(),
            S0 = ar(),
            O0 = bf(),
            x0 = ir(),
            R0 = Xi(),
            C0 = Vi(),
            P0 = kt(),
            L0 = 1,
            N0 = 2;
        function D0(e, t) {
            return x0(e) && R0(t)
                ? C0(P0(e), t)
                : function (n) {
                      var r = S0(n, e);
                      return r === void 0 && r === t
                          ? O0(n, e)
                          : w0(t, r, L0 | N0);
                  };
        }
        Af.exports = D0;
    });
    var sr = f((Eq, Sf) => {
        function M0(e) {
            return e;
        }
        Sf.exports = M0;
    });
    var Hi = f((vq, Of) => {
        function F0(e) {
            return function (t) {
                return t?.[e];
            };
        }
        Of.exports = F0;
    });
    var Rf = f((mq, xf) => {
        var q0 = or();
        function k0(e) {
            return function (t) {
                return q0(t, e);
            };
        }
        xf.exports = k0;
    });
    var Pf = f((_q, Cf) => {
        var G0 = Hi(),
            X0 = Rf(),
            V0 = ir(),
            U0 = kt();
        function B0(e) {
            return V0(e) ? G0(U0(e)) : X0(e);
        }
        Cf.exports = B0;
    });
    var dt = f((Iq, Lf) => {
        var H0 = Kl(),
            W0 = wf(),
            z0 = sr(),
            j0 = be(),
            K0 = Pf();
        function Y0(e) {
            return typeof e == "function"
                ? e
                : e == null
                ? z0
                : typeof e == "object"
                ? j0(e)
                    ? W0(e[0], e[1])
                    : H0(e)
                : K0(e);
        }
        Lf.exports = Y0;
    });
    var Wi = f((Tq, Nf) => {
        var Q0 = dt(),
            $0 = vt(),
            Z0 = dn();
        function J0(e) {
            return function (t, n, r) {
                var i = Object(t);
                if (!$0(t)) {
                    var o = Q0(n, 3);
                    (t = Z0(t)),
                        (n = function (a) {
                            return o(i[a], a, i);
                        });
                }
                var s = e(t, n, r);
                return s > -1 ? i[o ? t[s] : s] : void 0;
            };
        }
        Nf.exports = J0;
    });
    var zi = f((bq, Df) => {
        function eS(e, t, n, r) {
            for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
                if (t(e[o], o, e)) return o;
            return -1;
        }
        Df.exports = eS;
    });
    var Ff = f((Aq, Mf) => {
        var tS = /\s/;
        function nS(e) {
            for (var t = e.length; t-- && tS.test(e.charAt(t)); );
            return t;
        }
        Mf.exports = nS;
    });
    var kf = f((wq, qf) => {
        var rS = Ff(),
            iS = /^\s+/;
        function oS(e) {
            return e && e.slice(0, rS(e) + 1).replace(iS, "");
        }
        qf.exports = oS;
    });
    var ur = f((Sq, Vf) => {
        var aS = kf(),
            Gf = Je(),
            sS = pn(),
            Xf = 0 / 0,
            uS = /^[-+]0x[0-9a-f]+$/i,
            cS = /^0b[01]+$/i,
            lS = /^0o[0-7]+$/i,
            fS = parseInt;
        function dS(e) {
            if (typeof e == "number") return e;
            if (sS(e)) return Xf;
            if (Gf(e)) {
                var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                e = Gf(t) ? t + "" : t;
            }
            if (typeof e != "string") return e === 0 ? e : +e;
            e = aS(e);
            var n = cS.test(e);
            return n || lS.test(e)
                ? fS(e.slice(2), n ? 2 : 8)
                : uS.test(e)
                ? Xf
                : +e;
        }
        Vf.exports = dS;
    });
    var Hf = f((Oq, Bf) => {
        var pS = ur(),
            Uf = 1 / 0,
            gS = 17976931348623157e292;
        function hS(e) {
            if (!e) return e === 0 ? e : 0;
            if (((e = pS(e)), e === Uf || e === -Uf)) {
                var t = e < 0 ? -1 : 1;
                return t * gS;
            }
            return e === e ? e : 0;
        }
        Bf.exports = hS;
    });
    var ji = f((xq, Wf) => {
        var yS = Hf();
        function ES(e) {
            var t = yS(e),
                n = t % 1;
            return t === t ? (n ? t - n : t) : 0;
        }
        Wf.exports = ES;
    });
    var jf = f((Rq, zf) => {
        var vS = zi(),
            mS = dt(),
            _S = ji(),
            IS = Math.max;
        function TS(e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) return -1;
            var i = n == null ? 0 : _S(n);
            return i < 0 && (i = IS(r + i, 0)), vS(e, mS(t, 3), i);
        }
        zf.exports = TS;
    });
    var Ki = f((Cq, Kf) => {
        var bS = Wi(),
            AS = jf(),
            wS = bS(AS);
        Kf.exports = wS;
    });
    var $f = {};
    Ne($f, {
        ELEMENT_MATCHES: () => SS,
        FLEX_PREFIXED: () => Yi,
        IS_BROWSER_ENV: () => ze,
        TRANSFORM_PREFIXED: () => pt,
        TRANSFORM_STYLE_PREFIXED: () => lr,
        withBrowser: () => cr,
    });
    var Qf,
        ze,
        cr,
        SS,
        Yi,
        pt,
        Yf,
        lr,
        fr = ye(() => {
            "use strict";
            (Qf = le(Ki())),
                (ze = typeof window < "u"),
                (cr = (e, t) => (ze ? e() : t)),
                (SS = cr(() =>
                    (0, Qf.default)(
                        [
                            "matches",
                            "matchesSelector",
                            "mozMatchesSelector",
                            "msMatchesSelector",
                            "oMatchesSelector",
                            "webkitMatchesSelector",
                        ],
                        (e) => e in Element.prototype
                    )
                )),
                (Yi = cr(() => {
                    let e = document.createElement("i"),
                        t = [
                            "flex",
                            "-webkit-flex",
                            "-ms-flexbox",
                            "-moz-box",
                            "-webkit-box",
                        ],
                        n = "";
                    try {
                        let { length: r } = t;
                        for (let i = 0; i < r; i++) {
                            let o = t[i];
                            if (((e.style.display = o), e.style.display === o))
                                return o;
                        }
                        return n;
                    } catch {
                        return n;
                    }
                }, "flex")),
                (pt = cr(() => {
                    let e = document.createElement("i");
                    if (e.style.transform == null) {
                        let t = ["Webkit", "Moz", "ms"],
                            n = "Transform",
                            { length: r } = t;
                        for (let i = 0; i < r; i++) {
                            let o = t[i] + n;
                            if (e.style[o] !== void 0) return o;
                        }
                    }
                    return "transform";
                }, "transform")),
                (Yf = pt.split("transform")[0]),
                (lr = Yf ? Yf + "TransformStyle" : "transformStyle");
        });
    var Qi = f((Pq, nd) => {
        var OS = 4,
            xS = 0.001,
            RS = 1e-7,
            CS = 10,
            hn = 11,
            dr = 1 / (hn - 1),
            PS = typeof Float32Array == "function";
        function Zf(e, t) {
            return 1 - 3 * t + 3 * e;
        }
        function Jf(e, t) {
            return 3 * t - 6 * e;
        }
        function ed(e) {
            return 3 * e;
        }
        function pr(e, t, n) {
            return ((Zf(t, n) * e + Jf(t, n)) * e + ed(t)) * e;
        }
        function td(e, t, n) {
            return 3 * Zf(t, n) * e * e + 2 * Jf(t, n) * e + ed(t);
        }
        function LS(e, t, n, r, i) {
            var o,
                s,
                a = 0;
            do
                (s = t + (n - t) / 2),
                    (o = pr(s, r, i) - e),
                    o > 0 ? (n = s) : (t = s);
            while (Math.abs(o) > RS && ++a < CS);
            return s;
        }
        function NS(e, t, n, r) {
            for (var i = 0; i < OS; ++i) {
                var o = td(t, n, r);
                if (o === 0) return t;
                var s = pr(t, n, r) - e;
                t -= s / o;
            }
            return t;
        }
        nd.exports = function (t, n, r, i) {
            if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
                throw new Error("bezier x values must be in [0, 1] range");
            var o = PS ? new Float32Array(hn) : new Array(hn);
            if (t !== n || r !== i)
                for (var s = 0; s < hn; ++s) o[s] = pr(s * dr, t, r);
            function a(u) {
                for (var c = 0, y = 1, g = hn - 1; y !== g && o[y] <= u; ++y)
                    c += dr;
                --y;
                var p = (u - o[y]) / (o[y + 1] - o[y]),
                    h = c + p * dr,
                    m = td(h, t, r);
                return m >= xS
                    ? NS(u, h, t, r)
                    : m === 0
                    ? h
                    : LS(u, c, c + dr, t, r);
            }
            return function (c) {
                return t === n && r === i
                    ? c
                    : c === 0
                    ? 0
                    : c === 1
                    ? 1
                    : pr(a(c), n, i);
            };
        };
    });
    var En = {};
    Ne(En, {
        bounce: () => hO,
        bouncePast: () => yO,
        ease: () => DS,
        easeIn: () => MS,
        easeInOut: () => qS,
        easeOut: () => FS,
        inBack: () => aO,
        inCirc: () => nO,
        inCubic: () => VS,
        inElastic: () => cO,
        inExpo: () => JS,
        inOutBack: () => uO,
        inOutCirc: () => iO,
        inOutCubic: () => BS,
        inOutElastic: () => fO,
        inOutExpo: () => tO,
        inOutQuad: () => XS,
        inOutQuart: () => zS,
        inOutQuint: () => YS,
        inOutSine: () => ZS,
        inQuad: () => kS,
        inQuart: () => HS,
        inQuint: () => jS,
        inSine: () => QS,
        outBack: () => sO,
        outBounce: () => oO,
        outCirc: () => rO,
        outCubic: () => US,
        outElastic: () => lO,
        outExpo: () => eO,
        outQuad: () => GS,
        outQuart: () => WS,
        outQuint: () => KS,
        outSine: () => $S,
        swingFrom: () => pO,
        swingFromTo: () => dO,
        swingTo: () => gO,
    });
    function kS(e) {
        return Math.pow(e, 2);
    }
    function GS(e) {
        return -(Math.pow(e - 1, 2) - 1);
    }
    function XS(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 2)
            : -0.5 * ((e -= 2) * e - 2);
    }
    function VS(e) {
        return Math.pow(e, 3);
    }
    function US(e) {
        return Math.pow(e - 1, 3) + 1;
    }
    function BS(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 3)
            : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function HS(e) {
        return Math.pow(e, 4);
    }
    function WS(e) {
        return -(Math.pow(e - 1, 4) - 1);
    }
    function zS(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 4)
            : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function jS(e) {
        return Math.pow(e, 5);
    }
    function KS(e) {
        return Math.pow(e - 1, 5) + 1;
    }
    function YS(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 5)
            : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function QS(e) {
        return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function $S(e) {
        return Math.sin(e * (Math.PI / 2));
    }
    function ZS(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function JS(e) {
        return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function eO(e) {
        return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function tO(e) {
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (e /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (e - 1))
            : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function nO(e) {
        return -(Math.sqrt(1 - e * e) - 1);
    }
    function rO(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function iO(e) {
        return (e /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - e * e) - 1)
            : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function oO(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function aO(e) {
        let t = it;
        return e * e * ((t + 1) * e - t);
    }
    function sO(e) {
        let t = it;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function uO(e) {
        let t = it;
        return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function cO(e) {
        let t = it,
            n = 0,
            r = 1;
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (n || (n = 0.3),
              r < 1
                  ? ((r = 1), (t = n / 4))
                  : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
              -(
                  r *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / n)
              ));
    }
    function lO(e) {
        let t = it,
            n = 0,
            r = 1;
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (n || (n = 0.3),
              r < 1
                  ? ((r = 1), (t = n / 4))
                  : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
              r *
                  Math.pow(2, -10 * e) *
                  Math.sin(((e - t) * (2 * Math.PI)) / n) +
                  1);
    }
    function fO(e) {
        let t = it,
            n = 0,
            r = 1;
        return e === 0
            ? 0
            : (e /= 1 / 2) === 2
            ? 1
            : (n || (n = 0.3 * 1.5),
              r < 1
                  ? ((r = 1), (t = n / 4))
                  : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
              e < 1
                  ? -0.5 *
                    (r *
                        Math.pow(2, 10 * (e -= 1)) *
                        Math.sin(((e - t) * (2 * Math.PI)) / n))
                  : r *
                        Math.pow(2, -10 * (e -= 1)) *
                        Math.sin(((e - t) * (2 * Math.PI)) / n) *
                        0.5 +
                    1);
    }
    function dO(e) {
        let t = it;
        return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function pO(e) {
        let t = it;
        return e * e * ((t + 1) * e - t);
    }
    function gO(e) {
        let t = it;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function hO(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function yO(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
            : e < 2.5 / 2.75
            ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
            : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
    var yn,
        it,
        DS,
        MS,
        FS,
        qS,
        $i = ye(() => {
            "use strict";
            (yn = le(Qi())),
                (it = 1.70158),
                (DS = (0, yn.default)(0.25, 0.1, 0.25, 1)),
                (MS = (0, yn.default)(0.42, 0, 1, 1)),
                (FS = (0, yn.default)(0, 0, 0.58, 1)),
                (qS = (0, yn.default)(0.42, 0, 0.58, 1));
        });
    var id = {};
    Ne(id, {
        applyEasing: () => vO,
        createBezierEasing: () => EO,
        optimizeFloat: () => vn,
    });
    function vn(e, t = 5, n = 10) {
        let r = Math.pow(n, t),
            i = Number(Math.round(e * r) / r);
        return Math.abs(i) > 1e-4 ? i : 0;
    }
    function EO(e) {
        return (0, rd.default)(...e);
    }
    function vO(e, t, n) {
        return t === 0
            ? 0
            : t === 1
            ? 1
            : vn(n ? (t > 0 ? n(t) : t) : t > 0 && e && En[e] ? En[e](t) : t);
    }
    var rd,
        Zi = ye(() => {
            "use strict";
            $i();
            rd = le(Qi());
        });
    var sd = {};
    Ne(sd, {
        createElementState: () => ad,
        ixElements: () => LO,
        mergeActionState: () => Ji,
    });
    function ad(e, t, n, r, i) {
        let o =
            n === mO
                ? (0, Gt.getIn)(i, ["config", "target", "objectId"])
                : null;
        return (0, Gt.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
    }
    function Ji(e, t, n, r, i) {
        let o = DO(i);
        return (0, Gt.mergeIn)(e, [t, PO, n], r, o);
    }
    function DO(e) {
        let { config: t } = e;
        return NO.reduce((n, r) => {
            let i = r[0],
                o = r[1],
                s = t[i],
                a = t[o];
            return s != null && a != null && (n[o] = a), n;
        }, {});
    }
    var Gt,
        Nq,
        mO,
        Dq,
        _O,
        IO,
        TO,
        bO,
        AO,
        wO,
        SO,
        OO,
        xO,
        RO,
        CO,
        od,
        PO,
        LO,
        NO,
        ud = ye(() => {
            "use strict";
            Gt = le(Ct());
            De();
            ({
                HTML_ELEMENT: Nq,
                PLAIN_OBJECT: mO,
                ABSTRACT_NODE: Dq,
                CONFIG_X_VALUE: _O,
                CONFIG_Y_VALUE: IO,
                CONFIG_Z_VALUE: TO,
                CONFIG_VALUE: bO,
                CONFIG_X_UNIT: AO,
                CONFIG_Y_UNIT: wO,
                CONFIG_Z_UNIT: SO,
                CONFIG_UNIT: OO,
            } = we),
                ({
                    IX2_SESSION_STOPPED: xO,
                    IX2_INSTANCE_ADDED: RO,
                    IX2_ELEMENT_STATE_CHANGED: CO,
                } = Te),
                (od = {}),
                (PO = "refState"),
                (LO = (e = od, t = {}) => {
                    switch (t.type) {
                        case xO:
                            return od;
                        case RO: {
                            let {
                                    elementId: n,
                                    element: r,
                                    origin: i,
                                    actionItem: o,
                                    refType: s,
                                } = t.payload,
                                { actionTypeId: a } = o,
                                u = e;
                            return (
                                (0, Gt.getIn)(u, [n, r]) !== r &&
                                    (u = ad(u, r, s, n, o)),
                                Ji(u, n, a, i, o)
                            );
                        }
                        case CO: {
                            let {
                                elementId: n,
                                actionTypeId: r,
                                current: i,
                                actionItem: o,
                            } = t.payload;
                            return Ji(e, n, r, i, o);
                        }
                        default:
                            return e;
                    }
                });
            NO = [
                [_O, AO],
                [IO, wO],
                [TO, SO],
                [bO, OO],
            ];
        });
    var cd = f((eo) => {
        "use strict";
        Object.defineProperty(eo, "__esModule", { value: !0 });
        function MO(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        MO(eo, {
            clearPlugin: function () {
                return UO;
            },
            createPluginInstance: function () {
                return XO;
            },
            getPluginConfig: function () {
                return FO;
            },
            getPluginDestination: function () {
                return GO;
            },
            getPluginDuration: function () {
                return qO;
            },
            getPluginOrigin: function () {
                return kO;
            },
            renderPlugin: function () {
                return VO;
            },
        });
        var FO = (e) => e.value,
            qO = (e, t) => {
                if (t.config.duration !== "auto") return null;
                let n = parseFloat(e.getAttribute("data-duration"));
                return n > 0
                    ? n * 1e3
                    : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
            },
            kO = (e) => e || { value: 0 },
            GO = (e) => ({ value: e.value }),
            XO = (e) => {
                let t = window.Webflow.require("lottie").createInstance(e);
                return t.stop(), t.setSubframe(!0), t;
            },
            VO = (e, t, n) => {
                if (!e) return;
                let r = t[n.actionTypeId].value / 100;
                e.goToFrame(e.frames * r);
            },
            UO = (e) => {
                window.Webflow.require("lottie").createInstance(e).stop();
            };
    });
    var fd = f((to) => {
        "use strict";
        Object.defineProperty(to, "__esModule", { value: !0 });
        function BO(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        BO(to, {
            clearPlugin: function () {
                return JO;
            },
            createPluginInstance: function () {
                return $O;
            },
            getPluginConfig: function () {
                return jO;
            },
            getPluginDestination: function () {
                return QO;
            },
            getPluginDuration: function () {
                return KO;
            },
            getPluginOrigin: function () {
                return YO;
            },
            renderPlugin: function () {
                return ZO;
            },
        });
        var HO = (e) => document.querySelector(`[data-w-id="${e}"]`),
            WO = () => window.Webflow.require("spline"),
            zO = (e, t) => e.filter((n) => !t.includes(n)),
            jO = (e, t) => e.value[t],
            KO = () => null,
            ld = Object.freeze({
                positionX: 0,
                positionY: 0,
                positionZ: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
            }),
            YO = (e, t) => {
                let n = t.config.value,
                    r = Object.keys(n);
                if (e) {
                    let o = Object.keys(e),
                        s = zO(r, o);
                    return s.length
                        ? s.reduce((u, c) => ((u[c] = ld[c]), u), e)
                        : e;
                }
                return r.reduce((o, s) => ((o[s] = ld[s]), o), {});
            },
            QO = (e) => e.value,
            $O = (e, t) => {
                let n = t?.config?.target?.pluginElement;
                return n ? HO(n) : null;
            },
            ZO = (e, t, n) => {
                let r = WO(),
                    i = r.getInstance(e),
                    o = n.config.target.objectId,
                    s = (a) => {
                        if (!a)
                            throw new Error(
                                "Invalid spline app passed to renderSpline"
                            );
                        let u = o && a.findObjectById(o);
                        if (!u) return;
                        let { PLUGIN_SPLINE: c } = t;
                        c.positionX != null && (u.position.x = c.positionX),
                            c.positionY != null && (u.position.y = c.positionY),
                            c.positionZ != null && (u.position.z = c.positionZ),
                            c.rotationX != null && (u.rotation.x = c.rotationX),
                            c.rotationY != null && (u.rotation.y = c.rotationY),
                            c.rotationZ != null && (u.rotation.z = c.rotationZ),
                            c.scaleX != null && (u.scale.x = c.scaleX),
                            c.scaleY != null && (u.scale.y = c.scaleY),
                            c.scaleZ != null && (u.scale.z = c.scaleZ);
                    };
                i ? s(i.spline) : r.setLoadHandler(e, s);
            },
            JO = () => null;
    });
    var dd = f((io) => {
        "use strict";
        Object.defineProperty(io, "__esModule", { value: !0 });
        function ex(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        ex(io, {
            clearPlugin: function () {
                return cx;
            },
            createPluginInstance: function () {
                return sx;
            },
            getPluginConfig: function () {
                return rx;
            },
            getPluginDestination: function () {
                return ax;
            },
            getPluginDuration: function () {
                return ix;
            },
            getPluginOrigin: function () {
                return ox;
            },
            renderPlugin: function () {
                return ux;
            },
        });
        var no = "--wf-rive-fit",
            ro = "--wf-rive-alignment",
            tx = (e) => document.querySelector(`[data-w-id="${e}"]`),
            nx = () => window.Webflow.require("rive"),
            rx = (e, t) => e.value.inputs[t],
            ix = () => null,
            ox = (e, t) => {
                if (e) return e;
                let n = {},
                    { inputs: r = {} } = t.config.value;
                for (let i in r) r[i] == null && (n[i] = 0);
                return n;
            },
            ax = (e) => e.value.inputs ?? {},
            sx = (e, t) => {
                if ((t.config?.target?.selectorGuids || []).length > 0)
                    return e;
                let r = t?.config?.target?.pluginElement;
                return r ? tx(r) : null;
            },
            ux = (e, { PLUGIN_RIVE: t }, n) => {
                let r = nx(),
                    i = r.getInstance(e),
                    o = r.rive.StateMachineInputType,
                    { name: s, inputs: a = {} } = n.config.value || {};
                function u(c) {
                    if (c.loaded) y();
                    else {
                        let g = () => {
                            y(), c?.off("load", g);
                        };
                        c?.on("load", g);
                    }
                    function y() {
                        let g = c.stateMachineInputs(s);
                        if (g != null) {
                            if (
                                (c.isPlaying || c.play(s, !1),
                                no in a || ro in a)
                            ) {
                                let p = c.layout,
                                    h = a[no] ?? p.fit,
                                    m = a[ro] ?? p.alignment;
                                (h !== p.fit || m !== p.alignment) &&
                                    (c.layout = p.copyWith({
                                        fit: h,
                                        alignment: m,
                                    }));
                            }
                            for (let p in a) {
                                if (p === no || p === ro) continue;
                                let h = g.find((m) => m.name === p);
                                if (h != null)
                                    switch (h.type) {
                                        case o.Boolean: {
                                            if (a[p] != null) {
                                                let m = !!a[p];
                                                h.value = m;
                                            }
                                            break;
                                        }
                                        case o.Number: {
                                            let m = t[p];
                                            m != null && (h.value = m);
                                            break;
                                        }
                                        case o.Trigger: {
                                            a[p] && h.fire();
                                            break;
                                        }
                                    }
                            }
                        }
                    }
                }
                i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
            },
            cx = (e, t) => null;
    });
    var ao = f((oo) => {
        "use strict";
        Object.defineProperty(oo, "__esModule", { value: !0 });
        Object.defineProperty(oo, "normalizeColor", {
            enumerable: !0,
            get: function () {
                return lx;
            },
        });
        var pd = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aqua: "#00FFFF",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blue: "#0000FF",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            fuchsia: "#FF00FF",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#ADFF2F",
            grey: "#808080",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgray: "#D3D3D3",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            lime: "#00FF00",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            maroon: "#800000",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            navy: "#000080",
            oldlace: "#FDF5E6",
            olive: "#808000",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#FF0000",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            silver: "#C0C0C0",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            teal: "#008080",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            white: "#FFFFFF",
            whitesmoke: "#F5F5F5",
            yellow: "#FFFF00",
            yellowgreen: "#9ACD32",
        };
        function lx(e) {
            let t,
                n,
                r,
                i = 1,
                o = e.replace(/\s/g, "").toLowerCase(),
                a =
                    (typeof pd[o] == "string" ? pd[o].toLowerCase() : null) ||
                    o;
            if (a.startsWith("#")) {
                let u = a.substring(1);
                u.length === 3 || u.length === 4
                    ? ((t = parseInt(u[0] + u[0], 16)),
                      (n = parseInt(u[1] + u[1], 16)),
                      (r = parseInt(u[2] + u[2], 16)),
                      u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
                    : (u.length === 6 || u.length === 8) &&
                      ((t = parseInt(u.substring(0, 2), 16)),
                      (n = parseInt(u.substring(2, 4), 16)),
                      (r = parseInt(u.substring(4, 6), 16)),
                      u.length === 8 &&
                          (i = parseInt(u.substring(6, 8), 16) / 255));
            } else if (a.startsWith("rgba")) {
                let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
                (t = parseInt(u[0], 10)),
                    (n = parseInt(u[1], 10)),
                    (r = parseInt(u[2], 10)),
                    (i = parseFloat(u[3]));
            } else if (a.startsWith("rgb")) {
                let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
                (t = parseInt(u[0], 10)),
                    (n = parseInt(u[1], 10)),
                    (r = parseInt(u[2], 10));
            } else if (a.startsWith("hsla")) {
                let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
                    c = parseFloat(u[0]),
                    y = parseFloat(u[1].replace("%", "")) / 100,
                    g = parseFloat(u[2].replace("%", "")) / 100;
                i = parseFloat(u[3]);
                let p = (1 - Math.abs(2 * g - 1)) * y,
                    h = p * (1 - Math.abs(((c / 60) % 2) - 1)),
                    m = g - p / 2,
                    _,
                    b,
                    I;
                c >= 0 && c < 60
                    ? ((_ = p), (b = h), (I = 0))
                    : c >= 60 && c < 120
                    ? ((_ = h), (b = p), (I = 0))
                    : c >= 120 && c < 180
                    ? ((_ = 0), (b = p), (I = h))
                    : c >= 180 && c < 240
                    ? ((_ = 0), (b = h), (I = p))
                    : c >= 240 && c < 300
                    ? ((_ = h), (b = 0), (I = p))
                    : ((_ = p), (b = 0), (I = h)),
                    (t = Math.round((_ + m) * 255)),
                    (n = Math.round((b + m) * 255)),
                    (r = Math.round((I + m) * 255));
            } else if (a.startsWith("hsl")) {
                let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
                    c = parseFloat(u[0]),
                    y = parseFloat(u[1].replace("%", "")) / 100,
                    g = parseFloat(u[2].replace("%", "")) / 100,
                    p = (1 - Math.abs(2 * g - 1)) * y,
                    h = p * (1 - Math.abs(((c / 60) % 2) - 1)),
                    m = g - p / 2,
                    _,
                    b,
                    I;
                c >= 0 && c < 60
                    ? ((_ = p), (b = h), (I = 0))
                    : c >= 60 && c < 120
                    ? ((_ = h), (b = p), (I = 0))
                    : c >= 120 && c < 180
                    ? ((_ = 0), (b = p), (I = h))
                    : c >= 180 && c < 240
                    ? ((_ = 0), (b = h), (I = p))
                    : c >= 240 && c < 300
                    ? ((_ = h), (b = 0), (I = p))
                    : ((_ = p), (b = 0), (I = h)),
                    (t = Math.round((_ + m) * 255)),
                    (n = Math.round((b + m) * 255)),
                    (r = Math.round((I + m) * 255));
            }
            if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
                throw new Error(
                    `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
                );
            return { red: t, green: n, blue: r, alpha: i };
        }
    });
    var gd = f((so) => {
        "use strict";
        Object.defineProperty(so, "__esModule", { value: !0 });
        function fx(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        fx(so, {
            clearPlugin: function () {
                return mx;
            },
            createPluginInstance: function () {
                return Ex;
            },
            getPluginConfig: function () {
                return px;
            },
            getPluginDestination: function () {
                return yx;
            },
            getPluginDuration: function () {
                return gx;
            },
            getPluginOrigin: function () {
                return hx;
            },
            renderPlugin: function () {
                return vx;
            },
        });
        var dx = ao(),
            px = (e, t) => e.value[t],
            gx = () => null,
            hx = (e, t) => {
                if (e) return e;
                let n = t.config.value,
                    r = t.config.target.objectId,
                    i = getComputedStyle(
                        document.documentElement
                    ).getPropertyValue(r);
                if (n.size != null) return { size: parseInt(i, 10) };
                if (n.red != null && n.green != null && n.blue != null)
                    return (0, dx.normalizeColor)(i);
            },
            yx = (e) => e.value,
            Ex = () => null,
            vx = (e, t, n) => {
                let r = n.config.target.objectId,
                    i = n.config.value.unit,
                    { PLUGIN_VARIABLE: o } = t,
                    { size: s, red: a, green: u, blue: c, alpha: y } = o,
                    g;
                s != null && (g = s + i),
                    a != null &&
                        c != null &&
                        u != null &&
                        y != null &&
                        (g = `rgba(${a}, ${u}, ${c}, ${y})`),
                    g != null &&
                        document.documentElement.style.setProperty(r, g);
            },
            mx = (e, t) => {
                let n = t.config.target.objectId;
                document.documentElement.style.removeProperty(n);
            };
    });
    var yd = f((uo) => {
        "use strict";
        Object.defineProperty(uo, "__esModule", { value: !0 });
        Object.defineProperty(uo, "pluginMethodMap", {
            enumerable: !0,
            get: function () {
                return Ax;
            },
        });
        var gr = (De(), Ye(ms)),
            _x = hr(cd()),
            Ix = hr(fd()),
            Tx = hr(dd()),
            bx = hr(gd());
        function hd(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap(),
                n = new WeakMap();
            return (hd = function (r) {
                return r ? n : t;
            })(e);
        }
        function hr(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || (typeof e != "object" && typeof e != "function"))
                return { default: e };
            var n = hd(t);
            if (n && n.has(e)) return n.get(e);
            var r = { __proto__: null },
                i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if (
                    o !== "default" &&
                    Object.prototype.hasOwnProperty.call(e, o)
                ) {
                    var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    s && (s.get || s.set)
                        ? Object.defineProperty(r, o, s)
                        : (r[o] = e[o]);
                }
            return (r.default = e), n && n.set(e, r), r;
        }
        var Ax = new Map([
            [gr.ActionTypeConsts.PLUGIN_LOTTIE, { ..._x }],
            [gr.ActionTypeConsts.PLUGIN_SPLINE, { ...Ix }],
            [gr.ActionTypeConsts.PLUGIN_RIVE, { ...Tx }],
            [gr.ActionTypeConsts.PLUGIN_VARIABLE, { ...bx }],
        ]);
    });
    var Ed = {};
    Ne(Ed, {
        clearPlugin: () => ho,
        createPluginInstance: () => Sx,
        getPluginConfig: () => lo,
        getPluginDestination: () => po,
        getPluginDuration: () => wx,
        getPluginOrigin: () => fo,
        isPluginType: () => _t,
        renderPlugin: () => go,
    });
    function _t(e) {
        return co.pluginMethodMap.has(e);
    }
    var co,
        It,
        lo,
        fo,
        wx,
        po,
        Sx,
        go,
        ho,
        yo = ye(() => {
            "use strict";
            fr();
            co = le(yd());
            (It = (e) => (t) => {
                if (!ze) return () => null;
                let n = co.pluginMethodMap.get(t);
                if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
                let r = n[e];
                if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
                return r;
            }),
                (lo = It("getPluginConfig")),
                (fo = It("getPluginOrigin")),
                (wx = It("getPluginDuration")),
                (po = It("getPluginDestination")),
                (Sx = It("createPluginInstance")),
                (go = It("renderPlugin")),
                (ho = It("clearPlugin"));
        });
    var md = f((Uq, vd) => {
        function Ox(e, t) {
            return e == null || e !== e ? t : e;
        }
        vd.exports = Ox;
    });
    var Id = f((Bq, _d) => {
        function xx(e, t, n, r) {
            var i = -1,
                o = e == null ? 0 : e.length;
            for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
            return n;
        }
        _d.exports = xx;
    });
    var bd = f((Hq, Td) => {
        function Rx(e) {
            return function (t, n, r) {
                for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
                    var u = s[e ? a : ++i];
                    if (n(o[u], u, o) === !1) break;
                }
                return t;
            };
        }
        Td.exports = Rx;
    });
    var wd = f((Wq, Ad) => {
        var Cx = bd(),
            Px = Cx();
        Ad.exports = Px;
    });
    var Eo = f((zq, Sd) => {
        var Lx = wd(),
            Nx = dn();
        function Dx(e, t) {
            return e && Lx(e, t, Nx);
        }
        Sd.exports = Dx;
    });
    var xd = f((jq, Od) => {
        var Mx = vt();
        function Fx(e, t) {
            return function (n, r) {
                if (n == null) return n;
                if (!Mx(n)) return e(n, r);
                for (
                    var i = n.length, o = t ? i : -1, s = Object(n);
                    (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

                );
                return n;
            };
        }
        Od.exports = Fx;
    });
    var vo = f((Kq, Rd) => {
        var qx = Eo(),
            kx = xd(),
            Gx = kx(qx);
        Rd.exports = Gx;
    });
    var Pd = f((Yq, Cd) => {
        function Xx(e, t, n, r, i) {
            return (
                i(e, function (o, s, a) {
                    n = r ? ((r = !1), o) : t(n, o, s, a);
                }),
                n
            );
        }
        Cd.exports = Xx;
    });
    var Nd = f((Qq, Ld) => {
        var Vx = Id(),
            Ux = vo(),
            Bx = dt(),
            Hx = Pd(),
            Wx = be();
        function zx(e, t, n) {
            var r = Wx(e) ? Vx : Hx,
                i = arguments.length < 3;
            return r(e, Bx(t, 4), n, i, Ux);
        }
        Ld.exports = zx;
    });
    var Md = f(($q, Dd) => {
        var jx = zi(),
            Kx = dt(),
            Yx = ji(),
            Qx = Math.max,
            $x = Math.min;
        function Zx(e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) return -1;
            var i = r - 1;
            return (
                n !== void 0 &&
                    ((i = Yx(n)), (i = n < 0 ? Qx(r + i, 0) : $x(i, r - 1))),
                jx(e, Kx(t, 3), i, !0)
            );
        }
        Dd.exports = Zx;
    });
    var qd = f((Zq, Fd) => {
        var Jx = Wi(),
            eR = Md(),
            tR = Jx(eR);
        Fd.exports = tR;
    });
    function kd(e, t) {
        return e === t
            ? e !== 0 || t !== 0 || 1 / e === 1 / t
            : e !== e && t !== t;
    }
    function nR(e, t) {
        if (kd(e, t)) return !0;
        if (
            typeof e != "object" ||
            e === null ||
            typeof t != "object" ||
            t === null
        )
            return !1;
        let n = Object.keys(e),
            r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (let i = 0; i < n.length; i++)
            if (!Object.hasOwn(t, n[i]) || !kd(e[n[i]], t[n[i]])) return !1;
        return !0;
    }
    var mo,
        Gd = ye(() => {
            "use strict";
            mo = nR;
        });
    var rp = {};
    Ne(rp, {
        cleanupHTMLElement: () => JR,
        clearAllStyles: () => ZR,
        clearObjectCache: () => mR,
        getActionListProgress: () => tC,
        getAffectedElements: () => Ao,
        getComputedStyle: () => OR,
        getDestinationValues: () => DR,
        getElementId: () => bR,
        getInstanceId: () => IR,
        getInstanceOrigin: () => CR,
        getItemConfigByKey: () => NR,
        getMaxDurationItemIndex: () => np,
        getNamespacedParameterId: () => iC,
        getRenderType: () => Jd,
        getStyleProp: () => MR,
        mediaQueriesEqual: () => aC,
        observeStore: () => SR,
        reduceListToGroup: () => nC,
        reifyState: () => AR,
        renderHTMLElement: () => FR,
        shallowEqual: () => mo,
        shouldAllowMediaQuery: () => oC,
        shouldNamespaceEventParameter: () => rC,
        stringifyTarget: () => sC,
    });
    function mR() {
        yr.clear();
    }
    function IR() {
        return "i" + _R++;
    }
    function bR(e, t) {
        for (let n in e) {
            let r = e[n];
            if (r && r.ref === t) return r.id;
        }
        return "e" + TR++;
    }
    function AR({ events: e, actionLists: t, site: n } = {}) {
        let r = (0, _r.default)(
                e,
                (s, a) => {
                    let { eventTypeId: u } = a;
                    return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
                },
                {}
            ),
            i = n && n.mediaQueries,
            o = [];
        return (
            i
                ? (o = i.map((s) => s.key))
                : ((i = []),
                  console.warn("IX2 missing mediaQueries in site data")),
            {
                ixData: {
                    events: e,
                    actionLists: t,
                    eventTypeMap: r,
                    mediaQueries: i,
                    mediaQueryKeys: o,
                },
            }
        );
    }
    function SR({ store: e, select: t, onChange: n, comparator: r = wR }) {
        let { getState: i, subscribe: o } = e,
            s = o(u),
            a = t(i());
        function u() {
            let c = t(i());
            if (c == null) {
                s();
                return;
            }
            r(c, a) || ((a = c), n(a, e));
        }
        return s;
    }
    function Ud(e) {
        let t = typeof e;
        if (t === "string") return { id: e };
        if (e != null && t === "object") {
            let {
                id: n,
                objectId: r,
                selector: i,
                selectorGuids: o,
                appliesTo: s,
                useEventTarget: a,
            } = e;
            return {
                id: n,
                objectId: r,
                selector: i,
                selectorGuids: o,
                appliesTo: s,
                useEventTarget: a,
            };
        }
        return {};
    }
    function Ao({
        config: e,
        event: t,
        eventTarget: n,
        elementRoot: r,
        elementApi: i,
    }) {
        if (!i) throw new Error("IX2 missing elementApi");
        let { targets: o } = e;
        if (Array.isArray(o) && o.length > 0)
            return o.reduce(
                (O, E) =>
                    O.concat(
                        Ao({
                            config: { target: E },
                            event: t,
                            eventTarget: n,
                            elementRoot: r,
                            elementApi: i,
                        })
                    ),
                []
            );
        let {
                getValidDocument: s,
                getQuerySelector: a,
                queryDocument: u,
                getChildElements: c,
                getSiblingElements: y,
                matchSelector: g,
                elementContains: p,
                isSiblingNode: h,
            } = i,
            { target: m } = e;
        if (!m) return [];
        let {
            id: _,
            objectId: b,
            selector: I,
            selectorGuids: S,
            appliesTo: A,
            useEventTarget: C,
        } = Ud(m);
        if (b) return [yr.has(b) ? yr.get(b) : yr.set(b, {}).get(b)];
        if (A === Ei.PAGE) {
            let O = s(_);
            return O ? [O] : [];
        }
        let P = (t?.action?.config?.affectedElements ?? {})[_ || I] || {},
            B = !!(P.id || P.selector),
            H,
            W,
            j,
            G = t && a(Ud(t.target));
        if (
            (B
                ? ((H = P.limitAffectedElements), (W = G), (j = a(P)))
                : (W = j = a({ id: _, selector: I, selectorGuids: S })),
            t && C)
        ) {
            let O = n && (j || C === !0) ? [n] : u(G);
            if (j) {
                if (C === yR) return u(j).filter((E) => O.some((R) => p(E, R)));
                if (C === Xd) return u(j).filter((E) => O.some((R) => p(R, E)));
                if (C === Vd) return u(j).filter((E) => O.some((R) => h(R, E)));
            }
            return O;
        }
        return W == null || j == null
            ? []
            : ze && r
            ? u(j).filter((O) => r.contains(O))
            : H === Xd
            ? u(W, j)
            : H === hR
            ? c(u(W)).filter(g(j))
            : H === Vd
            ? y(u(W)).filter(g(j))
            : u(j);
    }
    function OR({ element: e, actionItem: t }) {
        if (!ze) return {};
        let { actionTypeId: n } = t;
        switch (n) {
            case Ht:
            case Wt:
            case zt:
            case jt:
            case Tr:
                return window.getComputedStyle(e);
            default:
                return {};
        }
    }
    function CR(e, t = {}, n = {}, r, i) {
        let { getStyle: o } = i,
            { actionTypeId: s } = r;
        if (_t(s)) return fo(s)(t[s], r);
        switch (r.actionTypeId) {
            case Vt:
            case Ut:
            case Bt:
            case Tn:
                return t[r.actionTypeId] || wo[r.actionTypeId];
            case bn:
                return xR(t[r.actionTypeId], r.config.filters);
            case An:
                return RR(t[r.actionTypeId], r.config.fontVariations);
            case Qd:
                return { value: (0, ot.default)(parseFloat(o(e, vr)), 1) };
            case Ht: {
                let a = o(e, et),
                    u = o(e, tt),
                    c,
                    y;
                return (
                    r.config.widthUnit === gt
                        ? (c = Bd.test(a) ? parseFloat(a) : parseFloat(n.width))
                        : (c = (0, ot.default)(
                              parseFloat(a),
                              parseFloat(n.width)
                          )),
                    r.config.heightUnit === gt
                        ? (y = Bd.test(u)
                              ? parseFloat(u)
                              : parseFloat(n.height))
                        : (y = (0, ot.default)(
                              parseFloat(u),
                              parseFloat(n.height)
                          )),
                    { widthValue: c, heightValue: y }
                );
            }
            case Wt:
            case zt:
            case jt:
                return YR({
                    element: e,
                    actionTypeId: r.actionTypeId,
                    computedStyle: n,
                    getStyle: o,
                });
            case Tr:
                return { value: (0, ot.default)(o(e, mr), n.display) };
            case vR:
                return t[r.actionTypeId] || { value: 0 };
            default:
                return;
        }
    }
    function DR({ element: e, actionItem: t, elementApi: n }) {
        if (_t(t.actionTypeId)) return po(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
            case Vt:
            case Ut:
            case Bt:
            case Tn: {
                let { xValue: r, yValue: i, zValue: o } = t.config;
                return { xValue: r, yValue: i, zValue: o };
            }
            case Ht: {
                let { getStyle: r, setStyle: i, getProperty: o } = n,
                    { widthUnit: s, heightUnit: a } = t.config,
                    { widthValue: u, heightValue: c } = t.config;
                if (!ze) return { widthValue: u, heightValue: c };
                if (s === gt) {
                    let y = r(e, et);
                    i(e, et, ""), (u = o(e, "offsetWidth")), i(e, et, y);
                }
                if (a === gt) {
                    let y = r(e, tt);
                    i(e, tt, ""), (c = o(e, "offsetHeight")), i(e, tt, y);
                }
                return { widthValue: u, heightValue: c };
            }
            case Wt:
            case zt:
            case jt: {
                let {
                    rValue: r,
                    gValue: i,
                    bValue: o,
                    aValue: s,
                    globalSwatchId: a,
                } = t.config;
                if (a && a.startsWith("--")) {
                    let { getStyle: u } = n,
                        c = u(e, a),
                        y = (0, zd.normalizeColor)(c);
                    return {
                        rValue: y.red,
                        gValue: y.green,
                        bValue: y.blue,
                        aValue: y.alpha,
                    };
                }
                return { rValue: r, gValue: i, bValue: o, aValue: s };
            }
            case bn:
                return t.config.filters.reduce(PR, {});
            case An:
                return t.config.fontVariations.reduce(LR, {});
            default: {
                let { value: r } = t.config;
                return { value: r };
            }
        }
    }
    function Jd(e) {
        if (/^TRANSFORM_/.test(e)) return Kd;
        if (/^STYLE_/.test(e)) return To;
        if (/^GENERAL_/.test(e)) return Io;
        if (/^PLUGIN_/.test(e)) return Yd;
    }
    function MR(e, t) {
        return e === To ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function FR(e, t, n, r, i, o, s, a, u) {
        switch (a) {
            case Kd:
                return VR(e, t, n, i, s);
            case To:
                return QR(e, t, n, i, o, s);
            case Io:
                return $R(e, i, s);
            case Yd: {
                let { actionTypeId: c } = i;
                if (_t(c)) return go(c)(u, t, i);
            }
        }
    }
    function VR(e, t, n, r, i) {
        let o = XR.map((a) => {
                let u = wo[a],
                    {
                        xValue: c = u.xValue,
                        yValue: y = u.yValue,
                        zValue: g = u.zValue,
                        xUnit: p = "",
                        yUnit: h = "",
                        zUnit: m = "",
                    } = t[a] || {};
                switch (a) {
                    case Vt:
                        return `${oR}(${c}${p}, ${y}${h}, ${g}${m})`;
                    case Ut:
                        return `${aR}(${c}${p}, ${y}${h}, ${g}${m})`;
                    case Bt:
                        return `${sR}(${c}${p}) ${uR}(${y}${h}) ${cR}(${g}${m})`;
                    case Tn:
                        return `${lR}(${c}${p}, ${y}${h})`;
                    default:
                        return "";
                }
            }).join(" "),
            { setStyle: s } = i;
        Tt(e, pt, i), s(e, pt, o), HR(r, n) && s(e, lr, fR);
    }
    function UR(e, t, n, r) {
        let i = (0, _r.default)(
                t,
                (s, a, u) => `${s} ${u}(${a}${GR(u, n)})`,
                ""
            ),
            { setStyle: o } = r;
        Tt(e, mn, r), o(e, mn, i);
    }
    function BR(e, t, n, r) {
        let i = (0, _r.default)(
                t,
                (s, a, u) => (s.push(`"${u}" ${a}`), s),
                []
            ).join(", "),
            { setStyle: o } = r;
        Tt(e, _n, r), o(e, _n, i);
    }
    function HR({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
        return (
            (e === Vt && r !== void 0) ||
            (e === Ut && r !== void 0) ||
            (e === Bt && (t !== void 0 || n !== void 0))
        );
    }
    function KR(e, t) {
        let n = e.exec(t);
        return n ? n[1] : "";
    }
    function YR({
        element: e,
        actionTypeId: t,
        computedStyle: n,
        getStyle: r,
    }) {
        let i = bo[t],
            o = r(e, i),
            s = zR.test(o) ? o : n[i],
            a = KR(jR, s).split(In);
        return {
            rValue: (0, ot.default)(parseInt(a[0], 10), 255),
            gValue: (0, ot.default)(parseInt(a[1], 10), 255),
            bValue: (0, ot.default)(parseInt(a[2], 10), 255),
            aValue: (0, ot.default)(parseFloat(a[3]), 1),
        };
    }
    function QR(e, t, n, r, i, o) {
        let { setStyle: s } = o;
        switch (r.actionTypeId) {
            case Ht: {
                let { widthUnit: a = "", heightUnit: u = "" } = r.config,
                    { widthValue: c, heightValue: y } = n;
                c !== void 0 &&
                    (a === gt && (a = "px"), Tt(e, et, o), s(e, et, c + a)),
                    y !== void 0 &&
                        (u === gt && (u = "px"), Tt(e, tt, o), s(e, tt, y + u));
                break;
            }
            case bn: {
                UR(e, n, r.config, o);
                break;
            }
            case An: {
                BR(e, n, r.config, o);
                break;
            }
            case Wt:
            case zt:
            case jt: {
                let a = bo[r.actionTypeId],
                    u = Math.round(n.rValue),
                    c = Math.round(n.gValue),
                    y = Math.round(n.bValue),
                    g = n.aValue;
                Tt(e, a, o),
                    s(
                        e,
                        a,
                        g >= 1
                            ? `rgb(${u},${c},${y})`
                            : `rgba(${u},${c},${y},${g})`
                    );
                break;
            }
            default: {
                let { unit: a = "" } = r.config;
                Tt(e, i, o), s(e, i, n.value + a);
                break;
            }
        }
    }
    function $R(e, t, n) {
        let { setStyle: r } = n;
        switch (t.actionTypeId) {
            case Tr: {
                let { value: i } = t.config;
                i === dR && ze ? r(e, mr, Yi) : r(e, mr, i);
                return;
            }
        }
    }
    function Tt(e, t, n) {
        if (!ze) return;
        let r = Zd[t];
        if (!r) return;
        let { getStyle: i, setStyle: o } = n,
            s = i(e, Xt);
        if (!s) {
            o(e, Xt, r);
            return;
        }
        let a = s.split(In).map($d);
        a.indexOf(r) === -1 && o(e, Xt, a.concat(r).join(In));
    }
    function ep(e, t, n) {
        if (!ze) return;
        let r = Zd[t];
        if (!r) return;
        let { getStyle: i, setStyle: o } = n,
            s = i(e, Xt);
        !s ||
            s.indexOf(r) === -1 ||
            o(
                e,
                Xt,
                s
                    .split(In)
                    .map($d)
                    .filter((a) => a !== r)
                    .join(In)
            );
    }
    function ZR({ store: e, elementApi: t }) {
        let { ixData: n } = e.getState(),
            { events: r = {}, actionLists: i = {} } = n;
        Object.keys(r).forEach((o) => {
            let s = r[o],
                { config: a } = s.action,
                { actionListId: u } = a,
                c = i[u];
            c && Hd({ actionList: c, event: s, elementApi: t });
        }),
            Object.keys(i).forEach((o) => {
                Hd({ actionList: i[o], elementApi: t });
            });
    }
    function Hd({ actionList: e = {}, event: t, elementApi: n }) {
        let { actionItemGroups: r, continuousParameterGroups: i } = e;
        r &&
            r.forEach((o) => {
                Wd({ actionGroup: o, event: t, elementApi: n });
            }),
            i &&
                i.forEach((o) => {
                    let { continuousActionGroups: s } = o;
                    s.forEach((a) => {
                        Wd({ actionGroup: a, event: t, elementApi: n });
                    });
                });
    }
    function Wd({ actionGroup: e, event: t, elementApi: n }) {
        let { actionItems: r } = e;
        r.forEach((i) => {
            let { actionTypeId: o, config: s } = i,
                a;
            _t(o)
                ? (a = (u) => ho(o)(u, i))
                : (a = tp({ effect: eC, actionTypeId: o, elementApi: n })),
                Ao({ config: s, event: t, elementApi: n }).forEach(a);
        });
    }
    function JR(e, t, n) {
        let { setStyle: r, getStyle: i } = n,
            { actionTypeId: o } = t;
        if (o === Ht) {
            let { config: s } = t;
            s.widthUnit === gt && r(e, et, ""),
                s.heightUnit === gt && r(e, tt, "");
        }
        i(e, Xt) && tp({ effect: ep, actionTypeId: o, elementApi: n })(e);
    }
    function eC(e, t, n) {
        let { setStyle: r } = n;
        ep(e, t, n), r(e, t, ""), t === pt && r(e, lr, "");
    }
    function np(e) {
        let t = 0,
            n = 0;
        return (
            e.forEach((r, i) => {
                let { config: o } = r,
                    s = o.delay + o.duration;
                s >= t && ((t = s), (n = i));
            }),
            n
        );
    }
    function tC(e, t) {
        let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
            { actionItem: i, verboseTimeElapsed: o = 0 } = t,
            s = 0,
            a = 0;
        return (
            n.forEach((u, c) => {
                if (r && c === 0) return;
                let { actionItems: y } = u,
                    g = y[np(y)],
                    { config: p, actionTypeId: h } = g;
                i.id === g.id && (a = s + o);
                let m = Jd(h) === Io ? 0 : p.duration;
                s += p.delay + m;
            }),
            s > 0 ? vn(a / s) : 0
        );
    }
    function nC({ actionList: e, actionItemId: t, rawData: n }) {
        let { actionItemGroups: r, continuousParameterGroups: i } = e,
            o = [],
            s = (a) => (
                o.push(
                    (0, Ir.mergeIn)(a, ["config"], { delay: 0, duration: 0 })
                ),
                a.id === t
            );
        return (
            r && r.some(({ actionItems: a }) => a.some(s)),
            i &&
                i.some((a) => {
                    let { continuousActionGroups: u } = a;
                    return u.some(({ actionItems: c }) => c.some(s));
                }),
            (0, Ir.setIn)(n, ["actionLists"], {
                [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
            })
        );
    }
    function rC(e, { basedOn: t }) {
        return (
            (e === We.SCROLLING_IN_VIEW && (t === Ze.ELEMENT || t == null)) ||
            (e === We.MOUSE_MOVE && t === Ze.ELEMENT)
        );
    }
    function iC(e, t) {
        return e + ER + t;
    }
    function oC(e, t) {
        return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function aC(e, t) {
        return mo(e && e.sort(), t && t.sort());
    }
    function sC(e) {
        if (typeof e == "string") return e;
        if (e.pluginElement && e.objectId)
            return e.pluginElement + _o + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
        return t + _o + n + _o + r;
    }
    var ot,
        _r,
        Er,
        Ir,
        zd,
        rR,
        iR,
        oR,
        aR,
        sR,
        uR,
        cR,
        lR,
        fR,
        dR,
        vr,
        mn,
        _n,
        et,
        tt,
        jd,
        pR,
        gR,
        Xd,
        hR,
        Vd,
        yR,
        mr,
        Xt,
        gt,
        In,
        ER,
        _o,
        Kd,
        Io,
        To,
        Yd,
        Vt,
        Ut,
        Bt,
        Tn,
        Qd,
        bn,
        An,
        Ht,
        Wt,
        zt,
        jt,
        Tr,
        vR,
        $d,
        bo,
        Zd,
        yr,
        _R,
        TR,
        wR,
        Bd,
        xR,
        RR,
        PR,
        LR,
        NR,
        wo,
        qR,
        kR,
        GR,
        XR,
        WR,
        zR,
        jR,
        tp,
        ip = ye(() => {
            "use strict";
            (ot = le(md())), (_r = le(Nd())), (Er = le(qd())), (Ir = le(Ct()));
            De();
            Gd();
            Zi();
            zd = le(ao());
            yo();
            fr();
            ({
                BACKGROUND: rR,
                TRANSFORM: iR,
                TRANSLATE_3D: oR,
                SCALE_3D: aR,
                ROTATE_X: sR,
                ROTATE_Y: uR,
                ROTATE_Z: cR,
                SKEW: lR,
                PRESERVE_3D: fR,
                FLEX: dR,
                OPACITY: vr,
                FILTER: mn,
                FONT_VARIATION_SETTINGS: _n,
                WIDTH: et,
                HEIGHT: tt,
                BACKGROUND_COLOR: jd,
                BORDER_COLOR: pR,
                COLOR: gR,
                CHILDREN: Xd,
                IMMEDIATE_CHILDREN: hR,
                SIBLINGS: Vd,
                PARENT: yR,
                DISPLAY: mr,
                WILL_CHANGE: Xt,
                AUTO: gt,
                COMMA_DELIMITER: In,
                COLON_DELIMITER: ER,
                BAR_DELIMITER: _o,
                RENDER_TRANSFORM: Kd,
                RENDER_GENERAL: Io,
                RENDER_STYLE: To,
                RENDER_PLUGIN: Yd,
            } = we),
                ({
                    TRANSFORM_MOVE: Vt,
                    TRANSFORM_SCALE: Ut,
                    TRANSFORM_ROTATE: Bt,
                    TRANSFORM_SKEW: Tn,
                    STYLE_OPACITY: Qd,
                    STYLE_FILTER: bn,
                    STYLE_FONT_VARIATION: An,
                    STYLE_SIZE: Ht,
                    STYLE_BACKGROUND_COLOR: Wt,
                    STYLE_BORDER: zt,
                    STYLE_TEXT_COLOR: jt,
                    GENERAL_DISPLAY: Tr,
                    OBJECT_VALUE: vR,
                } = Re),
                ($d = (e) => e.trim()),
                (bo = Object.freeze({ [Wt]: jd, [zt]: pR, [jt]: gR })),
                (Zd = Object.freeze({
                    [pt]: iR,
                    [jd]: rR,
                    [vr]: vr,
                    [mn]: mn,
                    [et]: et,
                    [tt]: tt,
                    [_n]: _n,
                })),
                (yr = new Map());
            _R = 1;
            TR = 1;
            wR = (e, t) => e === t;
            (Bd = /px/),
                (xR = (e, t) =>
                    t.reduce(
                        (n, r) => (
                            n[r.type] == null && (n[r.type] = qR[r.type]), n
                        ),
                        e || {}
                    )),
                (RR = (e, t) =>
                    t.reduce(
                        (n, r) => (
                            n[r.type] == null &&
                                (n[r.type] = kR[r.type] || r.defaultValue || 0),
                            n
                        ),
                        e || {}
                    ));
            (PR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
                (LR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
                (NR = (e, t, n) => {
                    if (_t(e)) return lo(e)(n, t);
                    switch (e) {
                        case bn: {
                            let r = (0, Er.default)(
                                n.filters,
                                ({ type: i }) => i === t
                            );
                            return r ? r.value : 0;
                        }
                        case An: {
                            let r = (0, Er.default)(
                                n.fontVariations,
                                ({ type: i }) => i === t
                            );
                            return r ? r.value : 0;
                        }
                        default:
                            return n[t];
                    }
                });
            (wo = {
                [Vt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
                [Ut]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
                [Bt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
                [Tn]: Object.freeze({ xValue: 0, yValue: 0 }),
            }),
                (qR = Object.freeze({
                    blur: 0,
                    "hue-rotate": 0,
                    invert: 0,
                    grayscale: 0,
                    saturate: 100,
                    sepia: 0,
                    contrast: 100,
                    brightness: 100,
                })),
                (kR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
                (GR = (e, t) => {
                    let n = (0, Er.default)(
                        t.filters,
                        ({ type: r }) => r === e
                    );
                    if (n && n.unit) return n.unit;
                    switch (e) {
                        case "blur":
                            return "px";
                        case "hue-rotate":
                            return "deg";
                        default:
                            return "%";
                    }
                }),
                (XR = Object.keys(wo));
            (WR = "\\(([^)]+)\\)"), (zR = /^rgb/), (jR = RegExp(`rgba?${WR}`));
            tp =
                ({ effect: e, actionTypeId: t, elementApi: n }) =>
                (r) => {
                    switch (t) {
                        case Vt:
                        case Ut:
                        case Bt:
                        case Tn:
                            e(r, pt, n);
                            break;
                        case bn:
                            e(r, mn, n);
                            break;
                        case An:
                            e(r, _n, n);
                            break;
                        case Qd:
                            e(r, vr, n);
                            break;
                        case Ht:
                            e(r, et, n), e(r, tt, n);
                            break;
                        case Wt:
                        case zt:
                        case jt:
                            e(r, bo[t], n);
                            break;
                        case Tr:
                            e(r, mr, n);
                            break;
                    }
                };
        });
    var bt = f((So) => {
        "use strict";
        Object.defineProperty(So, "__esModule", { value: !0 });
        function uC(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        uC(So, {
            IX2BrowserSupport: function () {
                return cC;
            },
            IX2EasingUtils: function () {
                return fC;
            },
            IX2Easings: function () {
                return lC;
            },
            IX2ElementsReducer: function () {
                return dC;
            },
            IX2VanillaPlugins: function () {
                return pC;
            },
            IX2VanillaUtils: function () {
                return gC;
            },
        });
        var cC = Kt((fr(), Ye($f))),
            lC = Kt(($i(), Ye(En))),
            fC = Kt((Zi(), Ye(id))),
            dC = Kt((ud(), Ye(sd))),
            pC = Kt((yo(), Ye(Ed))),
            gC = Kt((ip(), Ye(rp)));
        function op(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap(),
                n = new WeakMap();
            return (op = function (r) {
                return r ? n : t;
            })(e);
        }
        function Kt(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || (typeof e != "object" && typeof e != "function"))
                return { default: e };
            var n = op(t);
            if (n && n.has(e)) return n.get(e);
            var r = { __proto__: null },
                i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if (
                    o !== "default" &&
                    Object.prototype.hasOwnProperty.call(e, o)
                ) {
                    var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    s && (s.get || s.set)
                        ? Object.defineProperty(r, o, s)
                        : (r[o] = e[o]);
                }
            return (r.default = e), n && n.set(e, r), r;
        }
    });
    var Ar,
        at,
        hC,
        yC,
        EC,
        vC,
        mC,
        _C,
        br,
        ap,
        IC,
        TC,
        Oo,
        bC,
        AC,
        wC,
        SC,
        sp,
        up = ye(() => {
            "use strict";
            De();
            (Ar = le(bt())),
                (at = le(Ct())),
                ({
                    IX2_RAW_DATA_IMPORTED: hC,
                    IX2_SESSION_STOPPED: yC,
                    IX2_INSTANCE_ADDED: EC,
                    IX2_INSTANCE_STARTED: vC,
                    IX2_INSTANCE_REMOVED: mC,
                    IX2_ANIMATION_FRAME_CHANGED: _C,
                } = Te),
                ({
                    optimizeFloat: br,
                    applyEasing: ap,
                    createBezierEasing: IC,
                } = Ar.IX2EasingUtils),
                ({ RENDER_GENERAL: TC } = we),
                ({
                    getItemConfigByKey: Oo,
                    getRenderType: bC,
                    getStyleProp: AC,
                } = Ar.IX2VanillaUtils),
                (wC = (e, t) => {
                    let {
                            position: n,
                            parameterId: r,
                            actionGroups: i,
                            destinationKeys: o,
                            smoothing: s,
                            restingValue: a,
                            actionTypeId: u,
                            customEasingFn: c,
                            skipMotion: y,
                            skipToValue: g,
                        } = e,
                        { parameters: p } = t.payload,
                        h = Math.max(1 - s, 0.01),
                        m = p[r];
                    m == null && ((h = 1), (m = a));
                    let _ = Math.max(m, 0) || 0,
                        b = br(_ - n),
                        I = y ? g : br(n + b * h),
                        S = I * 100;
                    if (I === n && e.current) return e;
                    let A, C, D, P;
                    for (let H = 0, { length: W } = i; H < W; H++) {
                        let { keyframe: j, actionItems: G } = i[H];
                        if ((H === 0 && (A = G[0]), S >= j)) {
                            A = G[0];
                            let O = i[H + 1],
                                E = O && S !== j;
                            (C = E ? O.actionItems[0] : null),
                                E &&
                                    ((D = j / 100),
                                    (P = (O.keyframe - j) / 100));
                        }
                    }
                    let B = {};
                    if (A && !C)
                        for (let H = 0, { length: W } = o; H < W; H++) {
                            let j = o[H];
                            B[j] = Oo(u, j, A.config);
                        }
                    else if (A && C && D !== void 0 && P !== void 0) {
                        let H = (I - D) / P,
                            W = A.config.easing,
                            j = ap(W, H, c);
                        for (let G = 0, { length: O } = o; G < O; G++) {
                            let E = o[G],
                                R = Oo(u, E, A.config),
                                Z = (Oo(u, E, C.config) - R) * j + R;
                            B[E] = Z;
                        }
                    }
                    return (0, at.merge)(e, { position: I, current: B });
                }),
                (SC = (e, t) => {
                    let {
                            active: n,
                            origin: r,
                            start: i,
                            immediate: o,
                            renderType: s,
                            verbose: a,
                            actionItem: u,
                            destination: c,
                            destinationKeys: y,
                            pluginDuration: g,
                            instanceDelay: p,
                            customEasingFn: h,
                            skipMotion: m,
                        } = e,
                        _ = u.config.easing,
                        { duration: b, delay: I } = u.config;
                    g != null && (b = g),
                        (I = p ?? I),
                        s === TC ? (b = 0) : (o || m) && (b = I = 0);
                    let { now: S } = t.payload;
                    if (n && r) {
                        let A = S - (i + I);
                        if (a) {
                            let H = S - i,
                                W = b + I,
                                j = br(Math.min(Math.max(0, H / W), 1));
                            e = (0, at.set)(e, "verboseTimeElapsed", W * j);
                        }
                        if (A < 0) return e;
                        let C = br(Math.min(Math.max(0, A / b), 1)),
                            D = ap(_, C, h),
                            P = {},
                            B = null;
                        return (
                            y.length &&
                                (B = y.reduce((H, W) => {
                                    let j = c[W],
                                        G = parseFloat(r[W]) || 0,
                                        E = (parseFloat(j) - G) * D + G;
                                    return (H[W] = E), H;
                                }, {})),
                            (P.current = B),
                            (P.position = C),
                            C === 1 && ((P.active = !1), (P.complete = !0)),
                            (0, at.merge)(e, P)
                        );
                    }
                    return e;
                }),
                (sp = (e = Object.freeze({}), t) => {
                    switch (t.type) {
                        case hC:
                            return t.payload.ixInstances || Object.freeze({});
                        case yC:
                            return Object.freeze({});
                        case EC: {
                            let {
                                    instanceId: n,
                                    elementId: r,
                                    actionItem: i,
                                    eventId: o,
                                    eventTarget: s,
                                    eventStateKey: a,
                                    actionListId: u,
                                    groupIndex: c,
                                    isCarrier: y,
                                    origin: g,
                                    destination: p,
                                    immediate: h,
                                    verbose: m,
                                    continuous: _,
                                    parameterId: b,
                                    actionGroups: I,
                                    smoothing: S,
                                    restingValue: A,
                                    pluginInstance: C,
                                    pluginDuration: D,
                                    instanceDelay: P,
                                    skipMotion: B,
                                    skipToValue: H,
                                } = t.payload,
                                { actionTypeId: W } = i,
                                j = bC(W),
                                G = AC(j, W),
                                O = Object.keys(p).filter(
                                    (R) =>
                                        p[R] != null && typeof p[R] != "string"
                                ),
                                { easing: E } = i.config;
                            return (0, at.set)(e, n, {
                                id: n,
                                elementId: r,
                                active: !1,
                                position: 0,
                                start: 0,
                                origin: g,
                                destination: p,
                                destinationKeys: O,
                                immediate: h,
                                verbose: m,
                                current: null,
                                actionItem: i,
                                actionTypeId: W,
                                eventId: o,
                                eventTarget: s,
                                eventStateKey: a,
                                actionListId: u,
                                groupIndex: c,
                                renderType: j,
                                isCarrier: y,
                                styleProp: G,
                                continuous: _,
                                parameterId: b,
                                actionGroups: I,
                                smoothing: S,
                                restingValue: A,
                                pluginInstance: C,
                                pluginDuration: D,
                                instanceDelay: P,
                                skipMotion: B,
                                skipToValue: H,
                                customEasingFn:
                                    Array.isArray(E) && E.length === 4
                                        ? IC(E)
                                        : void 0,
                            });
                        }
                        case vC: {
                            let { instanceId: n, time: r } = t.payload;
                            return (0, at.mergeIn)(e, [n], {
                                active: !0,
                                complete: !1,
                                start: r,
                            });
                        }
                        case mC: {
                            let { instanceId: n } = t.payload;
                            if (!e[n]) return e;
                            let r = {},
                                i = Object.keys(e),
                                { length: o } = i;
                            for (let s = 0; s < o; s++) {
                                let a = i[s];
                                a !== n && (r[a] = e[a]);
                            }
                            return r;
                        }
                        case _C: {
                            let n = e,
                                r = Object.keys(e),
                                { length: i } = r;
                            for (let o = 0; o < i; o++) {
                                let s = r[o],
                                    a = e[s],
                                    u = a.continuous ? wC : SC;
                                n = (0, at.set)(n, s, u(a, t));
                            }
                            return n;
                        }
                        default:
                            return e;
                    }
                });
        });
    var OC,
        xC,
        RC,
        cp,
        lp = ye(() => {
            "use strict";
            De();
            ({
                IX2_RAW_DATA_IMPORTED: OC,
                IX2_SESSION_STOPPED: xC,
                IX2_PARAMETER_CHANGED: RC,
            } = Te),
                (cp = (e = {}, t) => {
                    switch (t.type) {
                        case OC:
                            return t.payload.ixParameters || {};
                        case xC:
                            return {};
                        case RC: {
                            let { key: n, value: r } = t.payload;
                            return (e[n] = r), e;
                        }
                        default:
                            return e;
                    }
                });
        });
    var pp = {};
    Ne(pp, { default: () => PC });
    var fp,
        dp,
        CC,
        PC,
        gp = ye(() => {
            "use strict";
            fp = le(yi());
            Is();
            Us();
            Ws();
            dp = le(bt());
            up();
            lp();
            ({ ixElements: CC } = dp.IX2ElementsReducer),
                (PC = (0, fp.combineReducers)({
                    ixData: _s,
                    ixRequest: Vs,
                    ixSession: Hs,
                    ixElements: CC,
                    ixInstances: sp,
                    ixParameters: cp,
                }));
        });
    var yp = f((yk, hp) => {
        var LC = lt(),
            NC = be(),
            DC = rt(),
            MC = "[object String]";
        function FC(e) {
            return typeof e == "string" || (!NC(e) && DC(e) && LC(e) == MC);
        }
        hp.exports = FC;
    });
    var vp = f((Ek, Ep) => {
        var qC = Hi(),
            kC = qC("length");
        Ep.exports = kC;
    });
    var _p = f((vk, mp) => {
        var GC = "\\ud800-\\udfff",
            XC = "\\u0300-\\u036f",
            VC = "\\ufe20-\\ufe2f",
            UC = "\\u20d0-\\u20ff",
            BC = XC + VC + UC,
            HC = "\\ufe0e\\ufe0f",
            WC = "\\u200d",
            zC = RegExp("[" + WC + GC + BC + HC + "]");
        function jC(e) {
            return zC.test(e);
        }
        mp.exports = jC;
    });
    var Rp = f((mk, xp) => {
        var Tp = "\\ud800-\\udfff",
            KC = "\\u0300-\\u036f",
            YC = "\\ufe20-\\ufe2f",
            QC = "\\u20d0-\\u20ff",
            $C = KC + YC + QC,
            ZC = "\\ufe0e\\ufe0f",
            JC = "[" + Tp + "]",
            xo = "[" + $C + "]",
            Ro = "\\ud83c[\\udffb-\\udfff]",
            eP = "(?:" + xo + "|" + Ro + ")",
            bp = "[^" + Tp + "]",
            Ap = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            wp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            tP = "\\u200d",
            Sp = eP + "?",
            Op = "[" + ZC + "]?",
            nP =
                "(?:" +
                tP +
                "(?:" +
                [bp, Ap, wp].join("|") +
                ")" +
                Op +
                Sp +
                ")*",
            rP = Op + Sp + nP,
            iP = "(?:" + [bp + xo + "?", xo, Ap, wp, JC].join("|") + ")",
            Ip = RegExp(Ro + "(?=" + Ro + ")|" + iP + rP, "g");
        function oP(e) {
            for (var t = (Ip.lastIndex = 0); Ip.test(e); ) ++t;
            return t;
        }
        xp.exports = oP;
    });
    var Pp = f((_k, Cp) => {
        var aP = vp(),
            sP = _p(),
            uP = Rp();
        function cP(e) {
            return sP(e) ? uP(e) : aP(e);
        }
        Cp.exports = cP;
    });
    var Np = f((Ik, Lp) => {
        var lP = tr(),
            fP = nr(),
            dP = vt(),
            pP = yp(),
            gP = Pp(),
            hP = "[object Map]",
            yP = "[object Set]";
        function EP(e) {
            if (e == null) return 0;
            if (dP(e)) return pP(e) ? gP(e) : e.length;
            var t = fP(e);
            return t == hP || t == yP ? e.size : lP(e).length;
        }
        Lp.exports = EP;
    });
    var Mp = f((Tk, Dp) => {
        var vP = "Expected a function";
        function mP(e) {
            if (typeof e != "function") throw new TypeError(vP);
            return function () {
                var t = arguments;
                switch (t.length) {
                    case 0:
                        return !e.call(this);
                    case 1:
                        return !e.call(this, t[0]);
                    case 2:
                        return !e.call(this, t[0], t[1]);
                    case 3:
                        return !e.call(this, t[0], t[1], t[2]);
                }
                return !e.apply(this, t);
            };
        }
        Dp.exports = mP;
    });
    var Co = f((bk, Fp) => {
        var _P = ft(),
            IP = (function () {
                try {
                    var e = _P(Object, "defineProperty");
                    return e({}, "", {}), e;
                } catch {}
            })();
        Fp.exports = IP;
    });
    var Po = f((Ak, kp) => {
        var qp = Co();
        function TP(e, t, n) {
            t == "__proto__" && qp
                ? qp(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: n,
                      writable: !0,
                  })
                : (e[t] = n);
        }
        kp.exports = TP;
    });
    var Xp = f((wk, Gp) => {
        var bP = Po(),
            AP = Wn(),
            wP = Object.prototype,
            SP = wP.hasOwnProperty;
        function OP(e, t, n) {
            var r = e[t];
            (!(SP.call(e, t) && AP(r, n)) || (n === void 0 && !(t in e))) &&
                bP(e, t, n);
        }
        Gp.exports = OP;
    });
    var Bp = f((Sk, Up) => {
        var xP = Xp(),
            RP = gn(),
            CP = $n(),
            Vp = Je(),
            PP = kt();
        function LP(e, t, n, r) {
            if (!Vp(e)) return e;
            t = RP(t, e);
            for (
                var i = -1, o = t.length, s = o - 1, a = e;
                a != null && ++i < o;

            ) {
                var u = PP(t[i]),
                    c = n;
                if (
                    u === "__proto__" ||
                    u === "constructor" ||
                    u === "prototype"
                )
                    return e;
                if (i != s) {
                    var y = a[u];
                    (c = r ? r(y, u, a) : void 0),
                        c === void 0 &&
                            (c = Vp(y) ? y : CP(t[i + 1]) ? [] : {});
                }
                xP(a, u, c), (a = a[u]);
            }
            return e;
        }
        Up.exports = LP;
    });
    var Wp = f((Ok, Hp) => {
        var NP = or(),
            DP = Bp(),
            MP = gn();
        function FP(e, t, n) {
            for (var r = -1, i = t.length, o = {}; ++r < i; ) {
                var s = t[r],
                    a = NP(e, s);
                n(a, s) && DP(o, MP(s, e), a);
            }
            return o;
        }
        Hp.exports = FP;
    });
    var jp = f((xk, zp) => {
        var qP = Yn(),
            kP = ri(),
            GP = Ri(),
            XP = xi(),
            VP = Object.getOwnPropertySymbols,
            UP = VP
                ? function (e) {
                      for (var t = []; e; ) qP(t, GP(e)), (e = kP(e));
                      return t;
                  }
                : XP;
        zp.exports = UP;
    });
    var Yp = f((Rk, Kp) => {
        function BP(e) {
            var t = [];
            if (e != null) for (var n in Object(e)) t.push(n);
            return t;
        }
        Kp.exports = BP;
    });
    var $p = f((Ck, Qp) => {
        var HP = Je(),
            WP = er(),
            zP = Yp(),
            jP = Object.prototype,
            KP = jP.hasOwnProperty;
        function YP(e) {
            if (!HP(e)) return zP(e);
            var t = WP(e),
                n = [];
            for (var r in e)
                (r == "constructor" && (t || !KP.call(e, r))) || n.push(r);
            return n;
        }
        Qp.exports = YP;
    });
    var Jp = f((Pk, Zp) => {
        var QP = Pi(),
            $P = $p(),
            ZP = vt();
        function JP(e) {
            return ZP(e) ? QP(e, !0) : $P(e);
        }
        Zp.exports = JP;
    });
    var tg = f((Lk, eg) => {
        var eL = Oi(),
            tL = jp(),
            nL = Jp();
        function rL(e) {
            return eL(e, nL, tL);
        }
        eg.exports = rL;
    });
    var rg = f((Nk, ng) => {
        var iL = Bi(),
            oL = dt(),
            aL = Wp(),
            sL = tg();
        function uL(e, t) {
            if (e == null) return {};
            var n = iL(sL(e), function (r) {
                return [r];
            });
            return (
                (t = oL(t)),
                aL(e, n, function (r, i) {
                    return t(r, i[0]);
                })
            );
        }
        ng.exports = uL;
    });
    var og = f((Dk, ig) => {
        var cL = dt(),
            lL = Mp(),
            fL = rg();
        function dL(e, t) {
            return fL(e, lL(cL(t)));
        }
        ig.exports = dL;
    });
    var sg = f((Mk, ag) => {
        var pL = tr(),
            gL = nr(),
            hL = un(),
            yL = be(),
            EL = vt(),
            vL = Qn(),
            mL = er(),
            _L = Jn(),
            IL = "[object Map]",
            TL = "[object Set]",
            bL = Object.prototype,
            AL = bL.hasOwnProperty;
        function wL(e) {
            if (e == null) return !0;
            if (
                EL(e) &&
                (yL(e) ||
                    typeof e == "string" ||
                    typeof e.splice == "function" ||
                    vL(e) ||
                    _L(e) ||
                    hL(e))
            )
                return !e.length;
            var t = gL(e);
            if (t == IL || t == TL) return !e.size;
            if (mL(e)) return !pL(e).length;
            for (var n in e) if (AL.call(e, n)) return !1;
            return !0;
        }
        ag.exports = wL;
    });
    var cg = f((Fk, ug) => {
        var SL = Po(),
            OL = Eo(),
            xL = dt();
        function RL(e, t) {
            var n = {};
            return (
                (t = xL(t, 3)),
                OL(e, function (r, i, o) {
                    SL(n, i, t(r, i, o));
                }),
                n
            );
        }
        ug.exports = RL;
    });
    var fg = f((qk, lg) => {
        function CL(e, t) {
            for (
                var n = -1, r = e == null ? 0 : e.length;
                ++n < r && t(e[n], n, e) !== !1;

            );
            return e;
        }
        lg.exports = CL;
    });
    var pg = f((kk, dg) => {
        var PL = sr();
        function LL(e) {
            return typeof e == "function" ? e : PL;
        }
        dg.exports = LL;
    });
    var hg = f((Gk, gg) => {
        var NL = fg(),
            DL = vo(),
            ML = pg(),
            FL = be();
        function qL(e, t) {
            var n = FL(e) ? NL : DL;
            return n(e, ML(t));
        }
        gg.exports = qL;
    });
    var Eg = f((Xk, yg) => {
        var kL = He(),
            GL = function () {
                return kL.Date.now();
            };
        yg.exports = GL;
    });
    var _g = f((Vk, mg) => {
        var XL = Je(),
            Lo = Eg(),
            vg = ur(),
            VL = "Expected a function",
            UL = Math.max,
            BL = Math.min;
        function HL(e, t, n) {
            var r,
                i,
                o,
                s,
                a,
                u,
                c = 0,
                y = !1,
                g = !1,
                p = !0;
            if (typeof e != "function") throw new TypeError(VL);
            (t = vg(t) || 0),
                XL(n) &&
                    ((y = !!n.leading),
                    (g = "maxWait" in n),
                    (o = g ? UL(vg(n.maxWait) || 0, t) : o),
                    (p = "trailing" in n ? !!n.trailing : p));
            function h(P) {
                var B = r,
                    H = i;
                return (r = i = void 0), (c = P), (s = e.apply(H, B)), s;
            }
            function m(P) {
                return (c = P), (a = setTimeout(I, t)), y ? h(P) : s;
            }
            function _(P) {
                var B = P - u,
                    H = P - c,
                    W = t - B;
                return g ? BL(W, o - H) : W;
            }
            function b(P) {
                var B = P - u,
                    H = P - c;
                return u === void 0 || B >= t || B < 0 || (g && H >= o);
            }
            function I() {
                var P = Lo();
                if (b(P)) return S(P);
                a = setTimeout(I, _(P));
            }
            function S(P) {
                return (a = void 0), p && r ? h(P) : ((r = i = void 0), s);
            }
            function A() {
                a !== void 0 && clearTimeout(a),
                    (c = 0),
                    (r = u = i = a = void 0);
            }
            function C() {
                return a === void 0 ? s : S(Lo());
            }
            function D() {
                var P = Lo(),
                    B = b(P);
                if (((r = arguments), (i = this), (u = P), B)) {
                    if (a === void 0) return m(u);
                    if (g) return clearTimeout(a), (a = setTimeout(I, t)), h(u);
                }
                return a === void 0 && (a = setTimeout(I, t)), s;
            }
            return (D.cancel = A), (D.flush = C), D;
        }
        mg.exports = HL;
    });
    var Tg = f((Uk, Ig) => {
        var WL = _g(),
            zL = Je(),
            jL = "Expected a function";
        function KL(e, t, n) {
            var r = !0,
                i = !0;
            if (typeof e != "function") throw new TypeError(jL);
            return (
                zL(n) &&
                    ((r = "leading" in n ? !!n.leading : r),
                    (i = "trailing" in n ? !!n.trailing : i)),
                WL(e, t, { leading: r, maxWait: t, trailing: i })
            );
        }
        Ig.exports = KL;
    });
    var Ag = {};
    Ne(Ag, {
        actionListPlaybackChanged: () => Qt,
        animationFrameChanged: () => Sr,
        clearRequested: () => mN,
        elementStateChanged: () => Xo,
        eventListenerAdded: () => wr,
        eventStateChanged: () => qo,
        instanceAdded: () => ko,
        instanceRemoved: () => Go,
        instanceStarted: () => Or,
        mediaQueriesDefined: () => Uo,
        parameterChanged: () => Yt,
        playbackRequested: () => EN,
        previewRequested: () => yN,
        rawDataImported: () => No,
        sessionInitialized: () => Do,
        sessionStarted: () => Mo,
        sessionStopped: () => Fo,
        stopRequested: () => vN,
        testFrameRendered: () => _N,
        viewportWidthChanged: () => Vo,
    });
    var bg,
        YL,
        QL,
        $L,
        ZL,
        JL,
        eN,
        tN,
        nN,
        rN,
        iN,
        oN,
        aN,
        sN,
        uN,
        cN,
        lN,
        fN,
        dN,
        pN,
        gN,
        hN,
        No,
        Do,
        Mo,
        Fo,
        yN,
        EN,
        vN,
        mN,
        wr,
        _N,
        qo,
        Sr,
        Yt,
        ko,
        Or,
        Go,
        Xo,
        Qt,
        Vo,
        Uo,
        xr = ye(() => {
            "use strict";
            De();
            (bg = le(bt())),
                ({
                    IX2_RAW_DATA_IMPORTED: YL,
                    IX2_SESSION_INITIALIZED: QL,
                    IX2_SESSION_STARTED: $L,
                    IX2_SESSION_STOPPED: ZL,
                    IX2_PREVIEW_REQUESTED: JL,
                    IX2_PLAYBACK_REQUESTED: eN,
                    IX2_STOP_REQUESTED: tN,
                    IX2_CLEAR_REQUESTED: nN,
                    IX2_EVENT_LISTENER_ADDED: rN,
                    IX2_TEST_FRAME_RENDERED: iN,
                    IX2_EVENT_STATE_CHANGED: oN,
                    IX2_ANIMATION_FRAME_CHANGED: aN,
                    IX2_PARAMETER_CHANGED: sN,
                    IX2_INSTANCE_ADDED: uN,
                    IX2_INSTANCE_STARTED: cN,
                    IX2_INSTANCE_REMOVED: lN,
                    IX2_ELEMENT_STATE_CHANGED: fN,
                    IX2_ACTION_LIST_PLAYBACK_CHANGED: dN,
                    IX2_VIEWPORT_WIDTH_CHANGED: pN,
                    IX2_MEDIA_QUERIES_DEFINED: gN,
                } = Te),
                ({ reifyState: hN } = bg.IX2VanillaUtils),
                (No = (e) => ({ type: YL, payload: { ...hN(e) } })),
                (Do = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
                    type: QL,
                    payload: { hasBoundaryNodes: e, reducedMotion: t },
                })),
                (Mo = () => ({ type: $L })),
                (Fo = () => ({ type: ZL })),
                (yN = ({ rawData: e, defer: t }) => ({
                    type: JL,
                    payload: { defer: t, rawData: e },
                })),
                (EN = ({
                    actionTypeId: e = Re.GENERAL_START_ACTION,
                    actionListId: t,
                    actionItemId: n,
                    eventId: r,
                    allowEvents: i,
                    immediate: o,
                    testManual: s,
                    verbose: a,
                    rawData: u,
                }) => ({
                    type: eN,
                    payload: {
                        actionTypeId: e,
                        actionListId: t,
                        actionItemId: n,
                        testManual: s,
                        eventId: r,
                        allowEvents: i,
                        immediate: o,
                        verbose: a,
                        rawData: u,
                    },
                })),
                (vN = (e) => ({ type: tN, payload: { actionListId: e } })),
                (mN = () => ({ type: nN })),
                (wr = (e, t) => ({
                    type: rN,
                    payload: { target: e, listenerParams: t },
                })),
                (_N = (e = 1) => ({ type: iN, payload: { step: e } })),
                (qo = (e, t) => ({
                    type: oN,
                    payload: { stateKey: e, newState: t },
                })),
                (Sr = (e, t) => ({
                    type: aN,
                    payload: { now: e, parameters: t },
                })),
                (Yt = (e, t) => ({ type: sN, payload: { key: e, value: t } })),
                (ko = (e) => ({ type: uN, payload: { ...e } })),
                (Or = (e, t) => ({
                    type: cN,
                    payload: { instanceId: e, time: t },
                })),
                (Go = (e) => ({ type: lN, payload: { instanceId: e } })),
                (Xo = (e, t, n, r) => ({
                    type: fN,
                    payload: {
                        elementId: e,
                        actionTypeId: t,
                        current: n,
                        actionItem: r,
                    },
                })),
                (Qt = ({ actionListId: e, isPlaying: t }) => ({
                    type: dN,
                    payload: { actionListId: e, isPlaying: t },
                })),
                (Vo = ({ width: e, mediaQueries: t }) => ({
                    type: pN,
                    payload: { width: e, mediaQueries: t },
                })),
                (Uo = () => ({ type: gN }));
        });
    var Pe = {};
    Ne(Pe, {
        elementContains: () => Wo,
        getChildElements: () => CN,
        getClosestElement: () => wn,
        getProperty: () => wN,
        getQuerySelector: () => Ho,
        getRefType: () => zo,
        getSiblingElements: () => PN,
        getStyle: () => AN,
        getValidDocument: () => ON,
        isSiblingNode: () => RN,
        matchSelector: () => SN,
        queryDocument: () => xN,
        setStyle: () => bN,
    });
    function bN(e, t, n) {
        e.style[t] = n;
    }
    function AN(e, t) {
        return t.startsWith("--")
            ? window
                  .getComputedStyle(document.documentElement)
                  .getPropertyValue(t)
            : e.style[t];
    }
    function wN(e, t) {
        return e[t];
    }
    function SN(e) {
        return (t) => t[Bo](e);
    }
    function Ho({ id: e, selector: t }) {
        if (e) {
            let n = e;
            if (e.indexOf(wg) !== -1) {
                let r = e.split(wg),
                    i = r[0];
                if (
                    ((n = r[1]),
                    i !== document.documentElement.getAttribute(Og))
                )
                    return null;
            }
            return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
        }
        return t;
    }
    function ON(e) {
        return e == null || e === document.documentElement.getAttribute(Og)
            ? document
            : null;
    }
    function xN(e, t) {
        return Array.prototype.slice.call(
            document.querySelectorAll(t ? e + " " + t : e)
        );
    }
    function Wo(e, t) {
        return e.contains(t);
    }
    function RN(e, t) {
        return e !== t && e.parentNode === t.parentNode;
    }
    function CN(e) {
        let t = [];
        for (let n = 0, { length: r } = e || []; n < r; n++) {
            let { children: i } = e[n],
                { length: o } = i;
            if (o) for (let s = 0; s < o; s++) t.push(i[s]);
        }
        return t;
    }
    function PN(e = []) {
        let t = [],
            n = [];
        for (let r = 0, { length: i } = e; r < i; r++) {
            let { parentNode: o } = e[r];
            if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
                continue;
            n.push(o);
            let s = o.firstElementChild;
            for (; s != null; )
                e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
        }
        return t;
    }
    function zo(e) {
        return e != null && typeof e == "object"
            ? e instanceof Element
                ? IN
                : TN
            : null;
    }
    var Sg,
        Bo,
        wg,
        IN,
        TN,
        Og,
        wn,
        xg = ye(() => {
            "use strict";
            Sg = le(bt());
            De();
            ({ ELEMENT_MATCHES: Bo } = Sg.IX2BrowserSupport),
                ({
                    IX2_ID_DELIMITER: wg,
                    HTML_ELEMENT: IN,
                    PLAIN_OBJECT: TN,
                    WF_PAGE: Og,
                } = we);
            wn = Element.prototype.closest
                ? (e, t) =>
                      document.documentElement.contains(e) ? e.closest(t) : null
                : (e, t) => {
                      if (!document.documentElement.contains(e)) return null;
                      let n = e;
                      do {
                          if (n[Bo] && n[Bo](t)) return n;
                          n = n.parentNode;
                      } while (n != null);
                      return null;
                  };
        });
    var jo = f((Wk, Cg) => {
        var LN = Je(),
            Rg = Object.create,
            NN = (function () {
                function e() {}
                return function (t) {
                    if (!LN(t)) return {};
                    if (Rg) return Rg(t);
                    e.prototype = t;
                    var n = new e();
                    return (e.prototype = void 0), n;
                };
            })();
        Cg.exports = NN;
    });
    var Rr = f((zk, Pg) => {
        function DN() {}
        Pg.exports = DN;
    });
    var Pr = f((jk, Lg) => {
        var MN = jo(),
            FN = Rr();
        function Cr(e, t) {
            (this.__wrapped__ = e),
                (this.__actions__ = []),
                (this.__chain__ = !!t),
                (this.__index__ = 0),
                (this.__values__ = void 0);
        }
        Cr.prototype = MN(FN.prototype);
        Cr.prototype.constructor = Cr;
        Lg.exports = Cr;
    });
    var Fg = f((Kk, Mg) => {
        var Ng = Ot(),
            qN = un(),
            kN = be(),
            Dg = Ng ? Ng.isConcatSpreadable : void 0;
        function GN(e) {
            return kN(e) || qN(e) || !!(Dg && e && e[Dg]);
        }
        Mg.exports = GN;
    });
    var Gg = f((Yk, kg) => {
        var XN = Yn(),
            VN = Fg();
        function qg(e, t, n, r, i) {
            var o = -1,
                s = e.length;
            for (n || (n = VN), i || (i = []); ++o < s; ) {
                var a = e[o];
                t > 0 && n(a)
                    ? t > 1
                        ? qg(a, t - 1, n, r, i)
                        : XN(i, a)
                    : r || (i[i.length] = a);
            }
            return i;
        }
        kg.exports = qg;
    });
    var Vg = f((Qk, Xg) => {
        var UN = Gg();
        function BN(e) {
            var t = e == null ? 0 : e.length;
            return t ? UN(e, 1) : [];
        }
        Xg.exports = BN;
    });
    var Bg = f(($k, Ug) => {
        function HN(e, t, n) {
            switch (n.length) {
                case 0:
                    return e.call(t);
                case 1:
                    return e.call(t, n[0]);
                case 2:
                    return e.call(t, n[0], n[1]);
                case 3:
                    return e.call(t, n[0], n[1], n[2]);
            }
            return e.apply(t, n);
        }
        Ug.exports = HN;
    });
    var zg = f((Zk, Wg) => {
        var WN = Bg(),
            Hg = Math.max;
        function zN(e, t, n) {
            return (
                (t = Hg(t === void 0 ? e.length - 1 : t, 0)),
                function () {
                    for (
                        var r = arguments,
                            i = -1,
                            o = Hg(r.length - t, 0),
                            s = Array(o);
                        ++i < o;

                    )
                        s[i] = r[t + i];
                    i = -1;
                    for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
                    return (a[t] = n(s)), WN(e, this, a);
                }
            );
        }
        Wg.exports = zN;
    });
    var Kg = f((Jk, jg) => {
        function jN(e) {
            return function () {
                return e;
            };
        }
        jg.exports = jN;
    });
    var $g = f((eG, Qg) => {
        var KN = Kg(),
            Yg = Co(),
            YN = sr(),
            QN = Yg
                ? function (e, t) {
                      return Yg(e, "toString", {
                          configurable: !0,
                          enumerable: !1,
                          value: KN(t),
                          writable: !0,
                      });
                  }
                : YN;
        Qg.exports = QN;
    });
    var Jg = f((tG, Zg) => {
        var $N = 800,
            ZN = 16,
            JN = Date.now;
        function eD(e) {
            var t = 0,
                n = 0;
            return function () {
                var r = JN(),
                    i = ZN - (r - n);
                if (((n = r), i > 0)) {
                    if (++t >= $N) return arguments[0];
                } else t = 0;
                return e.apply(void 0, arguments);
            };
        }
        Zg.exports = eD;
    });
    var th = f((nG, eh) => {
        var tD = $g(),
            nD = Jg(),
            rD = nD(tD);
        eh.exports = rD;
    });
    var rh = f((rG, nh) => {
        var iD = Vg(),
            oD = zg(),
            aD = th();
        function sD(e) {
            return aD(oD(e, void 0, iD), e + "");
        }
        nh.exports = sD;
    });
    var ah = f((iG, oh) => {
        var ih = Li(),
            uD = ih && new ih();
        oh.exports = uD;
    });
    var uh = f((oG, sh) => {
        function cD() {}
        sh.exports = cD;
    });
    var Ko = f((aG, lh) => {
        var ch = ah(),
            lD = uh(),
            fD = ch
                ? function (e) {
                      return ch.get(e);
                  }
                : lD;
        lh.exports = fD;
    });
    var dh = f((sG, fh) => {
        var dD = {};
        fh.exports = dD;
    });
    var Yo = f((uG, gh) => {
        var ph = dh(),
            pD = Object.prototype,
            gD = pD.hasOwnProperty;
        function hD(e) {
            for (
                var t = e.name + "",
                    n = ph[t],
                    r = gD.call(ph, t) ? n.length : 0;
                r--;

            ) {
                var i = n[r],
                    o = i.func;
                if (o == null || o == e) return i.name;
            }
            return t;
        }
        gh.exports = hD;
    });
    var Nr = f((cG, hh) => {
        var yD = jo(),
            ED = Rr(),
            vD = 4294967295;
        function Lr(e) {
            (this.__wrapped__ = e),
                (this.__actions__ = []),
                (this.__dir__ = 1),
                (this.__filtered__ = !1),
                (this.__iteratees__ = []),
                (this.__takeCount__ = vD),
                (this.__views__ = []);
        }
        Lr.prototype = yD(ED.prototype);
        Lr.prototype.constructor = Lr;
        hh.exports = Lr;
    });
    var Eh = f((lG, yh) => {
        function mD(e, t) {
            var n = -1,
                r = e.length;
            for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
            return t;
        }
        yh.exports = mD;
    });
    var mh = f((fG, vh) => {
        var _D = Nr(),
            ID = Pr(),
            TD = Eh();
        function bD(e) {
            if (e instanceof _D) return e.clone();
            var t = new ID(e.__wrapped__, e.__chain__);
            return (
                (t.__actions__ = TD(e.__actions__)),
                (t.__index__ = e.__index__),
                (t.__values__ = e.__values__),
                t
            );
        }
        vh.exports = bD;
    });
    var Th = f((dG, Ih) => {
        var AD = Nr(),
            _h = Pr(),
            wD = Rr(),
            SD = be(),
            OD = rt(),
            xD = mh(),
            RD = Object.prototype,
            CD = RD.hasOwnProperty;
        function Dr(e) {
            if (OD(e) && !SD(e) && !(e instanceof AD)) {
                if (e instanceof _h) return e;
                if (CD.call(e, "__wrapped__")) return xD(e);
            }
            return new _h(e);
        }
        Dr.prototype = wD.prototype;
        Dr.prototype.constructor = Dr;
        Ih.exports = Dr;
    });
    var Ah = f((pG, bh) => {
        var PD = Nr(),
            LD = Ko(),
            ND = Yo(),
            DD = Th();
        function MD(e) {
            var t = ND(e),
                n = DD[t];
            if (typeof n != "function" || !(t in PD.prototype)) return !1;
            if (e === n) return !0;
            var r = LD(n);
            return !!r && e === r[0];
        }
        bh.exports = MD;
    });
    var xh = f((gG, Oh) => {
        var wh = Pr(),
            FD = rh(),
            qD = Ko(),
            Qo = Yo(),
            kD = be(),
            Sh = Ah(),
            GD = "Expected a function",
            XD = 8,
            VD = 32,
            UD = 128,
            BD = 256;
        function HD(e) {
            return FD(function (t) {
                var n = t.length,
                    r = n,
                    i = wh.prototype.thru;
                for (e && t.reverse(); r--; ) {
                    var o = t[r];
                    if (typeof o != "function") throw new TypeError(GD);
                    if (i && !s && Qo(o) == "wrapper") var s = new wh([], !0);
                }
                for (r = s ? r : n; ++r < n; ) {
                    o = t[r];
                    var a = Qo(o),
                        u = a == "wrapper" ? qD(o) : void 0;
                    u &&
                    Sh(u[0]) &&
                    u[1] == (UD | XD | VD | BD) &&
                    !u[4].length &&
                    u[9] == 1
                        ? (s = s[Qo(u[0])].apply(s, u[3]))
                        : (s = o.length == 1 && Sh(o) ? s[a]() : s.thru(o));
                }
                return function () {
                    var c = arguments,
                        y = c[0];
                    if (s && c.length == 1 && kD(y)) return s.plant(y).value();
                    for (var g = 0, p = n ? t[g].apply(this, c) : y; ++g < n; )
                        p = t[g].call(this, p);
                    return p;
                };
            });
        }
        Oh.exports = HD;
    });
    var Ch = f((hG, Rh) => {
        var WD = xh(),
            zD = WD();
        Rh.exports = zD;
    });
    var Lh = f((yG, Ph) => {
        function jD(e, t, n) {
            return (
                e === e &&
                    (n !== void 0 && (e = e <= n ? e : n),
                    t !== void 0 && (e = e >= t ? e : t)),
                e
            );
        }
        Ph.exports = jD;
    });
    var Dh = f((EG, Nh) => {
        var KD = Lh(),
            $o = ur();
        function YD(e, t, n) {
            return (
                n === void 0 && ((n = t), (t = void 0)),
                n !== void 0 && ((n = $o(n)), (n = n === n ? n : 0)),
                t !== void 0 && ((t = $o(t)), (t = t === t ? t : 0)),
                KD($o(e), t, n)
            );
        }
        Nh.exports = YD;
    });
    var Bh,
        Hh,
        Wh,
        zh,
        QD,
        $D,
        ZD,
        JD,
        eM,
        tM,
        nM,
        rM,
        iM,
        oM,
        aM,
        sM,
        uM,
        cM,
        lM,
        jh,
        Kh,
        fM,
        dM,
        pM,
        Yh,
        gM,
        hM,
        Qh,
        yM,
        Zo,
        $h,
        Mh,
        Fh,
        Zh,
        On,
        EM,
        nt,
        Jh,
        vM,
        Fe,
        je,
        xn,
        ey,
        Jo,
        qh,
        ea,
        mM,
        Sn,
        _M,
        IM,
        TM,
        ty,
        kh,
        bM,
        Gh,
        AM,
        wM,
        SM,
        Xh,
        Mr,
        Fr,
        Vh,
        Uh,
        ny,
        ry = ye(() => {
            "use strict";
            (Bh = le(Ch())), (Hh = le(ar())), (Wh = le(Dh()));
            De();
            ta();
            xr();
            (zh = le(bt())),
                ({
                    MOUSE_CLICK: QD,
                    MOUSE_SECOND_CLICK: $D,
                    MOUSE_DOWN: ZD,
                    MOUSE_UP: JD,
                    MOUSE_OVER: eM,
                    MOUSE_OUT: tM,
                    DROPDOWN_CLOSE: nM,
                    DROPDOWN_OPEN: rM,
                    SLIDER_ACTIVE: iM,
                    SLIDER_INACTIVE: oM,
                    TAB_ACTIVE: aM,
                    TAB_INACTIVE: sM,
                    NAVBAR_CLOSE: uM,
                    NAVBAR_OPEN: cM,
                    MOUSE_MOVE: lM,
                    PAGE_SCROLL_DOWN: jh,
                    SCROLL_INTO_VIEW: Kh,
                    SCROLL_OUT_OF_VIEW: fM,
                    PAGE_SCROLL_UP: dM,
                    SCROLLING_IN_VIEW: pM,
                    PAGE_FINISH: Yh,
                    ECOMMERCE_CART_CLOSE: gM,
                    ECOMMERCE_CART_OPEN: hM,
                    PAGE_START: Qh,
                    PAGE_SCROLL: yM,
                } = We),
                (Zo = "COMPONENT_ACTIVE"),
                ($h = "COMPONENT_INACTIVE"),
                ({ COLON_DELIMITER: Mh } = we),
                ({ getNamespacedParameterId: Fh } = zh.IX2VanillaUtils),
                (Zh = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
                (On = Zh(({ element: e, nativeEvent: t }) => e === t.target)),
                (EM = Zh(({ element: e, nativeEvent: t }) =>
                    e.contains(t.target)
                )),
                (nt = (0, Bh.default)([On, EM])),
                (Jh = (e, t) => {
                    if (t) {
                        let { ixData: n } = e.getState(),
                            { events: r } = n,
                            i = r[t];
                        if (i && !mM[i.eventTypeId]) return i;
                    }
                    return null;
                }),
                (vM = ({ store: e, event: t }) => {
                    let { action: n } = t,
                        { autoStopEventId: r } = n.config;
                    return !!Jh(e, r);
                }),
                (Fe = (
                    { store: e, event: t, element: n, eventStateKey: r },
                    i
                ) => {
                    let { action: o, id: s } = t,
                        { actionListId: a, autoStopEventId: u } = o.config,
                        c = Jh(e, u);
                    return (
                        c &&
                            $t({
                                store: e,
                                eventId: u,
                                eventTarget: n,
                                eventStateKey: u + Mh + r.split(Mh)[1],
                                actionListId: (0, Hh.default)(
                                    c,
                                    "action.config.actionListId"
                                ),
                            }),
                        $t({
                            store: e,
                            eventId: s,
                            eventTarget: n,
                            eventStateKey: r,
                            actionListId: a,
                        }),
                        Rn({
                            store: e,
                            eventId: s,
                            eventTarget: n,
                            eventStateKey: r,
                            actionListId: a,
                        }),
                        i
                    );
                }),
                (je = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
                (xn = { handler: je(nt, Fe) }),
                (ey = { ...xn, types: [Zo, $h].join(" ") }),
                (Jo = [
                    {
                        target: window,
                        types: "resize orientationchange",
                        throttle: !0,
                    },
                    {
                        target: document,
                        types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
                        throttle: !0,
                    },
                ]),
                (qh = "mouseover mouseout"),
                (ea = { types: Jo }),
                (mM = { PAGE_START: Qh, PAGE_FINISH: Yh }),
                (Sn = (() => {
                    let e = window.pageXOffset !== void 0,
                        n =
                            document.compatMode === "CSS1Compat"
                                ? document.documentElement
                                : document.body;
                    return () => ({
                        scrollLeft: e ? window.pageXOffset : n.scrollLeft,
                        scrollTop: e ? window.pageYOffset : n.scrollTop,
                        stiffScrollTop: (0, Wh.default)(
                            e ? window.pageYOffset : n.scrollTop,
                            0,
                            n.scrollHeight - window.innerHeight
                        ),
                        scrollWidth: n.scrollWidth,
                        scrollHeight: n.scrollHeight,
                        clientWidth: n.clientWidth,
                        clientHeight: n.clientHeight,
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                    });
                })()),
                (_M = (e, t) =>
                    !(
                        e.left > t.right ||
                        e.right < t.left ||
                        e.top > t.bottom ||
                        e.bottom < t.top
                    )),
                (IM = ({ element: e, nativeEvent: t }) => {
                    let { type: n, target: r, relatedTarget: i } = t,
                        o = e.contains(r);
                    if (n === "mouseover" && o) return !0;
                    let s = e.contains(i);
                    return !!(n === "mouseout" && o && s);
                }),
                (TM = (e) => {
                    let {
                            element: t,
                            event: { config: n },
                        } = e,
                        { clientWidth: r, clientHeight: i } = Sn(),
                        o = n.scrollOffsetValue,
                        u =
                            n.scrollOffsetUnit === "PX"
                                ? o
                                : (i * (o || 0)) / 100;
                    return _M(t.getBoundingClientRect(), {
                        left: 0,
                        top: u,
                        right: r,
                        bottom: i - u,
                    });
                }),
                (ty = (e) => (t, n) => {
                    let { type: r } = t.nativeEvent,
                        i = [Zo, $h].indexOf(r) !== -1 ? r === Zo : n.isActive,
                        o = { ...n, isActive: i };
                    return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
                }),
                (kh = (e) => (t, n) => {
                    let r = { elementHovered: IM(t) };
                    return (
                        ((n
                            ? r.elementHovered !== n.elementHovered
                            : r.elementHovered) &&
                            e(t, r)) ||
                        r
                    );
                }),
                (bM = (e) => (t, n) => {
                    let r = { ...n, elementVisible: TM(t) };
                    return (
                        ((n
                            ? r.elementVisible !== n.elementVisible
                            : r.elementVisible) &&
                            e(t, r)) ||
                        r
                    );
                }),
                (Gh =
                    (e) =>
                    (t, n = {}) => {
                        let {
                                stiffScrollTop: r,
                                scrollHeight: i,
                                innerHeight: o,
                            } = Sn(),
                            {
                                event: { config: s, eventTypeId: a },
                            } = t,
                            { scrollOffsetValue: u, scrollOffsetUnit: c } = s,
                            y = c === "PX",
                            g = i - o,
                            p = Number((r / g).toFixed(2));
                        if (n && n.percentTop === p) return n;
                        let h = (y ? u : (o * (u || 0)) / 100) / g,
                            m,
                            _,
                            b = 0;
                        n &&
                            ((m = p > n.percentTop),
                            (_ = n.scrollingDown !== m),
                            (b = _ ? p : n.anchorTop));
                        let I = a === jh ? p >= b + h : p <= b - h,
                            S = {
                                ...n,
                                percentTop: p,
                                inBounds: I,
                                anchorTop: b,
                                scrollingDown: m,
                            };
                        return (
                            (n &&
                                I &&
                                (_ || S.inBounds !== n.inBounds) &&
                                e(t, S)) ||
                            S
                        );
                    }),
                (AM = (e, t) =>
                    e.left > t.left &&
                    e.left < t.right &&
                    e.top > t.top &&
                    e.top < t.bottom),
                (wM = (e) => (t, n) => {
                    let r = { finished: document.readyState === "complete" };
                    return r.finished && !(n && n.finshed) && e(t), r;
                }),
                (SM = (e) => (t, n) => {
                    let r = { started: !0 };
                    return n || e(t), r;
                }),
                (Xh =
                    (e) =>
                    (t, n = { clickCount: 0 }) => {
                        let r = { clickCount: (n.clickCount % 2) + 1 };
                        return (r.clickCount !== n.clickCount && e(t, r)) || r;
                    }),
                (Mr = (e = !0) => ({
                    ...ey,
                    handler: je(
                        e ? nt : On,
                        ty((t, n) => (n.isActive ? xn.handler(t, n) : n))
                    ),
                })),
                (Fr = (e = !0) => ({
                    ...ey,
                    handler: je(
                        e ? nt : On,
                        ty((t, n) => (n.isActive ? n : xn.handler(t, n)))
                    ),
                })),
                (Vh = {
                    ...ea,
                    handler: bM((e, t) => {
                        let { elementVisible: n } = t,
                            { event: r, store: i } = e,
                            { ixData: o } = i.getState(),
                            { events: s } = o;
                        return !s[r.action.config.autoStopEventId] &&
                            t.triggered
                            ? t
                            : (r.eventTypeId === Kh) === n
                            ? (Fe(e), { ...t, triggered: !0 })
                            : t;
                    }),
                }),
                (Uh = 0.05),
                (ny = {
                    [iM]: Mr(),
                    [oM]: Fr(),
                    [rM]: Mr(),
                    [nM]: Fr(),
                    [cM]: Mr(!1),
                    [uM]: Fr(!1),
                    [aM]: Mr(),
                    [sM]: Fr(),
                    [hM]: { types: "ecommerce-cart-open", handler: je(nt, Fe) },
                    [gM]: {
                        types: "ecommerce-cart-close",
                        handler: je(nt, Fe),
                    },
                    [QD]: {
                        types: "click",
                        handler: je(
                            nt,
                            Xh((e, { clickCount: t }) => {
                                vM(e) ? t === 1 && Fe(e) : Fe(e);
                            })
                        ),
                    },
                    [$D]: {
                        types: "click",
                        handler: je(
                            nt,
                            Xh((e, { clickCount: t }) => {
                                t === 2 && Fe(e);
                            })
                        ),
                    },
                    [ZD]: { ...xn, types: "mousedown" },
                    [JD]: { ...xn, types: "mouseup" },
                    [eM]: {
                        types: qh,
                        handler: je(
                            nt,
                            kh((e, t) => {
                                t.elementHovered && Fe(e);
                            })
                        ),
                    },
                    [tM]: {
                        types: qh,
                        handler: je(
                            nt,
                            kh((e, t) => {
                                t.elementHovered || Fe(e);
                            })
                        ),
                    },
                    [lM]: {
                        types: "mousemove mouseout scroll",
                        handler: (
                            {
                                store: e,
                                element: t,
                                eventConfig: n,
                                nativeEvent: r,
                                eventStateKey: i,
                            },
                            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
                        ) => {
                            let {
                                    basedOn: s,
                                    selectedAxis: a,
                                    continuousParameterGroupId: u,
                                    reverse: c,
                                    restingState: y = 0,
                                } = n,
                                {
                                    clientX: g = o.clientX,
                                    clientY: p = o.clientY,
                                    pageX: h = o.pageX,
                                    pageY: m = o.pageY,
                                } = r,
                                _ = a === "X_AXIS",
                                b = r.type === "mouseout",
                                I = y / 100,
                                S = u,
                                A = !1;
                            switch (s) {
                                case Ze.VIEWPORT: {
                                    I = _
                                        ? Math.min(g, window.innerWidth) /
                                          window.innerWidth
                                        : Math.min(p, window.innerHeight) /
                                          window.innerHeight;
                                    break;
                                }
                                case Ze.PAGE: {
                                    let {
                                        scrollLeft: C,
                                        scrollTop: D,
                                        scrollWidth: P,
                                        scrollHeight: B,
                                    } = Sn();
                                    I = _
                                        ? Math.min(C + h, P) / P
                                        : Math.min(D + m, B) / B;
                                    break;
                                }
                                case Ze.ELEMENT:
                                default: {
                                    S = Fh(i, u);
                                    let C = r.type.indexOf("mouse") === 0;
                                    if (
                                        C &&
                                        nt({ element: t, nativeEvent: r }) !==
                                            !0
                                    )
                                        break;
                                    let D = t.getBoundingClientRect(),
                                        {
                                            left: P,
                                            top: B,
                                            width: H,
                                            height: W,
                                        } = D;
                                    if (!C && !AM({ left: g, top: p }, D))
                                        break;
                                    (A = !0),
                                        (I = _ ? (g - P) / H : (p - B) / W);
                                    break;
                                }
                            }
                            return (
                                b &&
                                    (I > 1 - Uh || I < Uh) &&
                                    (I = Math.round(I)),
                                (s !== Ze.ELEMENT ||
                                    A ||
                                    A !== o.elementHovered) &&
                                    ((I = c ? 1 - I : I), e.dispatch(Yt(S, I))),
                                {
                                    elementHovered: A,
                                    clientX: g,
                                    clientY: p,
                                    pageX: h,
                                    pageY: m,
                                }
                            );
                        },
                    },
                    [yM]: {
                        types: Jo,
                        handler: ({ store: e, eventConfig: t }) => {
                            let { continuousParameterGroupId: n, reverse: r } =
                                    t,
                                {
                                    scrollTop: i,
                                    scrollHeight: o,
                                    clientHeight: s,
                                } = Sn(),
                                a = i / (o - s);
                            (a = r ? 1 - a : a), e.dispatch(Yt(n, a));
                        },
                    },
                    [pM]: {
                        types: Jo,
                        handler: (
                            {
                                element: e,
                                store: t,
                                eventConfig: n,
                                eventStateKey: r,
                            },
                            i = { scrollPercent: 0 }
                        ) => {
                            let {
                                    scrollLeft: o,
                                    scrollTop: s,
                                    scrollWidth: a,
                                    scrollHeight: u,
                                    clientHeight: c,
                                } = Sn(),
                                {
                                    basedOn: y,
                                    selectedAxis: g,
                                    continuousParameterGroupId: p,
                                    startsEntering: h,
                                    startsExiting: m,
                                    addEndOffset: _,
                                    addStartOffset: b,
                                    addOffsetValue: I = 0,
                                    endOffsetValue: S = 0,
                                } = n,
                                A = g === "X_AXIS";
                            if (y === Ze.VIEWPORT) {
                                let C = A ? o / a : s / u;
                                return (
                                    C !== i.scrollPercent &&
                                        t.dispatch(Yt(p, C)),
                                    { scrollPercent: C }
                                );
                            } else {
                                let C = Fh(r, p),
                                    D = e.getBoundingClientRect(),
                                    P = (b ? I : 0) / 100,
                                    B = (_ ? S : 0) / 100;
                                (P = h ? P : 1 - P), (B = m ? B : 1 - B);
                                let H = D.top + Math.min(D.height * P, c),
                                    j = D.top + D.height * B - H,
                                    G = Math.min(c + j, u),
                                    E = Math.min(Math.max(0, c - H), G) / G;
                                return (
                                    E !== i.scrollPercent &&
                                        t.dispatch(Yt(C, E)),
                                    { scrollPercent: E }
                                );
                            }
                        },
                    },
                    [Kh]: Vh,
                    [fM]: Vh,
                    [jh]: {
                        ...ea,
                        handler: Gh((e, t) => {
                            t.scrollingDown && Fe(e);
                        }),
                    },
                    [dM]: {
                        ...ea,
                        handler: Gh((e, t) => {
                            t.scrollingDown || Fe(e);
                        }),
                    },
                    [Yh]: {
                        types: "readystatechange IX2_PAGE_UPDATE",
                        handler: je(On, wM(Fe)),
                    },
                    [Qh]: {
                        types: "readystatechange IX2_PAGE_UPDATE",
                        handler: je(On, SM(Fe)),
                    },
                });
        });
    var _y = {};
    Ne(_y, {
        observeRequests: () => zM,
        startActionGroup: () => Rn,
        startEngine: () => Ur,
        stopActionGroup: () => $t,
        stopAllActionGroups: () => Ey,
        stopEngine: () => Br,
    });
    function zM(e) {
        At({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: YM }),
            At({
                store: e,
                select: ({ ixRequest: t }) => t.playback,
                onChange: QM,
            }),
            At({
                store: e,
                select: ({ ixRequest: t }) => t.stop,
                onChange: $M,
            }),
            At({
                store: e,
                select: ({ ixRequest: t }) => t.clear,
                onChange: ZM,
            });
    }
    function jM(e) {
        At({
            store: e,
            select: ({ ixSession: t }) => t.mediaQueryKey,
            onChange: () => {
                Br(e),
                    py({ store: e, elementApi: Pe }),
                    Ur({ store: e, allowEvents: !0 }),
                    gy();
            },
        });
    }
    function KM(e, t) {
        let n = At({
            store: e,
            select: ({ ixSession: r }) => r.tick,
            onChange: (r) => {
                t(r), n();
            },
        });
    }
    function YM({ rawData: e, defer: t }, n) {
        let r = () => {
            Ur({ store: n, rawData: e, allowEvents: !0 }), gy();
        };
        t ? setTimeout(r, 0) : r();
    }
    function gy() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function QM(e, t) {
        let {
                actionTypeId: n,
                actionListId: r,
                actionItemId: i,
                eventId: o,
                allowEvents: s,
                immediate: a,
                testManual: u,
                verbose: c = !0,
            } = e,
            { rawData: y } = e;
        if (r && i && y && a) {
            let g = y.actionLists[r];
            g && (y = MM({ actionList: g, actionItemId: i, rawData: y }));
        }
        if (
            (Ur({ store: t, rawData: y, allowEvents: s, testManual: u }),
            (r && n === Re.GENERAL_START_ACTION) || na(n))
        ) {
            $t({ store: t, actionListId: r }),
                yy({ store: t, actionListId: r, eventId: o });
            let g = Rn({
                store: t,
                eventId: o,
                actionListId: r,
                immediate: a,
                verbose: c,
            });
            c && g && t.dispatch(Qt({ actionListId: r, isPlaying: !a }));
        }
    }
    function $M({ actionListId: e }, t) {
        e ? $t({ store: t, actionListId: e }) : Ey({ store: t }), Br(t);
    }
    function ZM(e, t) {
        Br(t), py({ store: t, elementApi: Pe });
    }
    function Ur({ store: e, rawData: t, allowEvents: n, testManual: r }) {
        let { ixSession: i } = e.getState();
        t && e.dispatch(No(t)),
            i.active ||
                (e.dispatch(
                    Do({
                        hasBoundaryNodes: !!document.querySelector(kr),
                        reducedMotion:
                            document.body.hasAttribute("data-wf-ix-vacation") &&
                            window.matchMedia("(prefers-reduced-motion)")
                                .matches,
                    })
                ),
                n &&
                    (iF(e),
                    JM(),
                    e.getState().ixSession.hasDefinedMediaQueries && jM(e)),
                e.dispatch(Mo()),
                eF(e, r));
    }
    function JM() {
        let { documentElement: e } = document;
        e.className.indexOf(iy) === -1 && (e.className += ` ${iy}`);
    }
    function eF(e, t) {
        let n = (r) => {
            let { ixSession: i, ixParameters: o } = e.getState();
            i.active &&
                (e.dispatch(Sr(r, o)), t ? KM(e, n) : requestAnimationFrame(n));
        };
        n(window.performance.now());
    }
    function Br(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
            let { eventListeners: n } = t;
            n.forEach(tF), GM(), e.dispatch(Fo());
        }
    }
    function tF({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
    }
    function nF({
        store: e,
        eventStateKey: t,
        eventTarget: n,
        eventId: r,
        eventConfig: i,
        actionListId: o,
        parameterGroup: s,
        smoothing: a,
        restingValue: u,
    }) {
        let { ixData: c, ixSession: y } = e.getState(),
            { events: g } = c,
            p = g[r],
            { eventTypeId: h } = p,
            m = {},
            _ = {},
            b = [],
            { continuousActionGroups: I } = s,
            { id: S } = s;
        FM(h, i) && (S = qM(t, S));
        let A = y.hasBoundaryNodes && n ? wn(n, kr) : null;
        I.forEach((C) => {
            let { keyframe: D, actionItems: P } = C;
            P.forEach((B) => {
                let { actionTypeId: H } = B,
                    { target: W } = B.config;
                if (!W) return;
                let j = W.boundaryMode ? A : null,
                    G = XM(W) + ra + H;
                if (((_[G] = rF(_[G], D, B)), !m[G])) {
                    m[G] = !0;
                    let { config: O } = B;
                    Gr({
                        config: O,
                        event: p,
                        eventTarget: n,
                        elementRoot: j,
                        elementApi: Pe,
                    }).forEach((E) => {
                        b.push({ element: E, key: G });
                    });
                }
            });
        }),
            b.forEach(({ element: C, key: D }) => {
                let P = _[D],
                    B = (0, st.default)(P, "[0].actionItems[0]", {}),
                    { actionTypeId: H } = B,
                    j = (
                        H === Re.PLUGIN_RIVE
                            ? (B.config?.target?.selectorGuids || []).length ===
                              0
                            : Vr(H)
                    )
                        ? oa(H)(C, B)
                        : null,
                    G = ia({ element: C, actionItem: B, elementApi: Pe }, j);
                aa({
                    store: e,
                    element: C,
                    eventId: r,
                    actionListId: o,
                    actionItem: B,
                    destination: G,
                    continuous: !0,
                    parameterId: S,
                    actionGroups: P,
                    smoothing: a,
                    restingValue: u,
                    pluginInstance: j,
                });
            });
    }
    function rF(e = [], t, n) {
        let r = [...e],
            i;
        return (
            r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
            i == null &&
                ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
            r[i].actionItems.push(n),
            r
        );
    }
    function iF(e) {
        let { ixData: t } = e.getState(),
            { eventTypeMap: n } = t;
        hy(e),
            (0, Zt.default)(n, (i, o) => {
                let s = ny[o];
                if (!s) {
                    console.warn(`IX2 event type not configured: ${o}`);
                    return;
                }
                lF({ logic: s, store: e, events: i });
            });
        let { ixSession: r } = e.getState();
        r.eventListeners.length && aF(e);
    }
    function aF(e) {
        let t = () => {
            hy(e);
        };
        oF.forEach((n) => {
            window.addEventListener(n, t), e.dispatch(wr(window, [n, t]));
        }),
            t();
    }
    function hy(e) {
        let { ixSession: t, ixData: n } = e.getState(),
            r = window.innerWidth;
        if (r !== t.viewportWidth) {
            let { mediaQueries: i } = n;
            e.dispatch(Vo({ width: r, mediaQueries: i }));
        }
    }
    function lF({ logic: e, store: t, events: n }) {
        fF(n);
        let { types: r, handler: i } = e,
            { ixData: o } = t.getState(),
            { actionLists: s } = o,
            a = sF(n, cF);
        if (!(0, sy.default)(a)) return;
        (0, Zt.default)(a, (g, p) => {
            let h = n[p],
                { action: m, id: _, mediaQueries: b = o.mediaQueryKeys } = h,
                { actionListId: I } = m.config;
            VM(b, o.mediaQueryKeys) || t.dispatch(Uo()),
                m.actionTypeId === Re.GENERAL_CONTINUOUS_ACTION &&
                    (Array.isArray(h.config) ? h.config : [h.config]).forEach(
                        (A) => {
                            let { continuousParameterGroupId: C } = A,
                                D = (0, st.default)(
                                    s,
                                    `${I}.continuousParameterGroups`,
                                    []
                                ),
                                P = (0, ay.default)(D, ({ id: W }) => W === C),
                                B = (A.smoothing || 0) / 100,
                                H = (A.restingState || 0) / 100;
                            P &&
                                g.forEach((W, j) => {
                                    let G = _ + ra + j;
                                    nF({
                                        store: t,
                                        eventStateKey: G,
                                        eventTarget: W,
                                        eventId: _,
                                        eventConfig: A,
                                        actionListId: I,
                                        parameterGroup: P,
                                        smoothing: B,
                                        restingValue: H,
                                    });
                                });
                        }
                    ),
                (m.actionTypeId === Re.GENERAL_START_ACTION ||
                    na(m.actionTypeId)) &&
                    yy({ store: t, actionListId: I, eventId: _ });
        });
        let u = (g) => {
                let { ixSession: p } = t.getState();
                uF(a, (h, m, _) => {
                    let b = n[m],
                        I = p.eventState[_],
                        { action: S, mediaQueries: A = o.mediaQueryKeys } = b;
                    if (!Xr(A, p.mediaQueryKey)) return;
                    let C = (D = {}) => {
                        let P = i(
                            {
                                store: t,
                                element: h,
                                event: b,
                                eventConfig: D,
                                nativeEvent: g,
                                eventStateKey: _,
                            },
                            I
                        );
                        UM(P, I) || t.dispatch(qo(_, P));
                    };
                    S.actionTypeId === Re.GENERAL_CONTINUOUS_ACTION
                        ? (Array.isArray(b.config)
                              ? b.config
                              : [b.config]
                          ).forEach(C)
                        : C();
                });
            },
            c = (0, fy.default)(u, WM),
            y = ({ target: g = document, types: p, throttle: h }) => {
                p.split(" ")
                    .filter(Boolean)
                    .forEach((m) => {
                        let _ = h ? c : u;
                        g.addEventListener(m, _), t.dispatch(wr(g, [m, _]));
                    });
            };
        Array.isArray(r) ? r.forEach(y) : typeof r == "string" && y(e);
    }
    function fF(e) {
        if (!HM) return;
        let t = {},
            n = "";
        for (let r in e) {
            let { eventTypeId: i, target: o } = e[r],
                s = Ho(o);
            t[s] ||
                ((i === We.MOUSE_CLICK || i === We.MOUSE_SECOND_CLICK) &&
                    ((t[s] = !0),
                    (n +=
                        s + "{cursor: pointer;touch-action: manipulation;}")));
        }
        if (n) {
            let r = document.createElement("style");
            (r.textContent = n), document.body.appendChild(r);
        }
    }
    function yy({ store: e, actionListId: t, eventId: n }) {
        let { ixData: r, ixSession: i } = e.getState(),
            { actionLists: o, events: s } = r,
            a = s[n],
            u = o[t];
        if (u && u.useFirstGroupAsInitialState) {
            let c = (0, st.default)(u, "actionItemGroups[0].actionItems", []),
                y = (0, st.default)(a, "mediaQueries", r.mediaQueryKeys);
            if (!Xr(y, i.mediaQueryKey)) return;
            c.forEach((g) => {
                let { config: p, actionTypeId: h } = g,
                    m =
                        p?.target?.useEventTarget === !0 &&
                        p?.target?.objectId == null
                            ? { target: a.target, targets: a.targets }
                            : p,
                    _ = Gr({ config: m, event: a, elementApi: Pe }),
                    b = Vr(h);
                _.forEach((I) => {
                    let S = b ? oa(h)(I, g) : null;
                    aa({
                        destination: ia(
                            { element: I, actionItem: g, elementApi: Pe },
                            S
                        ),
                        immediate: !0,
                        store: e,
                        element: I,
                        eventId: n,
                        actionItem: g,
                        actionListId: t,
                        pluginInstance: S,
                    });
                });
            });
        }
    }
    function Ey({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, Zt.default)(t, (n) => {
            if (!n.continuous) {
                let { actionListId: r, verbose: i } = n;
                sa(n, e),
                    i && e.dispatch(Qt({ actionListId: r, isPlaying: !1 }));
            }
        });
    }
    function $t({
        store: e,
        eventId: t,
        eventTarget: n,
        eventStateKey: r,
        actionListId: i,
    }) {
        let { ixInstances: o, ixSession: s } = e.getState(),
            a = s.hasBoundaryNodes && n ? wn(n, kr) : null;
        (0, Zt.default)(o, (u) => {
            let c = (0, st.default)(u, "actionItem.config.target.boundaryMode"),
                y = r ? u.eventStateKey === r : !0;
            if (u.actionListId === i && u.eventId === t && y) {
                if (a && c && !Wo(a, u.element)) return;
                sa(u, e),
                    u.verbose &&
                        e.dispatch(Qt({ actionListId: i, isPlaying: !1 }));
            }
        });
    }
    function Rn({
        store: e,
        eventId: t,
        eventTarget: n,
        eventStateKey: r,
        actionListId: i,
        groupIndex: o = 0,
        immediate: s,
        verbose: a,
    }) {
        let { ixData: u, ixSession: c } = e.getState(),
            { events: y } = u,
            g = y[t] || {},
            { mediaQueries: p = u.mediaQueryKeys } = g,
            h = (0, st.default)(u, `actionLists.${i}`, {}),
            { actionItemGroups: m, useFirstGroupAsInitialState: _ } = h;
        if (!m || !m.length) return !1;
        o >= m.length && (0, st.default)(g, "config.loop") && (o = 0),
            o === 0 && _ && o++;
        let I =
                (o === 0 || (o === 1 && _)) && na(g.action?.actionTypeId)
                    ? g.config.delay
                    : void 0,
            S = (0, st.default)(m, [o, "actionItems"], []);
        if (!S.length || !Xr(p, c.mediaQueryKey)) return !1;
        let A = c.hasBoundaryNodes && n ? wn(n, kr) : null,
            C = LM(S),
            D = !1;
        return (
            S.forEach((P, B) => {
                let { config: H, actionTypeId: W } = P,
                    j = Vr(W),
                    { target: G } = H;
                if (!G) return;
                let O = G.boundaryMode ? A : null;
                Gr({
                    config: H,
                    event: g,
                    eventTarget: n,
                    elementRoot: O,
                    elementApi: Pe,
                }).forEach((R, M) => {
                    let X = j ? oa(W)(R, P) : null,
                        Z = j ? BM(W)(R, P) : null;
                    D = !0;
                    let Q = C === B && M === 0,
                        se = NM({ element: R, actionItem: P }),
                        he = ia(
                            { element: R, actionItem: P, elementApi: Pe },
                            X
                        );
                    aa({
                        store: e,
                        element: R,
                        actionItem: P,
                        eventId: t,
                        eventTarget: n,
                        eventStateKey: r,
                        actionListId: i,
                        groupIndex: o,
                        isCarrier: Q,
                        computedStyle: se,
                        destination: he,
                        immediate: s,
                        verbose: a,
                        pluginInstance: X,
                        pluginDuration: Z,
                        instanceDelay: I,
                    });
                });
            }),
            D
        );
    }
    function aa(e) {
        let { store: t, computedStyle: n, ...r } = e,
            {
                element: i,
                actionItem: o,
                immediate: s,
                pluginInstance: a,
                continuous: u,
                restingValue: c,
                eventId: y,
            } = r,
            g = !u,
            p = CM(),
            { ixElements: h, ixSession: m, ixData: _ } = t.getState(),
            b = RM(h, i),
            { refState: I } = h[b] || {},
            S = zo(i),
            A = m.reducedMotion && mi[o.actionTypeId],
            C;
        if (A && u)
            switch (_.events[y]?.eventTypeId) {
                case We.MOUSE_MOVE:
                case We.MOUSE_MOVE_IN_VIEWPORT:
                    C = c;
                    break;
                default:
                    C = 0.5;
                    break;
            }
        let D = DM(i, I, n, o, Pe, a);
        if (
            (t.dispatch(
                ko({
                    instanceId: p,
                    elementId: b,
                    origin: D,
                    refType: S,
                    skipMotion: A,
                    skipToValue: C,
                    ...r,
                })
            ),
            vy(document.body, "ix2-animation-started", p),
            s)
        ) {
            dF(t, p);
            return;
        }
        At({ store: t, select: ({ ixInstances: P }) => P[p], onChange: my }),
            g && t.dispatch(Or(p, m.tick));
    }
    function sa(e, t) {
        vy(document.body, "ix2-animation-stopping", {
            instanceId: e.id,
            state: t.getState(),
        });
        let { elementId: n, actionItem: r } = e,
            { ixElements: i } = t.getState(),
            { ref: o, refType: s } = i[n] || {};
        s === dy && kM(o, r, Pe), t.dispatch(Go(e.id));
    }
    function vy(e, t, n) {
        let r = document.createEvent("CustomEvent");
        r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
    }
    function dF(e, t) {
        let { ixParameters: n } = e.getState();
        e.dispatch(Or(t, 0)), e.dispatch(Sr(performance.now(), n));
        let { ixInstances: r } = e.getState();
        my(r[t], e);
    }
    function my(e, t) {
        let {
                active: n,
                continuous: r,
                complete: i,
                elementId: o,
                actionItem: s,
                actionTypeId: a,
                renderType: u,
                current: c,
                groupIndex: y,
                eventId: g,
                eventTarget: p,
                eventStateKey: h,
                actionListId: m,
                isCarrier: _,
                styleProp: b,
                verbose: I,
                pluginInstance: S,
            } = e,
            { ixData: A, ixSession: C } = t.getState(),
            { events: D } = A,
            P = D && D[g] ? D[g] : {},
            { mediaQueries: B = A.mediaQueryKeys } = P;
        if (Xr(B, C.mediaQueryKey) && (r || n || i)) {
            if (c || (u === xM && i)) {
                t.dispatch(Xo(o, a, c, s));
                let { ixElements: H } = t.getState(),
                    { ref: W, refType: j, refState: G } = H[o] || {},
                    O = G && G[a];
                (j === dy || Vr(a)) && PM(W, G, O, g, s, b, Pe, u, S);
            }
            if (i) {
                if (_) {
                    let H = Rn({
                        store: t,
                        eventId: g,
                        eventTarget: p,
                        eventStateKey: h,
                        actionListId: m,
                        groupIndex: y + 1,
                        verbose: I,
                    });
                    I &&
                        !H &&
                        t.dispatch(Qt({ actionListId: m, isPlaying: !1 }));
                }
                sa(e, t);
            }
        }
    }
    var ay,
        st,
        sy,
        uy,
        cy,
        ly,
        Zt,
        fy,
        qr,
        OM,
        na,
        ra,
        kr,
        dy,
        xM,
        iy,
        Gr,
        RM,
        ia,
        At,
        CM,
        PM,
        py,
        LM,
        NM,
        DM,
        MM,
        FM,
        qM,
        Xr,
        kM,
        GM,
        XM,
        VM,
        UM,
        Vr,
        oa,
        BM,
        oy,
        HM,
        WM,
        oF,
        sF,
        uF,
        cF,
        ta = ye(() => {
            "use strict";
            (ay = le(Ki())),
                (st = le(ar())),
                (sy = le(Np())),
                (uy = le(og())),
                (cy = le(sg())),
                (ly = le(cg())),
                (Zt = le(hg())),
                (fy = le(Tg()));
            De();
            qr = le(bt());
            xr();
            xg();
            ry();
            (OM = Object.keys(kn)),
                (na = (e) => OM.includes(e)),
                ({
                    COLON_DELIMITER: ra,
                    BOUNDARY_SELECTOR: kr,
                    HTML_ELEMENT: dy,
                    RENDER_GENERAL: xM,
                    W_MOD_IX: iy,
                } = we),
                ({
                    getAffectedElements: Gr,
                    getElementId: RM,
                    getDestinationValues: ia,
                    observeStore: At,
                    getInstanceId: CM,
                    renderHTMLElement: PM,
                    clearAllStyles: py,
                    getMaxDurationItemIndex: LM,
                    getComputedStyle: NM,
                    getInstanceOrigin: DM,
                    reduceListToGroup: MM,
                    shouldNamespaceEventParameter: FM,
                    getNamespacedParameterId: qM,
                    shouldAllowMediaQuery: Xr,
                    cleanupHTMLElement: kM,
                    clearObjectCache: GM,
                    stringifyTarget: XM,
                    mediaQueriesEqual: VM,
                    shallowEqual: UM,
                } = qr.IX2VanillaUtils),
                ({
                    isPluginType: Vr,
                    createPluginInstance: oa,
                    getPluginDuration: BM,
                } = qr.IX2VanillaPlugins),
                (oy = navigator.userAgent),
                (HM = oy.match(/iPad/i) || oy.match(/iPhone/)),
                (WM = 12);
            oF = ["resize", "orientationchange"];
            (sF = (e, t) => (0, uy.default)((0, ly.default)(e, t), cy.default)),
                (uF = (e, t) => {
                    (0, Zt.default)(e, (n, r) => {
                        n.forEach((i, o) => {
                            let s = r + ra + o;
                            t(i, r, s);
                        });
                    });
                }),
                (cF = (e) => {
                    let t = { target: e.target, targets: e.targets };
                    return Gr({ config: t, elementApi: Pe });
                });
        });
    var by = f((ca) => {
        "use strict";
        Object.defineProperty(ca, "__esModule", { value: !0 });
        function pF(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
        pF(ca, {
            actions: function () {
                return yF;
            },
            destroy: function () {
                return Ty;
            },
            init: function () {
                return _F;
            },
            setEnv: function () {
                return mF;
            },
            store: function () {
                return Hr;
            },
        });
        var gF = yi(),
            hF = EF((gp(), Ye(pp))),
            ua = (ta(), Ye(_y)),
            yF = vF((xr(), Ye(Ag)));
        function EF(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function Iy(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap(),
                n = new WeakMap();
            return (Iy = function (r) {
                return r ? n : t;
            })(e);
        }
        function vF(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || (typeof e != "object" && typeof e != "function"))
                return { default: e };
            var n = Iy(t);
            if (n && n.has(e)) return n.get(e);
            var r = { __proto__: null },
                i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if (
                    o !== "default" &&
                    Object.prototype.hasOwnProperty.call(e, o)
                ) {
                    var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    s && (s.get || s.set)
                        ? Object.defineProperty(r, o, s)
                        : (r[o] = e[o]);
                }
            return (r.default = e), n && n.set(e, r), r;
        }
        var Hr = (0, gF.createStore)(hF.default);
        function mF(e) {
            e() && (0, ua.observeRequests)(Hr);
        }
        function _F(e) {
            Ty(),
                (0, ua.startEngine)({ store: Hr, rawData: e, allowEvents: !0 });
        }
        function Ty() {
            (0, ua.stopEngine)(Hr);
        }
    });
    var Oy = f((OG, Sy) => {
        "use strict";
        var Ay = ke(),
            wy = by();
        wy.setEnv(Ay.env);
        Ay.define(
            "ix2",
            (Sy.exports = function () {
                return wy;
            })
        );
    });
    var Ry = f((xG, xy) => {
        "use strict";
        var Jt = ke();
        Jt.define(
            "links",
            (xy.exports = function (e, t) {
                var n = {},
                    r = e(window),
                    i,
                    o = Jt.env(),
                    s = window.location,
                    a = document.createElement("a"),
                    u = "w--current",
                    c = /index\.(html|php)$/,
                    y = /\/$/,
                    g,
                    p;
                n.ready = n.design = n.preview = h;
                function h() {
                    (i = o && Jt.env("design")),
                        (p = Jt.env("slug") || s.pathname || ""),
                        Jt.scroll.off(_),
                        (g = []);
                    for (var I = document.links, S = 0; S < I.length; ++S)
                        m(I[S]);
                    g.length && (Jt.scroll.on(_), _());
                }
                function m(I) {
                    if (!I.getAttribute("hreflang")) {
                        var S =
                            (i && I.getAttribute("href-disabled")) ||
                            I.getAttribute("href");
                        if (((a.href = S), !(S.indexOf(":") >= 0))) {
                            var A = e(I);
                            if (
                                a.hash.length > 1 &&
                                a.host + a.pathname === s.host + s.pathname
                            ) {
                                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                                var C = e(a.hash);
                                C.length &&
                                    g.push({ link: A, sec: C, active: !1 });
                                return;
                            }
                            if (!(S === "#" || S === "")) {
                                var D =
                                    a.href === s.href ||
                                    S === p ||
                                    (c.test(S) && y.test(p));
                                b(A, u, D);
                            }
                        }
                    }
                }
                function _() {
                    var I = r.scrollTop(),
                        S = r.height();
                    t.each(g, function (A) {
                        if (!A.link.attr("hreflang")) {
                            var C = A.link,
                                D = A.sec,
                                P = D.offset().top,
                                B = D.outerHeight(),
                                H = S * 0.5,
                                W =
                                    D.is(":visible") &&
                                    P + B - H >= I &&
                                    P + H <= I + S;
                            A.active !== W && ((A.active = W), b(C, u, W));
                        }
                    });
                }
                function b(I, S, A) {
                    var C = I.hasClass(S);
                    (A && C) ||
                        (!A && !C) ||
                        (A ? I.addClass(S) : I.removeClass(S));
                }
                return n;
            })
        );
    });
    var Py = f((RG, Cy) => {
        "use strict";
        var Wr = ke();
        Wr.define(
            "scroll",
            (Cy.exports = function (e) {
                var t = {
                        WF_CLICK_EMPTY: "click.wf-empty-link",
                        WF_CLICK_SCROLL: "click.wf-scroll",
                    },
                    n = window.location,
                    r = m() ? null : window.history,
                    i = e(window),
                    o = e(document),
                    s = e(document.body),
                    a =
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        function (O) {
                            window.setTimeout(O, 15);
                        },
                    u = Wr.env("editor") ? ".w-editor-body" : "body",
                    c =
                        "header, " +
                        u +
                        " > .header, " +
                        u +
                        " > .w-nav:not([data-no-scroll])",
                    y = 'a[href="#"]',
                    g = 'a[href*="#"]:not(.w-tab-link):not(' + y + ")",
                    p =
                        '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
                    h = document.createElement("style");
                h.appendChild(document.createTextNode(p));
                function m() {
                    try {
                        return !!window.frameElement;
                    } catch {
                        return !0;
                    }
                }
                var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
                function b(O) {
                    return (
                        _.test(O.hash) &&
                        O.host + O.pathname === n.host + n.pathname
                    );
                }
                let I =
                    typeof window.matchMedia == "function" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)");
                function S() {
                    return (
                        document.body.getAttribute("data-wf-scroll-motion") ===
                            "none" || I.matches
                    );
                }
                function A(O, E) {
                    var R;
                    switch (E) {
                        case "add":
                            (R = O.attr("tabindex")),
                                R
                                    ? O.attr("data-wf-tabindex-swap", R)
                                    : O.attr("tabindex", "-1");
                            break;
                        case "remove":
                            (R = O.attr("data-wf-tabindex-swap")),
                                R
                                    ? (O.attr("tabindex", R),
                                      O.removeAttr("data-wf-tabindex-swap"))
                                    : O.removeAttr("tabindex");
                            break;
                    }
                    O.toggleClass("wf-force-outline-none", E === "add");
                }
                function C(O) {
                    var E = O.currentTarget;
                    if (
                        !(
                            Wr.env("design") ||
                            (window.$.mobile &&
                                /(?:^|\s)ui-link(?:$|\s)/.test(E.className))
                        )
                    ) {
                        var R = b(E) ? E.hash : "";
                        if (R !== "") {
                            var M = e(R);
                            M.length &&
                                (O && (O.preventDefault(), O.stopPropagation()),
                                D(R, O),
                                window.setTimeout(
                                    function () {
                                        P(M, function () {
                                            A(M, "add"),
                                                M.get(0).focus({
                                                    preventScroll: !0,
                                                }),
                                                A(M, "remove");
                                        });
                                    },
                                    O ? 0 : 300
                                ));
                        }
                    }
                }
                function D(O) {
                    if (
                        n.hash !== O &&
                        r &&
                        r.pushState &&
                        !(Wr.env.chrome && n.protocol === "file:")
                    ) {
                        var E = r.state && r.state.hash;
                        E !== O && r.pushState({ hash: O }, "", O);
                    }
                }
                function P(O, E) {
                    var R = i.scrollTop(),
                        M = B(O);
                    if (R !== M) {
                        var X = H(O, R, M),
                            Z = Date.now(),
                            Q = function () {
                                var se = Date.now() - Z;
                                window.scroll(0, W(R, M, se, X)),
                                    se <= X
                                        ? a(Q)
                                        : typeof E == "function" && E();
                            };
                        a(Q);
                    }
                }
                function B(O) {
                    var E = e(c),
                        R = E.css("position") === "fixed" ? E.outerHeight() : 0,
                        M = O.offset().top - R;
                    if (O.data("scroll") === "mid") {
                        var X = i.height() - R,
                            Z = O.outerHeight();
                        Z < X && (M -= Math.round((X - Z) / 2));
                    }
                    return M;
                }
                function H(O, E, R) {
                    if (S()) return 0;
                    var M = 1;
                    return (
                        s.add(O).each(function (X, Z) {
                            var Q = parseFloat(
                                Z.getAttribute("data-scroll-time")
                            );
                            !isNaN(Q) && Q >= 0 && (M = Q);
                        }),
                        (472.143 * Math.log(Math.abs(E - R) + 125) - 2e3) * M
                    );
                }
                function W(O, E, R, M) {
                    return R > M ? E : O + (E - O) * j(R / M);
                }
                function j(O) {
                    return O < 0.5
                        ? 4 * O * O * O
                        : (O - 1) * (2 * O - 2) * (2 * O - 2) + 1;
                }
                function G() {
                    var { WF_CLICK_EMPTY: O, WF_CLICK_SCROLL: E } = t;
                    o.on(E, g, C),
                        o.on(O, y, function (R) {
                            R.preventDefault();
                        }),
                        document.head.insertBefore(h, document.head.firstChild);
                }
                return { ready: G };
            })
        );
    });
    var Ny = f((CG, Ly) => {
        "use strict";
        var IF = ke();
        IF.define(
            "touch",
            (Ly.exports = function (e) {
                var t = {},
                    n = window.getSelection;
                (e.event.special.tap = {
                    bindType: "click",
                    delegateType: "click",
                }),
                    (t.init = function (o) {
                        return (
                            (o = typeof o == "string" ? e(o).get(0) : o),
                            o ? new r(o) : null
                        );
                    });
                function r(o) {
                    var s = !1,
                        a = !1,
                        u = Math.min(Math.round(window.innerWidth * 0.04), 40),
                        c,
                        y;
                    o.addEventListener("touchstart", g, !1),
                        o.addEventListener("touchmove", p, !1),
                        o.addEventListener("touchend", h, !1),
                        o.addEventListener("touchcancel", m, !1),
                        o.addEventListener("mousedown", g, !1),
                        o.addEventListener("mousemove", p, !1),
                        o.addEventListener("mouseup", h, !1),
                        o.addEventListener("mouseout", m, !1);
                    function g(b) {
                        var I = b.touches;
                        (I && I.length > 1) ||
                            ((s = !0),
                            I
                                ? ((a = !0), (c = I[0].clientX))
                                : (c = b.clientX),
                            (y = c));
                    }
                    function p(b) {
                        if (s) {
                            if (a && b.type === "mousemove") {
                                b.preventDefault(), b.stopPropagation();
                                return;
                            }
                            var I = b.touches,
                                S = I ? I[0].clientX : b.clientX,
                                A = S - y;
                            (y = S),
                                Math.abs(A) > u &&
                                    n &&
                                    String(n()) === "" &&
                                    (i("swipe", b, {
                                        direction: A > 0 ? "right" : "left",
                                    }),
                                    m());
                        }
                    }
                    function h(b) {
                        if (s && ((s = !1), a && b.type === "mouseup")) {
                            b.preventDefault(), b.stopPropagation(), (a = !1);
                            return;
                        }
                    }
                    function m() {
                        s = !1;
                    }
                    function _() {
                        o.removeEventListener("touchstart", g, !1),
                            o.removeEventListener("touchmove", p, !1),
                            o.removeEventListener("touchend", h, !1),
                            o.removeEventListener("touchcancel", m, !1),
                            o.removeEventListener("mousedown", g, !1),
                            o.removeEventListener("mousemove", p, !1),
                            o.removeEventListener("mouseup", h, !1),
                            o.removeEventListener("mouseout", m, !1),
                            (o = null);
                    }
                    this.destroy = _;
                }
                function i(o, s, a) {
                    var u = e.Event(o, { originalEvent: s });
                    e(s.target).trigger(u, a);
                }
                return (t.instance = t.init(document)), t;
            })
        );
    });
    var Dy = f((la) => {
        "use strict";
        Object.defineProperty(la, "__esModule", { value: !0 });
        Object.defineProperty(la, "default", {
            enumerable: !0,
            get: function () {
                return TF;
            },
        });
        function TF(e, t, n, r, i, o, s, a, u, c, y, g, p) {
            return function (h) {
                e(h);
                var m = h.form,
                    _ = {
                        name:
                            m.attr("data-name") ||
                            m.attr("name") ||
                            "Untitled Form",
                        pageId: m.attr("data-wf-page-id") || "",
                        elementId: m.attr("data-wf-element-id") || "",
                        source: t.href,
                        test: n.env(),
                        fields: {},
                        fileUploads: {},
                        dolphin:
                            /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
                                m.html()
                            ),
                        trackingCookies: r(),
                    };
                let b = m.attr("data-wf-flow");
                b && (_.wfFlow = b), i(h);
                var I = o(m, _.fields);
                if (I) return s(I);
                if (((_.fileUploads = a(m)), u(h), !c)) {
                    y(h);
                    return;
                }
                g.ajax({
                    url: p,
                    type: "POST",
                    data: _,
                    dataType: "json",
                    crossDomain: !0,
                })
                    .done(function (S) {
                        S && S.code === 200 && (h.success = !0), y(h);
                    })
                    .fail(function () {
                        y(h);
                    });
            };
        }
    });
    var Fy = f((LG, My) => {
        "use strict";
        var zr = ke(),
            bF = (e, t, n, r) => {
                let i = document.createElement("div");
                t.appendChild(i),
                    turnstile.render(i, {
                        sitekey: e,
                        callback: function (o) {
                            n(o);
                        },
                        "error-callback": function () {
                            r();
                        },
                    });
            };
        zr.define(
            "forms",
            (My.exports = function (e, t) {
                let n = "TURNSTILE_LOADED";
                var r = {},
                    i = e(document),
                    o,
                    s = window.location,
                    a = window.XDomainRequest && !window.atob,
                    u = ".w-form",
                    c,
                    y = /e(-)?mail/i,
                    g = /^\S+@\S+$/,
                    p = window.alert,
                    h = zr.env(),
                    m,
                    _,
                    b;
                let I = i
                        .find("[data-turnstile-sitekey]")
                        .data("turnstile-sitekey"),
                    S;
                var A = /list-manage[1-9]?.com/i,
                    C = t.debounce(function () {
                        p(
                            "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
                        );
                    }, 100);
                r.ready =
                    r.design =
                    r.preview =
                        function () {
                            P(), D(), !h && !m && H();
                        };
                function D() {
                    (c = e("html").attr("data-wf-site")),
                        (_ = "https://webflow.com/api/v1/form/" + c),
                        a &&
                            _.indexOf("https://webflow.com") >= 0 &&
                            (_ = _.replace(
                                "https://webflow.com",
                                "https://formdata.webflow.com"
                            )),
                        (b = `${_}/signFile`),
                        (o = e(u + " form")),
                        o.length && o.each(B);
                }
                function P() {
                    I &&
                        ((S = document.createElement("script")),
                        (S.src =
                            "https://challenges.cloudflare.com/turnstile/v0/api.js"),
                        document.head.appendChild(S),
                        (S.onload = () => {
                            i.trigger(n);
                        }));
                }
                function B(x, q) {
                    var z = e(q),
                        V = e.data(q, u);
                    V || (V = e.data(q, u, { form: z })), W(V);
                    var re = z.closest("div.w-form");
                    (V.done = re.find("> .w-form-done")),
                        (V.fail = re.find("> .w-form-fail")),
                        (V.fileUploads = re.find(".w-file-upload")),
                        V.fileUploads.each(function (Y) {
                            he(Y, V);
                        }),
                        I &&
                            ((V.wait = !1),
                            j(V),
                            i.on(
                                typeof turnstile < "u" ? "ready" : n,
                                function () {
                                    bF(
                                        I,
                                        q,
                                        (Y) => {
                                            (V.turnstileToken = Y), W(V);
                                        },
                                        () => {
                                            j(V);
                                        }
                                    );
                                }
                            ));
                    var oe =
                        V.form.attr("aria-label") ||
                        V.form.attr("data-name") ||
                        "Form";
                    V.done.attr("aria-label") || V.form.attr("aria-label", oe),
                        V.done.attr("tabindex", "-1"),
                        V.done.attr("role", "region"),
                        V.done.attr("aria-label") ||
                            V.done.attr("aria-label", oe + " success"),
                        V.fail.attr("tabindex", "-1"),
                        V.fail.attr("role", "region"),
                        V.fail.attr("aria-label") ||
                            V.fail.attr("aria-label", oe + " failure");
                    var ue = (V.action = z.attr("action"));
                    if (
                        ((V.handler = null),
                        (V.redirect = z.attr("data-redirect")),
                        A.test(ue))
                    ) {
                        V.handler = Z;
                        return;
                    }
                    if (!ue) {
                        if (c) {
                            V.handler = (() => {
                                let Y = Dy().default;
                                return Y(
                                    W,
                                    s,
                                    zr,
                                    R,
                                    se,
                                    G,
                                    p,
                                    O,
                                    j,
                                    c,
                                    Q,
                                    e,
                                    _
                                );
                            })();
                            return;
                        }
                        C();
                    }
                }
                function H() {
                    (m = !0),
                        i.on("submit", u + " form", function (Y) {
                            var d = e.data(this, u);
                            d.handler && ((d.evt = Y), d.handler(d));
                        });
                    let x = ".w-checkbox-input",
                        q = ".w-radio-input",
                        z = "w--redirected-checked",
                        V = "w--redirected-focus",
                        re = "w--redirected-focus-visible",
                        oe = ":focus-visible, [data-wf-focus-visible]",
                        ue = [
                            ["checkbox", x],
                            ["radio", q],
                        ];
                    i.on(
                        "change",
                        u + ' form input[type="checkbox"]:not(' + x + ")",
                        (Y) => {
                            e(Y.target).siblings(x).toggleClass(z);
                        }
                    ),
                        i.on("change", u + ' form input[type="radio"]', (Y) => {
                            e(`input[name="${Y.target.name}"]:not(${x})`).map(
                                (F, K) => e(K).siblings(q).removeClass(z)
                            );
                            let d = e(Y.target);
                            d.hasClass("w-radio-input") ||
                                d.siblings(q).addClass(z);
                        }),
                        ue.forEach(([Y, d]) => {
                            i.on(
                                "focus",
                                u + ` form input[type="${Y}"]:not(` + d + ")",
                                (F) => {
                                    e(F.target).siblings(d).addClass(V),
                                        e(F.target)
                                            .filter(oe)
                                            .siblings(d)
                                            .addClass(re);
                                }
                            ),
                                i.on(
                                    "blur",
                                    u +
                                        ` form input[type="${Y}"]:not(` +
                                        d +
                                        ")",
                                    (F) => {
                                        e(F.target)
                                            .siblings(d)
                                            .removeClass(`${V} ${re}`);
                                    }
                                );
                        });
                }
                function W(x) {
                    var q = (x.btn = x.form.find(':input[type="submit"]'));
                    (x.wait = x.btn.attr("data-wait") || null),
                        (x.success = !1),
                        q.prop("disabled", !!(I && !x.turnstileToken)),
                        x.label && q.val(x.label);
                }
                function j(x) {
                    var q = x.btn,
                        z = x.wait;
                    q.prop("disabled", !0),
                        z && ((x.label = q.val()), q.val(z));
                }
                function G(x, q) {
                    var z = null;
                    return (
                        (q = q || {}),
                        x
                            .find(
                                ':input:not([type="submit"]):not([type="file"])'
                            )
                            .each(function (V, re) {
                                var oe = e(re),
                                    ue = oe.attr("type"),
                                    Y =
                                        oe.attr("data-name") ||
                                        oe.attr("name") ||
                                        "Field " + (V + 1);
                                Y = encodeURIComponent(Y);
                                var d = oe.val();
                                if (ue === "checkbox") d = oe.is(":checked");
                                else if (ue === "radio") {
                                    if (
                                        q[Y] === null ||
                                        typeof q[Y] == "string"
                                    )
                                        return;
                                    d =
                                        x
                                            .find(
                                                'input[name="' +
                                                    oe.attr("name") +
                                                    '"]:checked'
                                            )
                                            .val() || null;
                                }
                                typeof d == "string" && (d = e.trim(d)),
                                    (q[Y] = d),
                                    (z = z || M(oe, ue, Y, d));
                            }),
                        z
                    );
                }
                function O(x) {
                    var q = {};
                    return (
                        x.find(':input[type="file"]').each(function (z, V) {
                            var re = e(V),
                                oe =
                                    re.attr("data-name") ||
                                    re.attr("name") ||
                                    "File " + (z + 1),
                                ue = re.attr("data-value");
                            typeof ue == "string" && (ue = e.trim(ue)),
                                (q[oe] = ue);
                        }),
                        q
                    );
                }
                let E = { _mkto_trk: "marketo" };
                function R() {
                    return document.cookie.split("; ").reduce(function (q, z) {
                        let V = z.split("="),
                            re = V[0];
                        if (re in E) {
                            let oe = E[re],
                                ue = V.slice(1).join("=");
                            q[oe] = ue;
                        }
                        return q;
                    }, {});
                }
                function M(x, q, z, V) {
                    var re = null;
                    return (
                        q === "password"
                            ? (re = "Passwords cannot be submitted.")
                            : x.attr("required")
                            ? V
                                ? y.test(x.attr("type")) &&
                                  (g.test(V) ||
                                      (re =
                                          "Please enter a valid email address for: " +
                                          z))
                                : (re =
                                      "Please fill out the required field: " +
                                      z)
                            : z === "g-recaptcha-response" &&
                              !V &&
                              (re = "Please confirm you\u2019re not a robot."),
                        re
                    );
                }
                function X(x) {
                    se(x), Q(x);
                }
                function Z(x) {
                    W(x);
                    var q = x.form,
                        z = {};
                    if (/^https/.test(s.href) && !/^https/.test(x.action)) {
                        q.attr("method", "post");
                        return;
                    }
                    se(x);
                    var V = G(q, z);
                    if (V) return p(V);
                    j(x);
                    var re;
                    t.each(z, function (d, F) {
                        y.test(F) && (z.EMAIL = d),
                            /^((full[ _-]?)?name)$/i.test(F) && (re = d),
                            /^(first[ _-]?name)$/i.test(F) && (z.FNAME = d),
                            /^(last[ _-]?name)$/i.test(F) && (z.LNAME = d);
                    }),
                        re &&
                            !z.FNAME &&
                            ((re = re.split(" ")),
                            (z.FNAME = re[0]),
                            (z.LNAME = z.LNAME || re[1]));
                    var oe = x.action.replace("/post?", "/post-json?") + "&c=?",
                        ue = oe.indexOf("u=") + 2;
                    ue = oe.substring(ue, oe.indexOf("&", ue));
                    var Y = oe.indexOf("id=") + 3;
                    (Y = oe.substring(Y, oe.indexOf("&", Y))),
                        (z["b_" + ue + "_" + Y] = ""),
                        e
                            .ajax({ url: oe, data: z, dataType: "jsonp" })
                            .done(function (d) {
                                (x.success =
                                    d.result === "success" ||
                                    /already/.test(d.msg)),
                                    x.success ||
                                        console.info(
                                            "MailChimp error: " + d.msg
                                        ),
                                    Q(x);
                            })
                            .fail(function () {
                                Q(x);
                            });
                }
                function Q(x) {
                    var q = x.form,
                        z = x.redirect,
                        V = x.success;
                    if (V && z) {
                        zr.location(z);
                        return;
                    }
                    x.done.toggle(V),
                        x.fail.toggle(!V),
                        V ? x.done.focus() : x.fail.focus(),
                        q.toggle(!V),
                        W(x);
                }
                function se(x) {
                    x.evt && x.evt.preventDefault(), (x.evt = null);
                }
                function he(x, q) {
                    if (!q.fileUploads || !q.fileUploads[x]) return;
                    var z,
                        V = e(q.fileUploads[x]),
                        re = V.find("> .w-file-upload-default"),
                        oe = V.find("> .w-file-upload-uploading"),
                        ue = V.find("> .w-file-upload-success"),
                        Y = V.find("> .w-file-upload-error"),
                        d = re.find(".w-file-upload-input"),
                        F = re.find(".w-file-upload-label"),
                        K = F.children(),
                        U = Y.find(".w-file-upload-error-msg"),
                        pe = ue.find(".w-file-upload-file"),
                        ut = ue.find(".w-file-remove-link"),
                        Ke = pe.find(".w-file-upload-file-name"),
                        l = U.attr("data-w-size-error"),
                        v = U.attr("data-w-type-error"),
                        T = U.attr("data-w-generic-error");
                    if (
                        (h ||
                            F.on("click keydown", function (ee) {
                                (ee.type === "keydown" &&
                                    ee.which !== 13 &&
                                    ee.which !== 32) ||
                                    (ee.preventDefault(), d.click());
                            }),
                        F.find(".w-icon-file-upload-icon").attr(
                            "aria-hidden",
                            "true"
                        ),
                        ut
                            .find(".w-icon-file-upload-remove")
                            .attr("aria-hidden", "true"),
                        h)
                    )
                        d.on("click", function (ee) {
                            ee.preventDefault();
                        }),
                            F.on("click", function (ee) {
                                ee.preventDefault();
                            }),
                            K.on("click", function (ee) {
                                ee.preventDefault();
                            });
                    else {
                        ut.on("click keydown", function (ee) {
                            if (ee.type === "keydown") {
                                if (ee.which !== 13 && ee.which !== 32) return;
                                ee.preventDefault();
                            }
                            d.removeAttr("data-value"),
                                d.val(""),
                                Ke.html(""),
                                re.toggle(!0),
                                ue.toggle(!1),
                                F.focus();
                        }),
                            d.on("change", function (ee) {
                                (z =
                                    ee.target &&
                                    ee.target.files &&
                                    ee.target.files[0]),
                                    z &&
                                        (re.toggle(!1),
                                        Y.toggle(!1),
                                        oe.toggle(!0),
                                        oe.focus(),
                                        Ke.text(z.name),
                                        ne() || j(q),
                                        (q.fileUploads[x].uploading = !0),
                                        Se(z, L));
                            });
                        var w = F.outerHeight();
                        d.height(w), d.width(1);
                    }
                    function N(ee) {
                        var k = ee.responseJSON && ee.responseJSON.msg,
                            ie = T;
                        typeof k == "string" &&
                        k.indexOf("InvalidFileTypeError") === 0
                            ? (ie = v)
                            : typeof k == "string" &&
                              k.indexOf("MaxFileSizeError") === 0 &&
                              (ie = l),
                            U.text(ie),
                            d.removeAttr("data-value"),
                            d.val(""),
                            oe.toggle(!1),
                            re.toggle(!0),
                            Y.toggle(!0),
                            Y.focus(),
                            (q.fileUploads[x].uploading = !1),
                            ne() || W(q);
                    }
                    function L(ee, k) {
                        if (ee) return N(ee);
                        var ie = k.fileName,
                            ae = k.postData,
                            _e = k.fileId,
                            qe = k.s3Url;
                        d.attr("data-value", _e), me(qe, ae, z, ie, J);
                    }
                    function J(ee) {
                        if (ee) return N(ee);
                        oe.toggle(!1),
                            ue.css("display", "inline-block"),
                            ue.focus(),
                            (q.fileUploads[x].uploading = !1),
                            ne() || W(q);
                    }
                    function ne() {
                        var ee =
                            (q.fileUploads && q.fileUploads.toArray()) || [];
                        return ee.some(function (k) {
                            return k.uploading;
                        });
                    }
                }
                function Se(x, q) {
                    var z = new URLSearchParams({ name: x.name, size: x.size });
                    e.ajax({ type: "GET", url: `${b}?${z}`, crossDomain: !0 })
                        .done(function (V) {
                            q(null, V);
                        })
                        .fail(function (V) {
                            q(V);
                        });
                }
                function me(x, q, z, V, re) {
                    var oe = new FormData();
                    for (var ue in q) oe.append(ue, q[ue]);
                    oe.append("file", z, V),
                        e
                            .ajax({
                                type: "POST",
                                url: x,
                                data: oe,
                                processData: !1,
                                contentType: !1,
                            })
                            .done(function () {
                                re(null);
                            })
                            .fail(function (Y) {
                                re(Y);
                            });
                }
                return r;
            })
        );
    });
    var ky = f((NG, qy) => {
        "use strict";
        var ht = ke(),
            AF = qn(),
            Ae = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                ESCAPE: 27,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35,
            };
        ht.define(
            "navbar",
            (qy.exports = function (e, t) {
                var n = {},
                    r = e.tram,
                    i = e(window),
                    o = e(document),
                    s = t.debounce,
                    a,
                    u,
                    c,
                    y,
                    g = ht.env(),
                    p = '<div class="w-nav-overlay" data-wf-ignore />',
                    h = ".w-nav",
                    m = "w--open",
                    _ = "w--nav-dropdown-open",
                    b = "w--nav-dropdown-toggle-open",
                    I = "w--nav-dropdown-list-open",
                    S = "w--nav-link-open",
                    A = AF.triggers,
                    C = e();
                (n.ready = n.design = n.preview = D),
                    (n.destroy = function () {
                        (C = e()), P(), u && u.length && u.each(j);
                    });
                function D() {
                    (c = g && ht.env("design")),
                        (y = ht.env("editor")),
                        (a = e(document.body)),
                        (u = o.find(h)),
                        u.length && (u.each(W), P(), B());
                }
                function P() {
                    ht.resize.off(H);
                }
                function B() {
                    ht.resize.on(H);
                }
                function H() {
                    u.each(x);
                }
                function W(d, F) {
                    var K = e(F),
                        U = e.data(F, h);
                    U ||
                        (U = e.data(F, h, {
                            open: !1,
                            el: K,
                            config: {},
                            selectedIdx: -1,
                        })),
                        (U.menu = K.find(".w-nav-menu")),
                        (U.links = U.menu.find(".w-nav-link")),
                        (U.dropdowns = U.menu.find(".w-dropdown")),
                        (U.dropdownToggle = U.menu.find(".w-dropdown-toggle")),
                        (U.dropdownList = U.menu.find(".w-dropdown-list")),
                        (U.button = K.find(".w-nav-button")),
                        (U.container = K.find(".w-container")),
                        (U.overlayContainerId = "w-nav-overlay-" + d),
                        (U.outside = Se(U));
                    var pe = K.find(".w-nav-brand");
                    pe &&
                        pe.attr("href") === "/" &&
                        pe.attr("aria-label") == null &&
                        pe.attr("aria-label", "home"),
                        U.button.attr("style", "-webkit-user-select: text;"),
                        U.button.attr("aria-label") == null &&
                            U.button.attr("aria-label", "menu"),
                        U.button.attr("role", "button"),
                        U.button.attr("tabindex", "0"),
                        U.button.attr("aria-controls", U.overlayContainerId),
                        U.button.attr("aria-haspopup", "menu"),
                        U.button.attr("aria-expanded", "false"),
                        U.el.off(h),
                        U.button.off(h),
                        U.menu.off(h),
                        E(U),
                        c
                            ? (G(U), U.el.on("setting" + h, R(U)))
                            : (O(U),
                              U.button.on("click" + h, se(U)),
                              U.menu.on("click" + h, "a", he(U)),
                              U.button.on("keydown" + h, M(U)),
                              U.el.on("keydown" + h, X(U))),
                        x(d, F);
                }
                function j(d, F) {
                    var K = e.data(F, h);
                    K && (G(K), e.removeData(F, h));
                }
                function G(d) {
                    d.overlay &&
                        (Y(d, !0), d.overlay.remove(), (d.overlay = null));
                }
                function O(d) {
                    d.overlay ||
                        ((d.overlay = e(p).appendTo(d.el)),
                        d.overlay.attr("id", d.overlayContainerId),
                        (d.parent = d.menu.parent()),
                        Y(d, !0));
                }
                function E(d) {
                    var F = {},
                        K = d.config || {},
                        U = (F.animation =
                            d.el.attr("data-animation") || "default");
                    (F.animOver = /^over/.test(U)),
                        (F.animDirect = /left$/.test(U) ? -1 : 1),
                        K.animation !== U && d.open && t.defer(Q, d),
                        (F.easing = d.el.attr("data-easing") || "ease"),
                        (F.easing2 = d.el.attr("data-easing2") || "ease");
                    var pe = d.el.attr("data-duration");
                    (F.duration = pe != null ? Number(pe) : 400),
                        (F.docHeight = d.el.attr("data-doc-height")),
                        (d.config = F);
                }
                function R(d) {
                    return function (F, K) {
                        K = K || {};
                        var U = i.width();
                        E(d),
                            K.open === !0 && oe(d, !0),
                            K.open === !1 && Y(d, !0),
                            d.open &&
                                t.defer(function () {
                                    U !== i.width() && Q(d);
                                });
                    };
                }
                function M(d) {
                    return function (F) {
                        switch (F.keyCode) {
                            case Ae.SPACE:
                            case Ae.ENTER:
                                return (
                                    se(d)(),
                                    F.preventDefault(),
                                    F.stopPropagation()
                                );
                            case Ae.ESCAPE:
                                return (
                                    Y(d),
                                    F.preventDefault(),
                                    F.stopPropagation()
                                );
                            case Ae.ARROW_RIGHT:
                            case Ae.ARROW_DOWN:
                            case Ae.HOME:
                            case Ae.END:
                                return d.open
                                    ? (F.keyCode === Ae.END
                                          ? (d.selectedIdx = d.links.length - 1)
                                          : (d.selectedIdx = 0),
                                      Z(d),
                                      F.preventDefault(),
                                      F.stopPropagation())
                                    : (F.preventDefault(), F.stopPropagation());
                        }
                    };
                }
                function X(d) {
                    return function (F) {
                        if (d.open)
                            switch (
                                ((d.selectedIdx = d.links.index(
                                    document.activeElement
                                )),
                                F.keyCode)
                            ) {
                                case Ae.HOME:
                                case Ae.END:
                                    return (
                                        F.keyCode === Ae.END
                                            ? (d.selectedIdx =
                                                  d.links.length - 1)
                                            : (d.selectedIdx = 0),
                                        Z(d),
                                        F.preventDefault(),
                                        F.stopPropagation()
                                    );
                                case Ae.ESCAPE:
                                    return (
                                        Y(d),
                                        d.button.focus(),
                                        F.preventDefault(),
                                        F.stopPropagation()
                                    );
                                case Ae.ARROW_LEFT:
                                case Ae.ARROW_UP:
                                    return (
                                        (d.selectedIdx = Math.max(
                                            -1,
                                            d.selectedIdx - 1
                                        )),
                                        Z(d),
                                        F.preventDefault(),
                                        F.stopPropagation()
                                    );
                                case Ae.ARROW_RIGHT:
                                case Ae.ARROW_DOWN:
                                    return (
                                        (d.selectedIdx = Math.min(
                                            d.links.length - 1,
                                            d.selectedIdx + 1
                                        )),
                                        Z(d),
                                        F.preventDefault(),
                                        F.stopPropagation()
                                    );
                            }
                    };
                }
                function Z(d) {
                    if (d.links[d.selectedIdx]) {
                        var F = d.links[d.selectedIdx];
                        F.focus(), he(F);
                    }
                }
                function Q(d) {
                    d.open && (Y(d, !0), oe(d, !0));
                }
                function se(d) {
                    return s(function () {
                        d.open ? Y(d) : oe(d);
                    });
                }
                function he(d) {
                    return function (F) {
                        var K = e(this),
                            U = K.attr("href");
                        if (!ht.validClick(F.currentTarget)) {
                            F.preventDefault();
                            return;
                        }
                        U && U.indexOf("#") === 0 && d.open && Y(d);
                    };
                }
                function Se(d) {
                    return (
                        d.outside && o.off("click" + h, d.outside),
                        function (F) {
                            var K = e(F.target);
                            (y &&
                                K.closest(".w-editor-bem-EditorOverlay")
                                    .length) ||
                                me(d, K);
                        }
                    );
                }
                var me = s(function (d, F) {
                    if (d.open) {
                        var K = F.closest(".w-nav-menu");
                        d.menu.is(K) || Y(d);
                    }
                });
                function x(d, F) {
                    var K = e.data(F, h),
                        U = (K.collapsed = K.button.css("display") !== "none");
                    if ((K.open && !U && !c && Y(K, !0), K.container.length)) {
                        var pe = z(K);
                        K.links.each(pe), K.dropdowns.each(pe);
                    }
                    K.open && ue(K);
                }
                var q = "max-width";
                function z(d) {
                    var F = d.container.css(q);
                    return (
                        F === "none" && (F = ""),
                        function (K, U) {
                            (U = e(U)),
                                U.css(q, ""),
                                U.css(q) === "none" && U.css(q, F);
                        }
                    );
                }
                function V(d, F) {
                    F.setAttribute("data-nav-menu-open", "");
                }
                function re(d, F) {
                    F.removeAttribute("data-nav-menu-open");
                }
                function oe(d, F) {
                    if (d.open) return;
                    (d.open = !0),
                        d.menu.each(V),
                        d.links.addClass(S),
                        d.dropdowns.addClass(_),
                        d.dropdownToggle.addClass(b),
                        d.dropdownList.addClass(I),
                        d.button.addClass(m);
                    var K = d.config,
                        U = K.animation;
                    (U === "none" || !r.support.transform || K.duration <= 0) &&
                        (F = !0);
                    var pe = ue(d),
                        ut = d.menu.outerHeight(!0),
                        Ke = d.menu.outerWidth(!0),
                        l = d.el.height(),
                        v = d.el[0];
                    if (
                        (x(0, v),
                        A.intro(0, v),
                        ht.redraw.up(),
                        c || o.on("click" + h, d.outside),
                        F)
                    ) {
                        N();
                        return;
                    }
                    var T = "transform " + K.duration + "ms " + K.easing;
                    if (
                        (d.overlay &&
                            ((C = d.menu.prev()),
                            d.overlay.show().append(d.menu)),
                        K.animOver)
                    ) {
                        r(d.menu)
                            .add(T)
                            .set({ x: K.animDirect * Ke, height: pe })
                            .start({ x: 0 })
                            .then(N),
                            d.overlay && d.overlay.width(Ke);
                        return;
                    }
                    var w = l + ut;
                    r(d.menu).add(T).set({ y: -w }).start({ y: 0 }).then(N);
                    function N() {
                        d.button.attr("aria-expanded", "true");
                    }
                }
                function ue(d) {
                    var F = d.config,
                        K = F.docHeight ? o.height() : a.height();
                    return (
                        F.animOver
                            ? d.menu.height(K)
                            : d.el.css("position") !== "fixed" &&
                              (K -= d.el.outerHeight(!0)),
                        d.overlay && d.overlay.height(K),
                        K
                    );
                }
                function Y(d, F) {
                    if (!d.open) return;
                    (d.open = !1), d.button.removeClass(m);
                    var K = d.config;
                    if (
                        ((K.animation === "none" ||
                            !r.support.transform ||
                            K.duration <= 0) &&
                            (F = !0),
                        A.outro(0, d.el[0]),
                        o.off("click" + h, d.outside),
                        F)
                    ) {
                        r(d.menu).stop(), v();
                        return;
                    }
                    var U = "transform " + K.duration + "ms " + K.easing2,
                        pe = d.menu.outerHeight(!0),
                        ut = d.menu.outerWidth(!0),
                        Ke = d.el.height();
                    if (K.animOver) {
                        r(d.menu)
                            .add(U)
                            .start({ x: ut * K.animDirect })
                            .then(v);
                        return;
                    }
                    var l = Ke + pe;
                    r(d.menu).add(U).start({ y: -l }).then(v);
                    function v() {
                        d.menu.height(""),
                            r(d.menu).set({ x: 0, y: 0 }),
                            d.menu.each(re),
                            d.links.removeClass(S),
                            d.dropdowns.removeClass(_),
                            d.dropdownToggle.removeClass(b),
                            d.dropdownList.removeClass(I),
                            d.overlay &&
                                d.overlay.children().length &&
                                (C.length
                                    ? d.menu.insertAfter(C)
                                    : d.menu.prependTo(d.parent),
                                d.overlay.attr("style", "").hide()),
                            d.el.triggerHandler("w-close"),
                            d.button.attr("aria-expanded", "false");
                    }
                }
                return n;
            })
        );
    });
    var Xy = f((DG, Gy) => {
        "use strict";
        var yt = ke(),
            wF = qn();
        yt.define(
            "tabs",
            (Gy.exports = function (e) {
                var t = {},
                    n = e.tram,
                    r = e(document),
                    i,
                    o,
                    s = yt.env,
                    a = s.safari,
                    u = s(),
                    c = "data-w-tab",
                    y = "data-w-pane",
                    g = ".w-tabs",
                    p = "w--current",
                    h = "w--tab-active",
                    m = wF.triggers,
                    _ = !1;
                (t.ready = t.design = t.preview = b),
                    (t.redraw = function () {
                        (_ = !0), b(), (_ = !1);
                    }),
                    (t.destroy = function () {
                        (i = r.find(g)), i.length && (i.each(A), I());
                    });
                function b() {
                    (o = u && yt.env("design")),
                        (i = r.find(g)),
                        i.length &&
                            (i.each(C),
                            yt.env("preview") && !_ && i.each(A),
                            I(),
                            S());
                }
                function I() {
                    yt.redraw.off(t.redraw);
                }
                function S() {
                    yt.redraw.on(t.redraw);
                }
                function A(G, O) {
                    var E = e.data(O, g);
                    E &&
                        (E.links && E.links.each(m.reset),
                        E.panes && E.panes.each(m.reset));
                }
                function C(G, O) {
                    var E = g.substr(1) + "-" + G,
                        R = e(O),
                        M = e.data(O, g);
                    if (
                        (M || (M = e.data(O, g, { el: R, config: {} })),
                        (M.current = null),
                        (M.tabIdentifier = E + "-" + c),
                        (M.paneIdentifier = E + "-" + y),
                        (M.menu = R.children(".w-tab-menu")),
                        (M.links = M.menu.children(".w-tab-link")),
                        (M.content = R.children(".w-tab-content")),
                        (M.panes = M.content.children(".w-tab-pane")),
                        M.el.off(g),
                        M.links.off(g),
                        M.menu.attr("role", "tablist"),
                        M.links.attr("tabindex", "-1"),
                        D(M),
                        !o)
                    ) {
                        M.links.on("click" + g, B(M)),
                            M.links.on("keydown" + g, H(M));
                        var X = M.links.filter("." + p),
                            Z = X.attr(c);
                        Z && W(M, { tab: Z, immediate: !0 });
                    }
                }
                function D(G) {
                    var O = {};
                    O.easing = G.el.attr("data-easing") || "ease";
                    var E = parseInt(G.el.attr("data-duration-in"), 10);
                    E = O.intro = E === E ? E : 0;
                    var R = parseInt(G.el.attr("data-duration-out"), 10);
                    (R = O.outro = R === R ? R : 0),
                        (O.immediate = !E && !R),
                        (G.config = O);
                }
                function P(G) {
                    var O = G.current;
                    return Array.prototype.findIndex.call(
                        G.links,
                        (E) => E.getAttribute(c) === O,
                        null
                    );
                }
                function B(G) {
                    return function (O) {
                        O.preventDefault();
                        var E = O.currentTarget.getAttribute(c);
                        E && W(G, { tab: E });
                    };
                }
                function H(G) {
                    return function (O) {
                        var E = P(G),
                            R = O.key,
                            M = {
                                ArrowLeft: E - 1,
                                ArrowUp: E - 1,
                                ArrowRight: E + 1,
                                ArrowDown: E + 1,
                                End: G.links.length - 1,
                                Home: 0,
                            };
                        if (R in M) {
                            O.preventDefault();
                            var X = M[R];
                            X === -1 && (X = G.links.length - 1),
                                X === G.links.length && (X = 0);
                            var Z = G.links[X],
                                Q = Z.getAttribute(c);
                            Q && W(G, { tab: Q });
                        }
                    };
                }
                function W(G, O) {
                    O = O || {};
                    var E = G.config,
                        R = E.easing,
                        M = O.tab;
                    if (M !== G.current) {
                        G.current = M;
                        var X;
                        G.links.each(function (x, q) {
                            var z = e(q);
                            if (O.immediate || E.immediate) {
                                var V = G.panes[x];
                                q.id || (q.id = G.tabIdentifier + "-" + x),
                                    V.id || (V.id = G.paneIdentifier + "-" + x),
                                    (q.href = "#" + V.id),
                                    q.setAttribute("role", "tab"),
                                    q.setAttribute("aria-controls", V.id),
                                    q.setAttribute("aria-selected", "false"),
                                    V.setAttribute("role", "tabpanel"),
                                    V.setAttribute("aria-labelledby", q.id);
                            }
                            q.getAttribute(c) === M
                                ? ((X = q),
                                  z
                                      .addClass(p)
                                      .removeAttr("tabindex")
                                      .attr({ "aria-selected": "true" })
                                      .each(m.intro))
                                : z.hasClass(p) &&
                                  z
                                      .removeClass(p)
                                      .attr({
                                          tabindex: "-1",
                                          "aria-selected": "false",
                                      })
                                      .each(m.outro);
                        });
                        var Z = [],
                            Q = [];
                        G.panes.each(function (x, q) {
                            var z = e(q);
                            q.getAttribute(c) === M
                                ? Z.push(q)
                                : z.hasClass(h) && Q.push(q);
                        });
                        var se = e(Z),
                            he = e(Q);
                        if (O.immediate || E.immediate) {
                            se.addClass(h).each(m.intro),
                                he.removeClass(h),
                                _ || yt.redraw.up();
                            return;
                        } else {
                            var Se = window.scrollX,
                                me = window.scrollY;
                            X.focus(), window.scrollTo(Se, me);
                        }
                        he.length && E.outro
                            ? (he.each(m.outro),
                              n(he)
                                  .add("opacity " + E.outro + "ms " + R, {
                                      fallback: a,
                                  })
                                  .start({ opacity: 0 })
                                  .then(() => j(E, he, se)))
                            : j(E, he, se);
                    }
                }
                function j(G, O, E) {
                    if (
                        (O.removeClass(h).css({
                            opacity: "",
                            transition: "",
                            transform: "",
                            width: "",
                            height: "",
                        }),
                        E.addClass(h).each(m.intro),
                        yt.redraw.up(),
                        !G.intro)
                    )
                        return n(E).set({ opacity: 1 });
                    n(E)
                        .set({ opacity: 0 })
                        .redraw()
                        .add("opacity " + G.intro + "ms " + G.easing, {
                            fallback: a,
                        })
                        .start({ opacity: 1 });
                }
                return t;
            })
        );
    });
    da();
    pa();
    Sa();
    xa();
    Ca();
    Na();
    qn();
    Oy();
    Ry();
    Py();
    Ny();
    Fy();
    ky();
    Xy();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
    events: {
        "e-3": {
            id: "e-3",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-4",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25befc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25befc",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1715775009102,
        },
        "e-5": {
            id: "e-5",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-6",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25bf01",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25bf01",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1715775042632,
        },
        "e-7": {
            id: "e-7",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-8",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25bf06",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|fda5b75b-5f1e-d0a4-b299-d5495d25bf06",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1715775059755,
        },
        "e-9": {
            id: "e-9",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-10",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "8745e6f6-e7ce-d12c-5cda-dd37be8abe38",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "8745e6f6-e7ce-d12c-5cda-dd37be8abe38",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1678140033272,
        },
        "e-11": {
            id: "e-11",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-12",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "8745e6f6-e7ce-d12c-5cda-dd37be8abe3c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "8745e6f6-e7ce-d12c-5cda-dd37be8abe3c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1678140033272,
        },
        "e-19": {
            id: "e-19",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-20",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-20": {
            id: "e-20",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-19",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-21": {
            id: "e-21",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-22",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-22": {
            id: "e-22",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-21",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-23": {
            id: "e-23",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-24",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-24": {
            id: "e-24",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-23",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|147c2703-042d-9902-d443-38147b2d2911",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121142630,
        },
        "e-25": {
            id: "e-25",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-26",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-26": {
            id: "e-26",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-25",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-27": {
            id: "e-27",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-28",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-28": {
            id: "e-28",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-27",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-29": {
            id: "e-29",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-30",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-30": {
            id: "e-30",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-29",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|840802bd-0e14-d6b1-0a43-cea3768f244c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121185614,
        },
        "e-31": {
            id: "e-31",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-32",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-32": {
            id: "e-32",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-31",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-33": {
            id: "e-33",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-34",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-34": {
            id: "e-34",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-33",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-35": {
            id: "e-35",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-36",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-36": {
            id: "e-36",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-35",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|29a7c0c5-d8eb-5e74-57fe-fe961f60cfad",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121191841,
        },
        "e-37": {
            id: "e-37",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-38",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-38": {
            id: "e-38",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-37",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-39": {
            id: "e-39",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-40",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-40": {
            id: "e-40",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-39",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-41": {
            id: "e-41",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-42",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-42": {
            id: "e-42",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-41",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|566287fc-f06c-66d4-8906-06a90489ecb6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721121195078,
        },
        "e-43": {
            id: "e-43",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-7",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-7-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 90,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1721121294412,
        },
        "e-44": {
            id: "e-44",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-8",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-8-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 90,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1721121539572,
        },
        "e-45": {
            id: "e-45",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-9",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-9-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 90,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1721121695338,
        },
        "e-46": {
            id: "e-46",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-10",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-47",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721126534446,
        },
        "e-47": {
            id: "e-47",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-46",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721126534447,
        },
        "e-48": {
            id: "e-48",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-12",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-49",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721126762803,
        },
        "e-49": {
            id: "e-49",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-13",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-48",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721126762804,
        },
        "e-50": {
            id: "e-50",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-51",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721127354209,
        },
        "e-51": {
            id: "e-51",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-50",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f82",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721127354210,
        },
        "e-52": {
            id: "e-52",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-53",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128459421,
        },
        "e-53": {
            id: "e-53",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-52",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128459421,
        },
        "e-54": {
            id: "e-54",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-14",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-55",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128803383,
        },
        "e-55": {
            id: "e-55",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-54",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128803383,
        },
        "e-56": {
            id: "e-56",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-57",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128931090,
        },
        "e-57": {
            id: "e-57",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-56",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721128931091,
        },
        "e-58": {
            id: "e-58",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-59",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d578354509d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d578354509d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129459210,
        },
        "e-60": {
            id: "e-60",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-61",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d578354509f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d578354509f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129482430,
        },
        "e-62": {
            id: "e-62",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-63",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129494213,
        },
        "e-64": {
            id: "e-64",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-65",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a3",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a3",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129501787,
        },
        "e-66": {
            id: "e-66",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-67",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a5",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 400,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129510437,
        },
        "e-68": {
            id: "e-68",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_BIG_EFFECT",
                instant: false,
                config: {
                    actionListId: "shrinkBigIn",
                    autoStopEventId: "e-69",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d8c0ce8f-4414-2941-e097-7d57835450a7",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 500,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721129528478,
        },
        "e-70": {
            id: "e-70",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-18",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-18-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1721130278400,
        },
        "e-71": {
            id: "e-71",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-72",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|80e98dd7-96de-f7f8-f1b9-80d70b4bae4e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|80e98dd7-96de-f7f8-f1b9-80d70b4bae4e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 20,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1721133172693,
        },
        "e-77": {
            id: "e-77",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-78",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|a961220b-7994-1047-36ac-769cba7f8c9d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|a961220b-7994-1047-36ac-769cba7f8c9d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 20,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1721133275745,
        },
        "e-79": {
            id: "e-79",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-80",
                },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
                id: "669139f0dbf243a16af0bce5|5232234d-42d8-d60d-f930-4ec04e9ac84b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|5232234d-42d8-d60d-f930-4ec04e9ac84b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 20,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1721133297411,
        },
        "e-83": {
            id: "e-83",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-84",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: false,
            },
            createdOn: 1721198627500,
        },
        "e-84": {
            id: "e-84",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-83",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721198627500,
        },
        "e-85": {
            id: "e-85",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-86",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|1b4c65cf-d85f-e366-3513-8f205fc8406f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|1b4c65cf-d85f-e366-3513-8f205fc8406f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721199027135,
        },
        "e-86": {
            id: "e-86",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-85",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|1b4c65cf-d85f-e366-3513-8f205fc8406f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|1b4c65cf-d85f-e366-3513-8f205fc8406f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721199027135,
        },
        "e-87": {
            id: "e-87",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-88",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721199041726,
        },
        "e-88": {
            id: "e-88",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-87",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721199041727,
        },
        "e-89": {
            id: "e-89",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-22",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-90",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|e11009f7-af69-b3a6-601c-4096078e9c12",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721201974646,
        },
        "e-91": {
            id: "e-91",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-23",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium"],
            target: {
                id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-23-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1721203128520,
        },
        "e-92": {
            id: "e-92",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInRight",
                    autoStopEventId: "e-93",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|fa1de0c6-6511-c30b-acbb-d7c09eb94b7b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|fa1de0c6-6511-c30b-acbb-d7c09eb94b7b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "RIGHT",
                effectIn: true,
            },
            createdOn: 1721208883084,
        },
        "e-93": {
            id: "e-93",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideOutRight",
                    autoStopEventId: "e-92",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|fa1de0c6-6511-c30b-acbb-d7c09eb94b7b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|fa1de0c6-6511-c30b-acbb-d7c09eb94b7b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "RIGHT",
                effectIn: false,
            },
            createdOn: 1721208883118,
        },
        "e-94": {
            id: "e-94",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: false,
                config: { actionListId: "growIn", autoStopEventId: "e-95" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|504233e0-7faa-b3e9-5ffb-914e89fe9538",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|504233e0-7faa-b3e9-5ffb-914e89fe9538",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721208956516,
        },
        "e-95": {
            id: "e-95",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: false,
                config: { actionListId: "shrinkOut", autoStopEventId: "e-94" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|504233e0-7faa-b3e9-5ffb-914e89fe9538",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|504233e0-7faa-b3e9-5ffb-914e89fe9538",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: false,
            },
            createdOn: 1721208956517,
        },
        "e-96": {
            id: "e-96",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-97",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721209440536,
        },
        "e-97": {
            id: "e-97",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-96",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721209440537,
        },
        "e-98": {
            id: "e-98",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "POP_EFFECT",
                instant: false,
                config: { actionListId: "pop", autoStopEventId: "e-99" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721209603982,
        },
        "e-99": {
            id: "e-99",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
                id: "",
                actionTypeId: "POP_EFFECT",
                instant: false,
                config: { actionListId: "pop", autoStopEventId: "e-98" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|8ee164c2-fe02-48ef-c597-55856747312b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721209603983,
        },
        "e-100": {
            id: "e-100",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-25",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-101",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f5b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f5b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721213760879,
        },
        "e-101": {
            id: "e-101",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-26",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-100",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f5b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f5b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1721213760879,
        },
        "e-102": {
            id: "e-102",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "FADE_EFFECT",
                instant: false,
                config: { actionListId: "fadeIn", autoStopEventId: "e-103" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f60",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f60",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1721215016144,
        },
        "e-112": {
            id: "e-112",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-113",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-113": {
            id: "e-113",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-112",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-114": {
            id: "e-114",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-115",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-115": {
            id: "e-115",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-114",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-116": {
            id: "e-116",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-117",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-117": {
            id: "e-117",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-116",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|af6dedcc-5dd8-f60f-cdbf-86da156e0b85",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722517983827,
        },
        "e-118": {
            id: "e-118",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-28",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|cdb39a81-4b2e-0f06-15f8-edc598c6ef10",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|cdb39a81-4b2e-0f06-15f8-edc598c6ef10",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-28-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1722522484653,
        },
        "e-121": {
            id: "e-121",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-122",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-122": {
            id: "e-122",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-121",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-123": {
            id: "e-123",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-124",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-124": {
            id: "e-124",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-123",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-125": {
            id: "e-125",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-126",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-126": {
            id: "e-126",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-125",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|402b9070-3dd2-be23-fd0e-82f6b32402db",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523386599,
        },
        "e-139": {
            id: "e-139",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-140",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-140": {
            id: "e-140",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-139",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-141": {
            id: "e-141",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-142",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-142": {
            id: "e-142",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-141",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-143": {
            id: "e-143",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-144",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-144": {
            id: "e-144",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-143",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|687701e0-c7a1-9e24-7195-cc33e44f5259",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523427404,
        },
        "e-147": {
            id: "e-147",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-148",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-148": {
            id: "e-148",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-147",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-149": {
            id: "e-149",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-150",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-150": {
            id: "e-150",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-149",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-151": {
            id: "e-151",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-152",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-152": {
            id: "e-152",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-151",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|492a97cf-fc65-d0c0-9a67-fe3870a0f7de",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722523563550,
        },
        "e-153": {
            id: "e-153",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-154",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-154": {
            id: "e-154",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-153",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-155": {
            id: "e-155",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-156",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-156": {
            id: "e-156",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-155",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-157": {
            id: "e-157",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-158",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-158": {
            id: "e-158",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-157",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c438cad4-9cd3-35ec-9751-4f23fc404be2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722583302589,
        },
        "e-159": {
            id: "e-159",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-160",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-160": {
            id: "e-160",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-159",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-161": {
            id: "e-161",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-162",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-162": {
            id: "e-162",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-161",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-163": {
            id: "e-163",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-164",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-164": {
            id: "e-164",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-163",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e205",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594003512,
        },
        "e-165": {
            id: "e-165",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-166",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-166": {
            id: "e-166",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-165",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-167": {
            id: "e-167",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-168",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-168": {
            id: "e-168",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-167",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-169": {
            id: "e-169",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-170",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-170": {
            id: "e-170",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-169",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491631",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594007506,
        },
        "e-171": {
            id: "e-171",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-172",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-172": {
            id: "e-172",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-171",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-173": {
            id: "e-173",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-174",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-174": {
            id: "e-174",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-173",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-175": {
            id: "e-175",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-176",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-176": {
            id: "e-176",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-175",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594018842,
        },
        "e-177": {
            id: "e-177",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-178",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-178": {
            id: "e-178",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-177",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-179": {
            id: "e-179",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-180",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-180": {
            id: "e-180",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-179",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-181": {
            id: "e-181",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-182",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-182": {
            id: "e-182",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-181",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be9b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722594021210,
        },
        "e-183": {
            id: "e-183",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-184",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e1ed",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|54bdc8da-a6cf-ff53-329b-80320105e1ed",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1722839540424,
        },
        "e-185": {
            id: "e-185",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-186",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491616",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|04949784-2de4-4b48-dcdc-54ffef491616",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1722839556877,
        },
        "e-187": {
            id: "e-187",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-188",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6ef1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|c233cfe8-3ac8-7ee0-a0d4-410abe1a6ef1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1722839567824,
        },
        "e-189": {
            id: "e-189",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-190",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be98e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|3ebba572-d08b-d2c1-feb3-15a8240be98e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1722839576955,
        },
        "e-193": {
            id: "e-193",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-194",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849643843,
        },
        "e-194": {
            id: "e-194",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-193",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849643845,
        },
        "e-195": {
            id: "e-195",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-196",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849662949,
        },
        "e-196": {
            id: "e-196",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-195",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc59d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849662950,
        },
        "e-197": {
            id: "e-197",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-198",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc599",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc599",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849709654,
        },
        "e-198": {
            id: "e-198",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-197",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc599",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|803758cf-1ef8-1a53-289e-1146d23dc599",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722849709691,
        },
        "e-199": {
            id: "e-199",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-29",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-29-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1722925730951,
        },
        "e-200": {
            id: "e-200",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-30",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-30-p",
                    smoothing: 50,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1722925844179,
        },
        "e-201": {
            id: "e-201",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-202",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f62",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f62",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722933820161,
        },
        "e-202": {
            id: "e-202",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-201",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f62",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f62",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722933820200,
        },
        "e-203": {
            id: "e-203",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-204",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f68",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f68",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934216215,
        },
        "e-204": {
            id: "e-204",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-203",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f68",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f68",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934216216,
        },
        "e-205": {
            id: "e-205",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-206",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f6e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f6e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934238103,
        },
        "e-206": {
            id: "e-206",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-205",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f6e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f6e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934238105,
        },
        "e-211": {
            id: "e-211",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-25",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-212",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f32",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f32",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-212": {
            id: "e-212",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-26",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-211",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f32",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f32",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-213": {
            id: "e-213",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "FADE_EFFECT",
                instant: false,
                config: { actionListId: "fadeIn", autoStopEventId: "e-214" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f37",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f37",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1722934621623,
        },
        "e-215": {
            id: "e-215",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-216",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f39",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f39",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-216": {
            id: "e-216",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-215",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f39",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f39",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-217": {
            id: "e-217",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-218",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f3f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f3f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-218": {
            id: "e-218",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-217",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f3f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f3f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-219": {
            id: "e-219",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-220",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f45",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f45",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-220": {
            id: "e-220",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-219",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f45",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f45",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-221": {
            id: "e-221",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-222",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-222": {
            id: "e-222",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-221",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-223": {
            id: "e-223",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-224",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-224": {
            id: "e-224",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-223",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "a6ab8b93-b2d6-e02a-f05f-423e17d15f51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722934621623,
        },
        "e-233": {
            id: "e-233",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-234",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-234": {
            id: "e-234",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-233",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-235": {
            id: "e-235",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-236",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-236": {
            id: "e-236",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-235",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-237": {
            id: "e-237",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-238",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-238": {
            id: "e-238",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-237",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a9941cfe-9d63-ec79-8970-79ae10221b2f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722935343112,
        },
        "e-239": {
            id: "e-239",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "JELLO_EFFECT",
                instant: false,
                config: { actionListId: "jello", autoStopEventId: "e-240" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a004f15b-1970-72a7-4665-74d6e6cfa341",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a004f15b-1970-72a7-4665-74d6e6cfa341",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722949211176,
        },
        "e-240": {
            id: "e-240",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
                id: "",
                actionTypeId: "JELLO_EFFECT",
                instant: false,
                config: { actionListId: "jello", autoStopEventId: "e-239" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|a004f15b-1970-72a7-4665-74d6e6cfa341",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|a004f15b-1970-72a7-4665-74d6e6cfa341",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1722949211178,
        },
        "e-243": {
            id: "e-243",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "FADE_EFFECT",
                instant: false,
                config: { actionListId: "fadeIn", autoStopEventId: "e-244" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a55",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a55",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: null,
                effectIn: true,
            },
            createdOn: 1723015331072,
        },
        "e-245": {
            id: "e-245",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-246",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a57",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a57",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: 0,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-246": {
            id: "e-246",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-245",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a57",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a57",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-247": {
            id: "e-247",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-248",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-248": {
            id: "e-248",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-247",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-249": {
            id: "e-249",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-250",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a63",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a63",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-250": {
            id: "e-250",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-249",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a63",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|d1baa850-6e20-baf9-c0bd-2357436d4a63",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723015331072,
        },
        "e-251": {
            id: "e-251",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-25",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-252",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d1baa850-6e20-baf9-c0bd-2357436d4a50",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d1baa850-6e20-baf9-c0bd-2357436d4a50",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018111377,
        },
        "e-252": {
            id: "e-252",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-26",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-251",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d1baa850-6e20-baf9-c0bd-2357436d4a50",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d1baa850-6e20-baf9-c0bd-2357436d4a50",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018111378,
        },
        "e-253": {
            id: "e-253",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-254",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "f1621a52-2ba4-74d8-6381-9e4f328bcffb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "f1621a52-2ba4-74d8-6381-9e4f328bcffb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018488525,
        },
        "e-254": {
            id: "e-254",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-253",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "f1621a52-2ba4-74d8-6381-9e4f328bcffb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "f1621a52-2ba4-74d8-6381-9e4f328bcffb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018488526,
        },
        "e-255": {
            id: "e-255",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-256",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018531498,
        },
        "e-256": {
            id: "e-256",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-255",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d1baa850-6e20-baf9-c0bd-2357436d4a5d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018531523,
        },
        "e-257": {
            id: "e-257",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-258",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "8fe3dee5-25b5-314a-78f4-7807867697a2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "8fe3dee5-25b5-314a-78f4-7807867697a2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018559942,
        },
        "e-258": {
            id: "e-258",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-257",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "8fe3dee5-25b5-314a-78f4-7807867697a2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "8fe3dee5-25b5-314a-78f4-7807867697a2",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018559979,
        },
        "e-259": {
            id: "e-259",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-260",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "ad36fc2d-aed6-8e90-ace0-1d9e2d213701",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "ad36fc2d-aed6-8e90-ace0-1d9e2d213701",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018587510,
        },
        "e-260": {
            id: "e-260",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-259",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "ad36fc2d-aed6-8e90-ace0-1d9e2d213701",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "ad36fc2d-aed6-8e90-ace0-1d9e2d213701",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018587548,
        },
        "e-261": {
            id: "e-261",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-262",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "eb81847e-5326-8164-d9f4-a28b66a2ebea",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "eb81847e-5326-8164-d9f4-a28b66a2ebea",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018607473,
        },
        "e-262": {
            id: "e-262",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-261",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "eb81847e-5326-8164-d9f4-a28b66a2ebea",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "eb81847e-5326-8164-d9f4-a28b66a2ebea",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018607513,
        },
        "e-263": {
            id: "e-263",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-264",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d2aa793a-eeb6-50ba-a212-408f4125759a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d2aa793a-eeb6-50ba-a212-408f4125759a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018626574,
        },
        "e-264": {
            id: "e-264",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-263",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d2aa793a-eeb6-50ba-a212-408f4125759a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d2aa793a-eeb6-50ba-a212-408f4125759a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018626575,
        },
        "e-265": {
            id: "e-265",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-266",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "109feaad-f50c-4d5e-bde6-df2474f70ba4",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "109feaad-f50c-4d5e-bde6-df2474f70ba4",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018643508,
        },
        "e-266": {
            id: "e-266",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-265",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "109feaad-f50c-4d5e-bde6-df2474f70ba4",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "109feaad-f50c-4d5e-bde6-df2474f70ba4",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018643539,
        },
        "e-267": {
            id: "e-267",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-268",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018666025,
        },
        "e-268": {
            id: "e-268",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-267",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018666064,
        },
        "e-269": {
            id: "e-269",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-270",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "daab77a8-1688-f805-a302-e55e7cbf5057",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "daab77a8-1688-f805-a302-e55e7cbf5057",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018683971,
        },
        "e-270": {
            id: "e-270",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-269",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "daab77a8-1688-f805-a302-e55e7cbf5057",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "daab77a8-1688-f805-a302-e55e7cbf5057",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018683972,
        },
        "e-271": {
            id: "e-271",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-272",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "db45fd63-a8c9-a458-220e-0b8a3206bc3f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "db45fd63-a8c9-a458-220e-0b8a3206bc3f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018771769,
        },
        "e-272": {
            id: "e-272",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-271",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "db45fd63-a8c9-a458-220e-0b8a3206bc3f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "db45fd63-a8c9-a458-220e-0b8a3206bc3f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018771769,
        },
        "e-275": {
            id: "e-275",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-276",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d896f1d8-67cd-60e5-b6ad-696db6df59f8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d896f1d8-67cd-60e5-b6ad-696db6df59f8",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018916205,
        },
        "e-276": {
            id: "e-276",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-275",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "d896f1d8-67cd-60e5-b6ad-696db6df59f8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "d896f1d8-67cd-60e5-b6ad-696db6df59f8",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018916246,
        },
        "e-277": {
            id: "e-277",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-31",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-278",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "ba5b4146-f0fa-9704-1e07-0c19a8e13168",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "ba5b4146-f0fa-9704-1e07-0c19a8e13168",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018968509,
        },
        "e-278": {
            id: "e-278",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-32",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-277",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "ba5b4146-f0fa-9704-1e07-0c19a8e13168",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "ba5b4146-f0fa-9704-1e07-0c19a8e13168",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723018968510,
        },
        "e-281": {
            id: "e-281",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-282",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-282": {
            id: "e-282",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-281",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-283": {
            id: "e-283",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-284",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-284": {
            id: "e-284",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-283",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-285": {
            id: "e-285",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-286",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-286": {
            id: "e-286",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-285",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e51",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723019796140,
        },
        "e-287": {
            id: "e-287",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-288",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e3b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e3b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1723022429719,
        },
        "e-289": {
            id: "e-289",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-290",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e49",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e49",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1723022440568,
        },
        "e-291": {
            id: "e-291",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-292",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|430571fa-939b-ddf5-dec5-f6a667ccc469",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|430571fa-939b-ddf5-dec5-f6a667ccc469",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1723022448168,
        },
        "e-293": {
            id: "e-293",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-294",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|555aa789-9438-7465-3f55-5225c4cf53ab",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|555aa789-9438-7465-3f55-5225c4cf53ab",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1723022456760,
        },
        "e-295": {
            id: "e-295",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-296",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e45",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66b1e7734e988f2030e94405|396cb13c-d0de-4ddc-5ea3-213b6ac19e45",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 0,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1723022464697,
        },
        "e-307": {
            id: "e-307",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-5",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-308",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|9f98d86a-6abe-279d-8283-e8a0e540ccc1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|9f98d86a-6abe-279d-8283-e8a0e540ccc1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723042296008,
        },
        "e-308": {
            id: "e-308",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-6",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-307",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "669139f0dbf243a16af0bce5|9f98d86a-6abe-279d-8283-e8a0e540ccc1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "669139f0dbf243a16af0bce5|9f98d86a-6abe-279d-8283-e8a0e540ccc1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1723042296010,
        },
    },
    actionLists: {
        "a-2": {
            id: "a-2",
            title: "Arrow Light Opacity",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-2-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow",
                                    selectorGuids: [
                                        "11687949-2e58-98fb-cb3c-d060b7d6d4cb",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-2-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow",
                                    selectorGuids: [
                                        "11687949-2e58-98fb-cb3c-d060b7d6d4cb",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721118540957,
        },
        "a-4": {
            id: "a-4",
            title: "Arrow Light Out Opacity",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-4-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow",
                                    selectorGuids: [
                                        "11687949-2e58-98fb-cb3c-d060b7d6d4cb",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-4-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow",
                                    selectorGuids: [
                                        "11687949-2e58-98fb-cb3c-d060b7d6d4cb",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721118807329,
        },
        "a-5": {
            id: "a-5",
            title: "Button Hover In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-5-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "easeOut",
                                duration: 0,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e318bd58-04f5-d696-d270-44793eb76f68",
                                },
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-5-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "easeOut",
                                duration: 200,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e318bd58-04f5-d696-d270-44793eb76f68",
                                },
                                yValue: -4,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721120788362,
        },
        "a-6": {
            id: "a-6",
            title: "Button Hover Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-6-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "easeOut",
                                duration: 0,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e318bd58-04f5-d696-d270-44793eb76f68",
                                },
                                yValue: -4,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-6-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 200,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e318bd58-04f5-d696-d270-44793eb76f68",
                                },
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721120895878,
        },
        a: {
            id: "a",
            title: "Arrow Dark Opacity",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow-dark",
                                    selectorGuids: [
                                        "25923b70-03a2-589e-bd17-fc95760519bc",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow-dark",
                                    selectorGuids: [
                                        "25923b70-03a2-589e-bd17-fc95760519bc",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721118471789,
        },
        "a-3": {
            id: "a-3",
            title: "Arrow Dark Out Opacity",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-3-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow-dark",
                                    selectorGuids: [
                                        "25923b70-03a2-589e-bd17-fc95760519bc",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-3-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".section-button-arrow-dark",
                                    selectorGuids: [
                                        "25923b70-03a2-589e-bd17-fc95760519bc",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721118752949,
        },
        "a-7": {
            id: "a-7",
            title: "Coin Scroll Bottom",
            continuousParameterGroups: [
                {
                    id: "a-7-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-7-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 42,
                                        yValue: -140,
                                        zValue: null,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "px",
                                    },
                                },
                                {
                                    id: "a-7-n-7",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "227b",
                                                value: 5,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-7-n-5",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0.8,
                                        yValue: 0.8,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-7-n-3",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        zValue: -7,
                                        xUnit: "deg",
                                        yUnit: "deg",
                                        zUnit: "deg",
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 38,
                            actionItems: [
                                {
                                    id: "a-7-n-8",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "5a38",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-7-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        zValue: null,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "px",
                                    },
                                },
                                {
                                    id: "a-7-n-4",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        zValue: 0,
                                        xUnit: "deg",
                                        yUnit: "deg",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-7-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721121313398,
        },
        "a-8": {
            id: "a-8",
            title: "Coin Scroll Middle",
            continuousParameterGroups: [
                {
                    id: "a-8-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-8-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 19,
                                        yValue: -100,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-8-n-3",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        zValue: -11,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-8-n-5",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        xValue: 0.6,
                                        yValue: 0.6,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-8-n-7",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "e001",
                                                value: 5,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 45,
                            actionItems: [
                                {
                                    id: "a-8-n-8",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "6400",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-8-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-8-n-4",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        zValue: 0,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-8-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721121313398,
        },
        "a-9": {
            id: "a-9",
            title: "Coin Scroll Top",
            continuousParameterGroups: [
                {
                    id: "a-9-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-9-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 195,
                                        yValue: -88,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-9-n-3",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        zValue: -6,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-9-n-5",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "easeInOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        xValue: 0.5,
                                        yValue: 0.5,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-9-n-7",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "c32c",
                                                value: 5,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 50,
                            actionItems: [
                                {
                                    id: "a-9-n-8",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "9067",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-9-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-9-n-4",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        zValue: 0,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-9-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721121313398,
        },
        "a-10": {
            id: "a-10",
            title: "Launch Arrow Dark In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-10-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-dark",
                                    selectorGuids: [
                                        "4ee174e7-e6be-1099-a26b-c26cd93e4b1d",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-10-n-3",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-dark",
                                    selectorGuids: [
                                        "4ee174e7-e6be-1099-a26b-c26cd93e4b1d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721126558412,
        },
        "a-11": {
            id: "a-11",
            title: "Launch Arrow Dark Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-11-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-dark",
                                    selectorGuids: [
                                        "4ee174e7-e6be-1099-a26b-c26cd93e4b1d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-11-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-dark",
                                    selectorGuids: [
                                        "4ee174e7-e6be-1099-a26b-c26cd93e4b1d",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721126558412,
        },
        "a-12": {
            id: "a-12",
            title: "CTA Launch Arrow White In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-12-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-white",
                                    selectorGuids: [
                                        "1b00be66-5e41-f0d7-751d-325611c21b9c",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-12-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-white",
                                    selectorGuids: [
                                        "1b00be66-5e41-f0d7-751d-325611c21b9c",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721126854416,
        },
        "a-13": {
            id: "a-13",
            title: "CTA Launch Arrow White Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-13-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-white",
                                    selectorGuids: [
                                        "1b00be66-5e41-f0d7-751d-325611c21b9c",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-13-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".cta-arrow-white",
                                    selectorGuids: [
                                        "1b00be66-5e41-f0d7-751d-325611c21b9c",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721126854416,
        },
        "a-14": {
            id: "a-14",
            title: "Staking Icon White In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-14-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon",
                                    selectorGuids: [
                                        "20b333e5-c197-e8e6-db52-1994acd0a877",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-14-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon",
                                    selectorGuids: [
                                        "20b333e5-c197-e8e6-db52-1994acd0a877",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721128810707,
        },
        "a-15": {
            id: "a-15",
            title: "Staking Icon White Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-15-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon",
                                    selectorGuids: [
                                        "20b333e5-c197-e8e6-db52-1994acd0a877",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-15-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon",
                                    selectorGuids: [
                                        "20b333e5-c197-e8e6-db52-1994acd0a877",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721128810707,
        },
        "a-16": {
            id: "a-16",
            title: "Staking Button Dark In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-16-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon-dark",
                                    selectorGuids: [
                                        "92b7798a-b129-8890-8dbb-1e5b53ebc74d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-16-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon-dark",
                                    selectorGuids: [
                                        "92b7798a-b129-8890-8dbb-1e5b53ebc74d",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721128936186,
        },
        "a-17": {
            id: "a-17",
            title: "Staking Button Dark Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-17-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon-dark",
                                    selectorGuids: [
                                        "92b7798a-b129-8890-8dbb-1e5b53ebc74d",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-17-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 100,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".token-icon-dark",
                                    selectorGuids: [
                                        "92b7798a-b129-8890-8dbb-1e5b53ebc74d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721128936186,
        },
        "a-18": {
            id: "a-18",
            title: "Mascot Front Scroll",
            continuousParameterGroups: [
                {
                    id: "a-18-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-18-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        xValue: null,
                                        yValue: 150,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-18-n-5",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        xValue: 0.8,
                                        yValue: 0.8,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-18-n-3",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "e418",
                                                value: 10,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 40,
                            actionItems: [
                                {
                                    id: "a-18-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-18-n-4",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "5f54",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-18-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|10147117-99fa-5c8f-698e-4449e611716c",
                                        },
                                        yValue: 40,
                                        xUnit: "PX",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721130289158,
        },
        "a-19": {
            id: "a-19",
            title: "Tier Hover Grow",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-19-n",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "easeInOut",
                                duration: 1000,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-19-n-2",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 200,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                                },
                                xValue: 1.05,
                                yValue: 1.05,
                                locked: true,
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1721198649153,
        },
        "a-20": {
            id: "a-20",
            title: "Tier Hover Shrink",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-20-n",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "easeInOut",
                                duration: 0,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                                },
                                xValue: 1.05,
                                yValue: 1.05,
                                locked: true,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-20-n-2",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "easeInOut",
                                duration: 200,
                                target: {
                                    useEventTarget: true,
                                    id: "669139f0dbf243a16af0bce5|e14043e9-7b09-02e2-4e4a-fd78259c3b5e",
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721198649153,
        },
        "a-22": {
            id: "a-22",
            title: "New Timed Animation",
            actionItemGroups: [],
            useFirstGroupAsInitialState: false,
            createdOn: 1721201983597,
        },
        "a-23": {
            id: "a-23",
            title: "Feature Rotate",
            continuousParameterGroups: [
                {
                    id: "a-23-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-23-n",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        xValue: 40,
                                        xUnit: "deg",
                                        yUnit: "DEG",
                                        zUnit: "DEG",
                                    },
                                },
                                {
                                    id: "a-23-n-4",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        yValue: 111,
                                        xUnit: "PX",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        xValue: 0.8,
                                        yValue: 0.8,
                                        locked: true,
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 40,
                            actionItems: [
                                {
                                    id: "a-23-n-7",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-23-n-5",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        yValue: 0,
                                        xUnit: "PX",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-3",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|7dc61096-2dfd-240c-60ae-7daaec8986e7",
                                        },
                                        xValue: 0,
                                        xUnit: "deg",
                                        yUnit: "DEG",
                                        zUnit: "DEG",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721203135708,
        },
        "a-25": {
            id: "a-25",
            title: "Navbar Dropdown Open",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-25-n",
                            actionTypeId: "GENERAL_DISPLAY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".navbar-dropdown",
                                    selectorGuids: [
                                        "a30ae0a0-63e1-b101-bb78-492fdefd93bc",
                                    ],
                                },
                                value: "none",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-25-n-2",
                            actionTypeId: "GENERAL_DISPLAY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".navbar-dropdown",
                                    selectorGuids: [
                                        "a30ae0a0-63e1-b101-bb78-492fdefd93bc",
                                    ],
                                },
                                value: "block",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1721213765388,
        },
        "a-26": {
            id: "a-26",
            title: "Navbar Dropdown Close",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-26-n",
                            actionTypeId: "GENERAL_DISPLAY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".navbar-dropdown",
                                    selectorGuids: [
                                        "a30ae0a0-63e1-b101-bb78-492fdefd93bc",
                                    ],
                                },
                                value: "block",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-26-n-2",
                            actionTypeId: "GENERAL_DISPLAY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 0,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".navbar-dropdown",
                                    selectorGuids: [
                                        "a30ae0a0-63e1-b101-bb78-492fdefd93bc",
                                    ],
                                },
                                value: "none",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1721213765388,
        },
        "a-28": {
            id: "a-28",
            title: "Video Scrolly",
            continuousParameterGroups: [
                {
                    id: "a-28-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-28-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|cdb39a81-4b2e-0f06-15f8-edc598c6ef10",
                                        },
                                        yValue: 60,
                                        xUnit: "PX",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 100,
                            actionItems: [
                                {
                                    id: "a-28-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|cdb39a81-4b2e-0f06-15f8-edc598c6ef10",
                                        },
                                        yValue: -60,
                                        xUnit: "PX",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1722522526315,
        },
        "a-29": {
            id: "a-29",
            title: "Coin Scroll Top Mobile",
            continuousParameterGroups: [
                {
                    id: "a-29-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-29-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 134,
                                        yValue: -39,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-29-n-2",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        zValue: -6,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-29-n-3",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "easeInOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        xValue: 0.5,
                                        yValue: 0.5,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-29-n-4",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "c32c",
                                                value: 5,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 50,
                            actionItems: [
                                {
                                    id: "a-29-n-8",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 0,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-29-n-7",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        zValue: 0,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-29-n-6",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-29-n-5",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4bb7f221-8ec2-70a6-4659-2bc758df8a61",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "9067",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721121313398,
        },
        "a-30": {
            id: "a-30",
            title: "Coin Scroll Middle Mobile",
            continuousParameterGroups: [
                {
                    id: "a-30-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-30-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 42,
                                        yValue: -90,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-30-n-2",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        zValue: -11,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-30-n-3",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        xValue: 0.5,
                                        yValue: 0.5,
                                        locked: true,
                                    },
                                },
                                {
                                    id: "a-30-n-4",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "easeOut",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "e001",
                                                value: 5,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 50,
                            actionItems: [
                                {
                                    id: "a-30-n-5",
                                    actionTypeId: "STYLE_FILTER",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        filters: [
                                            {
                                                type: "blur",
                                                filterId: "6400",
                                                value: 0,
                                                unit: "px",
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: "a-30-n-6",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|4c5f896d-3574-5cba-98cd-8db31f6c5a1c",
                                        },
                                        xValue: 0,
                                        yValue: 4,
                                        xUnit: "px",
                                        yUnit: "px",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-30-n-7",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        zValue: 0,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                                {
                                    id: "a-30-n-8",
                                    actionTypeId: "TRANSFORM_SCALE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: true,
                                            id: "669139f0dbf243a16af0bce5|9574cbf6-5971-fe2d-a03d-4ab53d64ea2d",
                                        },
                                        xValue: 1,
                                        yValue: 1,
                                        locked: true,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1721121313398,
        },
        "a-31": {
            id: "a-31",
            title: "Dropdown Item In",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-31-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 50,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".heading-dropdown-link",
                                    selectorGuids: [
                                        "209a6d93-49f8-4fda-c69a-98b61fcd6424",
                                    ],
                                },
                                xValue: 0,
                                xUnit: "px",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-31-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 50,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".heading-dropdown-link",
                                    selectorGuids: [
                                        "209a6d93-49f8-4fda-c69a-98b61fcd6424",
                                    ],
                                },
                                xValue: 8,
                                xUnit: "px",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1722933898511,
        },
        "a-32": {
            id: "a-32",
            title: "Dropdown Item Out",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-32-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 50,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".heading-dropdown-link",
                                    selectorGuids: [
                                        "209a6d93-49f8-4fda-c69a-98b61fcd6424",
                                    ],
                                },
                                xValue: 8,
                                xUnit: "px",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-32-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 50,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".heading-dropdown-link",
                                    selectorGuids: [
                                        "209a6d93-49f8-4fda-c69a-98b61fcd6424",
                                    ],
                                },
                                xValue: 0,
                                xUnit: "px",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1722933898511,
        },
        slideInBottom: {
            id: "slideInBottom",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 100,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        slideInLeft: {
            id: "slideInLeft",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: -100,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
        },
        shrinkBigIn: {
            id: "shrinkBigIn",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                duration: 0,
                                delay: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 4,
                                yValue: 4,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 1,
                                yValue: 1,
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        slideInRight: {
            id: "slideInRight",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 100,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
        },
        slideOutRight: {
            id: "slideOutRight",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "inQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "inQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 100,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
        },
        growIn: {
            id: "growIn",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0.7500000000000001,
                                yValue: 0.7500000000000001,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 1,
                                yValue: 1,
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        shrinkOut: {
            id: "shrinkOut",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "inQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0.7500000000000001,
                                yValue: 0.7500000000000001,
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "inQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
            ],
        },
        pop: {
            id: "pop",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 250,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0.7500000000000001,
                                yValue: 0.7500000000000001,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "outElastic",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 1,
                                yValue: 1,
                            },
                        },
                    ],
                },
            ],
        },
        fadeIn: {
            id: "fadeIn",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        jello: {
            id: "jello",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SKEW",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 100,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: -12,
                                yValue: -12,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "DEG",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SKEW",
                            config: {
                                delay: 0,
                                easing: "outElastic",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "DEG",
                            },
                        },
                    ],
                },
            ],
        },
    },
    site: {
        mediaQueries: [
            { key: "main", min: 992, max: 10000 },
            { key: "medium", min: 768, max: 991 },
            { key: "small", min: 480, max: 767 },
            { key: "tiny", min: 0, max: 479 },
        ],
    },
});
