//src/app/api/admin/resources/[tableName]/route.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'
import { folderNames }               from '@/lib/adminConstants'
import { schemaByResource, searchStringFieldsByResource } from '../../../../admin/resources/[tableName]/schemas'

export const runtime = 'nodejs'

// ───────── PRISMA (cache global en dev) ─────────
declare global { // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}
const prisma = global.__prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

// ───────── MAPA DE MODELOS ─────────
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

// ───────── CONSTANTES/UTILS ─────────
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

function parseFilters(sp: URLSearchParams) {
  const entries = [...sp.entries()].filter(([k]) => k.startsWith('filters['))
  const filters: Record<string, string> = {}
  for (const [k, v] of entries) {
    const field = k.slice(8, -1) // filters[<campo>]
    filters[field] = v
  }
  return filters
}

function buildWhere(tableName: string, search: string | undefined, filters: Record<string, string>) {
  const where: Record<string, unknown> = {}

  // filtros exactos (coerción simple number/bool)
  for (const [k, raw] of Object.entries(filters)) {
    const s = String(raw)
    const lower = s.toLowerCase()
    const asBool = lower === 'true' || lower === 'false'
    const asNum  = s !== '' && !Number.isNaN(Number(s))
    ;(where as any)[k] = asBool ? lower === 'true' : (asNum ? Number(s) : s)
  }

  // búsqueda global
  const fields = searchStringFieldsByResource[tableName] ?? []
  if (search && fields.length) {
    ;(where as any).OR = fields.map(f => ({
      [f]: { contains: search, mode: 'insensitive' as const },
    }))
  }
  return where
}

async function saveFotoIfAny(tableName: string, file: File | null, data: Record<string, any>) {
  if (!file) return
  const baseDir = path.join(process.cwd(), 'public', 'images')
  const key     = (folderNames as Record<string, string>)[tableName] || tableName.toLowerCase()
  const dir     = path.join(baseDir, key)
  const thumbs  = path.join(dir, 'thumbs')

  await fs.mkdir(dir,    { recursive: true })
  await fs.mkdir(thumbs, { recursive: true })

  const hint = data.titulo ?? data.producto ?? tableName
  const slug = slugify(String(hint), { lower: true, strict: true })
  const name = `${slug}-${makeTimestamp()}.webp`
  const buf  = Buffer.from(await file.arrayBuffer())

  await sharp(buf).webp().toFile(path.join(dir, name))
  await sharp(buf).resize(200).webp().toFile(path.join(thumbs, name))

  data.foto = name
}

// ───────── GET (listado con paginación/orden/búsqueda/filtros) ─────────
export async function GET(
  req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const tableName = params.tableName
  const model     = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const sp       = req.nextUrl.searchParams
  const page     = Math.max(1, Number(sp.get('page') ?? 1))
  const pageSize = Math.min(100, Math.max(1, Number(sp.get('pageSize') ?? 10)))
  const [sortByRaw, sortDirRaw] = (sp.get('sort') ?? 'id:asc').split(':')
  const sortBy  = sortByRaw || 'id'
  const sortDir = (sortDirRaw === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc'
  const search  = sp.get('search')?.trim() || undefined
  const filters = parseFilters(sp)

  const where = buildWhere(tableName, search, filters)

  try {
    const [rows, total] = await Promise.all([
      model.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      model.count({ where }),
    ])
    return NextResponse.json({
      rows,
      page, pageSize,
      total,
      sort: `${sortBy}:${sortDir}`,
      search: search ?? '',
      filters,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
  }
}

// ───────── POST (crear + zod + multipart) ─────────
export async function POST(
  req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const tableName = params.tableName
  const model     = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}
  let file: File | null = null

  try {
    if (ct.includes('multipart/form-data')) {
      const form = await req.formData()
      for (const [k, v] of form.entries()) {
        if (k === FILE_FIELD && isFileLike(v)) {
          file = v as File
        } else if (typeof v === 'string') {
          data[k] = /^\d+$/.test(v) ? Number(v) : v
        }
      }
      delete data.id
      normalizeBooleans(data)
      await saveFotoIfAny(tableName, file, data)
    } else {
      data = await req.json()
      delete data.id
      for (const k in data) {
        const val = data[k]
        if (typeof val === 'string' && /^\d+$/.test(val)) data[k] = Number(val)
      }
      normalizeBooleans(data)
    }

    const schema = schemaByResource[tableName]
    const validated = schema ? schema.omit({ id: true }).parse(data) : data

    const created = await model.create({ data: validated })
    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    console.error(e)
    const msg = e?.issues?.[0]?.message ?? e?.message ?? 'Error al crear registro'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
