"use client"

import { getFavourites } from "@/services/favourite";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// بترجع قائمة المفضلة بتاعة اليوزر الحالي بس لو فيه session فعلاً،
// لو مفيش يوزر مسجل دخول منعملش أي query للداتابيز
export const getUserFavourites = async () => {
  const { data: session } = useSession();
  if (!session?.user?.id) return [];

  // const favs = await prisma.favorite.findMany({
  //   where: { userId: Number(session.user.id) },
  //   select: { productId: true },
  // });


  const { data, isLoading, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  })

  const products = data?.data.products ?? []

  return products.map((f) => ({ id: f.id }));
};
