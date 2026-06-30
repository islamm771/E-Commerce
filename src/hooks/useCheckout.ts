import { checkout } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: handleCheckout, isPending: isCheckingOut } = useMutation({
    mutationFn: checkout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { handleCheckout, isCheckingOut };
};
