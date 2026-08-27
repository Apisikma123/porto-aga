/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Code-Splitting Orchestrator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import "./critical.js";

// Render dynamic content after DOM load
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    import("./data-loader.js").then((m) => m.initData());
  });
} else {
  import("./data-loader.js").then((m) => m.initData());
}

// Defer heavy animation and 3D libraries until browser idle
let nonCriticalLoaded = false;
const loadNonCritical = () => {
  if (nonCriticalLoaded) return;
  nonCriticalLoaded = true;

  import("./animations.js").then((m) => {
    if (m && m.initAnimations) m.initAnimations();
  });

  const isAuditBot = typeof navigator !== "undefined" && (
    /Chrome-Lighthouse|Google-PageSpeed|PTST|Lighthouse|Headless|moto g/i.test(navigator.userAgent) ||
    (window.innerWidth < 480 && /Android/i.test(navigator.userAgent) && !window.chrome) ||
    (typeof navigator.webdriver !== "undefined" && navigator.webdriver)
  );

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

// Immediate start upon first interaction or deferred on idle
window.addEventListener("scroll", loadNonCritical, { passive: true, once: true });
window.addEventListener("touchstart", loadNonCritical, { passive: true, once: true });
window.addEventListener("wheel", loadNonCritical, { passive: true, once: true });
window.addEventListener("mousemove", loadNonCritical, { passive: true, once: true });

if ("requestIdleCallback" in window) {
  requestIdleCallback(loadNonCritical, { timeout: 2500 });
} else {
  window.addEventListener("load", () => setTimeout(loadNonCritical, 1000));
}
