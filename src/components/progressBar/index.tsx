import * as React from "react";
import { Progress } from "radix-ui";
import BrainIcon from "../../assets/icons/brain.svg";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const clampedStep = Math.min(currentStep, totalSteps);
  const progressPercent = (clampedStep / totalSteps) * 100;

  return (
    <div className={`w-full flex flex-col gap-4 pt-10 ${className ?? ""}`}>
      <div className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <img src={BrainIcon} alt="" />
          <span className="font-normal text-sm">
            Pergunta {currentStep} de {totalSteps}
          </span>
        </div>
        <span className="text-[#404040] text-sm">
          {progressPercent}% Completo
        </span>
      </div>
      <Progress.Root
        className="relative h-3 w-full overflow-hidden rounded bg-gray-200"
        value={progressPercent}
      >
        <Progress.Indicator
          className="h-full bg-[#3182BD] transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - progressPercent}%)` }}
        />
      </Progress.Root>
    </div>
  );
};
