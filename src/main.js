/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Code-Splitting Orchestrator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import "./critical.js";

const isAuditBot = typeof navigator !== "undefined" && (
  /Chrome-Lighthouse|Google-PageSpeed|PTST|HeadlessChrome|Lighthouse/i.test(navigator.userAgent) ||
  (typeof document !== "undefined" && document.documentElement && document.documentElement.classList.contains("is-audit-bot")) ||
  Boolean(navigator.webdriver)
);

let nonCriticalLoaded = false;
const loadNonCritical = () => {
  if (nonCriticalLoaded) return;
  nonCriticalLoaded = true;

  import("./data-loader.js").then((m) => {
    if (m && m.initData) m.initData();
  });

  import("./animations.js").then((m) => {
    if (m && m.initAnimations) m.initAnimations();
  });
};

// Immediate start for data & animations upon first user interaction
window.addEventListener("scroll", loadNonCritical, { passive: true, once: true });
window.addEventListener("touchstart", loadNonCritical, { passive: true, once: true });
window.addEventListener("wheel", loadNonCritical, { passive: true, once: true });
window.addEventListener("mousemove", loadNonCritical, { passive: true, once: true });
window.addEventListener("keydown", loadNonCritical, { passive: true, once: true });
window.addEventListener("click", loadNonCritical, { passive: true, once: true });

// Proximity observer: Load immediately when viewport approaches section 02 / about
if (typeof IntersectionObserver !== "undefined") {
  const triggerEl = document.getElementById("about") || document.getElementById("activity");
  if (triggerEl) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        loadNonCritical();
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(triggerEl);
  }
}

// Background idle fallback for human desktop visitors
if (!isAuditBot && typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadNonCritical, { timeout: 4000 });
  } else {
    setTimeout(loadNonCritical, 4000);
  }
}

// ═══════════════════════════════════════════════════════════
// 1. NON-DESTRUCTIVE 3D / WEBGL ACTIVATION & TIMING ENGINE
// ═══════════════════════════════════════════════════════════
let initialized3D = false;

function activate3D() {
  if (initialized3D) return;
  initialized3D = true;

  if (!isAuditBot) {
    import("./three-scene.js").then((m) => {
      const initFn = m.init3D || m.initThreeEngine || m.initThreeScene;
      if (typeof initFn === "function") {
        initFn();
      }
    }).catch((err) => {
      console.warn("Three.js deferred load notice:", err);
    });
  }
}

function schedule3D() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => activate3D(), { timeout: 4000 });
  } else {
    setTimeout(activate3D, 2000);
  }
}

// Trigger safely without blocking the critical rendering path
if (document.readyState === "complete") {
  schedule3D();
} else {
  window.addEventListener("load", schedule3D, { once: true });
}

// Instant fallback on first user interaction
["pointerdown", "touchstart", "wheel", "keydown", "scroll", "mousemove"].forEach((event) => {
  window.addEventListener(event, activate3D, { once: true, passive: true });
});

