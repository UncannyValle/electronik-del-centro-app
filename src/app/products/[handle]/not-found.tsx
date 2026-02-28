import Link from "next/link"

import { Button } from "@/components/ui/button"
import { messages } from "@/lib/i18n/messages"

export default function NotFoundProduct() {
  const m = messages.es

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl font-bold">{m.notFound.productTitle}</h1>
      <p className="text-muted-foreground">{m.notFound.productDescription}</p>
      <Button asChild>
        <Link href="/products">{m.notFound.backToProducts}</Link>
      </Button>
    </div>
  )
}
