import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-xl">
          Career Studio
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link className="hover:text-white" href="/careers">Find My Career</Link>
          <Link className="hover:text-white" href="#">Blogs</Link>
          <Link className="hover:text-white" href="#">Request a Feature</Link>
          <Link className="hover:text-white" href="#">Chat With Us</Link>
        </nav>
      </div>
    </header>
  );
}
