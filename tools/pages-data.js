/* pages-data.js — terjemahan Indonesia + artikel untuk halaman statis.
   Semua klaim di sini DITURUNKAN dari content.js (tidak ada fakta baru). Edit di sini lalu jalankan:
     node tools/build-pages.js && node tools/og-build.js && node tools/seo-build.js
   Format paragraf: **tebal**, [teks](url). Blok: {h}, {p}, {ul:[...]}. */

const BASE = "https://frikhii.my.id";
const BUILD_DATE = "2026-11-01";

/* ---------- Teks antarmuka ---------- */
const UI = {
  en: {
    htmlLang: "en", ogLocale: "en_US", home: "Home", portfolio: "Portfolio", projects: "Projects", achievements: "Achievements", writing: "Writing",
    skip: "Skip to content", langName: "Bahasa Indonesia", langShort: "ID", breadcrumb: "Breadcrumb",
    problem: "Problem", solution: "Solution", role: "My role", contribution: "Contribution focus", stack: "Technology stack", status: "Current status",
    supports: "Supports skills", tbd: "To be documented", visit: "Visit live project", allProjects: "All projects", allAchievements: "All achievements",
    allWriting: "All writing", readArticle: "Read article", details: "Details", source: "Official source", press: "Press and publications",
    certificates: "Certificates", issuer: "Issuer", date: "Date", verify: "Verify", year: "Year", result: "Result", level: "Level",
    related: "Related", contact: "Get in touch", contactLead: "Open to conversations about AI engineering, product, and building together.",
    cv: "Download CV", email: "Email", fullPortfolio: "Interactive portfolio", updated: "Published", minRead: "min read", by: "By",
    factComp: "Competition", factOrg: "Organizer", factDate: "Final presentation", factTheme: "Theme", factResult: "Result", factRole: "Role", factProject: "Project",
    factEvent: "Event", factDivision: "Division", factStatus: "Status", factSelection: "Selection",
    notFoundT: "Page not found", notFoundP: "The page you are looking for does not exist or has moved. Return to the homepage to browse projects, achievements, and writing.",
    aboutH: "About", skillsH: "Skills", projectsH: "Projects", achievementsH: "Highlights", pathH: "Experience and education", moreH: "Explore"
  },
  id: {
    htmlLang: "id", ogLocale: "id_ID", home: "Beranda", portfolio: "Portofolio", projects: "Project", achievements: "Prestasi", writing: "Tulisan",
    skip: "Lompat ke konten", langName: "English", langShort: "EN", breadcrumb: "Navigasi remah roti",
    problem: "Masalah", solution: "Solusi", role: "Peran saya", contribution: "Fokus kontribusi", stack: "Teknologi", status: "Status saat ini",
    supports: "Mendukung skill", tbd: "Akan didokumentasikan", visit: "Kunjungi project live", allProjects: "Semua project", allAchievements: "Semua prestasi",
    allWriting: "Semua tulisan", readArticle: "Baca artikel", details: "Detail", source: "Sumber resmi", press: "Pers dan publikasi",
    certificates: "Sertifikat", issuer: "Penerbit", date: "Tanggal", verify: "Verifikasi", year: "Tahun", result: "Hasil", level: "Tingkat",
    related: "Terkait", contact: "Hubungi saya", contactLead: "Terbuka untuk diskusi tentang AI engineering, produk, dan membangun bersama.",
    cv: "Unduh CV", email: "Email", fullPortfolio: "Portofolio interaktif", updated: "Terbit", minRead: "menit baca", by: "Oleh",
    factComp: "Kompetisi", factOrg: "Penyelenggara", factDate: "Presentasi final", factTheme: "Tema", factResult: "Hasil", factRole: "Peran", factProject: "Project",
    factEvent: "Acara", factDivision: "Divisi", factStatus: "Status", factSelection: "Seleksi",
    notFoundT: "Halaman tidak ditemukan", notFoundP: "Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke beranda untuk menelusuri project, prestasi, dan tulisan.",
    aboutH: "Tentang", skillsH: "Skill", projectsH: "Project", achievementsH: "Sorotan", pathH: "Pengalaman dan pendidikan", moreH: "Jelajahi"
  }
};

/* Peta peringkat / tingkat (nama kompetisi tetap memakai judul resmi) */
const RANK_EN = { "Peserta": "Participant", "Delegasi Utama": "Main Delegate", "Medali Perak": "Silver Medal", "Medali Perunggu": "Bronze Medal", "Medali Emas": "Gold Medal", "Top 4 (Juara Harapan 1)": "Top 4 (Juara Harapan 1)" };
const LEVEL_EN = { "Universitas": "University", "Nasional": "National", "Internasional": "International", "Olimpiade": "Olympiad" };
const LEVEL_ID = { "Universitas": "Universitas", "Nasional": "Nasional", "Internasional": "Internasional", "Olimpiade": "Olimpiade" };
const GROUP_EN = { "Kompetisi": "Competition", "Kursus": "Course", "Olimpiade": "Olympiad" };

