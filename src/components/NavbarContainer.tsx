"use client";

import { useCart } from "@/hooks/useCart";
import { ILoggedUser } from "@/interface";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import NavRightSection from "./NavRightSide";

interface IProps {
  userData: ILoggedUser | null;
}

const NavbarContainer = ({ userData }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useCart();


  return (
    <div className="container mx-auto px-6 xl:px-24">
      {/* Top bar */}
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          E-Commerce
        </Link>

        {/* Mobile button */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-20">
          <NavLinks userData={userData} />
          <NavRightSection
            userData={userData}
            cartCount={cart?.length || 0}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNav
        isMenuOpen={isMenuOpen}
        userData={userData}
        cartCount={cart?.length || 0}
      />
    </div>
  );
};

export default NavbarContainer;