import BestSelling from "@/components/home/BestSelling"
import Categories from "@/components/home/Categories"
import FlashSales from "@/components/home/FlashSales"
import Hero from "@/components/home/Hero"
import NewArrivals from "@/components/home/NewArrivals"
import ProductList from "@/components/home/ProductList"
import PromoSection from "@/components/home/PromoSection"

const page = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <NewArrivals />
      <ProductList />
      <PromoSection />
    </>
  )
}

export default page