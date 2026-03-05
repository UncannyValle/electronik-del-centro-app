import "server-only"

import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { cacheLife } from "next/cache"
import { getServerLocale } from "@/lib/i18n/server"
import { normalizeImageSrc } from "@/lib/image"
import type { ContactInfo, Product, ProductVariant, StorefrontClient } from "@/lib/types"

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
  images: {
    nodes: { url: string }[]
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  } | null
  variants?: {
    nodes: {
      id: string
      title: string
      availableForSale: boolean
    }[]
  }
  selectedOrFirstAvailableVariant?: {
    id: string
  } | null
  availableForSale: boolean
}

type StorefrontMetafieldNode = {
  key: string
  value: string | null
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
        images(first: 3) {
          nodes {
            url
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
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
      images(first: 3) {
        nodes {
          url
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
        }
      }
      selectedOrFirstAvailableVariant {
        id
      }
      availableForSale
    }
  }
`

const SHOP_CONTACT_QUERY = /* GraphQL */ `
  query ShopContact {
    shop {
      metafields(
        identifiers: [
          { namespace: "store", key: "phone" }
          { namespace: "store", key: "email" }
          { namespace: "store", key: "address_line_1" }
          { namespace: "store", key: "city_state_zip" }
          { namespace: "store", key: "facebook_url" }
          { namespace: "store", key: "instagram_url" }
        ]
      ) {
        key
        value
      }
    }
  }
`

function normalizeStoreDomain(storeDomain: string): string {
  if (storeDomain.startsWith("https://")) {
    return storeDomain
  }

  if (storeDomain.startsWith("http://")) {
    return storeDomain.replace("http://", "https://")
  }

  return `https://${storeDomain}`
}

function isLikelyDevStore(storeDomain: string): boolean {
  const host = storeDomain.replace(/^https?:\/\//, "").toLowerCase()
  return /(^|[-.])dev($|[-.])|development/.test(host)
}

function isVercelProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production"
}

function getContactInfoFallback(): ContactInfo {
  return {
    phone: process.env.STORE_CONTACT_PHONE ?? "",
    email: process.env.STORE_CONTACT_EMAIL ?? "",
    addressLine1: process.env.STORE_CONTACT_ADDRESS_LINE_1 ?? "",
    cityStateZip: process.env.STORE_CONTACT_CITY_STATE_ZIP ?? "",
    facebookUrl: process.env.STORE_CONTACT_FACEBOOK_URL ?? "",
    instagramUrl: process.env.STORE_CONTACT_INSTAGRAM_URL ?? "",
  }
}

function resolveStorefrontConfig() {
  const endpoint = process.env.SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT?.trim()
  let storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
  let apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() ?? "2025-10"

  if (endpoint) {
    const parsedEndpoint = new URL(endpoint)
    const endpointVersionMatch = parsedEndpoint.pathname.match(/\/api\/([^/]+)\/graphql\.json$/)

    if (!endpointVersionMatch) {
      throw new Error(
        "Invalid SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT. Expected format: https://{store}.myshopify.com/api/{version}/graphql.json",
      )
    }

    storeDomain = `${parsedEndpoint.protocol}//${parsedEndpoint.host}`
    apiVersion = endpointVersionMatch[1]
  }

  if (!storeDomain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT")
  }

  return {
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion,
  }
}

function resolveCategoryLabel(productType: string): string {
  const label = productType.trim()
  return label.length > 0 ? label : "General"
}

function toCategorySlug(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug.length > 0 ? slug : "general"
}

function toStorefrontLanguageCode(
  locale: Awaited<ReturnType<typeof getServerLocale>>,
): StorefrontLanguageCode {
  return locale === "en" ? "EN" : "ES"
}

function mapStorefrontProduct(node: StorefrontProductNode): Product {
  const stock = node.availableForSale ? 1 : 0
  const compareAt = Number(node.compareAtPriceRange?.maxVariantPrice.amount ?? "0")
  const categoryLabel = resolveCategoryLabel(node.productType)
  const featuredImage = normalizeImageSrc(node.featuredImage?.url)
  const imageCandidates = [
    featuredImage,
    ...node.images.nodes.map((image) => normalizeImageSrc(image.url)),
  ]
  const images = [...new Set(imageCandidates)]
  const variantsFromApi: ProductVariant[] = (node.variants?.nodes ?? []).map((variant) => ({
    id: variant.id,
    title: variant.title,
    availableForSale: variant.availableForSale,
  }))
  const fallbackVariant: ProductVariant = {
    id: `${node.id}-default`,
    title: "Default",
    availableForSale: node.availableForSale,
  }
  const variants = variantsFromApi.length > 0 ? variantsFromApi : [fallbackVariant]
  const selectedVariantId = node.selectedOrFirstAvailableVariant?.id ?? variants[0].id

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: categoryLabel,
    categorySlug: toCategorySlug(categoryLabel),
    price: Number(node.priceRange.minVariantPrice.amount),
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    compareAtPrice: compareAt > 0 ? compareAt : undefined,
    image: featuredImage,
    images,
    stock,
    variants,
    selectedVariantId,
    featured: node.tags.some((tag) => tag.toLowerCase() === "featured"),
  }
}

function mapShopContactInfo(metafields: (StorefrontMetafieldNode | null)[]): ContactInfo {
  const fallbackContactInfo = getContactInfoFallback()
  const valueByKey = new Map<string, string>()
  for (const field of metafields) {
    if (field?.key && field.value) {
      valueByKey.set(field.key, field.value)
    }
  }

  return {
    phone: valueByKey.get("phone") ?? fallbackContactInfo.phone,
    email: valueByKey.get("email") ?? fallbackContactInfo.email,
    addressLine1: valueByKey.get("address_line_1") ?? fallbackContactInfo.addressLine1,
    cityStateZip: valueByKey.get("city_state_zip") ?? fallbackContactInfo.cityStateZip,
    facebookUrl: valueByKey.get("facebook_url") ?? fallbackContactInfo.facebookUrl,
    instagramUrl: valueByKey.get("instagram_url") ?? fallbackContactInfo.instagramUrl,
  }
}

function getShopifyClient() {
  const { storeDomain, apiVersion } = resolveStorefrontConfig()
  const privateAccessToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN

  if (isVercelProductionDeployment() && isLikelyDevStore(storeDomain)) {
    throw new Error(
      `Refusing to run in production with a dev Shopify store endpoint (${storeDomain}). Point SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT or SHOPIFY_STORE_DOMAIN to your production store.`,
    )
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
  async getContactInfo() {
    return getShopifyContactInfo()
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

async function getShopifyContactInfo(): Promise<ContactInfo> {
  "use cache"
  cacheLife("hours")

  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    shop: {
      metafields: (StorefrontMetafieldNode | null)[]
    }
  }>(SHOP_CONTACT_QUERY)

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return mapShopContactInfo(data.shop.metafields)
}

export const storefront: StorefrontClient = shopifyStorefrontClient
