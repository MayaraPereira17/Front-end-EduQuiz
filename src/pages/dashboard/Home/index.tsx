import trophyImg from "../../../assets/icons/trophy.svg";
import playImg from "../../../assets/play.png";
import { StudentStats } from "../../../components/studentStats";
import { studentRatingsHome } from "../../../mocks/studentRatings";
import { useAuth } from "../../../hooks/userAuth";

export function Home() {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-14">
      <div className="flex flex-col gap-4 pb-4 pt-9">
        <h4 className="font-bold text-5xl">Olá, {user?.firstName}!</h4>
        <span className="text-[#404040] text-sm">
          Continue aprendendo e melhorando sua pontuação.
        </span>
      </div>

      {/* Primeira linha de graficos */}
      <div className="grid grid-cols-5 gap-7">
        {studentRatingsHome.map((item, index) => (
          <StudentStats item={item} key={`${item.img}-${index}`} />
        ))}
      </div>

      {/* Segunda linha de graficos */}
      <div className="grid grid-cols-[2fr_1fr] gap-9 rounded-4xl pt-7">
        {/* Primeira Coluna */}
        <div className="flex flex-col min-h-60 justify-evenly bg-white rounded-4xl px-12">
          <div className="flex gap-4 items-center">
            <img src={playImg} alt="" />

            <span className="text-base">Iníciar Novo Quiz</span>
          </div>

          <span className="text-sm text-[#404040]">
            Teste os seus conhecimentos e melhore sua pontuação!
          </span>

          <button className="bg-[#EF6C00] text-white py-2 rounded-md">
            Começar Quiz
          </button>
        </div>

        {/* Segunda Coluna */}
        <div className="flex flex-col bg-white px-12 rounded-4xl justify-evenly relative ">
          <div className="absolute top-7">
            <img src={trophyImg} alt="" />
          </div>
          <div className="flex flex-col text-center">
            <span className="text-[#FFDE00] font-bold text-5xl">#15</span>
            <span>De 245 usúarios</span>
          </div>
          <button className="bg-[#3182BD] text-white py-2 rounded-md">
            Começar Quiz
          </button>
        </div>

        <div className="bg-white min-h-48 flex flex-col justify-evenly rounded-4xl ">
          <span className="px-8">Quizzes Recentes</span>

          <div className="border flex flex-row justify-between rounded-xl mx-12 px-5 items-center border-[#D9D9D9] py-2">
            <span className="text-base text-black font-bold">
              Matématica - Adição{" "}
            </span>

            <span className="text-[#0DA100] font-bold text-2xl ">90%</span>
          </div>
          <div className="border flex flex-row justify-between rounded-xl mx-12 px-5 items-center border-[#D9D9D9] py-2">
            <span className="text-base text-black font-bold">
              Matématica - Adição{" "}
            </span>
            <span className="text-[#C35800] font-bold text-2xl">45%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
