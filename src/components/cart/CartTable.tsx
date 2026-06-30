"use client"
import { ICartItem } from '@/interface'
import Image from 'next/image'
import { FaTrashAlt } from 'react-icons/fa'
import Table from '../ui/table'

interface IProps {
  cart: ICartItem[],
  handleQuantityChange: (id: number, value: number) => void
  handleDeleteFromCart: (id: number) => void
}


const CartTable = ({ cart, handleQuantityChange, handleDeleteFromCart }: IProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Product</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Subtotal</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cart.map((item: ICartItem) => (
            <Table.Row className="overflow-x-scroll" key={item.id}>
              <Table.Cell>
                <div className="whitespace-nowrap flex gap-2 items-center font-medium">
                  <Image src={item.image || "/imgs/product-image.png"} alt={item.title} className="w-8 h-8" width={32} height={32} />
                  {item.title}
                </div>
              </Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              <Table.Cell>
                <input
                  className="rounded-sm py-1 pr-0 pl-2 w-20 border border-gray-200"
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
              </Table.Cell>
              <Table.Cell>
                ${item.price * item.quantity}
              </Table.Cell>
              <Table.Cell>
                <button className="text-red-500" onClick={() => handleDeleteFromCart(item.id)}>
                  <FaTrashAlt size={20} />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CartTable