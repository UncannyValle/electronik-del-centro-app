"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { useLocale } from "@/hooks/useLocale"

export function CheckoutSummary() {
  const { itemCount, subtotal } = useCart()
  const { locale, m } = useLocale()
  const shipping = subtotal > 500 ? 0 : 19.99
  const tax = subtotal * 0.0825
  const total = subtotal + shipping + tax
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.summary.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {m.summary.items} ({itemCount})
          </span>
          <span>{currency.format(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{m.summary.shipping}</span>
          <span>{shipping === 0 ? m.summary.free : currency.format(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{m.summary.estimatedTax}</span>
          <span>{currency.format(tax)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between font-semibold">
          <span>{m.summary.total}</span>
          <span>{currency.format(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
