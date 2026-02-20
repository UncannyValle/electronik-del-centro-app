import { Suspense } from "react";

import { ProductCard } from "@/components/store/product-card";
import { storefront } from "@/lib/storefront";

async function ProductsGrid() {
  const products = await storefront.getProducts();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">All Products</h1>
        <p className="text-sm text-muted-foreground">
          Explore electronics and car stereo inventory.
        </p>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading products...</p>}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}
