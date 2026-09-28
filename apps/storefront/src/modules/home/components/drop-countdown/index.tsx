"use client"

import { useEffect, useState } from "react"

const DROP_AT = Date.parse("2026-10-02T22:00:00+08:00")

type Remaining = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const EMPTY: Remaining = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
}

const pad = (value: number) => String(Math.max(0, value)).padStart(2, "0")

const getRemaining = (): Remaining => {
  const diff = Math.max(0, DROP_AT - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  }
}

const units: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
]

const DropCountdown = () => {
  const [remaining, setRemaining] = useState<Remaining>(EMPTY)

  useEffect(() => {
    const tick = () => setRemaining(getRemaining())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="bg-black px-6 py-16 text-white small:py-20">
      <div className="mx-auto w-full max-w-[720px]">
        <div className="mb-6 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-white/55 small:text-[11px]">
          <p>Drops in</p>
          <p className="text-right">October 2, 10PM Hong Kong</p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start">
          {units.map((unit, index) => (
            <div key={unit.key} className="contents">
              {index > 0 && (
                <span
                  aria-hidden
                  className="mt-2 px-2 font-display text-3xl leading-none text-white/35 small:mt-4 small:px-5 small:text-5xl"
                >
                  -
                </span>
              )}
              <div className="flex flex-col items-center">
                <span className="font-display text-[12vw] leading-none tracking-wide text-white small:text-7xl">
                  {remaining[unit.key]}
                </span>
                <span className="mt-3 text-[9px] uppercase tracking-[0.32em] text-white/40 small:text-[10px]">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.32em] text-white/70 small:text-[11px]">
          The list gets in 15 minutes early
        </p>
      </div>
    </section>
  )
}

export default DropCountdown
