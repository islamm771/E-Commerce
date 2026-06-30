import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = () =>
  NextResponse.json({ message: "Unauthorized", data: {} }, { status: 401 });

// GET /api/profile — جلب بيانات الـ user الحالي
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      address: true,
      gender: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found", data: {} }, { status: 404 });
  }

  return NextResponse.json({ message: "Profile fetched successfully", data: { user } }, { status: 200 });
};

// PATCH /api/profile — تعديل بيانات الـ user
export const PATCH = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return unauthorizedResponse();

  try {
    const { firstName, lastName, address, currentPassword, newPassword, confirmPassword } =
      await req.json();

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "User not found", data: {} }, { status: 404 });
    }

    // لو بيحاول يغير الـ password
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          { message: "All password fields are required", data: {} },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { message: "Validation failed", errors: { currentPassword: ["Current password is incorrect"] } },
          { status: 422 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Validation failed", errors: { confirmPassword: ["Passwords do not match"] } },
          { status: 422 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { message: "Validation failed", errors: { newPassword: ["Password must be at least 8 characters"] } },
          { status: 422 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
          address: address ?? user.address,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          gender: true,
          image: true,
        },
      });

      return NextResponse.json(
        { message: "Profile updated successfully", data: { user: updatedUser } },
        { status: 200 }
      );
    }

    // تعديل البيانات بدون تغيير الـ password
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName ?? user.firstName,
        lastName: lastName ?? user.lastName,
        address: address ?? user.address,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        gender: true,
        image: true,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", data: { user: updatedUser } },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "Invalid request body", data: {} }, { status: 400 });
  }
};