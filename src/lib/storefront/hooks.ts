import "server-only"

import { cacheLife } from "next/cache"
import { getShopifyClient } from "@/lib/storefront/client"
import { mapShopContactInfo, mapStorefrontProduct } from "@/lib/storefront/mappers"
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  SHOP_CONTACT_QUERY,
} from "@/lib/storefront/queries"
import type {
  ProductByHandleQueryResponse,
  ProductsQueryResponse,
  ShopContactQueryResponse,
  StorefrontLanguageCode,
} from "@/lib/storefront/types"
import type { ContactInfo, Product } from "@/lib/types"

export async function getShopifyProducts(language: StorefrontLanguageCode): Promise<Product[]> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductsQueryResponse>(PRODUCTS_QUERY, {
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

export async function getShopifyFeaturedProducts(
  language: StorefrontLanguageCode,
): Promise<Product[]> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductsQueryResponse>(PRODUCTS_QUERY, {
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

export async function getShopifyProductByHandle(
  handle: string,
  language: StorefrontLanguageCode,
): Promise<Product | null> {
  "use cache"
  cacheLife("minutes")

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductByHandleQueryResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    {
      variables: { handle, language },
    },
  )

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return data.product ? mapStorefrontProduct(data.product) : null
}

export async function getShopifyContactInfo(): Promise<ContactInfo> {
  "use cache"
  cacheLife("hours")

  const client = getShopifyClient()
  const { data, errors } = await client.request<ShopContactQueryResponse>(SHOP_CONTACT_QUERY)

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "))
  }
  if (!data) {
    throw new Error("Shopify Storefront request returned no data.")
  }

  return mapShopContactInfo(data.shop.metafields)
}
