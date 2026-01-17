import Link from "next/link";

export function LibraryCard({
  title,
  description,
  href,
  accentColor,
}: {
  title: string;
  description: string;
  href: string;
  accentColor: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl
        bg-gradient-to-b from-[#0A2545] to-[#071B33]
        p-8
        transition
      "
      style={{
        border: `1px solid ${accentColor}99`,
        boxShadow: `0 0 0 1px ${accentColor}40, 0 30px 80px rgba(0,0,0,0.60)`,
      }}
    >
      <h3 className="text-2xl font-semibold leading-snug">
        {title}
      </h3>

      <p className="mt-4 text-white/70 leading-relaxed line-clamp-4">
        {description}
      </p>

      <div className="mt-8">
        <Link
          href={href}
          className="
            block text-center px-4 py-3 rounded-xl
            border border-white/40 text-white
            hover:bg-white/10 transition
          "
        >
          Explore Career
        </Link>
      </div>
    </div>
  );
}
