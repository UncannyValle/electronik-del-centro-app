import Link from "next/link";

import { CartItems } from "@/components/store/cart-items";
import { CheckoutSummary } from "@/components/store/checkout-summary";
import { Button } from "@/components/ui/button";
import { getServerMessages } from "@/lib/i18n/server";

export default async function CartPage() {
  const { m } = await getServerMessages();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">{m.cart.title}</h1>
        <CartItems />
      </section>
      <aside className="space-y-4">
        <CheckoutSummary />
        <Button asChild className="w-full">
          <Link href="/checkout">{m.cart.proceedCheckout}</Link>
        </Button>
      </aside>
    </div>
  );
}
