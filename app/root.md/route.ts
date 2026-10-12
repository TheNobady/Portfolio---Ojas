import { rootMarkdown } from "@/lib/markdown";

export function GET() {
  return new Response(rootMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
