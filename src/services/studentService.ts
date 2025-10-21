import api from './api';

// Interfaces para o aluno seguindo o GUIA_COMPLETO_ALUNO_FRONTEND.md

export interface StudentQuiz {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  dificuldade: string;
  tempoLimite: number;
  totalQuestoes: number;
  pontuacaoTotal: number;
  disponivel: boolean;
  quizConcluido: boolean;        // ← NOVO: indica se o quiz já foi concluído
  tentativasRestantes: number;   // ← NOVO: número de tentativas restantes
}

export interface StudentQuizDetail {
  id: number;
  titulo: string;
  descricao: string;
  categoria: {
    id: number;
    nome: string;
  };
  dificuldade: string;
  tempoLimite: number;
  maxTentativas: number;
  tentativasRestantes: number;
  totalQuestoes: number;
  criadoPor: string;
  dataCriacao: string;
  questoes: StudentQuestion[];
}

export interface StudentQuestion {
  id: number;
  textoQuestao: string;
  tipoQuestao: string;
  pontos: number;
  ordemIndice: number;
  opcoes: StudentOption[];
}

export interface StudentOption {
  id: number;
  textoOpcao: string;
  ordemIndice: number;
  correta?: boolean; // Indica se esta opção é a resposta correta
}

// Interfaces para Modo Dinâmico (mantendo layout atual)
export interface QuizStartResponse {
  tentativaId: number;
  quizId: number;
  tituloQuiz: string;
  questaoAtual: StudentQuestion;
  progresso: QuizProgress;
}

export interface QuestionAnswerResponse {
  respostaCorreta: boolean;
  pontosGanhos: number;
  respostaCorretaTexto: string;
  feedback: string;
  proximaQuestao?: StudentQuestion;
  quizConcluido: boolean;
  resultadoFinal?: QuizResult;
}

export interface QuizProgress {
  questaoAtual: number;
  totalQuestoes: number;
  percentualCompleto: number;
  pontuacaoAtual: number;
  tempoGasto: number;
}


export interface QuizAttempt {
  respostas: QuizAnswer[];
}

export interface QuizAnswer {
  questaoId: number;
  opcaoSelecionadaId: number;
}

export interface QuizResult {
  tentativaId: number;
  quizId: number;
  alunoId: number;
  pontuacaoTotal: number;
  pontuacaoMaxima: number;
  percentualAcerto: number;
  dataTentativa: string;
  tempoGasto: number;
  respostasCorretas: number;
  respostasIncorretas: number;
  respostas: QuizAnswerResult[];
  message: string;
  novoRecorde: boolean;
}

export interface QuizAnswerResult {
  questaoId: number;
  opcaoSelecionadaId: number;
  textoRespostaSelecionada: string; // Texto da opção que o aluno escolheu
  opcaoCorretaId: number; // ID da opção correta
  textoRespostaCorreta: string; // Texto da resposta correta
  correta: boolean;
  pontosObtidos: number;
  textoQuestao?: string;
  opcaoSelecionada?: string;
  opcaoCorreta?: string;
  pontos?: number;
}

export interface StudentDashboard {
  quizzesCompletos: number;
  mediaGeral: number;
  posicaoRanking: number;
  sequencia: number;
  pontos: number;
  totalUsuarios: number;
  quizzesRecentes: QuizRecent[];
}

export interface QuizRecent {
  quizId: number;
  titulo: string;
  categoria: string;
  percentualAcerto: number;
  dataConclusao: string;
}

export interface StudentProfile {
  id: number;
  nome: string;
  sobrenome: string;
  nomeCompleto: string;
  email: string;
  funcao: string;
  cpf: string;
  dataNascimento: string;
  dataCriacao: string;
  estatisticas: {
    quizzesCompletos: number;
    mediaGeral: number;
    totalPontos: number;
    posicaoRanking: number;
    sequenciaDias: number;
  };
}

export interface StudentPerformance {
  quizId: number;
  tituloQuiz: string;
  categoria: string;
  percentualAcerto: number;
  pontuacao: number;
  tempoGasto: number;
  dataConclusao: string;
}

export interface RecentActivity {
  id: number;
  tipo: string;
  descricao: string;
  data: string;
  icone: string;
  cor: string;
}

export interface RankingData {
  alunos: RankingItem[];
  totalAlunos: number;
  posicaoUsuarioLogado: number;
}

export interface RankingItem {
  posicao: number;
  usuarioId: number;
  nomeCompleto: string;
  avatar: string;
  pontos: number;
  quizzes: number;
  media: number;
  sequencia: number;
}

export interface Category {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export const studentService = {
  // 1. Dashboard do Aluno
  async getDashboard(): Promise<StudentDashboard> {
    const response = await api.get('/api/aluno/dashboard');
    return response.data.data || response.data;
  },

