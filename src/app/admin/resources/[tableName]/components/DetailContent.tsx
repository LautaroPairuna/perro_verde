'use client'
import React from 'react'
import type { Row } from '../types'

/* Type guards sin `any` */
const isPrimitive = (v: unknown): v is string | number | boolean | null =>
  v === null || ['string', 'number', 'boolean'].includes(typeof v)

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const isArrayOfObjects = (v: unknown): v is Array<Record<string, unknown>> =>
  Array.isArray(v) && v.length > 0 && v.every(isPlainObject)

const isArrayOfPrimitives = (v: unknown): v is Array<string | number | boolean | null> =>
  Array.isArray(v) && v.every(isPrimitive)

export function DetailContent({ row }: { row: Row }) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({})
  const entries = Object.entries(row as Record<string, unknown>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Campos primitivos */}
      {entries
        .filter(([, v]) => isPrimitive(v))
        .map(([k, v]) => (
          <div key={k} className="flex">
            <span className="font-semibold w-40 text-gray-700">
              {k.replace(/_/g, ' ')}:
            </span>
            <span className="text-gray-800">{String(v)}</span>
          </div>
        ))}

      {/* Campos complejos */}
      {entries
        .filter(([, v]) => !isPrimitive(v))
        .map(([k, v]) => (
          <div key={k} className="md:col-span-2 border-t pt-4">
            <button
              onClick={() => setOpen(s => ({ ...s, [k]: !s[k] }))}
              className="w-full flex justify-between items-center text-left text-gray-700 font-medium hover:text-gray-900"
            >
              <span>{k.replace(/_/g, ' ')}</span>
              <span>{open[k] ? '▲' : '▼'}</span>
            </button>

            {open[k] && (
              <div className="mt-3 text-gray-800 text-sm space-y-2">
                {/* Array de objetos → tabla */}
                {isArrayOfObjects(v) && (
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-indigo-100">
                      <tr>
                        {Object.keys(v[0]).map(c => (
                          <th
                            key={c}
                            className="border px-2 py-1 text-left text-indigo-700"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {v.map((r, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          {Object.keys(v[0]).map(c => (
                            <td key={c} className="border px-2 py-1">
                              {String((r as Record<string, unknown>)[c])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Array de primitivos → lista */}
                {isArrayOfPrimitives(v) && (
                  <ul className="list-disc list-inside pl-4">
                    {v.map((it, idx) => (
                      <li key={idx}>{String(it)}</li>
                    ))}
                  </ul>
                )}

                {/* Objeto plano → definición */}
                {isPlainObject(v) && (
                  <dl className="space-y-1">
                    {Object.entries(v).map(([prop, val]) => (
                      <div key={prop} className="flex">
                        <dt className="font-semibold w-36">
                          {prop.replace(/_/g, ' ')}:
                        </dt>
                        <dd className="flex-1">{String(val)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
