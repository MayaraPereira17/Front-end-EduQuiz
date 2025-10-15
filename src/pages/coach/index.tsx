import * as Tabs from "@radix-ui/react-tabs";

import { Header } from "../../components/header";
import { TabsTrigger } from "../../components/tabsTrigger";

import { useState } from "react";
import { HomeCoach } from "./tabs/home";
import { ProfileCoach } from "./tabs/profile";
import { MyQuizzesCoach } from "./tabs/myQuizzes";

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
        <TabsTrigger value="quiz">Meus Quizzes</TabsTrigger>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
      </Header>

      <div className="flex-1 overflow-auto">
        <Tabs.Content value="home" className="h-full overflow-auto">
          <HomeCoach />
        </Tabs.Content>
        <Tabs.Content value="quiz" className="h-full overflow-auto">
          <MyQuizzesCoach />
        </Tabs.Content>
        <Tabs.Content value="profile" className="h-full overflow-auto">
          <ProfileCoach />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
