import Link from "next/link";
import { Suspense } from "react";

import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { getServerMessages } from "@/lib/i18n/server";
import { storefront } from "@/lib/storefront";

async function FeaturedProducts() {
  const products = await storefront.getFeaturedProducts();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const { m } = await getServerMessages();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-primary to-[#073a9a] p-8 text-primary-foreground">
        <div className="max-w-2xl space-y-4">
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
            {m.home.heroTag}
          </p>
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {m.home.heroTitle}
          </h1>
          <p className="max-w-xl text-primary-foreground/90">
            {m.home.heroDescription}
          </p>
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link href="/products">{m.home.shopProducts}</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">{m.home.talkToUs}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold">{m.home.featuredTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {m.home.featuredDescription}
            </p>
          </div>
        </div>
        <Suspense fallback={<p className="text-sm text-muted-foreground">{m.home.loadingFeatured}</p>}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  );
}
