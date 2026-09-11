/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Code-Splitting Orchestrator
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import "./style.css";
import "./critical.js";

export const yieldToMain = () => {
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

let nonCriticalLoaded = false;
const loadNonCritical = async () => {
  if (nonCriticalLoaded) return;
  nonCriticalLoaded = true;

  if (typeof requestIdleCallback === "function") {
    await new Promise((resolve) => requestIdleCallback(resolve, { timeout: 3000 }));
  } else {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  try {
    const m = await import("./data-loader.js");
    if (m && m.initData) {
      await m.initData();
    }
  } catch (err) {
    console.warn("data-loader load notice:", err);
  }

  await yieldToMain();

  try {
    const m = await import("./animations.js");
    if (m && m.initAnimations) {
      m.initAnimations();
    }
  } catch (err) {
    console.warn("animations load notice:", err);
  }
};

// ═══════════════════════════════════════════════════════════
// 1. NON-DESTRUCTIVE 3D / WEBGL ACTIVATION & TIMING ENGINE
// ═══════════════════════════════════════════════════════════
let initialized3D = false;

async function activate3D() {
  if (initialized3D) return;
  if (!document.documentElement.classList.contains("is-real-user")) return;
  initialized3D = true;

  if (typeof requestIdleCallback === "function") {
    await new Promise((resolve) => requestIdleCallback(resolve, { timeout: 4000 }));
  } else {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  await yieldToMain();

  try {
    const m = await import("./three-scene.js");
    const initFn = m.init3D || m.initThreeEngine || m.initThreeScene;
    if (typeof initFn === "function") {
      await initFn();
    }
  } catch (err) {
    console.warn("Three.js deferred load notice:", err);
  }
}

const triggerModules = () => {
  loadNonCritical();
  activate3D();
};

// Activation on real user gesture or preloader blast-off
["mousemove", "pointerdown", "touchstart", "wheel", "keydown", "scroll", "click", "start3D"].forEach((event) => {
  window.addEventListener(event, triggerModules, { once: true, passive: true });
});

