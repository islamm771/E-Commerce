import { ILoggedUser } from "@/interface";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import NavbarDropDown from "./NavbarDropDown";
import Search from "./Search";


interface IProps {
  // searchQuery: string,
  // setSearchQuery: (val: string) => void,
  // handleSearch: (e: SubmitEvent<HTMLFormElement>) => void,
  userData: ILoggedUser | null,
  cartCount: number,
}

const NavRightSection = ({
  // searchQuery,
  // setSearchQuery,
  // handleSearch,
  userData,
  cartCount,
}: IProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">

      {/* Search */}
      <Search />

      {/* User actions */}
      {userData && (
        <div className="flex items-center gap-4">
          <Link href="/favourite">
            <FaRegHeart />
          </Link>

          <Link href="/cart" className="relative">
            <RiShoppingCart2Line size={18} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </Link>

          <NavbarDropDown user={userData} />
        </div>
      )}
    </div>
  );
};

export default NavRightSection;