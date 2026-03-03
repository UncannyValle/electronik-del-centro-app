"use client"

import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/store/AddToCartButton"
import { Price } from "@/components/store/Price"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLocale } from "@/hooks/useLocale"
import { normalizeImageSrc } from "@/lib/image"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const { m } = useLocale()
  const description =
    m.productDescriptions[product.handle] ??
    m.productDescriptions[product.id] ??
    product.description
  const variantDescriptor = product.compareAtPrice
    ? "Versión en oferta"
    : product.stock > 10
      ? "Entrega inmediata"
      : "Últimas piezas"

  return (
    <Card className="group relative overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-foreground hover:ring-1 hover:ring-foreground dark:hover:border-white dark:hover:ring-[#ec1371] dark:hover:shadow-[0_22px_44px_-22px_rgba(236,19,113,0.95)] hover:shadow-xl">
      <Link
        href={`/products/${product.handle}`}
        className="absolute inset-0 z-10 rounded-lg"
        aria-label={`${m.products.details}: ${product.title}`}
      />
      <div className="relative aspect-4/3">
        <Image
          src={normalizeImageSrc(product.image)}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {m.products.stock}: {product.stock}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <p className="text-xs font-medium text-muted-foreground">{variantDescriptor}</p>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Price amount={product.price} compareAt={product.compareAtPrice} />
      </CardContent>
      <CardFooter className="relative z-20">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
