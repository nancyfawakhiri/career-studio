const LEVELS = ["low", "medium", "high"] as const;

const FILLED_COUNT: Record<(typeof LEVELS)[number], number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function WorkGlanceSection({
  rows,
}: {
  rows: Array<{ label: string; level: (typeof LEVELS)[number] }>;
}) {
  return (
    <div className="space-y-5">
      {rows.map((r) => {
        const filled = FILLED_COUNT[r.level] ?? 1;

        return (
          <div key={r.label}>
            <div className="flex items-center justify-between">
              <div className="text-[#061A33]/70 dark:text-white/70">{r.label}</div>
              {/* Removed “low/medium/high” labels as requested */}
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => {
                const isOn = i < filled;
                return (
                  <div
                    key={i}
                    className="
                      h-3 rounded-full border
                      border-black/10 dark:border-white/15
                    "
                    style={
                      isOn
                        ? {
                            backgroundColor: "#6097FF",
                            boxShadow: "0 0 10px rgba(96,151,255,0.35)",
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
