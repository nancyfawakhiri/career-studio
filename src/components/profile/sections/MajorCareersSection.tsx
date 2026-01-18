import { LibraryCard } from "@/components/cards/LibraryCard";

export function MajorCareersSection({
  careers,
  accentColor = "#5B85AA",
  lang = "en",
}: {
  careers: Array<{ slug: string; title_en: string; intro_en: string }>;
  accentColor?: string;
  lang?: "en" | "ar";
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {careers.map((c) => (
        <LibraryCard
          key={c.slug}
          title={c.title_en}
          description={c.intro_en}
          href={`/careers/${c.slug}?section=intro&lang=${lang}`}
          accentColor={accentColor}
          ctaLabel={lang === "ar" ? "استكشف المهنة" : "Explore Career"}
        />
      ))}

      {careers.length === 0 && (
        <div className="text-[#061A33]/70 dark:text-white/70">No linked careers yet.</div>
      )}
    </div>
  );
}
