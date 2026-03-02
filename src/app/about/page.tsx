import { getServerMessages } from "@/lib/i18n/server"

export default async function AboutPage() {
  const { m } = await getServerMessages()

  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-heading text-3xl font-bold">{m.nav.about}</h1>
      <p className="text-muted-foreground">
        Llevamos años sirviendo a nuestra comunidad con electrónicos de calidad y precios honestos.
      </p>
    </section>
  )
}
