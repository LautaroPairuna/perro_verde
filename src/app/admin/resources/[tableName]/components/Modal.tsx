'use client'
import React, { memo } from 'react'

type ModalP = {
  title: string
  onClose: () => void
  children: React.ReactNode
}
export const Modal = memo(function Modal({ title, onClose, children }: ModalP) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <header className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </header>
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
})
