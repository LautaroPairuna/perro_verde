// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

// Base de imágenes
const IMAGES_PATH = path.join(process.cwd(), 'public', 'images')

// Carpeta → nombre de tabla en BD
const folderNames = {
  CfgMarcas:               'cfg_marcas',
  CfgRubros:               'cfg_rubros',
  CfgFormasPagos:          'cfg_formas_pagos',
  CfgMonedas:              'cfg_monedas',
  CfgSlider:               'cfg_slider',
  Productos:               'productos',
  ProductoFotos:           'producto_fotos',
  ProductoVersiones:       'producto_versiones',
  ProductoEspecificaciones:'producto_especificaciones',
  Pedidos:                 'pedidos',
} as const
type FolderKey = keyof typeof folderNames

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

  // 1) Carpeta válida
  if (!(folder in folderNames)) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 })
  }

  // 2) Extensión permitida
  const ext = path.extname(fileName).toLowerCase()
  if (!allowedExt.includes(ext as typeof allowedExt[number])) {
    return NextResponse.json({ error: 'Tipo de fichero no permitido' }, { status: 400 })
  }

  // 3) Buscamos el registro con raw SQL
  const tableName = folderNames[folder]
  const registros = await prisma.$queryRaw<
    { id: number }[]
  >(Prisma.sql`
    SELECT id
      FROM ${Prisma.raw(tableName)}
     WHERE foto = ${fileName}
     LIMIT 1
  `)

  if (registros.length === 0) {
    return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 })
  }

  // 4) Comprobamos archivo en disco
  const absPath = path.join(IMAGES_PATH, relPath)
  try {
    await fs.access(absPath)
  } catch {
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 })
  }

  // 5) Leemos y devolvemos
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
