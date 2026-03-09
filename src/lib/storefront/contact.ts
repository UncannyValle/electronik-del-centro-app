import "server-only"

import { STOREFRONT_CACHE_POLICY, applyStorefrontCachePolicy } from "@/lib/storefront/cache"
import { getShopifyClient } from "@/lib/storefront/client"
import { assertContactContract } from "@/lib/storefront/contracts"
import { assertStorefrontData, throwIfStorefrontErrors } from "@/lib/storefront/errors"
import { mapShopContactInfo } from "@/lib/storefront/mappers"
import { SHOP_CONTACT_QUERY } from "@/lib/storefront/queries"
import type { ShopContactQueryResponse } from "@/lib/storefront/types"
import type { ContactInfo } from "@/lib/types"

export async function getShopifyContactInfo(): Promise<ContactInfo> {
  "use cache"
  applyStorefrontCachePolicy(STOREFRONT_CACHE_POLICY.contactInfo)

  const client = getShopifyClient()
  const { data, errors } = await client.request<ShopContactQueryResponse>(SHOP_CONTACT_QUERY)

  throwIfStorefrontErrors({ errors })

  const safeData = assertStorefrontData(data)
  assertContactContract(safeData)

  return mapShopContactInfo(safeData.shop.metafields)
}
