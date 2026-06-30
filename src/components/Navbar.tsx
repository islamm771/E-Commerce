"use client";
import { useCart } from "@/hooks/useCart";
import { ILoggedUser } from "@/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import NavRightSection from "./NavRightSide";

const Navbar = () => {
    const { data: session } = useSession();
    const user = (session?.user as ILoggedUser) || null;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { cart } = useCart()


    return (
        <nav className="sticky top-0 z-30 bg-white border-b border-gray-200">
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
                        <NavLinks userData={user} />
                        <NavRightSection
                            userData={user}
                            cartCount={cart?.length || 0}
                        />
                    </div>
                </div>

                {/* Mobile menu */}
                <MobileNav
                    isMenuOpen={isMenuOpen}
                    userData={user}
                    cartCount={cart?.length || 0}
                />
            </div>
        </nav>
    );
};

export default Navbar;