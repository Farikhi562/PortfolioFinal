/* Membangun blok HTML statis (#seo-static) berisi ringkasan konten dari content.js ke index.html
   (antara penanda SEO:START dan SEO:END). Dibaca crawler/pratinjau tautan yang tidak menjalankan JS;
   disembunyikan lewat CSS dan dihapus app.js begitu halaman dirender (isinya sama dengan yang tampil).
   Jalankan setiap selesai mengedit content.js:   node tools/seo-build.js   (dari folder site/) */
const fs = require("fs"), path = require("path");
global.window = {}; require(path.join(__dirname, "..", "content.js"));
const C = window.CONTENT, P = C.person;
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const li = (a) => a.map(x => "<li>" + x + "</li>").join("");
let out = ['<div id="seo-static">', '<section aria-label="Portfolio summary">', "<h2>About</h2>"];
C.bio.forEach(b => out.push("<p>" + esc(b) + "</p>"));
out.push("<h2>Skills</h2><ul>" + li(C.skills.map(s => "<strong>" + esc(s.title) + "</strong> — " + esc(s.line) + " (" + s.keywords.map(esc).join(", ") + ")")) + "</ul>");
out.push("<h2>Projects</h2><ul>" + li(C.projects.map(p => "<strong>" + esc(p.name) + "</strong> (" + esc(p.status) + ") — " + esc(p.desc) + (p.url ? ' <a href="' + esc(p.url) + '">' + esc(p.url) + "</a>" : ""))) + "</ul>");
out.push("<h2>Achievements</h2><ul>" + li(C.achievements.map(a => esc(a.year + " — " + a.name + " — " + a.rank) + (a.page ? ' (<a href="' + esc(a.page) + '">details</a>)' : "") + (a.url ? ' (<a href="' + esc(a.url) + '" rel="noopener">' + esc(a.src || "source") + "</a>)" : ""))) + "</ul>");
out.push("<h2>Press and publications</h2><ul>" + li(C.publications.map(w => '<a href="' + esc(w.url) + '" rel="noopener">' + esc(w.title) + "</a> — " + esc(w.publisher) + ", " + esc(w.year))) + "</ul>");
out.push("<h2>Stage and presentations</h2><ul>" + li(C.stage.items.map(s => "<strong>" + esc(s.title) + "</strong> — " + esc(s.role) + ". " + esc(s.desc))) + "</ul>");
out.push("<h2>Recommendations</h2>" + C.recommendations.map(r => "<blockquote><p>“" + esc(r.quote) + "”</p><footer>" + esc(r.name) + ", " + esc(r.role) + (r.org ? ", " + esc(r.org) : "") + "</footer></blockquote>").join(""));
out.push("<h2>More pages</h2><ul>" + li(['<a href="/projects/">Projects</a>', '<a href="/achievements/">Achievements and certificates</a>', '<a href="/writing/">Writing</a>', '<a href="/id/" hreflang="id" lang="id">Bahasa Indonesia</a>'].concat(C.projects.map(p => '<a href="/projects/' + p.id + '/">' + esc(p.name) + "</a>"))) + "</ul>");
out.push("<h2>Contact</h2><ul>" + li([
  'Email: <a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a>",
  'LinkedIn: <a href="' + esc(P.linkedin) + '">' + esc(P.linkedin) + "</a>",
  'GitHub: <a href="' + esc(P.github) + '">' + esc(P.github) + "</a>",
  'Instagram: <a href="' + esc(P.instagram.url) + '">' + esc(P.instagram.handle) + "</a>"].concat(P.cv && P.cv.file ? ['<a href="' + esc(P.cv.file) + '">Download CV (PDF)</a>'] : [])) + "</ul>");
out.push("</section>", "</div>");
const f = path.join(__dirname, "..", "index.html"); let h = fs.readFileSync(f, "utf8");
const a = h.indexOf("<!-- SEO:START -->"), b = h.indexOf("<!-- SEO:END -->");
if (a < 0 || b < 0) throw new Error("Penanda SEO tidak ditemukan di index.html");
h = h.slice(0, a) + "<!-- SEO:START -->\n" + out.join("\n") + "\n    " + h.slice(b);
fs.writeFileSync(f, h); console.log("blok SEO statis diperbarui (" + out.join("").length + " karakter)");
