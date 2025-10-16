import { useQuestoesStore } from "../../store/useQuestoesStore";
import { CircleQuestionMark, Plus, Send } from "lucide-react";
import { useState, type ChangeEvent } from "react";

import { EmptyQuestion } from "./emptyQuestion";
import { CreatedQuestion } from "./createadQuestion";
import { CreateQuestion } from "./createQuestion";

export function CreateQuizzQuestion() {
  const [isDisableBtn, setIsDisabledBtn] = useState(false);

  const { questoes, adicionarQuestaoVazia, atualizarQuestao, removerQuestao } =
    useQuestoesStore();

  // Última questão (rascunho)
  const questaoAtual = questoes[questoes.length - 1]?.rascunho
    ? questoes[questoes.length - 1]
    : undefined;

  const CreateNewQuestion = () => {
    adicionarQuestaoVazia();
    setIsDisabledBtn(true);
  };

  const handlePerguntaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!questaoAtual) return;
    const novaPergunta = event.target.value;
    atualizarQuestao(questaoAtual.id, {
      ...questaoAtual,
      pergunta: novaPergunta,
    });
  };

  const handleOpcaoChange = (
    event: ChangeEvent<HTMLInputElement>,
    letra: "A" | "B" | "C" | "D"
  ) => {
    if (!questaoAtual) return;
    const valor = event.target.value;
    atualizarQuestao(questaoAtual.id, {
      ...questaoAtual,
      opcoes: {
        ...questaoAtual.opcoes,
        [letra]: valor,
      },
    });
  };

  const handleCancel = () => {
    if (!questaoAtual) return;
    removerQuestao(questaoAtual.id);
    setIsDisabledBtn(false);
  };

  const handleCreateQuestion = () => {
    if (!questaoAtual) return;

    // Marca a questão atual como finalizada
    atualizarQuestao(questaoAtual.id, { ...questaoAtual, rascunho: false });

    // Cria nova questão vazia
    adicionarQuestaoVazia();
  };

  const temQuestaoFinalizada = questoes.some((q) => !q.rascunho);

  return (
    <div className="bg-white py-6 px-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CircleQuestionMark color="black" width={18} height={18} />
          <h4 className="text-base">Questões ({questoes.length})</h4>
        </div>

        <button
          className="bg-black text-white py-1.5 px-3 rounded-lg flex gap-4 items-center disabled:bg-[#717182] disabled:!cursor-not-allowed text-sm"
          onClick={CreateNewQuestion}
          disabled={isDisableBtn}
        >
          <Plus width={18} height={18} />
          Adicionar Questão
        </button>
      </div>
      {/* Se não houver questões */}
      {questoes.length === 0 && <EmptyQuestion />}
      {/* Renderiza questões finalizadas */}
      <div className="mt-7 space-y-4">
        {questoes
          .filter((q) => !q.rascunho)
          .map((q, index) => (
            <CreatedQuestion key={q.id} item={q} questionNumber={index + 1} />
          ))}
      </div>
      {/* Renderiza a questão atual em rascunho */}
      {questaoAtual && (
        <CreateQuestion
          handleCancel={handleCancel}
          handleCreateQuestion={handleCreateQuestion}
          handleOpcaoChange={handleOpcaoChange}
          handlePerguntaChange={handlePerguntaChange}
          questao={questaoAtual}
        />
      )}

      <div className="flex justify-end my-7">
        <button
          className="bg-black text-white py-1.5 px-3 rounded-lg flex gap-4 items-center disabled:bg-[#717182] disabled:!cursor-not-allowed text-sm "
          //   onClick={handleCreateQuestion}
          disabled={!temQuestaoFinalizada}
        >
          <Send width={18} height={18} />
          Publicar Quiz
        </button>
      </div>
    </div>
  );
}
