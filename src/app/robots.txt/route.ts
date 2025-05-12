// src/app/robots.txt/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const content = `
User-agent: *
Disallow: /admin
Disallow: /api
Disallow: /checkout
Disallow: /failure
Disallow: /pending
Disallow: /success

Sitemap: https://www.perroverdepet.shop/sitemap.xml
`.trim()

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
