import Collections from "@/components/collections"
import { ColorFilters } from "@/components/filter/color-filters"
import { PriceFilters } from "@/components/filter/price-filters"
import { RatingFilters } from "@/components/filter/rating-filters"
import { Suspense } from "react"

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense>
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row pb-24">
                <div className="order-first w-full flex-none md:max-w-[204px]">
                    <Collections />

                    {/* <div className="mt-8">
                        <ColorFilters />
                    </div>
                    <div className="mt-8">
                        <PriceFilters />
                    </div> */}

                    <div className="mt-8 pr-8">
                        <RatingFilters />
                    </div>
                </div>
                <div className="order-last min-h-screen w-full md:order-none pb-24">
                    {children}
                </div>
            </div>
        </Suspense>
    )
}
