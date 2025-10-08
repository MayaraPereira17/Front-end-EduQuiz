import React, { useState } from "react";
import { cn } from "../../utils/cn";
import incorrectImg from "../../assets/incorreto.png";
import correctImg from "../../assets/correto.png";

interface QuestionProps {
  question: string;
  options: string[]; // 5 alternativas
  correctIndex: number; // índice da correta (0 a 4)
  onNext: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  options,
  correctIndex,
  onNext,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!confirmed) {
      setConfirmed(true);
    } else {
      // Chama o próximo
      setSelectedIndex(null);
      setConfirmed(false);
      onNext();
    }
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="w-full px-8 py-14 bg-white rounded-4xl shadow-[0_4px_12px_0px_rgba(0,0,0,0.25)] space-y-4 mt-7">
      <h2 className="text-xl font-medium text-[#404040]">{question}</h2>

      {confirmed && (
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
            <span className="font-medium">{options[correctIndex]}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, ...
          const isSelected = selectedIndex === index;
          const isAnswer = confirmed && index === correctIndex;
          const isWrongSelected =
            confirmed && selectedIndex === index && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              disabled={confirmed}
              className={cn(
                "w-full flex items-center p-3 border rounded-3xl transition gap-6 bg-[#F2F2F2]",
                isSelected && !confirmed && "border-blue-500",
                isAnswer && "bg-green-100 border-green-500",
                isWrongSelected && "bg-red-100 border-red-500",
                !isSelected && "border-[#D9D9D9] hover:border-blue-400"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center border-[#8C8C8C] bg-[#D9D9D9]",
                  isWrongSelected && "bg-[#C52020] text-white",
                  isAnswer && "bg-[#075900] text-white"
                )}
              >
                <span className="font-bold text-lg">{letter}</span>
              </div>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleConfirm}
        className={cn(
          "w-full rounded-2xl py-4 text-white transition",
          selectedIndex !== null
            ? "bg-[#3182BD]"
            : "bg-[#D9D9D9] cursor-not-allowed"
        )}
        disabled={selectedIndex === null}
      >
        {!confirmed
          ? selectedIndex !== null
            ? "Confirmar Resposta"
            : "Selecione uma opção"
          : "Próxima Pergunta"}
      </button>
    </div>
  );
};
