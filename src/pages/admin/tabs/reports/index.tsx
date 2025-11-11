import { useState, useEffect } from "react";
import { Download, FileText, TrendingUp, UserCheck } from "lucide-react";
import { DetailsStudent } from "./detailsStudent";
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
      <div className="px-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando relatório...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar relatório</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadRelatorio}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="flex items-center mt-5 gap-2 justify-between mb-12">
        <div>
          <h4 className="text-3xl">Relatório de Desempenho dos Alunos ⚽</h4>
          <span className="text-base text-[#4A5565]">
            Análise do progresso educacional da Escolinha de Futebol
          </span>
        </div>

        <button 
          onClick={() => setShowExportModal(true)}
          className="flex border border-black/10 rounded-lg bg-white py-2.5 px-3 items-center gap-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <Download width={16} height={16} />
          Exportar Relatório
        </button>
      </div>

      {/* Estatísticas Gerais */}
      {relatorio && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h5 className="text-lg font-semibold">Total de Alunos</h5>
            </div>
            <p className="text-3xl font-bold text-blue-600">{relatorio.totalAlunos}</p>
            <p className="text-sm text-gray-600 mt-2">Alunos cadastrados</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-green-600" />
              <h5 className="text-lg font-semibold">Média Geral</h5>
            </div>
            <p className="text-3xl font-bold text-green-600">{relatorio.mediaGeral}%</p>
            <p className="text-sm text-gray-600 mt-2">Performance média</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-black/10">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-6 h-6 text-purple-600" />
              <h5 className="text-lg font-semibold">Relatório</h5>
            </div>
            <p className="text-3xl font-bold text-purple-600">{relatorio.alunos.length}</p>
            <p className="text-sm text-gray-600 mt-2">Alunos com dados</p>
          </div>
        </div>
      )}

      {/* Gerenciamento de Times */}
      {alunos.length > 0 && (
        <TeamManagement alunos={alunos} onRefresh={loadRelatorio} />
      )}

      <div className="bg-white p-6 rounded-xl border border-black/10 mb-10">
        <div className="flex items-center gap-2 mb-7">
          <FileText color="#2B7FFF" width={20} height={20} />
          <h5 className="text-base">Detalhamento por Aluno</h5>
        </div>

        {!relatorio || relatorio.alunos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum aluno encontrado no relatório
          </div>
        ) : (
          <div className="space-y-4">
            {relatorio.alunos.map((aluno) => {
              const alunoRanking = alunos.find(a => a.id === aluno.id);
              return (
                <div key={aluno.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {aluno.nome.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-lg">{aluno.nome}</h6>
                        <p className="text-sm text-gray-600">
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
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{aluno.scoreGeral}%</p>
                        <p className="text-sm text-gray-600">Score Geral</p>
                      </div>
                      {alunoRanking && (
                        <button
                          onClick={() => handleEscalarAluno(alunoRanking)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          title="Escalar para o time"
                        >
                          <UserCheck className="w-4 h-4" />
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
