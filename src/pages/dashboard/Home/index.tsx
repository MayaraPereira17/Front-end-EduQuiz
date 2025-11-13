import trophyImg from "../../../assets/icons/trophy.svg";
import playImg from "../../../assets/play.png";
import { StudentStats } from "../../../components/studentStats";
import { useAuth } from "../../../hooks/userAuth";
import { studentService } from "../../../services/studentService";
import type { StudentDashboard as StudentDashboardType } from "../../../services/studentService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeamNotification } from "./TeamNotification";

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StudentDashboardType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStudentStats = async () => {
    try {
      setLoading(true);
      const dashboardData = await studentService.getDashboard();
      setStats(dashboardData);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      // Em caso de erro, usar dados padrão
      setStats({
        quizzesCompletos: 0,
        pontos: 0,
        mediaGeral: 0,
        posicaoRanking: 0,
        sequencia: 0,
        totalUsuarios: 0,
        quizzesRecentes: [],
        timesEscalados: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate('/dashboard?tab=quiz');
  };

  useEffect(() => {
    loadStudentStats();
  }, []);

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="flex flex-col gap-2 sm:gap-4 pb-4 pt-4 sm:pt-6 md:pt-9">
        <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Olá, {user?.firstName}!</h4>
        <span className="text-[#404040] text-xs sm:text-sm">
          Continue aprendendo e melhorando sua pontuação.
        </span>
      </div>

      {/* Notificações de Times Escalados */}
      {stats?.timesEscalados && stats.timesEscalados.length > 0 && (
        <TeamNotification times={stats.timesEscalados} />
      )}

      {/* Primeira linha de graficos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-7">
        {/* Quizzes Completos */}
        <StudentStats 
          item={{
            img: "book" as any,
            value: loading ? "..." : (stats?.quizzesCompletos || 0),
            description: "Quizzes completos"
          }} 
        />
        
        {/* Média Geral */}
        <StudentStats 
          item={{
            img: "analytics" as any,
            value: loading ? "..." : `${stats?.mediaGeral?.toFixed(1) || 0}%`,
            description: "Média geral"
          }} 
        />
        
                {/* Total de Pontos */}
                <StudentStats
                  item={{
                    img: "star" as any,
                    value: loading ? "..." : (stats?.pontos || 0),
                    description: "Total de pontos"
                  }}
                />

                {/* Sequência de Dias */}
                <StudentStats
                  item={{
                    img: "clock" as any,
                    value: loading ? "..." : `${stats?.sequencia || 0} dias`,
                    description: "Sequência de dias"
                  }}
                />
        
        {/* Posição no Ranking */}
        <StudentStats 
          item={{
            img: "trophy" as any,
            value: loading ? "..." : `#${stats?.posicaoRanking || 0}`,
            description: "Posição no ranking"
          }} 
        />
      </div>

      {/* Segunda linha de graficos */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6 md:gap-9 rounded-2xl sm:rounded-3xl md:rounded-4xl pt-4 sm:pt-6 md:pt-7">
        {/* Primeira Coluna */}
        <div className="flex flex-col min-h-48 sm:min-h-60 justify-evenly bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl px-6 sm:px-8 md:px-12 py-4 sm:py-6">
          <div className="flex gap-3 sm:gap-4 items-center">
            <img src={playImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />

            <span className="text-sm sm:text-base">Iníciar Novo Quiz</span>
          </div>

          <span className="text-xs sm:text-sm text-[#404040]">
            Teste os seus conhecimentos e melhore sua pontuação!
          </span>

          <button 
            onClick={handleStartQuiz}
            className="bg-[#EF6C00] text-white py-2 sm:py-2.5 rounded-md hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            Começar Quiz
          </button>
        </div>

        {/* Segunda Coluna */}
        <div className="flex flex-col bg-white px-6 sm:px-8 md:px-12 rounded-2xl sm:rounded-3xl md:rounded-4xl justify-evenly relative py-4 sm:py-6 min-h-48 sm:min-h-60">
          <div className="absolute top-4 sm:top-6 md:top-7">
            <img src={trophyImg} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
          <div className="flex flex-col text-center mt-6 sm:mt-8">
            <span className="text-[#FFDE00] font-bold text-3xl sm:text-4xl md:text-5xl">
              {loading ? "..." : `#${stats?.posicaoRanking || 0}`}
            </span>
            <span className="text-xs sm:text-sm md:text-base">No ranking geral</span>
          </div>
          <button 
            onClick={handleStartQuiz}
            className="bg-[#3182BD] text-white py-2 sm:py-2.5 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Ver Ranking
          </button>
        </div>

        <div className="bg-white min-h-48 flex flex-col justify-evenly rounded-2xl sm:rounded-3xl md:rounded-4xl mb-6 sm:mb-8 md:mb-10 py-4 sm:py-6">
          <span className="px-4 sm:px-6 md:px-8 text-sm sm:text-base font-medium">Quizzes Recentes</span>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
                   ) : stats?.quizzesRecentes && stats.quizzesRecentes.length > 0 ? (
                     stats.quizzesRecentes.slice(0, 2).map((quiz, index) => (
                       <div key={index} className="border flex flex-row justify-between rounded-lg sm:rounded-xl mx-4 sm:mx-6 md:mx-12 px-3 sm:px-4 md:px-5 items-center border-[#D9D9D9] py-2 sm:py-3 gap-2">
                         <span className="text-xs sm:text-sm md:text-base text-black font-bold truncate flex-1">
                           {quiz.titulo}
                         </span>
                         <span
                           className={`font-bold text-lg sm:text-xl md:text-2xl whitespace-nowrap ${
                             quiz.percentualAcerto >= 70 ? 'text-[#0DA100]' :
                             quiz.percentualAcerto >= 50 ? 'text-[#C35800]' : 'text-red-600'
                           }`}
                         >
                           {quiz.percentualAcerto.toFixed(0)}%
                         </span>
                       </div>
                     ))
          ) : (
            <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
              <p className="text-sm sm:text-base">Nenhum quiz realizado ainda</p>
              <button 
                onClick={handleStartQuiz}
                className="text-blue-600 hover:text-blue-800 mt-2 text-sm sm:text-base"
              >
                Começar seu primeiro quiz!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
