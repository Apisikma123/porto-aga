import { useEffect, useRef } from "react";
import { COLORS, SKILL_ICONS, LANG_COLORS, TAG_PILLS } from "../../config/data";
import { Container } from "../layout/Container";
import { SectionHeading } from "../layout/SectionHeading";
import { SkeletonCard } from "../ui/SkeletonCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Map language names to human-readable skill types */
const SKILL_TYPES = {
  Blade: "Template Engine",
  PHP: "Backend",
  Dart: "Flutter / Mobile",
  HTML: "Markup Language",
  CSS: "Styling",
  JavaScript: "Frontend",
  Java: "Object-Oriented",
  TypeScript: "Typed JavaScript",
  Python: "Scripting",
  Shell: "DevOps / CLI",
};

function SkillBar({ pct, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    gsap.fromTo(
      el,
      { width: "0%" },
      {
        width: `${pct}%`,
        duration: 1.2,
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

export function Skills({ github }) {
  const containerRef = useRef(null);

  const loading = github?.loading ?? true;
  const rawLanguages = github?.languages || [];
  
  // Use fallback if languages array is somehow empty (e.g., API failure)
  const languages = rawLanguages.length > 0 ? rawLanguages : [
    { name: "Blade", pct: 60 },
    { name: "Dart", pct: 30 },
    { name: "HTML", pct: 10 },
    { name: "PHP", pct: 50 },
    { name: "JavaScript", pct: 40 },
    { name: "CSS", pct: 20 },
  ];

  // Build skills from language data
  const skills = languages.slice(0, 6).map((l) => ({
    name: l.name,
    pct: l.pct,
    type: SKILL_TYPES[l.name] || "Programming",
    color: LANG_COLORS[l.name] || COLORS.accent,
  }));

  const tagPills = TAG_PILLS;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".skills-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Tag pills stagger animation
      gsap.from(".skill-pill", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.06,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-pills-container",
          start: "top 90%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  useEffect(() => {
    if (loading) return; // Wait until data is loaded
    
    const ctx = gsap.context(() => {
      // Cards stagger animation - use fromTo to guarantee it becomes visible
      gsap.fromTo(".skill-card", 
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
          },
        }
      );
      // Refresh ScrollTrigger to recalculate heights after skeletons are replaced
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      id="skills"
      ref={containerRef}
      style={{
        padding: "100px 0",
        position: "relative",
        background: "linear-gradient(180deg, transparent, rgba(7, 19, 24, 0.4), transparent)",
      }}
    >
      <Container>
        <div className="skills-header">
          <SectionHeading title="Keahlian" sub="Tech Stack" />
        </div>

        {/* Skills Cards Grid */}
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
            marginTop: 48,
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} lines={2} />
              ))
            : skills.map((sk) => (
                  <div
                    key={sk.name}
                    className="skill-card premium-card glass-panel glass-panel-3d"
                    style={{
                      borderRadius: 16,
                      padding: "24px 20px",
                    }}
                  >
                    <div className="skill-card-icon" style={{ color: sk.color, marginBottom: 14 }}>
                      {SKILL_ICONS[sk.name] || (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
                      {sk.name}
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 14 }}>
                      {sk.type}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: COLORS.muted }}>Penguasaan</span>
                      <span style={{ color: sk.color, fontWeight: 700 }}>{sk.pct}%</span>
                    </div>
                    <SkillBar pct={sk.pct} color={sk.color} />
                  </div>
              ))}
        </div>

        {/* Tag Pills */}
        <div
          className="skills-pills-container"
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 48,
            justifyContent: "center",
          }}
        >
          {tagPills.map((t) => (
            <span
              key={t}
              className="skill-pill"
              style={{
                background: COLORS.surface2,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.muted,
                borderRadius: 99,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.color = COLORS.accent;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.color = COLORS.muted;
                e.currentTarget.style.transform = "none";
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
