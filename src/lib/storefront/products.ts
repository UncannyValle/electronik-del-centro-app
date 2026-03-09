import "server-only"

import { getShopifyClient } from "@/lib/storefront/client"
import {
  assertProductByHandleContract,
  assertProductsContract,
} from "@/lib/storefront/contracts"
import { assertStorefrontData, throwIfStorefrontErrors } from "@/lib/storefront/errors"
import { mapStorefrontProduct } from "@/lib/storefront/mappers"
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/storefront/queries"
import { STOREFRONT_CACHE_POLICY, applyStorefrontCachePolicy } from "@/lib/storefront/cache"
import type {
  ProductByHandleQueryResponse,
  ProductsQueryResponse,
  StorefrontLanguageCode,
} from "@/lib/storefront/types"
import type { Product } from "@/lib/types"

export async function getShopifyProducts(language: StorefrontLanguageCode): Promise<Product[]> {
  "use cache"
  applyStorefrontCachePolicy(STOREFRONT_CACHE_POLICY.products)

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductsQueryResponse>(PRODUCTS_QUERY, {
    variables: { first: 24, language },
  })

  throwIfStorefrontErrors({ errors })

  const safeData = assertStorefrontData(data)
  assertProductsContract(safeData)

  return safeData.products.nodes.map(mapStorefrontProduct)
}

export async function getShopifyFeaturedProducts(
  language: StorefrontLanguageCode,
): Promise<Product[]> {
  "use cache"
  applyStorefrontCachePolicy(STOREFRONT_CACHE_POLICY.featuredProducts)

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductsQueryResponse>(PRODUCTS_QUERY, {
    variables: { first: 12, query: "tag:featured", language },
  })

  throwIfStorefrontErrors({ errors })

  const safeData = assertStorefrontData(data)
  assertProductsContract(safeData)

  return safeData.products.nodes.map(mapStorefrontProduct)
}

export async function getShopifyProductByHandle(
  handle: string,
  language: StorefrontLanguageCode,
): Promise<Product | null> {
  "use cache"
  applyStorefrontCachePolicy(STOREFRONT_CACHE_POLICY.productByHandle)

  const client = getShopifyClient()
  const { data, errors } = await client.request<ProductByHandleQueryResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    {
      variables: { handle, language },
    },
  )

  throwIfStorefrontErrors({ errors })

  const safeData = assertStorefrontData(data)
  assertProductByHandleContract(safeData)

  return safeData.product ? mapStorefrontProduct(safeData.product) : null
}
