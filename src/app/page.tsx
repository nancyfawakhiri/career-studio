import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import React from "react";
import { FutureConfusionSection } from "@/components/landing/FutureConfusionSection";
import { JourneyCard } from "@/components/landing/JourneyCard";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/site/Footer";



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
      {/* Background PNG */}
      <div
        className="absolute inset-0 opacity-90 pointer-events-none bg-no-repeat bg-top bg-contain"

        style={{ backgroundImage: "url(/backgrounds/landing.svg)" }}
      />

      {/* 50% transparency overlay to soften colors */}
      <div className="absolute inset-0 pointer-events-none bg-[#071B33]/50" />

      {/* Soft gradient overlay for additional readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent_60%)]" />

      <div className="relative">
        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <section className="mx-auto max-w-6xl px-6 pt-12 md:pt-20 pb-20 min-h-[85vh] flex items-center">
          <div className="max-w-3xl">
            <div className="text-sm text-white/70 tracking-wide mb-6">
              Discover Your Path with:
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Career Studio
            </h1>

            <p className="mt-6 text-2xl md:text-3xl text-white/90 leading-relaxed">
              Unlock a World of Possibilities
            </p>

            <p className="mt-2 text-2xl md:text-3xl leading-relaxed">
              Find Your Perfect Path Forward
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/careers?bucket=artistic"
                className="px-8 py-3.5 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold text-center"
              >
                Explore Careers
              </Link>

              <Link
                href="/majors?bucket=artistic"
                className="px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-center font-semibold"
              >
                Explore Majors
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: CONFUSED ABOUT YOUR FUTURE? (SLIDER VERSION) */}
        <FutureConfusionSection />

        {/* SECTION 3: YOUR JOURNEY, YOUR CHOICES! */}
<section className="mx-auto max-w-6xl px-6 pt-10 pb-24">
  <div className="max-w-2xl">
    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
      <span className="text-[#5B85AA]">YOUR</span> JOURNEY,{" "}
      <span className="text-[#5B85AA]">YOUR</span>
      <br />
      CHOICES!
    </h3>

    <p className="mt-4 text-white/70 leading-relaxed">
      With a world of careers, majors, and colleges at your fingertips, let's
      make choosing feel less like rocket science and more like a fun road trip.
    </p>
  </div>

  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
    <JourneyCard
      count="800"
      label="CAREERS"
      description="Explore structured career profiles with role tasks, skills, education pathways, and real-world work environments."
      buttonLabel="EXPLORE CAREERS"
      href="/careers?bucket=artistic"
    />

    <JourneyCard
      count="300"
      label="MAJORS"
      description="Browse majors, see what you'll study, and connect each major to careers so you can compare paths clearly."
      buttonLabel="EXPLORE MAJORS"
      href="/majors?bucket=artistic"
    />

    <JourneyCard
      count="31097"
      label="COLLEGES"
      description="Coming soon: explore colleges by fit, location, and focus so you can shortlist options with confidence."
      buttonLabel="COMING SOON"
      href="/majors?bucket=artistic"
    />
  </div>
</section>
{/* NEWSLETTER */}
<NewsletterSection />

{/* FOOTER */}
<Footer />



      </div>
    </div>
  );
}
