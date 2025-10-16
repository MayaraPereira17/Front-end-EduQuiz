import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const redirectPath = (response as any)?.redirectPath || "/dashboard";
      navigate(redirectPath);
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
    <div className="shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] flex flex-col pt-16 pb-16 px-20 rounded-4xl bg-white">
      <h4 className="text-base font-medium mb-3 text-center">
        Entrar na Plataforma
      </h4>
      <p className="text-sm mb-9 text-center">
        Faça login para começar sua jornada educacional
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <label className="font-medium mb-1.5">Email</label>
        <input
          className="bg-[#E6E6E6] pl-3 py-2.5 rounded-xl"
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="font-medium mt-4 mb-1.5">Senha</label>
        <input
          className="bg-[#E6E6E6] pl-4 py-2.5 rounded-xl"
          type="password"
          required
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="font-bold mt-9 mb-12 bg-[#3182BD] text-white rounded-4xl py-2.5 px-24"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="flex gap-1">
        <span className="text-sm text-[#717171]">Não tem uma conta?</span>
        <Link className="font-medium text-sm" to="/register">
          Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}
