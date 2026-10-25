/* build-pages.js — membangun halaman statis (EN + ID) dari content.js + pages-data.js.
   Output: /projects, /achievements, /writing, /id/**, sitemap.xml, tools/og-manifest.json
   Jalankan (dari folder site/):  node tools/build-pages.js */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = {}; require(path.join(ROOT, "content.js"));
const C = window.CONTENT, P = C.person;
const D = require("./pages-data.js");
const { BASE, BUILD_DATE, UI } = D;

/* ---------- util ---------- */
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonld = o => JSON.stringify(o).replace(/</g, "\\u003c");
function md(s, subs) {              // **tebal** dan [teks](url), setelah escape
  s = String(s); Object.keys(subs || {}).forEach(k => { s = s.split(k).join(subs[k]); });
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[(.+?)\]\((.+?)\)/g, (m, t, u) =>
    /^https?:/.test(u) ? '<a href="' + u + '" target="_blank" rel="noopener">' + t + "</a>" : '<a href="' + u + '">' + t + "</a>");
}
function webpSize(file) {
  try {
    const b = fs.readFileSync(path.join(ROOT, file));
    if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null;
    const t = b.toString("ascii", 12, 16);
    if (t === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (t === "VP8L") { const v = b.readUInt32LE(21); return { w: (v & 0x3fff) + 1, h: ((v >> 14) & 0x3fff) + 1 }; }
    if (t === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  } catch (e) { }
  return null;
}
function img(src, alt, cls) {
  const sz = webpSize(src);
  return '<img' + (cls ? ' class="' + cls + '"' : "") + ' src="/' + esc(src) + '" alt="' + esc(alt) + '"' + (sz ? ' width="' + sz.w + '" height="' + sz.h + '"' : "") + ' loading="lazy" decoding="async">';
}
const rmrf = p => fs.rmSync(path.join(ROOT, p), { recursive: true, force: true });
const written = [];     // {url, alt:{en,id}} untuk sitemap
const ogList = [];      // kartu OG yang dibutuhkan
function write(rel, html) { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); }

/* ---------- URL helper ---------- */
const pre = lang => (lang === "id" ? "/id" : "");
const url = (lang, p) => pre(lang) + p;                  // p diawali "/", diakhiri "/"
const abs = (lang, p) => BASE + (p === "/" && lang === "id" ? "/id/" : url(lang, p));
const other = lang => (lang === "en" ? "id" : "en");

/* ---------- Data per bahasa ---------- */
function projectView(p, lang) {
  if (lang === "en") return p;
  const t = D.ID_PROJECTS[p.id] || {};
  return Object.assign({}, p, t);
}
function skillLine(s, lang) { return lang === "id" ? (D.ID_PERSON.skillLines[s.id] || s.line) : s.line; }

/* ---------- Kerangka halaman ---------- */
function layout(o) {
  const lang = o.lang, T = UI[lang], alt = other(lang);
  const canonical = abs(lang, o.path), altUrl = abs(alt, o.path);
  const enUrl = abs("en", o.path), idUrl = abs("id", o.path);
  const ogKey = o.og;       // nama file di assets/og/ (tanpa ekstensi), atau null = og-image.jpg
  const ogImg = BASE + (ogKey ? "/assets/og/" + ogKey + ".jpg" : "/assets/og-image.jpg");
  const crumbs = o.crumbs || [];
  const ld = [{ "@context": "https://schema.org", "@graph": [].concat(o.ld || [], crumbs.length ? [{
    "@type": "BreadcrumbList", "itemListElement": crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c[0], item: BASE + c[1] }))
  }] : []) }];
  const nav = [[T.projects, url(lang, "/projects/")], [T.achievements, url(lang, "/achievements/")], [T.writing, url(lang, "/writing/")]]
    .map(n => '<a href="' + n[1] + '"' + (o.section && n[1] === o.section ? ' aria-current="page"' : "") + ">" + esc(n[0]) + "</a>").join("");
  const homeHref = lang === "id" ? "/id/" : "/";
  const crumbHtml = crumbs.length > 1 ? '<nav class="crumbs" aria-label="' + esc(T.breadcrumb) + '"><ol>' + crumbs.map((c, i) =>
    "<li>" + (i < crumbs.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + "</a>" : '<span aria-current="page">' + esc(c[0]) + "</span>") + "</li>").join("") + "</ol></nav>" : "";
  return '<!doctype html>\n<html lang="' + T.htmlLang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "<title>" + esc(o.title) + "</title>\n" +
    '<meta name="description" content="' + esc(o.desc) + '">\n<meta name="author" content="Muhamad Fauzan Al Farikhi">\n' +
    '<meta name="robots" content="' + (o.robots || "index,follow,max-image-preview:large") + '">\n<meta name="theme-color" content="#0A0A09">\n' +
    '<link rel="canonical" href="' + canonical + '">\n' +
    '<link rel="alternate" hreflang="en" href="' + enUrl + '">\n<link rel="alternate" hreflang="id" href="' + idUrl + '">\n<link rel="alternate" hreflang="x-default" href="' + enUrl + '">\n' +
    '<link rel="icon" href="/favicon.ico" sizes="48x48">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">\n<link rel="icon" href="/assets/icons/favicon-48.png" type="image/png" sizes="48x48">\n<link rel="icon" href="/assets/icons/icon-192.png" type="image/png" sizes="192x192">\n<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">\n' +
    '<meta property="og:type" content="' + (o.ogType || "website") + '">\n<meta property="og:site_name" content="Muhamad Fauzan Al Farikhi">\n<meta property="og:title" content="' + esc(o.title) + '">\n<meta property="og:description" content="' + esc(o.desc) + '">\n' +
    '<meta property="og:url" content="' + canonical + '">\n<meta property="og:image" content="' + ogImg + '">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:type" content="image/jpeg">\n<meta property="og:image:alt" content="' + esc(o.h1 || o.title) + '">\n' +
    '<meta property="og:locale" content="' + T.ogLocale + '">\n<meta property="og:locale:alternate" content="' + UI[alt].ogLocale + '">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + esc(o.title) + '">\n<meta name="twitter:description" content="' + esc(o.desc) + '">\n<meta name="twitter:image" content="' + ogImg + '">\n' +
    (o.extraHead || "") +
    '<script type="application/ld+json">' + jsonld(ld[0]) + "</script>\n" +
    '<link rel="preload" href="/assets/fonts/archivo-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="stylesheet" href="/pages.css">\n</head>\n<body>\n' +
    '<a class="skip" href="#main">' + esc(T.skip) + "</a>\n" +
    '<header class="pnav"><a class="pnav__mark" href="' + homeHref + '" aria-label="' + esc(T.portfolio) + ' — Muhamad Fauzan Al Farikhi">FA<span>.</span></a>' +
    '<nav class="pnav__links" aria-label="Primary">' + nav + '<a class="pnav__lang" href="' + url(alt, o.path === "/" ? "/" : o.path).replace(/^\/id\/\/$/, "/id/") + '" hreflang="' + alt + '" lang="' + alt + '" title="' + esc(T.langName) + '">' + esc(T.langShort) + "</a></nav></header>\n" +
    '<main id="main">\n' + crumbHtml + o.body + "\n</main>\n" +
    '<footer class="pfoot"><div class="pfoot__in"><p class="pfoot__t">' + esc(T.contact) + '</p><p class="pfoot__l">' + esc(T.contactLead) + '</p>' +
    '<ul class="pfoot__links"><li><a href="mailto:' + esc(P.email) + '">' + esc(T.email) + '</a></li><li><a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener me">LinkedIn</a></li><li><a href="' + esc(P.github) + '" target="_blank" rel="noopener me">GitHub</a></li><li><a href="' + esc(P.instagram.url) + '" target="_blank" rel="noopener me">Instagram</a></li><li><a href="/' + esc(P.cv.file) + '">' + esc(T.cv) + '</a></li></ul>' +
    '<p class="pfoot__c">© 2026 Muhamad Fauzan Al Farikhi · <a href="' + homeHref + '">' + esc(T.fullPortfolio) + "</a></p></div></footer>\n</body>\n</html>\n";
}

