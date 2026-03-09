import { normalizeImageSrc } from "@/lib/image"
import type { StorefrontMetafieldNode, StorefrontProductNode } from "@/lib/storefront/types"
import { getContactInfoFallback, resolveCategory } from "@/lib/storefront/utils"
import type { ContactInfo, Product, ProductVariant } from "@/lib/types"

export function mapStorefrontProduct(node: StorefrontProductNode): Product {
  const stock = node.availableForSale ? 1 : 0
  const compareAt = Number(node.compareAtPriceRange?.maxVariantPrice.amount ?? "0")
  const { categoryLabel, categorySlug } = resolveCategory(node.productType)
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
    categorySlug,
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

export function mapShopContactInfo(metafields: (StorefrontMetafieldNode | null)[]): ContactInfo {
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
