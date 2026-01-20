"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { lang, toggleLang } = useLanguage();

  // Close menu on route change-esque (basic UX)
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        className={mobile ? "py-3 hover:text-white" : "hover:text-white"}
        href="/careers"
        onClick={() => setOpen(false)}
      >
        {lang === "ar" ? "المهن" : "Careers"}
      </Link>
      <Link
        className={mobile ? "py-3 hover:text-white" : "hover:text-white"}
        href="/majors"
        onClick={() => setOpen(false)}
      >
        {lang === "ar" ? "التخصصات" : "Majors"}
      </Link>
      <Link
        className={mobile ? "py-3 hover:text-white" : "hover:text-white"}
        href="/blog"
        onClick={() => setOpen(false)}
      >
        {lang === "ar" ? "المدونة" : "Blogs"}
      </Link>
      <Link
        className={mobile ? "py-3 hover:text-white" : "hover:text-white"}
        href="/request-feature"
        onClick={() => setOpen(false)}
      >
        {lang === "ar" ? "اطلب ميزة" : "Request a Feature"}
      </Link>
      <Link
        className={mobile ? "py-3 hover:text-white" : "hover:text-white"}
        href="/chat"
        onClick={() => setOpen(false)}
      >
        {lang === "ar" ? "تحدث معنا" : "Chat with Us"}
      </Link>

      {/* Language Toggle */}
      <button
        type="button"
        onClick={toggleLang}
        className={
          mobile
            ? "mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-xs font-semibold text-white hover:bg-white/15"
            : "ml-2 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
        }
        aria-label="Toggle language"
      >
        <span className={lang === "en" ? "text-white" : "text-white/50"}>EN</span>
        <span className="text-white/35">|</span>
        <span className={lang === "ar" ? "text-white" : "text-white/50"}>AR</span>
      </button>
    </>
  );

  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo/logo_light.svg"
            alt="Career Studio"
            width={300}
            height={80}
            priority
            className="h-14 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-white/70 text-sm">
          <NavLinks />
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 hover:bg-white/15"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-white/80" />
            <span className="h-0.5 w-5 bg-white/80" />
            <span className="h-0.5 w-5 bg-white/80" />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-6 pb-6">
            <div className="rounded-2xl border border-white/15 bg-[#071B33]/70 backdrop-blur p-4 text-white/80 text-sm flex flex-col">
              <NavLinks mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
