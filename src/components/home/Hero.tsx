import { categories } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import Swiper from "../Swiper";

const slidesData = [
    {
        title: "Up to 10% off Voucher",
        goTitle: "Shop Now",
        image: "/imgs/hero-img.png"
    },
    {
        title: "New Arrivals!",
        goTitle: "Discover",
        image: "/imgs/sm-s24.avif"
    }
]



const slides = slidesData.map((slide, idx) => (
    <div className='w-full lg:h-87.5 bg-black text-white grid lg:grid-cols-2' key={idx}>
        <div className='p-4 lg:p-16'>
            <h1 className='text-[30px] font-semibold mb-6'>
                {slide.title}
            </h1>
            <button className="flex items-center gap-1">
                <span className="border-b border-solid border-gray-400">{slide.goTitle}</span>
                <GoArrowRight className="mt-1" />
            </button>
        </div>
        <div className='p-4'>
            <Image
                className="w-95 h-full"
                src={slide.image}
                alt={slide.title}
                width={100} height={100}
                loading="eager"
            />
        </div>
    </div>
))


const Hero = () => {
    return (
        <div className="container mx-auto px-8 xl:px-24">
            <header className="grid grid-cols-12 container mb-24">
                <aside className="col-span-3 border-r border-solid border-gray-300 pt-4 lg:pt-8">
                    <ul className='flex flex-col justify-between h-full'>
                        {categories.map(cat => (
                            <li className='cursor-pointer hover:underline text-sm md:text-base' key={cat.id}>
                                <Link href={`/products?category=${cat.slug}`}>{cat.name}</Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="col-span-9 px-4 pt-4 lg:px-8 lg:pt-8">
                    <Swiper
                        slidesPerView={1}
                        className="hero-swiper"
                        slides={slides}
                        spaceBetween={30}
                        loop={true}
                        pagination={true}
                        autoplay={true}
                    />
                </div>
            </header>
        </div>
    )
}

export default Hero