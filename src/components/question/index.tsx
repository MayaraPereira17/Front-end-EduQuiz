import React, { useState } from "react";
import { cn } from "../../utils/cn";
import incorrectImg from "../../assets/incorreto.png";
import correctImg from "../../assets/correto.png";

interface QuestionProps {
  options: { id: number; text: string; correta?: boolean }[]; // alternativas com ID e se é correta
  selectedOptionId?: number; // ID da opção selecionada
  onAnswer?: (optionId: number) => void; // callback para seleção
  onNext: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  submitting?: boolean;
  showFeedback?: boolean; // Controla se deve mostrar feedback interno
}

export const Question: React.FC<QuestionProps> = ({
  options,
  selectedOptionId,
  onAnswer,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
  submitting = false,
  showFeedback = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const handleConfirm = () => {
    if (!confirmed && (selectedOptionId || selectedIndex !== null)) {
      setConfirmed(true);
      setUserAnswer(selectedOptionId || selectedIndex);
    } else {
      // Chama o próximo
      setSelectedIndex(null);
      setConfirmed(false);
      setUserAnswer(null);
      onNext();
    }
  };


  // Encontrar qual opção é a correta
  const correctOption = options.find(option => option.correta);
  const isCorrect = userAnswer === correctOption?.id;

  return (
    <div className="w-full space-y-4">

      {confirmed && showFeedback && (
        <div
          className={cn(
            "mt-4 text-sm font-medium px-5 py-6 rounded-2xl flex flex-col gap-3",
            isCorrect ? "bg-[#CCFFC8]" : "bg-[#FFEAEA]"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2.5",
              isCorrect
                ? "text-[#075900] text-md font-bold"
                : "text-[#C52020] bg-[#FFEAEA] text-md font-bold"
            )}
          >
            {isCorrect ? (
              <img src={correctImg} alt="icone questão correta" />
            ) : (
              <img src={incorrectImg} alt="icone questão incorreto" />
            )}

            {isCorrect ? "Correta!" : "Incorreto!"}
          </div>
          <div className="border bg-white border-[#D9D9D9] py-5 px-8 rounded-md 404040">
            <span className="font-bold text-md">Resposta correta: </span>
            <span className="font-medium">{correctOption?.text || ''}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, ...
          const isSelected = selectedOptionId ? selectedOptionId === option.id : selectedIndex === index;
          const isCorrectAnswer = confirmed && option.correta;
          const isUserAnswer = confirmed && (selectedOptionId ? selectedOptionId === option.id : selectedIndex === index);
          const isWrongAnswer = confirmed && isUserAnswer && !isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!confirmed) {
                  if (onAnswer) {
                    onAnswer(option.id);
                  } else {
                    setSelectedIndex(index);
                  }
                }
              }}
              disabled={confirmed}
              className={cn(
                "w-full flex items-center p-3 border rounded-3xl transition gap-6",
                !confirmed && "bg-[#F2F2F2]",
                isSelected && !confirmed && "border-blue-500",
                isCorrectAnswer && "bg-green-100 border-green-500",
                isWrongAnswer && "bg-red-100 border-red-500",
                !isSelected && !confirmed && "border-[#D9D9D9] hover:border-blue-400"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center",
                  !confirmed && "border-[#8C8C8C] bg-[#D9D9D9]",
                  isSelected && !confirmed && "border-blue-500 bg-blue-100",
                  isWrongAnswer && "bg-[#C52020] text-white border-[#C52020]",
                  isCorrectAnswer && "bg-[#075900] text-white border-[#075900]"
                )}
              >
                <span className="font-bold text-lg">{letter}</span>
              </div>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {/* Previous Button - só aparece se não confirmou */}
        {onPrevious && !isFirst && !confirmed && (
          <button
            onClick={onPrevious}
            className="flex-1 rounded-2xl py-4 text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Anterior
          </button>
        )}

        {/* Next/Submit Button */}
        <button
          onClick={handleConfirm}
          className={cn(
            "flex-1 rounded-2xl py-4 text-white transition",
            !confirmed
              ? (selectedOptionId || selectedIndex !== null)
                ? "bg-[#3182BD] hover:bg-blue-700"
                : "bg-[#D9D9D9] cursor-not-allowed"
              : submitting
                ? "bg-gray-400 cursor-not-allowed"
                : isLast
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#3182BD] hover:bg-blue-700"
          )}
          disabled={
            (!confirmed && (selectedOptionId === undefined && selectedIndex === null)) ||
            submitting
          }
        >
          {submitting ? (
            "Submetendo..."
          ) : !confirmed ? (
            (selectedOptionId || selectedIndex !== null)
              ? "Confirmar Resposta"
              : "Selecione uma opção"
          ) : isLast ? (
            "Finalizar Quiz"
          ) : (
            "Próxima Pergunta"
          )}
        </button>
      </div>
    </div>
  );
};
