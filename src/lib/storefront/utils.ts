import type { StorefrontLanguageCode } from "@/lib/storefront/types"
import type { ContactInfo } from "@/lib/types"

export function normalizeStoreDomain(storeDomain: string): string {
  if (storeDomain.startsWith("https://")) {
    return storeDomain
  }

  if (storeDomain.startsWith("http://")) {
    return storeDomain.replace("http://", "https://")
  }

  return `https://${storeDomain}`
}

export function isLikelyDevStore(storeDomain: string): boolean {
  const host = storeDomain.replace(/^https?:\/\//, "").toLowerCase()
  return /(^|[-.])dev($|[-.])|development/.test(host)
}

export function isVercelProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production"
}

export function getContactInfoFallback(): ContactInfo {
  return {
    phone: process.env.STORE_CONTACT_PHONE ?? "",
    email: process.env.STORE_CONTACT_EMAIL ?? "",
    addressLine1: process.env.STORE_CONTACT_ADDRESS_LINE_1 ?? "",
    cityStateZip: process.env.STORE_CONTACT_CITY_STATE_ZIP ?? "",
    facebookUrl: process.env.STORE_CONTACT_FACEBOOK_URL ?? "",
    instagramUrl: process.env.STORE_CONTACT_INSTAGRAM_URL ?? "",
  }
}

export function resolveStorefrontConfig() {
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

export function resolveCategory(productType: string) {
  const categoryLabel = resolveCategoryLabel(productType)

  return {
    categoryLabel,
    categorySlug: toCategorySlug(categoryLabel),
  }
}

export function toStorefrontLanguageCode(locale: "en" | "es"): StorefrontLanguageCode {
  return locale === "en" ? "EN" : "ES"
}
