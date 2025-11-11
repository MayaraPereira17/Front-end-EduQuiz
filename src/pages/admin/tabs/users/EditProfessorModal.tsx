import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { tecnicoService, type ProfessorDTO } from "../../../../services/tecnicoService";

interface EditProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  professor: ProfessorDTO | null;
  onProfessorUpdated: () => void;
}

export function EditProfessorModal({ isOpen, onClose, professor, onProfessorUpdated }: EditProfessorModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    instituicao: "",
    areaEspecializacao: "",
  });

  useEffect(() => {
    if (professor && isOpen) {
      setFormData({
        nome: professor.nome || "",
        email: professor.email || "",
        instituicao: professor.instituicao || "",
        areaEspecializacao: professor.areaEspecializacao || "",
      });
      setError(null);
      setSuccess(false);
    }
  }, [professor, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!professor) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await tecnicoService.updateProfessor(professor.id, {
        nome: formData.nome,
        email: formData.email,
        instituicao: formData.instituicao || undefined,
        areaEspecializacao: formData.areaEspecializacao || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        onProfessorUpdated();
        onClose();
        setSuccess(false);
      }, 1500);

    } catch (error: any) {
      setError(error.message || "Erro ao atualizar professor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !professor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Editar Professor</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome completo"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>

            {/* Instituição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instituição de Ensino
              </label>
              <input
                type="text"
                value={formData.instituicao}
                onChange={(e) => handleInputChange("instituicao", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome da instituição"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Campo opcional. Não será salvo permanentemente no banco de dados.
              </p>
            </div>

            {/* Área de Especialização */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área de Especialização
              </label>
              <input
                type="text"
                value={formData.areaEspecializacao}
                onChange={(e) => handleInputChange("areaEspecializacao", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Matemática, História, Ciências"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Campo opcional. Não será salvo permanentemente no banco de dados.
              </p>
            </div>

            {/* Mensagens de Status */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">Professor atualizado com sucesso!</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-5 h-5" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

