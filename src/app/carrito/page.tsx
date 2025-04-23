// src/app/carrito/page.tsx
import Head from 'next/head';
import Cart from '../../components/carrito/Cart';

export default function CartPage() {
  const title = "Tu Carrito | Perro Verde";
  const description = "Revisa los productos agregados a tu carrito.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Si lo requieres, también puedes incluir el canonical */}
        {/* <link rel="canonical" href="https://tudominio.com/carrito" /> */}
      </Head>
      <Cart />
    </>
  );
}
