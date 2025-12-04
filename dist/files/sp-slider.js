
function ye(e) {
   return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object
}
function ve(e = {}, s = {}) {
   const t = ["__proto__", "constructor", "prototype"];
   Object.keys(s).filter(i => t.indexOf(i) < 0).forEach(i => {
      typeof e[i] > "u" ? e[i] = s[i] : ye(s[i]) && ye(e[i]) && Object.keys(s[i]).length > 0 && ve(e[i], s[i])
   }
   )
}
const Me = {
   body: {},
   addEventListener() { },
   removeEventListener() { },
   activeElement: {
      blur() { },
      nodeName: ""
   },
   querySelector() {
      return null
   },
   querySelectorAll() {
      return []
   },
   getElementById() {
      return null
   },
   createEvent() {
      return {
         initEvent() { }
      }
   },
   createElement() {
      return {
         children: [],
         childNodes: [],
         style: {},
         setAttribute() { },
         getElementsByTagName() {
            return []
         }
      }
   },
   createElementNS() {
      return {}
   },
   importNode() {
      return null
   },
   location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
   }
};
function j() {
   const e = typeof document < "u" ? document : {};
   return ve(e, Me),
      e
}
const $e = {
   document: Me,
   navigator: {
      userAgent: ""
   },
   location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
   },
   history: {
      replaceState() { },
      pushState() { },
      go() { },
      back() { }
   },
   CustomEvent: function () {
      return this
   },
   addEventListener() { },
   removeEventListener() { },
   getComputedStyle() {
      return {
         getPropertyValue() {
            return ""
         }
      }
   },
   Image() { },
   Date() { },
   screen: {},
   setTimeout() { },
   clearTimeout() { },
   matchMedia() {
      return {}
   },
   requestAnimationFrame(e) {
      return typeof setTimeout > "u" ? (e(),
         null) : setTimeout(e, 0)
   },
   cancelAnimationFrame(e) {
      typeof setTimeout > "u" || clearTimeout(e)
   }
};
function _() {
   const e = typeof window < "u" ? window : {};
   return ve(e, $e),
      e
}
function ke(e = "") {
   return e.trim().split(" ").filter(s => !!s.trim())
}
function De(e) {
   const s = e;
   Object.keys(s).forEach(t => {
      try {
         s[t] = null
      } catch { }
      try {
         delete s[t]
      } catch { }
   }
   )
}
function Ce(e, s = 0) {
   return setTimeout(e, s)
}
function ne() {
   return Date.now()
}
function Ge(e) {
   const s = _();
   let t;
   return s.getComputedStyle && (t = s.getComputedStyle(e, null)),
      !t && e.currentStyle && (t = e.currentStyle),
      t || (t = e.style),
      t
}
function Be(e, s = "x") {
   const t = _();
   let i, n, r;
   const l = Ge(e);
   return t.WebKitCSSMatrix ? (n = l.transform || l.webkitTransform,
      n.split(",").length > 6 && (n = n.split(", ").map(o => o.replace(",", ".")).join(", ")),
      r = new t.WebKitCSSMatrix(n === "none" ? "" : n)) : (r = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
         i = r.toString().split(",")),
      s === "x" && (t.WebKitCSSMatrix ? n = r.m41 : i.length === 16 ? n = parseFloat(i[12]) : n = parseFloat(i[4])),
      s === "y" && (t.WebKitCSSMatrix ? n = r.m42 : i.length === 16 ? n = parseFloat(i[13]) : n = parseFloat(i[5])),
      n || 0
}
function se(e) {
   return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object"
}
function Fe(e) {
   return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11)
}
function N(...e) {
   const s = Object(e[0])
      , t = ["__proto__", "constructor", "prototype"];
   for (let i = 1; i < e.length; i += 1) {
      const n = e[i];
      if (n != null && !Fe(n)) {
         const r = Object.keys(Object(n)).filter(l => t.indexOf(l) < 0);
         for (let l = 0, o = r.length; l < o; l += 1) {
            const a = r[l]
               , d = Object.getOwnPropertyDescriptor(n, a);
            d !== void 0 && d.enumerable && (se(s[a]) && se(n[a]) ? n[a].__swiper__ ? s[a] = n[a] : N(s[a], n[a]) : !se(s[a]) && se(n[a]) ? (s[a] = {},
               n[a].__swiper__ ? s[a] = n[a] : N(s[a], n[a])) : s[a] = n[a])
         }
      }
   }
   return s
}
function te(e, s, t) {
   e.style.setProperty(s, t)
}
function we({ swiper: e, targetPosition: s, side: t }) {
   const i = _()
      , n = -e.translate;
   let r = null, l;
   const o = e.params.speed;
   e.wrapperEl.style.scrollSnapType = "none",
      i.cancelAnimationFrame(e.cssModeFrameID);
   const a = s > n ? "next" : "prev"
      , d = (u, T) => a === "next" && u >= T || a === "prev" && u <= T
      , g = () => {
         l = new Date().getTime(),
            r === null && (r = l);
         const u = Math.max(Math.min((l - r) / o, 1), 0)
            , T = .5 - Math.cos(u * Math.PI) / 2;
         let c = n + T * (s - n);
         if (d(c, s) && (c = s),
            e.wrapperEl.scrollTo({
               [t]: c
            }),
            d(c, s)) {
            e.wrapperEl.style.overflow = "hidden",
               e.wrapperEl.style.scrollSnapType = "",
               setTimeout(() => {
                  e.wrapperEl.style.overflow = "",
                     e.wrapperEl.scrollTo({
                        [t]: c
                     })
               }
               ),
               i.cancelAnimationFrame(e.cssModeFrameID);
            return
         }
         e.cssModeFrameID = i.requestAnimationFrame(g)
      }
      ;
   g()
}
function R(e, s = "") {
   const t = _()
      , i = [...e.children];
   return t.HTMLSlotElement && e instanceof HTMLSlotElement && i.push(...e.assignedElements()),
      s ? i.filter(n => n.matches(s)) : i
}
function Ve(e, s) {
   const t = [s];
   for (; t.length > 0;) {
      const i = t.shift();
      if (e === i)
         return !0;
      t.push(...i.children, ...i.shadowRoot ? i.shadowRoot.children : [], ...i.assignedElements ? i.assignedElements() : [])
   }
}
function _e(e, s) {
   const t = _();
   let i = s.contains(e);
   return !i && t.HTMLSlotElement && s instanceof HTMLSlotElement && (i = [...s.assignedElements()].includes(e),
      i || (i = Ve(e, s))),
      i
}
function re(e) {
   try {
      console.warn(e);
      return
   } catch { }
}
function J(e, s = []) {
   const t = document.createElement(e);
   return t.classList.add(...Array.isArray(s) ? s : ke(s)),
      t
}
function Ne(e, s) {
   const t = [];
   for (; e.previousElementSibling;) {
      const i = e.previousElementSibling;
      s ? i.matches(s) && t.push(i) : t.push(i),
         e = i
   }
   return t
}
function He(e, s) {
   const t = [];
   for (; e.nextElementSibling;) {
      const i = e.nextElementSibling;
      s ? i.matches(s) && t.push(i) : t.push(i),
         e = i
   }
   return t
}
function X(e, s) {
   return _().getComputedStyle(e, null).getPropertyValue(s)
}
function ae(e) {
   let s = e, t;
   if (s) {
      for (t = 0; (s = s.previousSibling) !== null;)
         s.nodeType === 1 && (t += 1);
      return t
   }
}
function Pe(e, s) {
   const t = [];
   let i = e.parentElement;
   for (; i;)
      s ? i.matches(s) && t.push(i) : t.push(i),
         i = i.parentElement;
   return t
}
function Re(e, s) {
   function t(i) {
      i.target === e && (s.call(e, i),
         e.removeEventListener("transitionend", t))
   }
   s && e.addEventListener("transitionend", t)
}
function he(e, s, t) {
   const i = _();
   return e[s === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue(s === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue(s === "width" ? "margin-left" : "margin-bottom"))
}
function Y(e) {
   return (Array.isArray(e) ? e : [e]).filter(s => !!s)
}
function le(e, s = "") {
   typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", {
      createHTML: t => t
   }).createHTML(s) : e.innerHTML = s
}
let oe;
function je() {
   const e = _()
      , s = j();
   return {
      smoothScroll: s.documentElement && s.documentElement.style && "scrollBehavior" in s.documentElement.style,
      touch: !!("ontouchstart" in e || e.DocumentTouch && s instanceof e.DocumentTouch)
   }
}
function Ie() {
   return oe || (oe = je()),
      oe
}
let de;
function qe({ userAgent: e } = {}) {
   const s = Ie()
      , t = _()
      , i = t.navigator.platform
      , n = e || t.navigator.userAgent
      , r = {
         ios: !1,
         android: !1
      }
      , l = t.screen.width
      , o = t.screen.height
      , a = n.match(/(Android);?[\s\/]+([\d.]+)?/);
   let d = n.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
   const g = n.match(/(iPod)(.*OS\s([\d_]+))?/)
      , u = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
      , T = i === "Win32";
   let c = i === "MacIntel";
   const h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
   return !d && c && s.touch && h.indexOf(`${l}x${o}`) >= 0 && (d = n.match(/(Version)\/([\d.]+)/),
      d || (d = [0, 1, "13_0_0"]),
      c = !1),
      a && !T && (r.os = "android",
         r.android = !0),
      (d || u || g) && (r.os = "ios",
         r.ios = !0),
      r
}
function Le(e = {}) {
   return de || (de = qe(e)),
      de
}
let ce;
function We() {
   const e = _()
      , s = Le();
   let t = !1;
   function i() {
      const o = e.navigator.userAgent.toLowerCase();
      return o.indexOf("safari") >= 0 && o.indexOf("chrome") < 0 && o.indexOf("android") < 0
   }
   if (i()) {
      const o = String(e.navigator.userAgent);
      if (o.includes("Version/")) {
         const [a, d] = o.split("Version/")[1].split(" ")[0].split(".").map(g => Number(g));
         t = a < 16 || a === 16 && d < 2
      }
   }
   const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
      , r = i()
      , l = r || n && s.ios;
   return {
      isSafari: t || r,
      needPerspectiveFix: t,
      need3dFix: l,
      isWebView: n
   }
}
function Oe() {
   return ce || (ce = We()),
      ce
}
function Ye({ swiper: e, on: s, emit: t }) {
   const i = _();
   let n = null
      , r = null;
   const l = () => {
      !e || e.destroyed || !e.initialized || (t("beforeResize"),
         t("resize"))
   }
      , o = () => {
         !e || e.destroyed || !e.initialized || (n = new ResizeObserver(g => {
            r = i.requestAnimationFrame(() => {
               const { width: u, height: T } = e;
               let c = u
                  , h = T;
               g.forEach(({ contentBoxSize: y, contentRect: M, target: f }) => {
                  f && f !== e.el || (c = M ? M.width : (y[0] || y).inlineSize,
                     h = M ? M.height : (y[0] || y).blockSize)
               }
               ),
                  (c !== u || h !== T) && l()
            }
            )
         }
         ),
            n.observe(e.el))
      }
      , a = () => {
         r && i.cancelAnimationFrame(r),
            n && n.unobserve && e.el && (n.unobserve(e.el),
               n = null)
      }
      , d = () => {
         !e || e.destroyed || !e.initialized || t("orientationchange")
      }
      ;
   s("init", () => {
      if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
         o();
         return
      }
      i.addEventListener("resize", l),
         i.addEventListener("orientationchange", d)
   }
   ),
      s("destroy", () => {
         a(),
            i.removeEventListener("resize", l),
            i.removeEventListener("orientationchange", d)
      }
      )
}
function Xe({ swiper: e, extendParams: s, on: t, emit: i }) {
   const n = []
      , r = _()
      , l = (d, g = {}) => {
         const u = r.MutationObserver || r.WebkitMutationObserver
            , T = new u(c => {
               if (e.__preventObserver__)
                  return;
               if (c.length === 1) {
                  i("observerUpdate", c[0]);
                  return
               }
               const h = function () {
                  i("observerUpdate", c[0])
               };
               r.requestAnimationFrame ? r.requestAnimationFrame(h) : r.setTimeout(h, 0)
            }
            );
         T.observe(d, {
            attributes: typeof g.attributes > "u" ? !0 : g.attributes,
            childList: e.isElement || (typeof g.childList > "u" ? !0 : g).childList,
            characterData: typeof g.characterData > "u" ? !0 : g.characterData
         }),
            n.push(T)
      }
      , o = () => {
         if (e.params.observer) {
            if (e.params.observeParents) {
               const d = Pe(e.hostEl);
               for (let g = 0; g < d.length; g += 1)
                  l(d[g])
            }
            l(e.hostEl, {
               childList: e.params.observeSlideChildren
            }),
               l(e.wrapperEl, {
                  attributes: !1
               })
         }
      }
      , a = () => {
         n.forEach(d => {
            d.disconnect()
         }
         ),
            n.splice(0, n.length)
      }
      ;
   s({
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
   }),
      t("init", o),
      t("destroy", a)
}
var Ue = {
   on(e, s, t) {
      const i = this;
      if (!i.eventsListeners || i.destroyed || typeof s != "function")
         return i;
      const n = t ? "unshift" : "push";
      return e.split(" ").forEach(r => {
         i.eventsListeners[r] || (i.eventsListeners[r] = []),
            i.eventsListeners[r][n](s)
      }
      ),
         i
   },
   once(e, s, t) {
      const i = this;
      if (!i.eventsListeners || i.destroyed || typeof s != "function")
         return i;
      function n(...r) {
         i.off(e, n),
            n.__emitterProxy && delete n.__emitterProxy,
            s.apply(i, r)
      }
      return n.__emitterProxy = s,
         i.on(e, n, t)
   },
   onAny(e, s) {
      const t = this;
      if (!t.eventsListeners || t.destroyed || typeof e != "function")
         return t;
      const i = s ? "unshift" : "push";
      return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[i](e),
         t
   },
   offAny(e) {
      const s = this;
      if (!s.eventsListeners || s.destroyed || !s.eventsAnyListeners)
         return s;
      const t = s.eventsAnyListeners.indexOf(e);
      return t >= 0 && s.eventsAnyListeners.splice(t, 1),
         s
   },
   off(e, s) {
      const t = this;
      return !t.eventsListeners || t.destroyed || !t.eventsListeners || e.split(" ").forEach(i => {
         typeof s > "u" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach((n, r) => {
            (n === s || n.__emitterProxy && n.__emitterProxy === s) && t.eventsListeners[i].splice(r, 1)
         }
         )
      }
      ),
         t
   },
   emit(...e) {
      const s = this;
      if (!s.eventsListeners || s.destroyed || !s.eventsListeners)
         return s;
      let t, i, n;
      return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0],
         i = e.slice(1, e.length),
         n = s) : (t = e[0].events,
            i = e[0].data,
            n = e[0].context || s),
         i.unshift(n),
         (Array.isArray(t) ? t : t.split(" ")).forEach(l => {
            s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach(o => {
               o.apply(n, [l, ...i])
            }
            ),
               s.eventsListeners && s.eventsListeners[l] && s.eventsListeners[l].forEach(o => {
                  o.apply(n, i)
               }
               )
         }
         ),
         s
   }
};
function Ke() {
   const e = this;
   let s, t;
   const i = e.el;
   typeof e.params.width < "u" && e.params.width !== null ? s = e.params.width : s = i.clientWidth,
      typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = i.clientHeight,
      !(s === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (s = s - parseInt(X(i, "padding-left") || 0, 10) - parseInt(X(i, "padding-right") || 0, 10),
         t = t - parseInt(X(i, "padding-top") || 0, 10) - parseInt(X(i, "padding-bottom") || 0, 10),
         Number.isNaN(s) && (s = 0),
         Number.isNaN(t) && (t = 0),
         Object.assign(e, {
            width: s,
            height: t,
            size: e.isHorizontal() ? s : t
         }))
}
function Qe() {
   const e = this;
   function s(x, E) {
      return parseFloat(x.getPropertyValue(e.getDirectionLabel(E)) || 0)
   }
   const t = e.params
      , { wrapperEl: i, slidesEl: n, rtlTranslate: r, wrongRTL: l } = e
      , o = e.virtual && t.virtual.enabled
      , a = o ? e.virtual.slides.length : e.slides.length
      , d = R(n, `.${e.params.slideClass}, swiper-slide`)
      , g = o ? e.virtual.slides.length : d.length;
   let u = [];
   const T = []
      , c = [];
   let h = t.slidesOffsetBefore;
   typeof h == "function" && (h = t.slidesOffsetBefore.call(e));
   let y = t.slidesOffsetAfter;
   typeof y == "function" && (y = t.slidesOffsetAfter.call(e));
   const M = e.snapGrid.length
      , f = e.slidesGrid.length
      , p = e.size - h - y;
   let m = t.spaceBetween
      , v = -h
      , b = 0
      , P = 0;
   if (typeof p > "u")
      return;
   typeof m == "string" && m.indexOf("%") >= 0 ? m = parseFloat(m.replace("%", "")) / 100 * p : typeof m == "string" && (m = parseFloat(m)),
      e.virtualSize = -m - h - y,
      d.forEach(x => {
         r ? x.style.marginLeft = "" : x.style.marginRight = "",
            x.style.marginBottom = "",
            x.style.marginTop = ""
      }
      ),
      t.centeredSlides && t.cssMode && (te(i, "--swiper-centered-offset-before", ""),
         te(i, "--swiper-centered-offset-after", ""));
   const w = t.grid && t.grid.rows > 1 && e.grid;
   w ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
   let S;
   const A = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter(x => typeof t.breakpoints[x].slidesPerView < "u").length > 0;
   for (let x = 0; x < g; x += 1) {
      S = 0;
      const E = d[x];
      if (!(E && (w && e.grid.updateSlide(x, E, d),
         X(E, "display") === "none"))) {
         if (o && t.slidesPerView === "auto")
            t.virtual.slidesPerViewAutoSlideSize && (S = t.virtual.slidesPerViewAutoSlideSize),
               S && E && (t.roundLengths && (S = Math.floor(S)),
                  E.style[e.getDirectionLabel("width")] = `${S}px`);
         else if (t.slidesPerView === "auto") {
            A && (E.style[e.getDirectionLabel("width")] = "");
            const C = getComputedStyle(E)
               , z = E.style.transform
               , D = E.style.webkitTransform;
            if (z && (E.style.transform = "none"),
               D && (E.style.webkitTransform = "none"),
               t.roundLengths)
               S = e.isHorizontal() ? he(E, "width") : he(E, "height");
            else {
               const L = s(C, "width")
                  , G = s(C, "padding-left")
                  , O = s(C, "padding-right")
                  , I = s(C, "margin-left")
                  , $ = s(C, "margin-right")
                  , B = C.getPropertyValue("box-sizing");
               if (B && B === "border-box")
                  S = L + I + $;
               else {
                  const { clientWidth: F, offsetWidth: q } = E;
                  S = L + G + O + I + $ + (q - F)
               }
            }
            z && (E.style.transform = z),
               D && (E.style.webkitTransform = D),
               t.roundLengths && (S = Math.floor(S))
         } else
            S = (p - (t.slidesPerView - 1) * m) / t.slidesPerView,
               t.roundLengths && (S = Math.floor(S)),
               E && (E.style[e.getDirectionLabel("width")] = `${S}px`);
         E && (E.swiperSlideSize = S),
            c.push(S),
            t.centeredSlides ? (v = v + S / 2 + b / 2 + m,
               b === 0 && x !== 0 && (v = v - p / 2 - m),
               x === 0 && (v = v - p / 2 - m),
               Math.abs(v) < 1 / 1e3 && (v = 0),
               t.roundLengths && (v = Math.floor(v)),
               P % t.slidesPerGroup === 0 && u.push(v),
               T.push(v)) : (t.roundLengths && (v = Math.floor(v)),
                  (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup === 0 && u.push(v),
                  T.push(v),
                  v = v + S + m),
            e.virtualSize += S + m,
            b = S,
            P += 1
      }
   }
   if (e.virtualSize = Math.max(e.virtualSize, p) + y,
      r && l && (t.effect === "slide" || t.effect === "coverflow") && (i.style.width = `${e.virtualSize + m}px`),
      t.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + m}px`),
      w && e.grid.updateWrapperSize(S, u),
      !t.centeredSlides) {
      const x = [];
      for (let E = 0; E < u.length; E += 1) {
         let C = u[E];
         t.roundLengths && (C = Math.floor(C)),
            u[E] <= e.virtualSize - p && x.push(C)
      }
      u = x,
         Math.floor(e.virtualSize - p) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - p)
   }
   if (o && t.loop) {
      const x = c[0] + m;
      if (t.slidesPerGroup > 1) {
         const E = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup)
            , C = x * t.slidesPerGroup;
         for (let z = 0; z < E; z += 1)
            u.push(u[u.length - 1] + C)
      }
      for (let E = 0; E < e.virtual.slidesBefore + e.virtual.slidesAfter; E += 1)
         t.slidesPerGroup === 1 && u.push(u[u.length - 1] + x),
            T.push(T[T.length - 1] + x),
            e.virtualSize += x
   }
   if (u.length === 0 && (u = [0]),
      m !== 0) {
      const x = e.isHorizontal() && r ? "marginLeft" : e.getDirectionLabel("marginRight");
      d.filter((E, C) => !t.cssMode || t.loop ? !0 : C !== d.length - 1).forEach(E => {
         E.style[x] = `${m}px`
      }
      )
   }
   if (t.centeredSlides && t.centeredSlidesBounds) {
      let x = 0;
      c.forEach(C => {
         x += C + (m || 0)
      }
      ),
         x -= m;
      const E = x > p ? x - p : 0;
      u = u.map(C => C <= 0 ? -h : C > E ? E + y : C)
   }
   if (t.centerInsufficientSlides) {
      let x = 0;
      c.forEach(C => {
         x += C + (m || 0)
      }
      ),
         x -= m;
      const E = (h || 0) + (y || 0);
      if (x + E < p) {
         const C = (p - x - E) / 2;
         u.forEach((z, D) => {
            u[D] = z - C
         }
         ),
            T.forEach((z, D) => {
               T[D] = z + C
            }
            )
      }
   }
   if (Object.assign(e, {
      slides: d,
      snapGrid: u,
      slidesGrid: T,
      slidesSizesGrid: c
   }),
      t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
      te(i, "--swiper-centered-offset-before", `${-u[0]}px`),
         te(i, "--swiper-centered-offset-after", `${e.size / 2 - c[c.length - 1] / 2}px`);
      const x = -e.snapGrid[0]
         , E = -e.slidesGrid[0];
      e.snapGrid = e.snapGrid.map(C => C + x),
         e.slidesGrid = e.slidesGrid.map(C => C + E)
   }
   if (g !== a && e.emit("slidesLengthChange"),
      u.length !== M && (e.params.watchOverflow && e.checkOverflow(),
         e.emit("snapGridLengthChange")),
      T.length !== f && e.emit("slidesGridLengthChange"),
      t.watchSlidesProgress && e.updateSlidesOffset(),
      e.emit("slidesUpdated"),
      !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
      const x = `${t.containerModifierClass}backface-hidden`
         , E = e.el.classList.contains(x);
      g <= t.maxBackfaceHiddenSlides ? E || e.el.classList.add(x) : E && e.el.classList.remove(x)
   }
}
function Je(e) {
   const s = this
      , t = []
      , i = s.virtual && s.params.virtual.enabled;
   let n = 0, r;
   typeof e == "number" ? s.setTransition(e) : e === !0 && s.setTransition(s.params.speed);
   const l = o => i ? s.slides[s.getSlideIndexByData(o)] : s.slides[o];
   if (s.params.slidesPerView !== "auto" && s.params.slidesPerView > 1)
      if (s.params.centeredSlides)
         (s.visibleSlides || []).forEach(o => {
            t.push(o)
         }
         );
      else
         for (r = 0; r < Math.ceil(s.params.slidesPerView); r += 1) {
            const o = s.activeIndex + r;
            if (o > s.slides.length && !i)
               break;
            t.push(l(o))
         }
   else
      t.push(l(s.activeIndex));
   for (r = 0; r < t.length; r += 1)
      if (typeof t[r] < "u") {
         const o = t[r].offsetHeight;
         n = o > n ? o : n
      }
   (n || n === 0) && (s.wrapperEl.style.height = `${n}px`)
}
function Ze() {
   const e = this
      , s = e.slides
      , t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
   for (let i = 0; i < s.length; i += 1)
      s[i].swiperSlideOffset = (e.isHorizontal() ? s[i].offsetLeft : s[i].offsetTop) - t - e.cssOverflowAdjustment()
}
const Se = (e, s, t) => {
   s && !e.classList.contains(t) ? e.classList.add(t) : !s && e.classList.contains(t) && e.classList.remove(t)
}
   ;
function et(e = this && this.translate || 0) {
   const s = this
      , t = s.params
      , { slides: i, rtlTranslate: n, snapGrid: r } = s;
   if (i.length === 0)
      return;
   typeof i[0].swiperSlideOffset > "u" && s.updateSlidesOffset();
   let l = -e;
   n && (l = e),
      s.visibleSlidesIndexes = [],
      s.visibleSlides = [];
   let o = t.spaceBetween;
   typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * s.size : typeof o == "string" && (o = parseFloat(o));
   for (let a = 0; a < i.length; a += 1) {
      const d = i[a];
      let g = d.swiperSlideOffset;
      t.cssMode && t.centeredSlides && (g -= i[0].swiperSlideOffset);
      const u = (l + (t.centeredSlides ? s.minTranslate() : 0) - g) / (d.swiperSlideSize + o)
         , T = (l - r[0] + (t.centeredSlides ? s.minTranslate() : 0) - g) / (d.swiperSlideSize + o)
         , c = -(l - g)
         , h = c + s.slidesSizesGrid[a]
         , y = c >= 0 && c <= s.size - s.slidesSizesGrid[a]
         , M = c >= 0 && c < s.size - 1 || h > 1 && h <= s.size || c <= 0 && h >= s.size;
      M && (s.visibleSlides.push(d),
         s.visibleSlidesIndexes.push(a)),
         Se(d, M, t.slideVisibleClass),
         Se(d, y, t.slideFullyVisibleClass),
         d.progress = n ? -u : u,
         d.originalProgress = n ? -T : T
   }
}
function tt(e) {
   const s = this;
   if (typeof e > "u") {
      const g = s.rtlTranslate ? -1 : 1;
      e = s && s.translate && s.translate * g || 0
   }
   const t = s.params
      , i = s.maxTranslate() - s.minTranslate();
   let { progress: n, isBeginning: r, isEnd: l, progressLoop: o } = s;
   const a = r
      , d = l;
   if (i === 0)
      n = 0,
         r = !0,
         l = !0;
   else {
      n = (e - s.minTranslate()) / i;
      const g = Math.abs(e - s.minTranslate()) < 1
         , u = Math.abs(e - s.maxTranslate()) < 1;
      r = g || n <= 0,
         l = u || n >= 1,
         g && (n = 0),
         u && (n = 1)
   }
   if (t.loop) {
      const g = s.getSlideIndexByData(0)
         , u = s.getSlideIndexByData(s.slides.length - 1)
         , T = s.slidesGrid[g]
         , c = s.slidesGrid[u]
         , h = s.slidesGrid[s.slidesGrid.length - 1]
         , y = Math.abs(e);
      y >= T ? o = (y - T) / h : o = (y + h - c) / h,
         o > 1 && (o -= 1)
   }
   Object.assign(s, {
      progress: n,
      progressLoop: o,
      isBeginning: r,
      isEnd: l
   }),
      (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && s.updateSlidesProgress(e),
      r && !a && s.emit("reachBeginning toEdge"),
      l && !d && s.emit("reachEnd toEdge"),
      (a && !r || d && !l) && s.emit("fromEdge"),
      s.emit("progress", n)
}
const fe = (e, s, t) => {
   s && !e.classList.contains(t) ? e.classList.add(t) : !s && e.classList.contains(t) && e.classList.remove(t)
}
   ;
function st() {
   const e = this
      , { slides: s, params: t, slidesEl: i, activeIndex: n } = e
      , r = e.virtual && t.virtual.enabled
      , l = e.grid && t.grid && t.grid.rows > 1
      , o = u => R(i, `.${t.slideClass}${u}, swiper-slide${u}`)[0];
   let a, d, g;
   if (r)
      if (t.loop) {
         let u = n - e.virtual.slidesBefore;
         u < 0 && (u = e.virtual.slides.length + u),
            u >= e.virtual.slides.length && (u -= e.virtual.slides.length),
            a = o(`[data-swiper-slide-index="${u}"]`)
      } else
         a = o(`[data-swiper-slide-index="${n}"]`);
   else
      l ? (a = s.find(u => u.column === n),
         g = s.find(u => u.column === n + 1),
         d = s.find(u => u.column === n - 1)) : a = s[n];
   a && (l || (g = He(a, `.${t.slideClass}, swiper-slide`)[0],
      t.loop && !g && (g = s[0]),
      d = Ne(a, `.${t.slideClass}, swiper-slide`)[0],
      t.loop && !d === 0 && (d = s[s.length - 1]))),
      s.forEach(u => {
         fe(u, u === a, t.slideActiveClass),
            fe(u, u === g, t.slideNextClass),
            fe(u, u === d, t.slidePrevClass)
      }
      ),
      e.emitSlidesClasses()
}
const ie = (e, s) => {
   if (!e || e.destroyed || !e.params)
      return;
   const t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      , i = s.closest(t());
   if (i) {
      let n = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      !n && e.isElement && (i.shadowRoot ? n = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
         i.shadowRoot && (n = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
            n && n.remove())
      }
      )),
         n && n.remove()
   }
}
   , ue = (e, s) => {
      if (!e.slides[s])
         return;
      const t = e.slides[s].querySelector('[loading="lazy"]');
      t && t.removeAttribute("loading")
   }
   , ge = e => {
      if (!e || e.destroyed || !e.params)
         return;
      let s = e.params.lazyPreloadPrevNext;
      const t = e.slides.length;
      if (!t || !s || s < 0)
         return;
      s = Math.min(s, t);
      const i = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
         , n = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
         const l = n
            , o = [l - s];
         o.push(...Array.from({
            length: s
         }).map((a, d) => l + i + d)),
            e.slides.forEach((a, d) => {
               o.includes(a.column) && ue(e, d)
            }
            );
         return
      }
      const r = n + i - 1;
      if (e.params.rewind || e.params.loop)
         for (let l = n - s; l <= r + s; l += 1) {
            const o = (l % t + t) % t;
            (o < n || o > r) && ue(e, o)
         }
      else
         for (let l = Math.max(n - s, 0); l <= Math.min(r + s, t - 1); l += 1)
            l !== n && (l > r || l < n) && ue(e, l)
   }
   ;
function it(e) {
   const { slidesGrid: s, params: t } = e
      , i = e.rtlTranslate ? e.translate : -e.translate;
   let n;
   for (let r = 0; r < s.length; r += 1)
      typeof s[r + 1] < "u" ? i >= s[r] && i < s[r + 1] - (s[r + 1] - s[r]) / 2 ? n = r : i >= s[r] && i < s[r + 1] && (n = r + 1) : i >= s[r] && (n = r);
   return t.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0),
      n
}
function nt(e) {
   const s = this
      , t = s.rtlTranslate ? s.translate : -s.translate
      , { snapGrid: i, params: n, activeIndex: r, realIndex: l, snapIndex: o } = s;
   let a = e, d;
   const g = c => {
      let h = c - s.virtual.slidesBefore;
      return h < 0 && (h = s.virtual.slides.length + h),
         h >= s.virtual.slides.length && (h -= s.virtual.slides.length),
         h
   }
      ;
   if (typeof a > "u" && (a = it(s)),
      i.indexOf(t) >= 0)
      d = i.indexOf(t);
   else {
      const c = Math.min(n.slidesPerGroupSkip, a);
      d = c + Math.floor((a - c) / n.slidesPerGroup)
   }
   if (d >= i.length && (d = i.length - 1),
      a === r && !s.params.loop) {
      d !== o && (s.snapIndex = d,
         s.emit("snapIndexChange"));
      return
   }
   if (a === r && s.params.loop && s.virtual && s.params.virtual.enabled) {
      s.realIndex = g(a);
      return
   }
   const u = s.grid && n.grid && n.grid.rows > 1;
   let T;
   if (s.virtual && n.virtual.enabled && n.loop)
      T = g(a);
   else if (u) {
      const c = s.slides.find(y => y.column === a);
      let h = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
      Number.isNaN(h) && (h = Math.max(s.slides.indexOf(c), 0)),
         T = Math.floor(h / n.grid.rows)
   } else if (s.slides[a]) {
      const c = s.slides[a].getAttribute("data-swiper-slide-index");
      c ? T = parseInt(c, 10) : T = a
   } else
      T = a;
   Object.assign(s, {
      previousSnapIndex: o,
      snapIndex: d,
      previousRealIndex: l,
      realIndex: T,
      previousIndex: r,
      activeIndex: a
   }),
      s.initialized && ge(s),
      s.emit("activeIndexChange"),
      s.emit("snapIndexChange"),
      (s.initialized || s.params.runCallbacksOnInit) && (l !== T && s.emit("realIndexChange"),
         s.emit("slideChange"))
}
function rt(e, s) {
   const t = this
      , i = t.params;
   let n = e.closest(`.${i.slideClass}, swiper-slide`);
   !n && t.isElement && s && s.length > 1 && s.includes(e) && [...s.slice(s.indexOf(e) + 1, s.length)].forEach(o => {
      !n && o.matches && o.matches(`.${i.slideClass}, swiper-slide`) && (n = o)
   }
   );
   let r = !1, l;
   if (n) {
      for (let o = 0; o < t.slides.length; o += 1)
         if (t.slides[o] === n) {
            r = !0,
               l = o;
            break
         }
   }
   if (n && r)
      t.clickedSlide = n,
         t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = l;
   else {
      t.clickedSlide = void 0,
         t.clickedIndex = void 0;
      return
   }
   i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var at = {
   updateSize: Ke,
   updateSlides: Qe,
   updateAutoHeight: Je,
   updateSlidesOffset: Ze,
   updateSlidesProgress: et,
   updateProgress: tt,
   updateSlidesClasses: st,
   updateActiveIndex: nt,
   updateClickedSlide: rt
};
function lt(e = this.isHorizontal() ? "x" : "y") {
   const s = this
      , { params: t, rtlTranslate: i, translate: n, wrapperEl: r } = s;
   if (t.virtualTranslate)
      return i ? -n : n;
   if (t.cssMode)
      return n;
   let l = Be(r, e);
   return l += s.cssOverflowAdjustment(),
      i && (l = -l),
      l || 0
}
function ot(e, s) {
   const t = this
      , { rtlTranslate: i, params: n, wrapperEl: r, progress: l } = t;
   let o = 0
      , a = 0;
   const d = 0;
   t.isHorizontal() ? o = i ? -e : e : a = e,
      n.roundLengths && (o = Math.floor(o),
         a = Math.floor(a)),
      t.previousTranslate = t.translate,
      t.translate = t.isHorizontal() ? o : a,
      n.cssMode ? r[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -o : -a : n.virtualTranslate || (t.isHorizontal() ? o -= t.cssOverflowAdjustment() : a -= t.cssOverflowAdjustment(),
         r.style.transform = `translate3d(${o}px, ${a}px, ${d}px)`);
   let g;
   const u = t.maxTranslate() - t.minTranslate();
   u === 0 ? g = 0 : g = (e - t.minTranslate()) / u,
      g !== l && t.updateProgress(e),
      t.emit("setTranslate", t.translate, s)
}
function dt() {
   return -this.snapGrid[0]
}
function ct() {
   return -this.snapGrid[this.snapGrid.length - 1]
}
function ft(e = 0, s = this.params.speed, t = !0, i = !0, n) {
   const r = this
      , { params: l, wrapperEl: o } = r;
   if (r.animating && l.preventInteractionOnTransition)
      return !1;
   const a = r.minTranslate()
      , d = r.maxTranslate();
   let g;
   if (i && e > a ? g = a : i && e < d ? g = d : g = e,
      r.updateProgress(g),
      l.cssMode) {
      const u = r.isHorizontal();
      if (s === 0)
         o[u ? "scrollLeft" : "scrollTop"] = -g;
      else {
         if (!r.support.smoothScroll)
            return we({
               swiper: r,
               targetPosition: -g,
               side: u ? "left" : "top"
            }),
               !0;
         o.scrollTo({
            [u ? "left" : "top"]: -g,
            behavior: "smooth"
         })
      }
      return !0
   }
   return s === 0 ? (r.setTransition(0),
      r.setTranslate(g),
      t && (r.emit("beforeTransitionStart", s, n),
         r.emit("transitionEnd"))) : (r.setTransition(s),
            r.setTranslate(g),
            t && (r.emit("beforeTransitionStart", s, n),
               r.emit("transitionStart")),
            r.animating || (r.animating = !0,
               r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (T) {
                  !r || r.destroyed || T.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                     r.onTranslateToWrapperTransitionEnd = null,
                     delete r.onTranslateToWrapperTransitionEnd,
                     r.animating = !1,
                     t && r.emit("transitionEnd"))
               }
               ),
               r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))),
      !0
}
var ut = {
   getTranslate: lt,
   setTranslate: ot,
   minTranslate: dt,
   maxTranslate: ct,
   translateTo: ft
};
function pt(e, s) {
   const t = this;
   t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${e}ms`,
      t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""),
      t.emit("setTransition", e, s)
}
function Ae({ swiper: e, runCallbacks: s, direction: t, step: i }) {
   const { activeIndex: n, previousIndex: r } = e;
   let l = t;
   l || (n > r ? l = "next" : n < r ? l = "prev" : l = "reset"),
      e.emit(`transition${i}`),
      s && l === "reset" ? e.emit(`slideResetTransition${i}`) : s && n !== r && (e.emit(`slideChangeTransition${i}`),
         l === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`))
}
function mt(e = !0, s) {
   const t = this
      , { params: i } = t;
   i.cssMode || (i.autoHeight && t.updateAutoHeight(),
      Ae({
         swiper: t,
         runCallbacks: e,
         direction: s,
         step: "Start"
      }))
}
function ht(e = !0, s) {
   const t = this
      , { params: i } = t;
   t.animating = !1,
      !i.cssMode && (t.setTransition(0),
         Ae({
            swiper: t,
            runCallbacks: e,
            direction: s,
            step: "End"
         }))
}
var gt = {
   setTransition: pt,
   transitionStart: mt,
   transitionEnd: ht
};
function vt(e = 0, s, t = !0, i, n) {
   typeof e == "string" && (e = parseInt(e, 10));
   const r = this;
   let l = e;
   l < 0 && (l = 0);
   const { params: o, snapGrid: a, slidesGrid: d, previousIndex: g, activeIndex: u, rtlTranslate: T, wrapperEl: c, enabled: h } = r;
   if (!h && !i && !n || r.destroyed || r.animating && o.preventInteractionOnTransition)
      return !1;
   typeof s > "u" && (s = r.params.speed);
   const y = Math.min(r.params.slidesPerGroupSkip, l);
   let M = y + Math.floor((l - y) / r.params.slidesPerGroup);
   M >= a.length && (M = a.length - 1);
   const f = -a[M];
   if (o.normalizeSlideIndex)
      for (let w = 0; w < d.length; w += 1) {
         const S = -Math.floor(f * 100)
            , A = Math.floor(d[w] * 100)
            , x = Math.floor(d[w + 1] * 100);
         typeof d[w + 1] < "u" ? S >= A && S < x - (x - A) / 2 ? l = w : S >= A && S < x && (l = w + 1) : S >= A && (l = w)
      }
   if (r.initialized && l !== u && (!r.allowSlideNext && (T ? f > r.translate && f > r.minTranslate() : f < r.translate && f < r.minTranslate()) || !r.allowSlidePrev && f > r.translate && f > r.maxTranslate() && (u || 0) !== l))
      return !1;
   l !== (g || 0) && t && r.emit("beforeSlideChangeStart"),
      r.updateProgress(f);
   let p;
   l > u ? p = "next" : l < u ? p = "prev" : p = "reset";
   const m = r.virtual && r.params.virtual.enabled;
   if (!(m && n) && (T && -f === r.translate || !T && f === r.translate))
      return r.updateActiveIndex(l),
         o.autoHeight && r.updateAutoHeight(),
         r.updateSlidesClasses(),
         o.effect !== "slide" && r.setTranslate(f),
         p !== "reset" && (r.transitionStart(t, p),
            r.transitionEnd(t, p)),
         !1;
   if (o.cssMode) {
      const w = r.isHorizontal()
         , S = T ? f : -f;
      if (s === 0)
         m && (r.wrapperEl.style.scrollSnapType = "none",
            r._immediateVirtual = !0),
            m && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0,
               requestAnimationFrame(() => {
                  c[w ? "scrollLeft" : "scrollTop"] = S
               }
               )) : c[w ? "scrollLeft" : "scrollTop"] = S,
            m && requestAnimationFrame(() => {
               r.wrapperEl.style.scrollSnapType = "",
                  r._immediateVirtual = !1
            }
            );
      else {
         if (!r.support.smoothScroll)
            return we({
               swiper: r,
               targetPosition: S,
               side: w ? "left" : "top"
            }),
               !0;
         c.scrollTo({
            [w ? "left" : "top"]: S,
            behavior: "smooth"
         })
      }
      return !0
   }
   const P = Oe().isSafari;
   return m && !n && P && r.isElement && r.virtual.update(!1, !1, l),
      r.setTransition(s),
      r.setTranslate(f),
      r.updateActiveIndex(l),
      r.updateSlidesClasses(),
      r.emit("beforeTransitionStart", s, i),
      r.transitionStart(t, p),
      s === 0 ? r.transitionEnd(t, p) : r.animating || (r.animating = !0,
         r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (S) {
            !r || r.destroyed || S.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
               r.onSlideToWrapperTransitionEnd = null,
               delete r.onSlideToWrapperTransitionEnd,
               r.transitionEnd(t, p))
         }
         ),
         r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)),
      !0
}
function yt(e = 0, s, t = !0, i) {
   typeof e == "string" && (e = parseInt(e, 10));
   const n = this;
   if (n.destroyed)
      return;
   typeof s > "u" && (s = n.params.speed);
   const r = n.grid && n.params.grid && n.params.grid.rows > 1;
   let l = e;
   if (n.params.loop)
      if (n.virtual && n.params.virtual.enabled)
         l = l + n.virtual.slidesBefore;
      else {
         let o;
         if (r) {
            const y = l * n.params.grid.rows;
            o = n.slides.find(M => M.getAttribute("data-swiper-slide-index") * 1 === y).column
         } else
            o = n.getSlideIndexByData(l);
         const a = r ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length
            , { centeredSlides: d, slidesOffsetBefore: g, slidesOffsetAfter: u } = n.params
            , T = d || !!g || !!u;
         let c = n.params.slidesPerView;
         c === "auto" ? c = n.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(n.params.slidesPerView, 10)),
            T && c % 2 === 0 && (c = c + 1));
         let h = a - o < c;
         if (T && (h = h || o < Math.ceil(c / 2)),
            i && T && n.params.slidesPerView !== "auto" && !r && (h = !1),
            h) {
            const y = T ? o < n.activeIndex ? "prev" : "next" : o - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
            n.loopFix({
               direction: y,
               slideTo: !0,
               activeSlideIndex: y === "next" ? o + 1 : o - a + 1,
               slideRealIndex: y === "next" ? n.realIndex : void 0
            })
         }
         if (r) {
            const y = l * n.params.grid.rows;
            l = n.slides.find(M => M.getAttribute("data-swiper-slide-index") * 1 === y).column
         } else
            l = n.getSlideIndexByData(l)
      }
   return requestAnimationFrame(() => {
      n.slideTo(l, s, t, i)
   }
   ),
      n
}
function St(e, s = !0, t) {
   const i = this
      , { enabled: n, params: r, animating: l } = i;
   if (!n || i.destroyed)
      return i;
   typeof e > "u" && (e = i.params.speed);
   let o = r.slidesPerGroup;
   r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
   const a = i.activeIndex < r.slidesPerGroupSkip ? 1 : o
      , d = i.virtual && r.virtual.enabled;
   if (r.loop) {
      if (l && !d && r.loopPreventsSliding)
         return !1;
      if (i.loopFix({
         direction: "next"
      }),
         i._clientLeft = i.wrapperEl.clientLeft,
         i.activeIndex === i.slides.length - 1 && r.cssMode)
         return requestAnimationFrame(() => {
            i.slideTo(i.activeIndex + a, e, s, t)
         }
         ),
            !0
   }
   return r.rewind && i.isEnd ? i.slideTo(0, e, s, t) : i.slideTo(i.activeIndex + a, e, s, t)
}
function bt(e, s = !0, t) {
   const i = this
      , { params: n, snapGrid: r, slidesGrid: l, rtlTranslate: o, enabled: a, animating: d } = i;
   if (!a || i.destroyed)
      return i;
   typeof e > "u" && (e = i.params.speed);
   const g = i.virtual && n.virtual.enabled;
   if (n.loop) {
      if (d && !g && n.loopPreventsSliding)
         return !1;
      i.loopFix({
         direction: "prev"
      }),
         i._clientLeft = i.wrapperEl.clientLeft
   }
   const u = o ? i.translate : -i.translate;
   function T(p) {
      return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p)
   }
   const c = T(u)
      , h = r.map(p => T(p))
      , y = n.freeMode && n.freeMode.enabled;
   let M = r[h.indexOf(c) - 1];
   if (typeof M > "u" && (n.cssMode || y)) {
      let p;
      r.forEach((m, v) => {
         c >= m && (p = v)
      }
      ),
         typeof p < "u" && (M = y ? r[p] : r[p > 0 ? p - 1 : p])
   }
   let f = 0;
   if (typeof M < "u" && (f = l.indexOf(M),
      f < 0 && (f = i.activeIndex - 1),
      n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1,
         f = Math.max(f, 0))),
      n.rewind && i.isBeginning) {
      const p = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
      return i.slideTo(p, e, s, t)
   } else if (n.loop && i.activeIndex === 0 && n.cssMode)
      return requestAnimationFrame(() => {
         i.slideTo(f, e, s, t)
      }
      ),
         !0;
   return i.slideTo(f, e, s, t)
}
function Tt(e, s = !0, t) {
   const i = this;
   if (!i.destroyed)
      return typeof e > "u" && (e = i.params.speed),
         i.slideTo(i.activeIndex, e, s, t)
}
function xt(e, s = !0, t, i = .5) {
   const n = this;
   if (n.destroyed)
      return;
   typeof e > "u" && (e = n.params.speed);
   let r = n.activeIndex;
   const l = Math.min(n.params.slidesPerGroupSkip, r)
      , o = l + Math.floor((r - l) / n.params.slidesPerGroup)
      , a = n.rtlTranslate ? n.translate : -n.translate;
   if (a >= n.snapGrid[o]) {
      const d = n.snapGrid[o]
         , g = n.snapGrid[o + 1];
      a - d > (g - d) * i && (r += n.params.slidesPerGroup)
   } else {
      const d = n.snapGrid[o - 1]
         , g = n.snapGrid[o];
      a - d <= (g - d) * i && (r -= n.params.slidesPerGroup)
   }
   return r = Math.max(r, 0),
      r = Math.min(r, n.slidesGrid.length - 1),
      n.slideTo(r, e, s, t)
}
function Et() {
   const e = this;
   if (e.destroyed)
      return;
   const { params: s, slidesEl: t } = e
      , i = s.slidesPerView === "auto" ? e.slidesPerViewDynamic() : s.slidesPerView;
   let n = e.getSlideIndexWhenGrid(e.clickedIndex), r;
   const l = e.isElement ? "swiper-slide" : `.${s.slideClass}`
      , o = e.grid && e.params.grid && e.params.grid.rows > 1;
   if (s.loop) {
      if (e.animating)
         return;
      r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
         s.centeredSlides ? e.slideToLoop(r) : n > (o ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1) : e.slides.length - i) ? (e.loopFix(),
            n = e.getSlideIndex(R(t, `${l}[data-swiper-slide-index="${r}"]`)[0]),
            Ce(() => {
               e.slideTo(n)
            }
            )) : e.slideTo(n)
   } else
      e.slideTo(n)
}
var Mt = {
   slideTo: vt,
   slideToLoop: yt,
   slideNext: St,
   slidePrev: bt,
   slideReset: Tt,
   slideToClosest: xt,
   slideToClickedSlide: Et
};
function Ct(e, s) {
   const t = this
      , { params: i, slidesEl: n } = t;
   if (!i.loop || t.virtual && t.params.virtual.enabled)
      return;
   const r = () => {
      R(n, `.${i.slideClass}, swiper-slide`).forEach((h, y) => {
         h.setAttribute("data-swiper-slide-index", y)
      }
      )
   }
      , l = () => {
         const c = R(n, `.${i.slideBlankClass}`);
         c.forEach(h => {
            h.remove()
         }
         ),
            c.length > 0 && (t.recalcSlides(),
               t.updateSlides())
      }
      , o = t.grid && i.grid && i.grid.rows > 1;
   i.loopAddBlankSlides && (i.slidesPerGroup > 1 || o) && l();
   const a = i.slidesPerGroup * (o ? i.grid.rows : 1)
      , d = t.slides.length % a !== 0
      , g = o && t.slides.length % i.grid.rows !== 0
      , u = c => {
         for (let h = 0; h < c; h += 1) {
            const y = t.isElement ? J("swiper-slide", [i.slideBlankClass]) : J("div", [i.slideClass, i.slideBlankClass]);
            t.slidesEl.append(y)
         }
      }
      ;
   if (d) {
      if (i.loopAddBlankSlides) {
         const c = a - t.slides.length % a;
         u(c),
            t.recalcSlides(),
            t.updateSlides()
      } else
         re("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      r()
   } else if (g) {
      if (i.loopAddBlankSlides) {
         const c = i.grid.rows - t.slides.length % i.grid.rows;
         u(c),
            t.recalcSlides(),
            t.updateSlides()
      } else
         re("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      r()
   } else
      r();
   const T = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
   t.loopFix({
      slideRealIndex: e,
      direction: T ? void 0 : "next",
      initial: s
   })
}
function wt({ slideRealIndex: e, slideTo: s = !0, direction: t, setTranslate: i, activeSlideIndex: n, initial: r, byController: l, byMousewheel: o } = {}) {
   const a = this;
   if (!a.params.loop)
      return;
   a.emit("beforeLoopFix");
   const { slides: d, allowSlidePrev: g, allowSlideNext: u, slidesEl: T, params: c } = a
      , { centeredSlides: h, slidesOffsetBefore: y, slidesOffsetAfter: M, initialSlide: f } = c
      , p = h || !!y || !!M;
   if (a.allowSlidePrev = !0,
      a.allowSlideNext = !0,
      a.virtual && c.virtual.enabled) {
      s && (!p && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : p && a.snapIndex < c.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
         a.allowSlidePrev = g,
         a.allowSlideNext = u,
         a.emit("loopFix");
      return
   }
   let m = c.slidesPerView;
   m === "auto" ? m = a.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(c.slidesPerView, 10)),
      p && m % 2 === 0 && (m = m + 1));
   const v = c.slidesPerGroupAuto ? m : c.slidesPerGroup;
   let b = p ? Math.max(v, Math.ceil(m / 2)) : v;
   b % v !== 0 && (b += v - b % v),
      b += c.loopAdditionalSlides,
      a.loopedSlides = b;
   const P = a.grid && c.grid && c.grid.rows > 1;
   d.length < m + b || a.params.effect === "cards" && d.length < m + b * 2 ? re("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : P && c.grid.fill === "row" && re("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
   const w = []
      , S = []
      , A = P ? Math.ceil(d.length / c.grid.rows) : d.length
      , x = r && A - f < m && !p;
   let E = x ? f : a.activeIndex;
   typeof n > "u" ? n = a.getSlideIndex(d.find(I => I.classList.contains(c.slideActiveClass))) : E = n;
   const C = t === "next" || !t
      , z = t === "prev" || !t;
   let D = 0
      , L = 0;
   const O = (P ? d[n].column : n) + (p && typeof i > "u" ? -m / 2 + .5 : 0);
   if (O < b) {
      D = Math.max(b - O, v);
      for (let I = 0; I < b - O; I += 1) {
         const $ = I - Math.floor(I / A) * A;
         if (P) {
            const B = A - $ - 1;
            for (let F = d.length - 1; F >= 0; F -= 1)
               d[F].column === B && w.push(F)
         } else
            w.push(A - $ - 1)
      }
   } else if (O + m > A - b) {
      L = Math.max(O - (A - b * 2), v),
         x && (L = Math.max(L, m - A + f + 1));
      for (let I = 0; I < L; I += 1) {
         const $ = I - Math.floor(I / A) * A;
         P ? d.forEach((B, F) => {
            B.column === $ && S.push(F)
         }
         ) : S.push($)
      }
   }
   if (a.__preventObserver__ = !0,
      requestAnimationFrame(() => {
         a.__preventObserver__ = !1
      }
      ),
      a.params.effect === "cards" && d.length < m + b * 2 && (S.includes(n) && S.splice(S.indexOf(n), 1),
         w.includes(n) && w.splice(w.indexOf(n), 1)),
      z && w.forEach(I => {
         d[I].swiperLoopMoveDOM = !0,
            T.prepend(d[I]),
            d[I].swiperLoopMoveDOM = !1
      }
      ),
      C && S.forEach(I => {
         d[I].swiperLoopMoveDOM = !0,
            T.append(d[I]),
            d[I].swiperLoopMoveDOM = !1
      }
      ),
      a.recalcSlides(),
      c.slidesPerView === "auto" ? a.updateSlides() : P && (w.length > 0 && z || S.length > 0 && C) && a.slides.forEach((I, $) => {
         a.grid.updateSlide($, I, a.slides)
      }
      ),
      c.watchSlidesProgress && a.updateSlidesOffset(),
      s) {
      if (w.length > 0 && z) {
         if (typeof e > "u") {
            const I = a.slidesGrid[E]
               , B = a.slidesGrid[E + D] - I;
            o ? a.setTranslate(a.translate - B) : (a.slideTo(E + Math.ceil(D), 0, !1, !0),
               i && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - B,
                  a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - B))
         } else if (i) {
            const I = P ? w.length / c.grid.rows : w.length;
            a.slideTo(a.activeIndex + I, 0, !1, !0),
               a.touchEventsData.currentTranslate = a.translate
         }
      } else if (S.length > 0 && C)
         if (typeof e > "u") {
            const I = a.slidesGrid[E]
               , B = a.slidesGrid[E - L] - I;
            o ? a.setTranslate(a.translate - B) : (a.slideTo(E - L, 0, !1, !0),
               i && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - B,
                  a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - B))
         } else {
            const I = P ? S.length / c.grid.rows : S.length;
            a.slideTo(a.activeIndex - I, 0, !1, !0)
         }
   }
   if (a.allowSlidePrev = g,
      a.allowSlideNext = u,
      a.controller && a.controller.control && !l) {
      const I = {
         slideRealIndex: e,
         direction: t,
         setTranslate: i,
         activeSlideIndex: n,
         byController: !0
      };
      Array.isArray(a.controller.control) ? a.controller.control.forEach($ => {
         !$.destroyed && $.params.loop && $.loopFix({
            ...I,
            slideTo: $.params.slidesPerView === c.slidesPerView ? s : !1
         })
      }
      ) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix({
         ...I,
         slideTo: a.controller.control.params.slidesPerView === c.slidesPerView ? s : !1
      })
   }
   a.emit("loopFix")
}
function Pt() {
   const e = this
      , { params: s, slidesEl: t } = e;
   if (!s.loop || !t || e.virtual && e.params.virtual.enabled)
      return;
   e.recalcSlides();
   const i = [];
   e.slides.forEach(n => {
      const r = typeof n.swiperSlideIndex > "u" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
      i[r] = n
   }
   ),
      e.slides.forEach(n => {
         n.removeAttribute("data-swiper-slide-index")
      }
      ),
      i.forEach(n => {
         t.append(n)
      }
      ),
      e.recalcSlides(),
      e.slideTo(e.realIndex, 0)
}
var It = {
   loopCreate: Ct,
   loopFix: wt,
   loopDestroy: Pt
};
function Lt(e) {
   const s = this;
   if (!s.params.simulateTouch || s.params.watchOverflow && s.isLocked || s.params.cssMode)
      return;
   const t = s.params.touchEventsTarget === "container" ? s.el : s.wrapperEl;
   s.isElement && (s.__preventObserver__ = !0),
      t.style.cursor = "move",
      t.style.cursor = e ? "grabbing" : "grab",
      s.isElement && requestAnimationFrame(() => {
         s.__preventObserver__ = !1
      }
      )
}
function Ot() {
   const e = this;
   e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
      e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "",
      e.isElement && requestAnimationFrame(() => {
         e.__preventObserver__ = !1
      }
      ))
}
var At = {
   setGrabCursor: Lt,
   unsetGrabCursor: Ot
};
function zt(e, s = this) {
   function t(i) {
      if (!i || i === j() || i === _())
         return null;
      i.assignedSlot && (i = i.assignedSlot);
      const n = i.closest(e);
      return !n && !i.getRootNode ? null : n || t(i.getRootNode().host)
   }
   return t(s)
}
function be(e, s, t) {
   const i = _()
      , { params: n } = e
      , r = n.edgeSwipeDetection
      , l = n.edgeSwipeThreshold;
   return r && (t <= l || t >= i.innerWidth - l) ? r === "prevent" ? (s.preventDefault(),
      !0) : !1 : !0
}
function $t(e) {
   const s = this
      , t = j();
   let i = e;
   i.originalEvent && (i = i.originalEvent);
   const n = s.touchEventsData;
   if (i.type === "pointerdown") {
      if (n.pointerId !== null && n.pointerId !== i.pointerId)
         return;
      n.pointerId = i.pointerId
   } else
      i.type === "touchstart" && i.targetTouches.length === 1 && (n.touchId = i.targetTouches[0].identifier);
   if (i.type === "touchstart") {
      be(s, i, i.targetTouches[0].pageX);
      return
   }
   const { params: r, touches: l, enabled: o } = s;
   if (!o || !r.simulateTouch && i.pointerType === "mouse" || s.animating && r.preventInteractionOnTransition)
      return;
   !s.animating && r.cssMode && r.loop && s.loopFix();
   let a = i.target;
   if (r.touchEventsTarget === "wrapper" && !_e(a, s.wrapperEl) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || n.isTouched && n.isMoved)
      return;
   const d = !!r.noSwipingClass && r.noSwipingClass !== ""
      , g = i.composedPath ? i.composedPath() : i.path;
   d && i.target && i.target.shadowRoot && g && (a = g[0]);
   const u = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`
      , T = !!(i.target && i.target.shadowRoot);
   if (r.noSwiping && (T ? zt(u, a) : a.closest(u))) {
      s.allowClick = !0;
      return
   }
   if (r.swipeHandler && !a.closest(r.swipeHandler))
      return;
   l.currentX = i.pageX,
      l.currentY = i.pageY;
   const c = l.currentX
      , h = l.currentY;
   if (!be(s, i, c))
      return;
   Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0
   }),
      l.startX = c,
      l.startY = h,
      n.touchStartTime = ne(),
      s.allowClick = !0,
      s.updateSize(),
      s.swipeDirection = void 0,
      r.threshold > 0 && (n.allowThresholdMove = !1);
   let y = !0;
   a.matches(n.focusableElements) && (y = !1,
      a.nodeName === "SELECT" && (n.isTouched = !1)),
      t.activeElement && t.activeElement.matches(n.focusableElements) && t.activeElement !== a && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !a.matches(n.focusableElements)) && t.activeElement.blur();
   const M = y && s.allowTouchMove && r.touchStartPreventDefault;
   (r.touchStartForcePreventDefault || M) && !a.isContentEditable && i.preventDefault(),
      r.freeMode && r.freeMode.enabled && s.freeMode && s.animating && !r.cssMode && s.freeMode.onTouchStart(),
      s.emit("touchStart", i)
}
function kt(e) {
   const s = j()
      , t = this
      , i = t.touchEventsData
      , { params: n, touches: r, rtlTranslate: l, enabled: o } = t;
   if (!o || !n.simulateTouch && e.pointerType === "mouse")
      return;
   let a = e;
   if (a.originalEvent && (a = a.originalEvent),
      a.type === "pointermove" && (i.touchId !== null || a.pointerId !== i.pointerId))
      return;
   let d;
   if (a.type === "touchmove") {
      if (d = [...a.changedTouches].find(b => b.identifier === i.touchId),
         !d || d.identifier !== i.touchId)
         return
   } else
      d = a;
   if (!i.isTouched) {
      i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", a);
      return
   }
   const g = d.pageX
      , u = d.pageY;
   if (a.preventedByNestedSwiper) {
      r.startX = g,
         r.startY = u;
      return
   }
   if (!t.allowTouchMove) {
      a.target.matches(i.focusableElements) || (t.allowClick = !1),
         i.isTouched && (Object.assign(r, {
            startX: g,
            startY: u,
            currentX: g,
            currentY: u
         }),
            i.touchStartTime = ne());
      return
   }
   if (n.touchReleaseOnEdges && !n.loop)
      if (t.isVertical()) {
         if (u < r.startY && t.translate <= t.maxTranslate() || u > r.startY && t.translate >= t.minTranslate()) {
            i.isTouched = !1,
               i.isMoved = !1;
            return
         }
      } else {
         if (l && (g > r.startX && -t.translate <= t.maxTranslate() || g < r.startX && -t.translate >= t.minTranslate()))
            return;
         if (!l && (g < r.startX && t.translate <= t.maxTranslate() || g > r.startX && t.translate >= t.minTranslate()))
            return
      }
   if (s.activeElement && s.activeElement.matches(i.focusableElements) && s.activeElement !== a.target && a.pointerType !== "mouse" && s.activeElement.blur(),
      s.activeElement && a.target === s.activeElement && a.target.matches(i.focusableElements)) {
      i.isMoved = !0,
         t.allowClick = !1;
      return
   }
   i.allowTouchCallbacks && t.emit("touchMove", a),
      r.previousX = r.currentX,
      r.previousY = r.currentY,
      r.currentX = g,
      r.currentY = u;
   const T = r.currentX - r.startX
      , c = r.currentY - r.startY;
   if (t.params.threshold && Math.sqrt(T ** 2 + c ** 2) < t.params.threshold)
      return;
   if (typeof i.isScrolling > "u") {
      let b;
      t.isHorizontal() && r.currentY === r.startY || t.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : T * T + c * c >= 25 && (b = Math.atan2(Math.abs(c), Math.abs(T)) * 180 / Math.PI,
         i.isScrolling = t.isHorizontal() ? b > n.touchAngle : 90 - b > n.touchAngle)
   }
   if (i.isScrolling && t.emit("touchMoveOpposite", a),
      typeof i.startMoving > "u" && (r.currentX !== r.startX || r.currentY !== r.startY) && (i.startMoving = !0),
      i.isScrolling || a.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
      i.isTouched = !1;
      return
   }
   if (!i.startMoving)
      return;
   t.allowClick = !1,
      !n.cssMode && a.cancelable && a.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
   let h = t.isHorizontal() ? T : c
      , y = t.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
   n.oneWayMovement && (h = Math.abs(h) * (l ? 1 : -1),
      y = Math.abs(y) * (l ? 1 : -1)),
      r.diff = h,
      h *= n.touchRatio,
      l && (h = -h,
         y = -y);
   const M = t.touchesDirection;
   t.swipeDirection = h > 0 ? "prev" : "next",
      t.touchesDirection = y > 0 ? "prev" : "next";
   const f = t.params.loop && !n.cssMode
      , p = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
   if (!i.isMoved) {
      if (f && p && t.loopFix({
         direction: t.swipeDirection
      }),
         i.startTranslate = t.getTranslate(),
         t.setTransition(0),
         t.animating) {
         const b = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
            detail: {
               bySwiperTouchMove: !0
            }
         });
         t.wrapperEl.dispatchEvent(b)
      }
      i.allowMomentumBounce = !1,
         n.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0),
         t.emit("sliderFirstMove", a)
   }
   if (new Date().getTime(),
      n._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && M !== t.touchesDirection && f && p && Math.abs(h) >= 1) {
      Object.assign(r, {
         startX: g,
         startY: u,
         currentX: g,
         currentY: u,
         startTranslate: i.currentTranslate
      }),
         i.loopSwapReset = !0,
         i.startTranslate = i.currentTranslate;
      return
   }
   t.emit("sliderMove", a),
      i.isMoved = !0,
      i.currentTranslate = h + i.startTranslate;
   let m = !0
      , v = n.resistanceRatio;
   if (n.touchReleaseOnEdges && (v = 0),
      h > 0 ? (f && p && i.allowThresholdMove && i.currentTranslate > (n.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
         direction: "prev",
         setTranslate: !0,
         activeSlideIndex: 0
      }),
         i.currentTranslate > t.minTranslate() && (m = !1,
            n.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + h) ** v))) : h < 0 && (f && p && i.allowThresholdMove && i.currentTranslate < (n.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
               direction: "next",
               setTranslate: !0,
               activeSlideIndex: t.slides.length - (n.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
            }),
               i.currentTranslate < t.maxTranslate() && (m = !1,
                  n.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - h) ** v))),
      m && (a.preventedByNestedSwiper = !0),
      !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
      !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
      !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate),
      n.threshold > 0)
      if (Math.abs(h) > n.threshold || i.allowThresholdMove) {
         if (!i.allowThresholdMove) {
            i.allowThresholdMove = !0,
               r.startX = r.currentX,
               r.startY = r.currentY,
               i.currentTranslate = i.startTranslate,
               r.diff = t.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY;
            return
         }
      } else {
         i.currentTranslate = i.startTranslate;
         return
      }
   !n.followFinger || n.cssMode || ((n.freeMode && n.freeMode.enabled && t.freeMode || n.watchSlidesProgress) && (t.updateActiveIndex(),
      t.updateSlidesClasses()),
      n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
      t.updateProgress(i.currentTranslate),
      t.setTranslate(i.currentTranslate))
}
function Dt(e) {
   const s = this
      , t = s.touchEventsData;
   let i = e;
   i.originalEvent && (i = i.originalEvent);
   let n;
   if (i.type === "touchend" || i.type === "touchcancel") {
      if (n = [...i.changedTouches].find(b => b.identifier === t.touchId),
         !n || n.identifier !== t.touchId)
         return
   } else {
      if (t.touchId !== null || i.pointerId !== t.pointerId)
         return;
      n = i
   }
   if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (s.browser.isSafari || s.browser.isWebView)))
      return;
   t.pointerId = null,
      t.touchId = null;
   const { params: l, touches: o, rtlTranslate: a, slidesGrid: d, enabled: g } = s;
   if (!g || !l.simulateTouch && i.pointerType === "mouse")
      return;
   if (t.allowTouchCallbacks && s.emit("touchEnd", i),
      t.allowTouchCallbacks = !1,
      !t.isTouched) {
      t.isMoved && l.grabCursor && s.setGrabCursor(!1),
         t.isMoved = !1,
         t.startMoving = !1;
      return
   }
   l.grabCursor && t.isMoved && t.isTouched && (s.allowSlideNext === !0 || s.allowSlidePrev === !0) && s.setGrabCursor(!1);
   const u = ne()
      , T = u - t.touchStartTime;
   if (s.allowClick) {
      const b = i.path || i.composedPath && i.composedPath();
      s.updateClickedSlide(b && b[0] || i.target, b),
         s.emit("tap click", i),
         T < 300 && u - t.lastClickTime < 300 && s.emit("doubleTap doubleClick", i)
   }
   if (t.lastClickTime = ne(),
      Ce(() => {
         s.destroyed || (s.allowClick = !0)
      }
      ),
      !t.isTouched || !t.isMoved || !s.swipeDirection || o.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
      t.isTouched = !1,
         t.isMoved = !1,
         t.startMoving = !1;
      return
   }
   t.isTouched = !1,
      t.isMoved = !1,
      t.startMoving = !1;
   let c;
   if (l.followFinger ? c = a ? s.translate : -s.translate : c = -t.currentTranslate,
      l.cssMode)
      return;
   if (l.freeMode && l.freeMode.enabled) {
      s.freeMode.onTouchEnd({
         currentPos: c
      });
      return
   }
   const h = c >= -s.maxTranslate() && !s.params.loop;
   let y = 0
      , M = s.slidesSizesGrid[0];
   for (let b = 0; b < d.length; b += b < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup) {
      const P = b < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
      typeof d[b + P] < "u" ? (h || c >= d[b] && c < d[b + P]) && (y = b,
         M = d[b + P] - d[b]) : (h || c >= d[b]) && (y = b,
            M = d[d.length - 1] - d[d.length - 2])
   }
   let f = null
      , p = null;
   l.rewind && (s.isBeginning ? p = l.virtual && l.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1 : s.isEnd && (f = 0));
   const m = (c - d[y]) / M
      , v = y < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
   if (T > l.longSwipesMs) {
      if (!l.longSwipes) {
         s.slideTo(s.activeIndex);
         return
      }
      s.swipeDirection === "next" && (m >= l.longSwipesRatio ? s.slideTo(l.rewind && s.isEnd ? f : y + v) : s.slideTo(y)),
         s.swipeDirection === "prev" && (m > 1 - l.longSwipesRatio ? s.slideTo(y + v) : p !== null && m < 0 && Math.abs(m) > l.longSwipesRatio ? s.slideTo(p) : s.slideTo(y))
   } else {
      if (!l.shortSwipes) {
         s.slideTo(s.activeIndex);
         return
      }
      s.navigation && (i.target === s.navigation.nextEl || i.target === s.navigation.prevEl) ? i.target === s.navigation.nextEl ? s.slideTo(y + v) : s.slideTo(y) : (s.swipeDirection === "next" && s.slideTo(f !== null ? f : y + v),
         s.swipeDirection === "prev" && s.slideTo(p !== null ? p : y))
   }
}
function Te() {
   const e = this
      , { params: s, el: t } = e;
   if (t && t.offsetWidth === 0)
      return;
   s.breakpoints && e.setBreakpoint();
   const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e
      , l = e.virtual && e.params.virtual.enabled;
   e.allowSlideNext = !0,
      e.allowSlidePrev = !0,
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
   const o = l && s.loop;
   (s.slidesPerView === "auto" || s.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
         e.autoplay.resizeTimeout = setTimeout(() => {
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
         }
            , 500)),
      e.allowSlidePrev = n,
      e.allowSlideNext = i,
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
}
function Gt(e) {
   const s = this;
   s.enabled && (s.allowClick || (s.params.preventClicks && e.preventDefault(),
      s.params.preventClicksPropagation && s.animating && (e.stopPropagation(),
         e.stopImmediatePropagation())))
}
function Bt() {
   const e = this
      , { wrapperEl: s, rtlTranslate: t, enabled: i } = e;
   if (!i)
      return;
   e.previousTranslate = e.translate,
      e.isHorizontal() ? e.translate = -s.scrollLeft : e.translate = -s.scrollTop,
      e.translate === 0 && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
   let n;
   const r = e.maxTranslate() - e.minTranslate();
   r === 0 ? n = 0 : n = (e.translate - e.minTranslate()) / r,
      n !== e.progress && e.updateProgress(t ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1)
}
function Ft(e) {
   const s = this;
   ie(s, e.target),
      !(s.params.cssMode || s.params.slidesPerView !== "auto" && !s.params.autoHeight) && s.update()
}
function Vt() {
   const e = this;
   e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const ze = (e, s) => {
   const t = j()
      , { params: i, el: n, wrapperEl: r, device: l } = e
      , o = !!i.nested
      , a = s === "on" ? "addEventListener" : "removeEventListener"
      , d = s;
   !n || typeof n == "string" || (t[a]("touchstart", e.onDocumentTouchStart, {
      passive: !1,
      capture: o
   }),
      n[a]("touchstart", e.onTouchStart, {
         passive: !1
      }),
      n[a]("pointerdown", e.onTouchStart, {
         passive: !1
      }),
      t[a]("touchmove", e.onTouchMove, {
         passive: !1,
         capture: o
      }),
      t[a]("pointermove", e.onTouchMove, {
         passive: !1,
         capture: o
      }),
      t[a]("touchend", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("pointerup", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("pointercancel", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("touchcancel", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("pointerout", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("pointerleave", e.onTouchEnd, {
         passive: !0
      }),
      t[a]("contextmenu", e.onTouchEnd, {
         passive: !0
      }),
      (i.preventClicks || i.preventClicksPropagation) && n[a]("click", e.onClick, !0),
      i.cssMode && r[a]("scroll", e.onScroll),
      i.updateOnWindowResize ? e[d](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Te, !0) : e[d]("observerUpdate", Te, !0),
      n[a]("load", e.onLoad, {
         capture: !0
      }))
}
   ;
function _t() {
   const e = this
      , { params: s } = e;
   e.onTouchStart = $t.bind(e),
      e.onTouchMove = kt.bind(e),
      e.onTouchEnd = Dt.bind(e),
      e.onDocumentTouchStart = Vt.bind(e),
      s.cssMode && (e.onScroll = Bt.bind(e)),
      e.onClick = Gt.bind(e),
      e.onLoad = Ft.bind(e),
      ze(e, "on")
}
function Nt() {
   ze(this, "off")
}
var Ht = {
   attachEvents: _t,
   detachEvents: Nt
};
const xe = (e, s) => e.grid && s.grid && s.grid.rows > 1;
function Rt() {
   const e = this
      , { realIndex: s, initialized: t, params: i, el: n } = e
      , r = i.breakpoints;
   if (!r || r && Object.keys(r).length === 0)
      return;
   const l = j()
      , o = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container"
      , a = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? e.el : l.querySelector(i.breakpointsBase)
      , d = e.getBreakpoint(r, o, a);
   if (!d || e.currentBreakpoint === d)
      return;
   const u = (d in r ? r[d] : void 0) || e.originalParams
      , T = xe(e, i)
      , c = xe(e, u)
      , h = e.params.grabCursor
      , y = u.grabCursor
      , M = i.enabled;
   T && !c ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()) : !T && c && (n.classList.add(`${i.containerModifierClass}grid`),
         (u.grid.fill && u.grid.fill === "column" || !u.grid.fill && i.grid.fill === "column") && n.classList.add(`${i.containerModifierClass}grid-column`),
         e.emitContainerClasses()),
      h && !y ? e.unsetGrabCursor() : !h && y && e.setGrabCursor(),
      ["navigation", "pagination", "scrollbar"].forEach(P => {
         if (typeof u[P] > "u")
            return;
         const w = i[P] && i[P].enabled
            , S = u[P] && u[P].enabled;
         w && !S && e[P].disable(),
            !w && S && e[P].enable()
      }
      );
   const f = u.direction && u.direction !== i.direction
      , p = i.loop && (u.slidesPerView !== i.slidesPerView || f)
      , m = i.loop;
   f && t && e.changeDirection(),
      N(e.params, u);
   const v = e.params.enabled
      , b = e.params.loop;
   Object.assign(e, {
      allowTouchMove: e.params.allowTouchMove,
      allowSlideNext: e.params.allowSlideNext,
      allowSlidePrev: e.params.allowSlidePrev
   }),
      M && !v ? e.disable() : !M && v && e.enable(),
      e.currentBreakpoint = d,
      e.emit("_beforeBreakpoint", u),
      t && (p ? (e.loopDestroy(),
         e.loopCreate(s),
         e.updateSlides()) : !m && b ? (e.loopCreate(s),
            e.updateSlides()) : m && !b && e.loopDestroy()),
      e.emit("breakpoint", u)
}
function jt(e, s = "window", t) {
   if (!e || s === "container" && !t)
      return;
   let i = !1;
   const n = _()
      , r = s === "window" ? n.innerHeight : t.clientHeight
      , l = Object.keys(e).map(o => {
         if (typeof o == "string" && o.indexOf("@") === 0) {
            const a = parseFloat(o.substr(1));
            return {
               value: r * a,
               point: o
            }
         }
         return {
            value: o,
            point: o
         }
      }
      );
   l.sort((o, a) => parseInt(o.value, 10) - parseInt(a.value, 10));
   for (let o = 0; o < l.length; o += 1) {
      const { point: a, value: d } = l[o];
      s === "window" ? n.matchMedia(`(min-width: ${d}px)`).matches && (i = a) : d <= t.clientWidth && (i = a)
   }
   return i || "max"
}
var qt = {
   setBreakpoint: Rt,
   getBreakpoint: jt
};
function Wt(e, s) {
   const t = [];
   return e.forEach(i => {
      typeof i == "object" ? Object.keys(i).forEach(n => {
         i[n] && t.push(s + n)
      }
      ) : typeof i == "string" && t.push(s + i)
   }
   ),
      t
}
function Yt() {
   const e = this
      , { classNames: s, params: t, rtl: i, el: n, device: r } = e
      , l = Wt(["initialized", t.direction, {
         "free-mode": e.params.freeMode && t.freeMode.enabled
      }, {
            autoheight: t.autoHeight
         }, {
            rtl: i
         }, {
            grid: t.grid && t.grid.rows > 1
         }, {
            "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
         }, {
            android: r.android
         }, {
            ios: r.ios
         }, {
            "css-mode": t.cssMode
         }, {
            centered: t.cssMode && t.centeredSlides
         }, {
            "watch-progress": t.watchSlidesProgress
         }], t.containerModifierClass);
   s.push(...l),
      n.classList.add(...s),
      e.emitContainerClasses()
}
function Xt() {
   const e = this
      , { el: s, classNames: t } = e;
   !s || typeof s == "string" || (s.classList.remove(...t),
      e.emitContainerClasses())
}
var Ut = {
   addClasses: Yt,
   removeClasses: Xt
};
function Kt() {
   const e = this
      , { isLocked: s, params: t } = e
      , { slidesOffsetBefore: i } = t;
   if (i) {
      const n = e.slides.length - 1
         , r = e.slidesGrid[n] + e.slidesSizesGrid[n] + i * 2;
      e.isLocked = e.size > r
   } else
      e.isLocked = e.snapGrid.length === 1;
   t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
      t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
      s && s !== e.isLocked && (e.isEnd = !1),
      s !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
}
var Qt = {
   checkOverflow: Kt
}
   , Ee = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1
   };
function Jt(e, s) {
   return function (i = {}) {
      const n = Object.keys(i)[0]
         , r = i[n];
      if (typeof r != "object" || r === null) {
         N(s, i);
         return
      }
      if (e[n] === !0 && (e[n] = {
         enabled: !0
      }),
         n === "navigation" && e[n] && e[n].enabled && !e[n].prevEl && !e[n].nextEl && (e[n].auto = !0),
         ["pagination", "scrollbar"].indexOf(n) >= 0 && e[n] && e[n].enabled && !e[n].el && (e[n].auto = !0),
         !(n in e && "enabled" in r)) {
         N(s, i);
         return
      }
      typeof e[n] == "object" && !("enabled" in e[n]) && (e[n].enabled = !0),
         e[n] || (e[n] = {
            enabled: !1
         }),
         N(s, i)
   }
}
const pe = {
   eventsEmitter: Ue,
   update: at,
   translate: ut,
   transition: gt,
   slide: Mt,
   loop: It,
   grabCursor: At,
   events: Ht,
   breakpoints: qt,
   checkOverflow: Qt,
   classes: Ut
}
   , me = {};
class H {
   constructor(...s) {
      let t, i;
      s.length === 1 && s[0].constructor && Object.prototype.toString.call(s[0]).slice(8, -1) === "Object" ? i = s[0] : [t, i] = s,
         i || (i = {}),
         i = N({}, i),
         t && !i.el && (i.el = t);
      const n = j();
      if (i.el && typeof i.el == "string" && n.querySelectorAll(i.el).length > 1) {
         const a = [];
         return n.querySelectorAll(i.el).forEach(d => {
            const g = N({}, i, {
               el: d
            });
            a.push(new H(g))
         }
         ),
            a
      }
      const r = this;
      r.__swiper__ = !0,
         r.support = Ie(),
         r.device = Le({
            userAgent: i.userAgent
         }),
         r.browser = Oe(),
         r.eventsListeners = {},
         r.eventsAnyListeners = [],
         r.modules = [...r.__modules__],
         i.modules && Array.isArray(i.modules) && r.modules.push(...i.modules);
      const l = {};
      r.modules.forEach(a => {
         a({
            params: i,
            swiper: r,
            extendParams: Jt(i, l),
            on: r.on.bind(r),
            once: r.once.bind(r),
            off: r.off.bind(r),
            emit: r.emit.bind(r)
         })
      }
      );
      const o = N({}, Ee, l);
      return r.params = N({}, o, me, i),
         r.originalParams = N({}, r.params),
         r.passedParams = N({}, i),
         r.params && r.params.on && Object.keys(r.params.on).forEach(a => {
            r.on(a, r.params.on[a])
         }
         ),
         r.params && r.params.onAny && r.onAny(r.params.onAny),
         Object.assign(r, {
            enabled: r.params.enabled,
            el: t,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
               return r.params.direction === "horizontal"
            },
            isVertical() {
               return r.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
               return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
            },
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEventsData: {
               isTouched: void 0,
               isMoved: void 0,
               allowTouchCallbacks: void 0,
               touchStartTime: void 0,
               isScrolling: void 0,
               currentTranslate: void 0,
               startTranslate: void 0,
               allowThresholdMove: void 0,
               focusableElements: r.params.focusableElements,
               lastClickTime: 0,
               clickTimeout: void 0,
               velocities: [],
               allowMomentumBounce: void 0,
               startMoving: void 0,
               pointerId: null,
               touchId: null
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
               startX: 0,
               startY: 0,
               currentX: 0,
               currentY: 0,
               diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
         }),
         r.emit("_swiper"),
         r.params.init && r.init(),
         r
   }
   getDirectionLabel(s) {
      return this.isHorizontal() ? s : {
         width: "height",
         "margin-top": "margin-left",
         "margin-bottom ": "margin-right",
         "margin-left": "margin-top",
         "margin-right": "margin-bottom",
         "padding-left": "padding-top",
         "padding-right": "padding-bottom",
         marginRight: "marginBottom"
      }[s]
   }
   getSlideIndex(s) {
      const { slidesEl: t, params: i } = this
         , n = R(t, `.${i.slideClass}, swiper-slide`)
         , r = ae(n[0]);
      return ae(s) - r
   }
   getSlideIndexByData(s) {
      return this.getSlideIndex(this.slides.find(t => t.getAttribute("data-swiper-slide-index") * 1 === s))
   }
   getSlideIndexWhenGrid(s) {
      return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? s = Math.floor(s / this.params.grid.rows) : this.params.grid.fill === "row" && (s = s % Math.ceil(this.slides.length / this.params.grid.rows))),
         s
   }
   recalcSlides() {
      const s = this
         , { slidesEl: t, params: i } = s;
      s.slides = R(t, `.${i.slideClass}, swiper-slide`)
   }
   enable() {
      const s = this;
      s.enabled || (s.enabled = !0,
         s.params.grabCursor && s.setGrabCursor(),
         s.emit("enable"))
   }
   disable() {
      const s = this;
      s.enabled && (s.enabled = !1,
         s.params.grabCursor && s.unsetGrabCursor(),
         s.emit("disable"))
   }
   setProgress(s, t) {
      const i = this;
      s = Math.min(Math.max(s, 0), 1);
      const n = i.minTranslate()
         , l = (i.maxTranslate() - n) * s + n;
      i.translateTo(l, typeof t > "u" ? 0 : t),
         i.updateActiveIndex(),
         i.updateSlidesClasses()
   }
   emitContainerClasses() {
      const s = this;
      if (!s.params._emitClasses || !s.el)
         return;
      const t = s.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(s.params.containerModifierClass) === 0);
      s.emit("_containerClasses", t.join(" "))
   }
   getSlideClasses(s) {
      const t = this;
      return t.destroyed ? "" : s.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ")
   }
   emitSlidesClasses() {
      const s = this;
      if (!s.params._emitClasses || !s.el)
         return;
      const t = [];
      s.slides.forEach(i => {
         const n = s.getSlideClasses(i);
         t.push({
            slideEl: i,
            classNames: n
         }),
            s.emit("_slideClass", i, n)
      }
      ),
         s.emit("_slideClasses", t)
   }
   slidesPerViewDynamic(s = "current", t = !1) {
      const i = this
         , { params: n, slides: r, slidesGrid: l, slidesSizesGrid: o, size: a, activeIndex: d } = i;
      let g = 1;
      if (typeof n.slidesPerView == "number")
         return n.slidesPerView;
      if (n.centeredSlides) {
         let u = r[d] ? Math.ceil(r[d].swiperSlideSize) : 0, T;
         for (let c = d + 1; c < r.length; c += 1)
            r[c] && !T && (u += Math.ceil(r[c].swiperSlideSize),
               g += 1,
               u > a && (T = !0));
         for (let c = d - 1; c >= 0; c -= 1)
            r[c] && !T && (u += r[c].swiperSlideSize,
               g += 1,
               u > a && (T = !0))
      } else if (s === "current")
         for (let u = d + 1; u < r.length; u += 1)
            (t ? l[u] + o[u] - l[d] < a : l[u] - l[d] < a) && (g += 1);
      else
         for (let u = d - 1; u >= 0; u -= 1)
            l[d] - l[u] < a && (g += 1);
      return g
   }
   update() {
      const s = this;
      if (!s || s.destroyed)
         return;
      const { snapGrid: t, params: i } = s;
      i.breakpoints && s.setBreakpoint(),
         [...s.el.querySelectorAll('[loading="lazy"]')].forEach(l => {
            l.complete && ie(s, l)
         }
         ),
         s.updateSize(),
         s.updateSlides(),
         s.updateProgress(),
         s.updateSlidesClasses();
      function n() {
         const l = s.rtlTranslate ? s.translate * -1 : s.translate
            , o = Math.min(Math.max(l, s.maxTranslate()), s.minTranslate());
         s.setTranslate(o),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
      }
      let r;
      if (i.freeMode && i.freeMode.enabled && !i.cssMode)
         n(),
            i.autoHeight && s.updateAutoHeight();
      else {
         if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && s.isEnd && !i.centeredSlides) {
            const l = s.virtual && i.virtual.enabled ? s.virtual.slides : s.slides;
            r = s.slideTo(l.length - 1, 0, !1, !0)
         } else
            r = s.slideTo(s.activeIndex, 0, !1, !0);
         r || n()
      }
      i.watchOverflow && t !== s.snapGrid && s.checkOverflow(),
         s.emit("update")
   }
   changeDirection(s, t = !0) {
      const i = this
         , n = i.params.direction;
      return s || (s = n === "horizontal" ? "vertical" : "horizontal"),
         s === n || s !== "horizontal" && s !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${n}`),
            i.el.classList.add(`${i.params.containerModifierClass}${s}`),
            i.emitContainerClasses(),
            i.params.direction = s,
            i.slides.forEach(r => {
               s === "vertical" ? r.style.width = "" : r.style.height = ""
            }
            ),
            i.emit("changeDirection"),
            t && i.update()),
         i
   }
   changeLanguageDirection(s) {
      const t = this;
      t.rtl && s === "rtl" || !t.rtl && s === "ltr" || (t.rtl = s === "rtl",
         t.rtlTranslate = t.params.direction === "horizontal" && t.rtl,
         t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
               t.el.dir = "ltr"),
         t.update())
   }
   mount(s) {
      const t = this;
      if (t.mounted)
         return !0;
      let i = s || t.params.el;
      if (typeof i == "string" && (i = document.querySelector(i)),
         !i)
         return !1;
      i.swiper = t,
         i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
      const n = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let l = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(n()) : R(i, n())[0];
      return !l && t.params.createElements && (l = J("div", t.params.wrapperClass),
         i.append(l),
         R(i, `.${t.params.slideClass}`).forEach(o => {
            l.append(o)
         }
         )),
         Object.assign(t, {
            el: i,
            wrapperEl: l,
            slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : l,
            hostEl: t.isElement ? i.parentNode.host : i,
            mounted: !0,
            rtl: i.dir.toLowerCase() === "rtl" || X(i, "direction") === "rtl",
            rtlTranslate: t.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || X(i, "direction") === "rtl"),
            wrongRTL: X(l, "display") === "-webkit-box"
         }),
         !0
   }
   init(s) {
      const t = this;
      if (t.initialized || t.mount(s) === !1)
         return t;
      t.emit("beforeInit"),
         t.params.breakpoints && t.setBreakpoint(),
         t.addClasses(),
         t.updateSize(),
         t.updateSlides(),
         t.params.watchOverflow && t.checkOverflow(),
         t.params.grabCursor && t.enabled && t.setGrabCursor(),
         t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
         t.params.loop && t.loopCreate(void 0, !0),
         t.attachEvents();
      const n = [...t.el.querySelectorAll('[loading="lazy"]')];
      return t.isElement && n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
         n.forEach(r => {
            r.complete ? ie(t, r) : r.addEventListener("load", l => {
               ie(t, l.target)
            }
            )
         }
         ),
         ge(t),
         t.initialized = !0,
         ge(t),
         t.emit("init"),
         t.emit("afterInit"),
         t
   }
   destroy(s = !0, t = !0) {
      const i = this
         , { params: n, el: r, wrapperEl: l, slides: o } = i;
      return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"),
         i.initialized = !1,
         i.detachEvents(),
         n.loop && i.loopDestroy(),
         t && (i.removeClasses(),
            r && typeof r != "string" && r.removeAttribute("style"),
            l && l.removeAttribute("style"),
            o && o.length && o.forEach(a => {
               a.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass),
                  a.removeAttribute("style"),
                  a.removeAttribute("data-swiper-slide-index")
            }
            )),
         i.emit("destroy"),
         Object.keys(i.eventsListeners).forEach(a => {
            i.off(a)
         }
         ),
         s !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null),
            De(i)),
         i.destroyed = !0),
         null
   }
   static extendDefaults(s) {
      N(me, s)
   }
   static get extendedDefaults() {
      return me
   }
   static get defaults() {
      return Ee
   }
   static installModule(s) {
      H.prototype.__modules__ || (H.prototype.__modules__ = []);
      const t = H.prototype.__modules__;
      typeof s == "function" && t.indexOf(s) < 0 && t.push(s)
   }
   static use(s) {
      return Array.isArray(s) ? (s.forEach(t => H.installModule(t)),
         H) : (H.installModule(s),
            H)
   }
}
Object.keys(pe).forEach(e => {
   Object.keys(pe[e]).forEach(s => {
      H.prototype[s] = pe[e][s]
   }
   )
}
);
H.use([Ye, Xe]);
function Zt({ swiper: e, extendParams: s, on: t, emit: i }) {
   s({
      virtual: {
         enabled: !1,
         slides: [],
         cache: !0,
         slidesPerViewAutoSlideSize: 320,
         renderSlide: null,
         renderExternal: null,
         renderExternalUpdate: !0,
         addSlidesBefore: 0,
         addSlidesAfter: 0
      }
   });
   let n;
   const r = j();
   e.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: []
   };
   const l = r.createElement("div");
   function o(c, h) {
      const y = e.params.virtual;
      if (y.cache && e.virtual.cache[h])
         return e.virtual.cache[h];
      let M;
      return y.renderSlide ? (M = y.renderSlide.call(e, c, h),
         typeof M == "string" && (le(l, M),
            M = l.children[0])) : e.isElement ? M = J("swiper-slide") : M = J("div", e.params.slideClass),
         M.setAttribute("data-swiper-slide-index", h),
         y.renderSlide || le(M, c),
         y.cache && (e.virtual.cache[h] = M),
         M
   }
   function a(c, h, y) {
      const { slidesPerGroup: M, centeredSlides: f, slidesPerView: p, loop: m, initialSlide: v } = e.params;
      if (h && !m && v > 0)
         return;
      const { addSlidesBefore: b, addSlidesAfter: P, slidesPerViewAutoSlideSize: w } = e.params.virtual
         , { from: S, to: A, slides: x, slidesGrid: E, offset: C } = e.virtual;
      e.params.cssMode || e.updateActiveIndex();
      const z = typeof y > "u" ? e.activeIndex || 0 : y;
      let D;
      e.rtlTranslate ? D = "right" : D = e.isHorizontal() ? "left" : "top";
      let L;
      if (p === "auto")
         if (w) {
            let k = e.size;
            k || (k = e.isHorizontal() ? e.el.getBoundingClientRect().width : e.el.getBoundingClientRect().height),
               L = Math.max(1, Math.ceil(k / w))
         } else
            L = 1;
      else
         L = p;
      let G, O;
      f ? (G = Math.floor(L / 2) + M + P,
         O = Math.floor(L / 2) + M + b) : (G = L + (M - 1) + P,
            O = (m ? L : M) + b);
      let I = z - O
         , $ = z + G;
      m || (I = Math.max(I, 0),
         $ = Math.min($, x.length - 1));
      let B = (e.slidesGrid[I] || 0) - (e.slidesGrid[0] || 0);
      m && z >= O ? (I -= O,
         f || (B += e.slidesGrid[0])) : m && z < O && (I = -O,
            f && (B += e.slidesGrid[0])),
         Object.assign(e.virtual, {
            from: I,
            to: $,
            offset: B,
            slidesGrid: e.slidesGrid,
            slidesBefore: O,
            slidesAfter: G
         });
      function F() {
         e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            i("virtualUpdate")
      }
      if (S === I && A === $ && !c) {
         e.slidesGrid !== E && B !== C && e.slides.forEach(k => {
            k.style[D] = `${B - Math.abs(e.cssOverflowAdjustment())}px`
         }
         ),
            e.updateProgress(),
            i("virtualUpdate");
         return
      }
      if (e.params.virtual.renderExternal) {
         e.params.virtual.renderExternal.call(e, {
            offset: B,
            from: I,
            to: $,
            slides: function () {
               const V = [];
               for (let K = I; K <= $; K += 1)
                  V.push(x[K]);
               return V
            }()
         }),
            e.params.virtual.renderExternalUpdate ? F() : i("virtualUpdate");
         return
      }
      const q = []
         , Q = []
         , Z = k => {
            let V = k;
            return k < 0 ? V = x.length + k : V >= x.length && (V = V - x.length),
               V
         }
         ;
      if (c)
         e.slides.filter(k => k.matches(`.${e.params.slideClass}, swiper-slide`)).forEach(k => {
            k.remove()
         }
         );
      else
         for (let k = S; k <= A; k += 1)
            if (k < I || k > $) {
               const V = Z(k);
               e.slides.filter(K => K.matches(`.${e.params.slideClass}[data-swiper-slide-index="${V}"], swiper-slide[data-swiper-slide-index="${V}"]`)).forEach(K => {
                  K.remove()
               }
               )
            }
      const W = m ? -x.length : 0
         , U = m ? x.length * 2 : x.length;
      for (let k = W; k < U; k += 1)
         if (k >= I && k <= $) {
            const V = Z(k);
            typeof A > "u" || c ? Q.push(V) : (k > A && Q.push(V),
               k < S && q.push(V))
         }
      if (Q.forEach(k => {
         e.slidesEl.append(o(x[k], k))
      }
      ),
         m)
         for (let k = q.length - 1; k >= 0; k -= 1) {
            const V = q[k];
            e.slidesEl.prepend(o(x[V], V))
         }
      else
         q.sort((k, V) => V - k),
            q.forEach(k => {
               e.slidesEl.prepend(o(x[k], k))
            }
            );
      R(e.slidesEl, ".swiper-slide, swiper-slide").forEach(k => {
         k.style[D] = `${B - Math.abs(e.cssOverflowAdjustment())}px`
      }
      ),
         F()
   }
   function d(c) {
      if (typeof c == "object" && "length" in c)
         for (let h = 0; h < c.length; h += 1)
            c[h] && e.virtual.slides.push(c[h]);
      else
         e.virtual.slides.push(c);
      a(!0)
   }
   function g(c) {
      const h = e.activeIndex;
      let y = h + 1
         , M = 1;
      if (Array.isArray(c)) {
         for (let f = 0; f < c.length; f += 1)
            c[f] && e.virtual.slides.unshift(c[f]);
         y = h + c.length,
            M = c.length
      } else
         e.virtual.slides.unshift(c);
      if (e.params.virtual.cache) {
         const f = e.virtual.cache
            , p = {};
         Object.keys(f).forEach(m => {
            const v = f[m]
               , b = v.getAttribute("data-swiper-slide-index");
            b && v.setAttribute("data-swiper-slide-index", parseInt(b, 10) + M),
               p[parseInt(m, 10) + M] = v
         }
         ),
            e.virtual.cache = p
      }
      a(!0),
         e.slideTo(y, 0)
   }
   function u(c) {
      if (typeof c > "u" || c === null)
         return;
      let h = e.activeIndex;
      if (Array.isArray(c))
         for (let y = c.length - 1; y >= 0; y -= 1)
            e.params.virtual.cache && (delete e.virtual.cache[c[y]],
               Object.keys(e.virtual.cache).forEach(M => {
                  M > c && (e.virtual.cache[M - 1] = e.virtual.cache[M],
                     e.virtual.cache[M - 1].setAttribute("data-swiper-slide-index", M - 1),
                     delete e.virtual.cache[M])
               }
               )),
               e.virtual.slides.splice(c[y], 1),
               c[y] < h && (h -= 1),
               h = Math.max(h, 0);
      else
         e.params.virtual.cache && (delete e.virtual.cache[c],
            Object.keys(e.virtual.cache).forEach(y => {
               y > c && (e.virtual.cache[y - 1] = e.virtual.cache[y],
                  e.virtual.cache[y - 1].setAttribute("data-swiper-slide-index", y - 1),
                  delete e.virtual.cache[y])
            }
            )),
            e.virtual.slides.splice(c, 1),
            c < h && (h -= 1),
            h = Math.max(h, 0);
      a(!0),
         e.slideTo(h, 0)
   }
   function T() {
      e.virtual.slides = [],
         e.params.virtual.cache && (e.virtual.cache = {}),
         a(!0),
         e.slideTo(0, 0)
   }
   t("beforeInit", () => {
      if (!e.params.virtual.enabled)
         return;
      let c;
      if (typeof e.passedParams.virtual.slides > "u") {
         const h = [...e.slidesEl.children].filter(y => y.matches(`.${e.params.slideClass}, swiper-slide`));
         h && h.length && (e.virtual.slides = [...h],
            c = !0,
            h.forEach((y, M) => {
               y.setAttribute("data-swiper-slide-index", M),
                  e.virtual.cache[M] = y,
                  y.remove()
            }
            ))
      }
      c || (e.virtual.slides = e.params.virtual.slides),
         e.classNames.push(`${e.params.containerModifierClass}virtual`),
         e.params.watchSlidesProgress = !0,
         e.originalParams.watchSlidesProgress = !0,
         a(!1, !0)
   }
   ),
      t("setTranslate", () => {
         e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(n),
            n = setTimeout(() => {
               a()
            }
               , 100)) : a())
      }
      ),
      t("init update resize", () => {
         e.params.virtual.enabled && e.params.cssMode && te(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`)
      }
      ),
      Object.assign(e.virtual, {
         appendSlide: d,
         prependSlide: g,
         removeSlide: u,
         removeAllSlides: T,
         update: a
      })
}
function es(e, s, t, i) {
   return e.params.createElements && Object.keys(i).forEach(n => {
      if (!t[n] && t.auto === !0) {
         let r = R(e.el, `.${i[n]}`)[0];
         r || (r = J("div", i[n]),
            r.className = i[n],
            e.el.append(r)),
            t[n] = r,
            s[n] = r
      }
   }
   ),
      t
}
function ee(e = "") {
   return `.${e.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`
}
function ts({ swiper: e, extendParams: s, on: t, emit: i }) {
   const n = "swiper-pagination";
   s({
      pagination: {
         el: null,
         bulletElement: "span",
         clickable: !1,
         hideOnClick: !1,
         renderBullet: null,
         renderProgressbar: null,
         renderFraction: null,
         renderCustom: null,
         progressbarOpposite: !1,
         type: "bullets",
         dynamicBullets: !1,
         dynamicMainBullets: 1,
         formatFractionCurrent: f => f,
         formatFractionTotal: f => f,
         bulletClass: `${n}-bullet`,
         bulletActiveClass: `${n}-bullet-active`,
         modifierClass: `${n}-`,
         currentClass: `${n}-current`,
         totalClass: `${n}-total`,
         hiddenClass: `${n}-hidden`,
         progressbarFillClass: `${n}-progressbar-fill`,
         progressbarOppositeClass: `${n}-progressbar-opposite`,
         clickableClass: `${n}-clickable`,
         lockClass: `${n}-lock`,
         horizontalClass: `${n}-horizontal`,
         verticalClass: `${n}-vertical`,
         paginationDisabledClass: `${n}-disabled`
      }
   }),
      e.pagination = {
         el: null,
         bullets: []
      };
   let r, l = 0;
   function o() {
      return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0
   }
   function a(f, p) {
      const { bulletActiveClass: m } = e.params.pagination;
      f && (f = f[`${p === "prev" ? "previous" : "next"}ElementSibling`],
         f && (f.classList.add(`${m}-${p}`),
            f = f[`${p === "prev" ? "previous" : "next"}ElementSibling`],
            f && f.classList.add(`${m}-${p}-${p}`)))
   }
   function d(f, p, m) {
      if (f = f % m,
         p = p % m,
         p === f + 1)
         return "next";
      if (p === f - 1)
         return "previous"
   }
   function g(f) {
      const p = f.target.closest(ee(e.params.pagination.bulletClass));
      if (!p)
         return;
      f.preventDefault();
      const m = ae(p) * e.params.slidesPerGroup;
      if (e.params.loop) {
         if (e.realIndex === m)
            return;
         const v = d(e.realIndex, m, e.slides.length);
         v === "next" ? e.slideNext() : v === "previous" ? e.slidePrev() : e.slideToLoop(m)
      } else
         e.slideTo(m)
   }
   function u() {
      const f = e.rtl
         , p = e.params.pagination;
      if (o())
         return;
      let m = e.pagination.el;
      m = Y(m);
      let v, b;
      const P = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
         , w = e.params.loop ? Math.ceil(P / e.params.slidesPerGroup) : e.snapGrid.length;
      if (e.params.loop ? (b = e.previousRealIndex || 0,
         v = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (v = e.snapIndex,
            b = e.previousSnapIndex) : (b = e.previousIndex || 0,
               v = e.activeIndex || 0),
         p.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
         const S = e.pagination.bullets;
         let A, x, E;
         if (p.dynamicBullets && (r = he(S[0], e.isHorizontal() ? "width" : "height"),
            m.forEach(C => {
               C.style[e.isHorizontal() ? "width" : "height"] = `${r * (p.dynamicMainBullets + 4)}px`
            }
            ),
            p.dynamicMainBullets > 1 && b !== void 0 && (l += v - (b || 0),
               l > p.dynamicMainBullets - 1 ? l = p.dynamicMainBullets - 1 : l < 0 && (l = 0)),
            A = Math.max(v - l, 0),
            x = A + (Math.min(S.length, p.dynamicMainBullets) - 1),
            E = (x + A) / 2),
            S.forEach(C => {
               const z = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(D => `${p.bulletActiveClass}${D}`)].map(D => typeof D == "string" && D.includes(" ") ? D.split(" ") : D).flat();
               C.classList.remove(...z)
            }
            ),
            m.length > 1)
            S.forEach(C => {
               const z = ae(C);
               z === v ? C.classList.add(...p.bulletActiveClass.split(" ")) : e.isElement && C.setAttribute("part", "bullet"),
                  p.dynamicBullets && (z >= A && z <= x && C.classList.add(...`${p.bulletActiveClass}-main`.split(" ")),
                     z === A && a(C, "prev"),
                     z === x && a(C, "next"))
            }
            );
         else {
            const C = S[v];
            if (C && C.classList.add(...p.bulletActiveClass.split(" ")),
               e.isElement && S.forEach((z, D) => {
                  z.setAttribute("part", D === v ? "bullet-active" : "bullet")
               }
               ),
               p.dynamicBullets) {
               const z = S[A]
                  , D = S[x];
               for (let L = A; L <= x; L += 1)
                  S[L] && S[L].classList.add(...`${p.bulletActiveClass}-main`.split(" "));
               a(z, "prev"),
                  a(D, "next")
            }
         }
         if (p.dynamicBullets) {
            const C = Math.min(S.length, p.dynamicMainBullets + 4)
               , z = (r * C - r) / 2 - E * r
               , D = f ? "right" : "left";
            S.forEach(L => {
               L.style[e.isHorizontal() ? D : "top"] = `${z}px`
            }
            )
         }
      }
      m.forEach((S, A) => {
         if (p.type === "fraction" && (S.querySelectorAll(ee(p.currentClass)).forEach(x => {
            x.textContent = p.formatFractionCurrent(v + 1)
         }
         ),
            S.querySelectorAll(ee(p.totalClass)).forEach(x => {
               x.textContent = p.formatFractionTotal(w)
            }
            )),
            p.type === "progressbar") {
            let x;
            p.progressbarOpposite ? x = e.isHorizontal() ? "vertical" : "horizontal" : x = e.isHorizontal() ? "horizontal" : "vertical";
            const E = (v + 1) / w;
            let C = 1
               , z = 1;
            x === "horizontal" ? C = E : z = E,
               S.querySelectorAll(ee(p.progressbarFillClass)).forEach(D => {
                  D.style.transform = `translate3d(0,0,0) scaleX(${C}) scaleY(${z})`,
                     D.style.transitionDuration = `${e.params.speed}ms`
               }
               )
         }
         p.type === "custom" && p.renderCustom ? (le(S, p.renderCustom(e, v + 1, w)),
            A === 0 && i("paginationRender", S)) : (A === 0 && i("paginationRender", S),
               i("paginationUpdate", S)),
            e.params.watchOverflow && e.enabled && S.classList[e.isLocked ? "add" : "remove"](p.lockClass)
      }
      )
   }
   function T() {
      const f = e.params.pagination;
      if (o())
         return;
      const p = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
      let m = e.pagination.el;
      m = Y(m);
      let v = "";
      if (f.type === "bullets") {
         let b = e.params.loop ? Math.ceil(p / e.params.slidesPerGroup) : e.snapGrid.length;
         e.params.freeMode && e.params.freeMode.enabled && b > p && (b = p);
         for (let P = 0; P < b; P += 1)
            f.renderBullet ? v += f.renderBullet.call(e, P, f.bulletClass) : v += `<${f.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${f.bulletClass}"></${f.bulletElement}>`
      }
      f.type === "fraction" && (f.renderFraction ? v = f.renderFraction.call(e, f.currentClass, f.totalClass) : v = `<span class="${f.currentClass}"></span> / <span class="${f.totalClass}"></span>`),
         f.type === "progressbar" && (f.renderProgressbar ? v = f.renderProgressbar.call(e, f.progressbarFillClass) : v = `<span class="${f.progressbarFillClass}"></span>`),
         e.pagination.bullets = [],
         m.forEach(b => {
            f.type !== "custom" && le(b, v || ""),
               f.type === "bullets" && e.pagination.bullets.push(...b.querySelectorAll(ee(f.bulletClass)))
         }
         ),
         f.type !== "custom" && i("paginationRender", m[0])
   }
   function c() {
      e.params.pagination = es(e, e.originalParams.pagination, e.params.pagination, {
         el: "swiper-pagination"
      });
      const f = e.params.pagination;
      if (!f.el)
         return;
      let p;
      typeof f.el == "string" && e.isElement && (p = e.el.querySelector(f.el)),
         !p && typeof f.el == "string" && (p = [...document.querySelectorAll(f.el)]),
         p || (p = f.el),
         !(!p || p.length === 0) && (e.params.uniqueNavElements && typeof f.el == "string" && Array.isArray(p) && p.length > 1 && (p = [...e.el.querySelectorAll(f.el)],
            p.length > 1 && (p = p.find(m => Pe(m, ".swiper")[0] === e.el))),
            Array.isArray(p) && p.length === 1 && (p = p[0]),
            Object.assign(e.pagination, {
               el: p
            }),
            p = Y(p),
            p.forEach(m => {
               f.type === "bullets" && f.clickable && m.classList.add(...(f.clickableClass || "").split(" ")),
                  m.classList.add(f.modifierClass + f.type),
                  m.classList.add(e.isHorizontal() ? f.horizontalClass : f.verticalClass),
                  f.type === "bullets" && f.dynamicBullets && (m.classList.add(`${f.modifierClass}${f.type}-dynamic`),
                     l = 0,
                     f.dynamicMainBullets < 1 && (f.dynamicMainBullets = 1)),
                  f.type === "progressbar" && f.progressbarOpposite && m.classList.add(f.progressbarOppositeClass),
                  f.clickable && m.addEventListener("click", g),
                  e.enabled || m.classList.add(f.lockClass)
            }
            ))
   }
   function h() {
      const f = e.params.pagination;
      if (o())
         return;
      let p = e.pagination.el;
      p && (p = Y(p),
         p.forEach(m => {
            m.classList.remove(f.hiddenClass),
               m.classList.remove(f.modifierClass + f.type),
               m.classList.remove(e.isHorizontal() ? f.horizontalClass : f.verticalClass),
               f.clickable && (m.classList.remove(...(f.clickableClass || "").split(" ")),
                  m.removeEventListener("click", g))
         }
         )),
         e.pagination.bullets && e.pagination.bullets.forEach(m => m.classList.remove(...f.bulletActiveClass.split(" ")))
   }
   t("changeDirection", () => {
      if (!e.pagination || !e.pagination.el)
         return;
      const f = e.params.pagination;
      let { el: p } = e.pagination;
      p = Y(p),
         p.forEach(m => {
            m.classList.remove(f.horizontalClass, f.verticalClass),
               m.classList.add(e.isHorizontal() ? f.horizontalClass : f.verticalClass)
         }
         )
   }
   ),
      t("init", () => {
         e.params.pagination.enabled === !1 ? M() : (c(),
            T(),
            u())
      }
      ),
      t("activeIndexChange", () => {
         typeof e.snapIndex > "u" && u()
      }
      ),
      t("snapIndexChange", () => {
         u()
      }
      ),
      t("snapGridLengthChange", () => {
         T(),
            u()
      }
      ),
      t("destroy", () => {
         h()
      }
      ),
      t("enable disable", () => {
         let { el: f } = e.pagination;
         f && (f = Y(f),
            f.forEach(p => p.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
      }
      ),
      t("lock unlock", () => {
         u()
      }
      ),
      t("click", (f, p) => {
         const m = p.target
            , v = Y(e.pagination.el);
         if (e.params.pagination.el && e.params.pagination.hideOnClick && v && v.length > 0 && !m.classList.contains(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && m === e.navigation.nextEl || e.navigation.prevEl && m === e.navigation.prevEl))
               return;
            const b = v[0].classList.contains(e.params.pagination.hiddenClass);
            i(b === !0 ? "paginationShow" : "paginationHide"),
               v.forEach(P => P.classList.toggle(e.params.pagination.hiddenClass))
         }
      }
      );
   const y = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: f } = e.pagination;
      f && (f = Y(f),
         f.forEach(p => p.classList.remove(e.params.pagination.paginationDisabledClass))),
         c(),
         T(),
         u()
   }
      , M = () => {
         e.el.classList.add(e.params.pagination.paginationDisabledClass);
         let { el: f } = e.pagination;
         f && (f = Y(f),
            f.forEach(p => p.classList.add(e.params.pagination.paginationDisabledClass))),
            h()
      }
      ;
   Object.assign(e.pagination, {
      enable: y,
      disable: M,
      render: T,
      update: u,
      init: c,
      destroy: h
   })
}
function ss({ swiper: e, extendParams: s, on: t, emit: i, params: n }) {
   e.autoplay = {
      running: !1,
      paused: !1,
      timeLeft: 0
   },
      s({
         autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1
         }
      });
   let r, l, o = n && n.autoplay ? n.autoplay.delay : 3e3, a = n && n.autoplay ? n.autoplay.delay : 3e3, d, g = new Date().getTime(), u, T, c, h, y, M, f;
   function p(O) {
      !e || e.destroyed || !e.wrapperEl || O.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", p),
         !(f || O.detail && O.detail.bySwiperTouchMove) && A())
   }
   const m = () => {
      if (e.destroyed || !e.autoplay.running)
         return;
      e.autoplay.paused ? u = !0 : u && (a = d,
         u = !1);
      const O = e.autoplay.paused ? d : g + a - new Date().getTime();
      e.autoplay.timeLeft = O,
         i("autoplayTimeLeft", O, O / o),
         l = requestAnimationFrame(() => {
            m()
         }
         )
   }
      , v = () => {
         let O;
         return e.virtual && e.params.virtual.enabled ? O = e.slides.find($ => $.classList.contains("swiper-slide-active")) : O = e.slides[e.activeIndex],
            O ? parseInt(O.getAttribute("data-swiper-autoplay"), 10) : void 0
      }
      , b = O => {
         if (e.destroyed || !e.autoplay.running)
            return;
         cancelAnimationFrame(l),
            m();
         let I = typeof O > "u" ? e.params.autoplay.delay : O;
         o = e.params.autoplay.delay,
            a = e.params.autoplay.delay;
         const $ = v();
         !Number.isNaN($) && $ > 0 && typeof O > "u" && (I = $,
            o = $,
            a = $),
            d = I;
         const B = e.params.speed
            , F = () => {
               !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(B, !0, !0),
                  i("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, B, !0, !0),
                     i("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(B, !0, !0),
                        i("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, B, !0, !0),
                           i("autoplay")),
                  e.params.cssMode && (g = new Date().getTime(),
                     requestAnimationFrame(() => {
                        b()
                     }
                     )))
            }
            ;
         return I > 0 ? (clearTimeout(r),
            r = setTimeout(() => {
               F()
            }
               , I)) : requestAnimationFrame(() => {
                  F()
               }
               ),
            I
      }
      , P = () => {
         g = new Date().getTime(),
            e.autoplay.running = !0,
            b(),
            i("autoplayStart")
      }
      , w = () => {
         e.autoplay.running = !1,
            clearTimeout(r),
            cancelAnimationFrame(l),
            i("autoplayStop")
      }
      , S = (O, I) => {
         if (e.destroyed || !e.autoplay.running)
            return;
         clearTimeout(r),
            O || (M = !0);
         const $ = () => {
            i("autoplayPause"),
               e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", p) : A()
         }
            ;
         if (e.autoplay.paused = !0,
            I) {
            y && (d = e.params.autoplay.delay),
               y = !1,
               $();
            return
         }
         d = (d || e.params.autoplay.delay) - (new Date().getTime() - g),
            !(e.isEnd && d < 0 && !e.params.loop) && (d < 0 && (d = 0),
               $())
      }
      , A = () => {
         e.isEnd && d < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (g = new Date().getTime(),
            M ? (M = !1,
               b(d)) : b(),
            e.autoplay.paused = !1,
            i("autoplayResume"))
      }
      , x = () => {
         if (e.destroyed || !e.autoplay.running)
            return;
         const O = j();
         O.visibilityState === "hidden" && (M = !0,
            S(!0)),
            O.visibilityState === "visible" && A()
      }
      , E = O => {
         O.pointerType === "mouse" && (M = !0,
            f = !0,
            !(e.animating || e.autoplay.paused) && S(!0))
      }
      , C = O => {
         O.pointerType === "mouse" && (f = !1,
            e.autoplay.paused && A())
      }
      , z = () => {
         e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", E),
            e.el.addEventListener("pointerleave", C))
      }
      , D = () => {
         e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", E),
            e.el.removeEventListener("pointerleave", C))
      }
      , L = () => {
         j().addEventListener("visibilitychange", x)
      }
      , G = () => {
         j().removeEventListener("visibilitychange", x)
      }
      ;
   t("init", () => {
      e.params.autoplay.enabled && (z(),
         L(),
         P())
   }
   ),
      t("destroy", () => {
         D(),
            G(),
            e.autoplay.running && w()
      }
      ),
      t("_freeModeStaticRelease", () => {
         (c || M) && A()
      }
      ),
      t("_freeModeNoMomentumRelease", () => {
         e.params.autoplay.disableOnInteraction ? w() : S(!0, !0)
      }
      ),
      t("beforeTransitionStart", (O, I, $) => {
         e.destroyed || !e.autoplay.running || ($ || !e.params.autoplay.disableOnInteraction ? S(!0, !0) : w())
      }
      ),
      t("sliderFirstMove", () => {
         if (!(e.destroyed || !e.autoplay.running)) {
            if (e.params.autoplay.disableOnInteraction) {
               w();
               return
            }
            T = !0,
               c = !1,
               M = !1,
               h = setTimeout(() => {
                  M = !0,
                     c = !0,
                     S(!0)
               }
                  , 200)
         }
      }
      ),
      t("touchEnd", () => {
         if (!(e.destroyed || !e.autoplay.running || !T)) {
            if (clearTimeout(h),
               clearTimeout(r),
               e.params.autoplay.disableOnInteraction) {
               c = !1,
                  T = !1;
               return
            }
            c && e.params.cssMode && A(),
               c = !1,
               T = !1
         }
      }
      ),
      t("slideChange", () => {
         e.destroyed || !e.autoplay.running || (y = !0)
      }
      ),
      Object.assign(e.autoplay, {
         start: P,
         stop: w,
         pause: S,
         resume: A
      })
}
function is(e) {
   const { effect: s, swiper: t, on: i, setTranslate: n, setTransition: r, overwriteParams: l, perspective: o, recreateShadows: a, getEffectParams: d } = e;
   i("beforeInit", () => {
      if (t.params.effect !== s)
         return;
      t.classNames.push(`${t.params.containerModifierClass}${s}`),
         o && o() && t.classNames.push(`${t.params.containerModifierClass}3d`);
      const u = l ? l() : {};
      Object.assign(t.params, u),
         Object.assign(t.originalParams, u)
   }
   ),
      i("setTranslate _virtualUpdated", () => {
         t.params.effect === s && n()
      }
      ),
      i("setTransition", (u, T) => {
         t.params.effect === s && r(T)
      }
      ),
      i("transitionEnd", () => {
         if (t.params.effect === s && a) {
            if (!d || !d().slideShadows)
               return;
            t.slides.forEach(u => {
               u.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(T => T.remove())
            }
            ),
               a()
         }
      }
      );
   let g;
   i("virtualUpdate", () => {
      t.params.effect === s && (t.slides.length || (g = !0),
         requestAnimationFrame(() => {
            g && t.slides && t.slides.length && (n(),
               g = !1)
         }
         ))
   }
   )
}
function ns({ swiper: e, duration: s, transformElements: t, allSlides: i }) {
   const { activeIndex: n } = e;
   if (e.params.virtualTranslate && s !== 0) {
      let r = !1, l;
      l = t,
         l.forEach(o => {
            Re(o, () => {
               if (r || !e || e.destroyed)
                  return;
               r = !0,
                  e.animating = !1;
               const a = new window.CustomEvent("transitionend", {
                  bubbles: !0,
                  cancelable: !0
               });
               e.wrapperEl.dispatchEvent(a)
            }
            )
         }
         )
   }
}
typeof window < "u" && window.SwiperElementRegisterParams && window.SwiperElementRegisterParams(["superFlowEffect"]);
function rs({ swiper: e, on: s, extendParams: t }) {
   t({
      superFlowEffect: {
         fragments: 3,
         fragmentBorderWidth: 1,
         fragmentBlur: !1,
         contentOffset: 5,
         contentScale: 1.2,
         scaleDuration: 1e4,
         mainImageScale: 1.1,
         level1Scale: 1.15,
         level2Scale: 1.2,
         level3Scale: 1.25
      }
   });
   let i = null;
   const n = m => e.params.loop || e.params.virtual && e.virtual && e.params.virtual.enabled ? parseInt(m.getAttribute("data-swiper-slide-index"), 10) : Array.from(e.slides).indexOf(m)
      , r = m => {
         const v = m.querySelector(".super-flow-fragments")
            , b = v ? [...v.children] : []
            , P = [0, 1, 6, 7]
            , w = [2, 3, 8, 9]
            , S = [4, 5, 10, 11]
            , A = P.map(C => b[C]).filter(Boolean)
            , x = w.map(C => b[C]).filter(Boolean)
            , E = S.map(C => b[C]).filter(Boolean);
         return {
            allFragments: b,
            level1Fragments: A,
            level2Fragments: x,
            level3Fragments: E
         }
      }
      , l = (m = 0) => e.isHorizontal() ? `translate(${m}, 0)` : `translate(0, ${m})`
      , o = () => {
         const { slides: m, rtlTranslate: v } = e
            , { size: b } = e;
         for (let P = 0; P < m.length; P += 1) {
            const w = m[P]
               , S = n(w)
               , A = w.querySelector(".super-flow-content")
               , x = w.querySelector(".super-flow-image")
               , E = w.querySelector(".super-flow-fragments")
               , { level1Fragments: C, level2Fragments: z, level3Fragments: D } = r(w)
               , L = w.progress;
            let G, O = 1, I = 0, $ = 1, B = 0, F = 0, q = 0, Q = 0, Z = 0;
            const W = v ? -1 : 1;
            L <= 0 ? (F = -e.params.superFlowEffect.contentOffset * W,
               G = b * L + e.translate * W,
               O = 1.1 - .1 * Math.min(1, Math.abs(L)),
               I = 20 * W * Math.min(1, Math.abs(L)),
               $ = .95 + .05 * Math.min(1, Math.abs(L)),
               q = 30 * W * Math.min(1, Math.abs(L)),
               Q = 20 * W * Math.min(1, Math.abs(L)),
               Z = 10 * W * Math.min(1, Math.abs(L))) : (G = (e.translate - Math.min(L, 1) * b * .09 * W) * W,
                  O = 1.1,
                  B = 5 * Math.min(1, Math.abs(L)),
                  $ = .95),
               v && (G = -G),
               x && (x.style.transform = `scale(${O}) ${l(I + "%")}`),
               E && (E.style.transform = `scale(${$}) ${l(B + "%")}`),
               S !== i && (A && (A.style.transform = l(`${F}%`)),
                  C.forEach(U => {
                     U.style.transform = l(q + "%")
                  }
                  ),
                  z.forEach(U => {
                     U.style.transform = l(Q + "%")
                  }
                  ),
                  D.forEach(U => {
                     U.style.transform = l(Z + "%")
                  }
                  )),
               w.style.transform = l(G + "px"),
               w.style.zIndex = e.slides.length - P
         }
      }
      , a = m => {
         const { slides: v } = e;
         for (let b = 0; b < v.length; b += 1) {
            const P = v[b]
               , w = n(P);
            let S = "";
            w !== i && (S = ", .super-flow-image img, .super-flow-fragment, .super-flow-fragment-border,  .super-flow-content"),
               [P, ...P.querySelectorAll(`.super-flow-fragments, .super-flow-image${S}`)].forEach(A => {
                  A.style.transitionDuration = `${m}ms`
               }
               )
         }
         ns({
            swiper: e,
            duration: m,
            transformElements: v,
            allSlides: !0
         })
      }
      , d = {
         left: [],
         right: []
      }
      , g = (m, v, b) => {
         let P = 0
            , w = 0;
         m === "left" && (v === 0 ? (P = 20 + Math.random() * 5,
            w = 5 + Math.random() * 5,
            d.left.push([P, w])) : v === 1 ? (P = 5 + Math.random() * 5,
               w = 10 + Math.random() * 10) : v === 2 && (P = d.left[0][0] - Math.random() * 10,
                  w = d.left[0][1] - Math.random() * 5)),
            m === "right" && (v === 0 ? (P = 5 + Math.random() * 5,
               w = 20 + Math.random() * 10,
               d.right.push([P, w])) : v === 1 ? (P = 10 + Math.random() * 10,
                  w = 5 + Math.random() * 5) : v === 2 && (P = d.right[0][0] - Math.random() * 5,
                     w = d.right[0][1] - Math.random() * 10));
         const S = m === "left" ? [[0, 0], [P, 0], [w, 100], [0, 100]] : [[100, 0], [100 - P, 0], [100 - w, 100], [100, 100]];
         let A = ""
            , x = "";
         return m === "left" && (A = `polygon(${S.map(E => E.map((C, z) => z === 0 ? `calc(${C}% + ${b}px)` : `${C}%`).join(" ")).join(",")})`),
            m === "right" && (A = `polygon(${S.map(E => E.map((C, z) => z === 0 ? `calc(${C}% - ${b}px)` : `${C}%`).join(" ")).join(",")})`),
            x = `polygon(${S.map(E => E.map(C => `${C}%`).join(" ")).join(",")})`,
         {
            borderClipPath: A,
            imageClipPath: x
         }
      }
      , u = m => {
         const v = m.params.superFlowEffect.fragmentBorderWidth
            , b = m.params.superFlowEffect.fragmentBlur
            , P = e.isHorizontal()
            , w = e.rtlTranslate;
         e.el.querySelectorAll(".super-flow-image").forEach(S => {
            const A = S.querySelector("img:not(.super-flow-fragment)");
            if (!A)
               return;
            S.querySelectorAll(".super-flow-fragment, .super-flow-fragment-border").forEach(L => {
               L.remove()
            }
            );
            const x = Math.random() > .5
               , E = (5 + Math.random() * 4) / 2
               , C = P ? w ? [[x ? E : 0, 0], [100, 0], [100, 100], [x ? 0 : E, 100]] : [[0, 0], [x ? 100 - E : 100, 0], [x ? 100 : 100 - E, 100], [0, 100]] : [[0, 0], [100, 0], [100, x ? 100 - E : 100], [0, x ? 100 : 100 - E]];
            S.style.clipPath = `polygon(${C.map(L => L.map(G => `${G}%`).join(" ")).join(",")})`;
            const z = document.createElement("div");
            z.classList.add("super-flow-fragments"),
               S.appendChild(z);
            const D = Math.min(Math.max(0, m.params.superFlowEffect.fragments), 3);
            for (let L = 0; L < D; L += 1) {
               const G = A.cloneNode(!0)
                  , O = document.createElement("div");
               G.classList.add("super-flow-fragment"),
                  O.classList.add("super-flow-fragment-border");
               const { borderClipPath: I, imageClipPath: $ } = g("left", L, v);
               O.style.clipPath = I,
                  G.style.clipPath = $,
                  b && (G.style.filter = `blur(${L + 1}px)`),
                  z.appendChild(O),
                  z.appendChild(G)
            }
            for (let L = 0; L < D; L += 1) {
               const G = A.cloneNode(!0)
                  , O = document.createElement("div");
               G.classList.add("super-flow-fragment"),
                  O.classList.add("super-flow-fragment-border");
               const { borderClipPath: I, imageClipPath: $ } = g("right", L, v);
               O.style.clipPath = I,
                  G.style.clipPath = $,
                  b && (G.style.filter = `blur(${L + 1}px)`),
                  z.appendChild(O),
                  z.appendChild(G)
            }
         }
         )
      }
      , T = () => {
         e.slides.filter((v, b) => {
            const P = n(v)
               , w = e.params.loop ? e.realIndex : e.activeIndex;
            return P !== w
         }
         ).forEach((v, b) => {
            v.querySelectorAll("img, .super-flow-fragment, .super-flow-fragment-border").forEach(P => {
               P.style.transitionDuration = "0ms",
                  P.style.transform = ""
            }
            )
         }
         )
      }
      , c = () => {
         const v = e.params.virtual && e.virtual && e.params.virtual.enabled ? e.slides.find(F => F.getAttribute("data-swiper-slide-index") === (e.params.loop ? e.realIndex : e.activeIndex).toString()) : e.slides[e.activeIndex]
            , b = n(v)
            , P = e.rtlTranslate ? -1 : 1;
         if (b === i)
            return;
         i = b;
         const w = e.params.superFlowEffect
            , { scaleDuration: S, mainImageScale: A, level1Scale: x, level2Scale: E, level3Scale: C, contentOffset: z, contentScale: D } = w
            , L = v.querySelector(".super-flow-image > img")
            , G = v.querySelector(".super-flow-content")
            , { allFragments: O, level1Fragments: I, level2Fragments: $, level3Fragments: B } = r(v);
         L && (L.style.transitionDuration = "0ms",
            L.style.transitionTimingFunction = "linear",
            L.style.transform = `${l()} scale(1)`),
            G && (G.style.transitionDuration = "0ms",
               L.style.transitionTimingFunction = "linear",
               G.style.transform = l(`${-z * P}%`)),
            O.forEach(F => {
               F.style.transitionDuration = "0ms",
                  F.style.transform = l()
            }
            ),
            v.clientLeft,
            L && (L.style.transitionDuration = `${S}ms`,
               L.style.transitionTimingFunction = "linear",
               L.style.transform = `${l()} scale(${A})`),
            G && (G.style.transitionDuration = `${S}ms`,
               G.style.transitionTimingFunction = "linear",
               G.style.transform = `${l(`${z * P}%`)} scale(${D})`),
            O.forEach(F => {
               F.style.transitionDuration = `${S}ms`,
                  F.style.transitionTimingFunction = "linear"
            }
            ),
            I.forEach(F => {
               F.style.transform = `${l()} scale(${x})`
            }
            ),
            $.forEach(F => {
               F.style.transform = `${l()} scale(${E})`
            }
            ),
            B.forEach(F => {
               F.style.transform = `${l()} scale(${C})`
            }
            )
      }
      ;
   let h = !1;
   const y = () => {
      h = !0,
         requestAnimationFrame(() => {
            h = !1
         }
         )
   }
      , M = () => {
         h || c()
      }
      , f = () => {
         T(),
            c()
      }
      , p = () => {
         e.params.initialSlide === 0 && c()
      }
      ;
   s("beforeInit", u),
      s("init", p),
      s("touchEnd", y),
      s("transitionStart", M),
      s("transitionEnd", f),
      s("virtualUpdate", o),
      is({
         effect: "super-flow",
         swiper: e,
         on: s,
         setTranslate: o,
         setTransition: a,
         perspective: () => !1,
         overwriteParams: () => {
            let m = {};
            return e.passedParams.breakpoints && Object.keys(e.passedParams.breakpoints).forEach(v => {
               m[v] = {
                  ...e.passedParams.breakpoints[v],
                  slidesPerView: 1,
                  spaceBetween: 0
               }
            }
            ),
            {
               virtualTranslate: !0,
               centeredSlides: !1,
               slidesPerGroup: 1,
               slidesPerView: 1,
               watchSlidesProgress: !0,
               spaceBetween: 0,
               breakpoints: m
            }
         }
      })
}
new H(".business-center__slider", {
   direction: "horizontal",
   modules: [rs, ss, ts, Zt],
   effect: "super-flow",
   slidesPerView: 1,
   loop: !0,
   pagination: {
      el: ".business-center__pagination",
      clickable: true,
   },
   superFlowEffect: {
      fragments: 3,
      fragmentBlur: !1,
      fragmentBorderWidth: 2,
      scaleDuration: 4e3,
      contentOffset: 5,
      contentScale: 1.2,
      mainImageScale: 1.1,
      level1Scale: 1.15,
      level2Scale: 1.2,
      level3Scale: 1.25
   },
   speed: 1e3,
   grabCursor: !0,
   autoplay: {
      delay: 3e3,
      disableOnInteraction: !1
   }
});
