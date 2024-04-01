import clsx from "clsx"
import { Suspense } from "react"

import FilterList from "./filter"

const collections = [
    {
        title: "All",
        path: "/search",
        query: "",
    },
    {
        title: "Vegetarian",
        path: "/search",
        query: "vegetarian",
    },
    {
        title: "Vegan",
        path: "/search",
        query: "vegan",
    },
    {
        title: "Gluten-Free",
        path: "/search",
        query: "gluten-free",
    },
    {
        title: "Italian",
        path: "/search",
        query: "italian",
    },
    {
        title: "Mexican",
        path: "/search",
        query: "mexican",
    },
    {
        title: "Chinese",
        path: "/search",
        query: "chinese",
    },
    {
        title: "Drinks",
        path: "/search",
        query: "drinks",
    },
]

function CollectionList() {
    return <FilterList list={collections} title="Collections" />
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded"
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300"
const items = "bg-neutral-400 dark:bg-neutral-700"

export default function Collections() {
    return (
        <Suspense
            fallback={
                <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
                    <div className={clsx(skeleton, activeAndTitles)} />
                    <div className={clsx(skeleton, activeAndTitles)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                    <div className={clsx(skeleton, items)} />
                </div>
            }
        >
            <CollectionList />
        </Suspense>
    )
}
