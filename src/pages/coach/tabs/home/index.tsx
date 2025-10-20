import { TeacherStats } from "../../../../components/teacherStats";
import PlusImg from "../../../../assets/icons/plus.svg";
import PlusWhite from "../../../../assets/icons/plus-white.svg";
import BookIcon from "../../../../assets/icons/book-purple.svg";
import MiniBookIcon from "../../../../assets/icons/mini-book.svg";
import MiniProfile from "../../../../assets/icons/mini-profile.svg";
import { useAuth } from "../../../../hooks/userAuth";
import { useNavigate } from "react-router-dom";
import { quizService } from "../../../../services/quizService";
import { useState, useEffect } from "react";

interface DashboardStats {
  quizzesCriados: number;
  mediaDosAlunos: number;
  totalAlunos: number;
  totalTentativas: number;
  quizzesPublicados: number;
}

export function HomeCoach() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCreateQuiz = () => {
    navigate("/coach/create-quizz");
  };

  const handleViewQuizzes = () => {
    navigate("/coach/quizz");
  };

  const handleViewProfile = () => {
    navigate("/coach/profile");
  };

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const dashboardData = await quizService.getDashboardStats();
      setStats(dashboardData.estatisticas || dashboardData);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      // Em caso de erro, usar dados padrão
      setStats({
        quizzesCriados: 0,
        mediaDosAlunos: 0,
        totalAlunos: 0,
        totalTentativas: 0,
        quizzesPublicados: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  return (
    <div className="h-full overflow-auto flex flex-col justify-between px-4">
      {/* Topo */}
      <div className="mt-3.5">
        <div className="space-y-3">
          <h4 className="font-bold text-3xl">Olá, Prof. {user?.firstName}!</h4>
          <span className="text-[#4A5565] text-base">
            Acompanhe o progresso dos seus alunos.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="grid grid-cols-2 gap-7">
              {/* Quizzes Completos */}
              <TeacherStats 
                item={{
                  img: "book" as any,
                  value: stats?.totalTentativas || 0,
                  description: "Quizzes completos"
                }} 
              />
              
              {/* Média Geral */}
              <TeacherStats 
                item={{
                  img: "analytics" as any,
                  value: loading ? "..." : `${stats?.mediaDosAlunos?.toFixed(1) || 0}%`,
                  description: "Média geral"
                }} 
              />

              <div className="col-span-2 border border-black/10 rounded-2xl px-24 py-6 w-full flex flex-col items-center bg-white gap-3.5 2xl:h-96 justify-center">
                <img src={PlusImg} alt="" />
                <span className="text-lg font-bold">Criar Quiz</span>
                <span className="text-[#4A5565] text-center font-normal">
                  Crie novos quizzes personalizados para suas turmas
                </span>
                <button 
                  onClick={handleCreateQuiz}
                  className="flex bg-black gap-4 py-1.5 w-full items-center justify-center text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <img src={PlusWhite} alt="" />
                  Novo Quiz
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <div className="col-span-2 border border-black/10 rounded-2xl px-24 py-6 w-full flex flex-col items-center bg-white gap-3.5 text-center 2xl:h-96 justify-center ">
              <img src={BookIcon} alt="" />
              <span className="text-lg font-bold">Meus Quizzes</span>
              <span className="text-[#4A5565] text-center font-normal">
                Visualize e gerencie todos os seus quizzes
              </span>
              <button 
                onClick={handleViewQuizzes}
                className="flex bg-white gap-4 py-1.5 w-full items-center justify-center text-black rounded-lg border border-black/10 hover:bg-gray-50 transition-colors"
              >
                <img src={MiniBookIcon} alt="" />
                Ver Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé fixo ao final */}
      <div className="flex items-center justify-center  mt-6 py-4">
        <button 
          onClick={handleViewProfile}
          className="flex p-3 border border-black/10 gap-4 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <img src={MiniProfile} alt="" />
          Ver Perfil
        </button>
      </div>
    </div>
  );
}
