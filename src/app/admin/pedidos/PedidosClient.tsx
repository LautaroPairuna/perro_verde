'use client'

import React, { useState, useEffect } from 'react'
import { useServerTable } from '../resources/[tableName]/hooks/useServerTable'
import { 
  Loader2, Search, Filter, ChevronDown, ChevronUp, 
  Package, Calendar, User, CheckCircle2, 
  XCircle, Clock, Truck, MoreVertical, Eye, Pencil, Save, X
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'

// --- Types ---
type OrderItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type Pedido = {
  id: number
  createdAt: string
  updatedAt: string
  estado: string
  total: number | string
  metodo_pago: string
  comprador_nombre: string
  comprador_email: string
  comprador_telefono?: string
  direccion_envio?: string
  datos: OrderItem[]
  transferencia_ref?: string
  mp_payment_id?: string
}

type EstadoConfig = {
  id: string
  descripcion: string
  color: string
  orden: number
}

// --- Components ---

const StatusBadge = ({ status, config }: { status: string, config?: EstadoConfig[] }) => {
  // Fallback styles
  const defaultStyles: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved:  'bg-green-100 text-green-800 border-green-200',
    pagado:    'bg-green-100 text-green-800 border-green-200',
    rejected:  'bg-red-100 text-red-800 border-red-200',
    cancelado: 'bg-red-100 text-red-800 border-red-200',
    enviado:   'bg-blue-100 text-blue-800 border-blue-200',
    entregado: 'bg-purple-100 text-purple-800 border-purple-200',
  }

  const estadoCfg = config?.find(e => e.id === status)
  const style = estadoCfg?.color || defaultStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  
  const label = estadoCfg?.descripcion || (status === 'approved' ? 'Aprobado' : 
                status === 'pending' ? 'Pendiente' : 
                status === 'rejected' ? 'Rechazado' :
                status.charAt(0).toUpperCase() + status.slice(1));

  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 w-fit", style)}>
      {['approved', 'pagado', 'entregado'].includes(status) ? <CheckCircle2 size={12} /> :
       ['rejected', 'cancelado'].includes(status) ? <XCircle size={12} /> :
       status === 'enviado' ? <Truck size={12} /> :
       <Clock size={12} />}
      {label}
    </span>
  )
}

const OrderCard = ({ pedido, onClick, estados }: { pedido: Pedido; onClick: () => void; estados: EstadoConfig[] }) => {
  const itemCount = Array.isArray(pedido.datos) 
    ? pedido.datos.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0)
    : 0;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer group overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg">#{pedido.id}</span>
            <StatusBadge status={pedido.estado} config={estados} />
          </div>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Calendar size={12} />
            {format(new Date(pedido.createdAt), "d 'de' MMMM, HH:mm", { locale: es })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900 text-lg">
            ${Number(pedido.total).toLocaleString('es-AR')}
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            {pedido.metodo_pago}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* User Info */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-full shrink-0">
            <User size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{pedido.comprador_nombre}</p>
            <p className="text-xs text-gray-500 truncate">{pedido.comprador_email}</p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="flex items-start gap-3">
          <div className="bg-orange-50 text-orange-600 p-2 rounded-full shrink-0">
            <Truck size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-700 line-clamp-2">
              {pedido.direccion_envio || 'Retiro en local / Sin dirección'}
            </p>
          </div>
        </div>

        {/* Items Preview */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-2">
          <Package size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {itemCount} producto{itemCount !== 1 ? 's' : ''}
          </span>
          {Array.isArray(pedido.datos) && pedido.datos.length > 0 && (
            <span className="text-xs text-gray-400 truncate max-w-[150px]">
              • {pedido.datos[0].name} {pedido.datos.length > 1 ? `+${pedido.datos.length - 1} más` : ''}
            </span>
          )}
        </div>
      </div>
      
      {/* Footer / Hover Action */}
      <div className="bg-gray-50 p-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium text-green-700 flex items-center gap-1">
          <Eye size={14} /> Ver detalles
        </span>
      </div>
    </div>
  )
}

