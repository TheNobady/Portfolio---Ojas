import { featured, more, type Project } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";

function Links({ p }: { p: Project }) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
      {p.demo ? (
        <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-accent hover:underline">
          <span className="pulse size-1.5 rounded-full bg-accent" />
          live ↗
        </a>
      ) : (
        p.runs && (
          <span className="flex items-center gap-1.5 text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            {p.runs}
          </span>
        )
      )}
      <a href={p.source} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
        source ↗
      </a>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded border border-line-strong px-2 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

// one hop ≈ 0.9s: the packet leaves node i at i·0.9s and lands ~0.8s later
const HOP = 0.9;

function Flow({ steps }: { steps: NonNullable<Project["flow"]> }) {
  return (
    <ol className="font-mono text-xs">
      {steps.map((s, i) => (
        <li key={s.node}>
          {s.via && (
            <div className="flex items-center gap-2 py-1.5 pl-4 text-dim">
              <span className="relative h-5 w-px bg-line-strong">
                <span
                  aria-hidden
                  className="packet absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0"
                  style={{ "--d": `${(i - 1) * HOP}s` } as React.CSSProperties}
                />
              </span>
              <span>↓ {s.via}</span>
            </div>
          )}
          <div
            style={{ "--d": `${i === 0 ? 0 : i * HOP - 0.1}s` } as React.CSSProperties}
            className={`node-hit rounded-md border px-3 py-2 transition-colors group-hover:border-dim ${
              i === steps.length - 1 ? "border-accent/40 bg-accent/[0.04]" : "border-line-strong bg-bg"
            }`}
          >
            <p className="text-fg">{s.node}</p>
            {s.detail && <p className="mt-0.5 text-dim">{s.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Featured({ p, i }: { p: Project; i: number }) {
  return (
    <Spotlight className="group overflow-hidden rounded-xl border border-line bg-surface/60 transition-colors hover:border-line-strong">
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-7">
        <p className="truncate font-mono text-xs text-dim">
          <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span className="mx-2">~/projects/{p.slug}</span>
          <span className="hidden sm:inline">· {p.kind}</span>
          {p.note && <span className="ml-2 text-amber">· {p.note}</span>}
        </p>
        <Links p={p} />
      </header>

      <div className="grid gap-10 p-5 sm:p-7 lg:grid-cols-[1.35fr_1fr] lg:gap-12 [&>*]:min-w-0">
        <div>
          <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">{p.name}</h3>
          <p className="mt-2 text-lg text-fg/80">{p.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>

          {p.metric && (
            <div className="mt-7 flex items-baseline gap-4 border-l-2 border-accent pl-4">
              <span className="font-mono text-2xl font-bold text-accent">{p.metric.value}</span>
              <span className="text-sm text-muted">{p.metric.label}</span>
            </div>
          )}

          <ul className="mt-7 space-y-2.5 text-[15px] leading-relaxed text-muted">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {p.flow && (
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-xs text-dim">
              <span className="pulse size-1.5 rounded-full bg-accent" />
              how it works · request trace
            </p>
            <Flow steps={p.flow} />
          </div>
        )}
      </div>

      <footer className="border-t border-line px-5 py-4 sm:px-7">
        <Tags items={p.stack} />
      </footer>
    </Spotlight>
  );
}

export function Projects() {
  return (
    <div className="space-y-6">
      {featured.map((p, i) => (
        <Reveal key={p.slug}>
          <Featured p={p} i={i} />
        </Reveal>
      ))}

      <Reveal>
        <p className="pt-10 pb-2 font-mono text-xs text-dim">also built</p>
        <div className="grid gap-4 md:grid-cols-3">
          {more.map((p) => (
            <Spotlight key={p.slug} className="group flex flex-col rounded-xl border border-line p-5 transition-colors hover:border-line-strong">
              <p className="font-mono text-xs text-dim">
                {p.kind}
                {p.note && <span className="ml-2 text-amber">· {p.note}</span>}
              </p>
              <h3 className="mt-2 text-xl font-medium">{p.name}</h3>
              <p className="mt-1 text-sm text-fg/80">{p.tagline}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-muted">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="mt-5 space-y-4">
                <Tags items={p.stack} />
                <Links p={p} />
              </div>
            </Spotlight>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
