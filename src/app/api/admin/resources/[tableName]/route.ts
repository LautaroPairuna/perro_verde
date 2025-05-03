// src/app/api/admin/resources/[tableName]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }             from '@prisma/client'
import { saveImage }                from '@/lib/fileStore'

const prisma = new PrismaClient()

// Modelos Prisma mapeados por nombre de recurso
const models: Record<string, any> = {
  CfgMarcas:           prisma.cfgMarcas,
  CfgRubros:           prisma.cfgRubros,
  CfgFormasPagos:      prisma.cfgFormasPagos,
  CfgMonedas:          prisma.cfgMonedas,
  CfgSlider:           prisma.cfgSlider,
  Productos:           prisma.productos,
  ProductoFotos:       prisma.productoFotos,
  ProductoVersiones:   prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos:             prisma.pedidos,
}

// Carpeta en disco asociada a cada recurso
const folderNames: Record<string, string> = {
  CfgMarcas:           'marcas',
  CfgRubros:           'rubros',
  CfgFormasPagos:      'formas-pagos',
  CfgMonedas:          'monedas',
  CfgSlider:           'slider',
  Productos:           'productos',
  ProductoFotos:       'producto-fotos',
  ProductoVersiones:   'producto-versiones',
  ProductoEspecificaciones: 'producto-especificaciones',
  Pedidos:             'pedidos',
}

/**
 * GET /api/admin/resources/[tableName]
 * Devuelve todos los registros de la tabla.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const { tableName } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }
  try {
    const all = await model.findMany()
    return NextResponse.json(all)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
  }
}

/**
 * POST /api/admin/resources/[tableName]
 * Crea un registro. Si viene formData con campo "foto", guarda la imagen en disco.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const { tableName } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()

    // Extrae campos no-foto
    for (const [key, val] of form.entries()) {
      if (key !== 'foto') {
        data[key] = typeof val === 'string' ? val : val
      }
    }

    // Si viene archivo "foto"
    const file = form.get('foto')
    if (file instanceof Blob) {
      const folder = folderNames[tableName] || tableName.toLowerCase()
      const hint   = data.titulo ?? data.producto ?? tableName
      data.foto = await saveImage(folder, file, String(hint))
    }
  } else {
    data = await req.json()
  }

  try {
    const created = await model.create({ data })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 })
  }
}
