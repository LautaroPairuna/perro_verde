// src/app/robots.txt/route.ts
import { NextResponse } from 'next/server'

export const revalidate = 86400 // 24h

export async function GET() {
  const content = [
    'User-agent: *',
    'Disallow: /admin',
    'Disallow: /api',
    'Disallow: /checkout',
    'Disallow: /failure',
    'Disallow: /pending',
    'Disallow: /success',
    '',
    'Sitemap: https://www.perroverdepet.shop/sitemap.xml',
  ].join('\n')

  return new NextResponse(content + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache CDN/Edge (Next) + tolerancia
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
