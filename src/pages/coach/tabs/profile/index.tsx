import { useState, useEffect } from "react";
import { Profile } from "../../../../components/profile";
import { BookOpen, ChartColumn } from "lucide-react";
import { useAuth } from "../../../../hooks/userAuth";
import { EditProfileModal } from "../../../../components/EditProfileModal";
import { quizService } from "../../../../services/quizService";

interface DashboardStats {
  quizzesCriados: number;
  mediaDosAlunos: number;
  totalAlunos: number;
  totalTentativas: number;
  quizzesPublicados: number;
}

export function ProfileCoach() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const dashboardData = await quizService.getDashboardStats();
      setStats(dashboardData.estatisticas || dashboardData);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      setStats({
        quizzesCriados: 0,
        mediaDosAlunos: 0,
        totalAlunos: 0,
        totalTentativas: 0,
        quizzesPublicados: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  return (
    <>
      <Profile
        firstCardIcon={<BookOpen width={32} height={32} color="#00C950" />}
        firstCardValue={loading ? "..." : (stats?.quizzesCriados || 0).toString()}
        firstTitleCardValue="Quizzes Criados"
        secondCardIcon={<ChartColumn width={32} height={32} color="#F0B100" />}
        secondTitleCardValue={loading ? "..." : `${stats?.mediaDosAlunos?.toFixed(1) || 0}%`}
        secondaCardValue="Média dos Alunos"
        isTeacher={true}
        onEditProfile={() => setIsEditModalOpen(true)}
      />

      {/* Modal de Edição de Perfil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
