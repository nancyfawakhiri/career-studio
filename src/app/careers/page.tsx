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
  searchParams: Promise<{ bucket?: string }>;
}) {
  const sp = await searchParams;
  const bucket = (sp.bucket ?? "artistic") as BucketKey;

  const activeBucket = BUCKETS.find((b) => b.key === bucket) ?? BUCKETS[0];
  const activeColor = activeBucket.color;

  const { data, error } = await supabase
    .from("career_interest_categories")
    .select(
      `
      careers ( slug, title_en, intro_en ),
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
          <p className="mt-3 text-white/70">{error.message}</p>
          <p className="mt-3 text-white/70">
            If this says "permission denied", you need SELECT access (RLS policy)
            for
            <code className="mx-2 px-2 py-1 rounded bg-white/10">
              career_interest_categories
            </code>
            and
            <code className="mx-2 px-2 py-1 rounded bg-white/10">
              interest_categories
            </code>
            and
            <code className="mx-2 px-2 py-1 rounded bg-white/10">careers</code>.
          </p>
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
      intro_en: string;
    }>;

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20 relative">
        {/* Background PNG (place the file in /public/backgrounds/career-library.png) */}
        <div
          className="absolute inset-0 -z-10 opacity-30 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/backgrounds/career-library.png')" }}
        />

        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Careers Library
        </h1>
        <p className="mt-4 text-white/70 text-center max-w-2xl mx-auto">
          Explore careers based on your interests.
        </p>

        {/* Buckets */}
        <div className="mt-12">
          {/* Desktop/tablet: show all buckets */}
          <div className="hidden md:flex flex-wrap justify-center gap-8 text-center">
            {BUCKETS.map((b) => {
              const isActive = b.key === bucket;
              return (
                <a
                  key={b.key}
                  href={`/careers?bucket=${b.key}`}
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

                  <div className="text-xs text-white/60">128 Jobs Total</div>

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

          {/* Mobile: show active bucket + dropdown */}
          {/* Mobile: single pill that opens a dropdown */}
<div className="md:hidden flex justify-center">
  <MobileBucketPillSelect
    value={bucket}
    basePath="/careers"
    options={BUCKETS.map(({ key, label }) => ({ key, label }))}
    colors={Object.fromEntries(BUCKETS.map((b) => [b.key, b.color])) as any}
  />
</div>

<div className="md:hidden mt-2 text-center text-xs text-white/60">
  Tap the category to switch
</div>
</div>


        {/* Cards */}
        <section className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {rows.map((c) => (
            <LibraryCard
              key={c.slug}
              title={c.title_en}
              description={c.intro_en}
              href={`/careers/${c.slug}?section=intro`}
              accentColor={activeColor}
            />
          ))}
        </section>

        {/* Empty state */}
        {rows.length === 0 && (
          <div className="mt-10 text-center text-white/70">
            No careers are linked to{" "}
            <span className="text-white">{bucket}</span> yet. Add rows into{" "}
            <code className="px-2 py-1 rounded bg-white/10">
              career_interest_categories
            </code>
            .
          </div>
        )}
      </main>
    </BackgroundShell>
  );
}
