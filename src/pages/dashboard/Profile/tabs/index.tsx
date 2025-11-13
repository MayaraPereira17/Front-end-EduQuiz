import * as TabsRadix from "@radix-ui/react-tabs";
import { cn } from "../../../../utils/cn";
import { TabsTrigger } from "./trigger";
import { useState } from "react";
import { Overview } from "./overview";

export function Tabs() {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Função para prevenir mudança de aba se estiver desabilitada
  const handleValueChange = (value: string) => {
    if (value === "performance" || value === "recentActivities") {
      return; // Não permite mudar para abas desabilitadas
    }
    setSelectedTab(value);
  };
  
  return (
    <TabsRadix.Root value={selectedTab} onValueChange={handleValueChange}>
      <TabsRadix.List
        className={cn("self-start flex bg-[#D9D9D9] rounded-2xl sm:rounded-3xl md:rounded-4xl py-0.5 px-0.5 w-full sm:w-auto")}
        aria-label="Manage your account"
      >
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="performance" disabled className="opacity-50 cursor-not-allowed">
          Desempenho
        </TabsTrigger>
        <TabsTrigger value="recentActivities" disabled className="opacity-50 cursor-not-allowed">
          Atividades Recentes
        </TabsTrigger>
      </TabsRadix.List>
      <div className="pt-4 sm:pt-6 md:pt-8">
        <TabsRadix.Content className="TabsContent" value="overview">
          <Overview />
        </TabsRadix.Content>
        <TabsRadix.Content className="TabsContent" value="performance">
          <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-11 py-6 sm:py-8 md:py-9 rounded-2xl sm:rounded-3xl md:rounded-4xl mb-8 sm:mb-12 md:mb-16 opacity-50">
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">
                Esta funcionalidade está temporariamente desabilitada.
              </p>
            </div>
          </div>
        </TabsRadix.Content>
        <TabsRadix.Content className="TabsContent" value="recentActivities">
          <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-11 py-6 sm:py-8 md:py-9 rounded-2xl sm:rounded-3xl md:rounded-4xl mb-8 sm:mb-12 md:mb-16 opacity-50">
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">
                Esta funcionalidade está temporariamente desabilitada.
              </p>
            </div>
          </div>
        </TabsRadix.Content>
      </div>
    </TabsRadix.Root>
  );
}
