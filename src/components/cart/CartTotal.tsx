"use client"
import { useCheckout } from "@/hooks/useCheckout"
import { ICartItem } from "@/interface"
import { cartSubTotal } from "@/utils"
import { useRouter } from "next/navigation"
import { FaArrowRight } from "react-icons/fa"
import toast from "react-hot-toast"
import Button from "../ui/button"

const CartTotal = ({ cart }: { cart: ICartItem[] }) => {
  const router = useRouter()
  const { handleCheckout, isCheckingOut } = useCheckout()

  const handleProceedToCheckout = () => {
    if (!cart.length) {
      toast.error("Your cart is empty")
      return
    }

    handleCheckout(undefined, {
      onSuccess: (res) => {
        const orderId = res.data.order.id
        toast.success("Order placed successfully")
        router.push(`/checkout/${orderId}`)
      },
      onError: (error: any) => {
        if (error?.message?.includes("401")) {
          toast.error("Please login to continue")
          router.push("/login")
          return
        }
        toast.error("Something went wrong while placing your order")
      },
    })
  }

  return (
    <div className="border border-solid border-gray-50 shadow-sm rounded-md p-4 max-w-xl w-80">
      <h3 className="font-semibold mb-3">Cart Total</h3>
      <ul className="space-y-3 mb-3 divide-y divide-gray-200 *:pb-2">
        <li className="flex justify-between text-sm">
          Subtotal:
          <span>
            {cartSubTotal(cart).toFixed(2)}
          </span>
        </li>
        <li className="flex justify-between text-sm">
          Shipping:
          <span className="text-green-600">
            Free
          </span>
        </li>
        <li className="flex justify-between text-sm">
          Total:
          <span className="text-red-600 font-semibold text-lg">
            {cartSubTotal(cart).toFixed(2)}
          </span>
        </li>
      </ul>
      <Button width="full" isLoading={isCheckingOut} onClick={handleProceedToCheckout}>
        Proceed to Checkout
        <FaArrowRight />
      </Button>
    </div>
  )
}

export default CartTotal
