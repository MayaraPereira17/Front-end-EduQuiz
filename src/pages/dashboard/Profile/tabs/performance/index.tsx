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
    <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-11 py-6 sm:py-8 md:py-9 rounded-2xl sm:rounded-3xl md:rounded-4xl mb-8 sm:mb-12 md:mb-16">
      <h4 className="text-base sm:text-lg pb-3 sm:pb-4">Desempenho por Quizzes Realizados</h4>

      <div className="flex flex-col gap-3 sm:gap-4">
        {performanceValue.map((item) => (
          <div className="flex flex-col gap-2" key={item.quizType}>
            <div className="flex justify-between items-center gap-2">
              <span className="font-bold text-sm sm:text-base md:text-md truncate">{item.quizType}</span>
              <span className="text-xs sm:text-sm text-[#404040] whitespace-nowrap">{item.percentage}%</span>
            </div>
            <Progress.Root
              className="relative h-2 sm:h-3 w-full overflow-hidden rounded bg-gray-200"
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
