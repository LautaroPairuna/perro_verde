// src/app/api/disk-images/[...filePath]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { lookup as mimeLookup } from 'mime-types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const folderNames: Record<string, string> = {
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
};

// Invertimos el map para carpeta → tabla
const tableForFolder = Object.fromEntries(
  Object.entries(folderNames).map(([tbl, folder]) => [folder, tbl])
) as Record<string, string>;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filePath: string[] }> }
) {
  // 1) Esperamos params antes de usarlo
  const { filePath: parts } = await context.params;

  if (parts.length < 2) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 });
  }

  const folder   = parts[0];
  const rest     = parts.slice(1);
  const fileName = rest[rest.length - 1];
  const relPath  = path.posix.join(folder, ...rest);

  // 2) Validamos carpeta
  const tableName = tableForFolder[folder];
  if (!tableName) {
    return NextResponse.json({ error: 'Carpeta no gestionada' }, { status: 404 });
  }

  // 3) Validamos registro en BD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = (prisma as any)[
    tableName.charAt(0).toLowerCase() + tableName.slice(1)
  ];
  if (typeof model?.findFirst !== 'function') {
    return NextResponse.json({ error: 'Recurso no disponible' }, { status: 404 });
  }
  const registro = await model.findFirst({
    where: { foto: fileName },
    select: { id: true },
  });
  if (!registro) {
    return NextResponse.json({ error: 'Imagen no registrada en BD' }, { status: 404 });
  }

  // 4) Construimos ruta absoluta y comprobamos existencia
  const absPath = path.join(process.cwd(), 'public', 'images', relPath);
  try {
    await fs.access(absPath);
  } catch {
    // 5) Si no existe, devolvemos 404 sin crashear ni loggear el error completo
    return NextResponse.json({ error: 'Fichero no encontrado' }, { status: 404 });
  }

  // 6) Leemos y servimos la imagen
  const fileBuffer = await fs.readFile(absPath);
  const contentType = mimeLookup(absPath) || 'application/octet-stream';
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
