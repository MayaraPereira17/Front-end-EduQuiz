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
    <div className="bg-white px-11 py-9 rounded-4xl mb-16">
      <h4 className="text-lg pb-4 ">Atividades Recentes</h4>

      <div className="flex flex-col gap-2.5">
        {recentActivities.map((item) => (
          <div
            className="flex justify-between border bg-white items-center border-[#D9D9D9] rounded-md px-6 py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            key={item.name}
          >
            <div className="flex flex-col">
              <span className="text-base font-bold">{item.name}</span>
              <span className="text-sm text-[#404040]">{item.date}</span>
            </div>

            <div>
              <Badge variant="success" className="px-5 py-1.5">
                {item.percentage}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
