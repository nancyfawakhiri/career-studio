"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang, isRTL } = useLanguage();

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-white/50 text-sm">
          © {new Date().getFullYear()} Career Studio.{" "}
          {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-white/70">
          <Link className="hover:text-white" href="/careers">
            {lang === "ar" ? "المهن" : "Careers"}
          </Link>
          <Link className="hover:text-white" href="/majors">
            {lang === "ar" ? "التخصصات" : "Majors"}
          </Link>
          <Link className="hover:text-white" href="/request-feature">
            {lang === "ar" ? "اطلب ميزة" : "Request a Feature"}
          </Link>
          <Link className="hover:text-white" href="/chat">
            {lang === "ar" ? "تحدث معنا" : "Chat with Us"}
          </Link>
          <Link className="hover:text-white" href="/privacy">
            {lang === "ar" ? "الخصوصية" : "Privacy"}
          </Link>
          <Link className="hover:text-white" href="/terms">
            {lang === "ar" ? "الشروط" : "Terms"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
