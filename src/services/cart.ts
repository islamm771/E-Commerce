import { ICartItem, ICartResponse } from "@/interface";
import { fetcher, mutation } from "./api";

export const getCart = () => fetcher<ICartResponse>("/cart")

export const AddToCart = ({ id, quantity }: { id: number, quantity?: number }) => mutation("/cart", {
  method: "POST",
  body: JSON.stringify({ id, quantity: quantity ?? 1 })
})

export const UpdateCart = (cart: Pick<ICartItem, "id" | "quantity">[]) => mutation("/cart", {
  method: "PATCH",
  body: JSON.stringify({ cart })
})

export const DeleteFromCart = (id: number) => mutation("/cart", {
  method: "DELETE",
  body: JSON.stringify({ id })
})