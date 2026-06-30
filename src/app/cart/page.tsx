"use client"
import CartButtons from "@/components/cart/CartButtons";
import CartTable from "@/components/cart/CartTable";
import CartTotal from "@/components/cart/CartTotal";
import PathElement from "@/components/PathElement";
import CartSkeleton from "@/components/Skeletons/CartSkeleton";
import Button from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/interface";
import { useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  // const { status } = useSession();
  // const isAuthenticated = status === "authenticated";

  const { handleUpdateCart, handleDeleteFromCart, cart, isLoading } = useCart()

  const [userCart, setUserCart] = useState<ICartItem[]>(cart.length ? cart : [])

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setUserCart(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    )
  };

  const handleDeleteItemFromCart = (productId: number) => {
    console.log("Deleting", productId)
    handleDeleteFromCart(productId, {
      onSuccess: () => {
        setUserCart(prev => prev.filter(item => item.id !== productId))
        toast.success(`Producted is removed successfully`)
      },
      onError: () => toast.error(`Error during removing item`)
    })

  }

  const handleUpdateCartButton = async () => {
    const cart: Pick<ICartItem, "id" | "quantity">[] = userCart.map(item => ({ id: item.id, quantity: item.quantity }))
    handleUpdateCart(cart, {
      onSuccess: () => toast.success(`Cart is updated successfully`),
      onError: () => toast.error(`Error during updating cart`)
    })
  }

  if (isLoading) return <CartSkeleton />


  return (
    <div className="container mx-auto px-4 lg:px-24">
      <PathElement indexPath={"Cart"} />
      {userCart.length > 0 ? (
        <>
          <CartTable cart={userCart} handleDeleteFromCart={handleDeleteItemFromCart} handleQuantityChange={handleQuantityChange} />
          <CartButtons handleUpdateCart={handleUpdateCartButton} />
          <div className="flex items-start justify-between flex-wrap gap-y-5 py-8">
            <div className="flex gap-1">
              <input className="w-52 md:w-64 rounded-md border border-gray-100 shadow-sm px-4 py-2" type="text" placeholder="Coupon Code" />
              <Button width="fit">Apply Coupon</Button>
            </div>
            <CartTotal cart={cart} />
          </div>
        </>
      )
        : <div className="min-h-90 py-12">
          <h2 className="text-center text-2xl font-semibold mt-8">No products in cart</h2>
        </div>
      }
    </div >
  )
}

export default CartPage