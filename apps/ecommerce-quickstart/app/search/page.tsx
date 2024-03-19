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
            {/* {pagination?.pages > 1 && (
                <div className="flex items-center justify-between px-2 mt-16">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.pages}
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="items-center space-x-2 hidden lg:flex">
                            <p className="text-sm font-medium">Rows per page</p>
                            <SearchResultsSelector />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <PaginationButton
                                    disabled={isFirstPage}
                                    href={firstPageUrl}
                                    ariaLabel="Go to first page"
                                    IconComponent={DoubleArrowLeftIcon}
                                />
                                <PaginationButton
                                    disabled={isFirstPage}
                                    href={previousPageUrl}
                                    ariaLabel="Go to previous page"
                                    IconComponent={ChevronLeftIcon}
                                />
                                <PaginationButton
                                    disabled={isLastPage}
                                    href={nextPageUrl}
                                    ariaLabel="Go to next page"
                                    IconComponent={ChevronRightIcon}
                                />
                                <PaginationButton
                                    disabled={isLastPage}
                                    href={lastPageUrl}
                                    ariaLabel="Go to last page"
                                    IconComponent={DoubleArrowRightIcon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}
