import Grid from "@/components/grid"
import ProductGridItems from "@/components/grid/product-grid-items"
import { objective } from "@/lib/objective"
import { TIndexSearch, indexSearchSchema } from "@/lib/validations/index-search"
import { Product } from "@/lib/types"
import { SearchResultsSelector } from "@/components/page-size-select"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { PaginationButton } from "@/components/pagination-button"
import { Pagination } from "@/components/pagination"
import { Suspense } from "react"

const INDEX_ID = process.env.OBJECTIVE_INDEX_ID as string

export interface SearchPageProps {
    searchParams: TIndexSearch
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = searchParams || {}

    const { offset, limit, query, filterQuery } =
        indexSearchSchema.parse(params)

    const { results, pagination } = await objective.indexes.index.search(
        INDEX_ID as string,
        {
            query,
            limit,
            offset,
            object_fields: "*",
            filter_query: filterQuery,
        }
    )

    const objects = results.map((result) => {
        return {
            object: result.object,
            id: result.id,
        }
    }) as Product[]
    const resultsText = objects.length > 1 ? "results" : "result"

    const isFirstPage = pagination.page === 1
    const isLastPage = pagination.page === pagination.pages

    return (
        <>
            {query || filterQuery ? (
                <p className="mb-4">
                    {objects.length === 0
                        ? "There are no products that match "
                        : `Showing ${objects.length} ${resultsText} for `}
                    <span className="font-bold">&quot;{query}&quot;</span>
                </p>
            ) : null}
            {objects.length > 0 ? (
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <ProductGridItems products={objects} />
                </Grid>
            ) : null}
            {pagination?.pages > 1 && (
                <Suspense>
                    <Pagination
                        pages={pagination.pages}
                        page={pagination.page}
                        limit={limit}
                        offset={offset}
                        next={pagination.next}
                    />
                </Suspense>
            )}
        </>
    )
}
