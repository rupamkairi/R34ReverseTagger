import type { RequestHandler } from "./$types";
import { scrape } from "$lib/services/r34.services";

export const POST: RequestHandler = async (c) => {
  let url: string;

  try {
    const body = await c.request.json();
    url = body.url;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const env = c.platform?.env as Record<string, string> | undefined;
  const apiKey = env?.R34_API_KEY ?? "";
  const userId = env?.R34_USER_ID ?? "";

  try {
    const tags = await scrape(url, apiKey, userId);
    return new Response(JSON.stringify({ tags }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to scrape tags";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
