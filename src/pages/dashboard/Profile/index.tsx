import { Tabs } from "./tabs";

export function Profile() {
  return (
    <div className="flex-1 h-full bg-[#EBF1F4]">
      <h3 className="font-bold text-3xl">Meu Perfil</h3>

      <div className="px-24">
        <div className="bg-white flex flex-col justify-center max-h-44 h-full">
          <span>Lucas Ribeiro</span>
          <span>Lucas.ribeira@gmail.com</span>
        </div>

        <Tabs />
      </div>
    </div>
  );
}
