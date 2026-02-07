'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  IoSearchOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoCartOutline,
  IoLogoWhatsapp,
} from 'react-icons/io5';
import { buildPaginationUrl } from '@/utils/urlUtils';
import { useCartStore } from '@/store/useCartStore';

const WHATSAPP_NUMBER = '5493875354360';
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

export default function Header() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Derivar cantidad del carrito desde el store
  // Zustand maneja la reactividad automáticamente, pero para evitar problemas de hidratación
  // en componentes persistidos, a veces se usa un useEffect o un store hook custom.
  // Aquí usamos 'cart' directo, Next.js manejará el re-render.
  // Nota: Si hay hydration mismatch, usar un componente wrapper 'ClientOnly' o useEffect.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cartCount = mounted 
    ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0) 
    : 0;

  // abrir/cerrar menú móvil
  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  }, []);
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        (desktopSearchRef.current ?? mobileSearchRef.current)?.focus();
      }
      if (e.key === 'Escape' && mobileMenuOpen) closeMobileMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // búsqueda -> /catalogo/(keys?)/pagina-1
  const goSearch = useCallback((keywords: string) => {
    const href = buildPaginationUrl(
      { page: 1, keywords: keywords.trim(), marca_slug: '', categoria_slug: '', producto_slug: '' },
      1
    );
    router.push(href);
  }, [router]);

  const onSubmitDesktop = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    goSearch(desktopSearchRef.current?.value ?? '');
  }, [goSearch]);

  const onSubmitMobile = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    goSearch(mobileSearchRef.current?.value ?? '');
    closeMobileMenu();
  }, [goSearch, closeMobileMenu]);

  // href fijo para botón “Catálogo”
  const catalogHref = buildPaginationUrl(
    { page: 1, keywords: '', marca_slug: '', categoria_slug: '', producto_slug: '' },
    1
  );

  return (
    <header
      className={[
        // pegado arriba, sin offset
        'fixed top-0 left-0 right-0 z-50',
        'bg-white/95 backdrop-blur-sm shadow-sm py-2',
      ].join(' ')}
    >
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        {/* Fila superior: móvil = menú | logo | carrito  /  desktop = logo | search | links */}
        <div className="py-2 md:py-3">
          {/* móvil */}
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={openMobileMenu}
              className="h-10 w-10 grid place-items-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 active:scale-95 transition"
              aria-label="Abrir menú"
            >
              <IoMenuOutline className="text-2xl" />
            </button>
            <Link href="/" aria-label="Inicio" prefetch={false}>
              <Image src="/images/perro-verde-logo.svg" alt="Perro Verde" width={120} height={30} priority />
            </Link>
            <Link
              href="/carrito"
              aria-label="Ver carrito"
              prefetch={false}
              className="relative h-10 w-10 grid place-items-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 active:scale-95 transition"
            >
              <IoCartOutline className="text-2xl" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-green-700 text-white text-[11px] leading-[18px] font-bold text-center px-1">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            </Link>
          </div>

          {/* desktop */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
            <Link
              href="/"
              aria-label="Inicio"
              prefetch={false}
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <Image src="/images/perro-verde-logo.svg" alt="Perro Verde" width={140} height={36} priority />
            </Link>

            {/* buscador que resalta del fondo */}
            <form onSubmit={onSubmitDesktop} role="search" aria-label="Buscar productos">
              <div className="relative w-full rounded-full bg-white shadow-md ring-1 ring-neutral-200 focus-within:ring-2 focus-within:ring-green-600">
                <input
                  ref={desktopSearchRef}
                  type="search"
                  inputMode="search"
                  autoComplete="off"
                  placeholder="Buscar productos, marcas o categorías…"
                  className="w-full rounded-full bg-transparent pl-5 pr-14 py-3 text-[15px] placeholder:text-neutral-500 focus:outline-none"
                  aria-label="Buscar"
                  maxLength={100}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-green-700 text-white hover:bg-green-800 active:scale-95 transition shadow-sm hover:shadow-md"
                  aria-label="Enviar búsqueda"
                >
                  <IoSearchOutline className="text-lg" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Link
                href={catalogHref}
                prefetch={false}
                className="relative px-3 py-2 rounded-md font-medium text-neutral-900 hover:text-green-800 transition group"
              >
                Catálogo
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 bg-green-700/80 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </Link>
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md font-medium text-neutral-900 hover:text-green-800 hover:bg-green-50 transition"
                aria-label="Contactar por WhatsApp"
              >
                <IoLogoWhatsapp className="text-xl text-green-600" />
                <span>Contacto</span>
              </a>
              <Link
                href="/carrito"
                aria-label="Ver carrito"
                prefetch={false}
                className="relative ml-1 inline-flex items-center justify-center h-10 w-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 active:scale-95 transition"
              >
                <IoCartOutline className="text-2xl" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-green-700 text-white text-[11px] leading-[18px] font-bold text-center px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* buscador móvil: segunda fila full width */}
        <div className="md:hidden pb-3">
          <form onSubmit={onSubmitMobile} role="search" aria-label="Buscar productos en móvil">
            <div className="relative rounded-full bg-white shadow-md ring-1 ring-neutral-200 focus-within:ring-2 focus-within:ring-green-600">
              <input
                ref={mobileSearchRef}
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder="Buscar productos, marcas o categorías…"
                className="w-full rounded-full bg-transparent pl-5 pr-14 py-3 placeholder:text-neutral-500 focus:outline-none"
                aria-label="Buscar"
                maxLength={100}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-green-700 text-white hover:bg-green-800 active:scale-95 transition shadow-sm hover:shadow-md"
                aria-label="Enviar búsqueda en móvil"
              >
                <IoSearchOutline className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* backdrop móvil */}
      <div
        className={[
          'fixed inset-0 bg-black/40 transition-opacity md:hidden',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* drawer móvil */}
      <div
        id="mobileMenu"
        className={[
          'fixed left-0 right-0 top-0 md:hidden z-50',
          'bg-white shadow-lg transition-transform duration-300',
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobileMenuTitle"
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b">
          <span id="mobileMenuTitle" className="sr-only">Menú de navegación</span>
          <Link href="/" onClick={closeMobileMenu} aria-label="Inicio" prefetch={false}>
            <Image src="/images/perro-verde-logo.svg" alt="Perro Verde" width={120} height={30} />
          </Link>
          <button
            onClick={closeMobileMenu}
            className="h-10 w-10 grid place-items-center rounded-full border border-neutral-200 hover:bg-neutral-50 active:scale-95 transition"
            aria-label="Cerrar menú"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        <div className="px-2 pb-4 flex flex-col gap-1">
          <Link
            href={catalogHref}
            prefetch={false}
            onClick={closeMobileMenu}
            className="px-4 py-3 rounded-lg font-medium text-neutral-900 hover:bg-green-50 hover:text-green-800 transition"
          >
            Catálogo
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="px-4 py-3 rounded-lg font-medium text-neutral-900 hover:bg-green-50 hover:text-green-800 transition inline-flex items-center gap-2"
          >
            <IoLogoWhatsapp className="text-xl text-green-600" />
            Contacto
          </a>
          <Link
            href="/carrito"
            prefetch={false}
            onClick={closeMobileMenu}
            className="px-4 py-3 rounded-lg font-medium text-neutral-900 hover:bg-green-50 hover:text-green-800 transition inline-flex items-center gap-2"
          >
            <IoCartOutline className="text-xl" />
            Carrito
            <span className="ml-auto inline-flex items-center justify-center min-w-[22px] h-[22px] text-[12px] rounded-full bg-green-700 text-white px-1">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
