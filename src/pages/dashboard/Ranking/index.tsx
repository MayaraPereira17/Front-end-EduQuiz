import { Avatar } from "./avatarComponent";
import { SearchInput } from "../../../components/searchInput";
import { studentService, type RankingItem as RankingItemType } from "../../../services/studentService";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/userAuth";
import { Trophy, Medal, Award } from "lucide-react";

export function Ranking() {
  const { user } = useAuth();
  const [rankings, setRankings] = useState<RankingItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const loadRankings = async () => {
    try {
      setLoading(true);
      setError(null);
      const rankingsData = await studentService.getRanking();
      // A API retorna um objeto com a propriedade 'alunos'
      setRankings(rankingsData.alunos || []);
    } catch (error: any) {
      console.error("Erro ao carregar ranking:", error);
      setError("Erro ao carregar ranking");
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      // Implementar busca se necessário
      loadRankings();
    }, 500);

    setSearchTimeout(timeout);
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getPositionColor = () => {
    return "bg-[#FFF4E4] border-[#D9D9D9]";
  };

  const filteredRankings = rankings.filter(item => 
    item.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadRankings();
    
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);
  if (loading) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-10 lg:px-14">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-10 lg:px-14">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadRankings}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-12 max-w-[943px] mx-auto">
        <SearchInput 
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por nome..."
        />
      </div>

      <div className="text-center space-y-2 mb-8 sm:mb-10 md:mb-14 px-4">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">Ranking geral</h2>
        <span className="text-[#404040] text-xs sm:text-sm">
          Acompanhe o desempenho de todos os usuários da plataforma
        </span>
        {searchTerm && (
          <p className="text-gray-600 text-xs sm:text-sm">
            {filteredRankings.length} resultado{filteredRankings.length !== 1 ? 's' : ''} encontrado{filteredRankings.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="border border-[#D9D9D9] rounded-2xl sm:rounded-3xl md:rounded-4xl bg-white mx-auto space-y-3 sm:space-y-4 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 mb-8 sm:mb-12 md:mb-16">
        {filteredRankings.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum ranking disponível'}
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              {searchTerm 
                ? 'Tente ajustar os termos de busca'
                : 'Ainda não há dados de ranking disponíveis'
              }
            </p>
          </div>
        ) : (
          filteredRankings.map((item) => {
            const isCurrentUser = user?.firstName && user?.lastName && 
              item.nomeCompleto?.includes(user.firstName) && item.nomeCompleto?.includes(user.lastName);
            
            return (
              <div
                className={`py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:px-7 rounded-2xl sm:rounded-3xl md:rounded-4xl border items-start sm:items-center ${getPositionColor()}`}
                key={item.nomeCompleto}
              >
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 font-bold flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getPositionIcon(item.posicao)}
                    <span className="text-lg sm:text-xl">#{item.posicao}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <Avatar />
                    <span className={`text-sm sm:text-base md:text-md truncate ${isCurrentUser ? 'font-bold' : ''}`}>
                      {item.nomeCompleto}
                      {isCurrentUser && <span className="ml-2 text-blue-600 whitespace-nowrap">(Você)</span>}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 md:gap-8 lg:space-x-12 w-full sm:w-auto">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-base sm:text-lg">{item.pontos || 0}</span>
                    <span className="text-gray-600 text-xs sm:text-sm">Pontos</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-base sm:text-lg">{item.quizzes || 0}</span>
                    <span className="text-gray-600 text-xs sm:text-sm">Quizzes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-base sm:text-lg">{item.media ? item.media.toFixed(1) : '0.0'}%</span>
                    <span className="text-gray-600 text-xs sm:text-sm">Média</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
