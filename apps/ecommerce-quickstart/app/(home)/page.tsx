const categories = [
    {
        name: "New Arrivals",
        href: "#",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/075/0759426002.jpg",
    },
    {
        name: "Shirts",
        href: "#",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/066/0668051006.jpg",
    },
    {
        name: "Pants",
        href: "#",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/055/0550888007.jpg",
    },
    {
        name: "Jackets",
        href: "#",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/069/0696758003.jpg",
    },
    {
        name: "Accessories",
        href: "#",
        imageSrc:
            "https://d11p8vtjlacpl4.cloudfront.net/kaggle-hm-images/041/0417427035.jpg",
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
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                        New arrivals are here
                    </h1>
                    <p className="mt-4 text-xl text-white">
                        The new arrivals have, well, newly arrived. Check out
                        the latest options from our summer small-batch release
                        while they're still in stock.
                    </p>
                    <a
                        href="#"
                        className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                        Shop New Arrivals
                    </a>
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
                    <a
                        href="#"
                        className="hidden text-sm font-semibold text-white hover:text-gray-300 sm:block"
                    >
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
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
                    <a
                        href="#"
                        className="block text-sm font-semibold text-white hover:text-gray-300"
                    >
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </section>
        </div>
    )
}
