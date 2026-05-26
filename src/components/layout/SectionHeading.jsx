import { COLORS } from "../../config/data";

export function SectionHeading({ title, sub }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 12,
          color: COLORS.accent,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: "var(--font-body)",
        }}
      >
        {sub}
      </div>
      <h2
        className="glow-text"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 800,
          color: COLORS.text,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: 48,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
          borderRadius: 99,
          margin: "16px auto 0",
        }}
      />
    </div>
  );
}
