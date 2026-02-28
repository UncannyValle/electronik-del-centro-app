export type Product = {
  id: string
  handle: string
  title: string
  description: string
  category: "electronics" | "car-stereo"
  price: number
  compareAtPrice?: number
  image: string
  stock: number
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
}

export type StorefrontClient = {
  getProducts: () => Promise<Product[]>
  getFeaturedProducts: () => Promise<Product[]>
  getProductByHandle: (handle: string) => Promise<Product | null>
}
