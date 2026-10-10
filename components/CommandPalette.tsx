"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/content/portfolio";

type Cmd = { label: string; hint: string; run: () => void };

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });
const open = (url: string) => window.open(url, "_blank", "noreferrer");

export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  const cmds: Cmd[] = useMemo(
    () => [
      { label: "about", hint: "cd", run: () => go("about") },
      { label: "work", hint: "cd", run: () => go("work") },
      { label: "experience", hint: "cd", run: () => go("experience") },
      { label: "contact", hint: "cd", run: () => go("contact") },
      { label: "résumé.pdf", hint: "open", run: () => open(profile.resume) },
      { label: "github", hint: "open", run: () => open(profile.github) },
      { label: "linkedin", hint: "open", run: () => open(profile.linkedin) },
      { label: "email", hint: "mail", run: () => (window.location.href = `mailto:${profile.email}`) },
    ],
    [],
  );

  const list = cmds.filter((c) => c.label.includes(q.toLowerCase().trim()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setQ("");
        setSel(0);
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => {
      setQ("");
      setSel(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  if (!isOpen) return null;

  const exec = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[18vh] backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-md overflow-hidden rounded-lg border border-line-strong bg-surface font-mono text-sm shadow-2xl shadow-black/50"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="text-accent">❯</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(s + 1, list.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter") {
                exec(list[sel]);
              }
            }}
            placeholder="jump to…"
            className="h-12 w-full bg-transparent text-fg outline-none placeholder:text-dim"
          />
          <kbd className="text-[10px] text-dim">esc</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {list.map((c, i) => (
            <li key={c.label}>
              <button
                onMouseEnter={() => setSel(i)}
                onClick={() => exec(c)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left ${
                  i === sel ? "bg-bg text-fg" : "text-muted"
                }`}
              >
                <span className="w-10 text-xs text-dim">{c.hint}</span>
                {c.label}
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="px-4 py-2 text-dim">command not found: {q}</li>}
        </ul>
      </div>
    </div>
  );
}