function register(lang, p, title, kicker, ogOverride) {
  const key = ogOverride || (lang + "-" + (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "-")));
  ogList.push({ key, kicker, title });
  return key;
}
function track(p) { if (!written.find(w => w.p === p)) written.push({ p }); }

const personRef = { "@type": "Person", name: "Muhamad Fauzan Al Farikhi", url: BASE + "/" };
const pill = (p, lang) => '<span class="pill pill--' + p.status.toLowerCase() + '"><i></i>' + esc(p.status) + "</span>";

/* ---------- Blok isi dipakai ulang ---------- */
function blocks(list, subs) {
  return list.map(b => b.h ? "<h2>" + esc(b.h) + "</h2>" : b.p ? "<p>" + md(b.p, subs) + "</p>" : b.ul ? "<ul>" + b.ul.map(x => "<li>" + md(x, subs) + "</li>").join("") + "</ul>" : "").join("\n");
}
function field(T, title, v) {
  if (v == null) return '<section class="fld"><h2>' + esc(title) + '</h2><p class="tbd">' + esc(T.tbd) + "</p></section>";
  return '<section class="fld"><h2>' + esc(title) + "</h2>" + (Array.isArray(v) ? "<ul>" + v.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "<p>" + esc(v) + "</p>") + "</section>";
}

