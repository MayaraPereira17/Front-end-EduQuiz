import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/arrow-left.svg";

export function TitleWithGoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-6 flex items-center gap-4">
      <button
        className="border py-1.5 px-3 border-black/10 bg-white flex items-center justify-center gap-2.5 rounded-lg"
        onClick={goBack}
      >
        <img src={ArrowLeftIcon} alt="" />
        Voltar
      </button>

      <div>
        <h4 className="font-bold text-3xl ">Criar Novo Quiz</h4>
        <span className="text-base text-[#4A5565]">
          Crie um quiz personalizado para seus alunos
        </span>
      </div>
    </div>
  );
}
