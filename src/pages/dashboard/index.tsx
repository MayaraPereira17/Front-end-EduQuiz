import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarDemo } from "../../components/avatar";
import Logo from "../../components/logo";
import { TabsTrigger } from "../../components/tabsTrigger";
import { Home } from "./Home";
import { Quiz } from "./Quiz";
import { Ranking } from "./Ranking";
import { Profile } from "./Profile";
import { useAuth } from "../../hooks/userAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col h-screen bg-white"
    >
      <header className="px-12 flex justify-between items-center h-[4.5rem] shrink-0">
        <div>
          <Logo imgClass="w-12 h-12" containerClass="!gap-2" />
        </div>

        <Tabs.List className="self-start flex" aria-label="Manage your account">
          <TabsTrigger value="home">Início</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </Tabs.List>

        <div className="flex gap-10">
          <AvatarDemo isTeacher={false} />
          <button 
            onClick={handleLogout}
            className="text-[#404040] text-sm hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs.Content value="home" className="h-full overflow-auto">
          <Home />
        </Tabs.Content>
        <Tabs.Content value="quiz" className="h-full overflow-auto">
          <Quiz />
        </Tabs.Content>
        <Tabs.Content value="ranking" className="h-full overflow-auto">
          <Ranking />
        </Tabs.Content>
        <Tabs.Content value="profile" className="h-full overflow-auto">
          <Profile />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
