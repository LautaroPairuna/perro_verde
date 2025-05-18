//src/app/admin/layout.tsx
'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname }              from 'next/navigation'
import { useState, type ReactNode }            from 'react'
import Link                                    from 'next/link'
import type { IconType }                       from 'react-icons'
import {
  HiTag, HiCollection, HiCurrencyDollar, HiPhotograph,
  HiShoppingCart, HiUsers, HiMenu, HiX, HiLogout,
} from 'react-icons/hi'

const RESOURCES = [
  'CfgMarcas',
  'CfgRubros',
  'CfgFormasPagos',
  'CfgMonedas',
  'CfgSlider',
  'Productos',
  'Pedidos',
] as const

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
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

  const iconFor = (name: string): IconType => {
    if (/Fotos|Photograph/.test(name))     return HiPhotograph
    if (/Rubros|Collection/.test(name))    return HiCollection
    if (/Pedidos|ShoppingCart/.test(name)) return HiShoppingCart
    if (/Monedas|Currency/.test(name))     return HiCurrencyDollar
    return HiTag
  }

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
          ${isRoot ? 'w-full' : 'w-64'} transition-transform duration-200
          bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-lg
          md:static md:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          <div className="hidden md:flex items-center px-6 py-6 border-b border-indigo-700">
            <HiUsers className="h-8 w-8 text-white"/>
            <span className="ml-3 text-2xl font-bold text-white">Admin</span>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-6 space-y-2">
            {RESOURCES.map(r => {
              const path   = `/admin/resources/${r}`
              const active = rawPath === path
              const label  = r.startsWith('Cfg') ? r.slice(3) : r
              const Icon   = iconFor(r)

              return (
                <Link
                  key={r}
                  href={path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition
                    ${active
                      ? 'bg-indigo-700 text-white font-semibold'
                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'}
                  `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0"/>
                  <span className="ml-3">{label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-indigo-700 p-4">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/auth' })}
              className="w-full flex items-center px-4 py-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg transition"
            >
              <HiLogout className="h-5 w-5 text-white"/>
              <span className="ml-3 text-white font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- Contenido principal ---------------------- */}
      <main className={`${isRoot ? 'hidden' : 'flex-1 flex flex-col overflow-auto'}`}>
        <header className="hidden md:flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
          <h1 className="text-xl font-semibold">{rawPath.split('/').pop()}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">¡Hola, {displayName}!</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full object-cover"/>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  )
}
