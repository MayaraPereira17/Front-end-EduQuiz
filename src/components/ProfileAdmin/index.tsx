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
    <div className="flex flex-col h-full px-4">
      <div className="my-6 flex items-center justify-between">
        <h4 className="font-bold text-3xl ">Meu Perfil</h4>

        <button onClick={handleEditProfile} className="flex gap-2.5 items-center justify-center border border-black/10 py-1.5 px-3
         rounded-lg text-sm bg-white">
          <Settings width={16} height={16} color="black" />
          Editar Perfil
        </button>
      </div>

      <div className="bg-white flex items-center  p-11 rounded-4xl gap-8">
        <div>
          <Avatar className="h-28 w-28" />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 mb-2">
            <span className="font-bold text-2xl">
              Técnico {user?.firstName} {user?.lastName}
            </span>

            <Badge
             variant="info"
             icon={<span className="text-base">⚽</span>}
             className="!py-1 px-3 gap-2 text-sm"
            >
              Técnico
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-normal text-sm text-[#404040]">
              {user?.email}
            </span>
            <span className="font-normal text-sm text-[#404040]">
              Técnico da Escolinha de Futebol
            </span>
            <span className="font-normal text-sm text-[#404040]">
              Meninos da Caixa
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-1 flex-col gap-3 ">
        <div className="border border-black/10 bg-white text-center rounded-2xl">
          <span>Visão Geral</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
            {firstCardIcon}

            <div className="flex flex-col text-center">
              <span className="font-bold text-2xl">{firstCardValue}</span>

              <span className="text-[#4A5565] text-base">
                {firstTitleCardValue}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white border border-black/10 rounded-2xl gap-4 py-7">
            {secondCardIcon}

            <div className="flex flex-col text-center">
              <span className="font-bold text-2xl">{secondaCardValue}</span>

              <span className="text-[#4A5565] text-base">
                {secondTitleCardValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
