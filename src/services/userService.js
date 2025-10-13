// services/userService.js
import api from './api';

export const userService = {
  // Obter lista de usuários (exemplo de admin)
  async getAllUsers() {
    try {
      const response = await api.get('/api/User');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuários');
    }
  },

  // Obter perfil de um usuário específico
  async getUserById(id) {
    try {
      const response = await api.get(`/api/User/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
  },

  // Atualizar dados do usuário (exemplo: nome, email, etc.)
  async updateUser(id, data) {
    try {
      const response = await api.put(`/api/User/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  },

  // Deletar usuário
  async deleteUser(id) {
    try {
      const response = await api.delete(`/api/User/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar usuário');
    }
  }
};
