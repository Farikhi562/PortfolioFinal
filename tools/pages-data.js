/* pages-data.js — terjemahan Indonesia + artikel untuk halaman statis.
   Semua klaim di sini DITURUNKAN dari content.js (tidak ada fakta baru). Edit di sini lalu jalankan:
     node tools/build-pages.js && node tools/og-build.js && node tools/seo-build.js
   Format paragraf: **tebal**, [teks](url). Blok: {h}, {p}, {ul:[...]}. */

const BASE = "https://frikhii.my.id";
const BUILD_DATE = "2026-10-26";

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
    notFoundT: "Page not found", notFoundP: "The page you are looking for does not exist or has moved.",
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
    notFoundT: "Halaman tidak ditemukan", notFoundP: "Halaman yang kamu cari tidak ada atau sudah dipindahkan.",
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
  roles: ["Entrepreneur", "Data Scientist", "Product Management"],
  bio: [
    "Saya antusias di bidang teknologi, dengan fokus pada AI Engineering, Software Development, dan Product Management. Saya senang mengubah masalah yang rumit menjadi solusi praktis dengan memadukan rekayasa, pemikiran strategis, dan pemahaman mendalam tentang kebutuhan pengguna. Bagi saya, teknologi bukan sekadar menulis kode, tetapi menciptakan sesuatu yang bermakna, skalabel, dan berdampak.",
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
  descShort: "Portofolio Muhamad Fauzan Al Farikhi, mahasiswa Informatika Universitas Gunadarma dan pendiri NEXA Tech Labs. Juara Harapan 1 (Top 4) ICBC 2026, delegasi GEMASTIK 2026."
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
    statusNote: "Live — sudah di-deploy di tautan di halaman ini."
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
  loki: {
    cta: "Lihat detail project",
    desc: "Konsep smart locker bersama untuk lingkungan kampus, memadukan Progressive Web App (PWA), otorisasi backend, kontrol IoT berbasis ESP32, kunci solenoid elektronik, dan pemantauan status pintu.",
    problem: "Pengguna kampus butuh penyimpanan sementara yang mudah diakses, dengan akses loker yang tercatat dan aman.",
    solution: "LOKi adalah konsep smart locker bersama untuk lingkungan kampus, memadukan Progressive Web App (PWA), otorisasi backend, kontrol IoT berbasis ESP32, kunci solenoid elektronik, dan pemantauan status pintu. Tujuannya membuat penyimpanan sementara lebih mudah diakses sambil mencatat akses loker dan meningkatkan keamanan.",
    role: "Product Manager",
    contribution: "Kebutuhan produk, prioritas fitur, perencanaan validasi, roadmap, penganggaran, dan koordinasi tim.",
    stack: ["Progressive Web App (PWA)", "Otorisasi backend", "ESP32 (kontrol IoT)", "Kunci solenoid elektronik", "Pemantauan status pintu"],
    statusNote: "Berlangsung — konsep yang sedang dikembangkan dalam program GDGoC ITB 2026. Belum di-deploy atau diadopsi resmi di kampus mana pun.",
    extra: [
      { title: "Arsitektur (desain)", label: "Desain", items: ["PWA — aplikasi untuk pengguna", "Backend — otorisasi akses loker dan pencatatan akses", "ESP32 — pengendali IoT di loker", "Kunci solenoid elektronik — penguncian fisik", "Sensor status pintu — memantau pintu terbuka atau tertutup"] },
      { title: "Fitur PWA yang direncanakan", label: "Rencana", items: ["Melihat loker yang kosong atau terpakai", "Riwayat penggunaan", "Notifikasi saat waktu pemakaian hampir habis", "Dashboard pemantauan admin"] },
      { title: "Roadmap", label: "Akan didokumentasikan", items: null },
      { title: "Target", label: "Akan didokumentasikan", items: null }
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
      title: "ICBC 2026 Top 4 (Juara Harapan 1) | Fauzan Al Farikhi",
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
      desc: "Muhamad Fauzan Al Farikhi was named a main delegate of Universitas Gunadarma for GEMASTIK 2026 in the ICT Business Development division after internal selection (wave III).",
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
      desc: "Muhamad Fauzan Al Farikhi ditetapkan sebagai delegasi utama Universitas Gunadarma di GEMASTIK 2026, divisi Pengembangan Bisnis TIK, hasil seleksi internal gelombang III.",
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
    slug: "loki-smart-locker-product-notes", date: BUILD_DATE, read: 3, project: "loki", ach: null, cover: "assets/projects/loki.webp",
    en: {
      title: "LOKi: product notes on a campus IoT smart locker (GDGoC ITB 2026)",
      seo: "LOKi: Product Notes on a Campus IoT Smart Locker",
      desc: "Notes on LOKi, a campus smart-locker concept with a PWA, backend authorization, ESP32 control, solenoid locks, and door sensing (GDGoC ITB 2026).",
      body: [
        { h: "The problem" },
        { p: "Campus users need accessible temporary storage, and locker access should be recorded and secure." },
        { h: "The concept" },
        { p: "LOKi is a shared smart-locker concept for campus environments. It combines a Progressive Web App (PWA), backend authorization, ESP32-based IoT control, electronic solenoid locks, and door-state monitoring. The aim is to make temporary storage more accessible while recording locker access and improving security." },
        { h: "Architecture (design)" },
        { ul: ["PWA: the user-facing app", "Backend: authorizes locker access and keeps access records", "ESP32: the IoT controller at the locker", "Electronic solenoid lock: physical locking", "Door-state sensing: monitors whether the door is open or closed"] },
        { h: "Planned PWA features" },
        { ul: ["See which lockers are free or occupied", "Usage history", "Notification when usage time is almost up", "Admin monitoring dashboard"] },
        { h: "My role as Product Manager" },
        { p: "Product requirements, feature prioritization, validation planning, roadmap, budgeting, and team coordination." },
        { h: "Status" },
        { p: "Ongoing. LOKi is a concept under development in the GDGoC ITB 2026 program and has not been deployed or officially adopted at any campus. The roadmap and targets are still to be documented. Full details are on the [LOKi project page](/projects/loki/)." }
      ]
    },
    id: {
      title: "LOKi: catatan produk smart locker IoT untuk kampus (GDGoC ITB 2026)",
      seo: "LOKi: Catatan Produk Smart Locker IoT Kampus",
      desc: "Catatan tentang LOKi, konsep smart locker kampus dengan PWA, otorisasi backend, kontrol ESP32, kunci solenoid, dan sensor pintu (GDGoC ITB 2026).",
      body: [
        { h: "Masalahnya" },
        { p: "Pengguna kampus butuh penyimpanan sementara yang mudah diakses, dan akses loker harus tercatat serta aman." },
        { h: "Konsepnya" },
        { p: "LOKi adalah konsep smart locker bersama untuk lingkungan kampus. Konsep ini memadukan Progressive Web App (PWA), otorisasi backend, kontrol IoT berbasis ESP32, kunci solenoid elektronik, dan pemantauan status pintu. Tujuannya membuat penyimpanan sementara lebih mudah diakses sambil mencatat akses loker dan meningkatkan keamanan." },
        { h: "Arsitektur (desain)" },
        { ul: ["PWA: aplikasi untuk pengguna", "Backend: mengotorisasi akses loker dan menyimpan catatan akses", "ESP32: pengendali IoT di loker", "Kunci solenoid elektronik: penguncian fisik", "Sensor status pintu: memantau pintu terbuka atau tertutup"] },
        { h: "Fitur PWA yang direncanakan" },
        { ul: ["Melihat loker yang kosong atau terpakai", "Riwayat penggunaan", "Notifikasi saat waktu pemakaian hampir habis", "Dashboard pemantauan admin"] },
        { h: "Peran saya sebagai Product Manager" },
        { p: "Kebutuhan produk, prioritas fitur, perencanaan validasi, roadmap, penganggaran, dan koordinasi tim." },
        { h: "Status" },
        { p: "Berlangsung. LOKi adalah konsep yang sedang dikembangkan dalam program GDGoC ITB 2026 dan belum di-deploy atau diadopsi resmi di kampus mana pun. Roadmap dan target masih akan didokumentasikan. Detail lengkap ada di [halaman project LOKi](/id/projects/loki/)." }
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
