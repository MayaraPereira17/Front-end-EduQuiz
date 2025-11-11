import { Trophy, Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { TimeEscalacao } from "../../../services/studentService";

interface TeamNotificationProps {
  times: TimeEscalacao[];
}

export function TeamNotification({ times }: TeamNotificationProps) {
  const [dismissed, setDismissed] = useState<number[]>([]);

  useEffect(() => {
    // Carregar times dispensados do localStorage
    const dismissedTimes = JSON.parse(localStorage.getItem('dismissedTimes') || '[]');
    setDismissed(dismissedTimes);
  }, []);

  const handleDismiss = (timeId: number) => {
    setDismissed(prev => {
      const updated = [...prev, timeId];
      localStorage.setItem('dismissedTimes', JSON.stringify(updated));
      return updated;
    });
  };

  // Filtrar times não dispensados
  const visibleTimes = times.filter(time => !dismissed.includes(time.id));

  if (visibleTimes.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {visibleTimes.map((time) => (
        <div
          key={time.id}
          className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-xl p-4 shadow-lg relative animate-in fade-in slide-in-from-top-2"
        >
          <button
            onClick={() => handleDismiss(time.id)}
            className="absolute top-2 right-2 p-1 hover:bg-white rounded-full transition-colors z-10"
            title="Fechar notificação"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4 pr-8">
            <div className="bg-green-500 rounded-full p-3 flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Você foi escalado! 🎉
                </h3>
              </div>
              <p className="text-gray-700 mb-2">
                Parabéns! Você foi escalado para o time <strong className="text-green-700">{time.nome}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Escalado em {new Date(time.dataEscalacao).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

