import clsx from "clsx";
import { Star } from "lucide-react";
import { type DashboardTecnicoDTO } from "../../../../../services/tecnicoService";

interface BestStudentsProps {
  dashboard: DashboardTecnicoDTO | null;
}

export function BestStudents({ dashboard }: BestStudentsProps) {
  const students = dashboard?.melhoresAlunos || [];

  const podiumIcon = (podium: number) => {
    const baseClass =
      "w-10 h-10 flex items-center justify-center rounded-full text-xl";

    const backgroundClass = clsx({
      "bg-[#FEF9C2]": podium === 1, // amarelo claro
      "bg-[#F3F4F6]": podium === 2, // cinza claro
      "bg-[#FFEDD4]": podium === 3, // laranja claro
    });

    const emoji =
      podium === 1 ? "🥇" : podium === 2 ? "🥈" : podium === 3 ? "🥉" : "";

    if (!emoji) return null;

    return <div className={clsx(baseClass, backgroundClass)}>{emoji}</div>;
  };

  return (
    <div className="border border-black/10 bg-white p-4 sm:p-5 md:p-6 rounded-xl">
      <div className="flex gap-2 items-center mb-4 sm:mb-6 md:mb-7">
        <Star className="w-4 h-4 sm:w-5 sm:h-5" color="#F0B100" />
        <span className="text-sm sm:text-base md:text-lg font-medium">Melhores Alunos do Mês</span>
      </div>

      {/* 🥇🥈🥉 */}
      <div className="space-y-3 sm:space-y-4 h-full">
        {students.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
            Nenhum aluno encontrado
          </div>
        ) : (
          students.map((aluno) => {
            return (
              <div
                className="bg-[#F9FAFB] flex flex-col sm:flex-row justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg gap-2 sm:gap-0"
                key={aluno.posicao}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0">{podiumIcon(aluno.posicao)}</div>
                  <div>
                    <span className="block text-sm sm:text-base font-medium">{aluno.nome}</span>
                    <span className="block text-[#4A5565] text-xs sm:text-sm">
                      {aluno.sequencia} dias consecutivos de estudo
                    </span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-between sm:text-end gap-2">
                  <span className="text-sm sm:text-base md:text-lg text-[#00A63E] font-bold">
                    {aluno.performance}%
                  </span>
                  <div className="flex sm:flex-col gap-1">
                    <span className="text-xs sm:text-sm text-[#4A5565]">
                      {aluno.totalQuizzes}
                    </span>
                    <span className="text-xs sm:text-sm text-[#4A5565]"> quizzes</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
