
import React from 'react'
import { CreditCard } from 'lucide-react'

interface EarningsCardProps {
  total: number
  count: number
}

export default function EarningsCard({ total, count }: EarningsCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-4 mb-6">
      <div className="p-3 bg-green-50 text-green-600 rounded-full">
        <CreditCard size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">Ganancias de la semana</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-gray-900">
            ${Number(total).toLocaleString('es-AR')}
          </h3>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
            {count} pedidos
          </span>
        </div>
      </div>
    </div>
  )
}
