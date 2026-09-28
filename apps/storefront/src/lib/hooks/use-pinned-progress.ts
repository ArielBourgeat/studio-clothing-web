"use client"

import { useEffect, useRef } from "react"

type PinnedProgressOptions = {
  stickyOffset?: number
  onProgress: (progress: number, frame: HTMLDivElement) => void
}

export function usePinnedProgress({
  stickyOffset = 64,
  onProgress,
}: PinnedProgressOptions) {
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
      onProgress(1, frame)
      return
    }

    let raf = 0

    const update = () => {
      const total = pin.offsetHeight - frame.offsetHeight
      const scrolled = Math.min(
        Math.max(stickyOffset - pin.getBoundingClientRect().top, 0),
        Math.max(total, 0)
      )
      onProgress(total > 0 ? scrolled / total : 0, frame)
    }

    const onScroll = () => {
      if (raf) {
        return
      }
      raf = window.requestAnimationFrame(() => {
        update()
        raf = 0
      })
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
  }, [onProgress, stickyOffset])

  return { pinRef, frameRef }
}
