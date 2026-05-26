import { useEffect, useRef } from "react";
import { COLORS, LANG_COLORS } from "../../config/data";
import { Container } from "../layout/Container";
import { SectionHeading } from "../layout/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { SkeletonStatCard, SkeletonLine, SkeletonContributionGraph } from "../ui/SkeletonCard";
import { ContributionGraph } from "../ui/ContributionGraph";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SkillBar({ pct, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    gsap.fromTo(
      el,
      { width: "0%" },
      {
        width: `${pct}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [pct]);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        borderRadius: 99,
        height: 6,
        overflow: "hidden",
        marginTop: 12,
      }}
    >
      <div
        ref={barRef}
        className="skill-bar-inner"
        style={{
          height: "100%",
          borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          width: 0,
        }}
      />
    </div>
  );
}

export function About({ github }) {
  const containerRef = useRef(null);

  const loading = github?.loading ?? true;
  const stats = github?.stats || { repos: 0, followers: 0, following: 0, stars: 0 };
  const rawLanguages = github?.languages || [];
  const events = github?.events || [];

  // Use fallback if languages array is somehow empty (e.g., API failure)
  const languages = rawLanguages.length > 0 ? rawLanguages : [
    { name: "Blade", pct: 60 },
    { name: "Dart", pct: 30 },
    { name: "HTML", pct: 10 },
  ];

  // Use top 3 languages from GitHub API
  const topLangs = languages.slice(0, 3).map((l) => ({
    name: l.name,
    pct: l.pct,
    color: LANG_COLORS[l.name] || COLORS.accent,
  }));

  const totalTopPct = topLangs.reduce((sum, l) => sum + l.pct, 0);
  if (totalTopPct < 100 && languages.length > 3) {
    topLangs.push({
      name: "Lainnya",
      pct: 100 - totalTopPct,
      color: COLORS.muted,
    });
  }
  
  const langs = topLangs;

  const statItems = [
    { label: "Public Repos", value: stats.repos },
    { label: "Followers", value: stats.followers },
    { label: "Total Stars", value: stats.stars || 0 },
    { label: "Tahun Coding", value: 3 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General section animation
      gsap.from(".about-fade-in", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  useEffect(() => {
    if (loading) return; // Wait until data is loaded
    
    const ctx = gsap.context(() => {
      // Stats counters count-up animation
      const statNumbers = gsap.utils.toArray(".stat-number");
      statNumbers.forEach((num) => {
        const val = parseFloat(num.getAttribute("data-val"));
        const isPlus = num.getAttribute("data-plus") === "true";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: val,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
          },
          onUpdate: () => {
            num.innerText = Math.floor(obj.value) + (isPlus ? "+" : "");
          },
        });
      });
      // Refresh ScrollTrigger to recalculate heights after skeletons are replaced
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <Container>
        <div className="about-fade-in">
          <SectionHeading title="Tentang Saya" sub="Who am I?" />
        </div>
        <div
          className="about-grid"
          style={{
            display: "flex",
            gap: 48,
            alignItems: "flex-start",
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          {/* Left details panel */}
          <div className="about-fade-in" style={{ flex: "1 1 0" }}>
            <p
              style={{
                color: COLORS.text,
                lineHeight: 1.85,
                fontSize: 15,
                marginBottom: 20,
              }}
            >
              Halo! Saya <strong style={{ color: COLORS.accent }}>Muhammad Aga Putra</strong>, siswa kelas XI Rekayasa Perangkat Lunak di <strong style={{ color: COLORS.accent2 }}>SMK Telkom 1 Medan</strong>. Saya memiliki passion yang besar dalam pengembangan aplikasi web dan mobile.
            </p>
            <p
              style={{
                color: COLORS.muted,
                lineHeight: 1.85,
                fontSize: 15,
                marginBottom: 24,
              }}
            >
              Fokus saya saat ini adalah membangun aplikasi berbasis Laravel/Blade untuk web dan Flutter/Dart untuk mobile. Saya percaya pada kode yang bersih, desain yang intuitif, dan terus bereksperimen dengan teknologi baru.
            </p>
            <p
              style={{
                color: COLORS.muted,
                fontStyle: "italic",
                fontSize: 14,
                marginBottom: 28,
                borderLeft: `3px solid ${COLORS.accent}`,
                paddingLeft: 14,
              }}
            >
              "agak apa tapi gak apa kali lah"
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Rekayasa Perangkat Lunak", "Full-Stack Dev", "Open Source"].map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(0, 212, 170, 0.1)",
                    border: "1px solid rgba(0, 212, 170, 0.25)",
                    color: COLORS.accent,
                    borderRadius: 99,
                    padding: "5px 13px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats count up cards */}
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginTop: 32,
              }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonStatCard key={i} />
                  ))
                : statItems.map((s) => (
                    <TiltCard key={s.label} maxTilt={6} scale={1.03}>
                      <div
                        className="glass-panel glass-panel-3d"
                        style={{
                          borderRadius: 12,
                          padding: "18px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="stat-number"
                          data-val={s.value}
                          data-plus={s.label === "Tahun Coding" ? "true" : "false"}
                          style={{
                            fontSize: 28,
                            fontWeight: 800,
                            color: COLORS.accent,
                            lineHeight: 1,
                          }}
                        >
                          0
                        </div>
                        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>
                          {s.label}
                        </div>
                      </div>
                    </TiltCard>
                  ))}
            </div>

            {/* Contribution Graph */}
            {loading ? (
              <SkeletonContributionGraph />
            ) : (
              <ContributionGraph events={events} loading={loading} />
            )}
          </div>

          {/* Right card profile panel */}
          <div className="about-fade-in" style={{ flex: "1 1 300px", maxWidth: 340, margin: "0 auto" }}>
            <TiltCard maxTilt={6} scale={1.02}>
              <div
                className="glass-panel glass-panel-3d"
                style={{
                  borderRadius: 20,
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/183683553?v=4"
                  alt="avatar"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${COLORS.accent}`,
                    marginBottom: 12,
                  }}
                />
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                  Muhammad Aga Putra
                </div>
                <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 4 }}>
                  @Apisikma123
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 20 }}>
                  agak apa tapi gak apa kali lah
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.muted,
                    textAlign: "left",
                    marginBottom: 12,
                    fontWeight: 600,
                  }}
                >
                  Top Languages
                </div>
                {loading ? (
                  <>
                    <SkeletonLine width="100%" height={6} style={{ marginBottom: 16 }} />
                    <SkeletonLine width="100%" height={6} style={{ marginBottom: 16 }} />
                    <SkeletonLine width="100%" height={6} style={{ marginBottom: 0 }} />
                  </>
                ) : (
                  langs.map((l) => (
                    <div key={l.name} style={{ marginBottom: 10 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: COLORS.text,
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: l.color,
                              display: "inline-block",
                            }}
                          />
                          {l.name}
                        </span>
                        <span style={{ color: COLORS.muted }}>{l.pct}%</span>
                      </div>
                      <SkillBar pct={l.pct} color={l.color} />
                    </div>
                  ))
                )}
              </div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
