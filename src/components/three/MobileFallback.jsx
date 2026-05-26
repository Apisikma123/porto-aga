import { COLORS } from "../../config/data";

export function MobileFallback() {
  return (
    <div className="mobile-bg">
      <div className="mobile-bg-grid" />
      <div
        className="mobile-bg-orb"
        style={{
          top: "10%",
          left: "15%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.07) 0%, transparent 70%)",
          animation: "orb1 14s ease-in-out infinite",
        }}
      />
      <div
        className="mobile-bg-orb"
        style={{
          top: "55%",
          right: "8%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0, 170, 255, 0.06) 0%, transparent 70%)",
          animation: "orb2 18s ease-in-out infinite",
        }}
      />
      <div
        className="mobile-bg-orb"
        style={{
          bottom: "5%",
          left: "40%",
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)",
          animation: "orb3 12s ease-in-out infinite",
        }}
      />
    </div>
  );
}
