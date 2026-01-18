import { resolveAssetUrl } from "@/lib/assets/url";

import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { CharacterPanel } from "@/components/site/CharacterPanel";
import { SectionCard } from "@/components/profile/SectionCard";

import { IntroSection } from "@/components/profile/sections/IntroSection";
import { RoleSection } from "@/components/profile/sections/RoleSection";
import { SkillsSection } from "@/components/profile/sections/SkillsSection";
import { EducationSection } from "@/components/profile/sections/EducationSection";
import { WorkGlanceSection } from "@/components/profile/sections/WorkGlanceSection";
import { ThemeDebug } from "@/components/site/ThemeDebug";

import { supabase } from "@/lib/supabase/client";
import { educationLabel } from "@/lib/mappers/education";

const SECTIONS = [
  { key: "intro", label_en: "Intro", label_ar: "نبذة" },
  { key: "role", label_en: "The Role", label_ar: "الدور" },
  { key: "skills", label_en: "Skills", label_ar: "المهارات" },
  { key: "education", label_en: "Education", label_ar: "التعليم" },
  { key: "personality", label_en: "Personality", label_ar: "الشخصية" },
  { key: "work", label_en: "Work At a Glance", label_ar: "نظرة سريعة على العمل" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default async function CareerProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ section?: string; lang?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const section = (sp.section as SectionKey) || "intro";
  const lang = sp.lang === "ar" ? "ar" : "en";

  const sectionTitle =
    SECTIONS.find((s) => s.key === section)?.[
      lang === "ar" ? "label_ar" : "label_en"
    ] ?? (lang === "ar" ? "نبذة" : "Intro");

  // 1) Career core
  const { data: career, error: careerError } = await supabase
    .from("careers")
    .select(
      "id, slug, title_en, title_ar, intro_en, intro_ar, description_en, description_ar, personality_summary_en, personality_summary_ar"
    )
    .eq("slug", slug)
    .single();

  if (careerError || !career) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">
            {lang === "ar" ? "المهنة غير موجودة" : "Career not found"}
          </h1>
          <p className="mt-3 text-[#061A33]/70 dark:text-white/70">
            {careerError?.message}
          </p>
        </main>
      </BackgroundShell>
    );
  }

  const careerId = career.id;

  // 2) Categories (RIASEC)
  const { data: categories, error: categoriesError } = await supabase
    .from("career_interest_categories")
    .select("interest_categories(title_en)")
    .eq("career_id", careerId);

  // 3) Fetch section data + characters + linked majors
  // IMPORTANT: Promise.all order must match destructuring order.
  const [
    tasksRes,
    skillsRes,
    eduRes,
    workRes,
    charactersRes,
    majorsRes,
  ] = await Promise.all([
    supabase
      .from("career_tasks")
      .select("title_en, order_index")
      .eq("career_id", careerId)
      .order("order_index", { ascending: true }),

    supabase
      .from("career_skills")
      .select("skills(name_en, type)")
      .eq("career_id", careerId),

    supabase
      .from("career_education_stats")
      .select("level, percent")
      .eq("career_id", careerId),

    supabase
      .from("career_work_glance")
      .select("level, work_dimensions(title_en, order_index)")
      .eq("career_id", careerId),

    supabase
      .from("career_character_assets")
      .select("variant, assets:asset_id(external_url, storage_path)")
      .eq("career_id", careerId),

    supabase
      .from("career_majors")
      .select("majors(title_en, title_ar)")
      .eq("career_id", careerId),
  ]);

  // Normalize: tasks
  const tasks = (tasksRes.data ?? []).map((t) => t.title_en);

  // Normalize: skills
  const hardSkills: string[] = [];
  const softSkills: string[] = [];
  for (const row of skillsRes.data ?? []) {
    const s = row.skills as null | { name_en: string; type: "hard" | "soft" };
    if (!s?.name_en) continue;
    if (s.type === "hard") hardSkills.push(s.name_en);
    else softSkills.push(s.name_en);
  }

  // Normalize: education
  const educationSlices = (eduRes.data ?? [])
    .map((e) => ({
      label: educationLabel(e.level),
      percent: Number(e.percent),
    }))
    .sort((a, b) => b.percent - a.percent);

  // Normalize: work glance
  const workRows = (workRes.data ?? [])
    .map((w) => {
      const dim = w.work_dimensions as
        | null
        | { title_en: string; order_index: number };
      return {
        label: dim?.title_en ?? "Dimension",
        level: w.level as "low" | "medium" | "high",
        order: dim?.order_index ?? 999,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ label, level }) => ({ label, level }));

  // Normalize: majors linked to this career (for Education section)
  const linkedMajors =
    (majorsRes.data ?? [])
      .map((r: any) => r.majors)
      .filter(Boolean)
      .map((m: any) => ({
        title: lang === "ar" ? (m.title_ar ?? m.title_en) : m.title_en,
      })) ?? [];

  // Character URLs
  const maleUrl = resolveAssetUrl(
    (charactersRes.data ?? []).find((c: any) => c.variant === "male")?.assets ??
      null
  );
  const femaleUrl = resolveAssetUrl(
    (charactersRes.data ?? []).find((c: any) => c.variant === "female")?.assets ??
      null
  );

  // Errors
  const anyErrors =
    tasksRes.error ||
    skillsRes.error ||
    eduRes.error ||
    workRes.error ||
    charactersRes.error ||
    majorsRes.error ||
    categoriesError;

  // Language fields
  const title =
    lang === "ar" ? (career.title_ar ?? career.title_en) : career.title_en;

  const previewIntro =
    lang === "ar" ? (career.intro_ar ?? career.intro_en) : career.intro_en;

  const longIntro =
    lang === "ar"
      ? (career.description_ar ?? career.intro_ar ?? career.intro_en)
      : (career.description_en ?? career.intro_en);

  const personality =
    lang === "ar"
      ? (career.personality_summary_ar ?? career.personality_summary_en)
      : (career.personality_summary_en ?? career.personality_summary_ar);

  return (
    <BackgroundShell>
      <Navbar />
      <ThemeDebug />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <section className="relative">
          <div
            className="
              rounded-3xl overflow-hidden
              border border-black/10 bg-white/70
              dark:border-white/15 dark:bg-white/5
              shadow-[0_25px_80px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.5)]
            "
          >
            <div className="absolute inset-0 opacity-20 dark:opacity-25">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-start">
                <CharacterPanel
                  careerTitle={title}
                  maleUrl={maleUrl}
                  femaleUrl={femaleUrl}
                />

                <div>
                  <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200">
                    {lang === "ar" ? "مطلوب" : "In Demand"}
                  </div>

                  <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    {title}
                  </h1>

                  <p className="mt-4 leading-relaxed max-w-2xl line-clamp-2 text-[#061A33]/70 dark:text-white/70">
                    {previewIntro}
                  </p>

                  <div className="mt-8">
                    <div className="text-sm text-[#061A33]/60 dark:text-white/60">
                      {lang === "ar"
                        ? "هذه المهنة مناسبة لك إذا كنت:"
                        : "This career is a great fit if you are:"}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3">
                      {(categories ?? []).map((c: any, i: number) => (
                        <span
                          key={i}
                          className="
                            px-4 py-2 rounded-full text-sm
                            bg-black/5 border border-black/10 text-[#061A33]/80
                            dark:bg-white/10 dark:border-white/15 dark:text-white/80
                          "
                        >
                          {c.interest_categories.title_en}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-xs leading-relaxed text-[#061A33]/55 dark:text-white/50">
                      {lang === "ar" ? "بناءً على " : "Based on "}
                      <a
                        href="https://en.wikipedia.org/wiki/Holland_Codes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-[#061A33] dark:hover:text-white"
                      >
                        {lang === "ar"
                          ? "نموذج هولاند للاهتمامات"
                          : "Holland’s Interests Model"}
                      </a>
                      .{" "}
                      <br className="hidden sm:block" />
                      {lang === "ar"
                        ? "لست متأكدًا من اهتماماتك؟ "
                        : "Not sure what your interests are? "}
                      <a
                        href={`/interests?lang=${lang}`}
                        className="underline underline-offset-4 hover:text-[#061A33] dark:hover:text-white"
                      >
                        {lang === "ar" ? "اكتشف هنا" : "Find out here"}
                      </a>
                      .
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-sm text-[#061A33]/60 dark:text-white/60">
                      {lang === "ar" ? "الراتب" : "Salary"}
                    </div>
                    <div className="mt-1 text-lg text-[#061A33] dark:text-white">
                      $10,000 - $20,000
                    </div>
                  </div>

                  <div className="mt-10 flex gap-8 overflow-x-auto pb-2 text-[#061A33]/70 dark:text-white/70">
                    {SECTIONS.map((s) => (
                      <a
                        key={s.key}
                        href={`/careers/${career.slug}?section=${s.key}&lang=${lang}`}
                        className={
                          s.key === section
                            ? "whitespace-nowrap text-[#061A33] dark:text-white"
                            : "whitespace-nowrap hover:text-[#061A33] dark:hover:text-white"
                        }
                      >
                        {lang === "ar" ? s.label_ar : s.label_en}
                      </a>
                    ))}
                  </div>

                  {anyErrors && (
                    <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-900 dark:text-red-100">
                      <div className="font-semibold">
                        {lang === "ar"
                          ? "تعذّر تحميل بعض البيانات"
                          : "Some data could not load"}
                      </div>
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        {tasksRes.error && (
                          <li>Role: {tasksRes.error.message}</li>
                        )}
                        {skillsRes.error && (
                          <li>Skills: {skillsRes.error.message}</li>
                        )}
                        {eduRes.error && (
                          <li>Education: {eduRes.error.message}</li>
                        )}
                        {workRes.error && <li>Work: {workRes.error.message}</li>}
                        {majorsRes.error && (
                          <li>Majors: {majorsRes.error.message}</li>
                        )}
                        {categoriesError && (
                          <li>Categories: {categoriesError.message}</li>
                        )}
                        {charactersRes.error && (
                          <li>Characters: {charactersRes.error.message}</li>
                        )}
                      </ul>
                      <div className="mt-3 opacity-80">
                        {lang === "ar"
                          ? "إذا ظهر “permission denied”، فأنت بحاجة إلى سياسات SELECT (RLS) لهذه الجداول."
                          : "If you see “permission denied”, you need SELECT policies (RLS) for those tables."}
                      </div>
                    </div>
                  )}

                  <SectionCard title={sectionTitle}>
                    {section === "intro" && (
                      <IntroSection text={(longIntro ?? "").trim()} />
                    )}

                    {section === "role" && <RoleSection tasks={tasks} />}

                    {section === "skills" && (
                      <SkillsSection hard={hardSkills} soft={softSkills} />
                    )}

                    {section === "education" && (
                      <EducationSection slices={educationSlices} majors={linkedMajors} />
                    )}

                    {section === "personality" && (
                      <div className="leading-relaxed whitespace-pre-line text-[#061A33]/70 dark:text-white/70">
                        {personality ||
                          (lang === "ar"
                            ? "لا يوجد ملخص للشخصية بعد."
                            : "No personality summary yet.")}
                      </div>
                    )}

                    {section === "work" && <WorkGlanceSection rows={workRows} />}
                  </SectionCard>
                </div>
              </div>
            </div>
          </div>

          {/* FloatingRobot is global inside BackgroundShell */}
        </section>
      </main>
    </BackgroundShell>
  );
}
