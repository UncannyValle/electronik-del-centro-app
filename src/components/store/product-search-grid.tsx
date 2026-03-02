"use client"

import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import { ProductCard } from "@/components/store/product-card"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/hooks/use-locale"
import type { Product } from "@/lib/types"

type ProductSearchGridProps = {
  products: Product[]
}

export function ProductSearchGrid({ products }: ProductSearchGridProps) {
  const { m } = useLocale()
  const [query, setQuery] = useState("")

  const filteredProducts = useMemo(() => {
    const normalizeText = (value: string) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()

    const normalizedQuery = normalizeText(query)
    if (!normalizedQuery) {
      return products
    }

    return products.filter((product) => {
      const localizedDescription =
        m.productDescriptions[product.handle] ??
        m.productDescriptions[product.id] ??
        product.description
      const title = normalizeText(product.title)
      const description = normalizeText(localizedDescription)
      return title.includes(normalizedQuery) || description.includes(normalizedQuery)
    })
  }, [m.productDescriptions, products, query])

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={m.products.searchPlaceholder}
          aria-label={m.products.searchPlaceholder}
          className="pl-9"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{m.products.noResults}</p>
      )}
    </div>
  )
}
