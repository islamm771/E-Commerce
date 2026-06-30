"use client"
import PathElement from "@/components/PathElement";
import ProductActions from "@/components/product/ProductActions";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductOptions from "@/components/product/ProductOptions";
import { useCart } from "@/hooks/useCart";
import { useFav } from "@/hooks/useFavourite";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { IProduct } from "@/interface";
import { useState } from "react";
import toast from "react-hot-toast";
import RelatedProducts from "./RelatedProducts";


interface IProps {
  product: IProduct,
  relatedProducts?: IProduct[]
}

const ProductContainer = ({ product, relatedProducts }: IProps) => {
  const [quantity, setQuantity] = useState(1);
  const images = Array(4).fill(product.image);

  const { handleAddToCart: addToCart } = useCart();
  const { handleAddToFav: addToFav, handleRemoveFav, isFavourite } = useFav();

  const isFav = isFavourite(product.id.toString())
  const requireAuth = useRequireAuth();

  const handleAddToCart = async (productId: number) => {
    if (!requireAuth()) return;

    addToCart({ id: productId, quantity: quantity }, {
      onSuccess: () => toast.success(`${product.title} added to cart`),
      onError: () => toast.error("Something went wrong"),
    });
  }

  const handleAddToFav = async (productId: number) => {
    if (!requireAuth()) return;

    if (isFav) {
      handleRemoveFav(productId, {
        onSuccess: () => toast.success(`${product.title} is removed from favourites`),
        onError: () => toast.error("Something went wrong"),
      });
      return;
    }

    addToFav(productId, {
      onSuccess: () => toast.success(`${product.title} added to favourite`),
      onError: () => toast.error("Something went wrong"),
    });
  }
  return (
    <>
      <div className="container mx-auto px-4 lg:px-24 py-10">
        <PathElement
          pathes={product?.category}
          indexPath={product?.title || ""}
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <ProductGallery images={images} />
          </div>

          <div className="lg:col-span-5">
            <ProductInfo productData={product} />

            {product.category.toLowerCase() === "fashion" && <ProductOptions />}

            <ProductActions
              quantity={quantity}
              setQuantity={setQuantity}
              stock={product?.stock || 0}
              productId={product.id}
              isFav={isFav}
              onAddToCart={handleAddToCart}
              onAddToFav={handleAddToFav}
            />

            <ProductFeatures />
          </div>
        </div>
      </div>
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  )
}

export default ProductContainer