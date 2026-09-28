import Image from "next/image"

type BrandLogoProps = {
  className?: string
  height?: number
  priority?: boolean
}

const BrandLogo = ({
  className = "",
  height = 28,
  priority = false,
}: BrandLogoProps) => {
  return (
    <Image
      src="/prstudio-logo.png"
      alt="PRStudio Clothing"
      width={420}
      height={72}
      priority={priority}
      className={`w-auto ${className}`}
      style={{ height }}
    />
  )
}

export default BrandLogo
