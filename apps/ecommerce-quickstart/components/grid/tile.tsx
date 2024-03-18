import clsx from "clsx"
import Image from "next/image"
import Label from "../label"

export const renderColorSwatches = (color: string) => {
    const c = color.toLowerCase()

    return (
        <div
            className={`h-6 w-6 rounded-full border`}
            style={{ backgroundColor: c }}
        />
    )
}

export function GridTileImage({
    isInteractive = true,
    active,
    label,
    ...props
}: {
    isInteractive?: boolean
    active?: boolean
    label?: {
        title: string
        amount: string
        currencyCode: string
        perceived_colour_master_name: string
        position?: "bottom" | "center"
    }
} & React.ComponentProps<typeof Image>) {
    return (
        <div
            className={clsx(
                "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
                {
                    relative: label,
                    "border-2 border-blue-600": active,
                    "border-neutral-200 dark:border-neutral-800": !active,
                }
            )}
        >
            {props.src ? (
                // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
                <Image
                    className={clsx("relative h-full w-full object-contain", {
                        "transition duration-300 ease-in-out group-hover:scale-105":
                            isInteractive,
                    })}
                    {...props}
                />
            ) : null}
            {label ? (
                <Label
                    title={label.title}
                    amount={label.amount}
                    currencyCode={label.currencyCode}
                    position={label.position}
                />
            ) : null}
            {label ? (
                <>
                    <div
                        className={clsx(
                            "absolute bottom-0 right-0 flex justify-end w-full px-4 pb-4 @container/label"
                        )}
                    >
                        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                            {renderColorSwatches(
                                label.perceived_colour_master_name
                            )}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}
