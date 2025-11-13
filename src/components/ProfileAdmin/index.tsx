import { Badge } from "../badge";
import { Avatar } from "../../pages/dashboard/Ranking/avatarComponent";
import { Settings } from "lucide-react";
import { useAuth } from "../../hooks/userAuth";

interface Props {
  firstCardIcon: React.ReactNode;
  secondCardIcon: React.ReactNode;
  firstCardValue: string;
  secondaCardValue: string;
  firstTitleCardValue: string;
  secondTitleCardValue: string;
  onEditProfile?: () => void;
}

export function ProfileAdmin({
  firstCardIcon,
  firstCardValue,
  firstTitleCardValue,
  secondCardIcon,
  secondTitleCardValue,
  secondaCardValue,
  onEditProfile
}: Props) {
  const { user } = useAuth();

  const handleEditProfile = () => {
    onEditProfile?.();
  }

  return (
    <div className="flex flex-col h-full px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="my-4 sm:my-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl">Meu Perfil</h4>

        <button onClick={handleEditProfile} className="flex gap-2 sm:gap-2.5 items-center justify-center border border-black/10 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" color="black" />
          Editar Perfil
        </button>
      </div>

      <div className="bg-white flex flex-col sm:flex-row items-center sm:items-start p-6 sm:p-8 md:p-10 lg:p-11 rounded-2xl sm:rounded-3xl md:rounded-4xl gap-4 sm:gap-6 md:gap-8">
        <div className="flex-shrink-0">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28" />
        </div>

        <div className="flex flex-col w-full text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-1 mb-2">
            <span className="font-bold text-xl sm:text-2xl md:text-3xl">
              Técnico {user?.firstName} {user?.lastName}
            </span>

            <Badge
             variant="info"
             icon={<span className="text-xs sm:text-sm md:text-base">⚽</span>}
             className="!py-0 px-2 gap-1 text-xs sm:text-sm"
            >
              Técnico
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-normal text-xs sm:text-sm text-[#404040] break-words">
              {user?.email}
            </span>
            <span className="font-normal text-xs sm:text-sm text-[#404040]">
              Técnico da Escolinha de Futebol
            </span>
            <span className="font-normal text-xs sm:text-sm text-[#404040]">
              Meninos da Caixa
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 md:mt-7 flex flex-1 flex-col gap-3 sm:gap-4">
        <div className="border border-black/10 bg-white text-center rounded-xl sm:rounded-2xl py-2 sm:py-3">
          <span className="text-sm sm:text-base font-medium">Visão Geral</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          <div className="flex flex-col items-center bg-white border border-black/10 rounded-xl sm:rounded-2xl gap-2 sm:gap-3 md:gap-4 py-4 sm:py-5 md:py-7">
            {firstCardIcon}

            <div className="flex flex-col text-center">
              <span className="font-bold text-xl sm:text-2xl md:text-3xl">{firstCardValue}</span>

              <span className="text-[#4A5565] text-xs sm:text-sm md:text-base">
                {firstTitleCardValue}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white border border-black/10 rounded-xl sm:rounded-2xl gap-2 sm:gap-3 md:gap-4 py-4 sm:py-5 md:py-7">
            {secondCardIcon}

            <div className="flex flex-col text-center">
              <span className="font-bold text-xl sm:text-2xl md:text-3xl">{secondaCardValue}</span>

              <span className="text-[#4A5565] text-xs sm:text-sm md:text-base">
                {secondTitleCardValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
