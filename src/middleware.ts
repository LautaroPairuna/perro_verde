// src/app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // Fallback: redirige cualquier petición al dominio mal escrito con "pets"
  if (host === 'www.perroverdepets.shop' || host === 'perroverdepets.shop') {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname, 'https://www.perroverdepet.shop')
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
