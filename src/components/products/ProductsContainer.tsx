"use client";

import { useFilters } from "@/hooks/useFilter";
import { IProduct } from "@/interface";
import NotFoundItems from "../NotFoundItems";
import PathElement from "../PathElement";
import ProductCard from "../ProductCard";
import FilterAside from "./FilterAside";
import MobileFilter from "./MobileFilter";

interface Props {
  products: IProduct[];
  category?: string
}

const ProductsContainer = ({ products, category }: Props) => {
  const {
    filteredProducts,
    categories,
    brands,
    ratings,
    price,
    setPrice,
    toggleCategory,
    toggleBrand,
    toggleRating,
  } = useFilters(products, category);

  return (
    <div className="container mx-auto px-8 xl:px-24 pb-8">
      <PathElement indexPath="products" />

      <div className="grid grid-cols-12 gap-6">
        <div className="hidden xl:block xl:col-span-3">
          <FilterAside
            categories={categories}
            brands={brands}
            ratings={ratings}
            price={price}
            setPrice={setPrice}
            toggleCategory={toggleCategory}
            toggleBrand={toggleBrand}
            toggleRating={toggleRating}
          />
        </div>

        <div className="col-span-12 xl:col-span-9">
          <div className="header flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="grow">
              <h5 className="text-sm font-semibold relative pl-6 text-red-600 capitalize mb-5 before:content-[''] before:absolute before:-top-1 before:left-0 before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
                our products
              </h5>

              <h2 className="text-3xl md:text-4xl font-semibold">
                Browse All Products
              </h2>
            </div>

            <MobileFilter
              categories={categories}
              ratings={ratings}
              price={price}
              setPrice={setPrice}
              toggleCategory={toggleCategory}
              toggleRating={toggleRating}
            />
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 4xl:grid-cols-4 gap-6 my-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSale={product.discountPercentage ? true : false}
                />
              ))}
            </div>
          ) : (
            <NotFoundItems msg="No products found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;