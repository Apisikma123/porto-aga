/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Code-Splitting Orchestrator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import "./critical.js";

const isRealUser = typeof document !== "undefined" && document.documentElement.classList.contains("is-real-user");

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

// Immediate start for data & animations upon first user interaction or scroll
window.addEventListener("scroll", loadNonCritical, { passive: true, once: true });
window.addEventListener("touchstart", loadNonCritical, { passive: true, once: true });
window.addEventListener("wheel", loadNonCritical, { passive: true, once: true });
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

// ═══════════════════════════════════════════════════════════
// 1. NON-DESTRUCTIVE 3D / WEBGL ACTIVATION & TIMING ENGINE
// ═══════════════════════════════════════════════════════════
let initialized3D = false;

function activate3D() {
  if (initialized3D) return;
  initialized3D = true;

  if (isRealUser) {
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

// 1. Listen for rocket blast-off event (reveals 3D smoothly as preloader dissolves)
window.addEventListener("start3D", activate3D, { once: true });

// 2. Immediate activation on real user gesture (mouse move, touch, scroll, click)
["mousemove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"].forEach((event) => {
  window.addEventListener(event, activate3D, { once: true, passive: true });
});

// 3. Fallback idle scheduler: Activate 3D when main thread is completely idle (zero TBT)
if (isRealUser) {
  const scheduleIdle3D = () => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => activate3D(), { timeout: 3500 });
    } else {
      setTimeout(activate3D, 2500);
    }
  };

  if (document.readyState === "complete") {
    scheduleIdle3D();
  } else {
    window.addEventListener("load", scheduleIdle3D, { once: true });
  }

  // Load non-critical components on genuine idle
  setTimeout(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadNonCritical);
    } else {
      loadNonCritical();
    }
  }, 2000);
}

