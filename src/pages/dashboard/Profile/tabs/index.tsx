import * as TabsRadix from "@radix-ui/react-tabs";
import { cn } from "../../../../utils/cn";
import { TabsTrigger } from "./trigger";
import { useState } from "react";
import { Overview } from "./overview";
import { RecentActivities } from "./recentActivities";
import { Performance } from "./performance";

export function Tabs() {
  const [selectedTab, setSelectedTab] = useState("overview");
  return (
    <TabsRadix.Root value={selectedTab} onValueChange={setSelectedTab}>
      <TabsRadix.List
        className={cn("self-start flex bg-[#D9D9D9] rounded-4xl py-0.5 px-0.5")}
        aria-label="Manage your account"
      >
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="performance">Desempenho</TabsTrigger>
        <TabsTrigger value="recentActivities">Atividades Recentes</TabsTrigger>
      </TabsRadix.List>
      <div className="pt-8">
        <TabsRadix.Content className="TabsContent" value="overview">
          <Overview />
        </TabsRadix.Content>
        <TabsRadix.Content className="TabsContent" value="performance">
          <Performance />
        </TabsRadix.Content>
        <TabsRadix.Content className="TabsContent" value="recentActivities">
          <RecentActivities />
        </TabsRadix.Content>
      </div>
    </TabsRadix.Root>
  );
}
