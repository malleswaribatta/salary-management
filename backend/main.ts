import { app } from "./src/app.ts";
import "jsr:@std/dotenv/load";

const port = Number(Deno.env.get("PORT")) || 8002;

Deno.serve({ port }, app.fetch);