const OrderDetailModal = ({ pedido, onClose, onUpdate, estados }: { pedido: Pedido; onClose: () => void; onUpdate: (p: Pedido) => void; estados: EstadoConfig[] }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newStatus, setNewStatus] = useState(pedido.estado)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    setNewStatus(pedido.estado)
  }, [pedido.estado])

  if (!pedido) return null;

  const handleStatusUpdate = async () => {
    if (newStatus === pedido.estado) {
      setIsEditing(false)
      return
    }

    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/resources/Pedidos/${pedido.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al actualizar')
      }

      const updated = await res.json()
      toast.success('Estado actualizado')
      onUpdate(updated)
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar estado')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pedido #{pedido.id}</h2>
            <p className="text-sm text-gray-500">
              Realizado el {format(new Date(pedido.createdAt), "dd/MM/yyyy 'a las' HH:mm", { locale: es })}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <XCircle size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Estado del Pedido</p>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <select 
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="text-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 p-1.5 border"
                      disabled={updating}
                    >
                      {estados.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.descripcion}</option>
                      ))}
                    </select>
                    <button 
                      onClick={handleStatusUpdate}
                      disabled={updating}
                      className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    </button>
                    <button 
                      onClick={() => { setIsEditing(false); setNewStatus(pedido.estado); }}
                      disabled={updating}
                      className="p-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <StatusBadge status={pedido.estado} config={estados} />
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      title="Editar estado"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
               <p className="text-sm text-gray-500 mb-1">Total</p>
               <p className="text-2xl font-bold text-gray-900">${Number(pedido.total).toLocaleString('es-AR')}</p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <User size={16} /> Cliente
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                <p><span className="font-medium text-gray-700">Nombre:</span> {pedido.comprador_nombre}</p>
                <p><span className="font-medium text-gray-700">Email:</span> {pedido.comprador_email}</p>
                <p><span className="font-medium text-gray-700">Teléfono:</span> {pedido.comprador_telefono || '-'}</p>
              </div>
            </div>

            {/* Shipping/Payment Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Truck size={16} /> Envío y Pago
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                <p><span className="font-medium text-gray-700">Método:</span> {pedido.metodo_pago}</p>
                <p><span className="font-medium text-gray-700">Dirección:</span> {pedido.direccion_envio || '-'}</p>
                {pedido.transferencia_ref && (
                  <p><span className="font-medium text-gray-700">Ref. Transf.:</span> {pedido.transferencia_ref}</p>
                )}
                 {pedido.mp_payment_id && (
                  <p><span className="font-medium text-gray-700">ID Pago MP:</span> {pedido.mp_payment_id}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Package size={16} /> Productos
            </h3>
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3 text-right">Cant.</th>
                    <th className="px-4 py-3 text-right">Precio Unit.</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(pedido.datos) ? pedido.datos.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-600">${Number(item.price).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        ${(Number(item.price) * item.quantity).toLocaleString('es-AR')}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                        No hay detalles de productos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
          {/* Aquí se podrían agregar botones de acción como "Imprimir", "Cambiar Estado", etc. */}
        </div>
      </div>
    </div>
  )
}

export default function PedidosClient() {
  const [page, setPage] = useState(1)
  const pageSize = 12 // Cards per page
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null)
  const [estados, setEstados] = useState<EstadoConfig[]>([])

  useEffect(() => {
    fetch('/api/config/estados-pedidos')
      .then(r => r.json())
      .then(d => { if(Array.isArray(d)) setEstados(d) })
      .catch(e => console.error('Error fetching estados:', e))
  }, [])

  const { rows, total, validating, refresh } = useServerTable<Pedido>('Pedidos', {
    page,
    pageSize,
    search,
    sortBy: 'createdAt',
    sortDir: 'desc',
    qFields: ['comprador_nombre', 'comprador_email', 'id']
  })

  // Debounce search update could be added, but relying on useServerTable's behavior for now
  // Assuming useServerTable handles fetching when params change.

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-500 text-sm">Gestiona y visualiza las órdenes de compra.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o ID..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => refresh()} 
            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
            title="Recargar"
          >
            {validating ? <Loader2 className="animate-spin" size={20} /> : <Clock size={20} />}
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {validating && rows.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Package className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No se encontraron pedidos</p>
          <p className="text-sm text-gray-400">Intenta con otros términos de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rows.map((pedido) => (
            <OrderCard 
              key={pedido.id} 
              pedido={pedido} 
              onClick={() => setSelectedOrder(pedido)} 
              estados={estados}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Mostrando {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, total)} de {total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page * pageSize >= total}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          pedido={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          estados={estados}
          onUpdate={(updated) => {
            refresh(); // Refresca lista
            setSelectedOrder(updated); // Actualiza modal
          }}
        />
      )}
    </div>
  )
}
