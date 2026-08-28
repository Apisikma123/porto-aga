# AGA STUDIO — Design System & UI Specification

Design tokens, geometric consistency guidelines, and component standards for Muhammad Aga Putra's Portfolio & Web Applications.

---

## 1. Geometric Consistency & Border Radius Scale

All interactive buttons and container cards follow a unified, slightly rounded modern standard across all pages and viewports:

| Token Category | CSS Value | Tailwind Class | Usage / Target Components |
|---|---|---|---|
| **Buttons & Controls** | `0.75rem` (12px) | `rounded-xl` | All CTA buttons (`.btn-crimson`, `.btn-glass`), filter chips, search inputs, modal triggers, pagination |
| **Micro Badges & Pills** | `0.5rem` (8px) | `rounded-lg` | Language switchers (`.lang-btn`), status capsules, tech tags, telemetry indicators |
| **Cards & Containers** | `1.25rem` (20px) | `rounded-2xl` | Showcase cards (`.glass-card`, `.carousel-card`, `.activity-standalone-card`), project previews |
| **Hero Islands & Nav** | `9999px` | `rounded-full` | Floating header navigation bar pill |

---

## 2. Color Palette & Theming

- **Brand Crimson**: `#DC143C` (Hover: `#b01030`, Glow: `rgba(220, 20, 60, 0.4)`)
- **Obsidian Dark Base**: `#040509` (Surfaces: `rgba(16, 17, 24, 0.8)`)
- **Celestial Slate Light**: `#e2e8f2` (Surfaces: `rgba(255, 255, 255, 0.90)`)
- **Neutral Accents**: `Zinc-100` through `Zinc-600` (Never raw unstyled greens/emeralds).

---

## 3. Typography Scale

- **Display & Headings**: `Poppins` (Weights: 400, 600, 700, 800, 900)
- **Monospace & Telemetry**: `JetBrains Mono` (Weights: 400, 500, 600)
- **Iconography**: Google Material Symbols Outlined (Opsz 24, Weight 300, Fill 0)

---

## 4. Interaction & Micro-Animation Physics

- **Button Transition**: `all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`
- **Hover Lift**: `transform: translateY(-2px) scale(1.02)` on primary CTAs
- **Backdrop Blur**: `16px` to `24px` with `-webkit-backdrop-filter` parity
