"use client";

import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  product,
  quantity = 1
}: {
  product: Product;
  quantity?: number;
}) {
  const { dispatch } = useCart();
  const disabled = product.stock < 1;

  return (
    <Button
      disabled={disabled}
      onClick={() =>
        dispatch({
          type: "add",
          payload: {
            productId: product.id,
            title: product.title,
            handle: product.handle,
            image: product.image,
            price: product.price,
            quantity
          }
        })
      }
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
