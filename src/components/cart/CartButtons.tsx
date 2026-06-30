"use client"

import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import Button from '../ui/button'

const CartButtons = ({ handleUpdateCart }: { handleUpdateCart: () => void }) => {
  const router = useRouter()

  // const { handleUpdateCart } = useCart()

  // const handleClick = async () => {
  //   await handleUpdateCart({
  //     cart: cart.map(({ id, quantity }) => ({
  //       id,
  //       quantity,
  //     })),
  //   });
  // };
  return (
    <div className="flex items-start justify-between mt-10 md:mt-8">
      <Button onClick={() => router.push("/")}>
        <FaArrowLeft />
        Return to shop
      </Button>
      <Button variant="secondary"
        onClick={handleUpdateCart}
      >
        <MdOpenInNew />
        Update cart
      </Button>
    </div>
  )
}

export default CartButtons