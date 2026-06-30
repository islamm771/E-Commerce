import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

// GET /api/orders — جلب كل الطلبات الخاصة بالمستخدم الحالي
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const userId = Number(session.user.id);

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    { message: "Orders fetched successfully", data: { orders } },
    { status: 200 }
  );
};
