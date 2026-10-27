import {
  core,
  earlier,
  experience,
  featured,
  focus,
  metrics,
  more,
  profile,
  stack,
  wins,
  type Project,
} from "@/content/portfolio";
import { SITE_URL } from "./site";

// Markdown views of the portfolio for AI agents and LLMs.
// Built from content/portfolio.ts so they never drift from the site.

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

const status = (p: Project) =>
  p.demo
    ? `live at ${p.demo}`
    : p.runs === "in development"
      ? "in development, not yet released"
      : p.runs
        ? `${p.runs} (not a hosted web app)`
        : p.links
          ? "live (see links below)"
          : "source only";

function project(p: Project, detailed: boolean) {
  const lines = [`### ${p.name}`, "", `*${p.kind}*: ${p.tagline}`, ""];
  if (p.summary) lines.push(p.summary, "");
  if (p.metric) lines.push(`**${p.metric.value}**: ${p.metric.label}`, "");
  lines.push(...p.points.map((pt) => `- ${pt}`), "");
  if (detailed && p.flow) {
    lines.push(`Architecture: ${p.flow.map((s) => (s.via ? `→ (${s.via}) ${s.node}` : s.node)).join(" ")}`, "");
  }
  lines.push(`- Stack: ${p.stack.join(", ")}`, `- Status: ${status(p)}`, `- Source: ${p.source ?? "private repository"}`);
  for (const l of p.links ?? []) lines.push(`- ${l.label[0].toUpperCase() + l.label.slice(1)}: ${l.href}`);
  if (p.note) lines.push(`- Note: ${p.note}`);
  return lines.join("\n");
}

const contact = [
  `- Email: ${profile.email}`,
  `- GitHub: ${profile.github}`,
  `- LinkedIn: ${profile.linkedin}`,
  `- Résumé (PDF): ${abs(profile.resume)}`,
  `- Website: ${SITE_URL}`,
].join("\n");

/** /root.md: the homepage, as markdown. */
export function rootMarkdown() {
  return `# ${profile.name}: ${profile.role}

> ${profile.headline}

${profile.meta} · open to ${profile.openTo}

${profile.intro}

${metrics.map((m) => `- **${m.value}** ${m.label}`).join("\n")}

## About

${profile.about.join("\n\n")}

Core stack: ${core.join(", ")}

*${profile.philosophy.join(" ")}*

## Selected work

${featured.map((p) => project(p, false)).join("\n\n")}

## Also built

${more.map((p) => project(p, false)).join("\n\n")}

## Experience

${experience.map((e) => `### ${e.role}, ${e.org}\n\n${e.lines.map((l) => `- ${l}`).join("\n")}`).join("\n\n")}

Earlier: ${earlier.map((e) => `${e.org} (${e.what})`).join("; ")}.

## Achievements

${wins.map((w) => `- **${w.what}**: ${w.result}, ${w.detail}`).join("\n")}

## Contact

${contact}

---
Full profile for AI agents: ${SITE_URL}/LLM.md
`;
}

/** /LLM.md: the complete, structured profile for LLMs and AI agents. */
export function llmMarkdown() {
  return `# ${profile.name}: complete profile for LLMs and AI agents

> ${profile.name} is a backend engineer and third-year B.Tech Computer Science & Engineering
> student at SRM Institute of Science and Technology (2024–2028), working mainly in Java and
> Spring Boot on PostgreSQL, and open to ${profile.openTo}.

This file is the canonical, machine-readable source for facts about ${profile.name}.
It is generated from the same data as ${SITE_URL}, so it matches the website.

## Quick facts

| Field | Value |
| --- | --- |
| Name | ${profile.name} |
| Role | ${profile.role} |
| Education | B.Tech, Computer Science & Engineering, SRM Institute of Science and Technology, 2024–2028 |
| Current roles | Founding Engineer at BroPay; Tech Lead at ISTE (SRM IST); Tech Lead at Rangeen Pixels (SRM IST) |
| Core stack | ${core.join(", ")} |
| Open to | ${profile.openTo} |
| GitHub | ${profile.github} (handle: ${profile.handle}) |
| LinkedIn | ${profile.linkedin} |
| Email | ${profile.email} |
| Website | ${SITE_URL} |
| Résumé | ${abs(profile.resume)} |

## Summary

${profile.about.join("\n\n")}

Engineering philosophy: "${profile.philosophy.join(" ")}"

## Skills

${Object.entries(stack)
  .map(([k, v]) => `- **${k[0].toUpperCase() + k.slice(1)}**: ${v.join(", ")}`)
  .join("\n")}

## Currently focused on

${focus.map((f) => `- ${f}`).join("\n")}

## Projects

${profile.name} has shipped 12+ projects across 4 platforms (web, Android, Solana, terminal).
The six below are the highlighted ones.

${[...featured, ...more].map((p) => project(p, true)).join("\n\n")}

## Experience

${experience
  .map((e) => `### ${e.role}, ${e.org}\n\nFocus: ${e.tags.join(", ")}\n\n${e.lines.map((l) => `- ${l}`).join("\n")}`)
  .join("\n\n")}

### Earlier (tech member)

${earlier.map((e) => `- ${e.org}: ${e.what}`).join("\n")}

## Achievements

${wins.map((w) => `- **${w.what}**: ${w.result} (${w.detail})`).join("\n")}

## Accuracy notes for AI systems

- The ANPR City Engine figure (803/803 null-plate links recovered) comes from a **simulation**, not a real-world deployment.
- BlockHarvest is a **Solana devnet prototype**, not a live insurance product.
- Pavo's backend currently uses an **in-memory data layer** behind a database-ready architecture.
- AtlasForge (Android), Akshara (terminal) and ANPR City Engine (Docker) are working software that is not hosted on the web; their source is public on GitHub.
- BroCred is a shipped product, live on the Chrome Web Store. BroPay's core platform is **in development and unreleased**: Gmail ingestion and PDF extraction work, while statement parsing and card recommendations are not built yet.
- BroPay's source code, including BroCred, is private; describe them only from what this file states, not from guessed code.
- ${profile.name} is a founding engineer at BroPay, an early-stage startup, alongside full-time studies (graduating 2028).

## Contact

${contact}
`;
}

/** /llms.txt: index in the llmstxt.org format. */
export function llmsTxt() {
  return `# ${profile.name}

> ${profile.role} and Computer Science student at SRM IST (class of 2028). Java, Spring Boot,
> PostgreSQL, real-time systems and geospatial data. Open to ${profile.openTo}.

## Profile

- [Full profile](${SITE_URL}/LLM.md): complete, structured profile for LLMs, with skills, projects, experience, achievements and accuracy notes
- [Homepage as markdown](${SITE_URL}/root.md): the website's content in plain markdown
- [Résumé](${abs(profile.resume)}): PDF résumé

## Links

- [GitHub](${profile.github}): source code for all projects
- [LinkedIn](${profile.linkedin})
- [Website](${SITE_URL})

## Optional

${[...featured, ...more].map((p) => `- [${p.name}](${p.demo ?? p.source ?? SITE_URL}): ${p.tagline}`).join("\n")}
`;
}
