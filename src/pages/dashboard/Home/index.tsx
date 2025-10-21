import trophyImg from "../../../assets/icons/trophy.svg";
import playImg from "../../../assets/play.png";
import { StudentStats } from "../../../components/studentStats";
import { useAuth } from "../../../hooks/userAuth";
import { studentService, StudentDashboard as StudentDashboardType } from "../../../services/studentService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate('/dashboard/quiz');
  };

  useEffect(() => {
    loadStudentStats();
  }, []);

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-14">
      <div className="flex flex-col gap-4 pb-4 pt-9">
        <h4 className="font-bold text-5xl">Olá, {user?.firstName}!</h4>
        <span className="text-[#404040] text-sm">
          Continue aprendendo e melhorando sua pontuação.
        </span>
      </div>

      {/* Primeira linha de graficos */}
      <div className="grid grid-cols-5 gap-7">
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
      <div className="grid grid-cols-[2fr_1fr] gap-9 rounded-4xl pt-7">
        {/* Primeira Coluna */}
        <div className="flex flex-col min-h-60 justify-evenly bg-white rounded-4xl px-12">
          <div className="flex gap-4 items-center">
            <img src={playImg} alt="" />

            <span className="text-base">Iníciar Novo Quiz</span>
          </div>

          <span className="text-sm text-[#404040]">
            Teste os seus conhecimentos e melhore sua pontuação!
          </span>

          <button 
            onClick={handleStartQuiz}
            className="bg-[#EF6C00] text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Começar Quiz
          </button>
        </div>

        {/* Segunda Coluna */}
        <div className="flex flex-col bg-white px-12 rounded-4xl justify-evenly relative ">
          <div className="absolute top-7">
            <img src={trophyImg} alt="" />
          </div>
          <div className="flex flex-col text-center">
            <span className="text-[#FFDE00] font-bold text-5xl">
              {loading ? "..." : `#${stats?.posicaoRanking || 0}`}
            </span>
            <span>No ranking geral</span>
          </div>
          <button 
            onClick={handleStartQuiz}
            className="bg-[#3182BD] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver Ranking
          </button>
        </div>

        <div className="bg-white min-h-48 flex flex-col justify-evenly rounded-4xl mb-10">
          <span className="px-8">Quizzes Recentes</span>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
                   ) : stats?.quizzesRecentes && stats.quizzesRecentes.length > 0 ? (
                     stats.quizzesRecentes.slice(0, 2).map((quiz, index) => (
                       <div key={index} className="border flex flex-row justify-between rounded-xl mx-12 px-5 items-center border-[#D9D9D9] py-2">
                         <span className="text-base text-black font-bold">
                           {quiz.titulo}
                         </span>
                         <span
                           className={`font-bold text-2xl ${
                             quiz.percentualAcerto >= 70 ? 'text-[#0DA100]' :
                             quiz.percentualAcerto >= 50 ? 'text-[#C35800]' : 'text-red-600'
                           }`}
                         >
                           {quiz.percentualAcerto.toFixed(0)}%
                         </span>
                       </div>
                     ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum quiz realizado ainda</p>
              <button 
                onClick={handleStartQuiz}
                className="text-blue-600 hover:text-blue-800 mt-2"
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
