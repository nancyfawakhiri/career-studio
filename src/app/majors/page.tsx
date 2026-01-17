import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { supabase } from "@/lib/supabase/client";

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

  // Compute the active color based on the selected bucket
  const activeColor = BUCKETS.find((b) => b.key === bucket)?.color ?? "#8FBFA3";

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

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Majors Library
        </h1>
        <p className="mt-4 text-white/70 text-center max-w-2xl mx-auto">
          Explore majors based on your interests.
        </p>

        {/* Bucket tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {BUCKETS.map((b) => {
            const isActive = b.key === bucket;
            return (
              <a
                key={b.key}
                href={`/majors?bucket=${b.key}`}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={isActive ? "px-6 py-3 rounded-xl font-semibold" : "px-6 py-3 text-white/80 hover:text-white"}
                  style={isActive ? { backgroundColor: b.color, color: "#061A33" } : undefined}
                >
                  {b.label}
                </div>
                <div className="text-xs text-white/60">128 Programs Total</div>
                <div
                  className="h-[3px] w-16 rounded-full"
                  style={{ backgroundColor: isActive ? b.color : "rgba(255,255,255,0.2)" }}
                />
              </a>
            );
          })}
        </div>

        {/* Cards */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rows.map((m) => (
            <LibraryCard
              key={m.slug}
              title={m.title_en}
              description={m.intro_en}
              href={`/majors/${m.slug}?section=intro`}
              accentColor={activeColor}
            />
          ))}
        </section>

        {rows.length === 0 && (
          <div className="mt-10 text-center text-white/70">
            No majors linked to <span className="text-white">{bucket}</span> yet.
          </div>
        )}
      </main>
    </BackgroundShell>
  );
}