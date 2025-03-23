import { Hono } from "hono";
import { scrape } from "./services/r34.services";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/scrape", async (c) => {
  try {
    const body = await c.req.json();
    const { url } = body;

    const tags = await scrape(url);

    c.status(200);
    return c.json({ message: "Hello from Hono!", tags });
  } catch (error) {
    c.status(500);
    return c.json({ message: "Error from Hono!", error });
  }
});

export default app;
