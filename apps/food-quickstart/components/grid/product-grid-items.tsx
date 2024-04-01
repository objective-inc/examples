import Grid from "@/components/grid"
import { GridTileImage } from "@/components/grid/tile"

import Link from "next/link"
import { Product } from "@/lib/types"
export default function ProductGridItems({
    products,
}: {
    products: Product[]
}) {
    return (
        <>
            {products.map((product) => (
                <Grid.Item key={product.id} className="animate-fadeIn">
                    <Link
                        className="relative inline-block h-full w-full"
                        href={`/product/${product.id}`}
                    >
                        <GridTileImage
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
                        />
                    </Link>
                </Grid.Item>
            ))}
        </>
    )
}
