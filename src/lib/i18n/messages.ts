export const SUPPORTED_LOCALES = ["es", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

type Messages = {
  nav: {
    home: string;
    products: string;
    contact: string;
    cart: string;
    checkout: string;
    toggleTheme: string;
    openMenu: string;
    menu: string;
    menuDescription: string;
    switchToLight: string;
    switchToDark: string;
    language: string;
  };
  footer: {
    blurb: string;
  };
  home: {
    heroTag: string;
    heroTitle: string;
    heroDescription: string;
    shopProducts: string;
    talkToUs: string;
    featuredTitle: string;
    featuredDescription: string;
    loadingFeatured: string;
  };
  products: {
    title: string;
    description: string;
    loading: string;
    details: string;
    stock: string;
    unitsAvailable: string;
    backToProducts: string;
    categoryElectronics: string;
    categoryCarStereo: string;
  };
  contact: {
    title: string;
    description: string;
    sendMessage: string;
    fullName: string;
    email: string;
    subject: string;
    help: string;
    submit: string;
  };
  cart: {
    title: string;
    empty: string;
    startShopping: string;
    proceedCheckout: string;
    remove: string;
    addToCart: string;
    outOfStock: string;
  };
  checkout: {
    title: string;
    customerDetails: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    payment: string;
    paymentDescription: string;
    continueToShopify: string;
  };
  summary: {
    title: string;
    items: string;
    shipping: string;
    estimatedTax: string;
    total: string;
    free: string;
  };
  loading: {
    page: string;
    products: string;
    productDetail: string;
  };
  notFound: {
    productTitle: string;
    productDescription: string;
    backToProducts: string;
  };
  common: {
    close: string;
  };
  productDescriptions: Record<string, string>;
};

export const messages: Record<Locale, Messages> = {
  es: {
    nav: {
      home: "Inicio",
      products: "Productos",
      contact: "Contacto",
      cart: "Carrito",
      checkout: "Checkout",
      toggleTheme: "Cambiar tema",
      openMenu: "Abrir menú",
      menu: "Menú",
      menuDescription: "Échale un ojo a la tienda y mueve tu carrito.",
      switchToLight: "Cambiar a claro",
      switchToDark: "Cambiar a oscuro",
      language: "Idioma"
    },
    footer: {
      blurb:
        "Electrónica, estéreos para carro y audio personalizado para raza que le gusta traer buen sonido."
    },
    home: {
      heroTag: "Electrónica + Audio para Carro",
      heroTitle: "Arma tu setup ideal con Electronik Del Centro",
      heroDescription:
        "Desde teles premium hasta instalaciones de estéreo bien hechas. Este storefront ya está listo para conectarse al Storefront API de Shopify.",
      shopProducts: "Ver productos",
      talkToUs: "Contáctanos",
      featuredTitle: "Productos destacados",
      featuredDescription:
        "Renderizado en servidor con datos dummy por ahora, preparado para cambiar a consultas reales de Shopify.",
      loadingFeatured: "Cargando productos destacados..."
    },
    products: {
      title: "Todos los productos",
      description: "Explora electrónica y estéreos para carro en inventario.",
      loading: "Cargando productos...",
      details: "Ver detalle",
      stock: "Existencia",
      unitsAvailable: "unidades disponibles",
      backToProducts: "Volver a productos",
      categoryElectronics: "electrónica",
      categoryCarStereo: "estéreo de carro"
    },
    contact: {
      title: "Contacto",
      description:
        "¿Dudas sobre compatibilidad, instalación o disponibilidad? Mándanos mensaje y te respondemos en corto.",
      sendMessage: "Enviar mensaje",
      fullName: "Nombre completo",
      email: "Correo",
      subject: "Asunto",
      help: "¿En qué te ayudamos?",
      submit: "Enviar"
    },
    cart: {
      title: "Carrito de compras",
      empty: "Tu carrito está vacío.",
      startShopping: "Empezar a comprar",
      proceedCheckout: "Ir al checkout",
      remove: "Quitar",
      addToCart: "Agregar al carrito",
      outOfStock: "Sin existencia"
    },
    checkout: {
      title: "Checkout",
      customerDetails: "Datos del cliente",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo",
      address: "Dirección",
      city: "Ciudad",
      zip: "C.P.",
      payment: "Pago",
      paymentDescription:
        "El pago se procesará en Shopify cuando conectemos el Storefront API y el flujo de checkout.",
      continueToShopify: "Continuar a checkout de Shopify"
    },
    summary: {
      title: "Resumen del pedido",
      items: "Artículos",
      shipping: "Envío",
      estimatedTax: "Impuesto estimado",
      total: "Total",
      free: "Gratis"
    },
    loading: {
      page: "Cargando página...",
      products: "Cargando productos...",
      productDetail: "Cargando detalle del producto..."
    },
    notFound: {
      productTitle: "Producto no encontrado",
      productDescription: "Puede que este producto ya no esté disponible o se haya retirado del catálogo.",
      backToProducts: "Volver a productos"
    },
    common: {
      close: "Cerrar"
    },
    productDescriptions: {
      "pioneer-dmh-1500nex":
        "Receptor multimedia digital con Apple CarPlay, Android Auto y pantalla táctil capacitiva rápida.",
      "kenwood-excelon-x802-5":
        "Amplificador clase D de 5 canales afinado para agudos limpios y bajos con buena pegada en todo el sistema.",
      "sony-wh-1000xm6":
        "Audífonos inalámbricos con cancelación de ruido, escucha adaptativa y batería para todo el día.",
      "jbl-basspro-hub":
        "Subwoofer activo compacto diseñado para montarse en el espacio de la llanta de refacción sin estorbar.",
      "lg-oled-c4-55":
        "Pantalla OLED 4K con contraste profundo, HDMI 2.1 para gaming y color premium.",
      "alpine-ilx-507":
        "Receptor premium con pantalla flotante, CarPlay inalámbrico, Android Auto y soporte de audio HD."
    }
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      contact: "Contact",
      cart: "Cart",
      checkout: "Checkout",
      toggleTheme: "Toggle theme",
      openMenu: "Open menu",
      menu: "Menu",
      menuDescription: "Browse the store and manage your cart.",
      switchToLight: "Switch to Light",
      switchToDark: "Switch to Dark",
      language: "Language"
    },
    footer: {
      blurb:
        "Electronics, car stereos, and custom audio systems curated for daily drivers and enthusiasts."
    },
    home: {
      heroTag: "Electronics + Car Audio",
      heroTitle: "Build your perfect setup with Electronik Del Centro",
      heroDescription:
        "From flagship TVs to clean custom stereo installs, this storefront is ready for Shopify Storefront API integration.",
      shopProducts: "Shop Products",
      talkToUs: "Talk to Us",
      featuredTitle: "Featured Products",
      featuredDescription:
        "Server-rendered now with mock data, designed to swap to Shopify queries later.",
      loadingFeatured: "Loading featured products..."
    },
    products: {
      title: "All Products",
      description: "Explore electronics and car stereo inventory.",
      loading: "Loading products...",
      details: "Details",
      stock: "Stock",
      unitsAvailable: "units available",
      backToProducts: "Back to Products",
      categoryElectronics: "electronics",
      categoryCarStereo: "car stereo"
    },
    contact: {
      title: "Contact",
      description:
        "Questions about fitment, installation, or product availability? Reach out and we will get back shortly.",
      sendMessage: "Send a message",
      fullName: "Full name",
      email: "Email",
      subject: "Subject",
      help: "How can we help?",
      submit: "Submit"
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty.",
      startShopping: "Start Shopping",
      proceedCheckout: "Proceed to Checkout",
      remove: "Remove",
      addToCart: "Add to Cart",
      outOfStock: "Out of Stock"
    },
    checkout: {
      title: "Checkout",
      customerDetails: "Customer Details",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      address: "Address",
      city: "City",
      zip: "ZIP",
      payment: "Payment",
      paymentDescription:
        "Checkout will be handled by Shopify once Storefront API + checkout flow is connected.",
      continueToShopify: "Continue to Shopify Checkout"
    },
    summary: {
      title: "Order Summary",
      items: "Items",
      shipping: "Shipping",
      estimatedTax: "Estimated Tax",
      total: "Total",
      free: "Free"
    },
    loading: {
      page: "Loading page...",
      products: "Loading products...",
      productDetail: "Loading product details..."
    },
    notFound: {
      productTitle: "Product not found",
      productDescription: "This product may be unavailable or removed from the catalog.",
      backToProducts: "Back to Products"
    },
    common: {
      close: "Close"
    },
    productDescriptions: {
      "pioneer-dmh-1500nex":
        "Digital multimedia receiver with Apple CarPlay, Android Auto, and responsive capacitive touch display.",
      "kenwood-excelon-x802-5":
        "5-channel class D amplifier tuned for clean highs and deep low-end for full vehicle systems.",
      "sony-wh-1000xm6":
        "Wireless noise-canceling headphones with adaptive listening and all-day battery life.",
      "jbl-basspro-hub":
        "Compact powered subwoofer engineered to mount in your spare tire area for stealth installs.",
      "lg-oled-c4-55":
        "4K OLED panel with rich contrast, gaming-ready HDMI 2.1 ports, and premium color accuracy.",
      "alpine-ilx-507":
        "Premium floating screen receiver with wireless CarPlay, Android Auto, and HD audio support."
    }
  }
};
