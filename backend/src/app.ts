import { Hono } from "@hono/hono";
import { employeeRoutes } from "./employee/employee.routes.ts";
import { cors } from "@hono/hono/cors";
export const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json({ message: "Server is running" });
});

app.route("api/", employeeRoutes);
