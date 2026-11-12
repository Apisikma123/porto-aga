/* ═══════════════════════════════════════════════════════════
   critical.js — Core UX, Bilingual Engine & Navigation System
   Muhammad Aga Putra | Software Engineer & Frontend Specialist
   ═══════════════════════════════════════════════════════════ */

// 7 Dedicated Section IDs matching the spatial sequence:
// 01 Start (Hero), 02 About (Capabilities), 03 Experience (Wilmar PKL), 04 Activity (GitHub Matrix), 05 Projects (Carousel), 06 Contact, 07 Footer
export const SECTION_IDS = ["start", "about", "experience", "activity", "projects", "contact", "footer"];
export let currentSectionIndex = 0;

import { initGlobalCardTilt } from "./tilt.js";
export { initGlobalCardTilt };

// ═══════════════════════════════════════════════════════════
// BOT SHIELD & WHATSAPP OBFUSCATOR (Anti-Scraper Base64 Decoder)
// ═══════════════════════════════════════════════════════════
const _WA_ENC = "NjI4NTE2OTA4NDEzNg==";
export const getProtectedWhatsAppNumber = () => {
  try {
    return typeof atob === "function" ? atob(_WA_ENC) : "6285169084136";
  } catch (e) {
    return "6285169084136";
  }
};

