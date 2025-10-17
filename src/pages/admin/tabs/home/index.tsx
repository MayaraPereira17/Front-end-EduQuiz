import { Users } from "lucide-react";
import { useAuth } from "../../../../hooks/userAuth";
import { Stats } from "./stats";
import { BestStudents } from "./bestStudents";

export function HomeAdmin() {
  const { user } = useAuth();
  return (
    <div className="h-full px-6 flex flex-col gap-6 overflow-auto">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h4 className="text-3xl">Dashboard Técnico</h4>
          <span className="text-base text-[#4A5565]">
            Bem-vindo, <strong>{user?.firstName} </strong>Acompanhe o progresso
            educacional dos seus alunos.
          </span>
        </div>

        <button className="flex border border-black/10 rounded-lg bg-white py-2.5 px-3 items-center gap-2 text-sm">
          <Users width={16} height={16} />
          Ver Ranking dos Alunos
        </button>
      </div>

      <Stats />

      <BestStudents />
    </div>
  );
}
