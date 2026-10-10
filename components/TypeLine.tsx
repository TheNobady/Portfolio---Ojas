"use client";

import { useEffect, useState } from "react";

export function TypeLine({ text }: { text: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    // reduced motion: finish on the first tick
    const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? text.length : 1;
    let i = 0;
    const id = setInterval(() => {
      i += step;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span aria-hidden className="caret ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-accent" />
      {/* reserve final layout so nothing jumps while typing */}
      <span aria-hidden className="invisible">{text.slice(n)}</span>
    </span>
  );
}
