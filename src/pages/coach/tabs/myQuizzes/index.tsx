import PlusImg from "../../../../assets/icons/plus-white.svg";
import { SearchInput } from "../../../../components/searchInput";
import bookImg from "../../../../assets/icons/blue-book.svg";
import checkedImg from "../../../../assets/icons/checked.svg";
import dateImg from "../../../../assets/icons/date.svg";
import deleteImg from "../../../../assets/icons/delete.svg";
import editImg from "../../../../assets/icons/edit.svg";
import checkedSmallImg from "../../../../assets/icons/checked-small.svg";
import { Badge } from "../../../../components/badge";
import { useNavigate } from "react-router";

export function MyQuizzesCoach() {
  let navigate = useNavigate();

  const onHandleNewQuizz = () => {
    navigate("/coach/quizz/create-quizz");
  };

  return (
    <div className="px-4">
      <div className="my-6 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-3xl ">Meus Quizzes</h4>
          <span className="text-base text-[#4A5565]">
            Gerencie e acompanhe seus quizzes criados
          </span>
        </div>

        <button
          className="flex gap-2.5 items-center justify-center border text-white border-black/10 py-1.5 px-3 rounded-lg text-sm bg-black "
          onClick={onHandleNewQuizz}
        >
          <img src={PlusImg} alt="" />
          Novo Quiz
        </button>
      </div>

      {/* Sessão input */}
      <div className="mb-12">
        <SearchInput />
      </div>
      {/* Segunda sessao sobre quizzes */}
      <div className="grid grid-cols-2 gap-3.5 mb-6">
        <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
          <img src={bookImg} alt="" />

          <div className="flex flex-col text-center">
            <span className="font-bold text-2xl">3</span>

            <span className="text-[#4A5565] text-base">Total de Quizzes</span>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
          <img src={checkedImg} alt="" />

          <div className="flex flex-col text-center">
            <span className="font-bold text-2xl">2</span>

            <span className="text-[#4A5565] text-base">Publicados</span>
          </div>
        </div>
      </div>

      {/* Quizzes */}
      <div className="bg-white border border-black/10 px-6 rounded-2xl py-5 !mb-6">
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-[#0A0A0A] text-lg">Equações do 2º Grau</span>

          <Badge
            variant="success"
            className="gap-1 items-center justify-center"
            icon={<img src={checkedSmallImg} />}
          >
            Publicado
          </Badge>
        </div>
        <div className="mb-10">
          <span className="text-[#4A5565] text-sm ">
            Quiz sobre resolução de equações quadráticas e sua
          </span>
        </div>

        <div className="space-x-2 mb-4">
          <Badge
            variant="default"
            className="gap-1 items-center justify-center"
          >
            Matematica
          </Badge>

          <Badge
            variant="warning"
            className="gap-1 items-center justify-center"
          >
            Médio
          </Badge>
        </div>

        <div className="grid grid-cols-3 text-center py-2 mb-2.5">
          <div className="flex flex-col">
            <span className="font-bold text-base">2</span>
            <span className="text-[#4A5565]">Questões</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base">30min</span>
            <span className="text-[#4A5565]">Tempo</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base">17</span>
            <span className="text-[#4A5565]">Tentativas</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <img src={dateImg} alt="" />
          <span className="text-[#6A7282] text-xs">
            Criado em 10/09/2024, 07:00
          </span>
        </div>

        <button className="flex border justify-center w-full border-black/10 gap-2.5 text-sm rounded-lg py-1 mb-2.5">
          <img src={editImg} alt="" />
          Editar
        </button>

        <div className="flex justify-end">
          <button className="">
            <img src={deleteImg} alt="" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-black/10 px-6 rounded-2xl py-5 !mb-6">
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-[#0A0A0A] text-lg">Equações do 2º Grau</span>

          <Badge
            variant="success"
            className="gap-1 items-center justify-center"
            icon={<img src={checkedSmallImg} />}
          >
            Publicado
          </Badge>
        </div>
        <div className="mb-10">
          <span className="text-[#4A5565] text-sm ">
            Quiz sobre resolução de equações quadráticas e sua
          </span>
        </div>

        <div className="space-x-2 mb-4">
          <Badge
            variant="default"
            className="gap-1 items-center justify-center"
          >
            Matematica
          </Badge>

          <Badge
            variant="warning"
            className="gap-1 items-center justify-center"
          >
            Médio
          </Badge>
        </div>

        <div className="grid grid-cols-3 text-center py-2 mb-2.5">
          <div className="flex flex-col">
            <span className="font-bold text-base">2</span>
            <span className="text-[#4A5565]">Questões</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base">30min</span>
            <span className="text-[#4A5565]">Tempo</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base">17</span>
            <span className="text-[#4A5565]">Tentativas</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <img src={dateImg} alt="" />
          <span className="text-[#6A7282] text-xs">
            Criado em 10/09/2024, 07:00
          </span>
        </div>

        <button className="flex border justify-center w-full border-black/10 gap-2.5 text-sm rounded-lg py-1 mb-2.5">
          <img src={editImg} alt="" />
          Editar
        </button>

        <div className="flex justify-end">
          <button className="">
            <img src={deleteImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
