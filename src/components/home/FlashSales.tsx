import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useGetAllProductsQuery } from '../../app/features/ProductsSlice';
import { getProducts } from '@/services/products';
import ProductCard from '../ProductCard';
import Swiper from '../Swiper';
import Wrapper from '../ui/Wrapper';




const FlashSales = async () => {
    const result = await getProducts()

    // if (isLoading) return (
    //     <Wrapper title="Today's" classes='mb-10'>
    //         <h2 className="text-2xl font-semibold mt-5">Flash Sales</h2>
    //         <div role="status" className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
    //             <ProductSkeleton />
    //             <ProductSkeleton />
    //             <ProductSkeleton />
    //             <ProductSkeleton />
    //         </div>
    //     </Wrapper>
    // )

    const slides = result.data.products
        .filter(product => product.discountPercentage > 0)
        .map(product => (
            <ProductCard
                key={product.id}
                product={product}
                isSale
            />
        ));
    return (
        <Wrapper title="Today's" classes='mb-10'>
            <h2 className="text-2xl font-semibold mt-5">Flash Sales</h2>
            <div className='flex justify-end gap-2 mt-3'>
                <button className='w-8 h-8 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center flash-swiper-button-prev'><FaChevronLeft /></button>
                <button className='w-8 h-8 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center flash-swiper-button-next'><FaChevronRight /></button>
            </div>
            <Swiper
                slidesPerView={1}
                className="hero-swiper py-8!"
                slides={slides || []}
                spaceBetween={30}
                loop={true}
                pagination={false}
                navigation={{
                    prevEl: '.flash-swiper-button-prev',
                    nextEl: '.flash-swiper-button-next',
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

export default FlashSales