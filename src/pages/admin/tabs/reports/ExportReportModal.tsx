import { useState } from "react";
import { X, Download, FileText } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (formato: 'pdf' | 'excel', quantidade?: number) => void;
  totalAlunos: number;
  loading?: boolean;
}

export function ExportReportModal({ isOpen, onClose, onExport, totalAlunos, loading = false }: ExportReportModalProps) {
  const [formato, setFormato] = useState<'pdf' | 'excel'>('pdf');
  const [quantidade, setQuantidade] = useState<string>("");
  const [exportarTodos, setExportarTodos] = useState(true);

  const handleExport = () => {
    const qtd = exportarTodos ? undefined : (quantidade ? parseInt(quantidade) : undefined);
    onExport(formato, qtd);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Exportar Relatório</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Seleção de Formato */}
          <div>
            <label className="block text-sm font-medium mb-3">Formato</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="formato"
                  value="pdf"
                  checked={formato === 'pdf'}
                  onChange={() => setFormato('pdf')}
                  className="sr-only"
                  disabled={loading}
                />
                <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  formato === 'pdf' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <FileText className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <span className="font-medium">PDF</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="formato"
                  value="excel"
                  checked={formato === 'excel'}
                  onChange={() => setFormato('excel')}
                  className="sr-only"
                  disabled={loading}
                />
                <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  formato === 'excel' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <span className="font-medium">Excel</span>
                </div>
              </label>
            </div>
          </div>

          {/* Quantidade de Alunos */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Quantidade de Alunos
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="quantidade"
                  checked={exportarTodos}
                  onChange={() => setExportarTodos(true)}
                  className="w-4 h-4"
                  disabled={loading}
                />
                <span>Exportar todos os alunos ({totalAlunos})</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="quantidade"
                  checked={!exportarTodos}
                  onChange={() => setExportarTodos(false)}
                  className="w-4 h-4"
                  disabled={loading}
                />
                <span>Exportar quantidade específica</span>
              </label>
              {!exportarTodos && (
                <div className="ml-7">
                  <input
                    type="number"
                    min="1"
                    max={totalAlunos}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder={`Máximo: ${totalAlunos}`}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Os alunos serão selecionados pelo ranking (top N)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleExport}
              disabled={loading || (!exportarTodos && (!quantidade || parseInt(quantidade) < 1))}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-5 h-5" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Exportar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

