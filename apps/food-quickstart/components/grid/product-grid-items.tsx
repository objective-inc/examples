import Grid from "@/components/grid"
import { GridTileImage } from "@/components/grid/tile"

import Link from "next/link"
import { Product } from "@/lib/types"
import clsx from "clsx"
import { Clock, Star, User } from "lucide-react"
import { cn } from "@/lib/utils"
export default function ProductGridItems({
    products,
}: {
    products: Product[]
}) {
    return (
        <>
            {products.map((product) => (
                <Grid.Item
                    key={product.id}
                    className="animate-fadeIn aspect-video"
                >
                    <Link
                        className="relative inline-block h-full w-full"
                        href={`/product/${product.id}`}
                    >
                        <div
                            className={clsx(
                                "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-black/50 dark:bg-black"
                            )}
                        >
                            <img
                                // height={300}
                                // width={300}
                                src={product.object.image_url}
                                className={clsx(
                                    "relative h-full w-full object-cover"
                                )}
                            />
                        </div>
                        <p className="text-sm mt-2">{product.object.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{product.object.totalTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>
                                    {product.object.numberOfServings}{" "}
                                    {product.object.numberOfServings === 1
                                        ? "serving"
                                        : "servings"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "fill-current h-3 w-3",
                                            i < product.object.rating
                                                ? "text-yellow-500"
                                                : "text-gray-200"
                                        )}
                                    />
                                )
                            })}
                        </div>
                        {/* <GridTileImage
                            alt={product.object.name}
                            label={{
                                title: product.object.name,
                                amount: product.object.price,
                                currencyCode: "USD",
                                perceived_colour_master_name:
                                    product.object.perceived_colour_master_name,
                                rating: product.object.rating,
                            }}
                            src={product.object.image_url}
                            fill
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        /> */}
                    </Link>
                </Grid.Item>
            ))}
        </>
    )
}
