import { IProduct } from "@/interface"
import { calculatePrice } from "@/utils"
import { FaStar } from "react-icons/fa"

const ProductInfo = ({ productData }: { productData: IProduct | undefined }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">
        {productData?.title}
      </h1>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, idx) => (
            <FaStar
              key={idx}
              className={
                idx < Math.round(productData?.rating || 0)
                  ? ""
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <span className="text-gray-400">
          (150 Reviews)
        </span>

        <span className="text-green-600 font-medium">
          In Stock
        </span>
      </div>

      {productData?.discountPercentage ? (
        <div className="mt-5">
          <span className="text-4xl font-bold text-red-500">${calculatePrice(productData.price, productData.discountPercentage)}</span>
          <span className="text-gray-600 text-xl line-through ml-2">
            ${productData.price}
          </span>

        </div>
      ) : (
        <p className="text-4xl font-bold mt-5 text-red-500">
          ${productData?.price}
        </p>
      )}



      <p className="mt-5 text-gray-600 leading-7">
        {productData?.description}
      </p>
    </>
  )
}

export default ProductInfo