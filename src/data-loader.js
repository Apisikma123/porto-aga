/* ═══════════════════════════════════════════════════════════
   data-loader.js — Dynamic Projects, GitHub Sync, Heatmap & Projects Showcase
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

let _gsap = typeof window !== "undefined" ? window.gsap : null;
export const getGsap = async () => {
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 1024 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReduced) return null;
  }
  if (_gsap) return _gsap;
  if (typeof window !== "undefined" && window.gsap) return (_gsap = window.gsap);
  try {
    const mod = await import("gsap");
    _gsap = mod.gsap || mod.default || mod;
    if (typeof window !== "undefined") window.gsap = _gsap;
    return _gsap;
  } catch (e) {
    return null;
  }
};

const gsap = {
  fromTo: (...args) => {
    if (_gsap) return _gsap.fromTo(...args);
    getGsap().then((g) => { if (g) g.fromTo(...args); });
  },
  set: (...args) => {
    if (_gsap) return _gsap.set(...args);
    getGsap().then((g) => { if (g) g.set(...args); });
  },
  to: (...args) => {
    if (_gsap) return _gsap.to(...args);
    getGsap().then((g) => { if (g) g.to(...args); });
  },
  killTweensOf: (...args) => {
    if (_gsap && typeof _gsap.killTweensOf === "function") return _gsap.killTweensOf(...args);
    getGsap().then((g) => { if (g && typeof g.killTweensOf === "function") g.killTweensOf(...args); });
  }
};

const yieldToMain = () => {
  if (typeof scheduler !== "undefined" && typeof scheduler.yield === "function") {
    return scheduler.yield();
  }
  return new Promise((resolve) => {
    if (typeof MessageChannel !== "undefined") {
      const channel = new MessageChannel();
      channel.port1.onmessage = () => {
        channel.port1.close();
        channel.port2.close();
        resolve();
      };
      channel.port2.postMessage(null);
    } else {
      setTimeout(resolve, 0);
    }
  });
};
import { currentLang, getProtectedWhatsAppNumber } from "./critical.js";
import { marked } from "marked";
// highlight.js & atom-one-dark theme loaded lazily (964KB deferred from critical path)
let _hljs = null;
const ensureHljs = async () => {
  if (_hljs) return _hljs;
  const [mod] = await Promise.all([
    import("highlight.js"),
    import("highlight.js/styles/atom-one-dark.css"),
  ]);
  _hljs = mod.default;
  return _hljs;
};
const lazyHighlightAll = (container) => {
  const blocks = container.querySelectorAll("pre code");
  if (!blocks.length) return;
  ensureHljs().then((hljs) => {
    blocks.forEach((b) => {
      try { hljs.highlightElement(b); } catch (e) {}
    });
  });
};

marked.use({
  gfm: true,
  breaks: true,
});

const renderMarkdownContent = (text) => {
  if (!text) return "";
  try {
    const res = marked.parse(text);
    return typeof res === "string" ? res : (res?.toString?.() || text);
  } catch (e) {
    console.warn("Markdown parse error:", e);
    return text;
  }
};

export let cachedProjectsData = null;
export let cachedContributionsData = null;
export let projectsData = [];

// ═══════════════════════════════════════════════════════════
// HORIZONTAL PROJECTS CAROUSEL CONTROLLER (Section 04)
// ═══════════════════════════════════════════════════════════
let currentProjectSlide = 0;
const TOTAL_PROJECT_SLIDES = 6;

export const FEATURED_PROJECTS = [
  {
    id: "bkj",
    repoUrl: "https://github.com/Apisikma123/bkj",
    imgSrc: "/projects/bkj.webp",
    imgAlt: "BKJ Group Indonesia — Logistics Portal",
    imgWidth: 640,
    imgHeight: 340,
    isFeaturedBadge: false,
    tagI18n: "projBkjTag",
    tagFallback: "Enterprise · Maritime Logistics",
    statusI18n: "projBkjStatus",
    statusFallback: "Archived System",
    titleI18n: "projBkjTitle",
    titleFallback: "BKJ Group Indonesia — Logistics Portal",
    descI18n: "projBkjDesc",
    descFallback: "Integrated enterprise maritime logistics and corporate platform built for PT Berkah Kapal Jaya with full CMS, subsidiary routing, and bilingual localization (archived).",
    tags: ["Laravel 13", "Tailwind v4", "Alpine.js", "MySQL"],
    isPhoneMockup: false,
  },
  {
    id: "pratama-tehnik",
    repoUrl: "https://github.com/Apisikma123/landing-page",
    imgSrc: "/projects/pratama-tehnik.webp",
    imgAlt: "Pratama Tehnik Service — Repair Booking Portal",
    imgWidth: 1024,
    imgHeight: 508,
    isFeaturedBadge: true,
    tagI18n: "projPratamaTag",
    tagFallback: "Production Web · UMKM Service Portal",
    statusI18n: "projPratamaStatus",
    statusFallback: "pratama-tehnik.com",
    titleI18n: "projPratamaTitle",
    titleFallback: "Pratama Tehnik Service — Repair Booking Portal",
    descI18n: "projPratamaDesc",
    descFallback: "Engineered a high-converting service booking portal for an on-demand appliance repair business in Jakarta, featuring direct WhatsApp dispatch, fault diagnosis calculator, and local SEO schema.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "SEO Schema"],
    isPhoneMockup: false,
  },
  {
    id: "foodify",
    repoUrl: "https://github.com/Apisikma123/foodify",
    imgSrc: "/projects/foodify.webp",
    imgAlt: "FOODIFY — Food Delivery App",
    imgWidth: 320,
    imgHeight: 640,
    isFeaturedBadge: false,
    tagI18n: "proj1Tag",
    tagFallback: "Mobile App · Geolocation",
    statusI18n: "proj1Status",
    statusFallback: "Production",
    titleI18n: "proj1Title",
    titleFallback: "FOODIFY — Food Delivery App",
    descI18n: "proj1Desc",
    descFallback: "Modern food delivery mobile app tailored for Medan City featuring interactive OpenStreetMap, GPS detection, and real-time simulated driver delivery tracking.",
    tags: ["Flutter 3.x", "Dart", "OpenStreetMap", "Provider"],
    isPhoneMockup: true,
  },
  {
    id: "wilmarbuku",
    repoUrl: "https://github.com/Apisikma123/wilmarbuku",
    imgSrc: "/projects/wilmarbuku.webp",
    imgAlt: "Wilmar Buku — Library Donation Platform",
    imgWidth: 640,
    imgHeight: 340,
    isFeaturedBadge: true,
    tagI18n: "proj2Tag",
    tagFallback: "Fullstack · Donation Engine",
    statusI18n: "proj2Status",
    statusFallback: "donasi-buku.wbi.ac.id",
    titleI18n: "proj2Title",
    titleFallback: "Wilmar Buku — Donation System",
    descI18n: "proj2Desc",
    descFallback: "Centralized library donation platform live at donasi-buku.wbi.ac.id built with TALL stack, Google OAuth 2.0, automated PDF reporting, and real-time WebSockets via Laravel Reverb.",
    tags: ["Laravel 13", "Tailwind CSS", "Alpine.js", "Reverb WebSockets"],
    isPhoneMockup: false,
  },
  {
    id: "cinta--website-konseling-sekola-",
    repoUrl: "https://github.com/Apisikma123/cinta--website-konseling-sekola-",
    imgSrc: "/projects/cinta-counseling.webp",
    imgAlt: "CINTA — School Counseling Platform",
    imgWidth: 640,
    imgHeight: 340,
    isFeaturedBadge: false,
    tagI18n: "proj3Tag",
    tagFallback: "School & Counseling · Web",
    statusI18n: "proj3Status",
    statusFallback: "Production",
    titleI18n: "proj3Title",
    titleFallback: "CINTA — School Counseling Platform",
    descI18n: "proj3Desc",
    descFallback: "Anonymous grievance reporting and counseling web application empowering students and BK teachers with end-to-end privacy and intuitive case management.",
    tags: ["Laravel", "Blade", "Tailwind CSS", "Vite"],
    isPhoneMockup: false,
  },
  {
    id: "Grow-a-garden",
    repoUrl: "https://github.com/Apisikma123/Grow-a-garden",
    imgSrc: "/projects/grow-a-garden.webp",
    imgAlt: "Grow a Garden — Urban Farming Platform",
    imgWidth: 640,
    imgHeight: 340,
    isFeaturedBadge: false,
    tagI18n: "proj4Tag",
    tagFallback: "Agritech · Smart Farming",
    statusI18n: "proj4Status",
    statusFallback: "Production",
    titleI18n: "proj4Title",
    titleFallback: "Grow a Garden — Urban Farming",
    descI18n: "proj4Desc",
    descFallback: "Digital garden management platform for home gardens and hydroponics with smart spatial mapping, soil health tracking, and automated growth calendar.",
    tags: ["Laravel", "Blade", "Tailwind CSS", "JavaScript"],
    isPhoneMockup: false,
  },
];

export const createFeaturedProjectCardElement = (item, idx) => {
  const card = document.createElement("div");
  card.className = "carousel-card glass-card spatial-card w-full flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/85 overflow-hidden select-none cursor-pointer group hover:border-[#DC143C]/40 transition-colors";
  card.dataset.tilt = "true";
  card.dataset.slideIndex = idx;
  card.onclick = (e) => {
    if (e.target.closest("a, button")) return;
    window.location.href = `/project.html?id=${encodeURIComponent(item.id)}`;
  };

  let mediaHtml = "";
  if (item.isPhoneMockup) {
    mediaHtml = `
      <div class="aspect-[16/9] sm:aspect-[21/8.5] max-h-[190px] sm:max-h-[280px] w-full overflow-hidden relative border-b border-white/10 bg-gradient-to-b from-[#141724] via-[#0d0e17] to-[#07080e] flex items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-tr from-[#DC143C]/20 via-[#FF5500]/15 to-transparent blur-xl opacity-60 pointer-events-none"></div>
        <img
          alt="${item.imgAlt}"
          class="relative z-10 h-full w-auto max-h-[175px] sm:max-h-[250px] max-w-[180px] object-contain py-2 opacity-95 pointer-events-none"
          src="${item.imgSrc}"
          width="${item.imgWidth}"
          height="${item.imgHeight}"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          draggable="false"
          sizes="(max-width: 640px) 140px, 220px"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        ${item.isFeaturedBadge ? '<span class="absolute top-3 right-3 font-mono text-xs bg-[#DC143C] text-white px-2 py-0.5 rounded font-bold tracking-wider uppercase shadow-sm">Featured</span>' : ""}
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="aspect-[16/9] sm:aspect-[21/8.5] max-h-[190px] sm:max-h-[280px] w-full overflow-hidden relative border-b border-white/10 bg-zinc-950">
        <img
          alt="${item.imgAlt}"
          class="w-full h-full object-cover object-top opacity-90 pointer-events-none"
          src="${item.imgSrc}"
          width="${item.imgWidth}"
          height="${item.imgHeight}"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          draggable="false"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        ${item.isFeaturedBadge ? '<span class="absolute top-3 right-3 font-mono text-xs bg-[#DC143C] text-white px-2 py-0.5 rounded font-bold tracking-wider uppercase shadow-sm">Featured</span>' : ""}
      </div>
    `;
  }

  const tagsHtml = item.tags
    .map((tag) => `<span class="px-2 sm:px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-xs">${tag}</span>`)
    .join("\n                    ");

  card.innerHTML = `
    <div class="block select-none">
      ${mediaHtml}
      <div class="p-4 sm:p-6 md:p-7">
        <div class="flex justify-between items-center mb-1.5 sm:mb-2">
          <span class="eyebrow text-xs text-[#FF385C]" data-i18n="${item.tagI18n}">${item.tagFallback}</span>
          <span class="font-mono text-xs text-[#FF385C] font-semibold" data-i18n="${item.statusI18n}">${item.statusFallback}</span>
        </div>
        <h3 class="font-bold text-base sm:text-xl md:text-2xl text-white mb-1.5 sm:mb-2 line-clamp-1" data-i18n="${item.titleI18n}">
          ${item.titleFallback}
        </h3>
        <p class="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-3 sm:mb-4 max-w-xl line-clamp-2 sm:line-clamp-none break-words" style="max-width: 60ch;" data-i18n="${item.descI18n}">
          ${item.descFallback}
        </p>
        <div class="flex gap-1.5 sm:gap-2 flex-wrap font-mono text-xs text-zinc-400">
          ${tagsHtml}
        </div>
      </div>
    </div>
  `;

  return card;
};

export const renderFeaturedProjectsCarousel = () => {
  const track = document.getElementById("projects-carousel-track");
  if (!track) return;

  track.innerHTML = "";
  const fragment = document.createDocumentFragment();
  FEATURED_PROJECTS.forEach((item, idx) => {
    fragment.appendChild(createFeaturedProjectCardElement(item, idx));
  });
  track.appendChild(fragment);

  const dotsContainer = document.getElementById("carousel-dots-container");
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    FEATURED_PROJECTS.forEach((item, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "p-2 -m-1 inline-flex items-center justify-center cursor-pointer";
      btn.setAttribute("aria-label", `Slide ${idx + 1}: ${item.titleFallback}`);
      btn.onclick = () => window.goToProjectSlide(idx);
      const span = document.createElement("span");
      span.className = `carousel-dot block w-6 h-1 rounded-full transition-all ${idx === currentProjectSlide ? "active bg-[#DC143C] opacity-100" : "bg-white/20 opacity-40 hover:opacity-75"}`;
      btn.appendChild(span);
      dotsContainer.appendChild(btn);
    });
  }

  updateCarouselUI(currentProjectSlide);
};
window.renderFeaturedProjectsCarousel = renderFeaturedProjectsCarousel;

let isProjectAnimating = false;

export const updateCarouselUI = (index, animate = false, explicitDirection = null) => {
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  const total = cards.length || TOTAL_PROJECT_SLIDES;
  const targetIndex = Math.max(0, Math.min(total - 1, index));

  const prevIndex = currentProjectSlide;
  const dir = explicitDirection !== null ? explicitDirection : targetIndex >= prevIndex ? 1 : -1;
  currentProjectSlide = targetIndex;

  const counterEl = document.getElementById("carousel-counter");
  if (counterEl) {
    counterEl.textContent = `${currentProjectSlide + 1} / ${total}`;
  }

  const dots = document.querySelectorAll("#carousel-dots-container .carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentProjectSlide) {
      dot.classList.add("active", "bg-[#DC143C]", "opacity-100");
      dot.classList.remove("bg-white/20", "opacity-40");
    } else {
      dot.classList.remove("active", "bg-[#DC143C]", "opacity-100");
      dot.classList.add("bg-white/20", "opacity-40");
    }
  });

  const prevCard = cards[prevIndex];
  const nextCard = cards[currentProjectSlide];

  if (animate && prevCard && nextCard && prevCard !== nextCard && gsap) {
    gsap.killTweensOf(cards);
    isProjectAnimating = true;

    cards.forEach((c) => {
      if (c !== prevCard && c !== nextCard) {
        c.classList.remove("is-active", "is-animating");
        c.classList.add("is-inactive");
        c.setAttribute("inert", "");
        c.setAttribute("aria-hidden", "true");
        gsap.set(c, { clearProps: "transform,scale,opacity" });
      }
    });

    prevCard.classList.remove("is-active", "is-inactive");
    prevCard.classList.add("is-animating");
    nextCard.classList.remove("is-active", "is-inactive");
    nextCard.classList.add("is-animating");
    nextCard.removeAttribute("inert");
    nextCard.setAttribute("aria-hidden", "false");

    // Smooth Kinetic Outgoing Glide
    gsap.fromTo(
      prevCard,
      { opacity: 1, x: 0, scale: 1 },
      {
        opacity: 0,
        x: -45 * dir,
        scale: 0.95,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => {
          prevCard.classList.remove("is-animating", "is-active");
          prevCard.classList.add("is-inactive");
          prevCard.setAttribute("inert", "");
          prevCard.setAttribute("aria-hidden", "true");
          gsap.set(prevCard, { clearProps: "transform,scale,opacity" });
        },
      }
    );

    // Elegant Incoming Directional Slide & Depth Unfurl
    gsap.fromTo(
      nextCard,
      { opacity: 0, x: 45 * dir, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.38,
        ease: "power3.out",
        onComplete: () => {
          nextCard.classList.remove("is-animating", "is-inactive");
          nextCard.classList.add("is-active");
          gsap.set(nextCard, { clearProps: "transform,scale,opacity" });
          isProjectAnimating = false;
        },
      }
    );
  } else {
    cards.forEach((c, idx) => {
      const isActive = idx === currentProjectSlide;
      c.setAttribute("aria-hidden", isActive ? "false" : "true");
      c.classList.remove("is-animating");
      if (isActive) {
        c.removeAttribute("inert");
        c.classList.remove("is-inactive");
        c.classList.add("is-active");
        if (gsap) gsap.set(c, { clearProps: "transform,scale,opacity" });
      } else {
        c.setAttribute("inert", "");
        c.classList.remove("is-active");
        c.classList.add("is-inactive");
      }
    });
  }
};

window.slideProjectsCarousel = (direction) => {
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  const total = cards.length || TOTAL_PROJECT_SLIDES;
  let nextSlide = currentProjectSlide + direction;
  if (nextSlide >= total) nextSlide = 0;
  if (nextSlide < 0) nextSlide = total - 1;
  updateCarouselUI(nextSlide, true, direction);
};

window.goToProjectSlide = (index) => {
  const dir = index > currentProjectSlide ? 1 : -1;
  updateCarouselUI(index, true, dir);
};

export const initProjectsCarousel = () => {
  const track = document.getElementById("projects-carousel-track");
  if (!track) return;

  if (!track.querySelector(".carousel-card")) {
    renderFeaturedProjectsCarousel();
  }

  // Touch swipe support on slider
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        window.slideProjectsCarousel(diff > 0 ? 1 : -1);
      }
    },
    { passive: true }
  );
};

// ═══════════════════════════════════════════════════════════
// 6. DYNAMIC LIVE GITHUB REPOSITORIES FETCH (With Zero-Fail Fallback)
// ═══════════════════════════════════════════════════════════
export const initGitHubRepos = async () => {
  const container = document.getElementById("github-repos");
  if (!container) return;

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

  const renderRepoCards = (repos) => {
    container.innerHTML = "";
    repos.slice(0, 6).forEach((repo) => {
      const repoId = repo.id || repo.name;
      const lang = repo.language || "Code";
      const color = LANG_COLORS[lang] || "#DC143C";
      const desc = (currentLang === "en" && repo.descriptionEn)
        ? repo.descriptionEn
        : (repo.description || "Public open-source repository by Muhammad Aga Putra.");

      const card = document.createElement("div");
      card.className =
        "repo-card glass-card rounded-2xl p-4 flex flex-col justify-between group hover:border-[#DC143C]/40 transition-all";
      card.innerHTML = `
        <div class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <span class="font-mono text-xs font-semibold text-white group-hover:text-[#DC143C] transition-colors truncate">
              ${repo.displayName || repo.name}
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
          <a
            href="${repo.html_url || 'https://github.com/Apisikma123/' + repoId}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group font-semibold"
            title="GitHub Source"
          >
            <span>GitHub</span>
            <svg class="w-3 h-3 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>
      `;
      container.appendChild(card);
    });

    gsap.fromTo(
      ".repo-card",
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.out",
      }
    );
  };

  // 1. Load initial cache or static dataset immediately (0ms instant paint)
  const localSaved = typeof localStorage !== "undefined" ? localStorage.getItem("aga_live_repos_cache") : null;
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (Array.isArray(parsed) && parsed.length) {
        projectsData = parsed;
        cachedProjectsData = parsed;
      }
    } catch (e) {}
  }

  if (projectsData && projectsData.length) {
    renderRepoCards(projectsData);
  } else {
    try {
      const pRes = await fetch("/all_projects.json");
      if (pRes.ok) {
        projectsData = await pRes.json();
        cachedProjectsData = projectsData;
        renderRepoCards(projectsData);
      }
    } catch (e) {}
  }

  // 2. Real-Time Auto-Sync with GitHub API (Deferred on idle to protect initial score)
  const syncLiveGitHub = async () => {
    try {
      const res = await fetch("https://api.github.com/users/Apisikma123/repos?sort=updated&per_page=100");
      if (res.ok) {
        const liveRepos = await res.json();
        if (Array.isArray(liveRepos) && liveRepos.length) {
          const merged = [...(projectsData || [])];

          liveRepos.forEach((lr) => {
            if (lr.fork) return;
            const normName = lr.name.toLowerCase();
            const existing = merged.find((p) => p.id.toLowerCase() === normName || (p.name && p.name.toLowerCase() === normName));

            if (existing) {
              existing.stargazers_count = lr.stargazers_count;
              existing.forks_count = lr.forks_count;
              existing.updated_at = lr.updated_at;
              existing.html_url = lr.html_url;
              if (!existing.description && lr.description) {
                existing.description = lr.description;
              }
            } else {
              const newProj = {
                id: lr.name,
                displayName: lr.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                category: lr.language || "Open Source",
                categoryTag: lr.language === "Dart" || lr.language === "Flutter" ? "Mobile" : (lr.language === "PHP" || lr.language === "Java" ? "Backend" : "Web"),
                tags: lr.topics && lr.topics.length ? lr.topics : [lr.language || "Code", "GitHub"],
                description: lr.description || `Open source project ${lr.name} by Muhammad Aga Putra.`,
                descriptionEn: lr.description || `Open source project ${lr.name} by Muhammad Aga Putra.`,
                html_url: lr.html_url,
                homepage: lr.homepage,
                language: lr.language || "Code",
                stargazers_count: lr.stargazers_count,
                forks_count: lr.forks_count,
                updated_at: lr.updated_at,
                isLiveAuto: true,
              };
              merged.push(newProj);
            }
          });

          projectsData = merged;
          cachedProjectsData = merged;
          try {
            localStorage.setItem("aga_live_repos_cache", JSON.stringify(merged));
          } catch (e) {}

          renderRepoCards(projectsData);

          document.querySelectorAll("[data-i18n='exploreAllProjects']").forEach((el) => {
            el.textContent = currentLang === "en" ? `All Projects (${merged.length})` : `Semua Karya (${merged.length})`;
          });

          if (window.currentSPAView === "all-projects" && window.renderAllViewProjects) {
            window.renderAllViewProjects();
          }
        }
      }
    } catch (err) {
      console.debug("GitHub Live API sync notice:", err);
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(syncLiveGitHub, { timeout: 4000 });
  } else {
    setTimeout(syncLiveGitHub, 3000);
  }
};

// ═══════════════════════════════════════════════════════════
// 7. LIVE GITHUB ACTIVITY HEATMAP MATRIX (Official Apisikma123 Telemetry)
// ═══════════════════════════════════════════════════════════
export const initActivityHeatmap = () => {
  const container = document.getElementById("heatmap-cells");
  const countEl = document.getElementById("total-contributions-count");
  const yearRangeEl = document.getElementById("activity-year-range");
  if (!container) return;

  if (yearRangeEl) {
    const currentY = new Date().getFullYear();
    yearRangeEl.textContent = `${currentY - 1} – ${currentY}`;
  }

  let heatmapLoaded = false;
  const loadHeatmapData = async () => {
    if (heatmapLoaded) return;
    heatmapLoaded = true;

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const COLOR_LEVELS = isLight
      ? [
          "#cbd5e1", // level 0
          "#fecdd3", // level 1
          "#fb7185", // level 2
          "#e11d48", // level 3
          "#be123c", // level 4
        ]
      : [
          "#181920", // level 0
          "#4a141e", // level 1 (subtle wine burgundy)
          "#7c182a", // level 2 (medium crimson)
          "#b81432", // level 3 (vibrant crimson)
          "#dc143c", // level 4 (bright glowing crimson)
        ];

    try {
      const data = cachedContributionsData || (await fetch("/contributions.json").then((r) => (r.ok ? r.json() : null)));
      if (!data) throw new Error("Local contributions.json not found");

      const totalStr = data.total || (data.totalContributions ? data.totalContributions.toLocaleString() : "10,020");
      if (countEl) countEl.textContent = `${totalStr}+ Contributions`;

      const rawList = data.contributions || data.days || [];
      const days = rawList.slice(-371);

      // 1. Dynamic Year Range
      if (yearRangeEl && days.length > 0) {
        const startY = new Date(days[0].date).getUTCFullYear();
        const endY = new Date(days[days.length - 1].date).getUTCFullYear();
        yearRangeEl.textContent = startY === endY ? `${startY}` : `${startY} – ${endY}`;
      }

      // 2. Dynamic 53-Week Month Header aligned with grid columns
      const monthsEl = document.getElementById("heatmap-months");
      if (monthsEl && days.length > 0) {
        const isEn = document.documentElement.getAttribute("lang") === "en";
        const MONTH_NAMES = isEn
          ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        monthsEl.innerHTML = "";
        const totalWeeks = Math.ceil(days.length / 7);
        monthsEl.style.display = "grid";
        monthsEl.style.gridTemplateColumns = `repeat(${totalWeeks}, minmax(0, 1fr))`;
        monthsEl.style.gap = "3.5px";

        let lastMonth = -1;
        let lastWeekLabeled = -4;

        for (let w = 0; w < totalWeeks; w++) {
          const dayIdx = w * 7;
          if (dayIdx >= days.length) break;
          const date = new Date(days[dayIdx].date);
          const m = date.getUTCMonth();
          if (m !== lastMonth && (w - lastWeekLabeled) >= 2) {
            lastMonth = m;
            lastWeekLabeled = w;
            const span = document.createElement("span");
            span.textContent = MONTH_NAMES[m];
            span.style.gridColumnStart = `${w + 1}`;
            span.className = "text-[0.65rem] sm:text-xs text-zinc-400 font-mono text-left block pointer-events-none whitespace-nowrap";
            monthsEl.appendChild(span);
          }
        }
      }

      // 3. Populate Heatmap Cells
      container.innerHTML = "";
      const fragment = document.createDocumentFragment();
      days.forEach((d) => {
        const cell = document.createElement("div");
        const lvl = (typeof d.level === "number" && d.level >= 0 && d.level <= 4)
          ? d.level
          : (d.count > 100 ? 4 : d.count > 50 ? 3 : d.count > 15 ? 2 : d.count > 0 ? 1 : 0);
        const bg = COLOR_LEVELS[lvl] || COLOR_LEVELS[0];
        cell.className = "w-2.5 h-2.5 rounded-sm transition-colors duration-200 cursor-pointer relative group/cell hover:scale-125 hover:z-10";
        cell.style.backgroundColor = bg;
        cell.setAttribute("title", d.tooltip || `${d.date}: ${d.count} contributions`);
        fragment.appendChild(cell);
      });
      container.appendChild(fragment);

      const scrollWrapper = document.getElementById("activity-heatmap-scroll");
      if (scrollWrapper && window.enableDragToScroll) {
        window.enableDragToScroll(scrollWrapper);
      }
    } catch (e) {
      if (countEl) countEl.textContent = "10,020+ Contributions";

      container.innerHTML = "";
      const fragment = document.createDocumentFragment();
      const totalDays = 371;
      for (let i = 0; i < totalDays; i++) {
        const cell = document.createElement("div");
        const rand = Math.random();
        let lvl = 0;
        if (rand > 0.4) lvl = 1;
        if (rand > 0.65) lvl = 2;
        if (rand > 0.85) lvl = 3;
        if (rand > 0.95) lvl = 4;
        cell.className = "w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer relative";
        cell.style.backgroundColor = COLOR_LEVELS[lvl];
        fragment.appendChild(cell);
      }
      const scrollWrapper = document.getElementById("activity-heatmap-scroll");
      if (scrollWrapper && window.enableDragToScroll) {
        window.enableDragToScroll(scrollWrapper);
      }
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          loadHeatmapData();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(container);
  } else {
    setTimeout(loadHeatmapData, 2000);
  }
};
window.renderActivityHeatmap = initActivityHeatmap;

// ═══════════════════════════════════════════════════════════
// 8. SEAMLESS SPA VIEW SWITCHER (Layout, Sidebar & 3D BG are 100% Intact)
// ═══════════════════════════════════════════════════════════
export let currentDetailProject = null;
export let allViewActiveCategory = "all";
export let allViewSearchQuery = "";
window.currentSPAView = "portfolio";

export const initSPAViews = async () => {
  if (cachedProjectsData && cachedProjectsData.length) {
    projectsData = cachedProjectsData;
  }

  // Handle ESC key -> Return to Portfolio Section 04
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && window.currentSPAView !== "portfolio") {
      window.switchView("portfolio", 3);
    }
  });

  // Handle URL hash routing (#project/id or #projects)
  const handleHashRoute = () => {
    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      const id = hash.replace("#project/", "");
      openProjectDetail(id);
    }
  };

  window.addEventListener("hashchange", handleHashRoute);
  if (window.location.hash.startsWith("#project/")) {
    handleHashRoute();
  }
};

export const openProjectDetail = async (projectId) => {
  const projectDetailEl = document.getElementById("project-detail-view");
  if (!projectDetailEl) {
    window.location.href = "/project.html?id=" + encodeURIComponent(projectId || "foodify");
    return;
  }

  if (!projectsData || !projectsData.length) {
    try {
      const pRes = await fetch("/all_projects.json");
      if (pRes.ok) {
        projectsData = await pRes.json();
        cachedProjectsData = projectsData;
      }
    } catch (e) {}
  }

  const pid = projectId || "foodify";
  const featuredMatch = FEATURED_PROJECTS.find(
    (p) => p.id.toLowerCase() === pid.toLowerCase()
  );
  const proj = (projectsData && projectsData.find(
    (p) =>
      p.id.toLowerCase() === pid.toLowerCase() ||
      (p.name && p.name.toLowerCase() === pid.toLowerCase())
  )) || (featuredMatch ? {
    id: featuredMatch.id,
    displayName: featuredMatch.titleFallback,
    category: featuredMatch.tagFallback,
    tags: featuredMatch.tags,
    description: featuredMatch.descFallback,
    html_url: featuredMatch.repoUrl,
    language: featuredMatch.tags[0] || "Code",
    readme: `# ${featuredMatch.titleFallback}\n\n${featuredMatch.descFallback}\n\n- **GitHub:** [${featuredMatch.repoUrl}](${featuredMatch.repoUrl})`
  } : {
    id: pid,
    displayName: pid.toUpperCase(),
    category: "Software Engineering",
    tags: ["Code"],
    description: "Open source software project by Muhammad Aga Putra.",
    html_url: "https://github.com/Apisikma123/" + pid,
    language: "Code",
    readme: "# " + pid.toUpperCase() + "\n\nDocumentation repository for " + pid + "."
  });

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

  const normId = (proj.id || "").toLowerCase();
  const KNOWN_PROJECT_IMAGES = {
    foodify: "/projects/foodify.webp",
    wilmarbuku: "/projects/wilmarbuku.webp",
    "cinta--website-konseling-sekola-": "/projects/cinta-counseling.webp",
    "grow-a-garden": "/projects/grow-a-garden.webp",
    bkj: "/projects/bkj.webp",
  };
  const hasKnownImg = KNOWN_PROJECT_IMAGES[normId] || (proj.previewImage && KNOWN_PROJECT_IMAGES[proj.previewImage.replace('/projects/', '').replace('.png', '').replace('.webp', '').toLowerCase()]);

  const isMobile = normId === "foodify" || proj.category === "Mobile" || proj.categoryTag === "Mobile" || (proj.tags && proj.tags.some(t => /flutter|mobile|android|ios|dart/i.test(t)));
  const bannerContainer = document.getElementById("detail-view-banner-container");
  if (bannerContainer) {
    if (isMobile && hasKnownImg) {
      bannerContainer.className = "phone-mockup-banner mb-8 rounded-2xl overflow-hidden relative border border-white/10 glass-card bg-gradient-to-b from-[#141724] via-[#0d0e17] to-[#07080e] flex items-center justify-center p-6 sm:p-8 min-h-[340px] max-h-[440px]";
      bannerContainer.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-tr from-[#DC143C]/20 via-[#FF5500]/15 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
        <div class="relative h-64 sm:h-80 aspect-[9/18.5] rounded-[24px] sm:rounded-[32px] border-2 border-zinc-800 bg-black overflow-hidden group-hover:border-[#DC143C]/70 transition-colors duration-300">
          <img
            id="detail-view-banner-img"
            src="${hasKnownImg}"
            alt="${proj.displayName}"
            class="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      `;
    } else if (hasKnownImg) {
      bannerContainer.className = "mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card aspect-video max-h-[380px] w-full relative group";
      bannerContainer.innerHTML = `
        <img
          id="detail-view-banner-img"
          src="${hasKnownImg}"
          alt="${proj.displayName}"
          class="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-60 pointer-events-none"></div>
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono text-[0.65rem] text-zinc-300">
          <span class="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse"></span>
            <span>Visual Architecture Preview</span>
          </span>
          <span id="detail-view-banner-badge" class="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10">${proj.language || 'Code'}</span>
        </div>
      `;
    } else {
      // Niche macOS Terminal Detail Banner Placeholder
      bannerContainer.className = "mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card bg-[#0b0c14] relative shadow-md";
      bannerContainer.innerHTML = `
        <div class="px-4 py-3 bg-[#12131e] border-b border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
            <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
            <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
            <span class="ml-2 text-zinc-500 text-xs font-sans">Terminal</span>
          </div>
          <div class="flex items-center gap-2 text-zinc-400 text-xs">
            <span class="text-zinc-500">zsh —</span>
            <span class="text-zinc-300 font-semibold">${proj.id}</span>
            <span class="text-zinc-500">git:(<span class="text-amber-400">main</span>)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[0.65rem] text-zinc-400">${proj.language || 'Code'}</span>
          </div>
        </div>
        <div class="p-6 sm:p-8 font-mono text-xs sm:text-sm text-zinc-300 space-y-3 bg-gradient-to-b from-[#0b0c14] to-[#07080d]">
          <div class="flex items-center gap-2 text-zinc-400">
            <span class="text-[#DC143C] font-bold">❯</span>
            <span class="text-emerald-400">aga@studio</span>
            <span class="text-zinc-600">:</span>
            <span class="text-cyan-400">~/projects/${proj.id}</span>
            <span class="text-zinc-500">git:(<span class="text-amber-400">main</span>)</span>
          </div>
          <div class="text-zinc-200 flex items-center gap-2 pl-4">
            <span class="text-zinc-500">$</span>
            <span>git log -1 --pretty=format:"%h %s (%cr)"</span>
          </div>
          <div class="text-zinc-500 pl-4 text-xs">
            commit <span class="text-amber-400 font-semibold">a8f2d1e</span> (<span class="text-emerald-400">HEAD -> main</span>) • Architecture baseline verified
          </div>
          <div class="pt-2 flex items-center gap-2 text-zinc-400">
            <span class="text-[#DC143C] font-bold">❯</span>
            <span class="text-zinc-200">cat project-manifest.json</span>
          </div>
          <div class="bg-black/50 border border-white/5 rounded-xl p-4 text-xs font-mono space-y-1 text-zinc-400">
            <div><span class="text-zinc-600">"name":</span> <span class="text-emerald-300">"${proj.displayName}"</span>,</div>
            <div><span class="text-zinc-600">"category":</span> <span class="text-cyan-300">"${proj.category || 'Software Engineering'}"</span>,</div>
            <div><span class="text-zinc-600">"stack":</span> [<span class="text-amber-300">${(proj.tags || [proj.language]).map(t => `"${t}"`).join(', ')}</span>],</div>
            <div><span class="text-zinc-600">"status":</span> <span class="text-emerald-400">"Production Ready"</span></div>
          </div>
          <div class="flex items-center gap-2 text-zinc-400 pt-1">
            <span class="text-[#DC143C] font-bold">❯</span>
            <span class="inline-block w-2.5 h-4 bg-[#DC143C] animate-pulse align-middle"></span>
          </div>
        </div>
      `;
    }
  }

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

  const markdownEl = document.getElementById("detail-view-markdown");
  if (markdownEl) {
    markdownEl.innerHTML = renderMarkdownContent(proj.readme || ("# " + proj.displayName + "\n\n" + (proj.description || "")));
    setTimeout(() => lazyHighlightAll(markdownEl), 50);
  }

  fetch(`https://raw.githubusercontent.com/Apisikma123/${proj.id}/main/README.md`)
    .then((r) => (r.ok ? r.text() : fetch(`https://raw.githubusercontent.com/Apisikma123/${proj.id}/master/README.md`).then((res) => (res.ok ? res.text() : ""))))
    .then((liveText) => {
      if (liveText && liveText.trim() && markdownEl) {
        markdownEl.innerHTML = renderMarkdownContent(liveText);
        setTimeout(() => lazyHighlightAll(markdownEl), 50);
      }
    })
    .catch(() => {});

  document.body.style.overflow = "hidden";
  projectDetailEl.classList.remove("hidden");
  projectDetailEl.style.display = "block";
  projectDetailEl.style.zIndex = "99999";
  projectDetailEl.scrollTop = 0;
  window.currentSPAView = "project";
  if (window.update3DSceneForView) {
    window.update3DSceneForView("project");
  }
};
window.openProjectDetail = openProjectDetail;
window.__openProjectDetailImpl = openProjectDetail;

export const switchView = async (viewName, param, updateHash = true) => {
  const projectDetailEl = document.getElementById("project-detail-view");
  const allProjectsEl = document.getElementById("all-projects-view");

  if (viewName === "project") {
    if (projectDetailEl) {
      if (allProjectsEl) {
        allProjectsEl.classList.add("hidden");
        allProjectsEl.style.display = "none";
      }
      return openProjectDetail(param);
    } else {
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
    }
    if (allProjectsEl) {
      allProjectsEl.classList.add("hidden");
      allProjectsEl.style.display = "none";
    }
    document.body.style.overflow = "auto";
    window.currentSPAView = "portfolio";
    if (window.update3DSceneForView) {
      window.update3DSceneForView("portfolio");
    }
    if (typeof param === "number") {
      window.scrollToSection(param, true);
    }
  }
};
window.switchView = switchView;
window.__switchViewImpl = switchView;

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
    card.className = "project-catalog-card rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl overflow-hidden transition-all flex flex-col justify-between group hover:border-[#DC143C]/40 hover:-translate-y-1 duration-300";
    
    const normId = p.id.toLowerCase();
    const hasKnownImg = KNOWN_PROJECT_IMAGES[normId] || (p.previewImage && KNOWN_PROJECT_IMAGES[p.previewImage.replace('/projects/', '').replace('.png', '').replace('.webp', '').toLowerCase()]);
    
    let topPreviewHtml = "";
    if (normId === "foodify") {
      topPreviewHtml = `
        <div class="aspect-video w-full overflow-hidden relative flex items-center justify-center bg-gradient-to-b from-[#141724] to-[#07080e]">
          <img src="/projects/foodify.webp" alt="${p.displayName}" width="320" height="640" loading="lazy" decoding="async" sizes="(max-width: 640px) 100vw, 120px" class="h-full w-auto max-h-[160px] object-contain py-2 opacity-95 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
          <span class="absolute bottom-3 right-3 bg-black/80 text-zinc-300 font-mono text-xs px-2 py-0.5 rounded border border-white/10">Flutter</span>
        </div>
      `;
    } else if (hasKnownImg) {
      topPreviewHtml = `
        <div class="aspect-video w-full overflow-hidden relative">
          <img src="${hasKnownImg}" alt="${p.displayName}" width="640" height="360" loading="lazy" decoding="async" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px" class="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        </div>
      `;
    } else {
      topPreviewHtml = `
        <div class="aspect-video w-full overflow-hidden relative flex flex-col justify-between p-3.5 font-mono select-none">
          <!-- macOS Title Bar -->
          <div class="flex items-center justify-between pb-2 border-b border-white/5">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
            </div>
            <div class="text-xs text-zinc-500 flex items-center gap-1">
              <span class="text-zinc-600">zsh —</span>
              <span class="text-zinc-300 font-medium truncate max-w-[130px]">${p.id}</span>
            </div>
            <span class="text-xs px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 font-mono">${p.language || 'Code'}</span>
          </div>

          <!-- Terminal Body -->
          <div class="flex-1 py-2 flex flex-col justify-center gap-1 text-xs leading-relaxed">
            <div class="flex items-center gap-1.5 text-zinc-400">
              <span class="text-[#DC143C] font-bold">❯</span>
              <span class="text-emerald-400">~/projects</span>
              <span class="text-zinc-500 font-normal">git:(<span class="text-amber-400">main</span>)</span>
            </div>
            <div class="text-zinc-300 font-medium flex items-center gap-1.5 pl-2 truncate">
              <span class="text-zinc-500">$</span>
              <span class="text-white font-semibold truncate">${p.displayName || p.id}</span>
              <span class="text-[#DC143C] text-xs font-bold animate-pulse">●</span>
            </div>
            <div class="text-xs text-zinc-500 pl-2 flex items-center gap-2">
              <span class="text-zinc-600">stack:</span>
              <span class="text-zinc-400 truncate">${(p.tags || [p.language || 'Code']).slice(0, 3).join(' • ')}</span>
            </div>
          </div>

          <!-- Terminal Footer -->
          <div class="pt-1.5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
            <span class="flex items-center gap-1 text-emerald-400">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span class="tracking-wide">BUILD READY</span>
            </span>
            <span class="text-zinc-600 uppercase tracking-wider">${p.category || 'PROJECT'}</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div>
        ${topPreviewHtml}
        <div class="p-5">
          <div class="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-zinc-500">
            <span class="text-[#DC143C] font-semibold">${(p.category || "PROJECT").toUpperCase()}</span>
            <span>${p.language || "Code"}</span>
          </div>
          <h2 class="font-bold text-base text-white group-hover:text-[#DC143C] transition-colors mb-1.5 line-clamp-1">
            ${p.displayName}
          </h2>
          <p class="text-xs text-zinc-400 font-light leading-relaxed mb-4 line-clamp-2">
            ${currentLang === "en" && p.descriptionEn ? p.descriptionEn : p.description}
          </p>
        </div>
      </div>
      <div class="px-5 pb-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs gap-2">
        <button
          type="button"
          onclick="window.switchView('project', '${p.id}');"
          class="rounded bg-[#DC143C]/15 hover:bg-[#DC143C] text-[#DC143C] hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer leading-none"
        >
          <span>${currentLang === "en" ? "Quick Overview" : "Overview Singkat"}</span>
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
        <a href="${p.html_url}" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-white p-1 hover:text-[#DC143C] transition-colors inline-flex items-center justify-center" title="Source Code">
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
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

window.switchView = switchView;
window.__switchViewImpl = switchView;

// ═══════════════════════════════════════════════════════════
// MASTER DATA INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initData = async () => {
  renderFeaturedProjectsCarousel();
  await yieldToMain();
  initProjectsCarousel();
  await yieldToMain();
  initActivityHeatmap();

  const loadDeferredData = async () => {
    await yieldToMain();
    initSPAViews();
    await yieldToMain();
    initGitHubRepos();
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadDeferredData, { timeout: 5000 });
  } else {
    setTimeout(loadDeferredData, 2000);
  }
};