/* ---------- Terjemahan Indonesia: profil ---------- */
const ID_PERSON = {
  tagline: "Saya tidak hanya membangun teknologi. Saya membangun apa yang akan menjalankan masa depan.",
  roles: ["Entrepreneur", "Product Management", "Data Scientist"],
  edu: "Mahasiswa Informatika · Semester 3 · Universitas Gunadarma · 2025–sekarang",
  bio: [
    "Saya mahasiswa Informatika Universitas Gunadarma, berkuliah sejak 2025 dan kini di semester 3, sekaligus founder dan antusias di bidang teknologi, dengan fokus pada Product Management, AI Engineering & Data Science, dan Software Development. Saya senang mengubah masalah yang rumit menjadi solusi praktis dengan memadukan rekayasa, pemikiran strategis, dan pemahaman mendalam tentang kebutuhan pengguna. Bagi saya, teknologi bukan sekadar menulis kode, tetapi menciptakan sesuatu yang bermakna, skalabel, dan berdampak.",
    "Ambisi saya adalah membangun produk yang menyelesaikan masalah nyata, menciptakan nilai, dan mendorong batas. Dari bereksperimen dengan AI, mengembangkan produk perangkat lunak, hingga menjajaki peluang bisnis, saya percaya setiap proyek adalah langkah menuju sesuatu yang lebih besar. Saya tidak sekadar mengikuti masa depan, saya ikut membangunnya."
  ],
  skillLines: {
    ai: "Merancang dan membangun solusi berbasis AI dengan memadukan machine learning, analisis data, pemodelan prediktif, dan rekayasa perangkat lunak untuk menyelesaikan masalah nyata.",
    software: "Membangun aplikasi yang andal, skalabel, dan berfokus pada pengguna untuk menyelesaikan masalah nyata.",
    product: "Mengubah masalah pengguna menjadi produk bernilai lewat perencanaan strategis, validasi, dan eksekusi.",
    business: "Mengidentifikasi peluang bisnis dan mengembangkan model berkelanjutan yang menciptakan nilai terukur.",
    leadership: "Memimpin tim kolaboratif, mengoordinasikan eksekusi, dan mengarahkan proyek menuju tujuan bersama."
  },
  path: {
    "Agency Business Partner · Financial Consulting": "Agency Business Partner · Financial Consulting",
    "SMA, jurusan MIPA": "SMA, jurusan MIPA",
    "Anggota OSIS · Divisi Acara": "Anggota OSIS · Divisi Acara"
  },
  upcoming: {
    h: "Sesi mendatang",
    title: "NCD Learning Session — Team Formation 101: From Strangers to One Team",
    when: "Senin, 16 November 2026 · 20.00–21.00 WIB · Live via Discord",
    desc: "Saya akan menjadi pemateri: cara membangun tim yang efektif dari nol, mulai dari chemistry dan kepercayaan, memahami potensi individu, pembagian peran dan tanggung jawab, komunikasi dan koordinasi, mengelola konflik tim, hingga simulasi pembentukan tim interaktif.",
    cta: "Daftar di ncd.web.id",
    url: "https://ncd.web.id"
  },
  descShort: "Portofolio Muhamad Fauzan Al Farikhi, mahasiswa Informatika semester 3 Universitas Gunadarma dan pendiri NEXA Tech Labs. Top 4 ICBC 2026, delegasi GEMASTIK 2026."
};

