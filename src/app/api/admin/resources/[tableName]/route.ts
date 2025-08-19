/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'
import { folderNames }               from '@/lib/adminConstants'

const prisma = new PrismaClient()

const models: Record<string, any> = {
  CfgMarcas:                 prisma.cfgMarcas,
  CfgRubros:                 prisma.cfgRubros,
  CfgFormasPagos:            prisma.cfgFormasPagos,
  CfgMonedas:                prisma.cfgMonedas,
  CfgSlider:                 prisma.cfgSlider,
  Productos:                 prisma.productos,
  ProductoFotos:             prisma.productoFotos,
  ProductoVersiones:         prisma.productoVersiones,
  ProductoEspecificaciones:  prisma.productoEspecificaciones,
  Pedidos:                   prisma.pedidos,
}

// Campos booleanos
const BOOLEAN_FIELDS = ['activo', 'destacado'] as const
const FILE_FIELD     = 'foto'

function isFileLike(v: unknown): v is Blob {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as Blob).arrayBuffer === 'function'
  )
}

function normalizeBooleans(obj: Record<string, unknown>) {
  for (const key of BOOLEAN_FIELDS) {
    if (key in obj) {
      const v = obj[key]
      obj[key] = v === true || v === 'true' || v === '1' || v === 1
    }
  }
}

function makeTimestamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    '-' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

/* ───────────────────────── GET (server-side table) ───────────────────────── */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tableName: string }> }
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const url      = new URL(req.url)
  const page     = Math.max(1, Number(url.searchParams.get('page') ?? 1))
  const pageSize = Math.max(1, Math.min(200, Number(url.searchParams.get('pageSize') ?? 10)))
  const sortBy   = url.searchParams.get('sortBy') ?? 'id'
  const sortDir  = (url.searchParams.get('sortDir') ?? 'asc') === 'desc' ? 'desc' : 'asc'
  const q        = (url.searchParams.get('q') ?? '').trim()

  // 1) Filtros: soportar JSON en ?filters= y también pares sueltos en el QS
  const CONTROL_KEYS = new Set(['page', 'pageSize', 'sortBy', 'sortDir', 'q', 'qFields', 'filters'])
  const where: Record<string, any> = {}

  // a) pares sueltos (marca_id=3&activo=true)
  for (const [k, v] of url.searchParams.entries()) {
    if (CONTROL_KEYS.has(k)) continue
    const all = url.searchParams.getAll(k)
    const norm = (s: string): string | number | boolean => {
      if (s === 'true' || s === 'false' || s === '1' || s === '0') return s === 'true' || s === '1'
      return /^\d+(\.\d+)?$/.test(s) ? Number(s) : s
    }
    if (all.length > 1) where[k] = { in: all.map(norm) }
    else if (v !== '')  where[k] = norm(v)
  }

  // b) JSON plano en ?filters={}
  const filtersRaw = url.searchParams.get('filters')
  if (filtersRaw) {
    try {
      const obj = JSON.parse(filtersRaw) as Record<string, unknown>
      for (const [k, v] of Object.entries(obj)) {
        if (v == null || v === '') continue
        if (Array.isArray(v)) where[k] = { in: v }
        else if (v === 'true' || v === 'false') where[k] = v === 'true'
        else if (typeof v === 'string' && /^\d+(\.\d+)?$/.test(v)) where[k] = Number(v)
        else where[k] = v
      }
    } catch {
      // ignore JSON malformado
    }
  }

  // 2) Búsqueda q: usar qFields si vienen; si no, default razonable por tabla
  const qFieldsParam = (url.searchParams.get('qFields') ?? '')
    .split(',').map(s => s.trim()).filter(Boolean)

  const DEFAULT_Q_FIELDS: Record<string, string[]> = {
    CfgMarcas: ['marca', 'keywords'],
    CfgRubros: ['rubro', 'condiciones', 'keywords'],
    CfgFormasPagos: ['forma_pago', 'descripcion'],
    CfgMonedas: ['moneda', 'moneda_des'],
    CfgSlider: ['titulo'],
    Productos: ['producto', 'descripcion'],
    ProductoFotos: ['epigrafe', 'foto'],
    ProductoVersiones: ['version', 'detalle'],
    ProductoEspecificaciones: ['categoria', 'especificaciones'],
    Pedidos: [
      'comprador_nombre', 'comprador_email', 'comprador_telefono',
      'direccion_envio', 'metodo_pago', 'estado'
    ],
  }

  const qFields = qFieldsParam.length
    ? qFieldsParam
    : (DEFAULT_Q_FIELDS[tableName] ?? [])

  if (q && qFields.length) {
    const like = { contains: q, mode: 'insensitive' as const }
    where.OR = qFields.map(f => ({ [f]: like }))
  }

  // 3) Orden con fallback
  let orderBy: Record<string, 'asc' | 'desc'> | undefined
  if (sortBy) orderBy = { [sortBy]: sortDir }

  const skip = (page - 1) * pageSize

  try {
    const [total, rows] = await Promise.all([
      model.count({ where }),
      model.findMany({ where, orderBy, skip, take: pageSize }),
    ])
    return NextResponse.json({ rows, total, page, pageSize, sortBy, sortDir })
  } catch (e) {
    // fallback por si sortBy no existe
    try {
      const [total, rows] = await Promise.all([
        model.count({ where }),
        model.findMany({ where, orderBy: { id: sortDir }, skip, take: pageSize }),
      ])
      return NextResponse.json({ rows, total, page, pageSize, sortBy: 'id', sortDir })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
    }
  }
}


/* ───────────────────────── POST (sin cambios funcionales) ───────────────────────── */
export async function POST(req: NextRequest,
  context: { params: Promise<{ tableName: string }> }
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}
  let file: Blob | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && isFileLike(v)) {
        file = v
      } else if (typeof v === 'string') {
        data[k] = /^\d+$/.test(v) ? Number(v) : v
      }
    }
    delete data.id
    normalizeBooleans(data)

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const key     = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, key)
      const thumbs  = path.join(dir, 'thumbs')

      await fs.mkdir(dir,    { recursive: true })
      await fs.mkdir(thumbs, { recursive: true })

      const hint = data.titulo ?? data.producto ?? tableName
      const slug = slugify(String(hint), { lower: true, strict: true })
      const name = `${slug}-${makeTimestamp()}.webp`
      const buf  = Buffer.from(await file.arrayBuffer())

      const fullPath  = path.join(dir, name)
      await sharp(buf).webp().toFile(fullPath)

      const thumbPath = path.join(thumbs, name)
      await sharp(buf).resize(200).webp().toFile(thumbPath)

      data.foto = name
    }
  } else {
    data = await req.json()
    delete data.id
    for (const k in data) {
      if (typeof data[k] === 'string' && /^\d+$/.test(data[k])) data[k] = Number(data[k])
    }
    normalizeBooleans(data)
  }

  try {
    const created = await model.create({ data })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 })
  }
}
