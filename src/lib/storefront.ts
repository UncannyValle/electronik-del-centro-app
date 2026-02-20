import { products } from "@/lib/mock-data";
import type { Product, StorefrontClient } from "@/lib/types";

const mockStorefrontClient: StorefrontClient = {
  async getProducts() {
    return products;
  },
  async getFeaturedProducts() {
    return products.filter((product) => product.featured);
  },
  async getProductByHandle(handle) {
    return products.find((product) => product.handle === handle) ?? null;
  }
};

// Keep this boundary stable so replacing mock data with Shopify Storefront API is straightforward.
export const storefront = {
  async getProducts() {
    return mockStorefrontClient.getProducts();
  },
  async getFeaturedProducts() {
    return mockStorefrontClient.getFeaturedProducts();
  },
  async getProductByHandle(handle: string): Promise<Product | null> {
    return mockStorefrontClient.getProductByHandle(handle);
  }
};
