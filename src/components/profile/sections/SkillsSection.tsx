function Pill({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm">
      {label}
    </span>
  );
}

export function SkillsSection({
  hard,
  soft,
}: {
  hard: string[];
  soft: string[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-white/60 mb-3">Hard Skills</div>
        <div className="flex flex-wrap gap-3">
          {hard.map((s) => (
            <Pill key={s} label={s} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm text-white/60 mb-3">Soft Skills</div>
        <div className="flex flex-wrap gap-3">
          {soft.map((s) => (
            <Pill key={s} label={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
