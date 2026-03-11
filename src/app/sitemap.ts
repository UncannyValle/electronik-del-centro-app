import { getShopifyProducts } from "@/lib/storefront/products"
import type { MetadataRoute } from "next"

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/products`,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/about`,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/contact`,
    changeFrequency: "monthly",
    priority: 0.5,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getShopifyProducts("ES")

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.handle}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}