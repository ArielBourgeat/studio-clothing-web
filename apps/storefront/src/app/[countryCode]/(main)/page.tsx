import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Intro from "@modules/home/components/intro"
import Philosophy from "@modules/home/components/philosophy"
import ProductStrip from "@modules/home/components/product-strip"
import DropCountdown from "@modules/home/components/drop-countdown"
import SeasonDrop from "@modules/home/components/season-drop"
import StudioGrid from "@modules/home/components/studio-grid"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "PRStudio Clothing",
  description: "Ropa deportiva contemporánea. Forma, oficio y permanencia.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  const {
    response: { products },
  } = region
    ? await listProducts({
        regionId: region.id,
        queryParams: {
          limit: 12,
          fields: "*variants.calculated_price",
        },
      })
    : { response: { products: [] } }

  return (
    <div className="bg-black text-white">
      <Hero />
      <Intro />
      <Philosophy />
      <SeasonDrop />
      <DropCountdown />
      <ProductStrip products={products} />
      <StudioGrid />
    </div>
  )
}