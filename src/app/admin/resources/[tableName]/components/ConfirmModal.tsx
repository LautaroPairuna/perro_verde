'use client'
import React, { memo } from 'react'
import { Modal } from './Modal'
import type { Row } from '../types'

type ConfirmP = {
  items: Row[]
  onConfirm: () => void
  onCancel: () => void
}
export const ConfirmModal = memo(function ConfirmModal({
  items, onConfirm, onCancel,
}: ConfirmP) {
  return (
    <Modal title="Confirmar eliminación" onClose={onCancel}>
      <p className="text-gray-700 mb-4">
        Vas a eliminar{' '}
        <span className="font-medium text-red-600">{items.length}</span>{' '}
        registro(s):
      </p>
      <ul className="list-disc list-inside max-h-40 overflow-y-auto border rounded p-4 bg-gray-50 mb-6">
        {items.map((it, idx) => (
          <li key={idx} className="text-gray-600">
            {(it as any).producto || (it as any).id}
          </li>
        ))}
      </ul>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
})
