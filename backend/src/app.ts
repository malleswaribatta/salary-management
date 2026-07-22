import { Hono } from "@hono/hono";
import { employeeRoutes } from "./employee/employee.routes.ts";
import { cors } from "@hono/hono/cors";
import { getProfileImageService } from "./employee/employee.service.ts";
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

app.get("/uploads/profile-images/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const { body, contentType } = await getProfileImageService(key);

    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return c.json({ error: "Image not found" }, 404);
  }
});

app.route("api/", employeeRoutes);
