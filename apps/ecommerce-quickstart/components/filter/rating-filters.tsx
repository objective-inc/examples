"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ratingFilters } from "@/config/filters"
import { createUrl } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const RatingFilters = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const filterQuery = searchParams.get("filterQuery")

    const newParams = new URLSearchParams(searchParams.toString())

    const appendRatingFilterQuery = (rating: string, add: boolean) => {
        let newFilterQuery = filterQuery || ""

        if (add) {
            newFilterQuery = newFilterQuery
                ? `${newFilterQuery} AND ${rating}`
                : rating
        } else {
            // Remove the price and clean up any resulting double "OR"
            newFilterQuery = newFilterQuery
                .replace(rating, "")
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
                Rating
            </h3>
            <nav className="grid grid-cols-1 items-start gap-2 mt-2">
                {ratingFilters.map((rating) => (
                    <div className="flex items-center gap-2" key={rating.value}>
                        <Checkbox
                            defaultChecked={searchParams
                                .get("filterQuery")
                                ?.includes(rating.value)}
                            onCheckedChange={(e) => {
                                newParams.set(
                                    "filterQuery",
                                    appendRatingFilterQuery(
                                        rating.value,
                                        e as boolean
                                    )
                                )
                                router.push(createUrl(pathname, newParams))
                            }}
                        />

                        <span className="text-xs truncate">{rating.label}</span>
                    </div>
                ))}
            </nav>
        </>
    )
}
