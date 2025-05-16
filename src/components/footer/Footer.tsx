// src/components/footer/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoFacebook,
  IoLogoInstagram,
} from 'react-icons/io5';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm py-12">
      <div className="container mx-auto px-6">
        {/* Secciones Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-200 pb-10">
          {/* Logo y Contacto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" aria-label="Inicio">
              <Image
                src="/images/perro-verde-logo-2.svg"
                alt="LOGO PERRO VERDE"
                width={140}
                height={70}
                className="mb-4 cursor-pointer transition-transform hover:scale-105"
              />
            </Link>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-center">
                <IoLocationOutline className="text-xl text-green-800 mr-2" />
                Av. los Incas N°6 Local 2, A4400 Salta
              </li>
              <li className="flex items-center">
                <IoCallOutline className="text-xl text-green-800 mr-2" />
                +54 9 387 535-4360
              </li>
              <li className="flex items-center">
                <IoMailOutline className="text-xl text-green-800 mr-2" />
                <a
                  href="mailto:info@perroverde.com"
                  className="hover:text-green-800 transition duration-300"
                >
                  perroverdepetshop@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Navegación Rápida */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-sm text-gray-800 hover:text-green-800 transition duration-300">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-800 hover:text-green-800 transition duration-300">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-sm text-gray-800 hover:text-green-800 transition duration-300">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-gray-800 hover:text-green-800 transition duration-300">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-gray-800 hover:text-green-800 transition duration-300">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Síguenos */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Síguenos
            </h3>
            <ul className="flex justify-center md:justify-end space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61574100808984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-800 hover:text-green-800 transition duration-300"
                  aria-label="Facebook"
                >
                  <IoLogoFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/perroverdepetshop/?igsh=MTBkY2RncG82dXZlcQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-800 hover:text-green-800 transition duration-300"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Derechos Reservados */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-800">
            &copy; 2025 Perro Verde. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
