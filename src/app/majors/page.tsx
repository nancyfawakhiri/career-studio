import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";

export default function MajorsPage() {
  return (
    <BackgroundShell>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Majors Library
        </h1>
        <p className="mt-6 text-center text-white/70">
          Coming next — we’ll reuse the same card system as careers.
        </p>
      </main>
    </BackgroundShell>
  );
}