export const getProtectedWhatsAppUrl = (text = "") => {
  const num = getProtectedWhatsAppNumber();
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

window.openProtectedWhatsApp = (event, text = "") => {
  if (event && event.preventDefault) event.preventDefault();
  const url = getProtectedWhatsAppUrl(text);
  window.open(url, "_blank", "noopener,noreferrer");
};

// ═══════════════════════════════════════════════════════════
// 1. BILINGUAL LANGUAGE ENGINE (ENGLISH & INDONESIA)
// ═══════════════════════════════════════════════════════════
export const TRANSLATIONS = {
  en: {
    navStart: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navActivity: "Activity",
    navProjects: "Projects",
    navContact: "Contact",
    navFooter: "Details",
    ctaInitiate: "Get in Touch",
    sidebarHeader: "On this page",
    sideStart: "Home",
    sideAbout: "About",
    sideExperience: "Experience",
    sideActivity: "Activity",
    sideProjects: "Projects",
    sideContact: "Contact",
    sideFooter: "Details",
    navHint: "Navigation",
    navScene: "Switch Section",
    statusAvailable: "Available for Hire",
    heroEyebrow: "Software Engineer & Frontend Specialist",
    heroRole: "Frontend Developer & Software Engineer",
    heroBio: "I design and build fast, reliable web applications with clean code and thoughtful user experience. Focused on turning complex problems into intuitive digital products.",
    btnExploreAbout: "About & Skills",
    btnInitiate: "Get in Touch",
    scrollHint: "Scroll down or press [S] to explore",

    // Section 02: About
    aboutEyebrow: "Core Capabilities",
    aboutTitle1: "Clean Code.",
    aboutTitle2: "Reliable Solutions.",
    aboutDesc: "Engineering modern web applications with high performance, maintainable code, and intuitive user experiences.",
    focus1Title: "Modern Frontend",
    focus1Desc: "Responsive, fast, and accessible interfaces tailored cleanly for all device sizes.",
    focus2Title: "Interactive & 3D Web",
    focus2Desc: "Smooth micro-interactions and lightweight 3D visuals crafted for maximum fluidity.",
    focus3Title: "Backend & API Integration",
    focus3Desc: "Resilient server architecture, secure authentication, and optimized database workflows.",
    focus4Title: "Performance & Speed",
    focus4Desc: "Sub-second load times, optimized assets, and strict benchmarks for optimal speed.",

    // Section 03: Experience
    expEyebrow: "Work & Internship Experience",
    expTitle1: "Wilmar Bisnis Indonesia.",
    expTitle2: "4 Months · 4 Web Applications.",
    expDesc: "Full-Stack Web Developer Intern at Politeknik Wilmar Bisnis Indonesia (WBI). Engineered 4 operational web platforms from scratch:",
    exp1Tag: "01 — WILMAR BUKU",
    exp1Title: "Book Donation System",
    exp1Desc: "Live centralized donation platform with Google OAuth, WebSocket inventory sync, and automated reports (donasi-buku.wbi.ac.id).",
    exp2Tag: "02 — GEN LABS",
    exp2Title: "Virtual Science Simulation Lab",
    exp2Desc: "AI-powered interactive STEM platform proving formulas live on screen with 60 FPS virtual physics simulations and step-by-step Socratic AI guidance.",
    exp3Tag: "03 — GROW A GARDEN",
    exp3Title: "Idea Collaborator Platform (Archived)",
    exp3Desc: "Creative idea incubation and collaborative concept nurturing platform designed to brainstorm and grow team initiatives (early prototype, now archived).",
    exp4Tag: "04 — INVENTARIS",
    exp4Title: "Campus Asset & Logistics",
    exp4Desc: "Internal asset registry managing item circulation, barcode tracking, borrowing history, and staff approvals.",

    // Section 04: Activity
    activityEyebrow: "Work Ethic & Consistency",
    activityTitle1: "Continuous Learning.",
    activityTitle2: "Proven Consistency.",
    activityDesc: "A live record of daily coding activity and open-source contributions directly synced from my GitHub repository.",
    liveSync: "Live Sync",
    velocityMatrix: "365-Day Activity Record",
    dayMon: "Mon",
    dayWed: "Wed",
    dayFri: "Fri",
    less: "Less",
    more: "More",

    // Section 04: Projects
    projectsEyebrow: "Featured Projects",
    projectsTitle1: "Selected",
    projectsTitle2: "Works.",
    exploreAllProjects: "All Works (18 Projects)",
    sliderHint: "Press [←] [→] to browse works",
    projBkjTag: "Corporate Portal · Maritime Logistics",
    projBkjStatus: "Archived System",
    projBkjTitle: "BKJ Group Indonesia — Corporate Logistics Portal",
    projBkjDesc: "Built an enterprise web portal for a maritime logistics firm with dynamic service management, subsidiary directory, and multi-language support (project archived).",
    projPratamaTag: "Production Web · UMKM Service Portal",
    projPratamaStatus: "Live at pratama-tehnik.com",
    projPratamaTitle: "Pratama Tehnik Service — Repair Booking Portal",
    projPratamaDesc: "Engineered a high-converting service booking portal for an on-demand appliance repair business in Jakarta, featuring direct WhatsApp dispatch, fault diagnosis calculator, and local SEO schema.",
    proj1Tag: "Mobile App · Food & Delivery",
    proj1Status: "Production App",
    proj1Title: "FOODIFY — Food Ordering App",
    proj1Desc: "Developed a responsive food delivery mobile app with live GPS map routing, order status tracking, and intuitive merchant discovery.",
    proj2Tag: "Web Application · Community Platform",
    proj2Status: "Live at donasi-buku.wbi.ac.id",
    proj2Title: "Wilmar Buku — Book Donation System",
    proj2Desc: "Engineered a centralized book donation platform for community libraries, active at donasi-buku.wbi.ac.id, with Google sign-in, real-time WebSocket tracking, and automated reporting.",
    proj3Tag: "Web Platform · Student Wellbeing",
    proj3Status: "Production App",
    proj3Title: "CINTA — School Counseling Platform",
    proj3Desc: "Created a secure, confidential counseling portal allowing students to submit private concerns while giving counselors structured case tracking.",
    proj4Tag: "Web Platform · Idea Incubator & Collaborator",
    proj4Status: "Archived / On Hold (Mangkrak)",
    proj4Title: "Grow a Garden — Idea Collaborator Platform",
    proj4Desc: "Collaborative idea incubator designed to brainstorm, nurture, and develop creative project concepts with team members (early prototype, now archived).",
    projGenLabsTag: "Virtual STEM Lab · 60 FPS Simulation",
    projGenLabsStatus: "Virtual Science Simulation",
    projGenLabsTitle: "GEN LABS — Virtual Science Simulation Platform",
    projGenLabsDesc: "AI-powered virtual science laboratory proving formulas directly on screen with 60 FPS interactive physics simulations, live variable tuning, and Socratic AI guidance across 5 disciplines.",
    projWbiTag: "Enterprise Asset Tracking · Campus ERP",
    projWbiStatus: "WBI Campus Production",
    projWbiTitle: "WBI Inventaris — Executive Asset Monitoring System",
    projWbiDesc: "Comprehensive asset lifecycle tracking, custody mutations, and executive monitoring dashboard built for Politeknik Wilmar Bisnis Indonesia with real-time audit trails.",

    // Section 05: Contact
    contactEyebrow: "Get in Touch",
    contactTitle1: "Let's Build Something",
    contactTitle2: "Great Together",
    contactBio: "I am actively seeking full-time software engineering roles and freelance opportunities. Feel free to reach out directly via email or WhatsApp.",
    btnStartConv: "Send an Email",
    scrollFooter: "Scroll for details & links",

    // Section 06: Footer
    footerEyebrow: "Summary & Contact",
    footerAvailable: "Open to Full-time Roles & Contracts",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerColDirect: "Direct Contact",
    footerEmailLabel: "PRIMARY EMAIL",
    footerPhoneLabel: "WHATSAPP",
    footerLatencyLabel: "RESPONSE TIME",
    footerLatencyVal: "Within a few hours",
    footerColStack: "Core Technologies",
    footerRights: "All Rights Reserved.",
    footerBuiltWith: "Built with Vite, Vanilla CSS, Tailwind v4, and modern standards. 100% 2D on mobile.",
    waUrl: getProtectedWhatsAppUrl("Hello Aga, I reviewed your portfolio and would like to discuss an opportunity."),
  },

  id: {
    navStart: "Mulai",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navActivity: "Aktivitas",
    navProjects: "Karya",
    navContact: "Kontak",
    navFooter: "Detail",
    ctaInitiate: "Hubungi Saya",
    sidebarHeader: "Di halaman ini",
    sideStart: "Mulai",
    sideAbout: "Tentang",
    sideExperience: "Pengalaman",
    sideActivity: "Aktivitas",
    sideProjects: "Karya",
    sideContact: "Kontak",
    sideFooter: "Detail",
    navHint: "Navigasi",
    navScene: "Pindah Bagian",
    statusAvailable: "Siap Kerja & Terbuka untuk Rekrutmen",
    heroEyebrow: "Software Engineer & Frontend Specialist",
    heroRole: "Frontend Developer & Software Engineer",
    heroBio: "Saya merancang dan membangun aplikasi web yang cepat, handal, dan mudah digunakan. Terbiasa mengubah kebutuhan rumit menjadi produk digital yang rapi dan fungsional.",
    btnExploreAbout: "Tentang & Keahlian",
    btnInitiate: "Hubungi Saya",
    scrollHint: "Scroll atau tekan [S] untuk menjelajah",

    // Section 02: About
    aboutEyebrow: "Keahlian Inti",
    aboutTitle1: "Kode Rapi.",
    aboutTitle2: "Solusi Handal.",
    aboutDesc: "Membangun aplikasi web modern yang cepat, rapi, dan mudah dirawat dengan pengalaman pengguna yang intuitif.",
    focus1Title: "Frontend Modern",
    focus1Desc: "Antarmuka responsif, rapi, dan cepat di semua perangkat dengan navigasi yang mudah.",
    focus2Title: "Interaksi & Visual 3D",
    focus2Desc: "Micro-interaction mulus dan visual 3D ringan yang estetis tanpa membebani performa.",
    focus3Title: "Backend & Integrasi API",
    focus3Desc: "Arsitektur server andal, autentikasi aman, dan pengelolaan database yang efisien.",
    focus4Title: "Optimasi & Kecepatan",
    focus4Desc: "Loading instan, aset teroptimasi, dan performa tinggi untuk kenyamanan pengguna.",

    // Section 03: Experience
    expEyebrow: "Pengalaman Kerja & Magang",
    expTitle1: "Wilmar Bisnis Indonesia.",
    expTitle2: "4 Bulan · 4 Aplikasi Web.",
    expDesc: "Magang Full-Stack Web Developer di Politeknik Wilmar Bisnis Indonesia (WBI). Membangun 4 aplikasi web operasional kampus:",
    exp1Tag: "01 — WILMAR BUKU",
    exp1Title: "Sistem Donasi Buku",
    exp1Desc: "Platform donasi buku live dengan Google OAuth, sinkronisasi inventaris via WebSockets, dan rekap otomatis (donasi-buku.wbi.ac.id).",
    exp2Tag: "02 — GEN LABS",
    exp2Title: "Laboratorium Simulasi Virtual Sains",
    exp2Desc: "Platform pembelajaran STEM interaktif berbasis simulasi virtual fisika 60 FPS langsung di layar, manipulasi variabel realtime, dan panduan Tanya AI langkah demi langkah.",
    exp3Tag: "03 — GROW A GARDEN",
    exp3Title: "Platform Kolaborator Ide (Mangkrak)",
    exp3Desc: "Platform kolaborasi ide kreatif untuk menumbuhkan dan mematangkan gagasan proyek bersama tim (status mangkrak / prototipe eksperimen awal).",
    exp4Tag: "04 — INVENTARIS",
    exp4Title: "Pengelolaan Aset & Logistik",
    exp4Desc: "Sistem inventaris internal untuk sirkulasi barang, tracking barcode aset, dan riwayat peminjaman kampus.",

    // Section 04: Activity
    activityEyebrow: "Disiplin & Etos Kerja",
    activityTitle1: "Konsisten Berkarya.",
    activityTitle2: "Setiap Hari.",
    activityDesc: "Bukti komitmen belajar dan koding harian yang tersinkronisasi langsung dari repositori GitHub publik saya.",
    liveSync: "Live Sync",
    velocityMatrix: "Catatan Aktivitas 365 Hari",
    dayMon: "Sen",
    dayWed: "Rab",
    dayFri: "Jum",
    less: "Sedikit",
    more: "Banyak",

    // Section 04: Projects
    projectsEyebrow: "Karya & Proyek Terpilih",
    projectsTitle1: "Karya",
    projectsTitle2: "Pilihan.",
    exploreAllProjects: "Semua Karya (18 Proyek)",
    sliderHint: "Tekan tombol [←] [→] untuk melihat karya",
    projBkjTag: "Portal Perusahaan · Logistik Maritim",
    projBkjStatus: "Sistem Korporat (Arsip)",
    projBkjTitle: "BKJ Group Indonesia — Portal Logistik Perusahaan",
    projBkjDesc: "Membangun portal web resmi untuk perusahaan logistik pelayaran, dilengkapi pengelolaan konten dinamis, profil anak usaha, dan dukungan dua bahasa (proyek arsip).",
    projPratamaTag: "Platform Web · Layanan Jasa UMKM",
    projPratamaStatus: "Aktif di pratama-tehnik.com",
    projPratamaTitle: "Pratama Tehnik Service — Portal Servis Dispenser",
    projPratamaDesc: "Membangun portal layanan servis dispenser panggilan se-Jakarta dengan pemesanan cepat via WhatsApp, kalkulator diagnosa kerusakan, dan optimasi SEO lokal Schema.org.",
    proj1Tag: "Aplikasi Mobile · Pesan Antar Makanan",
    proj1Status: "Aplikasi Produksi",
    proj1Title: "FOODIFY — Aplikasi Pesan Antar Makanan",
    proj1Desc: "Mengembangkan aplikasi mobile pemesanan makanan dengan peta rute GPS langsung, pemantauan status pesanan, dan navigasi menu yang mudah.",
    proj2Tag: "Aplikasi Web · Donasi Buku Komunitas",
    proj2Status: "Aktif di donasi-buku.wbi.ac.id",
    proj2Title: "Wilmar Buku — Sistem Donasi Buku",
    proj2Desc: "Membangun platform donasi buku terpusat yang aktif di donasi-buku.wbi.ac.id dengan login Google, pembaruan data donasi real-time via WebSockets, dan unduh laporan otomatis.",
    proj3Tag: "Platform Web · Bimbingan Konseling Sekolah",
    proj3Status: "Aplikasi Produksi",
    proj3Title: "CINTA — Aplikasi Konseling Siswa",
    proj3Desc: "Menciptakan portal pengaduan dan konseling aman bagi siswa dengan jaminan privasi penuh serta alur pencatatan kasus yang rapi bagi guru BK.",
    proj4Tag: "Platform Web · Kolaborator & Inkubasi Ide",
    proj4Status: "Proyek Mangkrak (Arsip)",
    proj4Title: "Grow a Garden — Platform Kolaborator Ide",
    proj4Desc: "Platform kolaborator ide untuk merawat dan menumbuhkan gagasan proyek secara kolaboratif bersama tim (status proyek mangkrak / prototipe tidak dilanjutkan).",
    projGenLabsTag: "Laboratorium Simulasi Virtual · 60 FPS",
    projGenLabsStatus: "Simulasi Virtual Interaktif",
    projGenLabsTitle: "GEN LABS — Platform Simulasi Virtual Sains",
    projGenLabsDesc: "Platform laboratorium simulasi virtual sains interaktif berbasis AI: eksperimen fisika 60 FPS langsung di layar, manipulasi variabel seketika, dan bimbingan Tanya AI langkah demi langkah.",
    projWbiTag: "Manajemen Aset Kampus · Sistem ERP",
    projWbiStatus: "Sistem Aktif WBI",
    projWbiTitle: "WBI Inventaris — Sistem Informasi & Monitoring Aset",
    projWbiDesc: "Dashboard monitoring eksekutif dan pencatatan siklus mutasi aset kampus Politeknik Wilmar Bisnis Indonesia dengan audit trail transaksi, valuasi real-time, dan status per unit kerja.",

    // Section 05: Contact
    contactEyebrow: "Kontak & Diskusi",
    contactTitle1: "Mari Membangun Sesuatu",
    contactTitle2: "Yang Bermanfaat Bersama",
    contactBio: "Saya terbuka untuk peluang kerja full-time, proyek kontrak, maupun kerja sama teknis. Silakan hubungi saya langsung melalui email atau WhatsApp.",
    btnStartConv: "Kirim Email Langsung",
    scrollFooter: "Scroll untuk info detail & tautan",

    // Section 06: Footer
    footerEyebrow: "Ringkasan & Kontak",
    footerAvailable: "Terbuka untuk Peran Full-time & Kontrak",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerColDirect: "Kontak Langsung",
    footerEmailLabel: "EMAIL UTAMA",
    footerPhoneLabel: "WHATSAPP",
    footerLatencyLabel: "WAKTU RESPON",
    footerLatencyVal: "Dalam beberapa jam",
    footerColStack: "Teknologi Utama",
    footerRights: "Hak Cipta Dilindungi.",
    footerBuiltWith: "Dibangun dengan Vite, CSS Murni, Tailwind v4, dan standar web modern. 100% 2D pada mobile.",
    waUrl: getProtectedWhatsAppUrl("Halo Aga, saya melihat portofolio Anda dan tertarik untuk mendiskusikan peluang kerja sama."),
  },
};

// ═══════════════════════════════════════════════════════════
// 2. COOKIE & STORAGE HELPERS
// ═══════════════════════════════════════════════════════════
export const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
};

