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
// SILKY SMOOTH 60FPS 3D TILT ENGINE (LERP + RAF + ZERO JITTER)
// ═══════════════════════════════════════════════════════════
export const initCardTilt = (root = document) => {
  // STRICT CHECK: Only enable on desktop devices with fine pointer (mouse/trackpad).
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = root.querySelectorAll(
    ".spatial-card, .glass-card, .activity-standalone-card, .carousel-card, .tesseract-card, .repo-card"
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

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateTilt = () => {
      currentRotX = lerp(currentRotX, targetRotX, 0.12);
      currentRotY = lerp(currentRotY, targetRotY, 0.12);
      currentScale = lerp(currentScale, targetScale, 0.12);

      card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, ${currentScale.toFixed(3)})`;

      const diff =
        Math.abs(currentRotX - targetRotX) +
        Math.abs(currentRotY - targetRotY) +
        Math.abs(currentScale - targetScale);

      if (isHovering || diff > 0.008) {
        rafId = requestAnimationFrame(updateTilt);
      } else {
        card.style.transform = "";
        rafId = null;
      }
    };

    let cachedRect = null;

    card.addEventListener("mouseenter", () => {
      isHovering = true;
      targetScale = 1.015;
      card.style.willChange = "transform";
      cachedRect = card.getBoundingClientRect();
      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    });

    card.addEventListener("mousemove", (e) => {
      isHovering = true;
      const rect = cachedRect || card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetRotX = (-y / (rect.height / 2)) * 4.5;
      targetRotY = (x / (rect.width / 2)) * 4.5;
      targetScale = 1.015;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    });

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      targetScale = 1;
      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
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
