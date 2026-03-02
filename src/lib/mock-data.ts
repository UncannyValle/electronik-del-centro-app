import type { ContactInfo, Product } from "@/lib/types"

export const contactInfo: ContactInfo = {
  phone: "+1 (562) 555-0142",
  email: "sales@electronikdelcentro.com",
  addressLine1: "13245 Firestone Blvd",
  cityStateZip: "Norwalk, CA 90650",
  facebookUrl: "https://www.facebook.com/electronikdelcentro/",
  instagramUrl: "https://www.instagram.com/electronikdelcentro/",
}

export const products: Product[] = [
  {
    id: "pioneer-dmh-1500nex",
    handle: "pioneer-dmh-1500nex",
    title: "Pioneer DMH-1500NEX",
    description:
      "Receptor multimedia digital con Apple CarPlay, Android Auto y pantalla táctil capacitiva rápida.",
    category: "car-stereo",
    price: 399.99,
    compareAtPrice: 449.99,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    stock: 14,
    featured: true,
  },
  {
    id: "kenwood-excelon-x802-5",
    handle: "kenwood-excelon-x802-5",
    title: "Kenwood Excelon X802-5",
    description:
      "Amplificador clase D de 5 canales afinado para agudos limpios y bajos con buena pegada en todo el sistema.",
    category: "car-stereo",
    price: 529.0,
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
    stock: 8,
    featured: true,
  },
  {
    id: "sony-wh-1000xm6",
    handle: "sony-wh-1000xm6",
    title: "Sony WH-1000XM6",
    description:
      "Audífonos inalámbricos con cancelación de ruido, escucha adaptativa y batería para todo el día.",
    category: "electronics",
    price: 429.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    stock: 26,
    featured: true,
  },
  {
    id: "jbl-basspro-hub",
    handle: "jbl-basspro-hub",
    title: "JBL BassPro Hub",
    description:
      "Subwoofer activo compacto diseñado para montarse en el espacio de la llanta de refacción sin estorbar.",
    category: "car-stereo",
    price: 549.95,
    image:
      "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1200&q=80",
    stock: 6,
  },
  {
    id: "lg-oled-c4-55",
    handle: "lg-oled-c4-55",
    title: 'LG OLED C4 55"',
    description: "Pantalla OLED 4K con contraste profundo, HDMI 2.1 para gaming y color premium.",
    category: "electronics",
    price: 1299.99,
    compareAtPrice: 1499.99,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    stock: 4,
  },
  {
    id: "alpine-ilx-507",
    handle: "alpine-ilx-507",
    title: "Alpine iLX-507",
    description:
      "Receptor premium con pantalla flotante, CarPlay inalámbrico, Android Auto y soporte de audio HD.",
    category: "car-stereo",
    price: 699.0,
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80",
    stock: 11,
  },
]
