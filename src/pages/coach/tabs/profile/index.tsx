import { useState } from "react";
import { Profile } from "../../../../components/profile";
import { BookOpen, ChartColumn } from "lucide-react";
import { useAuth } from "../../../../hooks/userAuth";
import { EditProfileModal } from "../../../../components/EditProfileModal";

export function ProfileCoach() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Profile
        firstCardIcon={<BookOpen width={32} height={32} color="#00C950" />}
        firstCardValue="12"
        firstTitleCardValue="Quizzes Criados"
        secondCardIcon={<ChartColumn width={32} height={32} color="#F0B100" />}
        secondTitleCardValue="74.2%"
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
