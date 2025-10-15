import React from "react";
import { cn } from "../../utils/cn";

type BadgeVariant = "default" | "warning" | "error" | "success" | "info";
type IconPosition = "left" | "right";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  warning: "bg-[#FFF9B9] text-[#B55200]",
  error: "bg-[#FEC8C8] text-[#A80909]",
  success: "bg-[#AFFFAA] text-[#033B00]",
  info: "bg-[#DBEAFE] text-[#193CB8] text-xs",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  icon,
  iconPosition = "left",
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-normal rounded-md",
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="text-base">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="text-base">{icon}</span>
      )}
    </div>
  );
};
