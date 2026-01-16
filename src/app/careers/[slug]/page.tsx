import Image from "next/image";
import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { careers } from "@/lib/mock/careers";

const SECTIONS = ["Intro", "The Role", "Skills", "Education", "Personality", "Work At a Glance"] as const;

export default async function CareerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const career = careers.find((c) => c.slug === slug);

  if (!career) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Career not found</h1>
          <p className="mt-3 text-white/70">
            No career matches: <span className="text-white">{slug}</span>
          </p>
        </main>
      </BackgroundShell>
    );
  }

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Left section nav */}
          <aside className="hidden lg:block pt-10">
            <nav className="space-y-8 text-white/80">
              {SECTIONS.map((s) => (
                <div key={s} className="text-lg hover:text-white cursor-default">
                  {s}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main profile area */}
          <section className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
              {/* Background image layer (replace later with your asset) */}
              <div className="absolute inset-0 opacity-25">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
              </div>

              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-center">
                  {/* Character slot (replace with your actual image later) */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative h-[320px] w-[220px]">
                      <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10" />
                      <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                        Character image
                      </div>
                    </div>
                  </div>

                  {/* Right content card */}
                  <div>
                    <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs text-emerald-200">
                      In Demand
                    </div>

                    <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                      {career.title}
                    </h1>

                    <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
                      {career.intro}
                    </p>

                    {/* Interest icons (placeholder circles) */}
                    <div className="mt-8 flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                      <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                      <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                    </div>

                    {/* Salary */}
                    <div className="mt-8">
                      <div className="text-sm text-white/60">Salary</div>
                      <div className="mt-1 text-lg text-white">$10,000 - $20,000</div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10">
                      <button className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-medium">
                        Ask Me Anything
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile section tabs row */}
                <div className="mt-10 lg:hidden flex gap-8 overflow-x-auto text-white/70">
                  {SECTIONS.map((s) => (
                    <div key={s} className="whitespace-nowrap hover:text-white">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Robot (placeholder, we’ll replace with your asset) */}
            <div className="fixed right-6 bottom-6 z-50 flex items-end gap-4">
              <div className="hidden sm:block px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-medium">
                Ask Me Anything
              </div>
              <div className="h-20 w-20 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white/50 text-xs">
                Robot
              </div>
            </div>
          </section>
        </div>
      </main>
    </BackgroundShell>
  );
}
