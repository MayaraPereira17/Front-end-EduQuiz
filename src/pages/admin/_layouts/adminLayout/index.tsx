import * as Tabs from "@radix-ui/react-tabs";
import { Header } from "../../../../components/header";
import { TabsTrigger } from "../../../../components/tabsTrigger";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = (pathname: string): string => {
    if (pathname.includes("/admin/profile")) return "profile";
    if (pathname.includes("/admin/ranking")) return "ranking";
    if (pathname.includes("/admin/reports")) return "reports";
    if (pathname === "/admin") return "home";
    return "home"; // padrão
  };

  // Define a aba ativa com base na rota
  const activeTab = getActiveTab(location.pathname);

  const handleTabChange = (tab: string) => {
    // Navega para a rota correspondente quando a tab muda
    if (tab === "home") navigate("/admin");
    if (tab === "ranking") navigate("/admin/ranking");
    if (tab === "reports") navigate("/admin/reports");
    if (tab === "profile") navigate("/admin/profile");
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col h-screen bg-[#EBF1F4]"
    >
      <Header isTeacher={false} isAdmin={true}>
        <TabsTrigger value="home">Início</TabsTrigger>
        <TabsTrigger value="ranking">Ranking</TabsTrigger>
        <TabsTrigger value="reports">Relatórios</TabsTrigger>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
      </Header>

      <div className="flex-1 overflow-auto">
        {/* Outlet renderiza a tela da rota atual */}
        <Outlet />
      </div>
    </Tabs.Root>
  );
}
