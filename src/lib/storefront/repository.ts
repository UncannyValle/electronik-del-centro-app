import "server-only"

import { getServerLocale } from "@/lib/i18n/server"
import { getShopifyContactInfo } from "@/lib/storefront/contact"
import {
  getShopifyFeaturedProducts,
  getShopifyProductByHandle,
  getShopifyProducts,
} from "@/lib/storefront/products"
import { toStorefrontLanguageCode } from "@/lib/storefront/utils"
import type { StorefrontClient } from "@/lib/types"

const shopifyStorefrontRepository: StorefrontClient = {
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

export const storefront: StorefrontClient = shopifyStorefrontRepository
