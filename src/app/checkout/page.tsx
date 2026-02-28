import { CheckoutSummary } from "@/components/store/checkout-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getServerMessages } from "@/lib/i18n/server"

export default async function CheckoutPage() {
  const { m } = await getServerMessages()

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">{m.checkout.title}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{m.checkout.customerDetails}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Input placeholder={m.checkout.firstName} />
            <Input placeholder={m.checkout.lastName} />
            <Input className="sm:col-span-2" type="email" placeholder={m.checkout.email} />
            <Input className="sm:col-span-2" placeholder={m.checkout.address} />
            <Input placeholder={m.checkout.city} />
            <Input placeholder={m.checkout.zip} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{m.checkout.payment}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{m.checkout.paymentDescription}</p>
            <Button type="button" className="mt-4">
              {m.checkout.continueToShopify}
            </Button>
          </CardContent>
        </Card>
      </section>
      <aside>
        <CheckoutSummary />
      </aside>
    </div>
  )
}
