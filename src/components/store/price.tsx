import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  className
}: {
  amount: number;
  compareAt?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      <p className="text-lg font-semibold">${amount.toFixed(2)}</p>
      {compareAt ? (
        <p className="text-sm text-muted-foreground line-through">${compareAt.toFixed(2)}</p>
      ) : null}
    </div>
  );
}
