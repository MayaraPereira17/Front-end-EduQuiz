// Utilitário para gerenciar redirecionamentos baseados no role do usuário

/**
 * Retorna o caminho correto para redirecionar o usuário baseado no seu role
 */
export const getUserRedirectPath = (user: any): string => {
  // Usar os campos booleanos da API
  if (user?.isTeacher) {
    return "/coach";
  } else if (user?.isAdmin) {
    return "/admin";
  } else if (user?.isStudent) {
    return "/dashboard";
  }
  
  // Fallback baseado no role numérico
  switch (String(user?.role)) {
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
export const hasPermissionForRoute = (user: any, allowedRoles: string[]): boolean => {
  // Verificar usando os campos booleanos primeiro
  if (user?.isTeacher && allowedRoles.includes("1")) {
    return true;
  }
  if (user?.isAdmin && allowedRoles.includes("2")) {
    return true;
  }
  if (user?.isStudent && allowedRoles.includes("0")) {
    return true;
  }
  
  // Fallback para role numérico
  const userRoleString = String(user?.role);
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
