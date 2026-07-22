import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "jsr:@std/dotenv/load";

const adapter = new PrismaPg({
  connectionString: Deno.env.get("DATABASE_URL")!,
});

const prisma = new PrismaClient({
  adapter,
});

/*India*/
async function main() {
  // Create multiple users
  await prisma.country.createMany({
    data: [
      { name: "India", id: 1 },
      { name: "USA", id: 2 },
      { name: "United Kingdom", id: 3 },
      { name: "Germany", id: 4 },
      { name: "France", id: 5 },
      { name: "Japan", id: 6 },
      { name: "Brazil", id: 7 },
      { name: "Australia", id: 8 },
    ],
    skipDuplicates: true, // prevents errors if you run the seed multiple times
  });

  await prisma.employeeType.createMany({
    data: [
      { name: "Full-Time", id: 1 },
      { name: "Contract", id: 2 },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    Deno.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