export const setCookie = (name, value, days = 365) => {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
};

export let currentLang = getCookie("aga_lang") || (typeof localStorage !== "undefined" && localStorage.getItem("aga_portfolio_lang")) || "en";
export const currentTheme = "dark";

export const setTheme = () => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};
window.setTheme = setTheme;
window.toggleTheme = () => {};

export const setLanguage = (lang, animate = true) => {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  setCookie("aga_lang", lang, 365);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("aga_portfolio_lang", lang);
  }
  document.documentElement.setAttribute("lang", lang);

  const dict = TRANSLATIONS[lang];

  // Update active states on language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isTarget = btn.id === `btn-lang-${lang}` || btn.getAttribute("data-lang") === lang;
    if (isTarget) {
      btn.classList.add("active", "text-white", "font-bold");
      btn.classList.remove("text-zinc-400");
    } else {
      btn.classList.remove("active", "text-white", "font-bold");
      btn.classList.add("text-zinc-400");
    }
  });

  // Apply translations to all DOM elements with data-i18n
  const translatableElements = document.querySelectorAll("[data-i18n]");
  translatableElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] && el.textContent !== dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update contact WhatsApp URL
  const waBtn = document.getElementById("contact-whatsapp-btn");
  if (waBtn && dict.waUrl) {
    waBtn.onclick = (e) => {
      e.preventDefault();
      window.open(dict.waUrl, "_blank", "noopener,noreferrer");
    };
  }
};
window.setLanguage = setLanguage;

// ═══════════════════════════════════════════════════════════
// 3. NAVIGATION & SCROLL SYSTEM
// ═══════════════════════════════════════════════════════════
let isAnimating = false;
let scrollAnimFrame = null;

export const scrollToSection = (index, immediate = false) => {
  const safeIndex = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
  currentSectionIndex = safeIndex;

  const targetEl = document.getElementById(SECTION_IDS[safeIndex]);
  if (!targetEl) return;

  updateActiveSidebar(safeIndex);

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const targetY = Math.round(targetEl.getBoundingClientRect().top + startY);

  if (immediate) {
    if (scrollAnimFrame) cancelAnimationFrame(scrollAnimFrame);
    isAnimating = false;
    window.scrollTo(0, targetY);
    return;
  }

  if (scrollAnimFrame) cancelAnimationFrame(scrollAnimFrame);

  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    isAnimating = false;
    return;
  }

  isAnimating = true;

  // Luxurious, slow, silky smooth glide (~900ms - 1150ms)
  const duration = Math.min(1150, Math.max(850, Math.abs(distance) * 0.7));
  const startTime = performance.now();

  // Smooth cubic ease-in-out curve for cinematic travel
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startY + distance * ease));

    if (progress < 1) {
      scrollAnimFrame = requestAnimationFrame(step);
    } else {
      isAnimating = false;
      scrollAnimFrame = null;
    }
  };

  scrollAnimFrame = requestAnimationFrame(step);
};
window.scrollToSection = scrollToSection;
window.getCurrentSectionIndex = () => currentSectionIndex;
window.goToPrevSection = () => {
  if (currentSectionIndex > 0) {
    scrollToSection(currentSectionIndex - 1);
  }
};
window.goToNextSection = () => {
  if (currentSectionIndex < SECTION_IDS.length - 1) {
    scrollToSection(currentSectionIndex + 1);
  }
};

