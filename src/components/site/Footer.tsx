import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10">
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-white/50 text-sm">
          © {new Date().getFullYear()} Career Studio. All rights reserved.
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-white/70">
          <Link className="hover:text-white" href="/careers">
            Careers
          </Link>
          <Link className="hover:text-white" href="/majors">
            Majors
          </Link>
          <Link className="hover:text-white" href="/request-feature">
            Request a Feature
          </Link>
          <Link className="hover:text-white" href="/chat">
            Chat with Us
          </Link>
          <Link className="hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-white" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
