"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { colorFilters } from "@/config/filters"
import { createUrl } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { updateUrlWithColor } from "@/lib/utils"

export const ColorFilters = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const newParams = new URLSearchParams(searchParams.toString())
    const router = useRouter()

    return (
        <>
            <h3 className="hidden text-sm text-neutral-500 dark:text-neutral-400 md:block">
                Colors
            </h3>
            <ScrollArea type="always" className="h-[300px] w-full mt-2">
                <nav className="grid grid-cols-1 items-start gap-2">
                    {colorFilters.map((color) => (
                        <div className="flex items-center gap-2" key={color}>
                            <Checkbox
                                defaultChecked={searchParams
                                    .get("filterQuery")
                                    ?.includes(color)}
                                onCheckedChange={(e) => {
                                    router.push(
                                        createUrl(
                                            pathname,
                                            updateUrlWithColor(
                                                newParams?.toString(),
                                                color,
                                                e as boolean
                                            )
                                        )
                                    )
                                }}
                            />
                            <div
                                className="h-6 w-6"
                                style={{
                                    backgroundColor: color,
                                }}
                            />
                            <span className="text-xs truncate">{color}</span>
                        </div>
                    ))}
                </nav>
            </ScrollArea>
        </>
    )
}
