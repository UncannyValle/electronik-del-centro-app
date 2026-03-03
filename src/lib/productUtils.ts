import type { Product } from "./types"

export function hasOffer(product: Product): boolean {
  return product.compareAtPrice !== undefined && product.compareAtPrice > product.price
}

export function getProductsWithOffers(products: Product[]): Product[] {
  return products.filter(hasOffer)
}
