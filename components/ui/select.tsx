import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "glass-input w-full rounded-xl py-3 px-4 text-sm transition-all duration-200 cursor-pointer bg-[#0B132B] text-white",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1C2541] text-white">
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
