import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { FeaturedProductsSection } from "@/components/store/FeaturedProductsSection"
import { Button } from "@/components/ui/button"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"

function getCategoryIcon(categorySlug: string): string {
  if (categorySlug.includes("head") || categorySlug.includes("stereo")) return "🎛️"
  if (categorySlug.includes("speaker")) return "🔊"
  if (categorySlug.includes("subwoofer") || categorySlug.includes("bass")) return "🎵"
  if (categorySlug.includes("amplifier")) return "⚡"
  if (categorySlug.includes("camera") || categorySlug.includes("sensor")) return "📷"
  if (categorySlug.includes("install") || categorySlug.includes("accessor")) return "🛠️"
  return "🛍️"
}

export default async function HomePage() {
  const { m } = await getServerMessages()
  const products = await storefront.getProducts()
  const categories = Array.from(
    new Map(
      products.map((product) => [
        product.categorySlug,
        {
          name: product.category,
          slug: product.categorySlug,
          icon: getCategoryIcon(product.categorySlug),
        },
      ]),
    ).values(),
  )

  return (
    <div className="space-y-10">
      {/*
      <section className="relative overflow-hidden rounded-2xl border border-border p-8 text-white">
        <Image
          src="/images/electronik-banner.jpg"
          alt="Electronik Del Centro banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-[#052994]/60" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">{m.home.heroTitle}</h1>
          <p className="max-w-xl text-lg text-white">{m.home.heroDescription}</p>
          <div className="flex gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/products">{m.home.shopProducts}</Link>
            </Button>
          </div>
        </div>
      </section>
      */}

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/electronik-banner.jpg"
              alt="Electronik Del Centro banner"
              width={1200}
              height={450}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">{m.home.heroTitle}</h1>
            <p className="max-w-xl text-lg text-foreground">{m.home.heroDescription}</p>
            <div className="flex gap-3">
              <Button asChild variant="default" size="lg">
                <Link href="/products">{m.home.shopProducts}</Link>
              </Button>
            </div>
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
                <span className="font-heading font-semibold text-black group-hover:text-accent-foreground dark:text-white dark:group-hover:text-white">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Suspense fallback={null}>
        <FeaturedProductsSection />
      </Suspense>

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
