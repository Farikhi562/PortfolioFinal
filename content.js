/* ==========================================================================
   content.js — SEMUA teks & daftar ada di sini. Edit file ini saja.
   ========================================================================== */
window.CONTENT = {
  person: {
    first: "Muhamad Fauzan",          // baris 1 (sans tebal)
    last: "Al Farikhi",               // baris 2 (serif italic, diakhiri titik merah)
    roles: ["Entrepreneur", "Data Scientist", "Product Management"],
    tagline: "I don’t just build technology. I build what the future runs on.",
    edu: "Informatics Student · Semester 3 · Universitas Gunadarma · 2025–Now",   // baris status di hero
    city: "Jakarta Pusat",
    timezone: "Asia/Jakarta",
    tzLabel: "WIB",
    email: "ojann4318@gmail.com",
    instagram: { handle: "@thedailycommitt", url: "https://www.instagram.com/thedailycommitt/" },
    linkedin: "https://www.linkedin.com/in/fauzanalfarikhi",
    github: "https://github.com/Farikhi562",
    cv: { file: "assets/cv/Muhamad-Fauzan-Al-Farikhi-CV.pdf", label: "Download CV", filename: "Muhamad-Fauzan-Al-Farikhi-CV.pdf" }
  },

  nav: [
    { id: "person",  label: "Person" },
    { id: "craft",   label: "Craft" },
    { id: "projects", label: "Projects" },
    { id: "record",  label: "Record" },
    { id: "stage",   label: "Stage" },
    { id: "recs",    label: "Recs" },
    { id: "writing", label: "Writing" },
    { id: "life",    label: "Life" },
    { id: "connect", label: "Connect" }
  ],

  hero: {
    portraitFrames: 60,               // jumlah frame di assets/turn/00.webp ... 59.webp
    autoRotateDegPerSec: 12,
    fallbackPortrait: "assets/portrait.webp",
    alt: "Model 3D potret Muhamad Fauzan Al Farikhi yang berputar 360 derajat"
  },

  /* Logo: isi `logo: "assets/logos/nama.svg"` kalau sudah punya file logonya.
     Kalau kosong, otomatis tampil sebagai wordmark teks. */
  affiliations: [
    { name: "Universitas Gunadarma", note: "Kampus · Mahasiswa Informatika · Semester 3 · IPK 3.71",             logo: "assets/logos/gunadarma.webp" },
    { name: "NEXA Tech Labs",        note: "Perusahaan · Founder & CEO",             logo: "assets/logos/nexa.webp", url: "https://nexatechlabs.my.id" },
    { name: "NCD",                   note: "Komunitas · NEXA Community Development · Vice Chairman I", logo: "assets/logos/ncd.webp", url: "https://ncd.web.id" },
    { name: "Alpha Indonesia Relawan (AIR)", note: "Relawan · Fundraising & Partnership · 3 bulan", logo: "assets/logos/air.webp", big: true },
    { name: "SMA Taman Madya 1 Jakarta", note: "Sekolah · MIPA · 2021–2024", logo: "assets/logos/tamansiswa.webp" }
  ],

  /* Pengalaman & pendidikan (tampil di section Person). type: Experience | Education | Organization */
  path: [
    { years: "2025–Now",  role: "S1 Informatika · Semester 3 (mahasiswa aktif)",   place: "Universitas Gunadarma", type: "Education" },
    { years: "2026 · 3 bulan", role: "Relawan · Divisi Fundraising & Partnership", place: "Alpha Indonesia Relawan (AIR)", type: "Volunteer" },
    { years: "2021–2024", role: "SMA, jurusan MIPA",                               place: "SMA Taman Madya 1 Jakarta", type: "Education" },
    { years: "2021–2022", role: "Anggota OSIS · Divisi Acara",                     place: "SMA Taman Madya 1 Jakarta", type: "Organization" }
  ],

  /* Sertifikat & piagam. `url` = link verifikasi (kalau ada). Tanpa url, kartu membuka lightbox dari `full`.
     Sertifikat Gunadarma/olimpiade hanya punya QR — kirim URL hasil scan kalau mau diberi tombol Verify. */
  certificates: [
    { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", date: "23 Oktober 2026", valid: "23 Oktober 2029", group: "Kursus",
      image: "assets/certs/python-basic.webp", url: "https://www.dicoding.com/certificates/1OP8746M8ZQK" },
    { title: "Belajar Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding Indonesia", date: "14 Oktober 2026", valid: "14 Oktober 2029", group: "Kursus",
      image: "assets/certs/aws-cloud-genai.webp", url: "https://www.dicoding.com/certificates/98XW8LYR0PM3" },
    { title: "Spec-Driven Development dengan Kiro", issuer: "Dicoding Indonesia", date: "14 Oktober 2026", valid: "14 Oktober 2029", group: "Kursus",
      image: "assets/certs/kiro-spec-driven.webp", url: "https://www.dicoding.com/certificates/1RXYDL3Y3XVM" },
    { title: "Peserta GIEF 2026 — Pameran Produk Inovasi Mahasiswa", issuer: "Teknik Industri Universitas Gunadarma", date: "22–23 Juli 2026", group: "Kompetisi",
      image: "assets/certs/gief-2026.webp", full: ["assets/certs/gief-2026.webp"] },
    { title: "Pengantar Ilmu Data (Fundamental of Data Science)", issuer: "Universitas Gunadarma", date: "25 Mei – 6 Juni 2026", group: "Kursus",
      image: "assets/certs/gunadarma-data-science.webp", full: ["assets/certs/gunadarma-data-science-full.webp", "assets/certs/gunadarma-data-science-back.webp"] },
    { title: "Finalis ICBC — International Canvas Business Competition", issuer: "Universitas Dian Nuswantoro", date: "25 April 2026", group: "Kompetisi",
      image: "assets/certs/icbc-2026.webp", full: ["assets/certs/icbc-2026.webp"] },
    { title: "Peserta Business Plan Competition “Zero to Cash”", issuer: "HIMAMEN Universitas Gunadarma", date: "2026", group: "Kompetisi",
      image: "assets/certs/himamen-bpc-2026.webp", full: ["assets/certs/himamen-bpc-2026.webp"] },
    { title: "Dasar Pemrograman Python (Fundamental of Python)", issuer: "Universitas Gunadarma", date: "23–28 Februari 2026", group: "Kursus",
      image: "assets/certs/gunadarma-python.webp", full: ["assets/certs/gunadarma-python-full.webp", "assets/certs/gunadarma-python-back.webp"] },
    { title: "Medali Perak Olimpiade Bahasa & Sastra Indonesia", issuer: "Liga Olimpiade", date: "23 November 2022", group: "Olimpiade",
      image: "assets/certs/bahasa-silver-2022.webp", full: ["assets/certs/bahasa-silver-2022.webp"] },
    { title: "Medali Perak Fisika — Telkom University Competition", issuer: "POSI · Telkom University", date: "1 Oktober 2022", group: "Olimpiade",
      image: "assets/certs/telkom-physics-2022.webp", full: ["assets/certs/telkom-physics-2022.webp"] },
    { title: "Medali Perunggu Olimpiade Fisika Nasional", issuer: "Liga Olimpiade", date: "8 Maret 2022", group: "Olimpiade",
      image: "assets/certs/olfn-bronze-2022.webp", full: ["assets/certs/olfn-bronze-2022.webp"] },
    { title: "Medali Emas Olimpiade Fisika", issuer: "Liga Olimpiade", date: "4 November 2021", group: "Olimpiade",
      image: "assets/certs/fisika-gold-2021.webp", full: ["assets/certs/fisika-gold-2021.webp"] }
  ],

  /* Judul section: a = kapital Archivo, b = serif italic */
  sections: {
    person:  { no: "01", label: "The Person",     a: "ONE NAME.",     b: "many ways to build." },
    craft:   { no: "02", label: "The Craft",      a: "HOW I",         b: "build." },
    projects:{ no: "03", label: "The Work",       a: "THINGS I'VE",  b: "shipped." },
    record:  { no: "04", label: "The Record",     a: "BUILT THROUGH", b: "experience." },
    stage:   { no: "05", label: "The Stage",      a: "IDEAS WORTH",   b: "sharing." },
    recs:    { no: "06", label: "Recommendations", a: "IN THEIR",     b: "own words." },
    writing: { no: "07", label: "Writing & Press",    a: "THOUGHTS,",     b: "in print." },
    life:    { no: "08", label: "The Off-Hours",  a: "LIFE,",         b: "unfiltered." },
    connect: { no: "09", label: "The Next Step",  a: "LET’S",         b: "connect." }
  },

  /* Ringkasan isi tiap section (hanya dipakai di kerangka tahap 1) */
  skeleton: {
    person:  "Bio 2 paragraf · potret · 3 angka besar",
    craft:   "Skill Atlas — kubus 3D, 5 bidang, panel detail",
    projects:"Kartu project · status · detail",
    record:  "Total prestasi · cari · filter · daftar 2021–2026",
    stage:   "Pengalaman bicara · pitching · presentasi",
    recs:    "Kartu rekomendasi",
    writing: "Daftar publikasi · filter · link",
    life:    "Galeri foto · thumbnail · ← →",
    connect: "Email · LinkedIn · GitHub · Instagram"
  },


  /* ====== PROJECTS ======
     Field bernilai null otomatis tampil "To be documented" di modal detail (tidak ada data yang dikarang).
     status: "Live" | "Ongoing". motif: ilustrasi vektor sederhana (BUKAN screenshot). tone: ink | cream | red.
     Ganti `thumb: "assets/projects/xxx.webp"` kalau sudah punya screenshot asli. */
  projects: [
    { id: "smarthomeai", name: "SmartHomeAI", category: "Web platform", status: "Live", motif: "home", tone: "ink", thumb: "assets/projects/smarthomeai.webp", thumbRatio: "833/309", thumbAlt: "Sampul project SmartHomeAI — Smarter Living, Simplified by AI",
      desc: "A smart home web platform designed to help users keep track of household items and make it easier to remember or locate where their belongings are stored.",
      url: "https://smarthome.frikhii.my.id", cta: "Visit Live Project",
      problem: "Household items are easy to forget or misplace, and it is hard to remember where they are stored.",
      solution: "A smart home web platform that helps users keep track of household items and locate where their belongings are stored.",
      role: null, stack: null, statusNote: "Live — deployed at the link below.", repo: null },
    { id: "forecasting", name: "Forecasting", category: "Data project", status: "Live", motif: "chart", tone: "cream", thumb: "assets/projects/forecasting.webp", thumbRatio: "829/309", thumbAlt: "Sampul project Forecasting — Turning Data into Foresight",
      desc: "A forecasting project focused on exploring data-driven methods to analyze historical data and generate predictions.",
      url: "https://forecasting.frikhii.my.id", cta: "Visit Project",
      problem: null,
      solution: "A forecasting project that explores data-driven methods to analyze historical data and generate predictions.",
      role: null, stack: null, statusNote: "Live — deployed at the link below.", repo: null,
      supports: ["AI Engineering & Data Science"] },
    { id: "petroleum", name: "Petroleum", category: "Engineering web", status: "Live", motif: "derrick", tone: "ink", thumb: "assets/projects/petroleum.webp", thumbRatio: "833/307", thumbAlt: "Sampul project Petroleum — Engineering Energy Systems",
      desc: "A petroleum engineering project focused on presenting technical concepts and information through a dedicated web experience.",
      url: "https://petroleum.frikhii.my.id", cta: "Visit Project",
      problem: null,
      solution: "A dedicated web experience that presents petroleum engineering concepts and information.",
      role: null, stack: null, statusNote: "Live — deployed at the link below.", repo: null },
    { id: "nexa-campus", name: "NEXA Campus", category: "SaaS · NEXA Tech Labs", status: "Live", motif: "campus", tone: "cream", thumb: "assets/projects/nexa-campus.webp", thumbRatio: "829/307", thumbAlt: "Sampul project NEXA Campus — A Connected Campus Ecosystem",
      desc: "A campus-focused SaaS platform developed under NEXA Tech Labs to support student needs through a digital ecosystem.",
      url: "https://campus.nexatechlabs.my.id", cta: "Visit Live Project",
      problem: null,
      solution: "A campus-focused SaaS platform that supports student needs through a digital ecosystem.",
      role: null, stack: null, statusNote: "Live — deployed at the link below.", repo: null,
      supports: ["Software Development", "System Architecture", "Product Management"] },
    { id: "nexa-sphere", name: "NEXA-Sphere", category: "AI-SaaS · NEXA Tech Labs", status: "Prototype", motif: "chain", tone: "ink", thumb: null,
      desc: "A B2B AI-SaaS platform concept for optimizing inventory and supply-chain operations of multi-outlet F&B businesses, built around demand forecasting, procurement recommendations, and a centralized dashboard.",
      url: null, cta: "View Project Details",
      problem: "Multi-outlet F&B SMEs (2–10 branches) are too small for enterprise ERP yet too complex for manual, instinct-based purchasing — leading to overstock, stockout, and food waste.",
      solution: "A B2B AI-SaaS platform that turns historical point-of-sale data into purchasing recommendations: demand forecasting, procurement recommendations with owner approval, and a centralized multi-outlet dashboard.",
      role: "Team Lead & AI/ML Engineer",
      contribution: "Technology architecture direction, predictive-model (demand forecasting) development, and algorithm risk management; presented the proposal at ICBC 2026 as team lead.",
      stack: ["Time-series forecasting (ARIMA, Prophet) — proposed", "Gradient boosting (XGBoost / LightGBM) — proposed", "Cloud (AWS / GCP) — planned"],
      statusNote: "Business-proposal concept with interface prototypes — finalist (Top 4, Juara Harapan 1) at ICBC 2026. Not released and not yet in wide use. Screenshots in the proposal use simulated internal data.",
      repo: null,
      supports: ["AI Engineering & Data Science", "Product Management", "Business & Entrepreneurship"],
      extra: [
        { title: "Core pillars (proposed)", label: "Proposal", items: ["AI demand forecasting (daily / weekly sales per menu item)", "Procurement recommendations with owner approve-or-modify control", "Centralized dashboard across outlets (mobile and desktop)"] },
        { title: "Prototype shown in the proposal (simulated data)", label: "Prototype", items: ["POS Terminal with an AI Engine Analytics view", "Floor Plan Manager and Admin dashboard (Dynamic Pricing toggle, Live Metrics)", "Prototype navigation tabs: Kitchen Display, Table Map, Data Science HQ, Inventory, Live Chat, Public Web", "Dimsum Manager with design partner Dimsum Mentai Kemayoran — role-based login (Owner / Admin / Kasir) live; about 80% complete at the time of the proposal"] },
        { title: "Planned, not yet built", label: "Planned", items: ["Integration with local POS providers (Moka, Pawoon, Majoo, ESB)", "Phased rollout: API sync → shadow-mode validation → active recommendations", "Supplier B2B integration (year-2 roadmap)", "Regional expansion in Southeast Asia"] },
        { title: "Not yet validated", label: "Unvalidated", items: ["Forecast accuracy (calibration planned over a client’s first 4–6 weeks)", "Measured food-waste reduction", "Market-size, pricing, and revenue projections (indicative only)"] }
      ] },
    { id: "breathsafe", name: "BreathSafe", category: "IoT · PWA · GDGoC STACK ITB 2026", status: "Ongoing", motif: "chart", tone: "red", thumb: "assets/projects/breathsafe.webp", thumbRatio: "1380/307", thumbAlt: "Sampul project BreathSafe — Clip-on PM2.5 Monitor for Ojol Drivers — In Development; render desain modul sensor yang terpasang di masker pengemudi ojol", featured: true,
      program: "GDGoC STACK ITB 2026",
      desc: "A clip-on personal PM2.5 monitor for online motorcycle-taxi (ojol) drivers: a sensor module on the rider’s mask with glanceable LED feedback, a waist-worn battery, and a Bluetooth-connected progressive web app.",
      url: null, cta: "View Project Details",
      problem: "Around seven million online motorcycle-taxi drivers work in Indonesia, but fixed air-quality stations cannot measure the air alongside each rider. Risk estimates for these drivers rely on station data.",
      solution: "BreathSafe is a sensor module clipped to the rider’s mask and cabled to a waist-worn battery. A PMS5003 sensor and a 5 V blower sample air near the face, and three LEDs show project-defined PM2.5 bands without the rider looking at a phone. The app then shows when and where exposure peaked, with an optional anonymous summary riders can share with their group.",
      role: "Team Member",
      contribution: null,
      stack: ["Progressive Web App (Chrome, Web Bluetooth) on Android", "PMS5003 PM2.5 sensor", "nRF52840 board (BLE)", "AHT20 humidity sensor", "5 V blower for air sampling", "Waist-worn 5,000 mAh battery"],
      statusNote: "Ongoing — a concept in development for GDGoC STACK ITB 2026 (Case 2: Stronger Communities and Everyday Services), built with a four-person team. Hardware freeze is planned for 27 November 2026 and the Final Day, if selected, is 16 December 2026. Not yet deployed or field-validated; the images are design renders, not a working unit.",
      repo: null,
      visual: { src: "assets/projects/breathsafe-design.webp", alt: "Poster desain BreathSafe: tiga varian masker, detail modul sensor, baterai di pinggang, dan exploded view komponen utama" },
      extra: [
        { title: "Core user flow (design)", label: "Design", items: [
            "Three steady LEDs show project-defined PM2.5 bands (green, yellow, red)",
            "At a safe stop, red prompts a mask check",
            "The app shows when and where exposure peaked",
            "Optionally, riders share an anonymous summary (time per band only) with their group"] },
        { title: "Planned MVP", label: "Planned", items: [
            "Chrome progressive web app on Android using Web Bluetooth",
            "Humidity logged for bias correction",
            "End-of-shift private summary in Indonesian: time per band and route hotspots",
            "Location data stays on the rider’s phone",
            "Group sharing is planned (synthetic data in the demo)",
            "Designed for everyday masks: duckbill, 3-ply medical, and KF94"] },
        { title: "Evidence so far", label: "Exploratory", items: [
            "Six exploratory interviews in October 2026: five drivers and one student-worker",
            "Four reported dust-related eye irritation, four reported riding 5–10 hours a day, and one had a cough that made them stop working",
            "These accounts do not show prevalence or causation"] },
        { title: "Planned testing", label: "Planned", items: [
            "Weight and fit testing across all mask types",
            "Breakaway connector, day-and-night LED tests, and on-road helmet validation",
            "Unit-agreement tests and, if reference access is confirmed, R² > 0.90",
            "The 3–5 hour runtime is unverified and will need duty-cycling"] },
        { title: "Not yet validated", label: "Unvalidated", items: [
            "Sensor accuracy against a reference",
            "Battery runtime",
            "Whether riders notice high-exposure moments and follow through on mask checks (to be tested)"] }
      ] }
  ],

  bio: [
    "I’m an Informatics student at Universitas Gunadarma, studying since 2025 and now in semester 3, and a technology enthusiast focused on AI Engineering, Software Development, and Product Management. I enjoy turning complex problems into practical solutions by combining engineering, strategic thinking, and a deep understanding of user needs. For me, technology is not just about writing code, it’s about creating something meaningful, scalable, and impactful.",
    "My ambition is to build products that solve real-world problems, create value, and push boundaries. From experimenting with AI to developing software products and exploring business opportunities, I believe every project is a step toward something bigger. I’m not here just to follow the future, I’m here to help build it."
  ],

  stats: [
    { value: "3.71", label: "IPK" },
    { value: "CEO",  label: "Founder & CEO, NEXA Tech Labs" },
    { value: "1",    label: "Year experience as Python Developer" }
  ],

  skills: [
    { id: "ai", proof: [
        "Sertifikat Gunadarma: Pengantar Ilmu Data (Fundamental of Data Science) · 2026",
        "Sertifikat Gunadarma: Dasar Pemrograman Python · 2026, dan Dicoding: Memulai Pemrograman dengan Python",
        "NEXA Assistant — asisten belajar berbasis NLP dan RAG di NEXA Campus (flashcard, kuis, latihan soal, ringkasan)",
        "NEXA-Sphere — konsep AI-SaaS (demand forecasting, rekomendasi pengadaan) dengan prototipe antarmuka; Team Lead & AI/ML Engineer · Top 4 ICBC 2026",
        "Project Forecasting — eksplorasi analisis data historis dan prediksi"],
      title: "AI Engineering & Data Science",
      line: "Designing and building AI-driven solutions by combining machine learning, data analysis, predictive modeling, and software engineering to solve real-world problems.",
      keywords: ["Artificial Intelligence", "Machine Learning", "Data Science", "Predictive Analytics", "Time-Series Forecasting", "AI Integration"] },
    { id: "software", proof: [
        "1 tahun pengalaman sebagai Python Developer",
        "Peserta Unlimited Software Building (USB), Divisi Desain UI/UX · 2026",
        "Sertifikat Gunadarma: Dasar Pemrograman Python (Flask, MySQL, CRUD) · 2026",
        "Sertifikat Dicoding: Memulai Pemrograman dengan Python",
        "Sertifikat Dicoding: Spec-Driven Development dengan Kiro",
        "Sertifikat Dicoding: Belajar Dasar Cloud dan Gen AI di AWS"],
      title: "Software Development",
      line: "Building reliable, scalable, and user-focused software applications to solve real-world problems.",
      keywords: ["Web Development", "Backend", "Frontend", "API Integration", "Database", "System Architecture"] },
    { id: "product", proof: [
        "Founder & CEO NEXA Tech Labs",
        "Peserta Unlimited Software Building (USB), Divisi Desain UI/UX · 2026",
        "Delegasi Utama GEMASTIK 2026, Divisi Pengembangan Bisnis TIK"],
      title: "Product Management",
      line: "Turning user problems into valuable products through strategic planning, validation, and execution.",
      keywords: ["Product Strategy", "User Research", "MVP Development", "Roadmapping", "Product Validation", "User Experience"] },
    { id: "business", proof: [
        "Top 4 (Juara Harapan 1) International Canvas Business Competition (ICBC) · 2026",
        "Delegasi Utama Universitas Gunadarma, GEMASTIK 2026 (Pengembangan Bisnis TIK, nasional)",
        "Peserta Business Plan Competition HIMAMEN · 2026",
        "Relawan Fundraising & Partnership, Alpha Indonesia Relawan (AIR) · 3 bulan",
        "Founder & CEO NEXA Tech Labs"],
      title: "Business & Entrepreneurship",
      line: "Identifying business opportunities and developing sustainable models that create measurable value.",
      keywords: ["Business Strategy", "Market Research", "Business Model", "Financial Analysis", "Market Validation", "Growth Strategy"] },
    { id: "leadership", proof: [
        "Founder & CEO NEXA Tech Labs",
        "Vice Chairman I NCD (NEXA Community Development)",
        "Presentasi internal online tentang profil, tujuan, dan kegiatan NCD"],
      title: "Leadership & Project Management",
      line: "Leading collaborative teams, coordinating execution, and driving projects toward shared goals.",
      keywords: ["Team Leadership", "Project Planning", "Team Coordination", "Problem Solving", "Communication", "Strategic Thinking"] }
  ],

  achievements: [
    { year: 2026, name: "8th Gunadarma Industrial Engineering Fair (GIEF) 2026 — Pameran Produk Inovasi Mahasiswa (sertifikat atas nama Tim Mahasiswa Informatika)", rank: "Peserta", level: "Universitas" },
    { year: 2026, name: "Delegasi Utama Universitas Gunadarma — GEMASTIK 2026, Divisi Pengembangan Bisnis TIK", rank: "Delegasi Utama", level: "Nasional", url: "https://kemahasiswaan.gunadarma.ac.id/pengumuman-penetapan-delegasi-universitas-gunadarma-pada-gemastik-tahun-2026-hasil-seleksi-internal-gelombang-iii", src: "Kemahasiswaan Universitas Gunadarma", page: "/achievements/gemastik-2026/" },
    { year: 2026, name: "International Canvas Business Competition (ICBC), Universitas Dian Nuswantoro", rank: "Top 4 (Juara Harapan 1)", level: "Internasional", url: "https://kemahasiswaan.gunadarma.ac.id/tim-mahasiswa-universitas-gunadarma-raih-juara-harapan-i-pada-international-canvas-business-competition-2026", src: "Kemahasiswaan Universitas Gunadarma", page: "/achievements/icbc-2026/" },
    { year: 2026, name: "Business Plan Competition HIMAMEN Universitas Gunadarma", rank: "Peserta", level: "Universitas" },
    { year: 2026, name: "Unlimited Software Building (USB) — Divisi Desain UI/UX", rank: "Peserta", level: "Universitas" },
    { year: 2022, name: "Olimpiade Bahasa dan Sastra Indonesia — Liga Olimpiade", rank: "Medali Perak", level: "Olimpiade" },
    { year: 2022, name: "Olimpiade Fisika — Telkom University Competition", rank: "Medali Perak", level: "Olimpiade" },
    { year: 2022, name: "Olimpiade Fisika Nasional — Liga Olimpiade", rank: "Medali Perunggu", level: "Nasional" },
    { year: 2021, name: "Olimpiade Fisika — Liga Olimpiade", rank: "Medali Emas", level: "Olimpiade" }
  ],

  /* ====== STAGE: pengalaman bicara, pitching, presentasi ======
     Jumlah di section = jumlah entri di `items` (tiap acara dihitung sekali). Foto = aset asli per acara.
     Tidak ada klaim audiens / juara / penghargaan di luar yang tercatat. */
  stage: {
    categories: ["Pitching & Competition", "Event Participation", "Community Leadership"],
    intro: "Pitching, presenting, and showing up — documented with the original photos from each event.",
    items: [
      { id: "icbc", category: "Pitching & Competition",
        title: "International Canvas Business Competition (ICBC) 2026",
        role: "Team Lead / Presenter — NEXA Tech Labs",
        meta: "ICBC 2026 · Universitas Dian Nuswantoro · April 25, 2026",
        desc: "Presented NEXA-Sphere, an AI-SaaS concept for optimizing inventory and supply-chain operations for multi-outlet F&B businesses, as part of the International Canvas Business Competition 2026.",
        status: "Finalist · Top 4 (Juara Harapan 1)",
        source: { label: "Official announcement — Kemahasiswaan Universitas Gunadarma", url: "https://kemahasiswaan.gunadarma.ac.id/tim-mahasiswa-universitas-gunadarma-raih-juara-harapan-i-pada-international-canvas-business-competition-2026" },
        skills: ["AI Engineering & Data Science", "Product Management", "Business & Entrepreneurship"],
        photo: "assets/icbc-pitch.webp", alt: "Tim berjas almamater biru presentasi di depan juri ICBC 2026 dengan penghitung waktu di layar", fit: "center" },
      { id: "gief", category: "Event Participation",
        title: "Gunadarma Industrial Engineering Fair (GIEF) 2026",
        role: "Participant",
        meta: "GIEF 2026 · Universitas Gunadarma · July 22–23, 2026",
        desc: "Participated in the Gunadarma Industrial Engineering Fair 2026, with event documentation featuring the presentation and certificate associated with the event.",
        status: null,
        skills: ["Software Development", "Product Management"],
        photo: "assets/certificate.webp", alt: "Foto bersama sambil memegang sertifikat GIEF 2026", fit: "center" },
      { id: "ncd", category: "Community Leadership",
        title: "NCD Internal Presentation",
        role: "Vice Chairman I — NCD",
        meta: "NEXA Community Development · Online · Internal",
        desc: "Online internal presentation explaining NCD’s profile, goals, and activities to its members.",
        status: null,
        skills: ["Leadership & Project Management"],
        photo: "assets/ncd-online.webp", alt: "Tangkapan layar presentasi online NCD: slide “The People Behind NCD”", fit: "center" }
    ]
  },

  /* ====== RECOMMENDATIONS: kutipan HARUS persis seperti dari pemberinya — jangan diedit.
     `photo`: null = kartu tanpa foto. Identitas kedua foto sudah dikonfirmasi pemilik portfolio. ====== */
  recommendations: [
    { kicker: "Endorsement", name: "Pak Risdiandri Iskandar, S.Kom., M.M.",
      role: "Sekretariat Jurusan Informatika", org: "Universitas Gunadarma",
      quote: "Fauzan orangnya rajin, amanah, bisa dipercaya, dia punya semangat dan ambisi yang bagus, sehingga sangat tepat dijadikan sebagai leader",
      tags: ["Character", "Responsibility", "Trust", "Leadership"], photo: "assets/testimonials/photo-a.webp", photoAlt: "Foto Pak Risdiandri Iskandar, S.Kom., M.M." },
    { kicker: "Appreciation", name: "Dr. Lintang Yuniar Banowosari, S.Kom., M.Sc.",
      role: "Kaprodi Informatika", org: "Universitas Gunadarma",
      quote: "Terimakasih telah berusaha dan berjuang tim tim NEXA, jangan pernah patah semangat",
      tags: ["Effort", "Perseverance", "Team NEXA"], photo: "assets/testimonials/photo-b.webp", photoAlt: "Foto Dr. Lintang Yuniar Banowosari, S.Kom., M.Sc." }
  ],

  publications: [
    { title: "NEXA-Sphere: an AI-SaaS concept for multi-outlet F&B inventory, and the road to ICBC 2026 Top 4", publisher: "frikhii.my.id", year: 2026, url: "/writing/nexa-sphere-icbc-2026/", internal: true },
    { title: "BreathSafe: notes on a clip-on PM2.5 monitor for ojol drivers (GDGoC STACK ITB 2026)", publisher: "frikhii.my.id", year: 2026, url: "/writing/breathsafe-pm25-monitor-notes/", internal: true },
    { title: "My 2026 learning path: from Python fundamentals to data science and cloud AI", publisher: "frikhii.my.id", year: 2026, url: "/writing/python-to-ai-learning-path-2026/", internal: true },
    { title: "Tim Mahasiswa Universitas Gunadarma Raih Juara Harapan I pada International Canvas Business Competition 2026", publisher: "Kemahasiswaan Universitas Gunadarma", year: 2026,
      url: "https://kemahasiswaan.gunadarma.ac.id/tim-mahasiswa-universitas-gunadarma-raih-juara-harapan-i-pada-international-canvas-business-competition-2026" },
    { title: "Pengumuman Penetapan Delegasi Universitas Gunadarma pada GEMASTIK Tahun 2026 (Hasil Seleksi Internal Gelombang III)", publisher: "Kemahasiswaan Universitas Gunadarma", year: 2026,
      url: "https://kemahasiswaan.gunadarma.ac.id/pengumuman-penetapan-delegasi-universitas-gunadarma-pada-gemastik-tahun-2026-hasil-seleksi-internal-gelombang-iii" },
    { title: "NEXA Story", publisher: "NEXA", year: 2026, url: "https://s.id/nexa-story" }
  ],

  /* Galeri: `title` & `meta` tampil di bawah foto; klik "Read the story" membuka `desc`.
     Item video: isi `video`, `src` dipakai sebagai poster. */
  gallery: [
    { src: "assets/stage.webp", alt: "Tim berjas almamater biru berdiri di depan layar presentasi pada acara final ICBC 2026", caption: "ICBC 2026 — Finalist Presentation",
      title: "ICBC 2026 — Finalist Presentation", meta: "ICBC 2026 · Universitas Dian Nuswantoro",
      desc: "Team photo in alma mater jackets at the final presentation of the International Canvas Business Competition 2026, held on April 25, 2026 under the theme “Digital Business Ecosystem for Global Market Expansion.” Our team reached the finals." },
    { src: "assets/certificate.webp", alt: "Foto bersama sambil memegang sertifikat GIEF 2026", caption: "GIEF 2026 — Certificate",
      title: "GIEF 2026 — Certificate", meta: "GIEF 2026 · Universitas Gunadarma · July 22–23, 2026",
      desc: "Holding the certificate from the 8th Gunadarma Industrial Engineering Fair 2026, a student exhibition of innovative products built on digital technology and standardization." },
    { src: "assets/classroom.webp", alt: "Foto bersama peserta kursus Data Science di ruang kelas", caption: "Data Science Course — Universitas Gunadarma",
      title: "Data Science Course — Universitas Gunadarma", meta: "Fundamental of Data Science · May 25 – June 6, 2026",
      desc: "Group photo with fellow participants of the Fundamental of Data Science course at Universitas Gunadarma. The material covered matrices, working with data in Python, NumPy and Pandas, and the data science methodology." },
    { src: "assets/cafe.webp", alt: "Foto bersama anggota NCD di sebuah kafe", caption: "NCD Community Gathering",
      title: "NCD Community Gathering", meta: "NEXA Community Development",
      desc: "Group photo with NCD (NEXA Community Development) members at a café." },
    { src: "assets/icbc-pitch.webp", alt: "Tim berjas almamater biru presentasi di depan juri dengan penghitung waktu di layar", caption: "Live on the Floor",
      title: "Live on the Floor", meta: "ICBC 2026",
      desc: "Pitching in front of the judges at ICBC 2026, with the countdown timer running on the screen behind us." },
    { src: "assets/video/icbc-reel-poster.webp", video: "assets/video/icbc-reel.mp4", alt: "Cuplikan video tim saat pitching di ICBC 2026", caption: "ICBC, in Motion",
      title: "ICBC, in Motion", meta: "ICBC 2026 · 17-second reel",
      desc: "A short reel from ICBC 2026 — the team on stage during the pitching session." }
  ]
};
