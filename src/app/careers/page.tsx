import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { careers } from "@/lib/mock/careers";

export default function CareersLibraryPage() {
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
              title={c.title}
              description={c.intro}
              href={`/careers/${c.slug}`}
            />
          ))}
        </section>
      </main>
    </BackgroundShell>
  );
}
