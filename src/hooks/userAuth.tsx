// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from '../types/auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
