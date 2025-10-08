import * as TabsRadix from "@radix-ui/react-tabs";
import { cn } from "../../../../utils/cn";
import { TabsTrigger } from "./trigger";

export function Tabs() {
  return (
    <TabsRadix.Root>
      <TabsRadix.List
        className={cn("self-start flex bg-[#D9D9D9] rounded-4xl py-0.5 px-0.5")}
        aria-label="Manage your account"
      >
        <TabsTrigger value="tab1">Visão Geral</TabsTrigger>
        <TabsTrigger value="tab2">Desempenho</TabsTrigger>
        <TabsTrigger value="tab3">Atividades Recentes</TabsTrigger>
      </TabsRadix.List>

      <TabsRadix.Content className="TabsContent" value="tab1">
        aq1
      </TabsRadix.Content>
      <TabsRadix.Content className="TabsContent" value="tab2">
        aq2
      </TabsRadix.Content>
      <TabsRadix.Content className="TabsContent" value="tab3">
        aq3
      </TabsRadix.Content>
    </TabsRadix.Root>
  );
}
