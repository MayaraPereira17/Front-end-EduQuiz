import { useState, useEffect } from "react";
import { X, Users, Plus } from "lucide-react";
import { tecnicoService, type AlunoRankingDTO, type TimeDTO } from "../../../../services/tecnicoService";

interface EscalarAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: AlunoRankingDTO | null;
  onSuccess: () => void;
}

export function EscalarAlunoModal({ isOpen, onClose, aluno, onSuccess }: EscalarAlunoModalProps) {
  const [times, setTimes] = useState<TimeDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [showCreateTime, setShowCreateTime] = useState(false);
  const [novoTimeNome, setNovoTimeNome] = useState("");

  useEffect(() => {
    if (isOpen && aluno) {
      loadTimes();
    }
  }, [isOpen, aluno]);

  const loadTimes = async () => {
    try {
      setLoading(true);
      const response = await tecnicoService.getTimes();
      setTimes(response.times || []);
    } catch (error: any) {
      setTimes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalar = async () => {
    if (!aluno) return;

    if (selectedTimeId) {
      // Adicionar a um time existente
      try {
        setLoading(true);
        await tecnicoService.adicionarJogadorAoTime(selectedTimeId, aluno.id);
        alert(`${aluno.nome} foi escalado para o time com sucesso!`);
        onSuccess();
        onClose();
      } catch (error: any) {
        alert(error.message || "Erro ao escalar jogador");
      } finally {
        setLoading(false);
      }
    } else if (showCreateTime && novoTimeNome.trim()) {
      // Criar novo time com este jogador
      try {
        setLoading(true);
        await tecnicoService.criarTime({
          nome: novoTimeNome,
          jogadoresIds: [aluno.id]
        });
        alert(`Time "${novoTimeNome}" criado e ${aluno.nome} foi escalado com sucesso!`);
        onSuccess();
        onClose();
        setNovoTimeNome("");
        setShowCreateTime(false);
      } catch (error: any) {
        alert(error.message || "Erro ao criar time");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Selecione um time ou crie um novo");
    }
  };

  if (!isOpen || !aluno) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b gap-3 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold">Escalar para o Time?</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Escalar <strong>{aluno.nome}</strong> (Posição #{aluno.posicao}, Score: {aluno.scoreGeral}%)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {!showCreateTime ? (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Selecione um Time</label>
                {times.length === 0 ? (
                  <p className="text-gray-500 text-xs sm:text-sm">Nenhum time criado ainda</p>
                ) : (
                  <div className="border rounded-lg max-h-60 overflow-y-auto">
                    {times.map((time) => (
                      <label
                        key={time.id}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time.id}
                          checked={selectedTimeId === time.id}
                          onChange={() => setSelectedTimeId(time.id)}
                          className="w-4 h-4 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-xs sm:text-sm">{time.nome}</span>
                          <span className="text-xs sm:text-sm text-gray-500 ml-2">
                            ({time.jogadores.length} jogadores)
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowCreateTime(true)}
                className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-xs sm:text-sm"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                Criar Novo Time
              </button>
            </>
          ) : (
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Nome do Novo Time *</label>
              <input
                type="text"
                value={novoTimeNome}
                onChange={(e) => setNovoTimeNome(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm"
                placeholder="Ex: Time Principal"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowCreateTime(false);
                  setNovoTimeNome("");
                  setSelectedTimeId(null);
                }}
                className="mt-2 text-xs sm:text-sm text-blue-600 hover:underline"
              >
                Ou selecionar time existente
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 text-xs sm:text-sm md:text-base"
            >
              Cancelar
            </button>
            <button
              onClick={handleEscalar}
              disabled={loading || (!selectedTimeId && !showCreateTime)}
              className="flex-1 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
            >
              {loading ? (
                "Escalando..."
              ) : (
                <>
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  Escalar Jogador
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

