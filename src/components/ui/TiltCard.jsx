/* ═══════════════════════════════════════════════════════════
   TiltCard — Vanilla 3D tilt effect wrapper
   Mouse-responsive perspective rotation with glare overlay
═══════════════════════════════════════════════════════════ */

import { useRef, useCallback, useState } from "react";

const MAX_TILT = 8; // degrees
const GLARE_MAX = 0.12;
const TRANSITION_MS = 400;

export function TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = MAX_TILT,
  glare = true,
  scale = 1.02,
  disabled = false,
  as: Tag = "div",
  ...props
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Check for mobile/touch (disable tilt)
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const shouldDisable = disabled || isTouchDevice;

  const updateTransform = useCallback(
    (e) => {
      if (shouldDisable || !cardRef.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Normalize to -1..1
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const rotateX = ((centerY - y) / centerY) * maxTilt;

        cardRef.current.style.transform =
          `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        // Update glare
        if (glare) {
          const glareEl = cardRef.current.querySelector(".tilt-glare-inner");
          if (glareEl) {
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            const intensity = Math.min(
              Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) /
                Math.max(centerX, centerY),
              1
            );
            glareEl.style.transform = `rotate(${angle}deg)`;
            glareEl.style.opacity = intensity * GLARE_MAX;
          }
        }
      });
    },
    [shouldDisable, maxTilt, scale, glare]
  );

  const handleEnter = useCallback(() => {
    if (shouldDisable || !cardRef.current) return;
    setIsHovered(true);
    cardRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  }, [shouldDisable]);

  const handleLeave = useCallback(() => {
    if (shouldDisable || !cardRef.current) return;
    setIsHovered(false);
    cardRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glare) {
      const glareEl = cardRef.current.querySelector(".tilt-glare-inner");
      if (glareEl) glareEl.style.opacity = 0;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [shouldDisable, glare]);

  return (
    <Tag
      ref={cardRef}
      className={`tilt-card-3d ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: isHovered ? "transform" : "auto",
        ...style,
      }}
      onMouseMove={updateTransform}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
      {glare && !shouldDisable && (
        <div
          className="tilt-glare"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            className="tilt-glare-inner"
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
              opacity: 0,
              transition: `opacity ${TRANSITION_MS}ms ease`,
              pointerEvents: "none",
            }}
          />
        </div>
      )}
    </Tag>
  );
}
