import Link from "next/link";
import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";

export default function HomePage() {
  return (
    <BackgroundShell>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-14 pb-20">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Career Studio
        </h1>
        <p className="mt-4 max-w-xl text-white/70">
          Explore careers and majors with structured profiles.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/careers"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15"
          >
            Careers Library
          </Link>
          <Link
            href="/majors"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15"
          >
            Majors Library
          </Link>
        </div>
      </main>
    </BackgroundShell>
  );
}
