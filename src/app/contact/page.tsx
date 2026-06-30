import PathElement from "@/components/PathElement"
import Button from "@/components/ui/button"
import { FiPhone } from "react-icons/fi"
import { MdOutlineEmail } from "react-icons/md"

const page = () => {
  const inputClass = "block rounded-sm bg-neutral-100 p-2 border-none text-md w-full mt-1 focus:outline-none";

  return (
    <div className="container mx-auto px-8 xl:px-24 pb-16">
      <PathElement indexPath="contact" />

      {/* Section Header — نفس نمط المشروع */}
      <div className="mb-10">
        <h5 className="text-sm font-semibold relative pl-6 text-red-600
          before:content-[''] before:absolute before:-top-1 before:left-0
          before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
          Got Questions?
        </h5>
        <h2 className="text-2xl font-semibold mt-4">Get In Touch With Us</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* Contact Info Cards */}
        <div className="flex flex-col gap-5">

          {/* Phone */}
          <div className="border border-gray-100 shadow-sm rounded-md p-6 flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full p-3 shrink-0">
              <FiPhone size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Call To Us</h3>
              <p className="text-gray-500 text-sm mb-1">We are available 24/7, 7 days a week.</p>
              <p className="text-sm font-medium">Phone: +88015-88888-9999</p>
            </div>
          </div>

          {/* Email */}
          <div className="border border-gray-100 shadow-sm rounded-md p-6 flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full p-3 shrink-0">
              <MdOutlineEmail size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Write To Us</h3>
              <p className="text-gray-500 text-sm mb-2">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm font-medium">support@exclusive.com</p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 border border-gray-100 shadow-sm rounded-md p-8">
          <form className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="username">Username</label>
                <input className={inputClass} type="text" id="username"
                  name="username" placeholder="Your Username" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input className={inputClass} type="email" id="email"
                  name="email" placeholder="Your Email" />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input className={inputClass} type="tel" id="phone"
                  name="phone" placeholder="Your Phone" />
              </div>
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea className={`${inputClass} resize-none`} id="message"
                name="message" placeholder="Write your message..." rows={7} />
            </div>

            <div className="flex justify-end">
              <Button>Send Message</Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default page