/* ---------- Terjemahan Indonesia: project ---------- */
const ID_PROJECTS = {
  smarthomeai: {
    cta: "Kunjungi project live",
    desc: "Platform web smart home yang membantu pengguna mencatat barang rumah tangga dan memudahkan mengingat atau menemukan di mana barang disimpan.",
    problem: "Barang rumah tangga mudah terlupa atau salah taruh, dan sulit mengingat di mana barang disimpan.",
    solution: "Platform web smart home yang membantu pengguna mencatat barang rumah tangga dan menemukan lokasi penyimpanannya.",
    statusNote: "Live — sudah di-deploy di tautan di halaman ini."
  },
  forecasting: {
    cta: "Kunjungi project",
    desc: "Project forecasting yang mengeksplorasi metode berbasis data untuk menganalisis data historis dan menghasilkan prediksi.",
    solution: "Project forecasting yang mengeksplorasi metode berbasis data untuk menganalisis data historis dan menghasilkan prediksi.",
    statusNote: "Live — sudah di-deploy di tautan di halaman ini."
  },
  petroleum: {
    cta: "Kunjungi project",
    desc: "Project teknik perminyakan yang menyajikan konsep dan informasi teknis lewat pengalaman web khusus.",
    solution: "Pengalaman web khusus yang menyajikan konsep dan informasi teknik perminyakan.",
    statusNote: "Live — sudah di-deploy di tautan di halaman ini."
  },
  "nexa-campus": {
    cta: "Kunjungi project live",
    desc: "Platform SaaS berfokus kampus yang dikembangkan di bawah NEXA Tech Labs untuk mendukung kebutuhan mahasiswa lewat ekosistem digital.",
    solution: "Platform SaaS berfokus kampus yang mendukung kebutuhan mahasiswa lewat ekosistem digital.",
    statusNote: "Live — sudah di-deploy di tautan di halaman ini. Penggunaan awal: 17 pengguna, 7 di antaranya merasa terbantu karena NEXA Campus mengingatkan deadline yang mereka catat.",
    extra: [
      { title: "Penggunaan awal", label: "Dilaporkan", items: ["17 pengguna sejauh ini", "7 dari 17 pengguna (sekitar 41%) merasa terbantu karena NEXA Campus mengingatkan deadline yang mereka catat", "Sampel awal yang kecil — angka yang dilaporkan, bukan studi terkontrol"] }
    ]
  },
  "nexa-sphere": {
    cta: "Lihat detail project",
    desc: "Konsep platform AI-SaaS B2B untuk mengoptimalkan inventaris dan rantai pasok bisnis F&B multi-outlet, dengan demand forecasting, rekomendasi pengadaan, dan dashboard terpusat.",
    problem: "UKM F&B multi-outlet (2–10 cabang) terlalu kecil untuk ERP enterprise, tetapi terlalu kompleks untuk pembelian manual berbasis insting, sehingga terjadi overstock, stockout, dan food waste.",
    solution: "Platform AI-SaaS B2B yang mengubah data historis point-of-sale menjadi rekomendasi pembelian: demand forecasting, rekomendasi pengadaan dengan persetujuan pemilik, dan dashboard multi-outlet terpusat.",
    role: "Team Lead & AI/ML Engineer",
    contribution: "Arah arsitektur teknologi, pengembangan model prediktif (demand forecasting), dan manajemen risiko algoritma; mempresentasikan proposal di ICBC 2026 sebagai ketua tim.",
    stack: ["Time-series forecasting (ARIMA, Prophet) — diusulkan", "Gradient boosting (XGBoost / LightGBM) — diusulkan", "Cloud (AWS / GCP) — direncanakan"],
    statusNote: "Konsep proposal bisnis dengan prototipe antarmuka — finalis (Top 4, Juara Harapan 1) di ICBC 2026. Belum dirilis dan belum digunakan luas. Tangkapan layar di proposal memakai data internal simulasi.",
    extra: [
      { title: "Pilar utama (diusulkan)", label: "Proposal", items: ["AI demand forecasting (penjualan harian / mingguan per item menu)", "Rekomendasi pengadaan dengan kontrol setujui-atau-ubah oleh pemilik", "Dashboard terpusat lintas outlet (mobile dan desktop)"] },
      { title: "Prototipe di proposal (data simulasi)", label: "Prototipe", items: ["POS Terminal dengan tampilan AI Engine Analytics", "Floor Plan Manager dan dashboard Admin (toggle Dynamic Pricing, Live Metrics)", "Tab navigasi prototipe: Kitchen Display, Table Map, Data Science HQ, Inventory, Live Chat, Public Web", "Dimsum Manager bersama mitra desain Dimsum Mentai Kemayoran — login berbasis peran (Owner / Admin / Kasir) sudah berjalan; sekitar 80% selesai saat proposal dibuat"] },
      { title: "Direncanakan, belum dibangun", label: "Rencana", items: ["Integrasi dengan penyedia POS lokal (Moka, Pawoon, Majoo, ESB)", "Peluncuran bertahap: sinkronisasi API → validasi shadow-mode → rekomendasi aktif", "Integrasi supplier B2B (roadmap tahun ke-2)", "Ekspansi regional di Asia Tenggara"] },
      { title: "Belum tervalidasi", label: "Belum tervalidasi", items: ["Akurasi forecast (kalibrasi direncanakan pada 4–6 minggu pertama klien)", "Pengurangan food waste yang terukur", "Ukuran pasar, harga, dan proyeksi pendapatan (hanya indikatif)"] }
    ]
  },
  breathsafe: {
    cta: "Lihat detail project",
    desc: "Monitor PM2.5 pribadi yang dijepit di masker untuk pengemudi ojek online: modul sensor di masker, terhubung kabel ke baterai di pinggang, dengan indikator LED kualitas udara dan Progressive Web App yang merangkum paparan setiap shift.",
    problem: "Sekitar tujuh juta pengemudi ojek online bekerja di Indonesia, tetapi stasiun kualitas udara tetap tidak bisa mengukur udara di sekitar tiap pengendara. Pada 30 Oktober 2026, stasiun rooftop RSUD Tanjung Priok mencatat PM2.5 sebesar 102,87 µg/m³ dan ISPU 175 (“Tidak Sehat”).",
    solution: "BreathSafe adalah modul sensor di masker pengendara yang terhubung kabel ke baterai di pinggang. Sensor PMS5003 dan blower 5 V mengambil sampel udara di dekat wajah; tiga LED menunjukkan pita PM2.5, LED merah saat berhenti di tempat aman mengingatkan untuk memeriksa masker, lalu aplikasi menampilkan kapan dan di mana paparan memuncak. Pengendara bisa berbagi ringkasan anonim (hanya waktu per pita) dengan kelompoknya.",
    role: "Anggota tim",
    stack: ["Progressive Web App Chrome di Android (Web Bluetooth)", "Sensor PM2.5 PMS5003", "Board nRF52840", "Sensor kelembapan AHT20", "Blower 5 V untuk pengambilan sampel udara"],
    statusNote: "Berlangsung — karya kompetisi untuk STACK 2026 oleh GDGoC ITB (Case 2: Stronger Communities and Everyday Services), tim “Mirza Batagor Phd”. Abstrak sudah ditulis; perangkat keras belum dibuat atau diuji, dan gambar yang tampil adalah render konsep, bukan foto prototipe. Hardware freeze: 27 November 2026. Final Day, jika terpilih: 16 Desember 2026.",
    extra: [
      { title: "Catatan lapangan di balik masalah", label: "Eksploratif", items: ["Enam wawancara eksploratif pada Oktober 2026: lima pengemudi dan satu pekerja-mahasiswa", "Empat orang melaporkan iritasi mata akibat debu; empat orang berkendara 5–10 jam per hari", "Satu orang batuk hingga berhenti bekerja", "Cerita ini bersifat eksploratif dan tidak membuktikan prevalensi maupun sebab-akibat"] },
      { title: "Alur pengguna inti (desain)", label: "Desain", items: ["Tiga LED menyala tetap menunjukkan pita PM2.5 yang ditetapkan project", "Saat berhenti di tempat aman, LED merah meminta pengecekan masker", "Aplikasi menampilkan kapan dan di mana paparan memuncak, plus ringkasan pribadi akhir shift dalam bahasa Indonesia", "Opsional: ringkasan kelompok anonim untuk perencanaan cek masker (direncanakan; data sintetis di demo). Data lokasi tetap di ponsel pengendara"] },
      { title: "MVP dan validasi yang direncanakan", label: "Rencana", items: ["PWA Chrome di Android dengan Web Bluetooth, dengan kelembapan dicatat untuk koreksi bias", "Uji bobot dan kecocokan di semua masker, konektor lepas-cepat, uji LED siang dan malam, serta validasi helm di jalan", "Dua iterasi: satu unit bench dan dua unit pilot", "Uji kesesuaian antarunit dan, jika akses referensi terkonfirmasi, R² > 0,90"] },
      { title: "Belum tervalidasi", label: "Belum tervalidasi", items: ["Keterbacaan LED dan tindak lanjut pengecekan masker", "Apakah ringkasan kelompok bisa disusun lebih cepat daripada menghitung manual", "Daya tahan baterai (3–5 jam belum terverifikasi dan perlu duty-cycling)"] }
    ]
  }
};

