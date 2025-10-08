import analyticsImg from "../../../assets/icons/analytics.svg";
import trophyImg from "../../../assets/icons/trophy.svg";
import riseImg from "../../../assets/icons/rise.svg";
import bookImg from "../../../assets/icons/book-blue.svg";
import starImg from "../../../assets/icons/star.svg";
import playImg from "../../../assets/play.png";

type IconKey = "analytics" | "trophy" | "rise" | "book" | "star";

export function Home() {
  const studentRatings: {
    value: string | number;
    description: string;
    img: IconKey;
  }[] = [
    {
      img: "book",
      value: 24,
      description: "Quizzes completos",
    },
    {
      img: "analytics",
      value: "78.5%",
      description: "Média geral",
    },
    {
      img: "trophy",
      value: 24,
      description: "Quizzes completos",
    },
    {
      img: "rise",
      value: 7,
      description: "Sequência",
    },
    {
      img: "star",
      value: 1890,
      description: "Pontos",
    },
  ];

  const icons = {
    analytics: analyticsImg,
    trophy: trophyImg,
    rise: riseImg,
    book: bookImg,
    star: starImg,
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-[#C6DBEF] px-14">
      <div className="flex flex-col gap-4 pb-4 pt-9">
        <h4 className="font-bold text-5xl">Olá, Lucas!</h4>
        <span className="text-[#404040] text-sm">
          Continue aprendendo e melhorando sua pontuação.
        </span>
      </div>

      {/* Primeira linha de graficos */}
      <div className="grid grid-cols-5 gap-7">
        {studentRatings.map((item) => (
          <div
            className="flex flex-col items-center bg-white rounded-4xl py-8 gap-4"
            key={item.description}
          >
            <div>
              <img src={icons[item.img]} alt="" />
            </div>

            <div className="flex flex-col gap-1.5 items-center">
              <span className="font-bold text-3xl">{item.value}</span>
              <span className="text-sm text-[#404040]">{item.description}</span>
            </div>
          </div>
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
