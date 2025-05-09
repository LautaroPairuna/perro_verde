// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { lookup as mimeLookup } from 'mime-types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Base de imágenes
const IMAGES_PATH = path.join(process.cwd(), 'public', 'images');

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
} as const;

const tableForFolder = Object.fromEntries(
  Object.entries(folderNames).map(([tbl, folder]) => [folder, tbl])
) as Record<string, keyof typeof folderNames>;

// Map de modelos Prisma (casteado a any para flexibilidad)
const modelMap = {
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
} as const;
type ModelName = keyof typeof modelMap;

// Extensiones permitidas
const allowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filePath: string[] }> }
) {
  const { filePath: parts } = await context.params;
  if (parts.length < 2) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 });
  }

  const folder   = parts[0];
  const rest     = parts.slice(1);
  const fileName = rest.at(-1)!;
  const relPath  = path.posix.join(folder, ...rest);

  const tableName = tableForFolder[folder];
  if (!tableName) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 });
  }

  const ext = path.extname(fileName).toLowerCase();
  if (!allowedExt.includes(ext)) {
    return NextResponse.json({ error: 'Tipo de fichero no permitido' }, { status: 400 });
  }

  const model = modelMap[tableName as ModelName] as any;
  const registro = await model.findFirst({
    where: { foto: fileName },
    select: { id: true },
  });
  if (!registro) {
    return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 });
  }

  const absPath = path.join(IMAGES_PATH, relPath);
  try {
    await fs.access(absPath);
  } catch {
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 });
  }

  // Lectura en Buffer para compatibilidad TS
  const fileBuffer = await fs.readFile(absPath);
  const contentType = mimeLookup(absPath) || 'application/octet-stream';
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Accept-Ranges': 'bytes',
    },
  });
}
