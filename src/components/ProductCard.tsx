"use client";

import { useCart } from "@/hooks/useCart";
import { useFav } from "@/hooks/useFavourite";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { IProduct } from "@/interface";
import { calculatePrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";

interface IProps {
    product: IProduct;
    isSale?: boolean;
}

const ProductCard = ({ product, isSale = false }: IProps) => {

    const { handleAddToCart } = useCart();
    const { handleAddToFav, handleRemoveFav, isFavourite } = useFav();

    const isFav = isFavourite(product.id.toString())

    const requireAuth = useRequireAuth();

    const handleFavClick = (productId: number) => {
        if (!requireAuth()) return;

        isFav ? handleRemoveFav(productId, {
            onSuccess: () => toast.success(`${product.title} is removed from favourites`),
            onError: () => toast.error("Something went wrong"),
        })
            : handleAddToFav(productId, {
                onSuccess: () => toast.success(`${product.title} added to favourite`),
                onError: () => toast.error("Something went wrong"),
            })
    }

    const handleAddToCartClick = (productId: number) => {
        if (!requireAuth()) return;

        handleAddToCart({ id: productId }, {
            onSuccess: () => toast.success(`${product.title} added to cart`),
            onError: () => toast.error(`${product.title} already exist in cart`),
        });
    }

    return (
        <div className="group border border-gray-200 rounded-lg transition-shadow duration-300 hover:shadow-xl hover:bg-white">
            <div className="relative rounded-t-lg overflow-hidden">
                {isSale && (
                    <span className="bg-red-600 text-white text-center w-11 py-1 block rounded-md text-xs absolute top-3 left-3 z-10">
                        -{Math.round(product.discountPercentage)}%
                    </span>
                )}

                <Link
                    href={`/products/${product.id}`}
                    className="block font-semibold"
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="eager"
                    />
                </Link>

                <ul className="space-y-1 absolute top-1 right-1">
                    <li className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md 
                    transition-all duration-300 hover:bg-red-500 hover:text-white ${isFav ? "bg-red-500 text-white" : "bg-white text-black"}`}
                        onClick={() => handleFavClick(product.id)}
                    >
                        <FaRegHeart size={14} />
                    </li>

                    <li className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white">
                        <MdOutlineRemoveRedEye />
                    </li>
                </ul>

                <button
                    onClick={() => handleAddToCartClick(product.id)}
                    className={`w-full bg-black text-white text-sm cursor-pointer
                        flex items-center gap-1 justify-center absolute left-0  py-2 -bottom-14
                        transition-all duration-500 group-hover:bottom-0`}>
                    <RiShoppingCart2Line />
                    Add To Cart
                </button>
            </div>

            <div className="p-5 space-y-2">
                <span className="text-sm text-violet-500 font-medium capitalize">{product.category}</span>
                <Link
                    href={`/products/${product.id}`}
                    className="block text-lg font-semibold"
                >
                    {product.title}
                </Link>
                <p className="text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="product-price">
                    {isSale ? (
                        <>
                            <span className="text-red-600 font-semibold text-lg">${calculatePrice(product.price, product.discountPercentage)}</span>
                            <span className="text-gray-600 line-through ml-2">
                                ${product.price}
                            </span>

                        </>
                    ) : (
                        <span className="text-red-600 font-semibold text-lg">${product.price}</span>
                    )}
                </div>

                <div className="flex items-center gap-2 ">
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <FaStar
                                key={idx}
                                className={
                                    idx < Math.round(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }
                            />
                        ))}

                    </div>
                    <span className="text-sm text-gray-500 leading-none">{product.rating} (128 reviews)</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;