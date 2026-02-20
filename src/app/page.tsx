import Link from "next/link";
import { Suspense } from "react";

import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
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

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-primary to-[#073a9a] p-8 text-primary-foreground">
        <div className="max-w-2xl space-y-4">
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
            Electronics + Car Audio
          </p>
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            Build your perfect setup with Electronik Del Centro
          </h1>
          <p className="max-w-xl text-primary-foreground/90">
            From flagship TVs to clean custom stereo installs, this storefront is ready for Shopify Storefront API integration.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold">Featured Products</h2>
            <p className="text-sm text-muted-foreground">
              Server-rendered now with mock data, designed to swap to Shopify queries later.
            </p>
          </div>
        </div>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading featured products...</p>}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  );
}
