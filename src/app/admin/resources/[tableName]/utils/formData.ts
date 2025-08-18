import type { Json } from '../types'

export const normalize = (v: Json): Json =>
  typeof v === 'string'
    ? (/^\d+$/.test(v) ? Number(v) : v === 'true' ? true : v === 'false' ? false : v)
    : v

export const sanitize = (o: Record<string, Json>) =>
  Object.fromEntries(
    Object.entries(o)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, normalize(v)]),
  )

export const buildFD = (d: Record<string, Json>) => {
  const fd = new FormData()
  Object.entries(d).forEach(([k, v]) => {
    if (v instanceof File) fd.append(k, v)
    else if (v == null) { /* noop */ }
    else if (typeof v === 'object') fd.append(k, JSON.stringify(v))
    else fd.append(k, String(v))
  })
  return fd
}
