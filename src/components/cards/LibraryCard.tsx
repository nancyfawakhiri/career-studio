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
        overflow-hidden
      "
      style={{
        border: `1px solid ${accentColor}99`,
        boxShadow: `0 0 0 1px ${accentColor}40, 0 30px 80px rgba(0,0,0,0.60)`,
      }}
    >
      {/* subtle corner tint */}
      <div
        className="absolute -top-20 -left-20 h-56 w-56 opacity-25 blur-2xl"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}, transparent 60%)`,
        }}
      />

      <div className="relative">
        {/* Title centered */}
        <h3 className="text-center text-[24px] font-semibold leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-6 text-[14px] font-normal text-white/90 leading-relaxed line-clamp-4 text-center">
          {description}
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href={href}
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              rounded-lg
              border
              text-[16px] font-semibold
              hover:bg-white/10 transition
            "
            style={{ borderColor: "#5B85AA" }}
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
