import * as Avatar from "@radix-ui/react-avatar";
import { useAuth } from "../../hooks/userAuth";
import { avatarService } from "../../services/avatarService";

interface Props {
  isTeacher: boolean;
}

export const AvatarDemo = ({ isTeacher }: Props) => {
  const { user } = useAuth();
  
  // Gerar iniciais do nome do usuário
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  // Obter URL completa do avatar
  const avatarUrl = avatarService.getAvatarUrl(user?.avatarUrl);

  return (
    <div className="flex items-center gap-1.5 justify-center ">
      <div className="flex gap-5">
        {/* Avatar */}
        <Avatar.Root className="inline-flex items-center justify-center overflow-hidden select-none w-7 h-7 rounded-full bg-black/10">
          <Avatar.Image
            className="w-full h-full object-cover rounded-inherit"
            src={avatarUrl || undefined}
            alt="Avatar do usuário"
          />
          <Avatar.Fallback
            className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 text-[15px] font-medium leading-none"
            delayMs={600}
          >
            {getInitials(user?.firstName, user?.lastName)}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold">
          {isTeacher && "Prof"} {user?.firstName} {user?.lastName}
        </span>
        <span className="text-xs">{user?.email}</span>
      </div>
    </div>
  );
};
