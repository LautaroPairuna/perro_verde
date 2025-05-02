// src/app/api/admin/resources/[tableName]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }            from '@prisma/client'
import fs                          from 'fs/promises'
import path                        from 'path'
import slugify                     from 'slugify'
import sharp                       from 'sharp'

const prisma = new PrismaClient()
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

const folderNames: Record<string,string> = {
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
  const MM   = String(d.getMonth()+1).padStart(2,'0')
  const DD   = String(d.getDate()).padStart(2,'0')
  const hh   = String(d.getHours()).padStart(2,'0')
  const mm2  = String(d.getMinutes()).padStart(2,'0')
  const ss   = String(d.getSeconds()).padStart(2,'0')
  return `${YYYY}${MM}${DD}-${hh}${mm2}${ss}`
}

function normalizeBooleans(obj: Record<string, any>) {
  for (const k of BOOLEAN_FIELDS) {
    if (k in obj) {
      const v = obj[k]
      obj[k] = v === true || v === 'true' || v === 1 || v === '1'
    }
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ tableName: string }> }) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  try {
    return NextResponse.json(await model.findMany())
  } catch {
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ tableName: string }> }) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })

  const ct   = request.headers.get('content-type') || ''
  let data   = {} as Record<string, any>
  let file: File | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await request.formData()
    for (const [key, val] of form.entries()) {
      if (key === FILE_FIELD && val instanceof File) file = val
      else if (typeof val === 'string') data[key] = /^\d+$/.test(val) ? Number(val) : val
    }
    normalizeBooleans(data)

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const key     = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, key)
      const thumbs  = path.join(dir, 'thumbs')
      await fs.mkdir(dir, { recursive: true })
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
    return NextResponse.json(await model.create({ data }), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 })
  }
}
