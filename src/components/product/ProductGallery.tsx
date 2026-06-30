"use client"
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { useState } from 'react';

interface IProps {
  images: string[]
}

const ProductGallery = ({ images }: IProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className="grid md:grid-cols-[120px_1fr] gap-4 h-full">
      <div className="flex md:flex-col gap-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={cn(
              "rounded-xl overflow-hidden border-2 transition h-[25%]",
              activeImage === img ? "border-red-500" : "border-gray-200"
            )}
          >
            <Image
              src={img}
              alt="product-img"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={activeImage}
          alt="product-img"
          width={800}
          height={800}
          className="w-full h-150 object-cover hover:scale-105 transition duration-300"
        />
      </div>
    </div>
  )
}

export default ProductGallery