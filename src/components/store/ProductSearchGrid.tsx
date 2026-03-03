"use client"

import { Search } from "lucide-react"
import { useMemo } from "react"

import { ProductCard } from "@/components/store/ProductCard"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/hooks/useLocale"
import type { CategoryFilter, PriceRange, SortOption } from "@/hooks/useProductFilters"
import { useProductFilters } from "@/hooks/useProductFilters"
import { filterProducts } from "@/lib/filterProducts"
import type { Product } from "@/lib/types"

type ProductSearchGridProps = {
  products: Product[]
}

export function ProductSearchGrid({ products }: ProductSearchGridProps) {
  const { m } = useLocale()
  const { filters, dispatch, categories, brands } = useProductFilters(products)

  const filteredProducts = useMemo(
    () => filterProducts(products, filters, m.productDescriptions),
    [filters, m.productDescriptions, products],
  )

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
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
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
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={() => dispatch({ type: "toggleFeatured" })}
          />
          <span>Solo ofertas</span>
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