/* ---------- Halaman prestasi ---------- */
const ACH_PAGES = {
  "icbc-2026": {
    url: "https://kemahasiswaan.gunadarma.ac.id/tim-mahasiswa-universitas-gunadarma-raih-juara-harapan-i-pada-international-canvas-business-competition-2026",
    img: ["assets/stage.webp", "assets/icbc-pitch.webp"], cert: "assets/certs/icbc-2026.webp", project: "nexa-sphere", article: "nexa-sphere-icbc-2026",
    en: {
      title: "ICBC 2026 Top 4 (Juara Harapan 1) | Fauzan Al Farikhi",
      h1: "International Canvas Business Competition 2026",
      desc: "Muhamad Fauzan Al Farikhi led a Universitas Gunadarma team to the Top 4 (Juara Harapan 1) at ICBC 2026 with NEXA-Sphere, an AI-SaaS concept for F&B.",
      lede: "A Universitas Gunadarma team led by Muhamad Fauzan Al Farikhi reached the final and finished in the Top 4 (Juara Harapan 1) at ICBC 2026, presenting the NEXA-Sphere business concept.",
      facts: [["factComp", "International Canvas Business Competition (ICBC) 2026"], ["factOrg", "Universitas Dian Nuswantoro"], ["factDate", "April 25, 2026"], ["factTheme", "Digital Business Ecosystem for Global Market Expansion"], ["factResult", "Top 4 (Juara Harapan 1)"], ["factRole", "Team Lead / Presenter, NEXA Tech Labs"], ["factProject", "NEXA-Sphere"]],
      body: [
        { h: "What happened" },
        { p: "ICBC 2026 is an international business competition organized by Universitas Dian Nuswantoro. The final presentation took place on April 25, 2026 under the theme “Digital Business Ecosystem for Global Market Expansion.” Our team presented in front of the judges with the countdown timer running, and finished in the Top 4 with the title Juara Harapan 1." },
        { h: "What we presented" },
        { p: "The team presented **NEXA-Sphere**, a B2B AI-SaaS concept that turns point-of-sale history into purchasing recommendations for multi-outlet F&B businesses, built around demand forecasting, procurement recommendations with owner approval, and a centralized dashboard. Read the full project write-up on the [NEXA-Sphere project page](/projects/nexa-sphere/) or the [article on the road to ICBC](/writing/nexa-sphere-icbc-2026/)." },
        { h: "My role" },
        { p: "Team Lead and presenter for NEXA Tech Labs. On the technical side I directed the technology architecture, developed the predictive-model (demand forecasting) approach, and handled algorithm risk management." },
        { h: "Official record" },
        { p: "The result was announced by Kemahasiswaan Universitas Gunadarma: [Tim Mahasiswa Universitas Gunadarma Raih Juara Harapan I pada International Canvas Business Competition 2026](URL). The finalist certificate is shown below." }
      ]
    },
    id: {
      title: "Juara Harapan 1 ICBC 2026 | Fauzan Al Farikhi",
      h1: "International Canvas Business Competition 2026",
      desc: "Muhamad Fauzan Al Farikhi memimpin tim Universitas Gunadarma meraih Top 4 (Juara Harapan 1) di ICBC 2026 lewat NEXA-Sphere, konsep AI-SaaS untuk F&B.",
      lede: "Tim Universitas Gunadarma yang dipimpin Muhamad Fauzan Al Farikhi lolos ke final dan meraih Top 4 (Juara Harapan 1) di ICBC 2026 dengan membawakan konsep bisnis NEXA-Sphere.",
      facts: [["factComp", "International Canvas Business Competition (ICBC) 2026"], ["factOrg", "Universitas Dian Nuswantoro"], ["factDate", "25 April 2026"], ["factTheme", "Digital Business Ecosystem for Global Market Expansion"], ["factResult", "Top 4 (Juara Harapan 1)"], ["factRole", "Ketua Tim / Presenter, NEXA Tech Labs"], ["factProject", "NEXA-Sphere"]],
      body: [
        { h: "Apa yang terjadi" },
        { p: "ICBC 2026 adalah kompetisi bisnis internasional yang diselenggarakan Universitas Dian Nuswantoro. Presentasi final berlangsung pada 25 April 2026 dengan tema “Digital Business Ecosystem for Global Market Expansion.” Tim kami presentasi di depan juri dengan penghitung waktu berjalan, dan menutup kompetisi di Top 4 dengan gelar Juara Harapan 1." },
        { h: "Apa yang kami presentasikan" },
        { p: "Tim membawakan **NEXA-Sphere**, konsep AI-SaaS B2B yang mengubah riwayat point-of-sale menjadi rekomendasi pembelian untuk bisnis F&B multi-outlet, dengan demand forecasting, rekomendasi pengadaan yang disetujui pemilik, dan dashboard terpusat. Baca selengkapnya di [halaman project NEXA-Sphere](/id/projects/nexa-sphere/) atau [artikel perjalanan menuju ICBC](/id/writing/nexa-sphere-icbc-2026/)." },
        { h: "Peran saya" },
        { p: "Ketua tim dan presenter untuk NEXA Tech Labs. Di sisi teknis, saya mengarahkan arsitektur teknologi, mengembangkan pendekatan model prediktif (demand forecasting), dan mengelola risiko algoritma." },
        { h: "Catatan resmi" },
        { p: "Hasil ini diumumkan oleh Kemahasiswaan Universitas Gunadarma: [Tim Mahasiswa Universitas Gunadarma Raih Juara Harapan I pada International Canvas Business Competition 2026](URL). Sertifikat finalis ditampilkan di bawah." }
      ]
    }
  },
  "gemastik-2026": {
    url: "https://kemahasiswaan.gunadarma.ac.id/pengumuman-penetapan-delegasi-universitas-gunadarma-pada-gemastik-tahun-2026-hasil-seleksi-internal-gelombang-iii",
    img: [], cert: null, project: null, article: null,
    en: {
      title: "GEMASTIK 2026 Main Delegate | Fauzan Al Farikhi",
      h1: "GEMASTIK 2026 — ICT Business Development",
      desc: "Muhamad Fauzan Al Farikhi was named a main delegate of Universitas Gunadarma for GEMASTIK 2026 in the ICT Business Development division (wave III).",
      lede: "Muhamad Fauzan Al Farikhi was set as a main delegate (Delegasi Utama) of Universitas Gunadarma for GEMASTIK 2026, in the ICT Business Development (Pengembangan Bisnis TIK) division.",
      facts: [["factEvent", "GEMASTIK 2026"], ["factDivision", "Pengembangan Bisnis TIK (ICT Business Development)"], ["factStatus", "Delegasi Utama, Universitas Gunadarma"], ["factSelection", "Internal selection, wave III (Seleksi Internal Gelombang III)"]],
      body: [
        { h: "About GEMASTIK" },
        { p: "GEMASTIK (Pagelaran Mahasiswa Nasional Bidang Teknologi Informasi dan Komunikasi) is a national student competition in information and communication technology in Indonesia. Universities send delegations chosen through internal selection." },
        { h: "My delegation" },
        { p: "Universitas Gunadarma announced its delegation for GEMASTIK 2026 after the third wave of internal selection, and I am listed as a main delegate in the ICT Business Development division. The division fits the business and product side of my work at NEXA Tech Labs, alongside my projects such as [NEXA-Sphere](/projects/nexa-sphere/)." },
        { h: "Official record" },
        { p: "The delegation is listed in the official announcement from Kemahasiswaan Universitas Gunadarma: [Pengumuman Penetapan Delegasi Universitas Gunadarma pada GEMASTIK Tahun 2026 (Hasil Seleksi Internal Gelombang III)](URL)." }
      ]
    },
    id: {
      title: "Delegasi Utama GEMASTIK 2026 | Fauzan Al Farikhi",
      h1: "GEMASTIK 2026 — Pengembangan Bisnis TIK",
      desc: "Muhamad Fauzan Al Farikhi ditetapkan sebagai delegasi utama Universitas Gunadarma di GEMASTIK 2026, divisi Pengembangan Bisnis TIK (gelombang III).",
      lede: "Muhamad Fauzan Al Farikhi ditetapkan sebagai Delegasi Utama Universitas Gunadarma untuk GEMASTIK 2026, divisi Pengembangan Bisnis TIK.",
      facts: [["factEvent", "GEMASTIK 2026"], ["factDivision", "Pengembangan Bisnis TIK"], ["factStatus", "Delegasi Utama, Universitas Gunadarma"], ["factSelection", "Seleksi Internal Gelombang III"]],
      body: [
        { h: "Tentang GEMASTIK" },
        { p: "GEMASTIK (Pagelaran Mahasiswa Nasional Bidang Teknologi Informasi dan Komunikasi) adalah kompetisi mahasiswa tingkat nasional di bidang teknologi informasi dan komunikasi. Perguruan tinggi mengirim delegasi yang dipilih lewat seleksi internal." },
        { h: "Delegasi saya" },
        { p: "Universitas Gunadarma mengumumkan delegasinya untuk GEMASTIK 2026 setelah seleksi internal gelombang ketiga, dan saya tercantum sebagai delegasi utama di divisi Pengembangan Bisnis TIK. Divisi ini sejalan dengan sisi bisnis dan produk dari pekerjaan saya di NEXA Tech Labs, termasuk project seperti [NEXA-Sphere](/id/projects/nexa-sphere/)." },
        { h: "Catatan resmi" },
        { p: "Delegasi ini tercantum dalam pengumuman resmi Kemahasiswaan Universitas Gunadarma: [Pengumuman Penetapan Delegasi Universitas Gunadarma pada GEMASTIK Tahun 2026 (Hasil Seleksi Internal Gelombang III)](URL)." }
      ]
    }
  }
};

