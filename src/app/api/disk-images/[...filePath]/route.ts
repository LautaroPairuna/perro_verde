import { NextRequest } from 'next/server'
import * as fsSync from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs' // forzamos Node (fs)

// ───────────────── Prisma singleton ─────────────────
declare global { var __prisma: PrismaClient | undefined }
const prisma = global.__prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

// ──────────────── carpeta ⇄ tabla ────────────────
// Debe coincidir con tus nombres en public/images/<carpeta>
const TABLE_TO_FOLDER = {
  CfgMarcas:                'marcas',
  CfgRubros:                'rubros',
  CfgFormasPagos:           'formas-pagos',
  CfgMonedas:               'monedas',
  CfgSlider:                'slider',
  Productos:                'productos',
  ProductoFotos:            'producto-fotos',
  ProductoVersiones:        'producto-versiones',
  ProductoEspecificaciones: 'producto-especificaciones',
  Pedidos:                  'pedidos',
} as const
type TableName = keyof typeof TABLE_TO_FOLDER
type FolderName = (typeof TABLE_TO_FOLDER)[TableName]

const FOLDER_TO_TABLE: Record<FolderName, TableName> = Object.fromEntries(
  Object.entries(TABLE_TO_FOLDER).map(([t, f]) => [f, t])
) as Record<FolderName, TableName>

// Si alguna tabla NO usa el campo "foto", definilo acá
const IMAGE_FIELD_BY_TABLE: Partial<Record<TableName, string>> = {
  // CfgMarcas: 'logo',
  // Productos: 'imagen',
}

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'])
const BASE_DIR = path.join(process.cwd(), 'public', 'images')

// ───────────────── helpers ─────────────────
function jsonError(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Cross-Origin-Resource-Policy': 'same-origin',
    },
  })
}
function isInsideBase(absPath: string) {
  const normalized = path.normalize(absPath)
  const base = path.normalize(BASE_DIR) + path.sep
  return normalized.startsWith(base)
}
function etagFromStat(stat: fsSync.Stats) {
  // ETag débil (suficiente para imágenes locales)
  return `W/"${stat.size}-${Math.trunc(stat.mtimeMs)}"`
}
function cacheHeaderFor(fileName: string) {
  const looksHashed = /\.[a-f0-9]{8,}\./i.test(fileName)
  return looksHashed ? 'public, max-age=31536000, immutable' : 'public, max-age=3600'
}

type ResolveResult = {
  status: number
  headers: Record<string,string>
  absPath?: string
}

// Resuelve y arma headers (GET/HEAD comparten esto)
async function resolveImage(
  req: NextRequest,
  parts: string[]
): Promise<ResolveResult> {
  if (!parts || parts.length < 2) return { status: 400, headers: {}, absPath: undefined }

  const folder = parts[0] as FolderName
  const tableName = FOLDER_TO_TABLE[folder]
  if (!tableName) return { status: 404, headers: {}, absPath: undefined }

  const rest = parts.slice(1)
  const fileName = rest[rest.length - 1]
  const ext = path.extname(fileName).toLowerCase()
  if (!ALLOWED_EXT.has(ext)) return { status: 415, headers: {}, absPath: undefined }

  // valida en BD
  const imageField = IMAGE_FIELD_BY_TABLE[tableName] ?? 'foto'
  const modelKey = (tableName.charAt(0).toLowerCase() + tableName.slice(1)) as keyof PrismaClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = (prisma as any)[modelKey]
  if (!model?.findFirst) return { status: 404, headers: {}, absPath: undefined }

  const registro = await model.findFirst({
    where: { [imageField]: fileName },
    select: { id: true },
  })
  if (!registro) return { status: 404, headers: {}, absPath: undefined }

  const relPath = path.posix.join(folder, ...rest)
  const absPath = path.join(BASE_DIR, relPath)
  if (!isInsideBase(absPath)) return { status: 403, headers: {}, absPath: undefined }

  try {
    await fs.access(absPath)
  } catch {
    return { status: 404, headers: {}, absPath: undefined }
  }

  const stat = await fs.stat(absPath)
  const etag = etagFromStat(stat)
  const lastModified = stat.mtime.toUTCString()
  const contentType = (mimeLookup(absPath) as string) || 'application/octet-stream'

  // Condicionales
  const ifNoneMatch = req.headers.get('if-none-match')
  const ifModifiedSince = req.headers.get('if-modified-since')
  if (ifNoneMatch === etag || (ifModifiedSince && new Date(ifModifiedSince) >= stat.mtime)) {
    return {
      status: 304,
      headers: {
        ETag: etag,
        'Last-Modified': lastModified,
        'Cache-Control': cacheHeaderFor(fileName),
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Cross-Origin-Resource-Policy': 'same-origin',
      },
      absPath,
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'Cache-Control': cacheHeaderFor(fileName),
    ETag: etag,
    'Last-Modified': lastModified,
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Resource-Policy': 'same-origin',
  }
  if (contentType === 'image/svg+xml') {
    headers['Content-Security-Policy'] = "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'"
  }

  return { status: 200, headers, absPath }
}

// ───────────────────────── GET ─────────────────────────
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filePath: string[] }> }
) {
  // 🔧 FIX principal: await params
  const { filePath: parts } = await context.params

  const result = await resolveImage(req, parts)
  if (result.status !== 200) {
    // devolvemos error amigable (o 304 sin body)
    return result.status === 304
      ? new Response(null, { status: 304, headers: result.headers })
      : jsonError(
          result.status === 400 ? 'Ruta inválida'
          : result.status === 403 ? 'Acceso no permitido'
          : result.status === 404 ? 'Fichero no encontrado o no registrado en BD'
          : result.status === 415 ? 'Tipo de archivo no permitido'
          : 'Recurso no disponible',
          result.status
        )
  }

  // leemos y servimos
  const fileBuffer = await fs.readFile(result.absPath!)
  const body = new Uint8Array(fileBuffer) // BodyInit válido en Web Response
  return new Response(body, { status: 200, headers: result.headers })
}

// ───────────────────────── HEAD ─────────────────────────
// útil para precarga/verificación de caché
export async function HEAD(
  req: NextRequest,
  context: { params: Promise<{ filePath: string[] }> }
) {
  const { filePath: parts } = await context.params
  const result = await resolveImage(req, parts)
  return new Response(null, { status: result.status, headers: result.headers })
}
