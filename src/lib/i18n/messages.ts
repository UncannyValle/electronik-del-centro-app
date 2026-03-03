export const SUPPORTED_LOCALES = ["es", "en"] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

type Messages = {
  nav: {
    home: string
    products: string
    offers: string
    about: string
    contact: string
    cart: string
    checkout: string
    toggleTheme: string
    openMenu: string
    menu: string
    menuDescription: string
    switchToLight: string
    switchToDark: string
    language: string
  }
  footer: {
    blurb: string
    shopHeading: string
    shopProducts: string
    shopOffers: string
    shopCategories: string
    helpHeading: string
    helpContact: string
    helpShipping: string
    helpReturns: string
    followHeading: string
    copyright: string
  }
  home: {
    heroTag: string
    heroTitle: string
    heroDescription: string
    shopProducts: string
    talkToUs: string
    featuredTitle: string
    featuredDescription: string
    loadingFeatured: string
    categoriesHeading: string
    categoryHeadUnits: string
    categorySpeakers: string
    categorySubwoofers: string
    categoryAmplifiers: string
    categoryCameras: string
    categoryInstallation: string
    offersOfDayHeading: string
    trustBarShipping: string
    trustBarPayment: string
    trustBarSupport: string
    trustBarVerified: string
    brandStatement: string
  }
  products: {
    title: string
    description: string
    searchPlaceholder: string
    noResults: string
    loading: string
    details: string
    stock: string
    unitsAvailable: string
    backToProducts: string
    categoryElectronics: string
    categoryCarStereo: string
  }
  contact: {
    title: string
    description: string
    sendMessage: string
    fullName: string
    email: string
    subject: string
    help: string
    submit: string
  }
  cart: {
    title: string
    empty: string
    emptyDescription: string
    startShopping: string
    proceedCheckout: string
    continueShopping: string
    remove: string
    addToCart: string
    outOfStock: string
    trustSecure: string
    trustFreeShipping: string
    trustReturns: string
  }
  checkout: {
    title: string
    customerDetails: string
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zip: string
    payment: string
    paymentDescription: string
    continueToShopify: string
  }
  summary: {
    title: string
    items: string
    shipping: string
    estimatedTax: string
    total: string
    free: string
  }
  loading: {
    page: string
    products: string
    productDetail: string
  }
  notFound: {
    productTitle: string
    productDescription: string
    backToProducts: string
  }
  common: {
    close: string
  }
  productDescriptions: Record<string, string>
}

