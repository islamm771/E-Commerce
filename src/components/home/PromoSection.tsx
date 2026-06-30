import Link from "next/link"
import { FaShieldAlt } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import { MdSupportAgent } from "react-icons/md"
import { RiRefund2Line } from "react-icons/ri"

const features = [
  {
    icon: <FaTruckFast size={40} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <MdSupportAgent size={40} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
  {
    icon: <RiRefund2Line size={40} />,
    title: "EASY RETURNS",
    desc: "Return products hassle-free anytime",
  },
]

const PromoSection = () => {
  return (
    <section className="container mx-auto px-8 xl:px-24 py-16 mb-8">

      {/* Banner */}
      <div className="bg-black text-white rounded-xl px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
        <div>
          <p className="text-green-400 text-sm font-medium mb-2">Limited Time Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-sm">
            Up to <span className="text-red-500">50% OFF</span> on selected items
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xs">
            Shop the best deals before they&apos;re gone. New deals every day.
          </p>
        </div>
        <Link
          href="/products"
          className="shrink-0 bg-red-500 hover:bg-red-600 transition-colors text-white px-8 py-3.5 rounded-sm font-medium text-sm"
        >
          Shop Now →
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-3">
            <div className="bg-gray-100 rounded-full p-4 text-black">
              {icon}
            </div>
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-gray-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PromoSection