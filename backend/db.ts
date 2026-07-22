import { PrismaClient } from "./src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "@std/dotenv/load";

const adapter = new PrismaPg({
  connectionString: Deno.env.get("DATABASE_URL")!,
});

export const prisma = new PrismaClient({
  adapter,
});
