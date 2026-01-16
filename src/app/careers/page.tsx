import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { supabase } from "@/lib/supabase/client";

export default async function CareersLibraryPage() {
  const { data: careers, error } = await supabase
    .from("careers")
    .select("slug, title_en, intro_en")
    .order("title_en");

  if (error) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Error loading careers</h1>
          <p className="mt-3 text-white/70">{error.message}</p>
        </main>
      </BackgroundShell>
    );
  }

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Careers Library
        </h1>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careers.map((c) => (
            <LibraryCard
              key={c.slug}
              title={c.title_en}
              description={c.intro_en}
              href={`/careers/${c.slug}?section=intro`}
            />
          ))}
        </section>
      </main>
    </BackgroundShell>
  );
}
