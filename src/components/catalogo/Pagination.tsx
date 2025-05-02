// src/components/catalogo/Pagination.tsx
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { buildPaginationUrl, Filters } from '@/utils/urlUtils'

type Page = number | 'ellipsis'

interface PaginationProps {
  totalPages: number
  currentPage: number
  filters: Filters
}

const getPageNumbers = (total: number, current: number, delta = 2): Page[] => {
  const pages: Page[] = [1]
  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  if (start > 2) pages.push('ellipsis')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('ellipsis')
  if (total > 1) pages.push(total)

  return pages
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, filters }) => {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(totalPages, currentPage)
  const prevDisabled = currentPage === 1
  const nextDisabled = currentPage === totalPages

  const container = 'inline-block bg-white px-4 py-2 rounded-xl shadow-md'
  const list = 'flex items-center space-x-3'
  const pageBase = 'px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
  const pageInactive = 'text-gray-700 bg-white border-gray-200 hover:bg-gray-100'
  const pageActive = 'text-white bg-green-600 border-green-600'
  const arrowBase = 'w-8 h-8 flex items-center justify-center rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
  const arrowStyle = 'text-gray-700 bg-white border-gray-200 hover:bg-gray-100'

  return (
    <nav aria-label="Paginación" className="flex justify-center mt-8">
      <div className={container}>
        <ul className={list}>
          {/* Anterior */}
          <li>
            {prevDisabled ? (
              <span
                className={clsx(arrowBase, arrowStyle, 'opacity-50')}
                aria-disabled="true"
              >
                <HiChevronLeft className="w-5 h-5" />
              </span>
            ) : (
              <Link
                href={buildPaginationUrl(filters, currentPage - 1)}
                className={clsx(arrowBase, arrowStyle)}
                aria-label="Anterior"
              >
                <HiChevronLeft className="w-5 h-5" />
              </Link>
            )}
          </li>

          {/* Páginas */}
          {pages.map((page, idx) => (
            <li key={idx}>
              {page === 'ellipsis' ? (
                <span className="px-3 text-gray-400 select-none">…</span>
              ) : (
                <Link
                  href={buildPaginationUrl(filters, page as number)}
                  className={clsx(
                    pageBase,
                    page === currentPage ? pageActive : pageInactive
                  )}
                  aria-current={page === currentPage ? 'page' : undefined}
                  aria-label={`Página ${page}`}
                >
                  {page}
                </Link>
              )}
            </li>
          ))}

          {/* Siguiente */}
          <li>
            {nextDisabled ? (
              <span
                className={clsx(arrowBase, arrowStyle, 'opacity-50')}
                aria-disabled="true"
              >
                <HiChevronRight className="w-5 h-5" />
              </span>
            ) : (
              <Link
                href={buildPaginationUrl(filters, currentPage + 1)}
                className={clsx(arrowBase, arrowStyle)}
                aria-label="Siguiente"
              >
                <HiChevronRight className="w-5 h-5" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Pagination
