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
          const header = document.querySelector("#about header") || document.querySelector("#about .display-title");
          if (header) gsap.fromTo(header, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
          const cards = document.querySelectorAll("#about .spatial-card, #about dl > div");
          if (cards.length) gsap.fromTo(cards, { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power2.out", delay: 0.1 });
        } else if (id === "activity") {
          gsap.fromTo("#activity header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
          gsap.fromTo("#activity .activity-standalone-card", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.08 });
          if (window.renderActivityHeatmap) {
            try { window.renderActivityHeatmap(); } catch (e) {}
          }
        } else if (id === "projects") {
          gsap.fromTo("#projects header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
          gsap.fromTo("#projects-slider-frame", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.08 });
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
// VELVETY SMOOTH 60FPS 3D TILT ENGINE DELEGATION
// ═══════════════════════════════════════════════════════════
export const initCardTilt = () => {
  if (typeof window !== "undefined" && window.initGlobalCardTilt) {
    window.initGlobalCardTilt();
  }
};
window.initCardTilt = initCardTilt;

// ═══════════════════════════════════════════════════════════
// MASTER ANIMATIONS INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initAnimations = () => {
  initScrollRevealAnimations();
  initCardTilt();
};
