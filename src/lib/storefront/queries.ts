export const PRODUCTS_QUERY = `
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
        images(first: 10) {
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
  }
`

export const PRODUCT_BY_HANDLE_QUERY = `
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
      images(first: 10) {
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

export const SHOP_CONTACT_QUERY = `
  query ShopContact {
    shop {
      metafields(
        identifiers: [
          { namespace: "contact", key: "phone" }
          { namespace: "contact", key: "email" }
          { namespace: "contact", key: "address_line_1" }
          { namespace: "contact", key: "city_state_zip" }
          { namespace: "contact", key: "facebook_url" }
          { namespace: "contact", key: "instagram_url" }
        ]
      ) {
        key
        value
      }
    }
  }
`
