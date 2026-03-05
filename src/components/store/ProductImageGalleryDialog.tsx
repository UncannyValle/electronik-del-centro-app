"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ProductImageGalleryDialogProps = {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  images: string[]
  alt: string
  activeIndex: number
  onActiveIndexChangeAction: (index: number) => void
}

export function ProductImageGalleryDialog({
  open,
  onOpenChangeAction,
  images,
  alt,
  activeIndex,
  onActiveIndexChangeAction,
}: ProductImageGalleryDialogProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [tabsApi, setTabsApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!open) return

    mainApi?.scrollTo(activeIndex)
    tabsApi?.scrollTo(activeIndex)
  }, [activeIndex, mainApi, open, tabsApi])

  useEffect(() => {
    if (!mainApi) return

    const syncFromMain = () => {
      const nextIndex = mainApi.selectedScrollSnap()
      onActiveIndexChangeAction(nextIndex)
      tabsApi?.scrollTo(nextIndex)
    }

    syncFromMain()
    mainApi.on("select", syncFromMain)
    return () => {
      mainApi.off("select", syncFromMain)
    }
  }, [mainApi, onActiveIndexChangeAction, tabsApi])

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-4xl p-4 sm:p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>Galeria de imagenes de {alt}</DialogTitle>
          <DialogDescription>
            Navega entre imagenes del producto usando las flechas o miniaturas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Carousel setApi={setMainApi} opts={{ loop: images.length > 1 }} className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={`${image}-main`}>
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-muted/20">
                    <Image
                      src={image}
                      alt={`${alt} imagen ampliada ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 ? (
              <>
                <CarouselPrevious className="left-3 border-border bg-background/90" />
                <CarouselNext className="right-3 border-border bg-background/90" />
              </>
            ) : null}
          </Carousel>

          <Carousel
            setApi={setTabsApi}
            opts={{ align: "start" }}
            className={cn("w-full px-10", images.length <= 3 && "px-0")}
          >
            <CarouselContent className="-ml-2">
              {images.map((image, index) => (
                <CarouselItem key={`${image}-tab`} className="basis-1/3 pl-2">
                  <button
                    type="button"
                    className={cn(
                      "relative aspect-square w-full overflow-hidden rounded-md border border-border transition-colors",
                      index === activeIndex
                        ? "ring-2 ring-foreground"
                        : "hover:border-foreground/60",
                    )}
                    onClick={() => {
                      onActiveIndexChangeAction(index)
                      mainApi?.scrollTo(index)
                    }}
                    aria-label={`Seleccionar imagen ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${alt} miniatura modal ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 3 ? (
              <>
                <CarouselPrevious className="-left-1 border-border" />
                <CarouselNext className="-right-1 border-border" />
              </>
            ) : null}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  )
}
