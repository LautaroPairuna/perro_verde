'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SuccessPageClient() {
  const params = useSearchParams();
  const orderId = params.get('order');
  const { data, error } = useSWR(
    orderId ? `/api/pedidos/${orderId}` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return <p className="text-red-600">Error al verificar pago.</p>;
  if (!data) return <p>Consultando estado del pago…</p>;

  return (
    <div className="p-6 text-center">
      {data.estado === 'approved' ? (
        <h1 className="text-green-600 text-2xl">
          ✅ Pago aprobado (Pedido #{data.id})
        </h1>
      ) : data.estado === 'pending' ? (
        <h1 className="text-yellow-600 text-2xl">⏳ Pago pendiente…</h1>
      ) : (
        <h1 className="text-red-600 text-2xl">
          ❌ Pago rechazado o expirado
        </h1>
      )}
    </div>
  );
}
