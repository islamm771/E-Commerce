import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

// POST /api/checkout — يحول السلة الحالية للمستخدم إلى أوردر ويفضي السلة
export const POST = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const userId = Number(session.user.id);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ message: "User not found", data: {} }, { status: 404 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { message: "Cart is empty", data: {} },
      { status: 400 }
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        total,
        address: user.address,
        status: "pending",
        items: {
          create: cart.items.map((item) => ({
            productId: item.product.id,
            title: item.product.title,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // إفراغ السلة بعد إتمام الطلب
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return createdOrder;
  });

  return NextResponse.json(
    { message: "Order placed successfully", data: { order } },
    { status: 201 }
  );
};
