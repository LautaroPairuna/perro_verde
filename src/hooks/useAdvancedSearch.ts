// src/hooks/useAdvancedSearch.ts
export interface SearchForm {
  keywords: string
  marca: string
  categoria: string
}

export function buildSearchPath(form: SearchForm): string {
  let path = '/catalogo'

  const kw = form.keywords.trim()
  if (kw) {
    const slug = kw.replace(/\s+/g, '-')
    path += `/keys-${encodeURIComponent(slug)}`
  }
  if (form.marca) {
    path += `/marca-${encodeURIComponent(form.marca)}`
  }
  if (form.categoria) {
    path += `/categoria-${encodeURIComponent(form.categoria)}`
  }

  return path + '/pagina-1'
}
