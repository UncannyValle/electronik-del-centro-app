import { products } from "@/lib/mock-data";
import type { Product, StorefrontClient } from "@/lib/types";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

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

type StorefrontProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage: {
    url: string;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string;
    };
  } | null;
  availableForSale: boolean;
};

const PRODUCTS_QUERY = /* GraphQL */ `
  #graphql
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        availableForSale
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      productType
      tags
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
        }
      }
      availableForSale
    }
  }
`;

function normalizeStoreDomain(storeDomain: string): string {
  if (storeDomain.startsWith("https://")) {
    return storeDomain;
  }

  return `https://${storeDomain}`;
}

function inferCategory(productType: string): Product["category"] {
  const type = productType.toLowerCase();

  if (
    type.includes("car") ||
    type.includes("stereo") ||
    type.includes("audio") ||
    type.includes("subwoofer") ||
    type.includes("amplifier")
  ) {
    return "car-stereo";
  }

  return "electronics";
}

function mapStorefrontProduct(node: StorefrontProductNode): Product {
  const stock = node.availableForSale ? 1 : 0;
  const compareAt = Number(node.compareAtPriceRange?.maxVariantPrice.amount ?? "0");

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: inferCategory(node.productType),
    price: Number(node.priceRange.minVariantPrice.amount),
    compareAtPrice: compareAt > 0 ? compareAt : undefined,
    image: node.featuredImage?.url ?? products[0]?.image ?? "",
    stock,
    featured: node.tags.some((tag) => tag.toLowerCase() === "featured")
  };
}

function getShopifyClient() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-01";
  const privateAccessToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN;
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN;

  if (!storeDomain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  }

  if (!privateAccessToken && !publicAccessToken) {
    throw new Error(
      "Missing Shopify Storefront access token. Set SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN or SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN."
    );
  }

  // The Shopify client accepts exactly one token type.
  const accessTokenConfig = privateAccessToken
    ? { privateAccessToken }
    : { publicAccessToken: publicAccessToken as string };

  return createStorefrontApiClient({
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion,
    ...accessTokenConfig
  });
}

const shopifyStorefrontClient: StorefrontClient = {
  async getProducts() {
    const client = getShopifyClient();
    const { data, errors } = await client.request<{
      products: { nodes: StorefrontProductNode[] };
    }>(PRODUCTS_QUERY, {
      variables: { first: 24 }
    });

    if (errors?.graphQLErrors?.length) {
      throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "));
    }
    if (!data) {
      throw new Error("Shopify Storefront request returned no data.");
    }

    return data.products.nodes.map(mapStorefrontProduct);
  },
  async getFeaturedProducts() {
    const client = getShopifyClient();
    const { data, errors } = await client.request<{
      products: { nodes: StorefrontProductNode[] };
    }>(PRODUCTS_QUERY, {
      variables: { first: 12, query: "tag:featured" }
    });

    if (errors?.graphQLErrors?.length) {
      throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "));
    }
    if (!data) {
      throw new Error("Shopify Storefront request returned no data.");
    }

    const featured = data.products.nodes.map(mapStorefrontProduct);

    if (featured.length > 0) {
      return featured;
    }

    return (await shopifyStorefrontClient.getProducts()).slice(0, 6);
  },
  async getProductByHandle(handle) {
    const client = getShopifyClient();
    const { data, errors } = await client.request<{
      product: StorefrontProductNode | null;
    }>(PRODUCT_BY_HANDLE_QUERY, {
      variables: { handle }
    });

    if (errors?.graphQLErrors?.length) {
      throw new Error(errors.graphQLErrors.map((error) => error.message).join(", "));
    }
    if (!data) {
      throw new Error("Shopify Storefront request returned no data.");
    }

    return data.product ? mapStorefrontProduct(data.product) : null;
  }
};

function shouldUseShopifyStorefront() {
  console.log(process.env.NEXT_PUBLIC_USE_SHOPIFY)
  return process.env.NEXT_PUBLIC_USE_SHOPIFY === "true";
}

// Keep this boundary stable so replacing mock data with Shopify Storefront API is straightforward.
export const storefront = {
  async getProducts() {
    if (!shouldUseShopifyStorefront()) {
      return mockStorefrontClient.getProducts();
    }

    return shopifyStorefrontClient.getProducts();
  },
  async getFeaturedProducts() {
    if (!shouldUseShopifyStorefront()) {
      return mockStorefrontClient.getFeaturedProducts();
    }

    return shopifyStorefrontClient.getFeaturedProducts();
  },
  async getProductByHandle(handle: string): Promise<Product | null> {
    if (!shouldUseShopifyStorefront()) {
      return mockStorefrontClient.getProductByHandle(handle);
    }

    return shopifyStorefrontClient.getProductByHandle(handle);
  }
};
