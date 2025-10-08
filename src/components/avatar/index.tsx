import * as Avatar from "@radix-ui/react-avatar";
import ellipseImg from "../../assets/ellipse.png";

export const AvatarDemo = () => (
  <div className="flex items-center gap-1.5 justify-center ">
    <div className="flex gap-5">
      {/* Avatar 1 */}
      <Avatar.Root className="inline-flex items-center justify-center overflow-hidden select-none w-7 h-7 rounded-full bg-black/10">
        <Avatar.Image
          className="w-full h-full object-cover rounded-inherit"
          src={ellipseImg}
          alt="Imagem Avatar"
        />
        <Avatar.Fallback
          className="w-full h-full flex items-center justify-center bg-white text-violet-700 text-[15px] font-medium leading-none"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold">Lucas Ribeiro</span>
      <span className="text-xs">lucas.ribeiro@gmail.com</span>
    </div>
  </div>
);
