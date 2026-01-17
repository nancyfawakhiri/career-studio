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

export default async function MajorsLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ bucket?: string }>;
}) {
  const sp = await searchParams;
  const bucket = (sp.bucket ?? "artistic") as BucketKey;

  const activeBucket = BUCKETS.find((b) => b.key === bucket) ?? BUCKETS[0];
  const activeColor = activeBucket.color;

  const { data, error } = await supabase
    .from("major_interest_categories")
    .select(
      `
      majors ( slug, title_en, intro_en ),
      interest_categories!inner ( key )
    `
    )
    .eq("interest_categories.key", bucket);

  if (error) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Error loading majors</h1>
          <p className="mt-3 text-white/70">{error.message}</p>
        </main>
      </BackgroundShell>
    );
  }

  const rows =
    (data ?? [])
      .map((r: any) => r.majors)
      .filter(Boolean) as Array<{
      slug: string;
      title_en: string;
      intro_en: string;
    }>;

  // Dynamic counts per bucket (real counts from Supabase)
  const { data: countData, error: countError } = await supabase
    .from("major_interest_categories")
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
        {/* Background PNG */}
        <div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "url('/backgrounds/library.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content ABOVE background */}
        <div className="relative z-10">
          <h1 className="text-5xl font-semibold tracking-tight text-center">
            Majors Library
          </h1>
          <p className="mt-4 text-white/70 text-center max-w-2xl mx-auto">
            Explore majors based on your interests.
          </p>

          {/* Buckets */}
          <div className="mt-12">
            {/* Desktop/tablet */}
            <div className="hidden md:flex flex-wrap justify-center gap-8 text-center">
              {BUCKETS.map((b) => {
                const isActive = b.key === bucket;

                return (
                  <a
                    key={b.key}
                    href={`/majors?bucket=${b.key}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={
                        isActive
                          ? "px-6 py-3 rounded-xl font-semibold"
                          : "px-6 py-3 text-white/80 hover:text-white"
                      }
                      style={
                        isActive
                          ? { backgroundColor: b.color, color: "#061A33" }
                          : undefined
                      }
                    >
                      {b.label}
                    </div>

                    <div className="text-xs text-white/60">
                      {(countsByKey[b.key] ?? 0)} Programs Total
                    </div>

                    <div
                      className="h-[3px] w-16 rounded-full"
                      style={{
                        backgroundColor: isActive
                          ? b.color
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex justify-center">
              <MobileBucketPillSelect
                value={bucket}
                basePath="/majors"
                options={BUCKETS.map(({ key, label }) => ({ key, label }))}
                colors={
                  Object.fromEntries(BUCKETS.map((b) => [b.key, b.color])) as any
                }
              />
            </div>

            <div className="md:hidden mt-2 text-center text-xs text-white/60">
              Tap the category to switch
            </div>
          </div>

          {/* Cards */}
          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {rows.map((m) => (
              <LibraryCard
                key={m.slug}
                title={m.title_en}
                description={m.intro_en}
                href={`/majors/${m.slug}?section=intro`}
                accentColor={activeColor}
                ctaLabel="Explore Major"
              />
            ))}
          </section>

          {/* Empty state */}
          {rows.length === 0 && (
            <div className="mt-10 text-center text-white/70">
              No majors linked to <span className="text-white">{bucket}</span>{" "}
              yet.
            </div>
          )}
        </div>
      </main>
    </BackgroundShell>
  );
}
