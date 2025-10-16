import api from './api';

export const avatarService = {
  /**
   * Faz upload de um arquivo de avatar
   */
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Se a resposta tem o formato com data
    if (response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  },

  /**
   * Atualiza o perfil incluindo avatarUrl
   */
  updateProfile: async (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    cpf?: string;
    dataNascimento?: string;
    avatarUrl?: string;
  }) => {
    const response = await api.put('/api/auth/profile', profileData);
    
    // Se a resposta tem o formato com data
    if (response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  },

  /**
   * Gera URL completa do avatar
   */
  getAvatarUrl: (avatarUrl?: string): string | null => {
    if (!avatarUrl) return null;
    
    // Se já é uma URL completa, retorna como está
    if (avatarUrl.startsWith('http')) {
      return avatarUrl;
    }
    
    // Se é um caminho relativo, monta a URL completa
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://eduquiz-back-end-production.up.railway.app';
    return `${baseUrl}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`;
  },

  /**
   * Valida se o arquivo é uma imagem válida
   */
  validateImageFile: (file: File): { isValid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Tipo de arquivo inválido. Use JPEG, PNG ou GIF.'
      };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Arquivo muito grande. Máximo 5MB.'
      };
    }

    return { isValid: true };
  }
};
