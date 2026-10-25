/* og-build.js — membuat kartu OG 1200×630 per halaman (assets/og/*.jpg) dari tools/og-manifest.json.
   Butuh Playwright (hanya untuk dev, bukan untuk situs):  npm i -D playwright  &&  npx playwright install chromium
   Jalankan SETELAH build-pages.js:  node tools/og-build.js */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), OUT = path.join(ROOT, "assets", "og");
let chromium; try { chromium = require("playwright").chromium; } catch (e) { console.error("Playwright tidak ditemukan — lewati pembuatan kartu OG."); process.exit(0); }
const items = JSON.parse(fs.readFileSync(path.join(__dirname, "og-manifest.json"), "utf8"));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const F = "file://" + path.join(ROOT, "assets", "fonts") + "/";
const html = it => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:A;font-weight:900;src:url(${F}archivo-latin-900-normal.woff2)}
@font-face{font-family:A;font-weight:700;src:url(${F}archivo-latin-700-normal.woff2)}
@font-face{font-family:S;font-style:italic;src:url(${F}instrument-serif-latin-400-italic.woff2)}
@font-face{font-family:D;font-weight:500;src:url(${F}dm-sans-latin-500-normal.woff2)}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#0A0A09;color:#ECE9E1;font-family:D;position:relative;overflow:hidden}
.c{position:absolute;right:-170px;top:-170px;width:560px;height:560px;border-radius:50%;background:#EE4B3B}
.k{position:absolute;left:72px;top:72px;font:700 24px A;letter-spacing:.16em;color:#EE4B3B}
.t{position:absolute;left:72px;right:72px;top:150px;font:900 ${it.title.length > 70 ? 54 : it.title.length > 38 ? 66 : 84}px/1.04 A;letter-spacing:-.025em}
.m{position:absolute;left:72px;bottom:64px;font:900 44px A}.m i{color:#EE4B3B;font-style:normal}
.n{position:absolute;left:150px;bottom:72px;font:500 24px D;color:#999993}
.s{position:absolute;right:72px;bottom:68px;font:400 34px S;font-style:italic;color:#ECE9E1}
</style><div class="c"></div><p class="k">${esc(it.kicker)}</p><h1 class="t">${esc(it.title)}</h1><p class="m">FA<i>.</i></p><p class="n">frikhii.my.id</p><p class="s">Muhamad Fauzan Al Farikhi</p>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const it of items) {
    const f = path.join(ROOT, "tools", ".og.html"); fs.writeFileSync(f, html(it));
    await p.goto("file://" + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, it.key + ".jpg"), type: "jpeg", quality: 84 });
  }
  fs.rmSync(path.join(ROOT, "tools", ".og.html"), { force: true });
  await b.close(); console.log("kartu OG:", items.length, "→ assets/og/");
})();
