import { TitleWithGoBack } from "../../components/coach/titleWithGoBack";
import { CustomSelect } from "../../components/select";
import BookBlackIcon from "../../assets/icons/book-black.svg";
import { CreateQuizzQuestion } from "../../components/createQuizzQuestion";
import { useQuestoesStore } from "../../store/useQuestoesStore";

export function EditCoachQuizz() {
  const {
    titulo,
    descricao,
    dificuldade,
    tempoLimite,
    setTitulo,
    setDescricao,
    setDificuldade,
    setTempoLimite,
  } = useQuestoesStore();

  return (
    <div className="px-4 h-full  overflow-auto">
      <TitleWithGoBack
        title="Editar Quiz"
        subtitle="Modifique seu quiz existente"
      />

      <div className="space-y-6">
        <div className="bg-white py-6 px-6 rounded-xl">
          <div className="flex items-center gap-1 mb-8">
            <img src={BookBlackIcon} alt="" />
            <h5 className=" text-base text-[#0A0A0A]">Informações do Quiz</h5>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col ">
              <span className="text-sm">Título do Quiz*</span>

              <input
                type="text"
                placeholder="Ex: Matemática - Equações do 2º Grau"
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm">Descrição</span>

              <textarea
                name=""
                id=""
                placeholder="Descrição opcional do quiz..."
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col pt-[1.2px]">
                <span className="text-sm">Título do Quiz*</span>

                <CustomSelect
                  value={dificuldade}
                  onValueChange={(value) => setDificuldade(value as any)}
                  placeholder="Escolha uma opção"
                  options={[
                    { value: "easy", label: "Fácil" },
                    { value: "medium", label: "Médio" },
                    { value: "hard", label: "Difícil" },
                  ]}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">Tempo Limite (minutos)</span>

                <input
                  type="number"
                  max={40}
                  minLength={40}
                  className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]"
                  placeholder="EX: 30"
                  value={tempoLimite}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove tudo que não for número
                    value = value.replace(/\D/g, "");

                    // Limita até 2 dígitos
                    if (value.length > 2) value = value.slice(0, 2);

                    // Limita o valor máximo em 40
                    if (Number(value) > 40) value = "40";

                    setTempoLimite(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <CreateQuizzQuestion />
      </div>
    </div>
  );
}
