"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import type { Product } from "@/lib/types"

export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "top-rated"
export type PriceRange = "all" | "under-500" | "500-1000" | "over-1000"
export type CategoryFilter = "all" | Product["categorySlug"]

export type FiltersState = {
  query: string
  category: CategoryFilter
  priceRange: PriceRange
  brand: string
  availableOnly: boolean
  featured: boolean
  sort: SortOption
}

type FiltersAction =
  | { type: "setQuery"; payload: string }
  | { type: "setCategory"; payload: CategoryFilter }
  | { type: "setPriceRange"; payload: PriceRange }
  | { type: "setBrand"; payload: string }
  | { type: "toggleAvailable" }
  | { type: "toggleFeatured" }
  | { type: "setSort"; payload: SortOption }
  | { type: "initFromURL"; payload: Partial<FiltersState> }

function filtersReducer(state: FiltersState, action: FiltersAction): FiltersState {
  switch (action.type) {
    case "setQuery":
      return { ...state, query: action.payload }
    case "setCategory":
      return { ...state, category: action.payload }
    case "setPriceRange":
      return { ...state, priceRange: action.payload }
    case "setBrand":
      return { ...state, brand: action.payload }
    case "toggleAvailable":
      return { ...state, availableOnly: !state.availableOnly }
    case "toggleFeatured":
      return { ...state, featured: !state.featured }
    case "setSort":
      return { ...state, sort: action.payload }
    case "initFromURL":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function useProductFilters(products: Product[]) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>()
    for (const product of products) {
      if (!categoryMap.has(product.categorySlug)) {
        categoryMap.set(product.categorySlug, product.category)
      }
    }
    return Array.from(categoryMap, ([slug, label]) => ({ slug, label }))
  }, [products])

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.title.split(" ")[0]))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [products],
  )

  const initialState: FiltersState = {
    query: "",
    category: "all",
    priceRange: "all",
    brand: "all",
    availableOnly: false,
    featured: false,
    sort: "relevance",
  }

  const [filters, dispatch] = useReducer(filtersReducer, initialState)
  const hasInitializedFromURL = useRef(false)

  // Initialize from URL params once when required inputs are ready.
  useEffect(() => {
    if (hasInitializedFromURL.current) return

    const categoryParam = searchParams.get("category")
    const priceParam = searchParams.get("price")
    const brandParam = searchParams.get("brand")
    const availableParam = searchParams.get("available")
    const featuredParam = searchParams.get("featured")
    const sortParam = searchParams.get("sort")

    const urlFilters: Partial<FiltersState> = {}

    if (categoryParam && categories.some((c) => c.slug === categoryParam)) {
      urlFilters.category = categoryParam as CategoryFilter
    }

    if (priceParam && ["all", "under-500", "500-1000", "over-1000"].includes(priceParam)) {
      urlFilters.priceRange = priceParam as PriceRange
    }

    if (brandParam && (brandParam === "all" || brands.includes(brandParam))) {
      urlFilters.brand = brandParam
    }

    if (availableParam === "true") {
      urlFilters.availableOnly = true
    }

    if (featuredParam === "true") {
      urlFilters.featured = true
    }

    if (
      sortParam &&
      ["relevance", "price-asc", "price-desc", "newest", "top-rated"].includes(sortParam)
    ) {
      urlFilters.sort = sortParam as SortOption
    }

    if (Object.keys(urlFilters).length > 0) {
      dispatch({ type: "initFromURL", payload: urlFilters })
    }
    hasInitializedFromURL.current = true
  }, [brands, categories, searchParams])

  // Update URL when filters change
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()

    if (filters.category !== "all") params.set("category", filters.category)
    if (filters.priceRange !== "all") params.set("price", filters.priceRange)
    if (filters.brand !== "all") params.set("brand", filters.brand)
    if (filters.availableOnly) params.set("available", "true")
    if (filters.featured) params.set("featured", "true")
    if (filters.sort !== "relevance") params.set("sort", filters.sort)

    const queryString = params.toString()
    const newURL = queryString ? `/products?${queryString}` : "/products"

    router.replace(newURL, { scroll: false })
  }, [filters, router])

  useEffect(() => {
    updateURL()
  }, [updateURL])

  return {
    filters,
    dispatch,
    categories,
    brands,
  }
}
