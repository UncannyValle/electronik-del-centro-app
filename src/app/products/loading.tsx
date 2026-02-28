import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProducts() {
  const skeletonItems = [
    "products-1",
    "products-2",
    "products-3",
    "products-4",
    "products-5",
    "products-6"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {skeletonItems.map((itemKey) => (
          <div key={itemKey} className="space-y-3 rounded-xl border border-border p-4">
            <Skeleton className="aspect-4/3 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
