import { app } from "./src/app.ts";

const port = Number(Deno.env.get("PORT")) || 8002;
console.log("app.routes ----> ", app.routes);
console.log("app ----> ", app);
Deno.serve({ port }, app.fetch);
