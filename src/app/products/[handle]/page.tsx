import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { Price } from "@/components/store/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { storefront } from "@/lib/storefront";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await storefront.getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
        <Image src={product.image} alt={product.title} fill className="object-cover" priority />
      </div>
      <div className="space-y-5">
        <Badge variant="secondary" className="capitalize">
          {product.category.replace("-", " ")}
        </Badge>
        <h1 className="font-heading text-3xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground">{product.description}</p>
        <Price amount={product.price} compareAt={product.compareAtPrice} />
        <p className="text-sm text-muted-foreground">{product.stock} units available</p>
        <div className="flex flex-wrap gap-3">
          <AddToCartButton product={product} />
          <Button asChild variant="outline">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
