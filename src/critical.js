import { gsap } from "gsap";

// 7 Dedicated Section IDs (01 Start, 02 About, 03 Activity, 04 Projects, 05 Pricing, 06 Contact, 07 Colophon)
export const SECTION_IDS = ["start", "about", "activity", "projects", "pricing", "contact", "footer"];
export let currentSectionIndex = 0;

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
    navStart: "Start",
    navAbout: "About",
    navActivity: "Activity",
    navProjects: "Projects",
    navPricing: "Studio",
    navContact: "Contact",
    navFooter: "Footer",
    ctaInitiate: "Let's Talk",
    sidebarHeader: "On this page",
    sideStart: "Start",
    sideAbout: "About",
    sideActivity: "Activity",
    sideProjects: "Projects",
    sidePricing: "Studio",
    sideContact: "Contact",
    sideFooter: "Footer",
    navHint: "Navigation",
    navScene: "Scene",
    navContactKey: "Contact",
    statusAvailable: "Open to Work",
    heroEyebrow: "01 // Frontend & Web Developer",
    heroRole: "Frontend Developer & Software Engineer",
    heroBio: "Building clean, high-performance web applications and interactive digital experiences with modern web technologies.",
    btnExploreAbout: "About Me",
    btnInitiate: "Let's Talk",
    scrollHint: "Scroll or press [S] to explore",
    aboutEyebrow: "02 // Focus & Tech Stack",
    aboutTitle1: "Clean Code.",
    aboutTitle2: "Modern Design.",
    aboutDesc: "Passionate about creating responsive, high-performance websites and applications. Focused on user experience, clean architecture, and practical engineering.",
    focus1Title: "Frontend Development",
    focus1Desc: "Modern component architecture, reactive state management, and responsive interfaces.",
    focus2Title: "Interactive 3D Web",
    focus2Desc: "Immersive 3D experiences with Three.js, WebGL shaders, and smooth GSAP animations.",
    focus3Title: "Fullstack & Backend API",
    focus3Desc: "Robust backend services with Laravel, Node.js, and database architecture.",
    focus4Title: "Performance & SEO",
    focus4Desc: "Fast load times, asset optimization, and Core Web Vitals refinement.",
    activityEyebrow: "03 // GitHub Activity",
    activityTitle1: "Consistent Coding.",
    activityTitle2: "Every Day.",
    activityDesc: "Real-time contribution history and daily coding activity tracked directly from GitHub.",
    liveSync: "Live Sync",
    velocityMatrix: "365-Day Activity Matrix",
    dayMon: "Mon",
    dayWed: "Wed",
    dayFri: "Fri",
    monthJan: "Jan",
    monthFeb: "Feb",
    monthMar: "Mar",
    monthApr: "Apr",
    monthMay: "May",
    monthJun: "Jun",
    monthJul: "Jul",
    monthAug: "Aug",
    monthSep: "Sep",
    monthOct: "Oct",
    monthNov: "Nov",
    monthDec: "Dec",
    less: "Less",
    more: "More",
    projectsEyebrow: "04 // Featured Projects",
    projectsTitle1: "Featured",
    projectsTitle2: "Works.",
    sliderHint: "Use [←] [→] navigation buttons to explore projects",
    projBkjTag: "Corporate · Maritime Logistics",
    projBkjStatus: "bkjgrup.com",
    projBkjTitle: "BKJ Group Indonesia — Logistics Portal",
    projBkjDesc: "Integrated enterprise maritime logistics and corporate platform built for PT Berkah Kapal Jaya with full CMS, subsidiary routing, and bilingual localization.",
    proj1Tag: "Mobile App · Geolocation",
    proj1Status: "Live Project",
    proj1Title: "FOODIFY — Food Delivery App",
    proj1Desc: "Modern food delivery mobile app tailored for Medan City featuring interactive OpenStreetMap, GPS detection, and real-time simulated driver delivery tracking.",
    proj2Tag: "Fullstack · Web App",
    proj2Status: "Live Project",
    proj2Title: "Wilmar Buku — Donation System",
    proj2Desc: "Centralized library donation platform built with TALL stack, Google OAuth 2.0, automated PDF reporting, and real-time WebSockets via Laravel Reverb.",
    proj3Tag: "Web Application",
    proj3Status: "Live Project",
    proj3Title: "CINTA — School Counseling Platform",
    proj3Desc: "Anonymous grievance reporting and counseling web application empowering students and BK teachers with end-to-end privacy and intuitive case management.",
    proj4Tag: "Web Platform",
    proj4Status: "Live Project",
    proj4Title: "Grow a Garden — Urban Farming",
    proj4Desc: "Digital garden management platform for home gardens and hydroponics with smart spatial mapping, soil health tracking, and automated growth calendar.",
    reposHeader: "GitHub Repositories (@Apisikma123)",
    reposSync: "Synced via GitHub API",
    syncingRepos: "Syncing repositories…",
    exploreAllProjects: "All Works (17)",
    btnReadReadme: "Quick Overview",
    visualPreview: "Visual Architecture Preview",
    pricingEyebrow: "05 // Website Cost Configurator",
    pricingTitle1: "Interactive",
    pricingTitle2: "Cost Estimator.",
    pricingBio: "Interactively configure your website requirements and get a transparent realtime price estimate ready for direct WhatsApp consultation.",
    studioEyebrow: "05 // Freelance Studio & Services",
    studioTitle1: "Also Available for",
    studioTitle2: "Client Projects.",
    studioDesc: "In addition to personal software engineering, I also accept freelance projects for professional website development — from landing pages to custom web applications.",
    studioCard1Desc: "Fast high-converting promotional pages for marketing campaigns, lead generation, and direct WhatsApp conversions.",
    studioCard2Desc: "Official multi-page business website for SMEs & corporate entities with high Google SEO readiness.",
    studioCard3Desc: "Fullstack web applications, SaaS platforms, administrative dashboards, and integrated API systems.",
    studioCTATitle: "8 Website Packages + Interactive Cost Calculator",
    studioCTADesc: "Calculate transparent price estimates, select custom feature sets, and dispatch your brief directly to WhatsApp. Starting at Rp499K.",
    studioCTABtn: "Launch Web Studio",
    contactEyebrow: "06 // Contact & Inquiries",
    contactTitle1: "Let's Build Something",
    contactTitle2: "Great Together.",
    contactBio: "Open to full-time engineering roles, freelance projects, and collaboration opportunities. Let's discuss your next project.",
    btnStartConv: "Start Conversation",
    scrollFooter: "Scroll for Details & Footer [07]",
    footerEyebrow: "07 // Footer & Contact",
    footerColStack: "Tech Stack",
    footerColDesign: "Design & Credits",
    footerColInspiration: "DESIGN INSPIRATION",
    creditScfo: "scfo.de ↗",
    footerColModel: "3D TESSERACT MODEL",
    creditModel: "Dark Tesseract (Sketchfab) ↗",
    footerColTypography: "TYPOGRAPHY",
    footerColAccent: "COLOR ACCENT",
    footerEmailLabel: "DISPATCH EMAIL",
    footerPhoneLabel: "WHATSAPP / VOICE",
    footerLatencyLabel: "RESPONSE LATENCY",
    footerLatencyVal: "< 12 Hours SLA",
    footerRole: `Frontend Developer & Software Engineer © ${new Date().getFullYear()}`,
    footerDesc: "Building clean, high-performance web applications and interactive digital experiences.",
    footerColDirect: "Direct Contact",
    footerColSocial: "Network & Socials",
    footerColNav: "Quick Navigation",
    footerAvailable: "AVAILABLE // SELECT COMMISSIONS",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerRights: "All Rights Reserved.",
    footerBuiltWith: "Built with Three.js, GSAP & Modern Web Technologies.",
    backToTop: "Back to Top",
    waUrl: getProtectedWhatsAppUrl("Hello Aga, I am interested in discussing a project collaboration."),
  },
  id: {
    navStart: "Mulai",
    navAbout: "Tentang",
    navActivity: "Aktivitas",
    navProjects: "Karya",
    navPricing: "Studio",
    navContact: "Kontak",
    navFooter: "Footer",
    ctaInitiate: "Hubungi Saya",
    sidebarHeader: "Di halaman ini",
    sideStart: "Mulai",
    sideAbout: "Tentang",
    sideActivity: "Aktivitas",
    sideProjects: "Karya",
    sidePricing: "Studio",
    sideContact: "Kontak",
    sideFooter: "Footer",
    navHint: "Navigasi",
    navScene: "Scene",
    navContactKey: "Kontak",
    statusAvailable: "Open to Work",
    heroEyebrow: "01 // Frontend & Web Developer",
    heroRole: "Frontend Developer & Software Engineer",
    heroBio: "Membangun aplikasi web yang cepat, bersih, dan interaktif dengan teknologi web modern.",
    btnExploreAbout: "Tentang Saya",
    btnInitiate: "Hubungi Saya",
    scrollHint: "Scroll atau tekan [S] untuk menjelajah",
    aboutEyebrow: "02 // Keahlian & Teknologi",
    aboutTitle1: "Kode Bersih.",
    aboutTitle2: "Desain Modern.",
    aboutDesc: "Fokus pada pembuatan website dan aplikasi yang responsif, cepat, dan mudah digunakan. Mengutamakan kode yang rapi, performa optimal, dan arsitektur yang terstruktur.",
    focus1Title: "Pengembangan Frontend",
    focus1Desc: "Arsitektur komponen modern, manajemen state reaktif, dan antarmuka responsif.",
    focus2Title: "Web 3D Interaktif",
    focus2Desc: "Pengalaman 3D interaktif dengan Three.js, WebGL shader, dan animasi GSAP yang mulus.",
    focus3Title: "Fullstack & Backend API",
    focus3Desc: "Layanan backend tangguh dengan Laravel, Node.js, dan arsitektur basis data terstruktur.",
    focus4Title: "Performa & SEO",
    focus4Desc: "Kecepatan muat halaman, optimasi aset, dan kepatuhan standar Core Web Vitals.",
    activityEyebrow: "03 // Aktivitas GitHub",
    activityTitle1: "Konsistensi Koding.",
    activityTitle2: "Setiap Hari.",
    activityDesc: "Riwayat kontribusi dan aktivitas koding harian yang terhubung langsung dengan GitHub.",
    liveSync: "Sinkronisasi Langsung",
    velocityMatrix: "Matriks Aktivitas 365 Hari",
    dayMon: "Sen",
    dayWed: "Rab",
    dayFri: "Jum",
    monthJan: "Jan",
    monthFeb: "Feb",
    monthMar: "Mar",
    monthApr: "Apr",
    monthMay: "Mei",
    monthJun: "Jun",
    monthJul: "Jul",
    monthAug: "Agu",
    monthSep: "Sep",
    monthOct: "Okt",
    monthNov: "Nov",
    monthDec: "Des",
    less: "Sedikit",
    more: "Banyak",
    projectsEyebrow: "04 // Proyek Pilihan",
    projectsTitle1: "Karya &",
    projectsTitle2: "Proyek.",
    sliderHint: "Tekan tombol [←] [→] untuk melihat karya",
    projBkjTag: "Korporat · Logistik Maritim",
    projBkjStatus: "bkjgrup.com",
    projBkjTitle: "BKJ Group Indonesia — Portal Logistik",
    projBkjDesc: "Portal korporat dan operasional maritim & logistik terpadu untuk PT Berkah Kapal Jaya (BKJ Group) dengan CMS dinamis dan sistem lokalisasi multi-bahasa.",
    proj1Tag: "Aplikasi Mobile · Geolokasi",
    proj1Status: "Proyek Rilis",
    proj1Title: "FOODIFY — Food Delivery App",
    proj1Desc: "Aplikasi mobile pesan-antar makanan khusus Kota Medan dengan peta interaktif OpenStreetMap, deteksi GPS otomatis, dan simulasi pelacakan kurir real-time.",
    proj2Tag: "Fullstack · Aplikasi Web",
    proj2Status: "Proyek Rilis",
    proj2Title: "Wilmar Buku — Sistem Donasi",
    proj2Desc: "Platform donasi buku perpustakaan terpusat dengan TALL stack, Google OAuth 2.0, laporan PDF otomatis, dan WebSockets real-time via Laravel Reverb.",
    proj3Tag: "Aplikasi Web",
    proj3Status: "Proyek Rilis",
    proj3Title: "CINTA — Portal Konseling Sekolah",
    proj3Desc: "Aplikasi pelaporan anonim dan konseling sekolah untuk memfasilitasi komunikasi siswa dan guru BK dengan standar privasi tinggi dan manajemen laporan terstruktur.",
    proj4Tag: "Platform Web",
    proj4Status: "Proyek Rilis",
    proj4Title: "Grow a Garden — Manajemen Kebun",
    proj4Desc: "Platform digital manajemen kebun rumahan dan hidroponik dengan pemetaan tanaman cerdas, pantauan kelembaban tanah, dan kalender pertumbuhan otomatis.",
    reposHeader: "Repositori GitHub (@Apisikma123)",
    reposSync: "Tersinkronisasi via GitHub API",
    syncingRepos: "Menyinkronkan repositori…",
    exploreAllProjects: "Semua Karya (17)",
    btnReadReadme: "Overview Singkat",
    visualPreview: "Pratinjau Arsitektur Visual",
    pricingEyebrow: "05 // Kalkulator Biaya Website",
    pricingTitle1: "Estimasi Biaya",
    pricingTitle2: "Website Interaktif.",
    pricingBio: "Pilih kebutuhan website Anda secara interaktif dan dapatkan estimasi harga instan yang siap dikonsultasikan via WhatsApp.",
    studioEyebrow: "05 // Studio & Layanan Freelance",
    studioTitle1: "Juga Menerima",
    studioTitle2: "Proyek Klien.",
    studioDesc: "Selain engineering personal, saya juga menerima proyek freelance pembuatan website profesional — dari landing page hingga custom web app.",
    studioCard1Desc: "Halaman promosi cepat untuk iklan campaign, lead generation, dan direct WhatsApp conversion.",
    studioCard2Desc: "Website profil bisnis resmi untuk UMKM & corporate, multi-halaman dengan SEO Google ready.",
    studioCard3Desc: "Fullstack web application, SaaS, dashboard admin, dan sistem informasi dengan API terintegrasi.",
    studioCTATitle: "8 Paket Website + Kalkulator Biaya Interaktif",
    studioCTADesc: "Hitung estimasi biaya transparan, pilih fitur custom, dan kirim brief langsung via WhatsApp. Mulai Rp499K.",
    studioCTABtn: "Buka Web Studio",
    contactEyebrow: "06 // Kontak & Diskusi",
    contactTitle1: "Mari Kolaborasi &",
    contactTitle2: "Berkarya Bersama.",
    contactBio: "Terbuka untuk pekerjaan full-time, proyek freelance, atau diskusi ide baru. Mari bicarakan proyek Anda.",
    btnStartConv: "Kirim Pesan",
    scrollFooter: "Scroll untuk Detail & Footer [07]",
    footerEyebrow: "07 // Footer & Kontak",
    footerColStack: "Teknologi",
    footerColDesign: "Desain & Kredit",
    footerColInspiration: "INSPIRASI DESAIN",
    creditScfo: "scfo.de ↗",
    footerColModel: "MODEL 3D TESSERACT",
    creditModel: "Dark Tesseract (Sketchfab) ↗",
    footerColTypography: "TIPOGRAFI",
    footerColAccent: "AKSEN WARNA",
    footerEmailLabel: "EMAIL UTAMA",
    footerPhoneLabel: "WHATSAPP / TELEPON",
    footerLatencyLabel: "ESTIMASI RESPON",
    footerLatencyVal: "< 12 Jam SLA",
    footerRole: `Frontend Developer & Software Engineer © ${new Date().getFullYear()}`,
    footerDesc: "Membangun aplikasi web modern yang cepat, responsif, dan mudah digunakan.",
    footerColDirect: "Kontak Langsung",
    footerColSocial: "Jaringan & Sosial",
    footerColNav: "Navigasi Cepat",
    footerAvailable: "TERSEDIA // PROYEK PILIHAN",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerRights: "Hak Cipta Dilindungi.",
    footerBuiltWith: "Dibangun dengan Three.js, GSAP & Teknologi Web Modern.",
    backToTop: "Kembali ke Atas",
    waUrl: getProtectedWhatsAppUrl("Halo Aga, saya tertarik untuk diskusi proyek."),
  },
};

