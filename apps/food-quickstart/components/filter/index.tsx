import { TSortFilterItem } from "@/lib/constants"
import FilterItemDropdown from "./dropdown"
import { FilterItem } from "./item"

export type ListItem = TSortFilterItem | PathFilterItem
export type PathFilterItem = { title: string; path: string; query: string }

function FilterItemList({ list }: { list: ListItem[] }) {
    return (
        <>
            {list.map((item: ListItem, i) => (
                <FilterItem key={i} item={item} />
            ))}
        </>
    )
}

export default function FilterList({
    list,
    title,
}: {
    list: ListItem[]
    title?: string
}) {
    return (
        <>
            <nav>
                {title ? (
                    <h3 className="hidden text-sm text-neutral-500 dark:text-neutral-400 md:block">
                        {title}
                    </h3>
                ) : null}
                <ul className="hidden md:block">
                    <FilterItemList list={list} />
                </ul>
                <ul className="md:hidden">
                    <FilterItemDropdown list={list} />
                </ul>
            </nav>
        </>
    )
}
