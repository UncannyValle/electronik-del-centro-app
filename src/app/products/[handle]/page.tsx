import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { AddToCartButton } from "@/components/store/add-to-cart-button"
import { Price } from "@/components/store/price"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"
import { ProductDetailLoadingSkeleton } from "./loading"

async function ProductDetailContent({ handle }: { handle: string }) {
  const { m } = await getServerMessages()
  const product = await storefront.getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const categoryLabel =
    product.category === "electronics"
      ? m.products.categoryElectronics
      : m.products.categoryCarStereo
  const description = m.productDescriptions[product.id] ?? product.description

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border">
        <Image src={product.image} alt={product.title} fill className="object-cover" priority />
      </div>
      <div className="space-y-5">
        <Badge variant="secondary" className="capitalize">
          {categoryLabel}
        </Badge>
        <h1 className="font-heading text-3xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <Price amount={product.price} compareAt={product.compareAtPrice} />
        <p className="text-sm text-muted-foreground">
          {product.stock} {m.products.unitsAvailable}
        </p>
        <div className="flex flex-wrap gap-3">
          <AddToCartButton product={product} />
          <Button asChild variant="outline">
            <Link href="/products">{m.products.backToProducts}</Link>
          </Button>
        </div>
      </div>
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
