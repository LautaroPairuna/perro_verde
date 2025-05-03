// src/app/api/disk-images/[...filePath]/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'

export async function GET(
  _req: Request,
  { params }: { params: { filePath: string[] } }
) {
  const relPath = params.filePath.join('/')
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
