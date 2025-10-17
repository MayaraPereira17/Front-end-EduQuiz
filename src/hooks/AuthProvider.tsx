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
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ redirectPath: string }> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      
      // Retornar o path de redirecionamento baseado no role
      const redirectPath = getUserRedirectPath(response.user.role);
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
      
      // Retornar o path de redirecionamento baseado no role
      const redirectPath = getUserRedirectPath(userData.role);
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
