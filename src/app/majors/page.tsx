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

export default async function MajorsLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ bucket?: string }>;
}) {
  const sp = await searchParams;
  const bucket = (sp.bucket ?? "artistic") as BucketKey;

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

        {/* Buckets */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/70">
          {BUCKETS.map((b) => (
            <a
              key={b.key}
              href={`/majors?bucket=${b.key}`}
              className={b.key === bucket ? "text-white" : "hover:text-white"}
            >
              {b.label}
            </a>
          ))}
        </div>

        {/* Cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rows.map((m) => (
            <LibraryCard
              key={m.slug}
              title={m.title_en}
              description={m.intro_en}
              href={`/majors/${m.slug}?section=intro`}
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
