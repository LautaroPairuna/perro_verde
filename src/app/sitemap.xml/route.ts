// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Función simple para slugify
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFKD')              // descompone acentos
    .replace(/[\u0300-\u036F]/g, '') // quita acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')    // reemplaza no-alfa por guión
    .replace(/^-+|-+$/g, '')        // quita guiones al inicio o final
}

export async function GET() {
  const baseUrl = 'https://www.perroverdepet.shop'

  // 1) Rutas estáticas
  const staticPaths = [
    '',            // /
    '/catalogo',
    '/carrito',
  ]

  // 2) Rutas de filtros: tomamos los 'rubro' de CfgRubros
  const rubros = await prisma.cfgRubros.findMany({ select: { rubro: true } })
  const filterPaths = rubros.map(r =>
    `/catalogo/${slugify(r.rubro)}`
  )

  // 3) Rutas de detalle de producto: convertimos el campo 'producto' en slug
  const products = await prisma.productos.findMany({ select: { producto: true } })
  const productPaths = products.map(p =>
    `/detalle/${slugify(p.producto)}`
  )

  // Combina todas las rutas
  const allPaths = [
    ...staticPaths,
    ...filterPaths,
    ...productPaths,
  ]

  // Genera el XML
  const urls = allPaths.map(path => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
