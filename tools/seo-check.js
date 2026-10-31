/* seo-check.js — audit & validasi SEO menyeluruh untuk seluruh situs (tanpa dependensi).
   Jalankan:   npm run seo:check     (atau: node tools/seo-check.js [--json])
   Memeriksa:  title, description, canonical, hreflang (reciprocal + x-default), H1,
               hierarki heading, alt gambar, link internal, gambar lokal, OG/Twitter,
               JSON-LD, sitemap.xml, robots.txt, duplikasi konten, orphan page.
   Keluaran:   laporan berkelompok Critical / High / Medium / Low.
   Exit code:  1 kalau ada minimal satu Critical atau High (dipakai CI / pre-push). */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const D = require("./pages-data.js");
const BASE = D.BASE.replace(/\/$/, "");
const AS_JSON = process.argv.includes("--json");

/* ---------- util ---------- */
const rel = f => path.relative(ROOT, f).split(path.sep).join("/");
const issues = [];
const add = (sev, code, file, msg) => issues.push({ sev, code, file, msg });
const dec = s => String(s == null ? "" : s)
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").trim();
const attr = (tag, name) => { const m = tag.match(new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i")); return m ? dec(m[2]) : null; };
const clean = h => String(h || "").replace(/\s+/g, " ").replace(/<[^>]*>/g, "").trim();

/* ---------- kumpulkan file ---------- */
function walk(dir, out) {
  out = out || [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules" || e.name === "tools") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const files = walk(ROOT).sort();

const fileToUrl = r => r === "index.html" ? "/" : r === "404.html" ? "/404.html"
  : r.endsWith("/index.html") ? "/" + r.slice(0, -"index.html".length) : "/" + r;
const urlToFile = u => {
  const p = u.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0];
  if (p === "/" || p === "") return "index.html";
  if (p.endsWith("/")) return p.slice(1) + "index.html";
  return p.replace(/^\//, "");
};
const fileExists = u => { try { return fs.statSync(path.join(ROOT, urlToFile(u))).isFile(); } catch (e) { return false; } };

/* ---------- parser per halaman ---------- */
function parse(file) {
  const r = rel(file), src = fs.readFileSync(file, "utf8");
  const u = fileToUrl(r), absUrl = r === "404.html" ? BASE + "/404.html" : BASE + (u === "/" ? "/" : u);
  const lang = (src.match(/<html[^>]*\blang\s*=\s*["']([^"']+)["']/i) || [])[1] || null;
  const title = dec((src.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "") || null;

  const metas = {};
  for (const m of src.matchAll(/<meta\b[^>]*>/gi)) {
    const k = attr(m[0], "name") || attr(m[0], "property");
    if (k) metas[k.toLowerCase()] = attr(m[0], "content") || "";
  }
  const links = [];
  for (const m of src.matchAll(/<link\b[^>]*>/gi)) links.push({ rel: (attr(m[0], "rel") || "").toLowerCase(), href: attr(m[0], "href"), hreflang: attr(m[0], "hreflang") });
  const canonical = (links.find(l => l.rel === "canonical") || {}).href || null;
  const alt = {};
  links.filter(l => l.rel === "alternate" && l.hreflang).forEach(l => { alt[l.hreflang.toLowerCase()] = l.href; });

  const robots = (metas.robots || "").toLowerCase();
  const noindex = /noindex/.test(robots);
  const h1s = [...src.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1]));
  const headSeq = [...src.slice(src.indexOf("</head>") < 0 ? 0 : src.indexOf("</head>")).matchAll(/<(h[1-6])\b/gi)].map(m => +m[1][1]);

  const imgs = [...src.matchAll(/<img\b[^>]*>/gi)].map(m => ({
    tag: m[0], src: attr(m[0], "src"), alt: attr(m[0], "alt"),
    w: attr(m[0], "width"), h: attr(m[0], "height"), loading: attr(m[0], "loading")
  }));
  const anchors = [...src.matchAll(/<a\b[^>]*>/gi)].map(m => attr(m[0], "href")).filter(Boolean);

  const ld = [];
  for (const m of src.matchAll(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { ld.push({ __error: e.message }); }
  }
  const mainMatch = src.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const bodyText = clean(mainMatch ? mainMatch[1] : "");

  return { r, u, absUrl, lang, title, metas, links, canonical, alt, noindex, robots, h1s, headSeq, imgs, anchors, ld, bodyText, src };
}

const pages = files.map(parse);
const byUrl = new Map(pages.map(p => [p.u, p]));
const indexable = pages.filter(p => !p.noindex);

/* resolve link internal → path file */
function resolveHref(href, fromUrl) {
  if (!href) return null;
  const h = href.trim();
  if (/^(mailto:|tel:|javascript:|data:|https?:|\/\/|#)/i.test(h)) return null;
  const noHash = h.split("#")[0].split("?")[0];
  if (!noHash) return null;
  if (noHash.startsWith("/")) return noHash;
  const baseDir = fromUrl.replace(/[^/]*$/, "");
  return baseDir + noHash;
}

/* =========================================================
   1. META DASAR
   ========================================================= */
for (const p of pages) {
  if (!p.title) add("Critical", "title-missing", p.r, "Tag <title> tidak ada");
  if (!p.metas.description) add("Critical", "desc-missing", p.r, "meta description tidak ada");
  if (!p.canonical && !p.noindex) add("Critical", "canonical-missing", p.r, "link rel=canonical tidak ada");
  if (!p.h1s.length) add("Critical", "h1-missing", p.r, "Tidak ada <h1>");
  if (p.h1s.length > 1) add("Medium", "h1-multiple", p.r, p.h1s.length + " tag <h1> (idealnya 1): " + p.h1s.map(h => h.slice(0, 40)).join(" | "));

  /* panjang */
  if (p.title && (p.title.length > 65 || p.title.length < 15))
    add("Medium", "title-length", p.r, "Judul " + p.title.length + " karakter (ideal 15–65): " + p.title);
  const d = p.metas.description || "";
  if (d && (d.length > 165 || d.length < 70))
    add("Low", "desc-length", p.r, "Deskripsi " + d.length + " karakter (ideal 70–165)");

  /* canonical self-referencing */
  if (p.canonical && !p.noindex && p.canonical !== p.absUrl)
    add("Critical", "canonical-not-self", p.r, "Canonical " + p.canonical + " ≠ URL halaman " + p.absUrl);
  if (p.canonical && p.canonical.indexOf("http://") === 0)
    add("Critical", "canonical-http", p.r, "Canonical memakai http:// (wajib https): " + p.canonical);

  /* lang */
  const expectLang = p.u === "/404.html" ? "en" : p.u.startsWith("/id/") || p.u === "/id/" ? "id" : "en";
  if (!p.lang) add("High", "lang-missing", p.r, "Atribut <html lang> tidak ada");
  else if (p.lang !== expectLang) add("High", "lang-wrong", p.r, "lang=\"" + p.lang + "\" seharusnya \"" + expectLang + "\"");

  /* meta robots wajib ada */
  if (!p.metas.robots) add("Low", "robots-meta-missing", p.r, "meta robots tidak ada (default index,follow)");

  /* OG / Twitter */
  const need = ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "og:type", "og:site_name", "og:locale"];
  need.forEach(k => { if (!p.metas[k]) add("Medium", "og-missing", p.r, k + " tidak ada"); });
  const needTw = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];
  needTw.forEach(k => { if (!p.metas[k]) add("Medium", "twitter-missing", p.r, k + " tidak ada"); });
  if (p.metas["og:url"] && p.metas["og:url"] !== p.absUrl)
    add("Medium", "og-url-mismatch", p.r, "og:url " + p.metas["og:url"] + " ≠ " + p.absUrl);

  /* hierarki heading: tidak boleh lompat >1 level */
  let prev = 0, skips = [];
  for (const lvl of p.headSeq) {
    if (prev && lvl > prev + 1) skips.push("h" + prev + "→h" + lvl);
    prev = lvl;
  }
  if (skips.length) add("Medium", "heading-skip", p.r, "Lompatan level heading: " + [...new Set(skips)].join(", "));
}

/* duplikasi title / description antar halaman indexable */
const dupTitle = new Map(), dupDesc = new Map();
for (const p of indexable) {
  if (p.title) { if (!dupTitle.has(p.title)) dupTitle.set(p.title, []); dupTitle.get(p.title).push(p.r); }
  const d = p.metas.description;
  if (d) { if (!dupDesc.has(d)) dupDesc.set(d, []); dupDesc.get(d).push(p.r); }
}
for (const [t, fs2] of dupTitle) if (fs2.length > 1) add("High", "title-duplicate", "(situs)", "Judul sama di " + fs2.length + " halaman: \"" + t + "\" → " + fs2.join(", "));
for (const [d, fs2] of dupDesc) if (fs2.length > 1) add("High", "desc-duplicate", "(situs)", "Deskripsi sama di " + fs2.length + " halaman: " + fs2.join(", "));

/* duplikasi konten utama */
const dupBody = new Map();
for (const p of indexable) {
  if (p.bodyText.length < 120) continue;
  const h = crypto.createHash("md5").update(p.bodyText).digest("hex");
  if (!dupBody.has(h)) dupBody.set(h, []);
  dupBody.get(h).push(p.r);
}
for (const arr of dupBody.values()) if (arr.length > 1) add("High", "content-duplicate", "(situs)", "Isi <main> identik: " + arr.join(", "));

/* =========================================================
   2. HREFLANG
   ========================================================= */
for (const p of indexable) {
  const selfLang = p.u === "/" || p.u.startsWith("/projects") || p.u.startsWith("/achievements") || p.u.startsWith("/writing") ? "en"
    : p.u.startsWith("/id/") || p.u === "/id/" ? "id" : "en";
  ["en", "id", "x-default"].forEach(l => {
    if (!p.alt[l]) { add(l === "x-default" ? "Medium" : "High", "hreflang-missing", p.r, "hreflang=\"" + l + "\" tidak ada"); return; }
    if (p.alt[l].indexOf("http://") === 0) add("Critical", "hreflang-http", p.r, "hreflang \"" + l + "\" memakai http:// → " + p.alt[l]);
    if (p.alt[l] !== BASE + "/" && p.alt[l].indexOf(BASE) !== 0)
      add("High", "hreflang-foreign", p.r, "hreflang \"" + l + "\" di luar domain: " + p.alt[l]);
    if (!fileExists(p.alt[l]))
      add("Critical", "hreflang-404", p.r, "hreflang \"" + l + "\" menunjuk URL yang tidak ada: " + p.alt[l]);
  });

  /* self-referencing + reciprocity */
  if (p.alt[selfLang] && p.alt[selfLang] !== p.absUrl)
    add("High", "hreflang-not-self", p.r, "hreflang " + selfLang + " " + p.alt[selfLang] + " ≠ URL halaman sendiri");
  if (p.alt["x-default"] && p.alt.en && p.alt["x-default"] !== p.alt.en)
    add("Medium", "x-default-not-en", p.r, "x-default (" + p.alt["x-default"] + ") tidak menunjuk versi en (" + p.alt.en + ")");

  ["en", "id"].forEach(l => {
    const target = p.alt[l];
    if (!target || !fileExists(target)) return;
    const tp = byUrl.get(target.replace(BASE, "") || "/");
    if (!tp) return;
    const back = tp.alt[selfLang];
    if (back !== p.absUrl)
      add("High", "hreflang-not-reciprocal", p.r, "Halaman " + tp.r + " tidak membalas hreflang " + selfLang + " → " + p.absUrl);
  });
}

/* =========================================================
   3. LINK INTERNAL + GAMBAR
   ========================================================= */
const inbound = new Map(pages.map(p => [p.u, 0]));
for (const p of pages) {
  for (const h of p.anchors) {
    const r = resolveHref(h, p.u);
    if (!r) continue;
    const target = r.endsWith("/") ? r : (/\.[a-z0-9]+$/i.test(r) ? r : r + "/");
    let file = urlToFile(target);
    if (!fs.existsSync(path.join(ROOT, file)) && !/\.[a-z0-9]+$/i.test(r)) {
      if (fs.existsSync(path.join(ROOT, r.replace(/^\//, ""), "index.html"))) file = r.replace(/^\//, "") + "/index.html";
    }
    if (!fs.existsSync(path.join(ROOT, file)))
      add("Critical", "link-broken", p.r, "Link internal mati: " + h);
    else {
      const tUrl = fileToUrl(file.split(path.sep).join("/"));
      if (inbound.has(tUrl)) inbound.set(tUrl, inbound.get(tUrl) + 1);
    }
    if (/^http:\/\/frikhii\.my\.id/i.test(h)) add("High", "internal-http", p.r, "Link internal memakai http:// → " + h);
  }
}

for (const p of pages) {
  for (const im of p.imgs) {
    if (im.alt === null) add("High", "img-alt-missing", p.r, "img tanpa atribut alt: " + (im.src || im.tag.slice(0, 70)));
    else if (im.alt.trim() === "") add("Medium", "img-alt-empty", p.r, "alt=\"\" (dekoratif?) pada " + im.src);
    if (im.src && /^https?:/i.test(im.src)) {
      if (im.src.indexOf(BASE) === 0 && !fs.existsSync(path.join(ROOT, urlToFile(im.src))))
        add("Critical", "img-404", p.r, "Gambar tidak ditemukan: " + im.src);
      if (im.src.indexOf("http://") === 0) add("High", "img-http", p.r, "Gambar memakai http:// (mixed content): " + im.src);
    } else if (im.src && im.src.indexOf("//") !== 0) {
      const r = resolveHref(im.src, p.u);
      if (r && !fs.existsSync(path.join(ROOT, r.replace(/^\//, ""))))
        add("Critical", "img-404", p.r, "Gambar lokal tidak ditemukan: " + im.src);
      if (!im.w || !im.h) add("Medium", "img-size-missing", p.r, "img tanpa width/height (risiko CLS): " + im.src);
      if (!im.loading) add("Low", "img-loading-missing", p.r, "img tanpa atribut loading: " + im.src);
    }
    const cls = im.tag;
    if (/\bloading\s*=\s*["']lazy["']/.test(cls) && p.r === "index.html" && /portrait|hero/i.test(im.src || ""))
      add("Medium", "lcp-lazy", p.r, "Gambar utama (LCP) memakai loading=lazy: " + im.src);
  }
  /* og:image harus ada file-nya */
  const og = p.metas["og:image"];
  if (og && og.indexOf(BASE) === 0 && !fs.existsSync(path.join(ROOT, urlToFile(og))))
    add("Critical", "og-image-404", p.r, "og:image tidak ditemukan: " + og);
}

/* orphan: halaman indexable tanpa inbound link internal */
for (const p of indexable) {
  if (p.u === "/" || p.u === "/id/") continue;
  if (!inbound.get(p.u)) add("Medium", "orphan-page", p.r, "Tidak ada link internal lain yang menunjuk ke " + p.absUrl);
}

/* =========================================================
   4. STRUCTURED DATA (JSON-LD)
   ========================================================= */
/* Hanya node yang punya @id DAN minimal satu properti lain = definisi entity.
   Node {"@id": "..."} murni = referensi (tautan antar entity), bukan duplikat. */
const collectIds = (node, out) => {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) { node.forEach(n => collectIds(n, out)); return out; }
  const keys = Object.keys(node);
  if (node["@id"] && keys.some(k => k !== "@id" && k !== "@context")) out.push(node["@id"]);
  keys.forEach(k => collectIds(node[k], out));
  return out;
};
const collectByType = (node, type, out) => {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) { node.forEach(n => collectByType(n, type, out)); return out; }
  const t = node["@type"];
  if (t === type || (Array.isArray(t) && t.indexOf(type) >= 0)) out.push(node);
  Object.keys(node).forEach(k => collectByType(node[k], type, out));
  return out;
};

for (const p of pages) {
  if (!p.ld.length && !p.noindex) add("Medium", "jsonld-missing", p.r, "Tidak ada JSON-LD");
  p.ld.forEach((doc, i) => {
    const tag = p.r + " (blok #" + (i + 1) + ")";
    if (doc.__error) { add("Critical", "jsonld-invalid", p.r, "JSON-LD tidak valid: " + doc.__error); return; }
    if (!doc["@context"]) add("High", "jsonld-no-context", tag, "@context tidak ada");
    const nodes = doc["@graph"] || [doc];
    nodes.filter(Boolean).forEach(n => {
      if (!n["@type"] && !n["@id"]) add("High", "jsonld-no-type", tag, "Node tanpa @type: " + JSON.stringify(n).slice(0, 90));
      if (n["@type"] === "BreadcrumbList") {
        const items = n.itemListElement || [];
        items.forEach((it, k) => {
          if (it.position !== k + 1) add("Medium", "breadcrumb-position", tag, "position " + it.position + " di indeks " + (k + 1) + " (harus berurutan mulai 1)");
        });
        if (items.length && items[0].position !== 1) add("Medium", "breadcrumb-position", tag, "BreadcrumbList tidak mulai dari position 1");
      }
      if (n["@type"] === "BlogPosting" && !n.datePublished) add("Medium", "article-no-date", tag, "BlogPosting tanpa datePublished");
    });
    /* @id & url internal harus menunjuk halaman yang ada */
    const ids = collectIds(doc, []).filter(x => typeof x === "string");
    const seen = new Set();
    ids.forEach(id => {
      if (id[0] !== "#") {
        if (id.indexOf(BASE) === 0) {
          const pathPart = id.split("#")[0].replace(BASE, "");
          if (!byUrl.has(pathPart === "" ? "/" : pathPart))
            add("Critical", "jsonld-id-404", p.r, "@id menunjuk URL tidak ada: " + id);
        }
      }
      if (seen.has(id) && /#/.test(id)) add("Medium", "jsonld-duplicate-id", p.r, "@id duplikat dalam satu halaman: " + id);
      seen.add(id);
    });
    /* url utama halaman */
    nodes.filter(Boolean).forEach(n => {
      ["url", "mainEntityOfPage"].forEach(k => {
        const v = n[k];
        if (typeof v === "string" && v.indexOf(BASE) === 0) {
          const pp = v.split("#")[0].replace(BASE, "");
          if (!byUrl.has(pp === "" ? "/" : pp)) add("Critical", "jsonld-url-404", p.r, n["@type"] + "." + k + " menunjuk URL tidak ada: " + v);
        }
      });
    });
  });
}

/* =========================================================
   5. SITEMAP.XML
   ========================================================= */
const smPath = path.join(ROOT, "sitemap.xml");
if (!fs.existsSync(smPath)) {
  add("Critical", "sitemap-missing", "sitemap.xml", "File tidak ada");
} else {
  const sm = fs.readFileSync(smPath, "utf8");
  const urls = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]);
  const smSet = new Set();
  const smAlt = new Map();
  for (const b of urls) {
    const loc = ((b.match(/<loc>([\s\S]*?)<\/loc>/) || [])[1] || "").trim();
    if (!loc) { add("High", "sitemap-no-loc", "sitemap.xml", "Entri <url> tanpa <loc>"); continue; }
    smSet.add(loc);
    if (loc.indexOf(BASE) !== 0) { add("Critical", "sitemap-wrong-host", "sitemap.xml", "<loc> di luar domain: " + loc); continue; }
    if (!fileExists(loc)) { add("Critical", "sitemap-404", "sitemap.xml", "<loc> tidak ada file-nya: " + loc); continue; }
    const p = byUrl.get(loc.replace(BASE, "") || "/");
    if (!p) continue;
    if (p.noindex) add("High", "sitemap-noindex", "sitemap.xml", "URL noindex ikut masuk sitemap: " + loc);
    if (p.canonical && p.canonical !== loc) add("High", "sitemap-canonical-mismatch", "sitemap.xml", "Canonical " + p.canonical + " ≠ <loc> " + loc);
    const lm = (b.match(/<lastmod>([\s\S]*?)<\/lastmod>/) || [])[1];
    const todayLocal = (() => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); })();
    if (!lm || !/^\d{4}-\d{2}-\d{2}$/.test(lm.trim())) add("Medium", "sitemap-lastmod", "sitemap.xml", "lastmod tidak valid di " + loc);
    else if (lm.trim() > todayLocal) add("Medium", "sitemap-lastmod-future", "sitemap.xml", "lastmod di masa depan (" + lm.trim() + ") di " + loc);
    const a = {};
    for (const m of b.matchAll(/<xhtml:link[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/g)) a[m[1]] = m[2];
    for (const m of b.matchAll(/<xhtml:link[^>]*href=["']([^"']+)["'][^>]*hreflang=["']([^"']+)["']/g)) a[m[2]] = m[1];
    smAlt.set(loc, a);
    ["en", "id", "x-default"].forEach(l => { if (!a[l]) add("Medium", "sitemap-hreflang", "sitemap.xml", loc + " tanpa hreflang " + l); });
  }
  /* setiap halaman indexable wajib ada di sitemap */
  for (const p of indexable) {
    const canonical = p.canonical || p.absUrl;
    if (!smSet.has(canonical)) add("High", "sitemap-page-missing", "sitemap.xml", "Halaman indexable tidak ada di sitemap: " + canonical);
  }
  /* reciprocity hreflang di sitemap: target wajib menunjuk balik ke loc */
  for (const [loc, a] of smAlt) {
    ["en", "id"].forEach(l => {
      const t = a[l];
      if (!t || !smSet.has(t)) return;
      const back = smAlt.get(t);
      if (!back || Object.values(back).indexOf(loc) < 0)
        add("Medium", "sitemap-hreflang-not-reciprocal", "sitemap.xml", loc + " ↔ " + t + " tidak saling membalas");
    });
  }
}

/* =========================================================
   6. ROBOTS.TXT
   ========================================================= */
const rbPath = path.join(ROOT, "robots.txt");
if (!fs.existsSync(rbPath)) add("Critical", "robots-missing", "robots.txt", "File tidak ada");
else {
  const rb = fs.readFileSync(rbPath, "utf8");
  if (!/^User-agent:/im.test(rb)) add("High", "robots-no-agent", "robots.txt", "Tidak ada baris User-agent");
  if (/^\s*Disallow\s*:\s*\/\s*$/im.test(rb)) add("Critical", "robots-disallow-all", "robots.txt", "Disallow: / memblokir seluruh situs");
  const smLine = (rb.match(/^Sitemap:\s*(\S+)/im) || [])[1];
  if (!smLine) add("High", "robots-no-sitemap", "robots.txt", "Tidak ada baris Sitemap:");
  else if (smLine !== BASE + "/sitemap.xml") add("High", "robots-sitemap-url", "robots.txt", "URL Sitemap salah: " + smLine);
  if (/^Disallow:\s*\/tools\/\s*$/im.test(rb) === false) add("Medium", "robots-tools-open", "robots.txt", "/tools/ tidak dilarang (berisi snippet HTML yang bisa terindeks)");
}

/* =========================================================
   7. SINKRONISASI DENGAN SUMBER (build --verify)
   ========================================================= */
let sync = { ok: null, msg: "" };
try {
  const out = cp.execFileSync(process.execPath, [path.join(__dirname, "build-pages.js"), "--verify"], { encoding: "utf8", cwd: ROOT });
  sync = { ok: !/BERBEDA|HILANG|LEBIH/.test(out), msg: out.trim().split(/\r?\n/).filter(l => /BERBEDA|HILANG|LEBIH|OK/.test(l)).slice(0, 40).join("\n") };
} catch (e) {
  const out = String(e.stdout || e.message || "");
  sync = { ok: false, msg: out.trim().split(/\r?\n/).filter(l => /BERBEDA|HILANG|LEBIH/.test(l)).slice(0, 40).join("\n") || out.slice(0, 600) };
}
if (sync.ok === false) add("High", "build-out-of-sync", "(build)", "Halaman yang ter-generate tidak sinkron dengan content.js/pages-data.js — jalankan `node tools/build-pages.js`\n" + sync.msg);

/* =========================================================
   LAPORAN
   ========================================================= */
const SEV = ["Critical", "High", "Medium", "Low"];
const count = s => issues.filter(i => i.sev === s).length;
const blocking = count("Critical") + count("High");

if (AS_JSON) {
  console.log(JSON.stringify({ base: BASE, pages: pages.length, indexable: indexable.length, blocking, issues }, null, 2));
} else {
  const line = (c) => console.log(c);
  line("");
  line("==============================================================");
  line(" SEO AUDIT — " + BASE);
  line("==============================================================");
  line(" Halaman HTML      : " + pages.length + "  (" + indexable.length + " indexable, " + (pages.length - indexable.length) + " noindex)");
  line(" Sitemap <url>     : " + (fs.existsSync(smPath) ? (fs.readFileSync(smPath, "utf8").match(/<url>/g) || []).length : 0));
  line(" Build sinkron     : " + (sync.ok === null ? "dilewati" : sync.ok ? "YA" : "TIDAK"));
  line("--------------------------------------------------------------");
  line(" Critical: " + count("Critical") + "   High: " + count("High") + "   Medium: " + count("Medium") + "   Low: " + count("Low"));
  line("--------------------------------------------------------------");
  SEV.forEach(s => {
    const list = issues.filter(i => i.sev === s);
    if (!list.length) { line("[" + s.toUpperCase() + "] 0 — bersih"); return; }
    line("[" + s.toUpperCase() + "] " + list.length);
    const byCode = {};
    list.forEach(i => { (byCode[i.code] = byCode[i.code] || []).push(i); });
    Object.keys(byCode).forEach(code => {
      line("  · " + code + " (" + byCode[code].length + ")");
      byCode[code].slice(0, 12).forEach(i => line("      - " + i.file + ": " + i.msg));
      if (byCode[code].length > 12) line("      … +" + (byCode[code].length - 12) + " lagi");
    });
  });
  line("--------------------------------------------------------------");
  line(blocking ? " HASIL: GAGAL — " + blocking + " masalah Critical/High harus diperbaiki."
                : " HASIL: LULUS — tidak ada masalah Critical/High.");
  line("");
}
process.exit(blocking ? 1 : 0);
