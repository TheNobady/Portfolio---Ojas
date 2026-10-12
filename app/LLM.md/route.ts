import { llmMarkdown } from "@/lib/markdown";

export function GET() {
  return new Response(llmMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
