"use client";

export function PaletteButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("palette:open"))}
      aria-label="Open command palette"
      className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] text-dim transition hover:border-accent hover:text-accent"
    >
      <span className="hidden md:inline">⌘K</span>
      <span className="md:hidden">menu</span>
    </button>
  );
}
