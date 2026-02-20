import Link from "next/link";

import { CartItems } from "@/components/store/cart-items";
import { CheckoutSummary } from "@/components/store/checkout-summary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        <CartItems />
      </section>
      <aside className="space-y-4">
        <CheckoutSummary />
        <Button asChild className="w-full">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </aside>
    </div>
  );
}
