import Image from "next/image";
import { metrics, profile } from "@/content/portfolio";
import { ApiConsole } from "./ApiConsole";
import { TypeLine } from "./TypeLine";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 [&>*]:min-w-0">
          <div>
            <div className="mb-9 flex items-center gap-4">
              <div className="group relative size-14 overflow-hidden rounded-full border border-line-strong">
                <Image
                  src="/ojas.jpg"
                  alt="Ojas Sharma"
                  fill
                  sizes="56px"
                  fetchPriority="high"
                  className="object-cover object-[60%_30%] grayscale transition duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="font-mono text-xs leading-relaxed">
                <p className="text-fg">{profile.name}</p>
                <p className="text-accent">{profile.role}</p>
                <p className="text-dim">{profile.meta}</p>
              </div>
            </div>

            <h1 className="text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[1.03] font-medium tracking-[-0.035em] text-balance">
              <TypeLine text={profile.headline} />
            </h1>

            <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-muted">{profile.intro}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-sm">
              <a href="#work" className="rounded-md bg-accent px-4 py-2.5 text-bg transition hover:bg-accent/85">
                view work ↓
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-line-strong px-4 py-2.5 text-fg transition hover:border-accent hover:text-accent"
              >
                résumé.pdf
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="px-2 py-2.5 text-muted transition hover:text-accent">
                github ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-2 py-2.5 text-muted transition hover:text-accent">
                linkedin ↗
              </a>
            </div>
          </div>

          <ApiConsole />
        </div>

        <dl className="mt-16 grid grid-cols-2 border-y border-line lg:mt-20 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`py-6 pr-4 ${i % 2 ? "pl-4 border-l border-line" : ""} lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-3xl font-medium tracking-tight sm:text-4xl">{m.value}</dd>
              <dd className="mt-1 font-mono text-[11px] leading-snug text-dim">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
