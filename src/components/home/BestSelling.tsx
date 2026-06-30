import { getProducts } from "@/services/products"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import ProductCard from "../ProductCard"
import Swiper from "../Swiper"
import Wrapper from "../ui/Wrapper"

const BestSelling = async () => {
  const result = await getProducts()

  const slides = result.data.products
    .filter(p => p.rating >= 4.5)
    .map(product => (
      <ProductCard key={product.id} product={product} />
    ))

  return (
    <Wrapper title="This Month" classes="mb-10">
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-semibold">Best Selling Products</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center best-swiper-prev">
            <FaChevronLeft />
          </button>
          <button className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center best-swiper-next">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        className="py-8!"
        slides={slides}
        spaceBetween={30}
        loop={true}
        pagination={false}
        navigation={{
          prevEl: ".best-swiper-prev",
          nextEl: ".best-swiper-next",
        }}
        breakpoints={{
          400: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      />
    </Wrapper>
  )
}

export default BestSelling