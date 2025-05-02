// src/app/admin/page.tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect('/admin/auth')
  // tras login → la primer tabla
  return redirect('/admin/resources/CfgMarcas')
}
