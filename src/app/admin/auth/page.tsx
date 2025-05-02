// src/app/admin/auth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { HiAtSymbol, HiLockClosed } from 'react-icons/hi'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [showPassword, setShowPassword] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.replace('/admin/resources/Productos')
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      router.replace('/admin/resources/Productos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
          Panel Admin
        </h2>

        {error && (
          <motion.p
            key={error}
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-red-600 text-sm mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Email */}
        <div className="relative mb-4">
          <HiAtSymbol className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Contraseña */}
        <div className="relative mb-6">
          <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Botón */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
        >
          Iniciar sesión
        </motion.button>
      </motion.form>
    </div>
  )
}
