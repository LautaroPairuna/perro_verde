// src/app/api/admin/resources/[tableName]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient }             from '@prisma/client'
import { saveImage, removeImage }   from '@/lib/fileStore'

const prisma = new PrismaClient()

// También aquí usamos `any` para PrismaDelegate
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

export async function GET(
  _req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const m = models[tableName]
  if (!m) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }
  const rec = await m.findUnique({ where: { id: Number(id) } })
  if (!rec) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }
  return NextResponse.json(rec)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tableName: string; id: string } }
) {
  const { tableName, id } = params
  const m = models[tableName]
  if (!m) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId   = Number(id)
  const existing = await m.findUnique({ where: { id: keyId } })
  if (!existing) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (k !== 'foto') data[k] = typeof v === 'string' ? v : v
    }
    const file = form.get('foto')
    if (file instanceof Blob) {
      const folder = folderNames[tableName] || tableName.toLowerCase()
      if (existing.foto) {
        await removeImage(folder, existing.foto)
      }
      const hint = data.titulo ?? data.producto ?? String(keyId)
      data.foto = await saveImage(folder, file, String(hint))
    }
  } else {
    data = await req.json()
  }

  try {
    const updated = await m.update({ where: { id: keyId }, data })
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
  const m = models[tableName]
  if (!m) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const keyId    = Number(id)
  const existing = await m.findUnique({ where: { id: keyId } })
  if (!existing) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  if (existing.foto) {
    const folder = folderNames[tableName] || tableName.toLowerCase()
    await removeImage(folder, existing.foto)
  }

  try {
    await m.delete({ where: { id: keyId } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 })
  }
}
