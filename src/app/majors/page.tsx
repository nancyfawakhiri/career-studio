import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { majors } from "@/lib/mock/majors";

export default function MajorsLibraryPage() {
  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Majors Library
        </h1>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {majors.map((m) => (
            <LibraryCard
              key={m.slug}
              title={m.title}
              description={m.intro}
              href={`/majors/${m.slug}?section=intro`}
            />
          ))}
        </section>
      </main>
    </BackgroundShell>
  );
}
