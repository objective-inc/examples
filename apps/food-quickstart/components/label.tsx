import clsx from "clsx"
import Price from "./price"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const renderColorSwatches = (color: string) => {
    const c = color.toLowerCase()

    return (
        <div
            className={`h-6 w-6 rounded-full border`}
            style={{ backgroundColor: c }}
        />
    )
}

const Label = ({
    title,
    amount,
    currencyCode,
    position = "bottom",
    perceived_colour_master_name,
    rating,
}: {
    title: string
    amount: string
    currencyCode: string
    position?: "bottom" | "center"
    perceived_colour_master_name: string
    rating: number
}) => {
    return (
        <div
            className={clsx("absolute bottom-0 left-0 flex w-full px-4 pb-4 ", {
                "lg:px-20 lg:pb-[35%]": position === "center",
            })}
        >
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-sm font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                <div className="flex flex-col gap-1">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                        {title}
                    </h3>
                    <div className="mr-4  pl-2 flex items-center gap-1">
                        {Array.from(Array(5), (e, i) => {
                            return (
                                <Star
                                    key={i}
                                    className={cn(
                                        "fill-current h-3 w-3",
                                        i < rating
                                            ? "text-yellow-500"
                                            : "text-gray-200"
                                    )}
                                />
                            )
                        })}
                    </div>
                </div>
                {/* 
                <Price
                    className="flex-none rounded-full bg-black p-2 text-white"
                    amount={amount}
                    currencyCode={currencyCode}
                    currencyCodeClassName="hidden @[275px]/label:inline"
                /> */}
            </div>
        </div>
    )
}

export default Label
