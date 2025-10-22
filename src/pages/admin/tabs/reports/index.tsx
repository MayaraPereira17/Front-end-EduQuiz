import { useState, useEffect } from "react";
import { Download, FileText, TrendingUp } from "lucide-react";
import { DetailsStudent } from "./detailsStudent";
import { tecnicoService, type RelatorioDesempenhoDTO } from "../../../../services/tecnicoService";

export function ReportsAdmin() {
  const [relatorio, setRelatorio] = useState<RelatorioDesempenhoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRelatorio = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Carregando relatório de desempenho...');
      
      const data = await tecnicoService.getRelatorioDesempenho();
      setRelatorio(data);
      
      console.log('✅ Relatório carregado com sucesso:', data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar relatório:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelatorio();
  }, []);

  const handleExportar = () => {
    // Implementar exportação do relatório
    console.log('📊 Exportando relatório...');
    alert('Funcionalidade de exportação será implementada em breve!');
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
          onClick={handleExportar}
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
            {relatorio.alunos.map((aluno) => (
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
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{aluno.scoreGeral}%</p>
                    <p className="text-sm text-gray-600">Score Geral</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
