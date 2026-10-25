/* ==========================================================================
   motion.js — semua animasi halus (reveal, tilt, magnetic, parallax, progress).
   Menghormati prefers-reduced-motion dan berhenti saat tab tidak terlihat.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var EASE = "cubic-bezier(.22,.8,.2,1)";

  var Motion = {
    reduced: mq.matches,
    finePointer: fine.matches,
    ease: EASE,
    /** callback dipanggil saat tab tersembunyi / terlihat lagi */
    onVisibility: function (fn) { document.addEventListener("visibilitychange", function () { fn(!document.hidden); }); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    clamp: function (v, a, b) { return Math.min(b, Math.max(a, v)); }
  };
  mq.addEventListener && mq.addEventListener("change", function (e) { Motion.reduced = e.matches; });

  /* ---------- Reveal: fade + naik sedikit, berurutan ---------- */
  function showNow(el) { el.style.opacity = 1; el.style.transform = ""; }

  function playReveal(el, delay) {
    if (el.__shown) return; el.__shown = true;
    if (Motion.reduced || !el.animate) { showNow(el); return; }
    var a = el.animate(
      [{ opacity: 0, transform: "translateY(26px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 900, delay: delay || 0, easing: EASE, fill: "both" }
    );
    a.onfinish = function () { showNow(el); try { a.cancel(); } catch (e) {} };
  }

  var io = null;
  function ensureIO() {
    if (io) return io;
    io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        var el = e.target;
        var base = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        var idx = el.__stagger != null ? el.__stagger : i;
        playReveal(el, base + idx * 90);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    return io;
  }

  /** Daftarkan semua [data-reveal] di dalam `scope`. Anak dari [data-stagger] diberi jeda berurutan. */
  Motion.reveal = function (scope) {
    scope = scope || document;
    var obs = ensureIO();
    scope.querySelectorAll("[data-stagger]").forEach(function (p) {
      p.querySelectorAll(":scope > [data-reveal]").forEach(function (c, i) { c.__stagger = i; });
    });
    scope.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (el.__seen) return; el.__seen = true;
      if (Motion.reduced) { showNow(el); el.__shown = true; return; }
      obs.observe(el);
    });
  };

  /* ---------- Hero intro: nama naik dari balik garis, peran berurutan ---------- */
  Motion.heroIntro = function () {
    var lines = document.querySelectorAll(".hero__name .line__in");
    var roles = document.querySelectorAll(".roles li");
    function clear(el) { el.style.transform = "none"; el.style.opacity = 1; }
    if (Motion.reduced || !document.body.animate) { lines.forEach(clear); roles.forEach(clear); return; }
    lines.forEach(function (el, i) {
      var a = el.animate([{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
        { duration: 1100, delay: 150 + i * 140, easing: EASE, fill: "both" });
      a.onfinish = function () { clear(el); try { a.cancel(); } catch (e) {} };
    });
    roles.forEach(function (el, i) {
      var a = el.animate([{ opacity: 0, transform: "translateX(-12px)" }, { opacity: 1, transform: "none" }],
        { duration: 800, delay: 650 + i * 110, easing: EASE, fill: "both" });
      a.onfinish = function () { clear(el); try { a.cancel(); } catch (e) {} };
    });
  };

  /* ---------- Tilt 3D mengikuti kursor (+ pantulan cahaya bila data-tilt) ---------- */
  Motion.tilt = function (el, opt) {
    if (!Motion.finePointer || el.__tilt) return; el.__tilt = true;
    opt = opt || {};
    var max = opt.max || 8, area = opt.area || el, glare = !!opt.glare;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, inside = false;
    var gl = null;
    if (glare) {
      gl = document.createElement("span"); gl.className = "glare"; gl.setAttribute("aria-hidden", "true");
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      el.appendChild(gl);
    }
    function frame() {
      cx = Motion.lerp(cx, tx, 0.12); cy = Motion.lerp(cy, ty, 0.12);
      el.style.transform = "perspective(1000px) rotateX(" + (-cy * max).toFixed(2) + "deg) rotateY(" + (cx * max).toFixed(2) + "deg)";
      if (gl) { gl.style.setProperty("--mx", ((cx + 1) * 50).toFixed(1) + "%"); gl.style.setProperty("--my", ((cy + 1) * 50).toFixed(1) + "%"); gl.style.opacity = inside ? 1 : 0; }
      if (Math.abs(cx - tx) > 0.002 || Math.abs(cy - ty) > 0.002) raf = requestAnimationFrame(frame); else raf = 0;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }
    area.addEventListener("pointermove", function (e) {
      if (Motion.reduced || e.pointerType === "touch") return;
      var r = area.getBoundingClientRect();
      tx = Motion.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      ty = Motion.clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      inside = true; kick();
    });
    area.addEventListener("pointerleave", function () { tx = 0; ty = 0; inside = false; kick(); });
  };

  /* ---------- Magnetic ---------- */
  Motion.magnetic = function (el) {
    if (!Motion.finePointer || el.__mag) return; el.__mag = true;
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    function frame() {
      x = Motion.lerp(x, tx, 0.18); y = Motion.lerp(y, ty, 0.18);
      el.style.transform = "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px)";
      if (Math.abs(x - tx) > 0.05 || Math.abs(y - ty) > 0.05) raf = requestAnimationFrame(frame);
      else { raf = 0; if (!tx && !ty) el.style.transform = ""; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }
    window.addEventListener("pointermove", function (e) {
      if (Motion.reduced) return;
      var r = el.getBoundingClientRect();
      var mx = r.left + r.width / 2, my = r.top + r.height / 2;
      var dx = e.clientX - mx, dy = e.clientY - my;
      var reach = Math.max(r.width, r.height) * 0.9;
      if (Math.hypot(dx, dy) < reach) { tx = dx * 0.28; ty = dy * 0.4; } else if (tx || ty) { tx = 0; ty = 0; } else return;
      kick();
    }, { passive: true });
  };

  /* ---------- Parallax foto saat scroll (data-parallax="0.1") ---------- */
  var para = [];
  Motion.parallax = function (scope) {
    (scope || document).querySelectorAll("[data-parallax]").forEach(function (el) {
      if (el.__par) return; el.__par = true; para.push({ el: el, k: parseFloat(el.getAttribute("data-parallax")) || 0.08, on: false });
    });
    if (!para.length || Motion.__paraIO) return;
    Motion.__paraIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { for (var i = 0; i < para.length; i++) if (para[i].el === e.target) para[i].on = e.isIntersecting; });
      schedule();
    }, { rootMargin: "20% 0px" });
    para.forEach(function (p) { Motion.__paraIO.observe(p.el); });
  };

  /* ---------- Progres baca + parallax dalam satu rAF ---------- */
  var bar = document.querySelector(".progress i"), ticking = false;
  function update() {
    ticking = false;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Motion.clamp(window.scrollY / h, 0, 1) : 0).toFixed(4) + ")";
    if (!Motion.reduced) {
      var vh = window.innerHeight;
      para.forEach(function (p) {
        if (!p.on) return;
        var r = p.el.parentElement.getBoundingClientRect();
        var off = (r.top + r.height / 2 - vh / 2) * -p.k;
        p.el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0) scale(1.12)";
      });
    }
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  /** Inisialisasi semua efek deklaratif di dalam `scope`. */
  Motion.init = function (scope) {
    scope = scope || document;
    scope.querySelectorAll("[data-tilt]").forEach(function (el) { Motion.tilt(el, { max: 8, glare: true }); });
    scope.querySelectorAll("[data-tilt-soft]").forEach(function (el) { Motion.tilt(el, { max: 5, area: el.closest("[data-tilt-area]") || el.parentElement }); });
    scope.querySelectorAll("[data-magnetic]").forEach(Motion.magnetic);
    Motion.parallax(scope);
    Motion.reveal(scope);
    schedule();
  };

  window.Motion = Motion;
})();
