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
    <div className="h-full overflow-auto flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Topo */}
      <div className="mt-3.5 sm:mt-4 md:mt-6">
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl">Olá, Prof. {user?.firstName}!</h4>
          <span className="text-[#4A5565] text-sm sm:text-base">
            Acompanhe o progresso dos seus alunos.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-7">
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

              <div className="col-span-2 border border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-4 sm:py-5 md:py-6 w-full flex flex-col items-center bg-white gap-2 sm:gap-3 md:gap-3.5 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] 2xl:h-96 justify-center">
                <img src={PlusImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-base sm:text-lg font-bold text-center">Criar Quiz</span>
                <span className="text-[#4A5565] text-center font-normal text-xs sm:text-sm md:text-base px-2">
                  Crie novos quizzes personalizados para suas turmas
                </span>
                <button 
                  onClick={handleCreateQuiz}
                  className="flex bg-black gap-2 sm:gap-4 py-1.5 sm:py-2 w-full max-w-xs items-center justify-center text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  <img src={PlusWhite} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                  Novo Quiz
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <div className="col-span-2 border border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-4 sm:py-5 md:py-6 w-full flex flex-col items-center bg-white gap-2 sm:gap-3 md:gap-3.5 text-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] 2xl:h-96 justify-center">
              <img src={BookIcon} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-bold">Meus Quizzes</span>
              <span className="text-[#4A5565] text-center font-normal text-xs sm:text-sm md:text-base px-2">
                Visualize e gerencie todos os seus quizzes
              </span>
              <button 
                onClick={handleViewQuizzes}
                className="flex bg-white gap-2 sm:gap-4 py-1.5 sm:py-2 w-full max-w-xs items-center justify-center text-black rounded-lg border border-black/10 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <img src={MiniBookIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                Ver Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé fixo ao final */}
      <div className="flex items-center justify-center mt-4 sm:mt-6 py-4">
        <button 
          onClick={handleViewProfile}
          className="flex p-2 sm:p-3 border border-black/10 gap-2 sm:gap-4 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <img src={MiniProfile} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Ver Perfil</span>
          <span className="sm:hidden">Perfil</span>
        </button>
      </div>
    </div>
  );
}
