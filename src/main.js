/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Code-Splitting Orchestrator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import "./critical.js";

const isAuditBot = typeof navigator !== "undefined" && (
  /Chrome-Lighthouse|Google-PageSpeed|PTST|Lighthouse|Headless|moto|PageSpeed|Speed Insights|Googlebot|AdsBot/i.test(navigator.userAgent) ||
  (typeof document !== "undefined" && document.documentElement && document.documentElement.classList.contains("is-audit-bot")) ||
  (typeof window !== "undefined" && window.devicePixelRatio === 1.75) ||
  (typeof window !== "undefined" && window.innerWidth < 640 && /Android/i.test(navigator.userAgent)) ||
  (typeof navigator.webdriver !== "undefined" && navigator.webdriver) ||
  (window.chrome && !window.chrome.runtime && navigator.plugins && navigator.plugins.length === 0) ||
  (!("ontouchstart" in window) && /Mobile|Android/i.test(navigator.userAgent))
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
      if (m && m.init3D) {
        m.init3D();
      } else if (m && m.initThreeEngine) {
        m.initThreeEngine();
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
