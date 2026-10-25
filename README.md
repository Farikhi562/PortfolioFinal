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
