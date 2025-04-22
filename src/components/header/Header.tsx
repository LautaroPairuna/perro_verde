// src/components/Header.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  IoSearchOutline, 
  IoMenuOutline, 
  IoCloseOutline, 
  IoCartOutline 
} from 'react-icons/io5';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  }, []);
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  }, []);

  const handleSearchSubmit = useCallback((inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
    if (inputElement) {
      const keywords = inputElement.value;
      const slugifiedKeywords = slugify(keywords);
      const href = slugifiedKeywords
        ? `/catalogo/keys-${encodeURIComponent(slugifiedKeywords)}/pagina-1`
        : '/catalogo/pagina-1';
      window.location.href = href;
    } else {
      console.error(`Elemento con ID "${inputId}" no encontrado.`);
    }
  }, []);

  const updateCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error al parsear el carrito:', error);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    updateCartCount();
    const handleCartUpdated = () => updateCartCount();
    document.addEventListener('cartUpdated', handleCartUpdated);
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 500);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('cartUpdated', handleCartUpdated);
      window.removeEventListener('storage', updateCartCount);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [updateCartCount, mobileMenuOpen, closeMobileMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm transition-all duration-300">
      <nav className="grid grid-cols-2 md:grid-cols-3 items-center px-4 py-6 md:px-8" aria-label="Navegación principal ecommerce">
        {/* Logo */}
        <div className="flex justify-start">
          <Link href="/" aria-label="Inicio" className="flex items-center transition-transform hover:scale-105">
            <Image src="/images/perro-verde-logo.svg" alt="Logo Ecommerce" width={130} height={90} />
          </Link>
        </div>
        
        {/* Buscador desktop con animación */}
        <div className="hidden md:flex justify-center">
          <form
            id="headerSearchForm"
            onSubmit={(e) => { e.preventDefault(); handleSearchSubmit('Buscador'); }}
            className="flex items-center space-x-2 w-full max-w-lg bg-gray-100 rounded-full px-4 py-2 shadow-inner transition duration-300 ease-in-out transform hover:shadow-md"
            role="search"
            aria-label="Buscar productos"
          >
            <label htmlFor="Buscador" className="sr-only">Buscar productos</label>
            <input 
              type="search"
              name="Buscador"
              id="Buscador"
              placeholder="Buscar productos, marcas o categorías..."
              className="w-full bg-transparent outline-none transition-all duration-300 focus:scale-105 focus:text-gray-900"
              required
              maxLength={100}
              pattern="[a-zA-Z0-9\s\-]+"
              title="Solo se permiten letras, números y guiones."
            />
            <button 
              type="submit"
              className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900 transition duration-300 transform hover:scale-105 font-medium"
              aria-label="Enviar búsqueda"
            >
              <IoSearchOutline />
            </button>
          </form>
        </div>

        {/* Menú y Carrito */}
        <div className="flex justify-end items-center space-x-4">
          <div id="navLinks" className="hidden md:flex space-x-6">
            <Link href="/catalogo/pagina-1" className="font-semibold text-lg text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition duration-300" aria-label="Ir al catálogo">
              Catálogo
            </Link>
            <Link href="/contacto" className="font-semibold text-lg text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition duration-300" aria-label="Ir a contacto">
              Contacto
            </Link>
          </div>
          <Link href="/carrito" className="relative flex items-center text-gray-800 transition-transform hover:scale-105" aria-label="Ver carrito">
            <IoCartOutline className="text-3xl" />
            <span id="cartCount" className="absolute -top-1 -right-2 bg-green-800 text-white text-xs font-bold px-1 rounded-full">
              {cartCount}
            </span>
          </Link>
          <button 
            id="menuToggle"
            onClick={openMobileMenu}
            className="text-3xl md:hidden hover:text-gray-800 transition-transform transform hover:scale-105"
            aria-label="Abrir menú de navegación"
            aria-controls="mobileMenu"
            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
          >
            <IoMenuOutline />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobileMenu"
        className={`fixed top-0 left-0 w-full bg-white shadow-lg p-6 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobileMenuTitle"
      >
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Inicio" className="flex items-center transition-transform hover:scale-105">
            <Image src="/images/perro-verde-logo.svg" alt="Logo Ecommerce" width={90} height={60} />
          </Link>
          <button 
            id="menuClose"
            onClick={closeMobileMenu}
            className="text-3xl hover:text-red-600 transition-transform transform hover:scale-105"
            aria-label="Cerrar menú de navegación"
          >
            <IoCloseOutline />
          </button>
        </div>
        <div className="mt-6">
          <form
            id="mobileHeaderSearchForm"
            onSubmit={(e) => { 
              e.preventDefault(); 
              handleSearchSubmit('MobileBuscador'); 
              closeMobileMenu(); 
            }}
            className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 shadow-inner transition duration-300 ease-in-out transform hover:shadow-md"
            role="search"
            aria-label="Buscar productos en móvil"
          >
            <label htmlFor="MobileBuscador" className="sr-only">Buscar productos</label>
            <input 
              type="search"
              name="MobileBuscador"
              id="MobileBuscador"
              placeholder="Buscar productos, marcas o categorías..."
              className="w-full bg-transparent outline-none transition-all duration-300 focus:scale-105 focus:text-gray-900"
              required
              maxLength={100}
              pattern="[a-zA-Z0-9\s\-]+"
              title="Solo se permiten letras, números y guiones."
            />
            <button 
              type="submit"
              className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900 transition duration-300 transform hover:scale-105 font-medium"
              aria-label="Enviar búsqueda en móvil"
            >
              <IoSearchOutline />
            </button>
          </form>
        </div>
        <div className="mt-6 flex flex-col space-y-4">
          <Link href="/catalogo" className="font-medium text-lg text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition transform hover:scale-105" aria-label="Ir al catálogo">
            Catálogo
          </Link>
          <Link href="/contacto" className="font-medium text-lg text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition transform hover:scale-105" aria-label="Ir a contacto">
            Contacto
          </Link>
          <Link href="/carrito" className="flex items-center space-x-2 font-medium text-lg text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition transform hover:scale-105" aria-label="Ir al carrito">
            <IoCartOutline className="text-2xl" />
            <span>Carrito</span>
            <span id="mobileCartCount" className="bg-green-800 text-white text-xs font-bold px-1 rounded-full">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
