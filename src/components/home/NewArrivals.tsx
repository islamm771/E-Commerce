import { getProducts } from "@/services/products"
import Image from "next/image"
import Link from "next/link"
import Wrapper from "../ui/Wrapper"

const NewArrivals = async () => {
  const result = await getProducts()

  const products = result.data.products.slice(-5)
  const [main, ...rest] = products

  return (
    <Wrapper title="Featured" classes="mb-16">
      <h2 className="text-2xl font-semibold mt-5 mb-8">New Arrival</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-150">

        {/* Main large card */}
        <Link href={`/products/${main.id}`}
          className="relative bg-black rounded-lg overflow-hidden group">
          <Image
            src={main.image}
            alt={main.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-xl font-bold">{main.title}</h3>
            <p className="text-sm text-gray-300 mt-1 line-clamp-1 max-w-xs">{main.description}</p>
            <span className="inline-block mt-3 text-sm underline underline-offset-4 hover:text-red-400 transition-colors">
              Shop Now →
            </span>
          </div>
        </Link>

        {/* Right side grid */}
        <div className="grid grid-rows-2 gap-4 h-full">
          {/* Top right — 1 card */}
          {rest[0] && (
            <Link href={`/products/${rest[0].id}`}
              className="relative bg-black rounded-lg overflow-hidden group">
              <Image
                src={rest[0].image}
                alt={rest[0].title}
                fill
                className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-5 left-5 text-white z-10">
                <h3 className="font-bold">{rest[0].title}</h3>
                <span className="inline-block mt-2 text-sm underline underline-offset-4 hover:text-red-400 transition-colors">
                  Shop Now →
                </span>
              </div>
            </Link>
          )}

          {/* Bottom right — 2 cards */}
          <div className="grid grid-cols-2 gap-4">
            {rest.slice(1, 3).map(product => (
              <Link key={product.id} href={`/products/${product.id}`}
                className="relative bg-black rounded-lg overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>
                  <span className="inline-block mt-1 text-xs underline underline-offset-2 hover:text-red-400 transition-colors">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </Wrapper>
  )
}

export default NewArrivals