  // 2. Quizzes Disponíveis
  async getAvailableQuizzes(): Promise<StudentQuiz[]> {
    try {
      console.log('🔄 Buscando quizzes do endpoint /api/aluno/quizzes...');
      const response = await api.get('/api/aluno/quizzes');
      
      console.log('✅ Endpoint /api/aluno/quizzes funcionando!');
      console.log('📊 Status:', response.status);
      console.log('📦 Headers:', response.headers);
      console.log('📄 Data completa:', JSON.stringify(response.data, null, 2));
      console.log('🔍 Data.data:', response.data.data);
      console.log('🔍 Data direto:', response.data);
      
      // Tentar diferentes estruturas de resposta
      let result;
      if (response.data.data && Array.isArray(response.data.data)) {
        result = response.data.data;
        console.log('📋 Usando response.data.data (array)');
      } else if (Array.isArray(response.data)) {
        result = response.data;
        console.log('📋 Usando response.data (array direto)');
      } else {
        result = [];
        console.log('⚠️ Nenhum array encontrado, retornando array vazio');
      }
      
      console.log('🎯 Resultado final:', result);
      console.log('📊 Quantidade de quizzes encontrados:', result.length);
      
      // Verificar se os quizzes têm os campos necessários
      if (result.length > 0) {
        console.log('🔍 Verificando campos do primeiro quiz:');
        console.log('- quizConcluido:', result[0].quizConcluido);
        console.log('- tentativasRestantes:', result[0].tentativasRestantes);
        console.log('- Quiz completo:', result[0]);
      }
      
      return result;
    } catch (error: any) {
      console.error('❌ Erro ao buscar quizzes do endpoint /api/aluno/quizzes:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Se o endpoint específico do aluno não existir, tentar usar o endpoint do professor
      try {
        console.log('🔄 Tentando usar endpoint do professor como fallback...');
        const professorResponse = await api.get('/api/professor/quizzes');
        const allQuizzes = professorResponse.data.data || professorResponse.data;
        
        console.log('📊 Quizzes do professor encontrados:', allQuizzes.length);
        
        // Filtrar apenas quizzes públicos e ativos
        const publicQuizzes = allQuizzes.filter((quiz: any) => 
          (quiz.publico === true || quiz.publicado === true) && quiz.ativo !== false
        );
        
        console.log('📊 Quizzes públicos após filtro:', publicQuizzes.length);
        
        // Transformar para formato do aluno
        const studentQuizzes: StudentQuiz[] = publicQuizzes.map((quiz: any) => ({
          id: quiz.id,
          titulo: quiz.titulo,
          descricao: quiz.descricao,
          categoria: quiz.categoria || 'Geral',
          dificuldade: quiz.dificuldade,
          tempoLimite: quiz.tempoLimite,
          totalQuestoes: quiz.totalQuestoes || quiz.questoes?.length || 0,
          pontuacaoTotal: quiz.pontuacaoTotal || 100,
          disponivel: true,
          quizConcluido: quiz.quizConcluido || false,
          tentativasRestantes: quiz.tentativasRestantes || 1
        }));
        
        console.log('✅ Quizzes públicos transformados:', studentQuizzes);
        return studentQuizzes;
      } catch (fallbackError) {
        console.error('❌ Erro no fallback do professor:', fallbackError);
        
        // Se tudo falhar, retornar dados mockados
        const mockQuizzes: StudentQuiz[] = [
          {
            id: 1,
            titulo: "Matemática Básica",
            descricao: "Operações fundamentais de matemática",
            categoria: "Matemática",
            dificuldade: "Facil",
            tempoLimite: 30,
            totalQuestoes: 10,
            pontuacaoTotal: 100,
            disponivel: true,
            quizConcluido: false,
            tentativasRestantes: 1
          },
          {
            id: 2,
            titulo: "História do Brasil",
            descricao: "Conhecimentos sobre a história brasileira",
            categoria: "História",
            dificuldade: "Media",
            tempoLimite: 45,
            totalQuestoes: 15,
            pontuacaoTotal: 150,
            disponivel: true,
            quizConcluido: false,
            tentativasRestantes: 1
          }
        ];
        
        console.log('🔄 Usando dados mockados:', mockQuizzes);
        return mockQuizzes;
      }
    }
  },

  // 3. Detalhes do Quiz
  async getQuizForAttempt(quizId: number): Promise<StudentQuizDetail> {
    try {
      console.log('🔄 StudentService: Buscando detalhes do quiz...');
      console.log('📊 Quiz ID:', quizId);
      
      const response = await api.get(`/api/aluno/quizzes/${quizId}`);
      
      console.log('✅ StudentService: Quiz encontrado!');
      console.log('📊 Status:', response.status);
      console.log('📄 Data completa:', JSON.stringify(response.data, null, 2));
      
      const result = response.data.data || response.data;
      console.log('🎯 Resultado final:', result);
      
      return result;
    } catch (error: any) {
      console.error('❌ StudentService: Erro ao buscar quiz:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw error;
    }
  },

  // 4. Responder Quiz
  async submitQuizAttempt(quizId: number, attempt: QuizAttempt): Promise<QuizResult> {
    try {
      console.log('🔄 Submetendo tentativa de quiz...');
      console.log('📊 Quiz ID:', quizId);
      console.log('📊 Tentativa:', JSON.stringify(attempt, null, 2));
      console.log('📊 URL:', `/api/aluno/quizzes/${quizId}/responder`);
      
      const response = await api.post(`/api/aluno/quizzes/${quizId}/responder`, attempt);
      
      console.log('✅ Quiz respondido com sucesso!');
      console.log('📊 Status:', response.status);
      console.log('📄 Resposta:', response.data);
      
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('❌ Erro ao submeter quiz:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: `/api/aluno/quizzes/${quizId}/responder`
      });
      
      // Backend foi ajustado - removendo tratamento específico de ranking
      throw error;
    }
  },

  // 5. Ranking Geral
  async getRanking(params?: { busca?: string }): Promise<RankingData> {
    const response = await api.get('/api/aluno/ranking', { params });
    return response.data.data || response.data;
  },

  // 6. Perfil do Aluno
  async getProfile(): Promise<StudentProfile> {
    const response = await api.get('/api/aluno/perfil');
    return response.data.data || response.data;
  },

  async updateProfile(profileData: {
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento?: string;
  }): Promise<StudentProfile> {
    const response = await api.put('/api/aluno/perfil', profileData);
    return response.data.data || response.data;
  },

  // 7. Desempenho e Estatísticas
  async getPerformance(): Promise<StudentPerformance[]> {
    const response = await api.get('/api/aluno/desempenho');
    return response.data.data || response.data;
  },

  async getRecentActivities(): Promise<RecentActivity[]> {
    const response = await api.get('/api/aluno/atividades-recentes');
    return response.data.data || response.data;
  },

  // 8. Categorias
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/api/categorias');
    return response.data.data || response.data;
  },

