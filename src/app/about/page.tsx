import FeatureCard from "@/components/about/FeatureCard"
import StatCard from "@/components/about/StatCard"
import TeamMember from "@/components/about/TeamMember"
import PathElement from "@/components/PathElement"
import Image from "next/image"
import { FaDollarSign, FaMoneyBillWave, FaShieldAlt, FaShoppingBag, FaStore } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import { MdSupportAgent } from "react-icons/md"

export const teamMembers: {
  id: number;
  name: string;
  role: string;
  image: string;
}[] = [
    { id: 1, name: "Tom Cruise", role: "Founder & CEO", image: "/imgs/member-1.jpg" },
    { id: 2, name: "Emma Watson", role: "Managing Director", image: "/imgs/member-2.jpg" },
    { id: 3, name: "Will Smith", role: "Product Designer", image: "/imgs/member-3.jpg" },
  ];

const page = () => {
  return (
    <div className="container px-8 xl:px-24 mx-auto">
      <PathElement indexPath="About" />

      {/* Our Story */}
      <section className="grid lg:grid-cols-2 gap-16 items-center py-16">
        <div>
          <h5 className="text-sm font-semibold relative pl-6 text-red-600 mb-6
            before:content-[''] before:absolute before:-top-1 before:left-0
            before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
            Our Story
          </h5>
          <h1 className="text-4xl font-semibold mb-6">
            Building the Future of Shopping
          </h1>
          <div className="space-y-4 text-gray-600 leading-8">
            <p>
              Launched in 2024, E-Commerce is your trusted destination for quality
              products and exceptional shopping experiences.
            </p>
            <p>
              We connect customers with premium brands and carefully selected
              products while providing fast delivery and reliable customer support.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/imgs/about-banner.jpg"
            alt="About us"
            width={600}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<FaStore />} value="10.5k" title="Sellers active on site" />
          <StatCard icon={<FaDollarSign />} value="33k" title="Monthly sales" />
          <StatCard icon={<FaShoppingBag />} value="45.5k" title="Customers active" />
          <StatCard icon={<FaMoneyBillWave />} value="25k" title="Annual gross sales" />
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <h5 className="text-sm font-semibold relative pl-6 text-red-600 mb-4
          before:content-[''] before:absolute before:-top-1 before:left-0
          before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
          Our Team
        </h5>
        <h2 className="text-2xl font-semibold mb-10">Meet The People Behind It</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember member={member} key={member.id} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h5 className="text-sm font-semibold relative pl-6 text-red-600 mb-4
          before:content-[''] before:absolute before:-top-1 before:left-0
          before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
          Why Choose Us
        </h5>
        <h2 className="text-2xl font-semibold mb-10">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaTruckFast />}
            title="FREE AND FAST DELIVERY"
            description="Free delivery for all orders over $140."
          />
          <FeatureCard
            icon={<MdSupportAgent />}
            title="24/7 CUSTOMER SERVICE"
            description="Friendly 24/7 customer support."
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            title="MONEY BACK GUARANTEE"
            description="30 days money back guarantee."
          />
        </div>
      </section>

    </div>
  )
}

export default page