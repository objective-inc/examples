import Grid from "@/components/grid"
import ProductGridItems from "@/components/grid/product-grid-items"
import { objective } from "@/lib/objective"
import { TIndexSearch, indexSearchSchema } from "@/lib/validations/index-search"
import { Product } from "@/lib/types"
const API_KEY = process.env.OBJECTIVE_API_KEY as string
const INDEX_ID = process.env.OBJECTIVE_INDEX_ID as string

export interface SearchPageProps {
    searchParams: TIndexSearch
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = searchParams || {}
    const { offset, limit, query } = indexSearchSchema.parse(params)

    const { results, pagination } = await objective.indexes.index.search(
        INDEX_ID as string,
        {
            query,
            limit,
            offset,
            object_fields: "*",
        }
    )

    const objects = results.map((result) => result.object) as Product[]
    const resultsText = objects.length > 1 ? "results" : "result"

    return (
        <>
            {query ? (
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
        </>
    )
}