import "server-only";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const raw = process.env.DATABASE_URL!;
const url = new URL(raw);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
});

export const prisma = new PrismaClient({ adapter });
