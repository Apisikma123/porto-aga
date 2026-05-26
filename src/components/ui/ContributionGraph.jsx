/* ═══════════════════════════════════════════════════════════
   ContributionGraph — 3D GitHub contribution visualization
   Grid of cells with varying elevation based on activity
═══════════════════════════════════════════════════════════ */

import { useMemo } from "react";
import { COLORS } from "../../config/data";

const WEEKS = 26;
const DAYS = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/**
 * Build contribution data from GitHub events.
 * Each event maps to a date, counts aggregate to intensity levels 0-4.
 */
function buildContributionData(events) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - WEEKS * 7);

  // Count events per day
  const dayCounts = {};
  events.forEach((ev) => {
    const d = ev.created_at?.slice(0, 10);
    if (d) dayCounts[d] = (dayCounts[d] || 0) + 1;
  });

  // Build grid (columns = weeks, rows = days)
  const grid = [];
  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + w * 7 + d);
      const key = date.toISOString().slice(0, 10);
      const count = dayCounts[key] || 0;
      const isFuture = date > today;
      week.push({ date: key, count, isFuture });
    }
    grid.push(week);
  }

  // Find max for normalization
  const maxCount = Math.max(1, ...Object.values(dayCounts));

  return { grid, maxCount };
}

function getIntensity(count, maxCount) {
  if (count === 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const INTENSITY_COLORS = [
  COLORS.surface2,
  "rgba(0, 212, 170, 0.2)",
  "rgba(0, 212, 170, 0.4)",
  "rgba(0, 212, 170, 0.65)",
  COLORS.accent,
];

const INTENSITY_ELEVATION = [0, 1, 2, 4, 6]; // px

export function ContributionGraph({ events = [], loading = false }) {
  const { grid, maxCount } = useMemo(() => buildContributionData(events), [events]);

  const totalContribs = useMemo(
    () => events.filter((e) => {
      const d = new Date(e.created_at);
      const start = new Date();
      start.setDate(start.getDate() - WEEKS * 7);
      return d >= start;
    }).length,
    [events]
  );

  return (
    <div
      className="glass-panel glass-panel-3d contribution-graph-container"
      style={{
        borderRadius: 16,
        padding: "24px",
        marginTop: 32,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
          Aktivitas Coding
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted }}>
          {totalContribs} aktivitas dalam {WEEKS} minggu terakhir
        </div>
      </div>

      {/* Graph Grid */}
      <div
        style={{
          display: "flex",
          gap: 2,
          perspective: "600px",
        }}
      >
        {/* Day labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingRight: 6,
          }}
        >
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 13,
                fontSize: 9,
                color: COLORS.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Weeks grid */}
        <div
          className="contribution-grid"
          style={{
            display: "flex",
            gap: 2,
            flex: 1,
            transformStyle: "preserve-3d",
            transform: "rotateX(2deg)",
            transition: "transform 0.4s ease",
          }}
        >
          {grid.map((week, wi) => (
            <div
              key={wi}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flex: 1,
              }}
            >
              {week.map((day, di) => {
                const intensity = day.isFuture ? -1 : getIntensity(day.count, maxCount);
                const elevation = intensity >= 0 ? INTENSITY_ELEVATION[intensity] : 0;

                return (
                  <div
                    key={di}
                    className="contrib-cell"
                    title={day.isFuture ? "" : `${day.date}: ${day.count} aktivitas`}
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      borderRadius: 3,
                      background: day.isFuture
                        ? "transparent"
                        : INTENSITY_COLORS[intensity] || COLORS.surface2,
                      transform: `translateZ(${elevation}px)`,
                      transition: "all 0.3s ease",
                      boxShadow:
                        elevation > 0
                          ? `0 ${elevation}px ${elevation * 2}px rgba(0, 212, 170, ${0.05 * intensity})`
                          : "none",
                      border: day.isFuture
                        ? "none"
                        : intensity === 0
                          ? `1px solid rgba(0, 212, 170, 0.06)`
                          : "none",
                      cursor: day.isFuture ? "default" : "pointer",
                      position: "relative",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 4,
          marginTop: 12,
          fontSize: 10,
          color: COLORS.muted,
        }}
      >
        <span>Sedikit</span>
        {INTENSITY_COLORS.map((color, i) => (
          <div
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: 2,
              background: color,
              border: i === 0 ? `1px solid rgba(0, 212, 170, 0.08)` : "none",
            }}
          />
        ))}
        <span>Banyak</span>
      </div>
    </div>
  );
}
