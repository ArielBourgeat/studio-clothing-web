import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import BrandLogo from "@modules/layout/components/brand-logo"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-black/85 border-b border-white/10 backdrop-blur-md">
        <nav className="flex h-full items-center content-container justify-between text-[11px] uppercase tracking-[0.22em] text-white/80">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 flex-1 basis-0 hover:text-white"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden">Back</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center opacity-95 transition-opacity hover:opacity-70"
            data-testid="store-link"
          >
            <BrandLogo height={22} priority />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-8 w-full flex items-center justify-center text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        © {new Date().getFullYear()} PRStudio Clothing
      </div>
    </div>
  )
}
