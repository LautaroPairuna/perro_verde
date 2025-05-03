// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mismo mapping que en tus routes de admin:
const folderNames: Record<string, string> = {
  CfgMarcas:              'marcas',
  CfgRubros:              'rubros',
  CfgFormasPagos:         'formas-pagos',
  CfgMonedas:             'monedas',
  CfgSlider:              'slider',
  Productos:              'productos',
  ProductoFotos:          'producto-fotos',
  ProductoVersiones:      'producto-versiones',
  ProductoEspecificaciones:'producto-especificaciones',
  Pedidos:                'pedidos',
}

// Invertimos el map para pasar de carpeta → tabla Prisma
const tableForFolder = Object.fromEntries(
  Object.entries(folderNames).map(([table, folder]) => [folder, table])
) as Record<string, string>

export async function GET(
  req: NextRequest,
  { params }: { params: { filePath: string[] } }
) {
  const parts = params.filePath
  if (parts.length < 2) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 })
  }

  // p.ej. ['slider','thumbs','slider-1-20250503-011156.webp'] 
  // o    ['slider','slider-1-20250503-011156.webp']
  const folder = parts[0]                // 'slider'
  const rest   = parts.slice(1)         // ['thumbs', '...'] o ['nombre.webp']
  const fileName = rest[rest.length - 1]// el nombre del fichero
  const relPath = path.posix.join(folder, ...rest)

  // 1) ¿Tenemos tabla para esa carpeta?
  const tableName = tableForFolder[folder]
  if (!tableName) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 })
  }

  // 2) ¿Existe un registro en BD con foto = fileName?
  //    Asumimos que todas esas tablas tienen un campo `foto`
  const model: any = (prisma as any)[
    // PrismaClient instance tiene propiedades prisma.cfgSlider, prisma.productos, etc.
    tableName.charAt(0).toLowerCase() + tableName.slice(1)
  ]
  if (typeof model?.findFirst !== 'function') {
    // fallback: mapeo directo
    return NextResponse.json({ error: 'Recurso no disponible' }, { status: 404 })
  }

  const registro = await model.findFirst({
    where: { foto: fileName },
    select: { id: true },
  })
  if (!registro) {
    return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 })
  }

  // 3) Leemos el fichero de disco
  const absPath = path.join(process.cwd(), 'public', 'images', relPath)
  try {
    const fileBuffer = await fs.readFile(absPath)
    const contentType = mimeLookup(absPath) || 'application/octet-stream'
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600', // opcional
      },
    })
  } catch (e) {
    console.error('No se encontró el fichero:', absPath, e)
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 })
  }
}
