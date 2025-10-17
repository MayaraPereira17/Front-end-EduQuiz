import { Badge } from "../../components/badge";
import { Avatar } from "../../pages/dashboard/Ranking/avatarComponent";
import BlueCapIcon from "../../assets/icons/blue-cap.svg";
import { Settings } from "lucide-react";

interface Props {
  firstCardIcon: React.ReactNode;
  secondCardIcon: React.ReactNode;
  firstCardValue: string;
  secondaCardValue: string;
  firstTitleCardValue: string;
  secondTitleCardValue: string;
}

export function Profile({
  firstCardIcon,
  firstCardValue,
  firstTitleCardValue,
  secondCardIcon,
  secondTitleCardValue,
  secondaCardValue,
}: Props) {
  return (
    <div className="flex flex-col h-full px-4">
      <div className="my-6 flex items-center justify-between">
        <h4 className="font-bold text-3xl ">Meu Perfil</h4>

        <button className="flex gap-2.5 items-center justify-center border border-black/10 py-1.5 px-3 rounded-lg text-sm bg-white">
          <Settings width={16} height={16} color="black" />
          Editar Perfil
        </button>
      </div>

      <div className="bg-white flex items-center max-h-44 h-full p-11 rounded-4xl gap-8 flex-6">
        <Avatar className="h-28 w-28" />

        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="font-bold text-2xl">Prof. João Silva</span>

            <Badge
              variant="info"
              icon={<img src={BlueCapIcon} alt="Ícone" />}
              className="!py-0 px-2 gap-1"
            >
              Professor
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-normal text-sm text-[#404040]">
              tecnico@demo.com
            </span>
            <span className="font-normal text-sm text-[#404040]">
              Escola Estadual XYZ
            </span>
            <span className="font-normal text-sm text-[#404040]">
              Matemática
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
