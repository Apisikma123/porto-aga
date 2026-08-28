/* ═══════════════════════════════════════════════════════════
   animations.js — GSAP Scene Reveals & 60FPS 3D Tilt Engine
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */

import { gsap } from "gsap";

// ═══════════════════════════════════════════════════════════
// DIRECTIONAL SCENE REVEALS (Native IntersectionObserver + Silky GPU Transforms)
// ═══════════════════════════════════════════════════════════
export const initScrollRevealAnimations = () => {
  if (typeof IntersectionObserver === "undefined") return;

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const id = target.id;
        obs.unobserve(target);

        if (id === "about") {
          gsap.fromTo("#about header", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
          gsap.fromTo("#about .spatial-card", { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power2.out", delay: 0.1 });
        } else if (id === "activity") {
          gsap.fromTo("#activity header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
          gsap.fromTo("#activity .activity-standalone-card", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.08 });
          if (window.renderActivityHeatmap) {
            try { window.renderActivityHeatmap(); } catch (e) {}
          }
        } else if (id === "projects") {
          gsap.fromTo("#projects header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
          gsap.fromTo("#projects .carousel-card", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" });
        } else if (id === "contact") {
          gsap.fromTo("#contact .display-title span", { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" });
          gsap.fromTo("#contact .glass-card", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.1 });
        } else if (id === "footer") {
          gsap.fromTo("#footer header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
          gsap.fromTo("#footer .grid > div", { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power2.out", delay: 0.1 });
        }
      }
    });
  }, { rootMargin: "180px 0px 50px 0px" });

  ["about", "activity", "projects", "contact", "footer"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) revealObserver.observe(el);
  });
};

// ═══════════════════════════════════════════════════════════
// VELVETY SMOOTH 60FPS 3D TILT ENGINE (SPRING LERP + ZERO JITTER)
// ═══════════════════════════════════════════════════════════
export const initCardTilt = (root = document) => {
  // STRICT CHECK: Only enable on desktop devices with fine pointer (mouse/trackpad).
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = root.querySelectorAll(
    ".spatial-card, .glass-card, .activity-standalone-card, .carousel-card, .tesseract-card, .repo-card, .pricing-carousel-card, .activity-metric-card"
  );

  cards.forEach((card) => {
    if (
      card.dataset.tiltInitialized === "true" ||
      card.tagName === "ARTICLE" ||
      card.closest("article") ||
      card.id === "detail-view-article" ||
      card.querySelector("#detail-view-markdown") ||
      card.closest("#side-nav")
    ) {
      return;
    }

    card.dataset.tiltInitialized = "true";

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetScale = 1;
    let currentScale = 1;
    let isHovering = false;
    let rafId = null;
    let cachedRect = null;

    const maxTilt = 6.5; // Luxury subtle tilt angle

    const updateTilt = () => {
      // Velvety smooth dampened lerp
      currentRotX += (targetRotX - currentRotX) * 0.09;
      currentRotY += (targetRotY - currentRotY) * 0.09;
      currentScale += (targetScale - currentScale) * 0.09;

      card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, ${currentScale.toFixed(3)})`;

      const diff =
        Math.abs(targetRotX - currentRotX) +
        Math.abs(targetRotY - currentRotY) +
        Math.abs(targetScale - currentScale);

      if (isHovering || diff > 0.01) {
        rafId = requestAnimationFrame(updateTilt);
      } else {
        card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        rafId = null;
        cachedRect = null;
      }
    };

    card.addEventListener("pointerenter", () => {
      isHovering = true;
      targetScale = 1.02;
      card.style.transition = "none";
      card.style.willChange = "transform";
      cachedRect = card.getBoundingClientRect();
      if (!rafId) rafId = requestAnimationFrame(updateTilt);
    });

    card.addEventListener("pointermove", (e) => {
      if (!cachedRect) cachedRect = card.getBoundingClientRect();
      if (cachedRect.width === 0 || cachedRect.height === 0) return;

      const normX = ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1;
      const normY = ((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1;

      targetRotX = -normY * maxTilt;
      targetRotY = normX * maxTilt;
      targetScale = 1.02;

      if (!rafId) rafId = requestAnimationFrame(updateTilt);
    });

    card.addEventListener("pointerleave", () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      targetScale = 1;
      if (!rafId) rafId = requestAnimationFrame(updateTilt);
    });
  });
};
window.initCardTilt = initCardTilt;

// ═══════════════════════════════════════════════════════════
// MASTER ANIMATIONS INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initAnimations = () => {
  initScrollRevealAnimations();
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      try {
        initCardTilt();
      } catch (e) {}
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      try {
        initCardTilt();
      } catch (e) {}
    }, 300);
  }
};
