import { Trophy, Users } from "lucide-react";
import { type DashboardTecnicoDTO } from "../../../../../services/tecnicoService";

interface StatsProps {
  dashboard: DashboardTecnicoDTO | null;
}

export function Stats({ dashboard }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
      <div className="w-full border border-black/10 flex items-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white justify-between gap-2 sm:gap-3">
        <div className="flex flex-col gap-1 sm:gap-2 flex-1">
          <span className="text-xs sm:text-sm text-[#4A5565]">Total de Alunos</span>
          <span className="text-xl sm:text-2xl md:text-3xl text-[#155DFC] font-bold">
            {dashboard?.totalAlunos || 0}
          </span>
          <span className="text-[#00A63E] text-xs">
            Alunos da Escolinha de Futebol
          </span>
        </div>

        <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" color="#155DFC" />
      </div>

      <div className="w-full border border-black/10 flex items-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white justify-between gap-2 sm:gap-3">
        <div className="flex flex-col gap-1 sm:gap-2 flex-1">
          <span className="text-xs sm:text-sm text-[#4A5565]">Performance Geral</span>
          <span className="text-xl sm:text-2xl md:text-3xl text-[#00A63E] font-bold">
            {dashboard?.performanceGeral || 0}%
          </span>
          <span className="text-[#00A63E] text-xs">
            Média de performance nos quizzes
          </span>
        </div>

        <Trophy className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" color="#D08700" />
      </div>
    </div>
  );
}