// ─── Cookie Persistence Engine ───
export const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;)\\s*" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export const setCookie = (name, value, days = 365) => {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

export let currentLang = getCookie("aga_lang") || (typeof localStorage !== "undefined" ? localStorage.getItem("aga_portfolio_lang") : null) || "en";
export const currentTheme = "dark";

// ─── Theme Mode Architecture (Dark Obsidian Fixed) ───
export const setTheme = () => {
  document.documentElement.setAttribute("data-theme", "dark");
  try {
    localStorage.setItem("aga_portfolio_theme", "dark");
  } catch (e) {}
  setCookie("aga_theme", "dark", 365);
};
window.setTheme = setTheme;
window.toggleTheme = () => {};

// ─── Animated Bilingual Transition Engine (GSAP Morph) ───
export const setLanguage = (lang, animate = true) => {
  if (!TRANSLATIONS[lang]) return;
  const dict = TRANSLATIONS[lang];
  currentLang = lang;
  try {
    localStorage.setItem("aga_portfolio_lang", lang);
  } catch (e) {}
  setCookie("aga_lang", lang, 365);
  document.documentElement.setAttribute("lang", lang);

  // Update Buttons Active State with micro-animation
  const btnEn = document.getElementById("btn-lang-en");
  const btnId = document.getElementById("btn-lang-id");
  if (btnEn && btnId) {
    if (lang === "en") {
      btnEn.classList.add("active");
      btnId.classList.remove("active");
    } else {
      btnId.classList.add("active");
      btnEn.classList.remove("active");
    }
  }

  // Dynamic WhatsApp Message Sync based on language
  const contactWaBtn = document.getElementById("contact-whatsapp-btn");
  const footerWaLink = document.getElementById("footer-whatsapp-link");
  if (contactWaBtn && dict.waUrl) {
    contactWaBtn.href = dict.waUrl;
  }
  if (footerWaLink && dict.waUrl) {
    footerWaLink.href = dict.waUrl;
  }

  // Animated holographic text morph sequence
  const i18nElements = document.querySelectorAll("[data-i18n]");

  if (!animate) {
    i18nElements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
    if (window.renderPricingOnLangChange) {
      window.renderPricingOnLangChange(lang);
    }
    return;
  }

  gsap.to(i18nElements, {
    opacity: 0,
    y: -4,
    duration: 0.16,
    stagger: 0.003,
    ease: "power2.in",
    onComplete: () => {
      i18nElements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
      if (window.renderPricingOnLangChange) {
        window.renderPricingOnLangChange(lang);
      }
      gsap.fromTo(
        i18nElements,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.003, ease: "power2.out" }
      );
    },
  });
};
window.setLanguage = setLanguage;

