import { BrandLogo } from "@/components/logo"
import Search from "@/components/search"
import Link from "next/link"
import { Cart } from "./cart"

const menu = [
    { title: "All", path: "/" },
    { title: "Tops", path: "/search?query=tops" },
    { title: "Bottoms", path: "/search?query=bottoms" },
]

export default function Navbar() {
    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Link
                        href="/"
                        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
                    >
                        <BrandLogo className="h-8 w-auto" />
                    </Link>
                    {menu.length ? (
                        <ul className="hidden gap-6 text-sm md:flex md:items-center">
                            {menu.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.path}
                                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="hidden justify-center md:flex md:w-1/3">
                    <Search />
                </div>
                <div className="flex justify-end md:w-1/3">
                    <Cart />
                </div>
            </div>
        </nav>
    )
}
