import { ICartItem, } from "@/interface";
import { AddToCart, DeleteFromCart, getCart, UpdateCart } from "@/services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";




export const useCart = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isAuthenticated, // منعملش ريكويست خالص لو مفيش يوزر
  });

  const cart: ICartItem[] = data?.data.cart ?? []

  const { mutateAsync: handleAddToCart } = useMutation({
    mutationFn: AddToCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutateAsync: handleUpdateCart } = useMutation({
    mutationFn: UpdateCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutateAsync: handleDeleteFromCart } = useMutation({
    mutationFn: DeleteFromCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });


  return {
    // cartItems,
    // handleQuantityChange,
    // handleDeleteFromCart,
    cart,
    isLoading,


    handleAddToCart,
    handleUpdateCart,
    handleDeleteFromCart
  }
}