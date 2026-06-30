"use client"

import ErrorHandler from "@/components/ErrorHandler"
import PathElement from "@/components/PathElement"
import ProductCard from "@/components/ProductCard"
import FavouriteSkeleton from "@/components/Skeletons/FavouriteSkeleton"
import Button from "@/components/ui/button"
import { useFav } from "@/hooks/useFavourite"
import Link from "next/link"
import { FaRegHeart } from "react-icons/fa"


const FavouritePage = () => {

  const { handleRemoveAllFav, isClearing, products, isLoading, error } = useFav()


  if (isLoading) return <FavouriteSkeleton />
  if (error) return <ErrorHandler />


  return (
    <div className="container mx-auto px-8 xl:px-24 pb-12">
      <div className="flex items-center justify-between">
        <PathElement indexPath="Favourites" />
        {products.length > 0 && (
          <Button variant="secondary" isLoading={isClearing} onClick={() => handleRemoveAllFav()}>
            {isClearing ? "Clearing..." : "Clear All"}
          </Button>
        )}
      </div>

      {/* Section header */}
      <div className="mb-8">
        <h5 className="text-sm font-semibold relative pl-6 text-red-600
          before:content-[''] before:absolute before:-top-1 before:left-0
          before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
          Wishlist
        </h5>
        <div className="flex items-end justify-between mt-4">
          <h2 className="text-2xl font-semibold">
            My Favourites
            <span className="text-gray-400 text-base font-normal ml-2">({products.length} items)</span>
          </h2>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <FaRegHeart size={48} className="text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h3>
          <p className="text-gray-400 text-sm">Start adding products you love!</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FavouritePage