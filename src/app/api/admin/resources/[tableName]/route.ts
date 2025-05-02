import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const models: Record<string, any> = {
  CfgMarcas: prisma.cfgMarcas,
  CfgRubros: prisma.cfgRubros,
  CfgFormasPagos: prisma.cfgFormasPagos,
  CfgMonedas: prisma.cfgMonedas,
  CfgSlider: prisma.cfgSlider,
  Productos: prisma.productos,
  ProductoFotos: prisma.productoFotos,
  ProductoVersiones: prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos: prisma.pedidos,
}

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

const BOOLEAN_FIELDS = ['activo', 'destacado'] as const
const FILE_FIELD     = 'foto'

function makeTimestamp() {
  const d = new Date()
  const YYYY = d.getFullYear()
  const MM   = String(d.getMonth() + 1).padStart(2, '0')
  const DD   = String(d.getDate()).padStart(2, '0')
  const hh   = String(d.getHours()).padStart(2, '0')
  const mm2  = String(d.getMinutes()).padStart(2, '0')
  const ss   = String(d.getSeconds()).padStart(2, '0')
  return `${YYYY}${MM}${DD}-${hh}${mm2}${ss}`
}

function normalizeBooleans(obj: Record<string, unknown>) {
  for (const k of BOOLEAN_FIELDS) {
    if (k in obj) {
      const v = obj[k] as unknown
      obj[k] = v === true || v === 'true' || v === 1 || v === '1'
    }
  }
}

function isFileLike(val: unknown): val is Blob {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof (val as Blob).arrayBuffer === 'function'
  )
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ tableName: string }> },
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }
  try {
    return NextResponse.json(await model.findMany())
  } catch {
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ tableName: string }> },
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const ct = request.headers.get('content-type') || ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: Record<string, any> = {}
  let file: Blob | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await request.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && isFileLike(v)) file = v
      else if (typeof v === 'string') data[k] = /^\d+$/.test(v) ? Number(v) : v
    }
    normalizeBooleans(data)

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const key     = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, key)
      const thumbs  = path.join(dir, 'thumbs')

      await fs.mkdir(dir,    { recursive: true })
      await fs.mkdir(thumbs, { recursive: true })

      const baseSlug = slugify(String(data.titulo ?? data.producto), { lower: true, strict: true })
      const name     = `${baseSlug}-${makeTimestamp()}.webp`
      const buf      = Buffer.from(await file.arrayBuffer())

      // Guardar original
      const fullPath = path.join(dir, name)
      await sharp(buf).webp().toFile(fullPath)
      console.log('[upload] Saved original:', fullPath)

      // Guardar miniatura
      const thumbPath = path.join(thumbs, name)
      await sharp(buf).resize(200).webp().toFile(thumbPath)
      console.log('[upload] Saved thumbnail:', thumbPath)

      data[FILE_FIELD] = name
    }
  } else {
    data = await request.json()
    normalizeBooleans(data)
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(await model.create({ data }), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 })
  }
}
