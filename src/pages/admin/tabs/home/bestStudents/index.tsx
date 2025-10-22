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
    <div className="border border-black/10 bg-white p-6 rounded-xl">
      <div className="flex gap-2 items-center mb-7">
        <Star color="#F0B100" width={20} height={20} />
        Melhores Alunos do Mês
      </div>

      {/* 🥇🥈🥉 */}
      <div className="space-y-4 h-full">
        {students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum aluno encontrado
          </div>
        ) : (
          students.map((aluno) => {
            return (
              <div
                className="bg-[#F9FAFB] flex justify-between px-4 py-2.5 rounded-lg"
                key={aluno.posicao}
              >
                <div className="flex items-center gap-4">
                  <div>{podiumIcon(aluno.posicao)}</div>
                  <div>
                    <span className="block text-base">{aluno.nome}</span>
                    <span className="block text-[#4A5565] text-sm">
                      {aluno.sequencia} dias consecutivos de estudo
                    </span>
                  </div>
                </div>
                <div className="flex flex-col text-end">
                  <span className="text-base text-[#00A63E] font-bold">
                    {aluno.performance}%
                  </span>
                  <span className="text-sm text-[#4A5565]">
                    {aluno.totalQuizzes}
                  </span>
                  <span className="text-sm text-[#4A5565]"> quizzes</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
