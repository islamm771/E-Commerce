"use client";

import { ILoggedUser, IProduct } from "@/interface";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "@/services/favourite";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const useFav = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = (session?.user as ILoggedUser) || null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
    enabled: !!user,
  });

  const products: IProduct[] = data?.data.products ?? [];

  const { mutateAsync: handleAddToFav, isPending: isAdding } = useMutation({
    mutationFn: addToFavourites,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  const { mutateAsync: handleRemoveFav, isPending: isRemoving } =
    useMutation({
      mutationFn: removeFromFavourites,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["favourites"],
        });
      },
    });

  const { mutateAsync: handleRemoveAllFav, isPending: isClearing } =
    useMutation({
      mutationFn: async () => {
        await Promise.all(
          products.map((product) => removeFromFavourites(product.id))
        );
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["favourites"],
        });

        toast.success("Favourites cleared");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  const isFavourite = (id: string) => {
    return products.some((product) => product.id === (Number(id)));
  };

  return {
    products,
    isLoading,
    error,

    isFavourite,

    handleAddToFav,
    handleRemoveFav,
    handleRemoveAllFav,

    isAdding,
    isRemoving,
    isClearing,
  };
};