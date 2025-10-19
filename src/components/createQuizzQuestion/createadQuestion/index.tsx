import { Trash2, Edit2, Check, X } from "lucide-react";
import type { Questao } from "../../../types/createQuestionStore";
import { useQuestoesStore } from "../../../store/useQuestoesStore";
import { useState, type ChangeEvent } from "react";

interface Props {
  item: Questao;
  questionNumber: number;
}

export function CreatedQuestion({ item, questionNumber }: Props) {
  const { removerQuestao, atualizarQuestao, setRespostaCorreta } = useQuestoesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    pergunta: item.pergunta,
    opcoes: { ...item.opcoes },
    respostaCorreta: item.respostaCorreta
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      pergunta: item.pergunta,
      opcoes: { ...item.opcoes },
      respostaCorreta: item.respostaCorreta
    });
  };

  const handleSave = () => {
    atualizarQuestao(item.id, {
      pergunta: editData.pergunta,
      opcoes: editData.opcoes,
      respostaCorreta: editData.respostaCorreta
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      pergunta: item.pergunta,
      opcoes: { ...item.opcoes },
      respostaCorreta: item.respostaCorreta
    });
    setIsEditing(false);
  };

  const handlePerguntaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditData(prev => ({ ...prev, pergunta: e.target.value }));
  };

  const handleOpcaoChange = (e: ChangeEvent<HTMLInputElement>, letra: "A" | "B" | "C" | "D") => {
    setEditData(prev => ({
      ...prev,
      opcoes: {
        ...prev.opcoes,
        [letra]: e.target.value
      }
    }));
  };

  const handleRespostaChange = (letra: "A" | "B" | "C" | "D") => {
    setEditData(prev => ({ ...prev, respostaCorreta: letra }));
  };

  return (
    <div className="px-4 py-3.5 border border-black/10 bg-white rounded-2xl">
      <div className="flex justify-between">
        <h4>Questão {questionNumber}:</h4>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                className="border border-blue-500 text-blue-500 px-2.5 py-2 inline-flex items-center justify-center rounded-lg hover:bg-blue-50"
                onClick={handleEdit}
                title="Editar questão"
              >
                <Edit2 width={16} height={16} />
              </button>
              <button
                className="border border-red-500 text-red-500 px-2.5 py-2 inline-flex items-center justify-center rounded-lg hover:bg-red-50"
                onClick={() => removerQuestao(item?.id)}
                title="Excluir questão"
              >
                <Trash2 width={16} height={16} />
              </button>
            </>
          ) : (
            <>
              <button
                className="border border-green-500 text-green-500 px-2.5 py-2 inline-flex items-center justify-center rounded-lg hover:bg-green-50"
                onClick={handleSave}
                title="Salvar alterações"
              >
                <Check width={16} height={16} />
              </button>
              <button
                className="border border-gray-500 text-gray-500 px-2.5 py-2 inline-flex items-center justify-center rounded-lg hover:bg-gray-50"
                onClick={handleCancel}
                title="Cancelar edição"
              >
                <X width={16} height={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        // Modo visualização
        <>
          <div className="my-2">
            <span>{item?.pergunta}</span>
          </div>

          <div className="space-y-2">
            {Object.entries(item.opcoes).map(([letra, valor]) => (
              <div
                className={`border px-2 rounded-sm border-black/10 py-2 ${
                  item.respostaCorreta === letra ? 'bg-green-100 border-green-300' : 'bg-[#F9FAFB]'
                }`}
                key={letra}
              >
                {letra}) {valor}
                {item.respostaCorreta === letra && (
                  <span className="ml-2 text-green-600 font-semibold">✓ Resposta correta</span>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        // Modo edição
        <>
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pergunta:
            </label>
            <textarea
              value={editData.pergunta}
              onChange={handlePerguntaChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Digite a pergunta..."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Opções de resposta:
            </label>
            {Object.entries(editData.opcoes).map(([letra, valor]) => (
              <div key={letra} className="flex items-center gap-3">
                <span className="w-6 text-sm font-medium">{letra})</span>
                <input
                  type="text"
                  value={valor}
                  onChange={(e) => handleOpcaoChange(e, letra as "A" | "B" | "C" | "D")}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Opção ${letra}...`}
                />
                <button
                  type="button"
                  onClick={() => handleRespostaChange(letra as "A" | "B" | "C" | "D")}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    editData.respostaCorreta === letra
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {editData.respostaCorreta === letra ? 'Correta' : 'Marcar'}
                </button>
              </div>
            ))}
          </div>

          {editData.respostaCorreta && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-700 text-sm">
                ✓ Resposta correta: {editData.respostaCorreta}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
