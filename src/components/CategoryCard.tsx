import { ICategory } from "@/interface";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import {
  CiMobile4,
  CiMonitor,
} from "react-icons/ci";
import {
  FaClock,
  FaGamepad,
  FaHeadphones,
  FaKeyboard,
  FaLaptop,
  FaTshirt,
} from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  Electronics: <CiMobile4 size={30} />,
  Computers: <FaLaptop size={30} />,
  Audio: <FaHeadphones size={30} />,
  Fashion: <FaTshirt size={30} />,
  Gaming: <FaGamepad size={30} />,
  Wearables: <FaClock size={30} />,
  Accessories: <FaKeyboard size={30} />,
  Monitors: <CiMonitor size={30} />,
};

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link href={`/products?category=${category.slug}`} className="border border-solid border-gray-300 rounded-lg p-5 flex flex-col items-center text-xl cursor-pointer transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white">
      {iconMap[category.name] || <BiSolidCategory size={30} />}
      <h3 className="text-xl mt-2">{category.name}</h3>
    </Link>
  )
}

export default CategoryCard