'use client'
import React, { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ModalP = {
  title: string
  onClose: () => void
  children: React.ReactNode
}
export const Modal = memo(function Modal({ title, onClose, children }: ModalP) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Bloquear scroll del body al abrir
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]">
        <header className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b shrink-0">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
})
