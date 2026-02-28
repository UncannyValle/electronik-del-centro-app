import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonItems = ["home-1", "home-2", "home-3"];

  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-2/3 max-w-xl" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <Skeleton className="h-4 w-5/6 max-w-xl" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
