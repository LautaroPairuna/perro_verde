// src/app/sitemap.xml/route.ts
export const dynamic   = 'force-dynamic'
export const revalidate = 86400    // regenera cada 24 h

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET() {
  const baseUrl = 'https://www.perroverdepet.shop'

  // rutas estáticas
  const staticPaths = ['', '/catalogo', '/carrito']

  // rutas por rubro
  let filterPaths: string[] = []
  try {
    const rubros = await prisma.cfgRubros.findMany({ select: { rubro: true } })
    filterPaths = rubros.map(r => `/catalogo/${slugify(r.rubro)}`)
  } catch (e) {
    console.warn('No se pudieron leer rubros:', e)
  }

  // rutas por producto
  let productPaths: string[] = []
  try {
    const products = await prisma.productos.findMany({ select: { producto: true } })
    productPaths = products.map(p => `/detalle/${slugify(p.producto)}`)
  } catch (e) {
    console.warn('No se pudieron leer productos:', e)
  }

  const allPaths = [...staticPaths, ...filterPaths, ...productPaths]
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
