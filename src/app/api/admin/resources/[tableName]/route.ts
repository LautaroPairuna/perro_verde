/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }              from '@prisma/client'
import fs                            from 'fs/promises'
import path                          from 'path'
import slugify                       from 'slugify'
import sharp                         from 'sharp'

const prisma = new PrismaClient()

// Delegados de Prisma (any para no pelearse con signatures)
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

const FILE_FIELD = 'foto'

// Detecta cualquier Blob (File en el cliente o Blob en el server)
function isFileLike(v: unknown): v is Blob {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as Blob).arrayBuffer === 'function'
  )
}

// Genera timestamp para el nombre de archivo
function makeTimestamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    d.getFullYear(),
    pad(d.getMonth()+1),
    pad(d.getDate()),
  ].join('') + '-' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
}

// GET: listado completo
export async function GET(
  _req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const model = models[params.tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${params.tableName}” no existe` }, { status: 404 })
  }
  try {
    const all = await model.findMany()
    return NextResponse.json(all)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
  }
}

// POST: creación + subida de imagen
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
  let file: Blob | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && isFileLike(v)) {
        file = v
      } else if (typeof v === 'string') {
        // convierte cadenas numéricas a number
        data[k] = /^\d+$/.test(v) ? Number(v) : v
      }
    }
    // No enviar nunca el ID (autoincremental)
    delete data.id

    if (file) {
      const baseDir = path.join(process.cwd(), 'public', 'images')
      const key     = folderNames[tableName] || tableName.toLowerCase()
      const dir     = path.join(baseDir, key)
      const thumbs  = path.join(dir, 'thumbs')

      await fs.mkdir(dir,    { recursive: true })
      await fs.mkdir(thumbs, { recursive: true })

      // nombre basado en un campo descriptivo
      const hint = data.titulo ?? data.producto ?? tableName
      const slug = slugify(String(hint), { lower: true, strict: true })
      const name = `${slug}-${makeTimestamp()}.webp`
      const buf  = Buffer.from(await file.arrayBuffer())

      // guardamos original
      const fullPath  = path.join(dir, name)
      await sharp(buf).webp().toFile(fullPath)
      console.log('[upload] Saved original:', fullPath)

      // guardamos thumbnail
      const thumbPath = path.join(thumbs, name)
      await sharp(buf).resize(200).webp().toFile(thumbPath)
      console.log('[upload] Saved thumbnail:', thumbPath)

      data.foto = name
    }
  } else {
    data = await req.json()
    // elimina id si vino en JSON
    delete data.id
    // convierte cadenas numéricas
    for (const k in data) {
      if (typeof data[k] === 'string' && /^\d+$/.test(data[k])) {
        data[k] = Number(data[k])
      }
    }
  }

  try {
    const created = await model.create({ data })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 })
  }
}
