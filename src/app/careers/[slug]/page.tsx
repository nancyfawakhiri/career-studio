import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { CharacterPanel } from "@/components/site/CharacterPanel";
import { SectionCard } from "@/components/profile/SectionCard";

import { IntroSection } from "@/components/profile/sections/IntroSection";
import { RoleSection } from "@/components/profile/sections/RoleSection";
import { SkillsSection } from "@/components/profile/sections/SkillsSection";
import { EducationSection } from "@/components/profile/sections/EducationSection";
import { WorkGlanceSection } from "@/components/profile/sections/WorkGlanceSection";

import { supabase } from "@/lib/supabase/client";
import { educationLabel } from "@/lib/mappers/education";

const SECTIONS = [
  { key: "intro", label: "Intro" },
  { key: "role", label: "The Role" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "personality", label: "Personality" },
  { key: "work", label: "Work At a Glance" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default async function CareerProfilePage({
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

  // 1) Get career core row by slug
  const { data: career, error: careerError } = await supabase
    .from("careers")
    .select(
      "id, slug, title_en, intro_en, personality_summary_en, background_asset_id"
    )
    .eq("slug", slug)
    .single();

  if (careerError || !career) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Career not found</h1>
          <p className="mt-3 text-white/70">
            {careerError?.message || "No record returned."}
          </p>
        </main>
      </BackgroundShell>
    );
  }

  // 2) Fetch all section datasets in parallel
  const careerId = career.id;

  const [
    tasksRes,
    skillsRes,
    eduRes,
    workRes,
  ] = await Promise.all([
    supabase
      .from("career_tasks")
      .select("title_en, order_index")
      .eq("career_id", careerId)
      .order("order_index", { ascending: true }),

    // career_skills join skills
    supabase
      .from("career_skills")
      .select("importance, skills(name_en, type)")
      .eq("career_id", careerId),

    supabase
      .from("career_education_stats")
      .select("level, percent")
      .eq("career_id", careerId),

    // career_work_glance join work_dimensions
    supabase
      .from("career_work_glance")
      .select("level, work_dimensions(title_en, order_index)")
      .eq("career_id", careerId),
  ]);

  // Handle possible RLS / query errors gracefully
  const tasksError = tasksRes.error;
  const skillsError = skillsRes.error;
  const eduError = eduRes.error;
  const workError = workRes.error;

  // 3) Normalize to UI component shapes

  const tasks = (tasksRes.data ?? []).map((t) => t.title_en);

  const hardSkills: string[] = [];
  const softSkills: string[] = [];

  for (const row of skillsRes.data ?? []) {
    const s = row.skills as null | { name_en: string; type: "hard" | "soft" };
    if (!s?.name_en) continue;
    if (s.type === "hard") hardSkills.push(s.name_en);
    else softSkills.push(s.name_en);
  }

  const educationSlices = (eduRes.data ?? [])
    .map((e) => ({
      label: educationLabel(e.level),
      percent: Number(e.percent),
    }))
    .sort((a, b) => b.percent - a.percent);

  const workRows = (workRes.data ?? [])
    .map((w) => {
      const dim = w.work_dimensions as null | { title_en: string; order_index: number };
      return {
        label: dim?.title_en ?? "Dimension",
        level: w.level as "low" | "medium" | "high",
        order: dim?.order_index ?? 999,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ label, level }) => ({ label, level }));

  // 4) Render
  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <section className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/5 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-25">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-start">
                {/* Character slot */}
                <CharacterPanel careerTitle={career.title_en} />

                {/* Right panel */}
                <div>
                  {/* badge (wired later to DB) */}
                  <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs text-emerald-200">
                    In Demand
                  </div>

                  <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    {career.title_en}
                  </h1>

                  {/* short preview (optional, clamped) */}
                  <p className="mt-4 text-white/70 leading-relaxed max-w-2xl line-clamp-2">
                    {career.intro_en}
                  </p>

                  {/* interest icons placeholder (we’ll wire categories later) */}
                  <div className="mt-8 flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                  </div>

                  {/* salary placeholder (we’ll wire later) */}
                  <div className="mt-8">
                    <div className="text-sm text-white/60">Salary</div>
                    <div className="mt-1 text-lg text-white">$10,000 - $20,000</div>
                  </div>

                  {/* Tabs row */}
                  <div className="mt-10 flex gap-8 overflow-x-auto text-white/70 pb-2">
                    {SECTIONS.map((s) => (
                      <a
                        key={s.key}
                        href={`/careers/${career.slug}?section=${s.key}`}
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

                  {/* Errors (if any tables are blocked by RLS) */}
                  {(tasksError || skillsError || eduError || workError) && (
                    <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
                      <div className="font-semibold">Some sections could not load</div>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-red-100/90">
                        {tasksError && <li>Role: {tasksError.message}</li>}
                        {skillsError && <li>Skills: {skillsError.message}</li>}
                        {eduError && <li>Education: {eduError.message}</li>}
                        {workError && <li>Work at a Glance: {workError.message}</li>}
                      </ul>
                      <div className="mt-3 text-red-100/80">
                        This usually means Row Level Security policies need “SELECT” access for anon users.
                      </div>
                    </div>
                  )}

                  {/* Section content */}
                  <SectionCard title={sectionTitle}>
                    {section === "intro" && <IntroSection text={career.intro_en} />}

                    {section === "role" && <RoleSection tasks={tasks} />}

                    {section === "skills" && (
                      <SkillsSection hard={hardSkills} soft={softSkills} />
                    )}

                    {section === "education" && (
                      <EducationSection slices={educationSlices} />
                    )}

                    {section === "personality" && (
                      <div className="text-white/70 leading-relaxed whitespace-pre-line">
                        {career.personality_summary_en || "No personality summary yet."}
                      </div>
                    )}

                    {section === "work" && <WorkGlanceSection rows={workRows} />}
                  </SectionCard>
                </div>
              </div>
            </div>
          </div>

          {/* Floating robot + speech bubble */}
          <div className="fixed right-6 bottom-6 z-50 flex items-end gap-3">
            <button
              className="
                hidden sm:flex items-center
                px-4 py-3 rounded-2xl
                bg-orange-500 hover:bg-orange-600 transition
                text-sm font-medium
                relative
              "
            >
              Ask me anything
              <span
                className="
                  absolute -right-2 bottom-3
                  h-3 w-3 rotate-45
                  bg-orange-500
                "
              />
            </button>

            <button
              className="
                h-20 w-20 rounded-2xl
                bg-white/10 border border-white/15
                flex items-center justify-center
                text-white/60 text-xs
                hover:bg-white/15 transition
              "
              aria-label="Ask me anything"
            >
              Robot
            </button>
          </div>
        </section>
      </main>
    </BackgroundShell>
  );
}
