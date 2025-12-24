import Link from "next/link";
import { ChevronRight, ArrowUpRight, Plus } from "lucide-react";
import Bg from "@/components/bg";
import light from "@/public/light.png";
import dark from "@/public/dark.png";
import Image from "next/image";
import { FEATURES, STEPS, MODELS } from "@/app/home/data-content";

const PlusIcon = ({ className }: { className?: string }) => (
  <Plus
    className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-border/60 z-20 ${className}`}
  />
);

export default function HomePage() {
  return (
    <main className="relative bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, var(--border) 1.5px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background" />
      </div>

      <Bg />

      <div className="relative z-10 mx-auto max-w-300 border-x border-border/40 bg-background/20 backdrop-blur-[1px]">
        <PlusIcon className="top-0 left-0" />
        <PlusIcon className="top-0 right-0" />

        <section className="relative border-b border-border/40 bg-background overflow-hidden">
          {/* Hero Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Hero Content Layer */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 text-center">
            <div className="mx-auto mb-6 w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary animate-in fade-in slide-in-from-top-4 duration-1000">
              Multi-model AI chat platform
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent sm:text-7xl md:text-8xl leading-[0.85] mb-8">
              One interface.
              <br />
              Multiple AI models.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              routeAI lets you chat with the best free AI models from a single,
              fast, minimal interface — built for developers and creators.
            </p>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 mt-10 text-sm font-black text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20"
            >
              Get started for free
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Nested Code Preview - Structural Bridge */}
          <div className="relative border-t border-border/40 bg-muted/5 p-6 md:p-16">
            <PlusIcon className="top-0 left-0" />
            <PlusIcon className="top-0 right-0" />
            <PlusIcon className="bottom-0 left-0" />
            <PlusIcon className="bottom-0 right-0" />

            <div className="mx-auto max-w-4xl group rounded-xl border border-border bg-card transition-all hover:border-primary/30 shadow-2xl overflow-hidden text-left">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3 text-[10px] font-mono text-muted-foreground bg-muted/30">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
                <span className="opacity-60 font-medium tracking-widest uppercase">
                  route-config.ts
                </span>
              </div>

              {/* Code Body */}
              <div className="p-8 font-mono text-sm leading-relaxed text-foreground/90 overflow-x-auto selection:bg-primary/20">
                <p className="flex gap-2">
                  <span className="text-primary font-bold">const</span>
                  <span>result =</span>
                  <span className="text-primary font-bold">await</span>
                  <span>routeAI.chat({`{`}</span>
                </p>

                <div className="pl-6 mt-1 border-l border-primary/20">
                  <p>
                    model:{" "}
                    <span className="text-primary/90 font-medium">
                      "meta/llama-3.1-free"
                    </span>
                    ,
                  </p>
                  <p>messages: [{`{ role: "user", content: "..." }`}],</p>
                  <p>
                    stream: <span className="text-primary font-bold">true</span>
                  </p>
                </div>

                <p>{`})`}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-border/40 border-b border-border/40"
        >
          <PlusIcon className="bottom-0 left-0" />
          <PlusIcon className="bottom-0 right-0" />
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="group p-10 transition-all hover:bg-primary/2"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 border border-primary/10">
                {item.icon}
              </div>
              <h3 className="text-base font-bold tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section
          id="models"
          className="py-14 border-b border-border/40 bg-muted/5 overflow-hidden"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MODELS, ...MODELS].map((name, i) => (
              <span
                key={i}
                className="mx-12 text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 hover:text-primary transition-all cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        <section className="relative grid md:grid-cols-3 divide-x divide-border/40 border-b border-border/40">
          <PlusIcon className="bottom-0 left-0" />
          <PlusIcon className="bottom-0 right-0" />
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="group p-12 hover:bg-primary/1 transition-colors"
            >
              <div className="text-[5rem] font-black leading-none text-primary/5 transition-colors group-hover:text-primary/10 select-none">
                {item.step}
              </div>
              <div className="-mt-10">
                <h3 className="text-xl font-bold tracking-tight mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="relative border-b border-border/40 py-32 bg-muted/2 overflow-hidden">
          <PlusIcon className="absolute top-0 left-0" />
          <PlusIcon className="absolute top-0 right-0" />
          <PlusIcon className="absolute bottom-0 left-0" />
          <PlusIcon className="absolute bottom-0 right-0" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <h2 className="text-[20vw] font-black uppercase tracking-tighter text-foreground/3 leading-none italic">
              routeAI
            </h2>
          </div>

          <div className="relative mx-auto max-w-4xl px-6 z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="aspect-video rounded-2xl border border-border bg-card shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden group transition-all hover:border-primary/40 flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40 backdrop-blur-md shrink-0">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                {/* Light mode image */}
                <Image
                  src={light}
                  alt="preview light"
                  fill
                  priority
                  className=" object-center dark:hidden"
                />
                {/* Dark mode image */}
                <Image
                  src={dark}
                  alt="preview dark"
                  fill
                  priority
                  className=" object-center hidden dark:block"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/40 bg-muted/2">
          <PlusIcon className="top-0 left-0" />
          <PlusIcon className="top-0 right-0" />
          <PlusIcon className="bottom-0 left-0" />
          <PlusIcon className="bottom-0 right-0" />

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
            {[
              {
                label: "Availability",
                value: "99.99%",
                detail: "Enterprise Uptime",
              },
              { label: "Latency", value: "<15ms", detail: "Edge Optimized" },
              {
                label: "Security",
                value: "AES-256",
                detail: "Zero-Log Policy",
              },
              { label: "Inventory", value: "50+", detail: "Live AI Models" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 md:p-12 group hover:bg-primary/2 transition-colors overflow-hidden border-b md:border-b-0 border-border/40 last:border-b-0"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary transition-colors mb-4">
                  {item.label}
                </p>
                <p className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 italic">
                  {item.value}
                </p>
                <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="relative border-t border-border/40 bg-muted/5 pt-20 pb-12 px-8 md:px-16 overflow-hidden">
          <PlusIcon className="top-0 left-0" />
          <PlusIcon className="top-0 right-0" />

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-black tracking-tighter text-3xl">
                <span className="text-primary">routeAI</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The unified gateway for open intelligence. Architected for
                speed, built for privacy.
              </p>
              <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                <Link
                  href="https://github.com/rajput-vishal01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </Link>

                <Link
                  href="https://www.linkedin.com/in/askvishal01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Linkedin
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-between h-full">
              <div className="space-y-4 text-left md:text-right">
                <Link
                  href="https://askvishal.in"
                  className="group inline-flex items-center gap-2 text-sm font-black"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Designed by
                  </span>
                  <span className="text-primary border-b border-primary/0 group-hover:border-primary transition-all">
                    Vishal Kumar
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-border/10 w-full text-left md:text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 italic">
                  © 2025 routeAI Inc.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
