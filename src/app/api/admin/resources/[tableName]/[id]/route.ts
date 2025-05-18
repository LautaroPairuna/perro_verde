//src/app/api/admin/resources/[tableName]/[id]/route.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'
import { folderNames } from '@/lib/adminConstants'

const prisma = new PrismaClient()

const models: Record<string, any> = {
  CfgMarcas:            prisma.cfgMarcas,
  CfgRubros:            prisma.cfgRubros,
  CfgFormasPagos:       prisma.cfgFormasPagos,
  CfgMonedas:           prisma.cfgMonedas,
  CfgSlider:            prisma.cfgSlider,
  Productos:            prisma.productos,
  ProductoFotos:        prisma.productoFotos,
  ProductoVersiones:    prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos:              prisma.pedidos,
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
      obj[key] = v === true ||
                 v === 'true' ||
                 v === '1'  ||
                 v === 1
    }
  }
}

function makeTimestamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth()+1) +
    pad(d.getDate()) +
    '-' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
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
  const model             = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const key      = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: key } })
  const ct       = req.headers.get('content-type') || ''

  let data: Record<string, any> = {}
  let file: Blob | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && isFileLike(v)) {
        file = v
        continue
      } else if (typeof v === 'string') {
        data[k] = /^\d+$/.test(v) ? Number(v) : v
        continue
      }
    }
    normalizeBooleans(data)

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const keyDir  = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, keyDir)
      const thumbs  = path.join(dir, 'thumbs')

      if (existing?.[FILE_FIELD]) {
        await fs.rm(path.join(dir, existing[FILE_FIELD]), { force: true }).catch(()=>{})
        await fs.rm(path.join(thumbs, existing[FILE_FIELD]), { force: true }).catch(()=>{})
      }

      await fs.mkdir(dir,    { recursive: true })
      await fs.mkdir(thumbs, { recursive: true })

      const hint = data.titulo ?? data.producto ?? tableName
      const slug = slugify(String(hint), { lower: true, strict: true })
      const name = `${slug}-${makeTimestamp()}.webp`
      const buf  = Buffer.from(await file.arrayBuffer())

      const fullPath = path.join(dir, name)
      await sharp(buf).webp().toFile(fullPath)
      console.log('[upload] Updated original:', fullPath)

      const thumbPath = path.join(thumbs, name)
      await sharp(buf).resize(200).webp().toFile(thumbPath)
      console.log('[upload] Updated thumbnail:', thumbPath)

      data.foto = name
    }
  } else {
    data = await req.json()
    for (const k in data) {
      if (typeof data[k] === 'string' && /^\d+$/.test(data[k])) {
        data[k] = Number(data[k])
      }
    }
    normalizeBooleans(data)
  }

  try {
    const updated = await model.update({ where: { id: key }, data })
    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar registro' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model             = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const key      = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: key } })

  if (existing?.[FILE_FIELD]) {
    const baseDir = path.join(process.cwd(), 'public', 'images')
    const keyDir  = folderNames[tableName] || tableName.toLowerCase()
    const dir     = path.join(baseDir, keyDir)
    const thumbs  = path.join(dir, 'thumbs')
    await fs.rm(path.join(dir, existing[FILE_FIELD]), { force: true }).catch(()=>{})
    await fs.rm(path.join(thumbs, existing[FILE_FIELD]), { force: true }).catch(()=>{})
  }

  try {
    await model.delete({ where: { id: key } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
