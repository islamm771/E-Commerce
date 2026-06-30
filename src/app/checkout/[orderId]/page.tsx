"use client"
import ErrorHandler from "@/components/ErrorHandler"
import PathElement from "@/components/PathElement"
import { getOrder } from "@/services/order"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"

const CheckoutConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  })

  const order = data?.data.order

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-24 py-24 text-center">
        Loading order details...
      </div>
    )
  }

  if (error || !order) return <ErrorHandler />

  return (
    <div className="container mx-auto px-4 lg:px-24">
      <PathElement pathes="Cart / " indexPath="Order Confirmation" />

      <div className="max-w-2xl mx-auto text-center py-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Thank you for your order!</h2>
        <p className="text-gray-500">
          Your order <span className="font-medium text-black">#{order.id}</span> has been placed successfully.
        </p>
      </div>

      <div className="max-w-2xl mx-auto border border-gray-100 rounded-md shadow-sm p-6 mb-12">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Order Status</span>
          <span className="capitalize font-medium text-orange-500">{order.status}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Shipping Address</span>
          <span className="font-medium">{order.address}</span>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 mt-4 border-t border-gray-100 font-semibold">
          <span>Total</span>
          <span className="text-red-600">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 pb-12">
        <Link href="/products" className="text-sm px-5 py-2.5 rounded-md font-medium bg-red-500 text-white">
          Continue Shopping
        </Link>
        <Link href="/profile" className="text-sm px-5 py-2.5 rounded-md font-medium bg-white shadow-sm">
          View My Orders
        </Link>
      </div>
    </div>
  )
}

export default CheckoutConfirmationPage
