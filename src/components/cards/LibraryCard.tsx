import Link from "next/link";

export function LibraryCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <h3 className="text-2xl font-semibold leading-snug">{title}</h3>

      <p className="mt-4 text-white/70 leading-relaxed line-clamp-3">
        {description}
      </p>

      <div className="mt-8 grid gap-3">
        <Link
          href={href}
          className="text-center px-4 py-3 rounded-xl border border-white/20 bg-transparent hover:bg-white/10"
        >
          Explore Career
        </Link>
        <button className="px-4 py-3 rounded-xl bg-white/20 hover:bg-white/25">
          Pursue Career
        </button>
      </div>
    </div>
  );
}
