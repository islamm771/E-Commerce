import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/authSchema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "../../../../generated/prisma/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: z.flattenError(parsed.error).fieldErrors,
                },
                { status: 422 }
            );
        }

        const { username, email, password } = parsed.data;

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
            select: {
                email: true,
                username: true,
            },
        });

        if (existingUser) {
            const errors: Record<string, string[]> = {};

            if (existingUser.email === email) {
                errors.email = ["Email already in use"];
            }

            if (existingUser.username === username) {
                errors.username = ["Username already in use"];
            }

            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors,
                },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName: "",
                lastName: "",
                gender: "",
                address: "",
                image: "",
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            {
                message: "Account created successfully",
                data: user,
            },
            { status: 201 }
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                {
                    message: "Email or username already exists",
                },
                { status: 409 }
            );
        }

        console.error(error);

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}