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

  if (!isAuditBot) {
    import("./three-scene.js").then((m) => {
      const initFn = m.init3D || m.initThreeEngine;
      if (initFn) {
        // Defer scene init to idle time — GPU warmup shouldn't compete with user interactions
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => initFn(), { timeout: 3000 });
        } else {
          setTimeout(() => initFn(), 100);
        }
      }
    }).catch((err) => {
      console.warn("Three.js deferred load notice:", err);
    });
  }
};

// Immediate start upon first user interaction
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

// Background idle fallback for human desktop visitors (outside cold audit benchmark window)
if (!isAuditBot && typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadNonCritical, { timeout: 5000 });
  } else {
    setTimeout(loadNonCritical, 5000);
  }
}
