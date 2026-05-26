import { useEffect, useRef } from "react";
import { COLORS, LANG_COLORS } from "../../config/data";
import { Container } from "../layout/Container";
import { SectionHeading } from "../layout/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { SkeletonCard } from "../ui/SkeletonCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Repos({ github }) {
  const containerRef = useRef(null);

  const loading = github?.loading ?? true;
  const repos = github?.repos || [];
  const stats = github?.stats || {};

  // Show top 9 repos (non-fork, most recent)
  const displayRepos = repos.slice(0, 9);
  const totalStars = stats.stars || 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".repos-header", {
        opacity: 0,
        y: 30,
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
      // Cards stagger
      gsap.from(".repo-card-wrapper", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".repos-grid",
          start: "top 80%",
        },
      });
      // Refresh ScrollTrigger to recalculate heights after skeletons are replaced
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      id="repos"
      ref={containerRef}
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <Container>
        <div className="repos-header">
          <SectionHeading title="Proyek Unggulan" sub="My Work" />
          {/* Stars counter badge */}
          {!loading && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
                background: "rgba(0, 212, 170, 0.08)",
                border: "1px solid rgba(0, 212, 170, 0.2)",
                borderRadius: 99,
                padding: "5px 12px",
                fontSize: 12,
                color: COLORS.accent,
                fontWeight: 600,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {totalStars} Stars · {stats.repos || displayRepos.length} Repositories
            </div>
          )}
        </div>

        {/* Repos Cards Grid */}
        <div
          className="repos-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            marginTop: 48,
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} lines={3} style={{ minHeight: 180 }} />
              ))
            : displayRepos.map((repo) => {
                const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default;
                return (
                  <div
                    key={repo.id}
                    className="repo-card-wrapper"
                  >
                    <TiltCard maxTilt={5} scale={1.02}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="repo-card glass-panel glass-panel-3d"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          borderRadius: 16,
                          padding: "24px",
                          height: "100%",
                          minHeight: 180,
                          textDecoration: "none",
                          position: "relative",
                          overflow: "hidden",
                          border: `1px solid ${COLORS.border}`,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {/* Decorative glowing gradient bar at top of card */}
                        <div
                          className="repo-accent"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: 4,
                            background: `linear-gradient(90deg, ${langColor}, ${COLORS.accent2})`,
                            opacity: 0.2,
                            transition: "opacity 0.3s ease",
                          }}
                        />

                        {/* Repo Header Info */}
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 12,
                            }}
                          >
                            <h3
                              className="glow-text"
                              style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: COLORS.text,
                              }}
                            >
                              {repo.name}
                            </h3>
                            {/* GitHub Folder/Link Icon */}
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={COLORS.accent}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ width: 18, height: 18, flexShrink: 0 }}
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </div>

                          <p
                            style={{
                              fontSize: 13,
                              color: COLORS.muted,
                              lineHeight: 1.6,
                              marginBottom: 20,
                            }}
                          >
                            {repo.description || "Tidak ada deskripsi yang tersedia."}
                          </p>
                        </div>

                        {/* Repo Footer Info */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            fontSize: 12,
                          }}
                        >
                          {repo.language && (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                color: COLORS.text,
                              }}
                            >
                              <span
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  background: langColor,
                                  display: "inline-block",
                                  boxShadow: `0 0 6px ${langColor}`,
                                }}
                              />
                              {repo.language}
                            </span>
                          )}

                          {/* Stargazers */}
                          <span style={{ color: COLORS.muted, display: "flex", alignItems: "center", gap: 4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {repo.stargazers_count}
                          </span>

                          {/* Forks */}
                          <span style={{ color: COLORS.muted, display: "flex", alignItems: "center", gap: 4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                              <line x1="6" y1="3" x2="6" y2="15" />
                              <circle cx="18" cy="6" r="3" />
                              <circle cx="6" cy="18" r="3" />
                              <path d="M18 9a9 9 0 0 1-9 9" />
                            </svg>
                            {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    </TiltCard>
                  </div>
                );
              })}
        </div>
      </Container>
    </section>
  );
}