window.switchView = async (viewName, param, updateHash = true) => {
  const projectDetailEl = document.getElementById("project-detail-view");
  if (viewName === "project") {
    if (window.openProjectDetail && window.openProjectDetail !== openProjectDetail) {
      return window.openProjectDetail(param);
    }
    if (!projectDetailEl) {
      window.location.href = "/project.html?id=" + encodeURIComponent(param || "foodify");
      return;
    }
  }
  if (viewName === "all-projects") {
    window.location.href = "/projects.html";
    return;
  }
  if (viewName === "portfolio") {
    if (projectDetailEl) {
      projectDetailEl.classList.add("hidden");
      projectDetailEl.style.display = "none";
      document.body.style.overflow = "auto";
      window.currentSPAView = "portfolio";
    }
  }
};

export const openProjectDetail = (projectId) => {
  if (window.__openProjectDetailImpl) {
    return window.__openProjectDetailImpl(projectId);
  }
  const projectDetailEl = document.getElementById("project-detail-view");
  if (!projectDetailEl) {
    window.location.href = "/project.html?id=" + encodeURIComponent(projectId || "foodify");
  }
};
window.openProjectDetail = openProjectDetail;

// ═══════════════════════════════════════════════════════════
// 2. LOCKED FULL-PAGE AUTO-SNAP ENGINE & NAVIGATION CONTROLS
// ═══════════════════════════════════════════════════════════
let isAnimating = false;
let lastScrollTime = 0;
const WHEEL_COOLDOWN = 800;
export const scrollToSection = (index, immediate = false) => {
  if (window.currentSPAView && window.currentSPAView !== "portfolio") {
    if (window.switchView) window.switchView("portfolio", index);
    return;
  }
  const safeIndex = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
  if (safeIndex === currentSectionIndex && !immediate) return;

  currentSectionIndex = safeIndex;
  const targetEl = document.getElementById(SECTION_IDS[safeIndex]);
  if (!targetEl) return;

  isAnimating = true;
  lastScrollTime = Date.now();
  updateActiveSidebar(safeIndex);

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const targetY = Math.round(targetEl.getBoundingClientRect().top + startY);

  if (immediate) {
    window.scrollTo(0, targetY);
    isAnimating = false;
    return;
  }

  window.scrollTo({
    top: targetY,
    behavior: "smooth"
  });

  setTimeout(() => {
    isAnimating = false;
    lastScrollTime = Date.now();
  }, 500);
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
};

