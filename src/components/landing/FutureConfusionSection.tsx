"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Slide = {
  step: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  ctaLabel_en: string;
  ctaLabel_ar: string;
  ctaHref: string;
};

const SLIDES: Slide[] = [
  {
    step: "1",
    title_en: "KNOW YOUR SELF",
    title_ar: "اعرف نفسك",
    body_en:
      "Love problem-solving but not big on socializing? You could be an engineer. More into storytelling than equations? Journalism might be your calling! Take our personality assessment and get matched with careers that fit YOU, not the other way around.",
    body_ar:
      "تحب حل المشكلات لكن لست من محبي التواصل الاجتماعي؟ قد تكون مهندساً. تميل للسرد القصصي أكثر من المعادلات؟ الصحافة قد تكون مجالك! خذ اختبار الشخصية واحصل على وظائف تناسبك أنت، وليس العكس.",
    ctaLabel_en: "START HERE",
    ctaLabel_ar: "ابدأ هنا",
    ctaHref: "/careers?bucket=artistic",
  },
  {
    step: "2",
    title_en: "EXPLORE CAREERS",
    title_ar: "استكشف المهن",
    body_en:
      "Explore 800+ career profiles with structured sections: role tasks, required skills, education pathways, and work environments.",
    body_ar:
      "استكشف أكثر من 800 ملف مهني مع أقسام منظمة: مهام الدور، المهارات المطلوبة، المسارات التعليمية، وبيئات العمل.",
    ctaLabel_en: "EXPLORE CAREERS",
    ctaLabel_ar: "استكشف المهن",
    ctaHref: "/careers?bucket=artistic",
  },
  {
    step: "3",
    title_en: "EXPLORE MAJORS",
    title_ar: "استكشف التخصصات",
    body_en:
      "Browse 300+ majors and see what you'll study, what skills you'll build, and which careers each major connects to.",
    body_ar:
      "تصفح أكثر من 300 تخصص واكتشف ما ستدرسه، ما المهارات التي ستكتسبها، وأي المهن يرتبط بها كل تخصص.",
    ctaLabel_en: "EXPLORE MAJORS",
    ctaLabel_ar: "استكشف التخصصات",
    ctaHref: "/majors?bucket=artistic",
  },
];

export function FutureConfusionSection() {
  const [active, setActive] = React.useState(0);
  const { lang, isRTL } = useLanguage();

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  const title = lang === "ar" ? slide.title_ar : slide.title_en;
  const body = lang === "ar" ? slide.body_ar : slide.body_en;
  const ctaLabel = lang === "ar" ? slide.ctaLabel_ar : slide.ctaLabel_en;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Title - top right */}
      <div className={`mb-16 flex justify-center ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}>
        <h2 className={`text-center ${isRTL ? "lg:text-left" : "lg:text-right"} text-4xl md:text-6xl font-extrabold tracking-tight`}>
          {lang === "ar" ? (
            <>
              هل أنت حائر بشأن
              <br />
              مستقبلك؟
            </>
          ) : (
            <>
              CONFUSED ABOUT
              <br />
              YOUR FUTURE?
            </>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: floating content (NO BOX) */}
        <div className="relative max-w-lg">
          {/* Big colored step number */}
          <div
            className={`absolute ${isRTL ? "-right-10" : "-left-10"} -top-16 select-none font-semibold leading-none opacity-25`}
            style={{ color: "#5B85AA", fontSize: "180px" }}
          >
            {slide.step}
          </div>

          <div className={`relative ${isRTL ? "pr-6" : "pl-6"}`}>
            <div className="text-2xl font-semibold tracking-tight">
              {title}
            </div>

            <p className="mt-4 text-white/70 text-base leading-relaxed max-w-md">
              {body}
            </p>

            <div className="mt-8">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: preview area (NO BORDER / NO BOX) */}
        <div className={`flex justify-center ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}>
          <div className="relative w-full max-w-xl">
            {/* This is just a soft "screen area" with NO border */}

            <div className="aspect-[16/9] w-full rounded-3xl bg-white/[0.03]">
              {/* subtle inner vignette */}
              <div className="h-full w-full rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_60%)] flex items-center justify-center">
                <div className="text-white/35 text-sm">
                  {lang === "ar" ? `معاينة الخطوة ${slide.step}` : `Preview for step ${slide.step}`}
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
