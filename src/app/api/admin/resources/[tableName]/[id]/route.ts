/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'
import { folderNames }               from '@/lib/adminConstants'
import { schemaByResource }          from '@/app/admin/resources/[tableName]/schemas'
import {prisma}                        from '@/lib/prisma'
import { logAudit }                  from '@/lib/audit'
import { auth }                      from '@/auth'

export const runtime = 'nodejs'

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
  // Si es CfgSlider, actualizamos también el campo thumbs con el mismo nombre
  if (tableName === 'CfgSlider') {
    data.thumbs = name
  }
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ tableName: string; id: string }> }
) {
  const params = await context.params
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
  context: { params: Promise<{ tableName: string; id: string }> }
) {
  const { tableName, id } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const key      = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: key } })
  const session  = await auth()
  const userEmail = session?.user?.email

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
      
      // Loggear cambio de foto si aplica
      if (file && tableName !== 'AuditLog') {
        await logAudit({
          entity: tableName,
          entityId: String(key),
          action: 'UPDATE',
          field: FILE_FIELD,
          oldValue: existing?.[FILE_FIELD],
          newValue: file.name, // Solo guardamos nombre del archivo nuevo
          user: userEmail,
        })
      }
      
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

    // Loggear cambios de campos
    if (existing && tableName !== 'AuditLog') {
      for (const [field, newVal] of Object.entries(validated)) {
        const oldVal = existing[field]
        if (oldVal !== newVal) {
           // Ignoramos fechas de update automáticas si las hubiera
           if (field === 'updatedAt') continue 
           
           await logAudit({
             entity: tableName,
             entityId: String(key),
             action: 'UPDATE',
             field,
             oldValue: oldVal,
             newValue: newVal,
             user: userEmail,
           })
        }
      }
    }

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
  context: { params: Promise<{ tableName: string; id: string }> }
) {
  const { tableName, id } = await context.params
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

    if (tableName !== 'AuditLog') {
       const session = await auth()
       await logAudit({
          entity: tableName,
          entityId: String(key),
          action: 'DELETE',
          user: session?.user?.email,
          oldValue: existing
       })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
