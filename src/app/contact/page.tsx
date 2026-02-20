import { contactInfo } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getServerMessages } from "@/lib/i18n/server";

export default async function ContactPage() {
  const { m } = await getServerMessages();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">{m.contact.title}</h1>
        <p className="text-muted-foreground">{m.contact.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{contactInfo.phone}</p>
          <p>{contactInfo.email}</p>
          <p>{contactInfo.addressLine1}</p>
          <p>{contactInfo.cityStateZip}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{m.contact.sendMessage}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder={m.contact.fullName} />
          <Input type="email" placeholder={m.contact.email} />
          <Input placeholder={m.contact.subject} />
          <Textarea placeholder={m.contact.help} />
          <Button type="button">{m.contact.submit}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