/* ---------- Halaman project ---------- */
function projectPage(lang, p0) {
  const T = UI[lang], p = projectView(p0, lang), pth = "/projects/" + p0.id + "/";
  const ogKey = register(lang, pth, p.name, T.projects.toUpperCase() + " · " + p0.status.toUpperCase());
  const art = D.ARTICLES.find(a => a.project === p0.id), ach = Object.keys(D.ACH_PAGES).find(k => D.ACH_PAGES[k].project === p0.id);
  let body = '<article class="pg"><header class="ph"><p class="ph__k">' + esc(p.category) + '</p><h1>' + esc(p.name) + '</h1><p class="ph__m">' + pill(p0, lang) + (p0.program ? "<span>" + esc(p0.program) + "</span>" : "") + '</p><p class="ph__lede">' + esc(p.desc) + "</p></header>\n<div class=\"pc\">";
  if (p0.thumb) body += '<figure class="pfig">' + img(p0.thumb, p0.thumbAlt || ("Sampul " + p0.name)) + "</figure>";
  body += field(T, T.problem, p.problem) + field(T, T.solution, p.solution) + field(T, T.role, p.role || null);
  if (p.contribution) body += field(T, T.contribution, p.contribution);
  body += field(T, T.stack, p.stack) + field(T, T.status, p.statusNote);
  if (p0.supports && p0.supports.length) body += '<section class="fld"><h2>' + esc(T.supports) + '</h2><ul class="chips">' + p0.supports.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></section>";
  (p.extra || []).forEach(e => { body += '<section class="fld"><h2>' + esc(e.title) + (e.label ? ' <small class="lab">' + esc(e.label) + "</small>" : "") + "</h2>" + (e.items ? "<ul>" + e.items.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : '<p class="tbd">' + esc(T.tbd) + "</p>") + "</section>"; });
  if (p0.url) body += '<p class="cta"><a class="btn" href="' + esc(p0.url) + '" target="_blank" rel="noopener">' + esc(p.cta || T.visit) + ' <b aria-hidden="true">↗</b></a></p>';
  const rel = [];
  if (art) rel.push([D.ARTICLES.find(a => a.slug === art.slug)[lang].title, url(lang, "/writing/" + art.slug + "/")]);
  if (ach) rel.push([D.ACH_PAGES[ach][lang].h1, url(lang, "/achievements/" + ach + "/")]);
  rel.push([T.allProjects, url(lang, "/projects/")]);
  body += '<aside class="rel"><h2>' + esc(T.related) + "</h2><ul>" + rel.map(r => '<li><a href="' + r[1] + '">' + esc(r[0]) + "</a></li>").join("") + "</ul></aside></div></article>";
  const ldo = [{ "@type": "CreativeWork", "@id": abs(lang, pth) + "#project", name: p0.name, description: p.desc, url: abs(lang, pth), inLanguage: lang, creator: personRef, image: p0.thumb ? BASE + "/" + p0.thumb : undefined, sameAs: p0.url || undefined, dateModified: BUILD_DATE }];
  write((lang === "id" ? "id/" : "") + "projects/" + p0.id + "/index.html", layout({
    lang, path: pth, title: p0.name + (lang === "id" ? " | Project Fauzan Al Farikhi" : " | Project by Fauzan Al Farikhi"), desc: p.desc.length > 160 ? p.desc.slice(0, 157) + "…" : p.desc, h1: p0.name, body, og: ogKey, ld: ldo, section: url(lang, "/projects/"),
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.projects, url(lang, "/projects/")], [p0.name, url(lang, pth)]]
  })); track(pth);
}
function projectsHub(lang) {
  const T = UI[lang], pth = "/projects/";
  const ogKey = register(lang, pth, T.projects, "PORTFOLIO");
  const title = lang === "id" ? "Project | Muhamad Fauzan Al Farikhi" : "Projects | Muhamad Fauzan Al Farikhi";
  const desc = lang === "id" ? "Daftar project Muhamad Fauzan Al Farikhi: platform web, data forecasting, SaaS kampus NEXA Campus, konsep AI-SaaS NEXA-Sphere, dan smart locker IoT LOKi." : "Projects by Muhamad Fauzan Al Farikhi: web platforms, data forecasting, the NEXA Campus SaaS, the NEXA-Sphere AI-SaaS concept, and the LOKi IoT smart locker.";
  const items = C.projects.map(p0 => { const p = projectView(p0, lang); return '<li class="card"><p class="card__k">' + esc(p0.category) + '</p><h2><a href="' + url(lang, "/projects/" + p0.id + "/") + '">' + esc(p0.name) + "</a></h2><p>" + esc(p.desc) + "</p><p class=\"card__f\">" + pill(p0, lang) + '<a href="' + url(lang, "/projects/" + p0.id + "/") + '">' + esc(T.details) + " →</a></p></li>"; }).join("");
  const body = '<section class="pg"><header class="ph"><p class="ph__k">' + esc(T.portfolio) + "</p><h1>" + esc(T.projects) + '</h1><p class="ph__lede">' + esc(lang === "id" ? "Project yang sudah live, konsep yang sedang dikembangkan, dan prototipe — dengan status yang ditulis apa adanya." : "Live projects, concepts in development, and prototypes, with status stated as it is.") + '</p></header><div class="pc"><ul class="cards">' + items + "</ul></div></section>";
  write((lang === "id" ? "id/" : "") + "projects/index.html", layout({ lang, path: pth, title, desc, h1: T.projects, body, og: ogKey, section: url(lang, pth),
    ld: [{ "@type": "CollectionPage", name: T.projects, url: abs(lang, pth), inLanguage: lang, isPartOf: { "@type": "WebSite", url: BASE + "/" }, hasPart: C.projects.map(p => ({ "@type": "CreativeWork", name: p.name, url: abs(lang, "/projects/" + p.id + "/") })) }],
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.projects, url(lang, pth)]] })); track(pth);
}

