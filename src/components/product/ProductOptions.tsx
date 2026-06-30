"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";

const colors = [
  "bg-black",
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-500",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductOptions = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="space-y-6 mt-8">
      {/* Colors */}
      <div className="flex items-center gap-4">
        <span className="font-medium min-w-14">Colors</span>

        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "size-7 rounded-full transition ring-2 ring-offset-2 cursor-pointer",
                color,
                selectedColor === color
                  ? "ring-red-500"
                  : "ring-transparent"
              )}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex items-center gap-4">
        <span className="font-medium min-w-14">Size</span>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "w-11 h-11 rounded-lg border transition-all cursor-pointer",
                selectedSize === size
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 hover:border-red-500"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;