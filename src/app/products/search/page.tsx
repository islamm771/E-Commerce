import ErrorHandler from "@/components/ErrorHandler";
import NotFoundItems from "@/components/NotFoundItems";
import PathElement from "@/components/PathElement";
import ProductsContainer from "@/components/products/ProductsContainer";
import { getProducts } from "@/services/products";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
    const { q } = await searchParams;

    const result = await getProducts(q);

    if (!result) {
        return <ErrorHandler />;
    }

    const products = result.data.products;

    if (!q?.trim()) {
        return (
            <div className="container mx-auto px-8 xl:px-24 pb-8">
                <PathElement pathes={"products"} indexPath="search" />
                <NotFoundItems msg="Please enter a search term" />
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="container mx-auto px-8 xl:px-24 pb-8">
                <PathElement pathes={"products"} indexPath="search" />
                <NotFoundItems msg={`No results found for "${q}"`} />
            </div>
        );
    }

    return <ProductsContainer products={products} />;
};

export default SearchPage;