import type { Metadata } from 'next'
import ResourceDetailClient from './ResourceDetailClient'

/** Humaniza nombres: quita 'Cfg', separa camelCase/underscores y capitaliza */
const humanize = (s: string) =>
  s
    .replace(/^Cfg/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())

type Params = { tableName: string }

/** Título base por recurso (ej: CfgMarcas → Admin · Marcas) */
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const baseLabel = humanize(params.tableName)
  return { title: `Admin · Gestion de ${baseLabel}` }
}

export default function Page({ params }: { params: Params }) {
  return <ResourceDetailClient tableName={params.tableName} />
}
