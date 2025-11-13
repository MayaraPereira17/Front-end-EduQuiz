import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarDemo } from "../../components/avatar";
import Logo from "../../components/logo";
import { TabsTrigger } from "../../components/tabsTrigger";
import { Home } from "./Home";
import { QuizList } from "./QuizList";
import { Ranking } from "./Ranking";
import { Profile } from "./Profile";
import { useAuth } from "../../hooks/userAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verificar se há parâmetro 'tab' na URL e definir aba ativa
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['home', 'quiz', 'ranking', 'profile'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Fechar menu mobile ao mudar de aba
  useEffect(() => {
    setMenuOpen(false);
  }, [activeTab]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col h-screen bg-white"
    >
      <header className="px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center h-16 sm:h-20 md:h-[4.5rem] shrink-0 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo imgClass="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" containerClass="!gap-1 sm:!gap-2" />
        </div>

        {/* Menu Desktop */}
        <Tabs.List className="hidden md:flex self-start" aria-label="Manage your account">
          <TabsTrigger value="home">Início</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </Tabs.List>

        {/* Menu Mobile - Botão Hambúrguer */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Desktop - Avatar e Sair */}
        <div className="hidden md:flex gap-6 lg:gap-10 items-center">
          <AvatarDemo isTeacher={false} />
          <button 
            onClick={handleLogout}
            className="text-[#404040] text-sm hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Menu Mobile - Avatar (sem texto Sair) */}
        <div className="md:hidden flex items-center">
          <AvatarDemo isTeacher={false} />
        </div>
      </header>

      {/* Menu Mobile - Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <Tabs.List className="flex flex-col" aria-label="Manage your account">
            <TabsTrigger 
              value="home" 
              className="w-full text-left px-4 py-3 border-b border-gray-100"
            >
              Início
            </TabsTrigger>
            <TabsTrigger 
              value="quiz" 
              className="w-full text-left px-4 py-3 border-b border-gray-100"
            >
              Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="ranking" 
              className="w-full text-left px-4 py-3 border-b border-gray-100"
            >
              Ranking
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="w-full text-left px-4 py-3"
            >
              Perfil
            </TabsTrigger>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
            >
              Sair
            </button>
          </Tabs.List>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Tabs.Content value="home" className="h-full overflow-auto">
          <Home />
        </Tabs.Content>
        <Tabs.Content value="quiz" className="h-full overflow-auto">
          <QuizList />
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
