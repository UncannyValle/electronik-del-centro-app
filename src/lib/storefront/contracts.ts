import type {
  ProductByHandleQueryResponse,
  ProductsQueryResponse,
  ShopContactQueryResponse,
  StorefrontMetafieldNode,
  StorefrontProductNode,
} from "@/lib/storefront/types"

function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isStorefrontProductNode(value: unknown): value is StorefrontProductNode {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.handle) &&
    isString(value.title) &&
    isString(value.description) &&
    isString(value.productType) &&
    Array.isArray(value.tags) &&
    isRecord(value.priceRange) &&
    isRecord(value.priceRange.minVariantPrice) &&
    isString(value.priceRange.minVariantPrice.amount) &&
    isString(value.priceRange.minVariantPrice.currencyCode) &&
    typeof value.availableForSale === "boolean"
  )
}

function isStorefrontMetafieldNode(value: unknown): value is StorefrontMetafieldNode {
  if (!isRecord(value)) {
    return false
  }

  return isString(value.key) && (value.value === null || isString(value.value))
}

export function assertProductsContract(
  data: ProductsQueryResponse,
): asserts data is ProductsQueryResponse {
  if (!isRecord(data) || !isRecord(data.products) || !Array.isArray(data.products.nodes)) {
    throw new Error("Invalid Shopify products response shape.")
  }

  const isValid = data.products.nodes.every((node) => isStorefrontProductNode(node))

  if (!isValid) {
    throw new Error("Invalid Shopify products node shape.")
  }
}

export function assertProductByHandleContract(
  data: ProductByHandleQueryResponse,
): asserts data is ProductByHandleQueryResponse {
  if (!isRecord(data) || !(data.product === null || isStorefrontProductNode(data.product))) {
    throw new Error("Invalid Shopify product-by-handle response shape.")
  }
}

export function assertContactContract(
  data: ShopContactQueryResponse,
): asserts data is ShopContactQueryResponse {
  if (!isRecord(data) || !isRecord(data.shop) || !Array.isArray(data.shop.metafields)) {
    throw new Error("Invalid Shopify contact response shape.")
  }

  const isValid = data.shop.metafields.every(
    (field) => field === null || isStorefrontMetafieldNode(field),
  )

  if (!isValid) {
    throw new Error("Invalid Shopify contact metafields shape.")
  }
}
