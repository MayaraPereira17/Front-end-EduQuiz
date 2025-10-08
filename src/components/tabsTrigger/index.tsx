import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Tabs.Trigger> {
  icon?: ReactNode;
}

export function TabsTrigger({
  className,
  icon,
  children,
  ...props
}: TabsTriggerProps) {
  return (
    <Tabs.Trigger
      className={cn(
        "px-5 py-3.5 text-sm font-medium cursor-pointer text-black hover:text-gray-600",
        "data-[state=active]:text-white data-[state=active]:bg-black data-[state=active]:rounded-2xl",
        className // caso queira adicionar algo extra
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </Tabs.Trigger>
  );
}
