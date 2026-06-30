import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ILoggedUser } from "../interface";

interface IProps {
    user: ILoggedUser | null
}





const NavbarDropDown = ({ user }: IProps) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const onLogout = () => {
        signOut({ callbackUrl: "/" })
        toast.success(`Logout successful`, {
            position: "top-right",
            duration: 1000
        });
    }

    const handleOutsideClickDrop = (e: MouseEvent) => {
        // Check if the click target is outside the dropdown element
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setDropdownOpen(false); // Close the dropdown
        }
    };


    useEffect(() => {
        // Add the mousedown event listener
        document.addEventListener("mousedown", handleOutsideClickDrop);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClickDrop);
        };
    }, []);


    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className={`flex text-sm bg-gray-800 rounded-full cursor-pointer transition-all duration-300 ${isDropdownOpen ? "ring-4 ring-gray-300" : ""}`}
                aria-expanded="false"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <Image className="w-8 h-8 rounded-full" src="/imgs/avatar.jpg"
                    width={20} height={50} alt="user photo" />
            </button>
            {isDropdownOpen && (
                <div className={`absolute ${location.pathname.includes("dashboard") ? "right-0" : "left-0 lg:left-auto lg:right-0"} z-50 mt-2 w-48 py-2 bg-white rounded shadow-lg`}>
                    <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 capitalize">{user?.username}</p>
                        <p className="text-sm font-medium text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <ul className="py-1">
                        <li><Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link></li>
                        <li><Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link></li>
                        <li><Link href="/earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</Link></li>
                        <li><button className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={onLogout}>Sign out</button></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NavbarDropDown