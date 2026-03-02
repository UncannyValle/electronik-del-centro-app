"use client"

import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo, useReducer } from "react"

import { ProductCard } from "@/components/store/product-card"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/hooks/use-locale"
import type { Product } from "@/lib/types"

type ProductSearchGridProps = {
  products: Product[]
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "top-rated"
type PriceRange = "all" | "under-500" | "500-1000" | "over-1000"
type CategoryFilter = "all" | Product["category"]

type FiltersState = {
  query: string
  category: CategoryFilter
  priceRange: PriceRange
  brand: string
  availableOnly: boolean
  sort: SortOption
}

type FiltersAction =
  | { type: "setQuery"; payload: string }
  | { type: "setCategory"; payload: CategoryFilter }
  | { type: "setPriceRange"; payload: PriceRange }
  | { type: "setBrand"; payload: string }
  | { type: "toggleAvailable" }
  | { type: "setSort"; payload: SortOption }

function mapCategorySlugToFilter(slug: string | null): CategoryFilter {
  switch (slug) {
    case "head-units":
    case "speakers":
    case "subwoofers":
    case "amplifiers":
    case "cameras":
    case "installation":
      return "car-stereo"
    default:
      return "all"
  }
}

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
    case "setSort":
      return { ...state, sort: action.payload }
    default:
      return state
  }
}

function getProductRating(product: Product) {
  const hash = product.id.split("").reduce((total, char) => total + char.charCodeAt(0), 0)
  return 3.8 + (hash % 12) / 10
}

export function ProductSearchGrid({ products }: ProductSearchGridProps) {
  const { m } = useLocale()
  const searchParams = useSearchParams()
  const initialCategory = mapCategorySlugToFilter(searchParams.get("category"))
  const [filters, dispatch] = useReducer(filtersReducer, {
    query: "",
    category: initialCategory,
    priceRange: "all",
    brand: "all",
    availableOnly: false,
    sort: "relevance",
  })

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.title.split(" ")[0]))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [products],
  )

  const filteredProducts = useMemo(() => {
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
        m.productDescriptions[product.handle] ??
        m.productDescriptions[product.id] ??
        product.description

      const brand = product.title.split(" ")[0]
      const title = normalizeText(product.title)
      const description = normalizeText(localizedDescription)
      const matchesQuery =
        !normalizedQuery || title.includes(normalizedQuery) || description.includes(normalizedQuery)
      const matchesCategory = filters.category === "all" || product.category === filters.category
      const matchesBrand = filters.brand === "all" || brand === filters.brand
      const matchesAvailability = !filters.availableOnly || product.stock > 0
      const matchesPriceRange =
        filters.priceRange === "all" ||
        (filters.priceRange === "under-500" && product.price < 500) ||
        (filters.priceRange === "500-1000" && product.price >= 500 && product.price <= 1000) ||
        (filters.priceRange === "over-1000" && product.price > 1000)

      return (
        matchesQuery && matchesCategory && matchesBrand && matchesAvailability && matchesPriceRange
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
  }, [filters, m.productDescriptions, products])

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: "relevance", label: "Relevancia" },
    { id: "price-asc", label: "Precio: menor a mayor" },
    { id: "price-desc", label: "Precio: mayor a menor" },
    { id: "newest", label: "Más nuevos" },
    { id: "top-rated", label: "Mejor calificados" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4 rounded-lg border border-border bg-card/40 p-4 text-sm">
        <div className="space-y-2">
          <p className="font-semibold">Categoría</p>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.category}
            onChange={(event) =>
              dispatch({ type: "setCategory", payload: event.target.value as CategoryFilter })
            }
          >
            <option value="all">Todas</option>
            <option value="electronics">{m.products.categoryElectronics}</option>
            <option value="car-stereo">{m.products.categoryCarStereo}</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Rango de precio</p>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.priceRange}
            onChange={(event) =>
              dispatch({ type: "setPriceRange", payload: event.target.value as PriceRange })
            }
          >
            <option value="all">Todo</option>
            <option value="under-500">Menos de $500</option>
            <option value="500-1000">$500 a $1000</option>
            <option value="over-1000">Más de $1000</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Marca</p>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.brand}
            onChange={(event) => dispatch({ type: "setBrand", payload: event.target.value })}
          >
            <option value="all">Todas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={() => dispatch({ type: "toggleAvailable" })}
          />
          <span>Solo disponibles</span>
        </label>
      </aside>

      <div className="space-y-6">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={filters.query}
            onChange={(event) => dispatch({ type: "setQuery", payload: event.target.value })}
            placeholder={m.products.searchPlaceholder}
            aria-label={m.products.searchPlaceholder}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => dispatch({ type: "setSort", payload: option.id })}
              className={`rounded-full border px-3 py-1 transition-colors ${
                filters.sort === option.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            {m.products.noResults}
          </p>
        )}
      </div>
    </div>
  )
}
