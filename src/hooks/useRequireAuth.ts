"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRequireAuth = () => {
    const router = useRouter();
    const { status } = useSession();

    return () => {
        if (status === "authenticated") return true;

        toast.error("Please login to continue");
        router.push("/login");

        return false;
    };
};