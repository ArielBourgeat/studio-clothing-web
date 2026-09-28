"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePinnedProgress } from "@lib/hooks/use-pinned-progress"
import Image from "next/image"
import { useCallback, useRef } from "react"

const title = "SEASON 9"
const subtitle = "DROP 9, OCT 2ND"

const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

const SeasonDrop = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonWrapRef = useRef<HTMLDivElement>(null)

  const onProgress = useCallback((progress: number, frame: HTMLDivElement) => {

    const image = clamp(progress / 0.55)
    const imageEase = 1 - Math.pow(1 - image, 1.55)
    frame.style.setProperty("--season-image-opacity", String(0.12 + imageEase * 0.88))
    frame.style.setProperty("--season-image-scale", String(1.1 - imageEase * 0.1))
    frame.style.setProperty("--season-image-y", `${(1 - imageEase) * 40}px`)

    titleRef.current?.querySelectorAll<HTMLElement>("[data-kinetic]").forEach((letter, index) => {
      const start = 0.12 + index * 0.028
      const local = clamp((progress - start) / 0.16)
      const eased = 1 - Math.pow(1 - local, 1.8)
      letter.style.opacity = String(eased)
      letter.style.transform = `translate3d(0, ${(1 - eased) * 54}px, 0) rotate(${(1 - eased) * 10}deg)`
    })

    subtitleRef.current?.querySelectorAll<HTMLElement>("[data-kinetic]").forEach((letter, index) => {
      const start = 0.38 + index * 0.018
      const local = clamp((progress - start) / 0.14)
      const eased = 1 - Math.pow(1 - local, 1.8)
      letter.style.opacity = String(eased)
      letter.style.transform = `translate3d(0, ${(1 - eased) * 28}px, 0)`
    })

    if (buttonWrapRef.current) {
      const local = clamp((progress - 0.62) / 0.18)
      const eased = 1 - Math.pow(1 - local, 1.6)
      buttonWrapRef.current.style.opacity = String(eased)
      buttonWrapRef.current.style.transform = `translate3d(0, ${(1 - eased) * 18}px, 0)`
    }
  }, [])

  const { pinRef, frameRef } = usePinnedProgress({ onProgress })

  return (
    <section ref={pinRef} className="relative h-[230vh] bg-black">
      <div
        ref={frameRef}
        className="brand-season relative sticky top-16 flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
      >
        <Image
          src="/season.png"
          alt="PRStudio Clothing Season 9"
          fill
          sizes="100vw"
          className="brand-season-image object-cover object-[center_30%]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[36%] bg-gradient-to-b from-black via-black/75 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[36%] bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
          <h2
            ref={titleRef}
            className="font-display flex flex-wrap justify-center text-[16vw] leading-[0.8] small:text-[8.5rem]"
          >
            {title.split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-kinetic
                className="brand-kinetic-letter inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p
            ref={subtitleRef}
            className="mt-5 flex flex-wrap justify-center text-[12px] uppercase tracking-[0.34em] text-white/80 small:text-sm"
          >
            {subtitle.split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-kinetic
                className="brand-kinetic-letter inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
          <div ref={buttonWrapRef} className="brand-season-cta mt-10">
            <LocalizedClientLink
              href="/store?drop=season-9"
              className="brand-early-access inline-flex min-w-[180px] items-center justify-center rounded-full border border-white px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-white"
            >
              Early Access
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeasonDrop
