import { Tabs } from "./tabs";
import settingsIcon from "../../../assets/icons/settings.svg";
import { Avatar } from "../Ranking/avatarComponent";
import { useAuth } from "../../../hooks/userAuth";

export function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] ">
      <div className="flex justify-between pt-11">
        <h3 className="font-bold text-3xl ml-14">Meu Perfil</h3>

        <button className="bg-white py-2 px-4 text-sm font-bold rounded-xl flex items-center justify-center mr-24">
          <img src={settingsIcon} alt="Icone" />
          Editar Perfil
        </button>
      </div>

      <div className="px-24 flex flex-col gap-8 pt-8">
        <div className="bg-white flex items-center max-h-44 h-full p-11 rounded-4xl gap-8">
          <Avatar className="h-28 w-28" />

          <div className="flex flex-col">
            <span className="font-bold text-lg">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="font-normal text-sm text-[#404040]">
              {user?.email}
            </span>
          </div>
        </div>
        <Tabs />
      </div>
    </div>
  );
}
