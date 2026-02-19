import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import slugify from 'slugify'
import { folderNames } from '@/lib/adminConstants'

const BASE_DIR = path.join(process.cwd(), 'public', 'images')
export const MAX_IMAGE_SIZE_MB = 50 // 50MB límite

/**
 * Genera un timestamp para el nombre del archivo
 */
function makeTimestamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    '-' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

/**
 * Obtiene la ruta del directorio para un recurso dado
 */
function getResourceDir(resourceName: string) {
  const key = folderNames[resourceName] || resourceName.toLowerCase()
  return path.join(BASE_DIR, key)
}

/**
 * Servicio para gestión de imágenes
 */
export const ImageService = {
  /**
   * Guarda una imagen, generando miniaturas y eliminando la anterior si existe
   * @param file Archivo a guardar
   * @param resourceName Nombre del recurso (ej: Productos)
   * @param hint Texto base para el nombre del archivo (ej: titulo del producto)
   * @param oldFileName Nombre del archivo anterior para eliminarlo (opcional)
   * @returns Nombre del archivo generado
   */
  async save(
    file: File | Blob,
    resourceName: string,
    hint: string = 'image',
    oldFileName?: string | null
  ): Promise<string> {
    // Validaciones básicas
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      throw new Error(`La imagen excede el tamaño máximo permitido de ${MAX_IMAGE_SIZE_MB}MB`)
    }
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen válida')
    }

    const dir = getResourceDir(resourceName)
    const thumbsDir = path.join(dir, 'thumbs')

    // Asegurar directorios
    await fs.mkdir(dir, { recursive: true })
    await fs.mkdir(thumbsDir, { recursive: true })

    // Eliminar archivo anterior si existe
    if (oldFileName) {
      await this.delete(oldFileName, resourceName)
    }

    // Generar nuevo nombre
    const slug = slugify(hint, { lower: true, strict: true }) || 'image'
    const fileName = `${slug}-${makeTimestamp()}.webp`
    const filePath = path.join(dir, fileName)
    const thumbPath = path.join(thumbsDir, fileName)

    // Procesar imagen
    const buffer = Buffer.from(await file.arrayBuffer())

    // Guardar original optimizada (WebP, calidad 80)
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(filePath)

    // Guardar miniatura (200px width, WebP)
    await sharp(buffer)
      .resize(200, null, { withoutEnlargement: true }) // Mantiene aspect ratio, no agranda si es pequeña
      .webp({ quality: 80 })
      .toFile(thumbPath)

    return fileName
  },

  /**
   * Elimina una imagen y su miniatura
   * @param fileName Nombre del archivo
   * @param resourceName Nombre del recurso
   */
  async delete(fileName: string, resourceName: string): Promise<void> {
    if (!fileName) return

    const dir = getResourceDir(resourceName)
    const thumbsDir = path.join(dir, 'thumbs')

    const tasks = [
      fs.unlink(path.join(dir, fileName)).catch(() => {}),       // Ignorar error si no existe
      fs.unlink(path.join(thumbsDir, fileName)).catch(() => {})
    ]

    await Promise.all(tasks)
  }
}
