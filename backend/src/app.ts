import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { employeeRoutes } from "./employee/employee.routes.ts";
import { cors } from "@hono/hono/cors";
export const app = new Hono();
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      Deno.env.get("FRONTEND_URL")!,
    ],
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json({ message: "Server is running" });
});

app.get("/uploads/profile-images/*", serveStatic({ root: "./" }));

app.route("api/", employeeRoutes);
