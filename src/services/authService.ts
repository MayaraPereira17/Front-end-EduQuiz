
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
    const response = await api.post('/api/Auth/register', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/api/Auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/Auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/api/Auth/profile', profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/api/Auth/change-password', { currentPassword, newPassword });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => !!localStorage.getItem('token'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
