import * as AvatarRadix from "@radix-ui/react-avatar";
import ellipseImg from "../../../../assets/ellipse.png";
import { cn } from "../../../../utils/cn";
import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLElement["className"]> {}

export function Avatar({ className }: Props) {
  return (
    <AvatarRadix.Root
      className={cn(
        "flex items-center justify-center overflow-hidden select-none w-8 h-8 rounded-full bg-black/10",
        className
      )}
    >
      <AvatarRadix.Image
        className="w-full h-full object-cover rounded-inherit"
        src={ellipseImg}
        alt="Imagem Avatar"
      />
      <AvatarRadix.Fallback
        className="w-full h-full flex items-center justify-center bg-white text-violet-700 text-[15px] font-medium leading-none"
        delayMs={600}
      >
        CT
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
}
