import { earlier, experience, wins } from "@/content/portfolio";
import { Reveal } from "./Reveal";

export function ExperienceLog() {
  return (
    <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20 [&>*]:min-w-0">
      <Reveal>
        <ol className="relative space-y-12 border-l border-line pl-7">
          {experience.map((e) => (
            <li key={e.org} className="relative">
              <span className="absolute top-1.5 -left-[33px] size-2.5 rounded-full border-2 border-bg bg-accent" />
              <p className="font-mono text-xs text-accent">{e.role}</p>
              <h3 className="mt-1 text-2xl font-medium tracking-tight">{e.org}</h3>
              <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-dim">
                {e.tags.map((t) => (
                  <li key={t}>#{t}</li>
                ))}
              </ul>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                {e.lines.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="relative">
            <span className="absolute top-1.5 -left-[33px] size-2.5 rounded-full border-2 border-bg bg-line-strong" />
            <p className="font-mono text-xs text-dim">earlier · tech member</p>
            <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
              {earlier.map((e) => (
                <li key={e.org}>
                  <span className="text-fg">{e.org}</span>: {e.what}
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-line bg-surface p-6">
          <p className="mb-2 font-mono text-xs text-dim">wins.log</p>
          <ul className="divide-y divide-line">
            {wins.map((w) => (
              <li key={w.what} className="py-4">
                <p className="text-fg">{w.what}</p>
                <p className="mt-1 font-mono text-[13px]">
                  <span className="text-accent">{w.result}</span>
                  <span className="text-dim"> · {w.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
