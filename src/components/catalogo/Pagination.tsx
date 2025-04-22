// src/components/catalogo/Pagination.tsx
import React from 'react';
import { buildPaginationUrl, Filters } from '@/utils/urlUtils';

type Page = number | "ellipsis";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  filters: Filters;
}

const getPageNumbers = (total: number, current: number, delta = 3): Page[] => {
  const pages: Page[] = [1];
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, filters }) => {
  const pages = getPageNumbers(totalPages, currentPage);

  // Clases base para los botones, tanto para números como para flechas
  const baseButtonClasses =
    "px-3 py-2 rounded transition-colors duration-200 focus:outline-none";
  const activeClasses = "bg-green-600 text-white";
  const inactiveClasses = "bg-white text-green-700 hover:bg-green-50";

  return (
    <nav aria-label="Paginación" className="mt-10 overflow-x-auto">
      <ul className="flex justify-center items-center space-x-2 whitespace-nowrap">
        {currentPage > 1 && (
          <li>
            <a
              href={buildPaginationUrl(filters, currentPage - 1)}
              rel="prev"
              className={`flex items-center justify-center ${baseButtonClasses} ${activeClasses} hover:bg-green-700`}
              aria-label="Página anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
          </li>
        )}

        {pages.map((page, index) => (
          <li key={index}>
            {page === "ellipsis" ? (
              <span className="px-2 py-1 text-gray-500">…</span>
            ) : (
              <a
                href={buildPaginationUrl(filters, page as number)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`${baseButtonClasses} ${
                  page === currentPage ? activeClasses : inactiveClasses
                }`}
                aria-label={`Página ${page}`}
              >
                {page}
              </a>
            )}
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <a
              href={buildPaginationUrl(filters, currentPage + 1)}
              rel="next"
              className={`flex items-center justify-center ${baseButtonClasses} ${activeClasses} hover:bg-green-700`}
              aria-label="Página siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