/* ---------- Halaman prestasi ---------- */
function achievementPage(lang, key) {
  const T = UI[lang], A = D.ACH_PAGES[key], t = A[lang], pth = "/achievements/" + key + "/";
  const ogKey = register(lang, pth, t.h1, T.achievements.toUpperCase() + " · 2026");
  const subs = { "URL": A.url };
  let body = '<article class="pg"><header class="ph"><p class="ph__k">' + esc(T.achievements) + " · 2026</p><h1>" + esc(t.h1) + '</h1><p class="ph__lede">' + esc(t.lede) + '</p></header><div class="pc">';
  body += '<dl class="facts">' + t.facts.map(f => "<div><dt>" + esc(T[f[0]]) + "</dt><dd>" + esc(f[1]) + "</dd></div>").join("") + "</dl>";
  body += blocks(t.body, subs);
  if (A.cert) body += '<figure class="pfig">' + img(A.cert, lang === "id" ? "Sertifikat finalis ICBC 2026" : "ICBC 2026 finalist certificate") + "<figcaption>" + esc(lang === "id" ? "Sertifikat finalis ICBC, 25 April 2026" : "ICBC finalist certificate, April 25, 2026") + "</figcaption></figure>";
  (A.img || []).forEach((s, i) => { const it = C.gallery.find(g => g.src === s); if (it) body += '<figure class="pfig">' + img(s, it.alt) + "<figcaption>" + esc(it.caption) + "</figcaption></figure>"; });
  body += '<p class="cta"><a class="btn" href="' + esc(A.url) + '" target="_blank" rel="noopener">' + esc(T.source) + ' — Kemahasiswaan Universitas Gunadarma <b aria-hidden="true">↗</b></a></p>';
  const rel = [];
  if (A.project) { const pr = C.projects.find(p => p.id === A.project); rel.push([pr.name, url(lang, "/projects/" + A.project + "/")]); }
  if (A.article) rel.push([D.ARTICLES.find(a => a.slug === A.article)[lang].title, url(lang, "/writing/" + A.article + "/")]);
  rel.push([T.allAchievements, url(lang, "/achievements/")]);
  body += '<aside class="rel"><h2>' + esc(T.related) + "</h2><ul>" + rel.map(r => '<li><a href="' + r[1] + '">' + esc(r[0]) + "</a></li>").join("") + "</ul></aside></div></article>";
  const ldo = [{ "@type": "WebPage", "@id": abs(lang, pth) + "#page", name: t.h1, description: t.desc, url: abs(lang, pth), inLanguage: lang, about: personRef, citation: { "@type": "WebPage", url: A.url, publisher: { "@type": "CollegeOrUniversity", name: "Universitas Gunadarma" } }, dateModified: BUILD_DATE }];
  write((lang === "id" ? "id/" : "") + "achievements/" + key + "/index.html", layout({ lang, path: pth, title: t.title, desc: t.desc, h1: t.h1, body, og: ogKey, ld: ldo, section: url(lang, "/achievements/"),
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.achievements, url(lang, "/achievements/")], [t.h1, url(lang, pth)]] })); track(pth);
}
function achievementsHub(lang) {
  const T = UI[lang], pth = "/achievements/";
  const ogKey = register(lang, pth, T.achievements, "PORTFOLIO");
  const rank = r => lang === "en" ? (D.RANK_EN[r] || r) : r, lvl = l => (lang === "en" ? D.LEVEL_EN : D.LEVEL_ID)[l] || l;
  const pageFor = a => a.url ? Object.keys(D.ACH_PAGES).find(k => D.ACH_PAGES[k].url === a.url) : null;
  const rows = C.achievements.map(a => { const k = pageFor(a); return "<tr><td>" + a.year + "</td><td>" + esc(a.name) + (k ? ' <a class="more" href="' + url(lang, "/achievements/" + k + "/") + '">' + esc(T.details) + " →</a>" : "") + "</td><td>" + esc(rank(a.rank)) + "</td><td>" + esc(lvl(a.level)) + "</td></tr>"; }).join("");
  const cg = lang === "en" ? D.GROUP_EN : {};
  const certs = C.certificates.map(c => "<tr><td>" + esc(c.date) + "</td><td>" + esc(c.title) + "</td><td>" + esc(c.issuer) + "</td><td>" + (c.url ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(T.verify) + " ↗</a>" : "—") + "</td></tr>").join("");
  const press = C.publications.map(w => '<li><a href="' + esc(w.url) + '" target="_blank" rel="noopener">' + esc(w.title) + "</a> — " + esc(w.publisher) + ", " + w.year + "</li>").join("");
  const title = lang === "id" ? "Prestasi dan Sertifikat | Fauzan Al Farikhi" : "Achievements and Certificates | Fauzan Al Farikhi";
  const desc = lang === "id" ? "Prestasi Muhamad Fauzan Al Farikhi: Top 4 (Juara Harapan 1) ICBC 2026, Delegasi Utama GEMASTIK 2026, medali olimpiade fisika dan bahasa, serta sertifikat kursus." : "Achievements of Muhamad Fauzan Al Farikhi: Top 4 (Juara Harapan 1) at ICBC 2026, Main Delegate at GEMASTIK 2026, physics and language olympiad medals, and course certificates.";
  const body = '<section class="pg"><header class="ph"><p class="ph__k">' + esc(T.portfolio) + "</p><h1>" + esc(T.achievements) + '</h1><p class="ph__lede">' + esc(lang === "id" ? "Kompetisi, delegasi, olimpiade, dan sertifikat, 2021–2026, dengan sumber resmi bila ada." : "Competitions, delegations, olympiads, and certificates, 2021–2026, with official sources where available.") + '</p></header><div class="pc">' +
    '<h2>' + esc(T.achievementsH) + '</h2><div class="tbl"><table><thead><tr><th>' + esc(T.year) + "</th><th>" + esc(lang === "id" ? "Kompetisi" : "Competition") + "</th><th>" + esc(T.result) + "</th><th>" + esc(T.level) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
    "<h2>" + esc(T.certificates) + '</h2><div class="tbl"><table><thead><tr><th>' + esc(T.date) + "</th><th>" + esc(lang === "id" ? "Sertifikat" : "Certificate") + "</th><th>" + esc(T.issuer) + "</th><th>" + esc(T.verify) + "</th></tr></thead><tbody>" + certs + "</tbody></table></div>" +
    "<h2>" + esc(T.press) + '</h2><ul class="plain">' + press + "</ul></div></section>";
  write((lang === "id" ? "id/" : "") + "achievements/index.html", layout({ lang, path: pth, title, desc, h1: T.achievements, body, og: ogKey, section: url(lang, pth),
    ld: [{ "@type": "CollectionPage", name: T.achievements, url: abs(lang, pth), inLanguage: lang, about: personRef }],
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.achievements, url(lang, pth)]] })); track(pth);
}

