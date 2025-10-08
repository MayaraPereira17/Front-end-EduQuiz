import { Avatar } from "./avatarComponent";
import { rankingsMocks } from "../../../mocks/rankings";
import { RankingItem } from "./RankingItem";
import { SearchInput } from "../../../components/searchInput";

export function Ranking() {
  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-10 lg:px-14">
      <div className="mt-16 mb-12 max-w-[943px] mx-auto">
        <SearchInput />
      </div>

      <div className="text-center space-y-2 mb-14">
        <h2 className="font-bold text-3xl">Ranking geral</h2>
        <span className="text-[#404040] text-sm">
          Acompanhe o desempenho de todos os usuários da plataforma
        </span>
      </div>

      <div className="border border-[#D9D9D9] rounded-4xl bg-white mx-auto space-y-4 px-10 py-10 mb-16 ">
        {rankingsMocks.map((item) => {
          return (
            <div className="bg-[#FFF4E4] py-6 flex justify-between px-7 rounded-4xl border border-[#D9D9D9] items-center">
              <div className="flex items-center gap-8 font-bold">
                <span className="text-xl">#{item.position}</span>
                <div className="flex items-center gap-3">
                  <Avatar />

                  <span className="text-md">{item.name}</span>
                </div>
              </div>

              <div className="space-x-12 flex">
                <RankingItem value={item.points} description="Pontos" />

                <RankingItem value={item.quizzes} description="Quizzes" />

                <RankingItem value={item.average} description="Média" />

                <RankingItem value={item.sequence} description="Sequência" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
