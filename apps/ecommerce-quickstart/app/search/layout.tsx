import Collections from "@/components/collections"
import { ColorFilters } from "@/components/filter/color-filters"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

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

                    <div className="mt-8">
                        <ColorFilters />
                    </div>
                </div>
                <div className="order-last min-h-screen w-full md:order-none">
                    {children}
                </div>
                {/* <div className="order-none flex-none md:order-last md:w-[125px]">
                    Filter
                </div> */}
            </div>
        </Suspense>
    )
}
