"use client"

import { DropSeason } from "@lib/util/product-season"
import { clx } from "@modules/common/components/ui"

type DropFilterProps = {
  drop?: DropSeason
  setQueryParams: (name: string, value: string) => void
  clearQueryParam: (name: string) => void
}

const options: { value: DropSeason; label: string }[] = [
  { value: "season-8", label: "SEASON 8" },
  { value: "season-9", label: "SEASON 9" },
]

const DropFilter = ({ drop, setQueryParams, clearQueryParam }: DropFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="txt-compact-small-plus">Drop</span>
      <div className="flex flex-col items-start gap-2">
        {options.map((option) => {
          const active = drop === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                active
                  ? clearQueryParam("drop")
                  : setQueryParams("drop", option.value)
              }
              className={clx(
                "text-left text-[12px] uppercase tracking-[0.16em] transition-colors",
                active ? "text-black" : "text-neutral-400 hover:text-black"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DropFilter
