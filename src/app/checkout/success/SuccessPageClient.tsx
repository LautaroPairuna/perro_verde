'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then(r => r.json())

export default function SuccessPageClient() {
  const params = useSearchParams()
  const orderId = params?.get('order')

  const { data, error, isLoading } = useSWR(
    orderId ? `/api/pedidos/${orderId}` : null,
    fetcher,
    {
      refreshInterval: 5_000,
      revalidateOnFocus: true,
      dedupingInterval: 2_500,
    }
  )

  if (!orderId) {
    return (
      <div className="p-6 text-center">
        <p>Falta el parámetro <code>order</code>.</p>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600 text-center p-6">Error al verificar el pago.</p>
  }

  if (isLoading || !data) {
    return <p className="text-center p-6">Consultando estado del pago…</p>
  }

  return (
    <div className="p-6 text-center">
      {data.estado === 'approved' ? (
        <>
          <h1 className="text-green-600 text-2xl">✅ Pago aprobado (Pedido #{data.id})</h1>
          <p className="mt-2">Te enviamos un correo con el comprobante.</p>
        </>
      ) : data.estado === 'pending' ? (
        <>
          <h1 className="text-yellow-600 text-2xl">⏳ Pago pendiente…</h1>
          <p className="mt-2">Actualizaremos esta pantalla automáticamente.</p>
        </>
      ) : (
        <>
          <h1 className="text-red-600 text-2xl">❌ Pago rechazado o expirado</h1>
          <p className="mt-2">Probá nuevamente o elegí otro método.</p>
        </>
      )}
    </div>
  )
}
