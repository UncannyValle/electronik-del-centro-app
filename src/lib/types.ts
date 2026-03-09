export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
}

export type Product = {
  id: string
  handle: string
  title: string
  description: string
  category: string
  categorySlug: string
  price: number
  currencyCode: string
  compareAtPrice?: number
  image: string
  images: string[]
  stock: number
  variants?: ProductVariant[]
  selectedVariantId?: string
  featured?: boolean
}

export type CartItem = {
  productId: string
  title: string
  handle: string
  image: string
  price: number
  quantity: number
}

export type ContactInfo = {
  phone: string
  email: string
  addressLine1: string
  cityStateZip: string
  facebookUrl: string
  instagramUrl: string
}

export type StorefrontClient = {
  getProducts: () => Promise<Product[]>
  getFeaturedProducts: () => Promise<Product[]>
  getProductByHandle: (handle: string) => Promise<Product | null>
  getContactInfo: () => Promise<ContactInfo>
}
