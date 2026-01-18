"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BrandLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-10 w-[160px]" />;

  const src =
    resolvedTheme === "light"
      ? "/assets/logo/logo_dark.svg"
      : "/assets/logo/logo_light.svg";

  return (
    <Link href="/" className="flex items-center">
      <Image
  src={src}
  alt="Career Studio"
  width={300}
  height={80}
  priority
  className="h-14 md:h-16 w-auto"
 />

    </Link>
  );
}
