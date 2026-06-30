import { categories } from "@/data";
import { ICategory } from "@/interface";
import CategoryCard from "../CategoryCard";
import NotFoundItems from "../NotFoundItems";
import CategoriesSkeleton from "../Skeletons/CategoriesSkeleton";
import Swiper from "../Swiper";
import Wrapper from "../ui/Wrapper";



const Categories = () => {
    const { isLoading, data } = {
        isLoading: false, data: categories
    }

    const slides = data?.map((category: ICategory) => (
        <CategoryCard category={category} key={category.id} />
    ))

    if (isLoading) {
        return (
            <CategoriesSkeleton />
        )
    }

    return (
        <Wrapper classes="py-10 mb-10" title="Categories">
            <h2 className="text-2xl font-semibold mt-5">Browse By Category</h2>
            {data?.length ? (
                <Swiper
                    slidesPerView={1}
                    className="hero-swiper pb-16! mt-8"
                    slides={slides || []}
                    spaceBetween={30}
                    pagination={true}
                    breakpoints={{
                        330: { slidesPerView: 2 },
                        545: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                />
            ) : (
                <NotFoundItems msg="No Categories are added" />
            )}
        </Wrapper>
    )
}



export default Categories;