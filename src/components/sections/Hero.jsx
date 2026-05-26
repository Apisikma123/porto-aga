import { useEffect, useRef } from "react";
import { useTyping } from "../../hooks/useTyping";
import { COLORS, TYPING_TEXTS } from "../../config/data";
import { Container } from "../layout/Container";
import { TiltCard } from "../ui/TiltCard";
import gsap from "gsap";

export function Hero({ github }) {
  const typing = useTyping(TYPING_TEXTS);
  const containerRef = useRef(null);
  
  const loading = github?.loading ?? true;
  const profile = github?.profile;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
      });

      gsap.from(".hero-desc", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".hero-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.fromTo(".hero-avatar-wrapper",
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.4,
          ease: "elastic.out(1, 0.75)",
          clearProps: "all"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 80,
      }}
    >
      <Container style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div
          className="hero-grid"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 500px", minWidth: 0 }}>
            {/* Badge */}
            <div
              className="hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0, 212, 170, 0.08)",
                border: "1px solid rgba(0, 212, 170, 0.25)",
                borderRadius: 99,
                padding: "6px 14px",
                marginBottom: 28,
                fontSize: 12,
                fontWeight: 500,
                color: COLORS.accent,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              Tersedia untuk proyek & kolaborasi
            </div>

            {/* Title */}
            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 16,
                background: `linear-gradient(120deg, ${COLORS.accent}, ${COLORS.accent2}, ${COLORS.accent3}, ${COLORS.accent})`,
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 5s ease infinite",
              }}
            >
              Muhammad Aga Putra
            </h1>

            {/* Subtitle */}
            <div
              className="hero-subtitle"
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                fontWeight: 500,
                color: COLORS.text,
                marginBottom: 20,
                minHeight: "1.6em",
              }}
            >
              {typing}
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: COLORS.accent,
                  marginLeft: 3,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            {/* Description */}
            <p
              className="hero-desc"
              style={{
                color: COLORS.muted,
                fontSize: 15,
                lineHeight: 1.75,
                maxWidth: 500,
                marginBottom: 32,
              }}
            >
              Siswa kelas XI RPL di SMK Telkom 1 Medan yang passionate di dunia pengembangan perangkat lunak. Suka membangun aplikasi web & mobile, berkontribusi open source, dan terus belajar hal-hal baru.
            </p>

            {/* Buttons */}
            <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="btn-primary hero-btn"
                onClick={() => document.getElementById("repos")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                  color: COLORS.bg,
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "var(--font-body)",
                }}
              >
                Lihat Proyek
              </button>
              <a
                href="https://github.com/Apisikma123"
                target="_blank"
                rel="noreferrer"
                className="btn-outline hero-btn"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                  background: "none",
                  borderRadius: 10,
                  padding: "13px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 17, height: 17 }}>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub {profile && !loading ? `(${profile.followers} Followers)` : ""}
              </a>
            </div>
          </div>

          {/* Avatar Container */}
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <TiltCard maxTilt={10} scale={1.05}>
              <div
                className="hero-avatar-wrapper avatar-container"
                style={{
                  position: "relative",
                  width: "clamp(160px, 20vw, 240px)",
                  height: "clamp(160px, 20vw, 240px)",
                  flexShrink: 0,
                }}
              >
                {/* Glowing animated ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    background: `conic-gradient(#00d4ff, #00ff88, #00aaff, #00d4ff)`,
                    animation: "spin 4s linear infinite",
                    filter: "blur(1px)",
                    boxShadow: "0 0 25px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 255, 136, 0.2)",
                  }}
                />
                
                <img
                  src={profile?.avatar_url || "https://avatars.githubusercontent.com/u/183683553?v=4"}
                  alt={profile?.name || "Muhammad Aga Putra"}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 1,
                    border: "3px solid rgba(0, 212, 255, 0.3)",
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)",
                  }}
                />
              </div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
