"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const lang = sp.get("lang") ?? "en";

  function setLang(nextLang: string) {
    const params = new URLSearchParams(sp.toString());
    params.set("lang", nextLang);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="
        px-3 py-2 rounded-xl border
        border-black/10 dark:border-white/15
        bg-white/70 dark:bg-white/10
        text-[#061A33] dark:text-white
        outline-none
      "
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
  );
}
