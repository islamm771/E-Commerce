import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

// GET /api/favourites — جلب كل المفضلة
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const userId = Number(session.user.id);

  const favourites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      product: {
        include: { thumbnails: true },
      },
    },
  });

  const products = favourites.map((fav) => fav.product);

  return NextResponse.json(
    { message: "Favourites fetched successfully", data: { products } },
    { status: 200 }
  );
};

// POST /api/favourites — إضافة منتج للمفضلة
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  try {
    const { id } = await req.json();
    const userId = Number(session.user.id);

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", data: {} },
        { status: 404 }
      );
    }

    const existing = await prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId: id } },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Product already in favourites", data: {} },
        { status: 409 }
      );
    }

    await prisma.favorite.create({ data: { userId, productId: id } });

    return NextResponse.json(
      { message: "Product added to favourites", data: {} },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", data: {} },
      { status: 400 }
    );
  }
};

// DELETE /api/favourites — حذف منتج من المفضلة
export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  try {
    const { id } = await req.json();
    const userId = Number(session.user.id);

    const favourite = await prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId: id } },
    });

    if (!favourite) {
      return NextResponse.json(
        { message: "Product not found in favourites", data: {} },
        { status: 404 }
      );
    }

    await prisma.favorite.delete({
      where: { userId_productId: { userId, productId: id } },
    });

    return NextResponse.json(
      { message: "Product removed from favourites", data: {} },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", data: {} },
      { status: 400 }
    );
  }
};