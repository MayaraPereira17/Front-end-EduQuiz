import { useState, useEffect } from "react";
import { Download, FileText, TrendingUp, UserCheck } from "lucide-react";
import { tecnicoService, type RelatorioDesempenhoDTO, type AlunoRankingDTO } from "../../../../services/tecnicoService";
import { TeamManagement } from "./TeamManagement";
import { EscalarAlunoModal } from "./EscalarAlunoModal";
import { ExportReportModal } from "./ExportReportModal";

export function ReportsAdmin() {
  const [relatorio, setRelatorio] = useState<RelatorioDesempenhoDTO | null>(null);
  const [alunos, setAlunos] = useState<AlunoRankingDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEscalacaoModal, setShowEscalacaoModal] = useState(false);
  const [alunoParaEscalar, setAlunoParaEscalar] = useState<AlunoRankingDTO | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const loadRelatorio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [relatorioData, alunosData] = await Promise.allSettled([
        tecnicoService.getRelatorioDesempenho(),
        tecnicoService.getAlunos()
      ]);

      if (relatorioData.status === 'fulfilled') {
        setRelatorio(relatorioData.value);
      }

      if (alunosData.status === 'fulfilled') {
        setAlunos(alunosData.value.alunos || []);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelatorio();
  }, []);

  const handleExportar = async (formato: 'pdf' | 'excel' = 'pdf', quantidade?: number) => {
    try {
      setExportLoading(true);
      const blob = await tecnicoService.exportarRelatorio(formato, quantidade);
      
      // Criar link para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-desempenho.${formato === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.message || "Erro ao exportar relatório");
    } finally {
      setExportLoading(false);
    }
  };

  const handleEscalarAluno = (aluno: AlunoRankingDTO) => {
    setAlunoParaEscalar(aluno);
    setShowEscalacaoModal(true);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center py-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Carregando relatório...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center py-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Erro ao carregar relatório</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadRelatorio}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-5 gap-4 justify-between mb-6 sm:mb-8 md:mb-12">
        <div className="flex-1">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">Relatório de Desempenho dos Alunos ⚽</h4>
          <span className="text-sm sm:text-base text-[#4A5565]">
            Análise do progresso educacional da Escolinha de Futebol
          </span>
        </div>

        <button 
          onClick={() => setShowExportModal(true)}
          className="flex border border-black/10 rounded-lg bg-white py-2 sm:py-2.5 px-3 sm:px-4 items-center gap-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Exportar Relatório
        </button>
      </div>

      {/* Estatísticas Gerais */}
      {relatorio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h5 className="text-base sm:text-lg font-semibold">Total de Alunos</h5>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{relatorio.totalAlunos}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Alunos cadastrados</p>
          </div>

          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <h5 className="text-base sm:text-lg font-semibold">Média Geral</h5>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{relatorio.mediaGeral}%</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Performance média</p>
          </div>

          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h5 className="text-base sm:text-lg font-semibold">Relatório</h5>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{relatorio.alunos.length}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Alunos com dados</p>
          </div>
        </div>
      )}

      {/* Gerenciamento de Times */}
      {alunos.length > 0 && (
        <TeamManagement alunos={alunos} onRefresh={loadRelatorio} />
      )}

      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10 mb-6 sm:mb-10">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 md:mb-7">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" color="#2B7FFF" />
          <h5 className="text-sm sm:text-base font-medium">Detalhamento por Aluno</h5>
        </div>

        {!relatorio || relatorio.alunos.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
            Nenhum aluno encontrado no relatório
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {relatorio.alunos.map((aluno) => {
              const alunoRanking = alunos.find(a => a.id === aluno.id);
              return (
                <div key={aluno.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-base sm:text-lg">
                          {aluno.nome.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h6 className="font-semibold text-base sm:text-lg truncate">{aluno.nome}</h6>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {aluno.totalQuizzes} quizzes realizados
                        </p>
                        {aluno.ultimoQuiz && (
                          <p className="text-xs text-gray-500">
                            Último quiz: {new Date(aluno.ultimoQuiz).toLocaleDateString()}
                          </p>
                        )}
                        {alunoRanking && (
                          <p className="text-xs text-blue-600 font-medium">
                            Posição no Ranking: #{alunoRanking.posicao}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-green-600">{aluno.scoreGeral}%</p>
                        <p className="text-xs sm:text-sm text-gray-600">Score Geral</p>
                      </div>
                      {alunoRanking && (
                        <button
                          onClick={() => handleEscalarAluno(alunoRanking)}
                          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm flex-shrink-0"
                          title="Escalar para o time"
                        >
                          <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                          Escalar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Escalação */}
      {alunoParaEscalar && (
        <EscalarAlunoModal
          isOpen={showEscalacaoModal}
          onClose={() => {
            setShowEscalacaoModal(false);
            setAlunoParaEscalar(null);
          }}
          aluno={alunoParaEscalar}
          onSuccess={loadRelatorio}
        />
      )}

      {/* Modal de Exportação */}
      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportar}
        totalAlunos={relatorio?.totalAlunos || alunos.length}
        loading={exportLoading}
      />
    </div>
  );
}
