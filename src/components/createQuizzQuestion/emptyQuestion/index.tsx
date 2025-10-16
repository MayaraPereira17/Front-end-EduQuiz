import QuestionIcon from "../../../assets/icons/question.svg";

export function EmptyQuestion() {
  return (
    <div className="flex flex-col items-center py-8 space-y-3.5 text-center">
      <img src={QuestionIcon} alt="" />

      <div className="space-y-0.5 flex flex-col ">
        <span className="text-[#6A7282]">
          Nenhuma questão adicionada ainda.
        </span>

        <span className="text-[#6A7282]">
          Clique em "Adicionar Questão" para começar.
        </span>
      </div>
    </div>
  );
}
