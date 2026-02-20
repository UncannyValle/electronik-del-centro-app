import type { ContactInfo, Product } from "@/lib/types";

export const contactInfo: ContactInfo = {
  phone: "+1 (562) 555-0142",
  email: "sales@electronikdelcentro.com",
  addressLine1: "13245 Firestone Blvd",
  cityStateZip: "Norwalk, CA 90650"
};

export const products: Product[] = [
  {
    id: "pioneer-dmh-1500nex",
    handle: "pioneer-dmh-1500nex",
    title: "Pioneer DMH-1500NEX",
    description:
      "Digital multimedia receiver with Apple CarPlay, Android Auto, and responsive capacitive touch display.",
    category: "car-stereo",
    price: 399.99,
    compareAtPrice: 449.99,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    stock: 14,
    featured: true
  },
  {
    id: "kenwood-excelon-x802-5",
    handle: "kenwood-excelon-x802-5",
    title: "Kenwood Excelon X802-5",
    description:
      "5-channel class D amplifier tuned for clean highs and deep low-end for full vehicle systems.",
    category: "car-stereo",
    price: 529.0,
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
    stock: 8,
    featured: true
  },
  {
    id: "sony-wh-1000xm6",
    handle: "sony-wh-1000xm6",
    title: "Sony WH-1000XM6",
    description:
      "Wireless noise-canceling headphones with adaptive listening and all-day battery life.",
    category: "electronics",
    price: 429.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    stock: 26,
    featured: true
  },
  {
    id: "jbl-basspro-hub",
    handle: "jbl-basspro-hub",
    title: "JBL BassPro Hub",
    description:
      "Compact powered subwoofer engineered to mount in your spare tire area for stealth installs.",
    category: "car-stereo",
    price: 549.95,
    image:
      "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1200&q=80",
    stock: 6
  },
  {
    id: "lg-oled-c4-55",
    handle: "lg-oled-c4-55",
    title: "LG OLED C4 55\"",
    description:
      "4K OLED panel with rich contrast, gaming-ready HDMI 2.1 ports, and premium color accuracy.",
    category: "electronics",
    price: 1299.99,
    compareAtPrice: 1499.99,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    stock: 4
  },
  {
    id: "alpine-ilx-507",
    handle: "alpine-ilx-507",
    title: "Alpine iLX-507",
    description:
      "Premium floating screen receiver with wireless CarPlay, Android Auto, and HD audio support.",
    category: "car-stereo",
    price: 699.0,
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80",
    stock: 11
  }
];
