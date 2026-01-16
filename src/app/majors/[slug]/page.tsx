import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { majors } from "@/lib/mock/majors";
import { SectionCard } from "@/components/profile/SectionCard";
import { IntroSection } from "@/components/profile/sections/IntroSection";

const SECTIONS = [
  { key: "intro", label: "Intro" },
  { key: "classes", label: "Classes" },
  { key: "skills", label: "Skills" },
  { key: "careers", label: "Careers" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default async function MajorProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ section?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const major = majors.find((m) => m.slug === slug);
  if (!major) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Major not found</h1>
        </main>
      </BackgroundShell>
    );
  }

  const section = (sp.section as SectionKey) || "intro";
  const sectionTitle = SECTIONS.find((s) => s.key === section)?.label ?? "Intro";

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80">
            Major
          </div>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            {major.title}
          </h1>

          <p className="mt-4 text-white/70 leading-relaxed max-w-2xl line-clamp-2">
            {major.intro}
          </p>

          {/* Tabs */}
          <div className="mt-10 flex gap-8 overflow-x-auto text-white/70 pb-2">
            {SECTIONS.map((s) => (
              <a
                key={s.key}
                href={`/majors/${major.slug}?section=${s.key}`}
                className={
                  s.key === section
                    ? "whitespace-nowrap text-white"
                    : "whitespace-nowrap hover:text-white"
                }
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Content */}
          <SectionCard title={sectionTitle}>
            {section === "intro" && <IntroSection text={major.description} />}

            {section !== "intro" && (
              <div className="text-white/70 leading-relaxed">
                Coming next — this section will be populated from Supabase.
              </div>
            )}
          </SectionCard>
        </div>
      </main>
    </BackgroundShell>
  );
}
