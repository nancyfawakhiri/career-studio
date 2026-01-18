import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { supabase } from "@/lib/supabase/client";
import { MobileBucketPillSelect } from "@/components/site/MobileBucketPillSelect";

const BUCKETS = [
  { key: "artistic", label: "Artistic", color: "#8FBFA3" },
  { key: "social", label: "Social", color: "#F2C94C" },
  { key: "enterprising", label: "Enterprising", color: "#56CCF2" },
  { key: "investigative", label: "Investigative", color: "#9B51E0" },
  { key: "conventional", label: "Conventional", color: "#EB5757" },
  { key: "realistic", label: "Realistic", color: "#2F80ED" },
] as const;

type BucketKey = (typeof BUCKETS)[number]["key"];

export default async function CareersLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ bucket?: string; lang?: string }>;
}) {
  const sp = await searchParams;
  const bucket = (sp.bucket ?? "artistic") as BucketKey;
  const lang = sp.lang === "ar" ? "ar" : "en";

  const activeBucket = BUCKETS.find((b) => b.key === bucket) ?? BUCKETS[0];
  const activeColor = activeBucket.color;

  const { data, error } = await supabase
    .from("career_interest_categories")
    .select(
      `
      careers ( slug, title_en, title_ar, intro_en, intro_ar ),
      interest_categories!inner ( key )
    `
    )
    .eq("interest_categories.key", bucket);

  if (error) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Error loading careers</h1>
          <p className="mt-3 text-[#061A33]/70 dark:text-white/70">{error.message}</p>
        </main>
      </BackgroundShell>
    );
  }

  const rows =
    (data ?? [])
      .map((r: any) => r.careers)
      .filter(Boolean) as Array<{
      slug: string;
      title_en: string;
      title_ar: string | null;
      intro_en: string;
      intro_ar: string | null;
    }>;

  const { data: countData, error: countError } = await supabase
    .from("career_interest_categories")
    .select("interest_categories!inner(key)");

  const countsByKey: Record<string, number> = {};
  if (!countError && countData) {
    for (const row of countData as any[]) {
      const k = row.interest_categories?.key;
      if (!k) continue;
      countsByKey[k] = (countsByKey[k] ?? 0) + 1;
    }
  }

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20 relative min-h-[80vh]">
        <div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "url('/backgrounds/library.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10">
          <h1 className="text-5xl font-semibold tracking-tight text-center">
            Careers Library
          </h1>
          <p className="mt-4 text-center max-w-2xl mx-auto text-[#061A33]/70 dark:text-white/70">
            Explore careers based on your interests.
          </p>

          <div className="mt-12">
            <div className="hidden md:flex flex-wrap justify-center gap-8 text-center">
              {BUCKETS.map((b) => {
                const isActive = b.key === bucket;

                return (
                  <a
                    key={b.key}
                    href={`/careers?bucket=${b.key}&lang=${lang}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={
                        isActive
                          ? "px-6 py-3 rounded-xl font-semibold"
                          : "px-6 py-3 text-[#061A33]/70 dark:text-white/80 hover:text-[#061A33] dark:hover:text-white"
                      }
                      style={
                        isActive
                          ? { backgroundColor: b.color, color: "#061A33" }
                          : undefined
                      }
                    >
                      {b.label}
                    </div>

                    <div className="text-xs text-[#061A33]/60 dark:text-white/60">
                      {(countsByKey[b.key] ?? 0)} Jobs Total
                    </div>

                    <div
                      className="h-[3px] w-16 rounded-full"
                      style={{
                        backgroundColor: isActive
                          ? b.color
                          : "rgba(0,0,0,0.15)",
                      }}
                    />
                  </a>
                );
              })}
            </div>

            <div className="md:hidden flex justify-center">
              <MobileBucketPillSelect
                value={bucket}
                basePath="/careers"
                options={BUCKETS.map(({ key, label }) => ({ key, label }))}
                colors={
                  Object.fromEntries(BUCKETS.map((b) => [b.key, b.color])) as any
                }
              />
            </div>

            <div className="md:hidden mt-2 text-center text-xs text-[#061A33]/60 dark:text-white/60">
              Tap the category to switch
            </div>
          </div>

          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {rows.map((c) => {
              const title = lang === "ar" ? (c.title_ar ?? c.title_en) : c.title_en;
              const desc = lang === "ar" ? (c.intro_ar ?? c.intro_en) : c.intro_en;

              return (
                <LibraryCard
                  key={c.slug}
                  title={title}
                  description={desc}
                  href={`/careers/${c.slug}?section=intro&lang=${lang}`}
                  accentColor={activeColor}
                  ctaLabel={lang === "ar" ? "استكشف المهنة" : "Explore Career"}
                />
              );
            })}
          </section>

          {rows.length === 0 && (
            <div className="mt-10 text-center text-[#061A33]/70 dark:text-white/70">
              No careers are linked to{" "}
              <span className="text-[#061A33] dark:text-white">{bucket}</span> yet.
            </div>
          )}
        </div>
      </main>
    </BackgroundShell>
  );
}