/* ---------- Writing ---------- */
function articlePage(lang, a) {
  const T = UI[lang], t = a[lang], pth = "/writing/" + a.slug + "/";
  const ogKey = register(lang, pth, t.title, T.writing.toUpperCase() + " · " + a.read + " " + T.minRead.toUpperCase());
  const subs = { "URL_ICBC": D.ACH_PAGES["icbc-2026"].url };
  const dateStr = new Date(a.date + "T00:00:00Z").toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  let body = '<article class="pg pg--art"><header class="ph"><p class="ph__k">' + esc(T.writing) + '</p><h1>' + esc(t.title) + '</h1><p class="ph__m"><span>' + esc(T.by) + " Muhamad Fauzan Al Farikhi</span><span><time datetime=\"" + a.date + '">' + esc(dateStr) + "</time></span><span>" + a.read + " " + esc(T.minRead) + '</span></p><p class="ph__lede">' + esc(t.desc) + "</p></header><div class=\"pc\">";
  body += blocks(t.body, subs);
  const pr = C.projects.find(p => p.id === a.project), rel = [[pr.name, url(lang, "/projects/" + pr.id + "/")]];
  if (a.ach) rel.push([D.ACH_PAGES[a.ach][lang].h1, url(lang, "/achievements/" + a.ach + "/")]);
  rel.push([T.allWriting, url(lang, "/writing/")]);
  body += '<aside class="rel"><h2>' + esc(T.related) + "</h2><ul>" + rel.map(r => '<li><a href="' + r[1] + '">' + esc(r[0]) + "</a></li>").join("") + "</ul></aside></div></article>";
  const ldo = [{ "@type": "BlogPosting", "@id": abs(lang, pth) + "#article", headline: t.title.length > 110 ? t.title.slice(0, 107) + "…" : t.title, description: t.desc, inLanguage: lang, url: abs(lang, pth), mainEntityOfPage: abs(lang, pth),
    datePublished: a.date, dateModified: BUILD_DATE, author: Object.assign({}, personRef, { sameAs: [P.linkedin, P.github] }), publisher: personRef, image: [BASE + "/assets/og/" + ogKey + ".jpg"],
    about: { "@type": "CreativeWork", name: pr.name, url: abs(lang, "/projects/" + pr.id + "/") } }];
  write((lang === "id" ? "id/" : "") + "writing/" + a.slug + "/index.html", layout({ lang, path: pth, title: t.seo || t.title, desc: t.desc, h1: t.title, body, og: ogKey, ogType: "article", ld: ldo, section: url(lang, "/writing/"),
    extraHead: '<meta property="article:published_time" content="' + a.date + '">\n<meta property="article:author" content="Muhamad Fauzan Al Farikhi">\n',
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.writing, url(lang, "/writing/")], [t.title, url(lang, pth)]] })); track(pth);
}
function writingHub(lang) {
  const T = UI[lang], pth = "/writing/";
  const ogKey = register(lang, pth, T.writing, "PORTFOLIO");
  const items = D.ARTICLES.map(a => '<li class="card"><p class="card__k">' + a.date + " · " + a.read + " " + esc(T.minRead) + '</p><h2><a href="' + url(lang, "/writing/" + a.slug + "/") + '">' + esc(a[lang].title) + "</a></h2><p>" + esc(a[lang].desc) + '</p><p class="card__f"><a href="' + url(lang, "/writing/" + a.slug + "/") + '">' + esc(T.readArticle) + " →</a></p></li>").join("");
  const press = C.publications.map(w => '<li><a href="' + esc(w.url) + '" target="_blank" rel="noopener">' + esc(w.title) + "</a> — " + esc(w.publisher) + ", " + w.year + "</li>").join("");
  const title = lang === "id" ? "Tulisan | Muhamad Fauzan Al Farikhi" : "Writing | Muhamad Fauzan Al Farikhi";
  const desc = lang === "id" ? "Tulisan Muhamad Fauzan Al Farikhi tentang AI engineering, product management, dan project di NEXA Tech Labs, plus liputan resmi Universitas Gunadarma." : "Writing by Muhamad Fauzan Al Farikhi on AI engineering, product management, and projects at NEXA Tech Labs, plus official Universitas Gunadarma coverage.";
  const body = '<section class="pg"><header class="ph"><p class="ph__k">' + esc(T.portfolio) + "</p><h1>" + esc(T.writing) + '</h1><p class="ph__lede">' + esc(lang === "id" ? "Catatan tentang apa yang saya bangun, bagaimana, dan apa yang belum terbukti." : "Notes on what I build, how, and what is still unproven.") + '</p></header><div class="pc"><ul class="cards">' + items + "</ul><h2>" + esc(T.press) + '</h2><ul class="plain">' + press + "</ul></div></section>";
  write((lang === "id" ? "id/" : "") + "writing/index.html", layout({ lang, path: pth, title, desc, h1: T.writing, body, og: ogKey, section: url(lang, pth),
    ld: [{ "@type": "Blog", name: T.writing, url: abs(lang, pth), inLanguage: lang, author: personRef, blogPost: D.ARTICLES.map(a => ({ "@type": "BlogPosting", headline: a[lang].title, url: abs(lang, "/writing/" + a.slug + "/"), datePublished: a.date })) }],
    crumbs: [[T.home, lang === "id" ? "/id/" : "/"], [T.writing, url(lang, pth)]] })); track(pth);
}

