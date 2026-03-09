import { cacheLife } from "next/cache"

export const STOREFRONT_CACHE_POLICY = {
  products: "minutes",
  featuredProducts: "minutes",
  productByHandle: "minutes",
  contactInfo: "hours",
} as const

export type StorefrontCachePolicy =
  (typeof STOREFRONT_CACHE_POLICY)[keyof typeof STOREFRONT_CACHE_POLICY]

export function applyStorefrontCachePolicy(policy: StorefrontCachePolicy) {
  cacheLife(policy)
}
