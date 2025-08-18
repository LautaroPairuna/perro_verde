// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const revalidate = 86400 // 24h

const BASE = 'https://www.perroverdepet.shop'
const HARD_LIMIT = 49000 // seguridad < 50k

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function xmlEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  const now = new Date()

  // Estáticas
  const staticEntries = [
    { loc: '/',         changefreq: 'daily',  priority: '1.0', lastmod: now },
    { loc: '/catalogo', changefreq: 'weekly', priority: '0.8', lastmod: now },
    { loc: '/carrito',  changefreq: 'weekly', priority: '0.5', lastmod: now },
  ]

  // Rubros (sin updated_at en tu schema)
  let rubrosEntries: Array<{loc:string; changefreq:string; priority:string; lastmod: Date}> = []
  try {
    const rubros = await prisma.cfgRubros.findMany({
      select: { rubro: true },
      orderBy: { rubro: 'asc' },
    })
    rubrosEntries = rubros.map(r => ({
      loc: `/catalogo/${slugify(r.rubro)}`,
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: now, // fallback al build
    }))
  } catch (e) {
    console.warn('No se pudieron leer rubros:', e)
  }

  // Productos (sin updated_at en tu schema)
  let productEntries: Array<{loc:string; changefreq:string; priority:string; lastmod: Date}> = []
  try {
    const products = await prisma.productos.findMany({
      select: { producto: true }, // agregá id si lo necesitás
      orderBy: { id: 'desc' },    // orden estable; quita si no te importa
      // take: 50000 // si tenés muchísimos, luego pasamos a sitemap index
    })
    productEntries = products.map(p => ({
      loc: `/detalle/${slugify(p.producto)}`, // confirmá que esta es tu ruta real
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: now, // fallback
    }))
  } catch (e) {
    console.warn('No se pudieron leer productos:', e)
  }

  // Ensamblado con límite de seguridad
  const all = [...staticEntries, ...rubrosEntries, ...productEntries]
  const limited = all.slice(0, HARD_LIMIT)

  const urlsXml = limited.map(u => `
  <url>
    <loc>${BASE}${xmlEscape(u.loc)}</loc>
    <lastmod>${u.lastmod.toISOString()}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
