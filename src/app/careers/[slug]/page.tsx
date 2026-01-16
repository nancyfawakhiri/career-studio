import { BackgroundShell } from "@/components/site/BackgroundShell";
import { Navbar } from "@/components/site/Navbar";
import { careers } from "@/lib/mock/careers";
import { CharacterPanel } from "@/components/site/CharacterPanel";



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

  const career = careers.find((c) => c.slug === slug);
  if (!career) {
    return (
      <BackgroundShell>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <h1 className="text-3xl font-semibold">Career not found</h1>
        </main>
      </BackgroundShell>
    );
  }

  const section = (sp.section as SectionKey) || "intro";

  // For now only Intro has real content. Later we’ll fetch the rest from Supabase.
  const sectionTitle =
    SECTIONS.find((s) => s.key === section)?.label ?? "Intro";

  const sectionBody =
    section === "intro"
      ? career.description
      : "Coming next — this section will be populated from Supabase.";

  return (
    <BackgroundShell>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <section className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/5 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            {/* subtle background layer */}
            <div className="absolute inset-0 opacity-25">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-start">
                {/* Character slot */}
                <CharacterPanel
  careerTitle={career.title}
/>


                {/* Right panel */}
                <div>
                  {/* badge */}
                  <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs text-emerald-200">
                    In Demand
                  </div>

                  {/* title */}
                  <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    {career.title}
                  </h1>

                  {/* short preview (optional, clamped) */}
                  <p className="mt-4 text-white/70 leading-relaxed max-w-2xl line-clamp-2">
                    {career.intro}
                  </p>

                  {/* interest icons placeholder */}
                  <div className="mt-8 flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
                  </div>

                  {/* salary */}
                  <div className="mt-8">
                    <div className="text-sm text-white/60">Salary</div>
                    <div className="mt-1 text-lg text-white">
                      $10,000 - $20,000
                    </div>
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

                  {/* Scrollable content card */}
                  <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold">{sectionTitle}</h2>

                    <div
                      className="
                        mt-4 max-h-[260px] overflow-y-auto pr-2
                        text-white/70 leading-relaxed whitespace-pre-line
                        scrollbar-thin
                        scrollbar-thumb-transparent
                        hover:scrollbar-thumb-white/30
                      "
                    >
                      {sectionBody}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating robot + speech bubble (ONLY ask UI) */}
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
