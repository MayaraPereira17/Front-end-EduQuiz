import clsx from "clsx";
import { Star } from "lucide-react";

export function BestStudents() {
  const students = [
    {
      name: "João Silva",
      studyTime: "12 dias consecutivos de estudo",
      percentage: "92%",
      totalQuizzes: "15",
      podium: 1,
    },
    {
      name: "Maria Santos",
      studyTime: "8 dias consecutivos de estudo",
      percentage: "87%",
      totalQuizzes: "12",
      podium: 2,
    },
    {
      name: "Ana Oliveira",
      studyTime: "15 dias consecutivos de estudo",
      percentage: "85%",
      totalQuizzes: "14",
      podium: 3,
    },
  ];

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
        {students.map((item) => {
          return (
            <div
              className="bg-[#F9FAFB] flex justify-between px-4 py-2.5 rounded-lg"
              key={item.name}
            >
              <div className="flex items-center gap-4">
                <div>{podiumIcon(item.podium)}</div>
                <div>
                  <span className="block text-base">{item.name}</span>
                  <span className="block text-[#4A5565] text-sm">
                    {item.studyTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-end">
                <span className="text-base text-[#00A63E] font-bold">
                  {item.percentage}
                </span>
                <span className="text-sm text-[#4A5565]">
                  {item.totalQuizzes}
                </span>
                <span className="text-sm text-[#4A5565]"> quizzes</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
