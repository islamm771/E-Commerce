import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
    "text-sm px-5 py-2.5 flex items-center justify-center gap-2 rounded-md font-medium capitalize cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary: "bg-red-500 text-white",
                secondary:
                    "bg-white shadow-sm",
            },
            width: {
                fit: "w-fit",
                full: "w-full",
            },
            centered: {
                true: "mx-auto",
            },
        },
        defaultVariants: {
            variant: "primary",
            width: "fit",
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

export default function Button({
    className,
    variant,
    width,
    centered,
    isLoading,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                buttonVariants({
                    variant,
                    width,
                    centered,
                }),
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                    />
                    <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}

            {children}
        </button>
    );
}

export { buttonVariants };

