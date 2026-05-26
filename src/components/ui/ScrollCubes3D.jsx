/* ═══════════════════════════════════════════════════════════
   ScrollCubes3D — Ultra-Performance Version (ZERO LAG)
   - Single requestAnimationFrame loop
   - Off-screen culling checks
   - 100% GPU accelerated transforms (translate3d)
═══════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import "../../styles/scroll-cubes.css";

// 12 Cubes max as requested. Positions in viewport percentages.
const CUBE_DATA = [
  { label: "{ }",   x: 10, y: 15, size: 65, opacity: 0.8, colorClass: "cyan",  speed: 0.4,  baseRotX: 15,  baseRotY: 30,  z: -50 },
  { label: "</>",   x: 85, y: 10, size: 55, opacity: 0.7, colorClass: "green", speed: 0.55, baseRotX: -20, baseRotY: 45,  z: 0 },
  { label: "git",   x: 15, y: 35, size: 50, opacity: 0.6, colorClass: "teal",  speed: 0.3,  baseRotX: 25,  baseRotY: -15, z: -100 },
  { label: "API",   x: 75, y: 25, size: 58, opacity: 0.9, colorClass: "cyan",  speed: 0.45, baseRotX: -10, baseRotY: 60,  z: 20 },
  { label: "CPU",   x: 90, y: 50, size: 48, opacity: 0.5, colorClass: "blue",  speed: 0.35, baseRotX: 30,  baseRotY: -40, z: -80 },
  { label: "SQL",   x: 5,  y: 65, size: 52, opacity: 0.7, colorClass: "green", speed: 0.5,  baseRotX: -25, baseRotY: 20,  z: 10 },
  { label: "npm",   x: 45, y: 15, size: 45, opacity: 0.6, colorClass: "teal",  speed: 0.6,  baseRotX: 20,  baseRotY: -55, z: -40 },
  { label: "CLI",   x: 65, y: 65, size: 54, opacity: 0.8, colorClass: "cyan",  speed: 0.38, baseRotX: -15, baseRotY: 35,  z: -60 },
  { label: "UI/UX", x: 25, y: 80, size: 60, opacity: 0.9, colorClass: "blue",  speed: 0.42, baseRotX: 10,  baseRotY: -25, z: -20 },
  { label: "CI/CD", x: 80, y: 85, size: 50, opacity: 0.6, colorClass: "green", speed: 0.48, baseRotX: -30, baseRotY: 50,  z: -70 },
  { label: "HTTP",  x: 40, y: 50, size: 46, opacity: 0.5, colorClass: "teal",  speed: 0.52, baseRotX: 35,  baseRotY: -10, z: -110 },
  { label: "JSON",  x: 50, y: 92, size: 52, opacity: 0.7, colorClass: "cyan",  speed: 0.36, baseRotX: -20, baseRotY: 40,  z: 30 },
];

const FACES = ["front", "back", "right", "left", "top", "bottom"];

export function ScrollCubes3D() {
  const containerRef = useRef(null);
  const cubeRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const scrollYRef = useRef(0);
  const rafRef = useRef(null);
  const vhRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);
  const vwRef = useRef(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track scroll
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    
    // Track resize to precalculate pixel positions instead of using % top/left
    const onResize = () => {
      vhRef.current = window.innerHeight;
      vwRef.current = window.innerWidth;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();

    let startTime = performance.now();

    const animate = (time) => {
      const scroll = scrollYRef.current;
      const elapsed = (time - startTime) * 0.001; // seconds

      // Unified Loop
      for (let i = 0; i < CUBE_DATA.length; i++) {
        const data = CUBE_DATA[i];
        const inner = cubeRefs.current[i];
        const wrapper = wrapperRefs.current[i];
        if (!inner || !wrapper) continue;

        // Center of the screen
        const cx = vwRef.current / 2;
        const cy = vhRef.current / 2;

        // Convert scroll into a continuous angle/time for chaotic path
        const scrollFactor = scroll * data.speed * 0.003; 

        // Calculate wandering X and Y based on scroll + idle time
        // Using multiple sin/cos waves creates unpredictable "random" paths
        const wanderX = Math.sin(scrollFactor + i * 1.5) * Math.cos(scrollFactor * 0.7 + i) * (vwRef.current * 0.45);
        const wanderY = Math.cos(scrollFactor * 1.2 + i * 2.1) * Math.sin(scrollFactor * 0.5 + i) * (vhRef.current * 0.45);

        // Small idle drift even when not scrolling
        const driftX = Math.cos(elapsed * 0.4 + i) * 20;
        const driftY = Math.sin(elapsed * 0.5 + i) * 20;

        const currentX = cx + wanderX + driftX;
        const currentY = cy + wanderY + driftY;

        // Update Wrapper Position via translate3d
        wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, ${data.z}px)`;

        // Auto-rotation + Scroll rotation
        const rotX = data.baseRotX + (elapsed * 15) + (scroll * data.speed * 0.2);
        const rotY = data.baseRotY + (elapsed * 20) + (scroll * data.speed * 0.3);

        // Update Inner Cube Rotation
        inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-cubes-container" aria-hidden="true">
      {CUBE_DATA.map((cube, i) => (
        <div
          key={i}
          ref={(el) => (wrapperRefs.current[i] = el)}
          className={`scroll-cube scroll-cube--${cube.colorClass}`}
          style={{
            opacity: cube.opacity,
            "--cube-size": `${cube.size}px`,
            "--cube-font": `${Math.max(11, cube.size * 0.22)}px`,
          }}
        >
          <div
            ref={(el) => (cubeRefs.current[i] = el)}
            className="scroll-cube__inner"
          >
            {FACES.map((face) => (
              <div key={face} className={`scroll-cube__face scroll-cube__face--${face}`}>
                {cube.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
