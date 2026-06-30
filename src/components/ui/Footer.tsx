import { AiOutlineSend } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri";


const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-8 xl:px-24 py-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
          <p className="mb-4">Subscribe</p>
          <p className="text-sm font-light">Get 10% off your first order</p>
          <div className="relative mt-2.5 border border-white rounded-md">
            <input className="w-full bg-transparent text-sm rounded-sm pr-9 py-2 pl-2" type="email" placeholder="Enter your email" />
            <AiOutlineSend className="absolute top-2 right-1.5" size={20} />
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3">
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">exclusive@gmail.com</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">+88015-88888-9999</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-3">
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">My Account</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Login / Register</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Cart</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Wishlist</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Shop</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-3">
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Privacy Policy</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Terms Of Use</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">FAQ</li>
            <li className="text-gray-300 text-sm hover:text-gray-500 cursor-pointer">Contact</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4">Download App</h3>
          <p className="text-gray-300 text-xs mb-4">Save $3 with App New User Only</p>
          <ul className="flex items-center gap-4">
            <li className="hover:text-gray-500 cursor-pointer"><RiFacebookLine size={25} /></li>
            <li className="hover:text-gray-500 cursor-pointer"><CiTwitter size={27} /></li>
            <li className="hover:text-gray-500 cursor-pointer"><IoLogoInstagram size={25} /></li>
            <li className="hover:text-gray-500 cursor-pointer"><RiLinkedinLine size={25} /></li>
          </ul>
        </section>
      </div>
      <h3 className="text-center text-gray-700 pb-3"> <FaRegCopyright className="inline" /> Copyright Rimel 2022. All right reserved</h3>
    </footer>
  )
}

export default Footer