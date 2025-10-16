// Utilitário para gerenciar redirecionamentos baseados no role do usuário

/**
 * Retorna o caminho correto para redirecionar o usuário baseado no seu role
 */
export const getUserRedirectPath = (role: string): string => {
  switch (role) {
    case "0": // Aluno
      return "/dashboard";
    case "1": // Professor
      return "/coach";
    case "2": // Técnico
      return "/admin";
    default:
      return "/dashboard"; // Fallback para aluno
  }
};

/**
 * Verifica se o usuário tem permissão para acessar uma rota específica
 */
export const hasPermissionForRoute = (userRole: string | number, allowedRoles: string[]): boolean => {
  // Converter userRole para string para comparação
  const userRoleString = String(userRole);
  return allowedRoles.includes(userRoleString);
};

/**
 * Mapeia roles para nomes legíveis
 */
export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "0":
      return "Aluno";
    case "1":
      return "Professor";
    case "2":
      return "Técnico";
    default:
      return "Usuário";
  }
};
