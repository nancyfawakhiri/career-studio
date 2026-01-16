export function BackgroundShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#071B33] text-white">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
