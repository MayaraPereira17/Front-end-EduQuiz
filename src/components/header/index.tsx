import React from "react";
import Logo from "../logo";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarDemo } from "../avatar";
import { useAuth } from "../../hooks/userAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  children: React.ReactNode;
  isTeacher?: boolean;
  isAdmin?: boolean;
}

export function Header({ children, isTeacher = false, isAdmin = false }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fechar menu mobile quando a rota mudar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center h-16 sm:h-20 md:h-[4.5rem] shrink-0 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo imgClass="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" containerClass="!gap-1 sm:!gap-2" />
        </div>

        {/* Menu Desktop */}
        <Tabs.List className="hidden md:flex self-start" aria-label="Manage your account">
          {children}
        </Tabs.List>

        {/* Menu Mobile - Botão Hambúrguer */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Desktop - Avatar e Sair */}
        <div className="hidden md:flex gap-6 lg:gap-10 items-center">
          <AvatarDemo isTeacher={isTeacher} isAdmin={isAdmin} />
          <button className="text-[#404040] text-sm hover:text-red-600 transition-colors" onClick={handleLogout}>
            Sair
          </button>
        </div>

        {/* Menu Mobile - Avatar (sem texto Sair) */}
        <div className="md:hidden flex items-center">
          <AvatarDemo isTeacher={isTeacher} isAdmin={isAdmin} />
        </div>
      </header>

      {/* Menu Mobile - Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <Tabs.List className="flex flex-col" aria-label="Manage your account">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  className: "w-full text-left px-4 py-3 border-b border-gray-100 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-none hover:bg-gray-50 rounded-none"
                } as any);
              }
              return child;
            })}
          </Tabs.List>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </>
  );
}
