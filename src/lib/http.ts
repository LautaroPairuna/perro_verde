// src/lib/http.ts
import { NextResponse } from 'next/server';

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: baseHeaders() });
}

export function baseHeaders(extra?: Record<string, string>) {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Resource-Policy': 'same-origin',
    ...extra,
  };
}
