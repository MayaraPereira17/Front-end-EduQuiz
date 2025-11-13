import { useState, useEffect } from "react";
import { Users, Plus, Trash2, X } from "lucide-react";
import { tecnicoService, type TimeDTO, type AlunoRankingDTO } from "../../../../services/tecnicoService";

interface TeamManagementProps {
  alunos: AlunoRankingDTO[];
  onRefresh: () => void;
}

export function TeamManagement({ alunos, onRefresh }: TeamManagementProps) {
  const [times, setTimes] = useState<TimeDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAlunos, setSelectedAlunos] = useState<number[]>([]);
  const [timeNome, setTimeNome] = useState("");
  const [quantidadeJogadores, setQuantidadeJogadores] = useState(11);

  const loadTimes = async () => {
    try {
      setLoading(true);
      const response = await tecnicoService.getTimes();
      setTimes(response.times || []);
    } catch (error: any) {
      // Se o endpoint não existir, apenas não carrega times
      setTimes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimes();
  }, []);

  const handleCreateTeam = async () => {
    if (!timeNome.trim() || selectedAlunos.length === 0) {
      alert("Preencha o nome do time e selecione pelo menos um jogador");
      return;
    }

    try {
      setLoading(true);
      await tecnicoService.criarTime({
        nome: timeNome,
        jogadoresIds: selectedAlunos
      });
      setShowCreateModal(false);
      setTimeNome("");
      setSelectedAlunos([]);
      await loadTimes();
      onRefresh();
    } catch (error: any) {
      alert(error.message || "Erro ao criar time");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (timeId: number) => {
    if (!confirm("Tem certeza que deseja excluir este time?")) return;

    try {
      setLoading(true);
      await tecnicoService.deleteTime(timeId);
      await loadTimes();
      onRefresh();
    } catch (error: any) {
      alert(error.message || "Erro ao excluir time");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAluno = (alunoId: number) => {
    setSelectedAlunos(prev => 
      prev.includes(alunoId) 
        ? prev.filter(id => id !== alunoId)
        : [...prev, alunoId]
    );
  };

  const handleSelectByQuantity = () => {
    const topAlunos = alunos
      .slice(0, quantidadeJogadores)
      .map(aluno => aluno.id);
    setSelectedAlunos(topAlunos);
  };

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-black/10 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <h5 className="text-base sm:text-lg font-semibold">Gerenciar Times</h5>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          Criar Time
        </button>
      </div>

      {times.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-sm sm:text-base">Nenhum time criado ainda</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {times.map((time) => (
            <div key={time.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <h6 className="font-semibold text-base sm:text-lg truncate">{time.nome}</h6>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {time.jogadores.length} jogadores • Criado em {new Date(time.dataCriacao).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTeam(time.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {time.jogadores.map((jogador) => (
                  <div key={jogador.id} className="text-xs sm:text-sm bg-blue-50 border border-blue-200 p-2 rounded flex items-center justify-between gap-1">
                    <span className="font-medium text-blue-900 truncate">#{jogador.posicao} {jogador.nome}</span>
                    <span className="text-xs text-blue-600 flex-shrink-0">({jogador.scoreGeral}%)</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criar Time */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold">Criar Novo Time</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Nome do Time *</label>
                <input
                  type="text"
                  value={timeNome}
                  onChange={(e) => setTimeNome(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                  placeholder="Ex: Time Principal"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs sm:text-sm font-medium mb-2">
                    Selecionar Top N do Ranking
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="number"
                      min="1"
                      max={alunos.length}
                      value={quantidadeJogadores}
                      onChange={(e) => setQuantidadeJogadores(parseInt(e.target.value) || 11)}
                      className="flex-1 px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      placeholder="Quantidade"
                    />
                    <button
                      onClick={handleSelectByQuantity}
                      className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap text-xs sm:text-sm"
                    >
                      Selecionar Top {quantidadeJogadores}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Jogadores Selecionados ({selectedAlunos.length})
                </label>
                <div className="border rounded-lg p-3 sm:p-4 max-h-60 overflow-y-auto">
                  {alunos.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhum aluno disponível</p>
                  ) : (
                    <div className="space-y-2">
                      {alunos.map((aluno) => (
                        <label
                          key={aluno.id}
                          className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAlunos.includes(aluno.id)}
                            onChange={() => handleToggleAluno(aluno.id)}
                            className="w-4 h-4 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-sm sm:text-base">#{aluno.posicao} {aluno.nome}</span>
                            <span className="text-xs sm:text-sm text-gray-500 ml-2">
                              (Score: {aluno.scoreGeral}%)
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateTeam}
                  disabled={loading || !timeNome.trim() || selectedAlunos.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? "Criando..." : "Criar Time"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