/* ---------- Artikel ---------- */
const ARTICLES = [
  {
    slug: "nexa-sphere-icbc-2026", date: BUILD_DATE, read: 4, project: "nexa-sphere", ach: "icbc-2026", cover: "assets/stage.webp",
    en: {
      title: "NEXA-Sphere: an AI-SaaS concept for multi-outlet F&B inventory, and the road to ICBC 2026 Top 4",
      seo: "NEXA-Sphere: AI-SaaS for F&B Inventory and ICBC 2026 Top 4",
      desc: "How NEXA-Sphere turns point-of-sale data into purchasing recommendations for F&B, what is prototyped, what is unvalidated, and the ICBC 2026 Top 4.",
      body: [
        { h: "The problem" },
        { p: "Multi-outlet F&B businesses with 2–10 branches sit in an awkward middle. They are too small for an enterprise ERP, yet too complex for purchasing that runs on instinct. The familiar result is overstock, stockouts, and food waste." },
        { h: "The idea" },
        { p: "NEXA-Sphere is a B2B AI-SaaS concept that turns historical point-of-sale data into purchasing recommendations. It is built around three proposed pillars:" },
        { ul: ["AI demand forecasting (daily and weekly sales per menu item)", "Procurement recommendations with owner approve-or-modify control", "A centralized dashboard across outlets, on mobile and desktop"] },
        { p: "The owner stays in control: recommendations can be approved or modified, rather than being ordered automatically." },
        { h: "Proposed technical approach" },
        { p: "The proposal names time-series forecasting (ARIMA, Prophet) and gradient boosting (XGBoost, LightGBM) as modelling approaches, with cloud deployment on AWS or GCP planned. These are proposals, not a finished system." },
        { h: "What was prototyped" },
        { p: "The proposal included interface prototypes built on simulated data: a POS Terminal with an AI Engine analytics view, a Floor Plan Manager and admin dashboard, and navigation tabs for Kitchen Display, Table Map, Data Science HQ, Inventory, Live Chat, and Public Web. A design-partner build, Dimsum Manager with Dimsum Mentai Kemayoran, had role-based login (Owner, Admin, Kasir) running and was about 80% complete at the time of the proposal." },
        { h: "What is not validated yet" },
        { ul: ["Forecast accuracy (calibration is planned over a client’s first 4–6 weeks)", "Measured food-waste reduction", "Market size, pricing, and revenue projections (indicative only)"] },
        { p: "Stating this plainly matters. A concept is only as credible as its list of open questions." },
        { h: "On stage at ICBC 2026" },
        { p: "The proposal was presented on April 25, 2026 at the International Canvas Business Competition, organized by Universitas Dian Nuswantoro, under the theme “Digital Business Ecosystem for Global Market Expansion.” I presented as team lead for NEXA Tech Labs and the team finished in the Top 4 (Juara Harapan 1). The result is recorded by Kemahasiswaan Universitas Gunadarma on its [official announcement](URL_ICBC). More on the [ICBC 2026 page](/achievements/icbc-2026/)." },
        { h: "My role" },
        { p: "Team Lead and AI/ML Engineer: technology architecture direction, predictive-model (demand forecasting) development, and algorithm risk management. See the full [NEXA-Sphere project page](/projects/nexa-sphere/)." }
      ]
    },
    id: {
      title: "NEXA-Sphere: konsep AI-SaaS untuk inventaris F&B multi-outlet dan perjalanan menuju Top 4 ICBC 2026",
      seo: "NEXA-Sphere: AI-SaaS Inventaris F&B dan Top 4 ICBC 2026",
      desc: "Bagaimana NEXA-Sphere mengubah data point-of-sale jadi rekomendasi pembelian F&B, apa yang sudah diprototipekan, belum divalidasi, dan Top 4 ICBC 2026.",
      body: [
        { h: "Masalahnya" },
        { p: "Bisnis F&B multi-outlet dengan 2–10 cabang berada di posisi serba nanggung. Terlalu kecil untuk ERP enterprise, tetapi terlalu kompleks untuk pembelian yang mengandalkan insting. Hasilnya sudah umum: overstock, stockout, dan food waste." },
        { h: "Idenya" },
        { p: "NEXA-Sphere adalah konsep AI-SaaS B2B yang mengubah data historis point-of-sale menjadi rekomendasi pembelian. Konsep ini dibangun di atas tiga pilar yang diusulkan:" },
        { ul: ["AI demand forecasting (penjualan harian dan mingguan per item menu)", "Rekomendasi pengadaan dengan kontrol setujui-atau-ubah oleh pemilik", "Dashboard terpusat lintas outlet, di mobile dan desktop"] },
        { p: "Pemilik tetap memegang kendali: rekomendasi bisa disetujui atau diubah, bukan dipesan otomatis." },
        { h: "Pendekatan teknis yang diusulkan" },
        { p: "Proposal menyebut time-series forecasting (ARIMA, Prophet) dan gradient boosting (XGBoost, LightGBM) sebagai pendekatan pemodelan, dengan deployment cloud di AWS atau GCP yang direncanakan. Semua ini masih usulan, bukan sistem jadi." },
        { h: "Apa yang sudah diprototipekan" },
        { p: "Proposal menyertakan prototipe antarmuka dengan data simulasi: POS Terminal dengan tampilan AI Engine analytics, Floor Plan Manager dan dashboard admin, serta tab navigasi Kitchen Display, Table Map, Data Science HQ, Inventory, Live Chat, dan Public Web. Satu build bersama mitra desain, Dimsum Manager dengan Dimsum Mentai Kemayoran, sudah menjalankan login berbasis peran (Owner, Admin, Kasir) dan sekitar 80% selesai saat proposal dibuat." },
        { h: "Apa yang belum tervalidasi" },
        { ul: ["Akurasi forecast (kalibrasi direncanakan pada 4–6 minggu pertama klien)", "Pengurangan food waste yang terukur", "Ukuran pasar, harga, dan proyeksi pendapatan (hanya indikatif)"] },
        { p: "Menyatakan ini dengan jelas itu penting. Sebuah konsep hanya sekredibel daftar pertanyaan terbukanya." },
        { h: "Di panggung ICBC 2026" },
        { p: "Proposal dipresentasikan pada 25 April 2026 di International Canvas Business Competition, diselenggarakan Universitas Dian Nuswantoro, dengan tema “Digital Business Ecosystem for Global Market Expansion.” Saya presentasi sebagai ketua tim NEXA Tech Labs dan tim menutup kompetisi di Top 4 (Juara Harapan 1). Hasilnya tercatat oleh Kemahasiswaan Universitas Gunadarma dalam [pengumuman resmi](URL_ICBC). Selengkapnya di [halaman ICBC 2026](/id/achievements/icbc-2026/)." },
        { h: "Peran saya" },
        { p: "Team Lead dan AI/ML Engineer: arah arsitektur teknologi, pengembangan model prediktif (demand forecasting), dan manajemen risiko algoritma. Lihat [halaman project NEXA-Sphere](/id/projects/nexa-sphere/)." }
      ]
    }
  },
  {
    slug: "breathsafe-pm25-monitor-ojol", date: BUILD_DATE, read: 3, project: "breathsafe", ach: null, cover: "assets/projects/breathsafe-board.webp",
    en: {
      title: "BreathSafe: a clip-on PM2.5 monitor for ojol drivers (STACK 2026 by GDGoC ITB)",
      seo: "BreathSafe: A Clip-On PM2.5 Monitor for Ojol Drivers",
      desc: "Notes on BreathSafe, a clip-on personal PM2.5 monitor for online motorcycle-taxi drivers, entered in STACK 2026 by GDGoC ITB.",
      body: [
        { h: "The problem" },
        { p: "Around seven million online motorcycle-taxi (ojol) drivers work in Indonesia, but fixed air-quality stations cannot measure the air alongside each rider. On 30 October 2026, the RSUD Tanjung Priok rooftop station reported PM2.5 of 102.87 µg/m³ and an ISPU of 175 (“Unhealthy”)." },
        { h: "What we heard in the field" },
        { p: "In October 2026 the team held six exploratory interviews: five drivers and one student-worker. Four reported dust-related eye irritation, four reported riding 5–10 hours per day, and one had a cough that made them stop working. These accounts are exploratory and give no evidence of prevalence or causation." },
        { h: "The concept" },
        { p: "BreathSafe is a sensor module on the rider’s mask, cabled to a waist-worn battery. A PMS5003 sensor and a 5 V blower sample the air near the face." },
        { ul: ["Three steady LEDs show project-defined PM2.5 bands", "At a safe stop, red prompts a mask check", "The app then shows when and where exposure peaked", "Optionally, riders share an anonymous summary (time per band only) with their group. This is planned, with synthetic data in the demo"] },
        { h: "Planned MVP" },
        { p: "A Chrome progressive web app on Android using Web Bluetooth, with a PMS5003, an nRF52840 board, and an AHT20 humidity sensor. The plan includes weight and fit testing across masks, a breakaway connector, day-and-night LED tests, and on-road helmet validation." },
        { h: "My role" },
        { p: "Team member, on team “Mirza Batagor Phd”." },
        { h: "Status" },
        { p: "Ongoing. BreathSafe is a competition entry for STACK 2026 by GDGoC ITB (Case 2: Stronger Communities and Everyday Services). The hardware is not yet built or tested, and the images are concept renders, not photos of a prototype. Hardware freeze is 27 November 2026; the Final Day, if selected, is 16 December 2026. Full details are on the [BreathSafe project page](/projects/breathsafe/)." }
      ]
    },
    id: {
      title: "BreathSafe: monitor PM2.5 jepit untuk pengemudi ojol (STACK 2026 oleh GDGoC ITB)",
      seo: "BreathSafe: Monitor PM2.5 Jepit untuk Pengemudi Ojol",
      desc: "Catatan tentang BreathSafe, monitor PM2.5 pribadi yang dijepit di masker untuk pengemudi ojek online, karya untuk STACK 2026 oleh GDGoC ITB.",
      body: [
        { h: "Masalahnya" },
        { p: "Sekitar tujuh juta pengemudi ojek online (ojol) bekerja di Indonesia, tetapi stasiun kualitas udara tetap tidak bisa mengukur udara di sekitar tiap pengendara. Pada 30 Oktober 2026, stasiun rooftop RSUD Tanjung Priok mencatat PM2.5 sebesar 102,87 µg/m³ dan ISPU 175 (“Tidak Sehat”)." },
        { h: "Yang kami dengar di lapangan" },
        { p: "Pada Oktober 2026 tim melakukan enam wawancara eksploratif: lima pengemudi dan satu pekerja-mahasiswa. Empat orang melaporkan iritasi mata akibat debu, empat orang berkendara 5–10 jam per hari, dan satu orang batuk hingga berhenti bekerja. Cerita ini bersifat eksploratif dan tidak membuktikan prevalensi maupun sebab-akibat." },
        { h: "Konsepnya" },
        { p: "BreathSafe adalah modul sensor di masker pengendara yang terhubung kabel ke baterai di pinggang. Sensor PMS5003 dan blower 5 V mengambil sampel udara di dekat wajah." },
        { ul: ["Tiga LED menyala tetap menunjukkan pita PM2.5 yang ditetapkan project", "Saat berhenti di tempat aman, LED merah meminta pengecekan masker", "Aplikasi lalu menampilkan kapan dan di mana paparan memuncak", "Opsional: pengendara berbagi ringkasan anonim (hanya waktu per pita) dengan kelompoknya. Ini masih rencana, dengan data sintetis di demo"] },
        { h: "MVP yang direncanakan" },
        { p: "Progressive web app Chrome di Android memakai Web Bluetooth, dengan PMS5003, board nRF52840, dan sensor kelembapan AHT20. Rencananya mencakup uji bobot dan kecocokan di berbagai masker, konektor lepas-cepat, uji LED siang dan malam, serta validasi helm di jalan." },
        { h: "Peran saya" },
        { p: "Anggota tim, pada tim “Mirza Batagor Phd”." },
        { h: "Status" },
        { p: "Berlangsung. BreathSafe adalah karya kompetisi untuk STACK 2026 oleh GDGoC ITB (Case 2: Stronger Communities and Everyday Services). Perangkat keras belum dibuat atau diuji, dan gambar yang tampil adalah render konsep, bukan foto prototipe. Hardware freeze 27 November 2026; Final Day, jika terpilih, 16 Desember 2026. Detail lengkap ada di [halaman project BreathSafe](/id/projects/breathsafe/)." }
      ]
    }
  },
  {
    slug: "python-to-ai-learning-path-2026", date: BUILD_DATE, read: 3, project: "forecasting", ach: null, cover: "assets/classroom.webp",
    en: {
      title: "My 2026 learning path: from Python fundamentals to data science and cloud AI",
      seo: "My 2026 Learning Path: Python, Data Science and Cloud AI",
      desc: "The 2026 courses behind my AI engineering work, with dates: Python and data science at Gunadarma, plus Dicoding courses on AWS Cloud, Gen AI and Kiro.",
      body: [
        { p: "Skills are easier to trust when they come with dates and certificates. This is the learning path behind my AI engineering and software work in 2026, in order." },
        { h: "February 2026: Python fundamentals" },
        { p: "**Dasar Pemrograman Python (Fundamental of Python)** at Universitas Gunadarma, February 23–28, 2026. The course covered building web applications with Flask and MySQL, including CRUD." },
        { h: "May–June 2026: data science" },
        { p: "**Pengantar Ilmu Data (Fundamental of Data Science)** at Universitas Gunadarma, May 25 – June 6, 2026. The material covered matrices, working with data in Python, NumPy and Pandas, and the data science methodology." },
        { h: "October 2026: Dicoding courses" },
        { ul: ["**Belajar Dasar Cloud dan Gen AI di AWS**, October 14, 2026", "**Spec-Driven Development dengan Kiro**, October 14, 2026", "**Memulai Pemrograman dengan Python**, October 23, 2026"] },
        { p: "The Dicoding certificates are verifiable online; see the certificate list on the [achievements page](/achievements/)." },
        { h: "Putting it to work" },
        { ul: ["The [Forecasting project](/projects/forecasting/) explores analysis of historical data and prediction.", "NEXA Assistant, a learning assistant on NEXA Campus built with NLP and RAG, offers flashcards, quizzes, practice questions, and summaries.", "[NEXA-Sphere](/projects/nexa-sphere/) applies demand forecasting to F&B purchasing and reached the Top 4 at ICBC 2026."] },
        { p: "I also have one year of experience as a Python developer. The path above is the structured part; the projects are where it gets tested." }
      ]
    },
    id: {
      title: "Jalur belajar saya di 2026: dari dasar Python ke data science dan AI di cloud",
      seo: "Jalur Belajar 2026: Python, Data Science dan AI Cloud",
      desc: "Kursus 2026 di balik pekerjaan AI engineering saya, lengkap tanggal: Python dan data science di Gunadarma, plus kursus Dicoding AWS Cloud, Gen AI, dan Kiro.",
      body: [
        { p: "Skill lebih mudah dipercaya kalau disertai tanggal dan sertifikat. Ini jalur belajar di balik pekerjaan AI engineering dan software saya di 2026, berurutan." },
        { h: "Februari 2026: dasar Python" },
        { p: "**Dasar Pemrograman Python (Fundamental of Python)** di Universitas Gunadarma, 23–28 Februari 2026. Materinya membangun aplikasi web dengan Flask dan MySQL, termasuk CRUD." },
        { h: "Mei–Juni 2026: data science" },
        { p: "**Pengantar Ilmu Data (Fundamental of Data Science)** di Universitas Gunadarma, 25 Mei – 6 Juni 2026. Materinya mencakup matriks, mengolah data dengan Python, NumPy dan Pandas, serta metodologi data science." },
        { h: "Oktober 2026: kursus Dicoding" },
        { ul: ["**Belajar Dasar Cloud dan Gen AI di AWS**, 14 Oktober 2026", "**Spec-Driven Development dengan Kiro**, 14 Oktober 2026", "**Memulai Pemrograman dengan Python**, 23 Oktober 2026"] },
        { p: "Sertifikat Dicoding bisa diverifikasi online; lihat daftar sertifikat di [halaman prestasi](/id/achievements/)." },
        { h: "Dipakai di project" },
        { ul: ["[Project Forecasting](/id/projects/forecasting/) mengeksplorasi analisis data historis dan prediksi.", "NEXA Assistant, asisten belajar di NEXA Campus berbasis NLP dan RAG, menyediakan flashcard, kuis, latihan soal, dan ringkasan.", "[NEXA-Sphere](/id/projects/nexa-sphere/) menerapkan demand forecasting pada pembelian F&B dan mencapai Top 4 di ICBC 2026."] },
        { p: "Saya juga punya pengalaman satu tahun sebagai Python developer. Jalur di atas adalah bagian yang terstruktur; project adalah tempat semuanya diuji." }
      ]
    }
  }
];

module.exports = { BASE, BUILD_DATE, UI, RANK_EN, LEVEL_EN, LEVEL_ID, GROUP_EN, ID_PERSON, ID_PROJECTS, ACH_PAGES, ARTICLES };
