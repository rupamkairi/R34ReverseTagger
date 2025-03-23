import type { RequestHandler } from "./$types";
import { scrape } from "$lib/services/r34.services";

export const POST: RequestHandler = async (c) => {
  const body = await c.request.json();
  const { url } = body;

  const tags = await scrape(url);

  const res = new Response(JSON.stringify({ tags }));

  return res;
};
