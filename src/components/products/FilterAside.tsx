"use client"
import { brands as brandList, categories as categoriesList } from '@/data'
import { ICategory } from '@/interface'
import { FaTimes } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'

interface FilterAsideProps {
  categories: string[];
  brands: string[];
  ratings: number[];
  price: number;
  setPrice: (value: number) => void;
  toggleCategory: (category: ICategory) => void;
  toggleBrand: (brand: ICategory) => void;
  toggleRating: (rating: number) => void;
  setOpen?: (val: boolean) => void;
}


const FilterAside = ({
  categories = [],
  brands = [],
  ratings = [],
  price = 0,
  setPrice,
  toggleCategory,
  toggleBrand,
  toggleRating,
  setOpen
}: FilterAsideProps) => {
  const handleClose = () => {
    setOpen?.(false);
  };

  return (
    <div className="bg-gray-100 p-3 rounded-lg space-y-5 *:pb-5 [&>*:last-child]:pb-0 divide-y divide-gray-300 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold text-red-600">
          Filter
        </h3>
        <button className='block xl:hidden cursor-pointer hover:text-red-600 outline-0' onClick={handleClose}>
          <FaTimes />
        </button>
      </div>
      <section className='categories'>
        <h4 className="text-xl font-semibold mb-2">Categories</h4>
        <ul className='space-y-2'>
          {categoriesList.map(category => (
            <li key={category.id}>
              <label htmlFor={category.name} className="flex gap-2 cursor-pointer">
                <input
                  id={category.name}
                  type="checkbox"
                  checked={categories.includes(category.name.toLowerCase())}
                  onChange={() => toggleCategory(category)}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="price">
        <h4 className="text-xl font-semibold mb-2">Price</h4>
        <div className="px-1 py-2">
          <input
            type="range"
            id="price-range"
            min="0"
            max="5000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>${price}</span>
            <span id="range-val" className="font-bold text-red-500">$5000</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input type="number" id="price-min" placeholder="Min" className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 text-xs text-center text-gray-700 focus:outline-none focus:border-red-500" />
          <span className="text-gray-500">-</span>
          <input type="number" id="price-max" placeholder="Max" className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 text-xs text-center text-gray-700 focus:outline-none focus:border-red-500" />
        </div>
      </section>

      <section className='brands'>
        <h4 className="text-xl font-semibold mb-2">Brands</h4>
        <ul className='space-y-2'>
          {brandList.map(brand => (
            <li key={brand.id}>
              <label htmlFor={brand.name} className="flex gap-2 cursor-pointer">
                <input
                  id={brand.name}
                  type="checkbox"
                  checked={brands.includes(brand.name.toLowerCase())}
                  onChange={() => toggleBrand(brand)}
                />
                {brand.name}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className='ratings'>
        <h4 className="text-xl font-semibold mb-2">Ratings</h4>
        <ul className='space-y-2'>
          {[5, 4, 3].map((rating) => (
            <li key={rating}>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ratings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                />

                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={idx < rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default FilterAside