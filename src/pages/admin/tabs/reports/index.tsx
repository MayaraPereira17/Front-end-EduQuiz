import { BookOpen, Download, FileText } from "lucide-react";

export function ReportsAdmin() {
  return (
    <div className="px-6">
      <div className="flex items-center mt-5 gap-2  justify-between">
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
        <div className="flex items-center gap-2">
          <FileText color="#2B7FFF" width={20} height={20} />
          <h5 className="text-base">Detalhamento por Aluno</h5>
        </div>

        <div className="border border-black/10 p-4 rounded-xl">
          <div className="flex justify-between items-center ">
            João Silva
            <div className="text-end">
              <span className="block text-[#3182BD] text-xl font-bold">
                92%
              </span>
              <span className="block text-[#4A5565]">Média Geral</span>
            </div>
          </div>

          <div className="w-1/2 flex justify-between">
            <div className="flex items-center gap-2 text-[#4A5565]">
              <BookOpen width={16} height={16} />
              <span className="inline-block">15 quizzes realizados</span>
            </div>

            <div className="flex items-center gap-2 text-[#4A5565]">
              <BookOpen width={16} height={16} />
              <span>15 quizzes realizados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
