"use client"

import { usePinnedProgress } from "@lib/hooks/use-pinned-progress"
import Image from "next/image"
import { useCallback, useMemo, useRef } from "react"

const COLS = 6
const ROWS = 12

const sources = [
  { src: "/look-back-tee.png", position: "center 30%" },
  { src: "/look-core-pants.png", position: "center 20%" },
  { src: "/look-handstand.png", position: "center 40%" },
  { src: "/look-profile.png", position: "center 20%" },
  { src: "/look-studio-pair.png", position: "center center" },
  { src: "/look-hoodie-dark.png", position: "center 30%" },
  { src: "/look-hoodie-window.png", position: "center 20%" },
  { src: "/studio.png", position: "center top" },
  { src: "/season.png", position: "center 25%" },
  { src: "/hero.png", position: "center center" },
  { src: "/performance-grid.png", position: "16% 32%" },
  { src: "/performance-grid.png", position: "50% 32%" },
  { src: "/performance-grid.png", position: "83% 32%" },
  { src: "/look-profile.png", position: "center 40%" },
  { src: "/look-hoodie-dark.png", position: "center top" },
  { src: "/look-studio-pair.png", position: "center bottom" },
  { src: "/look-hoodie-window.png", position: "center 35%" },
  { src: "/look-back-tee.png", position: "center bottom" },
  { src: "/look-core-pants.png", position: "center 35%" },
  { src: "/look-handstand.png", position: "center top" },
]

const labels = [
  "01 BACK SIGNAL",
  "02 CORE FORM",
  "03 HANDSTAND",
  "04 LOOKBOOKPT2",
  "05 STUDIO PAIR",
  "06 LIVE NOW",
  "07 WINDOW CUT",
  "08 CARBONSTUDY",
  "09 DESERTFORM",
  "10 IONICPROFILE",
  "11 QUIETFRAME",
  "12 SOFTGESTURE",
  "13 SILVERVEIL",
  "14 SIDE STUDY",
  "15 HOOD SIGNAL",
  "16 DOUBLE BACK",
  "17 PANE LIGHT",
  "18 THOSE WHO",
  "19 STUDIO CORE",
  "20 ROCK HOLD",
]

const StudioGrid = () => {
  const pointer = useRef({ x: 0.5, y: 0.48 })
  const cellsRef = useRef<Array<HTMLLIElement | null>>([])
  const sheetRef = useRef<HTMLDivElement>(null)

  const tiles = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, index) => ({
        ...sources[index % sources.length],
        label: labels[index % labels.length],
        key: `${index}`,
      })),
    []
  )

  const applyFisheye = useCallback(() => {
    const cx = pointer.current.x * window.innerWidth
    const cy = pointer.current.y * window.innerHeight

    cellsRef.current.forEach((cell) => {
      if (!cell) {
        return
      }
      const rect = cell.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const dx = (x - cx) / window.innerWidth
      const dy = (y - cy) / window.innerHeight
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / 0.72)
      const scale = 0.86 + influence * 0.42
      const tx = -dx * 46 * influence
      const ty = -dy * 38 * influence
      cell.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
      cell.style.zIndex = String(Math.round(influence * 30))
    })
  }, [])

  const onProgress = useCallback(
    (progress: number, frame: HTMLDivElement) => {
      const sheet = sheetRef.current
      if (sheet) {
        const maxShift = Math.max(sheet.scrollHeight - frame.clientHeight, 0)
        sheet.style.transform = `translate3d(0, ${-maxShift * progress}px, 0)`
      }
      applyFisheye()
    },
    [applyFisheye]
  )

  const { pinRef, frameRef } = usePinnedProgress({ onProgress })

  return (
    <section ref={pinRef} className="relative h-[480vh] bg-black text-white">
      <div
        ref={frameRef}
        className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-black"
        onMouseMove={(event) => {
          pointer.current = {
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight,
          }
          applyFisheye()
        }}
        onMouseLeave={() => {
          pointer.current = { x: 0.5, y: 0.48 }
          applyFisheye()
        }}
      >
        <div ref={sheetRef} className="brand-fisheye-sheet px-3 pb-24 pt-6 small:px-6">
          <ul className="brand-fisheye-grid mx-auto grid max-w-[1600px] grid-cols-3 gap-x-3 gap-y-7 small:grid-cols-6 small:gap-x-4">
            {tiles.map((tile, index) => (
              <li
                key={tile.key}
                ref={(node) => {
                  cellsRef.current[index] = node
                }}
                className="brand-fisheye-cell"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={tile.src}
                    alt={tile.label}
                    fill
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                    style={{ objectPosition: tile.position }}
                  />
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/35">
                  {tile.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black via-black/40 to-transparent h-24" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/50 to-transparent h-28" />
        <h2 className="pointer-events-none absolute left-6 top-[38%] z-30 max-w-[10ch] font-display text-[12vw] leading-[0.84] text-white small:left-12 small:text-[5.6rem]">
          OUR PERFORMANCE,
          <br />
          OUR STUDIO.
        </h2>
      </div>
    </section>
  )
}

export default StudioGrid
