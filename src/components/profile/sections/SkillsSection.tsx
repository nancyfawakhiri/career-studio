function Pill({ label }: { label: string }) {
  return (
    <span
      className="
        px-4 py-2 rounded-full text-sm
        bg-black/5 border border-black/10 text-[#061A33]/80
        dark:bg-white/10 dark:border-white/15 dark:text-white/80
      "
    >
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
        <div className="text-sm mb-3 text-[#061A33]/60 dark:text-white/60">
          Hard Skills
        </div>
        <div className="flex flex-wrap gap-3">
          {hard.map((s) => (
            <Pill key={s} label={s} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm mb-3 text-[#061A33]/60 dark:text-white/60">
          Soft Skills
        </div>
        <div className="flex flex-wrap gap-3">
          {soft.map((s) => (
            <Pill key={s} label={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
