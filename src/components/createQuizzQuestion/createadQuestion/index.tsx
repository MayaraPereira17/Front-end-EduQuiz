import { Trash2 } from "lucide-react";
import type { Questao } from "../../../types/createQuestionStore";
import { useQuestoesStore } from "../../../store/useQuestoesStore";

interface Props {
  item: Questao;
  questionNumber: number;
}

export function CreatedQuestion({ item, questionNumber }: Props) {
  const { removerQuestao } = useQuestoesStore();
  return (
    <div className="px-4 py-3.5 border border-black/10 bg-white rounded-2xl">
      <div className="flex justify-between">
        <h4>Questão {questionNumber}:</h4>

        <button
          className="border border-black/10 px-2.5 py-2 inline-flex items-center justify-center rounded-lg"
          onClick={() => removerQuestao(item?.id)}
        >
          <Trash2 color="red" width={16} height={16} />
        </button>
      </div>

      <div className="my-2">
        <span>{item?.pergunta}</span>
      </div>

      <div className="space-y-2">
        {Object.entries(item.opcoes).map(([letra, valor]) => (
          <div
            className="border bg-[#F9FAFB] px-2 rounded-sm border-black/10 py-2"
            key={letra}
          >
            {letra}
            {")"} {valor}
          </div>
        ))}
      </div>
    </div>
  );
}
