// src/lib/fileStore.ts
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import slugify from 'slugify'

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images')

/**
 * Guarda un Blob como imagen WebP en disk/images/<folder>,
 * genera también su miniatura en subcarpeta thumbs.
 * Devuelve el nombre de archivo generado.
 */
export async function saveImage(
  folder: string,
  file: Blob,
  titleHint: string
): Promise<string> {
  const dir       = path.join(PUBLIC_IMAGES, folder)
  const thumbsDir = path.join(dir, 'thumbs')
  await fs.mkdir(dir, { recursive: true })
  await fs.mkdir(thumbsDir, { recursive: true })

  const baseSlug = slugify(titleHint, { lower: true, strict: true })
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename  = `${baseSlug}-${timestamp}.webp`

  const buf = Buffer.from(await file.arrayBuffer())

  // guarda original
  const fullPath = path.join(dir, filename)
  await sharp(buf).webp().toFile(fullPath)

  // guarda thumbnail
  const thumbPath = path.join(thumbsDir, filename)
  await sharp(buf).resize(200).webp().toFile(thumbPath)

  return filename
}

/**
 * Elimina un archivo y su miniatura de folder/filename.
 */
export async function removeImage(
  folder: string,
  filename: string
): Promise<void> {
  const dir       = path.join(PUBLIC_IMAGES, folder)
  const thumbsDir = path.join(dir, 'thumbs')

  await fs.rm(path.join(dir, filename),      { force: true }).catch(() => {})
  await fs.rm(path.join(thumbsDir, filename),{ force: true }).catch(() => {})
}
