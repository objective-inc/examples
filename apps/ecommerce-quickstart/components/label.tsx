import clsx from "clsx"
import Price from "./price"

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
}: {
    title: string
    amount: string
    currencyCode: string
    position?: "bottom" | "center"
    perceived_colour_master_name: string
}) => {
    return (
        <div
            className={clsx(
                "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
                {
                    "lg:px-20 lg:pb-[35%]": position === "center",
                }
            )}
        >
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                    {title}
                </h3>
                <Price
                    className="flex-none rounded-full bg-black p-2 text-white"
                    amount={amount}
                    currencyCode={currencyCode}
                    currencyCodeClassName="hidden @[275px]/label:inline"
                />
            </div>
        </div>
    )
}

export default Label
