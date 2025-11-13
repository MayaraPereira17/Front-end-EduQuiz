import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import { AxiosError } from "axios";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // previne recarregamento da página
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password); // login via hook
      // Redirecionar para a tela correta baseada no role do usuário
      navigate(response.redirectPath);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const apiMessage = axiosError.response?.data?.message;

      setError(
        apiMessage || "Erro ao fazer login. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] flex flex-col pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 rounded-2xl sm:rounded-3xl md:rounded-4xl bg-white mb-6 sm:mb-10">
      <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-center">
        Entrar na Plataforma
      </h4>
      <p className="text-xs sm:text-sm mb-6 sm:mb-8 md:mb-9 text-center">
        Faça login para começar sua jornada educacional
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4">{error}</div>}

        <label className="font-medium mb-1.5 text-sm sm:text-base">Email</label>
        <input
          className="bg-[#E6E6E6] pl-3 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base"
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="font-medium mt-3 sm:mt-4 mb-1.5 text-sm sm:text-base">Senha</label>
        <input
          className="bg-[#E6E6E6] pl-3 sm:pl-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base"
          type="password"
          required
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="font-bold mt-6 sm:mt-8 md:mt-9 mb-6 sm:mb-10 md:mb-12 bg-[#3182BD] text-white rounded-3xl sm:rounded-4xl py-2.5 px-8 sm:px-16 md:px-20 lg:px-24 w-full sm:w-auto mx-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

    </div>
  );
}
