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
    <div className="bg-white p-6 rounded-xl border border-black/10 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h5 className="text-lg font-semibold">Gerenciar Times</h5>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Criar Time
        </button>
      </div>

      {times.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhum time criado ainda</p>
      ) : (
        <div className="space-y-4">
          {times.map((time) => (
            <div key={time.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="font-semibold text-lg">{time.nome}</h6>
                  <p className="text-sm text-gray-500">
                    {time.jogadores.length} jogadores • Criado em {new Date(time.dataCriacao).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTeam(time.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {time.jogadores.map((jogador) => (
                  <div key={jogador.id} className="text-sm bg-blue-50 border border-blue-200 p-2 rounded flex items-center justify-between">
                    <span className="font-medium text-blue-900">#{jogador.posicao} {jogador.nome}</span>
                    <span className="text-xs text-blue-600 ml-2">({jogador.scoreGeral}%)</span>
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
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Criar Novo Time</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Time *</label>
                <input
                  type="text"
                  value={timeNome}
                  onChange={(e) => setTimeNome(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ex: Time Principal"
                />
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Selecionar Top N do Ranking
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max={alunos.length}
                      value={quantidadeJogadores}
                      onChange={(e) => setQuantidadeJogadores(parseInt(e.target.value) || 11)}
                      className="flex-1 px-4 py-2 border rounded-lg"
                      placeholder="Quantidade"
                    />
                    <button
                      onClick={handleSelectByQuantity}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
                    >
                      Selecionar Top {quantidadeJogadores}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Jogadores Selecionados ({selectedAlunos.length})
                </label>
                <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                  {alunos.length === 0 ? (
                    <p className="text-gray-500">Nenhum aluno disponível</p>
                  ) : (
                    <div className="space-y-2">
                      {alunos.map((aluno) => (
                        <label
                          key={aluno.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAlunos.includes(aluno.id)}
                            onChange={() => handleToggleAluno(aluno.id)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <span className="font-medium">#{aluno.posicao} {aluno.nome}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              (Score: {aluno.scoreGeral}%)
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateTeam}
                  disabled={loading || !timeNome.trim() || selectedAlunos.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

