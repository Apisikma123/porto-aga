/* ═══════════════════════════════════════════════════════════
   MUHAMMAD AGA PUTRA — PORTFOLIO DATA
   All personal data, colors, skills, repos, contacts
   GH_STATS, GH_REPOS, SKILLS → fallback defaults (GitHub API is primary)
═══════════════════════════════════════════════════════════ */

export const GITHUB_USERNAME = "Apisikma123";

export const COLORS = {
  bg: "#030b0e",
  surface: "#071318",
  surface2: "#0d1f26",
  accent: "#00d4aa",
  accent2: "#00aaff",
  accent3: "#00ff88",
  text: "#e2f0ef",
  muted: "#5a8a85",
  border: "rgba(0, 212, 170, 0.15)",
  borderHover: "rgba(0, 212, 170, 0.5)",
};

export const LANG_COLORS = {
  Blade: "#f05340",
  PHP: "#6181B6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Dart: "#00B4AB",
  default: "#00d4aa",
};

export const TYPING_TEXTS = [
  "Siswa RPL · SMK Telkom 1 Medan",
  "Full-Stack Developer",
  "Open Source Builder",
  "Mobile Developer",
];

export const SKILLS = [
  { name: "Blade", pct: 60, type: "Template Engine", color: "#f05340" },
  { name: "Dart", pct: 30, type: "Flutter / Mobile", color: "#00B4AB" },
  { name: "HTML", pct: 10, type: "Markup Language", color: "#e34c26" },
];

export const SKILL_ICONS = {
  Blade: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" /><path d="M16 8H8l.5 5h7l-.5 5-3 1-3-1-.2-2.5" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M8.5 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H8.5z" /><path d="M12 14v4" /><circle cx="12" cy="20" r="1" /><path d="M9 10c0-1.5 1.5-3 3-3s3 1.5 3 3" />
    </svg>
  ),
  Dart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M5 8l4-4 10 10-4 4L5 8z" /><path d="M9 18l3 3 4-4" /><path d="M15 4l4 4" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M3 3l1.5 17L12 22l7.5-2L21 3H3z" /><path d="M16 8H8l.5 4h7l-.5 5-3 1-3-1" />
    </svg>
  ),
};

export const TAG_PILLS = [
  "REST API", "Livewire", "Figma",
];

export const CONTACTS = [
  { label: "Email", value: "agaputra62@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=agaputra62@gmail.com", color: "#00d4aa" },
  { label: "WhatsApp", value: "085169084136", href: "https://wa.me/6285169084136", color: "#25D366" },
  { label: "GitHub", value: "Apisikma123", href: "https://github.com/Apisikma123", color: "#e2f0ef" },
  { label: "Instagram", value: "@aga_putraa1", href: "https://instagram.com/aga_putraa1", color: "#E1306C" },
  { label: "Discord", value: "aga55555", href: "https://discord.com/users/aga55555", color: "#5865F2" },
  { label: "Lokasi", value: "Medan, Sumatera Utara", href: "https://maps.google.com/?q=Medan,+Sumatera+Utara", color: "#ff6b6b" },
];

export const CONTACT_ICONS = {
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Discord: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
      <path d="M7.5 7.5c1-.5 2.5-.5 4.5-.5s3.5 0 4.5.5M7.5 16.5c1 .5 2.5.5 4.5.5s3.5 0 4.5-.5" />
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.129 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  ),
  Lokasi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export const FLOAT_ICONS = [
  {
    name: "Laravel",
    color: "#f05340",
    x: "8%",
    y: "18%",
    delay: 0,
    dur: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    name: "React",
    color: "#00d4aa",
    x: "82%",
    y: "14%",
    delay: 1.2,
    dur: 7,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    )
  },
  {
    name: "Flutter",
    color: "#00aaff",
    x: "70%",
    y: "72%",
    delay: 0.5,
    dur: 5.5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <path d="M14.5 2L3 13.5l3.5 3.5L18 5.5z" />
        <path d="M14.5 13L9 18.5l3.5 3.5 9-9z" />
      </svg>
    )
  },
  {
    name: "Java",
    color: "#b07219",
    x: "15%",
    y: "80%",
    delay: 2,
    dur: 6.8,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    )
  },
  {
    name: "Tailwind",
    color: "#00ff88",
    x: "55%",
    y: "8%",
    delay: 0.8,
    dur: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <path d="M12 3c-1.2 0-2.4.6-3.6 1.8L3 10.2c-1.2 1.2-1.2 3 0 4.2l5.4 5.4c1.2 1.2 2.4 1.8 3.6 1.8s2.4-.6 3.6-1.8l5.4-5.4c1.2-1.2 1.2-3 0-4.2l-5.4-5.4C14.4 3.6 13.2 3 12 3z"/>
      </svg>
    )
  },
  {
    name: "Git",
    color: "#f1502f",
    x: "90%",
    y: "50%",
    delay: 1.7,
    dur: 7.2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    )
  },
  {
    name: "JavaScript",
    color: "#f1e05a",
    x: "3%",
    y: "50%",
    delay: 2.5,
    dur: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <path d="M3 3h18v18H3V3zm12 12c0 1.1-.9 2-2 2s-2-.9-2-2m0-4v4" />
      </svg>
    )
  },
  {
    name: "MySQL",
    color: "#00aaff",
    x: "40%",
    y: "90%",
    delay: 0.3,
    dur: 5.8,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  },
];

export const GH_STATS = { repos: 12, followers: 13, following: 11 };

export const GH_REPOS = [
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

/* Cursor icon render functions */
export const CURSOR_ICONS = [
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
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // terminal prompt
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  // git branch
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  // semicolon / code
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 11h-5c-1.7 0-3 1.3-3 3v.5" /><circle cx="17" cy="8" r="1.5" fill={color} /><circle cx="10" cy="17" r="1" fill={color} /><path d="M10 18.5c-.5 1-1.5 1.5-2 2" />
    </svg>
  ),
  // lambda / function
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20l6-16 6 16" /><path d="M8 14h8" />
    </svg>
  ),
  // database
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  // wifi/signal (api)
  (size, color) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 16 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill={color} />
    </svg>
  ),
];
