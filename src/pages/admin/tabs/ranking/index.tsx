import { useState, useEffect } from "react";
import { Trash, TrendingUp } from "lucide-react";
import { SearchInput } from "../../../../components/searchInput";
import { Avatar } from "radix-ui";
import { getInitialLetter } from "../../../../utils/getInitialLetters";
import { tecnicoService, type AlunoRankingDTO } from "../../../../services/tecnicoService";

export function RankingAdmin() {
  const [alunos, setAlunos] = useState<AlunoRankingDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  const loadAlunos = async (termoBusca?: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Carregando alunos do técnico...', termoBusca ? `(busca: ${termoBusca})` : '');
      
      const data = await tecnicoService.getAlunos(termoBusca);
      setAlunos(data.alunos);
      
      console.log('✅ Alunos carregados com sucesso:', data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar alunos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlunos();
  }, []);

  const handleBusca = (termo: string) => {
    setBusca(termo);
    loadAlunos(termo);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center py-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Carregando alunos...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center py-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Erro ao carregar alunos</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => loadAlunos()}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-5 gap-2 sm:gap-0 justify-between mb-4 sm:mb-6">
        <div className="flex-1">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">Gerenciar Alunos e Ranking ⚽</h4>
          <span className="text-sm sm:text-base text-[#4A5565]">
            Acompanhe o desempenho dos alunos da Escolinha de Futebol
          </span>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10 mb-4 sm:mb-6">
        <SearchInput onSearch={handleBusca} />
      </div>

      <div className="bg-white border border-black/10 p-4 sm:p-5 md:p-6 rounded-xl mb-6 sm:mb-10">
        <div className="flex gap-2 items-center mb-3 sm:mb-4">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" color="#2B7FFF" />
          <h5 className="text-sm sm:text-base font-medium">Ranking dos Alunos</h5>
        </div>
        
        {alunos.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
            {busca ? `Nenhum aluno encontrado para "${busca}"` : "Nenhum aluno encontrado"}
          </div>
        ) : (
          alunos.map((aluno) => (
            <div
              key={aluno.id}
              className="border border-l-4 border-[#2B7FFF] rounded-xl flex flex-col sm:flex-row justify-between p-3 sm:p-4 mt-3 sm:mt-4 gap-3 sm:gap-0"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <span className="font-bold text-base sm:text-lg flex-shrink-0">#{aluno.posicao}</span>

                <Avatar.Root className="flex items-center justify-center overflow-hidden select-none w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DBEAFE] flex-shrink-0">
                  <Avatar.Fallback className="w-full h-full flex items-center justify-center text-xs sm:text-sm text-[#155DFC]">
                    {getInitialLetter(aluno.nome)}
                  </Avatar.Fallback>
                </Avatar.Root>

                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-base sm:text-lg font-semibold truncate">{aluno.nome}</span>
                  <span className="text-xs sm:text-sm text-[#6A7282] truncate">{aluno.email}</span>
                  <span className="text-sm sm:text-base text-[#4A5565]">
                    {aluno.idade} anos
                  </span>

                  <div className="py-0.5 px-2 border border-black/10 flex flex-col self-start rounded-lg items-center text-center mt-1">
                    <span className="text-xs">
                      {aluno.totalQuizzes} quizzes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
                <div className="flex flex-col text-start sm:text-end gap-0.5">
                  <span className="text-[#3182BD] text-2xl sm:text-3xl font-bold">
                    {aluno.scoreGeral}%
                  </span>
                  <span className="text-xs sm:text-sm text-[#4A5565]">Score Geral</span>
                  <span className="text-[#6A7282] text-xs">
                    {aluno.ultimoQuiz ? `Último quiz: ${new Date(aluno.ultimoQuiz).toLocaleDateString()}` : 'Nenhum quiz realizado'}
                  </span>
                </div>

                <button className="hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0">
                  <Trash color="#E7000B" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
