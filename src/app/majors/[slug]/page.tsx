import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";

export default async function MajorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <BackgroundShell>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <h1 className="text-3xl font-semibold">Major: {slug}</h1>
        <p className="mt-3 text-white/70">Major profile coming next.</p>
      </main>
    </BackgroundShell>
  );
}
