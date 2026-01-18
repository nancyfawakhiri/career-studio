import Link from "next/link";

export function LibraryCard({
  title,
  description,
  href,
  accentColor,
  ctaLabel = "Explore",
}: {
  title: string;
  description: string;
  href: string;
  accentColor: string;
  ctaLabel?: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl p-5 overflow-hidden
        bg-white
        border
        dark:border-transparent
        dark:bg-gradient-to-b dark:from-[#0A2545] dark:to-[#071B33]
      "
      style={{
        border: `1px solid ${accentColor}99`,
        boxShadow: `0 0 0 1px ${accentColor}40, 0 30px 80px rgba(0,0,0,0.25)`,
      }}
    >
      {/* subtle inner corner tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 10%, ${accentColor}, transparent 60%)`,
        }}
      />

      <h3 className="relative z-10 text-center text-[24px] font-semibold leading-snug text-[#061A33] dark:text-white">
        {title}
      </h3>

      <p className="relative z-10 mt-6 text-[14px] font-normal leading-relaxed line-clamp-4 text-center text-[#061A33]/70 dark:text-white/70">
        {description}
      </p>

      <div className="relative z-10 mt-8">
        <Link
          href={href}
          className="
            flex items-center justify-center
            w-full
            px-5 py-2.5
            rounded-lg
            border
            text-[16px] font-semibold
            text-[#061A33] dark:text-white
            bg-transparent
            hover:bg-black/5 dark:hover:bg-white/10 transition
          "
          style={{ borderColor: "#5B85AA" }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
