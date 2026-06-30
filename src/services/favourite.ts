import { IProduct } from "@/interface";
import { fetcher, mutation } from "./api";

export interface IFavouritesResponse {
  message: string;
  data: {
    products: IProduct[];
  };
}

export const getFavourites = () =>
  fetcher<IFavouritesResponse>("/favourite");

export const addToFavourites = (id: number) =>
  mutation("/favourite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

export const removeFromFavourites = (id: number) =>
  mutation("/favourite", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });