import ErrorHandler from "@/components/ErrorHandler";
import ProductsContainer from "@/components/products/ProductsContainer";
import { getProducts } from "@/services/products";

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ category: string }> }) => {
  const { category } = await searchParams

  const result = await getProducts();

  if (!result) {
    return <ErrorHandler />
  }

  return <ProductsContainer products={result.data.products} category={category} />;
};

export default ProductsPage;