// src/lib/prisma.ts
import "server-only";
import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function makePrisma() {
  const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
  
  // Si existe accelerateUrl, usamos la extensión
  if (accelerateUrl) {
    return new PrismaClient({
      datasources: { db: { url: accelerateUrl } },
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    } as any).$extends(withAccelerate()) as unknown as PrismaClient;
  }

  // Fallback: Cliente estándar sin aceleración (para build o si no hay URL)
  return new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  } as any);
}

// Usamos any temporalmente para evitar problemas de tipos cíclicos/complejos entre extend y base
export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Exportamos un tipo que representa la instancia real de prisma en uso
// Al forzar el tipo aquí, ayudamos a TS en el resto de la app
export type DbClient = typeof prisma;
