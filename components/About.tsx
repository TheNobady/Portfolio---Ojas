import { core, focus, profile, stack } from "@/content/portfolio";
import { Reveal } from "./Reveal";

const groups: [string, string[]][] = [
  ["languages", stack.languages],
  ["backend", stack.backend],
  ["data", stack.data],
  ["infra", stack.infra],
  ["also", stack.also],
];

export function About() {
  return (
    <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 [&>*]:min-w-0">
      <Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-fg" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="mb-4 font-mono text-xs text-dim">currently</p>
          <ul className="space-y-2 font-mono text-[13px] text-muted">
            {focus.map((f) => (
              <li key={f}>
                <span className="text-accent">▸</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs text-dim">core</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {core.map((c) => (
              <li
                key={c}
                className="rounded-md border border-accent/40 bg-accent/[0.06] px-3 py-1.5 font-mono text-[13px] text-accent"
              >
                {c}
              </li>
            ))}
          </ul>

          <dl className="mt-8 divide-y divide-line border-t border-line">
            {groups.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                <dt className="font-mono text-xs leading-6 text-dim">{k}</dt>
                <dd className="text-[15px] leading-6 text-fg/90">{v.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-2">
        <p className="border-t border-line pt-12 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight font-medium tracking-[-0.025em]">
          {profile.philosophy.map((s, i) => (
            <span key={s} className={i === 1 ? "text-accent" : i === 0 ? "text-fg" : "text-muted"}>
              {s}{" "}
            </span>
          ))}
        </p>
      </Reveal>
    </div>
  );
}
