"use client";

import Button from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stock: number;
  productId: number;
  isFav?: boolean;
  onAddToCart: (productId: number) => void;
  onAddToFav: (productId: number) => void;
}

const ProductActions = ({
  quantity,
  setQuantity,
  stock,
  productId,
  isFav = false,
  onAddToCart,
  onAddToFav,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      <div className="flex overflow-hidden rounded-lg border border-gray-300">
        <button
          disabled={quantity <= 1}
          onClick={() => setQuantity((prev) => prev - 1)}
          className="w-12 h-12 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaMinus />
        </button>

        <span className="w-14 flex items-center justify-center font-semibold border-x border-gray-300">
          {quantity}
        </span>

        <button
          disabled={quantity >= stock}
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-12 h-12 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaPlus />
        </button>
      </div>

      <Button width="fit" onClick={() => onAddToCart(productId)}>
        Buy Now
      </Button>

      <button
        onClick={() => onAddToFav(productId)}
        className={`size-12 rounded-lg border flex items-center justify-center transition hover:bg-red-500 hover:text-white hover:border-red-500 ${isFav ? "bg-red-500 text-white border-red-500" : "border-gray-300"
          }`}
      >
        <FaRegHeart />
      </button>
    </div>
  );
};

export default ProductActions;