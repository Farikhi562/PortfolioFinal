/* ==========================================================================
   app.js — merender konten dari content.js, nav, jam, dan potret 3D hero.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.CONTENT, M = window.Motion;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  /* ---------- Hero text ---------- */
  var P = C.person;
  $("#nameFirst").textContent = P.first;
  var last = $("#nameLast"); last.textContent = P.last;
  var dot = el("span", "dot", "."); last.appendChild(dot);
  $("#tagline").textContent = P.tagline;
  var rolesEl = $("#roles");
  P.roles.forEach(function (r) { rolesEl.appendChild(el("li", null, r)); });

  /* ---------- Nav (desktop + mobile menu) ---------- */
  var navLinks = $("#navLinks"), menuLinks = $("#menuLinks");
  C.nav.forEach(function (n, i) {
    var a = el("a", null, n.label); a.href = "#" + n.id; a.dataset.id = n.id; navLinks.appendChild(a);
    var m = el("a", null, n.label); m.href = "#" + n.id;
    var s = el("small", null, String(i + 1).padStart(2, "0")); m.appendChild(s); menuLinks.appendChild(m);
  });
  $("#menuFoot").textContent = P.city + " · " + P.email;

  var burger = $("#burger"), menu = $("#menu"), menuTimer;
  function setMenu(open) {
    clearTimeout(menuTimer);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { menu.hidden = false; requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("is-open"); }); }); }
    else { menu.classList.remove("is-open"); menuTimer = setTimeout(function () { menu.hidden = true; }, 720); }
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setMenu(false); burger.focus(); } });
  window.matchMedia("(min-width:901px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });

  /* ---------- Affiliations ---------- */
  var aff = $("#aff");
  C.affiliations.forEach(function (a) {
    var li = el("li", "aff__item"); li.setAttribute("data-reveal", "");
    var logo = el("div", "aff__logo");
    if (a.logo) { var im = new Image(); im.src = a.logo; im.alt = a.name; im.loading = "lazy"; logo.appendChild(im); }
    else { var w = el("span", "aff__word", a.name); logo.appendChild(w); }
    li.appendChild(logo); li.appendChild(el("p", "aff__note", a.note)); aff.appendChild(li);
  });
  aff.setAttribute("data-stagger", "");

  /* ---------- Section shells ---------- */
  document.querySelectorAll("[data-sec]").forEach(function (sec) {
    var k = sec.dataset.sec, S = C.sections[k];
    var label = el("p", "sec__label"); label.setAttribute("data-reveal", "");
    var b = el("b", null, S.no); label.appendChild(b); label.appendChild(document.createTextNode(" / " + S.label.toUpperCase()));
    var h = el("h2", "sec__title"); h.setAttribute("data-reveal", "");
    h.appendChild(document.createTextNode(S.a + " ")); h.appendChild(el("span", "serif", S.b));
    sec.appendChild(label); sec.appendChild(h);
    if (!build(k, sec)) {
      var hint = el("p", "sec__hint", "Isi section ini menyusul · " + C.skeleton[k]); hint.setAttribute("data-reveal", "");
      sec.appendChild(hint);
    }
    sec.setAttribute("data-stagger", "");
  });

  $("#footTxt").textContent = "© 2026 " + P.first + " " + P.last + " · " + P.city;

  /* ---------- Jam lokal ---------- */
  $("#city").textContent = P.city + " ·";
  var clockEl = $("#clock"), fmt;
  try { fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: P.timezone }); } catch (e) { fmt = null; }
  function tickClock() {
    var d = new Date(), s = fmt ? fmt.format(d) : d.toTimeString().slice(0, 8);
    clockEl.textContent = s + " " + P.tzLabel; clockEl.setAttribute("datetime", d.toISOString());
  }
  tickClock();
  var clockT = setInterval(tickClock, 1000);
  M.onVisibility(function (vis) { clearInterval(clockT); if (vis) { tickClock(); clockT = setInterval(tickClock, 1000); } });

  /* ---------- Nav aktif ---------- */
  var navMap = {};
  navLinks.querySelectorAll("a").forEach(function (a) { navMap[a.dataset.id] = a; });
  var secIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      Object.keys(navMap).forEach(function (k) { navMap[k].removeAttribute("aria-current"); });
      if (navMap[e.target.id]) navMap[e.target.id].setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("[data-sec]").forEach(function (s) { secIO.observe(s); });

  /* ======================================================================
     Potret 3D — turntable 360° dari frame hasil render model 3D
     ====================================================================== */
  var cv = $("#turn"), ctx = cv.getContext("2d");
  var H = C.hero, N = H.portraitFrames;
  cv.setAttribute("aria-label", H.alt + ". Gunakan panah kiri/kanan untuk memutar.");
  var frames = new Array(N), ready = 0;
  var angle = 0, target = null, tween = null;
  var userPaused = M.reduced, dragging = false, heroVisible = true, raf = 0, last = 0, resumeT = 0;
  var ppBtn = $("#pp"), slider = $("#angle"), out = $("#angleOut"), lastInt = -1;

  function norm(a) { return ((a % 360) + 360) % 360; }
  function pad(n) { return String(n).padStart(3, "0") + "°"; }
  function nearest(i) { for (var k = 0; k < N; k++) { var f = frames[(i + k) % N]; if (f) return f; } return null; }

  function draw() {
    var f = norm(angle) / 360 * N, i0 = Math.floor(f) % N, t = f - Math.floor(f);
    var a = nearest(i0); if (!a) return;
    ctx.globalAlpha = 1; ctx.drawImage(a, 0, 0, cv.width, cv.height);
    var b = frames[(i0 + 1) % N];
    if (b && t > 0.02) { ctx.globalAlpha = t; ctx.drawImage(b, 0, 0, cv.width, cv.height); ctx.globalAlpha = 1; }
    var ai = Math.round(norm(angle)) % 360;
    if (ai !== lastInt) { lastInt = ai; out.textContent = pad(ai); if (!dragging && document.activeElement !== slider) slider.value = ai; }
  }

  function canRun() { return heroVisible && !document.hidden; }
  function wantsFrame() { return canRun() && ((!userPaused && !dragging) || dragging || tween); }
  function kick() { if (!raf && canRun()) { last = 0; raf = requestAnimationFrame(tick); } }
  function tick(ts) {
    raf = 0;
    var dt = last ? Math.min((ts - last) / 1000, 0.1) : 0; last = ts;
    if (tween) {
      var p = Math.min((ts - tween.t0) / tween.dur, 1), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      angle = tween.from + (tween.to - tween.from) * e; if (p >= 1) { angle = norm(tween.to); tween = null; }
    } else if (!userPaused && !dragging) { angle += H.autoRotateDegPerSec * dt; }
    draw();
    if (wantsFrame()) raf = requestAnimationFrame(tick);
  }

  function setPaused(v) {
    userPaused = v; ppBtn.textContent = v ? "Play" : "Pause"; ppBtn.setAttribute("aria-pressed", v ? "true" : "false"); kick();
  }
  ppBtn.textContent = userPaused ? "Play" : "Pause"; ppBtn.setAttribute("aria-pressed", userPaused ? "true" : "false");
  ppBtn.addEventListener("click", function () { clearTimeout(resumeT); setPaused(!userPaused); });

  function goTo(deg) {
    var from = norm(angle), to = deg, d = ((to - from + 540) % 360) - 180;
    angle = from; tween = { from: from, to: from + d, t0: performance.now(), dur: M.reduced ? 1 : 750 };
    if (!userPaused) setPaused(true); kick();
  }
  document.querySelectorAll("[data-angle]").forEach(function (b) {
    b.addEventListener("click", function () { clearTimeout(resumeT); goTo(parseFloat(b.dataset.angle)); });
  });

  slider.addEventListener("input", function () { tween = null; angle = parseFloat(slider.value); if (!userPaused) setPaused(true); draw(); kick(); });

  /* drag untuk memutar */
  var lastX = 0;
  cv.addEventListener("pointerdown", function (e) {
    dragging = true; tween = null; lastX = e.clientX; clearTimeout(resumeT);
    try { cv.setPointerCapture(e.pointerId); } catch (err) {} kick();
  });
  cv.addEventListener("pointermove", function (e) {
    if (!dragging) return; angle -= (e.clientX - lastX) * 0.45; lastX = e.clientX; draw();
  });
  function endDrag() {
    if (!dragging) return; dragging = false;
    if (!userPaused) { /* lanjut berputar otomatis */ last = 0; kick(); }
  }
  cv.addEventListener("pointerup", endDrag); cv.addEventListener("pointercancel", endDrag);
  cv.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); tween = null; angle += (e.key === "ArrowLeft" ? -6 : 6); draw(); kick();
    }
  });

  /* berhenti render saat hero tidak terlihat / tab tersembunyi */
  new IntersectionObserver(function (es) { heroVisible = es[0].isIntersecting; if (heroVisible) kick(); }, { threshold: 0 }).observe($("#top"));
  M.onVisibility(function (vis) { if (vis) kick(); });

  /* memuat frame: frame 0 dulu, sisanya bertahap */
  function loadFrame(i) {
    return new Promise(function (res) {
      var im = new Image(); im.decoding = "async";
      im.onload = function () { frames[i] = im; ready++; res(true); };
      im.onerror = function () { res(false); };
      im.src = "assets/turn/" + String(i).padStart(2, "0") + ".webp";
    });
  }
  function showFallback() {
    cv.hidden = true; var fb = $("#fallback"); fb.src = H.fallbackPortrait; fb.hidden = false;
    fb.setAttribute("data-parallax", "0");
    $(".ring").style.top = "50%";
  }
  loadFrame(0).then(function (ok) {
    if (!ok) { showFallback(); return; }
    draw(); kick();
    var i = 1;
    (function batch() {
      var jobs = []; for (var k = 0; k < 6 && i < N; k++, i++) jobs.push(loadFrame(i));
      if (jobs.length) Promise.all(jobs).then(batch);
    })();
  });


  /* ======================================================================
     Section builders (tahap 2: 01 Person, 02 Craft)
     ====================================================================== */
  function build(k, sec) {
    if (k === "person") { buildPerson(sec); return true; }
    if (k === "craft") { buildCraft(sec); return true; }
    if (k === "projects") { buildProjects(sec); return true; }
    if (k === "record") { buildRecord(sec); return true; }
    if (k === "stage") { buildStage(sec); return true; }
    if (k === "writing") { buildWriting(sec); return true; }
    if (k === "life") { buildLife(sec); return true; }
    if (k === "connect") { buildConnect(sec); return true; }
    return false;
  }

  function buildPerson(sec) {
    var wrap = el("div", "person"); wrap.setAttribute("data-reveal", "");

    var bio = el("div", "person__bio");
    C.bio.forEach(function (t, i) { bio.appendChild(el("p", i === 0 ? "lead" : "", t)); });
    var meta = el("p", "person__meta", P.city + " · " + P.roles.join(" / ")); bio.appendChild(meta);

    var fig = el("figure", "pcard"); fig.setAttribute("data-tilt", "");
    var frame = el("div", "pcard__frame");
    frame.appendChild(el("span", "pcard__disc")); 
    var im = new Image(); im.src = C.hero.fallbackPortrait; im.loading = "lazy"; im.decoding = "async";
    im.alt = "Portrait of " + P.first + " " + P.last; im.setAttribute("data-parallax", "0.05");
    frame.appendChild(im); fig.appendChild(frame);
    fig.appendChild(el("figcaption", null, P.first + " " + P.last));

    wrap.appendChild(bio); wrap.appendChild(fig); sec.appendChild(wrap);

    var ul = el("ul", "stats"); ul.setAttribute("data-stagger", "");
    C.stats.forEach(function (s) {
      var li = el("li"); li.setAttribute("data-reveal", "");
      var card = el("div", "stat"); card.setAttribute("data-tilt", "");
      var v = el("p", "stat__v", s.value);
      var num = parseFloat(s.value);
      if (!isNaN(num) && /^[0-9.]+$/.test(s.value)) { v.dataset.count = s.value; v.dataset.dec = (s.value.split(".")[1] || "").length; }
      card.appendChild(v); card.appendChild(el("p", "stat__l", s.label)); li.appendChild(card); ul.appendChild(li);
    });
    sec.appendChild(ul);

    if (C.path && C.path.length) {
      var pl = el("ul", "rlist path"); pl.setAttribute("data-reveal", ""); pl.setAttribute("aria-label", "Pengalaman dan pendidikan");
      C.path.forEach(function (r) {
        var li = el("li", "rrow rrow--path");
        li.appendChild(el("span", "rrow__y", r.years)); li.appendChild(el("span", "rrow__n", r.role + " — " + r.place));
        li.appendChild(el("span", "rrow__l", r.type)); pl.appendChild(li);
      });
      sec.appendChild(pl);
    }

    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; cio.unobserve(e.target);
        var t = e.target, end = parseFloat(t.dataset.count), dec = +t.dataset.dec;
        if (M.reduced) return;
        var t0 = performance.now(), dur = 1500;
        (function f(now) {
          var p = Math.min((now - t0) / dur, 1), ez = 1 - Math.pow(1 - p, 4);
          t.textContent = (end * ez).toFixed(dec); if (p < 1) requestAnimationFrame(f); else t.textContent = end.toFixed(dec);
        })(t0);
      });
    }, { threshold: 0.6 });
    ul.querySelectorAll("[data-count]").forEach(function (n) { if (!M.reduced) n.textContent = (0).toFixed(+n.dataset.dec); cio.observe(n); });
  }

  /* ---------- Skill Atlas: kubus CSS 3D ---------- */
  function buildCraft(sec) {
    var S = C.skills, n = S.length;
    var atlas = el("div", "atlas"); atlas.setAttribute("data-reveal", "");

    var stage = el("div", "atlas__stage"); stage.setAttribute("data-tilt-area", "");
    var scene = el("div", "scene"); scene.setAttribute("data-tilt-soft", ""); scene.setAttribute("aria-hidden", "true");
    var cube = el("div", "cube");
    var pos = ["f0", "f1", "f2", "f3", "ftop", "fbot"];
    S.forEach(function (s, i) {
      var f = el("div", "face " + pos[i]);
      f.appendChild(el("span", "face__no", String(i + 1).padStart(2, "0")));
      f.appendChild(el("span", "face__t", s.title));
      cube.appendChild(f);
    });
    for (var j = n; j < 6; j++) { var d = el("div", "face face--blank " + pos[j]); d.appendChild(el("span", "face__t", j === 4 ? "Skill Atlas" : "FA.")); cube.appendChild(d); }
    scene.appendChild(cube); stage.appendChild(scene);
    stage.appendChild(el("p", "atlas__hint", "Pick a skill → the cube turns"));

    var side = el("div", "atlas__side");
    var tabs = el("div", "tabs"); tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-orientation", "vertical"); tabs.setAttribute("aria-label", "Skill areas");
    var panel = el("div", "dpanel"); panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-live", "polite"); panel.id = "atlasPanel";
    var btns = [];
    S.forEach(function (s, i) {
      var b = el("button", "tab"); b.type = "button"; b.setAttribute("role", "tab"); b.id = "tab-" + s.id;
      b.setAttribute("aria-controls", "atlasPanel"); b.appendChild(el("span", "tab__no", String(i + 1).padStart(2, "0")));
      b.appendChild(el("span", "tab__t", s.title)); b.appendChild(el("span", "tab__a", "↗"));
      b.addEventListener("click", function () { select(i, true); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return; e.preventDefault(); var ni = (cur + d + n) % n; select(ni, true); btns[ni].focus();
      });
      tabs.appendChild(b); btns.push(b);
    });
    side.appendChild(tabs); side.appendChild(panel);
    atlas.appendChild(stage); atlas.appendChild(side); sec.appendChild(atlas);

    var cur = -1, rx = -12, ry = 0;
    function target(i) {
      if (i < 4) {
        var want = -90 * i - 20, k = Math.round((ry - want) / 360);
        return { x: -12, y: want + 360 * k };
      }
      return { x: i === 4 ? -90 : 90, y: Math.round(ry / 360) * 360 };
    }
    function select(i, user) {
      if (i === cur) return;
      var first = cur < 0; cur = i;
      btns.forEach(function (b, k) { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
      panel.setAttribute("aria-labelledby", btns[i].id);
      var t = target(i); rx = t.x; ry = t.y;
      cube.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      cube.querySelectorAll(".face").forEach(function (f, k) { f.classList.toggle("is-on", k === i); });
      renderPanel(S[i], !first);
    }
    function renderPanel(s, animate) {
      panel.textContent = "";
      var h = el("h3", "dpanel__t", s.title); panel.appendChild(h);
      panel.appendChild(el("p", "dpanel__l", s.line));
      panel.appendChild(el("p", "dpanel__k", "Keywords"));
      var ch = el("ul", "chips"); s.keywords.forEach(function (w) { ch.appendChild(el("li", null, w)); }); panel.appendChild(ch);
      panel.appendChild(el("p", "dpanel__k", "Proof"));
      var pr = el("ul", "proof"); s.proof.forEach(function (w) { pr.appendChild(el("li", null, w)); }); panel.appendChild(pr);
      if (animate && !M.reduced && panel.animate) {
        Array.prototype.forEach.call(panel.children, function (c, i) {
          c.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 650, delay: i * 55, easing: M.ease, fill: "backwards" });
        });
      }
    }
    select(0, false);
    /* tombol di hero "See the skills" mendarat di sini; tidak perlu logika tambahan */
  }


  /* ---------- 03 / Record: prestasi + sertifikat ---------- */
  function buildRecord(sec) {
    var A = C.achievements, CE = C.certificates;
    var years = A.map(function (x) { return x.year; });
    var yMin = Math.min.apply(null, years), yMax = Math.max.apply(null, years);
    var LIMIT = 5, CLIM = 6, tab = "ach", q = "", cat = "Semua", showAll = false;

    var top = el("div", "rec__top"); top.setAttribute("data-reveal", "");
    var big = el("div", "rec__big");
    var num = el("p", "rec__num", String(A.length).padStart(2, "0"));
    num.dataset.count = A.length; num.dataset.dec = 0; num.dataset.pad = 2;
    big.appendChild(num);
    var bl = el("p", "rec__lbl", "Prestasi · " + yMin + "–" + yMax);
    big.appendChild(bl);
    big.appendChild(el("p", "rec__sub", "+ " + CE.length + " sertifikat & piagam"));
    top.appendChild(big);

    var ctrl = el("div", "rec__ctrl");
    var tabs = el("div", "rtabs"); tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Jenis catatan");
    var tabBtns = {};
    [["ach", "Prestasi", A.length], ["cert", "Sertifikat", CE.length]].forEach(function (t) {
      var b = el("button", "rtab"); b.type = "button"; b.setAttribute("role", "tab"); b.dataset.t = t[0];
      b.appendChild(document.createTextNode(t[1] + " ")); b.appendChild(el("sup", null, String(t[2])));
      b.addEventListener("click", function () { setTab(t[0]); });
      tabs.appendChild(b); tabBtns[t[0]] = b;
    });
    var search = el("label", "rsearch"); search.appendChild(el("span", "sr", "Cari nama lomba atau tahun"));
    var inp = el("input"); inp.type = "search"; inp.placeholder = "Cari lomba / tahun…"; inp.autocomplete = "off"; inp.setAttribute("aria-controls", "recList");
    search.appendChild(inp);
    ctrl.appendChild(tabs); ctrl.appendChild(search);
    top.appendChild(ctrl);
    sec.appendChild(top);

    var chipsWrap = el("div", "rchips"); chipsWrap.setAttribute("role", "group"); chipsWrap.setAttribute("aria-label", "Filter tingkat");
    chipsWrap.setAttribute("data-reveal", "");
    var cats = ["Semua"]; A.forEach(function (x) { if (cats.indexOf(x.level) < 0) cats.push(x.level); });
    var chipBtns = {};
    cats.forEach(function (k) {
      var b = el("button", "rchip", k); b.type = "button"; b.setAttribute("aria-pressed", k === cat);
      b.addEventListener("click", function () { cat = k; showAll = false; render(true); });
      chipsWrap.appendChild(b); chipBtns[k] = b;
    });
    sec.appendChild(chipsWrap);

    var list = el("ul", "rlist"); list.id = "recList";
    var more = el("button", "rmore"); more.type = "button"; more.setAttribute("data-magnetic", "");
    more.addEventListener("click", function () { showAll = !showAll; render(false, true); });
    var live = el("p", "sr"); live.setAttribute("aria-live", "polite");
    var wrap = el("div", "rwrap"); wrap.setAttribute("data-reveal", ""); wrap.appendChild(list); wrap.appendChild(more); wrap.appendChild(live);
    sec.appendChild(wrap);

    function setTab(t) {
      tab = t; q = ""; inp.value = ""; cat = "Semua"; showAll = false;
      chipsWrap.hidden = t !== "ach"; render(true);
    }
    inp.addEventListener("input", function () { q = inp.value.trim().toLowerCase(); showAll = false; render(true); });

    function match(s) { return !q || s.toLowerCase().indexOf(q) > -1; }

    function render(animateAll, animateNew) {
      Object.keys(tabBtns).forEach(function (k) { tabBtns[k].setAttribute("aria-selected", k === tab); tabBtns[k].tabIndex = k === tab ? 0 : -1; });
      cats.forEach(function (k) { chipBtns[k].setAttribute("aria-pressed", k === cat); });
      list.textContent = "";
      var items, total;
      if (tab === "ach") {
        items = A.filter(function (x) { return (cat === "Semua" || x.level === cat) && match([x.year, x.name, x.rank, x.level].join(" ")); });
        total = items.length; if (!showAll) items = items.slice(0, LIMIT);
        items.forEach(function (x) {
          var li = el("li", "rrow");
          li.appendChild(el("span", "rrow__y", String(x.year)));
          li.appendChild(el("span", "rrow__n", x.name));
          li.appendChild(el("span", "rrow__r", x.rank));
          li.appendChild(el("span", "rrow__l", x.level));
          list.appendChild(li);
        });
        list.classList.remove("rlist--certs");
      } else {
        items = CE.filter(function (x) { return match([x.title, x.issuer, x.date, x.group].join(" ")); });
        total = items.length; if (!showAll) items = items.slice(0, CLIM);
        items.forEach(function (x) {
          var li = el("li", "ccard");
          var card;
          if (x.url) { card = el("a", "ccard__in"); card.href = x.url; card.target = "_blank"; card.rel = "noopener"; card.setAttribute("aria-label", x.title + " — verifikasi sertifikat (tab baru)"); }
          else { card = el("button", "ccard__in"); card.type = "button"; card.setAttribute("aria-label", x.title + " — lihat sertifikat"); card.addEventListener("click", function () { openLightbox(x.full || [x.image], "Sertifikat " + x.title, card); }); }
          card.setAttribute("data-tilt", "");
          var im = new Image(); im.src = x.image; im.alt = "Sertifikat " + x.title; im.loading = "lazy"; im.decoding = "async";
          card.appendChild(im);
          var meta = el("div", "ccard__meta");
          meta.appendChild(el("p", "ccard__t", x.title));
          meta.appendChild(el("p", "ccard__d", x.issuer + " · " + x.date));
          meta.appendChild(el("span", "ccard__v", (x.url ? "Verify ↗" : "View ↗")));
          card.appendChild(meta); li.appendChild(card); list.appendChild(li);
        });
        list.classList.add("rlist--certs");
      }
      if (!items.length) { var e = el("li", "rempty", "Tidak ada hasil untuk “" + (q || cat) + "”."); list.appendChild(e); }
      var canMore = total > (tab === "ach" ? LIMIT : CLIM);
      more.hidden = !canMore;
      more.textContent = showAll ? "Show less ↑" : "Show all " + total + " ↓";
      live.textContent = total + " hasil";
      M.init(wrap);
      if (!M.reduced && list.children.length) {
        var start = animateNew ? (tab === "ach" ? LIMIT : CLIM) : 0;
        Array.prototype.forEach.call(list.children, function (r, i) {
          if (i < start) return;
          r.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 650, delay: (i - start) * 60, easing: M.ease, fill: "backwards" });
        });
      }
    }
    chipsWrap.hidden = false; render(false);
    tabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return; e.preventDefault();
      var n = tab === "ach" ? "cert" : "ach"; setTab(n); tabBtns[n].focus();
    });
    var cio = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; cio.disconnect();
      var t = num, end = +t.dataset.count; if (M.reduced) return; var t0 = performance.now();
      (function f(now) { var p = Math.min((now - t0) / 1400, 1), ez = 1 - Math.pow(1 - p, 4);
        t.textContent = String(Math.round(end * ez)).padStart(2, "0"); if (p < 1) requestAnimationFrame(f); })(t0);
    }, { threshold: 0.6 });
    if (!M.reduced) num.textContent = "00"; cio.observe(num);
  }


  /* ---------- Lightbox (sertifikat & galeri; mendukung video + deskripsi) ---------- */
  var lb;
  function openLightbox(imgs, label, opener, extra) {
    var i = 0; extra = extra || {};
    if (!lb) {
      lb = el("dialog", "lb");
      var x = el("button", "lb__x", "Close ✕"); x.type = "button"; x.addEventListener("click", function () { lb.close(); });
      var st = el("div", "lb__stage"), im = el("img"), vd = el("video"); im.decoding = "async";
      vd.controls = true; vd.playsInline = true; vd.preload = "metadata"; st.appendChild(im); st.appendChild(vd);
      var bar = el("div", "lb__bar"), cap = el("p", "lb__cap");
      var pv = el("button", "lb__n", "←"), nx = el("button", "lb__n", "→"); pv.type = nx.type = "button";
      pv.setAttribute("aria-label", "Halaman sebelumnya"); nx.setAttribute("aria-label", "Halaman berikutnya");
      bar.appendChild(pv); bar.appendChild(cap); bar.appendChild(nx);
      var info = el("div", "lb__info"), meta = el("p", "lb__meta"), desc = el("p", "lb__desc"); info.appendChild(meta); info.appendChild(desc);
      lb.appendChild(x); lb.appendChild(st); lb.appendChild(bar); lb.appendChild(info); document.body.appendChild(lb);
      lb._u = function () {
        var E = lb._extra, many = lb._imgs.length > 1;
        if (E.video) { im.hidden = true; vd.hidden = false; vd.poster = lb._imgs[0]; vd.src = E.video; vd.setAttribute("aria-label", lb._label); }
        else { vd.pause(); vd.removeAttribute("src"); vd.hidden = true; im.hidden = false; im.src = lb._imgs[i]; im.alt = lb._label + (many ? " — halaman " + (i + 1) : ""); }
        cap.textContent = lb._label + (many ? " · " + (i + 1) + " / " + lb._imgs.length : "");
        meta.textContent = E.meta || ""; desc.textContent = E.desc || ""; info.hidden = !(E.meta || E.desc);
        bar.classList.toggle("lb__bar--one", !many);
      };
      pv.addEventListener("click", function () { i = (i - 1 + lb._imgs.length) % lb._imgs.length; lb._u(); });
      nx.addEventListener("click", function () { i = (i + 1) % lb._imgs.length; lb._u(); });
      lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener("keydown", function (e) { if (lb._imgs.length > 1 && (e.key === "ArrowRight" || e.key === "ArrowLeft")) (e.key === "ArrowRight" ? nx : pv).click(); });
      lb.addEventListener("close", function () { vd.pause(); document.documentElement.classList.remove("lock"); i = 0; });
    }
    lb._imgs = imgs; lb._label = label; lb._extra = extra; i = 0; lb._u();
    document.documentElement.classList.add("lock"); lb.showModal();
  }

  /* ---------- 03 / Projects ---------- */
  function MOTIF() { return {
    home: '<path d="M60 110 L160 40 L260 110 V170 H60 Z"/><path d="M135 170 V125 H185 V170"/><circle class="a" cx="100" cy="140" r="7"/><circle cx="222" cy="136" r="7"/><path d="M40 170 H280"/>',
    chart: '<path d="M40 35 V165 H285"/><path d="M60 140 L100 115 L140 125 L180 85 L220 70"/><path class="a dash" d="M220 70 L255 48 L285 38"/><circle class="a" cx="220" cy="70" r="5"/>',
    derrick: '<path d="M120 165 L160 40 L200 165"/><path d="M133 125 H187"/><path d="M143 85 H177"/><path d="M60 165 H260"/><circle class="a" cx="160" cy="40" r="5"/>',
    campus: '<path d="M50 165 H270"/><path d="M70 165 V95 H250 V165"/><path d="M60 95 L160 45 L260 95"/><path d="M145 165 V125 H175 V165"/><path d="M95 120 H115 M205 120 H225"/><circle class="a" cx="160" cy="75" r="6"/>',
    locker: '<rect x="50" y="35" width="70" height="60"/><rect x="130" y="35" width="70" height="60"/><rect x="210" y="35" width="70" height="60"/><rect x="50" y="105" width="70" height="60"/><rect class="a" x="130" y="105" width="70" height="60"/><rect x="210" y="105" width="70" height="60"/><circle cx="108" cy="65" r="3.5"/><circle cx="188" cy="65" r="3.5"/><circle cx="268" cy="65" r="3.5"/><circle cx="108" cy="135" r="3.5"/><circle class="a" cx="188" cy="135" r="3.5"/><circle cx="268" cy="135" r="3.5"/>'
  }; }
  function visual(p, cls) {
    var v = el("div", cls + " pv pv--" + p.tone);
    if (p.thumb) { v.classList.add("pv--img"); if (p.thumbRatio) v.style.aspectRatio = p.thumbRatio; var im = new Image(); im.src = p.thumb; im.alt = p.thumbAlt || ("Sampul project " + p.name); im.loading = "lazy"; im.decoding = "async"; v.appendChild(im); }
    else { v.innerHTML = '<svg viewBox="0 0 320 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + MOTIF()[p.motif] + "</svg>"; }
    return v;
  }
  function pill(p) { var s = el("span", "pill pill--" + p.status.toLowerCase()); s.appendChild(el("i")); s.appendChild(document.createTextNode(p.status)); return s; }
  function buildProjects(sec) {
    var grid = el("div", "pgrid"); grid.setAttribute("data-reveal", "");
    C.projects.forEach(function (p, n) {
      var card = el("article", "prj" + (p.featured ? " prj--feat" : "") + (p.thumb ? " prj--img" : ""));
      var main = el("button", "prj__main"); main.type = "button"; main.setAttribute("aria-label", p.name + " — buka detail project");
      main.addEventListener("click", function () { openProject(p, main); });
      var vis = visual(p, "prj__vis"); vis.appendChild(pill(p)); main.appendChild(vis);
      var tx = el("div", "prj__txt");
      tx.appendChild(el("p", "prj__cat", p.category));
      tx.appendChild(el("h3", "prj__name", p.name));
      tx.appendChild(el("p", "prj__desc", p.desc));
      main.appendChild(tx); card.appendChild(main);
      var act = el("div", "prj__act");
      if (p.url) { var a = el("a", "prj__go"); a.href = p.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.setAttribute("data-magnetic", "");
        a.appendChild(el("span", null, p.cta)); var ar = el("b", null, "↗"); ar.setAttribute("aria-hidden", "true"); a.appendChild(ar);
        a.setAttribute("aria-label", p.cta + " — " + p.name + " (tab baru)"); act.appendChild(a);
        var d = el("button", "prj__det", "Details"); d.type = "button"; d.addEventListener("click", function () { openProject(p, d); }); act.appendChild(d);
      } else { var g = el("button", "prj__go"); g.type = "button"; g.setAttribute("data-magnetic", ""); g.appendChild(el("span", null, p.cta));
        var ar2 = el("b", null, "+"); ar2.setAttribute("aria-hidden", "true"); g.appendChild(ar2); g.addEventListener("click", function () { openProject(p, g); }); act.appendChild(g); }
      card.appendChild(act); grid.appendChild(card);
    });
    sec.appendChild(grid);
  }
  var pd;
  function field(parent, title, value, label) {
    var f = el("section", "pd__f"); var h = el("h4", null, title); if (label) h.appendChild(el("em", null, label)); f.appendChild(h);
    if (value == null) f.appendChild(el("p", "pd__tbd", "To be documented"));
    else if (Array.isArray(value)) { var ul = el("ul", "pd__chips"); value.forEach(function (v) { ul.appendChild(el("li", null, v)); }); f.appendChild(ul); }
    else f.appendChild(el("p", null, value));
    parent.appendChild(f);
  }
  function openProject(p, opener) {
    if (!pd) { pd = el("dialog", "pd"); document.body.appendChild(pd);
      pd.addEventListener("click", function (e) { if (e.target === pd) pd.close(); });
      pd.addEventListener("close", function () { document.documentElement.classList.remove("lock"); }); }
    pd.textContent = ""; pd.setAttribute("aria-label", p.name);
    var x = el("button", "lb__x", "Close ✕"); x.type = "button"; x.addEventListener("click", function () { pd.close(); }); pd.appendChild(x);
    var head = el("div", "pd__head" + (p.thumb ? " pd__head--img" : "")); head.appendChild(visual(p, "pd__vis"));
    var ht = el("div", "pd__ht"); ht.appendChild(el("p", "prj__cat", p.category)); ht.appendChild(el("h3", "pd__name", p.name));
    var meta = el("p", "pd__meta"); meta.appendChild(pill(p)); if (p.program) meta.appendChild(el("span", null, p.program)); ht.appendChild(meta);
    head.appendChild(ht); pd.appendChild(head);
    var body = el("div", "pd__body");
    field(body, "Problem", p.problem); field(body, "Solution", p.solution);
    field(body, "My Role", p.role ? p.role : null);
    if (p.contribution) field(body, "Contribution focus", p.contribution);
    field(body, "Technology Stack", p.stack); field(body, "Current Status", p.statusNote);
    (p.extra || []).forEach(function (e) { field(body, e.title, e.items, e.label); });
    pd.appendChild(body);
    var foot = el("div", "pd__foot");
    if (p.url) { var a = el("a", "btn btn--solid"); a.href = p.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.appendChild(el("span", p.cta ? null : null, p.cta)); a.appendChild(el("b", null, "↗")); foot.appendChild(a); }
    if (p.repo) { var r = el("a", "btn btn--line"); r.href = p.repo; r.target = "_blank"; r.rel = "noopener noreferrer"; r.appendChild(el("span", null, "Repository")); r.appendChild(el("b", null, "↗")); foot.appendChild(r); }
    if (!p.url && !p.repo) foot.appendChild(el("p", "pd__tbd", "No public demo or repository yet."));
    pd.appendChild(foot);
    document.documentElement.classList.add("lock"); pd.showModal(); pd.scrollTop = 0;
  }

  /* ---------- 04 / Stage ---------- */
  function buildStage(sec) {
    var T = C.talks;
    var g = el("div", "stagebox"); g.setAttribute("data-reveal", "");
    var left = el("div", "stagebox__txt");
    var n = el("p", "stagebox__n", String(T.count).padStart(2, "0"));
    left.appendChild(n);
    left.appendChild(el("p", "stagebox__l", T.count === 1 ? "Speaking experience" : "Speaking experiences"));
    left.appendChild(el("p", "stagebox__p", T.text));
    var tags = el("ul", "chips"); (T.facts || []).forEach(function (f) { tags.appendChild(el("li", null, f)); }); left.appendChild(tags);

    var fig = el("figure", "scard"); fig.setAttribute("data-tilt", "");
    var fr = el("div", "scard__frame"); var im = new Image(); im.src = T.photo; im.alt = T.alt; im.loading = "lazy"; im.decoding = "async";
    im.setAttribute("data-parallax", "0.05"); fr.appendChild(im); fig.appendChild(fr);
    fig.appendChild(el("figcaption", null, "Online presentation · NCD"));
    g.appendChild(left); g.appendChild(fig); sec.appendChild(g);
  }


  /* ---------- 05 / Writing ---------- */
  function buildWriting(sec) {
    var W = C.publications, f = "Semua";
    var wrap = el("div", "writing"); wrap.setAttribute("data-reveal", "");
    var chips = el("div", "rchips rchips--l"); chips.setAttribute("role", "group"); chips.setAttribute("aria-label", "Filter publikasi");
    var keys = ["Semua"]; W.forEach(function (w) { [String(w.year), w.publisher].forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
    var btns = {};
    keys.forEach(function (k) {
      var b = el("button", "rchip", k); b.type = "button"; b.addEventListener("click", function () { f = k; render(); }); chips.appendChild(b); btns[k] = b;
    });
    var list = el("ul", "wlist"); var empty = el("p", "rempty", "Belum ada publikasi untuk filter ini."); empty.hidden = true;
    wrap.appendChild(chips); wrap.appendChild(list); wrap.appendChild(empty); sec.appendChild(wrap);
    function render() {
      keys.forEach(function (k) { btns[k].setAttribute("aria-pressed", k === f); });
      list.textContent = "";
      var items = W.filter(function (w) { return f === "Semua" || String(w.year) === f || w.publisher === f; });
      empty.hidden = items.length > 0;
      items.forEach(function (w, i) {
        var li = el("li"); var a = el("a", "witem"); a.href = w.url; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("aria-label", w.title + ", " + w.publisher + " " + w.year + " (tab baru)");
        a.appendChild(el("span", "witem__y", String(w.year)));
        var t = el("span", "witem__t"); t.appendChild(document.createTextNode(w.title)); a.appendChild(t);
        a.appendChild(el("span", "witem__p", w.publisher));
        var ar = el("span", "witem__a", "↗"); ar.setAttribute("aria-hidden", "true"); a.appendChild(ar);
        li.appendChild(a); list.appendChild(li);
        if (!M.reduced) li.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 650, delay: i * 70, easing: M.ease, fill: "backwards" });
      });
    }
    render();
  }

  /* ---------- 06 / Life: galeri ---------- */
  function buildLife(sec) {
    var G = C.gallery, n = G.length, cur = 0, busy = false;
    var box = el("div", "gal"); box.setAttribute("data-reveal", "");
    box.setAttribute("role", "region"); box.setAttribute("aria-roledescription", "carousel"); box.setAttribute("aria-label", "Galeri foto");
    var stage = el("div", "gal__stage"); stage.tabIndex = 0;
    var info = el("div", "gal__info"); var capMeta = el("p", "gal__meta"); var openBtn = el("button", "gal__open"); openBtn.type = "button"; openBtn.setAttribute("data-magnetic", ""); info.appendChild(capMeta); info.appendChild(openBtn);
    var cap = el("div", "gal__cap"); var capNo = el("span", "gal__no"); var capTx = el("span", "gal__tx"); cap.appendChild(capNo); cap.appendChild(capTx);
    var nav = el("div", "gal__nav");
    var prev = el("button", "gal__btn", "←"); prev.type = "button"; prev.setAttribute("aria-label", "Foto sebelumnya"); prev.setAttribute("data-magnetic", "");
    var next = el("button", "gal__btn", "→"); next.type = "button"; next.setAttribute("aria-label", "Foto berikutnya"); next.setAttribute("data-magnetic", "");
    nav.appendChild(prev); nav.appendChild(next);
    var thumbs = el("ul", "gal__thumbs"); var tb = [];
    G.forEach(function (g, i) {
      var li = el("li"); var b = el("button", "gal__th"); b.type = "button"; b.setAttribute("aria-label", "Foto " + (i + 1) + ": " + g.caption);
      var im = new Image(); im.src = g.src; im.alt = ""; im.loading = "lazy"; im.decoding = "async"; b.appendChild(im);
      b.addEventListener("click", function () { go(i); }); li.appendChild(b); thumbs.appendChild(li); tb.push(b);
    });
    var live = el("p", "sr"); live.setAttribute("aria-live", "polite");
    var foot = el("div", "gal__foot"); foot.appendChild(cap); foot.appendChild(nav);
    box.appendChild(stage); box.appendChild(foot); box.appendChild(info); box.appendChild(thumbs); box.appendChild(live); sec.appendChild(box);

    function slide(i) {
      var s = el("div", "gal__slide"); var bg = el("div", "gal__bg"); bg.style.backgroundImage = 'url("' + G[i].src + '")';
      var im = new Image(); im.src = G[i].src; im.alt = G[i].alt; im.decoding = "async"; s.appendChild(bg); s.appendChild(im); if (G[i].video) { var pl = el("span", "gal__play", "▶"); pl.setAttribute("aria-hidden", "true"); s.appendChild(pl); } return s;
    }
    function label(i) {
      capNo.textContent = String(i + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0"); capTx.textContent = G[i].title || G[i].caption; capMeta.textContent = G[i].meta || "";
      openBtn.textContent = G[i].video ? "Play the reel ▶" : "Read the story ↗"; openBtn.setAttribute("aria-label", (G[i].video ? "Putar video: " : "Baca cerita: ") + (G[i].title || G[i].caption));
      tb.forEach(function (b, k) { if (k === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
      live.textContent = "Foto " + (i + 1) + " dari " + n + ": " + G[i].caption;
    }
    function go(i, dir) {
      i = (i + n) % n; if (i === cur && stage.firstChild) return;
      var d = dir || (i > cur ? 1 : -1), old = stage.firstChild, s = slide(i); cur = i; label(i);
      stage.appendChild(s);
      if (M.reduced || !s.animate || !old) { if (old) old.remove(); return; }
      busy = true;
      var a = s.animate([{ opacity: 0, transform: "translateX(" + 3 * d + "%) scale(1.04)" }, { opacity: 1, transform: "none" }], { duration: 900, easing: M.ease });
      old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, easing: M.ease, fill: "forwards" });
      a.onfinish = function () { Array.prototype.slice.call(stage.children, 0, -1).forEach(function (c) { c.remove(); }); busy = false; };
    }
    prev.addEventListener("click", function () { go(cur - 1, -1); });
    next.addEventListener("click", function () { go(cur + 1, 1); });
    stage.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1, -1); } if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1, 1); } });
    function openItem() { var g = G[cur]; openLightbox([g.src], g.title || g.caption, openBtn, { desc: g.desc, meta: g.meta, video: g.video }); }
    openBtn.addEventListener("click", openItem);
    var sx = null;
    stage.addEventListener("pointerdown", function (e) { sx = e.clientX; });
    stage.addEventListener("pointerup", function (e) { if (sx == null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); else if (Math.abs(dx) < 6) openItem(); });
    stage.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); openItem(); } });
    stage.appendChild(slide(0)); label(0);
    G.forEach(function (g) { var p = new Image(); p.src = g.src; });
  }

  /* ---------- 07 / Connect ---------- */
  function buildConnect(sec) {
    var box = el("div", "connect"); box.setAttribute("data-reveal", "");
    var ul = el("ul", "clinks");
    [["Instagram", P.instagram.handle, P.instagram.url], ["Email", P.email, "mailto:" + P.email],
     ["LinkedIn", "/in/fauzanalfarikhi", P.linkedin], ["GitHub", "Farikhi562", P.github]].forEach(function (l) {
      var li = el("li"); var a = el("a", "clink"); a.href = l[2]; if (l[2].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
      a.appendChild(el("span", "clink__k", l[0])); a.appendChild(el("span", "clink__v", l[1])); var ar = el("span", "clink__a", "↗"); ar.setAttribute("aria-hidden", "true"); a.appendChild(ar);
      li.appendChild(a); ul.appendChild(li);
    });
    var big = el("a", "bigarrow"); big.href = P.instagram.url; big.target = "_blank"; big.rel = "noopener"; big.setAttribute("data-magnetic", "");
    big.setAttribute("aria-label", "Buka Instagram " + P.instagram.handle);
    var s = el("span", null, "↗"); s.setAttribute("aria-hidden", "true"); big.appendChild(s);
    box.appendChild(ul); box.appendChild(big); sec.appendChild(box);
  }


  /* ---------- Warna nav mengikuti section di bawahnya ---------- */
  var navEl = $("[data-nav]"), toneTick = false;
  function updateTone() {
    toneTick = false;
    if (burger.getAttribute("aria-expanded") === "true") { navEl.dataset.tone = "light"; return; }
    var els = document.elementsFromPoint(Math.round(window.innerWidth / 2), 34), tone = "light";
    for (var i = 0; i < els.length; i++) {
      var s = els[i].closest && els[i].closest(".sec, .hero, .aff, .foot");
      if (s) { tone = s.classList.contains("sec--cream") || s.classList.contains("sec--warm") || s.classList.contains("sec--red") || s.classList.contains("aff") ? "ink" : "light"; break; }
    }
    navEl.dataset.tone = tone === "ink" ? "ink" : "light";
  }
  function queueTone() { if (!toneTick) { toneTick = true; requestAnimationFrame(updateTone); } }
  window.addEventListener("scroll", queueTone, { passive: true }); window.addEventListener("resize", queueTone);
  burger.addEventListener("click", function () { setTimeout(updateTone, 0); });
  updateTone();

  /* ---------- Mulai animasi ---------- */
  M.init(document);
  M.heroIntro();
})();
