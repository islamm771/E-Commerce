import { IBrand, ICategory, IProduct } from "@/interface";
import { useMemo, useState } from "react";

export const useFilters = (products: IProduct[], category?: string) => {
  const [categories, setCategories] = useState<string[]>(category ? [category.toLowerCase()] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState<number[]>([]);

  const toggleCategory = (category: ICategory) => {
    setCategories((prev) =>
      prev.includes(category.name.toLowerCase())
        ? prev.filter((item) => item.toLowerCase() !== category.name.toLowerCase())
        : [...prev, category.name.toLowerCase()]
    );
  };

  const toggleBrand = (brand: IBrand) => {
    setBrands((prev) =>
      prev.includes(brand.name.toLowerCase())
        ? prev.filter((item) => item.toLowerCase() !== brand.name.toLowerCase())
        : [...prev, brand.name.toLowerCase()]
    );
  };

  const toggleRating = (rating: number) => {
    setRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        categories.length === 0 ||
        categories.includes(product.category.toLowerCase());

      const brandMatch =
        brands.length === 0 ||
        brands.includes(product.brand.toLowerCase());

      const priceMatch = product.price >= price;

      const ratingMatch =
        ratings.length === 0 ||
        ratings.some((rating) => product.rating === rating);

      return categoryMatch && brandMatch && priceMatch && ratingMatch;
    });
  }, [products, categories, brands, price, ratings]);


  // useEffect(() => {
  //   if (!category) return;

  //   setCategories((prev) =>
  //     prev.includes(category.toLowerCase())
  //       ? prev
  //       : [...prev, category.toLowerCase()]
  //   );
  // }, [category]);

  return {
    categories,
    brands,
    ratings,
    price,
    filteredProducts,
    setPrice,
    toggleCategory,
    toggleBrand,
    toggleRating,
  };
};