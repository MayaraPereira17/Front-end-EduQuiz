import { Trophy, Users } from "lucide-react";
import { type DashboardTecnicoDTO } from "../../../../../services/tecnicoService";

interface StatsProps {
  dashboard: DashboardTecnicoDTO | null;
}

export function Stats({ dashboard }: StatsProps) {
  return (
    <div className="grid grid-cols-2 w-1/2 gap-6">
      <div className="w-full border border-black/10 flex items-center p-6 rounded-2xl bg-white justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#4A5565]">Total de Alunos</span>
          <span className="text-2xl text-[#155DFC] font-bold">
            {dashboard?.totalAlunos || 0}
          </span>
          <span className="text-[#00A63E] text-xs">
            Alunos da Escolinha de Futebol
          </span>
        </div>

        <Users width={32} height={32} color="#155DFC" />
      </div>

      <div className="w-full border border-black/10 flex items-center p-6 rounded-2xl bg-white justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#4A5565]">Performance Geral</span>
          <span className="text-2xl text-[#00A63E] font-bold">
            {dashboard?.performanceGeral || 0}%
          </span>
          <span className="text-[#00A63E] text-xs">
            Média de performance nos quizzes
          </span>
        </div>

        <Trophy width={32} height={32} color="#D08700" />
      </div>
    </div>
  );
}
