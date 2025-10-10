import { Progress } from "radix-ui";

export function Performance() {
  const performanceValue = [
    {
      quizType: "Quizz Adição",
      percentage: 90,
    },
    {
      quizType: "Quizz Adição",
      percentage: 95,
    },
    {
      quizType: "Quizz Adição",
      percentage: 75,
    },
    {
      quizType: "Quizz Adição",
      percentage: 42,
    },
  ];

  return (
    <div className="bg-white px-11 py-9 rounded-4xl mb-16">
      <h4 className="text-lg pb-4 ">Desempenho por Quizzes Realizados</h4>

      <div className="flex flex-col gap-4">
        {performanceValue.map((item) => (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between ">
              <span className="font-bold text-md">{item.quizType}</span>
              <span className="text-sm text-[#404040]">{item.percentage}%</span>
            </div>
            <Progress.Root
              className="relative h-3 w-full overflow-hidden rounded bg-gray-200"
              value={item.percentage}
            >
              <Progress.Indicator
                className="h-full bg-[#3182BD] transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${100 - item.percentage}%)` }}
              />
            </Progress.Root>
          </div>
        ))}
      </div>
    </div>
  );
}
