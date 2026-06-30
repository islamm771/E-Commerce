import { IOrderResponse, IOrdersResponse } from "@/interface";
import { fetcher, mutation } from "./api";

export const checkout = () =>
  mutation<IOrderResponse>("/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

export const getOrders = () => fetcher<IOrdersResponse>("/orders");

export const getOrder = (orderId: number | string) =>
  fetcher<IOrderResponse>(`/orders/${orderId}`);
