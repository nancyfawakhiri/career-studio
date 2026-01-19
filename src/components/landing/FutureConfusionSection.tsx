"use client";

import React from "react";
import Link from "next/link";

type Slide = {
  step: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const SLIDES: Slide[] = [
  {
    step: "1",
    title: "KNOW YOUR SELF",
    body:
      "Love problem-solving but not big on socializing? You could be an engineer. More into storytelling than equations? Journalism might be your calling! Take our personality assessment and get matched with careers that fit YOU, not the other way around.",
    ctaLabel: "START HERE",
    ctaHref: "/careers?bucket=artistic",
  },
  {
    step: "2",
    title: "EXPLORE CAREERS",
    body:
      "Explore 800+ career profiles with structured sections: role tasks, required skills, education pathways, and work environments.",
    ctaLabel: "EXPLORE CAREERS",
    ctaHref: "/careers?bucket=artistic",
  },
  {
    step: "3",
    title: "EXPLORE MAJORS",
    body:
      "Browse 300+ majors and see what you’ll study, what skills you’ll build, and which careers each major connects to.",
    ctaLabel: "EXPLORE MAJORS",
    ctaHref: "/majors?bucket=artistic",
  },
];

export function FutureConfusionSection() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* Title - top right */}
      <div className="mb-16 flex justify-center lg:justify-end">
        <h2 className="text-center lg:text-right text-4xl md:text-6xl font-extrabold tracking-tight">
          CONFUSED ABOUT
          <br />
          YOUR FUTURE?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: floating content (NO BOX) */}
        <div className="relative max-w-lg">
          {/* Big colored step number */}
          <div
            className="absolute -left-10 -top-16 select-none font-semibold leading-none opacity-25"
            style={{ color: "#5B85AA", fontSize: "180px" }}
          >
            {slide.step}
          </div>

          <div className="relative pl-6">
            <div className="text-2xl font-semibold tracking-tight">
              {slide.title}
            </div>

            <p className="mt-4 text-white/70 text-base leading-relaxed max-w-md">
              {slide.body}
            </p>

            <div className="mt-8">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: preview area (NO BORDER / NO BOX) */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl">
            {/* This is just a soft “screen area” with NO border */}
            
            <div className="aspect-[16/9] w-full rounded-3xl bg-white/[0.03]">
              {/* subtle inner vignette */}
              <div className="h-full w-full rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_60%)] flex items-center justify-center">
                <div className="text-white/35 text-sm">
                  Preview for step {slide.step}
                </div>
              </div>
            </div>

            {/* optional glow (super subtle) */}
            <div className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-[#5B85AA]/15 blur-2xl" />
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-12 flex justify-center gap-3">
        {SLIDES.map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={[
                "h-3 w-3 rounded-full transition",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                isActive ? "bg-blue-500" : "bg-white/20 hover:bg-white/35",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
