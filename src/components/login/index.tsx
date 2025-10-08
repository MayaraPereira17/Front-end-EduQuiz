import { useNavigate } from "react-router";

export function LoginForm() {
  let navigate = useNavigate();

  const handleNavigate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] flex flex-col pt-16 pb-16 px-20 rounded-4xl bg-white">
      <h4 className=" text-base font-medium mb-3 text-center">
        Entrar na Plataforma
      </h4>
      <p className="text-sm mb-9 text-center">
        Faça login para começar sua jornada educacional
      </p>

      <form className="flex flex-col">
        <label className="font-medium mb-1.5">Email</label>
        <input
          className="bg-[#E6E6E6] pl-3 py-2.5 rounded-xl"
          type="email"
          required
          placeholder="seu@email.com"
        ></input>

        <label className="font-medium mt-4 mb-1.5">Senha</label>
        <input
          className="bg-[#E6E6E6] pl-4 py-2.5 rounded-xl"
          type="password"
          required
          placeholder="***********"
        ></input>

        <button
          type="submit"
          className="font-bold mt-9 mb-12 bg-[#3182BD] text-white rounded-4xl py-2.5 px-24"
          onClick={handleNavigate}
        >
          Entrar
        </button>
      </form>

      <div className="flex gap-1">
        <span className=" text-sm text-[#717171]">Não tem uma conta?</span>
        <a className="font-medium text-sm">Cadastre-se aqui</a>
      </div>
    </div>
  );
}
