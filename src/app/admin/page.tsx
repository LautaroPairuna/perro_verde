import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { startOfWeek, endOfWeek } from 'date-fns'
import EarningsCard from './components/EarningsCard'
import { 
  HiShoppingCart, 
  HiCube, 
  HiExclamationCircle, 
  HiCurrencyDollar,
  HiCheckCircle,
  HiXCircle
} from 'react-icons/hi'
import SalesChart from './components/SalesChart'

export default async function AdminPage() {
  const session = await auth()
  if (!session) return redirect('/admin/auth')

  // Fechas para gráfico (últimos 7 días)
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 6) // -6 para incluir hoy y ser 7 días
  sevenDaysAgo.setHours(0, 0, 0, 0)

  // Calcular semana actual para ganancias
  const startWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endWeek = endOfWeek(today, { weekStartsOn: 1 })

  // Obtener estados de cancelación dinámicamente
  const estadosCancelacion = await prisma.cfgEstadoPedido.findMany({
    where: { es_cancel: true },
    select: { id: true }
  })
  const idsCancel = estadosCancelacion.map(e => e.id)
  const notInEstados = [...idsCancel, 'pendiente']

  // Fetch data
  const [
    productosCount,
    lowStockCount,
    pedidosTotal,
    pedidosPendientes,
    pedidosAceptados,
    pedidosRechazados,
    ultimosPedidos,
    ventasSemana,
    gananciasSemana
  ] = await Promise.all([
    // KPIs básicos
    prisma.productos.count({ where: { activo: true } }),
    prisma.productos.count({ where: { stock: { lte: 5 }, activo: true } }),
    
    // Conteo Pedidos
    prisma.pedidos.count(),
    prisma.pedidos.count({ where: { estado: 'pendiente' } }),
    prisma.pedidos.count({ 
      where: { 
        OR: [
          { estado: 'pagado' },
          { estado: 'approved' }
        ]
      } 
    }), 
    prisma.pedidos.count({ 
      where: { 
        OR: [
          { estado: 'cancelado' },
          { estado: 'rejected' }
        ]
      } 
    }),

    // Últimos pedidos tabla
    prisma.pedidos.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        comprador_nombre: true,
        total: true,
        estado: true,
        createdAt: true,
        estadoRel: {
          select: {
            descripcion: true,
            color: true
          }
        }
      }
    }),

    // Ventas para gráfico
    prisma.pedidos.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        // Consideramos ventas reales las pagadas o aprobadas
        OR: [
          { estado: 'pagado' },
          { estado: 'approved' }
        ]
      },
      select: {
        createdAt: true,
        total: true
      }
    }),

    // Ganancias de la semana (Nueva lógica dinámica)
    prisma.pedidos.aggregate({
      _sum: { total: true },
      _count: { id: true },
      where: {
        createdAt: { gte: startWeek, lte: endWeek },
        estado: { notIn: notInEstados }
      }
    })
  ])

  // Procesar datos para gráfico: Agrupar por día
  const chartDataMap = new Map<string, number>()
  
  // Inicializar los 7 días en 0
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const label = d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }) // Lun 10
    chartDataMap.set(label, 0)
  }

  // Sumar totales (recorremos inverso para llenar el map correctamente si usáramos fechas ISO, pero aquí usaremos labels simples)
  // Nota: Para ordenar cronológicamente en el gráfico, necesitamos un array ordenado.
  
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sevenDaysAgo)
    d.setDate(d.getDate() + i)
    return {
      dateObj: d,
      dateLabel: d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }),
      total: 0
    }
  })

  ventasSemana.forEach(venta => {
    const ventaDate = new Date(venta.createdAt)
    const label = ventaDate.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })
    const found = chartData.find(d => d.dateLabel === label)
    if (found) {
      found.total += Number(venta.total)
    }
  })

  const finalChartData = chartData.map(d => ({ date: d.dateLabel, total: d.total }))

  const cards = [
    {
      title: 'Productos Activos',
      value: productosCount,
      icon: HiCube,
      color: 'bg-blue-500',
      href: '/admin/resources/Productos'
    },
    {
      title: 'Stock Bajo',
      value: lowStockCount,
      icon: HiExclamationCircle,
      color: 'bg-red-500',
      href: '/admin/resources/Productos?filter=low_stock'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Resumen general del inventario y ventas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: KPIs Inventario + Tabla Resumen Pedidos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inventario Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <Link 
                key={i} 
                href={card.href}
                className="bg-white rounded-xl shadow-sm p-6 flex items-center transition hover:shadow-md"
              >
                <div className={`p-4 rounded-lg ${card.color} text-white`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Gráfico de Ventas */}
          <SalesChart data={finalChartData} />

           {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Últimos Pedidos</h2>
              <Link 
                href="/admin/resources/Pedidos" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Ver todos
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-500">ID</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Cliente</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Estado</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Total</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ultimosPedidos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No hay pedidos recientes.
                      </td>
                    </tr>
                  ) : (
                    ultimosPedidos.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 text-gray-900 font-medium">#{pedido.id}</td>
                        <td className="px-6 py-3 text-gray-600">{pedido.comprador_nombre}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            pedido.estadoRel?.color 
                              ? pedido.estadoRel.color 
                              : (pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                 pedido.estado === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                 'bg-red-100 text-red-800 border-red-200')
                          }`}>
                            {pedido.estadoRel?.descripcion || (pedido.estado === 'approved' ? 'Aceptado' : pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1))}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-900">${Number(pedido.total).toFixed(2)}</td>
                        <td className="px-6 py-3 text-gray-500">
                          {new Date(pedido.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Resumen Pedidos */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Ganancias de la semana */}
          <EarningsCard 
            total={Number(gananciasSemana._sum.total ?? 0)} 
            count={gananciasSemana._count.id ?? 0} 
          />

          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Resumen de Pedidos</h2>
            
            <div className="space-y-6">
              {/* Total */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                    <HiShoppingCart className="h-6 w-6" />
                  </div>
                  <span className="ml-3 font-medium text-gray-600">Total</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{pedidosTotal}</span>
              </div>

              {/* Pendientes */}
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                    <HiCurrencyDollar className="h-6 w-6" />
                  </div>
                  <span className="ml-3 font-medium text-gray-600">Pendientes</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{pedidosPendientes}</span>
              </div>

              {/* Aceptados */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full">
                    <HiCheckCircle className="h-6 w-6" />
                  </div>
                  <span className="ml-3 font-medium text-gray-600">Aceptados</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{pedidosAceptados}</span>
              </div>

              {/* Rechazados */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 text-red-600 rounded-full">
                    <HiXCircle className="h-6 w-6" />
                  </div>
                  <span className="ml-3 font-medium text-gray-600">Rechazados</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{pedidosRechazados}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <Link
                href="/admin/pedidos"
                className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gestionar Pedidos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
