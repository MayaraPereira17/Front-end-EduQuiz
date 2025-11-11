import { Eye, EyeOff, CircleUser, Wrench } from "lucide-react";
import { RadioGroup } from "radix-ui";
import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";
import api from "../../../../services/api";

interface RegisterUserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function RegisterUserForm({ onSuccess, onCancel }: RegisterUserFormProps) {
  const [selectedUserType, setSelectedUserType] = useState<string | null>("Aluno");
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    cpf: "",
    dataNascimento: "",
    role: "0"
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Apenas Aluno e Professor podem ser cadastrados
  const userTypes = [
    {
      title: "Aluno",
      description: "Participe de quizzes e acompanhe seu progresso",
      icon: CircleUser,
    },
    {
      title: "Professor",
      description: "Crie e gerencie quizzes para seus alunos",
      icon: Wrench,
      fields: [
        { label: "Instituição de Ensino", placeholder: "Nome da Escola" },
        {
          label: "Área de Especialização",
          placeholder: "EX: Matemática, História, Ciências",
        },
      ],
    },
  ];

  const selectedType = userTypes.find((ut) => ut.title === selectedUserType);

  // Mapear tipo de usuário para código da API
  const getRoleCode = (userType: string): "0" | "1" => {
    switch (userType) {
      case "Aluno": return "0";
      case "Professor": return "1";
      default: return "0";
    }
  };

  // Validações
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string) => {
    if (!cpf) return true; // CPF é opcional
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nome é obrigatório";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Preparar dados para envio
      const registerData: RegisterData = {
        ...formData,
        role: getRoleCode(selectedUserType || "Aluno"),
        username: formData.username.toLowerCase().replace(/\s+/g, "."),
        ConfirmPassword: confirmPassword,
      };

      // Converter data de nascimento para formato ISO se fornecida
      if (formData.dataNascimento) {
        const date = new Date(formData.dataNascimento);
        registerData.dataNascimento = date.toISOString();
      }

      // Salvar token e usuário atuais para preservar sessão do técnico
      const currentToken = localStorage.getItem('token');
      const currentUser = localStorage.getItem('user');

      try {
        // Preparar dados com ConfirmPassword
        const dataWithConfirmPassword = {
          ...registerData,
          ConfirmPassword: registerData.ConfirmPassword || registerData.password
        };

        // Chamar API diretamente (não usar authService.register para não fazer login)
        await api.post('/api/auth/register', dataWithConfirmPassword);
      } finally {
        // Sempre restaurar sessão do técnico (não fazer login como usuário cadastrado)
        // Isso garante que mesmo se a API retornar um token, o técnico permanece logado
        if (currentToken) {
          localStorage.setItem('token', currentToken);
        } else {
          localStorage.removeItem('token');
        }
        if (currentUser) {
          localStorage.setItem('user', currentUser);
        } else {
          localStorage.removeItem('user');
        }
      }

      // Limpar formulário
      setFormData({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        cpf: "",
        dataNascimento: "",
        role: "0"
      });
      setConfirmPassword("");
      setSelectedUserType("Aluno");
      
      // Chamar callback de sucesso
      onSuccess();

    } catch (error: any) {
      let errorMessage = "Erro ao criar conta. Tente novamente.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Erro de rede. Verifique se a API está funcionando.";
      }
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#C6DBEF] min-h-full w-full flex justify-center items-start overflow-auto py-11 px-4">
      <div className="bg-white p-10 min-w-96 rounded-4xl max-w-2xl w-full">
        <div className="flex gap-5 items-center mb-6">
          <div className="space-y-2">
            <h4 className="text-base">Cadastrar Usuário</h4>
            <span className="text-sm text-[#404040]">
              Preencha os dados para cadastrar um novo usuário
            </span>
          </div>
        </div>

        {errors.submit && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          {/* Tipo de Usuário */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Usuário</label>
            <RadioGroup.Root
              value={selectedUserType || undefined}
              onValueChange={(value) => setSelectedUserType(value)}
              className="space-y-2.5"
              disabled={loading}
            >
              {userTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="flex items-center gap-2.5" key={item.title}>
                    <RadioGroup.Item
                      className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.title}
                    >
                      <RadioGroup.Indicator>
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      </RadioGroup.Indicator>
                    </RadioGroup.Item>

                    <Icon />

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-[#404040] text-sm">
                        {item.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </RadioGroup.Root>
          </div>

          {/* Campos específicos do tipo de usuário */}
          {selectedType && selectedType.fields && (
            <div className="mt-4 space-y-2">
              {selectedType.fields.map((field: any) => (
                <div className="flex flex-col gap-2" key={field.label}>
                  <label className="text-sm font-medium">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182] w-full"
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Nome Completo - dividido em firstName e lastName */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 text-sm w-full ${
                  errors.firstName ? "border-red-500" : "border-black/10"
                }`}
                disabled={loading}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Sobrenome</label>
              <input
                type="text"
                placeholder="Sobrenome"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 text-sm w-full ${
                  errors.lastName ? "border-red-500" : "border-black/10"
                }`}
                disabled={loading}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="usuario123"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 text-sm w-full ${
                errors.username ? "border-red-500" : "border-black/10"
              }`}
              disabled={loading}
            />
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 text-sm w-full ${
                errors.email ? "border-red-500" : "border-black/10"
              }`}
              disabled={loading}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">CPF (opcional)</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleInputChange("cpf", e.target.value)}
              className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 text-sm w-full ${
                errors.cpf ? "border-red-500" : "border-black/10"
              }`}
              disabled={loading}
            />
            {errors.cpf && (
              <span className="text-red-500 text-xs">{errors.cpf}</span>
            )}
          </div>

          {/* Data de Nascimento */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Data de Nascimento (opcional)</label>
            <input
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
              className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm w-full"
              disabled={loading}
            />
          </div>

          {/* Senhas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 pr-10 text-sm w-full ${
                    errors.password ? "border-red-500" : "border-black/10"
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Confirmar Senha</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-[#F3F3F5] border py-2.5 rounded-lg px-3 pr-10 text-sm w-full ${
                    errors.confirmPassword ? "border-red-500" : "border-black/10"
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 text-white bg-[#3182BD] rounded-4xl py-3 px-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Cadastrando..." : "Cadastrar Usuário"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

