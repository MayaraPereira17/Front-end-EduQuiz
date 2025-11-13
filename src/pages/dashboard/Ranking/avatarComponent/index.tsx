import * as AvatarRadix from "@radix-ui/react-avatar";
import { cn } from "../../../../utils/cn";
import { useAuth } from "../../../../hooks/userAuth";
import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLElement["className"]> {}

export function Avatar({ className }: Props) {
  const { user } = useAuth();

  // Gerar iniciais do nome do usuário
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const backgroundColor = user?.avatarColor || '#3B82F6';

  return (
    <AvatarRadix.Root
      className={cn(
        "flex items-center justify-center overflow-hidden select-none w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0",
        className
      )}
    >
      <AvatarRadix.Fallback
        className="w-full h-full flex items-center justify-center text-white text-xs sm:text-sm md:text-[15px] font-medium leading-none rounded-full"
        style={{ backgroundColor }}
        delayMs={600}
      >
        {getInitials(user?.firstName, user?.lastName)}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
}
