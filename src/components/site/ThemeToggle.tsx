"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-[#061A33] dark:text-white"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
