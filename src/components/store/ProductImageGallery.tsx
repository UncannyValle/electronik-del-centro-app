"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { normalizeImageSrc } from "@/lib/image"
import { cn } from "@/lib/utils"

const VISIBLE_THUMBNAILS = 3

function normalizeGalleryImages(images: string[]): string[] {
  const uniqueImages = [...new Set(images.map((image) => normalizeImageSrc(image)))]
  return uniqueImages.length > 0 ? uniqueImages : [normalizeImageSrc(null)]
}

function buildThumbnailIndexes(totalImages: number): number[] {
  if (totalImages <= 0) {
    return []
  }

  return Array.from({ length: VISIBLE_THUMBNAILS }, (_, index) => index % totalImages)
}

export function ProductImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const galleryImages = useMemo(() => normalizeGalleryImages(images), [images])
  const thumbnailIndexes = useMemo(
    () => buildThumbnailIndexes(galleryImages.length),
    [galleryImages.length],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const selectedImage = galleryImages[activeIndex] ?? galleryImages[0]

  function openImageAt(index: number) {
    setActiveIndex(index)
    setOpen(true)
  }

  function goToPreviousImage() {
    setActiveIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)
  }

  function goToNextImage() {
    setActiveIndex((current) => (current + 1) % galleryImages.length)
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

      <div className="grid grid-cols-3 gap-3">
        {thumbnailIndexes.map((imageIndex, thumbIndex) => (
          <button
            type="button"
            key={`${galleryImages[imageIndex]}-${thumbIndex}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border border-border transition-colors",
              imageIndex === activeIndex ? "ring-2 ring-foreground" : "hover:border-foreground/60",
            )}
            onClick={() => openImageAt(imageIndex)}
            aria-label={`Ver imagen ${thumbIndex + 1}`}
          >
            <Image
              src={galleryImages[imageIndex]}
              alt={`${alt} miniatura ${thumbIndex + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-4 sm:p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Galeria de imagenes de {alt}</DialogTitle>
            <DialogDescription>
              Navega entre imagenes del producto usando las flechas o miniaturas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-muted/20">
              <Image
                src={selectedImage}
                alt={`${alt} imagen ampliada`}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Imagen anterior"
                  onClick={goToPreviousImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Siguiente imagen"
                  onClick={goToNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {thumbnailIndexes.map((imageIndex, thumbIndex) => (
                <button
                  type="button"
                  key={`modal-${galleryImages[imageIndex]}-${thumbIndex}`}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-md border border-border transition-colors",
                    imageIndex === activeIndex
                      ? "ring-2 ring-foreground"
                      : "hover:border-foreground/60",
                  )}
                  onClick={() => setActiveIndex(imageIndex)}
                  aria-label={`Seleccionar imagen ${thumbIndex + 1}`}
                >
                  <Image
                    src={galleryImages[imageIndex]}
                    alt={`${alt} miniatura modal ${thumbIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