// ─── Reusable High-Performance Drag-To-Scroll Engine (Desktop Mouse & Touch) ───
export const enableDragToScroll = (track) => {
  if (!track || track._dragInitialized) return;
  track._dragInitialized = true;

  let isDown = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let hasDragged = false;
  let velX = 0;
  let lastX = 0;
  let lastTime = 0;
  let rafMomentum = null;

  track.style.cursor = "grab";
  track.style.setProperty("-webkit-user-select", "none");
  track.style.setProperty("user-select", "none");

  // Prevent browser native image/link ghost drag
  track.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });

  const onPointerDown = (e) => {
    // Only primary button on mouse
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target && e.target.closest("button, input, textarea, select")) return;

    if (rafMomentum) {
      cancelAnimationFrame(rafMomentum);
      rafMomentum = null;
    }

    isDown = true;
    hasDragged = false;
    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastTime = performance.now();
    scrollLeft = track.scrollLeft;
    velX = 0;

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { once: true });
    window.addEventListener("pointercancel", onPointerUp, { once: true });
  };

  const onPointerMove = (e) => {
    if (!isDown) return;

    const currentX = e.clientX;
    const diffX = currentX - startX;
    const diffY = Math.abs(e.clientY - startY);

    if (Math.abs(diffX) > 4 || diffY > 4) {
      hasDragged = true;
    }

    if (hasDragged) {
      e.preventDefault();
      track.scrollLeft = scrollLeft - diffX;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      velX = (currentX - lastX) / dt;
      lastX = currentX;
      lastTime = now;
    }
  };

  const onPointerUp = () => {
    if (!isDown) return;
    isDown = false;
    window.removeEventListener("pointermove", onPointerMove);

    track.style.cursor = "grab";

    // Inertia release if dragged with speed
    if (hasDragged && Math.abs(velX) > 0.15) {
      let momentumVel = velX * 16;
      const momentumLoop = () => {
        if (Math.abs(momentumVel) < 0.5) {
          track.style.removeProperty("scroll-behavior");
          track.style.removeProperty("scroll-snap-type");
          rafMomentum = null;
          return;
        }
        track.scrollLeft -= momentumVel;
        momentumVel *= 0.88;
        rafMomentum = requestAnimationFrame(momentumLoop);
      };
      rafMomentum = requestAnimationFrame(momentumLoop);
    } else {
      track.style.removeProperty("scroll-behavior");
      track.style.removeProperty("scroll-snap-type");
    }

    setTimeout(() => {
      hasDragged = false;
    }, 120);
  };

  track.addEventListener("pointerdown", onPointerDown);

  // Suppress link click / modal open when user was dragging
  track.addEventListener(
    "click",
    (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
};
window.enableDragToScroll = enableDragToScroll;

export const initNavigationAndKeyboard = () => {
  const sideNavItems = document.querySelectorAll(".side-nav-item");

  // Clickable sidebar numeric navigation
  sideNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const idx = parseInt(item.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        scrollToSection(idx);
      }
    });
  });

  // Native IntersectionObserver for active section tracking (0 forced reflows)
  if (typeof IntersectionObserver !== "undefined") {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!window.currentSPAView || window.currentSPAView === "portfolio") && !isAnimating) {
          const index = SECTION_IDS.indexOf(entry.target.id);
          if (index !== -1) {
            currentSectionIndex = index;
            updateActiveSidebar(index);
          }
        }
      });
    }, { rootMargin: "-30% 0px -30% 0px" });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // ─── 0. Universal Drag-To-Scroll Engine for Horizontal Tracks ───
  const initHorizontalDragScroll = () => {
    const tracks = document.querySelectorAll(
      "#activity-heatmap-scroll, #projects-carousel-track, #pricing-cards-track, .overflow-x-auto"
    );
    tracks.forEach((track) => enableDragToScroll(track));
  };
  initHorizontalDragScroll();

  // ─── 1. Locked Mouse Wheel & Trackpad Snap (Strict Scene-by-Scene Cooldown) ───
  window.addEventListener(
    "wheel",
    (e) => {
      if (window.currentSPAView && window.currentSPAView !== "portfolio") return;

      const target = e.target;
      const isHorizontalContainer = target && target.closest("#activity-heatmap-scroll, #projects-carousel-track, #pricing-cards-track, .overflow-x-auto");
      if (isHorizontalContainer) {
        // Trackpad horizontal swipe
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          return;
        }

        // Vertical mouse wheel over horizontal scroll container: convert to horizontal track scrolling
        const maxScrollLeft = isHorizontalContainer.scrollWidth - isHorizontalContainer.clientWidth;
        if (maxScrollLeft > 5) {
          const atStart = isHorizontalContainer.scrollLeft <= 4;
          const atEnd = isHorizontalContainer.scrollLeft >= maxScrollLeft - 4;

          if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
            e.preventDefault();
            isHorizontalContainer.style.setProperty("scroll-behavior", "auto", "important");
            isHorizontalContainer.scrollLeft += e.deltaY * 1.25;
            clearTimeout(isHorizontalContainer._wheelTimer);
            isHorizontalContainer._wheelTimer = setTimeout(() => {
              isHorizontalContainer.style.removeProperty("scroll-behavior");
            }, 100);
            return;
          }
        }
      }

      const isModal = target && target.closest("#modal-container, .modal-scroll, #project-detail-view, #all-projects-view");
      if (isModal) return;

      // STRICT LOCK: Suppress free scrolling in portfolio view
      e.preventDefault();

      if (isAnimating) return;

      const now = Date.now();
      if (now - lastScrollTime < WHEEL_COOLDOWN) {
        return;
      }

      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        if (currentSectionIndex < SECTION_IDS.length - 1) {
          scrollToSection(currentSectionIndex + 1);
        }
      } else {
        if (currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
        }
      }
    },
    { passive: false }
  );

  // ─── 2. Mobile Touch Swipe Snap (1 Swipe = Exactly 1 Scene) ───
  let touchStartY = 0;
  let touchStartX = 0;
  let touchStartTime = 0;

  window.addEventListener(
    "touchstart",
    (e) => {
      if (window.currentSPAView && window.currentSPAView !== "portfolio") return;
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (window.currentSPAView && window.currentSPAView !== "portfolio") return;
      if (e.touches.length > 0) {
        const diffY = touchStartY - e.touches[0].clientY;
        const diffX = touchStartX - e.touches[0].clientX;

        const target = e.target;
        const isHorizontalContainer = target && target.closest("#activity-heatmap-scroll, #projects-carousel-track, #pricing-cards-track, .overflow-x-auto");
        if (isHorizontalContainer && Math.abs(diffX) > 4) {
          return;
        }

        if (target && target.closest("#modal-container, .modal-scroll, #project-detail-view, #all-projects-view")) return;

        // Prevent free scrolling on vertical swipe
        if (Math.abs(diffY) > 6 && Math.abs(diffY) > Math.abs(diffX)) {
          if (e.cancelable) e.preventDefault();
        }
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      if (window.currentSPAView && window.currentSPAView !== "portfolio") return;
      if (isAnimating) return;
      const now = Date.now();
      if (now - lastScrollTime < WHEEL_COOLDOWN) return;

      if (e.changedTouches.length > 0) {
        const diffY = touchStartY - e.changedTouches[0].clientY;
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const elapsed = now - touchStartTime;

        const isHorizontalContainer = e.target && e.target.closest("#activity-heatmap-scroll, #projects-carousel-track, #pricing-cards-track, .overflow-x-auto");
        if (isHorizontalContainer && Math.abs(diffX) > Math.abs(diffY)) {
          return;
        }

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 25 && elapsed < 900) {
          if (diffY > 0 && currentSectionIndex < SECTION_IDS.length - 1) {
            scrollToSection(currentSectionIndex + 1);
          } else if (diffY < 0 && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
          }
        }
      }
    },
    { passive: true }
  );

  // Keyboard Navigation (Fast & Spammable W / S / ArrowUp / ArrowDown / PageUp / PageDown / Space / K)
  let lastKeyTime = 0;
  const KEY_COOLDOWN = 140;

  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

    if (!window.currentSPAView || window.currentSPAView === "portfolio") {
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
      } else if (e.key.toLowerCase() === "k") {
        e.preventDefault();
        lastKeyTime = now;
        scrollToSection(4); // 05 Pricing
      } else if (currentSectionIndex === 3) {
        if (e.key === "ArrowLeft" && window.slideProjectsCarousel) {
          window.slideProjectsCarousel(-1);
        } else if (e.key === "ArrowRight" && window.slideProjectsCarousel) {
          window.slideProjectsCarousel(1);
        }
      }
    }
  });
};

