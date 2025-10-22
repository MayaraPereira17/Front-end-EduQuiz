import { useState } from "react";
import { ChartColumn, User } from "lucide-react";
import { ProfileAdmin } from "../../../../components/ProfileAdmin";
import { EditProfileModal } from "../../../../components/EditProfileModal";

export function ProfileAdminPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdated = () => {
    // Aqui você pode adicionar lógica para atualizar dados se necessário
    console.log("Perfil atualizado!");
  };

  return (
    <>
      <ProfileAdmin
        firstCardIcon={<User width={32} height={32} color="#2B7FFF" />}
        firstCardValue="45"
        firstTitleCardValue="Total de Alunos"
        secondCardIcon={<ChartColumn width={32} height={32} color="#00C950" />}
        secondTitleCardValue="76.5%"
        secondaCardValue="Média da Turma"
        onEditProfile={handleEditProfile}
      />
      
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onProfileUpdated={handleProfileUpdated}
      />
    </>
  );
}
