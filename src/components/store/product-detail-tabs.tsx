"use client"

import { useState } from "react"

type ProductDetailTabsProps = {
  brand: string
  categoryLabel: string
  stock: number
  model: string
  highlights: string[]
}

type TabId = "descripcion" | "especificaciones" | "envio"

export function ProductDetailTabs({
  brand,
  categoryLabel,
  stock,
  model,
  highlights,
}: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("descripcion")

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "descripcion"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-accent"
          }`}
          onClick={() => setActiveTab("descripcion")}
        >
          Descripción
        </button>
        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "especificaciones"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-accent"
          }`}
          onClick={() => setActiveTab("especificaciones")}
        >
          Especificaciones
        </button>
        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "envio"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-accent"
          }`}
          onClick={() => setActiveTab("envio")}
        >
          Envío y devoluciones
        </button>
      </div>

      {activeTab === "descripcion" ? (
        <article className="rounded-lg border border-border bg-card/50 p-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ) : null}

      {activeTab === "especificaciones" ? (
        <article className="rounded-lg border border-border bg-card/50 p-4">
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-border">
                <th className="py-2 font-medium text-muted-foreground">Marca</th>
                <td className="py-2">{brand}</td>
              </tr>
              <tr className="border-b border-border">
                <th className="py-2 font-medium text-muted-foreground">Categoría</th>
                <td className="py-2 capitalize">{categoryLabel}</td>
              </tr>
              <tr className="border-b border-border">
                <th className="py-2 font-medium text-muted-foreground">Disponibilidad</th>
                <td className="py-2">{stock > 0 ? "En stock" : "Agotado"}</td>
              </tr>
              <tr>
                <th className="py-2 font-medium text-muted-foreground">Modelo</th>
                <td className="py-2">{model}</td>
              </tr>
            </tbody>
          </table>
        </article>
      ) : null}

      {activeTab === "envio" ? (
        <article className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">
            Envío gratis en pedidos mayores a $500. Devoluciones en 30 días.
          </p>
        </article>
      ) : null}
    </section>
  )
}
