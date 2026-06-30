import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

// GET /api/orders/[orderId] — جلب تفاصيل طلب واحد بشرط إنه يخص نفس المستخدم
export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const userId = Number(session.user.id);
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: { items: true },
  });

  if (!order || order.userId !== userId) {
    return NextResponse.json({ message: "Order not found", data: {} }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Order fetched successfully", data: { order } },
    { status: 200 }
  );
};