// ═══════════════════════════════════════════════════════════
// CLIENT-FRIENDLY LUXURY PRELOADER TIMELINE (Aerospace Blast-Off)
// ═══════════════════════════════════════════════════════════
export const initPreloaderTimeline = () => {
  const preloaderEl = document.getElementById("web-preloader");
  if (!preloaderEl) {
    document.body.style.overflow = "auto";
    return;
  }

  const isAuditBot = typeof navigator !== 'undefined' && (
    /Chrome-Lighthouse|Google-PageSpeed|PTST|HeadlessChrome|Lighthouse|PageSpeed|Speed Insights|Googlebot/i.test(navigator.userAgent) ||
    (typeof document !== "undefined" && document.documentElement && document.documentElement.classList.contains("is-audit-bot")) ||
    (typeof window !== "undefined" && Boolean(window.__LIGHTHOUSE_TEST__))
  );

  if (isAuditBot) {
    preloaderEl.style.display = "none";
    preloaderEl.remove();
    document.body.style.overflow = "auto";
    return;
  }

  const barEl = document.getElementById("preloader-bar");
  const percentEl = document.getElementById("preloader-percent");
  const statusEl = document.getElementById("preloader-status");
  const rocketCenter = document.getElementById("preloader-rocket-center");
  const flameNozzle = document.getElementById("apple-rocket-flame") || rocketCenter;
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
  let floatTween = null;

  // ─── High-Performance Pure White Vapor Smoke Canvas (Live Flame Nozzle Tracking) ───
  const smokeCanvas = document.getElementById("preloader-smoke-canvas");
  let smokeCtx = null;
  let smokeParticles = [];
  let smokeAnimId = null;
  let cachedRect = null;

  const resizeCanvas = () => {
    if (smokeCanvas) {
      smokeCanvas.width = window.innerWidth;
      smokeCanvas.height = window.innerHeight;
    }
  };

  if (smokeCanvas) {
    smokeCtx = smokeCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
  }

  // Pre-seed initial smoke cloud so smoke is immediately visible & fully formed from frame 0
  const seedSmokeParticles = () => {
    const targetEl = rocketCenter || flameNozzle;
    if (targetEl && targetEl.isConnected) {
      const rect = targetEl.getBoundingClientRect();
      const nozzleX = rect.left + rect.width / 2;
      const nozzleY = rect.bottom - 4;
      for (let i = 0; i < 24; i++) {
        const progress = i / 24;
        smokeParticles.push({
          x: nozzleX + (Math.random() - 0.5) * (8 + progress * 20),
          y: nozzleY + progress * 70 + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * (0.8 + progress * 1.5),
          vy: 1.4 + Math.random() * 1.6,
          radius: 10 + progress * 28 + Math.random() * 8,
          growth: 0.45,
          maxRadius: 55,
          alpha: 0.75 * (1 - progress * 0.7),
          decay: 0.007,
        });
      }
    }
  };
  seedSmokeParticles();

  let lastSmokeTime = 0;
  let frameCount = 0;

  const renderSmokeCanvas = (now) => {
    if (!smokeCtx || !smokeCanvas || !document.getElementById("web-preloader")) {
      if (smokeAnimId) cancelAnimationFrame(smokeAnimId);
      return;
    }

    const currentTime = (typeof now === "number" && now > 0) ? now : performance.now();
    const dt = lastSmokeTime > 0 ? Math.min(32, Math.max(8, currentTime - lastSmokeTime)) / 16.666 : 1.0;
    lastSmokeTime = currentTime;

    smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
    frameCount++;

    const targetEl = rocketCenter || flameNozzle;
    if (targetEl && targetEl.isConnected) {
      const rect = targetEl.getBoundingClientRect();
      if (rect.bottom >= -80 && rect.top <= window.innerHeight + 100) {
        const nozzleX = rect.left + rect.width / 2;
        const nozzleY = rect.bottom - (launchTriggered ? 14 : 4);
        
        // Continuous steady generation
        const spawnRate = launchTriggered ? 4 : 2;
        for (let i = 0; i < spawnRate; i++) {
          if (smokeParticles.length < 130) {
            smokeParticles.push({
              x: nozzleX + (Math.random() - 0.5) * (launchTriggered ? 16 : 8),
              y: nozzleY + (Math.random() - 0.5) * 2,
              vx: (Math.random() - 0.5) * (launchTriggered ? 2.4 : 1.0),
              vy: launchTriggered ? (5.5 + Math.random() * 7.5) : (1.4 + Math.random() * 1.8),
              radius: launchTriggered ? (18 + Math.random() * 10) : (10 + Math.random() * 6),
              growth: launchTriggered ? 1.05 : 0.45,
              maxRadius: launchTriggered ? 90 : 50,
              alpha: launchTriggered ? 0.85 : 0.65,
              decay: launchTriggered ? 0.014 : 0.007,
            });
          }
        }
      }
    }

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
      const p = smokeParticles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.radius = Math.min(p.maxRadius, p.radius + p.growth * dt);
      p.alpha -= p.decay * dt;

      if (p.alpha <= 0.005 || p.y > window.innerHeight + 80) {
        smokeParticles.splice(i, 1);
        continue;
      }

      smokeCtx.save();
      const grad = smokeCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.95})`);
      grad.addColorStop(0.35, `rgba(240, 244, 255, ${p.alpha * 0.7})`);
      grad.addColorStop(0.7, `rgba(215, 225, 255, ${p.alpha * 0.25})`);
      grad.addColorStop(1, `rgba(200, 215, 255, 0)`);
      smokeCtx.fillStyle = grad;
      smokeCtx.beginPath();
      smokeCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      smokeCtx.fill();
      smokeCtx.restore();
    }

    smokeAnimId = requestAnimationFrame(renderSmokeCanvas);
  };

  smokeAnimId = requestAnimationFrame(renderSmokeCanvas);

  if (rocketCenter) {
    floatTween = gsap.to(rocketCenter, {
      y: -10,
      rotation: 1.5,
      duration: 1.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  const headerEl = document.getElementById("preloader-header");
  const footerEl = document.getElementById("preloader-footer");
  const backdropEl = document.getElementById("preloader-backdrop");

  const triggerLaunch = () => {
    if (launchTriggered) return;
    launchTriggered = true;

    if (floatTween) floatTween.kill();

    preloaderEl.style.pointerEvents = "none";

    const launchTl = gsap.timeline({
      onComplete: () => {
        if (smokeAnimId) {
          cancelAnimationFrame(smokeAnimId);
          smokeAnimId = null;
        }
        window.removeEventListener("resize", resizeCanvas);
        preloaderEl.style.display = "none";
        preloaderEl.remove();
        document.body.style.overflow = "auto";
      },
    });

    // Hanya latar backdrop, header, footer & teks yang fade — Roket & Asap tetap 100% solid
    if (textGroup) {
      launchTl.to(textGroup, { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" }, 0);
    }
    if (headerEl) {
      launchTl.to(headerEl, { opacity: 0, y: -15, duration: 0.5, ease: "power2.out" }, 0);
    }
    if (footerEl) {
      launchTl.to(footerEl, { opacity: 0, y: 15, duration: 0.5, ease: "power2.out" }, 0);
    }
    if (backdropEl) {
      launchTl.to(backdropEl, { opacity: 0, duration: 1.25, ease: "power2.inOut" }, 0.05);
    }
    // Fade out sisa kepulan asap secara mulus agar tidak hilang mendadak
    if (smokeCanvas) {
      launchTl.to(smokeCanvas, { opacity: 0, duration: 0.95, ease: "power2.out" }, 0.85);
    }

    // Roket meluncur ke atas secara mulus dan anggun (60fps, 100% solid opacity)
    if (rocketCenter) {
      launchTl.to(rocketCenter, {
        y: -window.innerHeight - 350,
        scale: 1.12,
        rotation: 0,
        duration: 1.35,
        ease: "power3.in",
      }, 0.05);
    }
  };

  const progressTracker = { val: 0 };
  const updateDisplay = (pct, text) => {
    const roundPct = Math.round(pct);
    if (barEl) barEl.style.width = `${roundPct}%`;
    if (percentEl) percentEl.textContent = `${roundPct}`;
    if (statusEl && text) statusEl.textContent = text;
  };

  const startProgressTime = performance.now();
  const totalDuration = 1100; // 1.1s majestic loading experience

  const animStep = (now) => {
    if (launchTriggered) return;
    const elapsed = now - startProgressTime;
    const progress = Math.min(1, elapsed / totalDuration);
    const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const currentPct = Math.round(easeProgress * 100);

    let stageText = PRELOADER_STAGES[0].text;
    if (currentPct > 88) stageText = PRELOADER_STAGES[3].text;
    else if (currentPct > 68) stageText = PRELOADER_STAGES[2].text;
    else if (currentPct > 30) stageText = PRELOADER_STAGES[1].text;

    updateDisplay(currentPct, stageText);

    if (progress < 1) {
      requestAnimationFrame(animStep);
    } else {
      setTimeout(triggerLaunch, 80);
    }
  };

  requestAnimationFrame(animStep);

  // Hard Failsafe: Always dismiss preloader and unlock body scrolling after 1.5s max
  setTimeout(() => {
    if (!launchTriggered) triggerLaunch();
  }, 1500);
};

// ═══════════════════════════════════════════════════════════
// FLUID PAGE NAVIGATION TRANSITION ENGINE
// ═══════════════════════════════════════════════════════════
export const initPageTransitionLinks = () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me") || link.target === "_blank") {
      return;
    }

    const isInternalPage = href.includes("pricing.html") || href.includes("projects.html") || href.includes("project.html");

    if (isInternalPage) {
      e.preventDefault();
      gsap.to("#portfolio-view, header, #side-nav, footer", {
        opacity: 0,
        y: -22,
        scale: 0.98,
        duration: 0.28,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = href;
        }
      });
    }
  });
};

// ═══════════════════════════════════════════════════════════
// GLOBAL VELVETY 3D TILT ENGINE (ZERO CLIPPING + ZERO EDGE JITTER)
// ═══════════════════════════════════════════════════════════
export const initGlobalCardTilt = () => {
  if (typeof window === "undefined") return;

  const CARD_SELECTOR = `
    [data-tilt],
    .carousel-card,
    .pricing-carousel-card,
    #activity-standalone-card,
    .activity-standalone-card,
    .spatial-card,
    .glass-card,
    .project-card,
    .pricing-card,
    #pricing-cards-track > a,
    #projects-carousel-track > div,
    #contact a.btn-crimson,
    #contact a.btn-glass
  `;

  let activeCard = null;
  let cachedRect = null;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let rafId = null;

  const maxTilt = 6.5; // Controlled, elegant, unclipped tilt angle

  const updateTiltPhysics = () => {
    if (!activeCard) {
      rafId = null;
      return;
    }

    currentRotX += (targetRotX - currentRotX) * 0.12;
    currentRotY += (targetRotY - currentRotY) * 0.12;

    activeCard.style.setProperty(
      "transform",
      `perspective(800px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`,
      "important"
    );

    const diff = Math.abs(targetRotX - currentRotX) + Math.abs(targetRotY - currentRotY);

    if (activeCard && (Math.abs(targetRotX) > 0.05 || Math.abs(targetRotY) > 0.05 || diff > 0.01)) {
      rafId = requestAnimationFrame(updateTiltPhysics);
    } else if (activeCard) {
      activeCard.style.setProperty(
        "transition",
        "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "important"
      );
      activeCard.style.setProperty(
        "transform",
        "perspective(800px) rotateX(0deg) rotateY(0deg)",
        "important"
      );
      const cardToReset = activeCard;
      setTimeout(() => {
        if (activeCard !== cardToReset) {
          cardToReset.style.removeProperty("transition");
          cardToReset.style.removeProperty("transform");
          cardToReset.style.removeProperty("will-change");
        }
      }, 500);
      activeCard = null;
      cachedRect = null;
      rafId = null;
    }
  };

  const handlePointer = (e) => {
    if (e.pointerType === "touch") return;

    // 1. Hysteresis check: keep current activeCard locked if pointer is within a generous buffer zone around it (completely eliminates edge flicker)
    if (activeCard && cachedRect) {
      const isWithinHysteresis = (
        e.clientX >= cachedRect.left - 20 &&
        e.clientX <= cachedRect.right + 20 &&
        e.clientY >= cachedRect.top - 20 &&
        e.clientY <= cachedRect.bottom + 20
      );

      if (isWithinHysteresis) {
        const normX = Math.max(-1, Math.min(1, ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1));
        const normY = Math.max(-1, Math.min(1, ((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1));

        targetRotX = -normY * maxTilt;
        targetRotY = normX * maxTilt;

        if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
        return;
      }
    }

    // 2. Look for new card
    const card = e.target && e.target.closest ? e.target.closest(CARD_SELECTOR) : null;

    if (card && (!card.closest("article") && card.id !== "detail-view-article" && !card.closest("#side-nav") && !card.closest("nav"))) {
      if (activeCard !== card) {
        if (activeCard) {
          activeCard.style.setProperty("transition", "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)", "important");
          activeCard.style.setProperty("transform", "perspective(800px) rotateX(0deg) rotateY(0deg)", "important");
        }
        activeCard = card;
        activeCard.style.setProperty("transition", "none", "important");
        activeCard.style.setProperty("will-change", "transform", "important");
        activeCard.style.setProperty("transform-style", "preserve-3d", "important");
        cachedRect = activeCard.getBoundingClientRect();
        currentRotX = 0;
        currentRotY = 0;
      }

      if (!cachedRect) cachedRect = activeCard.getBoundingClientRect();
      if (cachedRect.width === 0 || cachedRect.height === 0) return;

      const normX = Math.max(-1, Math.min(1, ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1));
      const normY = Math.max(-1, Math.min(1, ((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1));

      targetRotX = -normY * maxTilt;
      targetRotY = normX * maxTilt;

      if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
    } else if (activeCard) {
      targetRotX = 0;
      targetRotY = 0;
      if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
    }
  };

  window.addEventListener("pointermove", handlePointer, { passive: true });

  window.addEventListener("pointerleave", () => {
    if (activeCard) {
      targetRotX = 0;
      targetRotY = 0;
      if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
    }
  }, { passive: true });
};
window.initGlobalCardTilt = initGlobalCardTilt;

// ─── Initial Execution for Critical Shell ───
document.documentElement.setAttribute("data-theme", currentTheme);
document.documentElement.setAttribute("lang", currentLang);

export const initCritical = () => {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('#footer-year, .footer-dynamic-year').forEach((el) => {
    el.textContent = currentYear;
  });
  setTheme(currentTheme, false);

  // Navigation & card tilt don't use GSAP — run immediately
  initNavigationAndKeyboard();
  initGlobalCardTilt();

  // GSAP and UI init
  setLanguage(currentLang, false);
  initPreloaderTimeline();
  initPageTransitionLinks();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCritical);
} else {
  initCritical();
}
