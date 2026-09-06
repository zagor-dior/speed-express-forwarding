import React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  hover = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && "glass-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
