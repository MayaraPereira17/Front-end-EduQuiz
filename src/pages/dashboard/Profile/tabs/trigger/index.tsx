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
  ...props
}: TabsTriggerProps) {
  return (
    <TabsRadix.Trigger
      className={cn(
        "py-2 text-sm font-medium cursor-pointer text-black",
        "data-[state=active]:bg-white data-[state=active]:rounded-4xl flex-1",
        className // caso queira adicionar algo extra
      )}
      {...props}
    >
      {children}
    </TabsRadix.Trigger>
  );
}
