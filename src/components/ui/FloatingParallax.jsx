/* ═══════════════════════════════════════════════════════════
   FloatingParallax — Background floating tech icons
   Icons drift with parallax on scroll, subtle opacity
═══════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import { FLOAT_ICONS, COLORS } from "../../config/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_ITEMS = [
  { icon: "{ }", color: "#f05340", x: "6%", y: "25%", speed: 0.3, size: 20 },
  { icon: "</>", color: "#00d4aa", x: "88%", y: "15%", speed: 0.5, size: 18 },
  { icon: "( )", color: "#00aaff", x: "75%", y: "55%", speed: 0.2, size: 16 },
  { icon: "=>", color: "#f1e05a", x: "12%", y: "65%", speed: 0.45, size: 17 },
  { icon: "[ ]", color: "#00ff88", x: "50%", y: "10%", speed: 0.35, size: 15 },
  { icon: "//", color: "#b07219", x: "92%", y: "75%", speed: 0.25, size: 19 },
  { icon: "&&", color: "#f1502f", x: "30%", y: "85%", speed: 0.4, size: 14 },
  { icon: "!=", color: "#00B4AB", x: "65%", y: "35%", speed: 0.55, size: 16 },
  { icon: "++", color: "#6181B6", x: "20%", y: "45%", speed: 0.3, size: 18 },
  { icon: "**", color: "#563d7c", x: "82%", y: "90%", speed: 0.4, size: 15 },
];

export function FloatingParallax() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".parallax-item");

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const speed = PARALLAX_ITEMS[i]?.speed || 0.3;

        // Parallax on scroll
        gsap.to(item, {
          y: () => -speed * 300,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Subtle bob animation
        gsap.to(item, {
          y: `+=${8 + i * 2}`,
          rotation: (i % 2 === 0 ? 1 : -1) * (3 + i),
          duration: 4 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {PARALLAX_ITEMS.map((item, i) => (
        <div
          key={i}
          className="parallax-item"
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            fontSize: item.size,
            fontFamily: "'Space Grotesk', monospace",
            fontWeight: 700,
            color: item.color,
            opacity: 0.06,
            userSelect: "none",
            willChange: "transform",
            textShadow: `0 0 20px ${item.color}44`,
            filter: "blur(0.5px)",
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
