import { Plus } from "lucide-react";
import type { ChangeEvent } from "react";
import { RadioGroup } from "radix-ui";
import {
  useQuestoesStore,
  type Questao,
} from "../../../store/useQuestoesStore";

interface Props {
  handlePerguntaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleOpcaoChange: (
    event: ChangeEvent<HTMLInputElement>,
    letra: "A" | "B" | "C" | "D"
  ) => void;
  handleCancel(): void;
  handleCreateQuestion(): void;
  questao?: Questao;
}

export function CreateQuestion({
  handlePerguntaChange,
  handleCancel,
  handleCreateQuestion,
  handleOpcaoChange,
  questao,
}: Props) {
  const { setRespostaCorreta } = useQuestoesStore();

  const handleRespostaChange = (letra: "A" | "B" | "C" | "D") => {
    if (!questao) return;
    setRespostaCorreta(questao.id, letra);
  };

  return (
    <div className="space-y-4 border border-[#6BAED6] p-6 rounded-xl mt-7">
      <h5>Nova Questão</h5>
      <div className="flex flex-col">
        <span>Pergunta*</span>

        <textarea
          name=""
          id=""
          placeholder="Descrição opcional do quiz..."
          className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
          onChange={handlePerguntaChange}
          value={questao?.pergunta}
        />
      </div>
      <h5>Opções de Resposta*</h5>
      <RadioGroup.Root
        onValueChange={(value) =>
          handleRespostaChange(value as "A" | "B" | "C" | "D")
        }
      >
        <div className="space-y-3">
          {(["A", "B", "C", "D"] as const).map((letra) => (
            <div className="flex items-center gap-3" key={letra}>
              <RadioGroup.Item
                value={letra}
                className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RadioGroup.Indicator>
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                </RadioGroup.Indicator>
              </RadioGroup.Item>

              <span>
                {letra}
                {")"}
              </span>
              <input
                type="text"
                placeholder={`Opção ${letra}`}
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182] w-full"
                onChange={(event) => handleOpcaoChange(event, letra)}
                value={questao?.opcoes[letra] || ""}
              />
            </div>
          ))}
        </div>
      </RadioGroup.Root>

      <div className="flex justify-end gap-2">
        <button
          className="bg-white text-black py-1.5 px-3 rounded-lg flex gap-4 items-center disabled:bg-[#717182] disabled:!cursor-not-allowed text-sm border border-black/10"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          className="bg-black text-white py-1.5 px-3 rounded-lg flex gap-4 items-center disabled:bg-[#717182] disabled:!cursor-not-allowed text-sm"
          onClick={handleCreateQuestion}
        >
          <Plus width={18} height={18} />
          Adicionar Questão{" "}
        </button>
      </div>
    </div>
  );
}
