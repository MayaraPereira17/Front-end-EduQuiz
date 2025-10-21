import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentService, type StudentQuestion, type StudentQuizDetail } from "../../../services/studentService";
import { Question } from "../../../components/question";

interface QuizAnswer {
  questaoId: number;
  opcaoSelecionadaId: number;
}

export function QuizAttempt() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  // Estados originais (mantidos)
  const [quiz, setQuiz] = useState<StudentQuizDetail | null>(null);
  const [questions, setQuestions] = useState<StudentQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // Novos estados para modo dinâmico
  const [useDynamicMode] = useState(true); // Ativado por padrão
  const [tentativaId, setTentativaId] = useState<number | null>(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [feedback, setFeedback] = useState<{
    correto: boolean;
    pontosGanhos: number;
    respostaCorretaTexto: string;
    mensagem: string;
  } | null>(null);
  const [progresso, setProgresso] = useState({
    questaoAtual: 0,
    totalQuestoes: 0,
    percentualCompleto: 0,
    pontuacaoAtual: 0,
    tempoGasto: 0
  });

  const loadQuiz = async () => {
    if (!quizId) {
      setError("ID do quiz não fornecido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (useDynamicMode) {
        // Modo dinâmico: iniciar quiz
        const response: any = await (studentService as any).startDynamicQuiz(parseInt(quizId));
        
        setTentativaId(response.tentativaId);
        setQuestions([response.questaoAtual]); // Mostrar apenas a questão atual
        setProgresso(response.progresso);
        setQuizStarted(true);
        
        // Criar um quiz mock para evitar erro de "quiz não encontrado"
        const mockQuiz = {
          id: parseInt(quizId),
          titulo: response.tituloQuiz || 'Quiz',
          descricao: 'Quiz em andamento',
          categoria: { id: 1, nome: 'Geral' },
          dificuldade: 'Media',
          tempoLimite: 30, // 30 minutos por questão
          maxTentativas: 3,
          tentativasRestantes: 3,
          totalQuestoes: response.progresso.totalQuestoes,
          criadoPor: 'Sistema',
          dataCriacao: new Date().toISOString(),
          questoes: [response.questaoAtual]
        };
        
        setQuiz(mockQuiz);
        
        // Inicializar timer (usar tempo padrão de 30 minutos por questão)
        setTimeLeft(30 * 60); // 30 minutos por questão
      } else {
        // Modo tradicional (mantido)
        const quizData = await studentService.getQuizForAttempt(parseInt(quizId));
        console.log('Quiz carregado:', quizData.titulo, '- Questões:', quizData.questoes?.length || 0);
        
        setQuiz(quizData);
        setQuestions(quizData.questoes || []);
        
        // Converter minutos para segundos
        const timeInSeconds = (quizData.tempoLimite || 30) * 60;
        setTimeLeft(timeInSeconds);
        setQuizStarted(true);
      }
      
    } catch (error: any) {
      console.error("Erro ao carregar quiz:", error);
      setError("Erro ao carregar quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted && !submitting && quizStarted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted && !submitting && quizStarted) {
      console.log('⏰ Tempo esgotado, submetendo automaticamente...');
      handleSubmitQuiz();
    }
  }, [timeLeft, quizCompleted, submitting, quizStarted]);

  const handleAnswer = async (questionId: number, optionId: number) => {
    if (useDynamicMode && tentativaId) {
      // Modo dinâmico: enviar resposta imediatamente
      try {
        setSubmitting(true);
        
        const response: any = await (studentService as any).answerQuestion(
          tentativaId,
          questionId,
          optionId
        );
        
        // Mostrar feedback
        setFeedback({
          correto: response.respostaCorreta,
          pontosGanhos: response.pontosGanhos,
          respostaCorretaTexto: response.respostaCorretaTexto,
          mensagem: response.feedback
        });
        setMostrandoFeedback(true);
        
        // Verificar se quiz foi concluído
        if (response.quizConcluido) {
          setQuizCompleted(true);
          setTentativaId(response.resultadoFinal?.tentativaId || tentativaId);
          setTimeLeft(0);
        } else if (response.proximaQuestao) {
          // Preparar próxima questão após 2 segundos
          setTimeout(() => {
            setQuestions([response.proximaQuestao!]);
            setMostrandoFeedback(false);
            setFeedback(null);
            
            // Atualizar progresso manualmente
            setProgresso(prev => ({
              ...prev,
              questaoAtual: prev.questaoAtual + 1,
              pontuacaoAtual: prev.pontuacaoAtual + (response.respostaCorreta ? response.pontosGanhos : 0),
              percentualCompleto: ((prev.questaoAtual + 1) / prev.totalQuestoes) * 100
            }));
            
            // Reiniciar timer para próxima questão (30 minutos)
            setTimeLeft(30 * 60);
          }, 2000);
        }
        
      } catch (err: any) {
        console.error('Erro ao responder questão:', err);
        
        // Backend foi ajustado - não precisamos mais do tratamento específico de ranking
        setError(err.response?.data?.message || 'Erro ao responder questão');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Modo tradicional (mantido)
      const newAnswers = [...answers];
      const existingAnswerIndex = newAnswers.findIndex(a => a.questaoId === questionId);
      
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = { questaoId: questionId, opcaoSelecionadaId: optionId };
      } else {
        newAnswers.push({ questaoId: questionId, opcaoSelecionadaId: optionId });
      }
      
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (submitting || quizCompleted) return;

    try {
      console.log('🔄 Submetendo quiz - Respostas:', answers.length);
      
      setSubmitting(true);
      const attempt = {
        respostas: answers
      };

      const result = await studentService.submitQuizAttempt(parseInt(quizId!), attempt);
      
      console.log('✅ Quiz submetido com sucesso!');
      console.log('📊 Resultado:', result);
      console.log('🔄 Redirecionando para:', `/dashboard/quiz/result/${result.tentativaId}`);
      
      setQuizCompleted(true);
      
      // Redirecionar para resultado após 3 segundos
      setTimeout(() => {
        navigate(`/dashboard/quiz/result/${result.tentativaId}`);
      }, 3000);

    } catch (error: any) {
      console.error("Erro ao submeter quiz:", error);
      
      // Tratamento específico para erro 409
      if (error.response?.status === 409) {
        setError("Erro no servidor: Conflito com o sistema de ranking. O quiz foi processado, mas pode haver problemas na atualização do ranking.");
      } else {
        setError("Erro ao submeter quiz. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };


  const getCurrentAnswer = () => {
    const currentQuestionId = questions[currentQuestion]?.id;
    const answer = answers.find(a => a.questaoId === currentQuestionId);
    return answer?.opcaoSelecionadaId;
  };

  // Todos os hooks devem estar no início, antes de qualquer return condicional
  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  // Redirecionar automaticamente para o resultado quando quiz for concluído
  useEffect(() => {
    if (quizCompleted && tentativaId) {
      const timer = setTimeout(() => {
        navigate(`/dashboard/quiz/result/${tentativaId}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [quizCompleted, tentativaId, navigate]);

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
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar quiz</h3>
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

  if (quizCompleted) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Quiz Concluído!</h3>
          <p className="text-gray-600 mb-4">Redirecionando para o resultado...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600">Quiz não encontrado</p>
        </div>
      </div>
    );
  }

  // Verificar se temos questões disponíveis ou se o quiz foi concluído
  if (!questions.length && !quizCompleted) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600">Carregando questões...</p>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#EBF1F4] px-4 sm:px-10 lg:px-64 py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-bold text-3xl text-gray-800 mb-2">Quiz Educacional!</h2>
        
rafted        {/* Points and Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Pontos: {useDynamicMode ? progresso.pontuacaoAtual : 0}
            </div>
            <span className="text-gray-600">
              {useDynamicMode 
                ? `Questão ${progresso.questaoAtual} de ${progresso.totalQuestoes}`
                : `Pergunta ${currentQuestion + 1} de ${questions.length}`
              }
            </span>
          </div>
          <div className="text-gray-600">
            {useDynamicMode 
              ? `${progresso.percentualCompleto.toFixed(1)}% Completo`
              : `${Math.round(((currentQuestion + 1) / questions.length) * 100)}% Completo`
            }
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: useDynamicMode 
                ? `${progresso.percentualCompleto}%`
                : `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 pr-4 flex-1">
              {currentQuestionData.textoQuestao}
            </h3>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                {typeof quiz?.categoria === 'string' ? quiz.categoria : quiz?.categoria?.nome || 'Matemática'}
              </div>
              {/* <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Bônus tempo: +0</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Question Component */}
        <Question
          options={currentQuestionData.opcoes.map(opt => ({ 
            id: opt.id, 
            text: opt.textoOpcao, 
            correta: opt.correta 
          }))}
          selectedOptionId={getCurrentAnswer()}
          onAnswer={(optionId) => handleAnswer(currentQuestionData.id, optionId)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === questions.length - 1}
          submitting={submitting}
        />

        {/* Feedback do Modo Dinâmico */}
        {useDynamicMode && feedback && mostrandoFeedback && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${
            feedback.correto 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
                feedback.correto ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {feedback.correto ? '✓' : '✗'}
              </div>
              <span className="font-bold text-lg">
                {feedback.correto ? 'Correto!' : 'Incorreto!'}
              </span>
            </div>
            <p className="text-sm mb-1">{feedback.mensagem}</p>
            <p className="text-sm font-medium">
              Resposta correta: {feedback.respostaCorretaTexto}
            </p>
            <p className="text-sm font-medium">
              Pontos ganhos: {feedback.pontosGanhos}
            </p>
            {progresso.totalQuestoes > 1 && (
              <p className="text-xs mt-2 text-gray-600">
                Pontuação atual: {progresso.pontuacaoAtual} pontos
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
