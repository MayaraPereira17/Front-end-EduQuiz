import api from './api';

export interface Opcao {
  id?: number;
  textoOpcao: string;
  correta: boolean;
  ordemIndice: number;
}

export interface Questao {
  id?: number;
  textoQuestao: string; // Campo correto do banco
  tipoQuestao: "MultiplaEscolha";
  pontos: number; // Campo correto do banco
  ordemIndice: number;
  ativo?: boolean;
  opcoes: Opcao[];
}

export interface Quiz {
  id?: number;
  titulo: string;
  descricao?: string;
  categoriaId?: number;
  categoria?: string;
  dificuldade: "Facil" | "Media" | "Dificil";
  tempoLimite: number; // em minutos
  maxTentativas?: number;
  ativo?: boolean;
  publico?: boolean;
  dataCriacao?: string;
  dataAtualizacao?: string;
  totalQuestoes?: number;
  totalTentativas?: number;
  publicado?: boolean;
  mediaPontuacao?: number;
  questoes: Questao[];
}

export interface CreateQuizData {
  titulo: string;
  descricao?: string;
  categoriaId: number;
  dificuldade: string;
  tempoLimite: number;
  maxTentativas?: number;
  publico?: boolean;
  questoes: Questao[];
}

export interface UpdateQuizData {
  titulo?: string;
  descricao?: string;
  categoriaId?: number;
  dificuldade?: string;
  tempoLimite?: number;
  maxTentativas?: number;
  ativo?: boolean;
  publico?: boolean;
  questoes?: Questao[];
}

export interface DashboardStats {
  quizzesCriados: number;
  mediaDosAlunos: number;
  totalAlunos: number;
  totalTentativas: number;
  quizzesRecentes: Quiz[];
}

export interface QuizStatistics {
  quizId: number;
  tituloQuiz: string;
  totalTentativas: number;
  totalAlunos: number;
  mediaPontuacao: number;
  mediaTempo: number;
  totalQuestoes: number;
  estatisticasQuestoes: QuestionStats[];
  tentativasRecentes: Attempt[];
}

export interface QuestionStats {
  questaoId: number;
  textoQuestao: string;
  totalRespostas: number;
  respostasCorretas: number;
  respostasErradas: number;
  percentualAcerto: number;
}

export interface Attempt {
  tentativaId: number;
  nomeAluno: string;
  pontuacao: number;
  pontuacaoMaxima: number;
  percentual: number;
  tempoGasto: number;
  dataConclusao: string;
}

export interface Category {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export const quizService = {
  // Buscar todos os quizzes do professor logado
  async getMyQuizzes(busca?: string): Promise<Quiz[]> {
    const params = busca ? { busca } : {};
    const response = await api.get('/api/professor/quizzes', { params });
    
    console.log('=== RESPOSTA BRUTA DA API ===');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data completa:', JSON.stringify(response.data, null, 2));
    console.log('Data.data:', response.data.data);
    console.log('Data direto:', response.data);
    
    const result = response.data.data || response.data;
    console.log('Resultado final:', result);
    
    return result;
  },

  // Buscar quiz específico por ID
  async getQuizById(quizId: string): Promise<Quiz> {
    const response = await api.get(`/api/professor/quizzes/${quizId}`);
    return response.data.data || response.data;
  },

  // Criar novo quiz
  async createQuiz(quizData: CreateQuizData): Promise<Quiz> {
    const response = await api.post('/api/professor/quizzes', quizData);
    return response.data.data || response.data;
  },

  // Atualizar quiz existente
  async updateQuiz(quizId: string, quizData: UpdateQuizData): Promise<Quiz> {
    const response = await api.put(`/api/professor/quizzes/${quizId}`, quizData);
    return response.data.data || response.data;
  },

  // Deletar quiz (ou desativar se houver tentativas)
  async deleteQuiz(quizId: string): Promise<{ 
    success: boolean; 
    message: string; 
    action: 'deleted' | 'deactivated';
    hasAttempts?: boolean;
  }> {
    console.log('🗑️ quizService.deleteQuiz chamado com ID:', quizId);
    console.log('🔄 Fazendo requisição DELETE para:', `/api/professor/quizzes/${quizId}`);
    
    try {
      const response = await api.delete(`/api/professor/quizzes/${quizId}`);
      console.log('✅ Resposta da API para deleteQuiz:', response);
      console.log('📊 Status:', response.status);
      console.log('📊 Data:', response.data);
      
      // Retornar informações sobre a ação realizada
      const responseData = response.data.data || response.data;
      return {
        success: true,
        message: responseData.message || 'Operação realizada com sucesso',
        action: responseData.action || 'deleted',
        hasAttempts: responseData.hasAttempts || false
      };
    } catch (error: any) {
      console.error('❌ Erro na API deleteQuiz:', error);
      console.error('❌ Status do erro:', error.response?.status);
      console.error('❌ Dados do erro:', error.response?.data);
      throw error;
    }
  },

  // Publicar quiz
  async publishQuiz(quizId: string): Promise<Quiz> {
    console.log('=== PUBLICANDO QUIZ ===');
    console.log('Quiz ID:', quizId);
    const response = await api.post(`/api/professor/quizzes/${quizId}/publicar`);
    console.log('Resposta da API (publicar):', JSON.stringify(response.data, null, 2));
    const result = response.data.data || response.data;
    console.log('Resultado final (publicar):', result);
    return result;
  },

  // Despublicar quiz
  async unpublishQuiz(quizId: string): Promise<Quiz> {
    console.log('=== DESPUBLICANDO QUIZ ===');
    console.log('Quiz ID:', quizId);
    const response = await api.post(`/api/professor/quizzes/${quizId}/despublicar`);
    console.log('Resposta da API (despublicar):', JSON.stringify(response.data, null, 2));
    const result = response.data.data || response.data;
    console.log('Resultado final (despublicar):', result);
    return result;
  },

  // Buscar estatísticas do dashboard do professor
  async getDashboardStats(): Promise<any> {
    const response = await api.get('/api/professor/dashboard');
    return response.data.data || response.data;
  },

  // Buscar estatísticas de um quiz específico
  async getQuizStatistics(quizId: string): Promise<any> {
    const response = await api.get(`/api/professor/quizzes/${quizId}/estatisticas`);
    return response.data.data || response.data;
  },

  // Buscar tentativas de um quiz específico
  async getQuizAttempts(quizId: string): Promise<any[]> {
    const response = await api.get(`/api/professor/quizzes/${quizId}/tentativas`);
    return response.data.data || response.data;
  },

  // Buscar estatísticas das questões de um quiz
  async getQuestionStatistics(quizId: string): Promise<any[]> {
    const response = await api.get(`/api/professor/quizzes/${quizId}/estatisticas/questoes`);
    return response.data.data || response.data;
  },

  // Buscar categorias disponíveis
  async getCategories(): Promise<any[]> {
    const response = await api.get('/api/professor/categorias');
    return response.data.data || response.data;
  },

  // Buscar perfil do professor
  async getProfile(): Promise<any> {
    const response = await api.get('/api/professor/perfil');
    return response.data.data || response.data;
  },

  // Atualizar perfil do professor
  async updateProfile(profileData: any): Promise<any> {
    const response = await api.put('/api/professor/perfil', profileData);
    return response.data.data || response.data;
  }
};
