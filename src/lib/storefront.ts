import "server-only"

import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { cacheLife } from "next/cache"
import { getServerLocale } from "@/lib/i18n/server"
import { normalizeImageSrc } from "@/lib/image"
import { products } from "@/lib/mock-data"
import type { Product, StorefrontClient } from "@/lib/types"

async function getMockedProducts() {
  "use cache"
  cacheLife("max")
  return products
}

async function getMockedFeaturedProducts() {
  "use cache"
  cacheLife("max")
  return products.filter((product) => product.featured)
}

async function getMockedProductByHandle(handle: string) {
  "use cache"
  cacheLife("max")
  return products.find((product) => product.handle === handle) ?? null
}

const mockedStorefrontClient: StorefrontClient = {
  async getProducts() {
    return getMockedProducts()
  },
  async getFeaturedProducts() {
    return getMockedFeaturedProducts()
  },
  async getProductByHandle(handle) {
    return getMockedProductByHandle(handle)
  },
}

type StorefrontLanguageCode = "EN" | "ES"

type StorefrontProductNode = {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  tags: string[]
  featuredImage: {
    url: string
  } | null
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  } | null
  availableForSale: boolean
}

const PRODUCTS_QUERY = /* GraphQL */ `
  #graphql
  query Products($first: Int!, $query: String, $language: LanguageCode)
    @inContext(language: $language) {
    products(first: $first, query: $query) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        availableForSale
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!, $language: LanguageCode)
    @inContext(language: $language) {
    product(handle: $handle) {
      id
      handle
      title
      description
      productType
      tags
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
        }
      }
      availableForSale
    }
  }
`

function normalizeStoreDomain(storeDomain: string): string {
  if (storeDomain.startsWith("https://")) {
    return storeDomain
  }

  return `https://${storeDomain}`
}

function inferCategory(productType: string): Product["category"] {
  const type = productType.toLowerCase()

  if (
    type.includes("car") ||
    type.includes("stereo") ||
    type.includes("audio") ||
    type.includes("subwoofer") ||
    type.includes("amplifier")
  ) {
    return "car-stereo"
  }

  return "electronics"
}

function toStorefrontLanguageCode(
  locale: Awaited<ReturnType<typeof getServerLocale>>,
): StorefrontLanguageCode {
  return locale === "en" ? "EN" : "ES"
}

function mapStorefrontProduct(node: StorefrontProductNode): Product {
  const stock = node.availableForSale ? 1 : 0
  const compareAt = Number(node.compareAtPriceRange?.maxVariantPrice.amount ?? "0")

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: inferCategory(node.productType),
    price: Number(node.priceRange.minVariantPrice.amount),
    compareAtPrice: compareAt > 0 ? compareAt : undefined,
    image: normalizeImageSrc(node.featuredImage?.url),
    stock,
    featured: node.tags.some((tag) => tag.toLowerCase() === "featured"),
  }
}

function getShopifyClient() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-01"
  const privateAccessToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN

  if (!storeDomain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  }

  if (!privateAccessToken && !publicAccessToken) {
    throw new Error(
      "Missing Shopify Storefront access token. Set SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN or SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN.",
    )
  }

  // The Shopify client accepts exactly one token type.
  const accessTokenConfig = privateAccessToken
    ? { privateAccessToken }
    : { publicAccessToken: publicAccessToken as string }

  return createStorefrontApiClient({
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion,
    ...accessTokenConfig,
  })
}

const shopifyStorefrontClient: StorefrontClient = {
  async getProducts() {
    const language = toStorefrontLanguageCode(await getServerLocale())
    return getShopifyProducts(language)
  },
  async getFeaturedProducts() {
    const language = toStorefrontLanguageCode(await getServerLocale())
    const featured = await getShopifyFeaturedProducts(language)

    if (featured.length > 0) {
      return featured
    }

    return (await getShopifyProducts(language)).slice(0, 6)
  },
  async getProductByHandle(handle) {
    const language = toStorefrontLanguageCode(await getServerLocale())
    return getShopifyProductByHandle(handle, language)
  },
}

async function getShopifyProducts(language: StorefrontLanguageCode): Promise<Product[]> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    products: { nodes: StorefrontProductNode[] }
  }>(PRODUCTS_QUERY, {
    variables: { first: 24, language },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return data.products.nodes.map(mapStorefrontProduct)
}

async function getShopifyFeaturedProducts(language: StorefrontLanguageCode): Promise<Product[]> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    products: { nodes: StorefrontProductNode[] }
  }>(PRODUCTS_QUERY, {
    variables: { first: 12, query: "tag:featured", language },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return data.products.nodes.map(mapStorefrontProduct)
}

async function getShopifyProductByHandle(
  handle: string,
  language: StorefrontLanguageCode,
): Promise<Product | null> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    product: StorefrontProductNode | null
  }>(PRODUCT_BY_HANDLE_QUERY, {
    variables: { handle, language },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return data.product ? mapStorefrontProduct(data.product) : null
}

function shouldUseDummyData() {
  return process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true"
}

// Keep this boundary stable, so replacing mock data with Shopify Storefront API is straightforward.
export const storefront = {
  async getProducts() {
    if (shouldUseDummyData()) {
      return mockedStorefrontClient.getProducts()
    }

    return shopifyStorefrontClient.getProducts()
  },
  async getFeaturedProducts() {
    if (shouldUseDummyData()) {
      return mockedStorefrontClient.getFeaturedProducts()
    }

    return shopifyStorefrontClient.getFeaturedProducts()
  },
  async getProductByHandle(handle: string): Promise<Product | null> {
    if (shouldUseDummyData()) {
      return mockedStorefrontClient.getProductByHandle(handle)
    }

    return shopifyStorefrontClient.getProductByHandle(handle)
  },
}
