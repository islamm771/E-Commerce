"use client"
import ErrorHandler from "@/components/ErrorHandler"
import PathElement from "@/components/PathElement"
import OrdersList from "@/components/profile/OrdersList"
import ProfileForm from "@/components/profile/ProfileForm"
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton"
import { getProfile } from "@/services/profile"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

type ActiveTab = "profile" | "orders"

const Profile = () => {
    const [showAside, setShowAside] = useState(false)
    const [activeTab, setActiveTab] = useState<ActiveTab>("profile")

    const { data, isLoading, error } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    const user = data?.data.user

    if (isLoading) return <ProfileSkeleton />

    if (error) return <ErrorHandler />;

    return (
        <div className="container mx-auto px-8 xl:px-24 pb-12">
            <div className="flex items-center justify-between">
                <PathElement indexPath="My Account" />
                <p className="text-sm">
                    Welcome! <span className="text-red-500 capitalize font-medium">{user?.username}</span>
                </p>
            </div>

            <div className="grid grid-cols-12 gap-4 relative mt-8">

                {/* Overlay لما الـ aside يتفتح على mobile */}
                {showAside && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setShowAside(false)}
                    />
                )}

                {/* Aside */}
                <aside className={`
            fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 shadow-xl transition-transform duration-300
            lg:static lg:h-auto lg:w-auto lg:shadow-md lg:rounded-md lg:p-5
            lg:col-span-3 lg:translate-x-0
            ${showAside ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
                    <button className="block lg:hidden mb-5 text-gray-500 hover:text-black"
                        onClick={() => setShowAside(false)}>
                        <FaTimes size={22} />
                    </button>

                    <ul className="space-y-6">
                        <li>
                            <h3 className="mb-3 font-medium">Manage My Account</h3>
                            <ul className="text-sm text-gray-500 pl-5 space-y-2">
                                <li
                                    className={`cursor-pointer ${activeTab === "profile" ? "text-red-500" : "hover:text-gray-800"}`}
                                    onClick={() => { setActiveTab("profile"); setShowAside(false) }}
                                >
                                    My Profile
                                </li>
                                <li className="hover:text-gray-800 cursor-pointer">Address Book</li>
                                <li className="hover:text-gray-800 cursor-pointer">My Payment Options</li>
                            </ul>
                        </li>
                        <li>
                            <h3
                                className={`mb-3 font-medium cursor-pointer ${activeTab === "orders" ? "text-red-500" : "hover:text-gray-600"}`}
                                onClick={() => { setActiveTab("orders"); setShowAside(false) }}
                            >
                                My Orders
                            </h3>
                            <ul className="text-sm text-gray-500 pl-5 space-y-2">
                                <li className="hover:text-gray-800 cursor-pointer">My Returns</li>
                                <li className="hover:text-gray-800 cursor-pointer">My Cancellations</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="mb-3 font-medium cursor-pointer hover:text-gray-600">My WishList</h3>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-9 p-5 lg:p-8 shadow-md rounded-md">
                    <div className="flex items-center gap-3 mb-4">
                        <button className="block lg:hidden text-gray-600" onClick={() => setShowAside(true)}>
                            <FaBars size={22} />
                        </button>
                        <h3 className="text-red-500 font-medium">
                            {activeTab === "profile" ? "Edit Your Profile" : "My Orders"}
                        </h3>
                    </div>

                    {activeTab === "profile" ? <ProfileForm user={user} /> : <OrdersList />}
                </div>

            </div>
        </div>
    )
}

export default Profile
