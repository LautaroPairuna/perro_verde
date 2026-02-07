// src/lib/prisma.ts
import 'server-only'
import 'dotenv/config'

import { PrismaClient } from '../../generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as { prisma_v2?: PrismaClient }

const connectionString = process.env.DATABASE_URL!
const url = new URL(connectionString)

const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: Number(url.port) || 3306,
  connectionLimit: 5,
})

export const prisma =
  globalForPrisma.prisma_v2 ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_v2 = prisma

export default prisma
