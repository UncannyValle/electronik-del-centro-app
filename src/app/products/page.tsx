import { Suspense } from "react"
import { ProductSearchGrid } from "@/components/store/product-search-grid"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"
import LoadingProducts from "./loading"

async function ProductsGrid() {
  const products = await storefront.getProducts()
  return <ProductSearchGrid products={products} />
}

export default async function ProductsPage() {
  const { m } = await getServerMessages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{m.products.title}</h1>
        <p className="text-sm text-muted-foreground">{m.products.description}</p>
      </div>
      <Suspense fallback={<LoadingProducts />}>
        <ProductsGrid />
      </Suspense>
    </div>
  )
}
