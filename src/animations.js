/* ═══════════════════════════════════════════════════════════
   animations.js — Bidirectional Scroll-Driven Kinetic Engine
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   Stack: GSAP + ScrollTrigger (Zero Slop / Bidirectional Scrub)
   ═══════════════════════════════════════════════════════════ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════
// 1. BIDIRECTIONAL SCROLL-LINKED KINETIC SYSTEM
// ═══════════════════════════════════════════════════════════
export const initScrollRevealAnimations = () => {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    if (window.renderActivityHeatmap) {
      try { window.renderActivityHeatmap(); } catch (e) {}
    }
    return;
  }

  const isMobile = window.innerWidth < 1024 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  const scrubValue = isMobile ? 0.35 : 1.25;

  // ─── SECTION 01: HERO (#start) — Horizon Departure Scrub ───
  const startSec = document.getElementById("start");
  if (startSec) {
    const startTl = gsap.timeline({
      scrollTrigger: {
        trigger: startSec,
        start: "top top",
        end: "bottom top",
        scrub: scrubValue,
        invalidateOnRefresh: true,
      },
    });

    const eyebrow = startSec.querySelector(".eyebrow");
    const titleL1 = startSec.querySelector(".display-title span:first-child");
    const titleL2 = startSec.querySelector(".display-title span:last-child");
    const bio = startSec.querySelector(".body-copy");
    const actions = startSec.querySelector(".hero-actions");
    const hint = startSec.querySelector(".scroll-hint");

    if (eyebrow) startTl.to(eyebrow, { y: -16, opacity: 0.15, ease: "power1.inOut" }, 0);
    if (titleL1) startTl.to(titleL1, { x: isMobile ? -10 : -28, opacity: 0.25, ease: "power1.inOut" }, 0);
    if (titleL2) startTl.to(titleL2, { x: isMobile ? 10 : 28, opacity: 0.25, ease: "power1.inOut" }, 0);
    if (bio) startTl.to(bio, { y: 14, opacity: 0.15, ease: "power1.inOut" }, 0);
    if (actions) startTl.to(actions, { y: 16, scale: 0.96, opacity: 0.15, ease: "power1.inOut" }, 0);
    if (hint) startTl.to(hint, { y: -18, opacity: 0, ease: "power1.in" }, 0);
  }

  // Helper: Create 3-stage bidirectional timeline (Entry -> Rest Hold -> Exit)
  const createBidirectionalSection = (sectionId, buildAnimation) => {
    const sec = document.getElementById(sectionId);
    if (!sec) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        scrub: scrubValue,
        invalidateOnRefresh: true,
      },
    });

    buildAnimation(tl, sec, isMobile);
  };

  // ─── SECTION 02: ABOUT (#about) — Counter-Orbit from Right Flank ───
  createBidirectionalSection("about", (tl, sec, mobile) => {
    const eyebrow = sec.querySelector(".mb-2, .eyebrow, [data-i18n='aboutEyebrow']");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const desc = sec.querySelector(".body-copy");
    const items = sec.querySelectorAll("[role='listitem']");

    const travelX = mobile ? 18 : 34;

    // Stage 1: Enter from right to resting (0% -> 40%)
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: travelX * 0.8, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.05);
    }
    if (titleL1) {
      tl.fromTo(titleL1, { x: travelX, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.08);
    }
    if (titleL2) {
      tl.fromTo(titleL2, { x: travelX * 1.25, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.12);
    }
    if (desc) {
      tl.fromTo(desc, { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.14);
    }
    if (items.length) {
      items.forEach((item, i) => {
        tl.fromTo(
          item,
          { x: travelX * (0.8 + i * 0.1), opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 },
          0.12 + i * 0.05
        );
      });
    }

    // Stage 2: Hold resting (40% -> 65%) — fully readable, stable
    tl.to({}, { duration: 0.25 }, 0.4);

    // Stage 3: Exit drift as section scrolls out (65% -> 100%)
    if (eyebrow) tl.to(eyebrow, { x: travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.65);
    if (titleL1) tl.to(titleL1, { x: travelX * 0.8, opacity: 0.2, ease: "power1.in" }, 0.67);
    if (titleL2) tl.to(titleL2, { x: travelX, opacity: 0.2, ease: "power1.in" }, 0.7);
    if (desc) tl.to(desc, { y: -14, opacity: 0.2, ease: "power1.in" }, 0.68);
    if (items.length) {
      items.forEach((item, i) => {
        tl.to(item, { x: travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.68 + i * 0.04);
      });
    }
  });

  // ─── SECTION 03: EXPERIENCE (#experience) — Left Flank Cascade ───
  createBidirectionalSection("experience", (tl, sec, mobile) => {
    const eyebrow = sec.querySelector(".mb-1, .eyebrow, [data-i18n='expEyebrow']");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const desc = sec.querySelector(".body-copy");
    const items = sec.querySelectorAll("[role='listitem']");

    const travelX = mobile ? -18 : -34;

    // Stage 1: Enter from left to resting (0% -> 40%)
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: travelX * 0.8, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.05);
    }
    if (titleL1) {
      tl.fromTo(titleL1, { x: travelX, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.08);
    }
    if (titleL2) {
      tl.fromTo(titleL2, { x: travelX * 1.25, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.12);
    }
    if (desc) {
      tl.fromTo(desc, { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.14);
    }
    if (items.length) {
      items.forEach((item, i) => {
        tl.fromTo(
          item,
          { x: travelX * (0.8 + i * 0.1), opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 },
          0.12 + i * 0.05
        );
      });
    }

    // Stage 2: Hold resting (40% -> 65%)
    tl.to({}, { duration: 0.25 }, 0.4);

    // Stage 3: Exit drift (65% -> 100%)
    if (eyebrow) tl.to(eyebrow, { x: travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.65);
    if (titleL1) tl.to(titleL1, { x: travelX * 0.8, opacity: 0.2, ease: "power1.in" }, 0.67);
    if (titleL2) tl.to(titleL2, { x: travelX, opacity: 0.2, ease: "power1.in" }, 0.7);
    if (desc) tl.to(desc, { y: -14, opacity: 0.2, ease: "power1.in" }, 0.68);
    if (items.length) {
      items.forEach((item, i) => {
        tl.to(item, { x: travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.68 + i * 0.04);
      });
    }
  });

  // ─── SECTION 04: ACTIVITY (#activity) — Centered Matrix Elevation ───
  createBidirectionalSection("activity", (tl, sec) => {
    const header = sec.querySelector("header");
    const card = sec.querySelector(".activity-standalone-card");

    // Stage 1: Lift from below to resting (0% -> 40%)
    if (header) {
      tl.fromTo(header, { y: -22, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.38 }, 0.06);
    }
    if (card) {
      tl.fromTo(card, { y: 36, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.42 }, 0.1);
    }

    // Trigger heatmap render once initialized
    if (window.renderActivityHeatmap) {
      try { window.renderActivityHeatmap(); } catch (e) {}
    }

    // Stage 2: Hold resting (40% -> 65%)
    tl.to({}, { duration: 0.25 }, 0.4);

    // Stage 3: Exit lift (65% -> 100%)
    if (header) tl.to(header, { y: -18, opacity: 0.2, ease: "power1.in" }, 0.66);
    if (card) tl.to(card, { y: -24, scale: 0.98, opacity: 0.2, ease: "power1.in" }, 0.68);
  });

  // ─── SECTION 05: PROJECTS (#projects) — Showcase Stage Convergence ───
  createBidirectionalSection("projects", (tl, sec) => {
    const headerLeft = sec.querySelector("header > div:first-child");
    const headerRight = sec.querySelector("header > div:last-child");
    const sliderFrame = sec.querySelector("#projects-slider-frame");
    const dotsAndHint = sec.querySelector("#carousel-dots-container, .slider-controls");

    // Stage 1: Horizontal slide to center (0% -> 40%)
    if (headerLeft) {
      tl.fromTo(headerLeft, { x: -26, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.06);
    }
    if (headerRight) {
      tl.fromTo(headerRight, { x: 26, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.06);
    }
    if (sliderFrame) {
      tl.fromTo(sliderFrame, { y: 32, scale: 0.97, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.42 }, 0.12);
    }
    if (dotsAndHint) {
      tl.fromTo(dotsAndHint, { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.18);
    }

    // Stage 2: Hold resting (40% -> 65%)
    tl.to({}, { duration: 0.25 }, 0.4);

    // Stage 3: Exit drift (65% -> 100%)
    if (headerLeft) tl.to(headerLeft, { x: -16, opacity: 0.2, ease: "power1.in" }, 0.66);
    if (headerRight) tl.to(headerRight, { x: 16, opacity: 0.2, ease: "power1.in" }, 0.66);
    if (sliderFrame) tl.to(sliderFrame, { y: -20, scale: 0.98, opacity: 0.2, ease: "power1.in" }, 0.68);
  });

  // ─── SECTION 06: CONTACT (#contact) — Focal Convergence ───
  createBidirectionalSection("contact", (tl, sec, mobile) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='contactEyebrow']");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const bio = sec.querySelector(".body-copy");
    const btnCrimson = sec.querySelector(".btn-crimson");
    const btnGlass = sec.querySelector(".btn-glass");

    const travelX = mobile ? 12 : 26;

    // Stage 1: Inward focal convergence (0% -> 40%)
    if (eyebrow) {
      tl.fromTo(eyebrow, { y: -16, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.05);
    }
    if (titleL1) {
      tl.fromTo(titleL1, { x: -travelX, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.08);
    }
    if (titleL2) {
      tl.fromTo(titleL2, { x: travelX, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.1);
    }
    if (bio) {
      tl.fromTo(bio, { y: 14, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.36 }, 0.14);
    }
    if (btnCrimson) {
      tl.fromTo(btnCrimson, { x: mobile ? 0 : -16, y: 18, scale: 0.97, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.16);
    }
    if (btnGlass) {
      tl.fromTo(btnGlass, { x: mobile ? 0 : 16, y: 18, scale: 0.97, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.38 }, 0.18);
    }

    // Stage 2: Hold resting (40% -> 65%)
    tl.to({}, { duration: 0.25 }, 0.4);

    // Stage 3: Exit drift (65% -> 100%)
    if (eyebrow) tl.to(eyebrow, { y: -14, opacity: 0.2, ease: "power1.in" }, 0.66);
    if (titleL1) tl.to(titleL1, { x: -travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.68);
    if (titleL2) tl.to(titleL2, { x: travelX * 0.6, opacity: 0.2, ease: "power1.in" }, 0.68);
    if (bio) tl.to(bio, { y: -12, opacity: 0.2, ease: "power1.in" }, 0.7);
  });

  // ─── SECTION 07: FOOTER (#footer) — Architectural Anchor ───
  const footerSec = document.getElementById("footer");
  if (footerSec) {
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: footerSec,
        start: "top 95%",
        end: "bottom bottom",
        scrub: scrubValue,
        invalidateOnRefresh: true,
      },
    });

    const masthead = footerSec.querySelector(".display-title");
    const borderTop = footerSec.querySelector(".border-b");
    const cols = footerSec.querySelectorAll(".grid > div");

    if (borderTop) {
      footerTl.fromTo(borderTop, { scaleX: 0.7, opacity: 0.2, transformOrigin: "left center" }, { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.05);
    }
    if (masthead) {
      footerTl.fromTo(masthead, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.08);
    }
    if (cols.length) {
      cols.forEach((col, i) => {
        footerTl.fromTo(col, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" }, 0.12 + i * 0.06);
      });
    }
  }

  // Refresh ScrollTrigger once DOM layout stabilizes
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

// ═══════════════════════════════════════════════════════════
// 2. VELVETY SMOOTH 60FPS 3D TILT ENGINE DELEGATION (Desktop Only)
// ═══════════════════════════════════════════════════════════
export const initCardTilt = () => {
  if (typeof window !== "undefined" && window.initGlobalCardTilt) {
    window.initGlobalCardTilt();
  }
};
window.initCardTilt = initCardTilt;

// ═══════════════════════════════════════════════════════════
// 3. MASTER ANIMATIONS INITIALIZATION
// ═══════════════════════════════════════════════════════════
export const initAnimations = () => {
  initScrollRevealAnimations();
  initCardTilt();
};
