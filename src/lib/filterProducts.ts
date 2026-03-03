import type { FiltersState } from "@/hooks/useProductFilters"
import { hasOffer } from "./productUtils"
import type { Product } from "./types"

function getProductRating(product: Product) {
  const hash = product.id.split("").reduce((total, char) => total + char.charCodeAt(0), 0)
  return 3.8 + (hash % 12) / 10
}

export function filterProducts(
  products: Product[],
  filters: FiltersState,
  productDescriptions: Record<string, string>,
): Product[] {
  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const normalizedQuery = normalizeText(filters.query)
  const withIndex = products.map((product, index) => ({ product, index }))

  const visible = withIndex.filter(({ product }) => {
    const localizedDescription =
      productDescriptions[product.handle] ?? productDescriptions[product.id] ?? product.description

    const brand = product.title.split(" ")[0]
    const title = normalizeText(product.title)
    const description = normalizeText(localizedDescription)

    const matchesQuery =
      !normalizedQuery || title.includes(normalizedQuery) || description.includes(normalizedQuery)
    const matchesCategory = filters.category === "all" || product.categorySlug === filters.category
    const matchesBrand = filters.brand === "all" || brand === filters.brand
    const matchesAvailability = !filters.availableOnly || product.stock > 0
    const matchesFeatured = !filters.featured || hasOffer(product)
    const matchesPriceRange =
      filters.priceRange === "all" ||
      (filters.priceRange === "under-500" && product.price < 500) ||
      (filters.priceRange === "500-1000" && product.price >= 500 && product.price <= 1000) ||
      (filters.priceRange === "over-1000" && product.price > 1000)

    return (
      matchesQuery &&
      matchesCategory &&
      matchesBrand &&
      matchesAvailability &&
      matchesFeatured &&
      matchesPriceRange
    )
  })

  const sorted = [...visible].sort((left, right) => {
    if (filters.sort === "price-asc") return left.product.price - right.product.price
    if (filters.sort === "price-desc") return right.product.price - left.product.price
    if (filters.sort === "newest") return right.index - left.index
    if (filters.sort === "top-rated") {
      return getProductRating(right.product) - getProductRating(left.product)
    }
    return left.index - right.index
  })

  return sorted.map(({ product }) => product)
}
