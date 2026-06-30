import { IProductResponse, IProductsResponse } from "@/interface";
import { fetcher } from "./api";

export const getProducts = (q?: string) =>
  fetcher<IProductsResponse>(q ? `/products?q=${encodeURIComponent(q)}` : "/products");

export const getSingleProduct = (id: number) => fetcher<IProductResponse>(`/products/${id}`);

export const getRelatedProducts = async (id: number, category: string) => {
  const { data } = await getProducts();
  const relatedProducts = data.products.filter(product => product.id !== id && product.category === category)
  return relatedProducts;
}