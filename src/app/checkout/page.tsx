import { CheckoutSummary } from "@/components/store/checkout-summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input className="sm:col-span-2" type="email" placeholder="Email" />
            <Input className="sm:col-span-2" placeholder="Address" />
            <Input placeholder="City" />
            <Input placeholder="ZIP" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Checkout will be handled by Shopify once Storefront API + checkout flow is connected.
            </p>
            <Button type="button" className="mt-4">
              Continue to Shopify Checkout
            </Button>
          </CardContent>
        </Card>
      </section>
      <aside>
        <CheckoutSummary />
      </aside>
    </div>
  );
}
