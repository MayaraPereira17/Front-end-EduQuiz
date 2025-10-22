import Logo from "../logo";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarDemo } from "../avatar";
import { useAuth } from "../../hooks/userAuth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
  isTeacher?: boolean;
  isAdmin?: boolean;
}

export function Header({ children, isTeacher = false, isAdmin = false }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="px-12 flex justify-between items-center h-[4.5rem] shrink-0 bg-white">
      <div>
        <Logo imgClass="w-12 h-12" containerClass="!gap-2" />
      </div>

      <Tabs.List className="self-start flex" aria-label="Manage your account">
        {children}
      </Tabs.List>

      <div className="flex gap-10">
        <AvatarDemo isTeacher={isTeacher} isAdmin={isAdmin} />
        <button className="text-[#404040] text-sm" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
