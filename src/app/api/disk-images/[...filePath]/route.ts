// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import prisma from '@/lib/prisma'

// Base de imágenes
const IMAGES_PATH = path.join(process.cwd(), 'public', 'images')

// Mapeo carpeta → tabla Prisma
const folderNames = {
  CfgMarcas:               'marcas',
  CfgRubros:               'rubros',
  CfgFormasPagos:          'formas-pagos',
  CfgMonedas:              'monedas',
  CfgSlider:               'slider',
  Productos:               'productos',
  ProductoFotos:           'producto-fotos',
  ProductoVersiones:       'producto-versiones',
  ProductoEspecificaciones:'producto-especificaciones',
  Pedidos:                 'pedidos',
} as const

type FolderKey = keyof typeof folderNames

// Map de modelos Prisma (usamos any para flexibilidad en los delegates)
const modelMap: Record<FolderKey, any> = {
  CfgMarcas:                prisma.cfgMarcas,
  CfgRubros:                prisma.cfgRubros,
  CfgFormasPagos:           prisma.cfgFormasPagos,
  CfgMonedas:               prisma.cfgMonedas,
  CfgSlider:                prisma.cfgSlider,
  Productos:                prisma.productos,
  ProductoFotos:            prisma.productoFotos,
  ProductoVersiones:        prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos:                  prisma.pedidos,
}

// Extensiones permitidas
const allowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'] as const

export async function GET(
  req: NextRequest,
  { params }: { params: { filePath: string[] } }
) {
  const parts = params.filePath
  if (!parts || parts.length < 2) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 })
  }

  const folder = parts[0] as FolderKey
  const fileName = parts[parts.length - 1]
  const relPath = path.posix.join(folder, ...parts.slice(1))

  // Verifica carpeta gestionada
  if (!(folder in folderNames)) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 })
  }

  // Verifica extensión
  const ext = path.extname(fileName).toLowerCase()
  if (!allowedExt.includes(ext as typeof allowedExt[number])) {
    return NextResponse.json({ error: 'Tipo de fichero no permitido' }, { status: 400 })
  }

  // Obtiene modelo y busca registro
  const model = modelMap[folder]
  const registro = await model.findFirst({
    where: { foto: fileName },
    select: { id: true },
  })
  if (!registro) {
    return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 })
  }

  // Verifica existencia en disco
  const absPath = path.join(IMAGES_PATH, relPath)
  try {
    await fs.access(absPath)
  } catch {
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 })
  }

  const fileBuffer = await fs.readFile(absPath)
  const contentType = mimeLookup(absPath) || 'application/octet-stream'

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Accept-Ranges': 'bytes',
    },
  })
}
