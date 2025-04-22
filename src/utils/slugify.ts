/**
 * Genera un slug amigable para URLs a partir de una cadena de texto.
 * Convierte a minúsculas, reemplaza espacios por guiones y elimina caracteres especiales.
 *
 * @param text - Texto a convertir en slug.
 * @returns Slug generado.
 */
export default function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios al inicio y al final
    .replace(/\s+/g, '-') // Reemplaza espacios (u otros separadores) por guiones
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos (excepto el guión)
    .replace(/\-\-+/g, '-'); // Reemplaza múltiples guiones por uno solo
}
