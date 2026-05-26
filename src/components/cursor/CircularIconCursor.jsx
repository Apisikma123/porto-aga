import { useState, useEffect, useRef } from "react";
import { CURSOR_ICONS, COLORS } from "../../config/data";

const lerp = (a, b, t) => a + (b - a) * t;

function RingGlow({ ringRef, radius }) {
  const glowRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const el = glowRef.current;
      if (el) {
        const r = ringRef.current;
        el.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ringRef]);

  const size = radius * 2 + 40;
  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1px solid rgba(0,212,170,0.18)",
        background: "radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 99997,
        willChange: "transform",
        transform: "translate(-300px, -300px) translate(-50%, -50%)",
      }}
    />
  );
}

export function CircularIconCursor({ count = 8, radius = 52, speed = 0.1 }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseRef = useRef({ x: -300, y: -300 });
  const ringRef = useRef({ x: -300, y: -300 });
  const lastMoveRef = useRef(Date.now());
  const nodeRefs = useRef([]);
  const dotRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = Date.now();
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = (timestamp) => {
      const ring = ringRef.current;
      const mouse = mouseRef.current;

      ring.x = lerp(ring.x, mouse.x, speed);
      ring.y = lerp(ring.y, mouse.y, speed);

      const idleSec = (Date.now() - lastMoveRef.current) / 1000;
      const isIdle = idleSec > 0.25;

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = (i / count) * Math.PI * 2;
        const wave = isIdle
          ? Math.sin(timestamp * 0.001 * 1.8 + i * ((Math.PI * 2) / count)) * 10
          : 0;

        const spin = timestamp * 0.0004;
        const angle = baseAngle + spin;
        const r = radius + wave;
        const x = ring.x + Math.cos(angle) * r;
        const y = ring.y + Math.sin(angle) * r;
        const iconRotate = (angle * 180) / Math.PI + 90;
        const baseOpacity = isIdle
          ? 0.55 + Math.sin(timestamp * 0.002 + i) * 0.3
          : 0.7;

        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${iconRotate}deg)`;
        el.style.opacity = String(Math.max(0.15, baseOpacity));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, count, radius, speed]);

  if (isTouchDevice) return null;

  const ICON_SIZE = 18;
  const ICON_COLOR = COLORS.accent;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <RingGlow ringRef={ringRef} radius={radius} />

      {Array.from({ length: count }, (_, i) => {
        const IconFn = CURSOR_ICONS[i % CURSOR_ICONS.length];
        return (
          <div
            key={i}
            ref={(el) => { nodeRefs.current[i] = el; }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 99998,
              willChange: "transform, opacity",
              transform: "translate(-300px, -300px)",
              opacity: 0,
              filter: `drop-shadow(0 0 4px ${ICON_COLOR}88)`,
              transition: "opacity 0.2s ease",
            }}
          >
            {IconFn(ICON_SIZE, ICON_COLOR)}
          </div>
        );
      })}

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: COLORS.accent,
          pointerEvents: "none",
          zIndex: 100000,
          boxShadow: `0 0 8px ${COLORS.accent}, 0 0 20px rgba(0,212,170,0.5)`,
          transform: "translate(-300px, -300px) translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
