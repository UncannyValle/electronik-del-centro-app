"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/use-cart";
import { useLocale } from "@/hooks/use-locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CartItems() {
  const { state, dispatch } = useCart();
  const { locale, m } = useLocale();
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD"
  });

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">{m.cart.empty}</p>
          <Button asChild className="mt-4">
            <Link href="/products">{m.cart.startShopping}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {state.items.map((item) => (
        <Card key={item.productId}>
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{currency.format(item.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  dispatch({
                    type: "updateQuantity",
                    payload: { productId: item.productId, quantity: item.quantity - 1 }
                  })
                }
              >
                -
              </Button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  dispatch({
                    type: "updateQuantity",
                    payload: { productId: item.productId, quantity: item.quantity + 1 }
                  })
                }
              >
                +
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  dispatch({
                    type: "remove",
                    payload: { productId: item.productId }
                  })
                }
              >
                {m.cart.remove}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
