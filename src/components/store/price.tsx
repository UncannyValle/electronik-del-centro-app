"use client"

import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"

export function Price({
  amount,
  compareAt,
  className,
}: {
  amount: number
  compareAt?: number
  className?: string
}) {
  const { locale } = useLocale()
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  })

  return (
    <div className={cn("flex items-end gap-2", className)}>
      <p className="text-lg font-semibold">{currency.format(amount)}</p>
      {compareAt ? (
        <p className="text-sm text-muted-foreground line-through">{currency.format(compareAt)}</p>
      ) : null}
    </div>
  )
}
