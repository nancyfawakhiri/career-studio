"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded">
      <div>Current theme: {theme}</div>
      <div>HTML class: {document.documentElement.className}</div>
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mt-2 bg-white text-black px-3 py-1 rounded"
      >
        Toggle
      </button>
    </div>
  );
}