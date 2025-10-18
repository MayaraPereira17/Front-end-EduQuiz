import {  Download, FileText } from "lucide-react";
import { DetailsStudent } from "./detailsStudent";
import { studentsDetails } from "../../../../mocks/detailsStudents";

export function ReportsAdmin() {
  return (
    <div className="px-6">
      <div className="flex items-center mt-5 gap-2  justify-between mb-12">
        <div>
          <h4 className="text-3xl">Relatório de Desempenho dos Alunos</h4>
          <span className="text-base text-[#4A5565]">
            Análise do progresso educacional baseado nos quizz
          </span>
        </div>

        <button className="flex border border-black/10 rounded-lg bg-white py-2.5 px-3 items-center gap-2 text-sm">
          <Download width={16} height={16} />
          Exportar Relatório
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-black/10">
        <div className="flex items-center gap-2 mb-7">
          <FileText color="#2B7FFF" width={20} height={20} />
          <h5 className="text-base">Detalhamento por Aluno</h5>
        </div>

        <div className="space-y-4">
          {studentsDetails.map(item => (
          <DetailsStudent key={item.name} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}
