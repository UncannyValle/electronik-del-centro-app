"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { ProductImageGalleryDialog } from "@/components/store/ProductImageGalleryDialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { normalizeImageSrc } from "@/lib/image"
import { cn } from "@/lib/utils"

function normalizeGalleryImages(images: string[]): string[] {
  const uniqueImages = [...new Set(images.map((image) => normalizeImageSrc(image)))]
  return uniqueImages.length > 0 ? uniqueImages : [normalizeImageSrc(null)]
}

export function ProductImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const galleryImages = useMemo(() => normalizeGalleryImages(images), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const selectedImage = galleryImages[activeIndex] ?? galleryImages[0]

  function openImageAt(index: number) {
    setActiveIndex(index)
    setOpen(true)
  }

  return (
    <>
      <button
        type="button"
        className="group relative w-full overflow-hidden rounded-xl border border-border text-left"
        onClick={() => openImageAt(activeIndex)}
        aria-label={`Abrir galeria de imagenes de ${alt}`}
      >
        <div className="relative aspect-4/3">
          <Image
            src={selectedImage}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />
        </div>
      </button>

      <Carousel
        opts={{ align: "start" }}
        className={cn("w-full px-10", galleryImages.length <= 3 && "px-0")}
      >
        <CarouselContent className="-ml-3">
          {galleryImages.map((image, index) => (
            <CarouselItem key={image} className="basis-1/3 pl-3">
              <button
                type="button"
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-md border border-border transition-colors",
                  index === activeIndex ? "ring-2 ring-foreground" : "hover:border-foreground/60",
                )}
                onClick={() => openImageAt(index)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${alt} miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {galleryImages.length > 3 ? (
          <>
            <CarouselPrevious className="-left-1 border-border" />
            <CarouselNext className="-right-1 border-border" />
          </>
        ) : null}
      </Carousel>

      <ProductImageGalleryDialog
        open={open}
        onOpenChange={setOpen}
        images={galleryImages}
        alt={alt}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
      />
    </>
  )
}
