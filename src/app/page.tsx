// src/app/page.tsx
import Head from "next/head";
import HomeClientComponents from "@/components/home/HomeClientComponents";
export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Perro Verde - Inicio</title>
        <meta name="description" content="Tu ecommerce de productos." />
      </Head>
      <HomeClientComponents />
    </>
  );
}
