
import type { RegisterData, UpdateProfileData, User } from '../types/auth';
import api from './api';

interface AuthService {
  register: (userData: RegisterData) => Promise<{ user: User }>;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  getProfile: () => Promise<User>;
  updateProfile: (profileData: UpdateProfileData) => Promise<User>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ message: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getCurrentUser: () => User | null;
}

export const authService: AuthService = {
  register: async (userData) => {
    // Adicionar ConfirmPassword se não estiver presente
    const dataWithConfirmPassword = {
      ...userData,
      ConfirmPassword: userData.ConfirmPassword || userData.password
    };
    const response = await api.post('/api/auth/register', dataWithConfirmPassword);
    
    // Extrair dados do formato da API (assumindo mesmo formato do login)
    if (response.data.data) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    
    // Fallback para formato antigo
    return response.data;
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      // Extrair dados do formato da API
      const { token, user } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Retornar no formato esperado pelo frontend
      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    
    // Se a resposta tem o formato com data
    if (response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/api/auth/profile', profileData);
    
    // Se a resposta tem o formato com data
    if (response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/api/auth/change-password', { currentPassword, newPassword });
    
    // Se a resposta tem o formato com data
    if (response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Verificar se o token não expirou (decodificar JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    
    try {
      return JSON.parse(user);
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  }
};
