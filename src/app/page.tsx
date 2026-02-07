// src/app/page.tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import HomePromotions from '@/components/home/HomePromotions'
import HomeFeatured from '@/components/home/HomeFeatured'
import HomeBrands from '@/components/home/HomeBrands'
import HomeMostViewed from '@/components/home/HomeMostViewed'
import HomeRubros from '@/components/home/HomeRubros'
import HomeJsonLd from '@/components/home/HomeJsonLd'
import { PromotionsSkeleton, GridSkeleton, BrandsSkeleton } from '@/components/Skeletons'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Perro Verde - Petshop en Salta',
  description:
    'Tienda online de alimentos, accesorios y cuidados para tu mascota en Salta. Envíos rápidos y las mejores marcas.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<PromotionsSkeleton />}>
        <HomePromotions />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <HomeFeatured />
      </Suspense>

      <Suspense fallback={<BrandsSkeleton />}>
        <HomeBrands />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <HomeMostViewed />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <HomeRubros />
      </Suspense>

      <Suspense fallback={null}>
        <HomeJsonLd />
      </Suspense>
    </>
  )
}
