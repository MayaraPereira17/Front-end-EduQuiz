import { useState } from "react";
import { Tabs } from "./tabs";
import settingsIcon from "../../../assets/icons/settings.svg";
import { Avatar } from "./tabs/overview/avatar";
import { useAuth } from "../../../hooks/userAuth";
import { EditProfileModal } from "../../../components/EditProfileModal";

export function Profile() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 sm:pt-8 md:pt-11 px-4 sm:px-6 md:px-10 lg:px-14">
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">Meu Perfil</h3>

        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="bg-white py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          <img src={settingsIcon} alt="Icone" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Editar Perfil</span>
        </button>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-6 md:pt-8">
        <div className="bg-white flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-11 rounded-2xl sm:rounded-3xl md:rounded-4xl">
          <Avatar 
            currentAvatar={user?.avatarUrl}
            size="lg"
            showUploadButton={false}
            className="flex-shrink-0"
          />

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-bold text-base sm:text-lg">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="font-normal text-xs sm:text-sm text-[#404040]">
              {user?.email}
            </span>
          </div>
        </div>
        <Tabs />
      </div>

      {/* Modal de Edição de Perfil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
