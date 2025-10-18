import { Trash, TrendingUp } from "lucide-react";
import { SearchInput } from "../../../../components/searchInput";
import { Avatar } from "radix-ui";
import { getInitialLetter } from "../../../../utils/getInitialLetters";
import { adminStudentsRanking } from "../../../../mocks/adminStudentRanking";

export function RankingAdmin() {
  return (
    <div className="px-6">
      <div className="flex items-center mt-5 gap-2  justify-between mb-6">
        <div>
          <h4 className="text-3xl">Gerenciar Alunos e Ranking</h4>
          <span className="text-base text-[#4A5565]">
            Adicione alunos e acompanhe o desempenho nos quizz
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-black/10 mb-6 ">
        <SearchInput />
      </div>

      <div className="bg-white border border-black/10 p-6 rounded-xl mb-10">
        <div className="flex gap-2 items-center">
          <TrendingUp width={20} height={20} color="#2B7FFF" />
          <h5 className="text-base">Ranking dos Alunos</h5>
        </div>
        {adminStudentsRanking.map((student) => (
          <div
            key={student.id}
            className="border border-l-4 border-[#2B7FFF] rounded-xl flex justify-between p-4 mt-4"
          >
            <div className="flex items-center gap-4">
              <span>#{student.position}</span>

              <Avatar.Root className="flex items-center justify-center overflow-hidden select-none w-10 h-10 rounded-full bg-[#DBEAFE]">
                <Avatar.Fallback className="w-full h-full flex items-center justify-center text-sm text-[#155DFC]">
                  {getInitialLetter(student.name)}
                </Avatar.Fallback>
              </Avatar.Root>

              <div className="flex flex-col gap-0.5">
                <span className="text-lg">{student.name}</span>
                <span className="text-sm text-[#6A7282]">{student.email}</span>
                <span className="text-base text-[#4A5565]">
                  {student.age} anos
                </span>

                <div className="py-0.5 px-2 border border-black/10 flex flex-col self-start rounded-lg items-center text-center">
                  <span className="text-xs flex">
                    {student.quizzes} quizzes
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col text-end gap-0.5">
                <span className="text-[#3182BD] text-3xl font-bold">
                  {student.score}%
                </span>
                <span className="text-sm text-[#4A5565]">Score Geral</span>
                <span className="text-[#6A7282] text-xs">
                  Último quiz: {student.lastQuiz}
                </span>
              </div>

              <button>
                <Trash color="#E7000B" width={16} height={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
