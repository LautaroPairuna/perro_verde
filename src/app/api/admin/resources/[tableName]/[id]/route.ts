import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'

const prisma = new PrismaClient()

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  const d  = new Date()
  const YY = d.getFullYear()
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const DD = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${YY}${MM}${DD}-${hh}${mm}${ss}`
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function normalizeBooleans(obj: Record<string, any>) {
  for (const k of BOOLEAN_FIELDS) {
    if (k in obj) {
      const v = obj[k]
      obj[k] = v === true || v === 'true' || v === 1 || v === '1'
    }
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ tableName: string; id: string }> },
) {
  const { tableName, id } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId     = isNaN(+id) ? id : +id
  const existing  = await model.findUnique({ where: { id: keyId } })
  const ct        = request.headers.get('content-type') || ''

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let data: Record<string, any> = {}
  let file: File | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await request.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && v instanceof File) file = v
      else if (typeof v === 'string') data[k] = /^\d+$/.test(v) ? Number(v) : v
    }
    normalizeBooleans(data)

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const key     = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, key)
      const thumbs  = path.join(dir, 'thumbs')

      if (existing?.[FILE_FIELD]) {
        await fs.rm(path.join(dir,    existing[FILE_FIELD]),    { force: true }).catch(() => {})
        await fs.rm(path.join(thumbs, existing[FILE_FIELD]), { force: true }).catch(() => {})
      }

      await fs.mkdir(dir,    { recursive: true })
      await fs.mkdir(thumbs, { recursive: true })

      const baseSlug = slugify(String(data.titulo ?? data.producto), { lower: true, strict: true })
      const name     = `${baseSlug}-${makeTimestamp()}.webp`
      const buf      = Buffer.from(await file.arrayBuffer())

      await sharp(buf).webp().toFile(path.join(dir, name))
      await sharp(buf).resize(200).webp().toFile(path.join(thumbs, name))
      data[FILE_FIELD] = name
    }
  } else {
    data = await request.json()
    normalizeBooleans(data)
  }

  try {
    return NextResponse.json(await model.update({ where: { id: keyId }, data }))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar registro' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ tableName: string; id: string }> },
) {
  const { tableName, id } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId    = isNaN(+id) ? id : +id
  const existing = await model.findUnique({ where: { id: keyId } })

  if (existing?.[FILE_FIELD]) {
    const baseDir = path.join(process.cwd(), 'public', 'images')
    const key     = folderNames[tableName] || tableName.toLowerCase()
    const dir     = path.join(baseDir, key)
    const thumbs  = path.join(dir, 'thumbs')
    await fs.rm(path.join(dir,    existing[FILE_FIELD]),    { force: true }).catch(() => {})
    await fs.rm(path.join(thumbs, existing[FILE_FIELD]), { force: true }).catch(() => {})
  }

  try {
    await model.delete({ where: { id: keyId } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
