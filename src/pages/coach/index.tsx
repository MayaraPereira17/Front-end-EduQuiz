import * as Tabs from "@radix-ui/react-tabs";

import { Header } from "../../components/header";
import { TabsTrigger } from "../../components/tabsTrigger";

import { useState } from "react";
import { Home } from "./tabs/home";

export function Coach() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col h-screen bg-[#EBF1F4]"
    >
      <Header isTeacher>
        <TabsTrigger value="home">Início</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
        <TabsTrigger value="ranking">Turmas</TabsTrigger>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
      </Header>

      <div className="flex-1 ">
        <Tabs.Content value="home" className="h-full overflow-auto">
          <Home />
        </Tabs.Content>
        <Tabs.Content value="quiz" className="h-full overflow-auto">
          <span>aqqaq</span>
        </Tabs.Content>
        <Tabs.Content value="ranking" className="h-full overflow-auto">
          3
        </Tabs.Content>
        <Tabs.Content value="profile" className="h-full overflow-auto">
          4
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
