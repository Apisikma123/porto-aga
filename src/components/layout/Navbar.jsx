import { useState, useEffect } from "react";
import { COLORS } from "../../config/data";
import { Container } from "./Container";

export function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Tentang", "Keahlian", "Proyek", "Kontak"];
  const ids = ["about", "skills", "repos", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(3, 11, 14, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.35s ease",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo — <Aga> Badge */}
          <div
            title="Muhammad Aga Putra"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12px",
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              fontFamily: "'Space Grotesk', Consolas, monospace",
              fontWeight: 800,
              fontSize: 16,
              color: "#0a0a0f",
              letterSpacing: 1,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(0, 212, 255, 0.3)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(0, 212, 255, 0.5)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 16px rgba(0, 212, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            &lt;Aga&gt;
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {links.map((l, i) => (
              <button
                key={l}
                onClick={() => scrollTo(ids[i])}
                className={`nav-link ${activeSection === ids[i] ? "active" : ""}`}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.muted,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-outline"
              style={{
                border: `1px solid ${COLORS.accent}`,
                color: COLORS.accent,
                background: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}
            >
              Hubungi Saya
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
            aria-label="Menu"
            id="hamburger-btn"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: COLORS.accent,
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: open
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px, -5px)"
                        : "scaleX(0)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            maxHeight: open ? 400 : 0,
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: open ? 1 : 0,
          }}
        >
          <div
            className="glass-panel"
            style={{
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {links.map((l, i) => (
              <button
                key={l}
                onClick={() => scrollTo(ids[i])}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.text,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  textAlign: "left",
                  padding: "10px 8px",
                  borderBottom:
                    i < links.length - 1 ? `1px solid ${COLORS.border}` : "none",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}
