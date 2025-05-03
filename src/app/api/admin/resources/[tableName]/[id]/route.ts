// src/app/api/admin/resources/[tableName]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }             from '@prisma/client'
import { saveImage, removeImage }   from '@/lib/fileStore'

const prisma = new PrismaClient()

// Modelos Prisma
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

// Carpeta disco por recurso
const folderNames: Record<string,string> = {
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
 * GET /api/admin/resources/[tableName]/[id]
 * Devuelve un registro por ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }
  const record = await model.findUnique({ where: { id: Number(id) } })
  if (!record) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }
  return NextResponse.json(record)
}

/**
 * PUT /api/admin/resources/[tableName]/[id]
 * Actualiza un registro. Si viene formData con "foto", reemplaza archivo.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId   = Number(id)
  const existing = await model.findUnique({ where: { id: keyId } })
  if (!existing) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()

    // Extrae campos
    for (const [key, val] of form.entries()) {
      if (key !== 'foto') {
        data[key] = typeof val === 'string' ? val : val
      }
    }

    // Si viene nueva foto: borra la anterior y guarda la nueva
    const file = form.get('foto')
    if (file instanceof Blob) {
      const folder = folderNames[tableName] || tableName.toLowerCase()
      if (existing.foto) {
        await removeImage(folder, existing.foto)
      }
      const hint = data.titulo ?? data.producto ?? String(existing.id)
      data.foto = await saveImage(folder, file, String(hint))
    }
  } else {
    data = await req.json()
  }

  try {
    const updated = await model.update({ where: { id: keyId }, data })
    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar registro' }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/resources/[tableName]/[id]
 * Elimina un registro y su imagen si existe.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId    = Number(id)
  const existing = await model.findUnique({ where: { id: keyId } })
  if (!existing) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  if (existing.foto) {
    const folder = folderNames[tableName] || tableName.toLowerCase()
    await removeImage(folder, existing.foto)
  }

  try {
    await model.delete({ where: { id: keyId } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
