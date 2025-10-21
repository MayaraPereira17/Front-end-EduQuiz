import { StudentStats } from "../../../../../components/studentStats";
import { studentService } from "../../../../../services/studentService";
import type { StudentDashboard as StudentStatsType } from "../../../../../services/studentService";
import { useState, useEffect } from "react";

export function Overview() {
  const [stats, setStats] = useState<StudentStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStudentStats = async () => {
    try {
      setLoading(true);
      const dashboardData = await studentService.getDashboard();
      setStats(dashboardData);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      setStats({
        quizzesCompletos: 0,
        totalPontos: 0,
        mediaGeral: 0,
        posicaoRanking: 0,
        tempoEstudo: 0,
        quizzesDisponiveis: 0,
        quizzesRecentes: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-16">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-16">
      {/* Quizzes Completos */}
      <StudentStats 
        item={{
          img: "book" as any,
          value: stats?.quizzesCompletos || 0,
          description: "Quizzes completos"
        }} 
      />
      
      {/* Total de Pontos */}
      <StudentStats 
        item={{
          img: "star" as any,
          value: stats?.totalPontos || 0,
          description: "Total de pontos"
        }} 
      />
      
      {/* Média Geral */}
      <StudentStats 
        item={{
          img: "analytics" as any,
          value: `${stats?.mediaGeral?.toFixed(1) || 0}%`,
          description: "Média geral"
        }} 
      />
      
      {/* Posição no Ranking */}
      <StudentStats 
        item={{
          img: "trophy" as any,
          value: `#${stats?.posicaoRanking || 0}`,
          description: "Posição no ranking"
        }} 
      />
    </div>
  );
}
