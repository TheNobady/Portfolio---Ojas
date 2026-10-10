"use client";

import { useState } from "react";
import { profile } from "@/content/portfolio";

const field =
  "w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 text-fg outline-none placeholder:text-dim focus-visible:border-accent";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const links = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "github", value: `github.com/${profile.handle}`, href: profile.github },
    { label: "linkedin", value: "in/ojas-sharma", href: profile.linkedin },
    { label: "résumé", value: "resume.pdf", href: profile.resume },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
      <div>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          I&apos;m looking for {profile.openTo} where I can work on real systems with people who care how they&apos;re built.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line font-mono text-sm">
          {links.map((l) => (
            <li key={l.label} className="flex items-center gap-4 py-3.5">
              <span className="w-16 shrink-0 text-xs text-dim">{l.label}</span>
              <a
                href={l.href}
                target={l.label === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="min-w-0 truncate text-fg transition hover:text-accent"
              >
                {l.value}
              </a>
              {l.label === "email" && (
                <button
                  onClick={copy}
                  className="ml-auto rounded border border-line-strong px-2 py-0.5 text-[11px] text-muted transition hover:border-accent hover:text-accent"
                >
                  {copied ? "copied ✓" : "copy"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={send} className="overflow-hidden rounded-xl border border-line-strong bg-surface font-mono text-[13px]">
        <div className="flex items-center gap-2 border-b border-line bg-bg/40 p-3">
          <span className="rounded-md border border-line-strong bg-bg px-3 py-2 font-bold text-amber">POST</span>
          <span className="min-w-0 flex-1 truncate rounded-md border border-line-strong bg-bg px-3 py-2 text-fg">
            /api/ojas/contact
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs text-dim">name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-dim">message</span>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="We're hiring a backend intern…"
              className={`${field} resize-none`}
            />
          </label>

          <pre className="overflow-x-auto rounded-md border border-dashed border-line px-3 py-2.5 leading-6 whitespace-pre-wrap break-words text-muted">
            {"{\n  "}
            <span className="text-blue">&quot;from&quot;</span>: <span className="text-accent">&quot;{name || "…"}&quot;</span>
            {",\n  "}
            <span className="text-blue">&quot;message&quot;</span>:{" "}
            <span className="text-accent">&quot;{message ? message.slice(0, 80) + (message.length > 80 ? "…" : "") : "…"}&quot;</span>
            {"\n}"}
          </pre>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] text-dim">opens your mail client</span>
            <button
              type="submit"
              className="rounded-md border border-accent/60 px-4 py-2 text-accent transition hover:bg-accent hover:text-bg"
            >
              Send ▸
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
