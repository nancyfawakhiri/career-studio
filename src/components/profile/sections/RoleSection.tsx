export function RoleSection({ tasks }: { tasks: string[] }) {
  return (
    <ul className="space-y-3 text-[#061A33]/70 dark:text-white/70">
      {tasks.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-black/30 dark:bg-white/40 shrink-0" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}
