export function MajorClassesSection({
  classes,
}: {
  classes: Array<{
    id: string;
    title_en: string;
    description_en: string | null;
    video_url: string | null;
  }>;
}) {
  return (
    <div className="space-y-5">
      {classes.map((c) => (
        <div
          key={c.id}
          className="
            rounded-2xl p-5
            border border-black/10 bg-white/70
            dark:border-white/15 dark:bg-white/5
          "
        >
          <div className="font-semibold text-[#061A33] dark:text-white">
            {c.title_en}
          </div>

          {c.description_en && (
            <div className="mt-2 leading-relaxed text-[#061A33]/70 dark:text-white/70">
              {c.description_en}
            </div>
          )}

          {c.video_url && (
            <a
              href={c.video_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm underline underline-offset-4
                         text-[#061A33]/80 hover:text-[#061A33]
                         dark:text-white/80 dark:hover:text-white"
            >
              Watch lecture
            </a>
          )}
        </div>
      ))}

      {classes.length === 0 && (
        <div className="text-[#061A33]/70 dark:text-white/70">No classes added yet.</div>
      )}
    </div>
  );
}
