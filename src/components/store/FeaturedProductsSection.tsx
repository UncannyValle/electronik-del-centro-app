import Link from "next/link"

import { ProductCard } from "@/components/store/ProductCard"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"
import { getProductsWithOffers } from "@/lib/productUtils"
import { storefront } from "@/lib/storefront"

export async function FeaturedProductsSection() {
  const { m } = await getServerMessages()
  const allProducts = await storefront.getProducts()
  const productsWithOffers = getProductsWithOffers(allProducts)

  if (productsWithOffers.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold">{m.home.offersOfDayHeading}</h2>
      {productsWithOffers.length > 6 ? (
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">
            Tenemos {productsWithOffers.length} productos con ofertas especiales
          </p>
          <Button asChild variant="default" size="lg">
            <Link href="/products?featured=true">Ver todas las ofertas</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productsWithOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
