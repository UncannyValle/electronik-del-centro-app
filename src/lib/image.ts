export const PRODUCT_IMAGE_PLACEHOLDER = "/images/product-placeholder.svg"

export function normalizeImageSrc(src?: string | null): string {
  if (!src) {
    return PRODUCT_IMAGE_PLACEHOLDER
  }

  const trimmed = src.trim()
  if (trimmed.length === 0) {
    return PRODUCT_IMAGE_PLACEHOLDER
  }

  return trimmed
}
