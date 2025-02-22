"use client"

import { Search as SearchIcon } from "lucide-react"
import { createUrl } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

export default function Search() {
    const router = useRouter()
    const searchParams = useSearchParams()

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const val = e.target as HTMLFormElement
        const search = val.search as HTMLInputElement
        const newParams = new URLSearchParams(searchParams.toString())

        if (search.value) {
            newParams.set("query", search.value)
        } else {
            newParams.delete("query")
        }

        router.push(createUrl("/search", newParams))
    }

    return (
        <form
            onSubmit={onSubmit}
            className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
        >
            <input
                key={searchParams?.get("query")}
                type="text"
                name="search"
                placeholder="Search for food & drink products..."
                autoComplete="off"
                defaultValue={searchParams?.get("query") || ""}
                className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
            />
            <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <SearchIcon className="h-4" />
            </div>
        </form>
    )
}
