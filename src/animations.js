/* ═══════════════════════════════════════════════════════════
   animations.js — Ultra-Diverse High-Performance Kinetic Engine
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   Aesthetic: Luxury Editorial Dark Mode / Multi-Vector Kinetic Life
   Variance: 9.5 | Motion Intensity: 8.5 | Density: 4
   Directions: Samping (Kiri/Kanan), Atas, Bawah, Diagonal, Bilateral
   Architecture: Zero-Jank GPU Compositor Execution (Tanpa Sunat)
   ═══════════════════════════════════════════════════════════ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Synchronize ticker to prevent frame drop cascading during fast scroll
gsap.ticker.lagSmoothing(1000, 16);

const SECTION_TRIGGER_IDS = [
  "trigger-hero",
  "trigger-about",
  "trigger-experience",
  "trigger-activity",
  "trigger-projects",
  "trigger-contact",
  "trigger-footer",
];

// ═══════════════════════════════════════════════════════════
// 1. MASTER MULTI-VECTOR KINETIC SYSTEM (Tanpa Sunat / 100% Kaya)
// ═══════════════════════════════════════════════════════════
export const initScrollRevealAnimations = () => {
  if (typeof window === "undefined") return;

  // Clean up previous triggers cleanly without affecting Three.js camera
  SECTION_TRIGGER_IDS.forEach((id) => {
    const existing = ScrollTrigger.getById(id);
    if (existing) existing.kill(true);
  });

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    if (window.renderActivityHeatmap) {
      try { window.renderActivityHeatmap(); } catch (e) {}
    }
    return;
  }

  const isMobile = window.innerWidth < 1024 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  const d = isMobile ? 0.45 : 1.0;
  const easeKinetic = "power3.out";
  const easeSpring = "back.out(1.5)";
  const dur = isMobile ? 0.48 : 0.68;

  // Helper: Create a GPU-accelerated triggered reveal with fastScrollEnd & overlap prevention
  const createTriggeredSection = (sectionId, triggerId, buildTimeline) => {
    const sec = document.getElementById(sectionId);
    if (!sec) return;

    const tl = gsap.timeline({
      id: triggerId,
      scrollTrigger: {
        id: triggerId,
        trigger: sec,
        start: "top 76%",
        end: "bottom 18%",
        toggleActions: "play reverse play reverse",
        fastScrollEnd: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
      },
    });

    buildTimeline(tl, sec);
  };

  // ═══════════════════════════════════════════════════════════
  // SECTION 01: HERO (#start) — 4-Directional Spatial Deconstruction
  // ═══════════════════════════════════════════════════════════
  const startSec = document.getElementById("start");
  if (startSec) {
    const eyebrow = startSec.querySelector(".eyebrow, [data-i18n='heroEyebrow']")?.closest("div");
    const titleL1 = startSec.querySelector(".display-title span:first-child");
    const titleL2 = startSec.querySelector(".display-title span:last-child");
    const role = startSec.querySelector("[data-i18n='heroRole']");
    const bio = startSec.querySelector(".body-copy");
    const btnCrimson = startSec.querySelector(".btn-crimson");
    const btnGlass = startSec.querySelector(".btn-glass");
    const hint = startSec.querySelector("[data-i18n='scrollHint']")?.closest(".flex");

    const heroTl = gsap.timeline({ delay: 0.08 });

    // Eyebrow drops from ATAS
    if (eyebrow) {
      heroTl.fromTo(eyebrow, { y: -32 * d, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0);
    }
    // Title Line 1 sweeps from KIRI with angular tilt
    if (titleL1) {
      heroTl.fromTo(titleL1, { x: -55 * d, y: -10 * d, rotateZ: isMobile ? 0 : -2, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.06, ease: easeKinetic, force3D: true }, 0.04);
    }
    // Title Line 2 sweeps from KANAN with counter-tilt
    if (titleL2) {
      heroTl.fromTo(titleL2, { x: 55 * d, y: 10 * d, rotateZ: isMobile ? 0 : 2, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.06, ease: easeKinetic, force3D: true }, 0.08);
    }
    // Role tag sweeps from KIRI
    if (role) {
      heroTl.fromTo(role, { x: -35 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.12);
    }
    // Bio blooms from BAWAH
    if (bio) {
      heroTl.fromTo(bio, { y: 35 * d, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.15);
    }
    // CTAs dash from opposite flanks and snap together
    if (btnCrimson) {
      heroTl.fromTo(btnCrimson, { x: -45 * d, scale: 0.9, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: dur, ease: easeSpring, force3D: true }, 0.2);
    }
    if (btnGlass) {
      heroTl.fromTo(btnGlass, { x: 45 * d, scale: 0.9, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: dur, ease: easeSpring, force3D: true }, 0.24);
    }
    // Scroll hint rises from BAWAH
    if (hint) {
      heroTl.fromTo(hint, { y: 24 * d, opacity: 0 }, { y: 0, opacity: 1, duration: dur - 0.1, ease: easeKinetic, force3D: true }, 0.3);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SECTION 02: ABOUT (#about) — Cross-Quadrant Convergence
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("about", "trigger-about", (tl, sec) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='aboutEyebrow']")?.closest("div");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const desc = sec.querySelector(".body-copy");
    const items = sec.querySelectorAll("[role='listitem']");

    // Eyebrow from ATAS
    if (eyebrow) {
      tl.fromTo(eyebrow, { y: -34 * d, x: 16 * d, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.02);
    }
    // Title L1 from KIRI with slight slant
    if (titleL1) {
      tl.fromTo(titleL1, { x: -55 * d, y: -12 * d, rotateZ: isMobile ? 0 : -1.8, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Title L2 from KANAN with counter-slant
    if (titleL2) {
      tl.fromTo(titleL2, { x: 60 * d, y: 12 * d, rotateZ: isMobile ? 0 : 1.8, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.08);
    }
    // Desc from BAWAH
    if (desc) {
      tl.fromTo(desc, { y: 32 * d, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.12);
    }

    // 4 Capabilities emerging from 4 DISTINCT COMPASS POINTS:
    // Item 0: KIRI | Item 1: KANAN | Item 2: BAWAH-KIRI | Item 3: BAWAH-KANAN
    const trajectories = [
      { x: -55 * d, y: -10 * d, rot: -1.2 },
      { x: 55 * d, y: -10 * d, rot: 1.2 },
      { x: -40 * d, y: 30 * d, rot: -1.0 },
      { x: 40 * d, y: 30 * d, rot: 1.0 },
    ];

    if (items.length) {
      items.forEach((item, i) => {
        const tr = trajectories[i % trajectories.length];
        const tag = item.querySelector("span.font-mono");
        const body = item.querySelector("div");

        tl.fromTo(
          item,
          { x: tr.x, y: tr.y, rotateZ: isMobile ? 0 : tr.rot, opacity: 0 },
          { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true },
          0.13 + i * 0.06
        );

        // Monospace index marker pops in with spring
        if (tag && !isMobile) {
          tl.fromTo(tag, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: easeSpring, force3D: true }, 0.16 + i * 0.06);
        }
        if (body && !isMobile) {
          tl.fromTo(body, { y: 10 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.18 + i * 0.06);
        }
      });
    }
  });

  // ═══════════════════════════════════════════════════════════
  // SECTION 03: EXPERIENCE (#experience) — 4-Corner Diagonal Cascade
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("experience", "trigger-experience", (tl, sec) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='expEyebrow']")?.closest("div");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const desc = sec.querySelector(".body-copy");
    const items = sec.querySelectorAll("[role='listitem']");

    // Eyebrow sweeps from KIRI
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: -48 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.02);
    }
    // Title L1 plunges from ATAS
    if (titleL1) {
      tl.fromTo(titleL1, { y: -38 * d, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Title L2 rises from BAWAH
    if (titleL2) {
      tl.fromTo(titleL2, { y: 38 * d, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.08);
    }
    // Desc enters from KANAN
    if (desc) {
      tl.fromTo(desc, { x: 45 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.12);
    }

    // 4 Project milestones swooping from 4 DIAGONAL CORNERS:
    // 0: ATAS-KIRI | 1: BAWAH-KIRI | 2: ATAS-KANAN | 3: BAWAH-KANAN
    const expTraj = [
      { x: -50 * d, y: -24 * d, rot: -1.2 },
      { x: -50 * d, y: 26 * d, rot: 1.2 },
      { x: 50 * d, y: -24 * d, rot: 1.2 },
      { x: 50 * d, y: 26 * d, rot: -1.2 },
    ];

    if (items.length) {
      items.forEach((item, i) => {
        const tr = expTraj[i % expTraj.length];
        const tag = item.querySelector("span.font-mono");
        const content = item.querySelector("div");

        tl.fromTo(
          item,
          { x: tr.x, y: tr.y, rotateZ: isMobile ? 0 : tr.rot, opacity: 0 },
          { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true },
          0.13 + i * 0.06
        );

        if (tag && !isMobile) {
          tl.fromTo(tag, { x: -18 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 0.32, ease: easeSpring, force3D: true }, 0.16 + i * 0.06);
        }
        if (content && !isMobile) {
          tl.fromTo(content, { y: 12 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.18 + i * 0.06);
        }
      });
    }
  });

  // ═══════════════════════════════════════════════════════════
  // SECTION 04: ACTIVITY (#activity) — 3D Telemetry Liftoff
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("activity", "trigger-activity", (tl, sec) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='activityEyebrow']")?.closest("div");
    const title = sec.querySelector(".display-title");
    const desc = sec.querySelector(".body-copy");
    const card = sec.querySelector(".activity-standalone-card");
    const cardHeaderLeft = card?.querySelector(".border-b > div:first-child");
    const cardHeaderRight = card?.querySelector(".border-b > div:last-child");
    const heatmapScroll = sec.querySelector("#activity-heatmap-scroll");
    const cardFooterLeft = card?.querySelector(".border-t > div:first-child");
    const cardFooterRight = card?.querySelector(".border-t > div:last-child");

    // Header eyebrow from ATAS
    if (eyebrow) {
      tl.fromTo(eyebrow, { y: -32 * d, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.02);
    }
    // Header title from BAWAH
    if (title) {
      tl.fromTo(title, { y: 36 * d, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Subtitle from KIRI
    if (desc) {
      tl.fromTo(desc, { x: -36 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.08);
    }
    // Activity Card rises with dramatic 3D depth elevation (GPU-composited)
    if (card) {
      tl.fromTo(
        card,
        {
          y: 52 * d,
          scale: isMobile ? 0.96 : 0.91,
          rotateX: isMobile ? 0 : 5,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration: dur + 0.12,
          ease: easeKinetic,
          force3D: true,
        },
        0.11
      );
    }

    // Telemetry components inside card activate modularly:
    if (cardHeaderLeft && !isMobile) {
      tl.fromTo(cardHeaderLeft, { x: -25 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.18);
    }
    if (cardHeaderRight && !isMobile) {
      tl.fromTo(cardHeaderRight, { x: 25 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: easeSpring, force3D: true }, 0.2);
    }
    if (heatmapScroll) {
      tl.fromTo(heatmapScroll, { scale: isMobile ? 1 : 0.97, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.4, ease: easeKinetic, force3D: true }, 0.22);
    }
    if (cardFooterLeft && !isMobile) {
      tl.fromTo(cardFooterLeft, { x: -25 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.24);
    }
    if (cardFooterRight && !isMobile) {
      tl.fromTo(cardFooterRight, { x: 25 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.24);
    }

    if (window.renderActivityHeatmap) {
      try { window.renderActivityHeatmap(); } catch (e) {}
    }
  });

  // ═══════════════════════════════════════════════════════════
  // SECTION 05: PROJECTS (#projects) — Aperture Stage Reveal & Dot Blossom
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("projects", "trigger-projects", (tl, sec) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='projectsEyebrow']")?.closest("div");
    const title = sec.querySelector(".display-title");
    const headerRight = sec.querySelector("header > div:last-child");
    const sliderFrame = sec.querySelector("#projects-slider-frame");
    const dots = sec.querySelectorAll(".carousel-dot");
    const sliderHint = sec.querySelector("[data-i18n='sliderHint']")?.closest("div");

    // Eyebrow from KIRI
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: -45 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.02);
    }
    // Title from BAWAH with tilt
    if (title) {
      tl.fromTo(title, { y: 36 * d, rotateZ: isMobile ? 0 : -1.5, opacity: 0 }, { y: 0, rotateZ: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Slider Controls from KANAN
    if (headerRight) {
      tl.fromTo(headerRight, { x: 50 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.07);
    }
    // Projects Slider Frame rises from deep bottom with stage aperture expansion
    if (sliderFrame) {
      tl.fromTo(
        sliderFrame,
        {
          y: 46 * d,
          scale: isMobile ? 0.96 : 0.91,
          rotateZ: isMobile ? 0 : 0.8,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          rotateZ: 0,
          opacity: 1,
          duration: dur + 0.1,
          ease: easeKinetic,
          force3D: true,
        },
        0.11
      );
    }
    // Dots blossom sequentially with dynamic spring bounce
    if (dots.length) {
      dots.forEach((dot, idx) => {
        const offsetDirection = (idx - 2) * 10 * d;
        tl.fromTo(
          dot,
          { x: offsetDirection, y: 16 * d, scale: 0.2, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: dot.classList.contains("active") ? 1 : 0.4, duration: 0.38, ease: "back.out(2)", force3D: true },
          0.16 + idx * 0.035
        );
      });
    }
    // Slider hint from BAWAH
    if (sliderHint && !isMobile) {
      tl.fromTo(sliderHint, { y: 18 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.24);
    }
  });

  // ═══════════════════════════════════════════════════════════
  // SECTION 06: CONTACT (#contact) — Bilateral Magnetic Collision
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("contact", "trigger-contact", (tl, sec) => {
    const eyebrow = sec.querySelector(".eyebrow, [data-i18n='contactEyebrow']")?.closest("div");
    const titleL1 = sec.querySelector(".display-title span:first-child");
    const titleL2 = sec.querySelector(".display-title span:last-child");
    const bio = sec.querySelector(".body-copy");
    const btnCrimson = sec.querySelector(".btn-crimson");
    const btnGlass = sec.querySelector(".btn-glass");
    const footerHint = sec.querySelector("[data-i18n='scrollFooter']")?.closest("div");

    // Eyebrow drops from ATAS
    if (eyebrow) {
      tl.fromTo(eyebrow, { y: -30 * d, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.02);
    }
    // Title L1 sweeps from ATAS-KIRI
    if (titleL1) {
      tl.fromTo(titleL1, { x: -55 * d, y: -20 * d, rotateZ: isMobile ? 0 : -2, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Title L2 sweeps from BAWAH-KANAN
    if (titleL2) {
      tl.fromTo(titleL2, { x: 55 * d, y: 20 * d, rotateZ: isMobile ? 0 : 2, opacity: 0 }, { x: 0, y: 0, rotateZ: 0, opacity: 1, duration: dur + 0.04, ease: easeKinetic, force3D: true }, 0.08);
    }
    // Bio copy rises from BAWAH
    if (bio) {
      tl.fromTo(bio, { y: 26 * d, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.12);
    }
    // Bilateral magnetic collision: Crimson from KIRI-JAUH, Glass from KANAN-JAUH
    if (btnCrimson) {
      tl.fromTo(
        btnCrimson,
        { x: isMobile ? 0 : -68 * d, y: isMobile ? 22 * d : 8 * d, rotateZ: isMobile ? 0 : -2, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, rotateZ: 0, scale: 1, opacity: 1, duration: dur + 0.08, ease: easeSpring, force3D: true },
        0.16
      );
    }
    if (btnGlass) {
      tl.fromTo(
        btnGlass,
        { x: isMobile ? 0 : 68 * d, y: isMobile ? 22 * d : -8 * d, rotateZ: isMobile ? 0 : 2, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, rotateZ: 0, scale: 1, opacity: 1, duration: dur + 0.08, ease: easeSpring, force3D: true },
        0.18
      );
    }
    if (footerHint && !isMobile) {
      tl.fromTo(footerHint, { y: 22 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.24);
    }
  });

  // ═══════════════════════════════════════════════════════════
  // SECTION 07: FOOTER (#footer) — 4-Way Compass Ledger Unfold
  // ═══════════════════════════════════════════════════════════
  createTriggeredSection("footer", "trigger-footer", (tl, sec) => {
    const masthead = sec.querySelector(".display-title");
    const borders = sec.querySelectorAll(".border-b");
    const statusPill = sec.querySelector(".border-b .rounded-lg");
    const locationTag = sec.querySelector("[data-i18n='footerLocation']")?.closest("span");
    const cols = sec.querySelectorAll(".grid > div");
    const bottomRow = sec.querySelector(".section-content > .pt-4, footer, [data-i18n='footerCopyright']");

    // Horizontal laser line wipe
    if (borders.length) {
      borders.forEach((b, idx) => {
        tl.fromTo(
          b,
          { scaleX: 0, opacity: 0.2, transformOrigin: idx % 2 === 0 ? "left center" : "right center" },
          { scaleX: 1, opacity: 1, duration: dur + 0.05, ease: easeKinetic, force3D: true },
          0.02 + idx * 0.06
        );
      });
    }

    // Masthead sweeping from KIRI with typographical presence
    if (masthead) {
      tl.fromTo(masthead, { x: -65 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur + 0.08, ease: easeKinetic, force3D: true }, 0.05);
    }
    // Status pill from ATAS
    if (statusPill) {
      tl.fromTo(statusPill, { y: -24 * d, x: 15 * d, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: dur, ease: easeSpring, force3D: true }, 0.08);
    }
    // Location tag from KANAN
    if (locationTag) {
      tl.fromTo(locationTag, { x: 38 * d, opacity: 0 }, { x: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true }, 0.1);
    }

    // 4 Columns entering from 4 DISTINCT COMPASS POINTS:
    // Col 0: KIRI | Col 1: ATAS | Col 2: BAWAH | Col 3: KANAN
    const colTraj = [
      { x: -45 * d, y: 12 * d },
      { x: -10 * d, y: -35 * d },
      { x: 10 * d, y: 35 * d },
      { x: 45 * d, y: 12 * d },
    ];

    if (cols.length) {
      cols.forEach((col, i) => {
        const ct = colTraj[i % colTraj.length];
        tl.fromTo(
          col,
          { x: ct.x, y: ct.y, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: dur, ease: easeKinetic, force3D: true },
          0.13 + i * 0.06
        );
      });
    }

    // Bottom copyright note from BAWAH
    if (bottomRow) {
      tl.fromTo(bottomRow, { y: 20 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: easeKinetic, force3D: true }, 0.3);
    }
  });

  // Refresh ScrollTrigger once layout is set
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

// ═══════════════════════════════════════════════════════════
// 2. 60FPS 3D TILT ENGINE DELEGATION (Desktop Only)
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
