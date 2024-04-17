import Price from "@/components/price"
import Prose from "@/components/prose"
import { Button } from "@/components/ui/button"
import { objective } from "@/lib/objective"
import { cn } from "@/lib/utils"
import { Clock, Star, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Reviews } from "./components/reviews"

const relatedProducts = [
    {
        name: "Vegan Options",
        href: "/search?query=vegan+options",
        imageSrc:
            "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=3764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Summer drinks",
        href: "/search?query=summer+drinks",
        imageSrc:
            "https://plus.unsplash.com/premium_photo-1679397830538-9b5caedc85d2?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Organic Fruits",
        href: "/search?query=organic+fruits",
        imageSrc:
            "https://images.unsplash.com/photo-1574362353379-369c92ccd89d?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Artisan Breads",
        href: "/search?query=artisan+breads",
        imageSrc:
            "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?q=80&w=3289&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Gourmet Cheeses",
        href: "/search?query=gourmet+cheeses",
        imageSrc:
            "https://images.unsplash.com/photo-1695606452858-39038806b143?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
]

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const product = await objective.objectStore.objects.getObject(params.id)

    if (!product) return notFound()

    return (
        <>
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6">
                        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                            <Image
                                className="h-full w-full object-contain"
                                fill
                                // sizes="(min-width: 1024px) 66vw, 100vw"
                                alt={product.object.prod_name}
                                src={product.object.image_url}
                                priority={true}
                            />
                        </div>
                    </div>

                    <div className="basis-full lg:basis-2/6">
                        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                            <h1 className="mb-2 text-5xl font-medium">
                                {product.object.name}
                            </h1>
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
                            <div className="flex flex-col mt-4">
                                <ul>
                                    {product.object.ingredientLines.map(
                                        (ingredient: any) => (
                                            <li
                                                className="text-muted-foreground text-sm"
                                                key={ingredient}
                                            >
                                                &#8226; {ingredient}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        {product?.object?.detail_desc ? (
                            <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%]">
                                {product.object.detail_desc}
                            </Prose>
                        ) : null}
                        <Button>Favorite recipe</Button>
                    </div>
                </div>
                <Reviews />
                {/* Category section */}
                <section
                    aria-labelledby="category-heading"
                    className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8 pb-48"
                >
                    <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                        <h2
                            id="category-heading"
                            className="text-2xl font-bold tracking-tight"
                        >
                            Browse by Category
                        </h2>
                        <Link
                            href="/search"
                            className="hidden text-sm font-semibold  sm:block"
                        >
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>

                    <div className="mt-4 flow-root">
                        <div className="-my-2">
                            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                                    {relatedProducts.map((category) => (
                                        <a
                                            key={category.name}
                                            href={category.href}
                                            className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            >
                                                <img
                                                    src={category.imageSrc}
                                                    alt=""
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                            />
                                            <span className="relative mt-auto text-center text-xl font-bold text-white">
                                                {category.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 px-4 sm:hidden">
                        <Link
                            href="/search"
                            className="block text-sm font-semibold "
                        >
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    )
}
