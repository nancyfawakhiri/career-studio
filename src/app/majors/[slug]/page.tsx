import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { supabase } from "@/lib/supabase/client";
import { SectionCard } from "@/components/profile/SectionCard";
import { IntroSection } from "@/components/profile/sections/IntroSection";
import { MajorClassesSection } from "@/components/profile/sections/MajorClassesSection";
import { MajorSkillsSection } from "@/components/profile/sections/MajorSkillsSection";
import { MajorCareersSection } from "@/components/profile/sections/MajorCareersSection";


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

  const { data: major, error } = await supabase
    .from("majors")
    .select("id, slug, title_en, intro_en, intro_ar")
    .eq("slug", slug)
    .single();

  if (error || !major) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Major not found</h1>
          {error?.message && <p className="mt-3 text-white/70">{error.message}</p>}
        </main>
      </BackgroundShell>
    );
  }
  // Load section data (only fetch what we need for the active section)
let classes: Array<{
  id: string;
  title_en: string;
  description_en: string | null;
  video_url: string | null;
}> = [];

let skills: Array<{ id: string; name_en: string; type: "hard" | "soft" }> = [];

let linkedCareers: Array<{ slug: string; title_en: string; intro_en: string }> = [];

if (section === "classes") {
  const { data, error } = await supabase
    .from("major_classes")
    .select("id, title_en, description_en, video_url, order_index")
    .eq("major_id", major.id)
    .order("order_index", { ascending: true });

  if (!error && data) classes = data;
}

if (section === "skills") {
  const { data, error } = await supabase
    .from("major_skills")
    .select(
      `
      skills (
        id, name_en, type
      )
    `
    )
    .eq("major_id", major.id);

  if (!error && data) {
    skills = (data as any[])
      .map((r) => r.skills)
      .filter(Boolean) as any;
  }
}

if (section === "careers") {
  const { data, error } = await supabase
    .from("career_majors")
    .select(
      `
      careers ( slug, title_en, intro_en )
    `
    )
    .eq("major_id", major.id);

  if (!error && data) {
    linkedCareers = (data as any[])
      .map((r) => r.careers)
      .filter(Boolean) as any;
  }
}


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
            {major.title_en}
          </h1>

          <p className="mt-4 text-white/70 leading-relaxed max-w-2xl line-clamp-2">
            {major.intro_en}
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
            {section === "intro" && (
              <IntroSection text={major.intro_en ?? ""} />
            )}

            {section === "classes" && <MajorClassesSection classes={classes} />}

{section === "skills" && <MajorSkillsSection skills={skills} />}

{section === "careers" && <MajorCareersSection careers={linkedCareers} />}

          </SectionCard>
        </div>
      </main>
    </BackgroundShell>
  );
}
