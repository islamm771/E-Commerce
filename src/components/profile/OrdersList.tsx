"use client"
import ErrorHandler from "@/components/ErrorHandler"
import { getOrders } from "@/services/order"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { FaBoxOpen } from "react-icons/fa"

const statusColor: Record<string, string> = {
  pending: "text-orange-500",
  shipped: "text-blue-500",
  delivered: "text-green-600",
  cancelled: "text-red-500",
}

const OrdersList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  const orders = data?.data.orders ?? []

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading your orders...</p>
  }

  if (error) return <ErrorHandler />

  if (!orders.length) {
    return (
      <div className="text-center py-12">
        <FaBoxOpen className="text-gray-300 text-5xl mx-auto mb-3" />
        <p className="text-gray-500">You haven't placed any orders yet.</p>
        <Link href="/products" className="text-red-500 text-sm font-medium mt-2 inline-block">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border border-gray-100 rounded-md shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`text-sm font-medium capitalize ${statusColor[order.status] ?? "text-gray-500"}`}>
              {order.status}
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3 mt-2 border-t border-gray-100 text-sm font-semibold">
            <span>Total</span>
            <span className="text-red-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersList
