# Portfolio — Muhamad Fauzan Al Farikhi

HTML + CSS + JavaScript murni (tanpa framework, tanpa build step).

```
index.html   struktur halaman
style.css    semua gaya
motion.js    animasi (reveal, tilt, magnetic, parallax, progres baca)
app.js       render konten, nav, jam, potret 3D, semua section
content.js   SEMUA teks & daftar — edit di sini
assets/      foto, logo, sertifikat, frame potret 3D, font (self-hosted)
```

## Menjalankan di komputer
Jangan buka dengan klik dua kali (beberapa browser memblokir aset). Pakai server lokal:

```bash
cd site
python3 -m http.server 8000      # lalu buka http://localhost:8000
# atau: npx serve .
```

## Publish gratis
**GitHub Pages**
1. Buat repo baru (mis. `portfolio`), upload isi folder `site/` ke root repo.
2. Settings → Pages → Source: *Deploy from a branch* → Branch `main` / folder `/ (root)` → Save.
3. Situs aktif di `https://<username>.github.io/portfolio/` dalam ±1 menit.

**Netlify**
1. Buka app.netlify.com → *Add new site* → *Deploy manually*.
2. Seret folder `site/` ke area upload. Selesai — dapat URL `*.netlify.app` (bisa diganti namanya di Site settings).

## Mengedit
- Teks, daftar prestasi, publikasi, caption galeri, skill: `content.js`.
- Ganti foto: timpa file di `assets/` dengan nama sama, atau ubah path di `content.js`.
- Potret 3D hero: 60 frame di `assets/turn/00.webp … 59.webp` (dari video putaran 360°).

## Projects & sertifikat
- Project: array `projects` di `content.js`. Field `null` tampil "To be documented". Ganti ilustrasi dengan screenshot asli lewat `thumb: "assets/projects/xxx.webp"`.
- Sertifikat: array `certificates`. Isi `url` untuk tombol Verify; tanpa `url`, kartu membuka lightbox dari `full`.

## Galeri, path, afiliasi
- Galeri (`gallery` di content.js): tiap item punya `title`, `meta`, `desc`. Klik foto atau "Read the story" membuka deskripsi. Item video: isi `video` (poster = `src`).
- `path`: pengalaman & pendidikan (section Person). `affiliations`: strip logo di bawah hero.

## Update terbaru
- **Skill**: 5 bidang di `skills` (urutan 1 = AI Engineering & Data Science). Kubus otomatis mengikuti jumlah item.
- **Stage**: entri di `stage.items` (jumlah di section = jumlah entri; kategori di `stage.categories`). Foto = aset asli per acara.
- **Recommendations**: array `recommendations`. Kutipan jangan diedit. `photo: null` = kartu tanpa foto; file siap di `assets/testimonials/photo-a.webp` & `photo-b.webp` — isi path hanya setelah identitas foto dikonfirmasi.
- **CV**: file di `assets/cv/`, diatur lewat `person.cv` (tombol hero + baris di Connect). Hapus `person.cv` untuk menyembunyikan tombol.
- **Project**: field `supports` menampilkan skill yang didukung di modal detail. Status "Live" hanya untuk project yang terverifikasi.

## SEO & ikon
- `index.html` berisi title, meta description, canonical (`https://frikhii.my.id/` — ganti jika domain berbeda), Open Graph/Twitter, dan JSON-LD (Person + WebSite).
- Ikon: `favicon.ico`, `favicon.svg`, `assets/icons/*` (apple-touch, 192, 512), `site.webmanifest`. Gambar preview share: `assets/og-image.jpg` (1200×630).
- `robots.txt` dan `sitemap.xml` sudah ada; jika domain berubah, ganti URL di keduanya dan di `index.html`.
- Teks h1 statis + blok statis `#seo-static` (ringkasan konten + link sumber Gunadarma) dibuat otomatis: jalankan `node tools/seo-build.js` (dari folder `site/`) setiap selesai edit `content.js`.

## Halaman statis, bahasa Indonesia, dan SEO lanjutan
Selain SPA di `index.html`, ada halaman statis yang dibangun dari `content.js` + `tools/pages-data.js`:

| URL | Isi |
|---|---|
| `/projects/`, `/projects/<id>/` | hub + satu halaman per project (masalah, solusi, peran, status) |
| `/achievements/`, `/achievements/icbc-2026/`, `/achievements/gemastik-2026/` | tabel prestasi + sertifikat, halaman detail + link sumber Gunadarma |
| `/writing/`, `/writing/<slug>/` | 3 artikel + daftar pers |
| `/id/**` | versi Indonesia dari semuanya (`/id/` = beranda statis) |
| `404.html` | halaman 404 dwibahasa (noindex) |

Setiap halaman punya title/description sendiri, canonical, hreflang (en/id/x-default), Open Graph + kartu gambar sendiri (`assets/og/`), dan JSON-LD (BreadcrumbList + CreativeWork / BlogPosting / WebPage).

**Setelah mengedit `content.js` atau `tools/pages-data.js`, jalankan (dari folder `site/`):**
```bash
node tools/build-pages.js    # halaman statis + sitemap.xml
node tools/og-build.js       # kartu OG (butuh: npm i -D playwright && npx playwright install chromium)
node tools/seo-build.js      # blok SEO statis di index.html
```
- Artikel & terjemahan: `tools/pages-data.js` (`ARTICLES`, `ID_PROJECTS`, `ACH_PAGES`). Isi artikel hanya memakai fakta yang sudah ada di `content.js`; tambahkan cerita/angka aslimu di sana.
- `_headers` (Netlify / Cloudflare Pages): cache aset 1 tahun + header keamanan dasar. GitHub Pages tidak membacanya.
- `tools/backlink-snippet.html`: potongan footer untuk subdomain project (backlink ke portfolio).
- Analytics: belum dipasang (butuh akun). Cloudflare Web Analytics / Plausible cukup dengan satu `<script>` di `index.html` dan `tools/build-pages.js` (fungsi `layout`).
