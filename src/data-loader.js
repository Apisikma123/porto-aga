/* ═══════════════════════════════════════════════════════════
   data-loader.js — Dynamic Projects, GitHub Sync, Heatmap & Pricing Configurator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import { gsap } from "gsap";
import { currentLang, getProtectedWhatsAppNumber } from "./critical.js";

export let cachedProjectsData = null;
export let cachedContributionsData = null;
export let projectsData = [];

// ═══════════════════════════════════════════════════════════
// HORIZONTAL PROJECTS CAROUSEL CONTROLLER (Section 04)
// ═══════════════════════════════════════════════════════════
let currentProjectSlide = 0;
const TOTAL_PROJECT_SLIDES = 5;

export const FEATURED_PROJECTS = [
  {
    id: "bkj",
    repoUrl: "https://github.com/Apisikma123/bkj",
    imgSrc: "/projects/bkj.webp",
    imgAlt: "BKJ Group Indonesia — Logistics Portal",
    imgWidth: 640,
    imgHeight: 340,
    isFeaturedBadge: true,
    tagI18n: "projBkjTag",
    tagFallback: "Corporate · Maritime Logistics",
    statusI18n: "projBkjStatus",
    statusFallback: "bkjgrup.com",
    titleI18n: "projBkjTitle",
    titleFallback: "BKJ Group Indonesia — Logistics Portal",
    descI18n: "projBkjDesc",
    descFallback: "Integrated enterprise maritime logistics and corporate platform built for PT Berkah Kapal Jaya with full CMS, subsidiary routing, and bilingual localization.",
    tags: ["Laravel 13", "Tailwind v4", "Alpine.js", "MySQL"],
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
    isFeaturedBadge: false,
    tagI18n: "proj2Tag",
    tagFallback: "Fullstack · Donation Engine",
    statusI18n: "proj2Status",
    statusFallback: "Production",
    titleI18n: "proj2Title",
    titleFallback: "Wilmar Buku — Donation System",
    descI18n: "proj2Desc",
    descFallback: "Centralized library donation platform built with TALL stack, Google OAuth 2.0, automated PDF reporting, and real-time WebSockets via Laravel Reverb.",
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

export const createFeaturedProjectCardElement = (item) => {
  const card = document.createElement("div");
  card.className = "carousel-card glass-card spatial-card rounded-2xl overflow-hidden group flex flex-col justify-between shrink-0";
  card.dataset.tilt = "true";

  let mediaHtml = "";
  if (item.isPhoneMockup) {
    mediaHtml = `
      <div class="aspect-[16/8.5] max-h-[175px] w-full overflow-hidden relative border-b border-white/10 bg-gradient-to-b from-[#141724] via-[#0d0e17] to-[#07080e] flex items-center justify-center p-2.5">
        <div class="absolute inset-0 bg-gradient-to-tr from-[#DC143C]/20 via-[#FF5500]/15 to-transparent blur-xl opacity-60 pointer-events-none"></div>
        <div class="relative h-full aspect-[9/18.5] rounded-xl sm:rounded-[16px] border-2 border-zinc-700/80 bg-black overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.85)] group-hover:border-[#DC143C]/70 group-hover:scale-105 transition-all duration-500">
          <div class="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-black rounded-full border border-white/20 z-10"></div>
          <img
            alt="${item.imgAlt}"
            class="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            src="${item.imgSrc}"
            width="${item.imgWidth}"
            height="${item.imgHeight}"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </div>
        <div class="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[0.55rem] font-mono text-zinc-300 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse"></span>
          <span>Flutter Mobile</span>
        </div>
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="aspect-[16/8.5] max-h-[175px] w-full overflow-hidden relative border-b border-white/10 bg-zinc-950">
        <img
          alt="${item.imgAlt}"
          class="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
          src="${item.imgSrc}"
          width="${item.imgWidth}"
          height="${item.imgHeight}"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        ${item.isFeaturedBadge ? '<span class="absolute top-3 right-3 font-mono text-[0.6rem] bg-[#DC143C] text-white px-2 py-0.5 rounded font-bold tracking-wider uppercase shadow-lg">Featured</span>' : ""}
      </div>
    `;
  }

  const tagsHtml = item.tags
    .map((tag) => `<span class="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">${tag}</span>`)
    .join("\n                    ");

  card.innerHTML = `
    <div onclick="window.switchView('project', '${item.id}')" class="cursor-pointer" title="Lihat Overview ${item.titleFallback}">
      ${mediaHtml}
      <div class="p-4 sm:p-5">
        <div class="flex justify-between items-center mb-1.5">
          <span class="eyebrow text-[0.6rem]" data-i18n="${item.tagI18n}">${item.tagFallback}</span>
          <span class="font-mono text-[0.65rem] text-[#DC143C] font-semibold" data-i18n="${item.statusI18n}">${item.statusFallback}</span>
        </div>
        <h3 class="font-bold text-base text-white group-hover:text-[#DC143C] transition-colors mb-1.5" data-i18n="${item.titleI18n}">
          ${item.titleFallback}
        </h3>
        <p class="text-xs text-zinc-400 font-light leading-relaxed mb-2.5 line-clamp-2" data-i18n="${item.descI18n}">
          ${item.descFallback}
        </p>
        <div class="flex gap-1.5 flex-wrap font-mono text-[0.62rem] text-zinc-400">
          ${tagsHtml}
        </div>
      </div>
    </div>
    <div class="px-4 sm:px-5 pb-3.5 pt-2.5 flex items-center justify-between border-t border-white/5 font-mono text-[0.68rem] gap-2">
      <button
        type="button"
        onclick="window.switchView('project', '${item.id}')"
        class="relative z-20 rounded bg-[#DC143C]/15 hover:bg-[#DC143C] text-[#DC143C] hover:text-white border border-[#DC143C]/30 px-3 py-1.5 transition-all inline-flex items-center justify-center gap-1.5 font-semibold cursor-pointer touch-manipulation active:scale-95 leading-none"
      >
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span data-i18n="btnReadReadme">Overview Singkat</span>
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
      <a
        href="${item.repoUrl}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buka repository GitHub untuk proyek ${item.titleFallback}"
        class="relative z-20 text-zinc-400 hover:text-white inline-flex items-center justify-center gap-1.5 transition-colors group-hover:text-[#DC143C] touch-manipulation py-1.5 px-2.5 border border-transparent leading-none"
      >
        <span>Repository</span>
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>
  `;

  return card;
};

export const renderFeaturedProjectsCarousel = () => {
  const track = document.getElementById("projects-carousel-track");
  if (!track) return;

  track.innerHTML = "";
  const fragment = document.createDocumentFragment();
  FEATURED_PROJECTS.forEach((item) => {
    fragment.appendChild(createFeaturedProjectCardElement(item));
  });
  track.appendChild(fragment);

  updateCarouselUI(currentProjectSlide);
};
window.renderFeaturedProjectsCarousel = renderFeaturedProjectsCarousel;

export const updateCarouselUI = (index) => {
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  const total = cards.length || TOTAL_PROJECT_SLIDES;
  currentProjectSlide = Math.max(0, Math.min(total - 1, index));

  const counterEl = document.getElementById("carousel-counter");
  if (counterEl) {
    counterEl.textContent = `${currentProjectSlide + 1} / ${total}`;
  }

  const dots = document.querySelectorAll("#carousel-dots-container .carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentProjectSlide) {
      dot.classList.add("active", "w-7", "bg-[#DC143C]");
      dot.classList.remove("w-2", "bg-white/20");
    } else {
      dot.classList.remove("active", "w-7", "bg-[#DC143C]");
      dot.classList.add("w-2", "bg-white/20");
    }
  });
};

window.slideProjectsCarousel = (direction) => {
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  const total = cards.length || TOTAL_PROJECT_SLIDES;
  const nextSlide = Math.max(0, Math.min(total - 1, currentProjectSlide + direction));
  window.goToProjectSlide(nextSlide);
};

window.goToProjectSlide = (index) => {
  const track = document.getElementById("projects-carousel-track");
  const cards = track ? track.querySelectorAll(".carousel-card") : [];
  if (track && cards[index]) {
    const targetCard = cards[index];
    const targetLeft = targetCard.offsetLeft - track.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }
  updateCarouselUI(index);
};

export const initProjectsCarousel = () => {
  const track = document.getElementById("projects-carousel-track");
  if (!track) return;

  if (!track.querySelector(".carousel-card")) {
    renderFeaturedProjectsCarousel();
  }

  let isTicking = false;
  const calculateActiveSlide = () => {
    const cards = track.querySelectorAll(".carousel-card");
    if (!cards.length) {
      isTicking = false;
      return;
    }
    let closestIndex = 0;
    let minDiff = Infinity;
    const currentCenter = track.scrollLeft + track.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(currentCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== currentProjectSlide) {
      updateCarouselUI(closestIndex);
    }
    isTicking = false;
  };

  track.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        requestAnimationFrame(calculateActiveSlide);
        isTicking = true;
      }
    },
    { passive: true }
  );

  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;

  track.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || e.target.closest("button, a")) return;
    isDown = true;
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
    track.style.scrollSnapType = "none";
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  const onDragEnd = () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor = "";
    track.style.userSelect = "";
    track.style.scrollSnapType = "x mandatory";
    calculateActiveSlide();
  };

  window.addEventListener("mouseup", onDragEnd);
  track.addEventListener("mouseleave", onDragEnd);

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeftStart - walk;
  });
};

// ═══════════════════════════════════════════════════════════
// PRICING MARKETING CAROUSEL CONTROLLER (Section 05)
// ═══════════════════════════════════════════════════════════
let currentPricingSlide = 0;

export const updatePricingCarouselUI = (index) => {
  const track = document.getElementById("pricing-cards-track");
  const cards = track ? track.querySelectorAll(".pricing-carousel-card") : [];
  const total = cards.length || 3;
  currentPricingSlide = Math.max(0, Math.min(total - 1, index));

  const counterEl = document.getElementById("pricing-carousel-counter");
  if (counterEl) {
    counterEl.textContent = `${currentPricingSlide + 1} / ${total}`;
  }

  const dots = document.querySelectorAll("#pricing-carousel-dots .pricing-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentPricingSlide) {
      dot.classList.add("active", "w-6", "bg-[#DC143C]");
      dot.classList.remove("w-2", "bg-white/20");
    } else {
      dot.classList.remove("active", "w-6", "bg-[#DC143C]");
      dot.classList.add("w-2", "bg-white/20");
    }
  });
};

window.slidePricingCarousel = (direction) => {
  const track = document.getElementById("pricing-cards-track");
  const cards = track ? track.querySelectorAll(".pricing-carousel-card") : [];
  const total = cards.length || 3;
  const nextSlide = Math.max(0, Math.min(total - 1, currentPricingSlide + direction));
  window.goToPricingSlide(nextSlide);
};

window.goToPricingSlide = (index) => {
  const track = document.getElementById("pricing-cards-track");
  const cards = track ? track.querySelectorAll(".pricing-carousel-card") : [];
  if (track && cards[index]) {
    const targetCard = cards[index];
    const targetLeft = targetCard.offsetLeft - track.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }
  updatePricingCarouselUI(index);
};

export const initPricingMarketingCarousel = () => {
  const track = document.getElementById("pricing-cards-track");
  if (!track) return;

  let isTicking = false;
  const calculateActiveSlide = () => {
    const cards = track.querySelectorAll(".pricing-carousel-card");
    if (!cards.length) {
      isTicking = false;
      return;
    }
    let closestIndex = 0;
    let minDiff = Infinity;
    const currentCenter = track.scrollLeft + track.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(currentCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== currentPricingSlide) {
      updatePricingCarouselUI(closestIndex);
    }
    isTicking = false;
  };

  track.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        requestAnimationFrame(calculateActiveSlide);
        isTicking = true;
      }
    },
    { passive: true }
  );

  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;

  track.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || e.target.closest("button, a")) return;
    isDown = true;
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
    track.style.scrollSnapType = "none";
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  const onDragEnd = () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor = "";
    track.style.userSelect = "";
    track.style.scrollSnapType = "x mandatory";
    calculateActiveSlide();
  };

  window.addEventListener("mouseup", onDragEnd);
  track.addEventListener("mouseleave", onDragEnd);

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeftStart - walk;
  });
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
        "repo-card glass-card rounded-xl p-4 flex flex-col justify-between group hover:border-[#DC143C]/40 transition-all";
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
          <div class="flex items-center gap-3">
            <button
              type="button"
              onclick="window.switchView('project', '${repoId}')"
              class="text-[#DC143C] hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>${currentLang === "en" ? "Quick Overview" : "Overview Singkat"}</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
            <a
              href="${repo.html_url || 'https://github.com/Apisikma123/' + repoId}"
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
          "#4a141e", // level 1
          "#7c182a", // level 2
          "#b81432", // level 3
          "#ff2b54", // level 4
        ];

    try {
      const data = cachedContributionsData || (await fetch("/contributions.json").then((r) => (r.ok ? r.json() : null)));
      if (!data) throw new Error("Local contributions.json not found");

      const totalStr = data.total || (data.totalContributions ? data.totalContributions.toLocaleString() : "9,907");
      if (countEl) countEl.textContent = `${totalStr}+ Contributions`;

      const rawList = data.contributions || data.days || [];
      const days = rawList.slice(-371);
      container.innerHTML = "";

      const fragment = document.createDocumentFragment();
      days.forEach((d) => {
        const cell = document.createElement("div");
        const lvl = d.level !== undefined ? d.level : (d.count > 15 ? 4 : d.count > 8 ? 3 : d.count > 3 ? 2 : d.count > 0 ? 1 : 0);
        const bg = COLOR_LEVELS[lvl] || COLOR_LEVELS[0];
        cell.className = "w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer relative group/cell";
        cell.style.backgroundColor = bg;
        if (lvl === 4 && !isLight) {
          cell.style.boxShadow = "0 0 8px rgba(255, 43, 84, 0.75)";
        } else if (lvl >= 3 && isLight) {
          cell.style.boxShadow = "0 0 4px rgba(225, 29, 72, 0.35)";
        }
        cell.setAttribute("title", d.tooltip || `${d.date}: ${d.count} contributions`);
        fragment.appendChild(cell);
      });
      container.appendChild(fragment);
    } catch (e) {
      if (countEl) countEl.textContent = "9,907+ Contributions";

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
      container.appendChild(fragment);
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
      window.switchView("project", id, false);
    } else if (hash === "#projects" || hash === "#all-projects") {
      window.switchView("all-projects", null, false);
    } else if (window.currentSPAView !== "portfolio") {
      window.switchView("portfolio", 0, false);
    }
  };

  window.addEventListener("hashchange", handleHashRoute);
  handleHashRoute();
};

export const switchView = async (viewName, param, updateHash = true) => {
  const projectDetailEl = document.getElementById("project-detail-view");
  const allProjectsEl = document.getElementById("all-projects-view");

  if (!projectDetailEl || !allProjectsEl) return;

  if ((!projectsData || !projectsData.length) && (viewName === "project" || viewName === "all-projects")) {
    try {
      const pRes = await fetch("/all_projects.json");
      if (pRes.ok) {
        projectsData = await pRes.json();
        cachedProjectsData = projectsData;
      }
    } catch (e) {}
  }

  window.currentSPAView = viewName;
  if (window.update3DSceneForView) {
    window.update3DSceneForView(viewName);
  }

  if (viewName === "portfolio") {
    document.body.style.overflow = "auto";
    const activeOverlay = [projectDetailEl, allProjectsEl].find((el) => !el.classList.contains("hidden") || el.style.display === "block");
    if (activeOverlay) {
      gsap.to(activeOverlay, {
        opacity: 0,
        y: -25,
        scale: 0.96,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => {
          activeOverlay.classList.add("hidden");
          activeOverlay.style.display = "none";
          gsap.set(activeOverlay, { clearProps: "all" });
        }
      });
    }

    if (updateHash) {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }
  } else if (viewName === "project") {
    allProjectsEl.classList.add("hidden");

    const projectId = param || "foodify";
    const proj = projectsData.find(
      (p) =>
        p.id.toLowerCase() === projectId.toLowerCase() ||
        (p.name && p.name.toLowerCase() === projectId.toLowerCase())
    ) || {
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

    const createProjectPlaceholderHtml = (p) => {
      const lang = p.language || "Code";
      const langColor = getProjectLanguageColor(lang);
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
              <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] text-zinc-400 border border-white/10 bg-white/5">
                Production Branch
              </span>
            </div>
          </div>

          <div class="relative z-10 my-auto py-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC143C]/15 border border-[#DC143C]/40 text-[#DC143C] font-mono text-xs mb-3 shadow-[0_0_15px_rgba(220,20,60,0.2)]">
              <span class="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse"></span>
              <span>${p.category || 'FEATURED WORK'}</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">${p.displayName}</h2>
            <p class="text-sm text-zinc-400 font-light max-w-xl line-clamp-3">${p.description}</p>
          </div>

          <div class="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span class="text-emerald-400 font-medium">Architecture Tested &amp; Deployed</span>
            </div>
            <div class="flex items-center gap-2 text-zinc-400">
              <span class="material-symbols-outlined text-sm">verified_user</span>
              <span>Verified Source Repository</span>
            </div>
          </div>
        </div>
      `;
    };

    const bannerContainer = document.getElementById("detail-view-banner-container");
    if (bannerContainer) {
      const hasKnownImg = KNOWN_PROJECT_IMAGES[proj.id.toLowerCase()];
      if (hasKnownImg) {
        bannerContainer.className = "mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card aspect-video max-h-[380px] w-full relative group shadow-[0_8px_32px_rgba(0,0,0,0.6)]";
        bannerContainer.innerHTML = `
          <img
            id="detail-view-banner-img"
            src="${hasKnownImg}"
            alt="${proj.displayName}"
            width="640"
            height="360"
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
        bannerContainer.className = "mb-8 w-full";
        bannerContainer.innerHTML = createProjectPlaceholderHtml(proj);
      }
    }

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
      const renderMdString = async (mdText) => {
        try {
          let markedInstance = window.marked;
          let hljsInstance = window.hljs;
          if (!markedInstance) {
            const markedMod = await import("marked");
            markedInstance = markedMod.marked;
            window.marked = markedInstance;
          }
          if (!hljsInstance) {
            try {
              const [hljsMod] = await Promise.all([
                import("highlight.js"),
                import("highlight.js/styles/atom-one-dark.css")
              ]);
              hljsInstance = hljsMod.default;
              window.hljs = hljsInstance;
            } catch (e) {}
          }

          const parsedHtml = markedInstance ? markedInstance.parse(mdText || "") : (mdText || "");
          markdownEl.innerHTML = parsedHtml;

          if (hljsInstance) {
            markdownEl.querySelectorAll("pre code").forEach((block) => {
              try {
                hljsInstance.highlightElement(block);
              } catch (e) {}
            });
          }

          markdownEl.querySelectorAll("pre").forEach((preBlock) => {
            if (preBlock.querySelector(".copy-code-btn")) return;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "copy-code-btn absolute top-2.5 right-2.5 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white px-2 py-1 font-mono text-[0.62rem] transition-colors flex items-center gap-1 cursor-pointer";
            btn.innerHTML = '<span class="material-symbols-outlined text-xs">content_copy</span><span>Copy</span>';
            btn.onclick = () => {
              const codeText = preBlock.querySelector("code")?.innerText || preBlock.innerText;
              navigator.clipboard.writeText(codeText);
              btn.innerHTML = '<span class="material-symbols-outlined text-xs text-emerald-400">check</span><span class="text-emerald-400 font-semibold">Copied!</span>';
              setTimeout(() => {
                btn.innerHTML = '<span class="material-symbols-outlined text-xs">content_copy</span><span>Copy</span>';
              }, 2000);
            };
            preBlock.style.position = "relative";
            preBlock.appendChild(btn);
          });
        } catch (mErr) {
          console.warn("Markdown parse fallback:", mErr);
          markdownEl.innerHTML = `<div class="font-sans text-sm text-zinc-300 whitespace-pre-line leading-relaxed">${mdText}</div>`;
        }
      };

      const initialMd = proj.readme || (`# ${proj.displayName}\n\n${proj.description || ""}\n\n- **GitHub Repository:** [${proj.html_url}](${proj.html_url})`);
      renderMdString(initialMd);

      const fetchLiveGitHubReadme = async () => {
        try {
          let res = await fetch(`https://raw.githubusercontent.com/Apisikma123/${proj.id}/main/README.md`);
          if (!res.ok) {
            res = await fetch(`https://raw.githubusercontent.com/Apisikma123/${proj.id}/master/README.md`);
          }
          if (res.ok) {
            const liveText = await res.text();
            if (liveText && liveText.trim()) {
              proj.readme = liveText;
              renderMdString(liveText);
              return;
            }
          }
          const apiRes = await fetch(`https://api.github.com/repos/Apisikma123/${proj.id}/readme`);
          if (apiRes.ok) {
            const apiData = await apiRes.json();
            if (apiData && apiData.content) {
              const decoded = decodeURIComponent(escape(atob(apiData.content.replace(/\s/g, ""))));
              proj.readme = decoded;
              renderMdString(decoded);
            }
          }
        } catch (rErr) {
          console.debug("Live README fetch notice:", rErr);
        }
      };

      fetchLiveGitHubReadme();
    }

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

    document.body.style.overflow = "hidden";
    projectDetailEl.classList.remove("hidden");
    projectDetailEl.style.display = "block";
    projectDetailEl.style.zIndex = "99999";
    projectDetailEl.scrollTop = 0;

    gsap.fromTo(
      projectDetailEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );

    const detailInner = projectDetailEl.querySelector(".max-w-5xl");
    if (detailInner) {
      gsap.fromTo(
        detailInner.children,
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: "power3.out", clearProps: "transform,scale" }
      );
    }
  } else if (viewName === "all-projects") {
    document.body.style.overflow = "hidden";
    projectDetailEl.classList.add("hidden");
    projectDetailEl.style.display = "none";
    allProjectsEl.classList.remove("hidden");
    allProjectsEl.style.display = "block";
    allProjectsEl.style.zIndex = "99999";
    allProjectsEl.scrollTop = 0;

    if (updateHash) {
      history.pushState(null, "", "#projects");
    }

    window.renderAllViewProjects();

    gsap.fromTo(
      allProjectsEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );

    const allInner = allProjectsEl.querySelector(".max-w-6xl");
    if (allInner) {
      gsap.fromTo(
        allInner.children,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", clearProps: "transform,scale" }
      );
    }

    gsap.fromTo(
      "#all-view-projects-grid > div",
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: "power3.out", delay: 0.15, clearProps: "transform,scale" }
    );
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
          <img src="/projects/foodify.webp" width="320" height="640" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none" />
          <div class="relative h-full aspect-[9/18.5] rounded-xl border-2 border-zinc-700 bg-black overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
            <img src="/projects/foodify.webp" alt="${p.displayName}" width="320" height="640" loading="lazy" decoding="async" class="w-full h-full object-cover object-top" />
          </div>
          <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[0.55rem] font-mono text-[#DC143C] border border-white/10">Mobile UI</div>
        </div>
      `;
    } else if (hasKnownImg) {
      topPreviewHtml = `
        <div class="aspect-video w-full overflow-hidden relative border-b border-white/10 bg-zinc-950">
          <img src="${hasKnownImg}" alt="${p.displayName}" width="640" height="360" loading="lazy" decoding="async" class="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
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
// 9. CENTRALIZED WEBSITE PRICING CONFIGURATOR ENGINE
// ═══════════════════════════════════════════════════════════
const PRICING_WA_NUMBER = getProtectedWhatsAppNumber();

export const PRICING_CONFIG = {
  websiteTypes: [
    {
      id: "landing-page",
      icon: "rocket_launch",
      nameId: "Landing Page",
      nameEn: "Landing Page",
      basePrice: 699000,
      descId: "Promosi produk, jasa, campaign, iklan, event",
      descEn: "Product promotion, services, campaigns, ads, events",
      includedId: "1 halaman, responsive, CTA, WhatsApp, form sederhana, basic SEO",
      includedEn: "1 page, responsive, CTA, WhatsApp, simple form, basic SEO",
      hasPages: true,
      addonCategories: ["general"],
    },
    {
      id: "portfolio",
      icon: "palette",
      nameId: "Portfolio",
      nameEn: "Portfolio",
      basePrice: 799000,
      descId: "Freelancer, developer, designer, fotografer, personal brand",
      descEn: "Freelancer, developer, designer, photographer, personal brand",
      includedId: "Home, About, Portfolio, Contact, responsive, WhatsApp/contact CTA",
      includedEn: "Home, About, Portfolio, Contact, responsive, WhatsApp/contact CTA",
      hasPages: true,
      addonCategories: ["general", "business"],
    },
    {
      id: "company-profile",
      icon: "domain",
      nameId: "Company Profile",
      nameEn: "Company Profile",
      basePrice: 1290000,
      descId: "UMKM, perusahaan, jasa, organisasi, bisnis lokal",
      descEn: "SMEs, companies, services, organizations, local businesses",
      includedId: "Home, About, Services, Gallery/Portfolio, Contact, WhatsApp, Google Maps, responsive",
      includedEn: "Home, About, Services, Gallery/Portfolio, Contact, WhatsApp, Google Maps, responsive",
      hasPages: true,
      addonCategories: ["general", "business"],
    },
    {
      id: "blog-news",
      icon: "article",
      nameId: "Blog / News",
      nameEn: "Blog / News",
      basePrice: 1790000,
      descId: "Blog, portal berita, media, content publishing",
      descEn: "Blog, news portal, media, content publishing",
      includedId: "Homepage, article listing, article detail, category, search, responsive, basic admin/CMS",
      includedEn: "Homepage, article listing, article detail, category, search, responsive, basic admin/CMS",
      hasPages: true,
      addonCategories: ["general", "business"],
    },
    {
      id: "booking",
      icon: "calendar_month",
      nameId: "Booking / Reservasi",
      nameEn: "Booking / Reservation",
      basePrice: 3490000,
      descId: "Salon, barbershop, rental, konsultasi, jasa, event",
      descEn: "Salon, barbershop, rental, consultation, services, events",
      includedId: "Booking form, date/time selection, booking data, admin management dasar, confirmation flow",
      includedEn: "Booking form, date/time selection, booking data, basic admin management, confirmation flow",
      hasPages: false,
      addonCategories: ["general", "business", "booking"],
    },
    {
      id: "online-store",
      icon: "storefront",
      nameId: "Online Store",
      nameEn: "Online Store",
      basePrice: 3990000,
      descId: "Toko online, e-commerce, katalog produk",
      descEn: "Online shop, e-commerce, product catalog",
      includedId: "Product catalog, category, product detail, cart, checkout, order management dasar, admin product management",
      includedEn: "Product catalog, category, product detail, cart, checkout, basic order management, admin product management",
      hasPages: false,
      addonCategories: ["general", "business", "ecommerce"],
    },
    {
      id: "attendance",
      icon: "fingerprint",
      nameId: "Attendance / Absensi",
      nameEn: "Attendance System",
      basePrice: 4490000,
      descId: "Sistem absensi, pencatatan kehadiran, laporan",
      descEn: "Attendance system, attendance tracking, reports",
      includedId: "Login, data karyawan, check-in/check-out, riwayat absensi, admin dashboard dasar, laporan kehadiran",
      includedEn: "Login, employee data, check-in/check-out, attendance history, basic admin dashboard, attendance report",
      hasPages: false,
      addonCategories: ["general", "attendance"],
    },
    {
      id: "information-system",
      icon: "database",
      nameId: "Information System",
      nameEn: "Information System",
      basePrice: 5990000,
      descId: "Sistem internal, dashboard, management system, data management",
      descEn: "Internal system, dashboard, management system, data management",
      includedId: "Authentication, dashboard, CRUD dasar, search/filter dasar, user management dasar",
      includedEn: "Authentication, dashboard, basic CRUD, basic search/filter, basic user management",
      hasPages: false,
      addonCategories: ["general", "business"],
    },
    {
      id: "membership",
      icon: "group",
      nameId: "Membership / Portal",
      nameEn: "Membership / Portal",
      basePrice: 6990000,
      descId: "Portal member, membership, komunitas, akses terbatas",
      descEn: "Member portal, membership, community, restricted access",
      includedId: "Registration, login, member profile, protected pages, basic member dashboard, admin management",
      includedEn: "Registration, login, member profile, protected pages, basic member dashboard, admin management",
      hasPages: false,
      addonCategories: ["general", "business"],
    },
    {
      id: "custom-web-app",
      icon: "code",
      nameId: "Custom Web App",
      nameEn: "Custom Web App",
      basePrice: 7990000,
      maxPrice: 29990000,
      descId: "Kebutuhan khusus yang tidak cocok dengan kategori standar",
      descEn: "Custom needs that don't fit standard categories",
      includedId: "Disesuaikan dengan kebutuhan proyek",
      includedEn: "Tailored to project requirements",
      hasPages: false,
      isCustom: true,
      addonCategories: ["general"],
    },
  ],
  pageOptions: {
    "landing-page": [{ labelId: "1 halaman — termasuk", labelEn: "1 page — included", price: 0 }],
    "portfolio": [
      { labelId: "3–5 halaman — termasuk", labelEn: "3–5 pages — included", price: 0 },
      { labelId: "6–8 halaman", labelEn: "6–8 pages", price: 300000 },
    ],
    "company-profile": [
      { labelId: "3–5 halaman — termasuk", labelEn: "3–5 pages — included", price: 0 },
      { labelId: "6–8 halaman", labelEn: "6–8 pages", price: 350000 },
      { labelId: "9–12 halaman", labelEn: "9–12 pages", price: 750000 },
    ],
    "blog-news": [
      { labelId: "5–8 halaman/struktur — termasuk", labelEn: "5–8 pages/structure — included", price: 0 },
      { labelId: "Custom structure", labelEn: "Custom structure", price: 500000 },
    ],
  },
  designLevels: [
    {
      id: "clean",
      nameId: "Clean / Standard",
      nameEn: "Clean / Standard",
      price: 0,
      descId: "Clean modern UI, existing design system, responsive, basic interaction, simple animation",
      descEn: "Clean modern UI, existing design system, responsive, basic interaction, simple animation",
      icon: "design_services",
    },
    {
      id: "custom-modern",
      nameId: "Custom Modern",
      nameEn: "Custom Modern",
      price: 350000,
      descId: "Custom visual direction, custom section layout, enhanced interaction, more distinctive design, custom hero section",
      descEn: "Custom visual direction, custom section layout, enhanced interaction, more distinctive design, custom hero section",
      icon: "brush",
    },
    {
      id: "premium-custom",
      nameId: "Premium Custom",
      nameEn: "Premium Custom",
      price: 750000,
      descId: "Custom visual direction, advanced section composition, advanced interaction, custom animation, more detailed UI/UX treatment",
      descEn: "Custom visual direction, advanced section composition, advanced interaction, custom animation, more detailed UI/UX treatment",
      icon: "auto_awesome",
    },
  ],
  addons: {
    general: [
      { id: "extra-page", nameId: "Extra Page", nameEn: "Extra Page", price: 150000, perUnit: "/page" },
      { id: "whatsapp-cta", nameId: "WhatsApp CTA / Integration", nameEn: "WhatsApp CTA / Integration", price: 150000 },
      { id: "google-maps", nameId: "Google Maps", nameEn: "Google Maps", price: 100000 },
      { id: "contact-form", nameId: "Contact Form", nameEn: "Contact Form", price: 150000 },
      { id: "basic-seo", nameId: "Basic SEO", nameEn: "Basic SEO", price: 250000 },
      { id: "google-analytics", nameId: "Google Analytics", nameEn: "Google Analytics", price: 200000 },
      { id: "search-console", nameId: "Search Console Setup", nameEn: "Search Console Setup", price: 200000 },
      { id: "image-optimization", nameId: "Image Optimization / WebP", nameEn: "Image Optimization / WebP", price: 200000 },
      { id: "copywriting", nameId: "Copywriting", nameEn: "Copywriting", price: 150000, perUnit: "/page" },
      { id: "extra-revision", nameId: "Revisi Tambahan", nameEn: "Additional Revision", price: 100000, perUnit: "/round" },
    ],
    business: [
      { id: "blog-addon", nameId: "Blog / News", nameEn: "Blog / News", price: 400000 },
      { id: "testimonial", nameId: "Testimonial", nameEn: "Testimonial", price: 150000 },
      { id: "faq", nameId: "FAQ", nameEn: "FAQ", price: 100000 },
      { id: "portfolio-case", nameId: "Portfolio / Case Study", nameEn: "Portfolio / Case Study", price: 250000 },
      { id: "simple-cms", nameId: "Simple CMS", nameEn: "Simple CMS", price: 500000 },
      { id: "admin-dashboard", nameId: "Admin Dashboard", nameEn: "Admin Dashboard", price: 1500000, isStarting: true },
    ],
    ecommerce: [
      { id: "payment-gateway", nameId: "Payment Gateway", nameEn: "Payment Gateway", price: 1000000, isStarting: true, noteId: "Biaya transaksi pihak ketiga tidak termasuk", noteEn: "Third-party fees NOT included" },
      { id: "shipping-api", nameId: "Shipping API", nameEn: "Shipping API", price: 750000, isStarting: true, noteId: "Biaya API pihak ketiga tidak termasuk", noteEn: "Third-party API fees NOT included" },
      { id: "product-import", nameId: "Product Import", nameEn: "Product Import", price: 250000, perUnit: "/batch" },
      { id: "product-variant", nameId: "Product Variant", nameEn: "Product Variant", price: 500000, isStarting: true },
      { id: "voucher-discount", nameId: "Voucher / Discount", nameEn: "Voucher / Discount", price: 300000 },
      { id: "customer-account", nameId: "Customer Account", nameEn: "Customer Account", price: 500000 },
      { id: "adv-order-mgmt", nameId: "Advanced Order Management", nameEn: "Advanced Order Management", price: 750000, isStarting: true },
    ],
    booking: [
      { id: "calendar-mgmt", nameId: "Calendar Management", nameEn: "Calendar Management", price: 500000 },
      { id: "wa-booking-notif", nameId: "WhatsApp Booking Notification", nameEn: "WhatsApp Booking Notification", price: 500000 },
      { id: "booking-payment", nameId: "Payment for Booking", nameEn: "Payment for Booking", price: 750000, isStarting: true },
      { id: "multi-staff", nameId: "Multiple Staff", nameEn: "Multiple Staff", price: 750000 },
      { id: "schedule-mgmt", nameId: "Schedule Management", nameEn: "Schedule Management", price: 750000 },
    ],
    attendance: [
      { id: "qr-attendance", nameId: "QR Code Attendance", nameEn: "QR Code Attendance", price: 750000 },
      { id: "gps-validation", nameId: "GPS / Location Validation", nameEn: "GPS / Location Validation", price: 1000000 },
      { id: "shift-mgmt", nameId: "Shift Management", nameEn: "Shift Management", price: 750000 },
      { id: "leave-mgmt", nameId: "Cuti / Izin Management", nameEn: "Leave / Permission Management", price: 750000 },
      { id: "multi-role", nameId: "Multi-role Access", nameEn: "Multi-role Access", price: 500000 },
      { id: "excel-export", nameId: "Excel Export", nameEn: "Excel Export", price: 250000 },
      { id: "pdf-report", nameId: "PDF Report", nameEn: "PDF Report", price: 300000 },
      { id: "adv-attend-dash", nameId: "Advanced Attendance Dashboard", nameEn: "Advanced Attendance Dashboard", price: 750000 },
    ],
  },
  customOptions: {
    projectTypes: [
      { id: "business-system", labelId: "Business System", labelEn: "Business System" },
      { id: "dashboard", labelId: "Dashboard", labelEn: "Dashboard" },
      { id: "internal-system", labelId: "Internal System", labelEn: "Internal System" },
      { id: "saas", labelId: "SaaS", labelEn: "SaaS" },
      { id: "marketplace", labelId: "Marketplace", labelEn: "Marketplace" },
      { id: "crm", labelId: "CRM", labelEn: "CRM" },
      { id: "inventory", labelId: "Inventory", labelEn: "Inventory" },
      { id: "other", labelId: "Lainnya", labelEn: "Other" },
    ],
    authOptions: [
      { id: "none", labelId: "Tidak Ada", labelEn: "None" },
      { id: "basic-login", labelId: "Basic Login", labelEn: "Basic Login" },
      { id: "multi-role", labelId: "Multi-role", labelEn: "Multi-role" },
      { id: "adv-role", labelId: "Advanced Role & Permission", labelEn: "Advanced Role & Permission" },
    ],
    dataOptions: [
      { id: "crud", labelId: "CRUD", labelEn: "CRUD" },
      { id: "search", labelId: "Search", labelEn: "Search" },
      { id: "filter", labelId: "Filter", labelEn: "Filter" },
      { id: "import", labelId: "Import", labelEn: "Import" },
      { id: "export", labelId: "Export", labelEn: "Export" },
      { id: "reporting", labelId: "Reporting", labelEn: "Reporting" },
    ],
    integrations: [
      { id: "int-whatsapp", labelId: "WhatsApp", labelEn: "WhatsApp" },
      { id: "int-payment", labelId: "Payment", labelEn: "Payment" },
      { id: "int-maps", labelId: "Google Maps", labelEn: "Google Maps" },
      { id: "int-external-api", labelId: "External API", labelEn: "External API" },
      { id: "int-email", labelId: "Email", labelEn: "Email" },
      { id: "int-other", labelId: "Lainnya", labelEn: "Other" },
    ],
    scaleOptions: [
      { id: "small", labelId: "Kecil (1–50 user)", labelEn: "Small (1–50 users)" },
      { id: "medium", labelId: "Menengah (50–500 user)", labelEn: "Medium (50–500 users)" },
      { id: "large", labelId: "Besar (500+ user)", labelEn: "Large (500+ users)" },
    ],
  },
  businessTypes: [
    { id: "kuliner", labelId: "Kuliner", labelEn: "Culinary" },
    { id: "fashion", labelId: "Fashion", labelEn: "Fashion" },
    { id: "jasa", labelId: "Jasa", labelEn: "Services" },
    { id: "pendidikan", labelId: "Pendidikan", labelEn: "Education" },
    { id: "properti", labelId: "Properti", labelEn: "Property" },
    { id: "kesehatan", labelId: "Kesehatan", labelEn: "Healthcare" },
    { id: "teknologi", labelId: "Teknologi", labelEn: "Technology" },
    { id: "lainnya", labelId: "Lainnya", labelEn: "Other" },
  ],
  projectGoals: [
    { id: "introduce", labelId: "Memperkenalkan bisnis", labelEn: "Introduce my business" },
    { id: "customers", labelId: "Mendapatkan pelanggan", labelEn: "Get customers" },
    { id: "sell", labelId: "Menjual produk", labelEn: "Sell products" },
    { id: "booking", labelId: "Menerima booking", labelEn: "Accept bookings" },
    { id: "internal", labelId: "Sistem internal", labelEn: "Internal system" },
    { id: "portfolio", labelId: "Portfolio", labelEn: "Portfolio" },
    { id: "other", labelId: "Lainnya", labelEn: "Other" },
  ],
};

export const pricingState = {
  step: 1,
  websiteType: "landing-page",
  pageOption: 0,
  designLevel: "clean",
  selectedAddons: new Set(),
  clientName: "",
  businessType: null,
  projectGoal: null,
  clientNotes: "",
  customProjectType: null,
  customAuth: null,
  customData: new Set(),
  customIntegrations: new Set(),
  customScale: null,
};

export const formatPricingRp = (amount) => {
  if (amount >= 1000000) {
    const jt = amount / 1000000;
    const formatted = jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `Rp${formatted}JT`;
  }
  return `Rp${amount.toLocaleString("id-ID")}`;
};

export const formatPricingRpFull = (amount) => `Rp${amount.toLocaleString("id-ID")}`;

export const calculatePricingTotal = () => {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  if (!wt) return { min: 0, max: 0, breakdown: [], isRange: false, isCustom: false };

  let total = wt.basePrice;
  const breakdown = [{ label: currentLang === "en" ? "Base price" : "Harga dasar", value: wt.basePrice, name: currentLang === "en" ? wt.nameEn : wt.nameId }];

  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const po = PRICING_CONFIG.pageOptions[wt.id][pricingState.pageOption];
    if (po && po.price > 0) {
      total += po.price;
      breakdown.push({ label: currentLang === "en" ? "Pages" : "Halaman", value: po.price, name: currentLang === "en" ? po.labelEn : po.labelId });
    }
  }

  const dl = PRICING_CONFIG.designLevels.find((d) => d.id === pricingState.designLevel);
  if (dl && dl.price > 0) {
    total += dl.price;
    breakdown.push({ label: currentLang === "en" ? "Design" : "Desain", value: dl.price, name: currentLang === "en" ? dl.nameEn : dl.nameId });
  }

  let addonsTotal = 0;
  let hasStarting = false;
  const addonNames = [];

  pricingState.selectedAddons.forEach((aid) => {
    for (const cat of Object.values(PRICING_CONFIG.addons)) {
      const a = cat.find((x) => x.id === aid);
      if (a) {
        addonsTotal += a.price;
        addonNames.push(currentLang === "en" ? a.nameEn : a.nameId);
        if (a.isStarting) hasStarting = true;
        break;
      }
    }
  });

  if (addonsTotal > 0) {
    total += addonsTotal;
    breakdown.push({ label: currentLang === "en" ? "Add-ons" : "Fitur tambahan", value: addonsTotal, names: addonNames });
  }

  let min = total;
  let max = total;
  if (wt.isCustom) {
    max = Math.max(total * 1.5, wt.maxPrice || total * 2);
  } else if (hasStarting) {
    max = Math.round(total * 1.3);
  }

  return { min, max, breakdown, isRange: min !== max, isCustom: !!wt.isCustom };
};

export const renderPricingTypeCards = () => {
  const grid = document.getElementById("pricing-type-grid");
  if (!grid) return;
  grid.innerHTML = "";

  PRICING_CONFIG.websiteTypes.forEach((wt) => {
    const isSelected = pricingState.websiteType === wt.id;
    const priceDisplay = wt.isCustom
      ? `${currentLang === "en" ? "Starting" : "Mulai"} ${formatPricingRp(wt.basePrice)}`
      : formatPricingRpFull(wt.basePrice);

    const card = document.createElement("button");
    card.type = "button";
    card.className = `pricing-type-card ${isSelected ? "selected" : ""}`;
    card.onclick = () => {
      pricingState.websiteType = wt.id;
      pricingState.pageOption = 0;
      pricingState.selectedAddons = new Set();
      renderPricingTypeCards();
      updatePricingUI();
      const nextBtn = document.getElementById("pricing-btn-next-1");
      if (nextBtn) nextBtn.disabled = false;
    };

    card.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#DC143C]/20 text-[#DC143C]" : "bg-white/5 text-zinc-400"}">
          <span class="material-symbols-outlined text-lg">${wt.icon}</span>
        </div>
        <div class="flex-1 min-w-0 text-left">
          <div class="flex items-center justify-between gap-2 mb-0.5">
            <h4 class="text-sm font-semibold ${isSelected ? "text-white" : "text-zinc-200"} truncate">${currentLang === "en" ? wt.nameEn : wt.nameId}</h4>
            <span class="font-mono text-[0.65rem] font-semibold shrink-0 ${isSelected ? "text-[#DC143C]" : "text-zinc-400"}">${priceDisplay}</span>
          </div>
          <p class="text-[0.68rem] ${isSelected ? "text-zinc-300" : "text-zinc-500"} leading-relaxed">${currentLang === "en" ? wt.descEn : wt.descId}</p>
        </div>
      </div>
      ${isSelected ? `
      <div class="mt-3 pt-3 border-t border-white/5">
        <p class="text-[0.6rem] text-zinc-500 uppercase tracking-wider font-mono mb-1">${currentLang === "en" ? "Included" : "Termasuk"}</p>
        <p class="text-[0.65rem] text-zinc-400 leading-relaxed">${currentLang === "en" ? wt.includedEn : wt.includedId}</p>
      </div>` : ""}
    `;
    grid.appendChild(card);
  });
};

export const renderPricingPageOptions = () => {
  const sec = document.getElementById("pricing-page-count-section");
  const con = document.getElementById("pricing-page-options");
  if (!sec || !con) return;

  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  if (!wt || !wt.hasPages || !PRICING_CONFIG.pageOptions[wt.id]) {
    sec.classList.add("hidden");
    return;
  }

  sec.classList.remove("hidden");
  con.innerHTML = "";

  PRICING_CONFIG.pageOptions[wt.id].forEach((opt, idx) => {
    const isSelected = pricingState.pageOption === idx;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pricing-option-card ${isSelected ? "selected" : ""}`;
    btn.onclick = () => {
      pricingState.pageOption = idx;
      renderPricingPageOptions();
      updatePricingUI();
    };
    btn.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs ${isSelected ? "text-white font-medium" : "text-zinc-300"}">${currentLang === "en" ? opt.labelEn : opt.labelId}</span>
        <span class="font-mono text-[0.65rem] ${isSelected ? "text-[#DC143C] font-semibold" : "text-zinc-500"}">${opt.price === 0 ? (currentLang === "en" ? "Included" : "Termasuk") : `+${formatPricingRpFull(opt.price)}`}</span>
      </div>
    `;
    con.appendChild(btn);
  });
};

export const renderPricingAddons = () => {
  const con = document.getElementById("pricing-addon-chips");
  const cSec = document.getElementById("pricing-custom-app-section");
  if (!con) return;

  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  con.innerHTML = "";
  if (!wt) return;

  if (cSec) {
    if (wt.isCustom) {
      cSec.classList.remove("hidden");
      renderPricingCustomOptions();
    } else {
      cSec.classList.add("hidden");
    }
  }

  const cats = wt.addonCategories || ["general"];
  const catNames = {
    general: currentLang === "en" ? "General" : "Umum",
    business: currentLang === "en" ? "Business" : "Bisnis",
    ecommerce: "E-Commerce",
    booking: "Booking",
    attendance: currentLang === "en" ? "Attendance" : "Absensi",
  };

  cats.forEach((cat) => {
    const addons = PRICING_CONFIG.addons[cat];
    if (!addons || !addons.length) return;

    const label = document.createElement("div");
    label.className = "w-full mt-4 first:mt-0 mb-1.5";
    label.innerHTML = `<span class="font-mono text-[0.58rem] text-zinc-500 uppercase tracking-wider">${catNames[cat] || cat}</span>`;
    con.appendChild(label);

    const row = document.createElement("div");
    row.className = "w-full flex flex-wrap gap-2 mb-1";

    addons.forEach((addon) => {
      const isSelected = pricingState.selectedAddons.has(addon.id);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `pricing-addon-chip ${isSelected ? "selected" : ""}`;
      chip.onclick = () => {
        if (isSelected) {
          pricingState.selectedAddons.delete(addon.id);
        } else {
          pricingState.selectedAddons.add(addon.id);
        }
        renderPricingAddons();
        updatePricingUI();
      };
      const priceText = addon.isStarting
        ? `${currentLang === "en" ? "Starting" : "Mulai"} ${formatPricingRpFull(addon.price)}`
        : `${formatPricingRpFull(addon.price)}${addon.perUnit || ""}`;

      chip.innerHTML = `
        <span class="material-symbols-outlined text-xs ${isSelected ? "text-[#DC143C]" : "text-zinc-500"}">${isSelected ? "check_circle" : "add_circle_outline"}</span>
        <span class="text-[0.7rem] ${isSelected ? "text-white" : "text-zinc-300"}">${currentLang === "en" ? addon.nameEn : addon.nameId}</span>
        <span class="font-mono text-[0.6rem] ${isSelected ? "text-[#DC143C]" : "text-zinc-500"}">${priceText}</span>
      `;
      row.appendChild(chip);
    });

    con.appendChild(row);
  });
};

export const renderPricingCustomOptions = () => {
  const renderGroup = (cid, opts, sel, onClick, isMulti) => {
    const c = document.getElementById(cid);
    if (!c) return;
    c.innerHTML = "";
    opts.forEach((o) => {
      const s = isMulti ? sel.has(o.id) : sel === o.id;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `pricing-addon-chip ${s ? "selected" : ""}`;
      chip.onclick = () => onClick(o.id);
      chip.innerHTML = `
        <span class="material-symbols-outlined text-xs ${s ? "text-[#DC143C]" : "text-zinc-500"}">${s ? "check_circle" : "radio_button_unchecked"}</span>
        <span class="text-[0.7rem] ${s ? "text-white" : "text-zinc-300"}">${currentLang === "en" ? o.labelEn : o.labelId}</span>
      `;
      c.appendChild(chip);
    });
  };

  renderGroup("pricing-custom-project-types", PRICING_CONFIG.customOptions.projectTypes, pricingState.customProjectType, (id) => {
    pricingState.customProjectType = pricingState.customProjectType === id ? null : id;
    renderPricingCustomOptions();
  }, false);

  renderGroup("pricing-custom-auth-options", PRICING_CONFIG.customOptions.authOptions, pricingState.customAuth, (id) => {
    pricingState.customAuth = pricingState.customAuth === id ? null : id;
    renderPricingCustomOptions();
  }, false);

  renderGroup("pricing-custom-data-options", PRICING_CONFIG.customOptions.dataOptions, pricingState.customData, (id) => {
    if (pricingState.customData.has(id)) pricingState.customData.delete(id);
    else pricingState.customData.add(id);
    renderPricingCustomOptions();
  }, true);

  renderGroup("pricing-custom-integrations", PRICING_CONFIG.customOptions.integrations, pricingState.customIntegrations, (id) => {
    if (pricingState.customIntegrations.has(id)) pricingState.customIntegrations.delete(id);
    else pricingState.customIntegrations.add(id);
    renderPricingCustomOptions();
  }, true);

  renderGroup("pricing-custom-scale-options", PRICING_CONFIG.customOptions.scaleOptions, pricingState.customScale, (id) => {
    pricingState.customScale = pricingState.customScale === id ? null : id;
    renderPricingCustomOptions();
  }, false);
};

export const renderPricingDesignCards = () => {
  const grid = document.getElementById("pricing-design-grid");
  if (!grid) return;
  grid.innerHTML = "";

  PRICING_CONFIG.designLevels.forEach((dl) => {
    const isSelected = pricingState.designLevel === dl.id;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `pricing-option-card ${isSelected ? "selected" : ""}`;
    card.onclick = () => {
      pricingState.designLevel = dl.id;
      renderPricingDesignCards();
      updatePricingUI();
    };
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#DC143C]/20 text-[#DC143C]" : "bg-white/5 text-zinc-400"}">
          <span class="material-symbols-outlined text-base">${dl.icon}</span>
        </div>
        <div class="flex-1 min-w-0 text-left">
          <div class="flex items-center justify-between gap-2 mb-0.5">
            <h4 class="text-sm font-semibold ${isSelected ? "text-white" : "text-zinc-200"}">${currentLang === "en" ? dl.nameEn : dl.nameId}</h4>
            <span class="font-mono text-[0.65rem] font-semibold shrink-0 ${isSelected ? "text-[#DC143C]" : "text-zinc-500"}">${dl.price === 0 ? (currentLang === "en" ? "Included" : "Termasuk") : `+${formatPricingRpFull(dl.price)}`}</span>
          </div>
          <p class="text-[0.65rem] ${isSelected ? "text-zinc-300" : "text-zinc-500"} leading-relaxed">${currentLang === "en" ? dl.descEn : dl.descId}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
};

export const renderPricingBusinessTypes = () => {
  const c = document.getElementById("pricing-business-types");
  if (!c) return;
  c.innerHTML = "";
  PRICING_CONFIG.businessTypes.forEach((b) => {
    const s = pricingState.businessType === b.id;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `pricing-addon-chip ${s ? "selected" : ""}`;
    chip.onclick = () => {
      pricingState.businessType = pricingState.businessType === b.id ? null : b.id;
      renderPricingBusinessTypes();
    };
    chip.innerHTML = `<span class="text-[0.7rem] ${s ? "text-white" : "text-zinc-300"}">${currentLang === "en" ? b.labelEn : b.labelId}</span>`;
    c.appendChild(chip);
  });
};

export const renderPricingProjectGoals = () => {
  const c = document.getElementById("pricing-project-goals");
  if (!c) return;
  c.innerHTML = "";
  PRICING_CONFIG.projectGoals.forEach((g) => {
    const s = pricingState.projectGoal === g.id;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `pricing-addon-chip ${s ? "selected" : ""}`;
    chip.onclick = () => {
      pricingState.projectGoal = pricingState.projectGoal === g.id ? null : g.id;
      renderPricingProjectGoals();
    };
    chip.innerHTML = `<span class="text-[0.7rem] ${s ? "text-white" : "text-zinc-300"}">${currentLang === "en" ? g.labelEn : g.labelId}</span>`;
    c.appendChild(chip);
  });
};

export const renderPricingSummary = () => {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  if (!wt) return;

  const price = calculatePricingTotal();
  const d = document.getElementById("pricing-summary-details");
  if (!d) return;

  let h = "";
  h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">${currentLang === "en" ? "Website type" : "Jenis website"}</span><span class="text-xs text-white font-medium">${currentLang === "en" ? wt.nameEn : wt.nameId}</span></div>`;

  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const po = PRICING_CONFIG.pageOptions[wt.id][pricingState.pageOption];
    if (po) {
      h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">${currentLang === "en" ? "Pages" : "Halaman"}</span><span class="text-xs text-white">${currentLang === "en" ? po.labelEn : po.labelId}</span></div>`;
    }
  }

  const dl = PRICING_CONFIG.designLevels.find((x) => x.id === pricingState.designLevel);
  if (dl) {
    h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">${currentLang === "en" ? "Design" : "Desain"}</span><span class="text-xs text-white">${currentLang === "en" ? dl.nameEn : dl.nameId}</span></div>`;
  }

  if (pricingState.selectedAddons.size > 0) {
    const names = [];
    pricingState.selectedAddons.forEach((aid) => {
      for (const cat of Object.values(PRICING_CONFIG.addons)) {
        const a = cat.find((x) => x.id === aid);
        if (a) {
          names.push(currentLang === "en" ? a.nameEn : a.nameId);
          break;
        }
      }
    });
    h += `<div class="py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400 block mb-1.5">${currentLang === "en" ? "Add-ons" : "Fitur tambahan"}</span><div class="flex flex-wrap gap-1.5">${names.map((n) => `<span class="text-[0.65rem] text-zinc-300 bg-white/5 rounded px-2 py-0.5">${n}</span>`).join("")}</div></div>`;
  }

  if (pricingState.businessType) {
    const b = PRICING_CONFIG.businessTypes.find((x) => x.id === pricingState.businessType);
    if (b) {
      h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">${currentLang === "en" ? "Business type" : "Jenis bisnis"}</span><span class="text-xs text-white">${currentLang === "en" ? b.labelEn : b.labelId}</span></div>`;
    }
  }

  if (pricingState.projectGoal) {
    const g = PRICING_CONFIG.projectGoals.find((x) => x.id === pricingState.projectGoal);
    if (g) {
      h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">${currentLang === "en" ? "Goal" : "Tujuan"}</span><span class="text-xs text-white">${currentLang === "en" ? g.labelEn : g.labelId}</span></div>`;
    }
  }

  if (wt.isCustom) {
    if (pricingState.customProjectType) {
      const p = PRICING_CONFIG.customOptions.projectTypes.find((x) => x.id === pricingState.customProjectType);
      if (p) h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">Project Type</span><span class="text-xs text-white">${currentLang === "en" ? p.labelEn : p.labelId}</span></div>`;
    }
    if (pricingState.customAuth) {
      const a = PRICING_CONFIG.customOptions.authOptions.find((x) => x.id === pricingState.customAuth);
      if (a) h += `<div class="flex items-center justify-between py-2.5 border-b border-white/5"><span class="text-xs text-zinc-400">Auth</span><span class="text-xs text-white">${currentLang === "en" ? a.labelEn : a.labelId}</span></div>`;
    }
  }

  d.innerHTML = h;
  const pe = document.getElementById("pricing-summary-price");
  if (pe) {
    pe.textContent = price.isRange || price.isCustom
      ? `${formatPricingRp(price.min)} – ${formatPricingRp(price.max)}`
      : formatPricingRp(price.min);
  }
};

export const updatePricingUI = () => {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  const sd = document.getElementById("pricing-sidebar-details");
  const sp = document.getElementById("pricing-sidebar-price-section");
  const spr = document.getElementById("pricing-sidebar-price");
  const sc = document.getElementById("pricing-sidebar-cta");

  if (!wt) {
    if (sd) sd.innerHTML = `<p class="text-xs text-zinc-500">${currentLang === "en" ? "Select a website type to begin." : "Pilih jenis website untuk memulai."}</p>`;
    if (sp) sp.classList.add("hidden");
    if (sc) sc.classList.add("hidden");
    return;
  }

  const price = calculatePricingTotal();
  const pt = price.isRange || price.isCustom
    ? `${formatPricingRp(price.min)} – ${formatPricingRp(price.max)}`
    : formatPricingRp(price.min);

  let h = `<div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-sm text-[#DC143C]">${wt.icon}</span><span class="text-xs text-white font-semibold">${currentLang === "en" ? wt.nameEn : wt.nameId}</span></div>`;

  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const po = PRICING_CONFIG.pageOptions[wt.id][pricingState.pageOption];
    if (po) h += `<p class="text-[0.68rem] text-zinc-400 mb-1">${currentLang === "en" ? po.labelEn : po.labelId}</p>`;
  }

  const dl = PRICING_CONFIG.designLevels.find((d) => d.id === pricingState.designLevel);
  if (dl) h += `<p class="text-[0.68rem] text-zinc-400 mb-2">${currentLang === "en" ? dl.nameEn : dl.nameId}</p>`;

  if (pricingState.selectedAddons.size > 0) {
    h += `<div class="flex flex-wrap gap-1 mt-2">`;
    pricingState.selectedAddons.forEach((aid) => {
      for (const cat of Object.values(PRICING_CONFIG.addons)) {
        const a = cat.find((x) => x.id === aid);
        if (a) {
          h += `<span class="text-[0.6rem] text-zinc-400 bg-white/5 rounded px-1.5 py-0.5">${currentLang === "en" ? a.nameEn : a.nameId}</span>`;
          break;
        }
      }
    });
    h += `</div>`;
  }

  if (sd) sd.innerHTML = h;
  if (spr) spr.textContent = pt;
  if (sp) sp.classList.remove("hidden");
  if (sc) sc.classList.remove("hidden");

  const topLivePrice = document.getElementById("pricing-top-live-price");
  const topLiveName = document.getElementById("pricing-top-live-name");
  if (topLivePrice) topLivePrice.textContent = pt;
  if (topLiveName) topLiveName.textContent = currentLang === "en" ? wt.nameEn : wt.nameId;

  const mobPrice = document.getElementById("pricing-mobile-bar-price");
  const mobName = document.getElementById("pricing-mobile-bar-name");
  if (mobPrice) mobPrice.textContent = pt;
  if (mobName) mobName.textContent = currentLang === "en" ? wt.nameEn : wt.nameId;
};

export const generatePricingWhatsAppMessage = () => {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === pricingState.websiteType);
  if (!wt) return "";

  const price = calculatePricingTotal();
  const pt = price.isRange || price.isCustom
    ? `${formatPricingRp(price.min)} – ${formatPricingRp(price.max)}`
    : formatPricingRp(price.min);

  pricingState.clientName = document.getElementById("pricing-client-name")?.value?.trim() || "";
  pricingState.clientNotes = document.getElementById("pricing-client-notes")?.value?.trim() || "";

  let m = "";
  m += pricingState.clientName
    ? `Halo, saya ${pricingState.clientName}. Saya tertarik membuat website.\n\n`
    : `Halo, saya tertarik membuat website.\n\n`;

  m += `═══ DETAIL KEBUTUHAN ═══\n\n`;
  m += `Jenis website:\n${currentLang === "en" ? wt.nameEn : wt.nameId}\n\n`;

  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const po = PRICING_CONFIG.pageOptions[wt.id][pricingState.pageOption];
    if (po) m += `Jumlah halaman:\n${currentLang === "en" ? po.labelEn : po.labelId}\n\n`;
  }

  const dl = PRICING_CONFIG.designLevels.find((d) => d.id === pricingState.designLevel);
  if (dl) m += `Desain:\n${currentLang === "en" ? dl.nameEn : dl.nameId}\n\n`;

  if (pricingState.selectedAddons.size > 0) {
    m += `Fitur tambahan:\n`;
    pricingState.selectedAddons.forEach((aid) => {
      for (const cat of Object.values(PRICING_CONFIG.addons)) {
        const a = cat.find((x) => x.id === aid);
        if (a) {
          m += `• ${currentLang === "en" ? a.nameEn : a.nameId}\n`;
          break;
        }
      }
    });
    m += "\n";
  }

  if (wt.isCustom) {
    if (pricingState.customProjectType) {
      const p = PRICING_CONFIG.customOptions.projectTypes.find((x) => x.id === pricingState.customProjectType);
      if (p) m += `Jenis proyek: ${currentLang === "en" ? p.labelEn : p.labelId}\n`;
    }
    if (pricingState.customAuth) {
      const a = PRICING_CONFIG.customOptions.authOptions.find((x) => x.id === pricingState.customAuth);
      if (a) m += `Authentication: ${currentLang === "en" ? a.labelEn : a.labelId}\n`;
    }
    if (pricingState.customData.size > 0) {
      const items = [];
      pricingState.customData.forEach((id) => {
        const o = PRICING_CONFIG.customOptions.dataOptions.find((x) => x.id === id);
        if (o) items.push(currentLang === "en" ? o.labelEn : o.labelId);
      });
      m += `Data Management: ${items.join(", ")}\n`;
    }
    if (pricingState.customIntegrations.size > 0) {
      const items = [];
      pricingState.customIntegrations.forEach((id) => {
        const o = PRICING_CONFIG.customOptions.integrations.find((x) => x.id === id);
        if (o) items.push(currentLang === "en" ? o.labelEn : o.labelId);
      });
      m += `Integrasi: ${items.join(", ")}\n`;
    }
    if (pricingState.customScale) {
      const s = PRICING_CONFIG.customOptions.scaleOptions.find((x) => x.id === pricingState.customScale);
      if (s) m += `Skala: ${currentLang === "en" ? s.labelEn : s.labelId}\n`;
    }
    m += "\n";
  }

  if (pricingState.businessType) {
    const b = PRICING_CONFIG.businessTypes.find((x) => x.id === pricingState.businessType);
    if (b) m += `Jenis bisnis:\n${currentLang === "en" ? b.labelEn : b.labelId}\n\n`;
  }

  if (pricingState.projectGoal) {
    const g = PRICING_CONFIG.projectGoals.find((x) => x.id === pricingState.projectGoal);
    if (g) m += `Tujuan:\n${currentLang === "en" ? g.labelEn : g.labelId}\n\n`;
  }

  m += `Estimasi awal:\n${pt}\n\n`;
  if (pricingState.clientNotes) m += `Catatan:\n${pricingState.clientNotes}\n\n`;

  m += `Saya ingin konsultasi lebih lanjut mengenai kebutuhan dan scope website tersebut.\n\nTerima kasih.`;
  return m;
};

window.openPricingConfigurator = (type) => {
  if (type) {
    pricingState.websiteType = type;
    document.querySelectorAll(".pricing-type-card").forEach((c) => {
      if (c.getAttribute("data-type") === type) {
        c.classList.add("selected");
      } else {
        c.classList.remove("selected");
      }
    });
    window.goToPricingStep(2);
  } else {
    window.goToPricingStep(1);
  }

  const configuratorBox = document.getElementById("pricing-configurator-box");
  if (configuratorBox) {
    configuratorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    gsap.fromTo(
      configuratorBox,
      { opacity: 0.7, scale: 0.98, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }
};

window.goToPricingStep = (step) => {
  if (step > 1 && !pricingState.websiteType) return;
  if (step < 1) step = 1;
  if (step > 6) step = 6;

  for (let i = 1; i <= 6; i++) {
    const s = document.getElementById(`pricing-step-${i}`);
    if (s) s.classList.add("hidden");
  }

  const targetStep = document.getElementById(`pricing-step-${step}`);
  if (targetStep) targetStep.classList.remove("hidden");
  pricingState.step = step;

  if (step === 2) {
    renderPricingPageOptions();
    renderPricingAddons();
  } else if (step === 3) {
    renderPricingDesignCards();
  } else if (step === 4) {
    renderPricingBusinessTypes();
    renderPricingProjectGoals();
  } else if (step === 5) {
    renderPricingSummary();
  } else if (step === 6) {
    const m = generatePricingWhatsAppMessage();
    const prev = document.getElementById("pricing-wa-preview");
    if (prev) prev.textContent = m;
    const btn = document.getElementById("pricing-wa-send-btn");
    if (btn) btn.href = `https://wa.me/${PRICING_WA_NUMBER}?text=${encodeURIComponent(m)}`;
  }

  const pBar = document.getElementById("pricing-progress-bar");
  if (pBar) pBar.style.width = `${(step / 6) * 100}%`;

  const pLabel = document.getElementById("pricing-progress-label");
  if (pLabel) pLabel.textContent = `${step} / 6`;

  const stepNamesEn = ["Type", "Features", "Design", "Details", "Estimate", "WhatsApp"];
  const stepNamesId = ["Jenis", "Fitur", "Desain", "Detail", "Estimasi", "WhatsApp"];
  const pName = document.getElementById("pricing-progress-step-name");
  if (pName) pName.textContent = currentLang === "en" ? stepNamesEn[step - 1] : stepNamesId[step - 1];

  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById(`pricing-step-indicator-${i}`);
    if (el) {
      if (i === step) {
        el.className = "py-1.5 px-2 rounded-lg border border-[#DC143C]/60 bg-[#DC143C]/20 text-[#DC143C] font-bold text-center transition-all shadow-[0_0_15px_rgba(220,20,60,0.3)] cursor-pointer truncate";
      } else if (i < step) {
        el.className = "py-1.5 px-2 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200 text-center transition-all hover:text-white cursor-pointer truncate";
      } else {
        el.className = "py-1.5 px-2 rounded-lg border border-white/5 bg-white/[0.01] text-zinc-500 text-center transition-all hover:text-zinc-300 cursor-pointer truncate";
      }
    }
  }

  updatePricingUI();
};

window.sendPricingWhatsApp = () => {
  const m = generatePricingWhatsAppMessage();
  window.open(`https://wa.me/${PRICING_WA_NUMBER}?text=${encodeURIComponent(m)}`, "_blank", "noopener,noreferrer");
};

export const initPricingConfigurator = () => {
  renderPricingTypeCards();
  window.goToPricingStep(1);
  updatePricingUI();
};

window.renderPricingOnLangChange = (lang) => {
  renderPricingTypeCards();
  if (pricingState.step === 2) {
    renderPricingPageOptions();
    renderPricingAddons();
  } else if (pricingState.step === 3) {
    renderPricingDesignCards();
  } else if (pricingState.step === 4) {
    renderPricingBusinessTypes();
    renderPricingProjectGoals();
  } else if (pricingState.step === 5) {
    renderPricingSummary();
  }
  window.goToPricingStep(pricingState.step);
  updatePricingUI();
};

window.switchView = switchView;
window.__switchViewImpl = switchView;

// ═══════════════════════════════════════════════════════════
// MASTER DATA INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initData = async () => {
  renderFeaturedProjectsCarousel();
  initActivityHeatmap();
  initProjectsCarousel();
  initPricingMarketingCarousel();
  initPricingConfigurator();

  const loadDeferredData = () => {
    initSPAViews();
    initGitHubRepos();
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadDeferredData, { timeout: 3000 });
  } else {
    setTimeout(loadDeferredData, 1200);
  }
};
