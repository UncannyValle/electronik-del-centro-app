import type { ContactInfo, Product } from "@/lib/types"

export type StorefrontLanguageCode = "EN" | "ES"

export type StorefrontProductNode = {
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

export type StorefrontMetafieldNode = {
  key: string
  value: string | null
}

export type ProductsQueryResponse = {
  products: { nodes: StorefrontProductNode[] }
}

export type ProductByHandleQueryResponse = {
  product: StorefrontProductNode | null
}

export type ShopContactQueryResponse = {
  shop: {
    metafields: (StorefrontMetafieldNode | null)[]
  }
}

export type ContactInfoResolver = () => ContactInfo

export type ProductMapper = (node: StorefrontProductNode) => Product
