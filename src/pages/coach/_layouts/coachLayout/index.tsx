import * as Tabs from "@radix-ui/react-tabs";
import { Header } from "../../../../components/header";
import { TabsTrigger } from "../../../../components/tabsTrigger";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function CoachLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define a aba ativa com base na rota
  const activeTab = location.pathname.includes("/coach/profile")
    ? "profile"
    : location.pathname.includes("/coach/quiz")
    ? "quizz"
    : "home";

  const handleTabChange = (tab: string) => {
    // Navega para a rota correspondente quando a tab muda
    if (tab === "home") navigate("/coach");
    if (tab === "quizz") navigate("/coach/quizz");
    if (tab === "profile") navigate("/coach/profile");
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col h-screen bg-[#EBF1F4]"
    >
      <Header isTeacher>
        <TabsTrigger value="home">Início</TabsTrigger>
        <TabsTrigger value="quizz">Meus Quizzes</TabsTrigger>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
      </Header>

      <div className="flex-1 overflow-auto">
        {/* Outlet renderiza a tela da rota atual */}
        <Outlet />
      </div>
    </Tabs.Root>
  );
}
