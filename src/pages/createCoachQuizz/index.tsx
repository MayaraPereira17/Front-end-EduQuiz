import { useState } from "react";
import { TitleWithGoBack } from "../../components/coach/titleWithGoBack";
import { CustomSelect } from "../../components/select";

export function CreateCoachQuizz() {
  const [value, setValue] = useState("");

  return (
    <div className="px-4">
      <TitleWithGoBack />

      <div>
        <h5>Informações do Quiz</h5>

        <div className="flex flex-col">
          <span>Título do Quiz*</span>

          <input
            type="text"
            placeholder="Ex: Matemática - Equações do 2º Grau"
            className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
          />
        </div>

        <div className="flex flex-col">
          <span>Título do Quiz*</span>

          <textarea
            name=""
            id=""
            placeholder="Descrição opcional do quiz..."
            className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span>Título do Quiz*</span>

            <CustomSelect
              value={value}
              onValueChange={setValue}
              placeholder="Escolha uma opção"
              options={[
                { value: "easy", label: "Fácil" },
                { value: "medium", label: "Médio" },
                { value: "hard", label: "Difícil" },
              ]}
            />
          </div>

          <div className="flex flex-col">
            <span>Tempo Limite (minutos)</span>

            <input
              type="text"
              className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
