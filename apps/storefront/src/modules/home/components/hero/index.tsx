"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const Hero = () => {
  const pinRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const frame = frameRef.current
    if (!pin || !frame) {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      return
    }

    let raf = 0

    const update = () => {
      const total = pin.offsetHeight - frame.offsetHeight
      const stickyOffset = 64
      const scrolled = Math.min(
        Math.max(stickyOffset - pin.getBoundingClientRect().top, 0),
        total
      )
      const progress = total > 0 ? scrolled / total : 0
      const reveal = Math.min(progress / 0.7, 1)
      const eased = 1 - Math.pow(1 - reveal, 1.65)
      const brand = Math.min(Math.max((eased - 0.16) / 0.7, 0), 1)

      frame.style.setProperty("--hero-image-opacity", String(0.035 + eased * 0.965))
      frame.style.setProperty("--hero-image-scale", String(1.055 - eased * 0.055))
      frame.style.setProperty("--hero-brand-opacity", String(brand))
      frame.style.setProperty("--hero-brand-y", `${(1 - brand) * 28}px`)
      frame.style.setProperty("--hero-brand-tracking", `${0.2 - brand * 0.14}em`)
      frame.style.setProperty("--hero-hint-opacity", String(Math.max(0, 0.5 - eased * 0.75)))
      frame.style.setProperty("--hero-veil-opacity", String(0.48 - eased * 0.36))
    }

    const onFrame = () => {
      update()
      raf = 0
    }

    const onScroll = () => {
      if (raf) {
        return
      }
      raf = window.requestAnimationFrame(onFrame)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  return (
    <section ref={pinRef} className="brand-hero-pin relative h-[260vh] bg-black">
      <div
        ref={frameRef}
        className="brand-hero relative sticky top-16 flex h-[calc(100vh-4rem)] items-end justify-center overflow-hidden bg-black"
      >
        <Image
          src="/hero.png"
          alt="PRStudio Clothing"
          fill
          priority
          sizes="100vw"
          className="brand-hero-image object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
          style={{ opacity: "var(--hero-veil-opacity)" }}
        />
        <div className="relative z-10 flex w-full flex-col items-center px-6 pb-[18vh] text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-white/40">
            Athletic studio
          </p>
          <h1 className="brand-hero-title font-display text-[11vw] leading-[0.86] text-white sm:text-[7.4vw] lg:text-[6.2vw]">
            PRStudio Clothing
          </h1>
        </div>
        <div className="brand-hero-hint pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.48em] text-white/55">
          Scroll
        </div>
      </div>
    </section>
  )
}

export default Hero
