import { FloatingRobot } from "@/components/site/FloatingRobot";

export function BackgroundShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-white text-[#061A33]
        dark:bg-[#061A33] dark:text-white
      "
    >
      {/* subtle global glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at top, rgba(255,255,255,0.12), transparent 60%),
              radial-gradient(circle at 80% 30%, rgba(0,180,255,0.12), transparent 55%)
            `,
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>

      <FloatingRobot />
    </div>
  );
}
