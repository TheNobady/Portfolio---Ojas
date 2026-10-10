"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  core,
  experience,
  featured,
  more,
  profile,
  stack,
  wins,
} from "@/content/portfolio";

const BASE = "/api/ojas";
const HOST = "localhost:8080";

type Endpoint = { path: string; handler: string; returns: string; body: unknown };

const endpoints: Endpoint[] = [
  {
    path: "/profile",
    handler: "profile",
    returns: "Profile",
    body: {
      name: profile.name,
      role: profile.role,
      education: {
        degree: "B.Tech, Computer Science & Engineering",
        school: "SRM Institute of Science and Technology",
        years: "2024–2028",
      },
      roles: ["Tech Lead @ ISTE", "Tech Lead @ Rangeen Pixels"],
      core,
      openTo: profile.openTo,
      motto: profile.philosophy.join(" "),
    },
  },
  { path: "/skills", handler: "skills", returns: "Skills", body: stack },
  {
    path: "/projects",
    handler: "projects",
    returns: "List<Project>",
    body: [...featured, ...more].map((p) => ({
      name: p.name,
      kind: p.kind,
      what: p.tagline,
      stack: p.stack.slice(0, 4),
      status: p.demo ? "live" : p.runs,
    })),
  },
  {
    path: "/experience",
    handler: "experience",
    returns: "List<Role>",
    body: experience.map((e) => ({ org: e.org, role: e.role, focus: e.tags, highlight: e.lines[0] })),
  },
  {
    path: "/achievements",
    handler: "achievements",
    returns: "List<Win>",
    body: wins.map((w) => ({ event: w.what, result: w.result, detail: w.detail })),
  },
  {
    path: "/contact",
    handler: "contact",
    returns: "Contact",
    body: {
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
      resume: profile.resume,
      status: "open to " + profile.openTo,
    },
  },
];

// ---------- the "source" this console pretends to serve ----------

const header = [
  "package dev.ojas.portfolio;",
  "",
  "import org.springframework.web.bind.annotation.*;",
  "import java.util.List;",
  "",
  "@RestController",
  `@RequestMapping("${BASE}")`,
  "public class PortfolioController {",
  "",
  "    private final OjasService ojas;",
  "",
  "    public PortfolioController(OjasService ojas) {",
  "        this.ojas = ojas;",
  "    }",
  "",
];

const source: { text: string; ep?: number }[] = [
  ...header.map((text) => ({ text })),
  ...endpoints.flatMap((e, i) => [
    { text: `    @GetMapping("${e.path}")`, ep: i },
    { text: `    public ${e.returns} ${e.handler}() {`, ep: i },
    { text: `        return ojas.${e.handler}();`, ep: i },
    { text: "    }", ep: i },
    { text: "" },
  ]),
  { text: "}" },
];

const JAVA =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|\b(package|import|public|private|final|class|return|this|new)\b|\b([A-Z]\w*)\b/g;

function java(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(JAVA)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1]
      ? "text-dim"
      : m[2]
        ? "text-accent"
        : m[3]
          ? "text-amber"
          : m[4]
            ? "text-[#ff7b72]"
            : "text-blue";
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return out;
}

const JSON_TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;

