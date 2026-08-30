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

  const schedule = typeof requestIdleCallback === "function" 
    ? (fn) => requestIdleCallback(fn, { timeout: 2000 }) 
    : (fn) => setTimeout(fn, 10);

  schedule(() => {
    import("./data-loader.js").then((m) => {
      if (m && m.initData) m.initData();
    });
  });

  schedule(() => {
    import("./animations.js").then((m) => {
      if (m && m.initAnimations) m.initAnimations();
    });
  });
};

// ═══════════════════════════════════════════════════════════
// 1. NON-DESTRUCTIVE 3D / WEBGL ACTIVATION & TIMING ENGINE
// ═══════════════════════════════════════════════════════════
let initialized3D = false;

function activate3D() {
  if (initialized3D) return;
  initialized3D = true;

  const schedule = typeof requestIdleCallback === "function" 
    ? (fn) => requestIdleCallback(fn, { timeout: 2000 }) 
    : (fn) => setTimeout(fn, 10);

  schedule(() => {
    import("./three-scene.js").then((m) => {
      const initFn = m.init3D || m.initThreeEngine || m.initThreeScene;
      if (typeof initFn === "function") {
        initFn();
      }
    }).catch((err) => {
      console.warn("Three.js deferred load notice:", err);
    });
  });
}

// Activation on real user gesture (mouse move, pointer down, touch, scroll, keydown, click)
["mousemove", "pointerdown", "touchstart", "wheel", "keydown", "scroll", "click"].forEach((event) => {
  window.addEventListener(event, activate3D, { once: true, passive: true });
  window.addEventListener(event, loadNonCritical, { once: true, passive: true });
});

