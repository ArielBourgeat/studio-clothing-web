import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Intro = () => {
  return (
    <section className="relative bg-[#070707] px-6 py-28 text-white small:px-16 small:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-16 small:grid-cols-[1.2fr_0.8fr] small:items-end">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.38em] text-white/40">
            Introducción
          </p>
          <h2 className="font-display max-w-[14ch] text-[16vw] leading-[0.86] text-white small:text-[7.5vw] lg:text-[5.8rem]">
            Cuerpo.
            <br />
            Ritmo.
            <br />
            Forma.
          </h2>
        </div>
        <div className="max-w-md pb-2">
          <p className="text-[15px] leading-7 text-white/60">
            PRStudio Clothing construye piezas para el movimiento: siluetas precisas,
            materiales honestos y una presencia que no necesita alzar la voz.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-10 inline-flex items-center gap-4 border-b border-white/80 pb-1 text-[12px] uppercase tracking-[0.28em] text-white transition-opacity duration-300 hover:opacity-60"
          >
            Explorar la tienda
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Intro
