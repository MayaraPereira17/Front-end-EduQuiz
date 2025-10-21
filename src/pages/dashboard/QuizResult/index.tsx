import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { QuizResult as QuizResultType } from "../../../services/studentService";
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from "lucide-react";

export function QuizResult() {
  const { tentativaId } = useParams<{ tentativaId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResult = async () => {
    if (!tentativaId) {
      setError("ID da tentativa não fornecido");
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Carregando resultado do quiz...');
      console.log('📊 Tentativa ID:', tentativaId);
      
      setLoading(true);
      setError(null);
      
      // Buscar resultado do localStorage (vem da submissão do quiz)
      const cachedResult = localStorage.getItem(`quiz_result_${tentativaId}`);
      if (cachedResult) {
        console.log('✅ Resultado encontrado no cache!');
        const resultData = JSON.parse(cachedResult);
        console.log('📊 Dados do resultado (cache):', resultData);
        setResult(resultData);
        
        // Limpar do localStorage após usar
        localStorage.removeItem(`quiz_result_${tentativaId}`);
        setLoading(false);
        return;
      }
      
      // Se não encontrou no cache, mostrar erro (não temos endpoint para buscar resultado individual)
      console.log('❌ Resultado não encontrado no cache');
      setError("Resultado do quiz não encontrado. Por favor, tente fazer o quiz novamente.");
    } catch (error: any) {
      console.error("❌ Erro ao carregar resultado:", error);
      setError("Erro ao carregar resultado do quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentual: number) => {
    if (percentual >= 80) return "text-green-600";
    if (percentual >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentual: number) => {
    if (percentual >= 90) return "Excelente! Você dominou o conteúdo!";
    if (percentual >= 80) return "Muito bom! Continue assim!";
    if (percentual >= 70) return "Bom trabalho! Você está no caminho certo!";
    if (percentual >= 60) return "Não foi mal! Estude um pouco mais!";
    return "Que tal revisar o conteúdo e tentar novamente?";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    loadResult();
  }, [tentativaId]);

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
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar resultado</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/dashboard/quiz')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Voltar para lista de quizzes
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600">Resultado não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Concluído!</h1>
            <h2 className="text-xl text-gray-600 mb-4">Quiz Concluído</h2>
            <p className={`text-4xl font-bold ${getScoreColor(result.percentualAcerto)}`}>
              {result.percentualAcerto.toFixed(1)}%
            </p>
            <p className="text-gray-600 mt-2">{getScoreMessage(result.percentualAcerto)}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{result.pontuacaoTotal}</div>
              <div className="text-sm text-gray-600">de {result.pontuacaoMaxima} pontos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {result.respostasCorretas}
              </div>
              <div className="text-sm text-gray-600">acertos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatTime(result.tempoGasto)}
              </div>
              <div className="text-sm text-gray-600">tempo gasto</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard/quiz')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Voltar aos Quizzes
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Detalhes das Respostas</h3>
          
          <div className="space-y-4">
            {result.respostas.map((resposta, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Questão {index + 1}
                    </h4>
                    <p className="text-gray-600 mb-3">{resposta.textoQuestao}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    resposta.correta 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {resposta.correta ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {resposta.correta ? 'Correta' : 'Incorreta'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sua resposta:</label>
                    <p className={`p-2 rounded ${
                      resposta.correta ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {resposta.textoRespostaSelecionada}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Resposta correta:</label>
                    <p className="p-2 rounded bg-green-50 text-green-800">
                      {resposta.textoRespostaCorreta}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Pontuação: {resposta.pontos} ponto{resposta.pontos !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
