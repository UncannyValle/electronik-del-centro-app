import { Suspense } from "react"
import { ProductCard } from "@/components/store/product-card"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"

async function ProductsGrid() {
  const products = await storefront.getProducts()

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default async function ProductsPage() {
  const { m } = await getServerMessages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{m.products.title}</h1>
        <p className="text-sm text-muted-foreground">{m.products.description}</p>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">{m.products.loading}</p>}>
        <ProductsGrid />
      </Suspense>
    </div>
  )
}
