import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string("Username is required")
        .min(2, "Username must be at least 2 characters")
        .max(50, "Username is too long"),
    email: z
        .email("Invalid email address"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Password is too short")
})
