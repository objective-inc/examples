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
                            alt={product.prod_name}
                            label={{
                                title: product.prod_name,
                                amount: product.price,
                                currencyCode: "USD",
                            }}
                            src={product.image_url}
                            fill
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                    </Link>
                </Grid.Item>
            ))}
        </>
    )
}
