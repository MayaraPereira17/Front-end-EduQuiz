import api from './api';

// Interfaces baseadas no documento da API
export interface DashboardTecnicoDTO {
  nomeTecnico: string;
  emailTecnico: string;
  totalAlunos: number;
  performanceGeral: number;
  melhoresAlunos: MelhorAlunoDTO[];
}

export interface MelhorAlunoDTO {
  posicao: number;
  nome: string;
  sequencia: number;
  performance: number;
  totalQuizzes: number;
}

export interface AlunoRankingDTO {
  id: number;
  posicao: number;
  nome: string;
  email: string;
  idade: number;
  totalQuizzes: number;
  scoreGeral: number;
  ultimoQuiz: string | null;
}

export interface DesempenhoAlunoDTO {
  id: number;
  nome: string;
  totalQuizzes: number;
  ultimoQuiz: string | null;
  scoreGeral: number;
}

export interface PerfilTecnicoDTO {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  funcao: string;
  instituicao: string;
  totalAlunos: number;
  mediaTurma: number;
}

export interface RelatorioDesempenhoDTO {
  alunos: DesempenhoAlunoDTO[];
  totalAlunos: number;
  mediaGeral: number;
}

export interface AlunosResponseDTO {
  alunos: AlunoRankingDTO[];
  totalAlunos: number;
}

class TecnicoService {
  // 1. Dashboard do Técnico
  async getDashboard(): Promise<DashboardTecnicoDTO> {
    try {
      console.log('🔍 Buscando dashboard do técnico...');
      const response = await api.get('/api/tecnico/dashboard');
      console.log('✅ Dashboard obtido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao obter dashboard:', error);
      throw new Error(`Erro ao obter dashboard: ${error.response?.data?.message || error.message}`);
    }
  }

  // 2. Listar Alunos com Ranking
  async getAlunos(busca?: string): Promise<AlunosResponseDTO> {
    try {
      console.log('🔍 Buscando alunos do técnico...', busca ? `(busca: ${busca})` : '');
      const params = busca ? { busca } : {};
      const response = await api.get('/api/tecnico/alunos', { params });
      console.log('✅ Alunos obtidos:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao obter alunos:', error);
      throw new Error(`Erro ao obter alunos: ${error.response?.data?.message || error.message}`);
    }
  }

  // 3. Relatório de Desempenho
  async getRelatorioDesempenho(): Promise<RelatorioDesempenhoDTO> {
    try {
      console.log('🔍 Buscando relatório de desempenho...');
      const response = await api.get('/api/tecnico/relatorio-desempenho');
      console.log('✅ Relatório obtido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao obter relatório:', error);
      throw new Error(`Erro ao obter relatório: ${error.response?.data?.message || error.message}`);
    }
  }

  // 4. Perfil do Técnico
  async getPerfil(): Promise<PerfilTecnicoDTO> {
    try {
      console.log('🔍 Buscando perfil do técnico...');
      const response = await api.get('/api/tecnico/perfil');
      console.log('✅ Perfil obtido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao obter perfil:', error);
      throw new Error(`Erro ao obter perfil: ${error.response?.data?.message || error.message}`);
    }
  }

  // 5. Atualizar Perfil
  async updatePerfil(dadosPerfil: {
    nome: string;
    sobrenome: string;
    email: string;
  }): Promise<PerfilTecnicoDTO> {
    try {
      console.log('🔍 Atualizando perfil do técnico...', dadosPerfil);
      const response = await api.put('/api/tecnico/perfil', dadosPerfil);
      console.log('✅ Perfil atualizado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar perfil:', error);
      throw new Error(`Erro ao atualizar perfil: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const tecnicoService = new TecnicoService();
