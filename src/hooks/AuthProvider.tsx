// src/hooks/AuthProvider.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

import type { AuthContextType, User, RegisterData, UpdateProfileData } from '../types/auth';
import { authService } from '../services/authService';
import { getUserRedirectPath } from '../utils/authRedirect';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      
      if (currentUser && isAuth) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      authService.logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ redirectPath: string }> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      
      // Retornar o path de redirecionamento baseado no usuário
      const redirectPath = getUserRedirectPath(response.user);
      return { redirectPath };
    } catch (error) {
      throw error; // Re-throw para que o componente possa capturar
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ redirectPath: string }> => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      
      // Retornar o path de redirecionamento baseado no usuário
      const redirectPath = getUserRedirectPath(response.user);
      return { redirectPath };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (profileData: UpdateProfileData) => {
    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      // Salvar no localStorage para persistir entre sessões
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
