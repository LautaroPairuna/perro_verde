import { Metadata } from 'next'
import PedidosClient from './PedidosClient'

export const metadata: Metadata = {
  title: 'Admin · Gestión de Pedidos',
  description: 'Visualiza y gestiona los pedidos de la tienda.',
}

export default function PedidosPage() {
  return <PedidosClient />
}
