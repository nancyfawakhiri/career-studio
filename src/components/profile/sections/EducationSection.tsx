const PALETTE = [
  "#6097FF",
  "#8FBFA3",
  "#F2C94C",
  "#9B51E0",
  "#56CCF2",
  "#EB5757",
  "#2F80ED",
];

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
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={stroke}
          className="hidden dark:block"
        />

        {safe.map((s, i) => {
          const dash = (s.percent / 100) * c;
          const gap = c - dash;

          const color = PALETTE[i % PALETTE.length];

          const el = (
            <circle
              key={`${s.label}-${i}`}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              style={{
                filter: "drop-shadow(0 0 6px rgba(96,151,255,0.25))",
              }}
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
  majors,
}: {
  slices: Array<{ label: string; percent: number }>;
  majors?: Array<{ title: string }>;
}) {
  const sorted = [...slices].sort((a, b) => b.percent - a.percent);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
        <div className="flex items-center justify-center">
          <Donut slices={sorted} />
        </div>

        <div className="space-y-3">
          {sorted.map((s, i) => {
            const color = PALETTE[i % PALETTE.length];
            return (
              <div key={s.label} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-[#061A33]/70 dark:text-white/70">
                    {s.label}
                  </div>
                </div>
                <div className="text-[#061A33]/60 dark:text-white/60">
                  {s.percent}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Majors that lead to this career */}
      <div>
        <div className="text-sm font-semibold text-[#061A33] dark:text-white">
          Majors that commonly lead to this career
        </div>

        <div className="mt-3 text-[#061A33]/70 dark:text-white/70 leading-relaxed">
          {majors && majors.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {majors.map((m, idx) => (
                <span
                  key={idx}
                  className="
                    px-4 py-2 rounded-full text-sm
                    bg-black/5 border border-black/10 text-[#061A33]/80
                    dark:bg-white/10 dark:border-white/15 dark:text-white/80
                  "
                >
                  {m.title}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-sm text-[#061A33]/60 dark:text-white/60">
              No majors linked yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
