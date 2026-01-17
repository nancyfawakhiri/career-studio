import Link from "next/link";
import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { Container } from "@/components/site/Container";
import { LibraryCard } from "@/components/cards/LibraryCard";

export default function LandingPage() {
  return (
    <BackgroundShell>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-10 md:pt-16 pb-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80">
                Students Inc · Career Studio
              </div>

              <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Find a career path
                <br />
                that fits you.
              </h1>

              <p className="mt-6 text-white/70 leading-relaxed max-w-xl">
                Explore careers and majors through structured profiles:
                what you’ll do, skills you’ll need, education pathways, and
                work style — all in one place.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/careers?bucket=artistic"
                  className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/15 text-center"
                >
                  Explore Careers
                </Link>

                <Link
                  href="/majors?bucket=artistic"
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition text-center font-medium"
                >
                  Explore Majors
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/60">
                <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
                  Role tasks
                </span>
                <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
                  Skills
                </span>
                <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
                  Education stats
                </span>
                <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
                  Work at a glance
                </span>
              </div>
            </div>

            {/* HERO SIDE VISUAL (placeholder, swap with your assets later) */}
            <div className="relative">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
                <div className="h-[280px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 text-sm">
                  Hero illustration / character / background asset
                </div>
                <div className="mt-5 text-white/70 text-sm leading-relaxed">
                  Replace this panel with your landing artwork or a simple
                  product screenshot.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-12">
        <Container>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              How it works
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="text-white/60 text-xs">Step 1</div>
                <div className="mt-2 text-lg font-semibold">Browse</div>
                <div className="mt-2 text-white/70 leading-relaxed">
                  Start from interest buckets and explore careers and majors
                  as cards.
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="text-white/60 text-xs">Step 2</div>
                <div className="mt-2 text-lg font-semibold">Understand</div>
                <div className="mt-2 text-white/70 leading-relaxed">
                  Open a profile to see role tasks, skills, education stats,
                  and work style.
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="text-white/60 text-xs">Step 3</div>
                <div className="mt-2 text-lg font-semibold">Plan</div>
                <div className="mt-2 text-white/70 leading-relaxed">
                  Connect majors → careers, review classes, and build a clear
                  next-step plan.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PREVIEW CARDS (optional, reuses your existing card component) */}
      <section className="pb-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Preview
              </h2>
              <p className="mt-2 text-white/70">
                A quick look at what the library experience feels like.
              </p>
            </div>

            <Link
              href="/careers?bucket=artistic"
              className="hidden sm:inline-block text-sm text-white/70 hover:text-white"
            >
              Go to Careers →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LibraryCard
              title="Registered Nurse"
              description="Provide patient care, coordinate treatment, and guide patients through recovery."
              href="/careers/registered-nurse?section=intro"
            />
            <LibraryCard
              title="AI & Machine Learning"
              description="Build systems that learn from data to automate decisions and improve products."
              href="/careers/ai-ml?section=intro"
            />
            <LibraryCard
              title="Nursing"
              description="Prepare to provide patient-centered care across clinical and community settings."
              href="/majors/nursing?section=intro"
            />
            <LibraryCard
              title="Computer Science"
              description="Study computation, software systems, and algorithms that power modern technology."
              href="/majors/computer-science?section=intro"
            />
          </div>
        </Container>
      </section>
    </BackgroundShell>
  );
}
