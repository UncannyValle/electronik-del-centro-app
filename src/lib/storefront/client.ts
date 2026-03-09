import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import {
  isLikelyDevStore,
  isVercelProductionDeployment,
  normalizeStoreDomain,
  resolveStorefrontConfig,
} from "@/lib/storefront/utils"

export function getShopifyClient() {
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

  const accessTokenConfig = privateAccessToken
    ? { privateAccessToken }
    : { publicAccessToken: publicAccessToken as string }

  return createStorefrontApiClient({
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion,
    ...accessTokenConfig,
  })
}
