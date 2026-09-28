"use client"

import { useCallback, useRef } from "react"
import { usePinnedProgress } from "@lib/hooks/use-pinned-progress"

const principles = [
  {
    index: "01",
    title: "Forma",
    text: "Cada corte parte del cuerpo en acción. Nada ornamental. Solo la línea que sostiene el gesto.",
  },
  {
    index: "02",
    title: "Oficio",
    text: "Trabajamos con repetición y criterio. El detalle se decide una vez y se ejecuta sin ruido.",
  },
  {
    index: "03",
    title: "Permanencia",
    text: "Piezas pensadas para durar en el armario y en el movimiento. Menos ciclos. Más carácter.",
  },
]

const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

const Philosophy = () => {
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])

  const onProgress = useCallback((progress: number) => {
    itemsRef.current.forEach((item, index) => {
      if (!item) {
        return
      }
      const start = 0.12 + index * 0.22
      const local = clamp((progress - start) / 0.18)
      const eased = 1 - Math.pow(1 - local, 1.7)
      item.style.setProperty("--point-opacity", String(eased))
      item.style.setProperty("--point-y", `${(1 - eased) * 36}px`)
    })
  }, [])

  const { pinRef, frameRef } = usePinnedProgress({ onProgress })

  return (
    <section
      ref={pinRef}
      className="relative h-[240vh] bg-black text-white"
    >
      <div
        ref={frameRef}
        className="relative sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden px-6 small:px-16"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="mb-6 text-[11px] uppercase tracking-[0.38em] text-white/40">
            Filosofía
          </p>
          <h2 className="font-display mb-16 max-w-[16ch] text-[12vw] leading-[0.9] text-white small:mb-20 small:text-[4.8rem]">
            Menos ruido. Más disciplina.
          </h2>
          <ul className="grid gap-10 small:grid-cols-3 small:gap-16">
            {principles.map((item, index) => (
              <li
                key={item.index}
                ref={(node) => {
                  itemsRef.current[index] = node
                }}
                className="brand-philosophy-point border-t border-white/15 pt-8"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                  {item.index}
                </span>
                <h3 className="font-display mt-4 text-5xl text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[32ch] text-[14px] leading-7 text-white/55">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
    </section>
  )
}

export default Philosophy