/* ---------- Beranda Indonesia (/id/) ---------- */
function idHome() {
  const lang = "id", T = UI.id, I = D.ID_PERSON;
  const ogKey = null;
  const title = "Muhamad Fauzan Al Farikhi | Portofolio AI Engineering & Produk";
  const skills = C.skills.map(s => '<li class="card"><h3>' + esc(s.title) + "</h3><p>" + esc(skillLine(s, lang)) + '</p><ul class="chips">' + s.keywords.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></li>").join("");
  const projects = C.projects.map(p0 => { const p = projectView(p0, lang); return '<li class="card"><p class="card__k">' + esc(p0.category) + '</p><h3><a href="/id/projects/' + p0.id + '/">' + esc(p0.name) + "</a></h3><p>" + esc(p.desc) + "</p></li>"; }).join("");
  const pageFor = a => a.url ? Object.keys(D.ACH_PAGES).find(k => D.ACH_PAGES[k].url === a.url) : null;
  const ach = C.achievements.slice(0, 6).map(a => { const k = pageFor(a); return "<li>" + a.year + " — " + (k ? '<a href="/id/achievements/' + k + '/">' + esc(a.name) + "</a>" : esc(a.name)) + " — <strong>" + esc(a.rank) + "</strong></li>"; }).join("");
  const path = C.path.map(r => "<li><strong>" + esc(r.years) + "</strong> — " + esc(r.role) + ", " + esc(r.place) + "</li>").join("");
  const arts = D.ARTICLES.map(a => '<li><a href="/id/writing/' + a.slug + '/">' + esc(a.id.title) + "</a></li>").join("");
  const body = '<section class="pg"><header class="ph ph--home"><p class="ph__k">Portofolio · 2026</p><h1>' + esc(P.first) + ' <span class="serif">' + esc(P.last) + '.</span></h1><p class="ph__m">' + I.roles.map(r => "<span>" + esc(r) + "</span>").join("") + '</p><p class="ph__lede">' + esc(I.tagline) + '</p><p class="cta"><a class="btn" href="/">' + esc(T.fullPortfolio) + ' <b aria-hidden="true">↗</b></a></p></header><div class="pc">' +
    "<h2>" + esc(T.aboutH) + "</h2>" + I.bio.map(b => "<p>" + esc(b) + "</p>").join("") +
    "<h2>" + esc(T.skillsH) + '</h2><ul class="cards">' + skills + "</ul>" +
    "<h2>" + esc(T.projectsH) + '</h2><ul class="cards">' + projects + '</ul><p><a href="/id/projects/">' + esc(T.allProjects) + " →</a></p>" +
    "<h2>" + esc(T.achievementsH) + '</h2><ul class="plain">' + ach + '</ul><p><a href="/id/achievements/">' + esc(T.allAchievements) + " →</a></p>" +
    "<h2>" + esc(T.pathH) + '</h2><ul class="plain">' + path + "</ul>" +
    "<h2>" + esc(T.writing) + '</h2><ul class="plain">' + arts + '</ul><p><a href="/id/writing/">' + esc(T.allWriting) + " →</a></p></div></section>";
  const ldo = [{ "@type": "ProfilePage", "@id": BASE + "/id/#profile", url: BASE + "/id/", name: title, inLanguage: "id", dateModified: BUILD_DATE, mainEntity: { "@id": BASE + "/#person" },
    isPartOf: { "@id": BASE + "/#website" } }];
  write("id/index.html", layout({ lang, path: "/", title, desc: I.descShort, h1: P.first + " " + P.last, body, og: ogKey, ld: ldo, crumbs: [] })); track("/");
}

/* ---------- 404 (noindex, dwibahasa) ---------- */
function notFound() {
  const T = UI.en, I = UI.id;
  const body = '<section class="pg"><header class="ph"><p class="ph__k">404</p><h1>' + esc(T.notFoundT) + ' <span class="serif">· ' + esc(I.notFoundT) + '</span></h1><p class="ph__lede">' + esc(T.notFoundP) + '</p><p class="ph__lede">' + esc(I.notFoundP) + '</p><p class="cta"><a class="btn" href="/">' + esc(T.home) + ' <b aria-hidden="true">→</b></a> <a class="btn" href="/id/">' + esc(I.home) + ' <b aria-hidden="true">→</b></a></p></header></section>';
  write("404.html", layout({ lang: "en", path: "/", title: "404 — Muhamad Fauzan Al Farikhi", desc: T.notFoundP, h1: "404", body, og: null, robots: "noindex,follow", crumbs: [] }));
}

/* ---------- Jalankan ---------- */
["projects", "achievements", "writing", "id"].forEach(rmrf);
["en", "id"].forEach(lang => {
  projectsHub(lang); C.projects.forEach(p => projectPage(lang, p));
  achievementsHub(lang); Object.keys(D.ACH_PAGES).forEach(k => achievementPage(lang, k));
  writingHub(lang); D.ARTICLES.forEach(a => articlePage(lang, a));
});
idHome(); notFound();

/* ---------- Sitemap ---------- */
const alt = (p) => '    <xhtml:link rel="alternate" hreflang="en" href="' + abs("en", p) + '"/>\n    <xhtml:link rel="alternate" hreflang="id" href="' + abs("id", p) + '"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="' + abs("en", p) + '"/>\n';
let sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
sm += "  <url>\n    <loc>" + BASE + "/</loc>\n    <lastmod>" + BUILD_DATE + "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n" + alt("/") + "    <image:image><image:loc>" + BASE + "/assets/og-image.jpg</image:loc></image:image>\n  </url>\n";
sm += "  <url>\n    <loc>" + BASE + "/id/</loc>\n    <lastmod>" + BUILD_DATE + "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n" + alt("/") + "  </url>\n";
written.filter(w => w.p !== "/").forEach(w => {
  const hub = /^\/(projects|achievements|writing)\/$/.test(w.p), pr = hub ? "0.8" : "0.7";
  ["en", "id"].forEach(l => { sm += "  <url>\n    <loc>" + abs(l, w.p) + "</loc>\n    <lastmod>" + BUILD_DATE + "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>" + pr + "</priority>\n" + alt(w.p) + "  </url>\n"; });
});
sm += "</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sm);
const uniq = []; ogList.forEach(o => { if (!uniq.find(u => u.key === o.key)) uniq.push(o); });
fs.writeFileSync(path.join(__dirname, "og-manifest.json"), JSON.stringify(uniq, null, 1));
console.log("halaman:", written.length * 2 - 1 + 1, "| kartu OG:", uniq.length, "| sitemap URL:", (sm.match(/<loc>/g) || []).length);
