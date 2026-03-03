import { ProductSearchGrid } from "@/components/store/ProductSearchGrid"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"

export default async function ProductsPage() {
  const { m } = await getServerMessages()
  const products = await storefront.getProducts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">
          {m.products.title} ({products.length} productos)
        </h1>
        <p className="text-sm text-muted-foreground">{m.products.description}</p>
      </div>
      <ProductSearchGrid products={products} />
    </div>
  )
}
