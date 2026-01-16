function Donut({
  slices,
  size = 180,
  stroke = 22,
}: {
  slices: Array<{ label: string; percent: number }>;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;

  // Fallback if empty
  const safe = slices.length ? slices : [{ label: "No data", percent: 100 }];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={stroke}
        />
        {safe.map((s, i) => {
          const dash = (s.percent / 100) * c;
          const gap = c - dash;

          const el = (
            <circle
              key={`${s.label}-${i}`}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );

          offset += dash;
          return el;
        })}
      </g>
    </svg>
  );
}

export function EducationSection({
  slices,
}: {
  slices: Array<{ label: string; percent: number }>;
}) {
  const sorted = [...slices].sort((a, b) => b.percent - a.percent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
      <div className="flex items-center justify-center">
        <Donut slices={sorted} />
      </div>

      <div className="space-y-3">
        {sorted.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-4">
            <div className="text-white/70">{s.label}</div>
            <div className="text-white/60">{s.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
