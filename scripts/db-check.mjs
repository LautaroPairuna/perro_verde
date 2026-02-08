// scripts/db-check.mjs
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const url = new URL(raw);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || "3306"),
  user: decodeURIComponent(url.username || ""),
  password: decodeURIComponent(url.password || ""),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || "2"),
});

const prisma = new PrismaClient({ adapter, log: ["error"] });

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
