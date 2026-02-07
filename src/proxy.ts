// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';

  if (host === 'www.perroverdepets.shop' || host === 'perroverdepets.shop') {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname, 'https://www.perroverdepet.shop')
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
