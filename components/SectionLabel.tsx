import type { ReactNode } from "react";

export function SectionLabel({ index, label, title }: { index: string; label: string; title?: ReactNode }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 font-mono text-xs text-dim">
        <span className="text-accent">{index}</span>
        <span className="text-muted">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      {title && (
        <h2 className="mt-6 max-w-3xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
          {title}
        </h2>
      )}
    </div>
  );
}
