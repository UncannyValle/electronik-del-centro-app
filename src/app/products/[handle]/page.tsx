import { notFound } from "next/navigation"
import { Suspense } from "react"

import { AddToCartButton } from "@/components/store/AddToCartButton"
import { Price } from "@/components/store/Price"
import { ProductCard } from "@/components/store/ProductCard"
import { ProductDetailTabs } from "@/components/store/ProductDetailTabs"
import { ProductImageGallery } from "@/components/store/ProductImageGallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"
import { ProductDetailLoadingSkeleton } from "./loading"

async function ProductDetailContent({ handle }: { handle: string }) {
  const { m } = await getServerMessages()
  const product = await storefront.getProductByHandle(handle)
  const allProducts = await storefront.getProducts()

  if (!product) {
    notFound()
  }

  const relatedProducts = allProducts.filter((candidate) => candidate.id !== product.id).slice(0, 4)
  const categoryLabel = product.category
  const description = m.productDescriptions[product.id] ?? product.description
  const brand = product.title.split(" ")[0]
  const tagline = description.split(".")[0]
  const rating = (4.2 + (product.id.length % 7) / 10).toFixed(1)
  const hasSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price)
  const highlights = description
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="space-y-3">
          <ProductImageGallery images={product.images} alt={product.title} />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Marca: {brand}
          </p>
          <Badge variant="secondary" className="capitalize">
            {categoryLabel}
          </Badge>
          <h1 className="font-heading text-3xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground">{tagline}</p>
          <p className="text-sm text-foreground">
            {"★".repeat(4)}☆ {rating}
          </p>
          <div className="space-y-2">
            <Price
              amount={product.price}
              currencyCode={product.currencyCode}
              compareAt={product.compareAtPrice}
            />
            {hasSale ? (
              <p className="text-sm font-medium text-foreground">Ahorra hoy con precio especial</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Variantes</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <Button
                  key={variant.id}
                  type="button"
                  variant={variant.id === product.selectedVariantId ? "default" : "outline"}
                  size="sm"
                  aria-pressed={variant.id === product.selectedVariantId}
                  disabled={!variant.availableForSale}
                >
                  {variant.title}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {product.stock} {m.products.unitsAvailable}
          </p>
          <div className="flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            {/* <Button type="button" variant="outline">
              Guardar para después
            </Button> */}
          </div>
        </div>
      </div>

      <ProductDetailTabs
        brand={brand}
        categoryLabel={categoryLabel}
        stock={product.stock}
        model={product.handle.toUpperCase()}
        highlights={highlights}
      />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">También te puede interesar</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ handle: string }> }) {
  return (
    <Suspense fallback={<ProductDetailLoadingSkeleton />}>
      {params.then(({ handle }) => (
        <ProductDetailContent handle={handle} />
      ))}
    </Suspense>
  )
}
