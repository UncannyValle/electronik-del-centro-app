import Link from "next/link"

import { CartHeading, CartItems } from "@/components/store/CartItems"
import { CheckoutSummary } from "@/components/store/CheckoutSummary"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"

export default async function CartPage() {
  const { m } = await getServerMessages()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CartHeading />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-4">
          <CartItems />
        </section>
        <aside className="space-y-4">
          <CheckoutSummary />
          <Button asChild className="w-full" size="lg">
            <Link href="/checkout">{m.cart.proceedCheckout}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full justify-start">
            <Link href="/products">{m.cart.continueShopping}</Link>
          </Button>

          <div className="space-y-2 rounded-lg border border-border bg-card/50 p-4 text-sm">
            <p className="text-muted-foreground">{m.cart.trustSecure}</p>
            <p className="text-muted-foreground">{m.cart.trustFreeShipping}</p>
            <p className="text-muted-foreground">{m.cart.trustReturns}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
