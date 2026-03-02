import Link from "next/link"
import { getServerMessages } from "@/lib/i18n/server"
import { storefront } from "@/lib/storefront"

export async function Footer() {
  const { m } = await getServerMessages()
  const contactInfo = await storefront.getContactInfo()

  return (
    <footer className="border-t border-border/80 bg-card/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-bold">Electronik Del Centro</h3>
            <p className="mt-2 text-sm text-muted-foreground">{m.footer.blurb}</p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">{m.footer.shopHeading}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground">
                  {m.footer.shopProducts}
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="hover:text-foreground">
                  {m.footer.shopOffers}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-foreground">
                  {m.footer.shopCategories}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">{m.footer.helpHeading}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  {m.footer.helpContact}
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-foreground">
                  {m.footer.helpShipping}
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-foreground">{m.footer.helpReturns}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">{m.footer.followHeading}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={contactInfo.facebookUrl} className="hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href={contactInfo.instagramUrl} className="hover:text-foreground">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          <p>{m.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
