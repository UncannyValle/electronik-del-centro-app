import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailLoadingSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-5">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-10 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-40" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}

export default function LoadingProductDetail() {
  return <ProductDetailLoadingSkeleton />
}
