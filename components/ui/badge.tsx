import React from "react";
import { cn } from "@/lib/utils";
import { ShipmentStatus } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: ShipmentStatus | string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export function Badge({ className, status, variant, children, ...props }: BadgeProps) {
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";

  if (status) {
    switch (status) {
      case "Delivered":
        badgeStyle = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        break;
      case "In Transit":
        badgeStyle = "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
        break;
      case "Out for Delivery":
        badgeStyle = "bg-indigo-500/15 text-indigo-400 border-indigo-500/30";
        break;
      case "Pending":
        badgeStyle = "bg-amber-500/15 text-amber-400 border-amber-500/30";
        break;
      case "On Hold":
        badgeStyle = "bg-rose-500/15 text-rose-400 border-rose-500/30";
        break;
      case "Cancelled":
        badgeStyle = "bg-slate-500/15 text-slate-400 border-slate-500/30";
        break;
    }
  } else if (variant) {
    const variantStyles = {
      default: "bg-slate-800 text-slate-300 border-slate-700",
      success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
      info: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    };
    badgeStyle = variantStyles[variant];
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md",
        badgeStyle,
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {children || status}
    </div>
  );
}
