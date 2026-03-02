import Link from "next/link"
import { Suspense } from "react"

import { ProductCard } from "@/components/store/product-card"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"
import Loading from "./loading"

async function FeaturedProducts() {
  const featured = await storefront.getFeaturedProducts()
  const allProducts = await storefront.getProducts()
  const fallbackProducts = allProducts.filter(
    (candidate) => !featured.some((selected) => selected.id === candidate.id),
  )
  const products = [...featured, ...fallbackProducts].slice(0, 6)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default async function HomePage() {
  const { m } = await getServerMessages()

  const categories = [
    { name: m.home.categoryHeadUnits, slug: "head-units", icon: "🎛️" },
    { name: m.home.categorySpeakers, slug: "speakers", icon: "🔊" },
    { name: m.home.categorySubwoofers, slug: "subwoofers", icon: "🎵" },
    { name: m.home.categoryAmplifiers, slug: "amplifiers", icon: "⚡" },
    { name: m.home.categoryCameras, slug: "cameras", icon: "📷" },
    { name: m.home.categoryInstallation, slug: "installation", icon: "🛠️" },
  ]

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-r from-primary to-[#073a9a] p-8 text-primary-foreground">
        <div className="max-w-2xl space-y-4">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">{m.home.heroTitle}</h1>
          <p className="max-w-xl text-lg text-primary-foreground/90">{m.home.heroDescription}</p>
          <div className="flex gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/products">{m.home.shopProducts}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">{m.home.categoriesHeading}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <span className="font-heading font-semibold group-hover:text-primary">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">{m.home.offersOfDayHeading}</h2>
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="rounded-lg border border-border bg-card/50 p-6">
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1">
            <p className="font-semibold">{m.home.trustBarShipping}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{m.home.trustBarPayment}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{m.home.trustBarSupport}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{m.home.trustBarVerified}</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <p className="text-muted-foreground">{m.home.brandStatement}</p>
      </section>
    </div>
  )
}
