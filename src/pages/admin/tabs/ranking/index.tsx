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
      <div className="px-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando alunos...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar alunos</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => loadAlunos()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="flex items-center mt-5 gap-2 justify-between mb-6">
        <div>
          <h4 className="text-3xl">Gerenciar Alunos e Ranking ⚽</h4>
          <span className="text-base text-[#4A5565]">
            Acompanhe o desempenho dos alunos da Escolinha de Futebol
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-black/10 mb-6">
        <SearchInput onSearch={handleBusca} />
      </div>

      <div className="bg-white border border-black/10 p-6 rounded-xl mb-10">
        <div className="flex gap-2 items-center mb-4">
          <TrendingUp width={20} height={20} color="#2B7FFF" />
          <h5 className="text-base">Ranking dos Alunos</h5>
        </div>
        
        {alunos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {busca ? `Nenhum aluno encontrado para "${busca}"` : "Nenhum aluno encontrado"}
          </div>
        ) : (
          alunos.map((aluno) => (
            <div
              key={aluno.id}
              className="border border-l-4 border-[#2B7FFF] rounded-xl flex justify-between p-4 mt-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">#{aluno.posicao}</span>

                <Avatar.Root className="flex items-center justify-center overflow-hidden select-none w-10 h-10 rounded-full bg-[#DBEAFE]">
                  <Avatar.Fallback className="w-full h-full flex items-center justify-center text-sm text-[#155DFC]">
                    {getInitialLetter(aluno.nome)}
                  </Avatar.Fallback>
                </Avatar.Root>

                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-semibold">{aluno.nome}</span>
                  <span className="text-sm text-[#6A7282]">{aluno.email}</span>
                  <span className="text-base text-[#4A5565]">
                    {aluno.idade} anos
                  </span>

                  <div className="py-0.5 px-2 border border-black/10 flex flex-col self-start rounded-lg items-center text-center">
                    <span className="text-xs flex">
                      {aluno.totalQuizzes} quizzes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col text-end gap-0.5">
                  <span className="text-[#3182BD] text-3xl font-bold">
                    {aluno.scoreGeral}%
                  </span>
                  <span className="text-sm text-[#4A5565]">Score Geral</span>
                  <span className="text-[#6A7282] text-xs">
                    {aluno.ultimoQuiz ? `Último quiz: ${new Date(aluno.ultimoQuiz).toLocaleDateString()}` : 'Nenhum quiz realizado'}
                  </span>
                </div>

                <button className="hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <Trash color="#E7000B" width={16} height={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
