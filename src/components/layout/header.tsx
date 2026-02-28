import { Navbar } from "@/components/layout/navbar"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <Navbar />
    </header>
  )
}
