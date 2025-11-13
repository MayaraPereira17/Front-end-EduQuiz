import * as TabsRadix from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
import { cn } from "../../../../../utils/cn";

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsRadix.Trigger> {
  icon?: ReactNode;
}

export function TabsTrigger({
  className,
  icon,
  children,
  disabled,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsRadix.Trigger
      disabled={disabled}
      className={cn(
        "py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium text-black flex-1",
        !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        "data-[state=active]:bg-white data-[state=active]:rounded-2xl sm:data-[state=active]:rounded-3xl md:data-[state=active]:rounded-4xl",
        disabled && "data-[state=active]:opacity-50",
        className // caso queira adicionar algo extra
      )}
      {...props}
    >
      {children}
    </TabsRadix.Trigger>
  );
}
