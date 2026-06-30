import { ILoggedUser } from "@/interface"
import NavLinks from "./NavLinks"
import NavRightSection from "./NavRightSide"

interface IProps {
  isMenuOpen: boolean,
  userData: ILoggedUser | null,
  // searchQuery: string,
  // setSearchQuery: (val: string) => void,
  // handleSearch: (e: SubmitEvent<HTMLFormElement>) => void,
  cartCount: number,
}


const MobileNav = ({ isMenuOpen, userData, cartCount }: IProps) => {
  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="flex flex-col gap-4 pb-4">
        <NavLinks userData={userData} />

        <NavRightSection
          userData={userData}
          cartCount={cartCount}
        />
      </div>
    </div>
  )
}

export default MobileNav