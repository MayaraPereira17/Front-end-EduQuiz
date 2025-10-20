import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/userAuth';
import { getUserRedirectPath, hasPermissionForRoute } from '../../utils/authRedirect';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ["0", "1", "2"], // Por padrão, permite todos os roles
  redirectTo 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Sempre chamar useEffect no topo para evitar violação das regras dos hooks
  useEffect(() => {
    // Só executar redirecionamentos se não estiver carregando
    if (!loading) {
      // Se não está autenticado, redirecionar para login
      if (!isAuthenticated || !user) {
        navigate('/login');
        return;
      }

      // Se tem roles específicos definidos, verificar permissão
      if (allowedRoles.length > 0 && !hasPermissionForRoute(user, allowedRoles)) {
        // Se foi especificado um redirecionamento customizado
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          // Redirecionar para a tela correta baseada no usuário
          const correctPath = getUserRedirectPath(user);
          navigate(correctPath);
        }
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, redirectTo, navigate]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderizar nada (redirecionamento será feito no useEffect)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Se não tem permissão, não renderizar nada (redirecionamento será feito no useEffect)
  if (allowedRoles.length > 0 && !hasPermissionForRoute(user, allowedRoles)) {
    return null;
  }

  // Se passou em todas as verificações, renderizar o componente
  return <>{children}</>;
};
