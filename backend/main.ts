import { app } from "./src/app.ts";

Deno.serve({port: 8002},app.fetch);