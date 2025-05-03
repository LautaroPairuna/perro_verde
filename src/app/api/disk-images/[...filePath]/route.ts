// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Configuración
const folderNames: Record<string, string> = {
  CfgMarcas: 'marcas',
  CfgRubros: 'rubros',
  CfgFormasPagos: 'formas-pagos',
  CfgMonedas: 'monedas',
  CfgSlider: 'slider',
  Productos: 'productos',
  ProductoFotos: 'producto-fotos',
  ProductoVersiones: 'producto-versiones',
  ProductoEspecificaciones: 'producto-especificaciones',
  Pedidos: 'pedidos',
}
const tableForFolder = Object.fromEntries(
  Object.entries(folderNames).map(([model, folder]) => [folder, model])
) as Record<string, string>
const IMAGES_BASE = path.join(process.cwd(), 'public', 'images')
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const VALID_NAME_REGEX = /^[a-zA-Z0-9_.\-]+$/

async function verifyRecord(tableName: string, fileName: string) {
  const model = (prisma as any)[
    tableName.charAt(0).toLowerCase() + tableName.slice(1)
  ]
  if (typeof model?.findFirst !== 'function') return false
  const record = await model.findFirst({ where: { foto: fileName }, select: { id: true, foto: true } })
  return !!record?.foto
}

export async function GET(req: NextRequest, { params }: { params: { filePath: string[] } }) {
  const [folder, ...rest] = params.filePath || []
  if (!folder || rest.length === 0) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 })
  }
  const tableName = tableForFolder[folder]
  if (!tableName) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 })
  }
  let fileName = rest.pop()!
  // Validar nombre de archivo
  if (!VALID_NAME_REGEX.test(fileName)) {
    return NextResponse.json({ error: 'Nombre de archivo inválido' }, { status: 400 })
  }

  // Thumbnail support
  const url = new URL(req.url)
  const serveThumb = url.searchParams.get('thumb') === 'true'
  const subfolder = rest.join(path.sep)
  let safeDir = path.normalize(path.join(IMAGES_BASE, folder, subfolder))
  if (!safeDir.startsWith(path.join(IMAGES_BASE, folder))) {
    return NextResponse.json({ error: 'Ruta no permitida' }, { status: 403 })
  }
  safeDir = serveThumb ? path.join(safeDir, 'thumbs') : safeDir
  const safePath = path.join(safeDir, fileName)

  // Verify record
  try {
    const valid = await verifyRecord(tableName, fileName)
    if (!valid) {
      return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 })
    }
  } catch (err) {
    console.error('[disk-images] Error DB:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  // HEAD requests: only headers
  const stats = await fsPromises.stat(safePath).catch(() => null)
  if (!stats || !stats.isFile()) {
    console.warn('[disk-images] Archivo no encontrado:', safePath)
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 })
  }
  if (stats.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Archivo demasiado grande' }, { status: 413 })
  }

  const contentType = mimeLookup(safePath) || 'application/octet-stream'
  const lastModified = stats.mtime.toUTCString()
  const etag = `W/"${stats.size}-${stats.mtime.getTime()}"`
  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'Content-Length': stats.size.toString(),
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=30',
    ETag: etag,
    'Last-Modified': lastModified,
    'Accept-Ranges': 'bytes',
  }

  // Conditional requests
  const ifNoneMatch = req.headers.get('if-none-match')
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304, headers })
  }
  const ifModifiedSince = req.headers.get('if-modified-since')
  if (ifModifiedSince === lastModified) {
    return new NextResponse(null, { status: 304, headers })
  }

  if (req.method === 'HEAD') {
    return new NextResponse(null, { status: 200, headers })
  }

    // Range requests
  const range = req.headers.get('range')
  if (range) {
    const [unit, rangeSpec] = range.split('=')
    if (unit === 'bytes') {
      const [startStr, endStr] = rangeSpec.split('-')
      const start = Number(startStr)
      const end = endStr ? Number(endStr) : stats.size - 1
      if (!isNaN(start) && !isNaN(end) && start <= end && end < stats.size) {
        const fullBuffer = await fsPromises.readFile(safePath)
        const chunk = fullBuffer.slice(start, end + 1)
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`
        headers['Content-Length'] = chunk.byteLength.toString()
        console.info('[disk-images] Serving range:', start, end)
        return new NextResponse(chunk, { status: 206, headers })
      }
    }
  }

  // Full content: read buffer
  const fullBuffer = await fsPromises.readFile(safePath)
  console.info('[disk-images] Serving full file:', safePath)
  return new NextResponse(fullBuffer, { status: 200, headers })
}