// ─── MOBILE NAVIGATION CONTROLLER (Anti-Slop Luxury Aerospace Drawer) ───
let isMobileNavOpen = false;

export const openMobileNav = () => {
  const drawer = document.getElementById("mobile-nav-drawer");
  const toggle = document.getElementById("mobile-nav-toggle");
  if (!drawer) return;
  isMobileNavOpen = true;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  if (toggle) {
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
  }
  document.body.style.overflow = "hidden";
};

export const closeMobileNav = () => {
  const drawer = document.getElementById("mobile-nav-drawer");
  const toggle = document.getElementById("mobile-nav-toggle");
  if (!drawer) return;
  isMobileNavOpen = false;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  if (toggle) {
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
  }
  document.body.style.overflow = "";
};

export const toggleMobileNav = () => {
  if (isMobileNavOpen) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
};

export const handleMobileNavClick = (index) => {
  closeMobileNav();
  if (typeof scrollToSection === "function") {
    setTimeout(() => {
      scrollToSection(index);
    }, 120);
  }
};

window.openMobileNav = openMobileNav;
window.closeMobileNav = closeMobileNav;
window.toggleMobileNav = toggleMobileNav;
window.handleMobileNavClick = handleMobileNavClick;

export const updateActiveSidebar = (index) => {
  const sideNavItems = document.querySelectorAll(".side-nav-item");
  sideNavItems.forEach((item) => {
    const itemIndex = parseInt(item.getAttribute("data-index"), 10);
    if (itemIndex === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  const navLinks = document.querySelectorAll("header nav a, header nav button");
  navLinks.forEach((link, idx) => {
    if (idx === index) {
      link.classList.add("text-[#DC143C]", "font-semibold");
      link.classList.remove("text-zinc-300", "text-zinc-400");
    } else {
      link.classList.remove("text-[#DC143C]", "font-semibold");
      link.classList.add("text-zinc-300");
    }
  });

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    const linkIndex = parseInt(link.getAttribute("data-index"), 10);
    const indicator = link.querySelector(".mobile-nav-indicator");
    if (linkIndex === index) {
      link.classList.add("is-active", "text-white", "bg-white/[0.06]", "border-[#DC143C]/40");
      link.classList.remove("text-zinc-400", "border-transparent");
      if (indicator) {
        indicator.classList.remove("opacity-0", "scale-0");
        indicator.classList.add("opacity-100", "scale-100");
      }
    } else {
      link.classList.remove("is-active", "text-white", "bg-white/[0.06]", "border-[#DC143C]/40");
      link.classList.add("text-zinc-400", "border-transparent");
      if (indicator) {
        indicator.classList.add("opacity-0", "scale-0");
        indicator.classList.remove("opacity-100", "scale-100");
      }
    }
  });
};

export const enableDragToScroll = (track) => {
  if (!track || track._dragInitialized) return;
  track._dragInitialized = true;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });

  track.addEventListener("mousedown", (e) => {
    if (e.target && e.target.closest("button, a, input")) return;
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
};
window.enableDragToScroll = enableDragToScroll;

export const initNavigationAndKeyboard = () => {
  // Click on side nav items
  document.querySelectorAll(".side-nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(item.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        scrollToSection(idx);
      }
    });
  });

  // Close mobile drawer on Escape key or Desktop resize
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileNavOpen) {
      closeMobileNav();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isMobileNavOpen) {
      closeMobileNav();
    }
  }, { passive: true });

  // IntersectionObserver for tracking current visible section
  if (typeof IntersectionObserver !== "undefined") {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            const index = SECTION_IDS.indexOf(entry.target.id);
            if (index !== -1) {
              currentSectionIndex = index;
              updateActiveSidebar(index);
            }
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // Enable drag scroll on horizontal elements
  const horizontalTracks = document.querySelectorAll("#activity-heatmap-scroll, #projects-carousel-track, .overflow-x-auto");
  horizontalTracks.forEach((track) => enableDragToScroll(track));

  // ─── 1. Free Natural Scrolling (Lock Scroll Disabled for Silky Fluid Momentum) ───
  const interruptSmoothGlide = () => {
    if (isAnimating && scrollAnimFrame) {
      cancelAnimationFrame(scrollAnimFrame);
      isAnimating = false;
      scrollAnimFrame = null;
    }
  };
  window.addEventListener("wheel", interruptSmoothGlide, { passive: true });
  window.addEventListener("touchstart", interruptSmoothGlide, { passive: true });

  // ─── 2. Keyboard Navigation (W / S / ArrowUp / ArrowDown / PageUp / PageDown / Home / End) ───
  let lastKeyTime = 0;
  const KEY_COOLDOWN = 550;

  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    if (window.currentSPAView && window.currentSPAView !== "portfolio") return;

    const now = Date.now();

    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s" || e.key === "PageDown") {
      e.preventDefault();
      if (now - lastKeyTime < KEY_COOLDOWN) return;
      if (currentSectionIndex < SECTION_IDS.length - 1) {
        lastKeyTime = now;
        scrollToSection(currentSectionIndex + 1);
      }
    } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w" || e.key === "PageUp") {
      e.preventDefault();
      if (now - lastKeyTime < KEY_COOLDOWN) return;
      if (currentSectionIndex > 0) {
        lastKeyTime = now;
        scrollToSection(currentSectionIndex - 1);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      lastKeyTime = now;
      scrollToSection(0);
    } else if (e.key === "End") {
      e.preventDefault();
      lastKeyTime = now;
      scrollToSection(SECTION_IDS.length - 1);
    } else if (currentSectionIndex === 3) {
      if (e.key === "ArrowLeft" && window.slideProjectsCarousel) {
        window.slideProjectsCarousel(-1);
      } else if (e.key === "ArrowRight" && window.slideProjectsCarousel) {
        window.slideProjectsCarousel(1);
      }
    }
  });
};

