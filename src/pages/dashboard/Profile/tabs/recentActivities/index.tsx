import { Badge } from "../../../../../components/badge";

export function RecentActivities() {
  const recentActivities = [
    {
      name: "Quizz Adição",
      date: "2025-09-10",
      percentage: "90%",
    },
    {
      name: "Quizz Adição",
      date: "2025-09-10",
      percentage: "90%",
    },
    {
      name: "Quizz Adição",
      date: "2025-09-10",
      percentage: "90%",
    },
    {
      name: "Quizz Adição",
      date: "2025-09-10",
      percentage: "90%",
    },
  ];
  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-11 py-6 sm:py-8 md:py-9 rounded-2xl sm:rounded-3xl md:rounded-4xl mb-8 sm:mb-12 md:mb-16">
      <h4 className="text-base sm:text-lg pb-3 sm:pb-4">Atividades Recentes</h4>

      <div className="flex flex-col gap-2 sm:gap-2.5">
        {recentActivities.map((item) => (
          <div
            className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 border bg-white items-start sm:items-center border-[#D9D9D9] rounded-md px-4 sm:px-5 md:px-6 py-3 sm:py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            key={item.name}
          >
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm sm:text-base font-bold truncate">{item.name}</span>
              <span className="text-xs sm:text-sm text-[#404040]">{item.date}</span>
            </div>

            <div className="flex-shrink-0">
              <Badge variant="success" className="px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 text-xs sm:text-sm">
                {item.percentage}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
