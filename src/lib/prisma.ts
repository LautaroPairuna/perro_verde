import "server-only";

import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function buildAdapterFromDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL is missing");

  // Prisma schema usa mysql://... (provider="mysql")
  // El adapter lo armamos por partes para evitar problemas de parseo/scheme.
  const url = new URL(raw);

  const host = url.hostname;
  const port = Number(url.port || "3306");
  const user = decodeURIComponent(url.username || "");
  const password = decodeURIComponent(url.password || "");
  const database = url.pathname.replace(/^\//, "");

  if (!host || !database) {
    throw new Error(`Invalid DATABASE_URL (host/db). Got host="${host}" db="${database}"`);
  }

  return new PrismaMariaDb({
    host,
    port,
    user,
    password,
    database,

    // Ajustes críticos para evitar pool timeout en contenedores
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || "10"), // Aumentado a 10 por defecto
    connectTimeout: 60000, // 60s para conectar
    acquireTimeout: 60000, // 60s para obtener conexión del pool
    idleTimeout: 30000,    // 30s antes de cerrar conexión inactiva
  });
}

function createPrismaClient() {
  const adapter = buildAdapterFromDatabaseUrl();

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

// Singleton global (evita múltiples pools / timeouts por duplicación)
export const prisma = global.__prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") global.__prisma = prisma;

export default prisma;
