import { useCart as useCartContext } from "@/context/cartContext"

export function useCart() {
  return useCartContext()
}
