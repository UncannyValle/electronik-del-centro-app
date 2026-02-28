"use client"

import { contactInfo } from "@/lib/mock-data"
import { useLocale } from "@/hooks/use-locale"

export function Footer() {
  const { m } = useLocale()

  return (
    <footer className="border-t border-border/80 bg-card/30">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 text-sm lg:grid-cols-2 lg:px-6">
        <div>
          <h3 className="font-heading text-lg">Electronik Del Centro</h3>
          <p className="mt-2 text-muted-foreground">{m.footer.blurb}</p>
        </div>
        <div className="space-y-1 text-muted-foreground lg:text-right">
          <p>{contactInfo.phone}</p>
          <p>{contactInfo.email}</p>
          <p>{contactInfo.addressLine1}</p>
          <p>{contactInfo.cityStateZip}</p>
        </div>
      </div>
    </footer>
  )
}
