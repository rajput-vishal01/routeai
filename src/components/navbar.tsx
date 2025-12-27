import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="relative mx-auto max-w-300 border-x border-border/40 px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl  text-primary tracking-tighter">
              routeAI
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="h-4 w-[1px] bg-border/40 mx-2" />

            <Link
              href="/register"
              className="px-5 py-2 rounded-full bg-foreground text-background text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.95]"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
