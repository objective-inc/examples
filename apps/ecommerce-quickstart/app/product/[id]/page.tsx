import { objective } from "@/lib/objective"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import Price from "@/components/price"
import Prose from "@/components/prose"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const product = await objective.objectStore.objects.getObject(params.id)

    if (!product) return notFound()

    console.log("Product", product)

    return (
        <>
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6">
                        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                            <Image
                                className="h-full w-full object-contain"
                                fill
                                sizes="(min-width: 1024px) 66vw, 100vw"
                                alt={product.object.prod_name}
                                src={product.object.image_url}
                                priority={true}
                            />
                        </div>
                    </div>

                    <div className="basis-full lg:basis-2/6">
                        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                            <h1 className="mb-2 text-5xl font-medium">
                                {product.object.prod_name}
                            </h1>
                            <div className="mr-auto w-auto rounded-full bg-black p-2 mt-1 text-sm text-white">
                                <Price
                                    amount={product.object.price}
                                    currencyCode={"USD"}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                {Array.from(Array(5), (e, i) => {
                                    return (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "fill-current h-4 w-4",
                                                i < product.object.rating
                                                    ? "text-yellow-500"
                                                    : "text-gray-200"
                                            )}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        {product?.object?.detail_desc ? (
                            <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%]">
                                {product.object.detail_desc}
                            </Prose>
                        ) : null}
                        <Button>Add to cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
