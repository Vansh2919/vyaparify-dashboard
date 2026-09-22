import { useState } from "react";

export default function SalesChart({ data }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(...data.map((d) => d.value));
  const width = 560;
  const height = 200;
  const padding = 28;
  const barGap = 16;
  const barWidth = (width - padding * 2 - barGap * (data.length - 1)) / data.length;

  return (
    <div className="sales-chart">
      <svg viewBox={`0 0 ${width} ${height + 30}`} width="100%" role="img" aria-label="Sales this week">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A5C" />
            <stop offset="100%" stopColor="#E04422" />
          </linearGradient>
          <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9A82" />
            <stop offset="100%" stopColor="#FF5C3A" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padding} x2={width - padding}
            y1={padding + (height - padding * 1.5) * t}
            y2={padding + (height - padding * 1.5) * t}
            stroke="var(--border)" strokeWidth="1"
            strokeDasharray={t === 1 ? "0" : "4 4"}
          />
        ))}
        {data.map((d, i) => {
          const barHeight = (d.value / max) * (height - padding * 1.5);
          const x = padding + i * (barWidth + barGap);
          const y = height - padding * 0.5 - barHeight;
          const isHovered = hovered === i;
          return (
            <g
              key={d.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x} y={y} width={barWidth} height={barHeight}
                rx="6"
                fill={isHovered ? "url(#barGradHover)" : "url(#barGrad)"}
                style={{ transition: "opacity 0.15s ease" }}
                opacity={isHovered ? 1 : 0.92}
              />
              <text
                x={x + barWidth / 2} y={height - padding * 0.5 + 18}
                textAnchor="middle" fontSize="11.5" fill="var(--muted)" fontFamily="var(--font-body)" fontWeight="500"
              >
                {d.label}
              </text>
              {isHovered && (
                <g>
                  <rect x={x + barWidth / 2 - 34} y={y - 32} width="68" height="24" rx="7" fill="var(--ink)" />
                  <text x={x + barWidth / 2} y={y - 15} textAnchor="middle" fontSize="12" fill="#fff" fontWeight="600" fontFamily="var(--font-display)">
                    ₹{d.value.toLocaleString("en-IN")}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
