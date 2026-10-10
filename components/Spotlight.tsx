"use client";

import type { ReactNode } from "react";

export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.removeProperty("--x");
        e.currentTarget.style.removeProperty("--y");
      }}
      className={`spotlight ${className}`}
    >
      {children}
    </article>
  );
}
