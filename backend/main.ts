import { app } from "./src/app.ts";

const port = Number(Deno.env.get("PORT")) || 8002;

Deno.serve({ port }, app.fetch);