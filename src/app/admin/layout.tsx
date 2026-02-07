'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname }              from 'next/navigation'
import { useState, type ReactNode }            from 'react'
import Link                                    from 'next/link'
import type { IconType }                       from 'react-icons'
import {
  HiTag, HiCollection, HiCurrencyDollar, HiPhotograph,
  HiShoppingCart, HiUsers, HiMenu, HiX, HiLogout, HiHome,
  HiCube, HiClipboardList
} from 'react-icons/hi'
import { UserBadgeIcon } from './resources/[tableName]/components/icons/UserBadgeIcon'
import AdminQueryProvider from './AdminQueryProvider'

const NAV_SECTIONS: {
  title: string
  items: {
    label: string
    resource?: string
    href?: string
    icon: IconType
    exact?: boolean
  }[]
}[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', href: '/admin', icon: HiHome, exact: true },
    ]
  },
  {
    title: 'Gestión',
    items: [
      { label: 'Productos', resource: 'Productos', icon: HiCube },
      { label: 'Pedidos', href: '/admin/pedidos', icon: HiShoppingCart },
    ]
  },
  {
    title: 'Contenido',
    items: [
      { label: 'Banners', resource: 'CfgSlider', icon: HiPhotograph },
    ]
  },
  {
    title: 'Maestros',
    items: [
      { label: 'Marcas', resource: 'CfgMarcas', icon: HiTag },
      { label: 'Rubros', resource: 'CfgRubros', icon: HiCollection },
      { label: 'Formas de Pago', resource: 'CfgFormasPagos', icon: HiCurrencyDollar },
      { label: 'Monedas', resource: 'CfgMonedas', icon: HiCurrencyDollar },
    ]
  },
  {
    title: 'Sistema',
    items: [
      { label: 'Auditoría', href: '/admin/audit', icon: HiClipboardList },
    ]
  }
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminQueryProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminQueryProvider>
    </SessionProvider>
  )
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  /* ---------------- hooks SIEMPRE al inicio ---------------- */
  const router      = useRouter()
  const rawPath     = usePathname() ?? ''
  const inAuthRoute = rawPath.startsWith('/admin/auth')

  const { data: session, status } = useSession({
    required: !inAuthRoute,
    onUnauthenticated() {
      if (!inAuthRoute) router.replace('/admin/auth')
    },
  })

  const [mobileOpen, setMobileOpen] = useState(false)
  const isRoot = rawPath === '/admin'

  /* ---------------- early return para /admin/auth ---------- */
  if (inAuthRoute) return <>{children}</>

  /* ---------------- pantalla de carga ---------------------- */
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600" />
        <span className="ml-4 text-gray-700">Verificando sesión…</span>
      </div>
    )
  }

  /* ---------------- sesión garantizada --------------------- */
  const avatarUrl   = session?.user?.image ?? '/avatar-placeholder.png'
  const displayName = session?.user?.name  ?? 'Usuario'

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* ---------- Barra móvil ----------------------------- */}
      <div className="md:hidden flex items-center justify-between bg-indigo-600 text-white p-4 shadow-md">
        <button onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
          {mobileOpen ? <HiX className="h-6 w-6"/> : <HiMenu className="h-6 w-6"/>}
        </button>
        <span className="text-lg font-semibold">Admin Panel</span>
        <div className="flex items-center space-x-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
          <button
            onClick={() => signOut({ callbackUrl: '/admin/auth' })}
            aria-label="Cerrar sesión"
            className="p-1 hover:bg-indigo-500 rounded"
          >
            <HiLogout className="h-6 w-6 text-white"/>
          </button>
        </div>
      </div>

      {/* ---------- Sidebar --------------------------------- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 transform
          w-64 transition-transform duration-200
          bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-lg
          md:static md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="hidden md:flex items-center px-6 py-6 border-b border-indigo-700">
            <HiUsers className="h-8 w-8 text-white"/>
            <span className="ml-3 text-xl font-bold text-white">Panel Admin</span>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {NAV_SECTIONS.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h3 className="px-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const href = item.href ?? `/admin/resources/${item.resource}`
                    const active = item.exact 
                      ? rawPath === href
                      : rawPath.startsWith(href)
                    
                    const Icon = item.icon

                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          flex items-center px-3 py-2 rounded-md transition-colors text-sm font-medium
                          ${active
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'}
                        `}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0 mr-3 opacity-80"/>
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-indigo-700 p-4">
            {/* Perfil de usuario */}
            <div className="flex items-center mb-4 px-2">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <p className="text-xs text-indigo-300 truncate">Online</p>
              </div>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/admin/auth' })}
              className="w-full flex items-center px-4 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-lg transition text-sm border border-indigo-700"
            >
              <HiLogout className="h-5 w-5 text-indigo-300"/>
              <span className="ml-3 text-indigo-200">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- Contenido principal ---------------------- */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Header eliminado por requerimiento */}

        {/* === MEJORA DE LA SECCIÓN BLANCA (solo wrapper) === */}
        <div className="flex-1 relative">
          {/* Fondo notorio con gradientes radiales */}
          <div className="pointer-events-none absolute inset-0 -z-10
            bg-gradient-to-br from-indigo-50 via-white to-purple-50
            dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950
            bg-[radial-gradient(900px_450px_at_20%_10%,rgba(99,102,241,0.10),transparent),radial-gradient(800px_400px_at_85%_15%,rgba(168,85,247,0.10),transparent)]" />

          {/* Contenedor centrado más angosto para que se note el “card” */}
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
