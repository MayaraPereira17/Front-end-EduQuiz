import { useState, useEffect } from "react";
import { studentService } from "../../../services/studentService";
import type { StudentQuiz } from "../../../services/studentService";
import { Badge } from "../../../components/badge";
import { SearchInput } from "../../../components/searchInput";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Users, TrendingUp } from "lucide-react";

export function QuizList() {
  const [quizzes, setQuizzes] = useState<StudentQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const navigate = useNavigate();

  const loadQuizzes = async (_busca?: string) => {
    try {
      console.log('🔄 QuizList: Iniciando carregamento de quizzes...');
      setLoading(true);
      setError(null);
      
      console.log('📡 QuizList: Chamando studentService.getAvailableQuizzes...');
      const quizzesData = await studentService.getAvailableQuizzes();
      
      console.log('📊 QuizList: Dados recebidos do serviço:', quizzesData);
      console.log('📊 QuizList: Tipo dos dados:', typeof quizzesData);
      console.log('📊 QuizList: É array?', Array.isArray(quizzesData));
      console.log('📊 QuizList: Quantidade de quizzes:', quizzesData?.length || 0);
      
      // Ajustar para diferentes estruturas de resposta
      let quizzesToSet: StudentQuiz[] = [];
      if (Array.isArray(quizzesData)) {
        quizzesToSet = quizzesData;
      } else if (quizzesData && typeof quizzesData === 'object') {
        const dataObj = quizzesData as any;
        if (dataObj.items && Array.isArray(dataObj.items)) {
          quizzesToSet = dataObj.items;
        } else if (dataObj.data && Array.isArray(dataObj.data)) {
          quizzesToSet = dataObj.data;
        }
      }
      
      console.log('🎯 QuizList: Quizzes para definir no estado:', quizzesToSet);
      setQuizzes(quizzesToSet);
    } catch (error: any) {
      console.error("❌ QuizList: Erro ao carregar quizzes:", error);
      console.error("❌ QuizList: Detalhes do erro:", {
        message: error.message,
        stack: error.stack
      });
      setError("Erro ao carregar quizzes disponíveis");
      setQuizzes([]);
    } finally {
      console.log('✅ QuizList: Finalizando carregamento...');
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
      loadQuizzes(value);
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleStartQuiz = (quizId: number) => {
    // Aviso antes de iniciar o quiz
    const confirmado = window.confirm(
      "⚠️ ATENÇÃO: Se você fechar esta página durante o quiz, a tentativa será automaticamente encerrada!\n\n" +
      "Deseja continuar?"
    );
    
    if (confirmado) {
      navigate(`/dashboard/quiz/${quizId}`);
    }
  };

  const getDifficultyColor = (dificuldade: string) => {
    switch (dificuldade?.toLowerCase()) {
      case "fácil":
      case "facil":
        return "bg-green-100 text-green-800";
      case "médio":
      case "medio":
        return "bg-yellow-100 text-yellow-800";
      case "difícil":
      case "dificil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    console.log('🚀 QuizList: Componente montado, carregando quizzes...');
    loadQuizzes();
    
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);

  // Log do estado dos quizzes
  useEffect(() => {
    console.log('📊 QuizList: Estado dos quizzes atualizado:', {
      quizzes: quizzes,
      loading: loading,
      error: error,
      quantidade: quizzes.length
    });
  }, [quizzes, loading, error]);

  if (loading) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => loadQuizzes()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bold text-3xl mb-2">Quizzes Disponíveis</h2>
          <p className="text-gray-600">Escolha um quiz para testar seus conhecimentos!</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar quizzes por título, descrição ou categoria..."
          />
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} encontrado{filteredQuizzes.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Quizzes Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Nenhum quiz encontrado' : 'Nenhum quiz disponível'}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Tente ajustar os termos de busca'
                : 'Não há quizzes publicados no momento'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{quiz.titulo}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{quiz.descricao}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="info" className="text-xs">
                    {quiz.categoria}
                  </Badge>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.dificuldade)}`}>
                    {quiz.dificuldade}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">{quiz.tempoLimite}min</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BookOpen className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">{quiz.totalQuestoes} questões</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">{quiz.pontuacaoTotal} pontos</span>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-gray-600">Status:</span>
                  </div>
                  <span className={`font-semibold ${quiz.disponivel ? 'text-green-600' : 'text-red-600'}`}>
                    {quiz.disponivel ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>

                {/* Start Button */}
                {quiz.quizConcluido ? (
                  <div className="w-full bg-green-100 text-green-800 py-3 rounded-lg font-semibold text-center border border-green-300">
                    ✅ FEITO
                  </div>
                ) : quiz.tentativasRestantes > 0 ? (
                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Iniciar Quiz
                  </button>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold text-center border border-gray-300">
                    🔒 Indisponível
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
