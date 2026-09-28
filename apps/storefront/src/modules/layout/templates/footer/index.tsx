import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandLogo from "@modules/layout/components/brand-logo";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-white/10 w-full bg-black text-white/55">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-24 small:py-32">
          <div>
            <LocalizedClientLink
              href="/"
              className="inline-flex items-center opacity-95 transition-opacity hover:opacity-70"
            >
              <BrandLogo height={36} />
            </LocalizedClientLink>
            <p className="mt-5 max-w-[22ch] text-[12px] uppercase leading-6 tracking-[0.22em] text-white/35">
              Studio de ropa deportiva contemporánea.
            </p>
          </div>
          <div className="text-[12px] uppercase tracking-[0.18em] gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-white">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-white/45"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-white",
                            children && "text-white/70"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-white"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-white">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-white/45",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-white">Estudio</span>
              <ul className="grid grid-cols-1 gap-y-2 text-white/45">
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/store">
                    Store
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/account">
                    Account
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/cart">
                    Cart
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-12 justify-between text-white/30">
          <Text className="text-[11px] uppercase tracking-[0.22em]">
            © {new Date().getFullYear()} PRStudio Clothing. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}