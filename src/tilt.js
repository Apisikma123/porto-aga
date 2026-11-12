/* ═══════════════════════════════════════════════════════════
   tilt.js — Anti-Slop Tactile 3D Tilt & Specular Glare Engine
   Muhammad Aga Putra | Frontend Specialist
   Restrained physics: 5° Max Tilt, 1.015 Scale, Zero-Jank Delegation
   ═══════════════════════════════════════════════════════════ */

let isTiltInitialized = false;

export const initGlobalCardTilt = () => {
  if (typeof window === "undefined" || isTiltInitialized) return;

  // 1. Desktop fine pointer only (strictly no-op on touch/mobile to preserve 120 FPS battery & scroll)
  if (!window.matchMedia("(pointer: fine)").matches) return;
  // 2. Respect accessibility preference for reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  isTiltInitialized = true;

  const CARD_SELECTOR = ".carousel-card, .activity-standalone-card, .spatial-card, .glass-card, .project-catalog-card, [data-tilt='true']";

  let activeCard = null;
  let cachedRect = null;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetScale = 1;
  let currentScale = 1;
  let rafId = null;

  // Calibrated under /taste-design-v2: Restrained, tactile, non-AI-slop physics
  const MAX_TILT = 5.0;     // 5 degrees max: crisp architectural depth, zero distortion
  const MAX_SCALE = 1.015;  // 1.5% subtle lift
  const LERP_FACTOR = 0.12; // Silky responsive damping

  const updateTiltPhysics = () => {
    if (!activeCard) {
      rafId = null;
      return;
    }

    currentRotX += (targetRotX - currentRotX) * LERP_FACTOR;
    currentRotY += (targetRotY - currentRotY) * LERP_FACTOR;
    currentScale += (targetScale - currentScale) * LERP_FACTOR;

    activeCard.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, ${currentScale.toFixed(3)})`;

    const diff = Math.abs(targetRotX - currentRotX) + Math.abs(targetRotY - currentRotY) + Math.abs(targetScale - currentScale);

    if (targetScale > 1 || diff > 0.01) {
      rafId = requestAnimationFrame(updateTiltPhysics);
    } else {
      // Reached resting state: restore smooth transition and clean transform
      activeCard.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      activeCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      activeCard = null;
      cachedRect = null;
      rafId = null;
    }
  };

  const resetActiveCard = () => {
    if (!activeCard) return;
    targetRotX = 0;
    targetRotY = 0;
    targetScale = 1;
    if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
  };

  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(CARD_SELECTOR);

    // Filter out cards inside modal/drawer/nav or disabled
    if (card && !card.closest("#mobile-nav-drawer") && !card.closest("#side-nav") && !card.closest("nav") && !card.classList.contains("is-inactive")) {
      if (activeCard !== card) {
        if (activeCard) {
          activeCard.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
          activeCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        }
        activeCard = card;
        activeCard.style.transition = "none";
        activeCard.style.willChange = "transform";
        cachedRect = activeCard.getBoundingClientRect();
        currentRotX = 0;
        currentRotY = 0;
        currentScale = 1;
      }

      if (!cachedRect || cachedRect.width === 0 || cachedRect.height === 0) {
        cachedRect = activeCard.getBoundingClientRect();
        if (cachedRect.width === 0 || cachedRect.height === 0) return;
      }

      // Normalized coordinates (-1 to +1)
      const normX = ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1;
      const normY = ((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1;

      targetRotX = -normY * MAX_TILT;
      targetRotY = normX * MAX_TILT;
      targetScale = MAX_SCALE;

      // Update specular highlight CSS custom properties
      const mouseXPct = Math.max(0, Math.min(100, ((e.clientX - cachedRect.left) / cachedRect.width) * 100));
      const mouseYPct = Math.max(0, Math.min(100, ((e.clientY - cachedRect.top) / cachedRect.height) * 100));
      activeCard.style.setProperty("--mouse-x", `${mouseXPct.toFixed(1)}%`);
      activeCard.style.setProperty("--mouse-y", `${mouseYPct.toFixed(1)}%`);

      if (!rafId) rafId = requestAnimationFrame(updateTiltPhysics);
    } else if (activeCard) {
      resetActiveCard();
    }
  }, { passive: true });

  document.addEventListener("pointerleave", resetActiveCard, { passive: true });
  window.addEventListener("scroll", () => {
    cachedRect = null;
    if (activeCard) resetActiveCard();
  }, { passive: true });
};

window.initGlobalCardTilt = initGlobalCardTilt;
