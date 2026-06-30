import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mapCartItem } from "@/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const userId = Number(session.user.id);

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  const items = cart?.items.map((item) => mapCartItem(item)) ?? [];

  return NextResponse.json(
    { message: "Cart fetched successfully", data: { cart: items } },
    { status: 200 }
  );
};


export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorizedResponse();

    const userId = Number(session.user.id);
    const { id, quantity = 1 } = await req.json();

    if (quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity value", data: {} },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", data: {} },
        { status: 404 }
      );
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId: product.id },
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
        include: { product: true },
      });

      return NextResponse.json(
        { message: "Product quantity updated", data: { cart: mapCartItem(updatedItem) } },
        { status: 200 }
      );
    }

    const newItem = await prisma.cartItem.create({
      data: { cartId: cart.id, productId: product.id, quantity },
      include: { product: true },
    });

    return NextResponse.json(
      { message: "Product added to cart", data: { cart: mapCartItem(newItem) } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", data: {} },
      { status: 400 }
    );
  }
};


export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorizedResponse();

    const userId = Number(session.user.id);
    const { cart: updatedCart }: { cart: { id: number; quantity: number }[] } =
      await req.json();

    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found", data: {} },
        { status: 404 }
      );
    }

    for (const item of updatedCart) {
      const { id, quantity } = item;

      if (id == null || quantity == null) {
        return NextResponse.json(
          { message: "id and quantity are required", data: {} },
          { status: 400 }
        );
      }

      const cartItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: { cartId: cart.id, productId: id },
        },
      });

      if (!cartItem) {
        return NextResponse.json(
          { message: `Product with id ${id} is not in the cart`, data: {} },
          { status: 404 }
        );
      }

      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity },
      });
    }

    const updatedItems = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });

    return NextResponse.json(
      {
        message: "Cart updated successfully",
        data: { cart: updatedItems?.items.map((item) => mapCartItem(item)) ?? [] },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", data: {} },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorizedResponse();

    const userId = Number(session.user.id);
    const { id } = await req.json();

    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found", data: {} },
        { status: 404 }
      );
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId: id },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Product not found in cart", data: {} },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({ where: { id: cartItem.id } });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });

    return NextResponse.json(
      {
        message: "Product removed from cart",
        data: { cart: updatedCart?.items.map(mapCartItem) ?? [] },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", data: {} },
      { status: 400 }
    );
  }
};