import { useState } from "react";
import { ProgressBar } from "../../../components/progressBar";
import { Question } from "../../../components/question";
import { questionsMock } from "../../../mocks/questions";

export function Quiz() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < questionsMock.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      alert("Você terminou todas as perguntas!");
    }
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-10 lg:px-64 py-6">
      <h2 className="font-bold text-3xl">Quiz Educacional!</h2>
      <div className="w-full">
        <ProgressBar currentStep={current + 1} totalSteps={10} />
      </div>

      <div className="">
        <Question
          question={questionsMock[current].question}
          options={questionsMock[current].options}
          correctIndex={questionsMock[current].correctIndex}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
