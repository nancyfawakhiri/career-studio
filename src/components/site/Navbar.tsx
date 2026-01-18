import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";

export function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#061A33]/70 dark:text-white/80">
          <Link className="hover:text-[#061A33] dark:hover:text-white" href="/careers">
            Find My Career
          </Link>
          <Link className="hover:text-[#061A33] dark:hover:text-white" href="#">
            Blogs
          </Link>
          <Link className="hover:text-[#061A33] dark:hover:text-white" href="#">
            Request a Feature
          </Link>
          <Link className="hover:text-[#061A33] dark:hover:text-white" href="#">
            Chat With Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
