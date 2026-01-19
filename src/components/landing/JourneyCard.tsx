import Link from "next/link";

type JourneyCardProps = {
  count: string;
  label: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export function JourneyCard({
  count,
  label,
  description,
  buttonLabel,
  href,
}: JourneyCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon + Count */}
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9">
          <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-orange-300" />
          <div className="absolute left-2 top-2 h-7 w-7 rounded-full bg-indigo-500" />
          <div className="absolute left-2 top-2 h-7 w-7 rounded-full bg-indigo-500 [clip-path:polygon(0%_50%,100%_50%,100%_100%,0%_100%)]" />
        </div>

        <div className="text-2xl font-semibold tracking-tight">{count}</div>
      </div>

      {/* Label */}
      <div className="mt-1 text-lg font-semibold tracking-wide text-[#5B85AA] uppercase">
        {label}
      </div>

      {/* Description (fixed height so buttons align) */}
      <p className="mt-4 max-w-[270px] text-white/65 text-sm leading-relaxed min-h-[96px]">
        {description}
      </p>

      {/* Button (orange like the others) */}
      <div className="mt-6">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 transition px-8 py-3 text-xs font-semibold tracking-wide"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
