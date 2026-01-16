export function EducationSection({
  slices,
}: {
  slices: Array<{ label: string; percent: number }>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
      <div className="h-[180px] w-[180px] rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 text-sm">
        Donut chart
      </div>

      <div className="space-y-3">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-4">
            <div className="text-white/70">{s.label}</div>
            <div className="text-white/60">{s.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
