import Logo from "../logo";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarDemo } from "../avatar";

interface HeaderProps {
  children: React.ReactNode;
  isTeacher?: boolean;
}

export function Header({ children, isTeacher = false }: HeaderProps) {
  return (
    <header className="px-12 flex justify-between items-center h-[4.5rem] shrink-0 bg-white">
      <div>
        <Logo imgClass="w-12 h-12" containerClass="!gap-2" />
      </div>

      <Tabs.List className="self-start flex" aria-label="Manage your account">
        {children}
      </Tabs.List>

      <div className="flex gap-10">
        <AvatarDemo isTeacher={isTeacher} />
        <button className="text-[#404040] text-sm">Sair</button>
      </div>
    </header>
  );
}
