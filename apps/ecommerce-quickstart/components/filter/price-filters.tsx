"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { priceFilters } from "@/config/filters"
import { createUrl } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const PriceFilters = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const newParams = new URLSearchParams(searchParams.toString())

    const filterQuery = searchParams.get("filterQuery")
    const appendPriceFilterQuery = (price: string, add: boolean) => {
        let newFilterQuery = filterQuery || ""

        if (add) {
            newFilterQuery = newFilterQuery
                ? `${newFilterQuery} AND ${price}`
                : price
        } else {
            // Remove the price and clean up any resulting double "OR"
            newFilterQuery = newFilterQuery
                .replace(price, "")
                .replace(/OR\s+OR/g, "OR")

            // Trim leading and trailing "OR" and spaces
            newFilterQuery = newFilterQuery
                .trim()
                .replace(/^\s*OR\s*|\s*OR\s*$/g, "")
                .trim()

            // After handling "OR", also clean up "AND" in a similar manner
            newFilterQuery = newFilterQuery.replace(/AND\s+AND/g, "AND").trim()
            // Trim leading and trailing "AND" and spaces
            newFilterQuery = newFilterQuery
                .replace(/^\s*AND\s*|\s*AND\s*$/g, "")
                .trim()
        }

        return newFilterQuery
    }

    return (
        <>
            <h3 className="hidden text-sm text-neutral-500 dark:text-neutral-400 md:block">
                Price
            </h3>
            <nav className="grid grid-cols-1 items-start gap-2 mt-2">
                {priceFilters.map((price) => (
                    <div className="flex items-center gap-2" key={price.value}>
                        <Checkbox
                            defaultChecked={searchParams
                                .get("filterQuery")
                                ?.includes(price.value)}
                            onCheckedChange={(e) => {
                                newParams.set(
                                    "filterQuery",
                                    appendPriceFilterQuery(
                                        price.value,
                                        e as boolean
                                    )
                                )
                                router.push(createUrl(pathname, newParams))
                            }}
                        />

                        <span className="text-xs truncate">{price.label}</span>
                    </div>
                ))}
            </nav>
        </>
    )
}
