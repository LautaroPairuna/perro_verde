// src/lib/prisma.ts
import 'server-only'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'

declare global {
  // eslint-disable-next-line no-var
  var __prisma_v2: PrismaClient | undefined
}

function makePrisma() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    // Importante: esto evita que el build explote por URL(undefined)
    throw new Error('DATABASE_URL is missing (Prisma not initialized)')
  }

  const url = new URL(connectionString)

  // Pasar configuración directa al adapter (que gestiona el pool internamente)
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    port: Number(url.port) || 3306,
    connectionLimit: 10,
    connectTimeout: 10000,
    acquireTimeout: 10000
  })

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['error'],
  })
}

/**
 * Getter: no inicializa Prisma hasta que realmente se use.
 * En dev reusa instancia global para evitar múltiples conexiones.
 */
export function getPrisma(): PrismaClient {
  if (process.env.NODE_ENV === 'production') return makePrisma()

  if (!global.__prisma_v2) global.__prisma_v2 = makePrisma()
  return global.__prisma_v2
}

// Compat: si ya tenías imports `import prisma from ...` o `import { prisma } ...`
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    // cada acceso resuelve la instancia real
    return (getPrisma() as any)[prop]
  },
})

export default prisma
