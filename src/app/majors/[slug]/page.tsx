import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { SectionCard } from "@/components/profile/SectionCard";
import { IntroSection } from "@/components/profile/sections/IntroSection";
import { SkillsSection } from "@/components/profile/sections/SkillsSection";
import { ClassesSection } from "@/components/profile/sections/ClassesSection";
import { LibraryCard } from "@/components/cards/LibraryCard";
import { supabase } from "@/lib/supabase/client";

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

  const section = (sp.section as SectionKey) || "intro";
  const sectionTitle = SECTIONS.find((s) => s.key === section)?.label ?? "Intro";

  const { data: major, error: majorError } = await supabase
    .from("majors")
    .select("id, slug, title_en, intro_en")
    .eq("slug", slug)
    .single();

  if (majorError || !major) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Major not found</h1>
          <p className="mt-3 text-white/70">{majorError?.message}</p>
        </main>
      </BackgroundShell>
    );
  }

  const majorId = major.id;

  const [classesRes, skillsRes, careersRes] = await Promise.all([
    supabase
      .from("major_classes")
      .select("title_en, description_en, video_url, order_index")
      .eq("major_id", majorId)
      .order("order_index", { ascending: true }),

    supabase
      .from("major_skills")
      .select("skills(name_en, type)")
      .eq("major_id", majorId),

    supabase
      .from("career_majors")
      .select("careers(slug, title_en, intro_en)")
      .eq("major_id", majorId),
  ]);

  const hardSkills: string[] = [];
  const softSkills: string[] = [];
  for (const row of skillsRes.data ?? []) {
    const s = row.skills as null | { name_en: string; type: "hard" | "soft" };
    if (!s?.name_en) continue;
    if (s.type === "hard") hardSkills.push(s.name_en);
    else softSkills.push(s.name_en);
  }

  const classes = (classesRes.data ?? []).map((c) => ({
    title: c.title_en,
    description: c.description_en,
    video_url: c.video_url,
  }));

  const linkedCareers = (careersRes.data ?? [])
    .map((r) => r.careers as any)
    .filter(Boolean) as Array<{ slug: string; title_en: string; intro_en: string }>;

  return (
    <BackgroundShell>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80">
            Major
          </div>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            {major.title_en}
          </h1>

          <p className="mt-4 text-white/70 leading-relaxed max-w-2xl line-clamp-2">
            {major.intro_en}
          </p>

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

          {/* optional: show errors if RLS blocks */}
          {(classesRes.error || skillsRes.error || careersRes.error) && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
              <div className="font-semibold">Some sections could not load</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {classesRes.error && <li>Classes: {classesRes.error.message}</li>}
                {skillsRes.error && <li>Skills: {skillsRes.error.message}</li>}
                {careersRes.error && <li>Careers: {careersRes.error.message}</li>}
              </ul>
            </div>
          )}

          <SectionCard title={sectionTitle}>
            {section === "intro" && <IntroSection text={major.intro_en} />}

            {section === "classes" && <ClassesSection classes={classes} />}

            {section === "skills" && (
              <SkillsSection hard={hardSkills} soft={softSkills} />
            )}

            {section === "careers" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {linkedCareers.map((c) => (
                  <LibraryCard
                    key={c.slug}
                    title={c.title_en}
                    description={c.intro_en}
                    href={`/careers/${c.slug}?section=intro`}
                  />
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </main>
    </BackgroundShell>
  );
}
