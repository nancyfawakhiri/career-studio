export function IntroSection({ text }: { text: string }) {
  return (
    <div
      className="
        max-h-[300px] overflow-y-auto pr-2
        leading-relaxed whitespace-pre-line
        text-[#061A33]/70 dark:text-white/70
        scrollbar-thin
        scrollbar-thumb-transparent
        hover:scrollbar-thumb-black/20 dark:hover:scrollbar-thumb-white/30
      "
    >
      {text}
    </div>
  );
}
