export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  cpf?: string;
  dataNascimento?: string;
  role: "0" | "1" | "2";
  isActive: boolean;
  createdAt: string;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf?: string;
  dataNascimento?: string;
  role: "0" | "1" | "2"; // Aluno, Professor, Técnico
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: string;
}


export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: UpdateProfileData) => Promise<void>;
  isAuthenticated: boolean;
}
