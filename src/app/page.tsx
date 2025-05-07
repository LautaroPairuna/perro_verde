// src/app/page.tsx
import Head                 from 'next/head'
import HomeClientComponents from '@/components/home/HomeClientComponents'
import prisma               from '@/lib/prisma'

export const dynamic    = 'force-dynamic'
export const revalidate = 60

export default async function HomePage() {
  // 1. Sliders
  const sliders = await prisma.cfgSlider.findMany({
    where:   { activo: true },
    orderBy: { orden: 'asc' },
    select:  { foto: true },
  })
  // Sin anotación manual: TS infiere `s: { foto: string }`
  const promotionImages = sliders.map(s => `/images/slider/${s.foto}`)

  // 2. Productos destacados
  const rawFeatured = await prisma.productos.findMany({
    where:    { destacado: true, activo: true },
    take:      4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const featuredProducts = rawFeatured.map(p => ({
    ...p,
    precio: parseFloat(p.precio.toString()),
  }))

  // 3. Marcas
  const brands = await prisma.cfgMarcas.findMany({
    where:   { activo: true },
    orderBy: { marca: 'asc' },
    select:  { id: true, marca: true, foto: true },
  })

  // 4. Productos más vistos
  const rawMostViewed = await prisma.productos.findMany({
    where:    { activo: true },
    orderBy:  { visitas: 'desc' },
    take:      4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true, visitas: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const mostViewed = rawMostViewed.map(p => ({
    ...p,
    precio: parseFloat(p.precio.toString()),
  }))

  const rubros = await prisma.cfgRubros.findMany({
    where: { activo: true },
    select: { id: true, rubro: true, foto: true },
    orderBy: { rubro: 'asc' },
  });

  return (
    <>
      <Head>
        <title>Perro Verde - Inicio</title>
        <meta name="description" content="Tu ecommerce de productos." />
      </Head>
      <HomeClientComponents
        promotionImages={promotionImages}
        featuredProducts={featuredProducts}
        brands={brands}
        mostViewed={mostViewed}
        rubros={rubros}
      />
    </>
  )
}
