"use client"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  getProductSeason,
  getSeasonCaption,
} from "@lib/util/product-season"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

type ProductStripProps = {
  products: HttpTypes.StoreProduct[]
}

const ProductStrip = ({ products }: ProductStripProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({
    left: 0,
    width: 18,
    overflow: products.length > 4,
  })

  const syncThumb = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      return
    }

    const { clientWidth, scrollWidth, scrollLeft } = scroller
    const overflow = scrollWidth > clientWidth + 1
    const width = overflow ? Math.max((clientWidth / scrollWidth) * 100, 14) : 100
    const max = Math.max(scrollWidth - clientWidth, 1)
    const left = overflow ? (scrollLeft / max) * (100 - width) : 0
    setThumb({ left, width, overflow })
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      return
    }

    syncThumb()
    scroller.addEventListener("scroll", syncThumb, { passive: true })
    window.addEventListener("resize", syncThumb)

    return () => {
      scroller.removeEventListener("scroll", syncThumb)
      window.removeEventListener("resize", syncThumb)
    }
  }, [products, syncThumb])

  const onTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current
    const track = event.currentTarget
    if (!scroller) {
      return
    }

    const moveTo = (clientX: number) => {
      const rect = track.getBoundingClientRect()
      const thumbWidth = (thumb.width / 100) * rect.width
      const usable = Math.max(rect.width - thumbWidth, 1)
      const x = Math.min(Math.max(clientX - rect.left - thumbWidth / 2, 0), usable)
      const max = scroller.scrollWidth - scroller.clientWidth
      scroller.scrollLeft = (x / usable) * max
    }

    moveTo(event.clientX)
    track.setPointerCapture(event.pointerId)

    const onMove = (pointerEvent: PointerEvent) => moveTo(pointerEvent.clientX)
    const onUp = () => {
      track.removeEventListener("pointermove", onMove)
      track.removeEventListener("pointerup", onUp)
    }

    track.addEventListener("pointermove", onMove)
    track.addEventListener("pointerup", onUp)
  }

  if (!products?.length) {
    return null
  }

  return (
    <section className="bg-black py-16 text-white small:py-24">
      <div className="px-6 small:px-16">
        <p className="mb-3 text-[11px] uppercase tracking-[0.38em] text-white/40">
          Piezas
        </p>
        <h2 className="font-display mb-10 text-6xl text-white small:mb-12 small:text-7xl">
          En movimiento
        </h2>
        <div ref={scrollerRef} className="brand-product-scroll">
          <ul className="flex w-max gap-4">
            {products.map((product) => {
              const image = product.thumbnail || product.images?.[0]?.url
              const caption = getSeasonCaption(getProductSeason(product))
              const { cheapestPrice } = getProductPrice({ product })
              return (
                <li
                  key={product.id}
                  className="w-[58vw] shrink-0 small:w-[18vw]"
                >
                  <LocalizedClientLink
                    href={`/products/${product.handle}`}
                    className="block"
                  >
                    <article className="overflow-hidden border-[3px] border-white bg-white">
                      <div className="relative aspect-[4/5] bg-black">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.title || "Producto"}
                            fill
                            sizes="(max-width: 1024px) 58vw, 18vw"
                            className="object-cover object-center"
                          />
                        ) : null}
                      </div>
                      <div className="bg-white px-3 py-3 text-black">
                        <p className="text-[13px] font-semibold uppercase leading-tight tracking-[0.04em]">
                          {product.title}
                        </p>
                        <p className="mt-1 text-[12px] leading-tight text-black/70">
                          {caption}
                        </p>
                        <p className="mt-1 text-[13px] leading-tight">
                          {cheapestPrice?.calculated_price ?? ""}
                        </p>
                      </div>
                    </article>
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
        </div>
        {thumb.overflow && (
          <div
            className="brand-product-scrollbar mt-8"
            onPointerDown={onTrackPointerDown}
          >
            <div
              className="brand-product-scrollbar-thumb"
              style={{
                left: `${thumb.left}%`,
                width: `${thumb.width}%`,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductStrip
