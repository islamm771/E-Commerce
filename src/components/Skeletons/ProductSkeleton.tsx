
const ProductSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-lg">
            <div className='relative'>
                <div className="w-full h-64 object-cover bg-gray-200"></div>

                <ul className='space-y-1 absolute top-1 right-1'>
                    <li className='bg-white w-6 h-6 rounded-full'></li>
                    <li className='bg-white w-6 h-6 rounded-full'></li>
                </ul>
            </div>
            <div className="p-5 space-y-3">
                <div className="w-1/4 h-4 rounded-sm bg-gray-200"></div>
                <div className="w-3/4 h-4 rounded-sm bg-gray-200"></div>
                <div className="w-full h-8 rounded-sm bg-gray-200"></div>
                <div className="w-1/4 h-4 rounded-sm bg-gray-200"></div>
                <span className={"flex gap-1"}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div className="w-4 h-4 rounded-sm bg-gray-200" key={idx}></div>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default ProductSkeleton