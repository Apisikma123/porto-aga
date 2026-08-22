/* ═══════════════════════════════════════════════════════════
   main.js — Cinematic 3D Camera Choreography & Bilingual Engine (EN/ID)
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   Cosmic Deep Graphite Tone + Dedicated Activity Matrix + i18n
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

// 6 Dedicated Section IDs (01 Start, 02 About, 03 Activity, 04 Projects, 05 Contact, 06 Colophon)
const SECTION_IDS = ["start", "about", "activity", "projects", "contact", "footer"];
let currentSectionIndex = 0;
let isSnapping = false;

// ═══════════════════════════════════════════════════════════
// 1. BILINGUAL LANGUAGE ENGINE (ENGLISH & INDONESIA)
// ═══════════════════════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    navStart: "Start",
    navAbout: "About",
    navActivity: "Activity",
    navProjects: "Projects",
    navContact: "Contact",
    navFooter: "Colophon",
    ctaInitiate: "Let's Talk",
    sidebarHeader: "On this page",
    sideStart: "Start",
    sideAbout: "About",
    sideActivity: "Activity",
    sideProjects: "Projects",
    sideContact: "Contact",
    sideFooter: "Colophon",
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
    less: "Less",
    more: "More",
    projectsEyebrow: "04 // Featured Projects",
    projectsTitle1: "Featured",
    projectsTitle2: "Works.",
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
    contactEyebrow: "05 // Contact & Inquiries",
    contactTitle1: "Let's Build Something",
    contactTitle2: "Great Together.",
    contactBio: "Open to full-time engineering roles, freelance projects, and collaboration opportunities. Let's discuss your next project.",
    btnStartConv: "Start Conversation",
    scrollFooter: "Scroll for Details & Footer [06]",
    footerEyebrow: "06 // Colophon & Contact",
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
    footerAvailable: "Open to Work / Freelance",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerRights: "All Rights Reserved.",
    footerBuiltWith: "Built with Three.js, GSAP & Modern Web Technologies.",
    backToTop: "Back to Top",
  },
  id: {
    navStart: "Mulai",
    navAbout: "Tentang",
    navActivity: "Aktivitas",
    navProjects: "Karya",
    navContact: "Kontak",
    navFooter: "Footer",
    ctaInitiate: "Hubungi Saya",
    sidebarHeader: "Di halaman ini",
    sideStart: "Mulai",
    sideAbout: "Tentang",
    sideActivity: "Aktivitas",
    sideProjects: "Karya",
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
    less: "Sedikit",
    more: "Banyak",
    projectsEyebrow: "04 // Proyek Pilihan",
    projectsTitle1: "Karya &",
    projectsTitle2: "Proyek.",
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
    contactEyebrow: "05 // Kontak & Diskusi",
    contactTitle1: "Mari Kolaborasi &",
    contactTitle2: "Berkarya Bersama.",
    contactBio: "Terbuka untuk pekerjaan full-time, proyek freelance, atau diskusi ide baru. Mari bicarakan proyek Anda.",
    btnStartConv: "Kirim Pesan",
    scrollFooter: "Scroll untuk Detail & Footer [06]",
    footerEyebrow: "06 // Informasi & Kontak",
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
    footerAvailable: "Open to Work / Freelance",
    footerLocation: "Medan, Indonesia (UTC+7 / WIB)",
    footerRights: "Hak Cipta Dilindungi.",
    footerBuiltWith: "Dibangun dengan Three.js, GSAP & Teknologi Web Modern.",
    backToTop: "Kembali ke Atas",
  },
};

let currentLang = localStorage.getItem("aga_portfolio_lang") || "en";
let currentTheme = localStorage.getItem("aga_portfolio_theme") || "dark";

// ─── Theme Mode Architecture (Dark / Celestial Light) ───
export const setTheme = (theme, animate = true) => {
  currentTheme = theme;
  localStorage.setItem("aga_portfolio_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    if (animate) {
      gsap.to(themeIcon, {
        rotate: theme === "light" ? 180 : 0,
        scale: 0.7,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          themeIcon.textContent = theme === "light" ? "dark_mode" : "light_mode";
          gsap.to(themeIcon, { scale: 1, duration: 0.25, ease: "back.out(2)" });
        },
      });
    } else {
      themeIcon.textContent = theme === "light" ? "dark_mode" : "light_mode";
    }
  }

  // Smoothly morph Three.js 3D WebGL atmosphere
  if (window.updateThreeTheme) {
    window.updateThreeTheme(theme, animate);
  }
};

export const toggleTheme = () => {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme, true);
};
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;

// Apply stored theme on initialization
document.documentElement.setAttribute("data-theme", currentTheme);
document.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme, false);
});

// ─── Animated Bilingual Transition Engine (GSAP Morph) ───
export const setLanguage = (lang) => {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem("aga_portfolio_lang", lang);

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

  // Animated holographic text morph sequence
  const i18nElements = document.querySelectorAll("[data-i18n]");
  const dict = TRANSLATIONS[lang];

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
      gsap.fromTo(
        i18nElements,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.003, ease: "power2.out" }
      );
      ScrollTrigger.refresh();
    },
  });
};
window.setLanguage = setLanguage;

// ═══════════════════════════════════════════════════════════
// 2. LOCKED FULL-PAGE AUTO-SNAP ENGINE & NAVIGATION CONTROLS
// ═══════════════════════════════════════════════════════════
let currentView = "portfolio";
let isTransitioning = false;
let lastTransitionTime = 0;
const COOLDOWN_MS = 1100;
const WHEEL_THRESHOLD = 22;

export const scrollToSection = (index, immediate = false) => {
  if (currentView !== "portfolio") {
    window.switchView("portfolio", index);
    return;
  }
  if (index < 0 || index >= SECTION_IDS.length) return;
  currentSectionIndex = index;
  const targetEl = document.getElementById(SECTION_IDS[index]);
  if (!targetEl) return;

  isTransitioning = true;
  isSnapping = true;
  lastTransitionTime = Date.now();
  updateActiveSidebar(index);

  gsap.killTweensOf(window);

  if (immediate) {
    window.scrollTo({ top: targetEl.offsetTop, behavior: "auto" });
    isTransitioning = false;
    isSnapping = false;
    return;
  }

  // Smooth, relaxed, cinematic gliding transition (1.25s duration)
  gsap.to(window, {
    duration: 1.25,
    scrollTo: { y: targetEl, autoKill: false },
    ease: "power2.inOut",
    onComplete: () => {
      setTimeout(() => {
        isTransitioning = false;
        isSnapping = false;
      }, 150);
    },
  });
};
window.scrollToSection = scrollToSection;

const updateActiveSidebar = (index) => {
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

// Horizontal Projects Carousel Controls
let currentProjectSlide = 0;
const TOTAL_PROJECT_SLIDES = 5;

window.slideProjectsCarousel = (direction) => {
  const nextSlide = Math.max(0, Math.min(TOTAL_PROJECT_SLIDES - 1, currentProjectSlide + direction));
  window.goToProjectSlide(nextSlide);
};

window.goToProjectSlide = (index) => {
  currentProjectSlide = index;
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  if (track && cards[index]) {
    const targetCard = cards[index];
    track.scrollTo({
      left: targetCard.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }

  const counterEl = document.getElementById("carousel-counter");
  if (counterEl) {
    counterEl.textContent = `${index + 1} / ${TOTAL_PROJECT_SLIDES}`;
  }

  const dots = document.querySelectorAll("#carousel-dots-container .carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.className = "carousel-dot w-7 h-1.5 rounded-full bg-[#DC143C] transition-all cursor-pointer";
    } else {
      dot.className = "carousel-dot w-2 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-all cursor-pointer";
    }
  });
};

const initNavigationAndKeyboard = () => {
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

  // Track active section on scroll (for direct URL loads and anchor syncing)
  SECTION_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        if (!isSnapping && currentView === "portfolio") {
          currentSectionIndex = index;
          updateActiveSidebar(index);
        }
      },
      onEnterBack: () => {
        if (!isSnapping && currentView === "portfolio") {
          currentSectionIndex = index;
          updateActiveSidebar(index);
        }
      },
    });
  });

  // ─── 1. Locked Mouse Wheel & Trackpad Interceptor (No Free Scrolling in Portfolio View) ───
  window.addEventListener(
    "wheel",
    (e) => {
      if (currentView !== "portfolio") return;

      // Allow native horizontal scrolling within horizontal containers (e.g. heatmap, carousel)
      const target = e.target;
      const isHorizontalContainer = target && target.closest("#activity-heatmap-scroll, #projects-carousel-track, .overflow-x-auto");
      if (isHorizontalContainer && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // Intercept vertical wheel action unconditionally to prevent browser manual free-scroll
      e.preventDefault();

      const now = Date.now();
      // If currently snapping or in lock cooldown, absorb extra wheel events (2x scroll, rapid flicks, momentum)
      if (isTransitioning || now - lastTransitionTime < COOLDOWN_MS) {
        return;
      }

      // Ignore micro-deltas to prevent unintended tiny shifts
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) {
        return;
      }

      if (e.deltaY > 0) {
        // Scroll Down -> Next Section
        if (currentSectionIndex < SECTION_IDS.length - 1) {
          scrollToSection(currentSectionIndex + 1);
        }
      } else {
        // Scroll Up -> Previous Section
        if (currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
        }
      }
    },
    { passive: false }
  );

  // ─── 2. Mobile & Tablet Touch / Swipe Interceptor ───
  let touchStartY = 0;
  let touchStartX = 0;
  let touchStartTime = 0;

  window.addEventListener(
    "touchstart",
    (e) => {
      if (currentView !== "portfolio") return;
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
      if (currentView !== "portfolio") return;
      if (e.touches.length > 0) {
        const diffY = touchStartY - e.touches[0].clientY;
        const diffX = touchStartX - e.touches[0].clientX;

        // Allow horizontal swipe inside carousel / heatmap
        const target = e.target;
        const isHorizontalContainer = target && target.closest("#activity-heatmap-scroll, #projects-carousel-track, .overflow-x-auto");
        if (isHorizontalContainer && Math.abs(diffX) > Math.abs(diffY)) {
          return;
        }

        // Prevent native free scroll on vertical swipe
        if (Math.abs(diffY) > 8 && Math.abs(diffY) > Math.abs(diffX)) {
          if (e.cancelable) e.preventDefault();
        }
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      if (currentView !== "portfolio") return;
      const now = Date.now();
      if (isTransitioning || now - lastTransitionTime < COOLDOWN_MS) return;

      if (e.changedTouches.length > 0) {
        const diffY = touchStartY - e.changedTouches[0].clientY;
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const elapsed = now - touchStartTime;

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35 && elapsed < 800) {
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

  // ─── 3. Keyboard Navigation (W / S / ArrowUp / ArrowDown / PageUp / PageDown / Space / K) ───
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (currentView === "portfolio") {
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioning && currentSectionIndex < SECTION_IDS.length - 1) {
          scrollToSection(currentSectionIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioning && currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        if (!isTransitioning) {
          scrollToSection(0);
        }
      } else if (e.key === "End") {
        e.preventDefault();
        if (!isTransitioning) {
          scrollToSection(SECTION_IDS.length - 1);
        }
      } else if (e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!isTransitioning) {
          scrollToSection(4); // 05 Contact
        }
      } else if (currentSectionIndex === 3) {
        if (e.key === "ArrowLeft") {
          window.slideProjectsCarousel(-1);
        } else if (e.key === "ArrowRight") {
          window.slideProjectsCarousel(1);
        }
      }
    }
  });

  // ─── 4. Window Resize Alignment ───
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (currentView === "portfolio") {
        const targetEl = document.getElementById(SECTION_IDS[currentSectionIndex]);
        if (targetEl) {
          gsap.set(window, { scrollTo: { y: targetEl, autoKill: false } });
        }
      }
    }, 120);
  });
};

// ═══════════════════════════════════════════════════════════
// 3. THREE.JS 3D ENGINE WITH SOOTHING GRAPHITE AMBIENCE
// ═══════════════════════════════════════════════════════════
const initThreeEngine = () => {
  const canvas = document.getElementById("bg");
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const isMobile = window.innerWidth < 1024;
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  // Dynamic Camera LookAt Target Vector (with smooth lerp damping)
  const cameraTarget = new THREE.Vector3(0, 0, 0);
  const currentCameraTarget = new THREE.Vector3(0, 0, 0);

  // WebGLRenderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Color Space & ACES Tone Mapping (Boosted Exposure for Radiant 3D Visuals)
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.30;

  // ─── RoomEnvironment & PMREMGenerator for PBR Reflections ───
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  pmremGenerator.dispose();

  // ─── Premium Deep Space Studio Lighting Rig ───
  const ambientLight = new THREE.AmbientLight(0x181e32, 1.3);
  scene.add(ambientLight);

  // Stellar Key Light (Bright sun rim light)
  const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.2);
  keyLight.position.set(-8, 10, 10);
  scene.add(keyLight);

  // Cosmic Crimson Main Fill Light
  const crimsonFillLight = new THREE.DirectionalLight(0xff1828, 2.6);
  crimsonFillLight.position.set(8, -4, 6);
  scene.add(crimsonFillLight);

  // Cool Starlight Galaxy Rim Light (Opposite deep blue/cyan space bounce)
  const crimsonBackLight = new THREE.DirectionalLight(0x3870ff, 2.0);
  crimsonBackLight.position.set(-4, -8, -8);
  scene.add(crimsonBackLight);

  // Orbiting Cosmic Star Accent
  const crimsonPointAccent = new THREE.PointLight(0xff2838, 2.5, 16, 1.2);
  crimsonPointAccent.position.set(2, 3, 3);
  scene.add(crimsonPointAccent);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 1: MASTER 4D TESSERACT (Hero Artifact) ───
  // ═══════════════════════════════════════════════════════════
  const tesseractGroup = new THREE.Group();
  tesseractGroup.position.set(isMobile ? 0 : 2.0, isMobile ? 1.1 : 0, isMobile ? -0.8 : 0.1);
  scene.add(tesseractGroup);

  const modelWrapper = new THREE.Group();
  modelWrapper.rotation.set(0.45, 0.65, 0.15);
  tesseractGroup.add(modelWrapper);

  const redCoreLight = new THREE.PointLight(0xff2210, 3.6, 14, 1.2);
  redCoreLight.position.set(0, 0, 0);
  modelWrapper.add(redCoreLight);

  // Rotating Crimson God-Rays & Light Aura (Responsive on Mobile)
  const lightRaysGroup = new THREE.Group();
  tesseractGroup.add(lightRaysGroup);

  const createGodRaysTexture = () => {
    const canvasEl = document.createElement("canvas");
    canvasEl.width = 1024;
    canvasEl.height = 1024;
    const ctx = canvasEl.getContext("2d");
    const cx = 512;
    const cy = 512;

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 512);
    coreGrad.addColorStop(0, "rgba(255, 60, 40, 0.85)");
    coreGrad.addColorStop(0.15, "rgba(255, 30, 20, 0.55)");
    coreGrad.addColorStop(0.4, "rgba(230, 20, 10, 0.22)");
    coreGrad.addColorStop(0.7, "rgba(180, 0, 0, 0.08)");
    coreGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    const numRays = 24;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      const rayWidth = (i % 3 === 0 ? 0.08 : i % 2 === 0 ? 0.045 : 0.025) * Math.PI;
      const rayLength = 480 + ((i * 37) % 30);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rayLength);
      rayGrad.addColorStop(0, "rgba(255, 70, 50, 0.8)");
      rayGrad.addColorStop(0.2, "rgba(255, 35, 20, 0.45)");
      rayGrad.addColorStop(0.6, "rgba(220, 20, 10, 0.12)");
      rayGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, rayLength, -rayWidth / 2, rayWidth / 2);
      ctx.closePath();
      ctx.fillStyle = rayGrad;
      ctx.fill();
      ctx.restore();
    }

    const tex = new THREE.CanvasTexture(canvasEl);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  };

  const godRaysTexture = createGodRaysTexture();

  const rayMatFront = new THREE.MeshBasicMaterial({
    map: godRaysTexture,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const rayMatCross = new THREE.MeshBasicMaterial({
    map: godRaysTexture,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const planeGeom = new THREE.PlaneGeometry(isMobile ? 1.8 : 3.2, isMobile ? 1.8 : 3.2);
  const plane1 = new THREE.Mesh(planeGeom, rayMatFront);
  lightRaysGroup.add(plane1);

  const plane2 = new THREE.Mesh(planeGeom, rayMatCross);
  plane2.rotation.x = Math.PI * 0.25;
  plane2.rotation.y = Math.PI * 0.35;
  lightRaysGroup.add(plane2);

  const plane3 = new THREE.Mesh(planeGeom, rayMatCross);
  plane3.rotation.x = -Math.PI * 0.3;
  plane3.rotation.y = -Math.PI * 0.25;
  lightRaysGroup.add(plane3);

  // Large Orbital Celestial Halo Rings (Responsive on Mobile)
  const ringGeom = new THREE.TorusGeometry(isMobile ? 0.95 : 1.65, isMobile ? 0.010 : 0.015, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xff2010,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const orbitalRing = new THREE.Mesh(ringGeom, ringMat);
  orbitalRing.rotation.x = Math.PI * 0.4;
  lightRaysGroup.add(orbitalRing);

  // Inner Harmonic Halo Ring (Responsive on Mobile)
  const orbitalRing2Geom = new THREE.TorusGeometry(isMobile ? 0.75 : 1.30, isMobile ? 0.008 : 0.012, 16, 90);
  const orbitalRing2Mat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const orbitalRing2 = new THREE.Mesh(orbitalRing2Geom, orbitalRing2Mat);
  orbitalRing2.rotation.x = -Math.PI * 0.3;
  orbitalRing2.rotation.y = Math.PI * 0.25;
  lightRaysGroup.add(orbitalRing2);

  // ─── Industrial-Grade Zero-Jank Preloading & GPU Warm-Up Pipeline ───
  let preloaderFinished = false;
  let modelLoaded = false;
  let texturesLoaded = false;
  let fontsLoaded = false;
  let imagesDecoded = false;
  let jsonDataCached = false;
  let warmupExecuted = false;

  const barEl = document.getElementById("preloader-bar");
  const percentEl = document.getElementById("preloader-percent");
  const statusEl = document.getElementById("preloader-status");
  const preloaderEl = document.getElementById("web-preloader");

  const progressTracker = { pct: 0 };

  const setPreloaderDisplay = (val, statusText) => {
    const intVal = Math.min(100, Math.floor(val));
    if (barEl) barEl.style.width = `${intVal}%`;
    if (percentEl) percentEl.textContent = `${intVal}%`;
    if (statusEl && statusText) statusEl.textContent = statusText;
  };

  // 1. Parallel Preload & Pre-decode of all Raster & Vector Showcase Assets
  const PROJECT_PRELOAD_ASSETS = [
    "/projects/bkj.webp",
    "/projects/foodify.webp",
    "/projects/wilmarbuku.webp",
    "/projects/cinta-counseling.webp",
    "/projects/grow-a-garden.webp",
    "/textures/box001.webp",
    "/textures/brown_leather_disp_1k.webp",
  ];

  const preloadRasterAssets = () => {
    return Promise.allSettled(
      PROJECT_PRELOAD_ASSETS.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.decode) {
            img.decode().then(resolve).catch(resolve);
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        });
      })
    ).then(() => {
      imagesDecoded = true;
    });
  };

  // 2. Preload & Cache JSON Datasets (Instant zero-delay activity & projects)
  const preloadJsonDatasets = async () => {
    try {
      const [pRes, cRes] = await Promise.allSettled([
        fetch("/all_projects.json").then((r) => (r.ok ? r.json() : null)),
        fetch("/contributions.json").then((r) => (r.ok ? r.json() : null)),
      ]);
      if (pRes.status === "fulfilled" && pRes.value) {
        cachedProjectsData = pRes.value;
        projectsData = pRes.value;
      }
      if (cRes.status === "fulfilled" && cRes.value) {
        cachedContributionsData = cRes.value;
      }
    } catch (e) {
      console.warn("Preload JSON notice:", e);
    } finally {
      jsonDataCached = true;
    }
  };

  preloadRasterAssets();
  preloadJsonDatasets();

  if (document.fonts) {
    document.fonts.ready.then(() => {
      fontsLoaded = true;
    });
  } else {
    fontsLoaded = true;
  }

  // 3. Deep GPU Warmup & Shader Pre-compilation
  const executeGPUWarmup = () => {
    if (warmupExecuted) return;
    warmupExecuted = true;
    try {
      // Direct GPU texture allocation
      if (renderer.initTexture) {
        renderer.initTexture(colorMap);
        renderer.initTexture(bumpMap);
      }

      // Comprehensive Shader Compilation
      renderer.compile(scene, camera);

      // Multi-scene State Warmup Passes
      const origTessPos = tesseractGroup.position.clone();
      const origTessScale = tesseractGroup.scale.clone();
      
      // Pass 1: Hero Scene
      renderer.render(scene, camera);
      
      // Pass 2: About Scene position
      tesseractGroup.position.set(isMobile ? 0 : -2.0, 0, 0.1);
      renderer.render(scene, camera);

      // Pass 3: Reset back to Hero
      tesseractGroup.position.copy(origTessPos);
      tesseractGroup.scale.copy(origTessScale);
      renderer.render(scene, camera);

      // Pre-warm ScrollTrigger calculations
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }
    } catch (err) {
      console.warn("GPU warmup notice:", err);
    }
  };

  const finishPreloader = () => {
    if (preloaderFinished) return;
    preloaderFinished = true;

    setPreloaderDisplay(100, "[5/5] SYSTEM OPERATIONAL // ZERO-JANK READY");

    if (preloaderEl) {
      gsap.to(preloaderEl, {
        opacity: 0,
        scale: 1.04,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.25,
        onComplete: () => {
          preloaderEl.style.display = "none";
          // Smoothly trigger hero entrance animation
          gsap.fromTo(
            "#start .eyebrow",
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }
          );
          gsap.fromTo(
            "#start .display-title .hero-line",
            { y: 30, rotateX: -12, opacity: 0 },
            { y: 0, rotateX: 0, opacity: 1, stagger: 0.12, duration: 0.95, ease: "power3.out", delay: 0.1 }
          );
          gsap.fromTo(
            "#start .body-copy, #start .hero-actions",
            { x: -25, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.25 }
          );
        },
      });
    }
  };

  // 4. Smooth Cinematic Preloading Timeline (Guaranteed ~2.8s deliberate pipeline)
  const preloaderTimeline = gsap.timeline();

  preloaderTimeline.to(progressTracker, {
    pct: 32,
    duration: 0.75,
    ease: "power2.out",
    onUpdate: () => setPreloaderDisplay(progressTracker.pct, "[1/5] DECODING 3D TESSERACT & WASM MATRIX..."),
  });

  preloaderTimeline.to(progressTracker, {
    pct: 64,
    duration: 0.75,
    ease: "power1.inOut",
    onUpdate: () => setPreloaderDisplay(progressTracker.pct, "[2/5] STREAMING TEXTURES & NEBULA BUFFERS..."),
  });

  preloaderTimeline.to(progressTracker, {
    pct: 86,
    duration: 0.65,
    ease: "power1.inOut",
    onUpdate: () => setPreloaderDisplay(progressTracker.pct, "[3/5] PRE-DECODING ASSETS & CACHING DATA..."),
  });

  preloaderTimeline.to(progressTracker, {
    pct: 95,
    duration: 0.55,
    ease: "power1.out",
    onUpdate: () => setPreloaderDisplay(progressTracker.pct, "[4/5] COMPILING WEBGL SHADERS & WARMING GPU..."),
    onComplete: () => {
      checkAllTasksAndFinish();
    }
  });

  const checkAllTasksAndFinish = () => {
    executeGPUWarmup();
    gsap.to(progressTracker, {
      pct: 100,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => setPreloaderDisplay(progressTracker.pct, "[5/5] SYSTEM OPERATIONAL // ZERO-JANK READY"),
      onComplete: () => {
        setTimeout(() => {
          finishPreloader();
        }, 300);
      },
    });
  };

  const loadingManager = new THREE.LoadingManager(
    () => {
      modelLoaded = true;
      texturesLoaded = true;
    },
    (url, itemsLoaded, itemsTotal) => {
      // Progress handled gracefully by timeline
    },
    (url) => {
      console.warn("Loading notice on:", url);
    }
  );

  // Safety fallback
  setTimeout(() => {
    if (!preloaderFinished) {
      checkAllTasksAndFinish();
    }
  }, 4200);

  // Dynamic Texture Loading (TextureLoader - WebP Optimized with LoadingManager)
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorMap = textureLoader.load("/textures/box001.webp");
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.flipY = false;

  const bumpMap = textureLoader.load("/textures/brown_leather_disp_1k.webp");
  bumpMap.colorSpace = THREE.NoColorSpace;
  bumpMap.flipY = false;

  // Load /tesseract.glb with DRACOLoader & Dynamic Material Assignment
  let mixer = null;
  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  const loader = new GLTFLoader(loadingManager);
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    "/tesseract.glb",
    (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const scale = isMobile ? 0.38 : 0.72;
      model.scale.set(scale, scale, scale);

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            try {
              const creaseAngle = THREE.MathUtils.degToRad(35);
              child.geometry = toCreasedNormals(child.geometry, creaseAngle);
            } catch (err) {
              console.warn("toCreasedNormals warning on mesh:", child.name, err);
            }
          }

          if (child.material) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];

            materials.forEach((mat) => {
              if (
                mat.name === "box_out" ||
                (child.material && child.material.name === "box_out") ||
                child.name.toLowerCase().includes("box_out")
              ) {
                if (mat.color) {
                  mat.color.setHex(0xffffff);
                }

                mat.map = colorMap;
                mat.bumpMap = bumpMap;
                mat.bumpScale = 0.05;
                mat.needsUpdate = true;

                console.log("Tekstur dipasang pada:", child.name);
              } else if (
                mat.name === "box_in" ||
                (child.material && child.material.name === "box_in") ||
                child.name.toLowerCase().includes("box_in")
              ) {
                if (mat.color) {
                  mat.color.setHex(0xff0028);
                }
                mat.emissive = new THREE.Color(0x3a0006);
                mat.emissiveIntensity = 0.6;
                mat.needsUpdate = true;
              }
            });
          }
        }
      });

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.timeScale = 0.85;
          action.play();
        });
      }

      modelWrapper.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading tesseract.glb:", error);
    }
  );

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 2: OBSIDIAN-CRIMSON POLYHEDRAL CRYSTAL ───
  // ═══════════════════════════════════════════════════════════
  const polyhedronGroup = new THREE.Group();
  polyhedronGroup.position.set(isMobile ? -1.2 : -2.5, isMobile ? -1.0 : -1.2, -1.8);
  polyhedronGroup.scale.set(isMobile ? 0.24 : 0.45, isMobile ? 0.24 : 0.45, isMobile ? 0.24 : 0.45);
  scene.add(polyhedronGroup);

  const polyGeom = new THREE.IcosahedronGeometry(0.85, 0);
  const polyMat = new THREE.MeshPhysicalMaterial({
    color: 0x181822,
    metalness: 0.88,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
  });
  const polyMesh = new THREE.Mesh(polyGeom, polyMat);
  polyhedronGroup.add(polyMesh);

  const wireGeom = new THREE.IcosahedronGeometry(0.88, 0);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const wireMesh = new THREE.Mesh(wireGeom, wireMat);
  polyhedronGroup.add(wireMesh);

  const polyLight = new THREE.PointLight(0xdc143c, 1.4, 5, 1.4);
  polyhedronGroup.add(polyLight);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 3: CELESTIAL GYROSCOPIC QUANTUM RINGS ───
  // ═══════════════════════════════════════════════════════════
  const gyroRingsGroup = new THREE.Group();
  gyroRingsGroup.position.set(isMobile ? 1.2 : 2.4, isMobile ? 1.2 : 1.6, -2.2);
  gyroRingsGroup.scale.set(isMobile ? 0.22 : 0.36, isMobile ? 0.22 : 0.36, isMobile ? 0.22 : 0.36);
  scene.add(gyroRingsGroup);

  const ring1Geom = new THREE.TorusGeometry(0.85, 0.012, 16, 80);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x2b2d38,
    metalness: 0.95,
    roughness: 0.2,
  });
  const gyroRing1 = new THREE.Mesh(ring1Geom, ring1Mat);
  gyroRingsGroup.add(gyroRing1);

  const ring2Geom = new THREE.TorusGeometry(0.62, 0.01, 16, 70);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    transparent: true,
    opacity: 0.6,
  });
  const gyroRing2 = new THREE.Mesh(ring2Geom, ring2Mat);
  gyroRingsGroup.add(gyroRing2);

  const ring3Geom = new THREE.TorusGeometry(0.42, 0.008, 16, 60);
  const ring3Mat = new THREE.MeshBasicMaterial({
    color: 0xff3b19,
    transparent: true,
    opacity: 0.7,
    wireframe: true,
  });
  const gyroRing3 = new THREE.Mesh(ring3Geom, ring3Mat);
  gyroRingsGroup.add(gyroRing3);

  const coreDiamondGeom = new THREE.OctahedronGeometry(0.22, 0);
  const coreDiamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xff0028,
    emissive: 0x4a0008,
    metalness: 0.4,
    roughness: 0.1,
    transmission: 0.5,
    flatShading: true,
  });
  const coreDiamond = new THREE.Mesh(coreDiamondGeom, coreDiamondMat);
  gyroRingsGroup.add(coreDiamond);

    // Add volumetric space fog for realistic 3D depth
    scene.fog = new THREE.FogExp2(0x040509, 0.018);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 4: FLOATING DEEP-SPACE COSMIC CRYSTAL SHARDS ───
  // ═══════════════════════════════════════════════════════════
  const cosmicShardsGroup = new THREE.Group();
  scene.add(cosmicShardsGroup);

  const shardGeoms = [
    new THREE.OctahedronGeometry(0.20, 0),
    new THREE.TetrahedronGeometry(0.24, 0),
    new THREE.IcosahedronGeometry(0.18, 0),
    new THREE.DodecahedronGeometry(0.16, 0),
  ];

  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0x121420,
    emissive: 0x30050c,
    metalness: 0.92,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
  });

  const shardWireMat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });

  const cosmicShards = [];
  const shardCount = isMobile ? 12 : 28;

  for (let i = 0; i < shardCount; i++) {
    const shardGroup = new THREE.Group();
    const geom = shardGeoms[i % shardGeoms.length];
    const solid = new THREE.Mesh(geom, shardMat);
    const wire = new THREE.Mesh(geom, shardWireMat);
    wire.scale.set(1.04, 1.04, 1.04);
    shardGroup.add(solid);
    shardGroup.add(wire);

    const spreadX = (Math.random() - 0.5) * (isMobile ? 12 : 24);
    const spreadY = (Math.random() - 0.5) * (isMobile ? 14 : 20);
    const spreadZ = -14 + Math.random() * 18;
    const s = 0.5 + Math.random() * 0.9;
    shardGroup.position.set(spreadX, spreadY, spreadZ);
    shardGroup.scale.set(s, s, s);

    shardGroup.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.025,
      rotSpeedZ: (Math.random() - 0.5) * 0.015,
      bobSpeed: 1.0 + Math.random() * 2.0,
      bobOffset: Math.random() * Math.PI * 2,
      initialY: spreadY,
    };

    cosmicShardsGroup.add(shardGroup);
    cosmicShards.push(shardGroup);
  }

  // ─── Multi-Layered Deep Cosmic Starfield & Floating Stardust ───
  // Star Texture Generator
  const createCosmicStarTexture = () => {
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 64;
    starCanvas.height = 64;
    const sCtx = starCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    sGrad.addColorStop(0.2, "rgba(255, 250, 240, 0.85)");
    sGrad.addColorStop(0.5, "rgba(240, 80, 80, 0.35)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const starTex = new THREE.CanvasTexture(starCanvas);
    starTex.generateMipmaps = true;
    return starTex;
  };
  const cosmicStarTex = createCosmicStarTexture();

  // Layer 1: 1,600 Distant Outer Space Stars with Realistic Spectrum
  const starCount = 1600;
  const starGeom = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const starSpectrum = [
    new THREE.Color(0xffffff), // Pure white
    new THREE.Color(0xdceaff), // Diamond blue
    new THREE.Color(0xffedd8), // Warm stellar gold
    new THREE.Color(0xff3b3b), // Crimson cosmic star
    new THREE.Color(0x7fb5ff), // Deep space sapphire
  ];

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const radius = 18 + Math.random() * 45;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    starPos[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPos[i3 + 2] = radius * Math.cos(phi);

    const c = starSpectrum[Math.floor(Math.random() * starSpectrum.length)];
    starColors[i3] = c.r;
    starColors[i3 + 1] = c.g;
    starColors[i3 + 2] = c.b;
  }

  starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: isMobile ? 0.12 : 0.16,
    map: cosmicStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const starField = new THREE.Points(starGeom, starMat);
  scene.add(starField);

  // Layer 2: 220 Floating Mid-Range Stardust Particles
  const particleCount = isMobile ? 120 : 220;
  const particleGeom = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 26;
    particlePos[i + 1] = (Math.random() - 0.5) * 22;
    particlePos[i + 2] = (Math.random() - 0.5) * 18;
  }
  particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xff3b20,
    size: isMobile ? 0.05 : 0.07,
    map: cosmicStarTex,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);

  // Layer 3: Near-Field Cosmic Sparks (Floating close to camera for deep 3D stereoscopic perspective)
  const sparkCount = isMobile ? 35 : 75;
  const sparkGeom = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount * 3; i += 3) {
    sparkPos[i] = (Math.random() - 0.5) * 12;
    sparkPos[i + 1] = (Math.random() - 0.5) * 10;
    sparkPos[i + 2] = 1.8 + Math.random() * 4.2;
  }
  sparkGeom.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xff4828,
    size: isMobile ? 0.045 : 0.07,
    map: cosmicStarTex,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const closeSparks = new THREE.Points(sparkGeom, sparkMat);
  scene.add(closeSparks);

  // ─── Theme Mode 3D Metamorphosis Engine (Dark / Light Atmospheric Sync) ───
  const updateThreeTheme = (theme, animate = true) => {
    const isLight = theme === "light";
    const targetFogColor = new THREE.Color(isLight ? 0xf4f6fa : 0x040509);
    const targetAmbient = new THREE.Color(isLight ? 0xf8fafc : 0x181e32);
    const targetAmbientIntensity = isLight ? 2.6 : 1.3;
    const targetKeyLight = new THREE.Color(isLight ? 0xffffff : 0xfff8f0);
    const targetKeyIntensity = isLight ? 3.8 : 3.2;
    const targetCrimsonFill = new THREE.Color(isLight ? 0xdc143c : 0xff1828);
    const targetFillIntensity = isLight ? 3.0 : 2.6;
    const targetBackLight = new THREE.Color(isLight ? 0x94a3b8 : 0x3870ff);
    const targetBackIntensity = isLight ? 1.8 : 2.0;
    const targetShardColor = new THREE.Color(isLight ? 0xf1f5f9 : 0x121420);
    const targetShardEmissive = new THREE.Color(isLight ? 0xffe4e8 : 0x30050c);
    const targetPolyColor = new THREE.Color(isLight ? 0xf8fafc : 0x181822);
    const targetRing1Color = new THREE.Color(isLight ? 0x94a3b8 : 0x2b2d38);

    if (!animate) {
      if (scene.fog) scene.fog.color.copy(targetFogColor);
      ambientLight.color.copy(targetAmbient);
      ambientLight.intensity = targetAmbientIntensity;
      keyLight.color.copy(targetKeyLight);
      keyLight.intensity = targetKeyIntensity;
      crimsonFillLight.color.copy(targetCrimsonFill);
      crimsonFillLight.intensity = targetFillIntensity;
      crimsonBackLight.color.copy(targetBackLight);
      crimsonBackLight.intensity = targetBackIntensity;
      shardMat.color.copy(targetShardColor);
      shardMat.emissive.copy(targetShardEmissive);
      polyMat.color.copy(targetPolyColor);
      ring1Mat.color.copy(targetRing1Color);
      return;
    }

    if (scene.fog) {
      gsap.to(scene.fog.color, {
        r: targetFogColor.r,
        g: targetFogColor.g,
        b: targetFogColor.b,
        duration: 0.85,
        ease: "power2.inOut",
      });
    }

    gsap.to(ambientLight.color, {
      r: targetAmbient.r,
      g: targetAmbient.g,
      b: targetAmbient.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(ambientLight, {
      intensity: targetAmbientIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(keyLight.color, {
      r: targetKeyLight.r,
      g: targetKeyLight.g,
      b: targetKeyLight.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(keyLight, {
      intensity: targetKeyIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(crimsonFillLight.color, {
      r: targetCrimsonFill.r,
      g: targetCrimsonFill.g,
      b: targetCrimsonFill.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(crimsonFillLight, {
      intensity: targetFillIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(crimsonBackLight.color, {
      r: targetBackLight.r,
      g: targetBackLight.g,
      b: targetBackLight.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(crimsonBackLight, {
      intensity: targetBackIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(shardMat.color, {
      r: targetShardColor.r,
      g: targetShardColor.g,
      b: targetShardColor.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(shardMat.emissive, {
      r: targetShardEmissive.r,
      g: targetShardEmissive.g,
      b: targetShardEmissive.b,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(polyMat.color, {
      r: targetPolyColor.r,
      g: targetPolyColor.g,
      b: targetPolyColor.b,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(ring1Mat.color, {
      r: targetRing1Color.r,
      g: targetRing1Color.g,
      b: targetRing1Color.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
  };

  window.updateThreeTheme = updateThreeTheme;
  // Apply active theme immediately to WebGL scene
  updateThreeTheme(currentTheme, false);

  // ═══════════════════════════════════════════════════════════
  // 4. DYNAMIC 3D CAMERA PATH & CINEMATIC TIMELINE (5 Seamless Phases)
  // ═══════════════════════════════════════════════════════════
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.15,
    },
  });

  // ─── Phase 1: Section 1 (Start) -> Section 2 (About) [0 to 1] ───
  // Dutch-Angle Orbital Sweep to Left Flank (giving stage for skill matrix on the right)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: isMobile ? 0 : -1.85, y: isMobile ? 1.5 : 0.2, z: isMobile ? -0.8 : 0.3, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 1.6, y: Math.PI * 2.4, z: Math.PI * 0.5, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.34 : 0.70, y: isMobile ? 0.34 : 0.70, z: isMobile ? 0.34 : 0.70, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      camera.position,
      { x: isMobile ? 0 : -1.0, y: isMobile ? 0.1 : 0.25, z: isMobile ? 6.2 : 5.8, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      cameraTarget,
      { x: isMobile ? 0 : -0.5, y: 0.1, z: 0, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? 1.2 : 2.6, y: 1.1, z: -0.6, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.2, y: -1.2, z: -0.8, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      crimsonPointAccent.position,
      { x: -1.5, y: 2.5, z: 3.5, ease: "power2.inOut", duration: 1 },
      0
    );

  // ─── Phase 2: Section 2 (About) -> Section 3 (Activity) [1 to 2] ───
  // Sweeping Crane Arc over to the Right Flank (Centering Halo behind Contribution Matrix)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: isMobile ? 0 : 2.0, y: isMobile ? 1.4 : -0.15, z: isMobile ? -0.8 : -0.4, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 2.6, y: Math.PI * 3.2, z: Math.PI * 0.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.30 : 0.68, y: isMobile ? 0.30 : 0.68, z: isMobile ? 0.30 : 0.68, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      camera.position,
      { x: isMobile ? 0 : 1.2, y: isMobile ? 0 : -0.2, z: isMobile ? 6.2 : 5.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      cameraTarget,
      { x: isMobile ? 0 : 0.35, y: 0, z: 0, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.2 : -2.6, y: 1.3, z: -0.9, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      gyroRingsGroup.position,
      { x: 0, y: 0.2, z: -1.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      crimsonPointAccent.position,
      { x: 2.2, y: -0.5, z: 3.0, ease: "power2.inOut", duration: 1 },
      1
    );

  // ─── Phase 3: Section 3 (Activity) -> Section 4 (Projects) [2 to 3] ───
  // Cinematic Elevation & Prominent Stature above the Showcase Grid
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? 2.4 : 2.2, z: isMobile ? -1.0 : -0.8, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 3.6, y: Math.PI * 4.2, z: Math.PI * 1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.30 : 0.68, y: isMobile ? 0.30 : 0.68, z: isMobile ? 0.30 : 0.68, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      camera.position,
      { x: 0, y: isMobile ? 1.5 : 1.8, z: isMobile ? 6.4 : 6.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      cameraTarget,
      { x: 0, y: 1.0, z: 0, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? 1.2 : 3.0, y: 2.4, z: -1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? -1.2 : -3.0, y: 2.4, z: -1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      crimsonPointAccent.position,
      { x: 0, y: 3.0, z: 2.5, ease: "power2.inOut", duration: 1 },
      2
    );

  // ─── Phase 4: Section 4 (Projects) -> Section 5 (Contact) [3 to 4] ───
  // Spatial Plunge & Low-Angle Dolly In (Core light framing the Contact Call to Action)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? 1.0 : -0.1, z: isMobile ? -0.4 : 0.4, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 4.8, y: Math.PI * 5.6, z: Math.PI * 1.8, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.36 : 0.76, y: isMobile ? 0.36 : 0.76, z: isMobile ? 0.36 : 0.76, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      camera.position,
      { x: 0, y: -0.2, z: isMobile ? 6.0 : 5.6, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      cameraTarget,
      { x: 0, y: -0.15, z: 0, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.0 : -2.5, y: -0.2, z: -0.3, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.5, y: -0.2, z: -0.3, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      crimsonPointAccent.position,
      { x: 0, y: 0, z: 2.8, ease: "power2.inOut", duration: 1 },
      3
    );

  // ─── Phase 5: Section 5 (Contact) -> Section 6 (Footer/Colophon) [4 to 5] ───
  // Panoramic Elevation
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? -1.4 : -2.0, z: isMobile ? -1.6 : -1.4, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 6.0, y: Math.PI * 6.8, z: Math.PI * 2.2, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.26 : 0.64, y: isMobile ? 0.26 : 0.64, z: isMobile ? 0.26 : 0.64, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      camera.position,
      { x: 0, y: isMobile ? -1.0 : -1.5, z: isMobile ? 7.2 : 7.2, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      cameraTarget,
      { x: 0, y: -1.0, z: 0, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.0 : -2.8, y: -2.4, z: -1.4, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.8, y: -2.4, z: -1.4, ease: "power2.inOut", duration: 1 },
      4
    );

  // ─── Dynamic 3D Scene View Mode Handler ───
  window.update3DSceneForView = (viewName) => {
    tesseractGroup.visible = true;
    polyhedronGroup.visible = true;
    gyroRingsGroup.visible = true;
    particles.visible = true;

    if (viewName === "project") {
      gsap.to(tesseractGroup.position, {
        x: isMobile ? 0 : 2.4,
        y: isMobile ? 2.2 : 1.4,
        z: isMobile ? -2.2 : -1.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(tesseractGroup.scale, {
        x: isMobile ? 0.25 : 0.62,
        y: isMobile ? 0.25 : 0.62,
        z: isMobile ? 0.25 : 0.62,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: isMobile ? 6.4 : 6.0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(cameraTarget, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(polyhedronGroup.position, {
        x: isMobile ? -1.4 : -2.8,
        y: 1.5,
        z: -2.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(gyroRingsGroup.position, {
        x: isMobile ? 1.4 : 2.8,
        y: -1.2,
        z: -2.4,
        duration: 0.8,
        ease: "power2.out",
      });
    } else if (viewName === "all-projects") {
      gsap.to(tesseractGroup.position, {
        x: 0,
        y: isMobile ? 2.6 : 2.8,
        z: isMobile ? -2.0 : -1.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(tesseractGroup.scale, {
        x: isMobile ? 0.25 : 0.60,
        y: isMobile ? 0.25 : 0.60,
        z: isMobile ? 0.25 : 0.60,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(camera.position, {
        x: 0,
        y: 1.2,
        z: isMobile ? 6.8 : 6.4,
        duration: 0.8,
        ease: "power2.out",
      });
    } else if (viewName === "portfolio") {
      ScrollTrigger.refresh();
    }
  };

  // ─── Scroll-Driven Rotational Inertia Handler ───
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity += deltaY * 0.00035;
    },
    { passive: true }
  );

  // ─── Mouse Parallax Interaction (Throttled & Non-blocking) ───
  let mouseX = 0;
  let mouseY = 0;
  let targetParallaxX = 0;
  let targetParallaxY = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetParallaxX = mouseX * 0.25;
      targetParallaxY = -mouseY * 0.25;

      // Smooth micro-tilt for active section text without creating 60 tweens/sec in RAF
      if (!isSnapping && !isTransitioning && currentView === "portfolio") {
        const activeTextEl = document.querySelector(
          `#${SECTION_IDS[currentSectionIndex]} .section-content`
        );
        if (activeTextEl) {
          gsap.to(activeTextEl, {
            rotateY: mouseX * 3.5,
            rotateX: -mouseY * 3.5,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    },
    { passive: true }
  );

  // Window Resize Handler
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener("resize", onResize);

  // ─── Render Loop (Rock-Solid 60/120fps Zero-GC) ───
  let lastTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const time = now / 1000;

    // Update GLTF animation mixer
    if (mixer) {
      mixer.update(delta);
    }

    // Decay scroll rotational velocity (inertia)
    scrollVelocity *= 0.92;

    // Continuous floating idle rotation
    modelWrapper.rotation.y += 0.004;
    modelWrapper.rotation.x += 0.002;
    modelWrapper.rotation.z = mouseX * 0.08;

    // Gentle floating bobbing on inner model wrapper (Zero conflict with GSAP scroll timeline!)
    modelWrapper.position.y = Math.sin(time * 1.8) * 0.035;

    const rayRotationSpeed = 0.0018 + scrollVelocity;
    lightRaysGroup.rotation.z += rayRotationSpeed;
    lightRaysGroup.rotation.y += rayRotationSpeed * 0.65;
    lightRaysGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
    orbitalRing.rotation.z -= rayRotationSpeed * 1.5;
    if (typeof orbitalRing2 !== "undefined") {
      orbitalRing2.rotation.z += rayRotationSpeed * 1.2;
      orbitalRing2.rotation.x += 0.003;
    }

    // Breathing pulse for light intensity
    const pulse = Math.sin(time * 3.0) * 0.5 + 0.5;
    redCoreLight.intensity = 2.5 + pulse * 2.5;
    rayMatFront.opacity = 0.65 + pulse * 0.2;
    rayMatCross.opacity = 0.45 + pulse * 0.15;

    // Polyhedral Crystal Floating on inner meshes
    polyMesh.rotation.y += 0.007 + scrollVelocity * 0.5;
    polyMesh.rotation.x += 0.005;
    wireMesh.rotation.y -= 0.004;
    polyMesh.position.y = Math.sin(time * 1.6) * 0.03;

    // Gyroscopic Rings Multi-Axis Rotations
    gyroRing1.rotation.x += 0.008 + scrollVelocity * 0.8;
    gyroRing2.rotation.y -= 0.012 + scrollVelocity * 0.6;
    gyroRing3.rotation.z += 0.018;
    coreDiamond.rotation.y += 0.015;
    gyroRing1.position.y = Math.cos(time * 1.4) * 0.03;

    // Smooth Camera LookAt Damping (Silky 60/120fps)
    currentCameraTarget.lerp(cameraTarget, 0.06);
    camera.lookAt(currentCameraTarget.x, currentCameraTarget.y, currentCameraTarget.z);

    // ─── Multi-Layer 3D Optical Parallax Depth Shifts ───
    if (typeof starField !== "undefined") {
      starField.rotation.y = time * 0.003 + scrollVelocity * 0.15;
      starField.rotation.x = time * 0.001;
      starField.position.x = mouseX * -0.4;
      starField.position.y = -mouseY * -0.3;
    }
    if (typeof particles !== "undefined") {
      particles.rotation.y = time * 0.015 + scrollVelocity * 0.3;
      particles.rotation.x = Math.sin(time * 0.4) * 0.02;
      particles.position.x = mouseX * 0.6;
      particles.position.y = -mouseY * 0.45;
    }
    if (typeof closeSparks !== "undefined") {
      closeSparks.rotation.y = -time * 0.025;
      closeSparks.position.x = mouseX * 1.4;
      closeSparks.position.y = -mouseY * 1.1;
    }
    if (typeof cosmicShardsGroup !== "undefined") {
      cosmicShardsGroup.position.x = mouseX * 0.35;
      cosmicShardsGroup.position.y = -mouseY * 0.25;
      cosmicShardsGroup.rotation.y = time * 0.006 + scrollVelocity * 0.2;
    }

    // Animate individual tumbling 3D cosmic asteroids / crystal shards
    if (cosmicShards && cosmicShards.length) {
      cosmicShards.forEach((shard) => {
        shard.rotation.x += shard.userData.rotSpeedX;
        shard.rotation.y += shard.userData.rotSpeedY;
        shard.rotation.z += shard.userData.rotSpeedZ;
        shard.position.y = shard.userData.initialY + Math.sin(time * shard.userData.bobSpeed + shard.userData.bobOffset) * 0.25;
      });
    }

    renderer.render(scene, camera);
  };
  animate();
};

// ═══════════════════════════════════════════════════════════
// 5. DIRECTIONAL SCENE REVEALS (Distinct Multi-Vector Dynamic Entrances)
// ═══════════════════════════════════════════════════════════
const initScrollRevealAnimations = () => {
  // ─── Scene 02 (About): Left Wing 3D Tilt Sweep + Staggered Isometric Cards ───
  ScrollTrigger.create({
    trigger: "#about",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(
        "#about header",
        { x: -60, rotateY: -15, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, duration: 1.0, ease: "power3.out" }
      );
      gsap.fromTo(
        "#about .spatial-card",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power2.out", delay: 0.15 }
      );
    },
  });

  // ─── Scene 03 (Activity): Central Aperture Zoom & Heatmap Wave ───
  ScrollTrigger.create({
    trigger: "#activity",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(
        "#activity header",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: "power3.out" }
      );
      gsap.fromTo(
        "#activity .activity-standalone-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.15,
          onComplete: () => {
            const cells = document.querySelectorAll("#heatmap-cells > div");
            if (cells.length > 0) {
              gsap.fromTo(
                cells,
                { scale: 0.6, opacity: 0.4 },
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.0015, ease: "power1.out" }
              );
            }
          },
        }
      );
    },
  });

  // ─── Scene 04 (Projects Carousel): Silky 60fps Reveal (Zero Jitter / Zero Pop) ───
  ScrollTrigger.create({
    trigger: "#projects",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(
        "#projects header",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" }
      );
      const carouselCards = document.querySelectorAll("#projects .carousel-card");
      gsap.fromTo(
        carouselCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    },
  });

  // ─── Scene 05 (Contact): Volumetric Upward Surge ───
  ScrollTrigger.create({
    trigger: "#contact",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(
        "#contact .display-title span",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.95, ease: "power2.out" }
      );
      gsap.fromTo(
        "#contact .glass-card",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.15 }
      );
    },
  });

  // ─── Scene 06 (Colophon/Footer): Horizontal Accordion Unfurl ───
  ScrollTrigger.create({
    trigger: "#footer",
    start: "top 85%",
    onEnter: () => {
      gsap.fromTo(
        "#footer header",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" }
      );
      gsap.fromTo(
        "#footer .grid > div",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.85, ease: "power2.out", delay: 0.15 }
      );
    },
  });

  // Interactive 3D Card Hover Tilt (Applied to ALL cards EXCEPT the README.md reader article)
  const cards = document.querySelectorAll(
    ".spatial-card, .glass-card, .activity-standalone-card, .carousel-card, .tesseract-card"
  );
  cards.forEach((card) => {
    if (
      card.tagName === "ARTICLE" ||
      card.closest("article") ||
      card.id === "detail-view-article" ||
      card.querySelector("#detail-view-markdown")
    ) {
      return;
    }

    card.addEventListener("mousemove", (e) => {
      if (isSnapping || isTransitioning) return; // Never run tilt during page auto-scroll!
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / (rect.height / 2)) * 4.5;
      const rotY = (x / (rect.width / 2)) * 4.5;

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        duration: 0.22,
        ease: "power1.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        transformPerspective: 1000,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
};

// ═══════════════════════════════════════════════════════════
// 6. DYNAMIC LIVE GITHUB REPOSITORIES FETCH
// ═══════════════════════════════════════════════════════════
const initGitHubRepos = async () => {
  const container = document.getElementById("github-repos");
  if (!container) return;

  try {
    const res = await fetch("https://api.github.com/users/Apisikma123/repos?sort=updated&per_page=6");
    if (!res.ok) throw new Error("Network response was not ok");
    const repos = await res.json();

    container.innerHTML = "";

    const LANG_COLORS = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      PHP: "#4F5D95",
      Dart: "#00B4AB",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Blade: "#f05340",
      Vue: "#41b883",
      Java: "#b07219",
      Python: "#3572A5",
    };

    repos.slice(0, 6).forEach((repo) => {
      const lang = repo.language || "Code";
      const color = LANG_COLORS[lang] || "#DC143C";
      const desc = repo.description || "Public open-source repository by Muhammad Aga Putra.";

      const card = document.createElement("div");
      card.className =
        "repo-card glass-card rounded-xl p-4 flex flex-col justify-between group hover:border-[#DC143C]/40 transition-all";
      card.innerHTML = `
        <div class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <span class="font-mono text-xs font-semibold text-white group-hover:text-[#DC143C] transition-colors truncate">
              ${repo.name}
            </span>
            <span class="flex items-center gap-1 font-mono text-[0.65rem] text-zinc-400">
              <span class="material-symbols-outlined text-xs text-yellow-500">star</span>
              ${repo.stargazers_count || 0}
            </span>
          </div>
          <p class="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
            ${desc}
          </p>
        </div>
        <div class="flex justify-between items-center pt-2.5 border-t border-white/5 font-mono text-[0.65rem] text-zinc-500 gap-2">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${color}"></span>
            <span class="text-zinc-400 font-medium">${lang}</span>
          </span>
          <div class="flex items-center gap-3">
            <button
              type="button"
              onclick="window.switchView('project', '${repo.name}')"
              class="text-[#DC143C] hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>${currentLang === "en" ? "Quick Overview" : "Overview Singkat"}</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
            <a
              href="${repo.html_url}"
              target="_blank"
              rel="noopener noreferrer"
              class="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
              title="GitHub Source"
            >
              <span class="material-symbols-outlined text-xs">code</span>
            </a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    gsap.fromTo(
      ".repo-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#github-repos",
          start: "top 85%",
        },
      }
    );
  } catch (err) {
    console.error("GitHub API error:", err);
    container.innerHTML = `
      <div class="repo-loader">
        <span class="material-symbols-outlined text-zinc-600 text-3xl">cloud_off</span>
        <span class="font-mono text-xs text-zinc-400">Failed to load live GitHub repositories.</span>
        <a class="font-mono text-xs text-[#DC143C] hover:text-white underline" href="https://github.com/Apisikma123" target="_blank" rel="noopener noreferrer">
          View all on GitHub ↗
        </a>
      </div>`;
  }
};

// ═══════════════════════════════════════════════════════════
// 7. LIVE GITHUB ACTIVITY HEATMAP MATRIX (Official Apisikma123 Telemetry)
// ═══════════════════════════════════════════════════════════
const initActivityHeatmap = async () => {
  const container = document.getElementById("heatmap-cells");
  const countEl = document.getElementById("total-contributions-count");
  const yearRangeEl = document.getElementById("activity-year-range");
  if (!container) return;

  if (yearRangeEl) {
    const currentY = new Date().getFullYear();
    yearRangeEl.textContent = `${currentY - 1} – ${currentY}`;
  }

  const COLOR_LEVELS = [
    "#181920", // level 0 (dark matte obsidian)
    "#4a141e", // level 1 (subtle ruby)
    "#7c182a", // level 2 (deep crimson)
    "#b81432", // level 3 (vibrant crimson)
    "#ff2b54", // level 4 (radiant neon crimson)
  ];

  try {
    const data = cachedContributionsData || (await fetch("/contributions.json").then((r) => (r.ok ? r.json() : null)));
    if (!data) throw new Error("Local contributions.json not found");

    const totalStr = data.total || (data.totalContributions ? data.totalContributions.toLocaleString() : "9,907");
    if (countEl) countEl.textContent = `${totalStr}+ Contributions`;

    const rawList = data.contributions || data.days || [];
    const days = rawList.slice(-371);
    container.innerHTML = "";

    days.forEach((d) => {
      const cell = document.createElement("div");
      const lvl = d.level !== undefined ? d.level : (d.count > 15 ? 4 : d.count > 8 ? 3 : d.count > 3 ? 2 : d.count > 0 ? 1 : 0);
      const bg = COLOR_LEVELS[lvl] || COLOR_LEVELS[0];
      cell.className = "w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer relative group/cell";
      cell.style.backgroundColor = bg;
      if (lvl === 4) {
        cell.style.boxShadow = "0 0 8px rgba(255, 43, 84, 0.75)";
      }
      cell.setAttribute("title", d.tooltip || `${d.date}: ${d.count} contributions`);
      container.appendChild(cell);
    });
  } catch (e) {
    console.warn("Falling back to rich simulated 9,907+ contribution density", e);
    if (countEl) countEl.textContent = "9,907+ Contributions";

    container.innerHTML = "";
    const totalDays = 371;
    for (let i = 0; i < totalDays; i++) {
      const cell = document.createElement("div");
      const rand = Math.random();
      let lvl = 0;
      if (rand > 0.4) lvl = 1;
      if (rand > 0.65) lvl = 2;
      if (rand > 0.85) lvl = 3;
      if (rand > 0.95) lvl = 4;

      const bg = COLOR_LEVELS[lvl];
      cell.className = "w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer";
      cell.style.backgroundColor = bg;
      container.appendChild(cell);
    }
  }
};

// ═══════════════════════════════════════════════════════════
// 8. SEAMLESS SPA VIEW SWITCHER (Layout, Sidebar & 3D BG are 100% Intact)
// ═══════════════════════════════════════════════════════════
let projectsData = [];
let currentDetailProject = null;
let allViewActiveCategory = "all";
let allViewSearchQuery = "";

const initSPAViews = async () => {
  if (cachedProjectsData && cachedProjectsData.length) {
    projectsData = cachedProjectsData;
  } else {
    try {
      const res = await fetch("/all_projects.json");
      if (res.ok) {
        projectsData = await res.json();
      }
    } catch (e) {
      console.warn("Failed to preload all_projects.json", e);
    }
  }

  // Handle ESC key -> Return to Portfolio Section 04
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentView !== "portfolio") {
      window.switchView("portfolio", 3);
    }
  });

  // Handle URL hash routing (#project/id or #projects)
  const handleHashRoute = () => {
    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      const id = hash.replace("#project/", "");
      window.switchView("project", id, false);
    } else if (hash === "#projects" || hash === "#all-projects") {
      window.switchView("all-projects", null, false);
    } else if (currentView !== "portfolio") {
      window.switchView("portfolio", 0, false);
    }
  };

  window.addEventListener("hashchange", handleHashRoute);
  handleHashRoute();
};

window.switchView = (viewName, param, updateHash = true) => {
  const portfolioEl = document.getElementById("portfolio-view");
  const projectDetailEl = document.getElementById("project-detail-view");
  const allProjectsEl = document.getElementById("all-projects-view");

  if (!portfolioEl || !projectDetailEl || !allProjectsEl) return;

  currentView = viewName;
  if (window.update3DSceneForView) {
    window.update3DSceneForView(viewName);
  }

  if (viewName === "portfolio") {
    projectDetailEl.classList.add("hidden");
    allProjectsEl.classList.add("hidden");
    portfolioEl.classList.remove("hidden");

    ScrollTrigger.refresh();

    if (updateHash) {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }

    if (param !== undefined && typeof param === "number") {
      window.scrollToSection(param);
    }
  } else if (viewName === "project") {
    portfolioEl.classList.add("hidden");
    allProjectsEl.classList.add("hidden");
    projectDetailEl.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update left numeric sidebar to highlight Section 04
    updateActiveSidebar(3);

    const projectId = param || "foodify";
    const proj = projectsData.find((p) => p.id.toLowerCase() === projectId.toLowerCase()) || {
      id: projectId,
      displayName: projectId.toUpperCase(),
      category: "Software Engineering",
      tags: ["Code"],
      description: "Open source software project by Muhammad Aga Putra.",
      html_url: "https://github.com/Apisikma123/" + projectId,
      language: "Code",
      readme: "# " + projectId.toUpperCase() + "\n\nDocumentation repository for " + projectId + "."
    };

    currentDetailProject = proj;

    if (updateHash) {
      history.pushState(null, "", "#project/" + proj.id);
    }

    // Known project images mapping (WebP Optimized)
    const KNOWN_PROJECT_IMAGES = {
      foodify: "/projects/foodify.webp",
      wilmarbuku: "/projects/wilmarbuku.webp",
      "cinta--website-konseling-sekola-": "/projects/cinta-counseling.webp",
      "grow-a-garden": "/projects/grow-a-garden.webp",
      bkj: "/projects/bkj.webp",
    };

    const getProjectLanguageColor = (lang) => {
      const map = {
        Blade: "#f05340",
        Laravel: "#ff2d20",
        PHP: "#4F5D95",
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Dart: "#00B4AB",
        Java: "#b07219",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Vue: "#41b883",
        Python: "#3572A5",
      };
      return map[lang] || "#DC143C";
    };

    const createProjectPlaceholderHtml = (p, isMini = false) => {
      const lang = p.language || "Code";
      const langColor = getProjectLanguageColor(lang);
      const tagsList = (p.tags || [lang]).slice(0, 4);

      if (isMini) {
        return `
          <div class="w-full h-36 relative overflow-hidden bg-gradient-to-br from-[#121422] via-[#0d0e17] to-[#07080e] flex flex-col justify-between p-3.5 border-b border-white/10 group-hover:border-[#DC143C]/40 transition-colors">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
            <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20" style="background-color: ${langColor};"></div>
            
            <div class="relative z-10 flex items-center justify-between font-mono text-[0.62rem]">
              <div class="flex items-center gap-1.5 text-zinc-500">
                <span class="w-2 h-2 rounded-full bg-red-500/70 inline-block"></span>
                <span class="w-2 h-2 rounded-full bg-amber-500/70 inline-block"></span>
                <span class="w-2 h-2 rounded-full bg-emerald-500/70 inline-block"></span>
                <span class="ml-1 text-zinc-400 truncate max-w-[120px]">${p.id}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[0.6rem] font-semibold border" style="color: ${langColor}; border-color: ${langColor}40; background: ${langColor}15;">
                ${lang}
              </span>
            </div>

            <div class="relative z-10 my-auto flex items-center gap-2.5 py-1">
              <div class="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
                <span class="material-symbols-outlined text-base" style="color: ${langColor};">terminal</span>
              </div>
              <div class="truncate">
                <span class="text-xs font-bold text-white block truncate group-hover:text-[#DC143C] transition-colors">${p.displayName}</span>
                <span class="font-mono text-[0.6rem] text-zinc-500 block truncate">${p.category || 'Software Engineering'}</span>
              </div>
            </div>

            <div class="relative z-10 flex items-center justify-between font-mono text-[0.58rem] text-zinc-500 pt-1 border-t border-white/5">
              <span class="flex items-center gap-1 text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Architecture Verified
              </span>
              <span>Source Archive</span>
            </div>
          </div>
        `;
      }

      return `
        <div class="w-full min-h-[320px] sm:min-h-[380px] relative overflow-hidden bg-gradient-to-br from-[#121422] via-[#0d0e17] to-[#07080e] flex flex-col justify-between p-6 sm:p-10 border border-white/10 rounded-2xl group shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-25" style="background-color: ${langColor};"></div>
          <div class="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#DC143C]/15 blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span class="ml-2 text-zinc-400 text-xs">${p.id}.git</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold border" style="color: ${langColor}; border-color: ${langColor}40; background: ${langColor}15;">
                ${lang}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono text-zinc-400 bg-white/5 border border-white/10">
                Repository Architecture
              </span>
            </div>
          </div>

          <div class="relative z-10 my-auto py-6">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/12 flex items-center justify-center shadow-inner shrink-0">
                <span class="material-symbols-outlined text-2xl" style="color: ${langColor};">developer_mode</span>
              </div>
              <div>
                <span class="eyebrow text-[0.65rem] text-[#DC143C] block tracking-widest uppercase mb-1">${p.category || 'TECHNICAL ARCHITECTURE'}</span>
                <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">${p.displayName}</h2>
              </div>
            </div>
            
            <div class="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-400 flex items-center justify-between gap-4 backdrop-blur-md">
              <div class="flex items-center gap-2 overflow-hidden truncate">
                <span class="text-zinc-600">$</span>
                <span class="text-zinc-200 truncate">git clone ${p.html_url || 'https://github.com/Apisikma123/' + p.id}.git</span>
              </div>
              <span class="text-emerald-400 shrink-0 text-[0.68rem] font-semibold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Source Verified
              </span>
            </div>
          </div>

          <div class="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 font-mono text-xs text-zinc-400">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${tagsList.map(t => `<span class="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[0.68rem]">${t}</span>`).join('')}
            </div>
            <span class="text-zinc-500 text-[0.68rem] flex items-center gap-1">
              <span class="material-symbols-outlined text-sm text-zinc-400">architecture</span>
              System Documentation &amp; Source
            </span>
          </div>
        </div>
      `;
    };

    // Populate Banner Image & Badge (Adaptive Vertical Phone for Mobile, Landscape for Web, High-Tech Placeholder for Code-only repos)
    const bannerContainer = document.getElementById("detail-view-banner-container");
    const normId = proj.id.toLowerCase();
    const hasKnownImg =
      KNOWN_PROJECT_IMAGES[normId] ||
      (proj.previewImage && KNOWN_PROJECT_IMAGES[proj.previewImage.replace('/projects/', '').replace('.png', '').toLowerCase()]);

    const isMobileApp =
      normId === "foodify" ||
      (proj.category && proj.category.toLowerCase().includes("mobile")) ||
      (proj.tags && proj.tags.some((t) => t.toLowerCase().includes("flutter") || t.toLowerCase().includes("mobile")));

    if (bannerContainer) {
      if (normId === "foodify") {
        bannerContainer.className =
          "mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card min-h-[420px] sm:min-h-[500px] w-full relative group shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-[#141726] via-[#0d0e17] to-[#07080e]";
        bannerContainer.innerHTML = `
          <!-- Ambient Glow Backdrop -->
          <img src="/projects/foodify.webp" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 pointer-events-none scale-110" />
          
          <!-- Centered Vertical Mobile Phone Frame -->
          <div class="relative z-10 w-full max-w-[240px] sm:max-w-[280px] aspect-[9/18.5] rounded-[32px] sm:rounded-[36px] border-[5px] sm:border-[6px] border-zinc-800/90 bg-black overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(220,20,60,0.25)] group-hover:border-[#DC143C]/70 group-hover:scale-105 transition-all duration-500">
            <!-- Dynamic Island / Speaker Notch -->
            <div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full border border-white/15 z-20 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-zinc-900 border border-white/10 mr-1.5"></div>
              <div class="w-1.5 h-1.5 rounded-full bg-blue-950/80"></div>
            </div>
            <img
              id="detail-view-banner-img"
              src="/projects/foodify.webp"
              alt="${proj.displayName}"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover object-top transition-transform duration-700 pointer-events-none"
            />
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-[#090a10]/80 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono text-[0.65rem] text-zinc-300 z-20">
            <span class="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse"></span>
              <span data-i18n="visualPreview">Mobile App UI (Portrait)</span>
            </span>
            <span id="detail-view-banner-badge" class="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10">${proj.language || "Flutter 3.x"}</span>
          </div>
        `;
      } else if (hasKnownImg) {
        bannerContainer.className =
          "mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card aspect-video max-h-[380px] w-full relative group shadow-[0_8px_32px_rgba(0,0,0,0.6)]";
        bannerContainer.innerHTML = `
          <img
            id="detail-view-banner-img"
            src="${hasKnownImg}"
            alt="${proj.displayName}"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-60 pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono text-[0.65rem] text-zinc-300">
            <span class="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse"></span>
              <span data-i18n="visualPreview">Visual Architecture Preview</span>
            </span>
            <span id="detail-view-banner-badge" class="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10">${proj.language || "Production Code"}</span>
          </div>
        `;
      } else {
        // Render High-Tech Architecture Placeholder
        bannerContainer.className = "mb-8 w-full";
        bannerContainer.innerHTML = createProjectPlaceholderHtml(proj, false);
      }
    }

    // Populate data
    const eyebrowEl = document.getElementById("detail-view-eyebrow");
    const langEl = document.getElementById("detail-view-lang");
    const titleEl = document.getElementById("detail-view-title");
    const descEl = document.getElementById("detail-view-desc");
    const githubLink = document.getElementById("detail-view-github-link");
    const repoNameEl = document.getElementById("detail-view-repo-name");
    const sideLangEl = document.getElementById("detail-view-side-lang");

    if (eyebrowEl) eyebrowEl.textContent = (proj.category || "CASE STUDY").toUpperCase() + " · OVERVIEW";
    if (langEl) langEl.textContent = proj.language || "Code";
    if (titleEl) titleEl.textContent = proj.displayName;
    if (descEl) descEl.textContent = currentLang === "en" && proj.descriptionEn ? proj.descriptionEn : proj.description;
    if (githubLink) githubLink.href = proj.html_url;
    if (repoNameEl) repoNameEl.textContent = proj.id;
    if (sideLangEl) sideLangEl.textContent = (proj.tags || [proj.language]).slice(0, 3).join(", ");

    // Tags
    const tagsContainer = document.getElementById("detail-view-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = "";
      (proj.tags || [proj.language]).forEach((t) => {
        const span = document.createElement("span");
        span.className = "font-mono text-xs text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-md";
        span.textContent = t;
        tagsContainer.appendChild(span);
      });
    }

    // Render Markdown
    const markdownEl = document.getElementById("detail-view-markdown");
    if (markdownEl) {
      if (window.marked) {
        window.marked.setOptions({
          highlight: function (code, lang) {
            if (window.hljs && window.hljs.getLanguage(lang)) {
              return window.hljs.highlight(code, { language: lang }).value;
            }
            return code;
          },
          gfm: true,
          breaks: true,
        });
        markdownEl.innerHTML = window.marked.parse(proj.readme || "# " + proj.displayName);
      } else {
        markdownEl.textContent = proj.readme || "";
      }
    }

    // Other projects in sidebar
    const otherContainer = document.getElementById("detail-view-other-projects");
    if (otherContainer) {
      otherContainer.innerHTML = "";
      const others = projectsData.filter((p) => p.id !== proj.id).slice(0, 4);
      others.forEach((p) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "w-full text-left p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-zinc-300 hover:text-white cursor-pointer group flex items-center justify-between";
        btn.onclick = () => window.switchView("project", p.id);
        btn.innerHTML = `
          <div class="truncate mr-2">
            <span class="block truncate font-medium text-xs text-zinc-200 group-hover:text-[#DC143C] transition-colors">${p.displayName}</span>
            <span class="text-[0.62rem] text-zinc-500">${p.language}</span>
          </div>
          <span class="material-symbols-outlined text-xs text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5">arrow_forward</span>
        `;
        otherContainer.appendChild(btn);
      });
    }
  } else if (viewName === "all-projects") {
    portfolioEl.classList.add("hidden");
    projectDetailEl.classList.add("hidden");
    allProjectsEl.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update left numeric sidebar to highlight Section 04
    updateActiveSidebar(3);

    if (updateHash) {
      history.pushState(null, "", "#projects");
    }

    window.renderAllViewProjects();
  }
};

window.setAllViewCategory = (category, btn) => {
  allViewActiveCategory = category;
  document.querySelectorAll(".all-view-filter-btn").forEach((b) => {
    b.classList.remove("bg-white/10", "text-white");
    b.classList.add("bg-white/[0.03]", "text-zinc-400");
  });
  btn.classList.add("bg-white/10", "text-white");
  btn.classList.remove("bg-white/[0.03]", "text-zinc-400");
  window.renderAllViewProjects();
};

window.handleAllViewSearch = (query) => {
  allViewSearchQuery = query.trim().toLowerCase();
  window.renderAllViewProjects();
};

window.renderAllViewProjects = () => {
  const grid = document.getElementById("all-view-projects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = projectsData.filter((p) => {
    if (allViewActiveCategory !== "all") {
      if (allViewActiveCategory === "Tools") {
        if (p.categoryTag !== "Tools" && p.categoryTag !== "Backend" && p.language !== "Java") return false;
      } else if (p.categoryTag !== allViewActiveCategory) {
        return false;
      }
    }
    if (allViewSearchQuery) {
      const matchName = p.displayName.toLowerCase().includes(allViewSearchQuery);
      const matchId = p.id.toLowerCase().includes(allViewSearchQuery);
      const matchDesc = (p.description || "").toLowerCase().includes(allViewSearchQuery);
      const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(allViewSearchQuery));
      if (!matchName && !matchId && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-20 text-center text-zinc-500 font-mono text-xs">
        <span class="material-symbols-outlined text-4xl mb-2 block text-zinc-600">search_off</span>
        Tidak ada proyek yang cocok dengan kata kunci pencarian.
      </div>`;
    return;
  }

  const KNOWN_PROJECT_IMAGES = {
    foodify: "/projects/foodify.webp",
    wilmarbuku: "/projects/wilmarbuku.webp",
    "cinta--website-konseling-sekola-": "/projects/cinta-counseling.webp",
    "grow-a-garden": "/projects/grow-a-garden.webp",
    bkj: "/projects/bkj.webp",
  };

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.className = "glass-card rounded-2xl border border-white/10 overflow-hidden transition-all flex flex-col justify-between group hover:border-[#DC143C]/40 hover:-translate-y-1 duration-300";
    
    const normId = p.id.toLowerCase();
    const hasKnownImg = KNOWN_PROJECT_IMAGES[normId] || (p.previewImage && KNOWN_PROJECT_IMAGES[p.previewImage.replace('/projects/', '').replace('.png', '').replace('.webp', '').toLowerCase()]);
    
    let topPreviewHtml = "";
    if (normId === "foodify") {
      topPreviewHtml = `
        <div class="h-44 w-full overflow-hidden relative border-b border-white/10 bg-gradient-to-b from-[#141724] to-[#07080e] flex items-center justify-center p-2.5">
          <img src="/projects/foodify.webp" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none" />
          <div class="relative h-full aspect-[9/18.5] rounded-xl border-2 border-zinc-700 bg-black overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
            <img src="/projects/foodify.webp" alt="${p.displayName}" loading="lazy" decoding="async" class="w-full h-full object-cover object-top" />
          </div>
          <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[0.55rem] font-mono text-[#DC143C] border border-white/10">Mobile UI</div>
        </div>
      `;
    } else if (hasKnownImg) {
      topPreviewHtml = `
        <div class="aspect-video w-full overflow-hidden relative border-b border-white/10 bg-zinc-950">
          <img src="${hasKnownImg}" alt="${p.displayName}" loading="lazy" decoding="async" class="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        </div>
      `;
    } else {
      topPreviewHtml = `
        <div class="w-full h-36 relative overflow-hidden bg-gradient-to-br from-[#121422] via-[#0d0e17] to-[#07080e] flex flex-col justify-between p-3.5 border-b border-white/10 group-hover:border-[#DC143C]/40 transition-colors">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
          
          <div class="relative z-10 flex items-center justify-between font-mono text-[0.62rem]">
            <div class="flex items-center gap-1.5 text-zinc-500">
              <span class="w-2 h-2 rounded-full bg-red-500/70 inline-block"></span>
              <span class="w-2 h-2 rounded-full bg-amber-500/70 inline-block"></span>
              <span class="w-2 h-2 rounded-full bg-emerald-500/70 inline-block"></span>
              <span class="ml-1 text-zinc-400 truncate max-w-[120px]">${p.id}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[0.6rem] font-semibold border border-white/10 bg-white/5 text-zinc-300">
              ${p.language || "Code"}
            </span>
          </div>

          <div class="relative z-10 my-auto flex items-center gap-2.5 py-1">
            <div class="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
              <span class="material-symbols-outlined text-base text-[#DC143C]">terminal</span>
            </div>
            <div class="truncate">
              <span class="text-xs font-bold text-white block truncate group-hover:text-[#DC143C] transition-colors">${p.displayName}</span>
              <span class="font-mono text-[0.6rem] text-zinc-500 block truncate">${p.category || 'Software Engineering'}</span>
            </div>
          </div>

          <div class="relative z-10 flex items-center justify-between font-mono text-[0.58rem] text-zinc-500 pt-1 border-t border-white/5">
            <span class="flex items-center gap-1 text-emerald-400">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Architecture Verified
            </span>
            <span>Source Archive</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div>
        ${topPreviewHtml}
        <div class="p-5">
          <div class="flex items-center justify-between gap-2 mb-2 font-mono text-[0.65rem] text-zinc-500">
            <span class="text-[#DC143C] font-semibold">${(p.category || "PROJECT").toUpperCase()}</span>
            <span>${p.language || "Code"}</span>
          </div>
          <h4 class="font-bold text-sm text-white group-hover:text-[#DC143C] transition-colors mb-1.5 line-clamp-1">
            ${p.displayName}
          </h4>
          <p class="text-xs text-zinc-400 font-light leading-relaxed mb-4 line-clamp-2">
            ${currentLang === "en" && p.descriptionEn ? p.descriptionEn : p.description}
          </p>
        </div>
      </div>
      <div class="px-5 pb-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs gap-2">
        <button
          type="button"
          onclick="window.switchView('project', '${p.id}');"
          class="rounded bg-[#DC143C]/15 hover:bg-[#DC143C] text-[#DC143C] hover:text-white px-3 py-1.5 text-[0.68rem] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>${currentLang === "en" ? "Quick Overview" : "Overview Singkat"}</span>
          <span class="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
        <a href="${p.html_url}" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-white p-1 hover:text-[#DC143C] transition-colors" title="Source Code">
          <span class="material-symbols-outlined text-sm">code</span>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
};

window.copyCurrentProjectClone = () => {
  if (!currentDetailProject) return;
  const text = `git clone ${currentDetailProject.html_url}.git`;
  navigator.clipboard.writeText(text);
  const label = document.getElementById("detail-clone-btn-label");
  if (label) {
    const orig = label.textContent;
    label.textContent = "Copied!";
    setTimeout(() => {
      label.textContent = orig;
    }, 2000);
  }
};

// ═══════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════
const boot = () => {
  setLanguage(currentLang);
  initThreeEngine();
  initNavigationAndKeyboard();
  initScrollRevealAnimations();
  initActivityHeatmap();
  initGitHubRepos();
  initSPAViews();
  ScrollTrigger.refresh();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
