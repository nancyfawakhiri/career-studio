export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mt-6 rounded-2xl p-6
        border border-black/10 bg-white/70
        dark:border-white/15 dark:bg-white/5
      "
    >
      <h2 className="text-xl font-semibold text-[#061A33] dark:text-white">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
