// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Permite añadir una variable global para almacenar la instancia de PrismaClient en desarrollo.
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
