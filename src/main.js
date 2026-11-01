/* ═══════════════════════════════════════════════════════════
   main.js — Modular Entry Point & Mobile-First 2D/Desktop-3D Orchestrator
   Muhammad Aga Putra | Software Engineer & Frontend Specialist
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
    await new Promise((resolve) => requestIdleCallback(resolve, { timeout: 1500 }));
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
// 1. DESKTOP-ONLY 3D / WEBGL ENGINE (Mobile is 100% 2D & Lightweight)
// ═══════════════════════════════════════════════════════════
let initialized3D = false;

export async function activate3D() {
  if (initialized3D) return;

  // STRICT REQUIREMENT: Mobile devices (<1024px) are 100% 2D.
  // Never load Three.js, shaders, or 3.5MB GLB models on mobile.
  if (typeof window === "undefined") return;
  const isMobile = window.innerWidth < 1024;

  if (isMobile) {
    return;
  }

  initialized3D = true;

  // Pre-fetch 3D models only on desktop
  if (typeof document !== "undefined") {
    ["/tesseract.glb", "/need_some_space.glb"].forEach((url) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "fetch";
      link.href = url;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }

  await yieldToMain();

  try {
    const m = await import("./three-scene.js");
    await yieldToMain();
    const initFn = m.init3D || m.initThreeEngine || m.initThreeScene;
    if (typeof initFn === "function") {
      await initFn();
    }
  } catch (err) {
    console.warn("Three.js deferred load notice:", err);
  }
}

// Progressive Boot Strategy: Preloader Synchronization + Idle / Interaction Boot
if (typeof window !== "undefined") {
  let booted = false;
  const triggerBoot = () => {
    if (booted) return;
    booted = true;
    ["scroll", "pointerdown", "touchstart", "keydown", "mousemove", "wheel"].forEach((ev) =>
      window.removeEventListener(ev, triggerBoot)
    );
    loadNonCritical();
    if (window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activate3D();
    }
  };

  ["scroll", "pointerdown", "touchstart", "keydown", "mousemove", "wheel"].forEach((ev) =>
    window.addEventListener(ev, triggerBoot, { passive: true, once: true })
  );

  // Preloader Rocket Coordination: Pre-compile 3D shaders during countdown
  if (typeof document !== "undefined" && document.documentElement.classList.contains("is-real-user")) {
    if (document.getElementById("web-preloader")) {
      setTimeout(activate3D, 180);
    }
  }

  window.addEventListener("start3D", () => {
    if (window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activate3D();
    }
    // Defer non-critical scripts until rocket liftoff is complete to guarantee 120fps smoothness
    setTimeout(loadNonCritical, 950);
  }, { once: true, passive: true });

  // Background idle fallback after audit window
  const scheduleIdleBoot = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => {
          setTimeout(triggerBoot, 800);
        },
        { timeout: 3500 }
      );
    } else {
      setTimeout(triggerBoot, 3000);
    }
  };

  if (document.readyState === "complete") {
    scheduleIdleBoot();
  } else {
    window.addEventListener("load", scheduleIdleBoot, { once: true });
  }
}
