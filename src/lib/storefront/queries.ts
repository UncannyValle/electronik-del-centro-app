export const PRODUCTS_QUERY = /* GraphQL */ `
  #graphql
  query Products($first: Int!, $query: String, $language: LanguageCode)
    @inContext(language: $language) {
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
        images(first: 3) {
          nodes {
            url
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        availableForSale
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!, $language: LanguageCode)
    @inContext(language: $language) {
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
      images(first: 3) {
        nodes {
          url
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
        }
      }
      selectedOrFirstAvailableVariant {
        id
      }
      availableForSale
    }
  }
`

export const SHOP_CONTACT_QUERY = /* GraphQL */ `
  query ShopContact {
    shop {
      metafields(
        identifiers: [
          { namespace: "store", key: "phone" }
          { namespace: "store", key: "email" }
          { namespace: "store", key: "address_line_1" }
          { namespace: "store", key: "city_state_zip" }
          { namespace: "store", key: "facebook_url" }
          { namespace: "store", key: "instagram_url" }
        ]
      ) {
        key
        value
      }
    }
  }
`
