import Image from "next/image"
import Link from "next/link"
const incentives = [
    {
        name: "Free shipping",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
        description:
            "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
        name: "Freshness guarantee",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
        description:
            "Foods are guaranteed to be fresh when you receive them using our definition of fresh.",
    },
]

const categories = [
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

export default function Home() {
    return (
        <div>
            <div className="relative bg-gray-900">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 overflow-hidden"
                >
                    <Image
                        fill
                        priority={true}
                        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black opacity-75"
                />
                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
                        Foods &amp; Drink Recipes
                    </h1>
                    <p className="mt-4 text-xl text-white">
                        {`The new recipes have, well, newly arrived. Check out
                        the latest options from our summer small-batch release.`}
                    </p>
                    <Link
                        href="/search"
                        className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                        Shop New Arrivals
                    </Link>
                </div>
            </div>
            {/* Category section */}
            <section
                aria-labelledby="category-heading"
                className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
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
                                {categories.map((category) => (
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
            <div className="bg-white mt-48">
                <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                                We built our business on customer service
                            </h2>
                            <p className="mt-4 text-gray-500">
                                {`At the beginning at least, but then we realized
                                we could make a lot more money if we kinda
                                stopped caring about that. Our new strategy is
                                to write a bunch of things that look really good
                                in the headlines, then clarify in the small
                                print but hope people don't actually read it.`}
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                            {incentives.map((incentive) => (
                                <div
                                    key={incentive.name}
                                    className="sm:flex lg:block"
                                >
                                    <div className="sm:flex-shrink-0">
                                        <img
                                            className="h-16 w-16"
                                            src={incentive.imageSrc}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {incentive.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {incentive.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-transparent mt-48">
                <div className="overflow-hidden pt-32 sm:pt-14">
                    <div className="bg-neutral-800">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="relative pb-16 pt-48 sm:pb-24">
                                <div>
                                    <h2
                                        id="sale-heading"
                                        className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                                    >
                                        Seasonal recipes
                                        <br />
                                        for the whole family.
                                    </h2>
                                    <div className="mt-6 text-base">
                                        <Link
                                            href="/search"
                                            className="font-semibold text-white"
                                        >
                                            View the latest
                                            <span aria-hidden="true">
                                                {" "}
                                                &rarr;
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                                        <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://images.unsplash.com/photo-1564759077036-3def242e69c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                <img
                                                    className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                    src="https://plus.unsplash.com/premium_photo-1677192451109-a7d3762a74fa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
