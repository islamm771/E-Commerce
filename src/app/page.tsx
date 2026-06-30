import Categories from "@/components/home/Categories"
import FlashSales from "@/components/home/FlashSales"
import Hero from "@/components/home/Hero"
import ProductList from "@/components/home/ProductList"

const page = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <ProductList />
    </>
  )
}

export default page