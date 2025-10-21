import PlusImg from "../../../../assets/icons/plus-white.svg";
import { SearchInput } from "../../../../components/searchInput";
import bookImg from "../../../../assets/icons/blue-book.svg";
import checkedImg from "../../../../assets/icons/checked.svg";
import dateImg from "../../../../assets/icons/date.svg";
// import deleteImg from "../../../../assets/icons/delete.svg";
import editImg from "../../../../assets/icons/edit.svg";
import checkedSmallImg from "../../../../assets/icons/checked-small.svg";
import { Badge } from "../../../../components/badge";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { quizService, type Quiz, type DashboardStats } from "../../../../services/quizService";
import { useAuth } from "../../../../hooks/userAuth";

export function MyQuizzesCoach() {
  const navigate = useNavigate();
  const { } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    quizzesCriados: 0,
    mediaDosAlunos: 0,
    totalAlunos: 0,
    totalTentativas: 0,
    quizzesRecentes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Estados para o modal de confirmação (comentados temporariamente)
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [quizToDelete, setQuizToDelete] = useState<{ id: string; titulo: string } | null>(null);
  
  // Estado para o filtro de status
  const [statusFilter, setStatusFilter] = useState<'todos' | 'publicados' | 'despublicados'>('todos');

  // Carregar dados dos quizzes
  useEffect(() => {
    loadQuizzes();
    loadStats();
  }, []);

  const loadQuizzes = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const quizzesData = await quizService.getMyQuizzes(searchTerm);
      
      console.log('=== DADOS COMPLETOS DA API ===');
      console.log('Termo de busca:', searchTerm);
      console.log('Tipo de dados:', typeof quizzesData);
      console.log('É array?', Array.isArray(quizzesData));
      console.log('Quantidade de quizzes:', quizzesData?.length || 0);
      console.log('Dados brutos:', JSON.stringify(quizzesData, null, 2));
      
      if (Array.isArray(quizzesData) && quizzesData.length > 0) {
        console.log('=== PRIMEIRO QUIZ (EXEMPLO) ===');
        console.log('ID:', quizzesData[0].id);
        console.log('Título:', quizzesData[0].titulo);
        console.log('Público:', quizzesData[0].publico);
        console.log('Ativo:', quizzesData[0].ativo);
        console.log('Publicado:', quizzesData[0].publicado);
        console.log('Estrutura completa:', quizzesData[0]);
      }
      
      setQuizzes(quizzesData);
      return quizzesData; // Retornar os dados carregados
    } catch (err: any) {
      console.error('Erro ao carregar quizzes:', err);
      setError(err.message || 'Erro ao carregar quizzes');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await quizService.getDashboardStats();
      setStats(statsData);
    } catch (err: any) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  // Função de busca com debounce
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    // Limpar timeout anterior
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Mostrar indicador de busca
    setIsSearching(true);
    
    // Criar novo timeout para buscar após 500ms
    const newTimeout = setTimeout(async () => {
      console.log('Executando busca para:', value);
      await loadQuizzes(value);
      setIsSearching(false);
    }, 500);
    
    setSearchTimeout(newTimeout);
  };

  // Limpar timeout quando componente for desmontado
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const onHandleNewQuizz = () => {
    navigate("/coach/create-quizz");
  };

  const handleEditQuiz = (quizId: string) => {
    navigate(`/coach/quizz/edit-quizz?id=${quizId}`);
  };

  // Funções de exclusão comentadas temporariamente
  /*
  const handleDeleteQuiz = async (quizId: string, quizTitulo: string) => {
    console.log('🗑️ Tentando excluir quiz:', quizId);
    
    // Abrir modal de confirmação
    setQuizToDelete({ id: quizId, titulo: quizTitulo });
    setShowDeleteModal(true);
  };

  const confirmDeleteQuiz = async () => {
    if (!quizToDelete) return;
    
    console.log('✅ Usuário confirmou exclusão');
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      console.log('🔄 Chamando quizService.deleteQuiz...');
      const result = await quizService.deleteQuiz(quizToDelete.id);
      console.log('✅ Operação realizada:', result);
      
      console.log('🔄 Recarregando lista de quizzes...');
      await loadQuizzes(searchTerm); // Recarregar lista
      
      console.log('🔄 Recarregando estatísticas...');
      await loadStats(); // Recarregar estatísticas
      
      // Mostrar mensagem apropriada baseada na ação
      if (result.action === 'deleted') {
        setSuccess('✅ Quiz excluído permanentemente!');
      } else if (result.action === 'deactivated') {
        setSuccess('⚠️ Quiz desativado (preservando dados dos alunos)');
      } else {
        setSuccess(result.message || 'Operação realizada com sucesso!');
      }
      
      console.log('✅ Operação de exclusão concluída');
      
    } catch (err: any) {
      console.error('❌ Erro ao excluir quiz:', err);
      console.error('❌ Status do erro:', err.response?.status);
      console.error('❌ Dados do erro:', err.response?.data);
      
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao excluir quiz';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setQuizToDelete(null);
    }
  };

  const cancelDeleteQuiz = () => {
    console.log('❌ Usuário cancelou exclusão');
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };
  */

  const handleTogglePublish = async (quizId: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      console.log('Status atual do quiz:', currentStatus);
      console.log('Quiz ID:', quizId);
      
      if (currentStatus) {
        console.log('Despublicando quiz...');
        await quizService.unpublishQuiz(quizId);
        setSuccess('Quiz despublicado com sucesso! Agora está em modo rascunho.');
        console.log('Quiz despublicado com sucesso');
      } else {
        console.log('Publicando quiz...');
        await quizService.publishQuiz(quizId);
        setSuccess('Quiz publicado com sucesso! Agora está disponível para os alunos.');
        console.log('Quiz publicado com sucesso');
      }
      
      // Recarregar dados
      console.log('Recarregando quizzes...');
      console.log('Termo de busca atual:', searchTerm);
      const updatedQuizzes = await loadQuizzes(searchTerm);
      console.log('Quizzes recarregados:', updatedQuizzes);
      
      // Verificar se o quiz foi atualizado corretamente
      const updatedQuiz = updatedQuizzes.find(q => q.id?.toString() === quizId);
      if (updatedQuiz) {
        console.log('Quiz atualizado encontrado:', updatedQuiz);
        console.log('Status público:', updatedQuiz.publico);
        console.log('Status ativo:', updatedQuiz.ativo);
      } else {
        console.log('Quiz não encontrado na lista atualizada');
      }
      
      await loadStats();
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Erro ao alterar status do quiz:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao alterar status do quiz');
    } finally {
      setLoading(false);
    }
  };

  // Função de salvar como rascunho comentada (não utilizada)
  /*
  const handleSaveAsDraft = async (quizId: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      console.log('Salvando quiz como rascunho...', quizId);
      
      // Atualizar quiz para rascunho (publico: false)
      await quizService.updateQuiz(quizId, { publico: false });
      setSuccess('Quiz salvo como rascunho com sucesso!');
      console.log('Quiz salvo como rascunho');
      
      // Recarregar dados
      await loadQuizzes(searchTerm);
      await loadStats();
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Erro ao salvar como rascunho:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao salvar como rascunho');
    } finally {
      setLoading(false);
    }
  };
  */

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar quizzes baseado no status selecionado
  const getFilteredQuizzes = () => {
    if (statusFilter === 'todos') {
      return quizzes;
    }
    
    return quizzes.filter(quiz => {
      const isPublished = quiz.publico === true || quiz.publicado === true;
      
      if (statusFilter === 'publicados') {
        return isPublished;
      } else if (statusFilter === 'despublicados') {
        return !isPublished;
      }
      
      return true;
    });
  };

  const filteredQuizzes = getFilteredQuizzes();

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'Fácil';
      case 'Médio': return 'Médio';
      case 'Difícil': return 'Difícil';
      default: return difficulty;
    }
  };

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'success';
      case 'Médio': return 'warning';
      case 'Difícil': return 'default';
      default: return 'default';
    }
  };



  if (loading) {
    return (
      <div className="px-4 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="my-6 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-3xl ">Meus Quizzes</h4>
          <span className="text-base text-[#4A5565]">
            Gerencie e acompanhe seus quizzes criados
          </span>
        </div>

        <button
          className="flex gap-2.5 items-center justify-center border text-white border-black/10 py-1.5 px-3 rounded-lg text-sm bg-black "
          onClick={onHandleNewQuizz}
        >
          <img src={PlusImg} alt="" />
          Novo Quiz
        </button>
      </div>

      {/* Mensagens de feedback */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <p className="text-sm font-medium">Erro</p>
          </div>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium">Sucesso!</p>
          </div>
          <p className="text-sm mt-1">{success}</p>
        </div>
      )}

      {/* Sessão input */}
      <div className="mb-12">
        <div className="relative">
          <SearchInput
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            placeholder="Buscar quizzes..."
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            {isSearching ? 'Buscando...' : `Mostrando resultados para "${searchTerm}"`}
          </p>
        )}
      </div>

      {/* Mostrar estatísticas apenas quando não há busca ativa */}
      {!searchTerm && (
        <>
          {/* Estatísticas dos quizzes */}
      <div className="grid grid-cols-2 gap-3.5 mb-6">
        <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
          <img src={bookImg} alt="" />

          <div className="flex flex-col text-center">
                <span className="font-bold text-2xl">{stats.quizzesCriados}</span>

            <span className="text-[#4A5565] text-base">Total de Quizzes</span>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
          <img src={checkedImg} alt="" />

          <div className="flex flex-col text-center">
                <span className="font-bold text-2xl">{stats.totalTentativas}</span>

                <span className="text-[#4A5565] text-base">Total de Tentativas</span>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Cabeçalho específico para busca */}
      {searchTerm && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-2xl">Resultados da Busca</h4>
            <button
              onClick={() => handleSearch('')}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Ver todos os quizzes
            </button>
          </div>
          <span className="text-base text-[#4A5565]">
            {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} encontrado{filteredQuizzes.length !== 1 ? 's' : ''} para "{searchTerm}"
          </span>
        </div>
      )}

      {/* Lista de Quizzes */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <img src={bookImg} alt="" className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                {searchTerm ? `Nenhum quiz encontrado para "${searchTerm}"` : 'Nenhum quiz encontrado'}
              </p>
              <p className="text-sm">
                {searchTerm ? 'Tente ajustar sua busca ou limpar o filtro' : 'Crie seu primeiro quiz!'}
              </p>
            </div>
            {!searchTerm && (
              <button
                className="flex gap-2.5 items-center justify-center border text-white border-black/10 py-2 px-4 rounded-lg text-sm bg-black mx-auto"
                onClick={onHandleNewQuizz}
              >
                <img src={PlusImg} alt="" />
                Criar Primeiro Quiz
              </button>
            )}
            {searchTerm && (
              <button
                className="flex gap-2.5 items-center justify-center border text-gray-600 border-gray-300 py-2 px-4 rounded-lg text-sm bg-white mx-auto mt-2"
                onClick={() => handleSearch('')}
              >
                Limpar Busca
              </button>
            )}
          </div>
        ) : (
        <>
          {/* Filtro de Status com Segmented Control */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setStatusFilter('todos')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  statusFilter === 'todos'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setStatusFilter('publicados')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  statusFilter === 'publicados'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Publicados
              </button>
              <button
                onClick={() => setStatusFilter('despublicados')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  statusFilter === 'despublicados'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Despublicados
              </button>
            </div>
          </div>

          {/* Lista de Quizzes */}
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {statusFilter === 'todos' ? 'Nenhum quiz encontrado' : 
                 statusFilter === 'publicados' ? 'Nenhum quiz publicado' : 
                 'Nenhum quiz despublicado'}
              </h3>
              <p className="text-gray-500">
                {statusFilter === 'todos' ? 'Comece criando seu primeiro quiz!' : 
                 statusFilter === 'publicados' ? 'Publique alguns quizzes para vê-los aqui.' : 
                 'Todos os seus quizzes estão publicados.'}
              </p>
            </div>
          ) : (
            filteredQuizzes.map((quiz) => {
          // Verificar se o quiz está publicado (pode ser 'publico' ou 'publicado')
          const isPublished = quiz.publico === true || quiz.publicado === true;
          
          console.log('=== RENDERIZANDO QUIZ ===');
          console.log('Título:', quiz.titulo);
          console.log('ID:', quiz.id);
          console.log('Público:', quiz.publico);
          console.log('Publicado:', quiz.publicado);
          console.log('Ativo:', quiz.ativo);
          console.log('isPublished (calculado):', isPublished);
          return (
          <div key={quiz.id} className="bg-white border border-black/10 px-6 rounded-2xl py-5 !mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#0A0A0A] text-lg">{quiz.titulo}</span>

          <Badge
                variant={isPublished ? "success" : "default"}
                className={`gap-1 items-center justify-center ${
                  quiz.ativo === false ? 'bg-red-100 text-red-700 border-red-200' : ''
                }`}
                icon={isPublished ? <img src={checkedSmallImg} /> : undefined}
              >
                {isPublished ? "Publicado" : quiz.ativo === false ? "Desativado" : "Rascunho"}
          </Badge>
        </div>

            {quiz.descricao && (
        <div className="mb-10">
                <span className="text-[#4A5565] text-sm">
                  {quiz.descricao}
          </span>
        </div>
            )}

        <div className="space-x-2 mb-4">
          <Badge
                variant={getDifficultyVariant(quiz.dificuldade)}
            className="gap-1 items-center justify-center"
          >
                {getDifficultyLabel(quiz.dificuldade)}
          </Badge>
        </div>

        <div className="grid grid-cols-3 text-center py-2 mb-2.5">
          <div className="flex flex-col">
                <span className="font-bold text-base">{quiz.totalQuestoes || quiz.questoes.length}</span>
            <span className="text-[#4A5565]">Questões</span>
          </div>

          <div className="flex flex-col">
                <span className="font-bold text-base">{quiz.tempoLimite}min</span>
            <span className="text-[#4A5565]">Tempo</span>
          </div>

          <div className="flex flex-col">
                <span className="font-bold text-base">{quiz.totalTentativas || 0}</span>
            <span className="text-[#4A5565]">Tentativas</span>
          </div>
        </div>

            {quiz.dataCriacao && (
        <div className="flex items-center gap-2 mb-4">
          <img src={dateImg} alt="" />
          <span className="text-[#6A7282] text-xs">
                  Criado em {formatDate(quiz.dataCriacao)}
          </span>
        </div>
            )}

            <button 
              className="flex border justify-center w-full border-black/10 gap-2.5 text-sm rounded-lg py-1 mb-2.5"
              onClick={() => handleEditQuiz(quiz.id!.toString())}
            >
          <img src={editImg} alt="" />
          Editar
        </button>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {!isPublished && (
                  <button 
                    className="text-sm px-3 py-1 rounded border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                    onClick={() => handleTogglePublish(quiz.id!.toString(), false)}
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : 'Publicar'}
                  </button>
                )}
                
                {isPublished && (
                  <button 
                    className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
                    onClick={() => handleTogglePublish(quiz.id!.toString(), true)}
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : 'Despublicar'}
                  </button>
                )}
              </div>
              
              {/* Botão de excluir comentado temporariamente */}
              {/* <button 
                className="hover:bg-red-50 p-1 rounded transition-colors"
                onClick={() => handleDeleteQuiz(quiz.id!.toString(), quiz.titulo)}
                disabled={loading}
                title="Excluir quiz"
              >
                <img src={deleteImg} alt="Excluir" />
              </button> */}
        </div>
      </div>
          );
        })
          )}
        </>
      )}

      {/* Modal de Confirmação de Exclusão (comentado temporariamente) */}
      {false && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            {/* Ícone de Aviso */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
        </div>
        </div>

            {/* Título */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Confirmar Exclusão
            </h3>

            {/* Mensagem */}
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-3">
                Tem certeza que deseja excluir o quiz:
              </p>
              <p className="font-semibold text-gray-900 text-lg mb-4">
                {/* "{quizToDelete?.titulo}" */}
              </p>
              
              {/* Aviso sobre proteção de dados */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Proteção de Dados</p>
                    <p>Se alunos já fizeram tentativas, o quiz será apenas desativado para preservar os dados e histórico de desempenho.</p>
          </div>
          </div>
          </div>
        </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                // onClick={cancelDeleteQuiz}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                Cancelar
        </button>
              <button
                // onClick={confirmDeleteQuiz}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Excluir Quiz
                  </>
                )}
          </button>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
