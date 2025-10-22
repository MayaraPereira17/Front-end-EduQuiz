import { useState, useEffect } from "react";
import { ChartColumn, User } from "lucide-react";
import { ProfileAdmin } from "../../../../components/ProfileAdmin";
import { EditProfileModal } from "../../../../components/EditProfileModal";
import { tecnicoService, type PerfilTecnicoDTO } from "../../../../services/tecnicoService";

export function ProfileAdminPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [perfil, setPerfil] = useState<PerfilTecnicoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPerfil = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Carregando perfil do técnico...');
      
      const data = await tecnicoService.getPerfil();
      setPerfil(data);
      
      console.log('✅ Perfil carregado com sucesso:', data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar perfil:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdated = async (dadosPerfil: {
    nome: string;
    sobrenome: string;
    email: string;
  }) => {
    try {
      console.log('🔍 Atualizando perfil do técnico...', dadosPerfil);
      const perfilAtualizado = await tecnicoService.updatePerfil(dadosPerfil);
      setPerfil(perfilAtualizado);
      console.log('✅ Perfil atualizado com sucesso:', perfilAtualizado);
    } catch (error: any) {
      console.error('❌ Erro ao atualizar perfil:', error);
      throw error; // Re-throw para o modal tratar
    }
  };

  if (loading) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando perfil...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar perfil</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadPerfil}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileAdmin
        firstCardIcon={<User width={32} height={32} color="#2B7FFF" />}
        firstCardValue={perfil?.totalAlunos?.toString() || "0"}
        firstTitleCardValue="Total de Alunos"
        secondCardIcon={<ChartColumn width={32} height={32} color="#00C950" />}
        secondTitleCardValue={`${perfil?.mediaTurma || 0}%`}
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
