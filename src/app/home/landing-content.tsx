import Link from "next/link";
import {
  ChevronRight,
  Terminal,
  Zap,
  Shield,
  Layout,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import Bg from "@/components/bg";

// --- DATA CONFIGURATION ---
const FEATURES = [
  {
    title: "Multi-Model Router",
    description: "Switch between free models instantly using OpenRouter and AI SDK.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Minimal UI",
    description: "Clean, distraction-free interface inspired by ChatGPT and Vercel.",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "Fast & Responsive",
    description: "Optimized for speed with Next.js, streaming, and local caching.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Developer Focused",
    description: "API-first architecture built with modern tooling and clean logic.",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    title: "Privacy First",
    description: "Your data is never used for training. Context is stored locally.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Always Improving",
    description: "Experimental platform — new models and features are deployed daily.",
    icon: <ChevronRight className="w-5 h-5" />,
  },
];

const STEPS = [
  { step: "01", title: "Input your prompt", desc: "Ask a question, paste complex code, or request a creative task." },
  { step: "02", title: "Select Intelligence", desc: "Choose from 50+ free AI models via our unified selector." },
  { step: "03", title: "Stream Results", desc: "Receive fast, accurate, and contextually aware responses instantly." },
];

const STATS = [
  { value: "50+", label: "AI models available" },
  { value: "<200ms", label: "Time to first token" },
  { value: "99.9%", label: "Uptime reliability" },
];

const MODELS = ["Meta Llama", "Mistral AI", "Google Flash", "AllenAI Olmo", "DeepSeek"];

const CTA_CONTENT = {
  title: "Ready to route your intelligence?",
  description: "Join developers building the next generation of AI tools with a clean, unified interface. No complex setup, just pure productivity.",
};

// --- COMPONENT ---
export default function HomePage() {
  return (
    <main className="relative bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Bg />

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 text-center">
        <div className="mx-auto mb-6 w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary animate-in fade-in slide-in-from-top-4 duration-1000">
          Multi-model AI chat platform
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent sm:text-6xl md:text-7xl">
          One interface.
          <br />
          Multiple AI models.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
          routeAI lets you chat with the best free AI models from a single,
          fast, minimal interface — built for developers and creators.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="group relative flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Get started for free
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-border bg-background/50 backdrop-blur-sm px-8 py-3 text-sm font-bold transition-all hover:bg-muted hover:border-primary/30"
          >
            Sign in to account
          </Link>
        </div>
      </section>

      {/* CODE PREVIEW SECTION */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24">
        <div className="group rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl transition-all hover:border-primary/30 shadow-2xl">
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 text-[10px] font-mono text-muted-foreground">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <span className="opacity-50 font-medium">route-config.ts</span>
          </div>
          <div className="p-8 font-mono text-sm leading-relaxed text-foreground/80 overflow-x-auto">
            <p className="flex gap-2">
              <span className="text-primary font-bold">const</span> 
              <span>result =</span> 
              <span className="text-primary font-bold">await</span> 
              <span>routeAI.chat({`{`}</span>
            </p>
            <p className="pl-6 mt-1 border-l border-primary/20">
              model: <span className="text-primary/80 font-medium">"meta/llama-3.1-free"</span>,
            </p>
            <p className="pl-6 border-l border-primary/20">
              messages: [{`{ role: "user", content: "..." }`}],
            </p>
            <p className="pl-6 border-l border-primary/20">
              stream: <span className="text-primary font-bold">true</span>
            </p>
            <p>{`})`}</p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODELS STRIP */}
      <section id="models" className="relative z-10 border-y border-border/40 bg-muted/5 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
            Built on leading open intelligence
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MODELS.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border/60 bg-background/50 px-5 py-2 text-xs font-semibold text-muted-foreground transition-all hover:text-primary hover:border-primary/40 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-12 lg:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="group relative">
              <div className="text-[4rem] font-black leading-none text-primary/5 transition-colors group-hover:text-primary/10">
                {item.step}
              </div>
              <div className="relative -mt-8 pl-2">
                <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 text-center sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="text-5xl font-bold tracking-tighter italic">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL SPOTLIGHT CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card p-12 text-center shadow-2xl shadow-primary/10 sm:p-24 group">
          {/* Spotlight Glows */}
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-[100px] transition-all group-hover:bg-primary/10" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-[100px] transition-all group-hover:bg-primary/10" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl leading-[1.1]">
              Ready to <span className="text-primary italic">route</span> your intelligence?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm text-muted-foreground leading-relaxed">
              {CTA_CONTENT.description}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group flex h-14 items-center justify-center rounded-full bg-primary px-10 text-sm font-black text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Get started for free
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/login"
                className="flex h-14 items-center justify-center rounded-full border border-border bg-background px-10 text-sm font-bold transition-all hover:bg-muted hover:border-primary/30"
              >
                Sign in to account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/40 py-12 bg-background/50 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            <span>© 2025 routeAI</span>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
          <div className="flex gap-8">
            {["GitHub", "Twitter", "Discord"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}