// src/app/api/disk-images/[...filePath]/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { filePath: string[] } }
) {
  const relPath = params.filePath.join('/')
  // ① Comprueba que haya un registro en la BD con ese nombre de archivo
  const exists = await prisma.$queryRaw`
    SELECT 1 FROM Slider WHERE foto = ${relPath} LIMIT 1
  `
  if (!exists) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const absPath = path.join(process.cwd(), 'public', 'images', relPath)

  try {
    const fileBuffer = await fs.readFile(absPath)
    const contentType = mimeLookup(absPath) || 'application/octet-stream'
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: { 'Content-Type': contentType },
    })
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }
}
