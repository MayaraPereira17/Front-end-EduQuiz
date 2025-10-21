import { TitleWithGoBack } from "../../components/coach/titleWithGoBack";
import { CustomSelect } from "../../components/select";
import BookBlackIcon from "../../assets/icons/book-black.svg";
import { CreateQuizzQuestion } from "../../components/createQuizzQuestion";
import { useQuestoesStore } from "../../store/useQuestoesStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { quizService, type CreateQuizData, type Category } from "../../services/quizService";
import { useAuth } from "../../hooks/userAuth";

export function CreateCoachQuizz() {
  const navigate = useNavigate();
  const { } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const {
    titulo,
    descricao,
    dificuldade,
    tempoLimite,
    questoes,
    setTitulo,
    setDescricao,
    setDificuldade,
    setTempoLimite,
    resetQuiz,
  } = useQuestoesStore();

  // Carregar categorias ao montar o componente
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await quizService.getCategories();
      setCategories(categoriesData);
    } catch (err: any) {
      setError('Erro ao carregar categorias');
    }
  };

  const handleSaveQuiz = async (isDraft: boolean = false) => {
    // Validações obrigatórias conforme guia
    if (!titulo.trim()) {
      setError('Título é obrigatório');
      return;
    }

    if (titulo.trim().length > 200) {
      setError('Título deve ter no máximo 200 caracteres');
      return;
    }

    if (!selectedCategoryId || selectedCategoryId <= 0) {
      setError('Categoria é obrigatória');
      return;
    }

    if (!dificuldade) {
      setError('Dificuldade é obrigatória');
      return;
    }

    const tempoLimiteNum = parseInt(tempoLimite);
    if (!tempoLimite || isNaN(tempoLimiteNum) || tempoLimiteNum <= 0 || tempoLimiteNum > 40) {
      setError('Tempo limite deve ser um número entre 1 e 40 minutos');
      return;
    }

    if (questoes.length === 0) {
      setError('Adicione pelo menos uma questão');
      return;
    }

    // Validar se todas as questões estão completas
    const incompleteQuestions = questoes.some(q => 
      !q.pergunta.trim() || 
      !q.opcoes.A.trim() || 
      !q.opcoes.B.trim() || 
      !q.opcoes.C.trim() || 
      !q.opcoes.D.trim() || 
      !q.respostaCorreta
    );

    if (incompleteQuestions) {
      setError('Todas as questões devem estar completas com pergunta, opções e resposta correta');
      return;
    }

    // Validar se pelo menos uma opção está marcada como correta em cada questão
    const questionsWithoutCorrectAnswer = questoes.some(q => {
      const hasCorrectAnswer = q.respostaCorreta && 
        (q.respostaCorreta === 'A' || q.respostaCorreta === 'B' || q.respostaCorreta === 'C' || q.respostaCorreta === 'D');
      return !hasCorrectAnswer;
    });

    if (questionsWithoutCorrectAnswer) {
      setError('Cada questão deve ter pelo menos uma resposta correta selecionada');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Construir payload exatamente conforme banco
      const quizData: CreateQuizData = {
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined, // Opcional conforme guia
        categoriaId: selectedCategoryId!,
        dificuldade: dificuldade === 'easy' ? 'Fácil' : dificuldade === 'medium' ? 'Médio' : 'Difícil',
        tempoLimite: tempoLimiteNum, // Usar valor validado
        maxTentativas: 3, // Padrão conforme guia
        publico: !isDraft, // true se não for rascunho
        questoes: questoes.map((q, index) => ({
          textoQuestao: q.pergunta.trim(), // Campo correto do banco
          tipoQuestao: "MultiplaEscolha" as const,
          pontos: 10, // Campo correto do banco
          ordemIndice: index + 1,
          opcoes: [
            {
              textoOpcao: q.opcoes.A.trim(),
              correta: q.respostaCorreta === "A",
              ordemIndice: 1
            },
            {
              textoOpcao: q.opcoes.B.trim(),
              correta: q.respostaCorreta === "B",
              ordemIndice: 2
            },
            {
              textoOpcao: q.opcoes.C.trim(),
              correta: q.respostaCorreta === "C",
              ordemIndice: 3
            },
            {
              textoOpcao: q.opcoes.D.trim(),
              correta: q.respostaCorreta === "D",
              ordemIndice: 4
            }
          ]
        }))
      };

      console.log('Payload sendo enviado:', JSON.stringify(quizData, null, 2));

      try {
        const result = await quizService.createQuiz(quizData);
        console.log('Quiz criado com sucesso:', result);
        
        setSuccess(true);
        setTimeout(() => {
          resetQuiz();
          navigate('/coach/quizz');
        }, 2000);
      } catch (apiError: any) {
        console.error('Erro da API:', apiError);
        console.error('Resposta da API:', apiError.response?.data);
        console.error('Status:', apiError.response?.status);
        
        // Tratar erros específicos conforme guia
        if (apiError.response?.status === 400) {
          const errorData = apiError.response.data;
          if (errorData.errors && Array.isArray(errorData.errors)) {
            setError(`Erro de validação: ${errorData.errors.join(', ')}`);
          } else if (errorData.message) {
            setError(`Erro: ${errorData.message}`);
          } else {
            setError('Erro de validação. Verifique os dados enviados.');
          }
        } else if (apiError.response?.status === 404) {
          setError('Categoria não encontrada. Selecione uma categoria válida.');
        } else if (apiError.response?.status === 500) {
          setError('Erro interno do servidor. Tente novamente em alguns instantes.');
        } else {
          setError(apiError.message || 'Erro ao criar quiz');
        }
        throw apiError;
      }

    } catch (err: any) {
      // Erro já tratado acima ou erro de rede
      if (!err.response) {
        setError('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 h-full  overflow-auto">
      <TitleWithGoBack
        title="Criar Novo Quiz"
        subtitle="Crie um quiz personalizado para seus alunos"
      />

      <div className="space-y-6">
        <div className="bg-white py-6 px-6 rounded-xl">
          <div className="flex items-center gap-1 mb-8">
            <img src={BookBlackIcon} alt="" />
            <h5 className=" text-base text-[#0A0A0A]">Informações do Quiz</h5>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col ">
              <span className="text-sm">Título do Quiz*</span>

              <input
                type="text"
                placeholder="Ex: Matemática - Equações do 2º Grau"
                maxLength={200}
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <span className="text-xs text-gray-500 mt-1">
                {titulo.length}/200 caracteres
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm">Descrição</span>

              <textarea
                name=""
                id=""
                placeholder="Descrição opcional do quiz..."
                maxLength={500}
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <span className="text-xs text-gray-500 mt-1">
                {descricao.length}/500 caracteres
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col pt-[1.2px]">
                <span className="text-sm">Categoria*</span>

                <CustomSelect
                  value={selectedCategoryId?.toString() || ""}
                  onValueChange={(value) => setSelectedCategoryId(parseInt(value))}
                  placeholder="Selecione a categoria"
                  options={categories.map(cat => ({
                    value: cat.id.toString(),
                    label: cat.nome
                  }))}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">Dificuldade*</span>
                <CustomSelect
                  value={dificuldade}
                  onValueChange={(value) => setDificuldade(value as "easy" | "medium" | "hard" | "")}
                  placeholder="Selecione a dificuldade"
                  options={[
                    { value: "easy", label: "Fácil" },
                    { value: "medium", label: "Médio" },
                    { value: "hard", label: "Difícil" }
                  ]}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">Tempo Limite (minutos)</span>

                <input
                  type="number"
                  min={1}
                  max={40}
                  className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                  placeholder="EX: 30"
                  value={tempoLimite}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove tudo que não for número
                    value = value.replace(/\D/g, "");

                    // Limita até 2 dígitos
                    if (value.length > 2) value = value.slice(0, 2);

                    // Limita o valor máximo em 40
                    if (Number(value) > 40) value = "40";

                    setTempoLimite(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <CreateQuizzQuestion />

        {/* Mensagens de feedback */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-sm font-medium">Erro</p>
            </div>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm font-medium">Sucesso!</p>
            </div>
            <p className="text-sm mt-1">Quiz criado com sucesso! Redirecionando...</p>
          </div>
        )}

        {/* Indicador de progresso */}
        {loading && (
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p className="text-sm font-medium">Criando quiz...</p>
            </div>
            <p className="text-sm mt-1">Aguarde enquanto processamos seus dados.</p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-4 justify-end pb-6">
          <button
            type="button"
            onClick={() => navigate('/coach/quizz')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Cancelar
          </button>
          
          <button
            type="button"
            onClick={() => handleSaveQuiz(true)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Rascunho'}
          </button>
          
          <button
            type="button"
            onClick={() => handleSaveQuiz(false)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Criando...
              </>
            ) : (
              'Criar Quiz'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
