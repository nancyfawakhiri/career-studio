const LEVELS = ["low", "medium", "high"] as const;

export function WorkGlanceSection({
  rows,
}: {
  rows: Array<{ label: string; level: (typeof LEVELS)[number] }>;
}) {
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between">
            <div className="text-white/70">{r.label}</div>
            <div className="text-white/60 text-sm capitalize">{r.level}</div>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {LEVELS.map((lvl) => (
              <div
                key={lvl}
                className={
                  "h-3 rounded-full border border-white/15 " +
                  (lvl === r.level ? "bg-white/30" : "bg-white/5")
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
