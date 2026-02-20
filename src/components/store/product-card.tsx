"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/hooks/use-locale";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { Price } from "@/components/store/price";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  const { m } = useLocale();
  const categoryLabel =
    product.category === "electronics"
      ? m.products.categoryElectronics
      : m.products.categoryCarStereo;
  const description = m.productDescriptions[product.id] ?? product.description;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="capitalize">
            {categoryLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {m.products.stock}: {product.stock}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Price amount={product.price} compareAt={product.compareAtPrice} />
      </CardContent>
      <CardFooter className="gap-2">
        <AddToCartButton product={product} />
        <Link
          href={`/products/${product.handle}`}
          className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-accent"
        >
          {m.products.details}
        </Link>
      </CardFooter>
    </Card>
  );
}
