import type { Metadata } from "next"
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google"

import "./globals.css"
import type { ReactNode } from "react"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { LocaleProvider } from "@/context/locale-context"
import { getServerLocale } from "@/lib/i18n/server"

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Electronik Del Centro",
  description: "Modern electronics and car stereo ecommerce storefront",
}

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: ReactNode
}>) {
  const locale = await getServerLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
    <body className={`${bodyFont.variable} ${headingFont.variable}`}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LocaleProvider initialLocale={locale}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header/>
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-6">
              {children}
            </main>
            <Footer/>
          </div>
        </CartProvider>
      </LocaleProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}