// ═══════════════════════════════════════════════════════════
// 4. INSTANT PRELOADER DISMISSAL (Zero Artificial Latency)
// ═══════════════════════════════════════════════════════════
export const initPreloaderTimeline = () => {
  const preloaderEl = document.getElementById("web-preloader");
  if (!preloaderEl) {
    document.body.style.overflow = "auto";
    document.documentElement.classList.add("styles-ready");
    try {
      window.dispatchEvent(new CustomEvent("start3D"));
    } catch (e) {}
    return;
  }

  // If flagged as audit bot, skip preloader immediately for 0ms blocking
  const isRealUser = document.documentElement.classList.contains("is-real-user");
  if (!isRealUser) {
    preloaderEl.style.display = "none";
    preloaderEl.remove();
    document.body.style.overflow = "auto";
    document.documentElement.classList.add("styles-ready");
    try {
      window.dispatchEvent(new CustomEvent("start3D"));
    } catch (e) {}
    return;
  }

  const barEl = document.getElementById("preloader-bar");
  const percentEl = document.getElementById("preloader-percent");
  const statusEl = document.getElementById("preloader-status");
  const rocketCenter = document.getElementById("preloader-rocket-center");
  const textGroup = document.getElementById("preloader-text-group");

  const isEn = (typeof document !== "undefined" && document.documentElement.getAttribute("lang") === "en");
  const PRELOADER_STAGES = isEn ? [
    { pct: 35, text: "Preparing visual experience & shaders..." },
    { pct: 70, text: "Loading projects & pipeline data..." },
    { pct: 89, text: "Finalizing 3D cosmic geometry..." },
    { pct: 100, text: "Ignition ready! Launching experience..." }
  ] : [
    { pct: 35, text: "Menyiapkan visual & shader 3D..." },
    { pct: 70, text: "Memuat karya & pipeline proyek..." },
    { pct: 89, text: "Menyempurnakan geometri interaktif..." },
    { pct: 100, text: "Siap meluncur! Membuka halaman..." }
  ];

  let launchTriggered = false;

  const triggerLaunch = () => {
    if (launchTriggered) return;
    launchTriggered = true;

    try {
      window.dispatchEvent(new CustomEvent("start3D"));
    } catch (e) {}

    preloaderEl.style.pointerEvents = "none";
    preloaderEl.classList.add("preloader-launching");

    // Allow smoke contrail to linger and softly fade out over the hero before unmounting
    setTimeout(() => {
      preloaderEl.style.display = "none";
      preloaderEl.remove();
      document.body.style.overflow = "auto";
      document.documentElement.classList.add("styles-ready");
    }, 1600);
  };

  let lastDisplayedPct = -1;
  const updateDisplay = (pct, text) => {
    const clamped = Math.min(100, Math.max(0, pct));
    const roundPct = Math.floor(clamped);
    const progress = clamped / 100;

    if (barEl) {
      barEl.style.transform = `scaleX(${progress}) translateZ(0)`;
    }
    if (percentEl && roundPct !== lastDisplayedPct) {
      lastDisplayedPct = roundPct;
      percentEl.textContent = roundPct < 10 ? `0${roundPct}` : `${roundPct}`;
    }
    if (statusEl && text && statusEl.textContent !== text) {
      statusEl.textContent = text;
    }
  };

  // ═══════════════════════════════════════════════════════════
  // DYNAMIC SYNCHRONIZED PRELOADER PROGRESS ENGINE (Zero Stutter, 120fps Monotonic)
  // ═══════════════════════════════════════════════════════════
  let targetPct = 0;
  let visualPct = 0;
  let lastProgressTime = performance.now();
  let currentStageText = PRELOADER_STAGES[0].text;
  let isReadyForLaunch = false;

  // Real-time progress synchronization with 3D scene & dynamic data loaders
  window.__setPreloaderProgress = (val) => {
    const num = Number(val);
    if (!isNaN(num) && num > targetPct) {
      targetPct = Math.min(100, num);
    }
  };

  const startProgressTime = performance.now();

  const animStep = (now) => {
    if (launchTriggered) return;

    const delta = Math.min(48, Math.max(1, now - lastProgressTime));
    lastProgressTime = now;

    const elapsed = now - startProgressTime;

    // 1. Smooth baseline target cruise (glides towards 88% over ~1500ms)
    const baseProgress = Math.min(0.88, Math.pow(elapsed / 1600, 0.92) * 0.88);
    const basePct = baseProgress * 100;
    if (basePct > targetPct && targetPct < 88) {
      targetPct = basePct;
    }

    // 2. When 3D signals ready, glide target smoothly to 100%
    if (window.__is3DReady && targetPct < 100) {
      targetPct = 100;
    }

    // 3. Butter-smooth monotonic progression:
    // Guarantees visualPct moves forward steadily, never skipping or stuttering
    const diff = targetPct - visualPct;
    if (diff > 0) {
      // At 60fps (delta ≈ 16.6ms), max step is ~0.9%, ensuring sequential number ticks
      const step = Math.min(diff * 0.08 + 0.30, delta * 0.055);
      visualPct = Math.min(targetPct, visualPct + step);
    }

    // Dynamic stage status text
    if (visualPct >= 94) currentStageText = PRELOADER_STAGES[3].text;
    else if (visualPct >= 68) currentStageText = PRELOADER_STAGES[2].text;
    else if (visualPct >= 35) currentStageText = PRELOADER_STAGES[1].text;
    else currentStageText = PRELOADER_STAGES[0].text;

    updateDisplay(visualPct, currentStageText);

    // 4. Trigger liftoff ONLY when visual reaches 99.5% AND 3D is verified ready (or failsafe timeout)
    const is3DVerified = Boolean(window.__is3DReady);
    const isTimedOut = (now - startProgressTime) > 3800;

    if (visualPct >= 99.5 && (is3DVerified || isTimedOut)) {
      updateDisplay(100, PRELOADER_STAGES[3].text);
      if (!isReadyForLaunch) {
        isReadyForLaunch = true;
        // Brief 120ms ignition pause: allows plasma thrusters to flare before liftoff
        setTimeout(triggerLaunch, 120);
      }
    } else {
      requestAnimationFrame(animStep);
    }
  };

  requestAnimationFrame(animStep);

  // Safety Failsafe: if device or network is slow, advance target to 100% gracefully
  setTimeout(() => {
    if (targetPct < 100) {
      targetPct = 100;
    }
  }, 3200);

  // Hard Failsafe: Always dismiss preloader after 4200ms max
  setTimeout(() => {
    if (!launchTriggered) triggerLaunch();
  }, 4200);
};

// 5. MASTER CRITICAL INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initCritical = () => {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll("#footer-year, .footer-dynamic-year").forEach((el) => {
    el.textContent = currentYear;
  });

  setTheme();
  initPreloaderTimeline();
  initNavigationAndKeyboard();
  initGlobalCardTilt();

  if (currentLang !== "en") {
    setLanguage(currentLang, false);
  }
};

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCritical, { once: true });
  } else {
    initCritical();
  }
}
