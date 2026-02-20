import { contactInfo } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Contact</h1>
        <p className="text-muted-foreground">
          Questions about fitment, installation, or product availability? Reach out and we will get back shortly.
        </p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{contactInfo.phone}</p>
          <p>{contactInfo.email}</p>
          <p>{contactInfo.addressLine1}</p>
          <p>{contactInfo.cityStateZip}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Email" />
          <Input placeholder="Subject" />
          <Textarea placeholder="How can we help?" />
          <Button type="button">Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}
