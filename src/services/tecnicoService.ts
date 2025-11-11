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

export interface ProfessorDTO {
  id: number;
  nome: string;
  email: string;
  instituicao?: string;
  areaEspecializacao?: string;
  totalQuizzes?: number;
  dataCadastro: string;
}

export interface ProfessoresResponseDTO {
  professores: ProfessorDTO[];
  totalProfessores: number;
}

class TecnicoService {
  // 1. Dashboard do Técnico
  async getDashboard(): Promise<DashboardTecnicoDTO> {
    try {
      const response = await api.get('/api/tecnico/dashboard');
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao obter dashboard: ${error.response?.data?.message || error.message}`);
    }
  }

  // 2. Listar Alunos com Ranking
  async getAlunos(busca?: string): Promise<AlunosResponseDTO> {
    try {
      const params = busca ? { busca } : {};
      const response = await api.get('/api/tecnico/alunos', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao obter alunos: ${error.response?.data?.message || error.message}`);
    }
  }

  // 3. Relatório de Desempenho
  async getRelatorioDesempenho(): Promise<RelatorioDesempenhoDTO> {
    try {
      const response = await api.get('/api/tecnico/relatorio-desempenho');
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao obter relatório: ${error.response?.data?.message || error.message}`);
    }
  }

  // 4. Perfil do Técnico
  async getPerfil(): Promise<PerfilTecnicoDTO> {
    try {
      const response = await api.get('/api/tecnico/perfil');
      return response.data;
    } catch (error: any) {
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
      const response = await api.put('/api/tecnico/perfil', dadosPerfil);
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar perfil: ${error.response?.data?.message || error.message}`);
    }
  }

  // 6. Atualizar Aluno (pelo técnico)
  async updateAluno(alunoId: number, dadosAluno: {
    nome?: string;
    email?: string;
    idade?: number;
  }): Promise<AlunoRankingDTO> {
    try {
      const response = await api.put(`/api/tecnico/alunos/${alunoId}`, dadosAluno);
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar aluno: ${error.response?.data?.message || error.message}`);
    }
  }

  // 7. Deletar Aluno (pelo técnico)
  async deleteAluno(alunoId: number): Promise<void> {
    try {
      await api.delete(`/api/tecnico/alunos/${alunoId}`);
    } catch (error: any) {
      throw new Error(`Erro ao deletar aluno: ${error.response?.data?.message || error.message}`);
    }
  }

  // 8. Listar Professores
  async getProfessores(busca?: string): Promise<ProfessoresResponseDTO> {
    try {
      const params = busca ? { busca } : {};
      const response = await api.get('/api/tecnico/professores', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao obter professores: ${error.response?.data?.message || error.message}`);
    }
  }

  // 9. Atualizar Professor (pelo técnico)
  async updateProfessor(professorId: number, dadosProfessor: {
    nome?: string;
    email?: string;
    instituicao?: string;
    areaEspecializacao?: string;
  }): Promise<ProfessorDTO> {
    try {
      const response = await api.put(`/api/tecnico/professores/${professorId}`, dadosProfessor);
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar professor: ${error.response?.data?.message || error.message}`);
    }
  }

  // 10. Deletar Professor (pelo técnico)
  async deleteProfessor(professorId: number): Promise<void> {
    try {
      await api.delete(`/api/tecnico/professores/${professorId}`);
    } catch (error: any) {
      throw new Error(`Erro ao deletar professor: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const tecnicoService = new TecnicoService();
