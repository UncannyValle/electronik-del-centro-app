import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundProduct() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl font-bold">Product not found</h1>
      <p className="text-muted-foreground">
        This product may be unavailable or removed from the catalog.
      </p>
      <Button asChild>
        <Link href="/products">Back to Products</Link>
      </Button>
    </div>
  );
}