  // 9. Sistema de Tentativas (Avançado)
  async startQuiz(quizId: number): Promise<{
    tentativaId: number;
    quizId: number;
    tituloQuiz: string;
    questaoAtual: StudentQuestion;
    progresso: {
      questaoAtual: number;
      totalQuestoes: number;
      percentualCompleto: number;
      pontuacaoAtual: number;
      tempoGasto: number;
    };
  }> {
    const response = await api.post('/api/aluno/quizzes/iniciar', { quizId });
    return response.data.data || response.data;
  },


  // Métodos removidos - não usamos mais endpoints de tentativas individuais
  // async getAttemptProgress(tentativaId: number): Promise<{...}> {
  //   const response = await api.get(`/api/aluno/tentativas/${tentativaId}/progresso`);
  //   return response.data.data || response.data;
  // },

  // async finishQuiz(tentativaId: number): Promise<{...}> {
  //   const response = await api.post(`/api/aluno/tentativas/${tentativaId}/finalizar`);
  //   return response.data.data || response.data;
  // },

  // Métodos de compatibilidade (para não quebrar código existente)
  async getStudentStats(): Promise<StudentDashboard> {
    return this.getDashboard();
  },

  // Método removido - não usamos mais endpoints de tentativas individuais
  // async getQuizResult(tentativaId: number): Promise<QuizResult> {
  //   const response = await api.get(`/api/aluno/tentativas/${tentativaId}`);
  //   return response.data.data || response.data;
  // },

  // Método removido - não usamos mais endpoints de tentativas individuais
  // async getAttemptHistory(params?: any): Promise<{ items: QuizResult[], currentPage: number, pageSize: number, totalPages: number, totalCount: number }> {
  //   const response = await api.get('/api/aluno/tentativas', { params });
  //   return response.data.data || response.data;
  // },

  // === MÉTODOS PARA MODO DINÂMICO ===

  // Iniciar quiz no modo dinâmico
  async startDynamicQuiz(quizId: number): Promise<QuizStartResponse> {
    const response = await api.post('/api/aluno/quizzes/iniciar', { quizId });
    return response.data.data || response.data;
  },

  // Responder questão individual no modo dinâmico
  async answerQuestion(tentativaId: number, questaoId: number, opcaoSelecionadaId: number): Promise<QuestionAnswerResponse> {
    try {
      console.log('🔄 Enviando resposta para API:', { tentativaId, questaoId, opcaoSelecionadaId });
      
      const response = await api.post(`/api/aluno/tentativas/${tentativaId}/responder`, {
        questaoId,
        opcaoSelecionadaId
      });
      
      console.log('✅ Resposta da API recebida:', response.data);
      console.log('📊 Status da resposta:', response.status);
      
      // Retornar diretamente response.data se não tiver .data aninhado
      const result = response.data.data || response.data;
      console.log('🎯 Resultado final:', result);
      
      return result;
    } catch (error: any) {
      console.error('❌ Erro na API answerQuestion:', error);
      console.error('❌ Status do erro:', error.response?.status);
      console.error('❌ Dados do erro:', error.response?.data);
      throw error;
    }
  },



};