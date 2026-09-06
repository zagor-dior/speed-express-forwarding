import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white hover:brightness-110 shadow-lg shadow-[#00B4D8]/20",
      secondary:
        "bg-[#1C2541] text-white hover:bg-[#253259] border border-white/10",
      accent:
        "bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white hover:brightness-110 shadow-lg shadow-[#FF6B35]/25",
      outline:
        "border border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10",
      ghost: "text-slate-300 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
