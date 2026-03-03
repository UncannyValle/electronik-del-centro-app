"use client"

import { useLocale } from "@/hooks/useLocale"
import { cn } from "@/lib/utils"

export function Price({
  amount,
  currencyCode,
  compareAt,
  className,
}: {
  amount: number
  currencyCode: string
  compareAt?: number
  className?: string
}) {
  const { locale } = useLocale()
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
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
