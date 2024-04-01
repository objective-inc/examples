"use client"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
import { SearchResultsSelector } from "./page-size-select"
import { PaginationButton } from "./pagination-button"

type TPagination = {
    pages: number
    page: number
    next: {
        offset: number
        limit: number
    }

    offset: number
    limit: number
}

export const Pagination = ({
    pages,
    page,
    next,
    offset,
    limit,
}: TPagination) => {
    const searchParams = useSearchParams()

    const nextPageParams = new URLSearchParams(searchParams?.toString())
    nextPageParams.set("offset", next?.offset?.toString())

    const prevPageParams = new URLSearchParams(searchParams?.toString())
    prevPageParams.set("offset", (offset - limit).toString())

    const firstPageParams = new URLSearchParams(searchParams?.toString())
    firstPageParams.set("offset", "0")

    const lastPageParams = new URLSearchParams(searchParams?.toString())
    lastPageParams.set("offset", (pages * limit - limit)?.toString())

    const isFirstPage = page === 1
    const isLastPage = page === pages
    return (
        <div className="flex items-center justify-between px-2 mt-8">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {pages}
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
                            href={`/search?${firstPageParams?.toString()}`}
                            ariaLabel="Go to first page"
                            IconComponent={DoubleArrowLeftIcon}
                        />
                        <PaginationButton
                            disabled={isFirstPage}
                            href={`/search?${prevPageParams?.toString()}`}
                            ariaLabel="Go to previous page"
                            IconComponent={ChevronLeftIcon}
                        />
                        <PaginationButton
                            disabled={isLastPage}
                            href={`/search?${nextPageParams?.toString()}`}
                            ariaLabel="Go to next page"
                            IconComponent={ChevronRightIcon}
                        />
                        <PaginationButton
                            disabled={isLastPage}
                            href={`/search?${lastPageParams?.toString()}`}
                            ariaLabel="Go to last page"
                            IconComponent={DoubleArrowRightIcon}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
