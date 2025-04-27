// src/app/page.tsx
import Head                 from 'next/head'
import HomeClientComponents from '@/components/home/HomeClientComponents'
import prisma               from '@/lib/prisma'
import type { CfgSlider }   from '@prisma/client'

export const dynamic    = 'force-dynamic'
export const revalidate = 60

export default async function HomePage() {
  // 1) Recuperar solo la foto de cada slider
  const sliders: Array<Pick<CfgSlider, 'foto'>> = await prisma.cfgSlider.findMany({
    where:   { activo: true },
    orderBy: { orden: 'asc' },
    select:  { foto: true },
  })

  // 2) Ahora TS sabe que `s` tiene forma { foto: string }
  const promotionImages: string[] = sliders.map(
    (s): string => `/images/slider/${s.foto}`
  )

  // 3) Productos destacados (igual que antes)
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

  // 4) Marcas
  const brands = await prisma.cfgMarcas.findMany({
    where:   { activo: true },
    orderBy: { marca: 'asc' },
    select:  { id: true, marca: true, foto: true },
  })

  // 5) Más vistos
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
      />
    </>
  )
}
