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

export function MajorSkillsSection({
  skills,
}: {
  skills: Array<{ id: string; name_en: string; type: "hard" | "soft" }>;
}) {
  const hard = skills.filter((s) => s.type === "hard");
  const soft = skills.filter((s) => s.type === "soft");

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm mb-3 text-[#061A33]/60 dark:text-white/60">
          Hard Skills
        </div>
        <div className="flex flex-wrap gap-3">
          {hard.map((s) => (
            <Pill key={s.id} label={s.name_en} />
          ))}
          {hard.length === 0 && (
            <div className="text-[#061A33]/70 dark:text-white/70">None yet.</div>
          )}
        </div>
      </div>

      <div>
        <div className="text-sm mb-3 text-[#061A33]/60 dark:text-white/60">
          Soft Skills
        </div>
        <div className="flex flex-wrap gap-3">
          {soft.map((s) => (
            <Pill key={s.id} label={s.name_en} />
          ))}
          {soft.length === 0 && (
            <div className="text-[#061A33]/70 dark:text-white/70">None yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
