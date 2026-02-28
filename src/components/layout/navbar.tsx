"use client"

import Link from "next/link"
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useCart } from "@/hooks/use-cart"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const { itemCount } = useCart()
  const { locale, m, setLocale } = useLocale()
  const nextLocale = locale === "es" ? "en" : "es"
  const navLinks = [
    { href: "/", label: m.nav.home },
    { href: "/products", label: m.nav.products },
    { href: "/contact", label: m.nav.contact },
    { href: "/cart", label: m.nav.cart },
    { href: "/checkout", label: m.nav.checkout },
  ]

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
      <Link href="/" className="group inline-flex items-center gap-2 font-heading text-xl">
        <span className="rounded bg-primary px-2 py-1 text-primary-foreground">EDC</span>
        <span className="text-sm font-bold uppercase tracking-wider text-foreground/90 sm:text-base">
          electronik del centro
        </span>
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {navLinks.map((link) => (
          <Button key={link.href} asChild variant="ghost" size="sm">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={m.nav.toggleTheme}
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLocale(nextLocale)}
          aria-label={`${m.nav.language}: ${nextLocale.toUpperCase()}`}
        >
          {nextLocale.toUpperCase()}
        </Button>
        <Button asChild variant="outline" size="sm" className="gap-1">
          <Link href="/cart">
            <ShoppingCart className="h-4 w-4" />
            {itemCount}
          </Link>
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label={m.nav.openMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{m.nav.menu}</SheetTitle>
              <SheetDescription>{m.nav.menuDescription}</SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button key={link.href} asChild variant="ghost" className="justify-start">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                <span className="hidden dark:inline">{m.nav.switchToLight}</span>
                <span className="dark:hidden">{m.nav.switchToDark}</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => setLocale(nextLocale)}
              >
                {m.nav.language}: {nextLocale.toUpperCase()}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
