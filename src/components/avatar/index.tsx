import * as Avatar from "@radix-ui/react-avatar";
import { useAuth } from "../../hooks/userAuth";

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

  const backgroundColor = user?.avatarColor || '#3B82F6';

  return (
    <div className="flex items-center gap-1.5 justify-center ">
      <div className="flex gap-5">
        {/* Avatar */}
        <Avatar.Root className="inline-flex items-center justify-center overflow-hidden select-none w-7 h-7 rounded-full">
          <Avatar.Fallback
            className="w-full h-full flex items-center justify-center text-white text-[15px] font-medium leading-none"
            style={{ backgroundColor }}
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