export const messages: Record<Locale, Messages> = {
  es: {
    nav: {
      home: "Inicio",
      products: "Productos",
      offers: "Ofertas",
      about: "Nosotros",
      contact: "Contactanos",
      cart: "Carrito",
      checkout: "Checkout",
      toggleTheme: "Cambiar tema",
      openMenu: "Abrir menú",
      menu: "Menú",
      menuDescription: "Échale un ojo a la tienda y mueve tu carrito.",
      switchToLight: "Cambiar a claro",
      switchToDark: "Cambiar a oscuro",
      language: "Idioma",
    },
    footer: {
      blurb:
        "Llevamos años equipando a nuestra comunidad con audio para auto, alarmas, cableado y accesorios electrónicos de calidad.",
      shopHeading: "Tienda",
      shopProducts: "Productos",
      shopOffers: "Ofertas",
      shopCategories: "Categorías",
      helpHeading: "Ayuda",
      helpContact: "Contáctanos",
      helpShipping: "Envíos",
      helpReturns: "Política de devoluciones",
      followHeading: "Síguenos",
      copyright: "© 2025 Electronik Del Centro. Todos los derechos reservados.",
    },
    home: {
      heroTag: "Especialistas en audio para auto y seguridad electrónica",
      heroTitle: "Especialistas en audio para auto y seguridad electrónica",
      heroDescription: "Las mejores ofertas en estéreos, alarmas, cableado y accesorios",
      shopProducts: "Ver todas las ofertas",
      talkToUs: "Contáctanos",
      featuredTitle: "Ofertas del día",
      featuredDescription: "Productos destacados con los mejores precios",
      loadingFeatured: "Cargando productos destacados...",
      categoriesHeading: "Categorías",
      categoryHeadUnits: "Estéreos y Receptores",
      categorySpeakers: "Bocinas y Componentes",
      categorySubwoofers: "Subwoofers y Bajos",
      categoryAmplifiers: "Amplificadores",
      categoryCameras: "Cámaras y Sensores",
      categoryInstallation: "Instalación y Accesorios",
      offersOfDayHeading: "Ofertas del día",
      trustBarShipping: "Envío rápido",
      trustBarPayment: "Pago seguro",
      trustBarSupport: "Atención local",
      trustBarVerified: "Productos verificados",
      brandStatement:
        "Llevamos años equipando a nuestra comunidad con audio para auto, alarmas, cableado y accesorios electrónicos de calidad.",
    },
    products: {
      title: "Todos los productos",
      description: "Explora estéreos, alarmas, cableado y accesorios electrónicos en inventario.",
      searchPlaceholder: "Buscar por título o descripción...",
      noResults: "No encontramos productos. Intenta ajustar tus filtros.",
      loading: "Cargando productos...",
      details: "Ver detalle",
      stock: "Existencia",
      unitsAvailable: "unidades disponibles",
      backToProducts: "Volver a productos",
      categoryElectronics: "alarmas y accesorios",
      categoryCarStereo: "audio para auto",
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
      submit: "Enviar",
    },
    cart: {
      title: "Tu carrito",
      empty: "Tu carrito está vacío. Parece que aún no has agregado nada.",
      emptyDescription: "",
      startShopping: "Ver productos",
      proceedCheckout: "Proceder al pago",
      continueShopping: "← Seguir comprando",
      remove: "Quitar",
      addToCart: "Agregar al carrito",
      outOfStock: "Sin existencia",
      trustSecure: "🔒 Pago 100% seguro",
      trustFreeShipping: "🚚 Envío gratis en pedidos mayores a $500",
      trustReturns: "↩️ Devoluciones en 30 días",
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
      continueToShopify: "Continuar a checkout de Shopify",
    },
    summary: {
      title: "Resumen del pedido",
      items: "Artículos",
      shipping: "Envío",
      estimatedTax: "Impuesto estimado",
      total: "Total",
      free: "Gratis",
    },
    loading: {
      page: "Cargando página...",
      products: "Cargando productos...",
      productDetail: "Cargando detalle del producto...",
    },
    notFound: {
      productTitle: "Producto no encontrado",
      productDescription:
        "Puede que este producto ya no esté disponible o se haya retirado del catálogo.",
      backToProducts: "Volver a productos",
    },
    common: {
      close: "Cerrar",
    },
    productDescriptions: {
      "pioneer-dmh-1500nex":
        "Receptor multimedia digital con Apple CarPlay, Android Auto y pantalla táctil capacitiva rápida.",
      "kenwood-excelon-x802-5":
        "Amplificador clase D de 5 canales afinado para agudos limpios y bajos con buena pegada en todo el sistema.",
      "sony-wh-1000xm6":
        "Kit de alarma inteligente con sensor de impacto, control remoto y aviso sonoro de alta potencia.",
      "jbl-basspro-hub":
        "Subwoofer activo compacto diseñado para montarse en el espacio de la llanta de refacción sin estorbar.",
      "lg-oled-c4-55":
        "Kit de cableado calibre 4 con fusible, terminales y aislante para instalaciones limpias y seguras.",
      "alpine-ilx-507":
        "Receptor premium con pantalla flotante, CarPlay inalámbrico, Android Auto y soporte de audio HD.",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      offers: "Offers",
      about: "About",
      contact: "Contact",
      cart: "Cart",
      checkout: "Checkout",
      toggleTheme: "Toggle theme",
      openMenu: "Open menu",
      menu: "Menu",
      menuDescription: "Browse the store and manage your cart.",
      switchToLight: "Switch to Light",
      switchToDark: "Switch to Dark",
      language: "Language",
    },
    footer: {
      blurb:
        "Years of service helping our community with quality car audio, alarms, wiring, and electronic accessories.",
      shopHeading: "Shop",
      shopProducts: "Products",
      shopOffers: "Offers",
      shopCategories: "Categories",
      helpHeading: "Help",
      helpContact: "Contact Us",
      helpShipping: "Shipping",
      helpReturns: "Return Policy",
      followHeading: "Follow Us",
      copyright: "© 2025 Electronik Del Centro. All rights reserved.",
    },
    home: {
      heroTag: "Car Audio and Electronic Security Specialists",
      heroTitle: "Car Audio and Electronic Security Specialists",
      heroDescription: "Top deals on head units, alarms, wiring, and accessories",
      shopProducts: "View all offers",
      talkToUs: "Contact Us",
      featuredTitle: "Deals of the day",
      featuredDescription: "Featured products at the best prices",
      loadingFeatured: "Loading featured products...",
      categoriesHeading: "Categories",
      categoryHeadUnits: "Head Units & Receivers",
      categorySpeakers: "Speakers & Components",
      categorySubwoofers: "Subwoofers & Bass",
      categoryAmplifiers: "Amplifiers",
      categoryCameras: "Cameras & Sensors",
      categoryInstallation: "Installation & Accessories",
      offersOfDayHeading: "Deals of the day",
      trustBarShipping: "Fast shipping",
      trustBarPayment: "Secure payment",
      trustBarSupport: "Local support",
      trustBarVerified: "Verified products",
      brandStatement:
        "Years of service helping our community with quality car audio, alarms, wiring, and electronic accessories.",
    },
    products: {
      title: "All Products",
      description: "Explore head units, alarms, wiring, and electronic accessories in stock.",
      searchPlaceholder: "Search by title or description...",
      noResults: "No products found. Try adjusting your filters.",
      loading: "Loading products...",
      details: "Details",
      stock: "Stock",
      unitsAvailable: "units available",
      backToProducts: "Back to Products",
      categoryElectronics: "alarms & accessories",
      categoryCarStereo: "car audio",
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
      submit: "Submit",
    },
    cart: {
      title: "Your cart",
      empty: "Your cart is empty. Looks like you haven't added anything yet.",
      emptyDescription: "",
      startShopping: "View products",
      proceedCheckout: "Proceed to checkout",
      continueShopping: "← Continue shopping",
      remove: "Remove",
      addToCart: "Add to Cart",
      outOfStock: "Out of Stock",
      trustSecure: "🔒 100% secure payment",
      trustFreeShipping: "🚚 Free shipping on orders over $500",
      trustReturns: "↩️ 30-day returns",
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
      continueToShopify: "Continue to Shopify Checkout",
    },
    summary: {
      title: "Order Summary",
      items: "Items",
      shipping: "Shipping",
      estimatedTax: "Estimated Tax",
      total: "Total",
      free: "Free",
    },
    loading: {
      page: "Loading page...",
      products: "Loading products...",
      productDetail: "Loading product details...",
    },
    notFound: {
      productTitle: "Product not found",
      productDescription: "This product may be unavailable or removed from the catalog.",
      backToProducts: "Back to Products",
    },
    common: {
      close: "Close",
    },
    productDescriptions: {
      "pioneer-dmh-1500nex":
        "Digital multimedia receiver with Apple CarPlay, Android Auto, and responsive capacitive touch display.",
      "kenwood-excelon-x802-5":
        "5-channel class D amplifier tuned for clean highs and deep low-end for full vehicle systems.",
      "sony-wh-1000xm6":
        "Smart alarm kit with shock sensor, remote controls, and high-output siren for daily protection.",
      "jbl-basspro-hub":
        "Compact powered subwoofer engineered to mount in your spare tire area for stealth installs.",
      "lg-oled-c4-55":
        "4-gauge wiring kit with fuse holder, terminals, and protective loom for safe amplifier installs.",
      "alpine-ilx-507":
        "Premium floating screen receiver with wireless CarPlay, Android Auto, and HD audio support.",
    },
  },
}
