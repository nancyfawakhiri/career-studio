import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { supabase } from "@/lib/supabase/client";

const BUCKETS = [
  { key: "artistic", label: "Artistic" },
  { key: "social", label: "Social" },
  { key: "enterprising", label: "Enterprising" },
  { key: "investigative", label: "Investigative" },
  { key: "conventional", label: "Conventional" },
  { key: "realistic", label: "Realistic" },
] as const;

type BucketKey = (typeof BUCKETS)[number]["key"];

export default async function CareersLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ bucket?: string }>;
}) {
  const sp = await searchParams;

  const bucket = (sp.bucket ?? "artistic") as BucketKey;

  // Fetch careers that are linked to a specific interest category
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
            If this says "permission denied", you need SELECT access (RLS policy) for
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

  // "data" is join rows. We only want the nested career objects.
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

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Careers Library
        </h1>

        {/* Bucket tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/70">
          {BUCKETS.map((b) => (
            <a
              key={b.key}
              href={`/careers?bucket=${b.key}`}
              className={b.key === bucket ? "text-white" : "hover:text-white"}
            >
              {b.label}
            </a>
          ))}
        </div>

        {/* Cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rows.map((c) => (
            <LibraryCard
              key={c.slug}
              title={c.title_en}
              description={c.intro_en}
              href={`/careers/${c.slug}?section=intro`}
            />
          ))}
        </section>

        {/* Empty state if no careers linked to this bucket yet */}
        {rows.length === 0 && (
          <div className="mt-10 text-center text-white/70">
            No careers are linked to <span className="text-white">{bucket}</span>{" "}
            yet. Add rows into <code className="px-2 py-1 rounded bg-white/10">
              career_interest_categories
            </code>.
          </div>
        )}
      </main>
    </BackgroundShell>
  );
}
