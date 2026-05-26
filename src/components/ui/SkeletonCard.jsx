/* ═══════════════════════════════════════════════════════════
   SkeletonCard — 3D Shimmer skeleton loader
   Shows during data fetching with a glassy shimmer effect
═══════════════════════════════════════════════════════════ */

import { COLORS } from "../../config/data";

export function SkeletonLine({ width = "100%", height = 14, style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius: 6,
        background: `linear-gradient(90deg, ${COLORS.surface2} 25%, rgba(0, 212, 170, 0.06) 50%, ${COLORS.surface2} 75%)`,
        backgroundSize: "400% 100%",
        animation: "shimmer3d 1.8s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export function SkeletonCard({ lines = 3, style = {} }) {
  return (
    <div
      className="skeleton-card glass-panel"
      style={{
        borderRadius: 16,
        padding: "24px",
        transform: "perspective(800px) rotateX(1deg)",
        animation: "skeletonFloat 2s ease-in-out infinite",
        ...style,
      }}
    >
      <SkeletonLine width="60%" height={18} style={{ marginBottom: 14 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          width={i === lines - 1 ? "40%" : "100%"}
          height={12}
          style={{ marginBottom: i < lines - 1 ? 10 : 0 }}
        />
      ))}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 12,
        padding: "18px 20px",
        textAlign: "center",
        transform: "perspective(800px) rotateX(1deg)",
        animation: "skeletonFloat 2s ease-in-out infinite",
      }}
    >
      <SkeletonLine
        width={48}
        height={28}
        style={{ margin: "0 auto 6px", borderRadius: 8 }}
      />
      <SkeletonLine
        width={64}
        height={10}
        style={{ margin: "0 auto", borderRadius: 4 }}
      />
    </div>
  );
}

export function SkeletonContributionGraph() {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 16,
        padding: "24px",
        marginTop: 32,
        transform: "perspective(800px) rotateX(1deg)",
      }}
    >
      <SkeletonLine width="40%" height={14} style={{ marginBottom: 16 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(26, 1fr)",
          gap: 3,
        }}
      >
        {Array.from({ length: 182 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-shimmer"
            style={{
              width: "100%",
              paddingBottom: "100%",
              borderRadius: 3,
              background: `linear-gradient(90deg, ${COLORS.surface2} 25%, rgba(0, 212, 170, 0.04) 50%, ${COLORS.surface2} 75%)`,
              backgroundSize: "400% 100%",
              animation: `shimmer3d 1.8s ease-in-out ${i * 0.01}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
