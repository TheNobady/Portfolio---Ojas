"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/portfolio";
import { PaletteButton } from "./PaletteButton";

const links = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

export function StatusBar() {
  const [current, setCurrent] = useState("");

  // scroll-spy: the breadcrumb follows the section you're reading
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id === "top" ? "" : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-md border border-accent/40 font-mono text-[11px] font-bold text-accent transition group-hover:bg-accent group-hover:text-bg">
            {"{o}"}
          </span>
          <span className="truncate text-sm font-medium tracking-tight">{profile.name}</span>
          <span className="hidden truncate font-mono text-xs text-dim sm:inline">
            ~/backend<span className="text-accent">{current && `/${current}`}</span>
          </span>
        </a>

        <div className="flex items-center gap-5 font-mono text-xs">
          <ul className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`transition-colors hover:text-fg ${current === l.id ? "text-accent" : "text-muted"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden items-center gap-2 text-muted lg:flex">
            <span className="pulse size-1.5 rounded-full bg-accent" />
            open to work
          </span>
          <PaletteButton />
        </div>
      </nav>
    </header>
  );
}
