import { HttpTypes } from "@medusajs/types"

export type DropSeason = "season-8" | "season-9"

export const DROP_QUERY_KEY = "drop"

export function getProductSeason(
  product: Pick<HttpTypes.StoreProduct, "title" | "handle" | "description" | "thumbnail"> & {
    images?: { url?: string }[] | null
  }
): DropSeason {
  const haystack = [
    product.title,
    product.handle,
    product.description,
    product.thumbnail,
    ...(product.images?.map((image) => image.url) || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return haystack.includes("medusa") ? "season-8" : "season-9"
}

export function getSeasonCaption(season: DropSeason) {
  if (season === "season-8") {
    return "SEASON 8, NOV 28TH."
  }

  return "SEASON 9, OCT 2ND."
}

export function parseDropParam(value?: string | string[]) {
  const drop = Array.isArray(value) ? value[0] : value
  if (drop === "season-8" || drop === "season-9") {
    return drop
  }
  return undefined
}
