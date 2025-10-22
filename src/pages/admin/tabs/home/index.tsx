import { useState, useEffect } from "react";
import { Users, Trophy, Target } from "lucide-react";
import { useAuth } from "../../../../hooks/userAuth";
import { tecnicoService, type DashboardTecnicoDTO } from "../../../../services/tecnicoService";
import { Stats } from "./stats";
import { BestStudents } from "./bestStudents";

export function HomeAdmin() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardTecnicoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Carregando dashboard do técnico...');
      
      const data = await tecnicoService.getDashboard();
      setDashboard(data);
      
      console.log('✅ Dashboard carregado com sucesso:', data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar dashboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-full px-6 flex flex-col gap-6 overflow-auto">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando Dashboard...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full px-6 flex flex-col gap-6 overflow-auto">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadDashboard}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full px-6 flex flex-col gap-6 overflow-auto">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h4 className="text-3xl">Dashboard Técnico ⚽</h4>
          <span className="text-base text-[#4A5565]">
            Bem-vindo, <strong>{dashboard?.nomeTecnico || user?.firstName}</strong>! Acompanhe o progresso
            educacional dos seus alunos da Escolinha de Futebol.
          </span>
        </div>

        <button className="flex border border-black/10 rounded-lg bg-white py-2.5 px-3 items-center gap-2 text-sm">
          <Users width={16} height={16} />
          Ver Ranking dos Alunos
        </button>
      </div>

      <Stats dashboard={dashboard} />

      <BestStudents dashboard={dashboard} />
    </div>
  );
}
