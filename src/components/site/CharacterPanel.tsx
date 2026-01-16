"use client";

import { useMemo, useState } from "react";

type Props = {
  careerTitle: string;
  // Later you’ll pass real image URLs from Supabase/assets
  maleSrc?: string;
  femaleSrc?: string;
};

export function CharacterPanel({ careerTitle, maleSrc, femaleSrc }: Props) {
  const [variant, setVariant] = useState<"female" | "male">("female");

  const label = useMemo(() => {
    if (variant === "female") return "Female";
    return "Male";
  }, [variant]);

  return (
    <div className="flex flex-col items-center md:items-start">
      {/* Character image slot */}
      <div className="relative h-[380px] w-[280px]">
        <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
          {careerTitle} – {label} character
        </div>
      </div>

      {/* Toggle */}
      <div className="mt-4 inline-flex rounded-2xl border border-white/15 bg-white/5 p-1">
        <button
          onClick={() => setVariant("female")}
          className={
            variant === "female"
              ? "px-4 py-2 rounded-xl bg-white/15 text-white text-sm"
              : "px-4 py-2 rounded-xl text-white/70 hover:text-white text-sm"
          }
        >
          Female
        </button>
        <button
          onClick={() => setVariant("male")}
          className={
            variant === "male"
              ? "px-4 py-2 rounded-xl bg-white/15 text-white text-sm"
              : "px-4 py-2 rounded-xl text-white/70 hover:text-white text-sm"
          }
        >
          Male
        </button>
      </div>

      {/* Note: later we’ll use maleSrc/femaleSrc with <Image /> */}
      <div className="mt-2 text-xs text-white/50">
        (Later: swap the actual character image based on toggle)
      </div>
    </div>
  );
}