function json(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(JSON_TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    if (m[1]) {
      out.push(
        <span key={m.index} className={m[2] ? "text-blue" : "text-accent"}>
          {m[1]}
        </span>,
      );
      if (m[2]) out.push(m[2]);
    } else {
      out.push(
        <span key={m.index} className="text-amber">
          {m[0]}
        </span>,
      );
    }
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return out;
}

// ---------- component ----------

type Status = "idle" | "pending" | "done";

export function ApiConsole() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"response" | "source">("response");
  const [status, setStatus] = useState<Status>("idle");
  const [shown, setShown] = useState(0);
  const [ms, setMs] = useState(0);
  const [copied, setCopied] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const ep = endpoints[active];
  const text = JSON.stringify(ep.body, null, 2);
  const lines = text.split("\n");

  const execute = useCallback((i: number) => {
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = JSON.stringify(endpoints[i].body, null, 2).split("\n").length;

    setActive(i);
    setView("response");
    setStatus("pending");
    setShown(0);
    bodyRef.current?.scrollTo({ top: 0 });

    const latency = 14 + Math.round(Math.random() * 38);
    timers.current.push(
      setTimeout(
        () => {
          setMs(latency);
          setStatus("done");
          if (calm) return setShown(total);
          // stream the body in, a few lines per frame
          for (let n = 1; n <= total; n++) {
            timers.current.push(setTimeout(() => setShown(n), n * 14));
          }
        },
        calm ? 0 : 260 + latency * 4,
      ),
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(() => execute(0), 900);
    const pending = timers.current;
    return () => {
      clearTimeout(t);
      pending.forEach(clearTimeout);
    };
  }, [execute]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const bytes = new TextEncoder().encode(text).length;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_0_0_1px_rgb(126_231_135/0.03),0_30px_80px_-20px_rgb(0_0_0/0.6)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]/80" />
        <span className="size-3 rounded-full bg-[#febc2e]/80" />
        <span className="size-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-auto font-mono text-[11px] text-dim">spring-boot · :8080</span>
      </div>

      {/* file tabs */}
      <div role="tablist" aria-label="View" className="flex border-b border-line font-mono text-xs">
        {(
          [
            ["source", "PortfolioController.java"],
            ["response", "response.json"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={`flex items-center gap-2 border-r border-line px-4 py-2.5 transition-colors ${
              view === v ? "bg-bg text-fg shadow-[inset_0_-1px_0_var(--accent)]" : "text-muted hover:text-fg"
            }`}
          >
            <span className={v === "source" ? "text-amber" : "text-blue"}>{v === "source" ? "J" : "{}"}</span>
            {label}
          </button>
        ))}
      </div>

      {/* request bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-bg/40 p-3 font-mono text-[13px] sm:flex-nowrap">
        <span className="rounded-md border border-line-strong bg-bg px-3 py-2 font-bold text-accent">GET</span>
        <span className="flex-1 truncate text-xs text-dim sm:hidden">{HOST}</span>
        <label className="relative order-last min-w-0 basis-full sm:order-none sm:basis-0 sm:flex-1">
          <span className="sr-only">Endpoint</span>
          <select
            value={active}
            onChange={(e) => execute(Number(e.target.value))}
            className="w-full cursor-pointer appearance-none truncate rounded-md border border-line-strong bg-bg py-2 pr-8 pl-3 text-fg outline-none hover:border-dim focus-visible:border-accent"
          >
            {endpoints.map((e, i) => (
              <option key={e.path} value={i}>
                {HOST}
                {BASE}
                {e.path}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-dim">▾</span>
        </label>
        <button
          onClick={copy}
          aria-label="Copy response"
          className="rounded-md border border-line-strong px-3 py-2 text-muted transition hover:border-dim hover:text-fg"
        >
          {copied ? "✓" : "⧉"}
        </button>
        <button
          onClick={() => execute(active)}
          disabled={status === "pending"}
          className="rounded-md border border-accent/60 px-4 py-2 text-accent transition hover:bg-accent hover:text-bg disabled:opacity-60"
        >
          {status === "pending" ? "Sending…" : "Execute ▸"}
        </button>
      </div>

      {/* body */}
      <div ref={bodyRef} className="h-[420px] overflow-y-auto font-mono text-[13px] leading-6 sm:h-[460px]">
        {view === "source" ? (
          <div className="py-3">
            {source.map((l, i) => {
              const on = l.ep !== undefined;
              const current = l.ep === active;
              return (
                <div
                  key={i}
                  onClick={on ? () => execute(l.ep!) : undefined}
                  className={`flex ${on ? "cursor-pointer hover:bg-accent/[0.06]" : ""} ${
                    current ? "bg-accent/[0.04]" : ""
                  }`}
                >
                  <span className="w-11 shrink-0 pr-3 text-right text-dim/60 select-none">{i + 1}</span>
                  <span className={`whitespace-pre ${current ? "border-l border-accent/60" : "border-l border-transparent"} pl-3 text-fg/90`}>
                    {java(l.text)}
                  </span>
                </div>
              );
            })}
            <p className="mt-4 px-14 text-[11px] text-dim">{"// click any @GetMapping to call it"}</p>
          </div>
        ) : (
          <div className="p-4 sm:px-5">
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 text-[13px]">
              {status === "done" ? (
                <>
                  <span className="text-fg">HTTP/1.1</span>
                  <span className="font-bold text-accent">200 OK</span>
                  <span className="text-dim">{ms}ms</span>
                  <span className="text-dim">{(bytes / 1024).toFixed(1)} kB</span>
                </>
              ) : (
                <span className="text-muted">
                  {status === "pending" ? "→ " : "$ "}
                  GET {BASE}
                  {ep.path}
                  {status === "pending" ? " · awaiting response" : " · press Execute"}
                  <span className="caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />
                </span>
              )}
            </div>
            {status === "done" && (
              <>
                <p className="border-b border-dashed border-line pb-3 text-dim">
                  Content-Type: <span className="text-muted">application/json</span>
                </p>
                <div className="pt-3">
                  {lines.slice(0, shown).map((l, i) => (
                    <div key={`${active}-${i}`} className="flex">
                      <span className="w-8 shrink-0 pr-3 text-right text-dim/50 select-none">{i + 1}</span>
                      <span className="min-w-0 break-words whitespace-pre-wrap text-fg/85">{json(l)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
