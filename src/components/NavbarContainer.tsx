"use client";

import { ILoggedUser } from "@/interface";
import { getCart } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import ErrorHandler from "./ErrorHandler";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import NavRightSection from "./NavRightSide";

interface IProps {
  userData: ILoggedUser | null;
}

const NavbarContainer = ({ userData }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    router.push(`/products/search?q=${searchQuery}`);
  };

  const { data, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!userData,
  });

  if (error) return <ErrorHandler />;

  const cart = data?.data.cart;

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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            userData={userData}
            cartCount={cart?.length || 0}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNav
        isMenuOpen={isMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        userData={userData}
        cartCount={cart?.length || 0}
      />
    </div>
  );
};

export default NavbarContainer;