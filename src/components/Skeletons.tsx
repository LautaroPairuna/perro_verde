export function PromotionsSkeleton() {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-200 animate-pulse rounded-xl" />
  )
}

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
      ))}
    </div>
  )
}

export function BrandsSkeleton() {
  return (
    <div className="w-full h-24 bg-gray-50 animate-pulse rounded-lg my-8" />
  )
}
