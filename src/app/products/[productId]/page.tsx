import ProductContainer from "@/components/product/ProductContainer";
import { getRelatedProducts, getSingleProduct } from "@/services/products";


const ProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const { data } = await getSingleProduct(Number(productId))
  const { product } = data;
  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <>
      <ProductContainer product={product} relatedProducts={relatedProducts} />
    </>
  )
}

export default ProductPage