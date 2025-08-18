/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'
import { folderNames }               from '@/lib/adminConstants'
import { schemaByResource }          from '../../../../../admin/resources/[tableName]/schemas'

export const runtime = 'nodejs'

// ───────── PRISMA (cache global en dev) ─────────
declare global { // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}
const prisma = global.__prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

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

async function saveFotoIfAny(tableName: string, file: File | null, data: Record<string, any>, existingFileName?: string | null) {
  if (!file) return
  const baseDir = path.join(process.cwd(), 'public', 'images')
  const keyDir  = (folderNames as Record<string, string>)[tableName] || tableName.toLowerCase()
  const dir     = path.join(baseDir, keyDir)
  const thumbs  = path.join(dir, 'thumbs')

  await fs.mkdir(dir,    { recursive: true })
  await fs.mkdir(thumbs, { recursive: true })

  // eliminar viejo si existe
  if (existingFileName) {
    await fs.rm(path.join(dir,    existingFileName), { force: true }).catch(() => {})
    await fs.rm(path.join(thumbs, existingFileName), { force: true }).catch(() => {})
  }

  const hint = data.titulo ?? data.producto ?? tableName
  const slug = slugify(String(hint), { lower: true, strict: true })
  const name = `${slug}-${makeTimestamp()}.webp`
  const buf  = Buffer.from(await file.arrayBuffer())

  await sharp(buf).webp().toFile(path.join(dir, name))
  await sharp(buf).resize(200).webp().toFile(path.join(thumbs, name))
  data.foto = name
}

function formDataToObject(fd: FormData) {
  const out: Record<string, unknown> = {}
  fd.forEach((v, k) => {
    if (v instanceof File) return
    try { out[k] = JSON.parse(String(v)) }
    catch {
      const s = String(v)
      if (/^\d+$/.test(s)) out[k] = Number(s)
      else if (/^(true|false)$/i.test(s)) out[k] = /^true$/i.test(s)
      else out[k] = s
    }
  })
  return out
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const model = models[params.tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${params.tableName}” no existe` }, { status: 404 })
  }
  const key = isNaN(+params.id) ? params.id : +params.id
  try {
    const item = await model.findUnique({ where: { id: key } })
    if (!item) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(item)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al leer registro' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const key      = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: key } })

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
      normalizeBooleans(data)
      await saveFotoIfAny(tableName, file, data, existing?.[FILE_FIELD] ?? null)
    } else {
      data = await req.json()
      for (const k in data) {
        const val = data[k]
        if (typeof val === 'string' && /^\d+$/.test(val)) data[k] = Number(val)
      }
      normalizeBooleans(data)
    }

    const schema = schemaByResource[tableName]
    const validated = schema ? schema.partial().parse(data) : data

    const updated = await model.update({ where: { id: key }, data: validated })
    return NextResponse.json(updated)
  } catch (e: any) {
    console.error(e)
    const msg = e?.issues?.[0]?.message ?? e?.message ?? 'Error al actualizar registro'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const key      = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: key } })

  // borrar archivos si hay
  if (existing?.[FILE_FIELD]) {
    const baseDir = path.join(process.cwd(), 'public', 'images')
    const keyDir  = (folderNames as Record<string, string>)[tableName] || tableName.toLowerCase()
    const dir     = path.join(baseDir, keyDir)
    const thumbs  = path.join(dir, 'thumbs')
    await fs.rm(path.join(dir,    existing[FILE_FIELD]), { force: true }).catch(() => {})
    await fs.rm(path.join(thumbs, existing[FILE_FIELD]), { force: true }).catch(() => {})
  }

  try {
    await model.delete({ where: { id: key } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
