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
  const [useDynamicMode] = useState(true); // Reativado para feedback instantâneo
  const [tentativaId, setTentativaId] = useState<number | null>(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [feedback, setFeedback] = useState<{
    correto: boolean;
    pontosGanhos: number;
    respostaCorretaTexto: string;
    mensagem: string;
  } | null>(null);
  const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);
  const [readyToFinalize, setReadyToFinalize] = useState(false);
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
        // Modo dinâmico real: iniciar quiz
        const response = await studentService.startDynamicQuiz(parseInt(quizId));
        
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
      
      // Tratamento específico para quiz já concluído
      if (error.response?.status === 400 || error.response?.status === 409) {
        setError("Este quiz já foi concluído. Você só pode fazer cada quiz uma vez.");
        // Redirecionar para a lista de quizzes após 3 segundos
        setTimeout(() => {
          navigate('/dashboard/quizzes');
        }, 3000);
      } else {
        setError("Erro ao carregar quiz. Tente novamente.");
      }
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
    console.log('🖱️ Clique na opção detectado:', { questionId, optionId });
    console.log('📊 Questão atual:', currentQuestion);
    console.log('📊 Questões disponíveis:', questions.length);
    console.log('📊 Dados da questão atual:', questions[currentQuestion]);
    
    // Sempre apenas salvar resposta (modo dinâmico e tradicional)
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questaoId === questionId);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questaoId: questionId, opcaoSelecionadaId: optionId };
    } else {
      newAnswers.push({ questaoId: questionId, opcaoSelecionadaId: optionId });
    }
    
    console.log('💾 Respostas atualizadas:', newAnswers);
    setAnswers(newAnswers);
  };

  const handleConfirmAnswer = async (questionId: number, optionId: number) => {
    if (useDynamicMode && tentativaId) {
      // Modo dinâmico: responder após confirmar
      try {
        setSubmitting(true);
        
        console.log('🔄 Enviando resposta para API...', { tentativaId, questionId, optionId });
        
        const response = await studentService.answerQuestion(
          tentativaId,
          questionId,
          optionId
        );
        
        console.log('✅ Resposta da API recebida:', response);
        
        // Encontrar o ID da opção correta baseado no texto da resposta
        const correctOption = currentQuestionData.opcoes.find(opt => 
          opt.textoOpcao === response.respostaCorretaTexto
        );
        if (correctOption) {
          setCorrectOptionId(correctOption.id);
          console.log('🎯 Opção correta encontrada:', correctOption.id);
        } else {
          console.log('⚠️ Opção correta não encontrada para:', response.respostaCorretaTexto);
        }
        
        // Mostrar feedback após confirmar
        setFeedback({
          correto: response.respostaCorreta,
          pontosGanhos: response.pontosGanhos,
          respostaCorretaTexto: response.respostaCorretaTexto,
          mensagem: response.feedback
        });
        setMostrandoFeedback(true);
        
        console.log('📊 Feedback configurado:', {
          correto: response.respostaCorreta,
          pontosGanhos: response.pontosGanhos,
          respostaCorretaTexto: response.respostaCorretaTexto
        });
        
        // Verificar se quiz foi concluído
        if (response.quizConcluido) {
          // Quiz concluído - mostrar feedback e aguardar usuário finalizar
          console.log('🏁 Quiz concluído - mostrando feedback e aguardando finalização');
          setTentativaId(response.resultadoFinal?.tentativaId || tentativaId);
          setReadyToFinalize(true); // Marcar que está pronto para finalizar
          console.log('✅ readyToFinalize definido como true');
          // Não finalizar automaticamente - usuário deve clicar em "Finalizar Teste"
        } else if (response.proximaQuestao) {
          // Passar automaticamente para próxima questão após 2 segundos
          console.log('⏭️ Passando para próxima questão em 2 segundos...');
          setTimeout(() => {
            setQuestions([response.proximaQuestao!]);
            setMostrandoFeedback(false);
            setFeedback(null);
            setCorrectOptionId(null); // Limpar opção correta para próxima questão
            setReadyToFinalize(false); // Resetar estado de finalização
            
            // Atualizar progresso manualmente
            setProgresso(prev => ({
              ...prev,
              questaoAtual: prev.questaoAtual + 1,
              pontuacaoAtual: prev.pontuacaoAtual + (response.respostaCorreta ? response.pontosGanhos : 0),
              percentualCompleto: ((prev.questaoAtual + 1) / prev.totalQuestoes) * 100
            }));
            
            // Reiniciar timer para próxima questão (30 minutos)
            setTimeLeft(30 * 60);
            console.log('✅ Próxima questão carregada');
          }, 2000);
        }
        
      } catch (err: any) {
        console.error('❌ Erro ao responder questão:', err);
        console.error('❌ Status do erro:', err.response?.status);
        console.error('❌ Dados do erro:', err.response?.data);
        
        // Se a API retornou 200 OK mas o frontend está tratando como erro
        if (err.response?.status === 200) {
          console.log('⚠️ API retornou 200 OK, mas frontend está tratando como erro');
          // Não definir erro, continuar o fluxo
        } else if (err.response?.status === 400 && err.response?.data?.includes('Tentativa não encontrada ou já concluída')) {
          // Tentativa já foi concluída - finalizar o quiz
          console.log('🏁 Tentativa já concluída, finalizando quiz');
          setQuizCompleted(true);
          setTimeLeft(0);
        } else {
          setError(err.response?.data?.message || 'Erro ao responder questão');
        }
      } finally {
        setSubmitting(false);
      }
    }
  };


  const handleNext = () => {
    if (useDynamicMode) {
      // Verificar se está pronto para finalizar
      if (readyToFinalize) {
        console.log('🏁 Usuário clicou em Finalizar Teste');
        setQuizCompleted(true);
        setTimeLeft(0);
      } else {
        // Não está pronto para finalizar, apenas limpar feedback
        setMostrandoFeedback(false);
        setFeedback(null);
      }
    } else {
      // Modo tradicional
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmitQuiz();
      }
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
      console.log('📊 Respostas detalhadas:', JSON.stringify(answers, null, 2));
      console.log('📊 Quiz ID:', quizId);
      
      setSubmitting(true);
      const attempt = {
        respostas: answers
      };

      console.log('📊 Tentativa a ser enviada:', JSON.stringify(attempt, null, 2));
      const result = await studentService.submitQuizAttempt(parseInt(quizId!), attempt);
      
      console.log('✅ Quiz submetido com sucesso!');
      console.log('📊 Resultado:', result);
      
      setQuizCompleted(true);
      
      // Redirecionar para dashboard (aba quiz) após 2 segundos
      setTimeout(() => {
        navigate('/dashboard?tab=quiz');
      }, 2000);

    } catch (error: any) {
      console.error("Erro ao submeter quiz:", error);
      console.error("Status do erro:", error.response?.status);
      console.error("Mensagem do erro:", error.response?.data);
      
      // Tratamento específico para diferentes erros
      if (error.response?.status === 500) {
        setError("Erro interno no servidor ao processar suas respostas. Por favor, tente novamente ou entre em contato com o suporte.");
      } else if (error.response?.status === 409) {
        setError("Erro no servidor: Conflito com o sistema de ranking. O quiz foi processado, mas pode haver problemas na atualização do ranking.");
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.message || "Dados inválidos. Verifique suas respostas e tente novamente.");
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

  // Redirecionar automaticamente para o dashboard (aba quiz) quando quiz for concluído
  useEffect(() => {
    if (quizCompleted && tentativaId) {
      const timer = setTimeout(() => {
        navigate('/dashboard?tab=quiz');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [quizCompleted, tentativaId, navigate]);

  // Aviso de encerramento se fechar a página durante o quiz
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Só mostrar aviso se o quiz foi iniciado mas não foi concluído
      if (quizStarted && !quizCompleted && !submitting) {
        e.preventDefault();
        e.returnValue = "⚠️ ATENÇÃO: Se você fechar esta página, o quiz será automaticamente encerrado!";
        return "⚠️ ATENÇÃO: Se você fechar esta página, o quiz será automaticamente encerrado!";
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizStarted, quizCompleted, submitting]);

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
            correta: correctOptionId ? opt.id === correctOptionId : opt.correta 
          }))}
          selectedOptionId={getCurrentAnswer()}
          onAnswer={(optionId) => handleAnswer(currentQuestionData.id, optionId)}
          onConfirmAnswer={(optionId) => handleConfirmAnswer(currentQuestionData.id, optionId)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentQuestion === 0}
          isLast={useDynamicMode ? (readyToFinalize && mostrandoFeedback) : currentQuestion === questions.length - 1}
          submitting={submitting}
          showFeedback={!useDynamicMode} // Não mostrar feedback interno no modo dinâmico
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
