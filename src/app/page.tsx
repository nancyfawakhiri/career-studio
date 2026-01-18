import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";

function StatCard({
  count,
  title,
  description,
  buttonLabel,
  href,
}: {
  count: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/5 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-full bg-white/10 border border-white/15" />
        <div className="text-white/70 text-sm">{count}</div>
      </div>

      <div className="mt-4 text-xl font-semibold tracking-tight">{title}</div>

      <p className="mt-3 text-white/70 leading-relaxed text-sm">{description}</p>

      <div className="mt-6">
        <Link
          href={href}
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-medium"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#071B33] text-white relative overflow-hidden">
      {/* Background SVG */}
      <div
        className="absolute inset-0 opacity-90 pointer-events-none bg-no-repeat bg-top bg-cover"
        style={{ backgroundImage: "url(/backgrounds/landing_main.svg)" }}
      />

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.07),_transparent_60%)]" />

      <div className="relative">
        {/* NAVBAR (your request: include it in hero) */}
        <Navbar />

        {/* HERO */}
<section className="mx-auto max-w-6xl px-6 pt-12 md:pt-20 pb-14">
  <div className="max-w-3xl">
    <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80">
      Students Inc · Career Studio
    </div>

    <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
      Explore careers and majors
      <br />
      with clarity.
    </h1>

    <p className="mt-6 text-white/70 leading-relaxed text-lg max-w-2xl">
      Structured profiles that show what you’ll do, what you’ll need, and how to
      get there — without the overwhelm.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <Link
        href="/careers?bucket=artistic"
        className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-medium text-center"
      >
        Explore Careers
      </Link>

      <Link
        href="/majors?bucket=artistic"
        className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-center"
      >
        Explore Majors
      </Link>
    </div>

    <div className="mt-10 flex flex-wrap gap-3 text-xs text-white/60">
      <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
        Role tasks
      </span>
      <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
        Skills
      </span>
      <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
        Education pathways
      </span>
      <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">
        Work style
      </span>
    </div>
  </div>
</section>

        {/* SECTION 3: YOUR JOURNEY, YOUR CHOICES! */}
        <section className="mx-auto max-w-6xl px-6 pt-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            {/* Left heading */}
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                YOUR JOURNEY, YOUR
                <br />
                CHOICES!
              </h3>
            </div>

            {/* Right paragraph */}
            <div className="text-white/70 leading-relaxed">
              With a world of careers, majors, and classes at your fingertips,
              we make choosing the best path for your future as clear as it
              should be.
            </div>
          </div>

          {/* Cards row */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              count="800"
              title="CAREERS"
              description="Explore career profiles with structured sections like role tasks, skills, education pathways, and work style."
              buttonLabel="EXPLORE CAREERS"
              href="/careers?bucket=artistic"
            />

            <StatCard
              count="300"
              title="MAJORS"
              description="Browse majors, view classes you’ll take, the skills you’ll build, and the careers they connect to."
              buttonLabel="EXPLORE MAJORS"
              href="/majors?bucket=artistic"
            />

            <StatCard
              count="31097"
              title="COLLEGE CLASSES"
              description="Coming soon: a searchable class library with descriptions and learning resources."
              buttonLabel="START HERE"
              href="/majors?bucket=artistic"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
