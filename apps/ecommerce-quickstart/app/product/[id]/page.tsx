import Price from "@/components/price"
import Prose from "@/components/prose"
import { Button } from "@/components/ui/button"
import { objective } from "@/lib/objective"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const relatedProducts = [
    {
        name: "T-Shirts",
        href: "/search?query=t-shirts",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/075/0759426002.jpg",
    },
    {
        name: "Shirts",
        href: "/search?query=shirts",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/066/0668051006.jpg",
    },
    {
        name: "Pants",
        href: "/search?query=pants",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/055/0550888007.jpg",
    },
    {
        name: "Jackets",
        href: "/search?query=jackets",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/069/0696758003.jpg",
    },
    {
        name: "Accessories",
        href: "/search?query=accessories",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/041/0417427035.jpg",
    },
]

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
                            <small>{product.object.section_name}</small>
                            <h1 className="mb-2 text-5xl font-medium">
                                {product.object.prod_name}
                            </h1>
                            <div className="mr-auto w-auto rounded-full bg-black p-2 mt-1 text-xs text-white">
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
                            Shop by Category
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
