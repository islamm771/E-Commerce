import { getProducts } from "@/services/products";
import { shuffleArray } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";
import { IProduct } from "../../interface";
import NotFoundItems from "../NotFoundItems";
import ProductCard from "../ProductCard";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import Wrapper from "../ui/Wrapper";



const ProductList = async () => {
    const result = await getProducts()
    return (
        <Wrapper title="Our Products" classes="mb-16">
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-2xl font-semibold">Explore Our Products</h2>
                <Link href="/products" className="bg-red-500 text-white text-sm px-4 py-3.5 rounded-sm font-medium capitalize">
                    View All Products
                </Link>
            </div>
            <Suspense fallback={
                <div className="container mx-auto px-8 xl:px-24 py-16">
                    <div role="status" className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </div>
                </div>
            }>
                {result?.data.products ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                    {shuffleArray(result.data.products).map((product: IProduct) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div> : (
                    <NotFoundItems msg="No products are added" />
                )}
            </Suspense>

        </Wrapper>
    )
}

export default ProductList