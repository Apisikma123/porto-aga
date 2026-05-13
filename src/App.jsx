import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   MUHAMMAD AGA PUTRA — PORTFOLIO
   Dark cyberpunk-teal · React JSX · Circular icon cursor
═══════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#030b0e",
  surface: "#071318",
  surface2: "#0d1f26",
  accent: "#00d4aa",
  accent2: "#00aaff",
  accent3: "#00ff88",
  text: "#e2f0ef",
  muted: "#5a8a85",
  border: "rgba(0,212,170,0.15)",
  borderHover: "rgba(0,212,170,0.5)",
};

const LANG_COLORS = {
  Blade: "#f05340", PHP: "#6181B6", JavaScript: "#f1e05a",
  HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", Dart: "#00B4AB",
  default: "#00d4aa",
};

const TYPING_TEXTS = [
  "Siswa RPL · SMK Telkom 1 Medan",
  "Full-Stack Developer",
  "Open Source Builder",
  "Mobile Developer",
];

const SKILLS = [
  { name: "Blade", pct: 44, type: "Template Engine", color: "#f05340", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { name: "HTML", pct: 22, type: "Markup Language", color: "#e34c26", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" /><path d="M16 8H8l.5 5h7l-.5 5-3 1-3-1-.2-2.5" /></svg> },
  { name: "Java", pct: 11, type: "OOP Language", color: "#b07219", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><path d="M8.5 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H8.5z" /><path d="M12 14v4" /><circle cx="12" cy="20" r="1" /><path d="M9 10c0-1.5 1.5-3 3-3s3 1.5 3 3" /></svg> },
  { name: "Dart", pct: 11, type: "Flutter / Mobile", color: "#00B4AB", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><path d="M5 8l4-4 10 10-4 4L5 8z" /><path d="M9 18l3 3 4-4" /><path d="M15 4l4 4" /></svg> },
  { name: "CSS", pct: 11, type: "Styling", color: "#563d7c", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><path d="M3 3l1.5 17L12 22l7.5-2L21 3H3z" /><path d="M16 8H8l.5 4h7l-.5 5-3 1-3-1" /></svg> },
];

const TAG_PILLS = ["Laravel", "HTML5", "Java", "Dart/Flutter", "MySQL", "Git", "REST API", "Livewire", "Figma"];

const CONTACTS = [
  { label: "Email", value: "agaputra62@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=agaputra62@gmail.com", color: COLORS.accent, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> },
  { label: "WhatsApp", value: "085169084136", href: "https://wa.me/6285169084136", color: "#25D366", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
  { label: "GitHub", value: "Apisikma123", href: "https://github.com/Apisikma123", color: COLORS.text, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
  { label: "Instagram", value: "@aga_putraa1", href: "https://instagram.com/aga_putraa1", color: "#E1306C", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: "Discord", value: "aga55555", href: "https://discord.com/users/aga55555", color: "#5865F2", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M7.5 7.5c1-.5 2.5-.5 4.5-.5s3.5 0 4.5.5M7.5 16.5c1 .5 2.5.5 4.5.5s3.5 0 4.5-.5" /><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.129 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg> },
  { label: "Lokasi", value: "Medan, Sumatera Utara", href: "https://maps.google.com/?q=Medan,+Sumatera+Utara", color: "#ff6b6b", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> },
];

const FLOAT_ICONS = [
  { text: "{ }", x: "8%", y: "18%", delay: 0, dur: 6 },
  { text: "git", x: "82%", y: "14%", delay: 1.2, dur: 7 },
  { text: "npm", x: "70%", y: "72%", delay: 0.5, dur: 5.5 },
  { text: "[ ]", x: "15%", y: "80%", delay: 2, dur: 6.8 },
  { text: "=>", x: "55%", y: "8%", delay: 0.8, dur: 5 },
  { text: "</>", x: "90%", y: "50%", delay: 1.7, dur: 7.2 },
  { text: "( )", x: "3%", y: "50%", delay: 2.5, dur: 6 },
  { text: "&&", x: "40%", y: "90%", delay: 0.3, dur: 5.8 },
];

const GH_STATS = { repos: 12, followers: 13, following: 11 };

const GH_REPOS = [
  { id: 1, name: "kereta-tapir", description: "Aplikasi manajemen tiket kereta berbasis web dengan Laravel & Blade.", language: "Blade", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/kereta-tapir" },
  { id: 2, name: "foodify", description: "Aplikasi food delivery mobile menggunakan Flutter & Dart.", language: "Dart", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/foodify" },
  { id: 3, name: "cinta--website-konseling-sekola-", description: "Website konseling sekolah — fitur laporan & tracking siswa (Laravel).", language: "Blade", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/cinta--website-konseling-sekola-" },
  { id: 4, name: "web-laporan-bk", description: "Sistem web laporan Bimbingan Konseling berbasis Laravel + Blade.", language: "Blade", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/web-laporan-bk" },
  { id: 5, name: "mobile-dasar", description: "Project belajar mobile development — eksplorasi HTML & Flutter.", language: "HTML", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/mobile-dasar" },
  { id: 6, name: "presensi", description: "Sistem presensi digital berbasis web menggunakan Laravel & Blade.", language: "Blade", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/presensi" },
  { id: 7, name: "template-porto", description: "Template portfolio pribadi reusable — HTML & CSS murni.", language: "HTML", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/template-porto" },
  { id: 8, name: "portomybapak", description: "Portfolio website keluarga — hasil fork & kustomisasi penuh.", language: null, stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/portomybapak" },
  { id: 9, name: "Apisikma123", description: "I am a programmer who wants to change the world — profile repo.", language: null, stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Apisikma123/Apisikma123" },
];

/* ═══════════════════════════════════════════════════════════
   CIRCULAR ICON CURSOR
   - N icons orbit in a perfect circle around the cursor
   - The whole ring follows mouse with lerp (smooth lag)
   - When idle: wave/breathing animation via sin offset
   - Each icon is an SVG coding symbol
═══════════════════════════════════════════════════════════ */

const CURSOR_ICONS = [
  // { } brace
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  ),
  // </> tag
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // terminal prompt
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  // git branch
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  // semicolon / code
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 11h-5c-1.7 0-3 1.3-3 3v.5" />
      <circle cx="17" cy="8" r="1.5" fill={color} />
      <circle cx="10" cy="17" r="1" fill={color} />
      <path d="M10 18.5c-.5 1-1.5 1.5-2 2" />
    </svg>
  ),
  // lambda / function
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20l6-16 6 16" />
      <path d="M8 14h8" />
    </svg>
  ),
  // database
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  // wifi/signal (api)
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 16 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill={color} />
    </svg>
  ),
];

const lerp = (a, b, t) => a + (b - a) * t;

function CircularIconCursor({ count = 8, radius = 52, speed = 0.1 }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseRef = useRef({ x: -300, y: -300 });
  const ringRef = useRef({ x: -300, y: -300 });
  const idleTimeRef = useRef(0);
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
      // Move hotspot dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = (timestamp) => {
      const ring = ringRef.current;
      const mouse = mouseRef.current;

      // Lerp ring center toward mouse
      ring.x = lerp(ring.x, mouse.x, speed);
      ring.y = lerp(ring.y, mouse.y, speed);

      // Idle wave: how long since last move (seconds)
      const idleSec = (Date.now() - lastMoveRef.current) / 1000;
      const isIdle = idleSec > 0.25;

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = (i / count) * Math.PI * 2;
        // When idle: wave offset per icon (creates ripple/breathing)
        const wave = isIdle
          ? Math.sin(timestamp * 0.001 * 1.8 + i * ((Math.PI * 2) / count)) * 10
          : 0;

        // Spinning ring rotation: slow constant spin + idle wobble
        const spin = timestamp * 0.0004;
        const angle = baseAngle + spin;

        const r = radius + wave;
        const x = ring.x + Math.cos(angle) * r;
        const y = ring.y + Math.sin(angle) * r;

        // Counter-rotate icon so it always faces "outward"
        const iconRotate = (angle * 180) / Math.PI + 90;

        // Pulse opacity on idle
        const baseOpacity = isIdle ? 0.55 + Math.sin(timestamp * 0.002 + i) * 0.3 : 0.7;

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
  const ICON_COLOR = "#00d4aa";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Orbital ring glow — follows ring center with lerp */}
      <RingGlow ringRef={ringRef} radius={radius} />

      {/* Coding icons orbiting in circle */}
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

      {/* Cursor hotspot dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00d4aa",
          pointerEvents: "none",
          zIndex: 100000,
          boxShadow: "0 0 8px rgba(0,212,170,1), 0 0 20px rgba(0,212,170,0.5)",
          transform: "translate(-300px, -300px) translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}

// Separate component so we can update the glow div via RAF without re-renders
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

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
function GlobalStyles() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #030b0e; color: #e2f0ef; font-family: 'Poppins', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #030b0e; }
    ::-webkit-scrollbar-thumb { background: #00d4aa44; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #00d4aa88; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
    @keyframes floatSmall { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,212,170,.6); } 50% { box-shadow: 0 0 0 7px rgba(0,212,170,0); } }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(60px,-40px) scale(1.1); } 66% { transform: translate(-30px,30px) scale(.95); } }
    @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-50px,30px) scale(1.05); } 66% { transform: translate(40px,-50px) scale(.9); } }
    @keyframes orb3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.08); } }

    .premium-card { transition: all 0.4s cubic-bezier(.4,0,.2,1); position: relative; overflow: hidden; }
    .premium-card:hover { transform: translateY(-8px) scale(1.01); border-color: rgba(0,212,170,.4) !important; box-shadow: 0 20px 40px rgba(0,0,0,.4), 0 0 20px rgba(0,212,170,.1); }
    .avatar-container { transition: all 0.5s cubic-bezier(.4,0,.2,1); }
    .avatar-container:hover { transform: scale(1.05) rotate(3deg); filter: drop-shadow(0 0 30px rgba(0,212,170,.4)); }
    .glow-text { transition: text-shadow .3s ease; }
    .glow-text:hover { text-shadow: 0 0 15px rgba(0,212,170,.6); color: #fff !important; }
    .skill-card-icon { transition: transform .3s ease; }
    .skill-card:hover .skill-card-icon { animation: floatSmall 1s ease-in-out infinite; }
    .nav-link { position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#00d4aa; transition: width .3s ease; }
    .nav-link.active::after, .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#00d4aa !important; }
    .contact-card { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
    .contact-card:hover { transform: translateY(-3px); border-color: rgba(0,212,170,.4) !important; box-shadow: 0 4px 20px rgba(0,212,170,.1) !important; }
    .btn-primary { transition: all .25s ease; cursor: pointer; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,212,170,.4); }
    .btn-outline { transition: all .25s ease; cursor: pointer; }
    .btn-outline:hover { background: rgba(0,212,170,.1); transform: translateY(-2px); }
    .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(37,211,102,.4); }
    .repo-card { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
    .repo-card:hover { transform: translateY(-5px); border-color: rgba(0,212,170,.5) !important; box-shadow: 0 0 24px rgba(0,212,170,.18) !important; }
    .repo-card:hover .repo-accent { opacity: 1 !important; }
    .section-fade { opacity: 0; transform: translateY(32px); transition: opacity .7s ease, transform .7s ease; }
    .section-fade.visible { opacity: 1; transform: translateY(0); }
    .skill-bar-inner { width: 0; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
    @media (max-width: 768px) {
      .hero-grid { flex-direction: column-reverse !important; text-align: center !important; }
      .hero-btns { justify-content: center !important; }
      .about-grid { flex-direction: column !important; align-items: center !important; }
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .skills-grid { grid-template-columns: 1fr 1fr !important; }
      .repos-grid { grid-template-columns: 1fr 1fr !important; }
      .contact-grid { grid-template-columns: 1fr 1fr !important; }
      .footer-inner { flex-direction: column !important; gap: 12px !important; text-align: center; }
      .desktop-nav { display: none !important; }
      #hamburger-btn { display: flex !important; }
    }
    @media (max-width: 480px) {
      .skills-grid { grid-template-columns: 1fr !important; }
      .repos-grid { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .hero-btns { flex-direction: column; width: 100%; }
      .hero-btns > * { width: 100%; justify-content: center; }
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/* ═══════════════════════════════════════════════════════════
   UTILITY COMPONENTS
═══════════════════════════════════════════════════════════ */
function FadeSection({ id, children, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <section id={id} ref={ref} className="section-fade" style={{ padding: "80px 0", ...style }}>{children}</section>;
}

function Container({ children, style = {} }) {
  return <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", width: "100%", boxSizing: "border-box", ...style }}>{children}</div>;
}

function SectionHeading({ title, sub }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>{sub}</div>
      <h2 className="glow-text" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: COLORS.text, lineHeight: 1.2 }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg,${COLORS.accent},${COLORS.accent2})`, borderRadius: 99, margin: "16px auto 0" }} />
    </div>
  );
}

function SkillBar({ pct, color }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.width = pct + "%"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden", marginTop: 12 }}>
      <div ref={ref} className="skill-bar-inner" style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${color},${color}aa)`, width: 0, transition: "width 1.2s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BACKGROUND
═══════════════════════════════════════════════════════════ */
function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,212,170,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,.03) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,.07) 0%,transparent 70%)", animation: "orb1 14s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "55%", right: "8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,170,255,.06) 0%,transparent 70%)", animation: "orb2 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "40%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,136,.05) 0%,transparent 70%)", animation: "orb3 12s ease-in-out infinite" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Tentang", "Keahlian", "Proyek", "Kontak"];
  const ids = ["about", "skills", "repos", "contact"];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(3,11,14,.85)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none", transition: "all .35s ease" }}>
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>
            <span style={{ color: COLORS.accent }}>MAP</span><span style={{ color: COLORS.text }}>.</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {links.map((l, i) => (
              <button key={l} onClick={() => scrollTo(ids[i])}
                className={`nav-link ${activeSection === ids[i] ? "active" : ""}`}
                style={{ background: "none", border: "none", color: COLORS.muted, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "Poppins", transition: "color .2s" }}>
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-outline"
              style={{ border: `1px solid ${COLORS.accent}`, color: COLORS.accent, background: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, fontFamily: "Poppins" }}>
              Hubungi Saya
            </button>
          </div>
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }} aria-label="Menu" id="hamburger-btn">
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 24, height: 2, background: COLORS.accent, borderRadius: 2, transition: "all .3s", transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
            ))}
          </button>
        </div>
        <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "all .4s cubic-bezier(.4,0,.2,1)", opacity: open ? 1 : 0 }}>
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {links.map((l, i) => (
              <button key={l} onClick={() => scrollTo(ids[i])}
                style={{ background: "none", border: "none", color: COLORS.text, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "Poppins", textAlign: "left", padding: "10px 8px", borderBottom: i < links.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   TYPING HOOK
═══════════════════════════════════════════════════════════ */
function useTyping(texts) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const full = texts[idx];
    let timer;
    if (phase === "typing") {
      if (display.length < full.length) timer = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), 65);
      else timer = setTimeout(() => setPhase("pause"), 1600);
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (display.length > 0) timer = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
      else { setIdx((idx + 1) % texts.length); setPhase("typing"); }
    }
    return () => clearTimeout(timer);
  }, [display, phase, idx, texts]);
  return display;
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  const typing = useTyping(TYPING_TEXTS);
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
      {FLOAT_ICONS.map((ic, i) => (
        <div key={i} style={{ position: "absolute", left: ic.x, top: ic.y, color: `rgba(0,212,170,${0.12 + (i % 3) * 0.04})`, fontSize: i % 2 === 0 ? 18 : 14, fontFamily: "monospace", fontWeight: 700, userSelect: "none", animation: `float ${ic.dur}s ease-in-out ${ic.delay}s infinite`, zIndex: 1 }}>{ic.text}</div>
      ))}
      <Container style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 500px", minWidth: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,.08)", border: `1px solid rgba(0,212,170,.25)`, borderRadius: 99, padding: "6px 14px", marginBottom: 28, fontSize: 12, fontWeight: 500, color: COLORS.accent }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent, display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              Tersedia untuk proyek & kolaborasi
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: `linear-gradient(120deg,${COLORS.accent},${COLORS.accent2},${COLORS.accent3},${COLORS.accent})`, backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradientShift 5s ease infinite" }}>
              Muhammad Aga Putra
            </h1>
            <div style={{ fontSize: "clamp(1rem,2.2vw,1.25rem)", fontWeight: 500, color: COLORS.text, marginBottom: 20, minHeight: "1.6em" }}>
              {typing}<span style={{ display: "inline-block", width: 2, height: "1em", background: COLORS.accent, marginLeft: 3, verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />
            </div>
            <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.75, maxWidth: 500, marginBottom: 32 }}>
              Siswa kelas XI RPL di SMK Telkom 1 Medan yang passionate di dunia pengembangan perangkat lunak. Suka membangun aplikasi web & mobile, berkontribusi open source, dan terus belajar hal-hal baru.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => document.getElementById("repos")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: `linear-gradient(135deg,${COLORS.accent},${COLORS.accent2})`, color: COLORS.bg, border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, fontFamily: "Poppins" }}>
                Lihat Proyek
              </button>
              <a href="https://github.com/Apisikma123" target="_blank" rel="noreferrer" className="btn-outline"
                style={{ border: `1px solid ${COLORS.border}`, color: COLORS.text, background: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, fontFamily: "Poppins", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 17, height: 17 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                GitHub
              </a>
            </div>
          </div>
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <div className="avatar-container" style={{ position: "relative", width: "clamp(220px,25vw,300px)", height: "clamp(220px,25vw,300px)", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `conic-gradient(${COLORS.accent},${COLORS.accent2},${COLORS.accent3},${COLORS.accent})`, animation: "gradientShift 4s linear infinite", backgroundSize: "300% 300%" }} />
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: COLORS.bg }} />
              <img src="https://avatars.githubusercontent.com/u/183683553?v=4" alt="Muhammad Aga Putra"
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", position: "relative", zIndex: 1, border: `3px solid ${COLORS.bg}` }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
function About() {
  const stats = GH_STATS;
  const statItems = [
    { label: "Public Repos", value: stats.repos },
    { label: "Followers", value: stats.followers },
    { label: "Following", value: stats.following },
    { label: "Tahun Coding", value: "3+" },
  ];
  const langs = [
    { name: "Blade", pct: 44, color: LANG_COLORS.Blade },
    { name: "HTML", pct: 22, color: LANG_COLORS.HTML },
    { name: "Java", pct: 11, color: LANG_COLORS.Java },
    { name: "Dart", pct: 11, color: LANG_COLORS.Dart },
    { name: "CSS", pct: 11, color: LANG_COLORS.CSS },
  ];
  return (
    <FadeSection id="about">
      <Container>
        <SectionHeading title="Tentang Saya" sub="Who am I?" />
        <div className="about-grid" style={{ display: "flex", gap: 48, alignItems: "flex-start", marginTop: 48, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 0" }}>
            <p style={{ color: COLORS.text, lineHeight: 1.85, fontSize: 15, marginBottom: 20 }}>
              Halo! Saya <strong style={{ color: COLORS.accent }}>Muhammad Aga Putra</strong>, siswa kelas XI Rekayasa Perangkat Lunak di <strong style={{ color: COLORS.accent2 }}>SMK Telkom 1 Medan</strong>. Saya memiliki passion yang besar dalam pengembangan aplikasi web dan mobile.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.85, fontSize: 15, marginBottom: 24 }}>
              Fokus saya saat ini adalah membangun aplikasi berbasis Laravel/Blade untuk web dan Flutter/Dart untuk mobile. Saya percaya pada kode yang bersih, desain yang intuitif, dan terus bereksperimen dengan teknologi baru.
            </p>
            <p style={{ color: COLORS.muted, fontStyle: "italic", fontSize: 14, marginBottom: 28, borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: 14 }}>
              "agak apa tapi gak apa kali lah"
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Rekayasa Perangkat Lunak", "Full-Stack Dev", "Open Source"].map(t => (
                <span key={t} style={{ background: "rgba(0,212,170,.1)", border: `1px solid rgba(0,212,170,.25)`, color: COLORS.accent, borderRadius: 99, padding: "5px 13px", fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 32 }}>
              {statItems.map(s => (
                <div key={s.label} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.accent, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 300px", maxWidth: 340, margin: "0 auto" }}>
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
              <img src="https://avatars.githubusercontent.com/u/183683553?v=4" alt="avatar" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid ${COLORS.accent}`, marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>Muhammad Aga Putra</div>
              <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 4 }}>@Apisikma123</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 20 }}>agak apa tapi gak apa kali lah</div>
              <div style={{ fontSize: 12, color: COLORS.muted, textAlign: "left", marginBottom: 12, fontWeight: 600 }}>Top Languages</div>
              {langs.map(l => (
                <div key={l.name} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text, marginBottom: 4 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                      {l.name}
                    </span>
                    <span style={{ color: COLORS.muted }}>{l.pct}%</span>
                  </div>
                  <SkillBar pct={l.pct} color={l.color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </FadeSection>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <FadeSection id="skills" style={{ background: `linear-gradient(180deg,transparent,rgba(7,19,24,.6),transparent)` }}>
      <Container>
        <SectionHeading title="Keahlian" sub="Tech Stack" />
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 48 }}>
          {SKILLS.map(sk => (
            <div key={sk.name} className="skill-card premium-card" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "24px 20px" }}>
              <div className="skill-card-icon" style={{ color: sk.color, marginBottom: 14 }}>{sk.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>{sk.name}</div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 14 }}>{sk.type}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: COLORS.muted }}>Penguasaan</span>
                <span style={{ color: sk.color, fontWeight: 700 }}>{sk.pct}%</span>
              </div>
              <SkillBar pct={sk.pct} color={sk.color} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 36, justifyContent: "center" }}>
          {TAG_PILLS.map(t => (
            <span key={t} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 99, padding: "6px 16px", fontSize: 12, fontWeight: 500, transition: "all .2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; }}>
              {t}
            </span>
          ))}
        </div>
      </Container>
    </FadeSection>
  );
}

/* ═══════════════════════════════════════════════════════════
   REPOS
═══════════════════════════════════════════════════════════ */
function Repos() {
  return (
    <FadeSection id="repos">
      <Container>
        <SectionHeading title="Proyek GitHub" sub="Open Source" />
        <div style={{ marginTop: 48 }}>
          <div className="repos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {GH_REPOS.map(r => (
              <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="repo-card premium-card"
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "20px 18px", textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}>
                <div className="repo-accent" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${COLORS.accent},${COLORS.accent2})`, opacity: 0, transition: "opacity .25s" }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg viewBox="0 0 16 16" fill={COLORS.muted} style={{ width: 14, height: 14, flexShrink: 0 }}><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" /></svg>
                  {r.name}
                </div>
                <p style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 14, minHeight: 36 }}>{r.description || "Tidak ada deskripsi."}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: COLORS.muted }}>
                  {r.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[r.language] || LANG_COLORS.default, display: "inline-block" }} />
                      {r.language}
                    </span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg viewBox="0 0 16 16" fill={COLORS.muted} style={{ width: 12, height: 12 }}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.873 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" /></svg>
                    {r.stargazers_count}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg viewBox="0 0 16 16" fill={COLORS.muted} style={{ width: 12, height: 12 }}><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" /></svg>
                    {r.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="https://github.com/Apisikma123" target="_blank" rel="noreferrer" className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${COLORS.border}`, color: COLORS.text, borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Lihat Semua di GitHub
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </Container>
    </FadeSection>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <FadeSection id="contact" style={{ background: `linear-gradient(180deg,transparent,rgba(7,19,24,.5),transparent)` }}>
      <Container>
        <SectionHeading title="Kontak" sub="Get in Touch" />
        <div style={{ maxWidth: 700, margin: "48px auto 0", textAlign: "center" }}>
          <p style={{ color: COLORS.muted, fontSize: 15, marginBottom: 40 }}>
            Tertarik berkolaborasi atau punya project menarik? Jangan ragu untuk menghubungi saya!
          </p>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 36 }}>
            {CONTACTS.map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-card premium-card"
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 14px", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ color: c.color }}>{c.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>{c.label}</span>
                <span style={{ fontSize: 11, color: COLORS.muted, wordBreak: "break-all", textAlign: "center" }}>{c.value}</span>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/6285169084136" target="_blank" rel="noreferrer" className="btn-wa"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all .25s ease" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              Chat di WhatsApp
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agaputra62@gmail.com" target="_blank" rel="noreferrer" className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, border: `1px solid ${COLORS.accent}`, color: COLORS.accent, background: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              Kirim Email
            </a>
          </div>
        </div>
      </Container>
    </FadeSection>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "32px 0", marginTop: 24 }}>
      <Container>
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>
            <span style={{ color: COLORS.accent }}>MAP</span><span style={{ color: COLORS.text }}>.</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>© {new Date().getFullYear()} Muhammad Aga Putra · SMK Telkom 1 Medan</div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { href: "https://github.com/Apisikma123", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
              { href: "https://instagram.com/aga_putraa1", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
              { href: "https://wa.me/6285169084136", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ color: COLORS.muted, transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.accent}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACTIVE SECTION HOOK
═══════════════════════════════════════════════════════════ */
function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "skills", "repos", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ═══════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const activeSection = useActiveSection();
  return (
    <>
      <GlobalStyles />
      <Background />

      {/* ✦ CIRCULAR ICON CURSOR — 8 coding icons orbit the mouse ✦ */}
      <CircularIconCursor
        count={8}
        radius={52}
        speed={0.1}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Repos />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
