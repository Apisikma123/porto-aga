import { COLORS } from "../../config/data";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "32px 0", marginTop: 24 }}>
      <Container>
        <div
          className="footer-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            title="Muhammad Aga Putra"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10px",
              height: 34,
              borderRadius: 8,
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              fontFamily: "'Space Grotesk', Consolas, monospace",
              fontWeight: 800,
              fontSize: 14,
              color: "#0a0a0f",
              letterSpacing: 1,
              boxShadow: "0 0 12px rgba(0, 212, 255, 0.25)",
            }}
          >
            &lt;Aga&gt;
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>
            © {new Date().getFullYear()} Muhammad Aga Putra · SMK Telkom 1 Medan
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              {
                href: "https://github.com/Apisikma123",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                ),
              },
              {
                href: "https://instagram.com/aga_putraa1",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                href: "https://wa.me/6285169084136",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: COLORS.muted, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
