"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export function CharacterPanel({
  careerTitle,
  maleUrl,
  femaleUrl,
}: {
  careerTitle: string;
  maleUrl?: string | null;
  femaleUrl?: string | null;
}) {
  const hasMale = !!maleUrl;
  const hasFemale = !!femaleUrl;

  const defaultVariant = useMemo<"female" | "male">(() => {
    if (hasFemale) return "female";
    return "male";
  }, [hasFemale]);

  const [variant, setVariant] = useState<"female" | "male">(defaultVariant);

  const activeUrl = variant === "female" ? femaleUrl : maleUrl;
  const canToggle = hasMale && hasFemale;

  return (
    <div className="flex flex-col items-center md:items-start gap-4">
      <div
        className="
          relative h-[360px] w-[260px] rounded-3xl overflow-hidden
          border border-black/10 bg-white/70
          dark:border-white/15 dark:bg-white/5
        "
      >
        {activeUrl ? (
          <Image
            src={activeUrl}
            alt={`${careerTitle} character`}
            fill
            className="object-contain"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#061A33]/50 dark:text-white/50 text-sm">
            Character image
          </div>
        )}
      </div>

      {canToggle ? (
        <div
          className="
            inline-flex rounded-full p-1
            border border-black/10 bg-black/5
            dark:border-white/15 dark:bg-white/5
          "
        >
          <button
            onClick={() => setVariant("female")}
            className={
              "px-4 py-2 rounded-full text-sm transition " +
              (variant === "female"
                ? "bg-black/10 text-[#061A33] dark:bg-white/15 dark:text-white"
                : "text-[#061A33]/70 hover:text-[#061A33] dark:text-white/70 dark:hover:text-white")
            }
          >
            Female
          </button>
          <button
            onClick={() => setVariant("male")}
            className={
              "px-4 py-2 rounded-full text-sm transition " +
              (variant === "male"
                ? "bg-black/10 text-[#061A33] dark:bg-white/15 dark:text-white"
                : "text-[#061A33]/70 hover:text-[#061A33] dark:text-white/70 dark:hover:text-white")
            }
          >
            Male
          </button>
        </div>
      ) : null}
    </div>
  );
}
