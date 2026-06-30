import { IProduct } from "@/interface"
import ProductCard from "../ProductCard"
import Wrapper from "../ui/Wrapper"

interface IProps {
  relatedProducts?: IProduct[]
  favourites?: Pick<IProduct, "id">[]
}

const RelatedProducts = ({ relatedProducts, favourites = [] }: IProps) => {
  return (
    <Wrapper title='Related Items'>
      {relatedProducts && relatedProducts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {relatedProducts.map(relatedProduct => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />)
          )}
        </div>
      ) :
        <div className="mt-8">
          <p className="text-gray-500">No related items yet.</p>
        </div>
      }
    </Wrapper>
  )
}

export default RelatedProducts