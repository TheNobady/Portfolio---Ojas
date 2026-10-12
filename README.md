# ojas-portfolio

Personal portfolio of **Ojas Sharma**, backend engineer (Java · Spring Boot · PostgreSQL).

The site reads like a running service: the hero is a mock `PortfolioController.java`
whose endpoints (`GET localhost:8080/api/ojas/...`) return real profile data as JSON.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4. No UI libraries.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

All copy, projects, skills and links live in [`content/portfolio.ts`](content/portfolio.ts).
The API console, project cards and sections all render from that file, so edit it there
and everything stays in sync.

| Path | What |
| --- | --- |
| `content/portfolio.ts` | single source of truth for all content |
| `components/ApiConsole.tsx` | the hero API console (source view, endpoints, streaming JSON) |
| `components/Projects.tsx` | project cards with request-trace flow diagrams |
| `public/` | photo (`ojas.jpg`) and résumé (`resume.pdf`) |
| `lib/markdown.ts` | builds the AI-readable views below from the same content |

## For AI agents and LLMs

The site serves machine-readable versions of the profile, generated at build time from `content/portfolio.ts`:

- [`/llms.txt`](https://ojas-sharma-dev.vercel.app/llms.txt): index in the [llmstxt.org](https://llmstxt.org) format
- [`/LLM.md`](https://ojas-sharma-dev.vercel.app/LLM.md): complete profile with facts, projects and accuracy notes
- [`/root.md`](https://ojas-sharma-dev.vercel.app/root.md): the homepage as markdown

`robots.txt` and `sitemap.xml` point crawlers at all of them.

## Deploy

Built for [Vercel](https://vercel.com): import the repo and it deploys with zero config.
