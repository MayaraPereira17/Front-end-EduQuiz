import bookImg from "../../assets/book.svg";
import trophyImg from "../../assets/trophy.svg";
import userImg from "../../assets/user.svg";
import { LoginForm } from "../../components/login";
import Logo from "../../components/logo";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type IconKey = "book" | "trophy" | "user";

export function Login() {
  const navigate = useNavigate();

  const introduction: {
    title: string;
    subtitle: string;
    img: IconKey;
    altImg: string;
  }[] = [
    {
      title: "Quizzes Interativos",
      subtitle: "Questões dinâmicas e desafiadoraspara testar conhecimentos",
      img: "book",
      altImg: "livro logo",
    },
    {
      title: "Quizzes Interativos",
      subtitle: "Acompanhe seu progresso e compete com outros usuários",
      img: "trophy",
      altImg: "trofeu logo",
    },
    {
      title: "Múltiplos Perfis",
      subtitle:
        "Experiências personalizadas para professores, técnicos e alunos",
      img: "user",
      altImg: "usuario logo",
    },
  ];

  const icons = {
    book: bookImg,
    trophy: trophyImg,
    user: userImg,
  };

  return (
    <div className="bg-[#C6DBEF] min-h-screen w-screen">
      {/* Botão Voltar */}
      <div className="pt-6 px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#202020] hover:text-[#3182BD] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
      </div>

      {/* logo */}
      <Logo
        containerClass="justify-center pt-6"
        imgClass="w-28 h-28"
        textClass="text-5xl font-bold text-[#202020]"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 pt-14 px-6 items-center">
        {/* Seção esquerda */}
        <div className=" flex flex-col gap-3.5">
          <div className="bg-white p-9 rounded-4xl flex flex-col gap-4 ">
            <h4 className="text-center font-medium ">
              Aprendendo Dentro e Fora de Campo
            </h4>

            <p className="text-sm">
              O projeto Meninos da Caixa foi criado para mostrar que o futebol
              pode ir muito além do esporte. Durante as atividades na escolinha,
              percebemos que muitos alunos enfrentavam dificuldades em
              Matemática, o que motivou a busca por uma solução que unisse
              aprendizado e diversão. A ideia foi integrar conceitos matemáticos
              ao dia a dia do futebol, transformando treinos e jogos em
              oportunidades de desenvolver o raciocínio lógico, a concentração e
              a confiança. Assim, unimos esporte e educação para apoiar o
              crescimento integral das crianças, dentro e fora de campo.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {introduction.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center bg-white rounded-4xl p-7"
              >
                <img
                  src={icons[item.img]}
                  alt={item.altImg}
                  className="w-11 h-11"
                />
                <h3 className="text-base text-center font-medium text-[#404040]">
                  {item.title}
                </h3>
                <p className="text-center font-normal text-sm text-[#404040]">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção direita */}
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
