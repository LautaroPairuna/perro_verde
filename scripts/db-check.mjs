// scripts/db-check.mjs
import { PrismaClient } from "../generated/prisma/client";

// Versión simplificada para Prisma 6 Nativo (sin adapters)
const prisma = new PrismaClient({ log: ["error"] });

try {
  // Query simple y barato
  await prisma.$queryRaw`SELECT 1`;
  console.log("Prisma DB OK");
  process.exit(0);
} catch (e) {
  console.error("Prisma DB FAIL:", e?.message || e);
  process.exit(1);
} finally {
  await prisma.$disconnect().catch(() => {});
}
